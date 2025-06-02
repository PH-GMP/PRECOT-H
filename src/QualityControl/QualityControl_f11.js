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
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

import QualityControl_f11_Summary from "../QualityControl/QualityControl_f11_Summary.js";

const QualityControl_f11 = () => {
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [open, setOpen] = useState(false);

  const [NewSave, setNewSave] = useState(false);

  const initial = useRef(false);

  const today = new Date();
  //const year = today.getFullYear();

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");

  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  console.log(roleauth);

  const [Flashes, setFlashes] = useState(
    "UV Adjustment method -Whiteness (WI)	"
  );
  const [Calibration, setCalibration] = useState("10 Degree, D65");
  const [Adjust, setAdjust] = useState("UV Adjust");
  const [Specular, setSpecular] = useState("Tint: value (0), Tolerance (0.05)");
  const [UV, setUV] = useState("WI: value (0), Tolerance (0.50)");
  const [Illumination, setIllumination] = useState("Low");
  const [lens, setLens] = useState("Large (LAV)");
  const [calTime, setCalTime] = useState(""); // Calibration Time
  const [status, setStatus] = useState(""); // Status
  const [calDueDate, setCalDueDate] = useState("");

  const [remarks, setRemarks] = useState("");
  // const { year, mon } = state || { year: '', mon: '' };

  const [PackingDetails, setPackingDetails] = useState([]);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [OverallID, setOverallID] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [opens, setOpens] = useState(false);
  //const { selectYear, Months, eq } = state || { selectYear: '', Months: '', eq: '' };
  const [placement, setPlacement] = useState("left");
  const [currentPage, setCurrentPage] = useState(1);
  const [Id, setId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [chemist_sign, setChemistSign] = useState(null);
  const [qc_sign, setQcSign] = useState(null);

  const location = useLocation();

  const { Option } = Select;

  const { state } = location;
  const { selectYear, Months, eq } = state || {
    selectYear: "",
    Months: "",
    eq: "",
  };
  console.log("Operator", selectedRow?.operator_status);

  const roleBase = localStorage.getItem("role");
  const getNextMonth = () => {
    const today = new Date();
    console.log("Today", today);
    const nextMonth = new Date(today.getFullYear(), today.getMonth()); // First day of the next month
    return nextMonth.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = chemist_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [chemist_sign,     API.prodUrl]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = qc_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [qc_sign,     API.prodUrl]);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF011/approval`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        //window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-011/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };

  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF011/approval`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-011/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  let formattedChemistDate;
  if (selectedRow.chemist_submit_on) {
    formattedChemistDate = moment(selectedRow.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
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

  //const { newdate, shiftvalue } = state || {};
  // const { batch } = state || {};
  // const { bale } = state || {};
  //console.log("bmr form create screen", newdate);
  //console.log("bmr form create screen", shiftvalue);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-011/Summary");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/chemicaltest/CLF011`,
          {
            params: {
              eq_no: eq,
              year: selectYear,
              month: Months,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.length > 0) {
          setId(response.data[0].lab_id);
          setAdjust(response.data[0].uv_adjust);
          setFlashes(response.data[0].uv_adjust_methods);
          setCalibration(response.data[0].degree);
          setSpecular(response.data[0].tint_value);
          setUV(response.data[0].wi_value);
          setIllumination(response.data[0].low);
          setLens(response.data[0].large);
          setCalTime(response.data[0].cal_time);
          setStatus(response.data[0].status);
          setCalDueDate(response.data[0].cal_due_date);
          setQcSign(response.data[0].qc_sign);
          setChemistSign(response.data[0].chemist_sign);
          setSelectedRow(response.data[0]);
        }
        if (
          roleauth === "QA_MANAGER" ||
          roleauth === "QC_MANAGER" ||
          roleauth === "CHEMIST_DESIGNEE"
        ) {
          if (
            (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
              response.data[0]?.qc_status === "QC_REJECTED") ||
            (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
              response.data[0]?.qc_status === "QA_REJECTED") ||
            (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
              response.data[0]?.qc_status === "CHEMIST_DESIGNEE_REJECTED")
          ) {
            message.warning("Chemist Not Yet Approved");
            setTimeout(() => {
              navigate("/Precot/QualityControl/F-011/Summary");
            }, 1500);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Trigger the API call only if eq_no, year, and month are provided
    fetchData();
  }, [eq, selectYear, Months, refresh]);

  const forceRefetch = () => {
    setRefresh((prev) => !prev); // Toggle refresh state to trigger useEffect
  };

  console.log("getEid", eq);
  console.log("getyear", selectYear);
  console.log("GetMonths", Months);

  useEffect(() => {
    console.log("ID", Id);
  }, [Id]);
  useEffect(() => {
    console.log("Selected Row:", selectedRow);
  }, [selectedRow]);

  const canEdit = () => {
    if (roleauth === "ROLE_CHEMIST") {
      return !(
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.qc_status === "QC_APPROVED") ||
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.qc_status === "QA_APPROVED") ||
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.qc_status === "CHEMIST_DESIGNEE_APPROVED")
      );
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "CHEMIST_DESIGNEE"
    ) {
      return !(
        (selectedRow &&
          selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          (selectedRow.qc_status === "WAITING_FOR_APPROVAL" ||
            selectedRow.qc_status === "QC_REJECTED" ||
            selectedRow.qc_status === "QC_APPROVED" ||
            selectedRow.qc_status === "QA_REJECTED" ||
            selectedRow.qc_status === "QA_APPROVED" ||
            selectedRow.qc_status === "CHEMIST_DESIGNEE_APPROVED" ||
            selectedRow.qc_status === "CHEMIST_DESIGNEE_REJECTED")) ||
        selectedRow.chemist_status === "CHEMIST_SAVED"
      );
    } else {
      return false;
    }
  };

  let isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_CHEMIST") {
      if (
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "CHEMIST_DESIGNEE_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "CHEMIST_DESIGNEE_APPROVED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_CHEMIST") {
      if (
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "CHEMIST_DESIGNEE_APPROVED")
      ) {
        return "none";
      } else if (
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "CHEMIST_DESIGNEE_REJECTED")
      ) {
        return "block";
      }
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "CHEMIST_DESIGNEE"
    ) {
      if (
        selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
        selectedRow?.qc_status === "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "CHEMIST_DESIGNEE_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "CHEMIST_DESIGNEE_APPROVED") ||
        selectedRow.chemist_status === "CHEMIST_SAVED"
      ) {
        return "none";
      }
    }
  };

  const handleSave = () => {
    const payload = {
      lab_id: Id, // Use the lab_id from state or fallback
      unit: "mg/L",
      format_no: "PH-QCL01/F-011",
      ref_sop_no: "PH-QCL01-D-04",
      revision_no: "01",
      eq_id_no: eq || "EQ-07", // Use eq from state or fallback
      month: Months || "May", // Use month from state or fallback
      year: selectYear || "2024", // Use year from state or fallback
      remark: "N/A" || " ", // Fallback if no remarks
      date: new Date().toISOString().split("T")[0], // Current date
      uv_adjust: Adjust,
      uv_adjust_methods: Flashes, // Default or fallback value
      degree: Calibration, // Handle malformed strings
      tint_value: Specular, // Handle malformed strings
      wi_value: UV, // Default value
      low: Illumination, // Ensure fallback
      large: lens, // Handle default case
      status: status || "N/A", // Status from input
      cal_due_date: calDueDate || "N/A", // Calibration due date from input
      cal_time: calTime || "N/A", // Calibration time from input
    };

    console.log("EQ", eq);
    console.log("Year", selectYear);
    console.log("Month", Months);
    console.log("Payload:", payload); // Debugging payload

    // Make the API request to save the data
    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF011/save/spectrometerreport`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Report Saved Successfully");
        navigate("/Precot/QualityControl/F-011/Summary"); // Redirect after success
      })
      .catch((err) => {
        if (err.response) {
          const status = err.response.status;
          console.error(`Server Error: ${status}`);
          console.error("Response Data:", err.response.data);

          if (status === 400) {
            message.error("Bad Request: Please check the data and try again.");
          } else if (status === 401) {
            message.error("Unauthorized: Please login again.");
          } else if (status === 500) {
            message.error("Server Error: Please try again later.");
          } else {
            message.error(`Unexpected Error: ${err.response.statusText}`);
          }
        } else if (err.request) {
          console.error("No Response:", err.request);
          message.error(
            "Network Error: No response from the server. Please check your connection."
          );
        } else {
          console.error("Error Message:", err.message);
          message.error(`Error: ${err.message}`);
        }

        console.log("Payload:", payload);
        console.log("Token:", token);
      });
  };

  //HandleSubmit
  const handleSubmit = () => {
    if (!calTime) {
      message.error("Please select a calibration time.");
      return;
    }
    if (!calDueDate) {
      message.error("Please select a calibration due date.");
      return;
    }

    console.log("eeeeeeeeeeeeee", Id);
    const payload = {
      lab_id: Id, // Use the lab_id from state or fallback
      unit: "mg/L",
      format_no: "PH-QCL01/F-011",
      ref_sop_no: "PH-QCL01-D-04",
      revision_no: "01",
      eq_id_no: eq || "EQ-07", // Use eq from state or fallback
      month: Months || "May", // Use month from state or fallback
      year: selectYear || "2024", // Use year from state or fallback
      remark: "No remarks provided", // Fallback if no remarks
      date: new Date().toISOString().split("T")[0], // Current date
      uv_adjust: Adjust || "N/A",
      uv_adjust_methods: Flashes.trim() || "N/A", // Default or fallback value
      degree: Calibration || "N/A", // Handle malformed strings
      tint_value: Specular || "N/A", // Handle malformed strings
      wi_value: UV || "N/A", // Default value
      low: Illumination || "N/A", // Ensure fallback
      large: lens || "N/A", // Handle default case
      status: status || "N/A", // Status from input
      cal_due_date: calDueDate || "", // Calibration due date from input
      cal_time: calTime || "", // Calibration time from input
    };

    console.log("EQ", eq);
    console.log("Year", selectYear);
    console.log("Month", Months);
    console.log("Payload:", payload);

    // Debugging payload

    // Make the API request to save the data
    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF011/submit/spectrometerreport`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Report Submited Successfully");
        navigate("/Precot/QualityControl/F-011/Summary"); // Redirect after success
      })
      .catch((err) => {
        if (err.response) {
          const status = err.response.status;
          console.error(`Server Error: ${status}`);
          console.error("Response Data:", err.response.data);

          if (status === 400) {
            message.error("Bad Request: Please check the data and try again.");
          } else if (status === 401) {
            message.error("Unauthorized: Please login again.");
          } else if (status === 500) {
            message.error("Server Error: Please try again later.");
          } else {
            message.error(`Unexpected Error: ${err.response.statusText}`);
          }
        } else if (err.request) {
          console.error("No Response:", err.request);
          message.error(
            "Network Error: No response from the server. Please check your connection."
          );
        } else {
          console.error("Error Message:", err.message);
          message.error(`Error: ${err.message}`);
        }

        console.log("Payload:", payload);
        console.log("Token:", token);
      });
  };

  const handleMultipleActions = () => {
    forceRefetch(); // Re-fetch lab_id
    // Save report
    handleSubmit(); // Submit report
  };

  const itemsPerPage = 10; // Adjust this number as needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PackingDetails.slice(indexOfFirstItem, indexOfLastItem);
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
            <tbody>
              <tr>
                <th
                  colSpan="5"
                  rowSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "7px",
                    fontWeight: "bold",
                  }}
                >
                  Setting for Calibration:{" "}
                </th>
                <th
                  colSpan="7"
                  rowSpan="2"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Status
                </th>
                <th
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Previous
                </th>
                <th
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Current{" "}
                </th>
              </tr>

              <tr>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  UV Adjust{" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <input
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                    type="text"
                    value={Adjust}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.,_]$/;
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
                    onChange={(e) => setAdjust(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Flashes Pre - measure: 1
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  UV Adjustment method -Whiteness (WI){" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <input
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                    type="text"
                    value={Flashes}
                    onChange={(e) => setFlashes(e.target.value)} // Updates value if input is valid
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.,_]$/;
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
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Calibration mode: Reflectance (%R){" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  10 Degree, D65{" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <input
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                    type="text"
                    value={Calibration}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.,_]$/;
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
                    onChange={(e) => setCalibration(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Specular component: Included (SCI){" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Tint: value (0), Tolerance (0.05){" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <input
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                    type="text"
                    value={Specular}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.,_]$/;
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
                    onChange={(e) => setSpecular(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  UV-energy:Included (100%){" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  WI: value (0), Tolerance (0.50){" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <input
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                    type="text"
                    value={UV}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.,_]$/;
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
                    onChange={(e) => setUV(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Illumination Intensity:
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Low{" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  {" "}
                  <input
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                    type="text"
                    value={Illumination}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.,_]$/;
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
                    onChange={(e) => setIllumination(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Lens position: Large (LAV){" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Large (LAV){" "}
                </td>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <input
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                    type="text"
                    value={lens}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.,_]$/;
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
                    onChange={(e) => setLens(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="10" style={{ textAlign: "left", padding: "10px" }}>
                  Calibration time :{" "}
                  <input
                    type="datetime-local"
                    value={calTime}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setCalTime(e.target.value);
                    }}
                    style={{ width: "60%", border: "none", outline: "none" }}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan="10" style={{ textAlign: "left", padding: "10px" }}>
                  Status:{" "}
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={!isEditable}
                    style={{ width: "50%", border: "none", outline: "none" }}
                  />
                </td>
                <td colSpan="10" style={{ textAlign: "left", padding: "10px" }}>
                  Calibration next due date:
                  <input
                    type="date"
                    value={calDueDate}
                    onChange={(e) => setCalDueDate(e.target.value)}
                    style={{ width: "50%", border: "none", outline: "none" }}
                    disabled={!isEditable}
                    min={getNextMonth()}
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
                Checked By: (Chemist)
              </td>
              <td
                colSpan="12"
                style={{
                  textAlign: "center",
                }}
              >
                verified By:(Chemist Designee)
              </td>
            </tr>

            <tr>
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
                    {getImage3 && (
                      <img
                        className="signature"
                        src={getImage3}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.chemist_sign}
                    <br />
                    {formattedChemistDate}
                  </>
                )}
              </td>

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
                  selectedRow?.qc_status === "QA_APPROVED" ||
                  selectedRow?.qc_status === "CHEMIST_DESIGNEE_APPROVED" ||
                  selectedRow?.qc_status === "CHEMIST_DESIGNEE_REJECTED") && (
                  <>
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />

                    {selectedRow && selectedRow.qc_submit_by}
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
      <BleachingHeader
        unit="Unit-H"
        formName={"SPECTROPHOTOMETER CM-3600A CALIBRATION REPORT"}
        formatNo={"PH-QCL01/F-011"}
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
          roleauth === "CHEMIST_DESIGNEE" ? (
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
          <label style={{ marginRight: "8px" }}>Remarks:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>

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
          addonBefore="year"
          placeholder="year"
          value={selectYear}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="month"
          placeholder="month"
          value={Months}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="EQ.id"
          placeholder="EQ.id"
          value={eq}
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

export default QualityControl_f11;
