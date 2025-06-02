import React from "react";
import { useState, useEffect, useRef } from "react";
import { Button, Input, Tabs, Select, Tooltip, message, Modal } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock, FaTrash } from "react-icons/fa6";
import { BiFontSize, BiLock } from "react-icons/bi";
import { IoChevronBackSharp, IoCreate, IoSave } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import approveIcon from "../Assests/outlined-approve.svg";
import PrecotSidebar from "../Components/PrecotSidebar";
import rejectIcon from "../Assests/outlined-reject.svg";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
import moment from "moment";

const QualityControlF010 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedYear, selectedMonth, selectedEqNo } = location.state || {};
  const roleauth = localStorage.getItem("role");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [mainID, setMainID] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const initialized = useRef(false);

  const [table1Data, setTable1Data] = useState({
    eqIdNo: selectedEqNo,
    calibrationDate: "",
    bcflowOffset: "",
    bcPLGain: "",
    bcPressureOffset: "",
    bcPHGain: "",
  });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  // State for Table 2 (array of rows)
  const [table2Rows, setTable2Rows] = useState([
    {
      id: "",
      referenceCottonMicronaire: "",
      observed: "",
      ratio: "",
      plGain: "",
      newPLGain: "",
    },
  ]);

  // State for Table 3 (single row)
  const [table3Data, setTable3Data] = useState({
    acFlowOffset: "",
    acPLGain: "",
    acPressureOffset: "",
    acPHGain: "",
    calibrationNextDueDate: "",
    remarks: "",
  });

  // Add row for Table 2
  const addRow = () => {
    setTable2Rows([
      ...table2Rows,
      {
        referenceCottonMicronaire: "",
        observed: "",
        ratio: "",
        plGain: "",
        newPLGain: "",
      },
    ]);
  };

  const deleteRow = (index) => {
    if (table2Rows.length === 1) return;
    const updatedRows = table2Rows.filter((row, i) => i !== index);
    setTable2Rows(updatedRows);
  };

  // Handle input change for Table 1
  const handleTable1Change = (fieldName, value) => {
    if (fieldName === "calibrationDate") {
      const selectedDate = new Date(value);
      const selectedMonthIndex = new Date(
        `${selectedMonth} 1, ${parseInt(selectedYear)}`
      ).getMonth(); // Convert month name to index
      const selectedYearValue = selectedDate.getFullYear();

      // Convert selectedYear to an integer
      const allowedYear = parseInt(selectedYear);

      // Check if selected date matches the allowed month and year
      if (
        selectedYearValue !== allowedYear ||
        selectedDate.getMonth() !== selectedMonthIndex // No need to add 1 here, since getMonth is 0-based and so is selectedMonthIndex
      ) {
        message.warning(
          `You can only select a date in ${selectedMonth} ${allowedYear}`
        );
        return; // Prevent setting the invalid date
      }
    }
    setTable1Data((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  // // Handle input change for Table 2
  // const handleTable2Change = (index, fieldName, value) => {
  //   const updatedRows = table2Rows.map((row, i) =>
  //     i === index ? { ...row, [fieldName]: value } : row
  //   );
  //   setTable2Rows(updatedRows);
  // };

  const handleTable2Change = (index, field, value) => {
    const updatedRows = [...table2Rows];
    updatedRows[index][field] = value;

    // Calculate `ratio` and `newPLGain` based on the updated values
    const referenceCottonMicronaire =
      parseFloat(updatedRows[index].referenceCottonMicronaire) || 0;
    const observed = parseFloat(updatedRows[index].observed) || 0;
    const plGain = parseFloat(updatedRows[index].plGain) || 0;

    // Calculate ratio (observed / referenceCottonMicronaire)
    if (referenceCottonMicronaire && observed) {
      updatedRows[index].ratio = (observed / referenceCottonMicronaire).toFixed(
        2
      ); // Example formula for ratio
    } else {
      updatedRows[index].ratio = "";
    }

    // Calculate newPLGain (ratio * plGain)
    const ratio = parseFloat(updatedRows[index].ratio) || 0;
    if (ratio && plGain) {
      updatedRows[index].newPLGain = (ratio * plGain).toFixed(2); // Correct formula
    } else {
      updatedRows[index].newPLGain = "";
    }

    setTable2Rows(updatedRows);
  };

  // Handle input change for Table 3
  const handleTable3Change = (fieldName, value) => {
    setTable3Data({ ...table3Data, [fieldName]: value });
  };

  useEffect(() => {
    console.log("params", selectedYear, selectedMonth, table1Data.eqIdNo);

    if (!initialized.current) {
      initialized.current = true;
      if (selectedYear && selectedMonth) {
        const token = localStorage.getItem("token");
        // API call
        axios
          .get(
            `${    API.prodUrl}/Precot/api/qc/WiraFiberFinessF010/GetByMonthYear?month=${selectedMonth}&year=${selectedYear}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "json",
            }
          )
          .then((response) => {
            if (Array.isArray(response.data) && response.data.length > 0) {
              const data = response.data[0];

              setMainID(data.id);
              setSelectedRow(response.data[0]);

              const username = response.data[0]?.chemist_submit_by;
              console.log("username", username);
              //getImage
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

              const username2 = response.data[0]?.manager_submit_by;
              console.log("username", username2);
              //getImage

              axios
                .get(
                  `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
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

              if (
                roleauth === "QA_MANAGER" ||
                roleauth === "QC_MANAGER" ||
                roleauth === "CHEMIST_DESIGNEE"
              ) {
                if (
                  (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
                    response.data[0]?.manager_status === "QC_REJECTED") ||
                  (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
                    response.data[0]?.manager_status === "QA_REJECTED") ||
                  (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
                    response.data[0]?.manager_status ===
                      "CHEMIST_DESIGNEE_REJECTED")
                ) {
                  message.warning("Chemist Not Yet Approved");
                  setTimeout(() => {
                    navigate("/Precot/QualityControl/F-010/Summary");
                  }, 1500);
                }
              }

              // Set data for the first table
              setTable1Data({
                eqIdNo: data.eqIdNo,
                calibrationDate: data.calibrationDate,
                bcflowOffset: data.flowOffset,
                bcPLGain: data.plGain,
                bcPressureOffset: data.pressureOffSet,
                bcPHGain: data.phGain,
              });

              // Set data for the second table (list of items)
              setTable2Rows(
                data.details.map((item) => ({
                  id: item.id,
                  referenceCottonMicronaire: item.refCottonMicroValue,
                  observed: item.obsr,
                  ratio: item.ratio,
                  plGain: item.plGain,
                  newPLGain: item.newPlGain,
                }))
              );

              // Set data for the third table
              setTable3Data({
                acFlowOffset: data.calibratedFlowOffSet,
                acPLGain: data.calibratedPlGain,
                acPressureOffset: data.calibratedPressureOffSet,
                acPHGain: data.calibratedPhGain,
                calibrationNextDueDate: data.calibNextDueDate,
                remarks: data.remarks,
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching data", error);
          });
      }
    }
  }, [selectedYear, selectedMonth]);

  const handleSave = async () => {
    // Build the payload'
    setSaveLoading(true);
    console.log("params", selectedYear, selectedMonth, table1Data.eqIdNo);
    const payload = {
      id: mainID || "", // Assuming empty for new records
      formatNo: "PH-QCL01/F-010",
      revisionNo: "01",
      formatName: "WIRA Fiber Fineness Tester Calibration Report",
      refSopNo: "PH-QCL01-D-04",
      frequency: "Monthly",
      eqIdNo: "PH-E/I-LAB37", // Use selectedEqNo or "0" if not available
      calibrationDate: table1Data.calibrationDate, // Date should remain a string
      month: selectedMonth, // Keep as string if needed for formatting
      year: selectedYear, // Ensure year is an integer

      flowOffset: parseInt(table1Data.bcflowOffset, 10),
      pressureOffSet: parseInt(table1Data.bcPressureOffset, 10),
      plGain: parseInt(table1Data.bcPLGain, 10),
      phGain: parseInt(table1Data.bcPHGain, 10),
      newPlGainAvg: parseFloat(calculateNewPlGainAvg()) || 0, // Convert to float, default to 0 if no value
      calibratedFlowOffSet: parseInt(table3Data.acFlowOffset, 10),
      calibratedPlGain: parseInt(table3Data.acPLGain, 10),
      calibratedPressureOffSet: parseInt(table3Data.acPressureOffset, 10),
      calibratedPhGain: parseInt(table3Data.acPHGain, 10),
      calibNextDueDate: table3Data.calibrationNextDueDate, // Date should remain a string
      remarks: table3Data.remarks || "N/A",
      details: table2Rows.map((row) => ({
        id: row.id || "", // Assuming empty for new records
        refCottonMicroValue: parseInt(row.referenceCottonMicronaire, 10),
        obsr: parseInt(row.observed, 10),
        ratio: parseInt(row.ratio, 10),
        plGain: parseInt(row.plGain, 10),
        newPlGain: parseInt(row.newPLGain, 10),
      })),
    };
    console.log("paylopad", payload);

    const token = localStorage.getItem("token");

    try {
      // Call the API with the payload
      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SaveWiraFiberFinenessF010`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      );

      // Handle the response
      message.success(
        "WIRA Fiber Fineness Tester Calibration Report Saved Successfully.."
      );
      console.log("Data saved successfully:", response.data);
      setSaveLoading(false);
      navigate("/Precot/QualityControl/F-010/Summary");
    } catch (error) {
      setSaveLoading(false);
      console.error("Error saving report:", error);
    }
  };

  const handleSubmit = async () => {
    // Check mandatory fields for main submission
    const errorMessages = [];

    // Check if all mandatory fields are empty
    const allFieldsEmpty =
      !table1Data.calibrationDate &&
      !table1Data.bcflowOffset &&
      !table1Data.bcPressureOffset &&
      !table1Data.bcPLGain &&
      !table1Data.bcPHGain &&
      !table3Data.acFlowOffset &&
      !table3Data.acPLGain &&
      !table3Data.acPressureOffset &&
      !table3Data.acPHGain &&
      !table3Data.calibrationNextDueDate &&
      table2Rows.every(
        (row) =>
          !row.referenceCottonMicronaire &&
          !row.observed &&
          !row.ratio &&
          !row.plGain &&
          !row.newPLGain
      );

    // If all fields are empty, add the specific warning message
    if (allFieldsEmpty) {
      message.warning(
        "Nothing fields are entered. Please fill in the required fields."
      );
      return; // Stop further execution if all fields are empty
    }

    if (!table1Data.calibrationDate) {
      errorMessages.push("Calibration date is required.");
    }

    if (
      table1Data.bcflowOffset === undefined ||
      table1Data.bcflowOffset === ""
    ) {
      errorMessages.push("Flow Offset is required.");
    }
    if (
      table1Data.bcPressureOffset === undefined ||
      table1Data.bcPressureOffset === ""
    ) {
      errorMessages.push("Pressure Offset is required.");
    }
    if (table1Data.bcPLGain === undefined || table1Data.bcPLGain === "") {
      errorMessages.push("PL Gain is required.");
    }
    if (table1Data.bcPHGain === undefined || table1Data.bcPHGain === "") {
      errorMessages.push("PH Gain is required.");
    }
    if (
      table3Data.acFlowOffset === undefined ||
      table3Data.acFlowOffset === ""
    ) {
      errorMessages.push("Calibrated Flow Offset is required.");
    }
    if (table3Data.acPLGain === undefined || table3Data.acPLGain === "") {
      errorMessages.push("Calibrated PL Gain is required.");
    }
    if (
      table3Data.acPressureOffset === undefined ||
      table3Data.acPressureOffset === ""
    ) {
      errorMessages.push("Calibrated Pressure Offset is required.");
    }
    if (table3Data.acPHGain === undefined || table3Data.acPHGain === "") {
      errorMessages.push("Calibrated PH Gain is required.");
    }
    if (!table3Data.calibrationNextDueDate) {
      errorMessages.push("Calibration Next Due Date is required.");
    }

    // Check mandatory fields in each detail row
    table2Rows.forEach((row, index) => {
      if (!row.referenceCottonMicronaire) {
        errorMessages.push(`Reference Cotton Micronaire is required.`);
      }
      if (row.observed === undefined || row.observed === "") {
        errorMessages.push(`Observed value is required.`);
      }
      if (row.ratio === undefined || row.ratio === "") {
        errorMessages.push(`Ratio is required.`);
      }
      if (row.plGain === undefined || row.plGain === "") {
        errorMessages.push(`PL Gain is required.`);
      }
      if (row.newPLGain === undefined || row.newPLGain === "") {
        errorMessages.push(`New PL Gain is required.`);
      }
    });

    // Show warning messages if there are any
    if (errorMessages.length > 0) {
      errorMessages.forEach((msg) => message.warning(msg));
      return; // Stop further execution if there are errors
    }

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Build the payload
    setSubmitLoading(true);
    const payload = {
      id: mainID || "",
      formatNo: "PH-QCL01/F-010",
      revisionNo: "01",
      formatName: "WIRA Fiber Fineness Tester Calibration Report",
      refSopNo: "PH-QCL01-D-04",
      frequency: "Monthly",
      eqIdNo: table1Data.eqIdNo, // Default to 0 if not selected
      calibrationDate: table1Data.calibrationDate,
      month: selectedMonth ? selectedMonth : "N/A",
      year: selectedYear ? selectedYear : "N/A",

      flowOffset: table1Data.bcflowOffset
        ? parseInt(table1Data.bcflowOffset, 10)
        : 0,
      pressureOffSet: table1Data.bcPressureOffset
        ? parseInt(table1Data.bcPressureOffset, 10)
        : 0,
      plGain: table1Data.bcPLGain ? parseInt(table1Data.bcPLGain, 10) : 0,
      phGain: table1Data.bcPHGain ? parseInt(table1Data.bcPHGain, 10) : 0,
      newPlGainAvg: calculateNewPlGainAvg()
        ? parseFloat(calculateNewPlGainAvg(), 10)
        : 0, // Ensure the function returns 0 if no value
      calibratedFlowOffSet: table3Data.acFlowOffset
        ? parseInt(table3Data.acFlowOffset, 10)
        : 0,
      calibratedPlGain: table3Data.acPLGain
        ? parseInt(table3Data.acPLGain, 10)
        : 0,
      calibratedPressureOffSet: table3Data.acPressureOffset
        ? parseInt(table3Data.acPressureOffset, 10)
        : 0,
      calibratedPhGain: table3Data.acPHGain
        ? parseInt(table3Data.acPHGain, 10)
        : 0,
      calibNextDueDate: table3Data.calibrationNextDueDate,
      remarks: table3Data.remarks || "N/A",
      details: table2Rows.map((row) => ({
        id: row.id || "",
        refCottonMicroValue: parseInt(row.referenceCottonMicronaire, 10) || 0,
        obsr: parseInt(row.observed) || 0,
        ratio: parseInt(row.ratio) || 0,
        plGain: parseInt(row.plGain) || 0,
        newPlGain: parseInt(row.newPLGain) || 0,
      })),
    };

    console.log("paylopad", payload);

    const token = localStorage.getItem("token");

    try {
      // Call the API with the payload
      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SubmitWiraFiberFinenessF010`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      );

      // Handle the response
      message.success(
        "WIRA Fiber Fineness Tester Calibration Report Submitted Successfully.."
      );
      console.log("Data saved successfully:", response.data);
      setSubmitLoading(false);
      navigate("/Precot/QualityControl/F-010/Summary");
    } catch (error) {
      setSubmitLoading(false);
      console.error("Error saving report:", error);
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios
      .put(
        `${    API.prodUrl}/Precot/api/qc/ApproveWiraFiberFinessF010`,
        {
          id: mainID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("res in approve", res);
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-010/Summary");
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
    // console.log("print screen works");
  };

  const handleReject = async () => {
    setSubmitLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${    API.prodUrl}/Precot/api/qc/ApproveWiraFiberFinessF010`,
        {
          id: mainID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage reject", res.data.message);
        setSubmitLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-010/Summary");
      })
      .catch((err) => {
        // console.log("Err in reject", err.response.data.message);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const canEdit = () => {
    if (roleauth === "ROLE_CHEMIST") {
      return !(
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.manager_status === "QC_APPROVED") ||
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.manager_status === "QA_APPROVED") ||
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.manager_status === "CHEMIST_DESIGNEE_APPROVED")
      );
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "CHEMIST_DESIGNEE"
    ) {
      return !(
        (selectedRow &&
          selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          (selectedRow.manager_status === "WAITING_FOR_APPROVAL" ||
            selectedRow.manager_status === "QC_REJECTED" ||
            selectedRow.manager_status === "QC_APPROVED" ||
            selectedRow.manager_status === "QA_REJECTED" ||
            selectedRow.manager_status === "QA_APPROVED" ||
            selectedRow.manager_status === "CHEMIST_DESIGNEE_APPROVED" ||
            selectedRow.manager_status === "CHEMIST_DESIGNEE_REJECTED")) ||
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
          selectedRow?.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "CHEMIST_DESIGNEE_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "CHEMIST_DESIGNEE_APPROVED")
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
          selectedRow?.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "CHEMIST_DESIGNEE_APPROVED")
      ) {
        return "none";
      } else if (
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "CHEMIST_DESIGNEE_REJECTED")
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
        selectedRow?.manager_status === "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "CHEMIST_DESIGNEE_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.manager_status === "CHEMIST_DESIGNEE_APPROVED") ||
        selectedRow.chemist_status === "CHEMIST_SAVED"
      ) {
        return "none";
      }
    }
  };

  // Helper function to calculate newPlGainAvg, if needed
  const calculateNewPlGainAvg = () => {
    const plGainSum = table2Rows.reduce(
      (sum, row) => sum + parseFloat(row.newPLGain || 0),
      0
    );
    return (plGainSum / table2Rows.length).toFixed(2); // Average to 2 decimal places
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
  if (selectedRow.manager_submit_on) {
    formattedQCDate = moment(selectedRow.manager_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-010/Summary");
  };

  const showDrawer = () => {
    // setOpen(true);
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>WIRA Fiber Fineness Tester Calibration Details I</b>
        </p>
      ),
      children: (
        <div>
          <div>
            <table
              className="table-1"
              style={{
                borderCollapse: "collapse",
                border: "1px solid black",
                width: "100%",
                maxWidth: "100%",
                marginLeft: "20px",
                marginTop: "30px",
              }}
            >
              <tbody>
                <tr>
                  <td colSpan="4" style={{ padding: "10px" }}>
                    Frequency: Monthly
                  </td>
                  <td colSpan="4" style={{ padding: "10px" }}>
                    EQ. ID. No.: {table1Data.eqIdNo}
                  </td>
                </tr>
                <tr>
                  <td
                    className="calibrationDate"
                    colSpan="8"
                    style={{ padding: "10px" }}
                  >
                    Calibration date:
                    <Input
                      type="date"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      disabled={!isEditable}
                      value={table1Data.calibrationDate}
                      onChange={(e) =>
                        handleTable1Change("calibrationDate", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    className="settingBeforeCalibration"
                    colSpan="8"
                    style={{ padding: "10px" }}
                  >
                    Setting before Calibration:
                  </td>
                </tr>
                <tr>
                  <td
                    className="flowOffset"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    Flow offset:
                    <Input
                      type="number"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      disabled={!isEditable}
                      onKeyPress={(e) => {
                        if (e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      value={table1Data.bcflowOffset}
                      onChange={(e) =>
                        handleTable1Change("bcflowOffset", e.target.value)
                      }
                    />
                  </td>
                  <td
                    className="plGain"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    PL gain:
                    <Input
                      type="number"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      disabled={!isEditable}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      min={0}
                      value={table1Data.bcPLGain}
                      onChange={(e) =>
                        handleTable1Change("bcPLGain", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    className="pressureOffset"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    Pressure off set:
                    <Input
                      type="number"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      disabled={!isEditable}
                      onKeyPress={(e) => {
                        if (e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      min={0}
                      value={table1Data.bcPressureOffset}
                      onChange={(e) =>
                        handleTable1Change("bcPressureOffset", e.target.value)
                      }
                    />
                  </td>
                  <td
                    className="phGain"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    PH gain:
                    <Input
                      type="number"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      disabled={!isEditable}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      min={0}
                      value={table1Data.bcPHGain}
                      onChange={(e) =>
                        handleTable1Change("bcPHGain", e.target.value)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p>
          <b>WIRA Fiber Fineness Tester Calibration Details II</b>
        </p>
      ),
      children: (
        <div>
          <div>
            <table
              className="table-2"
              style={{
                borderCollapse: "collapse",
                border: "1px solid black",
                width: "100%", // ensures the table takes up the full width of its container
                maxWidth: "100%", // prevents the table from exceeding the container width
                marginLeft: "20px", // adjust this if necessary for your layout
                marginTop: "30px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "10px" }}>
                    Reference Cotton Micronaire value
                  </th>
                  <th style={{ padding: "10px" }}>Observed</th>
                  <th style={{ padding: "10px" }}>Ratio</th>
                  <th style={{ padding: "10px" }}>PL gain</th>
                  <th style={{ padding: "10px" }}>New PL gain</th>
                  <th style={{ padding: "10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {table2Rows.map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: "10px" }}>
                      <Input
                        type="number"
                        value={row.referenceCottonMicronaire}
                        onChange={(e) =>
                          handleTable2Change(
                            index,
                            "referenceCottonMicronaire",
                            e.target.value
                          )
                        }
                        onKeyPress={(e) => {
                          if (e.key === "-" || e.key === "e" || e.key === "E") {
                            e.preventDefault();
                          }
                        }}
                        disabled={!isEditable}
                        min={0}
                      />
                    </td>
                    <td style={{ padding: "10px" }}>
                      <Input
                        type="number"
                        value={row.observed}
                        onChange={(e) =>
                          handleTable2Change(index, "observed", e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "-" || e.key === "e" || e.key === "E") {
                            e.preventDefault();
                          }
                        }}
                        disabled={!isEditable}
                        min={0}
                      />
                    </td>
                    <td style={{ padding: "10px" }}>
                      <Input type="number" value={row.ratio} disabled={true} />
                    </td>
                    <td style={{ padding: "10px" }}>
                      <Input
                        type="number"
                        value={row.plGain}
                        onChange={(e) =>
                          handleTable2Change(index, "plGain", e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "-" || e.key === "e" || e.key === "E") {
                            e.preventDefault();
                          }
                        }}
                        disabled={!isEditable}
                        min={0}
                      />
                    </td>
                    <td style={{ padding: "10px" }}>
                      <Input type="number" value={row.newPLGain} disabled />
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <Button
                        type="primary"
                        danger
                        icon={<FaTrash style={{ fontSize: "10px" }} />}
                        style={{
                          padding: "10px",
                          fontSize: "10px",
                          lineHeight: "12px",
                          height: "24px",
                          width: "auto",
                          minWidth: "auto",
                          backgroundColor: "#ff4d4f",
                          borderColor: "#ff4d4f",
                        }}
                        disabled={!isEditable}
                        onClick={() => deleteRow(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              colSpan={6}
              style={{
                marginLeft: "76%",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              AVG: <span>{parseFloat(calculateNewPlGainAvg(), 10)}</span>
            </p>

            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
                marginLeft: "20px",
                marginTop: "20px",
              }}
              // disabled={disable}
              disabled={!isEditable}
              onClick={addRow}
              icon={
                <AiOutlinePlus
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Add Row
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <p>
          <b>WIRA Fiber Fineness Tester Calibration Details III</b>
        </p>
      ),
      children: (
        <div>
          <div>
            <table
              className="table-3"
              style={{
                borderCollapse: "collapse",
                border: "1px solid black",
                width: "100%",
                maxWidth: "100%",
                marginLeft: "20px",
                marginTop: "30px",
                marginBottom: "5%",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: "10px" }} colSpan="8">
                    Ratio= Observed mic./ Reference mic.
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }} colSpan="8">
                    New PL gain= Ratio x PL gain
                  </td>
                </tr>
                <tr>
                  <td
                    className="settingAfterCalibration"
                    colSpan="8"
                    style={{ padding: "10px" }}
                  >
                    Setting After Calibration:
                  </td>
                </tr>
                <tr>
                  <td
                    className="acFlowOffset"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    Flow offset:
                    <Input
                      type="number"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      onKeyPress={(e) => {
                        if (  e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      disabled={!isEditable}
                      value={table3Data.acFlowOffset}
                      onChange={(e) =>
                        handleTable3Change("acFlowOffset", e.target.value)
                      }
                    />
                  </td>
                  <td
                    className="acPLGain"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    PL gain:
                    <Input
                      type="number"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      disabled={!isEditable}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      min={0}
                      value={table3Data.acPLGain}
                      onChange={(e) =>
                        handleTable3Change("acPLGain", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    className="acPressureOffset"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    Pressure off set:
                    <Input
                      type="number"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      disabled={!isEditable}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      min={0}
                      value={table3Data.acPressureOffset}
                      onChange={(e) =>
                        handleTable3Change("acPressureOffset", e.target.value)
                      }
                    />
                  </td>
                  <td
                    className="acPHGain"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    PH gain:
                    <Input
                      type="number"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      disabled={!isEditable}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      min={0}
                      value={table3Data.acPHGain}
                      onChange={(e) =>
                        handleTable3Change("acPHGain", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    className="calibrationNextDueDate"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    Calibration next due date:
                    <Input
                      type="date"
                      style={{
                        width: "130px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      min={table1Data.calibrationDate} // Set min date to the calibrationDate
                      disabled={!isEditable}
                      value={table3Data.calibrationNextDueDate}
                      onChange={(e) =>
                        handleTable3Change(
                          "calibrationNextDueDate",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td
                    className="remarks"
                    colSpan="4"
                    style={{ padding: "10px" }}
                  >
                    Remarks:
                    <Input
                      type="text"
                      style={{
                        width: "200px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      disabled={!isEditable}
                      value={table3Data.remarks}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleTable3Change("remarks", value); // Valid input
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },

    {
      key: "4",
      label: (
        <p>
          <b> Reviews </b>
        </p>
      ),
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
                <b>Performed by Chemist Sign & Date</b>
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>Reviewed by QA/QC Manager or Chemist Designee Sign & Date</b>
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
                {selectedRow?.chemist_status === "CHEMIST_APPROVED" && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
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
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {(selectedRow?.manager_status === "QC_REJECTED" ||
                  selectedRow?.manager_status === "QC_APPROVED" ||
                  selectedRow?.manager_status === "QA_REJECTED" ||
                  selectedRow?.manager_status === "QA_APPROVED" ||
                  selectedRow?.manager_status === "CHEMIST_DESIGNEE_APPROVED" ||
                  selectedRow?.manager_status ===
                    "CHEMIST_DESIGNEE_REJECTED") && (
                  <>
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />

                    {selectedRow && selectedRow.manager_submit_by}
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
    <>
      <BleachingHeader
        unit="Unit H"
        formName="WIRA Fiber Fineness Tester Calibration Report"
        formatNo="PH-QCL01/F-010"
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
    </>
  );
};

export default QualityControlF010;
