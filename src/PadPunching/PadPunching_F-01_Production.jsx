/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React from "react";
import BleachingHeader from "../Components/BleachingHeader";
import axios from "axios";
import {
  Button,
  message,
  Select,
  Tooltip,
  Tabs,
  Input,
  Modal,
  DatePicker,
} from "antd";
import { TbMenuDeep } from "react-icons/tb";
import { IoSave } from "react-icons/io5";
import { BiLock } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import PrecotSidebar from "../Components/PrecotSidebar";
import { useNavigate, useLocation } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { GrDocumentStore } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import API from "../baseUrl.json";

const PadPunching_f01 = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("date", state.date);
  const { TextArea } = Input;

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const role = localStorage.getItem("role");
  const [rejectReason, setRejectReason] = useState("");
  const [statusLoader, setStatusLoader] = useState(false);
  const [machineLov, setMachineLov] = useState([]);
  const [orderNoLov, setOrderNoLov] = useState([]);
  const [supervisorLov, setSupervisorLov] = useState([]);
  const [quanity, setquanity] = useState("");
  const initialized = useRef(false);

  const [saveData, setSaveData] = useState({
    formatName: "Production Log Format",
    formatNo: "F01",
    revisionNo: "Rev-2",
    refSopNo: "SOP-456",
    unit: "Unit H",
    date: state.date,
    shift: state.shift,
    ph_male_emp_req: "",
    ph_male_present: "",
    ph_female_emp_req: "",
    ph_female_present: "",
    cont_male_emp_req: "",
    con_male_present: "",
    con_female_emp_req: "",
    con_female_present: "",
    remarks: "",
    details: [],
  });
  const [formData, setFormData] = useState([
    {
      machine_name: "",
      running_order_no: "",
      next_order_no: "",
      man_power_allocation: "",
      running_product_name: "",
      next_product_name: "",
      running_po_number: "",
      next_po_number: "",
      running_opening_qty: "",
      next_opening_qty: "",
      running_packed_qty: "",
      next_packed_qty: "",
      running_balancr_qty: "",
      next_balance_qty: "",
      running_status: "",
      next_status: "",
    },
  ]);
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    takeover_supervisor_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });

  const handleEmpRequiredTotal = () => {
    const phMaleEmpReq = Number(saveData.ph_male_emp_req) || 0;
    const phFemaleEmpReq = Number(saveData.ph_female_emp_req) || 0;
    const contMaleEmpReq = Number(saveData.cont_male_emp_req) || 0;
    const conFemaleEmpReq = Number(saveData.con_female_emp_req) || 0;

    const result =
      phMaleEmpReq + phFemaleEmpReq + contMaleEmpReq + conFemaleEmpReq;
    return result;
  };

  const handlePresentTotal = () => {
    const phMalePresent = Number(saveData.ph_male_present) || 0;
    const phFemalePresent = Number(saveData.ph_female_present) || 0;
    const conMalePresent = Number(saveData.con_male_present) || 0;
    const conFemalePresent = Number(saveData.con_female_present) || 0;

    const result =
      phMalePresent + phFemalePresent + conMalePresent + conFemalePresent;
    return result;
  };

  const formatDateOnly = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatPrintDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleKeyDown = (e) => {
    const { value } = e.target;
    if (
      !/^[0-9]$/.test(e.key) &&
      e.key !== "N" &&
      e.key !== "A" &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
    if (/^[0-9]$/.test(e.key) && value.length >= 3) {
      e.preventDefault();
    }
  };

  const canDisplayaddRowButton = () => {
    const role = localStorage.getItem("role");
    if (role !== "ROLE_SUPERVISOR") {
      return "none";
    }

    if (role === "ROLE_SUPERVISOR") {
      if (
        saveData &&
        saveData.hasOwnProperty("supervisor_status") &&
        saveData["supervisor_status"] === "SUPERVISOR_APPROVED"
      ) {
        if (saveData["hod_status"] === "HOD_REJECTED") {
          return "block";
        }

        return "none";
      }
    }

    return "block";
  };

  const canDisplayButtons = () => {
    // ROLE_SUPERVISOR
    const role = localStorage.getItem("role");
    if (role === "ROLE_SUPERVISOR") {
      if (
        saveData &&
        saveData.hasOwnProperty("supervisor_status") &&
        saveData["supervisor_status"] === "SUPERVISOR_APPROVED"
      ) {
        if (saveData["hod_status"] === "HOD_REJECTED") {
          return "block";
        }

        return "none";
      }
    }
    if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
      if (saveData && saveData["hod_status"] === "HOD_REJECTED") {
        return "none";
      }
    }
    if (saveData && saveData["hod_status"] === "HOD_APPROVED") {
      return "none";
    }

    return "block";
  };

  const canSaveDisplayButtons = () => {
    // ROLE_SUPERVISOR
    const role = localStorage.getItem("role");
    if (role === "ROLE_SUPERVISOR") {
      if (
        saveData &&
        saveData.hasOwnProperty("supervisor_status") &&
        saveData["supervisor_status"] === "SUPERVISOR_APPROVED"
      ) {
        return "none";
      }
    } else if (role === "ROLE_HR") {
      if (
        saveData &&
        saveData.hasOwnProperty("hr_status") &&
        saveData["hr_status"] === "HR_APPROVED"
      ) {
        return "none";
      }
    } else if (role === "ROLE_HOD") {
      if (
        saveData &&
        saveData.hasOwnProperty("hod_status") &&
        saveData["hod_status"] === "HOD_APPROVED"
      ) {
        return "none";
      }
    }

    return "block";
  };

  const addRow = () => {
    setFormData([
      ...formData,
      {
        machine_name: "",
        running_order_no: "",
        next_order_no: "",
        man_power_allocation: "",
        running_product_name: "",
        next_product_name: "",
        running_po_number: "",
        next_po_number: "",
        running_opening_qty: "",
        next_opening_qty: "",
        running_packed_qty: "",
        next_packed_qty: "",
        running_balancr_qty: "",
        next_balance_qty: "",
        running_status: "",
        next_status: "",
      },
    ]);
  };

  const removeLastRow = () => {
    if (formData.length > 1) {
      setFormData(formData.slice(0, -1));
    }
  };

  const calculateFields = (data) => {
    return data.map((row, index, array) => {
      // Get the previous row
      const previousRow = array[index - 1];

      // Calculate 'running_opening_qty' based on the previous row's balance or default value
      const running_opening_qty = previousRow
        ? parseFloat(previousRow.running_balancr_qty || 0)
        : 0; // Default to 0 for the first row

      // Calculate 'running_balancr_qty' based on opening and packed quantities
      const running_balancr_qty =
        parseFloat(running_opening_qty || 0) -
        parseFloat(row.running_packed_qty || 0);

      return {
        ...row, // Keep existing fields intact
        running_opening_qty, // Update calculated field
        running_balancr_qty, // Update calculated field
      };
    });
  };

  const handleInputChange = (index, field, value) => {
    const newformData = [...formData];
    newformData[index][field] = value;
    setFormData(newformData);
  };

  const handleSelectChange = (index, field, value) => {
    const newformData = [...formData];
    newformData[index][field] = value;
    setFormData(newformData);
  };

  const calculateRunningOpenQty = (productionDetails, value) => {
    console.log("value in calculation", value);
    console.log("formData", formData);
    const reversedFormData = formData.slice().reverse();

    const index = reversedFormData.findIndex(
      (data) => data.running_order_no === value
    );
    console.log("reversed data index", index);
    let elementBeforeLast;

    elementBeforeLast = reversedFormData[index + 1];

    console.log(elementBeforeLast);

    console.log("existing prod details", elementBeforeLast);
    if (elementBeforeLast) {
      console.log("entering in existing prod details");
      return elementBeforeLast.running_balancr_qty;
    } else {
      console.log("entering in else");
      return productionDetails.opening_qty;
    }
  };

  const handleOrderNoSelectChange = (index, field, value) => {
    console.log("Selected Order No:", value, index, field);
    if (field === "running_order_no") {
      // Update the specific formData entry immutably
      const updatedFormData = [...formData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        running_order_no: value, // Update the selected value for the order number
      };

      // Ensure machine name is selected before updating state
      if (!updatedFormData[index].machine_name) {
        message.warning("Please select machine name first");
        return;
      }

      // Update formData state
      setFormData(updatedFormData);

      // Validate parameters
      if (
        !state.date ||
        !state.shift ||
        !updatedFormData[index].machine_name ||
        !value
      ) {
        console.error("Invalid parameters:", {
          date: state.date,
          shift: state.shift,
          machine: updatedFormData[index].machine_name,
          orderNo: value,
        });
        message.error("Missing required parameters for API call.");
        return;
      }

      // Prepare API parameters
      const params = {
        date: state.date,
        shift: state.shift,
        machine: updatedFormData[index].machine_name,
        orderNo: value,
      };

      const params2 = {
        packDate: state.date,
        orderNo: value,
      };

      // Authentication headers
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // API Call 2: Fetch Opening Quantity
      const apiEndpoint2 = `${ API.prodUrl}/Precot/api/padpunching/opening-qty`;

      axios
        .get(apiEndpoint2, { params: params2, headers })
        .then((response) => {
          console.log("Opening Quantity Response:", response.data);

          const Opening_Qty = response.data.Opening_Qty;
          setquanity(Opening_Qty); // Store Opening Quantity in state

          // Fetch production details after opening quantity
          fetchProductionDetails(index, field, value, Opening_Qty);
        })
        .catch((error) => {
          console.error(
            "Error fetching opening quantity:",
            error.response ? error.response.data : error.message
          );
          message.error("Failed to fetch opening quantity. Please try again.");
        });
    } else {
      // Update the specific formData entry immutably
      const updatedFormData = [...formData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        next_order_no: value, // Update the selected value for the order number
      };

      // Ensure machine name is selected before updating state
      if (!updatedFormData[index].machine_name) {
        message.warning("Please select machine name first");
        return;
      }

      // Update formData state
      setFormData(updatedFormData);

      // Validate parameters
      if (
        !state.date ||
        !state.shift ||
        !updatedFormData[index].machine_name ||
        !value
      ) {
        console.error("Invalid parameters:", {
          date: state.date,
          shift: state.shift,
          machine: updatedFormData[index].machine_name,
          orderNo: value,
        });
        message.error("Missing required parameters for API call.");
        return;
      }

      // Prepare API parameters
      const params = {
        date: state.date,
        shift: state.shift,
        machine: updatedFormData[index].machine_name,
        orderNo: value,
      };

      const params2 = {
        packDate: state.date,
        orderNo: value,
      };

      // Authentication headers
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // API Call 2: Fetch Opening Quantity
      const apiEndpoint2 = `${ API.prodUrl}/Precot/api/padpunching/opening-qty`;

      axios
        .get(apiEndpoint2, { params: params2, headers })
        .then((response) => {
          console.log("Opening Quantity Response:", response.data);

          const Opening_Qty = response.data.Opening_Qty;
          setquanity(Opening_Qty); // Store Opening Quantity in state

          // Fetch production details after opening quantity
          fetchProductionDetails(index, field, value, Opening_Qty);
        })
        .catch((error) => {
          console.error(
            "Error fetching opening quantity:",
            error.response ? error.response.data : error.message
          );
          message.error("Failed to fetch opening quantity. Please try again.");
        });
    }
  };

  // Function to fetch production details with Opening Quantity passed
  const fetchProductionDetails = (index, field, value, quanity) => {
    const apiEndpoint = `${ API.prodUrl}/Precot/api/padpunching/getProductionDetails`;

    // Parameters for API Call 1 (production details)
    const params = {
      date: state.date,
      shift: state.shift,
      machine: formData[index].machine_name,
      orderNo: value,
      quanity, // Include quanity here
    };

    // Authentication headers
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // API Call 1: Fetch Production Details
    axios
      .get(apiEndpoint, { params, headers })
      .then((response) => {
        const productionDetails = response.data;
        console.log("Production Details:", productionDetails);

        // Clone formData for updating
        const updatedFormData = [...formData];

        // Check if the orderNo already exists in formData
        const previousEntries = updatedFormData
          .slice(0, index) // Only consider rows before the current one
          .filter(
            (item) =>
              item.value === formData[index].value &&
              item.running_order_no === value
          );

        // Get the most recent previous entry (if any)
        const lastEntry = previousEntries[previousEntries.length - 1];
        // if (existingEntry) {

        //     // If the order number exists, set the previous balance qty to the present opening qty
        //     updatedFormData[index] = {
        //         ...updatedFormData[index],
        //         ...(field === "running_order_no"
        //             ? {
        //                   running_order_no: value,
        //                   running_opening_qty: existingEntry.running_balancr_qty, // Use previous balance qty
        //                   running_packed_qty: existingEntry.running_packed_qty || 0,
        //                   running_product_name: existingEntry.running_product_name || "",
        //                   running_po_number: existingEntry.running_po_number || "",
        //                   running_balancr_qty: ( existingEntry.running_balancr_qty ?? 0) - (existingEntry.running_packed_qty ?? 0), // Balance remains the same
        //               }
        //             : {
        //                   next_order_no: value,
        //                   next_opening_qty: existingEntry.running_balancr_qty,
        //                   next_packed_qty: existingEntry.running_packed_qty || 0,
        //                   next_product_name: existingEntry.running_product_name || "",
        //                   next_po_number: existingEntry.running_po_number || "",
        //                   next_balance_qty: existingEntry.running_balancr_qty,
        //               }),
        //     };
        // }
        if (lastEntry) {
          // If a previous entry exists, set the previous balance qty as the current opening qty
          updatedFormData[index] = {
            ...updatedFormData[index],
            ...(field === "running_order_no"
              ? {
                  running_order_no: value,
                  running_opening_qty: lastEntry.running_balancr_qty, // Use previous balance qty
                  running_packed_qty: lastEntry.running_packed_qty || 0, // Reset packed qty for new entry
                  running_product_name: lastEntry.running_product_name || "",
                  running_po_number: lastEntry.running_po_number || "",
                  running_balancr_qty:
                    (lastEntry.running_balancr_qty ?? 0) -
                    (lastEntry.running_packed_qty ?? 0), // Balance remains unchanged
                }
              : {
                  next_order_no: value,
                  next_opening_qty: lastEntry.running_balancr_qty,
                  running_packed_qty: lastEntry.running_packed_qty || 0,
                  next_product_name: lastEntry.running_product_name || "",
                  next_po_number: lastEntry.running_po_number || "",
                  next_balance_qty: lastEntry.running_balancr_qty,
                }),
          };
        } else if (productionDetails.length > 0) {
          const details = productionDetails[0];
          updatedFormData[index] = {
            ...updatedFormData[index],
            ...(field === "running_order_no"
              ? {
                  running_order_no: value,
                  running_opening_qty: quanity, // Use the Opening Quantity fetched earlier
                  running_packed_qty: details.packed_qty || 0,
                  running_product_name: details.product_name || details.MCN,
                  running_po_number: details.poNo || details.PONo,
                  running_balancr_qty:
                    (quanity ?? 0) - (details.packed_qty ?? 0),
                }
              : {
                  next_order_no: value,
                  next_opening_qty: quanity,
                  next_packed_qty: details.packed_qty || 0,
                  next_product_name: details.product_name || details.MCN,
                  next_po_number: details.poNo || details.PONo,
                  next_balance_qty: (quanity ?? 0) - (details.packed_qty ?? 0),
                }),
          };
        }

        setFormData(updatedFormData);
      })
      .catch((error) => {
        console.error(
          "Error fetching production details:",
          error.response ? error.response.data : error.message
        );
        message.error("Failed to fetch production details. Please try again.");
      });
  };

  const canDisable = () => {
    // if supervisor need to disable radio buttons

    const role = localStorage.getItem("role");
    if (role !== "ROLE_SUPERVISOR") {
      return true;
    }

    if (
      saveData &&
      saveData.hasOwnProperty("supervisor_status") &&
      saveData["supervisor_status"] === "SUPERVISOR_APPROVED"
    ) {
      // if supervisor approved and hr rejected need not to disable radio buttons
      if (saveData["hod_status"] === "HOD_REJECTED") {
        return false;
      }
      return true;
    }

    return false;
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleBack = () => {
    navigate("/Precot/PadPunching/F-01/Summary");
  };

  const navigateBack = (apiResponse) => {
    if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
      if (
        !(
          apiResponse["supervisor_status"] === "SUPERVISOR_APPROVED" &&
          apiResponse.hod_status !== "HOD_REJECTED"
        )
      ) {
        message.warning("Supervisor not Approved Yet");
        navigate("/Precot/PadPunching/F-01/Summary");
      }
    }
  };

  const handleSave = () => {
    setLoading(true);
    console.log("formData in console", formData);

    // let updatedSaveData;
    // setSaveData(prevSaveData => {
    //     updatedSaveData = {
    //         ...prevSaveData,
    //         details: formData
    //     }
    // };

    const updatedSaveData = {
      ...saveData, // assuming saveData is in the current state
      details: formData,
    };

    // Log the updated saveData
    console.log("Updated saveData:", updatedSaveData);

    // Get the token from local storage
    const token = localStorage.getItem("token");

    // Make the API call
    axios
      .post(
        `${ API.prodUrl}/Precot/api/Punching/Service/saveProdDetailsF01`,
        updatedSaveData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        setSaveData(response.data);
        setFormData(response.data.details);
        message.success("saved successfully!");
        navigate("/Precot/PadPunching/F-01/Summary");
        // Handle successful response here
      })
      .catch((error) => {
        console.error("API error:", error);
        // Handle error here
      })
      .finally(() => {
        setLoading(false);
      });

    // return updatedSaveData;
  };

  const handleSubmit = () => {
    setLoading(true);
    let updatedSaveData = null;
    console.log("save data before submit", saveData);

    updatedSaveData = {
      ...saveData,
      ph_male_emp_req: saveData.ph_male_emp_req
        ? saveData.ph_male_emp_req
        : "NA",
      ph_female_emp_req: saveData.ph_female_emp_req
        ? saveData.ph_female_emp_req
        : "NA",
      cont_male_emp_req: saveData.cont_male_emp_req
        ? saveData.cont_male_emp_req
        : "NA",
      con_female_emp_req: saveData.con_female_emp_req
        ? saveData.con_female_emp_req
        : "NA",
      ph_male_present: saveData.ph_male_present
        ? saveData.ph_male_present
        : "NA",
      ph_female_present: saveData.ph_female_present
        ? saveData.ph_female_present
        : "NA",
      con_male_present: saveData.con_male_present
        ? saveData.con_male_present
        : "NA",
      con_female_present: saveData.con_female_present
        ? saveData.con_female_present
        : "NA",
      remarks: saveData.remarks ? saveData.remarks : "NA",
      reason: null,
      details: formData.map((item) => ({
        ...item,
        man_power_allocation: item.man_power_allocation
          ? item.man_power_allocation
          : "NA",
      })),
    };

    console.log("updated save data before submit", updatedSaveData);
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // Make the API call
    axios
      .post(
        `${ API.prodUrl}/Precot/api/Punching/Service/submitProdDetailsF01`,
        updatedSaveData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        message.success("Submitted succesfully");

        // Handle successful response here
      })
      .catch((error) => {
        console.error("API error:", error);
        // Handle error here
      })
      .finally(() => {
        navigate("/Precot/PadPunching/F-01/Summary");
        setLoading(false);
      });
  };

  const formatValue = (value) => {
    if (!isNaN(value) && value % 1 !== 0) {
      return Math.round(value);
    }
    return value;
  };

  const handleApprove = () => {
    // Assuming saveData is available in the scope
    const { prod_id, formatNo } = saveData;

    // Create the payload
    const payload = {
      id: prod_id, // Replace with the actual ID from saveData
      formatNo: formatNo, // Replace with the actual formatNo from saveData
      status: "Approve",
    };

    // Get the token from local storage
    const token = localStorage.getItem("token");

    // Make the API call
    axios
      .put(
        `${ API.prodUrl}/Precot/api/Punching/Service/approveProdDetailsF01`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        message.success("Approved Successfully!");
        navigate("/Precot/PadPunching/F-01/Summary");
      })
      .catch((error) => {
        console.error("API error:", error);
        // Handle error here
      });
  };

  const handleReject = () => {
    const { prod_id, formatNo } = saveData;

    // Create the payload
    const payload = {
      id: prod_id, // Replace with the actual ID from saveData
      formatNo: formatNo, // Replace with the actual formatNo from saveData
      status: "Reject",
      remarks: rejectReason,
    };

    // Get the token from local storage
    const token = localStorage.getItem("token");

    // Make the API call
    axios
      .put(
        `${ API.prodUrl}/Precot/api/Punching/Service/approveProdDetailsF01`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        message.success("Rejected Successfully!");
        navigate("/Precot/PadPunching/F-01/Summary");
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };
  const handleCancel = () => {
    setRejectModal(false);
  };

  const items = [
    {
      key: "1",
      label: <p>MACHINE AND PRODUCTION DETAILS</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table>
            <thead>
              <tr style={{ padding: "4px" }}>
                <th colSpan={6}>Machine and Product Details: </th>
                <th colSpan={2}>Date: {formatDateOnly(state.date)}</th>
                <th colSpan={2}>Shift: {state.shift}</th>
              </tr>
              <tr>
                <th>Machine Name</th>
                <th>Order No/Bmr No</th>
                <th>Man Power Allocation</th>
                <th colSpan={2}>Product Name</th>
                <th>PO Number</th>
                <th>Opening Qty in Nos (Box)</th>
                <th>Packed Qty in Nos (Box)</th>
                <th>Balance Qty in Nos (Box)</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td style={{ width: "9rem" }} rowspan={2}>
                      <Select
                        defaultValue="select machine name"
                        style={{ width: "100%", textAlign: "center" }}
                        dropdownStyle={{ textAlign: "center" }}
                        value={row.machine_name}
                        disabled={canDisable()}
                        onChange={(value) =>
                          handleSelectChange(index, "machine_name", value)
                        }
                      >
                        <Select.Option value="select machine name" disabled>
                          machine name
                        </Select.Option>
                        {machineLov.map((machine, index) => (
                          <Select.Option key={index} value={machine.MCN}>
                            {machine.MCN}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    <td style={{ width: "9rem" }}>
                      <Select
                        defaultValue="select order no"
                        style={{ width: "100%", textAlign: "center" }}
                        dropdownStyle={{ textAlign: "center" }}
                        disabled={canDisable()}
                        onChange={(value) =>
                          handleOrderNoSelectChange(
                            index,
                            "running_order_no",
                            value
                          )
                        }
                        showSearch
                        value={row.running_order_no}
                      >
                        <Select.Option value="select order no" disabled>
                          select order no
                        </Select.Option>
                        {orderNoLov.map((order, index) => (
                          <Select.Option key={index} value={order.value}>
                            {order.value}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    <td style={{ width: "3rem" }} rowspan={2}>
                      <Input
                        placeholder="man power"
                        value={row.man_power_allocation}
                        min={0}
                        max={999}
                        onKeyDown={handleKeyDown}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "man_power_allocation",
                            e.target.value
                          )
                        }
                        disabled={canDisable()}
                      ></Input>
                    </td>
                    <td>
                      <p style={{ padding: "1px" }}>Running</p>
                    </td>
                    <td style={{ width: "10rem", textAlign: "center" }}>
                      {/* <Input placeholder="product Name"
                                                value={row.running_product_name}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'running_product_name', e.target.value)}
                                            /> */}
                      {row.running_product_name}
                    </td>
                    <td style={{ width: "3rem", textAlign: "center" }}>
                      {/* <Input
                                                placeholder="PO Number"
                                                value={row.running_po_number}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'running_po_number', e.target.value)}

                                            /> */}
                      {formatValue(row.running_po_number)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {/* <Input
                                                placeholder="Opening Qty"
                                                value={row.running_opening_qty}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'running_opening_qty', e.target.value)}

                                            /> */}
                      {formatValue(row.running_opening_qty)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {/* <Input
                                                placeholder="packed Qty"
                                                value={row.running_packed_qty}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'running_packed_qty', e.target.value)}

                                            /> */}
                      {formatValue(row.running_packed_qty)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {/* <Input
                                                placeholder="Balance Qty"
                                                value={row.running_balancr_qty}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'running_balancr_qty', e.target.value)}

                                            /> */}
                      {formatValue(row.running_balancr_qty)}
                    </td>
                    <td style={{ width: "9rem" }}>
                      <Select
                        defaultValue="status"
                        style={{ width: "100%", textAlign: "center" }}
                        dropdownStyle={{ textAlign: "center" }}
                        value={row.running_status}
                        disabled={canDisable()}
                        onChange={(value) =>
                          handleSelectChange(index, "running_status", value)
                        }
                      >
                        <Select.Option value="status" disabled>
                          status
                        </Select.Option>
                        <Select.Option value="Completed">
                          Completed
                        </Select.Option>
                        <Select.Option value="Not Completed">
                          Not Completed
                        </Select.Option>
                        <Select.Option value="NA">NA</Select.Option>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "9rem" }}>
                      <Select
                        defaultValue="select order no"
                        style={{ width: "100%", textAlign: "center" }}
                        dropdownStyle={{ textAlign: "center" }}
                        value={row.next_order_no}
                        disabled={canDisable()}
                        showSearch
                        onChange={(value) =>
                          handleOrderNoSelectChange(
                            index,
                            "next_order_no",
                            value
                          )
                        }
                      >
                        <Select.Option value="select order no" disabled>
                          select order no
                        </Select.Option>
                        {orderNoLov.map((order, index) => (
                          <Select.Option key={index} value={order.value}>
                            {order.value}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    <td>
                      <p style={{ padding: "1px" }}>Next</p>
                    </td>
                    <td style={{ width: "10rem", textAlign: "center" }}>
                      {/* <Input placeholder="Product Name"
                                                value={row.next_product_name}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'next_product_name', e.target.value)}
                                            /> */}
                      {row.next_product_name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {/* <Input placeholder="PO Number"
                                                value={row.next_po_number}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'next_po_number', e.target.value)}
                                            /> */}
                      {formatValue(row.next_po_number)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {/* <Input placeholder="Opening Qty"
                                                value={row.next_opening_qty}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'next_opening_qty', e.target.value)}

                                            ></Input> */}
                      {formatValue(row.next_opening_qty)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {/* <Input placeholder="Packed Qty"
                                                value={row.next_packed_qty}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'next_packed_qty', e.target.value)}

                                            ></Input> */}
                      {formatValue(row.next_packed_qty)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {/* <Input placeholder="Balance Qty"
                                                value={row.next_balance_qty}
                                                disabled={canDisable()}
                                                onChange={(e) => handleInputChange(index, 'next_balance_qty', e.target.value)}

                                            ></Input> */}
                      {formatValue(row.next_balance_qty)}
                    </td>
                    <td style={{ width: "9rem" }}>
                      <Select
                        defaultValue="status"
                        style={{ width: "100%", textAlign: "center" }}
                        dropdownStyle={{ textAlign: "center" }}
                        value={row.next_status}
                        disabled={canDisable()}
                        onChange={(value) =>
                          handleSelectChange(index, "next_status", value)
                        }
                      >
                        <Select.Option value="status" disabled>
                          status
                        </Select.Option>
                        <Select.Option value="Completed">
                          Completed
                        </Select.Option>
                        <Select.Option value="Not Completed">
                          Not Completed
                        </Select.Option>
                        <Select.Option value="NA">NA</Select.Option>
                      </Select>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex" }}>
            <Button
              onClick={addRow}
              style={{ display: canDisplayaddRowButton() }}
            >
              Add Row
            </Button>
            <Button
              onClick={removeLastRow}
              disabled={formData.length <= 1}
              style={{ display: canDisplayaddRowButton() }}
            >
              Remove Row
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>MAN POWER ALLOCATION DETAILS</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "100%", margin: "auto" }}>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Category</th>
                <th style={{ width: "10%" }}>Employee Required</th>
                <th style={{ width: "10%" }}>Present</th>
                <th style={{ width: "60%" }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "5px" }}>PH - Male</td>
                <td>
                  <Input
                    type="text"
                    value={saveData ? saveData["ph_male_emp_req"] : ""}
                    min={0}
                    max={999}
                    onKeyDown={handleKeyDown}
                    disabled={canDisable()}
                    onChange={(e) =>
                      setSaveData((prevState) => ({
                        ...prevState,
                        ph_male_emp_req: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={saveData ? saveData.ph_male_present : ""}
                    min={0}
                    max={999}
                    onKeyDown={handleKeyDown}
                    disabled={canDisable()}
                    onChange={(e) =>
                      setSaveData((prevState) => ({
                        ...prevState,
                        ph_male_present: e.target.value,
                      }))
                    }
                  />
                </td>
                <td rowSpan={5} style={{ verticalAlign: "top" }}>
                  <textarea
                    style={{
                      width: "100%",
                      height: "9rem",
                      outline: "none",
                      border: "none",
                    }}
                    // min={0} max={999}
                    // onKeyDown={handleKeyDown}
                    value={saveData ? saveData.remarks : ""}
                    disabled={canDisable()}
                    onChange={(e) =>
                      setSaveData((prevState) => ({
                        ...prevState,
                        remarks: e.target.value,
                      }))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px" }}>PH - Female</td>
                <td>
                  <Input
                    type="text"
                    value={saveData ? saveData.ph_female_emp_req : ""}
                    min={0}
                    max={999}
                    onKeyDown={handleKeyDown}
                    disabled={canDisable()}
                    onChange={(e) =>
                      setSaveData((prevState) => ({
                        ...prevState,
                        ph_female_emp_req: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={saveData ? saveData.ph_female_present : ""}
                    min={0}
                    max={999}
                    onKeyDown={handleKeyDown}
                    disabled={canDisable()}
                    onChange={(e) =>
                      setSaveData((prevState) => ({
                        ...prevState,
                        ph_female_present: e.target.value,
                      }))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px" }}>Contract - Male</td>
                <td>
                  <Input
                    type="text"
                    value={saveData ? saveData.cont_male_emp_req : ""}
                    min={0}
                    max={999}
                    onKeyDown={handleKeyDown}
                    disabled={canDisable()}
                    onChange={(e) =>
                      setSaveData((prevState) => ({
                        ...prevState,
                        cont_male_emp_req: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={saveData ? saveData.con_male_present : ""}
                    min={0}
                    max={999}
                    onKeyDown={handleKeyDown}
                    disabled={canDisable()}
                    onChange={(e) =>
                      setSaveData((prevState) => ({
                        ...prevState,
                        con_male_present: e.target.value,
                      }))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px" }}>Contract - Female</td>
                <td>
                  <Input
                    type="text"
                    value={saveData ? saveData.con_female_emp_req : ""}
                    min={0}
                    max={999}
                    onKeyDown={handleKeyDown}
                    disabled={canDisable()}
                    onChange={(e) =>
                      setSaveData((prevState) => ({
                        ...prevState,
                        con_female_emp_req: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={saveData ? saveData.con_female_present : ""}
                    min={0}
                    max={999}
                    onKeyDown={handleKeyDown}
                    disabled={canDisable()}
                    onChange={(e) =>
                      setSaveData((prevState) => ({
                        ...prevState,
                        con_female_present: e.target.value,
                      }))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px" }}>Total</td>
                <td style={{ textAlign: "center" }}>
                  {saveData && handleEmpRequiredTotal()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {saveData && handlePresentTotal()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: "REVIEW",
      children: (
        <div>
          <table className="f18table" style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td style={{ height: "3rem", textAlign: "center" }}>
                Production Supervisor Sign & Date
                <br></br>
                <br></br>
                {eSign.supervisor_sign ? (
                  <img
                    src={eSign.supervisor_sign}
                    alt="HOD eSign"
                    style={{
                      width: "100px",
                      height: "50px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br />
                <br />
                <b>
                  {saveData && saveData.supervisor_sign}
                  <br></br>
                  {saveData && formatPrintDate(saveData.supervisor_submit_on)}
                </b>
              </td>

              <td style={{ height: "3rem", textAlign: "center" }}>
                Takeover Production Supervisor Sign & Date
                <br></br>
                <br></br>
                <Select
                  style={{ width: "8rem" }}
                  options={supervisorLov}
                  disabled={canDisable()}
                  value={saveData && saveData.takeover_supervisor_sign}
                  onChange={(value) =>
                    setSaveData((prevState) => ({
                      ...prevState,
                      takeover_supervisor_sign: value,
                    }))
                  }
                ></Select>
                {/* takeOverSupervisorDate */}
                <Input
                  type="dateTime-local"
                  style={{ width: "12rem" }}
                  value={saveData && saveData.takeOverSupervisorDate}
                  disabled={canDisable()}
                  onChange={(e) =>
                    setSaveData((prevState) => ({
                      ...prevState,
                      takeOverSupervisorDate: e.target.value,
                    }))
                  }
                />
                <br></br>
                <br></br>
                {eSign.takeover_supervisor_sign ? (
                  <img
                    src={eSign.takeover_supervisor_sign}
                    alt="HOD eSign"
                    style={{
                      width: "100px",
                      height: "50px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br />
                <br />
                <b>
                  {saveData && saveData.takeover_supervisor_sign}
                  <br></br>
                  {saveData && formatPrintDate(saveData.takeOverSupervisorDate)}
                </b>
              </td>

              <td style={{ height: "3rem", textAlign: "center" }}>
                HOD / Designee Sign & Date
                <br></br>
                <br></br>
                {eSign.hod_sign ? (
                  <img
                    src={eSign.hod_sign}
                    alt="HOD eSign"
                    style={{
                      width: "100px",
                      height: "50px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br />
                <br />
                <b>
                  {saveData && saveData.hod_submit_by}
                  <br></br>
                  {saveData && formatPrintDate(saveData.hod_submit_on)}
                </b>
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "takeover_supervisor_sign",
      "supervisor_sign",
      "hod_sign",
    ];
    signatureKeys.forEach((key) => {
      console.log("new Data", saveData);
      if (saveData) {
        const username = saveData[key];
        console.log("usernameparams", username);

        if (username) {
          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
              setESign((prevSign) => ({
                ...prevSign,
                [key]: url,
              }));
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
        }
      }
    });
  }, [
    token,
    saveData && saveData.supervisor_sign,
    saveData && saveData.takeover_supervisor_sign,
    saveData && saveData.hod_sign,
  ]);

  const initialized3 = useRef(false);

  useEffect(() => {
    if (!initialized3.current) {
      initialized3.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/Users/Service/getRoleBaseDepartmentNames?department=PAD_PUNCHING`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data
              .filter((option) => option.role == "ROLE_SUPERVISOR")
              .map((option) => ({
                value: option.username,
                label: option.username,
              }));
            setSupervisorLov(a);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });

  useEffect(() => {
    if (!initialized.current) {
      const token = localStorage.getItem("token");

      // Configuring the request headers
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Making the first API call to get machine LOV
      axios
        .get(`${ API.prodUrl}/Precot/api/padpunching/MachineLov`, config)
        .then((response) => {
          setMachineLov(response.data); // Set machine LOV state
          // Making the second API call to get order number LOV
          return axios.get(
            `${ API.prodUrl}/Precot/api/padpunching/orderNoList`,
            config
          );
        })
        .then((response) => {
          setOrderNoLov(response.data); // Set order number LOV state
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  useEffect(() => {
    // Get the token from local storage
    if (!initialized.current) {
      initialized.current = true;
      const token = localStorage.getItem("token");

      // Make the API call
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Punching/Service/getproductiondetailsF01?date=${state.date}&shift=${state.shift}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setSaveData(response.data);
          setFormData(response.data.details);
          navigateBack(response.data);
        })
        .catch((error) => {
          console.error("API error:", error);
          // Handle error here
        });
    }
  }, []);

  return (
    <>
      <BleachingHeader
        formName={"Production Details - Log Book "}
        formatNo={"PH-QAD01-F-054"}
        unit={"UNIT H"}
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
              display: canSaveDisplayButtons(),
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_SUPERVISOR" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={role == "ROLE_SUPERVISOR" ? handleSave : handleApprove}
            loading={loading}
          >
            {role == "ROLE_SUPERVISOR" ? "Save" : "Approve"}
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: canDisplayButtons(),
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_SUPERVISOR" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_SUPERVISOR" ? handleSubmit : rejectFlow}
            loading={loading}
          >
            {role == "ROLE_SUPERVISOR" ? " Submit" : "   Reject"}
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Modal
        title="Reason For Reject"
        open={rejectModal}
        onCancel={handleCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleReject}
            loading={statusLoader}
          >
            Reject
          </Button>,
        ]}
      >
        <label>Reason : </label>
        <br></br>
        <br></br>
        <TextArea
          type="textArea"
          style={{ height: "100px" }}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        ></TextArea>
      </Modal>

      <div>
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
    </>
  );
};

export default PadPunching_f01;
