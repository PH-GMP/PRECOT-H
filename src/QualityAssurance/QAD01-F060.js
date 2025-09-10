/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Modal,
  Select,
  Tabs,
  Tooltip
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
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

const QA_f60 = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date, department } = state || {};
  const [Customer, SetCustomer] = useState("");
  const [selectedrow, setselectedrow] = useState("");
  const roleBase = localStorage.getItem("role");
  const [id, setid] = useState("");
  const year = date ? date.split("-")[0] : "";
  const monthNumber = date ? date.split("-")[1] : "";
  const [toDelete, setToDelete] = useState("");
  const roleauth = localStorage.getItem("role");
  const month = monthNumber
    ? [
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
      ][parseInt(monthNumber, 10) - 1]
    : "";

  const handleDeleteRow1 = (index) => {
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

  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const [newDate, setNewDate] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [rejectRemarks, setRejectRemarks] = useState("");

  const [showModal, setShowModal] = useState(false);
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, "0");

  const [reportId, setreportId] = useState("");

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDatewithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const isEditable =
    (roleauth === "ROLE_QA" &&
      selectedrow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
      selectedrow?.managerStatus === "WAITING_FOR_APPROVAL") ||
    selectedrow?.managerStatus === "QA_MANAGER_APPROVED" ||
    selectedrow?.managerStatus == "MR_APPROVED" ||
    selectedrow?.managerStatus == "DESIGNEE_APPROVED" ||
    roleauth === "QA_MANAGER" ||
    roleauth === "ROLE_DESIGNEE" ||
    (roleauth === "ROLE_MR" &&
      (selectedrow?.managerStatus === "WAITING_FOR_APPROVAL" ||
        selectedrow?.managerStatus === "QA_MANAGER_APPROVED" ||
        selectedrow?.managerStatus == "MR_APPROVED" ||
        selectedrow?.managerStatus == "DESIGNEE_APPROVED" ||
        selectedrow?.managerStatus === "QA_MANAGER_REJECTED" ||
        selectedrow?.managerStatus == "MR_REJECTED" ||
        selectedrow?.managerStatus == "DESIGNEE_REJECTED"));

  const canDisplayButtons = () => {
    if (roleBase === "ROLE_QA") {
      if (
        selectedrow?.qaInspectorStatus == "QA_INSPECTOR_SUBMITTED" &&
        (selectedrow?.managerStatus == "WAITING_FOR_APPROVAL" ||
          selectedrow?.managerStatus == "QA_MANAGER_APPROVED" ||
          selectedrow?.managerStatus == "MR_APPROVED" ||
          selectedrow?.managerStatus == "DESIGNEE_APPROVED")
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      } else if (
        (selectedrow?.qaInspectorStatus == "QA_INSPECTOR_SUBMITTED" && // Not submitted
          selectedrow?.managerStatus == "QA_MANAGER_APPROVED") ||
        selectedrow?.managerStatus == "MR_APPROVED" ||
        selectedrow?.managerStatus == "DESIGNEE_APPROVED"
      ) {
        return "none";
      }
    } else if (
      roleBase == "QA_MANAGER" ||
      roleBase == "ROLE_DESIGNEE" ||
      roleBase === "ROLE_MR"
    ) {
      if (
        (selectedrow?.qaInspectorStatus == "QA_INSPECTOR_SUBMITTED" && // Not submitted
          selectedrow?.managerStatus == "QA_MANAGER_APPROVED") ||
        selectedrow?.managerStatus == "MR_APPROVED" ||
        selectedrow?.managerStatus == "DESIGNEE_APPROVED"
      ) {
        return "none";
      } else if (
        selectedrow?.managerStatus == "QA_MANAGER_REJECTED" ||
        selectedrow?.managerStatus == "MR_REJECTED" ||
        selectedrow?.managerStatus == "DESIGNEE_REJECTED"
      ) {
        return "none";
      }
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_QA") {
      if (
        (selectedrow?.qaInspectorStatus == "QA_INSPECTOR_SUBMITTED" &&
          selectedrow?.managerStatus == "QA_MANAGER_REJECTED") ||
        selectedrow?.managerStatus == "MR_REJECTED" ||
        selectedrow?.managerStatus == "DESIGNEE_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedrow?.qaInspectorStatus == "QA_INSPECTOR_SUBMITTED" &&
        (selectedrow?.managerStatus == "WAITING_FOR_APPROVAL" ||
          selectedrow?.managerStatus == "QA_MANAGER_APPROVED" ||
          selectedrow?.managerStatus == "MR_APPROVED" ||
          selectedrow?.managerStatus == "DESIGNEE_APPROVED")
      ) {
        return "none";
      }
    } else if (
      roleauth == "QA_MANAGER" ||
      roleauth == "ROLE_DESIGNEE" ||
      roleauth === "ROLE_MR"
    ) {
      if (
        selectedrow?.managerStatus == "QA_MANAGER_APPROVED" ||
        selectedrow?.managerStatus == "MR_APPROVED" ||
        selectedrow?.managerStatus == "DESIGNEE_APPROVED" ||
        selectedrow?.managerStatus == "QA_MANAGER_REJECTED" ||
        selectedrow?.managerStatus == "MR_REJECTED" ||
        selectedrow?.managerStatus == "DESIGNEE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedrow?.managerStatus == "QA_MANAGER_APPROVED" ||
        selectedrow?.managerStatus == "MR_APPROVED" ||
        selectedrow?.managerStatus == "DESIGNEE_APPROVED" ||
        selectedrow?.managerStatus == "QA_MANAGER_REJECTED" ||
        selectedrow?.managerStatus == "MR_REJECTED" ||
        selectedrow?.managerStatus == "DESIGNEE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedrow?.qaInspectorSign;
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
    const username = selectedrow?.managerSign;
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
        .catch((err) => {});
    }
  }, [selectedrow,API.prodUrl, token]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleRejectModal = () => {
    setShowModal(true);
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

  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/approveMasterListSharp`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-060/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/approveMasterListSharp`,
        {
          id: id,
          status: "Approve",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-060/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handlelistoftool = (index, field, value) => {
    const newRows = [...rows];

    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSave = async () => {
    try {
      await Savelistofsharptool();
    } catch (error) {
      console.error("Error saving Savelistofsharptool:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await Submitlistofsharptool();
    } catch (error) {
      console.error("Error submitting Savelistofsharptool", error);
    }
  };

  const Savelistofsharptool = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        unit: "Unit-H",
        formatName: "MASTER LIST OF SHARP TOOLS",
        formatNo: "PH-QAD01/F-060",
        revisionNo: "01",
        sopNumber: "PH-QAD01-D-43",
        date: date,
        month: month,
        year: year,
        department: department,
        ...(id && { id }),
        details: [
          ...(rows || []).map((row) => ({
            ...(row.lineId && { types_id: row.lineId }),
            ...(id && { id }),

            itemDescription: row.ItemDescription,
            identificationNoOnTheTool: row.IdentificationNo,
            location: row.Location,
            remarks: row.Remarks,
          })),
        ],
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/saveMasterListSharpTools`,
        payload,
        { headers }
      );

      if (toDelete.length > 0) {
        await Promise.all(
          toDelete.map(async (deleteId) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/MasterListSharpList?deleteChildEntry=${deleteId}`,
              { headers }
            );
          })
        );
        setToDelete([]); // Clear the toDelete array after deletion
      }

      setTimeout(() => {
        navigate("/Precot/QA/F-060/Summary");
      }, 1500);
      message.success("Report Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save  Report !!");
    } finally {
      setSaveLoading(false);
    }
  };

  // const validateForm = () => {

  //   if (!SupplierMail || SupplierMail.length === 0) {
  //     message.error('Please Enter the Supplier MailId');
  //     return false;
  //   }

  //   if (!AuditorMail || AuditorMail.length === 0) {
  //     message.error('Please Enter the Auditor MailId');
  //     return false;
  //   }

  //   return true;
  // };

  const Submitlistofsharptool = async () => {
    setSubmitLoading(true);

    // if (!validateForm()) {
    //   setSubmitLoading(false);
    //   return;
    // }

    try {
      const payload = {
        unit: "Unit-H",
        formatName: "MASTER LIST OF SHARP TOOLS",
        formatNo: "PH-QAD01/F-060",
        revisionNo: "01",
        sopNumber: "PH-QAD01-D-43",
        date: date,
        month: month,
        year: year,
        department: department,
        ...(id && { id }),
        details: [
          ...(rows || []).map((row) => ({
            ...(row.lineId && { types_id: row.lineId }),
            ...(id && { id }),

            itemDescription:
              row.ItemDescription === "" ? "NA" : row.ItemDescription,
            identificationNoOnTheTool:
              row.IdentificationNo === "" ? "NA" : row.IdentificationNo,
            location: row.Location === "" ? "NA" : row.Location,
            remarks: row.Remarks === "" ? "NA" : row.Remarks,
          })),
        ],
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SubmitMasterListSharpTools`,
        payload,
        { headers }
      );

      if (toDelete.length > 0) {
        await Promise.all(
          toDelete.map(async (deleteId) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/MasterListSharpList/deleteChildEntry/${deleteId}`,
              { headers }
            );
          })
        );
        setToDelete([]);
      }

      setTimeout(() => {
        navigate("/Precot/QA/F-060/Summary");
      }, 1500);
      message.success("Report Submitted Successfully..");
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error("Failed to submit Report!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-060/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/MasterListSharpTools/GetByDateAndDept?date=${date}&department=${department}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if data exists and has at least one item
      if (response.data && response.data.length > 0) {
        const firstItem = response.data[0];

        console.log(
          "Details",
          firstItem.details?.[0]?.identificationNoOnTheTool
        );

        // Set state for id and selected row
        setid(firstItem.id);
        setselectedrow(firstItem);

        // Map details if it exists and set rows
        const newRows =
          firstItem.details?.map((item) => ({
            lineId: item.detailsId,
            ItemDescription: item.itemDescription,
            IdentificationNo: item.identificationNoOnTheTool,
            Location: item.location,
            Remarks: item.remarks,
          })) || [];

        setRows(newRows);

        // Handle role-based navigation and messages
        if (
          ((roleauth === "QA_MANAGER" ||
            roleauth === "ROLE_MR" ||
            roleauth === "ROLE_DESIGNEE") &&
            firstItem.qaInspectorStatus !== "QA_INSPECTOR_SUBMITTED") ||
          ((roleauth === "QA_MANAGER" ||
            roleauth === "ROLE_MR" ||
            roleauth === "ROLE_DESIGNEE") &&
            firstItem.managerStatus === "QA_MANAGER_REJECTED") ||
          firstItem.managerStatus === "MR_REJECTED" ||
          firstItem.managerStatus === "DESIGNEE_REJECTED"
        ) {
          message.error("QA Inspector Not Yet Approved");
          setTimeout(() => {
            navigate("/Precot/QA/F-060/Summary");
          }, 1500);
        }
      } else {
        // Prepare for new entry if there's no data
        setid(null);
        setselectedrow(null);
        setRows([]);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // Initial state for table rows

  const [rows, setRows] = useState([
    {
      lineId: "",
      ItemDescription: "",
      IdentificationNo: "",
      Location: "",
      Remarks: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { ItemDescription: "", IdentificationNo: "", Location: "", Remarks: "" },
    ]);
  };

  const items = [
    {
      key: "1",
      label: <p> LIST OF SHARP TOOLS</p>,
      children: (
        <div>
          <table style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <td
                  colSpan="10"
                  style={{ textAlign: "center", padding: "3px" }}
                >
                  S.No.
                </td>
                <td
                  colSpan="20"
                  style={{ textAlign: "center", padding: "3px" }}
                >
                  Item Description
                </td>
                <td
                  colSpan="20"
                  style={{ textAlign: "center", padding: "3px" }}
                >
                  Identification No. On The Tool
                </td>

                <td
                  colSpan="20"
                  style={{ textAlign: "center", padding: "3px" }}
                >
                  Location
                </td>
                <td
                  colSpan="20"
                  style={{ textAlign: "center", padding: "3px" }}
                >
                  Remarks
                </td>
                <td
                  colSpan="10"
                  style={{ textAlign: "center", padding: "3px" }}
                >
                  Delete
                </td>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", padding: "8px" }}
                  >
                    {index + 1}
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "8px" }}
                  >
                    <input
                      type="text"
                      className="inp-new"
                      style={{ fontSize: "13px" }}
                      value={row.ItemDescription}
                      disabled={isEditable}
                      onKeyDown={handleKeyDown2}
                      onChange={(e) =>
                        handlelistoftool(
                          index,
                          "ItemDescription",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "8px" }}
                  >
                    <input
                      type="text"
                      className="inp-new"
                      style={{ fontSize: "13px" }}
                      value={row.IdentificationNo}
                      onKeyDown={handleKeyDown2}
                      disabled={isEditable}
                      onChange={(e) =>
                        handlelistoftool(
                          index,
                          "IdentificationNo",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "8px" }}
                  >
                    <input
                      type="text"
                      className="inp-new"
                      style={{ fontSize: "13px" }}
                      value={row.Location}
                      onKeyDown={handleKeyDown2}
                      disabled={isEditable}
                      onChange={(e) =>
                        handlelistoftool(index, "Location", e.target.value)
                      }
                    />
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "8px" }}
                  >
                    <input
                      type="text"
                      className="inp-new"
                      style={{ fontSize: "13px" }}
                      value={row.Remarks}
                      disabled={isEditable}
                      onChange={(e) =>
                        handlelistoftool(index, "Remarks", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan={10} style={{ textAlign: "center" }}>
                    <button
                      onClick={() => handleDeleteRow1(index)}
                      style={{ background: "red", color: "white" }}
                    >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))}

              <br />

              <tr>
                <td colSpan="100">
                  Note :- <br />
                  1. In case of a tool kit, individual items should be
                  mentioned. <br />
                  2. Identification number will be given by the user department.
                  <br />
                  3. Sharp tool Dept. wise Identification number <br />
                  (Blow Room - BR-XX, Bleaching - BLG-XX, Spunlace - SP-XX, Ball
                  Making - BM-XX, Pleat - PLT- XX, Wool Roll - WR-XX, Pad
                  Punching - PP-XX, Store - STR-XX, Quality - QC-XX)
                </td>
              </tr>
            </tbody>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
                marginRight: "50%",
                marginTop: "30px",
                marginLeft: "10px",
              }}
              disabled={isEditable}
              onClick={addRow}
              icon={
                <AiOutlinePlus
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Add Row
            </Button>
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
                  selectedrow?.qaInspectorStatus ===
                    "QA_INSPECTOR_SUBMITTED" && (
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

                      {selectedrow && selectedrow.qaInspectorSign && (
                        <span>{selectedrow.qaInspectorSign}</span>
                      )}
                      <br />
                      {formattedDated(selectedrow?.qaInspectorSubmittedOn)}
                    </div>
                  )}
                {/* Signature & Date */}
              </td>

              <td
                colSpan="15"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {((selectedrow &&
                  selectedrow?.managerStatus === "QA_MANAGER_REJECTED") ||
                  selectedrow?.managerStatus == "MR_REJECTED" ||
                  selectedrow?.managerStatus == "DESIGNEE_REJECTED" ||
                  (selectedrow &&
                    selectedrow?.managerStatus === "QA_MANAGER_APPROVED") ||
                  selectedrow?.managerStatus == "MR_APPROVED" ||
                  selectedrow?.managerStatus == "DESIGNEE_APPROVED") && (
                  <div>
                    {getImage2 && (
                      <img
                        src={getImage2}
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
                    {selectedrow && selectedrow.managerSign && (
                      <span>{selectedrow.managerSign}</span>
                    )}
                    <br />
                    {formattedDated(selectedrow?.managerSubmittedOn)}
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

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="MASTER LIST OF SHARP TOOLS"
        formatNo="PH-QAD01/F-060"
        sopNo="PH-QAD01-D-22"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          ...(role === "QA_MANAGER" ||
          role === "ROLE_MR" ||
          role === "ROLE_DESIGNEE"
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
        ]}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          marginLeft: "20px",
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          value={formattedDate(date)}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="Department"
          placeholder="Department"
          value={department}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "22px",
          width: "100%",
          marginLeft: "20px",
          maxWidth: "100%",
        }}
      ></div>
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

export default QA_f60;
