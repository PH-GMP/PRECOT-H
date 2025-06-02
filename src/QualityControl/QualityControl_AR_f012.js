import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Tabs, Button, Select, Input, Tooltip, message, Modal } from "antd";
import { FaLock, FaTrash } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import moment from "moment";

const QualityControlARF012 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, entryDate, selectedMonth, selectedYear } =
    location.state || {};
  const [mainId, setMainId] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [disable, setDisable] = useState(true);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [approveRejectBtnStatus, setApproveRejectBtnStatus] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const { confirm } = Modal;
  const roleauth = localStorage.getItem("role");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [open, setOpen] = useState(false);
  const initialized = useRef(false);

  const token = localStorage.getItem("token");

  const [uniqueMonth, setUniqueMonth] = useState("");
  const [uniqueYear, setUniqueYear] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      console.log(
        "selectedDate,selectedMonth",
        selectedYear,
        selectedMonth,
        selectedDate
      );

      const fetchData = (date) => {
        console.log("date", date);
        const token = localStorage.getItem("token");
        axios
          .get(
            `${    API.prodUrl}/Precot/api/qc/DistilledWaterAnalysisReportARF012/GetByDateMonthYear?date=${date}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "json",
            }
          )
          .then((response) => {
            // console.log("GET API Response:", response.data);
            if (response.data) {
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

              const username2 = response.data[0]?.qc_submit_by;
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

              if (roleauth === "QA_MANAGER" || roleauth === "QC_MANAGER") {
                if (
                  (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
                    response.data[0]?.qc_status === "QC_REJECTED") ||
                  (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
                    response.data[0]?.qc_status === "QA_REJECTED")
                ) {
                  message.warning("Chemist Not Yet Approved");
                  setTimeout(() => {
                    navigate("/Precot/QualityControl/AR_F-012/Summary");
                  }, 1500);
                }
              }

              const data = response.data[0];
              setMainId(data.id);
              setFormValues({
                date: data.date || selectedDate,
                analyticalRequestNumber: data.analyticalRequestNo,
                ph: data.ph,
                turbidity: data.turbidityInNtu,
                totalDissolvedSolids: data.totalDissolvedSolidsInPpm,
                hardnessPPM: data.hardnessInPpm,
                remarks: data.remark,
              });
            } else {
              setFormValues({
                date: selectedDate,
                month: selectedMonth || uniqueMonth,
                year: selectedYear || uniqueYear,
                analyticalRequestNumber: "",
                ph: "",
                turbidity: "",
                totalDissolvedSolids: "",
                hardnessPPM: "",
                remarks: "",
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };
      if (entryDate) {
        fetchData(entryDate);
      } else if (selectedDate) {
        fetchData(selectedDate);
      }
    }
  }, [entryDate, selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate); // Convert string to Date object

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

      // Set the states for month and year
      setUniqueYear(year);
      setUniqueMonth(monthNames[monthNumber]);
    }
  }, [selectedDate]);

  const determineDate = () => {
    return formatDate(entryDate || selectedDate);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [formValues, setFormValues] = useState({
    date: determineDate(),
    month: selectedMonth || uniqueMonth,
    year: selectedYear || uniqueYear,
    analyticalRequestNumber: "",
    ph: "",
    turbidity: "",
    totalDissolvedSolids: "",
    remarks: "",
  });

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    console.log(mainId);
    setSaveLoading(true);

    const payload = {
      id: mainId || "",
      formatNo: "PH-QCL01-AR-F-012",
      revisionNo: "01",
      formatName: "Distilled Water Analysis Report",
      refSopNo: "PH-QCL01-D-05",
      date: selectedDate || entryDate, // Format the date based on the state or context
      month: selectedMonth || uniqueMonth,
      year: selectedYear || uniqueYear,
      sno: 1,
      analyticalRequestNo:  (formValues.analyticalRequestNumber),
      ph: parseFloat(formValues.ph),
      turbidityInNtu: parseFloat(formValues.turbidity),
      totalDissolvedSolidsInPpm: parseFloat(formValues.totalDissolvedSolids),
      hardnessInPpm: parseFloat(formValues.hardnessPPM),
      remark: formValues.remarks,
    };

    console.log("payload", payload);

    const token = localStorage.getItem("token");

    try {
      // Sending the payload to the API using axios
      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SaveDistilledWaterAnalysisReportARF012`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Report saved successfully:", response.data);
      message.success("Distilled Water Analysis Report Saved Successfully..");
      setSaveLoading(false);
      navigate("/Precot/QualityControl/AR_F-012/Summary");
    } catch (error) {
      setSaveLoading(false);
      // Handle error (e.g., show an error message)
      console.error("Error saving report:", error);
      message.error(error.response?.data?.message || "Failed to save report");
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    // Check if all required fields are empty
    const allFieldsEmpty =
      !formValues.analyticalRequestNumber &&
      !formValues.ph &&
      !formValues.turbidity &&
      !formValues.totalDissolvedSolids &&
      !formValues.hardnessPPM &&
      !formValues.remarks?.trim();

    if (allFieldsEmpty) {
      message.error("No fields entered.");
      setSubmitLoading(false);
      return;
    }

    // Validate individual fields
    if (!formValues.analyticalRequestNumber) {
      message.error("Please enter Analytical Reference Number.");
      setSubmitLoading(false);
      return;
    }

    if (!formValues.ph) {
      message.error("Please enter a pH value.");
      setSubmitLoading(false);
      return;
    }

    if (!formValues.turbidity) {
      message.error("Please enter Turbidity value.");
      setSubmitLoading(false);
      return;
    }

    if (!formValues.totalDissolvedSolids) {
      message.error("Please enter Total Dissolved Solids value.");
      setSubmitLoading(false);
      return;
    }

    if (!formValues.hardnessPPM) {
      message.error("Please enter Hardness (PPM) value.");
      setSubmitLoading(false);
      return;
    }

    const payload = {
      id: mainId || "",
      formatNo: "PH-QCL01-AR-F-012",
      revisionNo: "01",
      formatName: "Distilled Water Analysis Report",
      refSopNo: "PH-QCL01-D-05",
      date: selectedDate || entryDate, // Format the date based on the state or context
      month: selectedMonth || uniqueMonth,
      year: selectedYear || uniqueYear,
      sno: 1,
      analyticalRequestNo:  (formValues.analyticalRequestNumber) || 0,
      ph: parseFloat(formValues.ph) || 0,
      turbidityInNtu: parseFloat(formValues.turbidity) || 0,
      totalDissolvedSolidsInPpm:
        parseFloat(formValues.totalDissolvedSolids) || 0,
      hardnessInPpm: parseFloat(formValues.hardnessPPM) || 0,
      remark: formValues.remarks?.trim() || "N/A",
    };

    const token = localStorage.getItem("token");
    try {
      // Sending the payload to the API using axios
      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SubmitDistilledWaterAnalysisReportARF012`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Report submit successfully:", response.data);
      message.success(
        "Distilled Water Analysis Report Submitted Successfully.."
      );
      setSubmitLoading(false);
      navigate("/Precot/QualityControl/AR_F-012/Summary");
    } catch (error) {
      // Handle error (e.g., show an error message)
      setSubmitLoading(false);
      message.error(error.response.data.message);
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
        `${    API.prodUrl}/Precot/api/qc/ApproveDistilledWaterAnalysisARF012`,
        {
          id: mainId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("res in approve", res);
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/AR_F-012/Summary");
      })
      .catch((err) => {
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
        `${    API.prodUrl}/Precot/api/qc/ApproveDistilledWaterAnalysisARF012`,
        {
          id: mainId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage reject", res.data.message);
        setSubmitLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/AR_F-012/Summary");
      })
      .catch((err) => {
        // console.log("Err in reject", err.response.data.message);
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
          selectedRow.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.qc_status === "QC_APPROVED") ||
        (selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow.qc_status === "QA_APPROVED")
      );
    } else if (roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER") {
      return !(
        (selectedRow &&
          selectedRow.chemist_status === "CHEMIST_APPROVED" &&
          (selectedRow.qc_status === "WAITING_FOR_APPROVAL" ||
            selectedRow.qc_status === "QC_REJECTED" ||
            selectedRow.qc_status === "QC_APPROVED" ||
            selectedRow.qc_status === "QA_REJECTED" ||
            selectedRow.qc_status === "QA_APPROVED")) ||
        selectedRow.chemist_status === "CHEMIST_SAVED"
      );
    } else {
      return false;
    }
  };

  const isEditable = canEdit();

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
          selectedRow?.qc_status === "QA_REJECTED")
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
          selectedRow?.qc_status === "QA_APPROVED")
      ) {
        return "none";
      } else if (
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED")
      ) {
        return "block";
      }
    } else if (roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER") {
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
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "CHEMIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        selectedRow.chemist_status === "CHEMIST_SAVED"
      ) {
        return "none";
      }
    }
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/AR_F-012/Summary");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Distilled Water Analysis Report</b>
        </p>
      ),
      children: (
        <div>
          <div>
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
                  >
                    S.No
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Date
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Analytical Reference Number{" "}
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    pH (Std. 5 - 7)
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Turbidity in NTU {"(Std. < 0.5)"}
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Total Dissolved Solids in PPM {"(Std. < 10)"}
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    hardness in PPM {"(Std. < 10)"}
                  </th>
                  {/* <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Checked By
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Approved By
                  </th> */}
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ border: "1px solid black" }}>
                  <td style={{ padding: "10px", textAlign: "center" }}>1</td>
                  <td className="date" style={{ textAlign: "center" }}>
                    <div>{formatDate(formValues.date)}</div>
                  </td>
                  <td style={{ padding: "10px" }} className="date">
                    <Input
                      type="text"
                      value={formValues.analyticalRequestNumber}
                      disabled={!isEditable}
                      onChange={(e) =>
                        handleInputChange(
                          "analyticalRequestNumber",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="PH_No" style={{ padding: "10px" }}>
                    <Input
                      type="number"
                      step="0.1"
                      disabled={!isEditable}
                      value={formValues.ph}
                      min={0}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 5.0 || value > 7.0) {
                          message.error("PH value must be between 5.0 and 7.0");
                        }
                      }}
                      onChange={(e) => handleInputChange("ph", e.target.value)}
                    />
                  </td>
                  <td className="Turbidity" style={{ padding: "10px" }}>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={!isEditable}
                      value={formValues.turbidity}
                      min={0}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 0.0 || value > 0.49) {
                          message.error(
                            "Turbidity must be between 0.0 and 0.49"
                          );
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange("turbidity", e.target.value)
                      }
                    />
                  </td>
                  <td className="Tot_solids_PPM" style={{ padding: "10px" }}>
                    <Input
                      type="number"
                      step="0.1"
                      value={formValues.totalDissolvedSolids}
                      disabled={!isEditable}
                      min={0}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 0.0 || value > 9.9) {
                          message.error(
                            "Total Solids PPM must be between 0.0 and 9.9"
                          );
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          "totalDissolvedSolids",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="hardnessPPM_PPM" style={{ padding: "10px" }}>
                    <Input
                      type="number"
                      step="0.1"
                      value={formValues.hardnessPPM}
                      disabled={!isEditable}
                      min={0}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 0.0 || value > 9.9) {
                          message.error(
                            "hardnessPPM PPM must be between 0.0 and 9.9"
                          );
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange("hardnessPPM", e.target.value)
                      }
                    />
                  </td>

                  <td className="remarks" style={{ padding: "10px" }}>
                    <Input
                      type="text"
                      value={formValues.remarks}
                      disabled={!isEditable}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleInputChange("remarks", value); // Valid input
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
                <b>Reviewed by QC Manager or QA Manager Sign & Date</b>
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
                {(selectedRow?.qc_status === "QC_REJECTED" ||
                  selectedRow?.qc_status === "QC_APPROVED" ||
                  selectedRow?.qc_status === "QA_REJECTED" ||
                  selectedRow?.qc_status === "QA_APPROVED") && (
                  <>
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow?.qc_submit_by}
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="Distilled Water Analysis Report"
        formatNo="PH-QCL01-AR-F-012"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER" ? (
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
          // <Button
          //   type="primary"
          //   style={{
          //     backgroundColor: "#E5EEF9",
          //     color: "#00308F",
          //     fontWeight: "bold",
          //   }}
          //   shape="round"
          //   icon={<BiLock color="#00308F" />}
          //   onClick={() => {
          //     if (confirm("Are you sure want to logout")) {
          //       localStorage.removeItem("token");
          //       navigate("/Precot");
          //     }
          //   }}
          // >
          //   Logout
          // </Button>,
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

export default QualityControlARF012;
