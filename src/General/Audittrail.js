/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Row,
  Col,
  Tooltip,
  Select,
  message,
  Card,
  Drawer,
  DatePicker,
  Input,
  Menu,
  Avatar,
  Descriptions,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { FaUserCircle, FaDownload } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiLock } from "react-icons/bi";
import API from "../baseUrl.json";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { FormProvider } from "antd/es/form/context";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Audittrail = () => {
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState("");
  const [formNames, setFormNames] = useState([]);
  const [formFrequencies, setFormFrequencies] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState(null);
  const [selectedFrequency1, setSelectedFrequency1] = useState(null);
  const [selectedFrequency2, setSelectedFrequency2] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formName, setFormName] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [subBatchOptions, setSubBatchOptions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const departmentName = "";
  const [endDate, setEndDate] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState("");
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [week, setWeek] = useState(null);
  const [bmr, setbmr] = useState(null);
  const role = localStorage.getItem("role");
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const [selectSection, setSelectSection] = useState("");
  const navigate = useNavigate();
  const [Subbatch, setSubbatch] = useState("");
  const [bale, setBale] = useState("");
  const [baleOptions, setBaleOptions] = useState([]);
  const initialized3 = useRef(false);
  const departmentId = localStorage.getItem("departmentId");
  const initialized4 = useRef(false);
  const initializedInvoice = useRef(false);
  const initializedGatePass = useRef(false);
  const initializedPdsNo = useRef(false);
  const initializedBisNo = useRef(false);
  const initializedWorNo = useRef(false);
  const initializedRcaNo = useRef(false);
  const initializedMachineId = useRef(false);
  // -------- Spunlace State ---------------
  const [spFrequency, setSpFrequency] = useState({
    shift: "",
    orderNo: "",
    month: "",
    year: "",
    week: "",
    machineName: "",
  });

  const [jobOrderLov, setJobOrderLov] = useState("");
  //---------------------------------------------

  // -------- PadPunching State ---------------
  const [PadPunchingFrequency, setPadPunchingFrequency] = useState({
    shift: "",
    machineName: "",
    month: "",
    year: "",
    week: "",
  });
  const [MachineNameLov, setMachineNameLov] = useState("");
  //---------------------------------------------

  // -------- Dry Goods State ------------------
  const [dgFrequency, setDgFrequency] = useState({
    shift: "",
    laydownNo: "",
    month: "",
    year: "",
    week: "",
    machineName: "",
    orderNo: "",
  });
  const [laydownLov, setLaydownLov] = useState([]);
  const [orderNoLov, setOrderNoLov] = useState([]);
  //--------------------------------------------
  //---------------Stores State---------------------------
  const [invoiceNoLov, setInvoiceNoLov] = useState([]);
  const [storeDescriptionLov, setStoreDescriptionLov] = useState([]);
  const [gatePassNoLov, setGatePassNoLov] = useState([]);
  const [storesFrequency, setStoresFrequency] = useState({
    invoiceNo: "",
    description: "",
    gatePassNo: "",
    forkLiftNo: "",
    month: "",
    year: "",
  });
  const [pdsNo, setPdsNo] = useState("");
  const [pdsNoLov, setPdsNoLov] = useState([]);
  const [bisNoLov, setBisNoLov] = useState([]);
  const [worNoLov, setWorNoLov] = useState([]);
  const [rcaNoLov, setRcaNoLov] = useState([]);
  const [weighingbalDept, setWeighingbalDept] = useState("");
  const [machineIdLov, setMachineIdLov] = useState([]);
  const [engineeringFrequency, setEngineeringFrequency] = useState({
    bisNo: "",
    RcaNo: "",
    machineIdNo: "",
    worNo: "",
  });
  const departmentchange = (value) => {
    setWeighingbalDept(value);
    setEngineeringFrequency((prevState) => ({
      ...prevState,
      machineIdNo: "", // Clear machineIdNo each time a department is selected
    }));
  };

  // -------------- QC State -------------------
  const [qcFrequency, setQcFrequency] = useState({
    customer: "",
    product: "",
    year: "",
    month: "",
    eqId: "",
    chemical: "",
    shift: "",
    millBatch: "",
    materialDoc: "",
    subBatchNo: "",
    bmrNO: "",
  });
  const [qcParamLov, setQcParamLov] = useState({
    customerLov: [],
    productLov: [],
    monthLov: [],
    yearLov: [],
    eqIdLov: [],
    chemicalLov: [],
    shiftLov: [],
    materialDocLov: [],
    millBatchLov: [],
    subBatchLov: [],
    invoiceLov: [],
    bmrLov: [],
    supplierLov: [],
  });
  const [fullSupplierLov, setFullSupplierLov] = useState([]);
  // -------------------------------------------

  // ---------------- QA State ----------------------
  const [qaFrequency, setQAFrequency] = useState({
    year: "",
    month: "",
    formatNo: "",
    porder: "",
    shift: "",
    dept: "",
    bmrNO: "",
    supplierName: "",
    invoiceNo: "",
    department: "",
    changeControlNo: "",
    departmentName: "",
    machineNo: ""
  });
  const [qaParamLov, setQAParamLov] = useState({
    formatNoLov: [],
    monthLov: [],
    yearLov: [],
    porderLov: [],
    shiftLov: [],
    onlineInsLov: [
      { value: "pad punching", label: "pad punching" },
      { value: "dry goods", label: "dry goods" },
    ],
    bmrLov: [],
    deptLov: [],
    changeControlLov: [],
    machineLov: []
  });

  // ----------------- COTTON BUDS State ---------------------
  const [cbFrequency, setCbFrequency] = useState({
    shift: "",
    bmrNumber: "",
    machineName: "",
    orderNumber: ""
  })

  const [cbParamLov, setCBParamLov] = useState({
    shiftLov: [
      { value: 'I', label: 'I' },
      { value: 'II', label: 'II' },
      { value: 'III', label: 'III' },

    ],
    bmrLov: [],
    orderNoLov: [],
    machineLov: []
  })


  //-------------------------------------------------

  const handleBaleChange = (value) => {
    setBale(value);
  };
  const handleBack = () => navigate("/Precot/choosenScreen");

  const handleAdditionalInputChange = (value) => {
    setSubbatch(value);
  };

  const yearOptions = Array.from({ length: 50 }, (_, i) => ({
    value: (2024 + i).toString(),
    name: (2024 + i).toString(),
  }));

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date:", date);
      return ""; // Return an empty string or handle the error as needed
    }
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };
  let startDateObj =
    typeof startDate === "string" ? new Date(startDate) : startDate;
  let endDateObj = typeof endDate === "string" ? new Date(endDate) : endDate;

  // Format the dates
  const formattedStartDate = formatDate(startDateObj);
  const formattedEndDate = formatDate(endDateObj);

  // Month options for all 12 months
  const monthOptions = [
    { value: "JAN", name: "January" },
    { value: "FEB", name: "February" },
    { value: "MAR", name: "March" },
    { value: "APR", name: "April" },
    { value: "MAY", name: "May" },
    { value: "JUN", name: "June" },
    { value: "JUL", name: "July" },
    { value: "AUG", name: "August" },
    { value: "SEP", name: "September" },
    { value: "OCT", name: "October" },
    { value: "NOV", name: "November" },
    { value: "DEC", name: "December" },
  ];

  //  Shift Options
  const shiftOptions = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  const forkliftLov = [
    { label: "PH-E/I-ENG15", value: "PH-E/I-ENG15" },
    { label: "PH-E/I-ENG16", value: "PH-E/I-ENG16" },
  ];

  const departmantLOV = [
    "Bleaching",
    "Spunlace",
    "Pad Punching",
    "Lab",
    "ETP",
    "Store",
  ];

  const machineIdNoMapping = {
    Bleaching: ["DS45121349841", "G-81012120393"],
    Spunlace: ["81014131082"],
    "Pad Punching": [
      "G-25221733704",
      "5474",
      "Q-7825458",
      "Q-7825106",
      "G-81012119184",
      "45013128958",
      "G85220708006",
      "G-85216554479",
      "G-85218622901",
      "G-85220708005",
      "G-85218622902",
      "G-85221733319",
      "6329",
      "6153",
    ],
    Lab: [
      "PL88100223",
      "B-224034209",
      "B-124150425",
      "G-85221786556",
      "G-85221786557",
      "G-85216554478",
      "B-2400420655",
    ],
    // "Boiler": ["81539"],  // Boiler and ETP are considered the same
    ETP: ["81539"],
    Store: ["3958"],
  };
  const machineOptions = machineIdNoMapping[weighingbalDept] || [];

  const handleforklift = (selectedforklift) => {
    if (department == 8) {
      setStoresFrequency((prevState) => ({
        ...prevState,
        forkLiftNo: selectedforklift,
      }));
    }
  };
  const handleShift = (selectedShift) => {
    if (department == 2) {
      setSpFrequency((prevState) => ({
        ...prevState,
        shift: selectedShift,
      }));
    } else if (department == 3) {
      setSpFrequency((prevState) => ({
        ...prevState,
        shift: selectedShift,
      }));
    } else if (department == 4) {
      setDgFrequency((prevState) => ({
        ...prevState,
        shift: selectedShift,
      }));
    }
  };
  const handleOrderNo = (selectedOrderNo) => {
    setSpFrequency((prevState) => ({
      ...prevState,
      orderNo: selectedOrderNo,
    }));
  };

  const handleDryGoodsField = (e, name) => {
    setDgFrequency((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const handleQcField = (value, name) => {
    setQcFrequency((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQaField = (value, name) => {
    setQAFrequency((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCbField = (value, name) => {

    setCbFrequency((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleStoreField = (e, name) => {
    setStoresFrequency((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };
  const handleEngineeringField = (e, name) => {
    setEngineeringFrequency((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };
  const handleMachineName = (selectedMachineName) => {
    setSpFrequency((prevState) => ({
      ...prevState,
      machineName: selectedMachineName,
    }));
  };
  const handleWeek = (selectedWeek) => {
    setSpFrequency((prevState) => ({
      ...prevState,
      week: selectedWeek,
    }));
  };
  const handleMonth = (selectedMonth) => {
    setSpFrequency((prevState) => ({
      ...prevState,
      month: selectedMonth,
    }));
  };
  const handleYear = (selectedYear) => {
    setSpFrequency((prevState) => ({
      ...prevState,
      year: selectedYear,
    }));
  };
  // Week options for 5 weeks
  const weekOptions = Array.from({ length: 5 }, (_, i) => ({
    value: `${i + 1}`, // Remove the leading space
    name: `${i + 1}`, // Remove the leading space
  }));
  const handleYearChange = (value) => {
    setYear(value);
  };

  const handleMonthChange = (value) => {
    setMonth(value);
  };

  const handleWeekChange = (value) => {
    setWeek(value);
  };

  const handleDepartmentChange = async (value) => {
    setDepartment(value);
    setFormName("");
    setSelectedFrequency(null);
    setFormFrequencies([]);
    setFormNames([]);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/formList?departmentId=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormNames(response.data);
    } catch (error) {
      console.error("Error fetching form names:", error);
    }
  };

  const handleSectionChange = (value) => {
    setSelectSection(value);
  };

  useEffect(() => {
    if (!initialized3.current) {
      const token = localStorage.getItem("token");
      initialized3.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/goodsLaydown/LaydownLov`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option.drygoods_laydown_number,
              label: option.drygoods_laydown_number,
            }));
            setLaydownLov(a);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });
  useEffect(() => {
    if (!initialized4.current) {
      const token = localStorage.getItem("token");
      initialized4.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/drygoods/getDrygoodsOrderNoLov`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option,
              label: option,
            }));
            setOrderNoLov(a);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });
  useEffect(() => {
    if (!initializedGatePass.current) {
      const token = localStorage.getItem("token");
      initializedGatePass.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Store/gatepassNo`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option,
              label: option,
            }));
            setGatePassNoLov(a);
          }
        } catch (error) {
          // message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });

  useEffect(() => {
    if (!initializedInvoice.current) {
      const token = localStorage.getItem("token");
      initializedInvoice.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Store/Invoice`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option,
              label: option,
            }));
            setInvoiceNoLov(a);
          }
        } catch (error) {
          // message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });
  // console.log("storesFrequency.invoiceNo",storesFrequency.invoiceNo);
  // useEffect(() => {
  //   if (!initializedDescription.current) {
  //     const token = localStorage.getItem("token");
  //     initializedDescription.current = true;
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${API.prodUrl}/Precot/api/Store/invoice/descriptions?invoiceNo=${storesFrequency.invoiceNo}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         if (response.data.length > 0) {
  //           const a = response.data.map((option) => ({
  //             value: option,
  //             label: option,
  //           }));
  //           setStoreDescriptionLov(a);
  //         }
  //       } catch (error) {
  //         message.error(error.response.data.message);
  //       }
  //     };
  //     fetchData();
  //   }
  // });

  useEffect(() => {
    if (storesFrequency.invoiceNo) {
      // Check if invoiceNo is selected
      const token = localStorage.getItem("token");
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Store/invoice/descriptions?invoiceNo=${storesFrequency.invoiceNo}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option,
              label: option,
            }));
            setStoreDescriptionLov(a);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  }, [storesFrequency.invoiceNo]);

  useEffect(() => {
    if (!initializedPdsNo.current) {
      const token = localStorage.getItem("token");
      initializedPdsNo.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/ProductDevelopment/api/pds`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const pdsOptions = response.data.map((option) => ({
              value: option,
              label: option,
            }));
            setPdsNoLov(pdsOptions);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });
  useEffect(() => {
    if (!initializedBisNo.current) {
      const token = localStorage.getItem("token");
      initializedBisNo.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Engineering/getbisnos`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option,
              label: option,
            }));
            setBisNoLov(a);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });
  useEffect(() => {
    if (!initializedRcaNo.current) {
      const token = localStorage.getItem("token");
      initializedRcaNo.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Engineering/getRcano`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option,
              label: option,
            }));
            setRcaNoLov(a);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });
  useEffect(() => {
    if (!initializedWorNo.current) {
      const token = localStorage.getItem("token");
      initializedWorNo.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Engineering/getworno`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option,
              label: option,
            }));
            setWorNoLov(a);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });

  useEffect(() => {
    if (!initializedMachineId.current) {
      const token = localStorage.getItem("token");
      initializedMachineId.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Engineering/getbisnos`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option,
              label: option,
            }));
            setMachineIdLov(a);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });

  const handleFormNameChange = async (value) => {
    setFormName(value);
    setSelectedFrequency("");
    setSubbatch("");
    setSelectedFrequency1("");
    setSelectedFrequency2("");
    setStartDate("");
    setEndDate("");
    setError("");
    setSubBatchOptions([]);
    setBaleOptions([]);
    setFormFrequencies([]);
    setSubbatch([]);
    setSpFrequency((prevState) => ({
      ...prevState,
      shift: "",
      orderNo: "",
      month: "",
      year: "",
      week: "",
      machineName: "",
    }));
    setDgFrequency((prevState) => ({
      ...prevState,
      shift: "",
      laydownNo: "",
      month: "",
      year: "",
      week: "",
      machineName: "",
      orderNo: "",
    }));
    setStoresFrequency((prevState) => ({
      ...prevState,
      invoiceNo: "",
      description: "",
      gatePassNo: "",
      forkLiftNo: "",
      month: "",
      year: "",
    }));

    setQcFrequency((prevState) => ({
      ...prevState,
      customer: "",
      product: "",
      year: "",
      month: "",
      eqId: "",
      chemical: "",
      shift: "",
      millBatch: "",
      materialDoc: "",
      subBatchNo: "",
      bmrNO: "",
    }));
    setQAFrequency((prevState) => ({
      ...prevState,
      year: "",
      month: "",
      formatNo: "",
      porder: "",
      shift: "",
      dept: "",
      bmrNO: "",
      supplierName: "",
      invoiceNo: "",
      department: "",
      changeControlNo: "",
      departmentName: "",
      machineNo: ""
    }));

    setCbFrequency(prevState => ({
      ...prevState,
      shift: "",
      bmrNumber: "",
      machineName: "",
      orderNumber: ""
    }))
    try {
      const token = localStorage.getItem("token");
      let response;

      if (
        value === "Applied Contamination Report (Raw Cotton)" ||
        value === "Equipment Usage Log Book – Cake Press" ||
        value === "Bleaching Job Card" ||
        value === "Equipment Usage Log Book – Hydro Extractor" ||
        value === "Mixing Change Over and Machine Cleaning Checklist" || // Add this form to the list
        value === "Applied Contamination Report (AB Cotton)" ||
        value === "Equipment Usage Log Book – Blow room and Carding" ||
        value === "Equipment Usage Log Book - Cake Press"
      ) {
        response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/summary/allBmrAndLaydownLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (value === "Metal Detector Checklist") {
        setFormFrequencies([
          { value: "Blow room (CCP - 02A)", name: "Blow room (CCP - 02A)" },
          { value: "Bleaching (CCP - 02B)", name: "Bleaching (CCP - 02B)" },
        ]);
      } else if (value === "Contamination Report (Raw Cotton)") {
        response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/rawCottonData`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (value === "Laydown Checklist") {
        response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMappingLaydown`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (
        value === "Contamination Checking Report (Absorbent Bleached Cotton)"
      ) {
        response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getcloseBMR`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (value === 'RE-PROCESSING REPORT') {
        response = await axios.get(`${API.prodUrl}/Precot/api/bleaching/generation/getcloseBMR`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } else if (
        value === "Bleaching Hand Sanitization Report" ||
        value === "Shift Log Book"
      ) {
        response = await axios.get(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (
        value === "Contamination Checking Report (Raw Cotton)" ||
        value === "Shift Log Book"
      ) {
        response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/rawCottonData`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMappingLaydown`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              formName: value,
            },
          }
        );
      }

      if (value !== "Sanitization of machines and surfaces") {
        setFormFrequencies(response.data);
      }
      switch (value) {
        case "Bale Consumption Report":
        case "Process Setup Verification Opening Line":
        case "Process Setup Details Jetlace & Dryer":
        case "Process Setup Details - Winder":
        case "Daily Production Report - Spunlace":
        case "Daily Rejection Report - Spunlace":
        case "Spunlace GSM Analysis Report":
        case "Product Change Over Check List Spunlace":
        case "Shift Wise Sliter Winder Production Report":
        case "Process Setup Verification Sliter Winder":
        case "Shift wise RP Production Report":
        case "Process Setup Verification - RP Bale Press":
        case "Sample Report - Spunlace":
          try {
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/spulance/orders`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const options = response.data.map((option) => ({
              value: option.value,
              label: option.value,
            }));
            setJobOrderLov(options);
          } catch (error) {
            message.error("Error Fetching Spunlace Order Lov");
          }
          break;
      }

      switch (value) {
        case "Daily Roll Consumption Report - Pad Punching":
        case "Product Change Over":
        case "Machine Cleaning Check List":
        case "Log Book - Bag Making":
        case "Sanitization Of Machines & Surfaces":
        case "Bag Making - Specification Details":
          try {
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/padpunching/MachineLov`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const options = response.data.map((option) => ({
              value: option.MCN,
              label: option.MCN,
            }));
            setMachineNameLov(options);
          } catch (error) {
            message.error("Error Fetching Machine Names");
          }
          break;
      }
    } catch (error) {
      console.error("Error fetching form frequencies:", error);
    }
    // --------------- Case To Get Qc Lov Api's -----------------------
    switch (value) {
      case "COA FOR AB COTTON":
      case "COA FOR COTTON PADS":
      case "COA FOR COTTON BALLS":
      case "COA FOR COTTON WOOL ROLL":
      case "COA FOR COTTON WOOL PLEAT":
      case "COA FOR COTTON ROLL GOODS":
      case "COA FOR INFUSED COTTON PADS":
      case "COA FOR MOISTURE CONTENT (%)":
        // ------------- Customer Lov Api -------------------
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QcForm/CustomerName`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.map((option) => ({
            value: option.value,
            label: option.value,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            customerLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "STANDARIZATION OF CHEMICAL SOLUTION":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QcForm/ChemicalName`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.map((option) => ({
            value: option.value,
            label: option.value,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            chemicalLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "RAW COTTON ANALYSIS REPORT":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/GetPdeBatchNo`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const uniqueOptions = Array.from(
            new Map(response.data.map((option) => [option.id, option])).values()
          );

          const options = uniqueOptions.map((option) => ({
            value: option.value,
            label: option.value,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            millBatchLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "CHEMICAL ANALYSIS REPORT":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/qc/ChemicalAnalysisReport/GetChemicalAnalysisReportPdeData`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data
            .map((option) => option.matDoc)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((uniqueMatDoc) => ({
              value: uniqueMatDoc,
              label: uniqueMatDoc,
            }));
          setQcParamLov((prevState) => ({
            ...prevState,
            materialDocLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "ABSORBENT BLEACHED COTTON ANALYSIS REPORT":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/punching/bmr/fetchProductionDetails`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.map((option) => ({
            value: option.value,
            label: option.value,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            subBatchLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "EXFOLIATING FABRIC ANALYSIS REPORT":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/chemicaltest/ARF004/PDE`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.map((option) => ({
            value: option.invoice_no,
            label: option.invoice_no,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            invoiceLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "FINISHED PRODUCT ANALYSIS REPORT":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/punching/bmr/fetchProductionDetails`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.map((option) => ({
            value: option.value,
            label: option.value,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            bmrLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "NON-WOVEN FLEECE ANALYSIS REPORT":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/spulance/orders`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.map((option) => ({
            value: option.value,
            label: option.value,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            bmrLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "WEIGHING SCALE CALIBRATION REPORT":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/chemicaltest/CLF007/PDE-EQID`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.map((option) => ({
            value: option.eqid,
            label: option.eqid,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            eqIdLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT":
      case "RAW COTTON CONSOLIDATED ANALYTICAL REPORT":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/bmrNoList`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const uniqueOptions = Array.from(
            new Set(response.data.map((option) => option.value))
          ).map((value) => ({
            value: value,
            label: value,
          }));

          setQcParamLov((prevState) => ({
            ...prevState,
            bmrLov: uniqueOptions,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "BRIQUETTES ANALYSIS REPORT":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/chemicaltest/ARF014/PDE`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFullSupplierLov(response.data);
          const options = response.data.map((option) => ({
            value: option.supplier,
            label: option.supplier,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            supplierLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
    }
    // -------------- Case To Get QA Lov Api's ------------------------
    switch (value) {
      case "final_inspection_report":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/api/getAllBatchNumbers/finalInspectionReport`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data
            .filter((option) => option !== "" && option !== null)
            .map((option) => ({
              value: option,
              label: option,
            }));
          setQAParamLov((prevState) => ({
            ...prevState,
            porderLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
        break;
      case "change_control_log_book":
        const findChangeControl = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/QA/Service/changeControlLogBook/getAllExistingchangeControlNos`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const options = response.data
              .filter((option) => option !== "" && option !== null)
              .map((option) => ({
                value: option,
                label: option,
              }));
            setQAParamLov((prevState) => ({
              ...prevState,
              changeControlLov: options,
            }));
          } catch (error) {
            // message.error("Error Occurs On QA BMR LOV");
          }
        };
        findChangeControl();
        break;
      case "online_inspection_report_pads":
      case "online_inspection_report_balls":
      case "online_inspection_report_buds":

        const MachineLov = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/QA/Service/api/machineLov`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const options = Array.from(
              new Set(
                response.data
                  .filter((option) => option.MCN !== "" && option.MCN !== null)
              )
            ).map((option) => ({
              value: option.MCN,
              label: option.MCN,
            }));
            setQAParamLov((prevState) => ({
              ...prevState,
              machineLov: options,
            }));
          } catch (error) {
            // message.error("Error Occurs On QA BMR LOV");
          }
        };
        const departmantLOV = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/QA/Service/api/departmentsLov`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const options = Array.from(
              new Set(
                response.data
                  .filter((option) => option !== "" && option !== null)
              )
            ).map((option) => ({
              value: option,
              label: option,
            }));
            setQAParamLov((prevState) => ({
              ...prevState,
              deptLov: options,
            }));
          } catch (error) {
            // message.error("Error Occurs On QA BMR LOV");
          }
        };
        departmantLOV();
        MachineLov();
        break;

    }
    // -------------- Case To Get CB Lov APIs --------------------------
    switch (value) {
      case "buds_equipment_usage":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/buds/bmr/fetchProductionDetails`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data
            .map((option) => ({
              value: option.value,
              label: option.value,
            }));
          setCBParamLov((prevState) => ({
            ...prevState,
            bmrLov: options,
          }));
        } catch (error) {
          // message.error("Error Occurs On QC Lov");
        }
        break;
      case "final_inspection_report":
      case "buds_product_changeover":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/buds/sap/Service/orderInfo`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data
            .filter((option) => option !== "" && option !== null)
            .map((option) => ({
              value: option,
              label: option,
            }));
          setCBParamLov((prevState) => ({
            ...prevState,
            orderNoLov: options,
          }));
        } catch (error) {
          // message.error("Error Occurs On QC Lov");
        }
        break;
      case "buds_daily_production_sliver":
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/buds/sap/Service/machineList`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data
            .map((option) => ({
              value: option.value,
              label: option.value,
            }));
          setCBParamLov((prevState) => ({
            ...prevState,
            machineLov: options,
          }));
        } catch (error) {
          // message.error("Error Occurs On QC Lov");
        }
        break;
    }
  };

  useEffect(() => {
    if (qcFrequency.customer !== "") {
      const qcProductLov = async () => {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QcForm/ProductName?customer=${qcFrequency.customer}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.map((option) => ({
            value: option.value,
            label: option.value,
          }));
          setQcParamLov((prevState) => ({
            ...prevState,
            productLov: options,
          }));
        } catch (error) {
          message.error("Error Occurs On QC Lov");
        }
      };
      qcProductLov();
    }
  }, [qcFrequency.customer]);

  // ---------------------- Dry Goods Machine Lov ------------------------
  const dryGoodsMachineName = () => {
    let machineName;
    switch (formName) {
      case "Daily Production - Sliver Making":
        machineName = [
          { value: "TC10-1", label: "TC10-1 " },
          { value: "TC10-2", label: "TC10-2" },
        ];
        return machineName;
      case "Daily Production - Cotton Balls":
      case "Product Change Over - Dry Goods":
        machineName = [
          { value: "TEXCOR", label: "TEXCOR" },
          { value: "LINK", label: "LINK" },
        ];
        return machineName;
      case "Daily Production (Pleat / Wool Roll)":
        machineName = [
          { value: "PL1", label: "PL1" },
          { value: "PL2", label: "PL2" },
          { value: "RL1", label: "RL2" },
        ];
        return machineName;
    }
  };
  // ------------ QC BRIQUETTES ANALYSIS REPORT  Invoice Lov -------
  useEffect(() => {
    if (qcFrequency.subBatchNo !== "") {
      const getInvoicesBySupplier = (supplierName) => {
        const supplierData = fullSupplierLov.find(
          (item) => item.supplier === supplierName
        );
        return supplierData ? supplierData.invoice_no : [];
      };
      const invoiceLovData = getInvoicesBySupplier(qcFrequency.subBatchNo);
      if (invoiceLovData.length > 0) {
        const options = invoiceLovData
          .filter((option) => option.invoice_no !== "")
          .map((option) => ({
            value: option.invoice_no,
            label: option.invoice_no,
          }));
        setQcParamLov((prevState) => ({
          ...prevState,
          invoiceLov: options,
        }));
      }
    }
  }, [qcFrequency.subBatchNo]);

  // ------------------------ QC Dept Lov's   ---------------------------------
  const monthTypeI = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const monthTypeII = [
    { value: "01", label: "JAN" },
    { value: "02", label: "FEB" },
    { value: "03", label: "MAR" },
    { value: "04", label: "APR" },
    { value: "05", label: "MAY" },
    { value: "06", label: "JUN" },
    { value: "07", label: "JUL" },
    { value: "08", label: "AUG" },
    { value: "09", label: "SEP" },
    { value: "10", label: "OCT" },
    { value: "11", label: "NOV" },
    { value: "12", label: "DEC" },
  ];

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    let years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ value: year, label: year.toString() });
    }

    const eqIdTypeI = [
      { value: "PH-E/I-LAB01", label: "PH-E/I-LAB01" },
      { value: "PH-E/I-LAB02", label: "PH-E/I-LAB02" },
      { value: "PH-E/I-LAB08", label: "PH-E/I-LAB08" },
      { value: "PH-E/I-LAB09", label: "PH-E/I-LAB09" },
      { value: "PH-E/I-LAB38", label: "PH-E/I-LAB38" },
    ];
    const eqIdTypeII = [
      { value: "PH-E/I-LAB21", label: "PH-E/I-LAB21" },
      { value: "PH-E/I-LAB30", label: "PH-E/I-LAB30" },
      { value: "PH-E/I-LAB59", label: "PH-E/I-LAB59" },
    ];
    const eqIdTypeIII = [
      { value: "PH-E/I-LAB01", label: "PH-E/I-LAB01" },
      { value: "PH-E/I-LAB02", label: "PH-E/I-LAB02" },
      { value: "PH-E/I-LAB03", label: "PH-E/I-LAB03" },
    ];
    const eqIdTypeIV = [
      { value: "PH-E/I-LAB07", label: "PH-E/I-LAB07" },
      { value: "PH-E/I-LAB03", label: "PH-E/I-LAB03" },
    ];
    const eqIdTypeV = [
      { value: "PH-E/I-LAB01", label: "PH-E/I-LAB01" },
      { value: "PH-E/I-LAB02", label: "PH-E/I-LAB02" },
      { value: "PH-E/I-LAB08", label: "PH-E/I-LAB08" },
    ];
    const eqIdTypeVI = [
      { value: "PH-E/I-LAB53", label: "PH-E/I-LAB53" },
      { value: "PH-E/I-LAB14", label: "PH-E/I-LAB14" },
    ];
    const shiftTypeI = [
      { value: "I", label: "I" },
      { value: "II", label: "II" },
      { value: "III", label: "III" },
    ];
    const shiftTypeII = [
      { value: "1", label: "I" },
      { value: "2", label: "II" },
      { value: "3", label: "III" },
    ];

    if (formName && department == 5) {
      switch (formName) {
        case "DIGITAL COLONY COUNTER CALIBRATION REPORT":
          setQcParamLov((prevState) => ({
            ...prevState,
            monthLov: monthTypeI,
            eqIdLov: eqIdTypeI,
            yearLov: years,
          }));
          break;
        case "STANDARIZATION OF CHEMICAL SOLUTION":
          setQcParamLov((prevState) => ({
            ...prevState,
            shiftLov: shiftTypeI,
          }));
          break;
        case "PHYSICAL AND CHEMICAL LAB SAMPLE INWARD BOOK":
        case "MICROBIOLOGY LAB SAMPLE INWARD BOOK":
        case "ETP LAB SAMPLE INWARD BOOK":
          setQcParamLov((prevState) => ({
            ...prevState,
            shiftLov: shiftTypeII,
          }));
          break;
        case "pH-METER CALIBRATION REPORT":
          setQcParamLov((prevState) => ({
            ...prevState,
            eqIdLov: eqIdTypeII,
            yearLov: years,
            monthLov: monthTypeI,
          }));
          break;
        case "BACTERIAL INCUBATOR TEMPRATURE CALIBRATION REPORT":
          setQcParamLov((prevState) => ({
            ...prevState,
            eqIdLov: eqIdTypeIII,
          }));
          break;
        case "FUNGAL INCUBATOR TEMPERATURE VERIFICATION REPORT":
          setQcParamLov((prevState) => ({
            ...prevState,
            eqIdLov: eqIdTypeV,
          }));
          break;
        case "VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR":
          setQcParamLov((prevState) => ({
            ...prevState,
            eqIdLov: eqIdTypeIV,
          }));
          break;
        case "WIRA FIBER FINENESS TESTER CALIBRATION REPORT":
        case "MEDIA GROWTH PROMOTION TEST REPORT":
        case "REAGENT PREPARATION RECORD":
        case "REQUISITION SAMPLE ANALYSIS REPORT":
          setQcParamLov((prevState) => ({
            ...prevState,
            yearLov: years,
            monthLov: monthTypeI,
          }));
          break;
        case "VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR":
          setQcParamLov((prevState) => ({
            ...prevState,
            yearLov: years,
            monthLov: monthTypeII,
            eqIdLov: eqIdTypeIV,
          }));
          break;
        case "TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB":
          setQcParamLov((prevState) => ({
            ...prevState,
            eqIdLov: eqIdTypeVI,
          }));
          break;
      }
    }
  }, [formName, department]);

  // ------------------- QA Dept Lov's ------------------
  useEffect(() => {
    console.log(qaParamLov.supplierLov);
  }, [startDate]);
  useEffect(() => {
    if (qaFrequency.dept !== "") {
      const findBMRLov = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/api/bmrLov?department=${qaFrequency.dept}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data
            .filter((option) => option !== "" && option !== null)
            .map((option) => ({
              value: option,
              label: option,
            }));
          setQAParamLov((prevState) => ({
            ...prevState,
            bmrLov: options,
          }));
        } catch (error) {
          // message.error("Error Occurs On QA BMR LOV");
        }
      };
      findBMRLov();
    }
    if (qaFrequency.department !== "" && (formName == "summary_traceability" || formName == "batch_release_checklist")) {
      const findBMRLov = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Engineering/getProductionDetails?department=${qaFrequency.department}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = Array.from(
            new Set(
              response.data
                .filter((option) => option !== "" && option !== null)
            )
          ).map((option) => ({
            value: option,
            label: option,
          }));
          setQAParamLov((prevState) => ({
            ...prevState,
            bmrLov: options
          }));
        } catch (error) {
          // message.error("Error Occurs On QA BMR LOV");
        }
      };
      findBMRLov();
    }
    if (qaFrequency.dept !== "" && qaFrequency.bmrNO !== "") {
      const findPOrderLov = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/api/pOderLov?department=${qaFrequency.dept}&batchNo=${qaFrequency.bmrNO}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data
            .filter((option) => option !== "")
            .map((option) => ({
              value: option,
              label: option,
            }));
          setQAParamLov((prevState) => ({
            ...prevState,
            porderLov: options,
          }));
        } catch (error) {
          // message.error("Error Occurs On QA POrder Lov ");
        }
      };
      findPOrderLov();
    }
    if ((formName == "online_inspection_report_balls" || formName == "online_inspection_report_pads" || formName == "online_inspection_report_buds") && qaFrequency.department !== "") {
      const findBmr = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/api/bmrLov?department=${qaFrequency.department}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data
            .filter((option) => option !== "" && option !== null)
            .map((option) => ({
              value: option,
              label: option,
            }));
          setQAParamLov((prevState) => ({
            ...prevState,
            bmrLov: options,
          }));
        } catch (error) {
          // message.error("Error Occurs On QA POrder Lov ");
        }
      };
      findBmr();
      if (qaFrequency.bmrNO !== "") {
        const findPOrder = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/QA/Service/api/pOderLov?department=${qaFrequency.department}&batchNo=${qaFrequency.bmrNO}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const options = response.data
              .filter((option) => option !== "" && option !== null)
              .map((option) => ({
                value: option,
                label: option,
              }));
            setQAParamLov((prevState) => ({
              ...prevState,
              porderLov: options,
            }));
          } catch (error) {
            // message.error("Error Occurs On QA POrder Lov ");
          }
        };
        findPOrder();
      }
    }

  }, [qaFrequency.dept, qaFrequency.bmrNO, qaFrequency.department]);

  useEffect(() => {
    setQAParamLov((prevState) => ({
      ...prevState,
      porderLov: [],
      bmrLov: [],
    }));
    setQAFrequency((prevState) => ({
      ...prevState,
      bmrNO: "",
      porder: "",
      shift: "",
    }));
  }, [qaFrequency.dept, formName]);

  useEffect(() => {
    setQAParamLov((prevState) => ({
      ...prevState,
      porderLov: [],
      bmrLov: [],
    }));
    setQAFrequency((prevState) => ({
      ...prevState,
      dept: "",
      bmrNO: "",
      porder: "",
      shift: "",
      supplierName: "",
      invoiceNo: "",
    }));
  }, [qaFrequency.formatNo]);

  const convertDateFormat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    if (startDate !== "" && formName == "inward_inspection_report") {
      setQAParamLov((prevState) => ({
        ...prevState,
        supplierLov: [],
        invoiceLov: [],
      }));
      setQAFrequency((prevState) => ({
        ...prevState,
        supplierName: "",
        invoiceNo: "",
      }));
      const inwardDate = convertDateFormat(startDate);
      const findSupplierLov = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/qa/inwardPde/details?grDate=${inwardDate}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.suppliers
            .filter((option) => option !== "" && option !== null)
            .map((option) => ({
              value: option,
              label: option,
            }));

          setQAParamLov((prevState) => ({
            ...prevState,
            supplierLov: options,
          }));
        } catch (error) {
          // message.error("Error Occurs On QA POrder Lov ");
        }
      };
      findSupplierLov();
    }
  }, [startDate]);

  useEffect(() => {
    if (startDate !== "" && qaFrequency.supplierName !== "") {
      const inwardDate = convertDateFormat(startDate);
      const findInvoiceLov = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/qa/inwardPde/details?grDate=${inwardDate}&supplier=${qaFrequency.supplierName}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const options = response.data.invoices
            .filter((option) => option !== "" && option !== null)
            .map((option) => ({
              value: option,
              label: option,
            }));
          setQAParamLov((prevState) => ({
            ...prevState,
            invoiceLov: options,
          }));
        } catch (error) {
          // message.error("Error Occurs On QA POrder Lov ");
        }
      };
      findInvoiceLov();
    }
  }, [qaFrequency.supplierName]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    let years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ value: year, label: year.toString() });
    }

    const formatNoLovI = [
      { value: "PH-HRD01/F-014", label: "PH-HRD01/F-014" },
      { value: "PH-HRD01/F-015", label: "PH-HRD01/F-015" },
      { value: "PH-HRD01/F-016", label: "PH-HRD01/F-016" },
      { value: "PH-HRD01/F-017", label: "PH-HRD01/F-017" },
      { value: "PH-HRD01/F-018", label: "PH-HRD01/F-018" },
      { value: "PH-HRD01/F-019", label: "PH-HRD01/F-019" },
    ];
    const formatNoLovII = [
      { value: "PH-QAD01/F-029", label: "PH-QAD01/F-029" },
      { value: "PH-QAD01/F-030", label: "PH-QAD01/F-030" },
      { value: "PH-QAD01/F-031", label: "PH-QAD01/F-031" },
      { value: "PH-QAD01/F-032", label: "PH-QAD01/F-032" },
      { value: "PH-QAD01/F-033", label: "PH-QAD01/F-033" },
    ];
    const formatNoLovIII = [
      { value: "PH-QAD01/F-034", label: "PH-QAD01/F-034" },
      { value: "PH-QAD01/F-035", label: "PH-QAD01/F-035" },
      { value: "PH-QAD01/F-036", label: "PH-QAD01/F-036" },
    ];
    const shiftTypeI = [
      { value: "I", label: "I" },
      { value: "II", label: "II" },
      { value: "III", label: "III" },
    ];
    function generateYearRanges(startYear, endYear) {
      const yearRanges = [];
      for (let year = startYear; year < endYear; year++) {
        yearRanges.push({ key: `${year}-${year + 1}`, value: `${year}-${year + 1}` });
      }
      return yearRanges;
    }

    const yearOptions = generateYearRanges(2024, 2100);

    const yearLovII = yearOptions.map((option) => ({
      value: option.value,
      label: option.value,
    }));

    const departmantLOV = [
      { value: "Bleaching", label: "Bleaching" },
      { value: "Spunlace", label: "Spunlace" },
      { value: "Pad Punching", label: "Pad Punching" },
      { value: "Dry Goods", label: "Dry Goods" },
      { value: "Cotton Buds", label: "Cotton Buds" },
    ];
    const departmantLOV2 = [
      { value: "Bleaching", label: "Bleaching" },
      { value: "Spunlace", label: "Spunlace" },
      { value: "Pad_Punching", label: "Pad_Punching" },
      { value: "Dry_Goods", label: "Dry_Goods" },
    ];
    switch (formName) {
      case "customer_complaint_register_form":
      case "management_of_incidence":
      case "internal_audit_schedule":
      case "non_conformity_report":
      case "minutes_of_mrm":
      case "agenda_for_management_review_meeting":
      case "request_and_issuance_of_document":
      case "distribution_and_destruction_record":
      case "internal_audit_report":
        setQAParamLov((prevState) => ({
          ...prevState,
          monthLov: monthTypeI,
          yearLov: years,
        }));
        break;
      case "pest_controller":
        setQAParamLov((prevState) => ({
          ...prevState,
          formatNoLov: formatNoLovI,
        }));
        break;
      case "inward_inspection_report":
        setQAParamLov((prevState) => ({
          ...prevState,
          formatNoLov: formatNoLovII,
        }));
        break;
      case "online_inspection_report":
        setQAParamLov((prevState) => ({
          ...prevState,
          formatNoLov: formatNoLovIII,
          shiftLov: shiftTypeI,
        }));
        break;
      case "internal_audit_nc_report":
      case "supplier_audit_plan":
      case "training_calender":
        setQAParamLov((prevState) => ({
          ...prevState,
          yearLov: years,
        }));
        break;
      case "annual_plan":
        setQAParamLov((prevState) => ({
          ...prevState,
          yearLov: yearLovII,
        }));
        break;
      case "final_inspection_report":
        setQAParamLov((prevState) => ({
          ...prevState,
          shiftLov: shiftTypeI,
        }));
        break;
      case "list_of_glass_hard_plastic_wood_ceramic":
      case "training_questionnaire":
      case "deviation_form":
        setQAParamLov((prevState) => ({
          ...prevState,
          monthLov: monthTypeI,
          yearLov: years,
        }));
        break;
      case "control_of_glass_hard_plastic_wood_ceramic":
      case "minutes_of_meeting_mock_recall":
        setQAParamLov((prevState) => ({
          ...prevState,
          monthLov: monthTypeII,
          yearLov: years,
        }));
        break;
      case "bmr_issue_register":
        setQAParamLov((prevState) => ({
          ...prevState,
          deptLov: departmantLOV,
        }));

        break;
      case "training_need_identification_form":
        setQAParamLov((prevState) => ({
          ...prevState,
          deptLov: departments,
          yearLov: years,
        }));
        break;
      case "summary_traceability":
      case "batch_release_checklist":
        setQAParamLov((prevState) => ({
          ...prevState,
          deptLov: departmantLOV2
        }));
      case "online_inspection_report_pads":
      case "online_inspection_report_balls":
      case "online_inspection_report_buds":
        setQAParamLov((prevState) => ({
          ...prevState,
          shiftLov: shiftTypeI
        }));
        break;
    }
  }, [formName, department]);

  //-----------------------------------------------------

  // ------------- Cotton Buds Lov ----------------------------

  useEffect(() => {
    if (department == 12) {

    }
  }, [formName, department])




  //-----------------------------------------------------------

  const handleFrequencyChange = async (value) => {
    setSelectedFrequency(value);
    setSubbatch("");
    setBaleOptions([]);

    // Log the selected frequency and form frequencies for debugging

    // Define criteria based on form name
    const getFrequencyCriteria = (formName, value) => {
      switch (formName) {
        case "Contamination Checking Report (Absorbent Bleached Cotton)":
          return (freq) => {
            // Ensure you're checking against bleach_bmr_no
            return (
              freq.bleach_bmr_no?.trim().toLowerCase() ===
              value.trim().toLowerCase()
            );
          };
        case "RE-PROCESSING REPORT":
          return (freq) => {

            // Ensure you're checking against bleach_bmr_no
            return freq.bleach_bmr_no?.trim().toLowerCase() === value.trim().toLowerCase();
          };
        case "Equipment Usage Log Book – Cake Press":
        case "Bleaching Job Card":
        case "Equipment Usage Log Book – Hydro Extractor":
          return (freq) => {
            return (
              freq.bmr_no?.trim().toLowerCase() === value.trim().toLowerCase()
            );
          };
        default:
          return () => false;
      }
    };

    const selectedFrequencyObj = formFrequencies.find(
      getFrequencyCriteria(formName, value)
    );

    const bmr_no =
      selectedFrequencyObj?.bleach_bmr_no || selectedFrequencyObj?.bmr_no;

    if (bmr_no) {
      try {
        const token = localStorage.getItem("token");
        let response;

        switch (formName) {
          case "Equipment Usage Log Book – Cake Press":
          case "Bleaching Job Card":
          case "Equipment Usage Log Book – Hydro Extractor":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/bleaching/summary/batchByBleach?bmr_no=${bmr_no}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            break;

          case "Contamination Checking Report (Absorbent Bleached Cotton)":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/bleaching/generation/fetchBatchByBMR?bmr_no=${bmr_no}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            break;

          case "RE-PROCESSING REPORT":

            response = await axios.get(
              `${API.prodUrl}/Precot/api/bleaching/generation/fetchBatchByBMR?bmr_no=${bmr_no}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            break;


          default:
            console.warn("No matching form name for API call.");
            break;
        }

        if (response) {
          setSubBatchOptions(response.data);
        }
      } catch (error) {
        console.error("Error fetching sub batch options:", error);
      }
    } else {
      console.warn("No BMR number extracted.");
    }
  };

  const handleSubBatchChange = async (value) => {
    setSubbatch(value);
    setBaleOptions([]);

    // Extract batchNo from the selected sub batch
    const selectedSubBatchObj = subBatchOptions.find(
      (batch) => batch.value === value
    );
    const batchNo = selectedSubBatchObj?.value;

    if (batchNo) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/fetchBaleByBatch?batchNo=${batchNo}&bmr_no=${selectedFrequency}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBaleOptions(response.data);
      } catch (error) {
        console.error("Error fetching bale options:", error);
      }
    }
  };

  const handleDateRangeChange = (value, type) => {
    if (type === "start") {
      setStartDate(value);
      if (endDate && new Date(value) > new Date(endDate)) {
        setEndDate("");
        setValidationMessage("End date cannot be before the start date.");
      } else {
        setValidationMessage("");
      }
    } else {
      if (new Date(value) < new Date(startDate)) {
        setEndDate("");
        setValidationMessage("End date cannot be before the start date.");
      } else {
        setEndDate(value);
        setValidationMessage("");
      }
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (department == 1) {
      setLoading(true);

      const validateParams = () => {
        const isDateRangeComplete = startDate && endDate;
        const isFrequencyOnly = selectedFrequency && !startDate && !endDate;

        // Check if only start date or end date is selected
        if (startDate && !endDate) {
          setError("Please select an end date.");
          return false;
        } else if (!startDate && endDate) {
          setError("Please select a start date.");
          return false;
        } else {
          setError(""); // Clear error if both dates are selected
        }

        switch (formName) {
          case "Laydown Checklist":
            return isFrequencyOnly || isDateRangeComplete;
          case "Metal Detector Checklist":
            return selectSection || isDateRangeComplete;
          case "Applied Contamination Report (Raw Cotton)":
            return isFrequencyOnly || isDateRangeComplete;
          case "Contamination Checking Report (Raw Cotton)":
            return isFrequencyOnly || isDateRangeComplete;
          case "Equipment Usage Log Book – Blow room and Carding":
            return isFrequencyOnly || isDateRangeComplete;
          case "Equipment Usage Log Book – Cake Press":
            return (selectedFrequency && Subbatch) || isDateRangeComplete;
          case "Bleaching Job Card":
            return (selectedFrequency && Subbatch) || isDateRangeComplete;
          case "Equipment Usage Log Book – Hydro Extractor":
            return (selectedFrequency && Subbatch) || isDateRangeComplete;
          case "Sanitization of machines and surfaces":
            return (year && month && week) || isDateRangeComplete;
          case "Bleaching Hand Sanitization Report":
            return isFrequencyOnly || isDateRangeComplete;
          case "Shift Log Book":
            return isFrequencyOnly || isDateRangeComplete;
          case "Mixing Change Over and Machine Cleaning Checklist":
            return (
              (selectedFrequency1 && selectedFrequency2) || isDateRangeComplete
            );
          case "Equipment Usage Log Book - Waste Bale Press":
            return isDateRangeComplete;
          case "House Keeping Cleaning Checklist (Bleaching and AB Cotton Godown)":
            return isFrequencyOnly || isDateRangeComplete;
          case "House Keeping Cleaning Checklist (Blow room, Carding & Waste Bale Press)":
            return isDateRangeComplete;
          case "Contamination Checking Report (Absorbent Bleached Cotton)":
            return (
              (selectedFrequency && Subbatch && bale) || isDateRangeComplete
            );
          case "RE-PROCESSING REPORT":
            return (selectedFrequency && Subbatch) || isDateRangeComplete;
          case "Applied Contamination Report (AB Cotton)":
            return isFrequencyOnly || isDateRangeComplete;
          default:
            return false;
        }
      };
      // Check if the required parameters are provided
      if (!validateParams()) {
        message.error("Please fill all required fields.");
        setLoading(false);
        return;
      }

      try {
        let response;

        switch (formName) {
          case "Laydown Checklist":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/laydownChecklist`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  laydownNumber: selectedFrequency,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "Metal Detector Checklist":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/MetalDetectorF03`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  section: selectSection,
                  start: formattedStartDate,
                  end: formattedEndDate,
                },
              }
            );
            break;

          case "Applied Contamination Report (Raw Cotton)":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/RawCottonF04`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  bmr: selectedFrequency,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "Contamination Checking Report (Raw Cotton)":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/RawCottonF05`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  phNo: selectedFrequency,
                  start: formattedStartDate,
                  end: formattedEndDate,
                  // start: startDate,
                  // end: endDate,
                },
              }
            );
            break;
          case "Equipment Usage Log Book – Blow room and Carding":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/BlowroomAndCardingF34`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  bmr: selectedFrequency,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "Equipment Usage Log Book – Cake Press":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/CakePressF09`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  bmr: selectedFrequency,
                  subBatchNo: Subbatch,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "Bleaching Job Card":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/BleachJobcardF13`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  bmr: selectedFrequency,
                  subBatchNo: Subbatch,
                  start: startDate,
                  end: endDate,
                  // start: formattedStartDate,
                  // end: formattedEndDate,
                },
              }
            );
            break;
          case "Equipment Usage Log Book – Hydro Extractor":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/EquipmentF11`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  bmr: selectedFrequency,
                  subBatchNo: Subbatch,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "Sanitization of machines and surfaces":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/SanitizationF01`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  year: year,
                  month: month,
                  week: week,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "Bleaching Hand Sanitization Report":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/handSanitizationF41`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  shift: selectedFrequency,
                  from_date: startDate,
                  to_date: endDate,
                },
              }
            );
            break;
          case "Shift Log Book":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/ShiftLogBookF36`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  shift: selectedFrequency,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "Mixing Change Over and Machine Cleaning Checklist":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/MachineCleaningF38`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  bmrFrom: selectedFrequency1,
                  bmrTo: selectedFrequency2,
                  start: formattedStartDate,
                  end: formattedEndDate,
                  //     start: startDate,
                  // end: endDate,
                },
              }
            );
            break;
          case "Equipment Usage Log Book - Waste Bale Press":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/EquipmentUsageF33`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  // start: formattedStartDate,
                  // end: formattedEndDate,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "House Keeping Cleaning Checklist (Bleaching and AB Cotton Godown)":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/HouseKeepingF02`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  bmr: selectedFrequency,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "House Keeping Cleaning Checklist (Blow room, Carding & Waste Bale Press)":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/HouseKeepingF02A`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;
          case "Contamination Checking Report (Absorbent Bleached Cotton)":
            response = await axios.get(
              `${API.prodUrl}/Precot/api/Bleaching/audit/bleachConstAbsF18`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  bmr: selectedFrequency,
                  batchNo: Subbatch,
                  baleNo: bale,
                  start: startDate,
                  end: endDate,
                  // start: formattedStartDate,
                  // end: formattedEndDate,
                },
              }
            );
            break;
          case 'RE-PROCESSING REPORT':
            try {
              const response = await axios.post(
                `${API.prodUrl}/Precot/api/bleaching/Service/downloadExcel`,
                {
                  department: "Bleaching",
                  formName: "reprocess",
                  bmr: selectedFrequency,
                  batchNo: Subbatch,
                  start: startDate,
                  end: endDate,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  responseType: 'blob', // This is necessary for file downloads
                }
              );
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `${formName.replace(/\s+/g, '_')}_${selectedFrequency || ''}.xlsx`);
              document.body.appendChild(link);
              link.click();
              link.remove();

              if (response.status == 200 || response.status == 201) {
                message.success('File downloaded successfully.');
              }
            }
            catch (error) {
              if (error) {
                // const errorBlob = error.response.data;
                const reader = new FileReader();

                reader.onloadend = () => {
                  // const errorText = reader.result;
                  try {
                    // const errorData = JSON.parse(errorText);
                    // message.error(errorData.message);
                  } catch (parseError) {
                    // message.error('Error downloading file: ' + errorText);
                  }
                };
                // reader.readAsText(errorBlob);
              }
            }

            break;
          case "Applied Contamination Report (AB Cotton)":
            response = await axios.post(
              `${API.prodUrl}/Precot/api/Bleaching/audit/ABCottonF08`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
                params: {
                  bmr: selectedFrequency,
                  start: startDate,
                  end: endDate,
                },
              }
            );
            break;

          // Add other cases for different forms
          default:
            message.error("Invalid form name.");
            setLoading(false);
            return;
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        message.success("File downloaded successfully.");
      } catch (error) {
        if (error.response) {
          // Convert the Blob response to text
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              // Attempt to parse the error text as JSON
              const errorData = JSON.parse(errorText);

              // Display the backend message if available
              message.error(errorData.message);
            } catch (parseError) {
              // If parsing fails, display the raw error text
              message.error("Error downloading file: " + errorText);
            }
          };

          // Read the Blob as text
          reader.readAsText(errorBlob);
        } else {
          // If there's no response from the server
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      } finally {
        setLoading(false);
      }
    }
    // --------------------------------- > Spunlace Submit Api -------------------------------
    else if (department == 2) {
      // ------------- Switch Case to Check Field Validation ---------------------------------
      switch (formName) {
        case "Daily Stoppage Report - Spunlace":
        case "Logbook - Spunlace Planning":
        case "Shift Wise Stoppage Report Of Sliter Winder":
        case "RP Bale Press Stoppage Report":
          if (startDate == "" || endDate == "") {
            message.warning("Please Select Required Date Fields");
            return "";
          }
          break;
      }
      let payload = {
        department: "SPUNLACE",
        from_name: formName,
        from_date: startDate,
        to_date: endDate,
      };
      // ------------------------- Switch Case to Set Api Param ----------------------------
      switch (formName) {
        case "Bale Consumption Report":
          payload = {
            ...payload,
            f01_shift: spFrequency.shift,
            f01_order_no: spFrequency.orderNo,
          };
          break;
        case "Process Setup Verification Opening Line":
          payload = {
            ...payload,
            f02_shift: spFrequency.shift,
            f02_order_no: spFrequency.orderNo,
          };
          break;
        case "Process Setup Details Jetlace & Dryer":
          payload = {
            ...payload,
            f03_shift: spFrequency.shift,
            f03_order_no: spFrequency.orderNo,
          };
          break;
        case "Process Setup Details - Winder":
          payload = {
            ...payload,
            f05_shift: spFrequency.shift,
            f05_order_no: spFrequency.orderNo,
          };
          break;
        case "Daily Production Report - Spunlace":
          payload = {
            ...payload,
            f06_shift: spFrequency.shift,
            f06_order_no: spFrequency.orderNo,
          };
          break;
        case "Daily Rejection Report - Spunlace":
          payload = {
            ...payload,
            f07_shift: spFrequency.shift,
            f07_order_no: spFrequency.orderNo,
          };
          break;
        case "Spunlace GSM Analysis Report":
          payload = {
            ...payload,
            f09_shift: spFrequency.shift,
            f09_order_no: spFrequency.orderNo,
          };
          break;
        case "Product Change Over Check List Spunlace":
          payload = {
            ...payload,
            f011_shift: spFrequency.shift,
            f011_order_no: spFrequency.orderNo,
          };
          break;
        case "Shift Wise Sliter Winder Production Report":
          payload = {
            ...payload,
            f017_shift: spFrequency.shift,
            f017_order_no: spFrequency.orderNo,
          };
          break;
        case "Process Setup Verification Sliter Winder":
          payload = {
            ...payload,
            f016_shift: spFrequency.shift,
            f016_order_no: spFrequency.orderNo,
          };
          break;
        case "Shift wise RP Production Report":
          payload = {
            ...payload,
            f014_shift: spFrequency.shift,
            f014_order_no: spFrequency.orderNo,
          };
          break;
        case "Process Setup Verification - RP Bale Press":
          payload = {
            ...payload,
            f013_shift: spFrequency.shift,
            f013_order_no: spFrequency.orderNo,
          };
          break;
        case "Sample Report - Spunlace":
          payload = {
            ...payload,
            f012_shift: spFrequency.shift,
            f012_order_no: spFrequency.orderNo,
          };
          break;
        case "Filter Bag Consumption Details":
          payload = {
            ...payload,
            f04_shift: spFrequency.shift,
          };
          break;
        case "Spunlace Hand Sanitization Report":
          payload = {
            ...payload,
            f025_shift: spFrequency.shift,
          };
          break;
        case "Shift Wise Cotton Waste Report Of Spunlace":
          payload = {
            ...payload,
            f019_shift: spFrequency.shift,
          };
          break;
        case "Metal Detector Check List":
          payload = {
            ...payload,
            f020_month: spFrequency.month,
            f020_year: spFrequency.year,
          };
          break;
        case "Machine Cleaning Record (Weekly)":
          payload = {
            ...payload,
            f023_month: spFrequency.month,
            f023_year: spFrequency.year,
          };
          break;
        case "Sanitization Of Machines & Surfaces":
          payload = {
            ...payload,
            f024_month: spFrequency.month,
            f024_year: spFrequency.year,
            f024_week: spFrequency.week,
          };
          break;
        default:
          payload = payload;
          break;
      }

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/Spunlace/audit/getAuditSummary`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status == 200 || response.status == 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response) {
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              const errorData = JSON.parse(errorText);
              message.error(errorData.message);
            } catch (parseError) {
              message.error("Error downloading file: " + errorText);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }
    }

    // --------------------------------- > PadPunching Submit Api -------------------------------
    else if (department == 3) {
      // ------------- Switch Case to Check Field Validation ---------------------------------
      switch (formName) {
        case "Argus Metal Detector - Check List":
        case "House Keeping Cleaning Check List PH_HRD01_F006":
        case "House Keeping Cleaning Check List PH_HRD01_F010":
          if (startDate == "" || endDate == "") {
            message.warning("Please Select Required Date Fields");
            return "";
          }
          break;
      }
      let payload = {
        department: "PAD_PUNCHING",
        form_name: formName,
        from_date: startDate,
        to_date: endDate,
      };
      // ------------------------- Switch Case to Set Api Param ----------------------------
      switch (formName) {
        case "Production Details - Log Book":
          payload = {
            ...payload,
            f01_shift: spFrequency.shift,
          };
          break;
        case "Daily Roll Consumption Report - Pad Punching":
          payload = {
            ...payload,
            f02_shift: spFrequency.shift,
            f02_machine_name: spFrequency.machineName,
          };
          break;
        case "Product Change Over":
          payload = {
            ...payload,
            f03_shift: spFrequency.shift,
            f03_machine_name: spFrequency.machineName,
          };
          break;
        case "Daily Production Packing Details":
          payload = {
            ...payload,
            f04_shift: spFrequency.shift,
          };
          break;

        case "Machine Cleaning Check List":
          payload = {
            ...payload,
            f05_shift: spFrequency.shift,
            f05_machine_name: spFrequency.machineName,
          };
          break;
        case "Hand Sanitization Report":
          payload = {
            ...payload,
            f06_shift: spFrequency.shift,
          };
          break;
        case "Sanitization Of Machines & Surfaces":
          payload = {
            ...payload,
            machine: spFrequency.machineName,
            week: spFrequency.week,
            month: spFrequency.month,
            year: spFrequency.year,
          };
        case "Log Book - Bag Making":
          payload = {
            ...payload,
            shift: spFrequency.shift,
            machine: spFrequency.machineName,
          };
          break;
        case "Bag Making Daily Production Details":
          payload = {
            ...payload,
            shift: spFrequency.shift,
          };
          break;
        case "Bag Making - Specification Details":
          payload = {
            ...payload,
            f14_shift: spFrequency.shift,
            f14_machine_name: spFrequency.machineName,
            f14_product_name: "",
          };
          break;

        default:
          payload = payload;
          break;
      }

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/padpunching/audit/getAuditSummary`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status == 200 || response.status == 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response) {
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              const errorData = JSON.parse(errorText);
              message.error(errorData.message);
            } catch (parseError) {
              message.error("Error downloading file: " + errorText);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }
    }
    // ------------------------- Dry Goods Submit Api -------------------------
    else if (department == 4) {
      // switch (formName) {
      //   case 'Bale Consumption Report':
      //   case 'Daily Production - Cotton Balls':
      //   case 'Daily Production (Pleat / Wool Roll)':
      //   case 'Ball Pleat & Wool Roll Finished Goods Transfer Record':
      //     if (startDate == '' || endDate == '') {
      //       message.warning("Please Select Required Date Fields")
      //       return '';
      //     }
      //     break;
      // }
      let payload = {
        department: "DRY_GOODS",
        form_name: formName,
        from_date: startDate,
        to_date: endDate,
      };
      // ------------------------- Switch Case to Set Api Param ----------------------------
      switch (formName) {
        case "Bale Consumption Report":
          payload = {
            ...payload,
            f01_shift: dgFrequency.shift,
            f01_laydown_no: dgFrequency.laydownNo,
          };
          break;
        case "Daily Production - Sliver Making":
          payload = {
            ...payload,
            f02_shift: dgFrequency.shift,
            f02_machine_name: dgFrequency.machineName,
          };
          break;
        case "Daily Production - Cotton Balls":
          payload = {
            ...payload,
            f03_shift: dgFrequency.shift,
            f03_machine_name: dgFrequency.machineName,
          };
          break;
        case "Production Report - Mini Roll":
          payload = {
            ...payload,
            f05_shift: dgFrequency.shift,
          };
          break;
        case "Daily Production (Pleat / Wool Roll)":
          payload = {
            ...payload,
            f06_shift: dgFrequency.shift,
            f06_machine_name: dgFrequency.machineName,
          };
          break;
        case "Product Change Over - Dry Goods":
          payload = {
            ...payload,
            f09_machineName: dgFrequency.machineName,
            f09_orderNo1: dgFrequency.orderNo,
          };
          break;
        case "Ball Pleat & Wool Roll Finished Goods Transfer Record":
          payload = {
            ...payload,
            f11_shift: dgFrequency.shift,
          };
          break;
        case "Log Book - Dry Goods":
          payload = {
            ...payload,
            f10_shift: dgFrequency.shift,
          };
          break;
        case "Sanitization Of Machines & Surfaces - Dry Goods":
          payload = {
            ...payload,
            f12_year: dgFrequency.year,
            f12_month: dgFrequency.month,
            f12_week: dgFrequency.week,
          };
          break;
        case "Hand Sanitization Report - Dry Goods":
          payload = {
            ...payload,
            f13_shift: dgFrequency.shift,
          };
          break;

        default:
          payload = payload;
          break;
      }

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/Drygoods/audit/getAuditSummary`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status == 200 || response.status == 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response) {
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              const errorData = JSON.parse(errorText);
              message.error(errorData.message);
            } catch (parseError) {
              message.error("Error downloading file: " + errorText);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }
    }

    //-----------------------------------------------------------------------------
    else if (department == 7) {
      switch (formName) {
        case "Monthly plan Summary Details":
          if (startDate == "" || endDate == "") {
            message.warning("Please Select Required Date Fields");
            return "";
          }
          break;
      }
      let payload = {
        department: "PPC",
        form_name: formName,
        from_date: startDate,
        to_date: endDate,
      };
      // ------------------------- Switch Case to Set Api Param ----------------------------
      switch (formName) {
        case "Monthly plan Summary Details":
          payload = {
            ...payload,
          };
          break;

        default:
          payload = payload;
          break;
      }

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/Ppc/getAuditSummary`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status == 200 || response.status == 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response) {
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              const errorData = JSON.parse(errorText);
              message.error(errorData.message);
            } catch (parseError) {
              message.error("Error downloading file: " + errorText);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }
    } else if (department == 8) {
      let payload = {
        department: "STORE",
        form_name: formName,
        from_date: startDate,
        to_date: endDate,
      };
      // ------------------------- Switch Case to Set Api Param ----------------------------
      switch (formName) {
        case "Reception CheckList":
          payload = {
            ...payload,
            InvoiceNo: storesFrequency.invoiceNo || null,
            description: storesFrequency.description || null,
          };
          break;
        case "Non Returnable Gate Pass":
          payload = {
            ...payload,
            gatePassNo: storesFrequency.gatePassNo,
          };
          break;
        case "Fork Lift Movement CheckList":
          payload = {
            ...payload,
            forkliftNo: storesFrequency.forkLiftNo,
          };
          break;
        case "Eye Wash with shower Working Condition CheckList(Chemical Store)":
          payload = {
            ...payload,
          };
          break;

        default:
          payload = payload;
          break;
      }

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/Store/Audit/getStoreAuditSummary`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status == 200 || response.status == 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response) {
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              const errorData = JSON.parse(errorText);
              message.error(errorData.message);
            } catch (parseError) {
              message.error("Error downloading file: " + errorText);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }
    }
    // ------------------------- Development Submit Api ----------------------------
    else if (department == 10) {
      switch (formName) {
        case "PRODUCT DEVELOPMENT SHEET":
          if (startDate == "" || endDate == "") {
            message.warning("Please Select Required Date Fields");
            return "";
          }
          break;
      }
      let payload = {
        department: "PRODUCT_DEVELOPMENT",
        form_name: formName,
        from_date: startDate,
        to_date: endDate,
        pdsNo: pdsNo,
      };
      // ------------------------- Switch Case to Set Api Param ----------------------------
      switch (formName) {
        case "PRODUCT DEVELOPMENT SHEET":
          payload = {
            ...payload,
          };
          break;

        default:
          payload = payload;
          break;
      }

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/ProductDevelopment/getProductDevelopmentAudit`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status == 200 || response.status == 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response) {
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              const errorData = JSON.parse(errorText);
              message.error(errorData.message);
            } catch (parseError) {
              message.error("Error downloading file: " + errorText);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }
    }
    // ------------------------- Engineering Submit Api ----------------------------
    else if (department == 11) {
      let payload = {
        department: "ENGINEERING",
        form_name: formName,
        from_date: startDate,
        to_date: endDate,
      };
      // ------------------------- Switch Case to Set Api Param ----------------------------
      switch (formName) {
        case "Breakdown Intimation Slip":
          payload = {
            ...payload,
            bisNo: engineeringFrequency.bisNo || null,
          };
          break;
        case "Root Cause Analysis":
          payload = {
            ...payload,
            rcaNo: engineeringFrequency.RcaNo,
          };
          break;
        case "Work Order Request Form":
          payload = {
            ...payload,
            worNo: engineeringFrequency.worNo,
          };
          break;
        case "Weighing Scales Calibration Record":
          payload = {
            ...payload,
            machineIdNo: engineeringFrequency.machineIdNo,
          };
          break;

        default:
          payload = payload;
          break;
      }

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/Engineering/Audit/getengineeringAuditSummary`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status == 200 || response.status == 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response) {
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              const errorData = JSON.parse(errorText);
              message.error(errorData.message);
            } catch (parseError) {
              message.error("Error downloading file: " + errorText);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }
    }
    // -------------------------- QC Submit Api ----------------------
    else if (department == 5) {
      let payload = {
        department: "QC",
        form_name: formName,
        from_date: startDate,
        to_date: endDate,
      };

      // ---------------------- Switch case to set QC Params ---------------

      switch (formName) {
        case "COA FOR AB COTTON": // form 41
        case "COA FOR COTTON PADS": // form 42
        case "COA FOR COTTON BALLS": // form 43
        case "COA FOR COTTON WOOL ROLL": // form 44
        case "COA FOR COTTON WOOL PLEAT": // form 45
        case "COA FOR COTTON ROLL GOODS": // form 46
        case "COA FOR INFUSED COTTON PADS": // form 47
        case "COA FOR MOISTURE CONTENT (%)":
          payload = {
            ...payload,
            product: qcFrequency.product,
            customer: qcFrequency.customer,
          };
          break;
        case "DIGITAL COLONY COUNTER CALIBRATION REPORT":
          payload = {
            ...payload,
            month: qcFrequency.month,
            year: qcFrequency.year,
            eq_id: qcFrequency.eqId,
          };
          break;
        case "STANDARIZATION OF CHEMICAL SOLUTION":
          payload = {
            ...payload,
            chemical: qcFrequency.chemical,
            shift: qcFrequency.shift,
          };
          break;
        case "RAW COTTON ANALYSIS REPORT":
          payload = {
            ...payload,
            millBatchNo: qcFrequency.millBatch,
          };
          break;
        case "CHEMICAL ANALYSIS REPORT":
          payload = {
            ...payload,
            materialDocNo: qcFrequency.materialDoc,
          };
          break;
        case "ABSORBENT BLEACHED COTTON ANALYSIS REPORT":
        case "EXFOLIATING FABRIC ANALYSIS REPORT":
        case "FINISHED PRODUCT ANALYSIS REPORT":
        case "NON-WOVEN FLEECE ANALYSIS REPORT":
        case "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT":
        case "WEIGHING SCALE CALIBRATION REPORT":
        case "FUNGAL INCUBATOR TEMPERATURE VERIFICATION REPORT":
          payload = {
            ...payload,
            subbatch: qcFrequency.subBatchNo,
          };
          break;
        case "BACTERIAL INCUBATOR TEMPRATURE CALIBRATION REPORT":
        case "VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR":
          payload = {
            ...payload,
            eqIdNo: qcFrequency.subBatchNo,
          };
          break;
        case "pH-METER CALIBRATION REPORT":
          payload = {
            ...payload,
            eqIdNo: qcFrequency.subBatchNo,
          };
          break;
        case "RAW COTTON CONSOLIDATED ANALYTICAL REPORT":
          payload = {
            ...payload,
            bleachingBmrNo: qcFrequency.subBatchNo,
          };
          break;
        case "BRIQUETTES ANALYSIS REPORT":
          payload = {
            ...payload,
            subbatch: qcFrequency.subBatchNo,
            eq_id: qcFrequency.eqId,
          };
          break;
        case "TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB":
        case "MICROBIOLOGICAL ANALYSIS REPORT MISCELLANEOUS":
          payload = {
            ...payload,
            subbatch: qcFrequency.subBatchNo,
            eq_id: "",
          };
          break;
        case "PHYSICAL AND CHEMICAL LAB SAMPLE INWARD BOOK":
        case "MICROBIOLOGY LAB SAMPLE INWARD BOOK":
        case "ETP LAB SAMPLE INWARD BOOK":
          payload = {
            ...payload,
            shift: qcFrequency.shift,
          };
          break;
        case "WIRA FIBER FINENESS TESTER CALIBRATION REPORT":
        case "REAGENT PREPARATION RECORD":
        case "MEDIA GROWTH PROMOTION TEST REPORT":
          payload = {
            ...payload,
            month: qcFrequency.month,
            year: qcFrequency.year,
          };
          break;
        case "SPECTROPHOTOMETR CM-3600A Calibration Report":
          payload = {
            ...payload,
            subbatch: qcFrequency.month,
            eq_id: qcFrequency.year,
          };
          break;
        case "VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR":
          payload = {
            ...payload,
            month: qcFrequency.month,
            year: qcFrequency.year,
            eq_id: qcFrequency.subBatchNo,
          };
          break;
        case "FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT":
        case "HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT":
        case "MACHINE SWAB - MICROBIOLOGICAL ANALYSIS REPORT":
        case "DISTILLED WATER ANALYSIS REPORT":
        case "TDS-METER CALIBRATION REPORT":
        case "SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA":
        case "FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR":
        case "POTABLE WATER ANALYSIS REPORT":
        case "WATER ANALYSIS REPORT":
        case "TURBIDITY CALIBRATION REPORT":
        case "MEDIA DISPOSAL RECORD":
        case "Disposal Record - Chemical Media":
        case "MEDIA PREPARATION & CONSUMPTION RECORD":
        case "REQUISITION SAMPLE ANALYSIS REPOR":
          payload = payload;
          break;
      }

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/Qc/audit/getAuditSummary`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status == 200 || response.status == 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response) {
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              const errorData = JSON.parse(errorText);
              message.error(errorData.message);
            } catch (parseError) {
              message.error("Error downloading file: " + errorText);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }
    }
    // -------------------------- QA Submit Api ---------------------
    else if (department == 6) {
      let apiUrl;
      if (
        formName == "change_control_log_book" ||
        formName == "master_list_of_sharp_tools" ||
        formName == "online_inspection_report_pads" ||
        formName == "online_inspection_report_balls" ||
        formName == "online_inspection_report_buds"
      ) {
        apiUrl = `${API.prodUrl}/Precot/api/qa/excel/getAuditSummary`;
      } else {
        apiUrl = `${API.prodUrl}/Precot/api/qa/excel/download`;
      }
      let payload = {
        // "department": "QUALITY_ASSURANCE",
        from_date: startDate,
        to_date: endDate,
        form_name: formName,
      };
      switch (formName) {
        case "customer_complaint_register_form":
        case "management_of_incidence":
        case "internal_audit_schedule":
        case "non_conformity_report":
        case "minutes_of_mrm":
        case "agenda_for_management_review_meeting":
        case "request_and_issuance_of_document":
        case "distribution_and_destruction_record":
        case "internal_audit_report":
        case "list_of_glass_hard_plastic_wood_ceramic":
        case "control_of_glass_hard_plastic_wood_ceramic":
        case "minutes_of_meeting_mock_recall":
        case "training_questionnaire":

          payload = {
            ...payload,
            month: qaFrequency.month,
            year: qaFrequency.year,
          };
          break;
        case "deviation_form":
          payload = {
            ...payload,
            month: qaFrequency.month,
            year: qaFrequency.year,
            "dateOfInitiation": "",
            "deviationNumber": ""

          };
          break;
        case "bmr_issue_register":
          payload = {
            ...payload,
            department: qaFrequency.department,
          };
          break;
        case "summary_traceability":
          payload = {
            ...payload,
            bmr_no: qaFrequency.bmrNO
          };
          break;
        case "batch_release_checklist":
          payload = {
            ...payload,
            department: qaFrequency.department,
            bmr_no: qaFrequency.bmrNO
          };
          break;
        case "pest_controller":
          if (qaFrequency.formatNo == "") {
            message.warning("Please Select Format No");
            return;
          }
          payload = {
            ...payload,
            form_no: qaFrequency.formatNo,
          };
          break;
        case "product_disposition_logbook":
          payload = {
            ...payload,
            form_no: "PH-QAD01/F-049",
          };
          break;
        case "final_inspection_report":
          payload = {
            ...payload,
            porder: qaFrequency.porder,
            shift: qaFrequency.shift,
          };
          break;
        case "online_inspection_report":
          if (qaFrequency.formatNo == "") {
            message.warning("Please Select Format No");
            return;
          }
          payload = {
            ...payload,
            porder: qaFrequency.porder,
            bmr_no: qaFrequency.bmrNO,
            porder: qaFrequency.porder,
            shift: qaFrequency.shift,
            form_no: qaFrequency.formatNo,
          };
          break;
        case "inward_inspection_report":
          if (qaFrequency.formatNo == "") {
            message.warning("Please Select Format No");
            return;
          }
          payload = {
            ...payload,
            supplier_name: qaFrequency.supplierName,
            invoice_no: qaFrequency.invoiceNo,
            form_no: qaFrequency.formatNo,
          };
          break;
        case "internal_audit_nc_report":
        case "annual_plan":
        case "supplier_audit_plan":
        case "training_calender":
          payload = {
            ...payload,
            year: qaFrequency.year,
          };
          break;
        case "change_control_log_book":
          payload = {
            ...payload,
            department: "QUALITY ASSURANCE",
            form_no: "PH-QAD01/F-042",
            changeControlNo: qaFrequency.changeControlNo,
          };
          break;
        case "master_list_of_sharp_tools":
          payload = {
            ...payload,
            department: "QUALITY ASSURANCE",
            form_no: "PH-QAD01/F-060",
            departmentName: qaFrequency.departmentName,
          };
          break;
        case "training_need_identification_form":
          payload = {
            ...payload,
            "department": qaFrequency.department,
            "year": qaFrequency.year
          };
          break;
        case "online_inspection_report_pads":
        case "online_inspection_report_balls":
        case "online_inspection_report_buds":
          payload = {
            ...payload,
            "department": "QUALITY ASSURANCE",
            "shift": qaFrequency.shift,
            "machine_no": qaFrequency.machineNo,
            "bmrNo": qaFrequency.bmrNO,
            "pOrder": qaFrequency.porder
          }
          break;
        default:
          payload = payload;
          break;
      }
      try {
        const response = await axios.post(apiUrl, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        });
        if (
          response.status == 400 &&
          response.data.message == "No data found"
        ) {
          message.error(response.data.message);
          return;
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status == 200 || response.status == 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response) {
          const errorBlob = error.response.data;
          const reader = new FileReader();

          reader.onloadend = () => {
            const errorText = reader.result;
            try {
              const errorData = JSON.parse(errorText);
              message.error(errorData.message);
            } catch (parseError) {
              message.error("Error downloading file: " + errorText);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }
    }

    // -------------------------- CB Submit Api ------------------------
    else if (department == 12) {
      let apiUrl;
      if (formName == "final_inspection_report") {
        apiUrl = `${API.prodUrl}/Precot/api/buds/audit/getAuditSummary`
      }
      else {
        apiUrl = `${API.prodUrl}/Precot/api/buds/audit/download`
      }
      let payload = {
        "department": "COTTON_BUDS",
        "formName": formName,
        "fromDate": startDate,
        "toDate": endDate,
      };
      switch (formName) {
        case "buds_logbook":
          payload = {
            ...payload,
            "shift": cbFrequency.shift,
          }
          break;
        case "final_inspection_report":
          payload = {
            ...payload,
            "shift": cbFrequency.shift,
            "orderNumber": cbFrequency.orderNumber
          }
          break;
        case "buds_equipment_usage":
          payload = {
            ...payload,
            "shift": cbFrequency.shift,
            "bmrNumber": cbFrequency.bmrNumber
          }
          break;
        case "buds_daily_production_sliver":
          payload = {
            ...payload,
            "machineName": cbFrequency.machineName,
            "shift": cbFrequency.shift,
          }
          break;
        case "buds_product_changeover":
          payload = {
            ...payload,
            "orderNumber": cbFrequency.orderNumber,
          }
          break;
      }
      try {
        const response = await axios.post(apiUrl, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          responseType: 'arraybuffer', // Handle binary data
        });

        if (
          (response.status === 200 || response.status === 400) &&
          (response.data.message === "No data" || response.data.message === "No data found")
        ) {
          message.error(response.data.message);
          return;
        }

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${formName.replace(/\s+/g, "_")}_${selectedFrequency || ""}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        if (response.status === 200 || response.status === 201) {
          message.success("File downloaded successfully.");
        }
      } catch (error) {
        if (error.response?.data?.message == "No data found") {
          message.error(error.response.data.message);
          return;
        }

        if (error.response) {
          const errorBlob = new Blob([error.response.data]);
          const reader = new FileReader();

          reader.onloadend = () => {
            try {
              const errorData = JSON.parse(reader.result);
              message.error(errorData.message);
            } catch {
              message.error("Error downloading file: " + reader.result);
            }
          };
          reader.readAsText(errorBlob);
        } else {
          console.error("Error downloading file:", error);
          message.error("Error downloading file.");
        }
      }

    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const getFrequencyTitle = () => {
    if (department == 1) {
      switch (formName) {
        //----------------- Bleaching Dept ---------------------------------
        case "Laydown Checklist":
          return "Select Lay down No";
        case "Metal Detector Checklist":
          return "Select Section";
        case "Applied Contamination Report (Raw Cotton)":
          return "Select BMR";
        case "Contamination Checking Report (Raw Cotton)":
          return "Select PH No.";
        case "Equipment Usage Log Book – Blow room and Carding":
          return "Select BMR";
        case "Equipment Usage Log Book – Cake Press":
          return "Select BMR & Sub Batch";
        case "Bleaching Job Card":
          return "Select BMR & Sub Batch";
        case "Equipment Usage Log Book – Hydro Extractor":
          return "Select BMR & Sub Batch";
        case "Sanitization of machines and surfaces":
          return "Select Year & Month & Week";
        case "Bleaching Hand Sanitization Report":
          return " Shift";
        case "Shift Log Book":
          return " Shift";
        case "Mixing Change Over and Machine Cleaning Checklist":
          return "Select From BMR & To BMR";
        case "Equipment Usage Log Book - Waste Bale Press":
          return "";
        case "House Keeping Cleaning Checklist (Bleaching and AB Cotton Godown)":
          return "";
        case "House Keeping Cleaning Checklist (Blow room, Carding & Waste Bale Press)":
          return "";
        case "Applied Contamination Report (AB Cotton)":
          return "Select BMR";
        case "Contamination Checking Report (Absorbent Bleached Cotton)":
          return " Select BMR, Sub Batch, Bale";
        case "RE-PROCESSING REPORT":
          return " Select BMR, Sub Batch";
      }
    }
    // ------------------------ Spunlace Dept -----------------------------------------------
    else if (department == 2) {
      switch (formName) {
        case "Bale Consumption Report":
        case "Process Setup Verification Opening Line":
        case "Process Setup Details Jetlace & Dryer":
        case "Process Setup Details - Winder":
        case "Daily Production Report - Spunlace":
        case "Daily Rejection Report - Spunlace":
        case "Spunlace GSM Analysis Report":
        case "Product Change Over Check List Spunlace":
        case "Shift Wise Sliter Winder Production Report":
        case "Process Setup Verification Sliter Winder":
        case "Shift wise RP Production Report":
        case "Process Setup Verification - RP Bale Press":
        case "Sample Report - Spunlace":
          return "Select Shift, Order No";
        case "Filter Bag Consumption Details":
        case "Spunlace Hand Sanitization Report":
        case "Shift Wise Cotton Waste Report Of Spunlace":
          return "Select Shift";
        case "Daily Stoppage Report - Spunlace":
        case "Logbook - Spunlace Planning":
        case "Shift Wise Stoppage Report Of Sliter Winder":
        case "RP Bale Press Stoppage Report":
          return "";
        case "Metal Detector Check List":
        case "Machine Cleaning Record (Weekly)":
          return "Select Month, Year";
        case "Sanitization Of Machines & Surfaces":
          return "Select Week, Month, Year";
      }
    }
    // ------------------------ PadPunching Dept -----------------------------------------------
    else if (department == 3) {
      switch (formName) {
        case "Production Details - Log Book":
        case "Daily Production Packing Details":
        case "Hand Sanitization Report":
        case "Bag Making Daily Production Details":
          return "Select Shift";
        case "Daily Roll Consumption Report - Pad Punching":
        case "Product Change Over":
        case "Machine Cleaning Check List":
        case "Log Book - Bag Making":
          return "Select Shift, Machine Name";
        case "Argus Metal Detector - Check List":
        case "House Keeping Cleaning Check List PH_HRD01_F006":
        case "House Keeping Cleaning Check List PH_HRD01_F010":
          return "";
        case "Sanitization Of Machines & Surfaces":
          return "Select Machine Name,Week, Month & Year";
        case "Bag Making - Specification Details":
          return "Select Shift, Machine Name & Product Name";
      }
    }
    // ------------------------------- Dry Goods Dept --------------------------------------
    else if (department == 4) {
      switch (formName) {
        case "Bale Consumption Report":
          return "Select Shift, Laydown No";
        case "Daily Production - Sliver Making":
        case "Daily Production (Pleat / Wool Roll)":
        case "Daily Production - Cotton Balls":
          return "Select Shift, Machine name";
        case "Production Report - Mini Roll":
        case "Log Book - Dry Goods":
        case "Ball Pleat & Wool Roll Finished Goods Transfer Record":
        case "Hand Sanitization Report - Dry Goods":
          return "Select Shift";
        case "Sanitization Of Machines & Surfaces - Dry Goods":
          return "Week , Month , Year";
        case "Product Change Over - Dry Goods":
          return "Machine name, Order No";
        case "House Keeping Cleaning Check List - Dry Goods":
          return "";
      }
    }
    // ------------------------------- QC Dept--------------------------
    else if (department == 5) {
      switch (formName) {
        case "RAW COTTON ANALYSIS REPORT": // form 1
          return "Select Mill Batch No";
        case "ABSORBENT BLEACHED COTTON ANALYSIS REPORT": // form 2
          return "Select SubBatch No";
        case "CHEMICAL ANALYSIS REPORT": // form 3
          return "Select Material Doc No";
        case "EXFOLIATING FABRIC ANALYSIS REPORT": // form 4
          return "Select Invoice No";
        case "NON-WOVEN FLEECE ANALYSIS REPORT": // form 5
        case "FINISHED PRODUCT ANALYSIS REPORT": // form 6
        case "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT": // form 52
        case "RAW COTTON CONSOLIDATED ANALYTICAL REPORT": // form 17
          return "Select BMR No";
        case "": // form 11
          return "";
        case "BRIQUETTES ANALYSIS REPORT": // form 13
          return "Select Supplier, Invoice No";
        case "PHYSICAL AND CHEMICAL LAB SAMPLE INWARD BOOK": // form 14
        case "MICROBIOLOGY LAB SAMPLE INWARD BOOK": // form 15
        case "ETP LAB SAMPLE INWARD BOOK": // form 16
          return "Selct Shift";
        case "": // form 18
          return "";
        case "WEIGHING SCALE CALIBRATION REPORT": // form 20
        case "BACTERIAL INCUBATOR TEMPRATURE CALIBRATION REPORT": // form 25
        case "FUNGAL INCUBATOR TEMPERATURE VERIFICATION REPORT": // form 26
        case "VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR": // form 27
        case "TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB": // form 31
          return "Select Eq Id";
        case "WIRA FIBER FINENESS TESTER CALIBRATION REPORT": // form 23
        case "SPECTROPHOTOMETR CM-3600A Calibration Report": // form 24
        case "REAGENT PREPARATION RECORD": // form 30
        case "MEDIA GROWTH PROMOTION TEST REPORT": // form 34
          return "Select Year, Month";
        case "VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR": // form 28
          return "Select Year, Month , Eq ID";
        case "": // form 36
          return "";
        case "": // form 38
          return "";
        case "": // form 39
          return "";
        case "": // form 40
          return "";
        case "COA FOR AB COTTON": // form 41
        case "COA FOR COTTON PADS": // form 42
        case "COA FOR COTTON BALLS": // form 43
        case "COA FOR COTTON WOOL ROLL": // form 44
        case "COA FOR COTTON WOOL PLEAT": // form 45
        case "COA FOR COTTON ROLL GOODS": // form 46
        case "COA FOR INFUSED COTTON PADS": // form 47
        case "COA FOR MOISTURE CONTENT (%)": // form 48
          return "Select Customer,Product";
        case "STANDARIZATION OF CHEMICAL SOLUTION": // form 49
          return "Select Chemical,Shift";
        case "": // form 50
          return "";
        case "DIGITAL COLONY COUNTER CALIBRATION REPORT": // form 51
        case "pH-METER CALIBRATION REPORT": // form 19
          return "Select Year , Month and Eq ID";
        case "FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT": // form 7
        case "FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR": // form 10
        case "HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT": // form 8
        case "MACHINE SWAB - MICROBIOLOGICAL ANALYSIS REPORT": // form 9
        case "POTABLE WATER ANALYSIS REPORT": // form 12
        case "TDS-METER CALIBRATION REPORT": // form 21
        case "TURBIDITY CALIBRATION REPORT": // form 22
        case "REQUISITION SAMPLE ANALYSIS REPOR": // form 29
        case "MEDIA PREPARATION & CONSUMPTION RECORD": // form 32
        case "MEDIA DISPOSAL RECORD": // form 35
        case "Disposal Record - Chemical Media": // form 37
        case "MICROBIOLOGICAL ANALYSIS REPORT MISCELLANEOUS": // form 33
          return "";
      }
    }
    // -------------------------- QA Dept ----------------------------------
    else if (department == 6) {
      switch (formName) {
        case "pest_controller": // form 1
          return "Select Format No";
        case "customer_complaint_register_form": // form 2
        case "management_of_incidence": // form 4
        case "internal_audit_schedule": // form 5
        case "non_conformity_report": // form 6
        case "minutes_of_mrm": // form 8
        case "agenda_for_management_review_meeting": // form 9
        case "request_and_issuance_of_document": // form 10
        case "distribution_and_destruction_record": // form 12
        case "internal_audit_report": // form 15
        case "list_of_glass_hard_plastic_wood_ceramic":
        case "control_of_glass_hard_plastic_wood_ceramic":
        case "minutes_of_meeting_mock_recall":
        case "training_questionnaire":
        case "deviation_form":
          return "Select Year , Month";
        case "inward_inspection_report": // form 3
          return "Select FormatNo, Supplier Name,IIR No,Invoice no";
        case "final_inspection_report": // form 7
          return "Select POrder ,Shift";
        case "online_inspection_report": // form 11
          return "Select FormatNo, BMR No,POrder No, Shift";
        case "internal_audit_nc_report": // form 14
        case "annual_plan": // form 17
        case "supplier_audit_plan": // form 20
        case "training_calender":
          return "Select Year";
        case "bmr_issue_register":
        case "master_list_of_sharp_tools":
          return "Select Department";
        case "summary_traceability":
        case "batch_release_checklist":
          return "Select Department , BMR No";
        case "training_need_identification_form":
          return "Select Year , Department";
        case "change_control_log_book":
          return "Select Change Control No";
        case "online_inspection_report_pads":
        case "online_inspection_report_balls":
        case "online_inspection_report_buds":
          return "Select Shift , Machine No , BMR No , pOrder No";
        case "list_of_sharp_tools": // form 18
        case "rodent_box_check_list": // form 19
        case "supplier_audit_report": // form 16
        case "container_inspection_report": // form 13
          return "";
      }
    } else if (department == 7) {
      switch (formName) {
        case "Monthly plan Summary Details":
      }
    } else if (department == 8) {
      switch (formName) {
        case "Reception CheckList":
          return "Select Invoice No, Description";
        case "Non Returnable Gate Pass":
          return "Select Gate Pass No";
        case "Fork Lift Movement CheckList":
          return " Select Fork Lift Number";
        case "Eye Wash with shower Working Condition CheckList(Chemical Store)":
      }
    } else if (department == 10) {
      switch (formName) {
        case "PRODUCT DEVELOPMENT SHEET":
      }
    } else if (department == 11) {
      switch (formName) {
        case "Breakdown Intimation Slip":
          return "Select BIS No.";
        case "Root Cause Analysis":
          return "Select RCA No.";
        case "Work Order Request Form":
          return " Select WOR No.";
        case "Weighing Scales Calibration Record":
          return "Select Machine Id No.";
      }
    }
    // ------------------------ CB Dept ---------------------------------
    else if (department == 12) {
      switch (formName) {

        case "buds_logbook":
          return "Select Shift";
        case "buds_equipment_usage":
          return "Select Shift , BMR No";
        case "buds_daily_production_sliver":
          return "Select Shift , Machine Name";
        case "buds_product_changeover":
          return "Select Order";
        case "final_inspection_report":
          return "Select Shift , Order"
      }
    }

    //---------------------------------------------------------------------------
  };

  const getFrequencyPlaceholder = () => {
    const formatUniqueMappings = {
      "Laydown Checklist": "Lay down No",
      "Metal Detector Checklist": "Please select section",
      "Applied Contamination Report (Raw Cotton)": "BMR wise",
      "Contamination Checking Report (Raw Cotton)": "PH No.",
      "Equipment Usage Log Book – Blow room and Carding": "BMR wise",
      "Equipment Usage Log Book – Cake Press": "BMR ",
      "Bleaching Job Card": "BMR ",
      "Equipment Usage Log Book – Hydro Extractor": "BMR ",
      "Sanitization of machines and surfaces": "Year, Month & Week",
      "Bleaching Hand Sanitization Report": "Date & Shift",
      "Shift Log Book": "Date & Shift",
      "Mixing Change Over and Machine Cleaning Checklist":
        "Date, From BMR and To BMR",
      "Equipment Usage Log Book - Waste Bale Press": "Date",
      "House Keeping Cleaning Checklist (Bleaching and AB Cotton Godown)":
        "Date",
      "House Keeping Cleaning Checklist (Blow room, Carding & Waste Bale Press)":
        "Date",
      "Applied Contamination Report (AB Cotton)": "BMR wise",
      "Contamination Checking Report (Absorbent Bleached Cotton)": "BMR ",
      "RE-PROCESSING REPORT": "BMR "
    };

    return formatUniqueMappings[formName] || "Select Frequency";
  };
  useEffect(() => {
    console.log("Dg Frequency", dgFrequency);
  }, [dgFrequency]);
  return (
    <div style={{ padding: "8px", backgroundColor: "#F5F5F5" }}>
      <BleachingHeader
        formName={"Audit Trail"}
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
              if (window.confirm("Are you sure you want to logout?")) {
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
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        {(departmentId <= 12) ? (
          <>
            <Row>
              <Col>
                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
              </Col>

              <Col
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{localStorage.getItem("username")}</p>
                <p
                  style={{
                    fontSize: "x-small",
                  }}
                >
                  {localStorage.getItem("role")}
                </p>
              </Col>
            </Row>

            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0",
                margin: "0",
              }}
              items={
                role === "ROLE_QA"
                  ? [
                    {
                      key: "1",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Form Browser
                        </b>
                      ),
                      onClick: () => navigate("/Precot/choosenScreen"),
                    },
                    {
                      key: "2",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Generation
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Generate"),
                    },
                    {
                      key: "3",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Audit
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Report/Generation"),
                    },

                    {
                      key: "4",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Mapping
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Mapping"),
                    },
                    {
                      key: "5",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Closing
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Closing"),
                    },
                    {
                      key: "6",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Traceability
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Traceability"),
                    },
                    {
                      key: "7",
                      icon: (
                        <FaLock
                          color="#151718"
                          onClick={() => {
                            if (confirm("Are you sure want to logout")) {
                              localStorage.removeItem("token");
                              navigate("/Precot");
                            }
                          }}
                        />
                      ),
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Logout
                        </b>
                      ),
                      onClick: () => navigate("/Precot"),
                    },
                  ]
                  : role === "ROLE_SUPERVISOR" ||
                    role === "ROLE_HOD" ||
                    role === "ROLE_DESIGNEE" ||
                    role === "ROLE_HR"
                    ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      // {
                      //   key: "2",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //      Dash Board
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Dashboard"),
                      // },

                      {
                        key: "3",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Mapping
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Mapping"),
                      },
                      {
                        key: "4",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Closing
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Closing"),
                      },
                      {
                        key: "5",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Chemical Issue
                          </b>
                        ),
                        onClick: () => navigate("/Precot/RawMaterialIssue"),
                      },
                      {
                        key: "6",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                    : [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
              }
            />
          </>
        ) : departmentId == 2 ? (
          <>
            <Row>
              <Col>
                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
              </Col>

              <Col
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{localStorage.getItem("username")}</p>
                <p
                  style={{
                    fontSize: "x-small",
                  }}
                >
                  {localStorage.getItem("role")}
                </p>
              </Col>
            </Row>

            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0",
                margin: "0",
              }}
              items={
                role === "ROLE_QA"
                  ? [
                    {
                      key: "1",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Form Browser
                        </b>
                      ),
                      onClick: () => navigate("/Precot/choosenScreen"),
                    },

                    {
                      key: "2",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Audit
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Report/Generation"),
                    },
                    {
                      key: "3",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Traceability
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Traceability"),
                    },
                    {
                      key: "4",
                      icon: (
                        <FaLock
                          color="#151718"
                          onClick={() => {
                            if (confirm("Are you sure want to logout")) {
                              localStorage.removeItem("token");
                              navigate("/Precot");
                            }
                          }}
                        />
                      ),
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Logout
                        </b>
                      ),
                      onClick: () => navigate("/Precot"),
                    },
                  ]
                  : role === "ROLE_SUPERVISOR" ||
                    role === "ROLE_HOD" ||
                    role === "ROLE_DESIGNEE" ||
                    role === "ROLE_HR"
                    ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Packing Material
                          </b>
                        ),
                        onClick: () =>
                          navigate("/Precot/Spunlace/PackingMaterial"),
                      },
                      {
                        key: "3",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                    : [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },

                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Packing Material
                          </b>
                        ),
                        onClick: () =>
                          navigate("/Precot/Spunlace/PackingMaterial"),
                      },
                      {
                        key: "3",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
              }
            />
          </>
        ) : departmentId == 3 ? (
          <>
            <Row>
              <Col>
                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
              </Col>

              <Col
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{localStorage.getItem("username")}</p>
                <p
                  style={{
                    fontSize: "x-small",
                  }}
                >
                  {localStorage.getItem("role")}
                </p>
              </Col>
            </Row>

            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0",
                margin: "0",
              }}
              items={
                role === "ROLE_QA"
                  ? [
                    {
                      key: "1",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Form Browser
                        </b>
                      ),
                      onClick: () => navigate("/Precot/choosenScreen"),
                    },
                    {
                      key: "2",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Audit
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Report/Generation"),
                    },
                    {
                      key: "3",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Traceability
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Traceability"),
                    },
                    {
                      key: "4",
                      icon: (
                        <FaLock
                          color="#151718"
                          onClick={() => {
                            if (confirm("Are you sure want to logout")) {
                              localStorage.removeItem("token");
                              navigate("/Precot");
                            }
                          }}
                        />
                      ),
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Logout
                        </b>
                      ),
                      onClick: () => navigate("/Precot"),
                    },
                  ]
                  : role === "ROLE_SUPERVISOR" ||
                    role === "ROLE_HOD" ||
                    role === "ROLE_DESIGNEE" ||
                    role === "ROLE_HR"
                    ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },

                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                    : [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
              }
            />
          </>
        ) : departmentId == 4 ? (
          <>
            <Row>
              <Col>
                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
              </Col>

              <Col
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{localStorage.getItem("username")}</p>
                <p
                  style={{
                    fontSize: "x-small",
                  }}
                >
                  {localStorage.getItem("role")}
                </p>
              </Col>
            </Row>

            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0",
                margin: "0",
              }}
              items={
                role === "ROLE_QA"
                  ? [
                    {
                      key: "1",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Form Browser
                        </b>
                      ),
                      onClick: () => navigate("/Precot/choosenScreen"),
                    },
                    {
                      key: "2",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Generation
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Generate"),
                    },
                    {
                      key: "3",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Audit
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Report/Generation"),
                    },

                    {
                      key: "4",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Mapping
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Mapping"),
                    },
                    {
                      key: "5",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Closing
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Closing"),
                    },
                    {
                      key: "6",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Traceability
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Traceability"),
                    },
                    {
                      key: "7",
                      icon: (
                        <FaLock
                          color="#151718"
                          onClick={() => {
                            if (confirm("Are you sure want to logout")) {
                              localStorage.removeItem("token");
                              navigate("/Precot");
                            }
                          }}
                        />
                      ),
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Logout
                        </b>
                      ),
                      onClick: () => navigate("/Precot"),
                    },
                  ]
                  : role === "ROLE_SUPERVISOR" ||
                    role === "ROLE_HOD" ||
                    role === "ROLE_DESIGNEE" ||
                    role === "ROLE_HR"
                    ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },

                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                    : [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
              }
            />
          </>
        ) : departmentId.includes(",") ? (<>
          <Row>
            <Col>
              <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
            </Col>
            <Col
              style={{
                marginLeft: "1em",
              }}
            >
              <p>{localStorage.getItem("username")}</p>
              <p
                style={{
                  fontSize: "x-small",
                }}
              >
                {localStorage.getItem("role")}
              </p>
            </Col>
          </Row>
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            style={{
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "0",
              margin: "0",
            }}
            items={
              role === "ROLE_QA"
                ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Audit
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Report/Generation"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Bleaching Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "5",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        DryGoods Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Mapping"),
                  },
                  {
                    key: "6",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "7",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Traceability
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Traceability"),
                  },
                  {
                    key: "8",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
                : role === "ROLE_SUPERVISOR" ||
                  role === "ROLE_HOD" ||
                  role === "ROLE_DESIGNEE" ||
                  role === "ROLE_HR"
                  ? [
                    {
                      key: "1",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Form Browser
                        </b>
                      ),
                      onClick: () => navigate("/Precot/choosenScreen"),
                    },
                    {
                      key: "2",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Bleaching Mapping
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Bleaching_Mapping"),
                    },
                    {
                      key: "3",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          DryGoods Mapping
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Mapping"),
                    },
                    {
                      key: "4",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Closing
                        </b>
                      ),
                      onClick: () => navigate("/Precot/Closing"),
                    },
                    {
                      key: "5",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Chemical Issue
                        </b>
                      ),
                      onClick: () => navigate("/Precot/RawMaterialIssue"),
                    },
                    {
                      key: "6",
                      icon: (
                        <FaLock
                          color="#151718"
                          onClick={() => {
                            if (confirm("Are you sure want to logout")) {
                              localStorage.removeItem("token");
                              navigate("/Precot");
                            }
                          }}
                        />
                      ),
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Logout
                        </b>
                      ),
                      onClick: () => navigate("/Precot"),
                    },
                  ]
                  : [
                    {
                      key: "1",
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Form Browser
                        </b>
                      ),
                      onClick: () => navigate("/Precot/choosenScreen"),
                    },
                    {
                      key: "2",
                      icon: (
                        <FaLock
                          color="#151718"
                          onClick={() => {
                            if (confirm("Are you sure want to logout")) {
                              localStorage.removeItem("token");
                              navigate("/Precot");
                            }
                          }}
                        />
                      ),
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Logout
                        </b>
                      ),
                      onClick: () => navigate("/Precot"),
                    },
                  ]
            }
          />
        </>) : null}
      </Drawer>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card
            title="Select Department"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Select
              placeholder="Select Department"
              value={department}
              onChange={handleDepartmentChange}
              style={{ width: "100%", textAlign: "center" }}
            >
              {departments.map((dept) => (
                <Option
                  key={dept.department}
                  value={dept.id}
                  style={{ textAlign: "center" }}
                >
                  {dept.department}
                </Option>
              ))}
            </Select>
          </Card>
        </Col>
        {department && (
          <Col span={8}>
            <Card
              title="Select Form Name"
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Select
                showSearch
                placeholder="Select Form Name"
                value={formName}
                onChange={handleFormNameChange}
                style={{ width: "100%", textAlign: "center" }}
              >
                {formNames.map((form) => (
                  <Option
                    key={form.value}
                    value={form.value}
                    style={{ textAlign: "center" }}
                  >
                    {form.name}
                  </Option>
                ))}
              </Select>
            </Card>
          </Col>
        )}
        <Col span={8}>
          <Card
            title="Select Date Range"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateRangeChange(e.target.value, "start")}
                style={{
                  padding: "4px",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                  textAlign: "center",
                }}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateRangeChange(e.target.value, "end")}
                min={startDate}
                style={{
                  padding: "4px",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                  textAlign: "center",
                }}
              />
              {error && <span style={{ color: "red" }}>{error}</span>}
            </div>
          </Card>
        </Col>
        {/* ---------------------------------- > Bleaching Department  < --------------------------------*/}
        {formName && department == 1 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName === "Metal Detector Checklist" ? (
                <Select
                  showSearch
                  placeholder="Please select section"
                  value={selectSection}
                  onChange={handleSectionChange}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  <Option
                    value="Blow room (CCP - 02A)"
                    style={{ textAlign: "center" }}
                  >
                    Blow room (CCP - 02A)
                  </Option>
                  <Option
                    value="Bleaching (CCP - 02B)"
                    style={{ textAlign: "center" }}
                  >
                    Bleaching (CCP - 02B)
                  </Option>
                </Select>
              ) : formName ===
                "House Keeping Cleaning Checklist (Bleaching and AB Cotton Godown)" ||
                formName ===
                "House Keeping Cleaning Checklist (Blow room, Carding & Waste Bale Press)" ||
                formName === "Equipment Usage Log Book - Waste Bale Press" ? (
                <Card
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  No frequency required for this form.
                </Card>
              ) : formName === "Sanitization of machines and surfaces" ? (
                <>
                  <Select
                    showSearch
                    placeholder="Select Year"
                    value={year}
                    onChange={handleYearChange}
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    {yearOptions.map((option) => (
                      <Option
                        key={option.value}
                        value={option.value}
                        style={{ textAlign: "center" }}
                      >
                        {option.name}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    showSearch
                    placeholder="Select Month"
                    value={month}
                    onChange={handleMonthChange}
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      textAlign: "center",
                    }}
                  >
                    {monthOptions.map((option) => (
                      <Option
                        key={option.value}
                        value={option.value}
                        style={{ textAlign: "center" }}
                      >
                        {option.name}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    showSearch
                    placeholder="Select Week"
                    value={week}
                    onChange={handleWeekChange}
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      textAlign: "center",
                    }}
                  >
                    {weekOptions.map((option) => (
                      <Option
                        key={option.value}
                        value={option.value}
                        style={{ textAlign: "center" }}
                      >
                        {option.name}
                      </Option>
                    ))}
                  </Select>
                </>
              ) : (
                <>
                  {formName ===
                    "Mixing Change Over and Machine Cleaning Checklist" ? (
                    <>
                      <Select
                        showSearch
                        placeholder="Select Frequency 1"
                        value={selectedFrequency1}
                        onChange={(value) => setSelectedFrequency1(value)}
                        style={{
                          width: "100%",
                          marginBottom: "16px",
                          textAlign: "center",
                        }}
                      >
                        {formFrequencies.map((freq) => (
                          <Option
                            key={
                              freq.laydown_no ||
                              freq.bmr_no ||
                              freq.value ||
                              freq.batchNo ||
                              freq.bleach_bmr_no
                            }
                            value={
                              freq.BLEACH_LAYDOWN_NUMBER ||
                              freq.bmr_no ||
                              freq.value ||
                              freq.batchNo ||
                              freq.bleach_bmr_no
                            }
                            style={{ textAlign: "center" }}
                          >
                            {freq.name}
                          </Option>
                        ))}
                      </Select>
                      <Select
                        showSearch
                        placeholder="Select Frequency 2"
                        value={selectedFrequency2}
                        onChange={(value) => setSelectedFrequency2(value)}
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        {formFrequencies.map((freq) => (
                          <Option
                            key={
                              freq.laydown_no ||
                              freq.bmr_no ||
                              freq.value ||
                              freq.batchNo ||
                              freq.bleach_bmr_no
                            }
                            value={
                              freq.BLEACH_LAYDOWN_NUMBER ||
                              freq.bmr_no ||
                              freq.value ||
                              freq.batchNo ||
                              freq.bleach_bmr_no
                            }
                            style={{ textAlign: "center" }}
                          >
                            {freq.name}
                          </Option>
                        ))}
                      </Select>
                    </>
                  ) : (
                    <Select
                      showSearch
                      placeholder={getFrequencyPlaceholder()}
                      value={selectedFrequency}
                      onChange={handleFrequencyChange}
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      {formFrequencies.map((freq) => (
                        <Option
                          key={
                            freq.laydown_no ||
                            freq.bmr_no ||
                            freq.value ||
                            freq.batchNo ||
                            freq.bleach_bmr_no
                          }
                          value={
                            freq.BLEACH_LAYDOWN_NUMBER ||
                            freq.bmr_no ||
                            freq.value ||
                            freq.batchNo ||
                            freq.bleach_bmr_no
                          }
                          style={{ textAlign: "center" }}
                        >
                          {freq.name}
                        </Option>
                      ))}
                    </Select>
                  )}

                  {(formName === "Equipment Usage Log Book – Cake Press" ||
                    formName === "Bleaching Job Card" ||
                    formName ===
                    "Equipment Usage Log Book – Hydro Extractor") && (
                      <Select
                        showSearch
                        placeholder="Select Sub Batch"
                        value={Subbatch}
                        onChange={handleAdditionalInputChange}
                        style={{
                          marginTop: "16px",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {subBatchOptions.map((option) => (
                          <Option
                            key={option.value}
                            value={option.value}
                            style={{ textAlign: "center" }}
                          >
                            {option.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  {formName ===
                    "Contamination Checking Report (Absorbent Bleached Cotton)" && (
                      <>
                        <Select
                          showSearch
                          placeholder="Select Sub Batch"
                          value={Subbatch}
                          onChange={handleSubBatchChange}
                          style={{
                            marginTop: "16px",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          {subBatchOptions.map((option) => (
                            <Option
                              key={option.value}
                              value={option.value}
                              style={{ textAlign: "center" }}
                            >
                              {option.name}
                            </Option>
                          ))}
                        </Select>

                        <Select
                          showSearch
                          placeholder="Select Bale"
                          value={bale}
                          onChange={handleBaleChange}
                          style={{
                            marginTop: "16px",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          {baleOptions.map((option) => (
                            <Option
                              key={option.value}
                              value={option.value}
                              style={{ textAlign: "center" }}
                            >
                              {option.name}
                            </Option>
                          ))}
                        </Select>
                      </>
                    )}
                  {formName === 'RE-PROCESSING REPORT' && (
                    <>
                      <Select
                        showSearch
                        placeholder="Select Sub Batch"
                        value={Subbatch}
                        onChange={handleSubBatchChange}
                        style={{ marginTop: '16px', width: '100%', textAlign: 'center' }}
                      >
                        {subBatchOptions.map(option => (
                          <Option key={option.value} value={option.value} style={{ textAlign: 'center' }}>
                            {option.name}
                          </Option>
                        ))}
                      </Select>


                    </>
                  )}
                </>
              )}
            </Card>
          </Col>
        )}
        {/* --------------------------- > Spunlace Dept < -------------------------------------- */}
        {formName && department == 2 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName == "Bale Consumption Report" ||
                formName == "Process Setup Verification Opening Line" ||
                formName == "Process Setup Details Jetlace & Dryer" ||
                formName == "Process Setup Details - Winder" ||
                formName == "Daily Production Report - Spunlace" ||
                formName == "Daily Rejection Report - Spunlace" ||
                formName == "Spunlace GSM Analysis Report" ||
                formName == "Product Change Over Check List Spunlace" ||
                formName == "Shift Wise Sliter Winder Production Report" ||
                formName == "Process Setup Verification Sliter Winder" ||
                formName == "Shift wise RP Production Report" ||
                formName == "Process Setup Verification - RP Bale Press" ||
                formName == "Sample Report - Spunlace" ? (
                <>
                  <Select
                    options={shiftOptions}
                    value={
                      spFrequency.shift ? spFrequency.shift : "Select Shift"
                    }
                    onChange={handleShift}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={jobOrderLov}
                    value={
                      spFrequency.orderNo
                        ? spFrequency.orderNo
                        : "Select Order No"
                    }
                    onChange={handleOrderNo}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Filter Bag Consumption Details" ||
                formName == "Spunlace Hand Sanitization Report" ||
                formName == "Shift Wise Cotton Waste Report Of Spunlace" ? (
                <>
                  <Select
                    options={shiftOptions}
                    value={
                      spFrequency.shift ? spFrequency.shift : "Select Shift"
                    }
                    onChange={handleShift}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Machine Cleaning Record (Weekly)" ||
                formName == "Metal Detector Check List" ? (
                <>
                  <Select
                    showSearch
                    options={monthOptions}
                    value={
                      spFrequency.month ? spFrequency.month : "Select Month"
                    }
                    onChange={handleMonth}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    showSearch
                    options={yearOptions}
                    value={spFrequency.year ? spFrequency.year : "Select Year"}
                    onChange={handleYear}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "16px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Sanitization Of Machines & Surfaces" ? (
                <>
                  <Select
                    showSearch
                    options={weekOptions}
                    value={spFrequency.week ? spFrequency.week : "Select Week"}
                    onChange={handleWeek}
                    dropdownStyle={{ textAlign: "center" }}
                    style={{ width: "100%", textAlign: "center" }}
                  ></Select>
                  <Select
                    showSearch
                    options={monthOptions}
                    value={
                      spFrequency.month ? spFrequency.month : "Select Month"
                    }
                    onChange={handleMonth}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "16px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    showSearch
                    options={yearOptions}
                    value={spFrequency.year ? spFrequency.year : "Select Year"}
                    onChange={handleYear}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "16px",
                    }}
                  ></Select>
                </>
              ) : formName == "Daily Stoppage Report - Spunlace" ||
                formName == "Logbook - Spunlace Planning" ||
                formName == "Shift Wise Stoppage Report Of Sliter Winder" ||
                formName == "RP Bale Press Stoppage Report" ? (
                <>
                  <Card
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    No frequency required for this form.
                  </Card>
                </>
              ) : null}
            </Card>
          </Col>
        )}
        {/* --------------------------- > PadPunching Dept < -------------------------------------- */}
        {formName && department == 3 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName == "Daily Roll Consumption Report - Pad Punching" ||
                formName == "Product Change Over" ||
                formName == "Machine Cleaning Check List" ||
                formName == "Log Book - Bag Making" ? (
                <>
                  <Select
                    options={shiftOptions}
                    value={
                      spFrequency.shift ? spFrequency.shift : "Select Shift"
                    }
                    onChange={handleShift}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={MachineNameLov}
                    value={
                      spFrequency.machineName
                        ? spFrequency.machineName
                        : "Select Machine Name"
                    }
                    onChange={handleMachineName}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Daily Roll Consumption Report - Pad Punching" ||
                formName == "Hand Sanitization Report" ||
                formName == "Bag Making Daily Production Details" ||
                formName == "Production Details - Log Book" ||
                formName == "Daily Production Packing Details" ? (
                <>
                  <Select
                    options={shiftOptions}
                    value={
                      spFrequency.shift ? spFrequency.shift : "Select Shift"
                    }
                    onChange={handleShift}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Sanitization Of Machines & Surfaces" ? (
                <>
                  <Select
                    options={MachineNameLov}
                    value={
                      spFrequency.machineName
                        ? spFrequency.machineName
                        : "Select Machine Name"
                    }
                    onChange={handleMachineName}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    showSearch
                    options={weekOptions}
                    value={spFrequency.week ? spFrequency.week : "Select Week"}
                    onChange={handleWeek}
                    dropdownStyle={{ textAlign: "center" }}
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  ></Select>
                  <Select
                    showSearch
                    options={monthOptions}
                    value={
                      spFrequency.month ? spFrequency.month : "Select Month"
                    }
                    onChange={handleMonth}
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    showSearch
                    options={yearOptions}
                    value={spFrequency.year ? spFrequency.year : "Select Year"}
                    onChange={handleYear}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "16px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Bag Making - Specification Details" ? (
                <>
                  <Select
                    options={shiftOptions}
                    value={
                      spFrequency.shift ? spFrequency.shift : "Select Shift"
                    }
                    onChange={handleShift}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={MachineNameLov}
                    value={
                      spFrequency.machineName
                        ? spFrequency.machineName
                        : "Select Machine Name"
                    }
                    onChange={handleMachineName}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Argus Metal Detector - Check List" ||
                formName == "House Keeping Cleaning Check List PH_HRD01_F006" ||
                formName ==
                "House Keeping Cleaning Check List PH_HRD01_F010" ? (
                <>
                  <Card
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    No frequency required for this form.
                  </Card>
                </>
              ) : null}
            </Card>
          </Col>
        )}
        {/* ---------------------------------> Dry Goods Dept <----------------------------------- */}
        {formName && department == 4 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName == "Bale Consumption Report" ? (
                <>
                  <Select
                    options={shiftOptions}
                    value={
                      dgFrequency.shift ? dgFrequency.shift : "Select Shift"
                    }
                    onChange={(e) => {
                      handleDryGoodsField(e, "shift");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={laydownLov}
                    value={
                      dgFrequency.laydownNo
                        ? dgFrequency.laydownNo
                        : "Select Laydown No"
                    }
                    onChange={(e) => {
                      handleDryGoodsField(e, "laydownNo");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Daily Production - Sliver Making" ||
                formName == "Daily Production - Cotton Balls" ||
                formName == "Daily Production (Pleat / Wool Roll)" ? (
                <>
                  <Select
                    options={shiftOptions}
                    value={
                      dgFrequency.shift ? dgFrequency.shift : "Select Shift"
                    }
                    onChange={(e) => {
                      handleDryGoodsField(e, "shift");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={dryGoodsMachineName()}
                    value={
                      dgFrequency.machineName
                        ? dgFrequency.machineName
                        : "Select Machine Name"
                    }
                    onChange={(e) => {
                      handleDryGoodsField(e, "machineName");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName ==
                "Ball Pleat & Wool Roll Finished Goods Transfer Record" ||
                formName == "Production Report - Mini Roll" ||
                formName == "Log Book - Dry Goods" ||
                formName == "Hand Sanitization Report - Dry Goods" ? (
                <>
                  <Select
                    options={shiftOptions}
                    value={
                      dgFrequency.shift ? dgFrequency.shift : "Select Shift"
                    }
                    onChange={(e) => {
                      handleDryGoodsField(e, "shift");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName ==
                "Sanitization Of Machines & Surfaces - Dry Goods" ? (
                <>
                  <Select
                    showSearch
                    options={weekOptions}
                    value={dgFrequency.week ? dgFrequency.week : "Select Week"}
                    onChange={(e) => {
                      handleDryGoodsField(e, "week");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    style={{ width: "100%", textAlign: "center" }}
                  ></Select>
                  <Select
                    showSearch
                    options={monthOptions}
                    value={
                      dgFrequency.month ? dgFrequency.month : "Select Month"
                    }
                    onChange={(e) => {
                      handleDryGoodsField(e, "month");
                    }}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "16px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    showSearch
                    options={yearOptions}
                    value={dgFrequency.year ? dgFrequency.year : "Select Year"}
                    onChange={(e) => {
                      handleDryGoodsField(e, "year");
                    }}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "16px",
                    }}
                  ></Select>
                </>
              ) : formName ==
                "House Keeping Cleaning Check List - Dry Goods" ? (
                <>
                  <Card
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    No frequency required for this form.
                  </Card>
                </>
              ) : formName == "Product Change Over - Dry Goods" ? (
                <>
                  <Select
                    options={dryGoodsMachineName()}
                    value={
                      dgFrequency.machineName
                        ? dgFrequency.machineName
                        : "Select Machine Name"
                    }
                    onChange={(e) => {
                      handleDryGoodsField(e, "machineName");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={orderNoLov}
                    value={
                      dgFrequency.orderNo
                        ? dgFrequency.orderNo
                        : "Select Order No"
                    }
                    onChange={(e) => {
                      handleDryGoodsField(e, "orderNo");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : null}
            </Card>
          </Col>
        )}
        {/* ----------------------  PPC  -------------- */}
        {formName && department == 7 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName === "Monthly plan Summary Details" ? (
                <Card
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  No frequency required for this form.
                </Card>
              ) : null}
            </Card>
          </Col>
        )}

        {/* ---------------------------------Stores------------------------------------------------ */}
        {formName && department == 8 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName == "Reception CheckList" ? (
                <>
                  <Select
                    options={invoiceNoLov}
                    value={
                      storesFrequency.invoiceNo
                        ? storesFrequency.invoiceNo
                        : "Select Invoice No."
                    }
                    onChange={(e) => {
                      handleStoreField(e, "invoiceNo");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={storeDescriptionLov}
                    value={
                      storesFrequency.description
                        ? storesFrequency.description
                        : "Select Description"
                    }
                    onChange={(e) => {
                      handleStoreField(e, "description");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Fork Lift Movement CheckList" ? (
                <>
                  <Select
                    options={forkliftLov}
                    value={
                      storesFrequency.forkLiftNo
                        ? storesFrequency.forkLiftNo
                        : "Select Forklift"
                    }
                    onChange={(e) => {
                      handleforklift(e);
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Non Returnable Gate Pass" ? (
                <>
                  <Select
                    options={gatePassNoLov}
                    value={
                      storesFrequency.gatePassNo
                        ? storesFrequency.gatePassNo
                        : "Select Gate Pass No."
                    }
                    onChange={(e) => {
                      handleStoreField(e, "gatePassNo");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName ==
                "Eye Wash with shower Working Condition CheckList(Chemical Store)" ? (
                <>
                  <Card
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    No frequency required for this form.
                  </Card>
                </>
              ) : null}
            </Card>
          </Col>
        )}
        {/* ---------------------------------> QC Dept Field <----------------------------------- */}
        {formName && department == 5 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName == "COA FOR AB COTTON" ||
                formName == "COA FOR COTTON PADS" ||
                formName == "COA FOR COTTON BALLS" ||
                formName == "COA FOR COTTON WOOL ROLL" ||
                formName == "COA FOR COTTON WOOL PLEAT" ||
                formName == "COA FOR COTTON ROLL GOODS" ||
                formName == "COA FOR INFUSED COTTON PADS" ||
                formName == "COA FOR MOISTURE CONTENT (%)" ? (
                <>
                  <Select
                    options={qcParamLov.customerLov}
                    value={
                      qcFrequency.customer
                        ? qcFrequency.customer
                        : "Select Customer"
                    }
                    onChange={(e) => {
                      handleQcField(e, "customer");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qcParamLov.productLov}
                    value={
                      qcFrequency.product
                        ? qcFrequency.product
                        : "Select Product"
                    }
                    onChange={(e) => {
                      handleQcField(e, "product");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "DIGITAL COLONY COUNTER CALIBRATION REPORT" ? (
                <>
                  <Select
                    options={qcParamLov.yearLov}
                    value={qcFrequency.year ? qcFrequency.year : "Select Year"}
                    onChange={(e) => {
                      handleQcField(e, "year");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qcParamLov.monthLov}
                    value={
                      qcFrequency.month ? qcFrequency.month : "Select Month"
                    }
                    onChange={(e) => {
                      handleQcField(e, "month");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qcParamLov.eqIdLov}
                    value={qcFrequency.eqId ? qcFrequency.eqId : "Select Eq Id"}
                    onChange={(e) => {
                      handleQcField(e, "eqId");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    val
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "STANDARIZATION OF CHEMICAL SOLUTION" ? (
                <>
                  <Select
                    options={qcParamLov.chemicalLov}
                    value={
                      qcFrequency.chemical
                        ? qcFrequency.chemical
                        : "Select Chemical"
                    }
                    onChange={(e) => {
                      handleQcField(e, "chemical");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qcParamLov.shiftLov}
                    value={
                      qcFrequency.shift ? qcFrequency.shift : "Select Shift"
                    }
                    onChange={(e) => {
                      handleQcField(e, "shift");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "RAW COTTON ANALYSIS REPORT" ? (
                <>
                  <Select
                    options={qcParamLov.millBatchLov}
                    value={
                      qcFrequency.millBatch
                        ? qcFrequency.millBatch
                        : "Select Mill Batch"
                    }
                    onChange={(e) => {
                      handleQcField(e, "millBatch");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "CHEMICAL ANALYSIS REPORT" ? (
                <>
                  <Select
                    options={qcParamLov.materialDocLov}
                    value={
                      qcFrequency.materialDoc
                        ? qcFrequency.materialDoc
                        : "Select Material Doc"
                    }
                    onChange={(e) => {
                      handleQcField(e, "materialDoc");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "ABSORBENT BLEACHED COTTON ANALYSIS REPORT" ? (
                <>
                  <Select
                    options={qcParamLov.subBatchLov}
                    value={
                      qcFrequency.subBatchNo
                        ? qcFrequency.subBatchNo
                        : "Select SubBatch No"
                    }
                    onChange={(e) => {
                      handleQcField(e, "subBatchNo");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "PHYSICAL AND CHEMICAL LAB SAMPLE INWARD BOOK" ||
                formName == "MICROBIOLOGY LAB SAMPLE INWARD BOOK" ||
                formName == "ETP LAB SAMPLE INWARD BOOK" ? (
                <>
                  <Select
                    options={qcParamLov.shiftLov}
                    value={
                      qcFrequency.shift ? qcFrequency.shift : "Select Shift"
                    }
                    onChange={(e) => {
                      handleQcField(e, "shift");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "EXFOLIATING FABRIC ANALYSIS REPORT" ? (
                <>
                  <Select
                    options={qcParamLov.invoiceLov}
                    value={
                      qcFrequency.subBatchNo
                        ? qcFrequency.subBatchNo
                        : "Select Invoice No"
                    }
                    onChange={(e) => {
                      handleQcField(e, "subBatchNo");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "FINISHED PRODUCT ANALYSIS REPORT" ||
                formName ==
                "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT" ||
                formName == "RAW COTTON CONSOLIDATED ANALYTICAL REPORT" ||
                formName == "NON-WOVEN FLEECE ANALYSIS REPORT" ? (
                <>
                  <Select
                    options={qcParamLov.bmrLov}
                    value={
                      qcFrequency.subBatchNo
                        ? qcFrequency.subBatchNo
                        : "Select BMR No"
                    }
                    onChange={(e) => {
                      handleQcField(e, "subBatchNo");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "WEIGHING SCALE CALIBRATION REPORT" ||
                formName == "pH-METER CALIBRATION REPORT" ||
                formName ==
                "BACTERIAL INCUBATOR TEMPRATURE CALIBRATION REPORT" ||
                formName == "VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR" ||
                formName ==
                "FUNGAL INCUBATOR TEMPERATURE VERIFICATION REPORT" ||
                formName ==
                "TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB" ? (
                <>
                  <Select
                    options={qcParamLov.eqIdLov}
                    value={
                      qcFrequency.subBatchNo
                        ? qcFrequency.subBatchNo
                        : "Select Eq ID"
                    }
                    onChange={(e) => {
                      handleQcField(e, "subBatchNo");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "BRIQUETTES ANALYSIS REPORT" ? (
                <>
                  <Select
                    options={qcParamLov.supplierLov}
                    value={
                      qcFrequency.subBatchNo
                        ? qcFrequency.subBatchNo
                        : "Select Supplier"
                    }
                    onChange={(e) => {
                      handleQcField(e, "subBatchNo");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <br />

                  <Select
                    options={qcParamLov.invoiceLov}
                    value={
                      qcFrequency.eqId ? qcFrequency.eqId : "Select Invoice No"
                    }
                    onChange={(e) => {
                      handleQcField(e, "eqId");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "WIRA FIBER FINENESS TESTER CALIBRATION REPORT" ||
                formName == "REAGENT PREPARATION RECORD" ||
                formName == "MEDIA GROWTH PROMOTION TEST REPORT" ||
                formName == "SPECTROPHOTOMETR CM-3600A Calibration Report" ? (
                <>
                  <Select
                    options={qcParamLov.yearLov}
                    value={qcFrequency.year ? qcFrequency.year : "Select Year"}
                    onChange={(e) => {
                      handleQcField(e, "year");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qcParamLov.monthLov}
                    value={
                      qcFrequency.month ? qcFrequency.month : "Select Month"
                    }
                    onChange={(e) => {
                      handleQcField(e, "month");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>{" "}
                </>
              ) : formName ==
                "VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR" ? (
                <>
                  <Select
                    options={qcParamLov.yearLov}
                    value={qcFrequency.year ? qcFrequency.year : "Select Year"}
                    onChange={(e) => {
                      handleQcField(e, "year");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qcParamLov.monthLov}
                    value={
                      qcFrequency.month ? qcFrequency.month : "Select Month"
                    }
                    onChange={(e) => {
                      handleQcField(e, "month");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qcParamLov.eqIdLov}
                    value={
                      qcFrequency.subBatchNo
                        ? qcFrequency.subBatchNo
                        : "Select Eq ID"
                    }
                    onChange={(e) => {
                      handleQcField(e, "subBatchNo");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "16px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT" ||
                formName ==
                "HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT" ||
                formName == "MACHINE SWAB - MICROBIOLOGICAL ANALYSIS REPORT" ||
                formName == "DISTILLED WATER ANALYSIS REPORT" ||
                formName == "TDS-METER CALIBRATION REPORT" ||
                formName ==
                "SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA" ||
                formName == "FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR" ||
                formName == "POTABLE WATER ANALYSIS REPORT" ||
                formName == "WATER ANALYSIS REPORT" ||
                formName == "WATER ANALYSIS REPORT" ||
                formName == "TURBIDITY CALIBRATION REPORT" ||
                formName == "MEDIA DISPOSAL RECORD" ||
                formName == "Disposal Record - Chemical Media" ||
                formName == "REQUISITION SAMPLE ANALYSIS REPORT" ||
                formName == "MEDIA PREPARATION & CONSUMPTION RECORD" ||
                formName == "MICROBIOLOGICAL ANALYSIS REPORT MISCELLANEOUS" ? (
                //  || formName == ""
                <>
                  <Card
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    No frequency required for this form.
                  </Card>
                </>
              ) : null}
            </Card>
          </Col>
        )}
        {/* ---------------------------------> QA Dept Field <----------------------------------- */}
        {formName && department == 6 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName == "customer_complaint_register_form" ||
                formName == "management_of_incidence" ||
                formName == "internal_audit_schedule" ||
                formName == "non_conformity_report" ||
                formName == "minutes_of_mrm" ||
                formName == "agenda_for_management_review_meeting" ||
                formName == "request_and_issuance_of_document" ||
                formName == "distribution_and_destruction_record" ||
                formName == "internal_audit_report" ||
                formName == "list_of_glass_hard_plastic_wood_ceramic" ||
                formName == "control_of_glass_hard_plastic_wood_ceramic" ||
                formName == "minutes_of_meeting_mock_recall" || formName == "training_questionnaire" ||
                formName == "deviation_form" ? (
                <>
                  <Select
                    options={qaParamLov.yearLov}
                    value={qaFrequency.year ? qaFrequency.year : "Select Year"}
                    onChange={(e) => {
                      handleQaField(e, "year");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.monthLov}
                    value={
                      qaFrequency.month ? qaFrequency.month : "Select Month"
                    }
                    onChange={(e) => {
                      handleQaField(e, "month");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "pest_controller" ? (
                <>
                  <Select
                    options={qaParamLov.formatNoLov}
                    value={
                      qaFrequency.formatNo
                        ? qaFrequency.formatNo
                        : "Select Format No"
                    }
                    onChange={(e) => {
                      handleQaField(e, "formatNo");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "final_inspection_report" ? (
                <>
                  <Select
                    options={qaParamLov.porderLov}
                    value={
                      qaFrequency.porder ? qaFrequency.porder : "Select POrder"
                    }
                    onChange={(e) => {
                      handleQaField(e, "porder");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.shiftLov}
                    value={
                      qaFrequency.shift ? qaFrequency.shift : "Select Shift"
                    }
                    onChange={(e) => {
                      handleQaField(e, "shift");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "online_inspection_report" ? (
                <>
                  <Select
                    options={qaParamLov.formatNoLov}
                    value={
                      qaFrequency.formatNo
                        ? qaFrequency.formatNo
                        : "Select Format No"
                    }
                    onChange={(e) => {
                      handleQaField(e, "formatNo");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.onlineInsLov}
                    value={
                      qaFrequency.dept ? qaFrequency.dept : "Select Department"
                    }
                    onChange={(e) => {
                      handleQaField(e, "dept");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.bmrLov}
                    value={
                      qaFrequency.bmrNO ? qaFrequency.bmrNO : "Select BMR No"
                    }
                    onChange={(e) => {
                      handleQaField(e, "bmrNO");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.porderLov}
                    value={
                      qaFrequency.porder ? qaFrequency.porder : "Select POrder"
                    }
                    onChange={(e) => {
                      handleQaField(e, "porder");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.shiftLov}
                    value={
                      qaFrequency.shift ? qaFrequency.shift : "Select Shift"
                    }
                    onChange={(e) => {
                      handleQaField(e, "shift");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : (formName == "online_inspection_report_pads" || formName == "online_inspection_report_balls"
                || formName == "online_inspection_report_buds"
              ) ? (
                <>
                  <Select
                    options={qaParamLov.shiftLov}
                    value={
                      qaFrequency.shift ? qaFrequency.shift : "Select Shift"
                    }
                    onChange={(e) => {
                      handleQaField(e, "shift");
                    }}
                    showSearch
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.machineLov}
                    value={
                      qaFrequency.machineNo ? qaFrequency.machineNo : "Select Machine No"
                    }
                    onChange={(e) => {
                      handleQaField(e, "machineNo");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.deptLov}
                    value={
                      qaFrequency.department
                        ? qaFrequency.department
                        : "Select Department"
                    }
                    onChange={(e) => {
                      handleQaField(e, "department");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center", marginTop: '5px' }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.bmrLov}
                    value={
                      qaFrequency.bmrNO ? qaFrequency.bmrNO : "Select BMR No"
                    }
                    onChange={(e) => {
                      handleQaField(e, "bmrNO");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.porderLov}
                    value={
                      qaFrequency.porder ? qaFrequency.porder : "Select POrder"
                    }
                    onChange={(e) => {
                      handleQaField(e, "porder");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "inward_inspection_report" ? (
                <>
                  <Select
                    options={qaParamLov.formatNoLov}
                    value={
                      qaFrequency.formatNo
                        ? qaFrequency.formatNo
                        : "Select Format No"
                    }
                    onChange={(e) => {
                      handleQaField(e, "formatNo");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.supplierLov}
                    value={
                      qaFrequency.supplierName
                        ? qaFrequency.supplierName
                        : "Select Supplier"
                    }
                    onChange={(e) => {
                      handleQaField(e, "supplierName");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.invoiceLov}
                    value={
                      qaFrequency.invoiceNo
                        ? qaFrequency.invoiceNo
                        : "Select Invoice No"
                    }
                    onChange={(e) => {
                      handleQaField(e, "invoiceNo");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "internal_audit_nc_report" ||
                formName == "annual_plan" ||
                formName == "supplier_audit_plan" ||
                formName == "training_calender" ? (
                <>
                  <Select
                    options={qaParamLov.yearLov}
                    value={qaFrequency.year ? qaFrequency.year : "Select Year"}
                    onChange={(e) => {
                      handleQaField(e, "year");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "bmr_issue_register" ? (
                <>
                  <Select
                    options={qaParamLov.deptLov}
                    value={
                      qaFrequency.department
                        ? qaFrequency.department
                        : "Select Department"
                    }
                    onChange={(e) => {
                      handleQaField(e, "department");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : (formName == "summary_traceability" || formName == "batch_release_checklist") ? (
                <>
                  <Select
                    options={qaParamLov.deptLov}
                    value={
                      qaFrequency.department
                        ? qaFrequency.department
                        : "Select Department"
                    }
                    onChange={(e) => {
                      handleQaField(e, "department");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                  <Select
                    options={qaParamLov.bmrLov}
                    value={
                      qaFrequency.bmrNO ? qaFrequency.bmrNO : "Select BMR No"
                    }
                    onChange={(e) => {
                      handleQaField(e, "bmrNO");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "master_list_of_sharp_tools" ? (
                <>
                  <Select
                    value={
                      qaFrequency.departmentName
                        ? qaFrequency.departmentName
                        : "Select department"
                    }
                    onChange={(e) => {
                      handleQaField(e, "departmentName");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  >
                    {departments.map((dept) => (
                      <Option
                        key={dept.department}
                        value={dept.department}
                        style={{ textAlign: "center" }}
                      >
                        {dept.department}
                      </Option>
                    ))}
                  </Select>
                </>
              ) : formName == "change_control_log_book" ? (
                <>
                  <Select
                    options={qaParamLov.changeControlLov}
                    value={
                      qaFrequency.changeControlNo
                        ? qaFrequency.changeControlNo
                        : "Select Change Control No"
                    }
                    onChange={(e) => {
                      handleQaField(e, "changeControlNo");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "training_need_identification_form" ? (
                <>
                  <Select
                    value={
                      qaFrequency.department
                        ? qaFrequency.department
                        : "Select Department"
                    }
                    onChange={(e) => {
                      handleQaField(e, "department");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  >
                    {departments.map((dept) => (
                      <Option
                        key={dept.department}
                        value={dept.department}
                        style={{ textAlign: "center" }}
                      >
                        {dept.department}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    options={qaParamLov.yearLov}
                    value={qaFrequency.year ? qaFrequency.year : "Select Year"}
                    onChange={(e) => {
                      handleQaField(e, "year");
                    }}
                    showSearch
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : (formName == "rodent_box_check_list" ||
                formName == "list_of_sharp_tools" ||
                formName == "supplier_audit_report" ||
                formName == "container_inspection_report" ||
                formName == "breakage_report" ||
                formName == "template_for_mock_recall" ||
                formName == "metal_detector_calibration_record" ||
                formName == "metal_detector_pass_report" ||
                formName == "product_disposition_logbook" ||
                formName == "quality_review_meetings" ||
                formName == "annual_product_review" ||
                formName == "batch_release_notes" ||
                formName == "production_retained_sample_register" ||
                formName == "corrective_action_report") ? (
                <>
                  <Card
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    No frequency required for this form.
                  </Card>
                </>
              ) : null}
            </Card>
          </Col>
        )}
        {/* ---------------------------------Development------------------------------------------------ */}
        {formName && department == 10 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName == "PRODUCT DEVELOPMENT SHEET" ? (
                <>
                  <Select
                    options={pdsNoLov}
                    value={pdsNo ? pdsNo : "Select PDS No."}
                    onChange={(e) => {
                      setPdsNo(e);
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : null}
            </Card>
          </Col>
        )}
        {/* ---------------------------------Engineering------------------------------------------------ */}
        {formName && department == 11 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {formName == "Breakdown Intimation Slip" ? (
                <>
                  <Select
                    options={bisNoLov}
                    value={
                      engineeringFrequency.bisNo
                        ? engineeringFrequency.bisNo
                        : "Select BIS No."
                    }
                    onChange={(e) => {
                      handleEngineeringField(e, "bisNo");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Weighing Scales Calibration Record" ? (
                <>
                  <Select
                    showSearch
                    value={weighingbalDept}
                    onChange={departmentchange}
                    style={{ width: "100%" }}
                    placeholder="Search Batch No"
                    optionFilterProp="children"
                  >
                    <Select.Option value="" disabled selected>
                      Department Name:
                    </Select.Option>
                    {departmantLOV.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>

                  <Select
                    showSearch
                    value={
                      engineeringFrequency.machineIdNo
                        ? engineeringFrequency.machineIdNo
                        : "Select Machine Id No."
                    }
                    onChange={(e) => {
                      handleEngineeringField(e, "machineIdNo");
                    }}
                    style={{ width: "100%", marginTop: "16px" }}
                    placeholder="Select Machine ID"
                    optionFilterProp="children"
                    disabled={!department}
                  >
                    {machineOptions.map((id) => (
                      <Select.Option key={id} value={id}>
                        {id}
                      </Select.Option>
                    ))}
                  </Select>
                </>
              ) : formName == "Root Cause Analysis" ? (
                <>
                  <Select
                    options={rcaNoLov}
                    value={
                      engineeringFrequency.RcaNo
                        ? engineeringFrequency.RcaNo
                        : "Select RCA No."
                    }
                    onChange={(e) => {
                      handleEngineeringField(e, "RcaNo");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : formName == "Work Order Request Form" ? (
                <>
                  <Select
                    options={worNoLov}
                    value={
                      engineeringFrequency.worNo
                        ? engineeringFrequency.worNo
                        : "Select WOR No."
                    }
                    onChange={(e) => {
                      handleEngineeringField(e, "worNo");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) : null}
            </Card>
          </Col>
        )}
        {formName && department == 12 && (
          <Col span={8}>
            <Card
              title={getFrequencyTitle()}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {(formName == "buds_logbook") ? (
                <>
                  <Select
                    options={cbParamLov.shiftLov}
                    value={cbFrequency.shift ? cbFrequency.shift : "Select Shift"}
                    onChange={(e) => {
                      handleCbField(e, "shift");
                    }}
                    showSearch
                    style={{ width: "100%", textAlign: "center" }}
                    dropdownStyle={{ textAlign: "center" }}
                  ></Select>
                </>
              ) :
                (formName == "buds_equipment_usage") ? (
                  <>
                    <Select
                      options={cbParamLov.shiftLov}
                      value={cbFrequency.shift ? cbFrequency.shift : "Select Shift"}
                      onChange={(e) => {
                        handleCbField(e, "shift");
                      }}
                      showSearch
                      style={{ width: "100%", textAlign: "center" }}
                      dropdownStyle={{ textAlign: "center" }}
                    ></Select>
                    <Select
                      options={cbParamLov.bmrLov}
                      value={cbFrequency.bmrNumber ? cbFrequency.bmrNumber : "Select BMR No"}
                      onChange={(e) => {
                        handleCbField(e, "bmrNumber");
                      }}
                      showSearch
                      style={{ width: "100%", textAlign: "center", marginTop: '5px' }}
                      dropdownStyle={{ textAlign: "center" }}
                    ></Select>
                  </>

                ) :
                  (formName == "final_inspection_report") ? (
                    <>
                      <Select
                        options={cbParamLov.shiftLov}
                        value={cbFrequency.shift ? cbFrequency.shift : "Select Shift"}
                        onChange={(e) => {
                          handleCbField(e, "shift");
                        }}
                        showSearch
                        style={{ width: "100%", textAlign: "center" }}
                        dropdownStyle={{ textAlign: "center" }}
                      ></Select>
                      <Select
                        options={cbParamLov.orderNoLov}
                        value={cbFrequency.orderNumber ? cbFrequency.orderNumber : "Select Order No"}
                        onChange={(e) => {
                          handleCbField(e, "orderNumber");
                        }}
                        showSearch
                        style={{ width: "100%", textAlign: "center", marginTop: '5px' }}
                        dropdownStyle={{ textAlign: "center" }}
                      ></Select>
                    </>

                  )
                    :

                    (formName == "buds_daily_production_sliver") ? (
                      <>
                        <Select
                          options={cbParamLov.shiftLov}
                          value={cbFrequency.shift ? cbFrequency.shift : "Select Shift"}
                          onChange={(e) => {
                            handleCbField(e, "shift");
                          }}
                          showSearch
                          style={{ width: "100%", textAlign: "center" }}
                          dropdownStyle={{ textAlign: "center" }}
                        ></Select>
                        <Select
                          options={cbParamLov.machineLov}
                          value={cbFrequency.machineName ? cbFrequency.machineName : "Select Machine Name"}
                          onChange={(e) => {
                            handleCbField(e, "machineName");
                          }}
                          showSearch
                          style={{ width: "100%", textAlign: "center", marginTop: '5px' }}
                          dropdownStyle={{ textAlign: "center" }}
                        ></Select>
                      </>

                    )
                      :
                      (formName == "buds_product_changeover") ? (
                        <>
                          <Select
                            options={cbParamLov.orderNoLov}
                            value={cbFrequency.orderNumber ? cbFrequency.orderNumber : "Select Order No"}
                            onChange={(e) => {
                              handleCbField(e, "orderNumber");
                            }}
                            showSearch
                            style={{ width: "100%", textAlign: "center", marginTop: '5px' }}
                            dropdownStyle={{ textAlign: "center" }}
                          ></Select>
                        </>

                      ) : null}
            </Card>
          </Col>
        )}
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col>
          {formName === "Laydown Checklist" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Laydown Checklist
            </Button>
          )}
          {formName === "Metal Detector Checklist" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Metal Detector Checklist
            </Button>
          )}
          {formName ===
            "Contamination Checking Report (Absorbent Bleached Cotton)" && (
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                }}
                icon={<FaDownload />}
                shape="round"
              >
                Download Absorbent Cotton Checklist
              </Button>
            )}
          {formName === 'RE-PROCESSING REPORT' && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Reprocess Report
            </Button>
          )}
          {formName === "Contamination Report (Raw Cotton)" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Contamination Report
            </Button>
          )}
          {formName === "Applied Contamination Report (Raw Cotton)" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Applied Raw Cotton Report
            </Button>
          )}
          {formName === "Contamination Checking Report (Raw Cotton)" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Raw Cotton Report
            </Button>
          )}
          {formName === "Equipment Usage Log Book – Blow room and Carding" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Blow Room Report
            </Button>
          )}
          {formName === "Equipment Usage Log Book – Cake Press" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Cake Press Report
            </Button>
          )}
          {formName === "Bleaching Job Card" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Job Card Report
            </Button>
          )}
          {formName === "Equipment Usage Log Book – Hydro Extractor" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Hydro Extractor Report
            </Button>
          )}
          {formName === "Sanitization of machines and surfaces" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Machine & Surface Report
            </Button>
          )}
          {formName === "Bleaching Hand Sanitization Report" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Hand Sanitization Report
            </Button>
          )}{" "}
          {formName === "Shift Log Book" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Log Book Report
            </Button>
          )}
          {formName === "Mixing Change Over and Machine Cleaning Checklist" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Mixing change over Report
            </Button>
          )}
          {formName === "Equipment Usage Log Book - Waste Bale Press" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download Waste Bale Press Report
            </Button>
          )}
          {formName ===
            "House Keeping Cleaning Checklist (Bleaching and AB Cotton Godown)" && (
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                }}
                icon={<FaDownload />}
                shape="round"
              >
                Download House Keeping AB cotton Report
              </Button>
            )}
          {formName ===
            "House Keeping Cleaning Checklist (Blow room, Carding & Waste Bale Press)" && (
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                }}
                icon={<FaDownload />}
                shape="round"
              >
                Download House Keeping Blow Room Report
              </Button>
            )}
          {formName === "Applied Contamination Report (AB Cotton)" && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download AB Cotton Report
            </Button>
          )}
          {/* --------------------- > Spunlace Submit Button < ---------------------------  */}
          {formName && department == 2 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download {formName}
            </Button>
          )}
          {formName && department == 3 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download {formName}
            </Button>
          )}
          {formName && department == 4 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download {formName}
            </Button>
          )}
          {formName && department == 7 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download {formName}
            </Button>
          )}
          {formName && department == 8 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download {formName}
            </Button>
          )}
          {formName && (department == 5 || department == 6 || department == 12) && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download {formName}
            </Button>
          )}
          {formName && department == 10 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download {formName}
            </Button>
          )}
          {formName && department == 11 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<FaDownload />}
              shape="round"
            >
              Download {formName}
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Audittrail;
