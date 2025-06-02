import {
  Button,
  Col,
  InputNumber,
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
import { TbDashboard, TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
// import Qc_F013_Summary from "./Qc_F013_Summary.js";

const QualityControl_F013 = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { date, Eqid } = state || {};

  // const { date } = state || {};

  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    lab_id: "", // Static value
    unit: "Celsius", // Static value
    format_no: "F456", // Static value or can be changed if needed
    ref_sop_no: "SOP789", // Static value
    revision_no: "Rev4", // Static value
    eq_id_no: Eqid || "", // Get equipment ID from state
    remark: "", // Editable field
    date: date || "", // Use date from state
    month: "", // Editable field
    year: "", // Editable field
    set_temperature: "", // Editable field
    obs_temperature: "", // Editable field
    status: "", // Editable field
  });

  const [NewSave, setNewSave] = useState(false);

  const initial = useRef(false);

  // const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");
  const [version, setVersion] = useState("");
  const [reason, setreason] = useState("");
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  console.log(roleauth);
  const [shift, setShift] = useState(null);
  const [years, setyears] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [SupervisorSign, setSupervisorSign] = useState("");
  const [HodSign, setHodSign] = useState("");
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();
  const [HodSubmitOn, setHodSubmitOn] = useState("");
  const [OperatorSubmitOn, setOperatorSubmitOn] = useState("");
  const [remarks, setRemarks] = useState("");
  const token = localStorage.getItem("token");
  const [PackingDetails, setPackingDetails] = useState([]);
  const [emptyarraycheck, setemptyarraycheck] = useState("");

  console.log("Operator", selectedRow?.operator_status);

  const roleBase = localStorage.getItem("role");
  let formattedChemistDate;
  if (selectedRow?.chemist_submit_on) {
    formattedChemistDate = moment(selectedRow?.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }
  let formattedQCDate;
  if (selectedRow?.qc_submit_on) {
    formattedQCDate = moment(selectedRow?.qc_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.chemist_sign;
    if (username) {
      console.log("usernameparams", username);

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
          console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow,      API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qc_sign;
    if (username) {
      console.log("usernameparams", username);

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
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow,      API.prodUrl]);

  const canEdit = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      return !(
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "MICRO_DESIGNEE_APPROVED")
      );
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "MICRO_DESIGNEE"
    ) {
      return !(
        (selectedRow &&
          selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          (selectedRow?.qc_status === "WAITING_FOR_APPROVAL" ||
            selectedRow?.qc_status === "QC_REJECTED" ||
            selectedRow?.qc_status === "QC_APPROVED" ||
            selectedRow?.qc_status === "QA_REJECTED" ||
            selectedRow?.qc_status === "QA_APPROVED" ||
            selectedRow?.qc_status === "MICRO_DESIGNEE_APPROVED" ||
            selectedRow?.qc_status === "MICRO_DESIGNEE_REJECTED")) ||
        selectedRow?.chemist_status === "MICROBIOLOGIST_SAVED"
      );
    } else {
      return false;
    }
  };

  let isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "MICRO_DESIGNEE_REJECTED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "MICRO_DESIGNEE_APPROVED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "MICRO_DESIGNEE_APPROVED")
      ) {
        return "none";
      } else if (
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "MICRO_DESIGNEE_REJECTED")
      ) {
        return "block";
      }
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "MICRO_DESIGNEE"
    ) {
      if (
        selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
        selectedRow?.qc_status === "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "MICRO_DESIGNEE_REJECTED") ||
        (selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "MICRO_DESIGNEE_APPROVED") ||
        selectedRow?.chemist_status === "MICROBIOLOGIST_SAVED"
      ) {
        return "none";
      }
    }
  };

  const handleSave = () => {
    const payload = {
      lab_id: formValues.lab_id, // Lab ID
      unit: formValues.unit, // Unit
      format_no: formValues.format_no, // Format number
      ref_sop_no: formValues.ref_sop_no, // Reference SOP number
      revision_no: formValues.revision_no, // Revision number
      eq_id_no: formValues.eq_id_no || Eqid, // Equipment ID from formValues or state
      remark: formValues.remark || "Test completed successfully", // Remark from formValues
      date: formValues.date || date, // Date from formValues or state
      month: formValues.month || month, // Month from formValues
      year: formValues.year || year, // Year from formValues
      set_temperature: formValues.set_temperature || "0", // Set temperature
      obs_temperature: formValues.obs_temperature || "0", // Observed temperature
      status: formValues.status || "N/A", // Status
    };

    const headers = {
      Authorization: `Bearer ${token}`, // Add your token
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF013/save/fungalIncubator`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success("Report Saved Successfully");

        if (response.data.id) {
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            lab_id: response.data.lab_id, // Update ID from backend
            date: response.data.date,
            set_temperature: response.data.set_temperature, // Update date
            obs_temperature: response.data.obs_temperature, // Update observed temperature
            status: response.data.status,
            // Update status
          }));
        }

        // Navigate to summary page after a delay
        setTimeout(() => {
          navigate("/precot/QualityControl/F-013/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const handleSubmit = () => {
    const payload = {
      lab_id: formValues.lab_id || "", // Lab ID
      unit: formValues.unit, // Unit
      format_no: formValues.format_no, // Format number
      ref_sop_no: formValues.ref_sop_no, // Reference SOP number
      revision_no: formValues.revision_no, // Revision number
      eq_id_no: formValues.eq_id_no || Eqid, // Equipment ID from formValues or state
      remark: formValues.remark, // Remark from formValues
      date: formValues.date || date, // Date from formValues or state
      month: formValues.month || month, // Month from formValues
      year: formValues.year || year, // Year from formValues
      set_temperature: formValues.set_temperature || "0", // Set temperature
      obs_temperature: formValues.obs_temperature || "0", // Observed temperature
      status: formValues.status || "N/A", // Status
    };

    const headers = {
      Authorization: `Bearer ${token}`, // Add your token
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF013/submit/fungalIncubator`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success("Report Submitted Successfully");

        if (response.data.id) {
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            lab_id: response.data.lab_id, // Update ID from backend
            date: response.data.date,
            set_temperature: response.data.set_temperature, // Update date
            obs_temperature: response.data.obs_temperature, // Update observed temperature
            status: response.data.status,
            // Update status
          }));
        }

        // Navigate to summary page after a delay
        setTimeout(() => {
          navigate("/precot/QualityControl/F-013/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Function to merge the API response and keep existing payload fields
    const mergePayload = (newData) => {
      setFormValues((prevPayload) => ({
        ...prevPayload,
        ...newData,
        // Preserving date if not provided in newData
      }));
    };

    // Fetch data based on eq_no and date
    if (date && Eqid) {
      axios
        .get(
          `${    API.prodUrl}/Precot/api/chemicaltest/CLF013?eq_no=${Eqid}&date=${date}`,
          {
            headers,
          }
        )
        .then((response) => {
          if (
            response.data &&
            response.data !== "No data found for the provided parameters"
          ) {
            console.log("Data found for date and eq_no:", date, Eqid);
            setSelectedRow(response.data[0]);

            mergePayload(response.data[0]); // Merging first response item into payload
          } else {
            console.log(
              "No data found, updating payload with the provided date:",
              date
            );
            mergePayload({ date });
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [date, Eqid, token]);
  useEffect(() => {
    console.log("uniqueDate", date, Eqid);
    if (date) {
      const dateObj = new Date(date); // Convert string to Date object

      // Extract the year and month
      const year = dateObj.getFullYear();
      const monthNumber = dateObj.getMonth(); // getMonth() returns 0-11 (Jan-Dec)

      // Array of month names
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

      // Update the formValues state directly with the month and year
      setFormValues((prevValues) => ({
        ...prevValues,
        month: monthNames[monthNumber],
        year: year,
      }));
    }
  }, [date]);

  const handleReject = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .put(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF013/approval`,
        {
          id: formValues.lab_id,
          status: "Reject",
          remarks: rejectRemarks, // Ensure rejectRemarks is defined
        },
        { headers }
      )
      .then((response) => {
        message.error("Data Rejected");
        setTimeout(() => {
          navigate("/precot/QualityControl/F-013/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response?.data?.message || "An error occurred");
      });
  };

  const handleApprove = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .put(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF013/approval`,
        {
          id: formValues.lab_id,
          status: "Approve",
        },
        { headers }
      )
      .then((response) => {
        message.success("Approved successfully");
        setTimeout(() => {
          navigate("/precot/QualityControl/F-013/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response?.data?.message || "An error occurred");
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState("");

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [OverallID, setOverallID] = useState("");

  const { Option } = Select;
  // const { state } = location;

  // const { batch } = state || {};
  // const { bale } = state || {};

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [opens, setOpens] = useState(false);

  const [placement, setPlacement] = useState("left");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const today = new Date();
  const year = today.getFullYear();
  const numericMonth = today.getMonth(); // 0-based index (0 for January, 1 for February, etc.)
  const day = String(today.getDate()).padStart(2, "0");

  // Array of month names
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

  // Get the month name based on the numeric value
  const month = monthNames[numericMonth];

  // Format the date as 'YYYY-MonthName-DD'
  const formattedToday = `${year}-${month}-${day}`;

  const handlePrint = () => {
    window.print();
  };

  const handleChange = (key, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [key]: value, // Dynamically set the form field value
    }));
  };

  const mergePayload = (newData) => {
    setFormValues((prevPayload) => ({
      ...prevPayload,
      ...newData,
      date: newData.date || prevPayload.date, // Preserving date if not provided in newData
    }));
  };

  const handleBack = () => {
    navigate("/precot/QualityControl/F-013/Summary");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this number as needed

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PackingDetails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(PackingDetails.length / itemsPerPage);

  const handleTextareaChange = (event) => {
    setRemarks(event.target.value);
  };

  const formattedOperatorDate = selectedRow?.operator_submitted_on
    ? moment(selectedRow?.operator_submitted_on).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedhodDate = selectedRow?.hod_submit_on
    ? moment(selectedRow?.hod_submit_on).format("DD/MM/YYYY HH:mm")
    : "";

  const totalProductionQty = currentItems.reduce(
    (total, item) => total + (item.ProductionQty || 0),
    0
  );
  console.log("Total", totalProductionQty);

  const items = [
    {
      key: "1",
      label: <p>Form</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "100%", margin: "auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "left", padding: "10px", width: "25%" }}
                >
                  EQ. ID No:{Eqid}
                </td>
                <td
                  colSpan="6"
                  style={{ textAlign: "left", padding: "10px", width: "25%" }}
                >
                  Standard Temperature in ℃: 20 to 25
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th colSpan="1" style={{ padding: "10px" }}>
                  S. No.
                </th>
                <th colSpan="3" style={{ padding: "10px" }}>
                  Date
                </th>
                <th colSpan="3" style={{ padding: "10px" }}>
                  Set temperature in ℃{" "}
                </th>
                <th colSpan="4" style={{ padding: "10px" }}>
                  Observed temperature in ℃{" "}
                </th>

                <th colSpan="3" style={{ width: "10%" }}>
                  Status
                </th>
              </tr>

              <tr>
                <td colSpan="1" style={{ padding: "6px", textAlign: "center" }}>
                  1.
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {date}
                </td>
                <td colSpan="3">
                  {" "}
                  <InputNumber
                    type="number"
                    step={0.1}
                    disabled={!isEditable}
                    onChange={(value) => {
                      handleChange("set_temperature", value); // Use value directly
                    }}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value); // Parse value to a number
                      if (value < 20 || value > 25) {
                        message.error("Set Temperature Range from 20 to 25");
                      }
                    }}
                    value={formValues.set_temperature} // Bind value to formValues state
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <InputNumber
                    type="number"
                    step={0.1}
                    disabled={!isEditable}
                    onChange={(value) => {
                      handleChange("obs_temperature", value);
                    }}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 20 || value > 25) {
                        message.error(
                          "Observed Temperature  Range from 20 to 25"
                        );
                      }
                    }}
                    value={formValues.obs_temperature} // Bind value to formValues state
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                  />{" "}
                </td>
                <td colSpan="3">
                  <Input
                    placeholder="Please Enter..."
                    onChange={(e) => handleChange("status", e.target.value)} // Update status
                    value={formValues.status} // Bind value to formValues state
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                      maxWidth: "100%",
                    }}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td
                colSpan="12"
                style={{
                  textAlign: "center",
                }}
              >
                Checked by:
              </td>
              <td
                colSpan="11"
                style={{
                  textAlign: "center",
                }}
              >
                Verified by :
              </td>
            </tr>

            <tr>
              <td
                colSpan="12"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {selectedRow?.chemist_status === "MICROBIOLOGIST_APPROVED" && (
                  <>
                    {getImage && (
                      <img className="signature" src={getImage} alt="MICRO" />
                    )}
                    <br />
                    {selectedRow && selectedRow?.chemist_sign}
                    <br />
                    {formattedChemistDate}
                  </>
                )}
              </td>
              <td
                colSpan="11"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                {(selectedRow?.qc_status === "QC_REJECTED" ||
                  selectedRow?.qc_status === "QC_APPROVED" ||
                  selectedRow?.qc_status === "QA_REJECTED" ||
                  selectedRow?.qc_status === "QA_APPROVED" ||
                  selectedRow?.qc_status === "MICRO_DESIGNEE_APPROVED" ||
                  selectedRow?.qc_status === "MICRO_DESIGNEE_REJECTED") && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />

                    {selectedRow && selectedRow?.qc_submit_by}
                    <br />
                    {formattedQCDate}
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
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
          <Input
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>

      <BleachingHeader
        unit="Unit-H"
        formName={"FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT "}
        formatNo={"PH-QCL01/F-013"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QC_MANAGER" ||
          roleauth === "QA_MANAGER" ||
          roleauth === "MICRO_DESIGNEE" ? (
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Input
          addonBefore="Date"
          placeholder="Date"
          value={date}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />
        <Input
          addonBefore="EQ.id"
          placeholder="EQ.id"
          value={Eqid}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="year"
          placeholder="year"
          value={year}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="month"
          placeholder="month"
          value={month}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
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

export default QualityControl_F013;
