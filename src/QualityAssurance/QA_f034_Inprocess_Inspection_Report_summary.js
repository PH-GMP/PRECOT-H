import {
  Button,
  DatePicker,
  Form,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
import API from "../baseUrl.json";

const QA_f034_Inprocess_Inspection_Report_summary = () => {
  const navigate = useNavigate();
  const [printResponseData, setPrintResponseData] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [departments, setDepartments] = useState([]); // State for department LOV
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [pOrder, setPOrder] = useState("");
  const [BMR, setBMR] = useState([]);
  const [selectedBMr, setSelectedBMR] = useState("");
  const [selectedpOrder, setSelectedpOrder] = useState("");
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedPrintDepartment, setSelectedPrintDepartment] = useState("");
  const [open, setOpen] = useState(false);
  const [isPrintSelected, setIsprintSelected] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isImages1Loaded, setIsImages1Loaded] = useState(false);
  const [isImages2Loaded, setIsImages2Loaded] = useState(false);
  const [isImages3Loaded, setIsImages3Loaded] = useState(false);

  // Function to fetch department LOV from the API
  const fetchDepartmentsLov = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token"); // Get token from localStorage
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

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartmentsLov();
  }, []);

  // Fetch audit schedule summary
  const fetchInspectReportSummary = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const departId = localStorage.getItem("departmentId");
      let department = "";

      if (
        role === "ROLE_QA" ||
        role === "QA_MANAGER" ||
        role === "ROLE_DESIGNEE"
      ) {
        // QA Inspector can see all summary without filtering by department
        const summaryResponse = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportSummary?department=null&formatNo=PH-QAD01-F-034`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSummaryData(summaryResponse.data);
      } else if (role === "ROLE_SUPERVISOR") {
        // Supervisor can only see the summary of their assigned department
        if (departId === "3") {
          department = "pad punching";
        } else if (departId === "4") {
          department = "dry goods";
        } else {
          throw new Error("Invalid department for supervisor");
        }

        const summaryResponse = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportSummary?department=${department}&formatNo=PH-QAD01-F-034`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSummaryData(summaryResponse.data);
      } else {
        console.error("Role not authorized to view this summary");
      }
    } catch (error) {
      console.error("Error fetching audit schedule summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspectReportSummary();
  }, []);

  const fetchImages1 = async () => {
    const token = localStorage.getItem("token");

    if (Array.isArray(printResponseData)) {
      const promises = printResponseData.map(async (item, index) => {
        const username = item?.qa_inspector_sign;
        if (username) {
          try {
            const res = await axios.get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                responseType: "arraybuffer",
              }
            );
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;

            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          } catch (err) {
            console.error("Error in fetching image:", err);
          }
        }
      });

      // Wait for all image fetch promises to complete
      await Promise.all(promises);
      setIsImages1Loaded(true);
    } else {
      setIsImages1Loaded(true);
    }
  };

  // Fetch image for HOD sign
  const fetchImages3 = async () => {
    const token = localStorage.getItem("token");

    if (Array.isArray(printResponseData)) {
      const promises = printResponseData.map(async (item, index) => {
        const username = item?.qa_mr_sign;
        if (username) {
          try {
            const res = await axios.get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                responseType: "arraybuffer",
              }
            );
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;

            setGetImage3((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          } catch (err) {
            console.error("Error in fetching image:", err);
          }
        }
      });

      // Wait for all image fetch promises to complete
      await Promise.all(promises);
      setIsImages3Loaded(true);
    } else {
      setIsImages3Loaded(true);
    }
  };

  // Fetch image for HOD sign
  const fetchImages2 = async () => {
    const token = localStorage.getItem("token");

    if (Array.isArray(printResponseData)) {
      const promises = printResponseData.map(async (item, index) => {
        const username = item?.prod_supervisor_sign;
        if (username) {
          try {
            const res = await axios.get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                responseType: "arraybuffer",
              }
            );
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;

            setGetImage2((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          } catch (err) {
            console.error("Error in fetching image:", err);
          }
        }
      });

      // Wait for all image fetch promises to complete
      await Promise.all(promises);
      setIsImages2Loaded(true);
    } else {
      setIsImages2Loaded(true);
    }
  };

  useEffect(() => {
    fetchImages1();
    fetchImages2();
    fetchImages3();
  }, [printResponseData]);

  useEffect(() => {
    // Check all conditions
    if (
      isImages1Loaded &&
      isImages2Loaded &&
      isImages3Loaded &&
      printResponseData
    ) {
      // All conditions are met, trigger the print

      window.print();
    }
  }, [isImages1Loaded, isImages2Loaded, isImages3Loaded, printResponseData]); //

  // Print function
  useEffect(() => {
    fetchBMRLov();
  }, [selectedPrintDepartment]);

  useEffect(() => {
    fetchpOderLov();
  }, [selectedPrintDepartment, selectedBMr]);

  const fetchBMRLov = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");
      //alert(selectedDepartment);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/bmrLov?department=${selectedPrintDepartment}`, // Replace with your actual API base URL
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
        `${API.prodUrl}/Precot/api/QA/Service/api/pOderLov?department=${selectedPrintDepartment}&batchNo=${selectedBMr}`, // Replace with your actual API base URL
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

  useEffect(() => {
    fetchMachinesLov();
  }, []);

  const fetchMachinesLov = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/machineLov`, // Replace with your actual API base URL
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

  const printSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportPrint?date=${date}&shift=${shift}&machineNo=${selectedMachine}&pOrder=${selectedpOrder}&bmrNo=${selectedBMr}&formatNo=PH-QAD01-F-034`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        setPrintLoading(true);
        setPrintResponseData(response.data);
      } else {
        setPrintLoading(false);

        message.warning("No data available for the selected Fields.");
      }
    } catch (error) {
      setPrintLoading(false);

      message.error("Error fetching data. Please try again.");
      console.error("API Error:", error);
    }

    handleModalClose();
  };

  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  // Modal close handler
  const handleModalClose = () => {
    setShowModal(false);
    setIsprintSelected(false);
    setDate("");
    setShift("");
    setPrintLoading(false);
    setSelectedMachine("");
    setSelectedpOrder("");
    setSelectedBMR("");
    setIsImages1Loaded(false);
    setIsImages2Loaded(false);
    setIsImages3Loaded(false);
  };

  const departmentChange = (value) => setSelectedDepartment(value);

  const handleDateChange = (date) =>
    setDate(date ? date.format("YYYY-MM-DD") : ""); // Format date to YYYY-MM-DD
  const handleShiftChange = (value) => {
    setShift(value); // Use the selected value directly
  };

  const departmentPrintChange = (value) => setSelectedPrintDepartment(value);
  const machineChange = (value) => setSelectedMachine(value);
  const handleBmrNoChange = (value) => setSelectedBMR(value);
  const pOrderChange = (value) => setSelectedpOrder(value);

  const shifts = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => ({
      label: (currentYear + i).toString(),
      value: (currentYear + i).toString(),
    }));
  };

  const handlePrint = () => {
    setShowModal(true);
    setIsprintSelected(true);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  // Define columns for the audit schedule summary table
  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "20%",
      align: "center",
    },

    {
      title: "QA Inspectors Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      align: "center",
      render: (text) => {
        const statusMap = {
          QA_INS_SUBMITTED: "QA_INSPECTOR_SUBMITTED",
          QAINSPECTOR_SAVED: "QA_INSPECTOR_SAVED",
        };

        return statusMap[text] || text;
      },
    },
    {
      title: "Prod_Supervisor_Status",
      dataIndex: "prod_supervisor_status",
      key: "prod_supervisor_status",
      width: "20%",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
      align: "center",
    },

    {
      title: "QA/Designee Status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
      width: "20%",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: "20%",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
      align: "center",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<BiEdit />}
          style={{ width: "100%" }}
          onClick={() => handleEdit(record)}
        >
          Review
        </Button>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const sampleSizes = {
    surfacePattern: "5 bags",
    averageGsmWeight: "10 bags",
    productSizeDiaOfRolls: "5 bags",
    noOfFoldsPleat: "5 bags",
    artworkPrintingOnBagsLabels: "5 bags",
    noOfBagsPerCarton: "20 Bags",
    filledBoxGrossWeight: "5 cartons",
    moisture: "5 bags",
  };

  const inspectionCriteria = [
    { label: "Wrong / Missing FG No." },
    { label: "Insect Contamination" },
    { label: "Metal Contamination" },
    { label: "Less Count / Weight per bag" },
  ];

  const handleNavigate = () => {
    if (departments == "") {
      message.warning("Please Select Department");
    } else {
      navigate("/Precot/QualityAssurance/F-034/Inprocess_Inspection_Report", {
        state: {
          editDepartment: selectedDepartment,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityAssurance/F-034/Inprocess_Inspection_Report", {
      state: {
        editDate: record.date,
        editShift: record.shift,
        editMachineNo: record.machineNo,
        editPOrder: record.porder,
        editBmrNo: record.bmrNo,
      },
    });
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {Array.isArray(printResponseData) && printResponseData.length > 0 ? (
          printResponseData?.map((data, index) => (
            <table style={{ marginTop: "10px", scale: "94%" }}>
              <br />
              <thead>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
                <tr>
                  <td colSpan="30" rowSpan="4" style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br />
                    Unit H
                  </td>
                  <th colSpan="80" rowSpan="4" style={{ textAlign: "center" }}>
                    ONLINE-INSPECTION REPORT (for PADS / PLEATS / ROLLS)
                  </th>
                  <td colSpan="25">Format No:</td>
                  <td colSpan="25">PH-QAD01-F-034</td>
                </tr>
                <tr>
                  <td colSpan="25">Revision No:</td>
                  <td colSpan="25">03</td>
                </tr>
                <tr>
                  <td colSpan="25">Ref. SOP No:</td>
                  <td colSpan="25">PH-QAD01-D-31</td>
                </tr>
                <tr>
                  <td colSpan="25">Page No.:</td>
                  <td colSpan="25">
                    {index + 1}of {printResponseData?.length}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
              </thead>

              <>
                <tbody>
                  {/* Auditee and IAR No. Row */}

                  <tr>
                    <td colSpan="75">
                      Product Description:{data?.productDescription || "N/A"}
                    </td>

                    <td colSpan="25">BMR No.</td>
                    <td colSpan="25">{data?.bmrNo || "N/A"}</td>
                    <td colSpan="25">Shift</td>
                    <td colSpan="25">{data?.shift || "N/A"}</td>
                  </tr>
                  <tr>
                    <td colSpan="60">
                      Customer Name: {data?.customerName || "N/A"}
                    </td>
                    <td colSpan="50">P Order: {data?.pOrder || "N/A"}</td>
                    <td colSpan="50">
                      Date:{" "}
                      {data?.date
                        ? moment(data.date, "YYYY-MMMM-DD").format("DD/MM/YYYY")
                        : "" || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="40">Item Code: {data?.itemCode || "N/A"}</td>
                    <td colSpan="60">
                      Machine Name: {data?.machineName || "N/A"}
                    </td>
                    <td colSpan="30">FG No.: {data?.fgNo || "N/A"}</td>
                    <td colSpan="30">PO No.: {data?.poNo || "N/A"}</td>
                  </tr>
                  <tr>
                    <td colSpan="80">Lot No.: {data?.lotNo || "N/A"}</td>
                    <td colSpan="80">General Inspection Level - II</td>
                  </tr>
                  <tr>
                    <th colSpan="40">Parameters</th>
                    <th colSpan="40">Specification</th>
                    <th colSpan="20">Sample Size</th>
                    <th colSpan="60">Actual Findings / Observation</th>
                  </tr>
                  <tr>
                    <td colSpan="40">Surface Pattern</td>
                    <td colSpan="40">
                      {data?.surfacePatternSpecification || "N/A"}
                    </td>
                    <td colSpan="20">{sampleSizes?.surfacePattern || "N/A"}</td>
                    <td colSpan="60">
                      {data?.surfacePatternObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="40">Average GSM / Weight</td>
                    <td colSpan="40">
                      {data?.averageGsmWeightSpecification || "N/A"}
                    </td>
                    <td colSpan="20">
                      {sampleSizes?.averageGsmWeight || "N/A"}
                    </td>
                    <td colSpan="60">
                      {data?.averageGsmWeightObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="40">Product Size / Dia. of Rolls</td>
                    <td colSpan="40">
                      {data?.productSizeDiaOfRollsSpecification || "N/A"}
                    </td>
                    <td colSpan="20">
                      {sampleSizes?.productSizeDiaOfRolls || "N/A"}
                    </td>
                    <td colSpan="60">
                      {data?.productSizeDiaOfRollsObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="40">No. of Folds (Pleat)</td>
                    <td colSpan="40">
                      {data?.noOfFoldsPleatSpecification || "N/A"}
                    </td>
                    <td colSpan="20">{sampleSizes?.noOfFoldsPleat || "N/A"}</td>
                    <td colSpan="60">
                      {data?.noOfFoldsPleatObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="40">Artwork Printing on Bags / Label</td>
                    <td colSpan="40">
                      {data?.artworkPrintingOnBagsLablesSpecification || "N/A"}
                    </td>
                    <td colSpan="20">
                      {sampleSizes?.artworkPrintingOnBagsLabels || "N/A"}
                    </td>
                    <td colSpan="60">
                      {data?.artworkPrintingOnBagsLablesObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="40">No. of Bags per Carton</td>
                    <td colSpan="40">
                      {data?.noofBagsPerCartonSpecification || "N/A"}
                    </td>
                    <td colSpan="20">
                      {sampleSizes?.noOfBagsPerCarton || "N/A"}
                    </td>
                    <td colSpan="60">
                      {data?.noofBagsPerCartonObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="40">Filled Box Gross weight</td>
                    <td colSpan="40">
                      {data?.filledBoxGrossWeightSpecification || "N/A"}
                    </td>
                    <td colSpan="20">
                      {sampleSizes?.filledBoxGrossWeight || "N/A"}
                    </td>
                    <td colSpan="60">
                      {data?.filledBoxGrossWeightObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="40">Moisture %</td>
                    <td colSpan="40">{data?.moistureSpecification || "N/A"}</td>
                    <td colSpan="20">{sampleSizes?.moisture || "N/A"}</td>
                    <td colSpan="60">{data?.moistureObservation || "N/A"}</td>
                  </tr>

                  <tr>
                    <td
                      colSpan="160"
                      style={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      Visual Inspection to Identify Defects (to be inspected
                      once in every two hours for all the below mentioned
                      defects)
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="40">Time :</td>
                    <td colSpan="30">{data.details[0]?.time || ""}</td>
                    <td colSpan="30">{data.details[1]?.time || ""}</td>
                    <td colSpan="30">{data.details[2]?.time || ""}</td>
                    <td colSpan="30">{data.details[3]?.time || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="40">Lot Size :</td>
                    <td colSpan="30">{data.details[0]?.lotSize || ""}</td>
                    <td colSpan="30">{data.details[1]?.lotSize || ""}</td>
                    <td colSpan="30">{data.details[2]?.lotSize || ""}</td>
                    <td colSpan="30">{data.details[3]?.lotSize || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="40">Sample Size :</td>
                    <td colSpan="30">{data.details[0]?.sampleSize || ""}</td>
                    <td colSpan="30">{data.details[1]?.sampleSize || ""}</td>
                    <td colSpan="30">{data.details[2]?.sampleSize || ""}</td>
                    <td colSpan="30">{data.details[3]?.sampleSize || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="10">1:.</td>
                    <td colSpan="150">
                      Critical - (No AQL for critical defects. Zero defects are
                      allowed)
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">1.</td>
                    <td colSpan="55">Wrong / Missing FG No.</td>
                    <td colSpan="30">
                      {data.details[0]?.wrongBoxFixed34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.wrongBoxFixed34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.wrongBoxFixed34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.wrongBoxFixed34 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">2.</td>
                    <td colSpan="55">Insect Contamination</td>
                    <td colSpan="30">
                      {data.details[0]?.insectContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.insectContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.insectContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.insectContamination34 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">3.</td>
                    <td colSpan="55">Metal Contamination</td>
                    <td colSpan="30">
                      {data.details[0]?.metalContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.metalContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.metalContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.metalContamination34 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">4.</td>
                    <td colSpan="55">Less Count / Weight per bag</td>
                    <td colSpan="30">
                      {data.details[0]?.lessCountWeightPerBag34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.lessCountWeightPerBag34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.lessCountWeightPerBag34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.lessCountWeightPerBag34 || ""}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="10">2.</td>
                    <td colSpan="150">
                      Major - (Refer Acceptance Sampling Plan -Doc.
                      No.PH-QAD01-D-029 , AQL - 2.5 under General Inspection
                      Level II)
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">1.</td>
                    <td colSpan="55">Cut Pads</td>
                    <td colSpan="30">{data.details[0]?.cutPads34 || ""}</td>
                    <td colSpan="30">{data.details[1]?.cutPads34 || ""}</td>
                    <td colSpan="30">{data.details[2]?.cutPads34 || ""}</td>
                    <td colSpan="30">{data.details[3]?.cutPads34 || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="5">2.</td>
                    <td colSpan="55">Improper / Open / Damaged Sealing</td>
                    <td colSpan="30">
                      {data.details[0]?.improperOpenDamagedSealing34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.improperOpenDamagedSealing34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.improperOpenDamagedSealing34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.improperOpenDamagedSealing34 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">3.</td>
                    <td colSpan="55">Dirt / Dust Contamination</td>
                    <td colSpan="30">
                      {data.details[0]?.dirtDustContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.dirtDustContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.dirtDustContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.dirtDustContamination34 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">4.</td>
                    <td colSpan="55">Plastic Contamination</td>
                    <td colSpan="30">
                      {data.details[0]?.plasticContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.plasticContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.plasticContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.plasticContamination34 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">5.</td>
                    <td colSpan="55">Hair Contamination</td>
                    <td colSpan="30">
                      {data.details[0]?.hairContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.hairContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.hairContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.hairContamination34 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">6.</td>
                    <td colSpan="55">
                      Lower/Higher Filling Height / Less Dia.
                    </td>
                    <td colSpan="30">
                      {data.details[0]?.lowerHigherFillingHeightLessData34 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.lowerHigherFillingHeightLessData34 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.lowerHigherFillingHeightLessData34 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.lowerHigherFillingHeightLessData34 ||
                        ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">7.</td>
                    <td colSpan="55">Improper Pad Alignment</td>
                    <td colSpan="30">
                      {data.details[0]?.improperPadAllignment34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.improperPadAllignment34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.improperPadAllignment34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.improperPadAllignment34 || ""}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="10">3.</td>
                    <td colSpan="150">
                      Minor - (Refer Acceptance Sampling Plan -Doc.
                      No.PH-QAD01-D-029 , AQL - 2.5 under General Inspection
                      Level II)
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">1.</td>
                    <td colSpan="55">Black Contamination</td>
                    <td colSpan="30">
                      {data.details[0]?.blackContamintion || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.blackContamintion || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.blackContamintion || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.blackContamintion || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">2.</td>
                    <td colSpan="55">Colour Contamination</td>
                    <td colSpan="30">
                      {data.details[0]?.coloutContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.coloutContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.coloutContamination34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.coloutContamination34 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">3.</td>
                    <td colSpan="55">Edge Condition (Open/Closed/Stitched)</td>
                    <td colSpan="30">
                      {data.details[0]?.edgeCondition34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.edgeCondition34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.edgeCondition34 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.edgeCondition34 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">4.</td>
                    <td colSpan="55">Folded Pads / No. of folds for pleat</td>
                    <td colSpan="30">{data.details[0]?.folderPads34 || ""}</td>
                    <td colSpan="30">{data.details[1]?.folderPads34 || ""}</td>
                    <td colSpan="30">{data.details[2]?.folderPads34 || ""}</td>
                    <td colSpan="30">{data.details[3]?.folderPads34 || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="5">5.</td>
                    <td colSpan="55">
                      Improper or Illegible printing of FG No.
                    </td>
                    <td colSpan="30">
                      {data.details[0]?.improperOrIllegiblePrintingOfFgNo34 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.improperOrIllegiblePrintingOfFgNo34 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.improperOrIllegiblePrintingOfFgNo34 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.improperOrIllegiblePrintingOfFgNo34 ||
                        ""}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="60">Result</td>
                    <td colSpan="30">{data.details[0]?.result || ""}</td>
                    <td colSpan="30">{data.details[1]?.result || ""}</td>
                    <td colSpan="30">{data.details[2]?.result || ""}</td>
                    <td colSpan="30">{data.details[3]?.result || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="160">Remark :{data.remarks} </td>
                  </tr>
                  <tr>
                    <td colSpan="30">Lot Status</td>
                    <td colSpan="130">{data.lotStatus}</td>
                  </tr>

                  <tr>
                    <td colSpan="50">
                      {data.qa_inspector_sign}{" "}
                      {formattedDateWithTime(data.qa_inspector_submit_on)}
                      <br />
                      {getImage1[index] ? (
                        <img
                          src={getImage1[index]}
                          alt={`Ins Sign ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "60px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      ) : (
                        <span>No image available</span>
                      )}
                    </td>
                    <td colSpan="50">
                      {data.prod_supervisor_sign}{" "}
                      {formattedDateWithTime(data.prod_supervisor_submit_on)}
                      <br />
                      {getImage2[index] ? (
                        <img
                          src={getImage2[index]}
                          alt={`Supervisor Sign ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "60px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      ) : (
                        <span>No image available</span>
                      )}
                    </td>
                    <td colSpan="60">
                      {data.qa_mr_sign}{" "}
                      {formattedDateWithTime(data.qa_mr_submit_on)}
                      <br />
                      {getImage3[index] ? (
                        <img
                          src={getImage3[index]}
                          alt={`QAMR Sign ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "60px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      ) : (
                        <span>No image available</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </>
              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
                <tr>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Particular
                  </th>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Prepared by
                  </th>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Reviewed by
                  </th>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Approved by
                  </th>
                </tr>
                <tr>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Name
                  </th>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                </tr>
                <tr>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Signature & Date
                  </th>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                </tr>
              </tfoot>

              <br />
            </table>
          ))
        ) : (
          <tr>
            <td colSpan="2">No data available</td>
          </tr>
        )}
      </div>
      {/* Header Section */}
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
            icon={<BiNavigation />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
            shape="round"
          >
            Print
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
              // eslint-disable-next-line no-unused-expressions
              window.confirm("Are you sure want to Logout") == true
                ? navigate("/Precot")
                : null;
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

      {/* Year and Month Selection */}
      <Row>
        <Form style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
          <Form.Item label="Department">
            <Select
              value={selectedDepartment}
              placeholder="Choose Department"
              style={{ width: "150px" }}
              onChange={departmentChange}
            >
              <Select.Option value="Pad Punching">Pad Punching</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<BiNavigation />}
              onClick={handleNavigate}
              shape="round"
            >
              Go To
            </Button>
          </Form.Item>
        </Form>
      </Row>

      {/* Table Display */}
      <Table
        bordered
        columns={columns}
        dataSource={summaryData}
        loading={loading}
        style={{ textAlign: "center", width: "100%" }}
      />

      {/* Modal for Printing */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        loading={printLoading}
        footer={[
          <Button key="submit" type="primary" onClick={printSubmit}>
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date:
          </label>
          <DatePicker
            onChange={handleDateChange}
            style={{ width: "50%" }}
            placeholder="Select Date"
            value={date ? moment(date) : null}
          />
        </div>

        {/* Shift Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Shift:
          </label>
          <Select
            options={shifts}
            onChange={handleShiftChange}
            style={{ width: "50%" }}
            placeholder="Select Shift"
            value={shift}
          />
        </div>

        {/* Machine No Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Machine Name:
          </label>
          <Select
            value={selectedMachine}
            placeholder="Choose Machine"
            style={{ width: "50%" }} // Use 100% width for flexibility
            onChange={machineChange}
            options={machines}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Department:
          </label>
          <Select
            value={selectedPrintDepartment}
            placeholder="Choose Department"
            style={{ width: "50%" }} // Use 100% width for flexibility
            onChange={departmentPrintChange}
            options={departments}
          />
        </div>

        {/*  BMR No: */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            BMR No:
          </label>
          <Select
            showSearch
            value={selectedBMr}
            onChange={handleBmrNoChange}
            style={{ width: "70%" }}
            placeholder="Enter BMR No"
            options={BMR}
          />
        </div>

        {/* Production Order (pOrder) Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Production Order:
          </label>
          <Select
            showSearch
            value={selectedpOrder}
            placeholder="Choose POrder"
            style={{ width: "50%" }} // Use 100% width for flexibility
            onChange={pOrderChange}
            options={pOrder}
          />
        </div>
      </Modal>
    </div>
  );
};
export default QA_f034_Inprocess_Inspection_Report_summary;
