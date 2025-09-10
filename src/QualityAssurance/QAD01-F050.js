/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
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

const QA_f50 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const [id, setid] = useState("");
  const {    Department,Date } = state || {};

  const extractYearAndMonthName = (dateString) => {
    if (!dateString) return { year: "", monthName: "" };

    const dateObj = new window.Date(dateString);
    const year = dateObj.getFullYear();
    const monthName = dateObj.toLocaleString("default", { month: "long" }); // Full month name

    return { year, monthName };
};

// Extract values
const { year, monthName } = extractYearAndMonthName(Date);
  
  // const dateObject = new Date(Date);
  
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [DetailsByParam, setDetailsByParam] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage, setGetImage] = useState("");
  const [selectedrow, setselectedrow] = useState("");
  const [Total_glass, SetTotal_glass] = useState("");
  const [Total_ceramic, SetTotal_ceramic] = useState("");
  const [Total_wood, SetTotal_wood] = useState("");
  const [Total_Plastic, SetTotal_Plastic] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [date, Setdate] = useState("");
 
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [toDelete, setToDelete] = useState("");



  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const [rows, setRows] = useState([
    {
      lineId: "",
      Type: "",
      IdentificationNo: "",
      Location: "",
      Protection: "",
      RiskSeverity: "",
      frequencyofchecking: "",
      Remarks: "",
    },
  ]);

  const [rows1, setRows1] = useState([
    {
      lineId: "",
      Type: "",
      IdentificationNo: "",
      Location: "",
      Protection: "",
      RiskSeverity: "",
      frequencyofchecking: "",
      Remarks: "",
    },
  ]);

  const [rows2, setRows2] = useState([
    {
      lineId: "",
      Type: "",
      IdentificationNo: "",
      Location: "",
      Protection: "",
      RiskSeverity: "",
      frequencyofchecking: "",
      Remarks: "",
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        Type: "",
        IdentificationNo: "",
        Location: "",
        Protection: "",
        RiskSeverity: "",
        frequencyofchecking: "",
        Remarks: "",
      },
    ]);
  };

  const handleAddRow1 = () => {
    setRows1([
      ...rows1,
      {
        Type: "",
        IdentificationNo: "",
        Location: "",
        Protection: "",
        RiskSeverity: "",
        frequencyofchecking: "",
        Remarks: "",
      },
    ]);
  };

  const handleAddRow2 = () => {
    setRows2([
      ...rows2,
      {
        Type: "",
        IdentificationNo: "",
        Location: "",
        Protection: "",
        RiskSeverity: "",
        frequencyofchecking: "",
        Remarks: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row? This action will be finalized after saving."
    );

    if (confirmDelete) {
      // Access the specific row's `lineId` property
      const lineIdToDelete = rows[index]?.lineId; // Use optional chaining to handle potential undefined rows

      setToDelete((prevToDelete) => {
        // Only add lineIdToDelete if it is defined and not already in the array
        return lineIdToDelete !== undefined &&
          !prevToDelete.includes(lineIdToDelete)
          ? [...prevToDelete, lineIdToDelete]
          : prevToDelete;
      });

      // Update rows by filtering out the row at the specified index
      setRows((prevRows) => prevRows.filter((_, i) => i !== index));
    } else {
    }
  };

  const handleDeleteRow1 = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row? This action will be finalized after saving."
    );

    if (confirmDelete) {
      // Access the specific row's `lineId` property
      const lineIdToDelete = rows1[index]?.lineId; // Use optional chaining to handle potential undefined rows

      setToDelete((prevToDelete) => {
        // Only add lineIdToDelete if it is defined and not already in the array
        return lineIdToDelete !== undefined &&
          !prevToDelete.includes(lineIdToDelete)
          ? [...prevToDelete, lineIdToDelete]
          : prevToDelete;
      });

      // Update rows by filtering out the row at the specified index
      setRows1((prevRows) => prevRows.filter((_, i) => i !== index));
    } else {
    }
  };

  const handleDeleteRow2 = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row? This action will be finalized after saving."
    );

    if (confirmDelete) {
      // Access the specific row's `lineId` property
      const lineIdToDelete = rows2[index]?.lineId; // Use optional chaining to handle potential undefined rows

      setToDelete((prevToDelete) => {
        // Only add lineIdToDelete if it is defined and not already in the array
        return lineIdToDelete !== undefined &&
          !prevToDelete.includes(lineIdToDelete)
          ? [...prevToDelete, lineIdToDelete]
          : prevToDelete;
      });

      // Update rows by filtering out the row at the specified index
      setRows2((prevRows) => prevRows.filter((_, i) => i !== index));
    } else {
    }
  };

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedrow?.qa_inspector_sign;
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
        .catch((err) => {});
    }
  }, [selectedrow,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedrow?.manager_sign;
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
          setGetImage(url);
        })
        .catch((err) => {});
    }
  }, [selectedrow,API.prodUrl, token]);

  const roleauth = localStorage.getItem("role");
  const roleBase = localStorage.getItem("role");
  const disabled =
    (roleauth === "ROLE_MR" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "ROLE_DESIGNEE") &&
    DetailsByParam?.manager_status === "MR_SUBMITTED";

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleGlassChanges = (index, field, value) => {
    const newRows = [...rows];

    newRows[index][field] = value;
    setRows(newRows);
  };

  const HardPlasticChanges = (index, field, value) => {
    const newRows = [...rows1];

    newRows[index][field] = value;
    setRows1(newRows);
  };

  const handleCeramicChanges = (index, field, value) => {
    const newRows = [...rows2];

    newRows[index][field] = value;
    setRows2(newRows);
  };

  const isEditable =
    (roleauth === "ROLE_QA" &&
      selectedrow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
      selectedrow?.manager_status === "WAITING_FOR_APPROVAL") ||
    selectedrow?.manager_status === "MANAGER_APPROVED" ||
    roleauth === "QA_MANAGER" ||
    roleauth === "ROLE_DESIGNEE" ||
    (roleauth === "ROLE_MR" &&
      (selectedrow?.manager_status === "WAITING_FOR_APPROVAL" ||
        selectedrow?.manager_status === "MANAGER_APPROVED" ||
        selectedrow?.manager_status === "MANAGER_REJECTED"));

  const canDisplayButtons = () => {
    if (roleBase === "ROLE_QA") {
      if (
        selectedrow?.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
        (selectedrow?.manager_status == "WAITING_FOR_APPROVAL" ||
          selectedrow?.manager_status == "MANAGER_APPROVED")
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      } else if (
        selectedrow?.qa_inspector_status == "QA_INSPECTOR_APPROVED" && // Not submitted
        selectedrow?.manager_status == "MANAGER_APPROVED"
      ) {
        return "none";
      }
    } else if (
      roleBase == "QA_MANAGER" ||
      roleBase == "ROLE_DESIGNEE" ||
      roleBase === "ROLE_MR"
    ) {
      if (
        selectedrow?.qa_inspector_status == "QA_INSPECTOR_APPROVED" && // Not submitted
        selectedrow?.manager_status == "MANAGER_APPROVED"
      ) {
        return "none";
      } else if (selectedrow?.manager_status == "MANAGER_REJECTED") {
        return "none";
      }
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_QA") {
      if (
        selectedrow?.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
        selectedrow?.manager_status == "MANAGER_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedrow?.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
        (selectedrow?.manager_status == "WAITING_FOR_APPROVAL" ||
          selectedrow?.manager_status == "MANAGER_APPROVED")
      ) {
        return "none";
      }
    } else if (
      roleauth == "QA_MANAGER" ||
      roleauth == "ROLE_DESIGNEE" ||
      roleauth === "ROLE_MR"
    ) {
      if (
        selectedrow?.manager_status == "MANAGER_APPROVED" ||
        selectedrow?.manager_status == "MANAGER_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedrow?.manager_status == "MANAGER_APPROVED" ||
        selectedrow?.manager_status == "MANAGER_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const handleSubmit = async () => {
    try {
      await SubmitAnnualPlanRecord();
    } catch (error) {
      console.error("Error submitting report.", error);
    }
  };

  const handleSave = async () => {
    try {
      await SaveAnnualPlanRecord();
    } catch (error) {
      console.error("Error saving Report :", error.message);
    }
  };

  const SaveAnnualPlanRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "LIST OF GLASS /HARD PLASTIC / WOOD / CERAMIC",
        formatNo: "PH-QAD01/F-050",
        revisionNo: "01",
        sopNumber: "PH-QAD01-D-47",
        unit: "Unit H",

        month: monthName,
        year: year,
      
        rej_reason: rejectRemarks,
        date: date||Date,
        department: Department,
        to_no_glass: Total_glass,
        to_no_hp: Total_Plastic,
        to_no_wood: Total_wood,
        to_no_ceramic: Total_ceramic,
        ...(id && { id }),
        typeslist: [
          ...(rows || []).map((row) => ({
            ...(row.lineId && { types_id: row.lineId }),
            ...(id && { id }),

            types: "Glass",
            identification_no: row.IdentificationNo,
            location: row.Location,
            protection_safert_flim: row.Protection,
            risk_severity: row.RiskSeverity,
            frequency_of_check: row.frequencyofchecking,
            remarks: row.Remarks,
          })),
          ...(rows1 || []).map((row) => ({
            ...(row.lineId && { types_id: row.lineId }),
            ...(id && { id }),
            types: "HardPlastic",
            identification_no: row.IdentificationNo,
            location: row.Location,
            protection_safert_flim: row.Protection,
            risk_severity: row.RiskSeverity,
            frequency_of_check: row.frequencyofchecking,
            remarks: row.Remarks,
          })),
          ...(rows2 || []).map((row) => ({
            ...(row.lineId && { types_id: row.lineId }),
            ...(id && { id }),
            types: "Ceramic",
            identification_no: row.IdentificationNo,
            location: row.Location,
            protection_safert_flim: row.Protection,
            risk_severity: row.RiskSeverity,
            frequency_of_check: row.frequencyofchecking,
            remarks: row.Remarks,
          })),
        ],
      };

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SaveListOfGHpWc`,
        payload,
        { headers }
      );

      // Handle deletions if any items in toDelete array
      if (toDelete.length > 0) {
        await Promise.all(
          toDelete.map(async (deleteId) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/ListOfGHpWcdelete?id=${deleteId}`,
              { headers }
            );
          })
        );
        setToDelete([]); // Clear the toDelete array after deletion
      }

      // Delay navigation to allow for async operations
      setTimeout(() => {
        navigate("/Precot/QA/F-50/Summary");
      }, 1500);

      // Success message
      message.success("Report Saved Successfully.");
    } catch (error) {
      // Enhanced error message handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to save Annual Plan Record!";
      console.error("Error:", errorMessage);
      message.error(errorMessage);
    } finally {
      // Turn off loading state regardless of success or error
      setSaveLoading(false);
    }
  };

  const formattedDated = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const SubmitAnnualPlanRecord = async () => {
    const isValid = () => {
      if (!date) return "Current date is required";

      return null;
    };

    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSubmitLoading(true);
    try {
      const payload = {
        formatName: "LIST OF GLASS /HARD PLASTIC / WOOD / CERAMIC",
        formatNo: "PH-QAD01/F-050",
        revisionNo: "01",
        sopNumber: "PH-QAD01-D-47",
        unit: "Unit H",
        month: monthName,
        year: year,
        
        rej_reason: rejectRemarks || "NA",
        date: date||Date,
        department: Department || "NA",
        to_no_glass: Total_glass || "NA",
        to_no_hp: Total_Plastic || "NA",
        to_no_wood: Total_wood || "NA",
        to_no_ceramic: Total_ceramic || "NA",
        ...(id && { id }),
        typeslist: [
          ...(rows || []).map((row) => ({
            ...(row.lineId && { types_id: row.lineId }),
            ...(id && { id }),
            types: "Glass",
            identification_no: row.IdentificationNo || "NA",
            location: row.Location || "NA",
            protection_safert_flim: row.Protection || "NA",
            risk_severity: row.RiskSeverity || "NA",
            frequency_of_check: row.frequencyofchecking || "NA",
            remarks: row.Remarks || "NA",
          })),
          ...(rows1 || []).map((row) => ({
            ...(row.lineId && { types_id: row.lineId }),
            ...(id && { id }),
            types: "HardPlastic",
            identification_no: row.IdentificationNo || "NA",
            location: row.Location || "NA",
            protection_safert_flim: row.Protection || "NA",
            risk_severity: row.RiskSeverity || "NA",
            frequency_of_check: row.frequencyofchecking || "NA",
            remarks: row.Remarks || "NA",
          })),
          ...(rows2 || []).map((row) => ({
            ...(row.lineId && { types_id: row.lineId }),
            ...(id && { id }),
            types: "Ceramic",
            identification_no: row.IdentificationNo || "NA",
            location: row.Location || "NA",
            protection_safert_flim: row.Protection || "NA",
            risk_severity: row.RiskSeverity || "NA",
            frequency_of_check: row.frequencyofchecking || "NA",
            remarks: row.Remarks || "NA",
          })),
        ],
      };

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing.");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SubmitListOfGHpWc`,
        payload,
        { headers }
      );

      if (toDelete.length > 0) {
        await Promise.all(
          toDelete.map((deleteId) =>
            axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/ListOfGHpWcdelete?id=${deleteId}`,
              { headers }
            )
          )
        );
        setToDelete([]);
      }

      message.success("Report submitted successfully...");
      setTimeout(() => {
        navigate("/Precot/QA/F-50/Summary");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      message.error(
        error.response?.data?.message || "Submission failed. Try again."
      );
    } finally {
      setSubmitLoading(false);
    }
  };
  const handleBack = () => {
    navigate("/Precot/QA/F-50/Summary");
  };

  const handleApprove = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/ListOfGHpWcapproveOrReject`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        message.success(res.data.message);
        navigate("/Precot/QA/F-50/Summary");
      })
      .catch((err) => {
        setLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/ListOfGHpWcapproveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QA/F-50/Summary");
      })
      .catch((err) => {
        setLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    fetchDetailsByParam();
  }, []);

  const fetchDetailsByParam = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure token is available
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/ListOfGHpWcParam?date=${date||Date}&department=${Department}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data !== "No data") {
        const data = response.data;
        setselectedrow(data);
        setid(data.id);

        let tempRows = [];
        let tempRows1 = [];
        let tempRows2 = [];

        if (
          ((roleauth == "QA_MANAGER" ||
            roleauth === "ROLE_MR" ||
            roleauth === "ROLE_DESIGNEE") &&
            data?.qa_inspector_status !== "QA_INSPECTOR_APPROVED") ||
          ((roleauth == "QA_MANAGER" ||
            roleauth === "ROLE_MR" ||
            roleauth === "ROLE_DESIGNEE") &&
            data?.manager_status == "MANAGER_REJECTED")
        ) {
          message.error("QA Inspector Not Yet  Approved ");
          setTimeout(() => {
            navigate("/Precot/QA/F-50/Summary");
          }, 1500);
        }

        const formatDateForDisplay = (dateString) => {
          if (dateString) {
            return dateString.split("T")[0];
          }
          return "";
        };
        Setdate(data.date);
        SetTotal_Plastic(data.to_no_hp);
        SetTotal_ceramic(data.to_no_ceramic);
        SetTotal_glass(data.to_no_glass);
        SetTotal_wood(data.to_no_wood);
        // Ensure data.typeslist is an array before iterating
        data.typeslist?.forEach((item) => {
          const row = {
            lineId: item.types_id,
            Type: item.types,
            IdentificationNo: item.identification_no,
            Location: item.location,
            Protection: item.protection_safert_flim,
            RiskSeverity: item.risk_severity,
            frequencyofchecking: item.frequency_of_check,
            Remarks: item.remarks,
          };

          // Safely handle `item.types` string manipulation
          const types = (item.types || "").trim().toLowerCase();

          if (types === "glass") {
            tempRows.push(row);
          } else if (types === "hardplastic") {
            tempRows1.push(row);
          } else if (types === "ceramic") {
            tempRows2.push(row);
          }
        });

        setRows(tempRows);
        setRows1(tempRows1);
        setRows2(tempRows2);
      } else {
        message.warning("No data found for the specified parameters.");
      }
    } catch (error) {
      console.error("Error fetching :", error);
      message.error(
        error.response?.data?.message || error.message || "Error fetching "
      );
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Glass List</p>,
      children: (
        <div>
          <table
            style={{ width: "105%", margin: "auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Identification No.
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Location
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Protection by Safety Film
                </th>

                <th colSpan="10" style={{ textAlign: "center" }}>
                  Risk Severity
                  <br />
                  (High/Medium/Low)
                </th>

                <th colSpan="10" style={{ textAlign: "center" }}>
                  Frequency of Checking
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Remarks
                </th>

                <th colSpan="8" style={{ textAlign: "center" }}>
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td colSpan={10} style={{ textAlign: "center" }}>
                      <Input
                        className="inp-new"
                        value={row.IdentificationNo}
                        disabled={isEditable}
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleGlassChanges(
                            index,
                            "IdentificationNo",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.Location}
                        disabled={isEditable}
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleGlassChanges(index, "Location", e.target.value)
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.Protection}
                        disabled={isEditable}
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleGlassChanges(
                            index,
                            "Protection",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Select
                        className="inp-new"
                        value={row.RiskSeverity}
                        disabled={isEditable}
                        onChange={(value) =>
                          handleGlassChanges(index, "RiskSeverity", value)
                        }
                        placeholder="Select Risk Severity"
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <Select.Option value="High">High</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="Low">Low</Select.Option>
                      </Select>
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.frequencyofchecking}
                        onKeyDown={handleKeyDown2}
                        disabled={isEditable}
                        onChange={(e) =>
                          handleGlassChanges(
                            index,
                            "frequencyofchecking",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.Remarks}
                        disabled={isEditable}
                        onChange={(e) =>
                          handleGlassChanges(index, "Remarks", e.target.value)
                        }
                      />
                    </td>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      <button
                        onClick={() => handleDeleteRow(index)}
                        style={{ background: "red", color: "white" }}
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <button
              onClick={handleAddRow}
              disabled={isEditable}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                padding: "5px",
                display: disabled ? "none" : "block",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          </div>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>Hard Plastic List</p>,
      children: (
        <div>
          <table
            style={{ width: "105%", margin: "auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Identification No.
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Location
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Protection by Safety Film
                </th>

                <th colSpan="10" style={{ textAlign: "center" }}>
                  Risk Severity
                  <br />
                  (High/Medium/Low)
                </th>

                <th colSpan="10" style={{ textAlign: "center" }}>
                  Frequency of Checking
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Remarks
                </th>

                <th colSpan="8" style={{ textAlign: "center" }}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {rows1.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td colSpan={10} style={{ textAlign: "center" }}>
                      <Input
                        className="inp-new"
                        value={row.IdentificationNo}
                        disabled={isEditable}
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          HardPlasticChanges(
                            index,
                            "IdentificationNo",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.Location}
                        disabled={isEditable}
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          HardPlasticChanges(index, "Location", e.target.value)
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.Protection}
                        disabled={isEditable}
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          HardPlasticChanges(
                            index,
                            "Protection",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Select
                        className="inp-new"
                        value={row.RiskSeverity}
                        disabled={isEditable}
                        onChange={(value) =>
                          HardPlasticChanges(index, "RiskSeverity", value)
                        }
                        placeholder="Select Risk Severity"
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <Select.Option value="High">High</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="Low">Low</Select.Option>
                      </Select>
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.frequencyofchecking}
                        onKeyDown={handleKeyDown2}
                        disabled={isEditable}
                        onChange={(e) =>
                          HardPlasticChanges(
                            index,
                            "frequencyofchecking",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.Remarks}
                        disabled={isEditable}
                        onChange={(e) =>
                          HardPlasticChanges(index, "Remarks", e.target.value)
                        }
                      />
                    </td>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      <button
                        onClick={() => handleDeleteRow1(index)}
                        style={{ background: "red", color: "white" }}
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <button
              onClick={handleAddRow1}
              disabled={isEditable}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                padding: "5px",
                display: disabled ? "none" : "block",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Ceramic List</p>,
      children: (
        <div>
          <table
            style={{ width: "105%", marginLeft: "0px", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Identification No.
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Location
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Protection by Safety Film
                </th>

                <th colSpan="10" style={{ textAlign: "center" }}>
                  Risk Severity
                  <br />
                  (High/Medium/Low)
                </th>

                <th colSpan="10" style={{ textAlign: "center" }}>
                  Frequency of Checking
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Remarks
                </th>

                <th colSpan="8" style={{ textAlign: "center" }}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {rows2.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td colSpan={10} style={{ textAlign: "center" }}>
                      <Input
                        className="inp-new"
                        value={row.IdentificationNo}
                        onKeyDown={handleKeyDown2}
                        disabled={isEditable}
                        onChange={(e) =>
                          handleCeramicChanges(
                            index,
                            "IdentificationNo",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.Location}
                        disabled={isEditable}
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleCeramicChanges(
                            index,
                            "Location",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.Protection}
                        onKeyDown={handleKeyDown2}
                        disabled={isEditable}
                        onChange={(e) =>
                          handleCeramicChanges(
                            index,
                            "Protection",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Select
                        className="inp-new"
                        value={row.RiskSeverity}
                        disabled={isEditable}
                        onChange={(value) =>
                          handleCeramicChanges(index, "RiskSeverity", value)
                        }
                        placeholder="Select Risk Severity"
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <Select.Option value="High">High</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="Low">Low</Select.Option>
                      </Select>
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.frequencyofchecking}
                        onKeyDown={handleKeyDown2}
                        disabled={isEditable}
                        onChange={(e) =>
                          handleCeramicChanges(
                            index,
                            "frequencyofchecking",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td colSpan={10}>
                      <Input
                        className="inp-new"
                        value={row.Remarks}
                        disabled={isEditable}
                        onChange={(e) =>
                          handleCeramicChanges(index, "Remarks", e.target.value)
                        }
                      />
                    </td>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      <button
                        onClick={() => handleDeleteRow2(index)}
                        style={{ background: "red", color: "white" }}
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <button
              onClick={handleAddRow2}
              disabled={isEditable}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                padding: "5px",
                display: disabled ? "none" : "block",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                }}
              >
                Prepared by :
              </td>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                }}
              >
                Approved by:
              </td>
            </tr>

            <tr>
              <td
                colSpan="15"
                style={{
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                  borderRight: "1px solid black",
                }}
              >
                {selectedrow &&
                  selectedrow?.qa_inspector_status ===
                    "QA_INSPECTOR_APPROVED" && (
                    <div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="QA Inspector Sign"
                          style={{
                            width: "70px",
                            height: "50px",
                            marginLeft: "10px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                      <br />

                      {selectedrow && selectedrow.qa_inspector_sign && (
                        <span>{selectedrow.qa_inspector_sign}</span>
                      )}
                      <br />
                      {formattedDated(selectedrow?.qa_inspector_submitted_on)}
                    </div>
                  )}
                {/* Signature & Date */}
              </td>

              <td
                colSpan="15"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {((selectedrow &&
                  selectedrow?.manager_status === "MANAGER_REJECTED") ||
                  (selectedrow &&
                    selectedrow?.manager_status === "MANAGER_APPROVED")) && (
                  <div>
                    {getImage && (
                      <img
                        src={getImage}
                        alt="Manager Sign"
                        style={{
                          width: "70px",
                          height: "50px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "space-evenly",
                        }}
                      />
                    )}
                    <br />
                    {selectedrow && selectedrow.manager_sign && (
                      <span>{selectedrow.manager_sign}</span>
                    )}
                    <br />
                    {formattedDated(selectedrow?.manager_submitted_on)}
                  </div>
                )}
                {/* Signature & Date */}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  const buttonsArray = [
    ...(role === "QA_MANAGER" || role === "ROLE_MR" || role === "ROLE_DESIGNEE"
      ? [
          <Button
            key="approve"
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
            icon={<img src={approveIcon} alt="Approve Icon" />}
          >
            &nbsp;Approve
          </Button>,
          <Button
            key="reject"
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
          </Button>,
        ]
      : []),
    ...(role === "ROLE_QA"
      ? [
          <Button
            key="save"
            loading={saveLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: canDisplayButton2(),
            }}
            onClick={handleSave}
            shape="round"
            icon={<IoSave color="#00308F" />}
          >
            &nbsp;Save
          </Button>,
          <Button
            key="submit"
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
          </Button>,
        ]
      : []),
    <Button
      key="back"
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
      key="logout"
      type="primary"
      style={{
        backgroundColor: "#E5EEF9",
        color: "#00308F",
        fontWeight: "bold",
      }}
      shape="round"
      icon={<BiLock color="#00308F" />}
      onClick={() => {
        if (confirm("Are you sure you want to logout?")) {
          localStorage.removeItem("token");
          navigate("/Precot");
        }
      }}
    >
      Logout
    </Button>,
    <Tooltip
      key="user"
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
    <Modal
      key="reject-modal"
      title="Reject"
      open={showModal}
      onOk={() => setShowModal(false)}
      onCancel={() => setShowModal(false)}
      destroyOnClose={true}
      footer={[
        <Button
          key="submit-reject"
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
    </Modal>,
  ];

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="LIST OF GLASS /HARD PLASTIC / WOOD / CERAMIC"
        formatNo="PH-QAD01/F-050"
        sopNo="PH-QAD01-D-47"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={buttonsArray}
      />

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
          addonBefore="Date:"
          placeholder="date"
          type="date"
          
          readOnly
          value={Date }
          onChange={(e) => Setdate(e.target.value)}
          style={{ width: "30%", height: "35px", marginLeft: "10px" }}
        />

        <Input
          addonBefore="Department"
          placeholder="Department"
          value={Department}
          readOnly
          style={{ width: "30%", height: "35px", marginLeft: "10px" }}
        />
      </div>

      {/* Unique Param Row*/}

      <Tabs
        defaultActiveKey="1"
        items={items}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />

      <div>
        <table style={{ marginTop: "40px", width: "80%", padding: "8px" }}>
          <tr>
            <td colSpan={80} style={{ width: "80%", padding: "5px" }}>
              Note : For Risk Severity, please refer procedure for (i) Control
              of Glass / Hard Plastic / Wood / Ceramic Materials
            </td>
          </tr>

          <tr>
            <td colSpan={50} style={{ width: "50%", padding: "5px" }}>
              Summary :<br />
              1. Total No. of Glass under control :
              <input
                value={Total_glass}
                disabled={isEditable}
                onKeyDown={handleKeyDown2}
                type="text"
                onChange={(e) => SetTotal_glass(e.target.value)}
                placeholder="Enter the Total No Glass"
                style={{ border: "none", outline: "none" }}
              />{" "}
              Nos.
              <br />
              2. Total No. of Hard Plastic under control:{" "}
              <input
                value={Total_Plastic}
                type="text"
                onKeyDown={handleKeyDown2}
                disabled={isEditable}
                onChange={(e) => SetTotal_Plastic(e.target.value)}
                placeholder="Enter the Total No Plastic"
                style={{ border: "none", outline: "none" }}
              />{" "}
              Nos.
              <br />
              3. Total No. of Wood under control :{" "}
              <input
                value={Total_wood}
                disabled={isEditable}
                onKeyDown={handleKeyDown2}
                onChange={(e) => SetTotal_wood(e.target.value)}
                type="text"
                placeholder="Enter the Total No Wood under control"
                style={{ border: "none", outline: "none" }}
              />{" "}
              Nos. <br />
              4. Total No. of Ceramic under control :{" "}
              <input
                value={Total_ceramic}
                onChange={(e) => SetTotal_ceramic(e.target.value)}
                disabled={isEditable}
                onKeyDown={handleKeyDown2}
                type="text"
                placeholder="Enter the Total No Ceramic under control"
                style={{ border: "none", outline: "none" }}
              />{" "}
              Nos.
              <br />
            </td>

            <td colSpan={30} style={{ width: "30%", padding: "5px" }}>
              Abbreviation :<br />
              G – Glass
              <br />
              H – Hard Plastic
              <br />
              W – Wood
              <br />
              C – Ceramic <br />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default QA_f50;
