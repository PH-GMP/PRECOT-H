/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
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
  Alert,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { BiLock } from "react-icons/bi";
import API from "../baseUrl.json";
import { DownOutlined } from "@ant-design/icons";
import moment, { relativeTimeRounding } from "moment";
import axios from "axios";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { FaUserCircle } from "react-icons/fa";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const PHQCL01F012 = () => {
  const formatName = "BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT";
  const formatNo = "PH-QCL01/F-012";
  const revisionNo = "05";
  const sopNo = "PH-QCL01-D-05";
  const unit = "Unit H";

  const navigate = useNavigate();

  const location = useLocation();
  const initial = useRef(false);
  const { uniqueDate, uniqueEqNo } = location.state || {};
  const [id, setId] = useState(null); // Initialize id state
  const [dropdownValues, setDropdownValues] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [getImage3, setGetImage3] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const roleauth = localStorage.getItem("role");
  console.log(roleauth);
  const onClose = () => {
    setOpen(false);
  };
  const [formValues, setFormValues] = useState({
    id: "", // Initially empty, will be updated after first save
    date: uniqueDate || "", // Handle case where uniqueDate may not exist initially
    month: "",
    year: "",
    eqno: uniqueEqNo || "",
    setTemperature: "", // Default value, can be changed by user
    obserevedTemperature: "", // Retained for API compatibility
    status: "", // Default status, can be changed by user
    remarks: "",
  });

  const [disable, setDisable] = useState({
    physicalAndChemicalTests: role === "ROLE_CHEMIST" ? false : true,
    microbiologist: role === "ROLE_MICROBIOLOGIST" ? false : true,
  });

  const canEdit = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      return !(
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "QC_APPROVED") ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "QA_APPROVED") ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "MICRO_DESIGNEE_APPROVED")
      );
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "MICRO_DESIGNEE"
    ) {
      return !(
        (selectedRow &&
          selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          (selectedRow.manager_status === "WAITING_FOR_APPROVAL" ||
            selectedRow.manager_status === "QC_REJECTED" ||
            selectedRow.manager_status === "QC_APPROVED" ||
            selectedRow.manager_status === "QA_REJECTED" ||
            selectedRow.manager_status === "QA_APPROVED" ||
            selectedRow.manager_status === "MICRO_DESIGNEE_APPROVED" ||
            selectedRow.manager_status === "MICRO_DESIGNEE_REJECTED")) ||
        selectedRow.microbiologist_status === "MICROBIOLOGIST_SAVED"
      );
    } else {
      return false;
    }
  };

  let isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_REJECTED")
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
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_APPROVED")
      ) {
        return "none";
      } else if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_REJECTED")
      ) {
        return "block";
      }
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "MICRO_DESIGNEE"
    ) {
      if (
        selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
        selectedRow?.manager_status === "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        selectedRow.manager_status === "MICRO_DESIGNEE_APPROVED" ||
        selectedRow.manager_status === "MICRO_DESIGNEE_REJECTED" ||
        selectedRow.microbiologist_status === "MICROBIOLOGIST_SAVED"
      ) {
        return "none";
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.microbiologist_sign;
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
  }, [selectedRow.microbiologist_sign,      API.prodUrl]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.manager_sign;
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
  }, [selectedRow.manager_sign,      API.prodUrl]);

  let formattedMicroDate;
  if (selectedRow.microbiologist_submit_on) {
    formattedMicroDate = moment(selectedRow.microbiologist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }

  let formattedManagerDate;
  if (selectedRow.manager_submit_on) {
    formattedManagerDate = moment(selectedRow.manager_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedManagerDate = ""; // Or any other default value or error handling
  }

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
        uniqueDate: newData.date || prevPayload.date, // Preserving date if not provided in newData
      }));
    };

    // Function to fetch data
    const fetchData = () => {
      if (uniqueDate) {
        axios
          .get(
            `${    API.prodUrl}/Precot/api/qc/BacterialIncubatorF012/GetByDateMonthYearEqIdNo?date=${uniqueDate}&eqIdNo=${uniqueEqNo}`,
            { headers }
          )
          .then((response) => {
            if (
              response.data &&
              response.data !== "No data found for the provided parameters"
            ) {
              // Check microbiologist and manager status
               

              setSelectedRow(response.data[0]);
              mergePayload(response.data[0]); // Merging first response item into payload
            } 
          })
          .catch((err) => {
            console.error("Error fetching data by date:", err);
          });
      }
    };

    // Only initiate the fetch once
    if (!initial.current) {
      initial.current = true;
      fetchData(); // Call fetchData when component mounts
    }
  }, [uniqueDate, uniqueEqNo, token, roleauth, navigate]);

  useEffect(() => {
    console.log("uniqueDate", uniqueDate, uniqueEqNo);
    if (uniqueDate) {
      const dateObj = new Date(uniqueDate); // Convert string to Date object

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
  }, [uniqueDate]);

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-012/Summary");
  };

  const handleReject = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .put(
        `${    API.prodUrl}/Precot/api/qc/ApproveBacterialIncubatorF012`,
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
          navigate("/Precot/QualityControl/F-012/Summary");
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
        `${    API.prodUrl}/Precot/api/qc/ApproveBacterialIncubatorF012`,
        {
          id: formValues.id,
          status: "Approve",
        },
        { headers }
      )
      .then((response) => {
        message.success("Approved Successfully");

        setTimeout(() => {
          navigate("/Precot/QualityControl/F-012/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    const payload = {
      id: formValues.id || "", // Pass the id, or keep it empty for the first save
      formatNo: "PH-QCL01/F-012", // Static or predefined value
      revisionNo: "01", // Static or predefined value
      formatName: "BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT", // Static or predefined value
      refSopNo: "PH-QCL01-D-04", // Static or predefined value
      frequency: "Daily", // Static or predefined value
      date: formValues.date || uniqueDate, // Date from formValues or uniqueDate
      eqIdNo: formValues.eqno || uniqueEqNo, // Equipment No. from formValues or uniqueEqNo
      standTemperature: formValues.standardTemperature, // Editable field for standard temperature
      sno: "", // Static value or dynamically generated
      month: formValues.month, // Month from formValues
      year: formValues.year, // Year from formValues
      setTemperature: formValues.setTemperature || "0", // Set temperature from formValues
      obserevedTemperature: formValues.obserevedTemperature || "0", // Use obserevedTemperature to match API
      status: formValues.status || "N/A", // Status from formValues
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(`${    API.prodUrl}/Precot/api/qc/SaveBacterialIncubatorF012`, payload, {
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
            obserevedTemperature: response.data.obserevedTemperature, // Retain obserevedTemperature from backend
            status: response.data.status, // Update status from backend
            // Add other fields if required
          }));
        }

        // Navigate to summary page after a delay
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-012/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const handleSubmit = () => {
    const payload = {
      id: formValues.id || "", // Pass the id, or keep it empty for the first save
      formatNo: "PH-QCL01/F-012", // Static or predefined value
      revisionNo: "01", // Static or predefined value
      formatName: "BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT", // Static or predefined value
      refSopNo: "PH-QCL01-D-04", // Static or predefined value
      frequency: "Daily", // Static or predefined value
      date: formValues.date || uniqueDate, // Date from formValues or uniqueDate
      eqIdNo: formValues.eqno || uniqueEqNo, // Equipment No. from formValues or uniqueEqNo
      standTemperature: formValues.standardTemperature, // Editable field for standard temperature
      sno: "", // Static value or dynamically generated
      month: formValues.month, // Month from formValues
      year: formValues.year, // Year from formValues
      setTemperature: formValues.setTemperature || "0", // Set temperature from formValues
      obserevedTemperature: formValues.obserevedTemperature || "0", // Use obserevedTemperature to match API
      status: formValues.status || "N/A", // Status from formValues
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(`${    API.prodUrl}/Precot/api/qc/SubmitBacterialIncubatorF012`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Report submitted Successfully");

        // Update form values with new data from the response if needed
        if (response.data.id) {
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            id: response.data.id, // Update ID from backend
            date: response.data.date, // Update date from backend
            obserevedTemperature: response.data.obserevedTemperature, // Retain obserevedTemperature from backend
            status: response.data.status, // Update status from backend
            // Add other fields if required
          }));
        }

        // Navigate to summary page after a delay
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-012/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const [form] = Form.useForm();
  const { TabPane } = Tabs;

  const onFinish = (values) => {
    console.log("Form values: ", values);
  };

  const createHandleDateChange = (key) => (date, dateString) => {
    handleChange(key, dateString);
  };

  const updatePayload = (keyword, value, payload) => {
    const keys = keyword
      .replace(/\[(\d+)\]/g, ".$1") // Convert array indices to dot notation
      .split("."); // Split the keyword into individual keys

    const deepClone = (obj) => JSON.parse(JSON.stringify(obj)); // Clone the payload to avoid mutation
    const newPayload = deepClone(payload);

    let nestedPayload = newPayload;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!nestedPayload[key]) {
        nestedPayload[key] = {}; // Create the key if it doesn't exist
      }
      nestedPayload = nestedPayload[key];
    }

    nestedPayload[keys[keys.length - 1]] = value; // Set the final key's value

    return newPayload;
  };

  const handleChange = (key, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [key]: value, // Dynamically set the form field value
    }));
  };

  console.log(formValues.month);
  console.log(formValues.year);

  const handleMenuClick = (dropdownKey, value) => {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [dropdownKey]: value,
    }));
  };

  const items = [
    {
      key: "1",
      label: <p>Form</p>,
      children: (
        <div>
          <table
            className="table-1"
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",

              maxWidth: "90%",
              marginLeft: "50px",
              marginTop: "30px",
            }}
          >
            <tbody>
              <tr>
                <td
                  colSpan="10"
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    border: "1px solid black",
                  }}
                >
                  Standard Temperature in℃: 35 to 37
                </td>
              </tr>
              <tr>
                <th style={{ padding: "10px" }}>S.No</th>
                <th style={{ padding: "10px" }}>Date</th>
                <th style={{ padding: "10px" }}>Set temperature in ℃</th>
                <th style={{ padding: "10px" }}>Observed temperature in ℃</th>
                <th style={{ padding: "10px" }}>Status</th>
              </tr>
              <tr>
                <td style={{ padding: "10px", textAlign: "center" }}>1</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {uniqueDate}
                </td>

                <td style={{ padding: "10px" }}>
                  <InputNumber
                    type="number"
                    step={0.1}
                    disabled={!isEditable}
                    onBlur={(e) => {
                      const value = e.target.value; // Get value on blur
                      const numericValue = Number(value);

                      // Validate input is a number
                      if (!isNaN(numericValue) && isFinite(numericValue)) {
                        // Check if the value is strictly between 35 and 37
                        if (numericValue >= 35 && numericValue <= 37) {
                          handleChange("setTemperature", numericValue); // Update only if valid
                        } else {
                          handleChange("setTemperature", null); // Clear the field if out of range
                          message.error("Set Temperature Range from 35 to 37");
                        }
                      } else {
                        handleChange("setTemperature", null); // Clear the field if invalid
                      }
                    }}
                    value={formValues.setTemperature} // Bind value to formValues state
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td style={{ padding: "10px" }}>
                  <InputNumber
                    type="number"
                    step={0.1}
                    disabled={!isEditable}
                    onBlur={(e) => {
                      const value = e.target.value; // Get value on blur
                      const numericValue = Number(value);

                      // Validate input is a number
                      if (!isNaN(numericValue) && isFinite(numericValue)) {
                        // Check if the value is strictly between 35 and 37
                        if (numericValue >= 35 && numericValue <= 37) {
                          handleChange("obserevedTemperature", numericValue); // Update only if valid
                        } else {
                          handleChange("obserevedTemperature", null); // Clear the field if out of range
                          message.error(
                            "Observed Temperature Range from 35 to 37"
                          );
                        }
                      } else {
                        handleChange("obserevedTemperature", null); // Clear the field if invalid
                      }
                    }}
                    value={formValues.obserevedTemperature} // Bind value to formValues state
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td colSpan="7" style={{ padding: "10px" }}>
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
      key: 2,
      label: <p>Review</p>,
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
                Checked By:
              </td>
              <td
                colSpan="12"
                style={{
                  textAlign: "center",
                }}
              >
                verified By:
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
                {selectedRow?.microbiologist_status ===
                  "MICROBIOLOGIST_APPROVED" && (
                  <>
                    {getImage3 && (
                      <img
                        className="signature"
                        src={getImage3}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.microbiologist_sign}
                    <br />
                    {formattedMicroDate}
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
                {(selectedRow?.manager_status === "QC_REJECTED" ||
                  selectedRow?.manager_status === "QC_APPROVED" ||
                  selectedRow?.manager_status === "QA_REJECTED" ||
                  selectedRow?.manager_status === "QA_APPROVED") && (
                  <>
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Manager Sign"
                      />
                    )}
                    <br />

                    {selectedRow && selectedRow.manager_submit_by}
                    <br />
                    {formattedManagerDate}
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
    <div style={{ display: "flex", flexDirection: "column" }}>
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
                    // display: submitBtnStatus ? "block" : "none",
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

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Input
          addonBefore="date"
          placeholder="date"
          value={uniqueDate}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="EQ.id"
          placeholder="EQ.id"
          value={uniqueEqNo}
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
          width: "100%",
          position: "relative",
          left: "2%",
        }}
      />
    </div>
  );
};

export default PHQCL01F012;
