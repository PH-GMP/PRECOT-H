import React, { useState, useEffect } from "react";
import {
  InputNumber,
  Dropdown,
  Space,
  Input,
  Form,
  DatePicker,
  Button,
  Tabs,
  message,
  Tooltip,
  Modal,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { BiLock } from "react-icons/bi";
import API from "../baseUrl.json";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { FaUserCircle } from "react-icons/fa";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f030 = () => {
  const formatName = "DIGITAL COLONY COUNTER CALIBRATION REPORT";
  const formatNo = "PH-QCL01/F-030";
  const revisionNo = "01";
  const sopNo = "PH-QCL01-D-04";
  const unit = "Unit H";

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { uniqueEqNo, uniqueMonth, uniqueYear } = location.state || {};
  const [selectedRow, setSelectedRow] = useState({"micro_designee_status":"","micro_status":"","micro_sign":"","micro_designee_sign":"","micro_submit_on":"","micro_designee_submit_on":""});
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    
    // Return in YYYY-MM-DD format for type="date" input
    return `${year}-${month}-${day}`;
  };
  const [formValues, setFormValues] = useState({
    id: "", // ID field
    formatNo: "F030-001", // Predefined value
    revisionNo: "1.0", // Predefined value
    formatName: "Digital Colony Counter Calibration", // Predefined value
    refSopNo: "SOP-123", // Predefined value
    date:"", // Editable field
    month: uniqueMonth, // Editable field
    year: uniqueYear, // Editable field
    equip_id: "", // Editable field
    centering_status: "", // Editable field
    adjusting_status: "", // Editable field
    calibration_time: "", // Editable field
    activity_status: "", // Editable field
    calibration_next_due_date: "", // Editable field
    remarks: "", // Editable field
    reason: "",
    micro_status:"",
    micro_designee_status:"" // Editable field
  });

  useEffect(() => {
    console.log('Form Values', formValues)
  }, [formValues])
  const [getImage3, setGetImage3] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const roleauth = localStorage.getItem("role");

  console.log(roleauth);
  const onClose = () => {
    setOpen(false);
  };
  const getNextMonth = () => {
    const today = new Date();
    console.log("Today", today)
    const nextMonth = new Date(today.getFullYear(), today.getMonth()); // First day of the next month
    return nextMonth.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'
  };

  
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate(); // 0 gives last day of the previous month
  };

  useEffect(() => {
    if (uniqueMonth && uniqueYear) {
      const firstDay = `${uniqueYear}-${String(uniqueMonth).padStart(2, '0')}-01`; // First day of the month
      const lastDay = `${uniqueYear}-${String(uniqueMonth).padStart(2, '0')}-${getDaysInMonth(uniqueMonth, uniqueYear)}`; // Last day of the month

      // Set default value as first day of the month if no date is selected
      if (!formValues?.date) {
        setFormValues({ ...formValues, date: firstDay });
      }
    }
  }, [uniqueMonth, uniqueYear, formValues?.date]);

  // Function to handle date change and validation
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value); // Date input in "yyyy-mm-dd" format
    const selectedMonthIndex = new Date(`${uniqueMonth} 1, ${parseInt(uniqueYear)}`).getMonth(); // Convert uniqueMonth to index
    const selectedYearValue = selectedDate.getFullYear();
    const selectedMonthValue = selectedDate.getMonth(); // 0-based month value
  
    // Convert uniqueYear to an integer
    const allowedYear = parseInt(uniqueYear);
  
    // Check if selected date matches the allowed month and year
    if (selectedYearValue !== allowedYear || selectedMonthValue !== selectedMonthIndex) {
      message.warning(`You can only select a date in ${uniqueMonth} ${allowedYear}`);
      return; // Prevent setting the invalid date
    }
  
    // If validation passes, update the formValues state
    setFormValues({ ...formValues, date: e.target.value });



     };

  
  const getMinDate = () => {
    // Set the first day of the selected uniqueMonth and uniqueYear
    const minDate = new Date(`${uniqueMonth} 1, ${uniqueYear}`);
    const year = minDate.getFullYear();
    let month = minDate.getMonth() + 1; // Months are 0-based
    let day = minDate.getDate();
  
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    
    // Return the min date in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  };
  
  const getMaxDate = () => {
    // Set the last day of the selected uniqueMonth and uniqueYear
    const maxDate = new Date(uniqueYear, new Date(`${uniqueMonth} 1, ${uniqueYear}`).getMonth() + 1, 0); // Last day of the month
    const year = maxDate.getFullYear();
    let month = maxDate.getMonth() + 1; // Months are 0-based
    let day = maxDate.getDate();
  
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    
    // Return the max date in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  };

  

  

  const canEdit = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      return !(
        selectedRow &&
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.micro_designee_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.micro_designee_status === "MICRO_DESIGNEE_APPROVED")
      );
    } else if (roleauth === "MICRO_DESIGNEE") {
      return !(
        selectedRow &&
        selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
        (selectedRow?.micro_designee_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.micro_designee_status === "MICRO_DESIGNEE_APPROVED" ||
          selectedRow?.micro_designee_status === "MICRO_DESIGNEE_REJECTED") || 
        selectedRow?.micro_status === "MICROBIOLOGIST_SAVED"
      );
    } else {
      return false;
    }
  };
  
  let isEditable = canEdit();
  
  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        selectedRow &&
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.micro_designee_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.micro_designee_status === "MICRO_DESIGNEE_REJECTED") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.micro_designee_status === "MICRO_DESIGNEE_APPROVED")
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
        selectedRow &&
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.micro_designee_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.micro_designee_status === "MICRO_DESIGNEE_APPROVED")
      ) {
        return "none";
      } else if (
        selectedRow &&
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.micro_designee_status === "MICRO_DESIGNEE_REJECTED")
      ) {
        return "block";
      }
    } else if (roleauth === "MICRO_DESIGNEE") {
      if (
        selectedRow &&
        selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
        selectedRow?.micro_designee_status === "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        selectedRow &&
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          (selectedRow?.micro_designee_status === "MICRO_DESIGNEE_REJECTED" ||
           selectedRow?.micro_designee_status === "MICRO_DESIGNEE_APPROVED")) ||
        selectedRow?.micro_status === "MICROBIOLOGIST_SAVED"
      ) {
        return "none";
      }
    }
  };
 
  


  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.micro_sign;
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
  }, [selectedRow?.micro_sign,      API.prodUrl]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.micro_designee_sign;
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
  }, [selectedRow?.micro_designee_sign,      API.prodUrl]);



  const handleReject = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .put(
        `${    API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF030`,
        {
          id: formValues.id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((response) => {
        message.error("Data Rejected");
        // setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/PH-QCF-030/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        // setSaveLoading(false);
      });
  };

  const handleApprove = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .put(
        `${    API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF030`,
        {
          id: formValues.id,
          status: "Approve",
        },
        { headers }
      )
      .then((response) => {
        message.success(" Report Save Successfully");

        setTimeout(() => {
          navigate("/Precot/QualityControl/PH-QCF-030/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  let formattedMicroDate;
  if (selectedRow?.micro_submit_on) {
    formattedMicroDate = moment(selectedRow?.micro_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where micro_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }

  let formattedMicroDesigneeDate;
  if (selectedRow?.micro_designee_submit_on) {
    formattedMicroDesigneeDate = moment(selectedRow.micro_designee_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where micro_designee_submit_on is null or undefined
    formattedMicroDesigneeDate = ""; // Or any other default value or error handling
  }


  const handleRejectModal = () => {
    setShowModal(true);
  };




  const handleBack = () => {
    navigate("/Precot/QualityControl/PH-QCF-030/Summary")
  }
  const handleSave = () => {
    const payload = {
      id: formValues.id || "", // Pass the id, or keep it empty for the first save
      formatNo: "F030-001", // New formatNo
      revisionNo: "1.0", // New revisionNo
      formatName: "Digital Colony Counter Calibration", // New formatName
      refSopNo: "SOP-123", // New refSopNo
      date: formValues.date || "N/A", // Date from formValues or uniqueDate
      month: formValues.month || uniqueMonth, // Month from formValues
      year: formValues.year || uniqueYear, // Year from formValues
      equip_id: formValues.equip_id || uniqueEqNo, // Equipment ID
      centering_status: formValues.centering_status || "N/A", // Centering status
      adjusting_status: formValues.adjusting_status || "N/A", // Adjusting status
      calibration_time: formValues.calibration_time || "N/A", // Calibration time
      activity_status: formValues.activity_status || "N/A", // Activity status
      calibration_next_due_date: formValues.calibration_next_due_date || "N/A", // Next due date for calibration
      remarks: formValues.remarks || "N/A", // Remarks
      reason: formValues.reason, // Reason for calibration
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${    API.prodUrl}/Precot/api/QcForm/SaveDigitalColonyF030`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Report Saved Successfully");

        // Update form values with new data from the response if needed
        if (response.data.id) {
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            id: response.data.id, // Update ID from backend
            date: response.data.date, // Update date from backend
            calibration_next_due_date: response.data.calibration_next_due_date, // Update next due date
            remarks: response.data.remarks, // Update remarks
            activity_status: response.data.activity_status, // Update activity status
            centering_status: response.data.centering_status, // Centering status
            adjusting_status: response.data.adjusting_status, // Adjusting status
            calibration_time: response.data.calibration_time,
          }));
        }

        // Navigate to summary page after a delay
        setTimeout(() => {
          navigate("/Precot/QualityControl/PH-QCF-030/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const handleSubmit = () => {
    if (!formValues.calibration_time) {
      message.error("Please select a calibration time.");
      return;
    }
    if (!formValues.calibration_next_due_date) {
      message.error("Please select a calibration due date.");
      return;
    }

    const payload = {
      id: formValues.id || "", // Pass the id, or keep it empty for the first save
      formatNo: "F030-001", // New formatNo
      revisionNo: "1.0", // New revisionNo
      formatName: "Digital Colony Counter Calibration", // New formatName
      refSopNo: "SOP-123", // New refSopNo
      date: formValues.date, // Date from formValues or uniqueDate
      month: formValues.month || uniqueMonth, // Month from formValues
      year: formValues.year || uniqueYear, // Year from formValues
      equip_id: formValues.equip_id || uniqueEqNo, // Equipment ID
      centering_status: formValues.centering_status||"N/A", // Centering status
      adjusting_status: formValues.adjusting_status||"N/A", // Adjusting status
      calibration_time: formValues.calibration_time||"N/A", // Calibration time
      activity_status: formValues.activity_status||"N/A", // Activity status
      calibration_next_due_date: formValues.calibration_next_due_date||"N/A", // Next due date for calibration
      remarks: formValues.remarks||"N/A", // Remarks
      reason: formValues.reason, // Reason for calibration
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${    API.prodUrl}/Precot/api/QcForm/SubmitDigitalColonyF030`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Report Submitted Successfully");

        // Update form values with new data from the response if needed
        if (response.data.id) {
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            id: response.data.id, // Update ID from backend
            date: response.data.date, // Update date from backend
            calibration_next_due_date: response.data.calibration_next_due_date, // Update next due date
            remarks: response.data.remarks, // Update remarks
            activity_status: response.data.activity_status, // Update activity status
            centering_status: response.data.centering_status, // Centering status
            adjusting_status: response.data.adjusting_status, // Adjusting status
            calibration_time: response.data.calibration_time,
          }));
        }

        // Navigate to summary page after a delay
        setTimeout(() => {
          navigate("/Precot/QualityControl/PH-QCF-030/Summary");
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

    // Function to merge the API response and retain existing payload fields
    const mergePayload = (newData) => {
      setFormValues((prevPayload) => ({
        ...prevPayload,
        ...newData,
        // uniqueMonth: newData.month || prevPayload.month,
        // uniqueYear: newData.year || prevPayload.year, // Preserve year if not provided in newData
      }));
    };

    // Check if the necessary parameters are present
 
    if (uniqueMonth && uniqueYear && uniqueEqNo) {
      axios
        .get(
          `${    API.prodUrl}/Precot/api/QcForm/getDigitalF030?month=${uniqueMonth}&year=${uniqueYear}&eq_id=${uniqueEqNo}`,
          {
            headers,
          }
        )
        .then((response) => {
          if (
            response.data &&
            response.data !== "No data found for the provided parameters"
          ) {
            console.log("Data found for month:", uniqueMonth, "and year:", uniqueYear);
            setSelectedRow(response.data[0]);
            setFormValues(response.data[0]);
          }  else {
            console.log(
              "No data found, updating payload with the provided month and year:",
              uniqueMonth,
              uniqueYear
            );
            // mergePayload({ uniqueMonth, uniqueYear }); // Update payload with month and year if no data
          }
        })
        .catch((err) => {
          console.error("Error fetching data by month and year:", err);
        });
    }
  }, [uniqueEqNo, uniqueMonth, uniqueYear, token]);



useEffect(() => {
console.log("formValues",formValues);
},[formValues])


  const items = [
    {
      key: "1",
      label: <p>Form</p>,
      children: (
        <div>
          <table>
            
            <tr>
              
              <td style={{ padding: '10px', textAlign: 'center', fontFamily: "Times New Roman, Times, serif" }} rowSpan="3" colSpan="2">Calibration Observations</td>
              <td style={{ padding: '10px', textAlign: 'center', fontFamily: "Times New Roman, Times, serif" }} colSpan="4">Activity</td>
              <td style={{ padding: '10px', textAlign: 'center', fontFamily: "Times New Roman, Times, serif" }} colSpan="2">Status</td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="2">Centering and Sizing the Image</td>
              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="2">Cross Hair Calibrating pattern Plate - Perfectly centered by respect to the blue Cross Hair</td>
              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="2">
                <label >
                  <input
                    type="radio"
                    name="doneStatus"
                    disabled={!isEditable}
                    value="done"
                    checked={formValues?.adjusting_status === "DONE"}
                    onChange={() => setFormValues({ ...formValues, adjusting_status: "DONE" })}
                  /> Done
                </label>
                <label style={{  marginLeft: '10px' }}>
                  <input
                    type="radio"
                    name="doneStatus"
                    disabled={!isEditable}
                    value="notDone"
                    checked={formValues?.adjusting_status === "NOT_DONE"}
                    onChange={() => setFormValues({ ...formValues, adjusting_status: "NOT_DONE" })}
                  /> Not Done
                </label>
              </td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="2">Adjusting Plate Processing to Specific Plates</td>
              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="2">Black Background Calibration - Calibrate to 460 Counted Colonies</td>
              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="2">
                <label >
                  <input
                    type="radio"
                    name="matchStatus"
                    disabled={!isEditable}
                    value="matched"
                    checked={formValues?.centering_status === "Matched"}
                    onChange={() => setFormValues({ ...formValues, centering_status: "Matched" })}
                  /> Matched
                </label>
                <label style={{  marginLeft: '10px' }}>
                  <input
                    type="radio"
                    name="matchStatus"
                    value="notMatched"
                    disabled={!isEditable}
                    checked={formValues?.centering_status === "Not Matched"}
                    onChange={() => setFormValues({ ...formValues, centering_status: "Not Matched" })}
                  /> Not matched
                </label>
              </td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="4">
                Calibration time:
                <input
                  type="time"
                  value={formValues?.calibration_time}
                  disabled={!isEditable}
                  onChange={(e) => setFormValues({ ...formValues, calibration_time: e.target.value })}
                  style={{ width: '50%', border: 'none', outline: 'none' }}
                />
              </td>

              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="2">
                Status:
                <label style={{ color: "black" }}>
                  <input
                    type="radio"
                    name="status"
                    disabled={!isEditable}
                    value="ok"
                    checked={formValues?.activity_status === "Active"}
                    onChange={() => setFormValues({ ...formValues, activity_status: "Active" })}
                  /> Ok
                </label>
                <label style={{ color: "black", marginLeft: '10px' }}>
                  <input
                    type="radio"
                    name="status"
                    disabled={!isEditable}
                    value="notOk"
                    checked={formValues?.activity_status === "Non Active"}
                    onChange={() => setFormValues({ ...formValues, activity_status: "Non Active" })}
                  /> Not ok
                </label>
              </td>

              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="2">
                Calibration next due date:
                <input
                  type="date"
                  disabled={!isEditable}
                  value={formValues?.calibration_next_due_date}
                  onChange={(e) => setFormValues({ ...formValues, calibration_next_due_date: e.target.value })}
                  style={{ width: '50%', border: 'none', outline: 'none' }}
                  min={getNextMonth()}
                />
              </td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", fontFamily: "Times New Roman, Times, serif", padding: '10px' }} colSpan="8">
                Remarks:
                <input
                  type="text"
                  disabled={!isEditable}
                  value={formValues?.remarks}
                  onChange={(e) => setFormValues({ ...formValues, remarks: e.target.value })}
                  style={{ width: '100%', border: 'none', outline: 'none' }}
                />
              </td>
            </tr>
          </table>



        </div>)
    }, {
      key: "2",
      label: <p>Review</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "90%", margin: "auto", tableLayout: 'fixed' }}>
            <tr >

              <td colSpan="12" style={{
                textAlign: 'center',
              }}>
                Checked By: (Micro)
              </td>
              <td colSpan="12" style={{
                textAlign: 'center',
              }}>
                verified By:(Micro Designee)
              </td>


            </tr>


            <tr>


              <td colSpan="12"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" && (
                  <>
                    {getImage3 && (
                      <img
                        className="signature"
                        src={getImage3}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.micro_sign}
                    <br />
                    {formattedMicroDate}
                  </>
                )}
              </td>



              <td colSpan="12" style={{
                fontSize: "12pt",
                textAlign: 'center',
                height: '70px',
                fontFamily: "Times New Roman, Times, serif"

              }}

              >
                {(
                  selectedRow?.micro_designee_status === "MICRO_DESIGNEE_APPROVED" ||
                  selectedRow?.micro_designee_status === "MICRO_DESIGNEE_REJECTED") && (
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
                      {formattedMicroDesigneeDate}
                    </>
                  )}

              </td>


            </tr>

          </table>
        </div>

      )
    }]



  return (<>
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










    <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <BleachingHeader
        unit={unit}
        formName={formatName}
        formatNo={formatNo}
        // MenuBtn={
        //   <Button
        //     type="primary"
        //     icon={<TbMenuDeep />}
        //     onClick={showDrawer}
        //   ></Button>
        // }
        buttonsArray={[
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
                  //display: submitBtnStatus ? "block" : "none",
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
    </div>



    <PrecotSidebar
      open={open}
      onClose={onClose}
      role={localStorage.getItem("role")}
    />



    <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '10px' }}>
    <Input
  type="date"
  disabled={!isEditable}  // Disable based on isEditable state
  value={formValues?.date}  // Set the value to formValues.date
  onChange={handleDateChange}  // Validate and update the date on change
  style={{ width: '10%', marginLeft: "20px", height: '20px' }}
  min={getMinDate()}  // Set the minimum date dynamically
  max={getMaxDate()}  // Set the maximum date dynamically
/>


      <Input
        addonBefore="year"
        placeholder="year"

        value={uniqueYear}
        readOnly

        style={{ width: '20%', marginLeft: "20px", height: '20px' }}
      />

      <Input
        addonBefore="Month"
        placeholder="month"
        value={uniqueMonth} // Display month name
        readOnly
        style={{ width: "20%", marginLeft: "20px", height: "20px" }}
      />



      <Input
        addonBefore="EQ.id"
        placeholder="EQ.id"

        value={uniqueEqNo}
        readOnly

        style={{ width: '20%', marginLeft: "20px", height: '20px' }} />



    </div>
    <Tabs
      defaultActiveKey="1"
      items={items}
      // onChange={onChange}
      style={{
        display: "flex",
        width: "100%",
        position: "relative",
        left: "2%",
      }}
    />


  </>)

}

export default QualityControl_f030;