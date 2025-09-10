import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
import API from "../baseUrl.json";

const QualityAssurance_f047 = () => {
  const location = useLocation();
  const { uniqueBMR, uniqueDep } = location.state || {};
  const navigate = useNavigate();
  const [mainID, setMainID] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const roleauth = localStorage.getItem("role");
  const initialized = useRef(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  const [formValues, setFormValues] = useState({
    date: "",
    department: uniqueDep,
    year: "",
    month: "",
    bmrNumber: uniqueBMR,
    productName: "",
    productCode: "",
    batchNo: "",
    mfgDate: "",
    expiryDate: "",
    batchStartOn: "",
    batchSubmittedOn: "",
    specialTreatment: "",

    //qc
    finishedProductSampled: "",
    testedForEP: "",
    descriptionAndPhysicalParameters: "",
    completeAnalysisDone: "",
    calculationsChecked: "",
    retainSamplesKept: "",
    qcChemistName: "",

    //qa
    bmrHandedOver: "",
    lineClearances: "",
    materialPacked: "",
    packingLabeling: "",
    specialPackingLabeling: "",
    processDeviation: "",
    calculationsVerified: "",
    batchResult: "",
  });

  const handleChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  //date
  useEffect(() => {
    if (formValues.date) {
      const dateObj = new Date(formValues.date); // Convert string to Date object

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
  }, [formValues.date]);

  //getdata
  useEffect(() => {
    const fetchBatchReleaseData = async () => {
      if (!uniqueBMR || !uniqueDep) return; // Ensure parameters are available

      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/F047/batchrelease?bmr=${uniqueBMR}&department=${uniqueDep}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          }
        );

        if (Array.isArray(response.data) && response.data.length > 0) {
          const data = response.data[0];
          setMainID(data.test_id);
          setSelectedRow(data);

          // Log the response data to inspect the structure

          setFormValues({
            date: data.date || "",
            department: data.department || uniqueDep,
            year: data.year || "",
            month: data.month || "",
            bmrNumber: data.bmrNo || uniqueBMR,
            productName: data.prodName || "",
            productCode: data.prodCode || "",
            batchNo: data.batchNo || "",
            mfgDate: data.mfgDate || "",
            expiryDate: data.expDate || "",
            batchStartOn: data.batchStart || "",
            batchSubmittedOn: data.batchEnd || "",
            specialTreatment: data.specialTreatment || "",
            // QC Fields
            finishedProductSampled: data.sampledPerSop || "",
            testedForEP: data.testedEp || "",
            descriptionAndPhysicalParameters: data.descPhysParams || "",
            completeAnalysisDone: data.analysisDone || "",
            calculationsChecked: data.calcChecked || "",
            retainSamplesKept: data.retainSamples || "",
            qcChemistName: data.doneByQc || "",
            // QA Fields (Ensure these keys exist in the response)
            bmrHandedOver: data.bmrToQa || "",
            lineClearances: data.lineClearanceQa || "",
            materialPacked: data.packedPerPds || "",
            packingLabeling: data.stdPackLabel || "",
            specialPackingLabeling: data.specPackLabel || "",
            processDeviation: data.processDeviation || "",
            calculationsVerified: data.calcVerified || "",
            batchResult: data.batchresult || "",
          });

          if (roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") {
            if (data && data?.qc_status === "QC_REJECTED") {
              message.warning("QA Inspector or Chemist Not Yet Approved");
              setTimeout(() => {
                navigate("/Precot/QA/QA_F047_Summary");
              }, 1500);
            }
          }

          const username = response.data[0]?.ins_sign;

          //getImage
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
              //
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
              //
            });

          const username2 = response.data[0]?.qc_sign_b;

          //getImage

          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              //
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
              //
            });

          const username3 = response.data[0]?.qc_sign;

          //getImage

          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username3}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              //
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
              //
            });
        }
      } catch (error) {
        console.error("Error fetching batch release data:", error);
        message.error("Failed to fetch batch release data. Please try again.");
      }
    };

    if (!initialized.current) {
      initialized.current = true;
      fetchBatchReleaseData();
    }
  }, [uniqueBMR, uniqueDep, token]);

  const handleSave = async () => {
    setSaveLoading(true);

    // Prepare the payload using data from formValues
    const payload = {
      test_id: mainID,
      format: "BATCH RELEASE CHECKLIST",
      format_no: "PH-QAD01/F-047",
      ref_sop_no: "PH-QAD01-D-43",
      bmrNo: formValues.bmrNumber,
      prodName: formValues.productName,
      department: formValues.department,
      date: formValues.date,
      month: formValues.month,
      year: formValues.year,
      prodCode: formValues.productCode,
      batchNo: formValues.batchNo,
      mfgDate: formValues.mfgDate,
      expDate: formValues.expiryDate,
      batchStart: formValues.batchStartOn,
      batchEnd: formValues.batchSubmittedOn,
      specialTreatment: formValues.specialTreatment,

      // QC fields
      sampledPerSop: formValues.finishedProductSampled,
      testedEp: formValues.testedForEP,
      descPhysParams: formValues.descriptionAndPhysicalParameters,
      analysisDone: formValues.completeAnalysisDone,
      calcChecked: formValues.calculationsChecked,
      retainSamples: formValues.retainSamplesKept,
      doneByQc: formValues.qcChemistName,

      // QA fields
      bmrToQa: formValues.bmrHandedOver,
      lineClearanceQa: formValues.lineClearances,
      packedPerPds: formValues.materialPacked,
      stdPackLabel: formValues.packingLabeling,
      specPackLabel: formValues.specialPackingLabeling,
      processDeviation: formValues.processDeviation,
      calcVerified: formValues.calculationsVerified,
      batchresult: formValues.batchResult,
    };

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/F047/savebatchcheckList`, // Replace with the actual API endpoint
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add authorization if required
          },
        }
      );

      message.success("BATCH RELEASE CHECKLIST saved successfully!");
      setSaveLoading(false);
      navigate("/Precot/QA/QA_F047_Summary");
    } catch (error) {
      setSaveLoading(false);
      console.error("Error saving data:", error);
      message.error("Failed to save data. Please try again.");
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    // Set up validation based on roleauth
    const errors = [];

    // Validate QC fields if roleauth is "ROLE_CHEMIST"
    if (roleauth === "ROLE_CHEMIST") {
      if (!formValues.finishedProductSampled)
        errors.push("Sampled per SOP is required.");
      if (!formValues.testedForEP) errors.push("Tested for EP is required.");
      if (!formValues.descriptionAndPhysicalParameters)
        errors.push("Description and Physical Parameters are required.");
      if (!formValues.completeAnalysisDone)
        errors.push("Complete Analysis is required.");
      if (!formValues.calculationsChecked)
        errors.push("Calculations Checked is required.");
      if (!formValues.retainSamplesKept)
        errors.push("Retain Samples is required.");
      if (!formValues.qcChemistName.trim())
        errors.push("QC Chemist Name is required.");
    }
    // Validate QA fields if roleauth is not "ROLE_CHEMIST"
    else {
      if (!formValues.bmrNumber) errors.push("BMR Number is required.");
      if (!formValues.department) errors.push("Department is required.");
      if (!formValues.date) errors.push("Date is required.");
      if (!formValues.mfgDate.trim())
        errors.push("Manufacturing Date is required.");
      if (!formValues.expiryDate.trim())
        errors.push("Expiry Date is required.");

      if (!formValues.specialTreatment.trim())
        errors.push("Special Treatment is required.");
      if (!formValues.bmrHandedOver)
        errors.push("BMR Handed Over is required.");
      if (!formValues.lineClearances)
        errors.push("Line Clearances are required.");
      if (!formValues.materialPacked)
        errors.push("Material Packed is required.");
      if (!formValues.packingLabeling)
        errors.push("Standard Packing Labeling is required.");
      if (!formValues.specialPackingLabeling)
        errors.push("Special Packing Labeling is required.");
      if (!formValues.processDeviation)
        errors.push("Process Deviation is required.");
      if (!formValues.calculationsVerified)
        errors.push("Calculations Verified is required.");
      if (!formValues.batchResult) errors.push("Batch Result is required.");
    }

    // If there are any errors, show them and stop the submission
    if (errors.length > 0) {
      errors.forEach((error) => message.error(error));
      setSubmitLoading(false);
      return;
    }

    // Prepare the payload using data from formValues
    const payload = {
      test_id: mainID,
      format: "BATCH RELEASE CHECKLIST",
      format_no: "PH-QAD01/F-047",
      ref_sop_no: "PH-QAD01-D-43",
      department: formValues.department || "N/A",
      bmrNo: formValues.bmrNumber || "N/A",
      prodName: formValues.productName || "N/A",
      prodCode: formValues.productCode || "N/A",
      batchNo: formValues.batchNo || "N/A",
      month: formValues.month || "N/A",
      year: formValues.year || "N/A",
      batchStart: formValues.batchStartOn || "N/A",
      batchEnd: formValues.batchSubmittedOn || "N/A",
      date: formValues.date || "N/A",
      mfgDate: formValues.mfgDate || "N/A",
      expDate: formValues.expiryDate || "N/A",
      specialTreatment: formValues.specialTreatment || "N/A",

      // QA fields
      bmrToQa: formValues.bmrHandedOver || "N/A",
      lineClearanceQa: formValues.lineClearances || "N/A",
      packedPerPds: formValues.materialPacked || "N/A",
      stdPackLabel: formValues.packingLabeling || "N/A",
      specPackLabel: formValues.specialPackingLabeling || "N/A",
      processDeviation: formValues.processDeviation || "N/A",
      calcVerified: formValues.calculationsVerified || "N/A",
      batchresult: formValues.batchResult || "N/A",

      // Only include QC fields for ROLE_CHEMIST
      sampledPerSop: formValues.finishedProductSampled,
      testedEp: formValues.testedForEP,
      descPhysParams: formValues.descriptionAndPhysicalParameters,
      analysisDone: formValues.completeAnalysisDone,
      calcChecked: formValues.calculationsChecked,
      retainSamples: formValues.retainSamplesKept,
      doneByQc: formValues.qcChemistName,

      // Conditional Payload Fields
      ...(roleauth === "ROLE_CHEMIST" && {
        test_id: mainID,
        // Only include QC fields for ROLE_CHEMIST
        sampledPerSop: formValues.finishedProductSampled || "N/A",
        testedEp: formValues.testedForEP || "N/A",
        descPhysParams: formValues.descriptionAndPhysicalParameters || "N/A",
        analysisDone: formValues.completeAnalysisDone || "N/A",
        calcChecked: formValues.calculationsChecked || "N/A",
        retainSamples: formValues.retainSamplesKept || "N/A",
        doneByQc: formValues.qcChemistName || "N/A",
      }),
    };

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/F047/submitbatchcheckList`, // Replace with the actual API endpoint
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add authorization if required
          },
        }
      );

      message.success("BATCH RELEASE CHECKLIST submitted successfully!");
      setSubmitLoading(false);
      navigate("/Precot/QA/QA_F047_Summary");
    } catch (error) {
      setSubmitLoading(false);
      console.error("Error saving data:", error);
      message.error("Failed to save data. Please try again.");
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
      .post(
        `${API.prodUrl}/Precot/api/QA/F047/approval`,
        {
          id: mainID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        //
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QA/QA_F047_Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        //
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    //
  };

  const handleReject = async () => {
    setSubmitLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .post(
        `${API.prodUrl}/Precot/api/QA/F047/approval`,
        {
          id: mainID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        //
        setSubmitLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QA/QA_F047_Summary");
      })
      .catch((err) => {
        //
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const canEdit = () => {
    if (roleauth === "ROLE_QA") {
      return !(
        selectedRow.ins_status === "QA_INSPECTOR_SUBMITTED" &&
        (selectedRow.qc_status === "QC_APPROVED" ||
          selectedRow.qc_status === "WAITING_FOR_APPROVAL")
      );
    } else if (roleauth === "ROLE_CHEMIST") {
      return !(
        selectedRow &&
        selectedRow.qc_status_b === "CHEMIST_APPROVED" &&
        (selectedRow.qc_status === "QC_APPROVED" ||
          selectedRow.qc_status === "WAITING_FOR_APPROVAL")
      );
    } else if (roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") {
      return !(
        selectedRow &&
        (selectedRow.ins_status === "QA_INSPECTOR_SUBMITTED" ||
          selectedRow.qc_status_b === "CHEMIST_APPROVED" ||
          selectedRow.qc_status === "QC_APPROVED" ||
          selectedRow.qc_status === "QC_REJECTED")
      );
    } else {
      return false;
    }
  };

  let isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_QA") {
      if (selectedRow.ins_status === "QA_INSPECTOR_SUBMITTED") {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") {
      if (
        selectedRow &&
        (selectedRow?.qc_status === "QC_APPROVED" ||
          selectedRow?.qc_status === "QC_REJECTED")
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "ROLE_QA") {
      if (
        selectedRow.ins_status === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow.qc_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "ROLE_CHEMIST") {
      if (
        selectedRow &&
        selectedRow.qc_status_b === "CHEMIST_APPROVED" &&
        selectedRow.qc_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  let formattedInsDate;
  if (selectedRow.ins_submit_on) {
    formattedInsDate = moment(selectedRow.ins_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedInsDate = ""; // Or any other default value or error handling
  }

  let formattedChemistDate;
  if (selectedRow.qc_submit_on_b) {
    formattedChemistDate = moment(selectedRow.qc_submit_on_b).format(
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

  const handleBack = () => {
    navigate("/Precot/QA/QA_F047_Summary");
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>BATCH RELEASE CHECKLIST DETAILS</b>
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
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    Date:{" "}
                    <Input
                      type="date"
                      style={{ width: "150px" }}
                      max={getCurrentDate()}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      value={formValues.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                    />
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Department: {formValues.department}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    S. No.
                  </th>
                  <th
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Particulars
                  </th>
                  <th
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    Status
                  </th>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    1
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    BMR Number
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    {formValues.bmrNumber}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    2
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Product Name
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    {formValues.productName}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    3
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Product code
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    {formValues.productCode}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    4
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Batch No./Lot No.
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    {formValues.batchNo}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    5
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Mfg. Date
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Input
                      type="date"
                      name="mfgDate"
                      value={formValues.mfgDate}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      onChange={(e) => handleChange("mfgDate", e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    6
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Expiry Date
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Input
                      type="date"
                      name="expiryDate"
                      value={formValues.expiryDate}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      onChange={(e) =>
                        handleChange("expiryDate", e.target.value)
                      }
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    7
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Batch started on
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    {formValues.batchStartOn}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    8
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Batch completed on
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    {formValues.batchSubmittedOn}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    9
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Any Special treatment done
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Input
                      type="text"
                      name="specialTreatment"
                      value={formValues.specialTreatment}
                      onChange={(e) =>
                        handleChange("specialTreatment", e.target.value)
                      }
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      onKeyDown={(e) => {
                        const isAlphanumeric = /^[a-zA-Z0-9]$/;
                        // Check if the pressed key is not valid
                        if (
                          !isAlphanumeric.test(e.key) &&
                          ![
                            "Backspace",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                            "_",
                            " ",
                          ].includes(e.key)
                        ) {
                          e.preventDefault(); // Prevent the default action (character input)
                        }
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
          <b>TO BE COMPLETED BY QUALITY CONTROL</b>
        </p>
      ),
      children: (
        <div>
          <div>
            <table
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
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    1
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Finished product sampled as per SOP
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Select
                      style={{ width: "180px" }}
                      value={formValues.finishedProductSampled}
                      onChange={(value) =>
                        handleChange("finishedProductSampled", value)
                      }
                      disabled={roleauth !== "ROLE_CHEMIST" || !isEditable}
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    2
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Tested for EP
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Select
                      style={{ width: "180px" }}
                      value={formValues.testedForEP}
                      onChange={(value) => handleChange("testedForEP", value)}
                      disabled={roleauth !== "ROLE_CHEMIST" || !isEditable}
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    3
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Description and physical parameters
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Select
                      style={{ width: "180px" }}
                      value={formValues.descriptionAndPhysicalParameters}
                      onChange={(value) =>
                        handleChange("descriptionAndPhysicalParameters", value)
                      }
                      disabled={roleauth !== "ROLE_CHEMIST" || !isEditable}
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    4
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Complete analysis done as per specification
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Select
                      style={{ width: "180px" }}
                      value={formValues.completeAnalysisDone}
                      onChange={(value) =>
                        handleChange("completeAnalysisDone", value)
                      }
                      disabled={roleauth !== "ROLE_CHEMIST" || !isEditable}
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    5
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    All calculations are checked and verified
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Select
                      style={{ width: "180px" }}
                      value={formValues.calculationsChecked}
                      onChange={(value) =>
                        handleChange("calculationsChecked", value)
                      }
                      disabled={roleauth !== "ROLE_CHEMIST" || !isEditable}
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    6
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Retain samples are kept
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Select
                      style={{ width: "180px" }}
                      value={formValues.retainSamplesKept}
                      onChange={(value) =>
                        handleChange("retainSamplesKept", value)
                      }
                      disabled={roleauth !== "ROLE_CHEMIST" || !isEditable}
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={1}
                  >
                    7
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={5}
                  >
                    Done by (QC Chemist)
                  </td>
                  <td
                    style={{ padding: "10px", textAlign: "start" }}
                    colSpan={4}
                  >
                    <Input
                      disabled={roleauth !== "ROLE_CHEMIST" || !isEditable}
                      type="text"
                      value={formValues.qcChemistName}
                      onChange={(e) =>
                        handleChange("qcChemistName", e.target.value)
                      }
                      onKeyDown={(e) => {
                        const isAlphanumeric = /^[a-zA-Z0-9]$/;
                        // Check if the pressed key is not valid
                        if (
                          !isAlphanumeric.test(e.key) &&
                          ![
                            "Backspace",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                            "_",
                            " ",
                          ].includes(e.key)
                        ) {
                          e.preventDefault(); // Prevent the default action (character input)
                        }
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
      key: "3",
      label: (
        <p>
          <b>TO BE COMPLETED BY QUALITY ASSURANCE</b>
        </p>
      ),
      children: (
        <div>
          <div>
            <table
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
                  <td
                    colSpan={1}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    1
                  </td>
                  <td
                    colSpan={5}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    BMR handed over to QA
                  </td>
                  <td
                    colSpan={4}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    <Select
                      style={{ width: "180px" }}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      value={formValues.bmrHandedOver}
                      onChange={(value) => handleChange("bmrHandedOver", value)}
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={1}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    2
                  </td>
                  <td
                    colSpan={5}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    Line clearances are given by QA
                  </td>
                  <td
                    colSpan={4}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    <Select
                      style={{ width: "180px" }}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      onChange={(value) =>
                        handleChange("lineClearances", value)
                      }
                      value={formValues.lineClearances}
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={1}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    3
                  </td>
                  <td
                    colSpan={5}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    Material packed as per PDS
                  </td>
                  <td
                    colSpan={4}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    <Select
                      style={{ width: "180px" }}
                      value={formValues.materialPacked}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      onChange={(value) =>
                        handleChange("materialPacked", value)
                      }
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={1}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    4
                  </td>
                  <td
                    colSpan={5}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    Packing and Labeling as per standard
                  </td>
                  <td
                    colSpan={4}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    <Select
                      style={{ width: "180px" }}
                      value={formValues.packingLabeling}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      onChange={(value) =>
                        handleChange("packingLabeling", value)
                      }
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={1}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    5
                  </td>
                  <td
                    colSpan={5}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    Special packing/labeling as per Customer
                  </td>
                  <td
                    colSpan={4}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    <Select
                      style={{ width: "180px" }}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      value={formValues.specialPackingLabeling}
                      onChange={(value) =>
                        handleChange("specialPackingLabeling", value)
                      }
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={1}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    6
                  </td>
                  <td
                    colSpan={5}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    Any deviation in the process
                  </td>
                  <td
                    colSpan={4}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    <Select
                      style={{ width: "180px" }}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      value={formValues.processDeviation}
                      onChange={(value) =>
                        handleChange("processDeviation", value)
                      }
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={1}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    7
                  </td>
                  <td
                    colSpan={5}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    All calculations are checked and verified
                  </td>
                  <td
                    colSpan={4}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    <Select
                      style={{ width: "180px" }}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      value={formValues.calculationsVerified}
                      onChange={(value) =>
                        handleChange("calculationsVerified", value)
                      }
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan={10}
                    style={{ padding: "10px", textAlign: "start" }}
                  >
                    Result: This batch is
                    <Select
                      style={{ width: "180px", padding: "0px 10px" }}
                      disabled={roleauth !== "ROLE_QA" || !isEditable}
                      onChange={(value) => handleChange("batchResult", value)}
                      value={formValues.batchResult}
                    >
                      <Select.Option value="Cleared">Cleared</Select.Option>
                      <Select.Option value="Not Cleared">
                        Not Cleared
                      </Select.Option>
                    </Select>
                    for sale.
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
                <b>Checked by QA Inspector Sign & Date</b>
              </td>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Checked by Chemist Sign & Date</b>
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>Approved by QA Manager or Designee Sign & Date</b>
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
                {selectedRow?.ins_status === "QA_INSPECTOR_SUBMITTED" && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.ins_sign}
                    <br />
                    {formattedInsDate}
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
                {selectedRow?.qc_status_b === "CHEMIST_APPROVED" && (
                  <>
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />

                    {selectedRow && selectedRow.qc_sign_b}
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
                  selectedRow?.qc_status === "QC_APPROVED") && (
                  <>
                    {getImage3 && (
                      <img
                        className="signature"
                        src={getImage3}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />

                    {selectedRow && selectedRow.qc_sign}
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
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="BATCH RELEASE CHECKLIST"
        formatNo="PH-QAD01/F-047"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE" ? (
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
                onClick={handleRejectModal}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : roleauth === "ROLE_CHEMIST" ? (
            <Button
              loading={submitLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButtons(),
              }}
              onClick={handleSubmit}
              shape="round"
              icon={<GrDocumentStore color="#00308F" />}
            >
              &nbsp;Submit
            </Button>
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
                onClick={handleSubmit}
                shape="round"
                icon={<GrDocumentStore color="#00308F" />}
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

export default QualityAssurance_f047;
