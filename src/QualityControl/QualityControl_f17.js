/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
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
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader.js";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import { AiOutlinePlus } from "react-icons/ai";
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f17 = () => {
  const formatName = "REAGENT PREPARATION RECORD";
  const formatNo = "PH-QCL01/F-017 ";
  const revisionNo = 1;
  const refSopNo = "PH-QCL01-D-12";
  const unit = "unit H";

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date, month, year } = state || {};
  console.log("month", month);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [planId, setplanId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [printData, setPrintData] = useState("");
  const [mainId, setMainId] = useState("");
  const [editResponse, seteditResponse] = useState([]);
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });

  const [rows, setRows] = useState([
    {
      id: "",
      chemicalName: "",
      chemicalQuantityUsed: "",
      preparedSolutionQuantity: "",
      dilution_normality_morality: "",
      preparationDate: "",
      expiryDate: "",
    },
  ]);
  const addRow = () => {
    setRows([
      ...rows,
      {
        chemicalName: "",
        chemicalQuantityUsed: "",
        preparedSolutionQuantity: "",
        dilution_normality_morality: "",
        preparationDate: "",
        expiryDate: "",
      },
    ]);
  };
  // Custom States
  const [id, setId] = useState("");
  const [chemicalName, setChemicalName] = useState("");
  const [chemicalQuantityUsed, setChemicalQuantity] = useState("");
  const [preparedSolutionQuantity, setpreparedSolutionQuantity] = useState("");
  const [dilution_normality_morality, setDilution] = useState("");
  const [preparationDate, setPreparationDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [preparedBy, setPreparedBy] = useState("");
  const [verifiedBY, setverifiedBY] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleRemoveRow = (stateSetter, index) => {
    stateSetter(prevRows => prevRows.filter((_, i) => i !== index));
  };

  // signature Image
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    // printData?.forEach((item, index) => {
    const username = printData?.chemist_sign;
    // setSaveLoading(true);
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
    // });
  }, [printData,      API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // printData?.forEach((item, index) => {
    const username = printData?.microbiologist_sign;
    // setSaveLoading(true);
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
    // });
  }, [printData,      API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // printData?.forEach((item, index) => {
    const username = printData?.manager_sign;
    // setSaveLoading(true);
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
  }, [printData,      API.prodUrl, token]);

  const handleKeyDown = (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const roleauth = localStorage.getItem("role");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const statusFunction = (responseData) => {
    console.log("Response", responseData);
    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED" &&
      (responseData.manager_status == "CHEMIST_DESIGNEE_APPROVED" ||
        responseData.manager_status == "WAITING_FOR_APPROVAL" ||
        responseData.manager_status == "")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }

    // if (
    //   role == "ROLE_MICROBIOLOGIST" &&
    //   responseData.microbiologist_status == "MICROBIOLOGIST_APPROVED"
    // ) {
    //   setStatus((formStatus) => ({
    //     ...formStatus,
    //     saveStatus: true,
    //   }));
    // }
    // if (
    //   role == "ROLE_MICROBIOLOGIST" &&
    //   responseData.microbiologist_status == "MICROBIOLOGIST_APPROVED" &&
    //   (responseData.manager_status == "MICRO_DESIGNEE_APPROVED" ||
    //     responseData.manager_status == "WAITING_FOR_APPROVAL" ||
    //     responseData.manager_status == "")
    // ) {
    //   setStatus((formStatus) => ({
    //     ...formStatus,
    //     saveStatus: true,
    //     submitStatus: true,
    //     fieldStatus: true,
    //   }));
    // }

    if (
      (role == "CHEMIST_DESIGNEE" || role == "MICRO_DESIGNEE") &&
      responseData === "No data found for the provided parameters"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "CHEMIST_DESIGNEE" || role == "MICRO_DESIGNEE") &&
      (responseData.manager_status == "CHEMIST_DESIGNEE_APPROVED" ||
        responseData.manager_status == "MICRO_DESIGNEE_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      (role == "CHEMIST_DESIGNEE" || role == "MICRO_DESIGNEE") &&
      (responseData.manager_status == "CHEMIST_DESIGNEE_REJECTED" ||
        responseData.manager_status == "MICRO_DESIGNEE_REJECTED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    console.log("UserRole", role);
    const { date, year, month } = state || {};
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(
        `${    API.prodUrl}/Precot/api/qc/RegantPreparationReportF017/GetByDateMonthYear`,
        {
          headers,
          params: {
            year: year,
            month: month,
            // date: date,
          },
        }
      )
      .then((response) => {
        console.log("response ", response);

        if (response.data && response.data.length > 0) {
          console.log("Response data available: ", response.data);

          if (response.data === "No data found for the provided parameters") {
            console.log("No data found for the provided parameters");
            setPrintData([]); // Set empty array or null to prevent .map() error
            statusFunction(response.data); // Update status

          } else {
            console.log("Valid data received:", response.data[0]);

            // // Role-based validation
            // if (role === "ROLE_MICROBIOLOGIST") {
            //   if (
            //     response.data[0].chemist_status !== null &&
            //     response.data[0].chemist_status !== undefined
            //   ) {
            //     console.log("Chemist has submitted the report");
            //     message.warning("Chemist_Submitted");
            //     setTimeout(() => {
            //       navigate("/Precot/QualityControl/F-017/Summary");
            //     }, 1000);
            //     return;
            //   }
            // }

            // if (role === "ROLE_CHEMIST") {
            //   if (
            //     response.data[0].microbiologist_status !== null &&
            //     response.data[0].microbiologist_status !== undefined
            //   ) {
            //     console.log("Microbiologist has submitted the report");
            //     message.warning("Microbiologist_Submitted");
            //     setTimeout(() => {
            //       navigate("/Precot/QualityControl/F-017/Summary");
            //     }, 1000);
            //     return;
            //   }
            // }

            // Else block for setting state when neither validation applies
            console.log("Setting state from response data", response.data[0]);
            setId(response.data[0].id);
            // setChemicalName(response.data[0].chemicalName);
            // setChemicalQuantity(response.data[0].chemicalQuantityUsed);
            // setpreparedSolutionQuantity(
            //   response.data[0].preparedSolutionQuantity
            // );
            // setDilution(response.data[0].dilution_normality_morality);
            // setPreparationDate(response.data[0].preparationDate);
            // setExpiryDate(response.data[0].expiryDate);
            seteditResponse(response.data[0])
            const rows = response.data[0].qcReagentPreparationRecordF017ChemTables.map(row => ({
              sno: row.sno,
              reagentPrepId: row.reagentPrepId,
              chemicalName: row.chemicalName,
              chemicalQuantityUsed: row.chemicalQuantityUsed,
              preparedSolutionQuantity: row.preparedSolutionQuantity,
              dilution_normality_morality: row.dilution_normality_morality,
              preparationDate: row.preparationDate,
              expiryDate: row.expiryDate,
            }));
            // Call status function
            setRows(rows);
            statusFunction(response.data[0]);

            // Setting print data
            setPrintData(response.data[0]); // Ensure this is an array if you'll be using .map()
          }
        } else {
          console.log("No valid data received from API");

          // // Trigger role mismatch error if no data found
          // if (role === "ROLE_MICROBIOLOGIST") {
          //   message.error(
          //     "Role Mismatch: Microbiologist not allowed for this action"
          //   );
          // } else if (role === "ROLE_CHEMIST") {
          //   message.error("Role Mismatch: Chemist not allowed for this action");
          // } else {
          //   message.error("No data found for the provided parameters");
          // }

          setPrintData([]); // Set empty array to prevent .map() errors
        }
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        message.error("An error occurred while fetching data.");
        setPrintData([]); // Handle error gracefully
      });
  }, []);

  console.log("fdk", editResponse);
  const canEdit = () => {
    if (roleauth === "ROLE_CHEMIST") {
      return !(
        editResponse &&
        editResponse.chemist_status == "CHEMIST_APPROVED" &&
        (editResponse.manager_status !== "CHEMIST_DESIGNEE_REJECTED" ||
          editResponse.manager_status == "MICRO_DESIGNEE_REJECTED")
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        editResponse &&
        (editResponse.manager_status === "HOD_APPROVED" ||
          editResponse.manager_status === "WAITING_FOR_APPROVAL" ||
          editResponse.manager_status === "")
      );
    } else {
      return false;
    }
  };



  const isEditable = canEdit();
  const handleRejectModal = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${    API.prodUrl}/Precot/api/qc/ApproveRegantPreparationReportF017`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-017/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
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
        `${    API.prodUrl}/Precot/api/qc/ApproveRegantPreparationReportF017`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-017/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const containerStyle = {
    position: "relative",
  };

  const handleSave = async () => {
    try {
      await SaveGlassWareBreakage();
    } catch (error) {
      console.error("Error saving REAGENT PREPARATION RECORD  Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitGlasswareBreakage();
    } catch (error) {
      console.error(
        "Error submitting REAGENT PREPARATION RECORD  Record..",
        error
      );
    }
  };

  const SaveGlassWareBreakage = async () => {
    setSaveLoading(true);

    try {
      const payload = {
        id: id || null,
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: revisionNo,
        refSopNo: refSopNo,
        // unit: unit,
        month: month,
        year: year,

        qcReagentPreparationRecordF017ChemTables: rows.map((row) => ({
          sno: row.sno || null,
          reagentPrepId: row.reagentPrepId || null,
          chemicalName: row.chemicalName,
          chemicalQuantityUsed: row.chemicalQuantityUsed,
          preparedSolutionQuantity: row.preparedSolutionQuantity,
          dilution_normality_morality: row.dilution_normality_morality,
          preparedDate: row.preparationDate,
          expiryDate: row.expiryDate,
        })),
      };
      console.log(":payload", payload);
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SaveRegantPreparationReportF017`,
        payload,
        { headers }
      );
      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      message.success("Submitted successfully..");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-017/Summary");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save REAGENT PREPARATION RECORD  Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      rows.every((row) => row.chemicalName && row.chemicalQuantityUsed && row.dilution_normality_morality && row.preparationDate && row.expiryDate && row.preparedSolutionQuantity)
    );
  };

  const SubmitGlasswareBreakage = async () => {
    // if (!isFormValid()) {
    //   message.error("Please fill all required fields.");
    //   return;
    // }
    setSubmitLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const payload = {
        id: id || null,
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: revisionNo,
        refSopNo: refSopNo,
        // unit: unit,
        month: month,
        year: year,

        qcReagentPreparationRecordF017ChemTables: rows.map((row) => ({
          sno: row.sno || null,
          reagentPrepId: row.reagentPrepId || null,
          chemicalName: row.chemicalName,
          chemicalQuantityUsed: row.chemicalQuantityUsed,
          preparedSolutionQuantity: row.preparedSolutionQuantity,
          dilution_normality_morality: row.dilution_normality_morality,
          preparedDate: row.preparationDate,
          expiryDate: row.expiryDate,
        })),
      };

      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SubmitRegantPreparationReportF017`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QualityControl/F-017/Summary");
      }, 1500);

      message.success(
        "REAGENT PREPARATION RECORD Record Submitted Successfully.."
      );
    } catch (error) {
      message.error(error.response.data.message);

      throw new Error("Failed to submit REAGENT PREPARATION RECORD  Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-017/Summary");
  };

  const items = [
    {
      key: "1",
      label: <p>REAGENT PREPARATION RECORD </p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th colSpan="5" style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Chemical Name{" "}
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Chemical Quantity used(g){" "}
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Prepared Solution Quantity (ml){" "}
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Dilution / Normality / Molarity
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Preparation Date{" "}
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Expiry Date{" "}
              </th>
            </tr>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td
                    colSpan="5"
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    {index + 1}
                  </td>
                  <td
                    colSpan="15"
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      style={{
                        width: "75%",
                        padding: "2px",
                        textAlign: "center",
                      }}
                      value={row.chemicalName}
                      onChange={(e) =>
                        handleInputChange(index, "chemicalName", e.target.value)
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td
                    colSpan="10"
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={row.chemicalQuantityUsed}
                      style={{
                        width: "75%",
                        padding: "2px",
                        textAlign: "center",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "chemicalQuantityUsed",
                          e.target.value.replace(/[^0-9.]/g, "")
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td
                    colSpan="10"
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={row.preparedSolutionQuantity}
                      style={{
                        width: "75%",
                        padding: "2px",
                        textAlign: "center",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "preparedSolutionQuantity",
                          e.target.value.replace(/[^0-9.]/g, "")
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td
                    colSpan="10"
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={row.dilution_normality_morality}
                      style={{
                        width: "75%",
                        padding: "2px",
                        textAlign: "center",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "dilution_normality_morality",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td
                    colSpan="10"
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    <input
                      className="inp-new"
                      type="date"
                      value={row.preparationDate}
                      style={{
                        width: "75%",
                        padding: "2px",
                        textAlign: "center",
                      }}
                      max={getCurrentDate()}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "preparationDate",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td
                    colSpan="10"
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    <input
                      className="inp-new"
                      type="date"
                      value={row.expiryDate}
                      style={{
                        width: "75%",
                        padding: "2px",
                        textAlign: "center",
                      }}
                      min={getCurrentDate()}
                      onChange={(e) =>
                        handleInputChange(index, "expiryDate", e.target.value)
                      }
                      disabled={!isEditable}
                    />
                  </td>

                  {index !== 0 &&
                    editResponse?.chemist_status !== "CHEMIST_SAVED" &&
                    editResponse?.chemist_status !== "CHEMIST_APPROVED" &&
                    (
                      <button
                        onClick={() => handleRemoveRow(setRows, index)}
                        style={{
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          padding: "8px",
                          fontSize: "10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "transparent",
                        }}
                        disabled={!isEditable}
                      >
                        <DeleteOutlined style={{ fontSize: "20px", color: "blue" }} />
                      </button>
                    )}
                </tr>
              ))}
            </tbody>
            {!(editResponse?.chemist_status === "CHEMIST_APPROVED" && editResponse?.manager_status !== "REJECTED") && (
              <Button
                onClick={addRow}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  border: "1px solid #00308F",
                  padding: "8px 12px",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                <AiOutlinePlus style={{ marginRight: "5px" }} />
                Add Row
              </Button>
            )}

          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
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
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                {/* <b>Tested by (Microbiologist) : Sign and Date </b> */}
                <b>Prepared By </b>
              </td>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                {/* <b>Approved by (QC In-Charge) : Sign and Date </b> */}
                <b>Verified By</b>
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
                {/* Validation for chemist data */}
                {(getImage || !getImage) &&
                  printData?.chemist_sign &&
                  printData?.chemist_submit_on ? (
                  <>
                    {getImage !== "" && (
                      <img
                        className="signature"
                        src={getImage}
                        alt="Chemist Signature"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                          border: "none",
                        }}
                      />
                    )}
                    <br />
                    {printData?.chemist_sign}
                    <br />
                    {moment(printData?.chemist_submit_on).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </>
                ) : (
                  <></>
                )}
                <br />

                {/* Validation for microbiologist data */}
                {(getImage1 || !getImage1) &&
                  printData?.microbiologist_sign &&
                  printData?.microbiologist_submit_on ? (
                  <>
                    {getImage1 !== "" && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Microbiologist Signature"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                          border: "none",
                        }}
                      />
                    )}
                    <br />
                    {printData?.microbiologist_sign}
                    <br />
                    {moment(printData?.microbiologist_submit_on).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </>
                ) : (
                  <></>
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
                {/* {getImage1 !== "" && (
                    <img className="signature" src={getImage1} alt="QC" />
                  )}
                  <br />
                  {printData?.manager_sign} <br />
                  {moment(printData?.manager_submit_on).format("DD/MM/YYYY HH:mm")} */}
                {(getImage2 || !getImage2) &&
                  printData?.manager_sign &&
                  printData?.manager_submit_on ? (
                  <>
                    {getImage2 !== "" && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Manager Signature"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                          border: "none",
                        }}
                      />
                    )}
                    <br />
                    {printData?.manager_sign}
                    <br />
                    {moment(printData?.manager_submit_on).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </>
                ) : (
                  <></>
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="REAGENT PREPARATION RECORD"
        formatNo="PH-QCL01/F-017"
        sopNo="PH-QCL01/F-017"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "CHEMIST_DESIGNEE" || role === "MICRO_DESIGNEE" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: status.submitStatus ? "none" : "flex",
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
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
                  display: status.submitStatus ? "none" : "flex",
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
                  display: status.saveStatus ? "none" : "flex",
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
                  display: status.submitStatus ? "none" : "flex",
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

      {/* Unique Param Row*/}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* <Input
            addonBefore="Date:"
            placeholder="Date"
            value={date}
            disabled
            style={{ width: '20%', height: '35px' }}
        /> */}
        <Input
          addonBefore="Month:"
          placeholder="Month"
          value={month}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Year:"
          placeholder="Year"
          value={year}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
      </div>
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

export default QualityControl_f17;