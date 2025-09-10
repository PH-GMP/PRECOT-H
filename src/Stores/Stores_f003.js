/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Menu,
  Radio,
  Row,
  Select,
  Tabs,
  Tooltip,
  message,
  Modal,
} from "antd";

import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const Stores_f003 = () => {
  const { state } = useLocation();
  const today = new Date().toISOString().split("T")[0];
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState(state.invoiceNo);
  const [totalQuantity, setTotalQuantity] = useState("");
  const [noOfBalesOrCans, setNoOfBalesOrCans] = useState("");
  const [noOfBalesOrCansCount, setNoOfBalesOrCansCount] = useState("");
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState(state.description);
  const [vehicleNo, setVehicleNo] = useState("");
  const [organicIdentification, setOrganicIdentification] = useState("");
  const [vehicleCondition, setVehicleCondition] = useState("");
  const [packingCondition, setPackingCondition] = useState("");
  const [wetCondition, setWetCondition] = useState(false);
  const [contamination, setContamination] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [storeInChargeStatus, setStoreInChargeStatus] = useState("");
  const [operatorStatus, setOperatorStatus] = useState("");
  const { Option } = Select;
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [incharge, setIncharge] = useState("");
  const [inchargeDate, setInchargeDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [supervisorStatus, setSupervisorStatus] = useState("");
  // console.log("date,", state.date);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/Stores/F-003/Summary");
  };
  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");

  const formatDateUser = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDate = (dateStr) => {
    // Check if the date is already in the format dd/MM/yyyy
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const date1 = formatDateUser(date);
  const formattedInchargeDate = formatDate(inchargeDate);
  const formatedDateOperator = formatDate(operatorDate);
  const formattedDateHod = formatDate(hodDate);
  // console.log("date1", date1);
  // console.log("shift", state.shift);
  const token = localStorage.getItem("token");
  // console.log(token);
  console.log("invoiceNO", state.invoiceNo);
  useEffect(() => {
    fetchBmrOptions();
  }, []);
  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/Store/getReceptionCheckListByInvoiceAndDescription?invoiceNo=${state.invoiceNo}&description=${state.description}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log("edit data", data);

      if (data) {
        setEditResponse(data[0]);
        setId(data[0].id);
        setDate(data[0].date);
        setSupplierName(data[0].supplierName);
        setInvoiceNo(data[0].invoiceNo);
        setTotalQuantity(data[0].totalQuantity);
        setNoOfBalesOrCans(data[0].noOfBalesOrCans);
        setNoOfBalesOrCansCount(data[0].noOfBalesOrCansCount);
        setWeight(data[0].weight);
        setDescription(data[0].description);
        setVehicleNo(data[0].vehicleNo);
        setOrganicIdentification(data[0].organicIdentification);
        setVehicleCondition(data[0].vehicleCondition);
        setPackingCondition(data[0].packingCondition);
        setWetCondition(data[0].wetCondition);
        setContamination(data[0].contamination);
        setRemarks(data[0].remarks);
        setStoreInChargeStatus(data[0].store_in_charge_status);
        setOperatorStatus(data[0].operator_status);
        setOperator(data[0].operator_sign);
        setIncharge(data[0].store_in_charge_sign);
        setInchargeDate(data[0].store_in_charge_submit_on);
        setOperatorDate(data[0].operator_submit_on);
      }

 

      if (roleauth === "STORE_INCHARGE") {
        if (data[0]?.operator_status !== "OPERATOR_APPROVED" ||
          data[0]?.store_in_charge_status === "INCHARGE_REJECTED") {
          message.warning(
            "Operator Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/Stores/F-003/Summary");
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "STORE_OPERATOR") {
      // Operator approved and incharge rejected => show submit button
      if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "block"; // Show submit button
      }

      // Operator approved and incharge still pending or approved => hide submit button
      if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        (editResponse?.store_in_charge_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.store_in_charge_status === "INCHARGE_APPROVED")
      ) {
        return "none"; // Hide submit button
      }

      return "block"; // By default, show submit button
    } else if (roleauth === "STORE_INCHARGE") {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth === "STORE_OPERATOR") {
      if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        (editResponse?.store_in_charge_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.store_in_charge_status === "INCHARGE_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth === "STORE_INCHARGE") {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  const canEdit = () => {
    const isOperatorApproved =
      editResponse?.operator_status === "OPERATOR_APPROVED";
    const isInchargeApproved =
      editResponse?.store_in_charge_status === "INCHARGE_APPROVED";
    const isInchargeRejected =
      editResponse?.store_in_charge_status === "INCHARGE_REJECTED";

    if (roleauth === "STORE_OPERATOR") {
      return !isOperatorApproved || isInchargeRejected;
    }

    if (roleauth === "STORE_INCHARGE") {
      return !isOperatorApproved;
    }

    // Default to false (not editable) if none of the conditions match
    return false;
  };

  const isEditable = canEdit();

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = incharge;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = incharge;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = operator;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  // console.log(productName);
  // console.log("noOfFlagsInRoll", mixing);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Store/ReceptionChecklist/approveOrReject`,
        {
          id: id,
          status: "Approve",
          remarks: "",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Stores/F-003/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
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
        `${API.prodUrl}/Precot/api/Store/ReceptionChecklist/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Stores/F-003/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleSave = () => {
    setSaveLoading(true);
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;

    const payload = {
      id: id || null,
      formatName: "RECEPTION CHECK LIST",
      formatNo: "PH- STR01/F-003",
      revisionNo: "02",
      sopNumber: "PH-STR01-D-02",
      date: date,
      unit: "H",
      supplierName: supplierName,
      invoiceNo: invoiceNo,
      totalQuantity: totalQuantity,
      noOfBalesOrCans: noOfBalesOrCans || "NA",
      noOfBalesOrCansCount: noOfBalesOrCansCount,
      weight: weight,
      description: description,
      vehicleNo: vehicleNo,
      organicIdentification: organicIdentification || "NA",
      vehicleCondition: vehicleCondition ||  "NA",
      packingCondition: packingCondition ||  "NA",
      wetCondition: wetCondition || "NA",
      contamination: contamination || "NA",
      remarks: remarkToSave,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/Store/ReceptionChecklist/Save`, payload, {
        headers,
      })
      .then((res) => {
        // console.log("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/Stores/F-003/Summary");
      })
      .catch((err) => {
        // console.log("Error", err);
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const isFormValid = () => {
    return (
      supplierName &&
      totalQuantity &&
      weight &&
      vehicleNo &&
      date
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      message.error("Please fill all required fields.");
      return;
    }

    setSubmitLoading(true);
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;


    const payload = {
      id: id || null,
      formatName: "RECEPTION CHECK LIST",
      formatNo: "PH- STR01/F-003",
      revisionNo: "02",
      sopNumber: "PH-STR01-D-02",
      date: date,
      unit: "H",
      supplierName: supplierName,
      invoiceNo: invoiceNo,
      totalQuantity: totalQuantity,
      noOfBalesOrCans: noOfBalesOrCans || "NA",
      noOfBalesOrCansCount: noOfBalesOrCansCount,
      weight: weight,
      description: description,
      vehicleNo: vehicleNo,
      organicIdentification: organicIdentification || "NA",
      vehicleCondition: vehicleCondition ||  "NA",
      packingCondition: packingCondition ||  "NA",
      wetCondition: wetCondition || "NA",
      contamination: contamination || "NA",
      remarks: remarkToSave,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(` ${API.prodUrl}/Precot/api/Store/ReceptionChecklist/Submit`, payload, {
        headers,
      })
      .then((res) => {
        // console.log("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/Stores/F-003/Summary");
      })
      .catch((err) => {
        // console.log("Error", err);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  const noOfBalesOrCansOptions = [
    "Bales",
    "Cans",
    "Each",
    "Roll",
  ];
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = (e) => {
    const value = e.target.value.trim();
    setTextFieldValue(value === "" ? "NA" : value);
  };

  const handleSupplierNameChange = (e) => {
    const inputValue = e.target.value;
      setSupplierName(inputValue);
  };

  const handleQuantity = (e) => {
    const inputValue = e.target.value;

    // Regular expression to allow up to 2 decimal places

    setTotalQuantity(inputValue);

  };
  const handleNoOfBalesCount = (e) => {
    const inputValue = e.target.value;

    // Regular expression to allow up to 2 decimal places

    setNoOfBalesOrCansCount(inputValue);

  };
  const handleWeight = (e) => {
    const inputValue = e.target.value;

    // Regular expression to allow up to 2 decimal places
    // if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
      setWeight(inputValue);
    // }
  };

  const handleInvoiceNoChange = (e) => {
    const inputValue = e.target.value;
    // Regular expression to allow numbers, alphabets, /, and _

    setInvoiceNo(inputValue);

  };
  const handleDescrptionChange = (e) => {
    const inputValue = e.target.value;
    // Regular expression to allow numbers, alphabets, /, and _
    if (/^[a-zA-Z0-9._ ]*$/.test(inputValue)) {
      setDescription(inputValue);
    }
  };
  const handlevehicleNo = (e) => {
    const inputValue = e.target.value;
    // Regular expression to allow numbers, alphabets, /, and _
    if (/^[a-zA-Z0-9_ ]*$/.test(inputValue)) {
      setVehicleNo(inputValue);
    }
  };
  const handleSelectText = (e, name) => {
    // Allow only alphanumeric characters, Backspace, Delete, and navigation keys
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault(); // Prevent input if not allowed
    }

    // If the Enter key is pressed, update the form data
    if (e.key === "Enter") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.value || noOfBalesOrCans, // Set the value based on input or selected option
      }));
    }
  };

  const items = [
    {
      key: "1",
      label: <p> Checklist - 1 </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "70%", margin: "auto", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th
                  colSpan={60}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  S.No.
                </th>
                <th colSpan={20}>Parameters</th>
                <th colSpan={20}>Actual Observation</th>
              </tr>
            </thead>
            <tbody>
              {/* Date Field */}
              <tr>
                <td
                  colSpan={60}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  01
                </td>
                <td colSpan={20}>Date</td>
                <td colSpan={20}>
                  <input
                    className="inp-new"
                    type="date"
                    max={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              {/* Supplier Name Field */}
              <tr>
                <td
                  colSpan={60}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  02
                </td>
                <td colSpan={20}>Supplier Name</td>
                <td colSpan={20}>
                  <input
                    className="inp-new"
                    type="text"
                    value={supplierName}
                    onChange={handleSupplierNameChange}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              {/* Invoice No. / Invoice Date Field */}
              <tr>
                <td
                  colSpan={60}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  03
                </td>
                <td colSpan={20}>Invoice No. / Invoice Date</td>
                <td colSpan={20}>
                  <input
                    className="inp-new"
                    type="text"
                    value={invoiceNo}
                    onChange={handleInvoiceNoChange}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              {/* Total Quantity Field */}
              <tr>
                <td
                  colSpan={60}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  04
                </td>
                <td colSpan={20}>Total Quantity</td>
                <td colSpan={20}>
                  <input
                    className="inp-new"
                    type="text"
                    value={totalQuantity}
                    onChange={handleQuantity}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              {/* No. of Bales / Cans / Each / Roll Dropdown + Text */}
              <tr>
                <td
                  colSpan={60}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  05
                </td>
                <td colSpan={20}>
                {/* No. of Bales / Cans / Each / Roll */}
                No. of 
                  <Select
                    value={noOfBalesOrCans}
                    onChange={(value) => setNoOfBalesOrCans(value)} // Update value on option select
                    style={{ width: "80%", textAlign: 'center' }}
                    disabled={!isEditable}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setNoOfBalesOrCans(e.target.value); // Update value on "Enter" key
                      }
                    }}
                    onSearch={(value) => setNoOfBalesOrCans(value)} // Capture custom text input
                    showSearch
                    filterOption={false} // Disable default filtering if needed
                    placeholder="Select or Type"
                    mode="combobox" // Allows free text input
                  >
                    {noOfBalesOrCansOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>


                </td>
                <td colSpan={20}>
                   <input
                    className="inp-new"
                    type="text"
                    value={noOfBalesOrCansCount}
                    onChange={handleNoOfBalesCount}
                    disabled={!isEditable}
                  />
                 </td>
              </tr>

              {/* Weight (In Kg) Field - Decimal with 2 Digits */}
              <tr>
                <td
                  colSpan={60}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  06
                </td>
                <td colSpan={20}>Weight (In Kg)</td>
                <td colSpan={20}>
                  <input
                    className="inp-new"
                    type="text"
                    value={weight}
                    onChange={handleWeight}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              {/* Description Field */}
              <tr>
                <td
                  colSpan={60}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  07
                </td>
                <td colSpan={20}>Description</td>
                <td colSpan={20}>
                  <input
                    className="inp-new"
                    type="text"
                    value={description}
                    onChange={handleDescrptionChange}
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
      label: <p> Checklist - 2 </p>,
      children: (
        <div>
          <table align="left" style={{ width: "70%", margin: "auto" }}>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Sr. No.
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Parameters
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Actual Observation
              </th>
            </tr>
            {/* Vehicle No. Field */}
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                08
              </td>
              <td colSpan={20}>Vehicle No.</td>
              <td colSpan={20}>
                <input
                  className="inp-new"
                  type="text"
                  value={vehicleNo}
                  onChange={handlevehicleNo}
                  disabled={!isEditable}
                />
              </td>
            </tr>

            {/* Organic Identification - OK / NOT OK */}
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                09
              </td>
              <td colSpan={20}>Organic Identification</td>
              <td colSpan={20}>
                <Radio.Group
                  className="inp-new"
                  value={organicIdentification}
                  onChange={(e) => setOrganicIdentification(e.target.value)}
                  disabled={!isEditable}
                >
                  <Radio value="OK">OK</Radio>
                  <Radio value="NOT OK">NOT OK</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>

            {/* Vehicle Condition - OK / NOT OK */}
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                10
              </td>
              <td colSpan={20}>Vehicle Condition</td>
              <td colSpan={20}>
                <Radio.Group
                  className="inp-new"
                  value={vehicleCondition}
                  onChange={(e) => setVehicleCondition(e.target.value)}
                  disabled={!isEditable}
                >
                  <Radio value="OK">OK</Radio>
                  <Radio value="NOT OK">NOT OK</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>

            {/* Packing Condition - OK / NOT OK */}
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                11
              </td>
              <td colSpan={20}>Packing Condition</td>
              <td colSpan={20}>
                <Radio.Group
                  className="inp-new"
                  value={packingCondition}
                  onChange={(e) => setPackingCondition(e.target.value)}
                  disabled={!isEditable}
                >
                  <Radio value="OK">OK</Radio>
                  <Radio value="NOT OK">NOT OK</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>

            {/* Wet Condition */}
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                12
              </td>
              <td colSpan={20}>Wet Condition</td>
              <td colSpan={20}>
                <Radio.Group
                  className="inp-new"
                  value={wetCondition}
                  onChange={(e) => setWetCondition(e.target.value)}
                  disabled={!isEditable}
                >
                  <Radio value="Yes">YES</Radio>
                  <Radio value="No" >NO</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>

            {/* Contamination, If Any - Yes / No */}
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                13
              </td>
              <td colSpan={20}>Contamination, If Any</td>
              <td colSpan={20}>
                <Radio.Group
                  className="inp-new"
                  value={contamination}
                  onChange={(e) => setContamination(e.target.value)}
                  disabled={!isEditable}
                >
                  <Radio value="Yes">YES</Radio>
                  <Radio value="No" >NO</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>

            {/* Remarks Field */}
            <tr>
              <td colSpan={60} style={{ height: "75px", textAlign: "center" }}>
                14
              </td>
              <td colSpan={20}>Remarks</td>
              <td colSpan={20}>
                <TextArea
                  value={remarks}
                  style={{
                    resize: "none",
                    border: "none",
                    height: "100%",
                    width: "100%",
                    fontSize: "12px",
                  }} // Adjust fontSize as needed
                  maxLength={100}
                  onChange={(e) => setRemarks(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: "REVIEWS",
      children: (
        <>
          <table align="left" style={{ width: 600, alignItems: "left" }}>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid black ",
                }}
              >
                <p>Checked by: </p>
                <b>Sign & Date</b>
              </td>
              <td
                style={
                  {
                    // borderRight: "none",
                  }
                }
              >
                {getImage2 && (
                  <img
                    className="signature"
                    src={getImage2}
                    alt="logo"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto",
                    }}
                  />
                )}
                <textarea
                  className="inp-new"
                  value={
                    operator ? `${operator}\n ${formatedDateOperator}` : ""
                  }
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid ",
                }}
              >
                <p>Verified by: </p>
                <b>Sign & Date</b>
              </td>
              <td>
                {(editResponse?.store_in_charge_status ===
                  "INCHARGE_APPROVED" ||
                  editResponse?.store_in_charge_status ===
                  "INCHARGE_REJECTED") &&
                  getImage && (
                    <img
                      className="signature"
                      src={getImage}
                      alt="logo"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                      }}
                    />
                  )}
                <p style={{ textAlign: "center" }}></p>
                {(editResponse?.store_in_charge_status ===
                  "INCHARGE_REJECTED" ||
                  editResponse?.store_in_charge_status ===
                  "INCHARGE_APPROVED") && (
                    <textarea
                      className="inp-new"
                      value={
                        incharge ? `${incharge}\n ${formattedInchargeDate}` : ""
                      }
                      readOnly
                      rows="2"
                      style={{ resize: "none", overflow: "hidden" }}
                    />
                  )}
              </td>
            </tr>
          </table>
        </>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="RECEPTION CHECK LIST"
        formatNo="PH- STR01/F-003"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "STORE_INCHARGE" ? (
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
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
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
                  display: canDisplayButton2(),
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
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
            disabled={!rejectRemarks}
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

      <div style={{ paddingBottom: "2em" }}></div>
      <Row>
        <Tabs
          items={items}
          //onChange={onChange}
          style={{
            width: "90%",
            position: "relative",
            left: "2%",
          }}
        />
      </Row>
    </div>
  );
};

export default Stores_f003;
