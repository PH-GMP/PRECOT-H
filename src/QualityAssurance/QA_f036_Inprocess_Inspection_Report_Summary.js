/* eslint-disable no-restricted-globals */
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

/*eslind-disabled*/

const QA_f036_Inprocess_Inspection_Report_summary = () => {
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
  const [isReasonColumn, setIsReasonColumn] = useState(false);

  // for print Modal

  const [BMR, setBMR] = useState([]);
  const [selectedBMr, setSelectedBMR] = useState("");
  const [selectedpOrder, setSelectedpOrder] = useState("");
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedPrintDepartment, setSelectedPrintDepartment] = useState("");

  // handleChange for print Modal

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
          `${API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportSummary?department=null&formatNo=PH-QAD01/F-036`,

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
        } else if (departId === "12") {
          department = "cotton buds";
        } else {
          throw new Error("Invalid department for supervisor");
        }

        const summaryResponse = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportSummary?department=${department}&formatNo=PH-QAD01/F-036`,
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Iterate through printResponseData
    if (Array.isArray(printResponseData)) {
      printResponseData?.forEach((item, index) => {
        const username = item?.qa_inspector_sign; // Get username
        if (username) {
          // Make API call to fetch image
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
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

              // Update state with the new image URL
              setGetImage1((prevImages) => ({
                ...prevImages,
                [index]: url, // Set image URL for the current index
              }));
            })
            .catch((err) => {});
        }
      });
    }
  }, [printResponseData,API.prodUrl]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (Array.isArray(printResponseData)) {
      // Iterate through printResponseData
      printResponseData?.forEach((item, index) => {
        const username = item?.prod_supervisor_submit_on; // Get username
        if (username) {
          // Make API call to fetch image
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
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

              // Update state with the new image URL
              setGetImage2((prevImages) => ({
                ...prevImages,
                [index]: url, // Set image URL for the current index
              }));
            })
            .catch((err) => {});
        }
      });
    }
  }, [printResponseData,API.prodUrl]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (Array.isArray(printResponseData)) {
      // Iterate through printResponseData
      printResponseData?.forEach((item, index) => {
        const username = item?.qa_mr_sign; // Get username
        if (username) {
          // Make API call to fetch image
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
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

              // Update state with the new image URL
              setGetImage3((prevImages) => ({
                ...prevImages,
                [index]: url, // Set image URL for the current index
              }));
            })
            .catch((err) => {});
        }
      });
    }
  }, [printResponseData,API.prodUrl]);

  useEffect(() => {
    fetchBMRLov();
  }, [selectedPrintDepartment]);

  useEffect(() => {
    fetchpOderLov();
  }, [selectedPrintDepartment, selectedBMr]);

  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

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

  // papi
  const printSubmit = async () => {
    setPrintLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/getOnlineInspectionReportPrint?date=${date}&shift=${shift}&machineNo=${selectedMachine}&pOrder=${selectedpOrder}&bmrNo=${selectedBMr}&formatNo=PH-QAD01/F-036`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
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

  // Print function

  useEffect(() => {
    setTimeout(() => {
      if (printResponseData) {
        setPrintLoading(false);

        window.print();
      }
    }, 2000);
  }, [printResponseData]);

  // Modal close handler
  const handleModalClose = () => {
    setShowModal(false);
    setPrintLoading(false);
    setIsprintSelected(false);
    setDate("");
    setShift("");
    setSelectedMachine("");
    setSelectedBMR("");
    setSelectedpOrder("");
    setSelectedPrintDepartment("");
  };

  // Handle month/year change
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

  const reasonColumn = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text, record) => {
      // Assuming qaManagerStatus is a field in the same record

      return text || "NA"; // Default value if reason is not present
    },
  };
  // Define columns for the audit schedule summary table
  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
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
      align: "center",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
    },

    {
      title: "QA/MR Status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
      width: "20%",
      align: "center",
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

  const handleNavigate = () => {
    if (selectedDepartment == "") {
      // setError('Please select a date');
      message.warning("Please Select Department");
      return;
    } else {
      navigate("/Precot/QualityAssurance/F-036/inprocess_inspection_report", {
        state: {
          editDepartment: selectedDepartment,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityAssurance/F-036/inprocess_inspection_report", {
      state: {
        editDate: record.date,
        editShift: record.shift,
        editMachineNo: record.machineNo,
        editPOrder: record.porder,
        editBmrNo: record.bmrNo,
        //status: record.auditScheduleStatus,
      },
    });
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {Array.isArray(printResponseData) && printResponseData.length > 0 ? (
          printResponseData?.map((data, index) => (
            <>
              <div>
                <table style={{ marginTop: "10px", scale: "94%" }}>
                  <thead>
                    <tr style={{ border: "none" }}>
                      <td style={{ border: "none" }}></td>
                    </tr>
                    <tr>
                      <th rowSpan={4} style={{ textAlign: "center" }}>
                        <img
                          src={logo}
                          alt="Logo"
                          style={{ width: "50px", height: "auto" }}
                        />{" "}
                        <br></br>
                        Unit H
                      </th>
                      <th
                        rowSpan="4"
                        style={{ textAlign: "center" }}
                        colSpan={3}
                      >
                        ON-LINE INSPECTION REPORT (for Buds)
                      </th>

                      <th colSpan={2}>Format No:</th>
                      <th colSpan={2}>PH-QAD01/F-036</th>
                    </tr>
                    <tr>
                      <th colSpan={2}>Revision No:</th>
                      <th colSpan={2}>01</th>
                    </tr>
                    <tr>
                      <th colSpan={2}>Ref. SOP No:</th>
                      <th colSpan={2}>PH-QAD01-D-31</th>
                    </tr>
                    <tr>
                      <th colSpan={2}>Page No.:</th>
                      <td colSpan={2}>
                        {index + 1}of {printResponseData?.length}
                      </td>
                    </tr>
                    <tr style={{ border: "none" }}>
                      <th style={{ border: "none" }}></th>
                    </tr>
                  </thead>

                  <>
                    <tbody>
                      {/* Auditee and IAR No. Row */}

                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={2}>
                          Date:{" "}
                          {data?.date
                            ? moment(data.date, "YYYY-MMMM-DD").format(
                                "DD/MM/YYYY"
                              )
                            : "" || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          Shift:{data?.shift || "N/A"}
                        </td>
                        <td colSpan={2} style={{ padding: "0.5rem" }}>
                          FG No:{data?.fgNo || "N/A"}
                        </td>
                        <td colSpan={3} style={{ padding: "0.5rem" }}>
                          Machine Name: {data?.machineName || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} style={{ padding: "0.5rem" }}>
                          Product Description:{" "}
                          {data?.productDescription || "N/A"}
                        </td>
                        <td colSpan={2} style={{ padding: "0.5rem" }}>
                          P Order: {data?.pOrder || "N/A"}
                        </td>
                        <td colSpan={3} style={{ padding: "0.5rem" }}>
                          Lot No.: {data?.lotNo || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={4} style={{ padding: "0.5rem" }}>
                          Customer Name: {data?.customerName || "N/A"}
                        </td>

                        <td colSpan={2} style={{ padding: "0.5rem" }}>
                          BMR No.
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={2}>
                          {" "}
                          {data?.bmrNo || "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <th style={{ padding: "0.5rem", width: "10px" }}>
                          Sr.No
                        </th>
                        <th colSpan={2} style={{ padding: "0.5rem" }}>
                          Parameters
                        </th>
                        <th style={{ padding: "0.5rem" }}>Specification</th>
                        <th style={{ padding: "0.5rem" }}>Sample Size</th>
                        <th style={{ padding: "0.5rem" }} colSpan={3}>
                          Observation
                        </th>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem", width: "10px" }}>
                          (i)
                        </td>
                        <td colSpan={2} style={{ padding: "0.5rem" }}>
                          Bag / Box weight
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data?.bagBoxWeightSpecification || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {sampleSizes?.bagWeight || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          {data?.bagBoxWeightObservation || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem", width: "10px" }}>
                          (ii)
                        </td>
                        <td colSpan={2} style={{ padding: "0.5rem" }}>
                          Average Weight of Buds
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data?.averageWeightOfBudsSpecification || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {sampleSizes?.avgWeightofBalls || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          {data?.averageWeightOfBudsObservation || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem", width: "10px" }}>
                          (iii)
                        </td>
                        <td colSpan={2} style={{ padding: "0.5rem" }}>
                          No. of Buds per pack
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data?.noOfBudsPerPackSpecification || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {sampleSizes?.noOfBallsPerPack || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          {data?.noOfBudsPerPackObservation || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem", width: "10px" }}>
                          (iv)
                        </td>
                        <td colSpan={2} style={{ padding: "0.5rem" }}>
                          Buds size / Diameter
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data?.budssizedDiameterSpecification || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {sampleSizes?.ballsDia || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          {data?.budssizedDiameterObservation || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem", width: "10px" }}>
                          (v)
                        </td>
                        <td colSpan={2} style={{ padding: "0.5rem" }}>
                          Artwork printing on bags / Label
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data?.artworkPrintingOnBudsLabelsSpecification ||
                            "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {sampleSizes?.artWorkPainting || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          {data?.artworkPrintingOnBudsLabelsObservation ||
                            "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem", width: "10px" }}>
                          (vi)
                        </td>
                        <td colSpan={2} style={{ padding: "0.5rem" }}>
                          No. of Pack per carton
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data?.noOfPackPerCotton36Specification || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {sampleSizes?.noOfPack || "N/A"}
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          {data?.noOfPackPerCotton36Observation || "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <td
                          rowSpan="3"
                          style={{ padding: "0.5rem" }}
                          colSpan={3}
                        >
                          Visual Inspection to Identify Defects (to be inspected
                          once in every two hours for all the below mentioned
                          defects) -{" "}
                        </td>
                        <td style={{ padding: "0.5rem" }}>Time :</td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.time || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.time || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.time || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.time || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }}>Lot Size :</td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.lotSize || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.lotSize || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.lotSize || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.lotSize || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }}>Sample Size :</td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.sampleSize || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.sampleSize || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.sampleSize || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.sampleSize || ""}
                        </td>
                      </tr>

                      <tr>
                        <td
                          rowSpan="5"
                          style={{
                            textAlign: "center",
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "10px",
                          }}
                        >
                          Crtical
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Sharp or Broken Sticks.
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.sharpOrBrokenSticks36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.sharpOrBrokenSticks36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.sharpOrBrokenSticks36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.sharpOrBrokenSticks36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Contamination (Insect/ Metal)
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.insectMetalContaminations36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.insectMetalContaminations36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.insectMetalContaminations36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.insectMetalContaminations36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Adhesives
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.adhesives36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.adhesives36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.adhesives36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.adhesives36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Less Count
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.lessCount36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.lessCount36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.lessCount36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.lessCount36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Wrong / Missing FG No.
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.wrongMissingFgNo36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.wrongMissingFgNo36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.wrongMissingFgNo36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.wrongMissingFgNo36 || ""}
                        </td>
                      </tr>

                      <tr>
                        <td
                          rowSpan="6"
                          style={{
                            textAlign: "center",
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "10px",
                          }}
                        >
                          Major
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Loose Cotton Tip
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.looseCottonTip36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.looseCottonTip36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.looseCottonTip36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.looseCottonTip36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Irregular Tip Shape
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.irregularTipSharp36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.irregularTipSharp36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.irregularTipSharp36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.irregularTipSharp36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Plastic/wood/ Contamination
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.plasticWoodContamination36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.plasticWoodContamination36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.plasticWoodContamination36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.plasticWoodContamination36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Hair Contamination
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.hairContamination36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.hairContamination36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.hairContamination36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.hairContamination36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Weak Stick
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.weakStick36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.weakStick36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.weakStick36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.weakStick36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Compactness of Buds not correct
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.compactnessOfBudsNotCorrect36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.compactnessOfBudsNotCorrect36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.compactnessOfBudsNotCorrect36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.compactnessOfBudsNotCorrect36 || ""}
                        </td>
                      </tr>

                      <tr>
                        <td
                          rowSpan="5"
                          style={{
                            textAlign: "center",
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "60px",
                          }}
                        >
                          Minor
                        </td>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Uneven Cotton Coverage
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.unevenCottonCoverage36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.unevenCottonCoverage36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.unevenCottonCoverage36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.unevenCottonCoverage36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Colour Contamination
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.colourContamination36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.colourContamination36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.colourContamination36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.colourContamination36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Small Surface Defects
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.smallSurfaceDefects36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.smallSurfaceDefects36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.smallSurfaceDefects36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.smallSurfaceDefects36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Loose Cotton / Less Cotton{" "}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.looseCottonLessCotton36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.looseCottonLessCotton36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.looseCottonLessCotton36 || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.looseCottonLessCotton36 || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5rem" }} colSpan={3}>
                          Improper or Illegible printing of FG No.
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.improperOrIllegiblePrintingFgNo36 ||
                            ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.improperOrIllegiblePrintingFgNo36 ||
                            ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.improperOrIllegiblePrintingFgNo36 ||
                            ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.improperOrIllegiblePrintingFgNo36 ||
                            ""}
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4} style={{ padding: "0.5rem" }}>
                          Result
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[0]?.result || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[1]?.result || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[2]?.result || ""}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          {data.details[3]?.result || ""}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={8} style={{ padding: "0.5rem" }}>
                          Remark :{data.remark}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={4} style={{ padding: "0.5rem" }}>
                          Lot Status
                        </td>
                        <td colSpan={4} style={{ padding: "0.5rem" }}>
                          {data.lotStatus}
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={2} style={{ padding: "0.5rem" }}>
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
                          ) : null}
                        </td>
                        <td colSpan={3} style={{ padding: "0.5rem" }}>
                          {data.prod_supervisor_sign}{" "}
                          {formattedDateWithTime(
                            data.prod_supervisor_submit_on
                          )}
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
                          ) : null}
                        </td>
                        <td colSpan={3} style={{ padding: "0.5rem" }}>
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
                          ) : null}
                        </td>
                      </tr>
                    </tbody>
                  </>
                  <tfoot>
                    <tr style={{ border: "none" }}>
                      <td style={{ border: "none" }}></td>
                    </tr>
                    <tr>
                      <th
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        Particular
                      </th>
                      <th
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        Prepared by
                      </th>
                      <th
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        Reviewed by
                      </th>
                      <th
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        Approved by
                      </th>
                    </tr>
                    <tr>
                      <th
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        Name
                      </th>
                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      ></td>
                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      ></td>
                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      ></td>
                    </tr>
                    <tr>
                      <th
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        Signature & Date
                      </th>
                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      ></td>
                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      ></td>
                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      ></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
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
        formName="ON-LINE INSPECTION REPORT (BUDS)"
        formatNo="PH-QAD01/F-036"
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
              <Select.Option value="Cotton Buds">Cotton Buds</Select.Option>
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
        loading={loading}
        style={{ textAlign: "center", width: "100%" }}
      />

      {/* Modal for Printing */}
      <Modal
        title="Print"
        open={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
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
      </Modal>
    </div>
  );
};
export default QA_f036_Inprocess_Inspection_Report_summary;
