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

const QA_f035_Inprocess_Inspection_Report_summary = () => {
  const navigate = useNavigate();
  const [printResponseData, setPrintResponseData] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [departments, setDepartments] = useState([]); // State for department LOV
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [pOrder, setPOrder] = useState("");
  const [open, setOpen] = useState(false);
  const [isPrintSelected, setIsprintSelected] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [BMR, setBMR] = useState([]);
  const [selectedBMr, setSelectedBMR] = useState("");
  const [selectedpOrder, setSelectedpOrder] = useState("");
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedPrintDepartment, setSelectedPrintDepartment] = useState("");
  const [isImages1Loaded, setIsImages1Loaded] = useState(false);
  const [isImages2Loaded, setIsImages2Loaded] = useState(false);
  const [isImages3Loaded, setIsImages3Loaded] = useState(false);
  const [isReasonColumn, setIsReasonColumn] = useState(false);

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
          `${API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportSummary?department=null&formatNo=PH-QAD01-F-035`,
          // `${ API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportSummary?department=pad punching`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSummaryData(summaryResponse.data);
        const hasReason = summaryResponse.data.some(
          (item) => item.reason !== null && item.reason !== "NA"
        );

        setIsReasonColumn(hasReason);
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
          `${API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportSummary?department=${department}&formatNo=PH-QAD01-F-035`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSummaryData(summaryResponse.data);
        const hasReason = summaryResponse.data.some(
          (item) => item.reason !== null && item.reason !== "NA"
        );

        setIsReasonColumn(hasReason);
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

  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

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
      //alert(isImages1Loaded);
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
  }, [isImages1Loaded, isImages2Loaded, isImages3Loaded, printResponseData]);

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
        `${API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportPrint?date=${date}&shift=${shift}&machineNo=${selectedMachine}&pOrder=${selectedpOrder}&bmrNo=${selectedBMr}&formatNo=PH-QAD01-F-035`,
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

  const years = generateYears();
  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const handlePrint = () => {
    setShowModal(true);
    setIsprintSelected(true);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const reasonColumn = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text, record) => {
      return text || "NA";
    },
  };
  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "20%",
    },

    {
      title: "QA_Inspector_Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      width: "20%",
      align: "center",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
    },
    {
      title: "Prod_Supervisor_Status",
      dataIndex: "prod_supervisor_status",
      key: "prod_supervisor_status",
      width: "20%",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
    },

    {
      title: "QA Manager or Designee Status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
      width: "20%",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
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

  const finalColumns = isReasonColumn
    ? [...columns.slice(0, -1), reasonColumn, columns[columns.length - 1]] // Insert before the last column
    : columns;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const sampleSizes = {
    bagWeight: "05 bags",
    avgWeightofBalls: "05 balls",
    noOfBallsPerPack: "05 bags",
    ballsDia: "05 balls",
    artWorkPainting: "05 bags",
    noOfPack: "05 cartons",
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
      navigate("/Precot/QualityAssurance/F-035/Inprocess_Inspection_Report", {
        state: {
          editDepartment: selectedDepartment,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityAssurance/F-035/Inprocess_Inspection_Report", {
      state: {
        editDate: record.date,
        editShift: record.shift,
        editMachineNo: record.machineNo,
        editPOrder: record.porder,
        editBmrNo: record.bmrNo,
      },
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    // print section
    //
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
                  <td colSpan="20" rowSpan="4" style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br />
                    Unit H
                  </td>
                  <th colSpan="70" rowSpan="4" style={{ textAlign: "center" }}>
                    ON-LINE INSPECTION REPORT (for Balls)
                  </th>

                  <td colSpan="35">Format No.:</td>
                  <td colSpan="35">PH-QAD01-F-035</td>
                </tr>
                <tr>
                  <td colSpan="35">Revision No.:</td>
                  <td colSpan="35">01</td>
                </tr>
                <tr>
                  <td colSpan="35">Ref. SOP No.:</td>
                  <td colSpan="35">PH-QAD01-D-31</td>
                </tr>
                <tr>
                  <td colSpan="35">Page No.:</td>
                  <td colSpan="35">
                    {index + 1}of {printResponseData?.length}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
              </thead>

              <>
                <tbody>
                  <tr>
                    <td style={{ width: "5px" }}>Date:</td>
                    <td colSpan="50"> {formatDate(data?.date) || "N/A"}</td>
                    <td colSpan="25">BMR No.</td>
                    <td colSpan="25">{data?.bmrNo || "N/A"}</td>
                    <td colSpan="50">Shift: {data?.shift || "N/A"}</td>
                  </tr>
                  <tr>
                    <td colSpan="60">
                      Product Description: {data?.productDescription || "N/A"}
                    </td>
                    <td colSpan="50">POrder: {data?.porder || "N/A"}</td>
                    <td colSpan="60">
                      Machine Name: {data?.machineNo || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="60">
                      Customer: {data?.customerName || "N/A"}
                    </td>
                    <td colSpan="50">Lot No.: {data?.lotNo || "N/A"}</td>
                    <td colSpan="50">FG No.: {data?.fgNo || "N/A"}</td>
                  </tr>

                  <tr>
                    <th>
                      <strong>Sr. No.</strong>
                    </th>
                    <th colSpan="40">
                      <strong>Parameter</strong>
                    </th>
                    <th colSpan="40">
                      <strong>Specification</strong>
                    </th>
                    <th colSpan="20">
                      <strong>Sample Size</strong>
                    </th>
                    <th colSpan="60">
                      <strong>Observation</strong>
                    </th>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>
                      <strong>A.</strong>
                    </td>
                    <td colSpan="158">
                      <strong>Process Control</strong> (to be checked at the
                      start of every shift or production) -{" "}
                    </td>
                  </tr>

                  <tr>
                    <td>(i)</td>
                    <td colSpan="40">Bag Weight</td>
                    <td colSpan="40">
                      {data?.bagWeightSpecification || "N/A"}
                    </td>
                    <td colSpan="20">{sampleSizes?.bagWeight || "N/A"}</td>
                    <td colSpan="60">{data?.bagWeightObservation || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>(ii)</td>
                    <td colSpan="40">Average Weight of balls</td>
                    <td colSpan="40">
                      {data?.averageWeightOfBallsSpecification || "N/A"}
                    </td>
                    <td colSpan="20">
                      {sampleSizes?.avgWeightofBalls || "N/A"}
                    </td>
                    <td colSpan="60">
                      {data?.averageWeightOfBallsObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td>(iii)</td>
                    <td colSpan="40">No. of Balls Per Pack</td>
                    <td colSpan="40">
                      {data?.noOfBallsPerPackSpecification || "N/A"}
                    </td>
                    <td colSpan="20">
                      {sampleSizes?.noOfBallsPerPack || "N/A"}
                    </td>
                    <td colSpan="60">
                      {data?.noOfBallsPerPackObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td>(iv)</td>
                    <td colSpan="40">Balls Dia</td>
                    <td colSpan="40">{data?.ballsDiaSpecification || "N/A"}</td>
                    <td colSpan="20">{sampleSizes?.ballsDia || "N/A"}</td>
                    <td colSpan="60">{data?.ballsDiaObservation || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>(v)</td>
                    <td colSpan="40">Artwork printing on bags / Label</td>
                    <td colSpan="40">
                      {data?.artworkPrintingOnBagsLabelsSpecification || "N/A"}
                    </td>
                    <td colSpan="20">
                      {sampleSizes?.artWorkPainting || "N/A"}
                    </td>
                    <td colSpan="60">
                      {data?.artworkPrintingOnBagsLabelsObservation || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td>(vi)</td>
                    <td colSpan="40">No. of Pack per carton</td>
                    <td colSpan="40">
                      {data?.noOfPackPerCotton35Specification || "N/A"}
                    </td>
                    <td colSpan="20">{sampleSizes?.noOfPack || "N/A"}</td>
                    <td colSpan="60">
                      {data?.noOfPackPerCotton35Observation || "N/A"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>B.</strong>
                    </td>
                    <td
                      colSpan="160"
                      style={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      <strong>Visual Inspection to Identify Defects</strong> (to
                      be inspected once in every two hours for all the below
                      mentioned defects)
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan="3" colSpan="10">
                      <strong>Note:</strong>In case of non-conformity entire
                      cartons/bags produced after last inspection shall be kept
                      separately on hold with proper identification and its
                      disposition action shall be taken in consultation with HOD
                      / Shift In-charge.{" "}
                    </td>
                    <td colSpan="30">Time :</td>
                    <td colSpan="30">{data.details[0]?.time || "N/A"}</td>
                    <td colSpan="30">{data.details[1]?.time || "N/A"}</td>
                    <td colSpan="30">{data.details[2]?.time || "N/A"}</td>
                    <td colSpan="30">{data.details[3]?.time || "N/A"}</td>
                  </tr>
                  <tr>
                    <td colSpan="30">Lot Size :</td>
                    <td colSpan="30">{data.details[0]?.lotSize || ""}</td>
                    <td colSpan="30">{data.details[1]?.lotSize || ""}</td>
                    <td colSpan="30">{data.details[2]?.lotSize || ""}</td>
                    <td colSpan="30">{data.details[3]?.lotSize || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="30">Sample Size :</td>
                    <td colSpan="30">{data.details[0]?.sampleSize || ""}</td>
                    <td colSpan="30">{data.details[1]?.sampleSize || ""}</td>
                    <td colSpan="30">{data.details[2]?.sampleSize || ""}</td>
                    <td colSpan="30">{data.details[3]?.sampleSize || ""}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>
                      <strong>1.</strong>
                    </td>
                    <td colSpan="150">
                      <strong>Critical</strong> - (No AQL for critical defects.
                      Zero defects are allowed)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(i)</td>
                    <td colSpan="45">Wrong / Missing FG No.</td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.wrongBoxFixed35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.wrongBoxFixed35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.wrongBoxFixed35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.wrongBoxFixed35 || ""}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ width: "5px" }}>(ii)</td>
                    <td colSpan="45">Insect Contamination</td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.insectContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.insectContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.insectContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.insectContamination35 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(iii)</td>
                    <td colSpan="45">Metal Contamination</td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.metalContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.metalContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.metalContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.metalContamination35 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(iv)</td>
                    <td colSpan="45">Less Count </td>
                    <td colSpan="10">-</td>
                    <td colSpan="30">{data.details[0]?.lessCount35 || ""}</td>
                    <td colSpan="30">{data.details[1]?.lessCount35 || ""}</td>
                    <td colSpan="30">{data.details[2]?.lessCount35 || ""}</td>
                    <td colSpan="30">{data.details[3]?.lessCount35 || ""}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(v)</td>
                    <td colSpan="45">
                      Major Discolouration / Breakage at serration
                    </td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.majorDiscolourationBreakage35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.majorDiscolourationBreakage35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.majorDiscolourationBreakage35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.majorDiscolourationBreakage35 || ""}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ width: "5px" }}>
                      <strong>2.</strong>
                    </td>
                    <td colSpan="150">
                      <strong> Major</strong> - (Refer Acceptance Sampling Plan
                      -Doc. No.PH-QAD01-D-029 , AQL - 2.5 under General
                      Inspection Level II)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(i)</td>
                    <td colSpan="45">Improper / Open / Damaged Sealing</td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.improperOpenDamagedSealing35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.improperOpenDamagedSealing35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.improperOpenDamagedSealing35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.improperOpenDamagedSealing35 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(ii)</td>
                    <td colSpan="45">Dirt / Dust Contamination</td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.dirtDustContaminatio35n || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.dirtDustContaminatio35n || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.dirtDustContaminatio35n || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.dirtDustContaminatio35n || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(iii)</td>
                    <td colSpan="45">Plastic Contamination</td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.plasticContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.plasticContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.plasticContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.plasticContamination35 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(iv)</td>
                    <td colSpan="45">Hair Contamination</td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.hairContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.hairContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.hairContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.hairContamination35 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(v)</td>
                    <td colSpan="45">
                      No cotton at end / Less Bonding Strength
                    </td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.noCottonAtEndLessBondingStrength35 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.noCottonAtEndLessBondingStrength35 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.noCottonAtEndLessBondingStrength35 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.noCottonAtEndLessBondingStrength35 ||
                        ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(vi)</td>
                    <td colSpan="45">
                      Shape or Compactness of balls not correct
                    </td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.shapeOrCompactnessOfBallsNotCorrect35 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.shapeOrCompactnessOfBallsNotCorrect35 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.shapeOrCompactnessOfBallsNotCorrect35 ||
                        ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.shapeOrCompactnessOfBallsNotCorrect35 ||
                        ""}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ width: "5px" }}>
                      <strong>3.</strong>
                    </td>
                    <td colSpan="150">
                      <strong>Minor</strong> - (Refer Acceptance Sampling Plan
                      -Doc. No.PH-QAD01-D-029 , AQL - 2.5 under General
                      Inspection Level II)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(i)</td>
                    <td colSpan="45">Black Contamination</td>
                    <td colSpan="10">Not Accepted</td>

                    <td colSpan="30">
                      {data.details[0]?.blackContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.blackContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.blackContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.blackContamination35 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(ii)</td>
                    <td colSpan="45">Colour Contamination</td>
                    <td colSpan="10">Not Accepted</td>

                    <td colSpan="30">
                      {data.details[0]?.colourContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.colourContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.colourContamination35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.colourContamination35 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(iii)</td>
                    <td colSpan="45">
                      Less Weight / Sliver Defect(Loose Sliver/Flat shape/more
                      hairiness)
                    </td>
                    <td colSpan="10">-</td>
                    <td colSpan="30">
                      {data.details[0]?.lessWeightSliverDefect35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.lessWeightSliverDefect35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.lessWeightSliverDefect35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.lessWeightSliverDefect35 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(iv)</td>
                    <td colSpan="45">Loose Cotton / Less Cotton / Tail Ends</td>
                    <td colSpan="10">Not Accepted</td>
                    <td colSpan="30">
                      {data.details[0]?.looseCottonLessCotton35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.looseCottonLessCotton35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.looseCottonLessCotton35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.looseCottonLessCotton35 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "5px" }}>(v)</td>
                    <td colSpan="45">
                      Improper or Illegible printing of FG No.
                    </td>
                    <td colSpan="10">Easily Readable</td>
                    <td colSpan="30">
                      {data.details[0]?.improperOrIllegiblePrintingFgNo35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[1]?.improperOrIllegiblePrintingFgNo35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[2]?.improperOrIllegiblePrintingFgNo35 || ""}
                    </td>
                    <td colSpan="30">
                      {data.details[3]?.improperOrIllegiblePrintingFgNo35 || ""}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="56">
                      <strong>Result:</strong>
                    </td>
                    <td colSpan="30">{data.details[0]?.result || ""}</td>
                    <td colSpan="30">{data.details[1]?.result || ""}</td>
                    <td colSpan="30">{data.details[2]?.result || ""}</td>
                    <td colSpan="30">{data.details[3]?.result || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="160">Remark: {data.remark} </td>
                  </tr>
                  <tr>
                    <td colSpan="30">
                      <strong>Lot Status:</strong>
                    </td>
                    <td colSpan="130">{data.lotStatus}</td>
                  </tr>

                  <tr>
                    <td colSpan="30">
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
                    <td colSpan="60">
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
                  <th colSpan="40" style={{ textAlign: "start" }}>
                    Particulars
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
                  <th colSpan="40" style={{ textAlign: "start" }}>
                    Name
                  </th>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                </tr>
                <tr>
                  <th colSpan="40" style={{ textAlign: "start" }}>
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
        formName="ON-LINE INSPECTION REPORT(FOR BALLS)"
        formatNo="PH-QAD01-F-035"
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
              <Select.Option value="Dry Goods">Dry Goods</Select.Option>
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
        columns={finalColumns}
        dataSource={summaryData}
        style={{ textAlign: "center", width: "100%" }}
      />
      {/* Modal for Printing */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={printSubmit}
            loading={printLoading}
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
            showSearch
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
            style={{ width: "50%" }}
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

        {/* BMR No Input */}
      </Modal>{" "}
    </div>
  );
};
export default QA_f035_Inprocess_Inspection_Report_summary;
