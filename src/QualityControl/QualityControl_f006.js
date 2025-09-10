import React from "react";
import { useState, useEffect, useRef } from "react";
import { Button, Input, Tabs, Tooltip, message, Modal } from "antd";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import { IoSave } from "react-icons/io5";
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

const QualityControlF006 = () => {
  const location = useLocation();
  const { uniqueDate, uniqueEqNo } = location.state || {};
  const navigate = useNavigate();
  const [mainID, setMainID] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const roleauth = localStorage.getItem("role");
  const chemistName = localStorage.getItem("username");
  console.log(typeof chemistName);
  const initialized = useRef(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [open, setOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    date: uniqueDate,
    eqno: uniqueEqNo,
    month: "",
    year: "",
    bufferSolutionReadingOne: "",
    bufferSolutionReadingTwo: "",
    bufferSolutionReadingThree: "",
    remarks: "",
  });

  const handleInputChange = (fieldName, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    console.log("uniqueDate", uniqueDate);
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

  useEffect(() => {
    console.log(
      "uniqueDate, uniqueEqNo,month,year",
      uniqueDate,
      uniqueEqNo,
      formValues.month,
      formValues.year
    );

    if (uniqueDate && formValues.month && formValues.year && uniqueEqNo) {
      if (!initialized.current) {
        initialized.current = true;
        console.log("chemistName", chemistName);
        const fetchData = async () => {
          const token = localStorage.getItem("token");

          try {
            const response = await axios.get(
              `${   API.prodUrl}/Precot/api/qc/PhMeterCalibrationReportF006/GetByDateMonthYearEqNo?date=${formValues.date}&eqIdNo=${formValues.eqno}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                responseType: "json",
              }
            );

            if (Array.isArray(response.data) && response.data.length > 0) {
              console.log("enterd to repse there section");
              setMainID(response.data[0].id);

              setSelectedRow(response.data[0]);

              const username = response.data[0]?.chemist_sign;
              console.log("username", username);
              //getImage
              axios
                .get(
                  `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
                  `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
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
                    navigate("/Precot/QualityControl/F-006/Summary");
                  }, 1500);
                }
              }

              // Update formValues with the fetched data
              setFormValues((prevValues) => ({
                ...prevValues,
                date: response.data[0].date, // Ensure date is set
                eqno: response.data[0].eqIdNo, // Ensure eqno is set
                month: response.data[0].month || "",
                year: response.data[0].year || "",
                bufferSolutionReadingOne: response.data[0].obsr1 || "",
                bufferSolutionReadingTwo: response.data[0].obsr2 || "",
                bufferSolutionReadingThree: response.data[0].obsr3 || "",
                remarks: response.data[0].remark || "",
              }));
            }
          } catch (error) {
            console.error("Error fetching data", error);
          }
        };

        fetchData();
      }
    }
  }, [uniqueDate, formValues.month, formValues.year, uniqueEqNo]);

  const handleSave = async () => {
    // Prepare the payload
    setSaveLoading(true);
    console.log("mainid", mainID);

    const payload = {
      id: mainID || "",
      formatNo: "F006",
      formatName: "PH-QCL01/F-006",
      revisionNo: "01",
      refSopNo: "PH-QCL01-D-04",
      eqIdNo: formValues.eqno, // Using 'eqno' from formValues
      month: formValues.month, // Using 'month' from formValues
      year: formValues.year, // Using 'year' from formValues
      remark: formValues.remarks, // Using 'remarks' from formValues
      date: formValues.date, // Using 'date' from formValues
      obsr1: parseFloat(formValues.bufferSolutionReadingOne), // Using 'standardSolutionDisWater'
      obsr2: parseFloat(formValues.bufferSolutionReadingTwo), // Using 'standardSolution100NTU'
      obsr3: parseFloat(formValues.bufferSolutionReadingThree),
    };
    console.log("payload", payload);

    const token = localStorage.getItem("token");

    try {
      // Make the API call using Axios
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/qc/SavePhMeterCalibrationReportF006
          `,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("pH-Meter Calibration Report Report saved successfully!");
      console.log("Save successful:", response.data);
      setSaveLoading(false);

      navigate("/Precot/QualityControl/F-006/Summary");
    } catch (error) {
      setSaveLoading(false);
      console.error("API Error:", error);
      message.error("An error occurred while saving the report.");
    }
  };

  const handleSubmit = async () => {
    // Prepare the payload
    setSubmitLoading(true);
    console.log("mainid", mainID);

    if (
      !formValues.bufferSolutionReadingOne &&
      !formValues.bufferSolutionReadingTwo &&
      !formValues.bufferSolutionReadingThree &&
      !formValues.remarks
    ) {
      setSubmitLoading(false);
      message.error("Nothing fields are entered.");
      return; // Exit the function if validation fails
    }

    if (!formValues.bufferSolutionReadingOne) {
      setSubmitLoading(false);
      message.error("BufferSolution Reading 4.0 (±0.01) value is required.");
      return; // Exit the function if validation fails
    }

    if (!formValues.bufferSolutionReadingTwo) {
      setSubmitLoading(false);
      message.error("BufferSolution Reading 7.0 (±0.01) value is required.");
      return; // Exit the function if validation fails
    }

    if (!formValues.bufferSolutionReadingThree) {
      setSubmitLoading(false);
      message.error(
        "BufferSolution Reading 10.0 or 9.2 (±0.01) value is required."
      );
      return; // Exit the function if validation fails
    }

    const payload = {
      id: mainID || "",
      formatNo: "F006",
      formatName: "PH-QCL01/F-006",
      revisionNo: "01",
      refSopNo: "PH-QCL01-D-04",
      eqIdNo: formValues.eqno, // Using 'eqno' from formValues
      month: formValues.month, // Using 'month' from formValues
      year: formValues.year, // Using 'year' from formValues
      remark: formValues.remarks || "NA", // Using 'remarks' from formValues
      date: formValues.date, // Using 'date' from formValues
      obsr1: parseFloat(formValues.bufferSolutionReadingOne) || 0, // Using 'standardSolutionDisWater'
      obsr2: parseFloat(formValues.bufferSolutionReadingTwo) || 0, // Using 'standardSolution100NTU'
      obsr3: parseFloat(formValues.bufferSolutionReadingThree) || 0,
    };

    const token = localStorage.getItem("token");

    try {
      // Make the API call using Axios
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/qc/SubmitPhMeterCalibrationReportF006`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("pH-Meter Calibration Report submitted successfully!");
      setSubmitLoading(false);
      console.log("submit successful:", response.data);
      navigate("/Precot/QualityControl/F-006/Summary");
    } catch (error) {
      console.error("API Error:", error);
      setSubmitLoading(false);
      message.error("An error occurred while saving the report.");
    }
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

  const handleApprove = async () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios
      .put(
        `${   API.prodUrl}/Precot/api/qc/ApprovePhMeterCalibrationReportF006`,
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
        navigate("/Precot/QualityControl/F-006/Summary");
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
        `${   API.prodUrl}/Precot/api/qc/ApprovePhMeterCalibrationReportF006`,
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
        navigate("/Precot/QualityControl/F-006/Summary");
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-006/Summary");
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>pH-Meter Calibration Report Details</b>
        </p>
      ),
      children: (
        <div>
          <div>
            <div style={{ display: "flex", gap: "40px" }}>
              <div>Frequency: Daily</div>
              <div>
                Month & Year: {formValues.month} / {formValues.year}
              </div>
              <div>EQ. ID.No.: {formValues.eqno}</div>
            </div>

            <table
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
                <tr style={{ border: "1px solid black" }}>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "5%",
                    }}
                    rowSpan="3"
                  >
                    S.No
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                    rowSpan="3"
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                    colSpan={3}
                    rowSpan="1"
                  >
                    Buffer Solution
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                    rowSpan="3"
                  >
                    Remark
                  </th>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                    rowSpan="1"
                  >
                    4.0 (±0.01)
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                    rowSpan="1"
                  >
                    7.0 (±0.01)
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                    rowSpan="1"
                  >
                    10.0 or 9.2 (±0.01)
                  </th>
                </tr>
                <tr>
                  <th
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan="1"
                    colSpan={3}
                  >
                    Observed readings
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>1</td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {formatDate(formValues.date)}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <Input
                      type="number"
                      step={0.01}
                      value={formValues.bufferSolutionReadingOne}
                      onChange={(e) =>
                        handleInputChange(
                          "bufferSolutionReadingOne",
                          e.target.value
                        )
                      }
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 3.99 || value > 4.01) {
                          message.error(
                            "BufferSolution Reading 4.0 (±0.01) value must be between 3.99 and 4.01"
                          );
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      disabled={!isEditable}
                      min={0}
                    />
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <Input
                      type="number"
                      value={formValues.bufferSolutionReadingTwo}
                      onChange={(e) =>
                        handleInputChange(
                          "bufferSolutionReadingTwo",
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
                      step={0.01}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 6.99 || value > 7.01) {
                          message.error(
                            "BufferSolution Reading 7.0 (±0.01) value must be between 6.99 and 7.01"
                          );
                        }
                      }}
                    />
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <Input
                      type="number"
                      value={formValues.bufferSolutionReadingThree}
                      onChange={(e) =>
                        handleInputChange(
                          "bufferSolutionReadingThree",
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
                      step={0.01}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 9.99 || value > 10.01) {
                          message.error(
                            "BufferSolution Reading 10.0 or 9.2 (±0.01) value must be between 9.99 and 10.01"
                          );
                        }
                      }}
                    />
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <Input
                      type="text"
                      value={formValues.remarks}
                      onChange={(e) =>
                        handleInputChange("remarks", e.target.value)
                      }
                      disabled={!isEditable}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <Button
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
              // disabled={!isEditable}
              onClick={addRow}
              icon={
                <AiOutlinePlus style={{ color: "#00308F", marginRight: "1px" }} />
              }
            >
              Add Row
            </Button> */}
        </div>
      ),
    },
    {
      key: "2",
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
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="pH-Meter Calibration Report"
        formatNo="PH-QCL01/F-006"
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
    </div>
  );
};

export default QualityControlF006;
