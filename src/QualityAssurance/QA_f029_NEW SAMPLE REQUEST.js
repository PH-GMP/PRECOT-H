import { Button, Input, Select, Tabs, Tooltip, message } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f029_new_sample_request = () => { 
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { uniqueDate, uniqueReq } = location.state || {}; 
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [getImage3, setGetImage3] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [dataAvailable, setDataAvailable] = useState(false);
  const navigate = useNavigate(); 
  const handleE = (e) => {
    // Ensure e and e.key are defined
    if (e && e.key && ["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSelectText = (e) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  function formatMonthYear(uniqueDate) {
    if (!uniqueDate) {
      // Return a default value or an empty string if uniqueDate is undefined or null
      return "Unknown";
    }
    const [year, month, date] = uniqueDate.split("-");
    
    return `${year}`;
  }
  function formatMonth(uniqueDate) {
    if (!uniqueDate) {
      // Return a default value or an empty string if uniqueDate is undefined or null
      return "Unknown";
    }
    const [year, month, date] = uniqueDate.split("-");
    const months = [
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
    return `${months[parseInt(month) - 1]}`;
  }
  const payloadyear = formatMonthYear(uniqueDate);
  const payloadmonth = formatMonth(uniqueDate);

  const [formData, setFormData] = useState({
    test_id: "",
    formatName: "NEW SAMPLE REQUEST", // Dynamic value from user input
    format_no: "PH-QCL01-F-029",
    ref_sop_no: "",
    date: uniqueDate,
    month: payloadmonth,
    year: payloadyear,
    // Defaults to uniqueDate if available
    requisitionNo: "",
    sampleRequisitionPostedBy: "" || "N/A",
    remarksByUnit: "" || "N/A",
    dispatchString: "" || "N/A",
    customerName: "" || "N/A",
    productType: "" || "N/A",
    typeOfRawMaterial: "" || "N/A",
    rawMaterialCertificate: "" || "N/A",
    shape: "" || "N/A",
    widthAndLength: "" || "N/A",
    gsm: "" || "N/A",
    pattern: "" || "N/A",
    edge: "" || "N/A",
    noOfPiecesBag: "" || "N/A",
    bagType: "" || "N/A",
    noOfPacksRequired: "" || "N/A",
    customerRequirementFeedback: "" || "N/A",
    sampleCategoryForCost: "" || "N/A",
    saleOrderNo: "" || "N/A",
    referenceImage: null, // Should handle image encoding if required
    sampleReferenceNo: "" || "N/A",
    samplePreparedBy: "" || "N/A",
    sampleApprovedBy: "" || "N/A",
    sampleReceivedByAtCoOffice: "" || "N/A",
    status: "" || "N/A",
    comments: "",
    is_image_uploaded: "",
    mark_rep_status: "",
    mark_rep_saved_on: "",
    mark_rep_saved_by: "",
    mark_rep_saved_id: "",
    mark_rep_saved_on_b: "",
    mark_rep_saved_by_b: "",
    mark_rep_saved_id_b: "",
    mark_rep_submit_on: "",
    mark_rep_submit_by: "",
    mark_rep_submit_id: "",
    mark_rep_sign: "",
    mark_rep_submit_on_b: "",
    mark_rep_submit_by_b: "",
    mark_rep_submit_id_b: "",
    mark_rep_sign_b: "",
    mark_rep_status_b: "",
    qc_status: "",
    qc_submit_on: "",
    qc_submit_by: "",
    qc_submit_id: "",
    qc_sign: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image change and convert to Base64
  const handleImageChange = async (event) => {
    const { name, files } = event.target;
    if (name === "referenceImage" && files.length > 0) {
      const file = files[0];
      const base64 = await convertToBase64(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        referenceImage: base64,
      }));
    }
  };

  // Helper function to convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 part
      reader.onerror = (error) => reject(error);
    });
  };

  let formattedMarkRepDate;
  if (selectedRow?.mark_rep_submit_on) {
    formattedMarkRepDate = moment(selectedRow.mark_rep_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where mark_rep_submit_on is null or undefined
    formattedMarkRepDate = ""; // Or any other default value or error handling
  }
  // Helper function to fetch images
  const fetchImage = (username, setImageCallback) => {
    const token = localStorage.getItem("token");
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
          setImageCallback(url);
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    fetchImage(selectedRow?.mark_rep_sign, setGetImage1); // Set image for mark_rep_sign
  }, [selectedRow?.mark_rep_sign, API.prodUrl]);

  useEffect(() => {
    fetchImage(selectedRow?.mark_rep_sign_b, setGetImage2); // Set image for mark_rep_sign_b
  }, [selectedRow?.mark_rep_sign_b, API.prodUrl]);

  useEffect(() => {
    fetchImage(selectedRow?.qc_sign, setGetImage3); // Set image for qc_sign
  }, [selectedRow?.qc_sign, API.prodUrl]);

  useEffect(() => {
    if (uniqueDate) {
      // Check if uniqueDate can be parsed to a valid Date object
      const dateObj = new Date(uniqueDate);
      if (isNaN(dateObj)) {
        console.error("Invalid date format:", uniqueDate);
        return;
      }

      // Extract year and month
      const year = dateObj.getFullYear();
      const monthNumber = dateObj.getMonth(); // getMonth() returns 0-11 for Jan-Dec

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

      // Update the formData state with the month and year
      setFormData((prevValues) => ({
        ...prevValues,
        month: monthNames[monthNumber],
        year: year,
      }));

      console.log("Updated formData:", {
        month: monthNames[monthNumber],
        year: year,
      });
    }
  }, [uniqueDate]);

  // Fetch data in useEffect and update formData with referenceImage
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (uniqueReq) {
      axios
        .get(`${API.prodUrl}/Precot/api/QA/CL01/SampleRequest`, {
          headers,
          params: { sub_batch_id: uniqueReq },
        })
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setSelectedRow(response.data[0]);
            setFormData((prevFormData) => ({
              ...prevFormData,
              ...response.data[0],
              referenceImage: response.data[0].referenceImage || null,
            }));
            setDataAvailable(true); // Set dataAvailable to true if data is found
          } else {
            setFormData([]); // Reset formData to an empty object if no data is found
            setDataAvailable(false); // Set dataAvailable to false if no data is found
          }
        })
        .catch((err) => {
          console.error("Error fetching data by sub_batch_id:", err);
          setDataAvailable(false); // Set dataAvailable to false on error
        });
    } else {
      setFormData({});
      setDataAvailable(false); // Reset dataAvailable if uniqueReq is not provided
    }
  }, []); // Add dependencies for uniqueReq and token if they might change

  useEffect(() => {}, [uniqueDate]);

  const handleSave = () => {
    // Use uniqueDate for the 'date' field if it's available
    const payload = {
      ...formData,
      date: uniqueDate || formData.date, // Set uniqueDate or fallback to formData.date
      requisitionNo: uniqueReq || formData.requisitionNo,
      month: payloadmonth || formData.month,
      year: payloadyear || formData.year,
      // Optionally use uniqueReq for requisitionNo
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/QA/CL01/saveSampleRequest`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Sample Request Saved Successfully");

        if (response.data.test_id) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...response.data, // Update form data with response data
          }));
        }

        setTimeout(() => {
          navigate(
            "/Precot/QualityAssurance/F-029/QA_f029_new_sample_request_summary"
          );
        }, 2000);
      })
      .catch((error) => {
        message.error(
          error.response?.data?.message || "Failed to save sample request"
        );
      });
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate(
      "/Precot/QualityAssurance/F-029/QA_f029_new_sample_request_summary"
    );
  };

  const handleSubmit = () => {
    // Use uniqueDate for the 'date' field if it's available
    const payload = {
      ...formData,
      date: uniqueDate || formData.date, // Set uniqueDate or fallback to formData.date
      requisitionNo: uniqueReq || formData.requisitionNo,
      month: payloadmonth || formData.month,
      year: payloadyear || formData.year, // Optionally use uniqueReq for requisitionNo
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/QA/CL01/submitSampleRequest`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Sample Request Submitted Successfully");

        if (response.data.test_id) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...response.data, // Update form data with response data from backend
          }));
        }

        setTimeout(() => {
          navigate(
            "/Precot/QualityAssurance/F-029/QA_f029_new_sample_request_summary"
          );
        }, 2000);
      })
      .catch((error) => {
        message.error(
          error.response?.data?.message || "Failed to submit sample request"
        );
      });
  };

  const canEdit = () => {
    if (roleauth === "MARKET_REPRESENTATIVE") {
      return !(
        (selectedRow.mark_rep_status === "MARKET_REPRESENTATIVE_SUBMITTED" &&
          (selectedRow.qc_status === "WAITING_FOR_APPROVAL" ||
            selectedRow.qc_status === "QC_APPROVED")) ||
        (selectedRow.mark_rep_status === "MARKET_REPRESENTATIVE_SAVED" &&
          selectedRow.mark_rep_status_b === "MARKET_REPRESENTATIVE_SUBMITTED")
      );
    } else if (roleauth === "QC_MANAGER") {
      return !(selectedRow && selectedRow.qc_status === "QC_APPROVED");
    } else {
      return false;
    }
  };
  // Determine if inputs are editable
  const isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "MARKET_REPRESENTATIVE") {
      if (
        selectedRow.mark_rep_status === "MARKET_REPRESENTATIVE_SUBMITTED" &&
        (selectedRow.qc_status === "WAITING_FOR_APPROVAL" ||
          selectedRow.qc_status === "QC_APPROVED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "MARKET_REPRESENTATIVE") {
      if (
        selectedRow.mark_rep_status === "MARKET_REPRESENTATIVE_SUBMITTED" &&
        (selectedRow.qc_status === "WAITING_FOR_APPROVAL" ||
          selectedRow.qc_status === "QC_APPROVED")
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "MARKET_REPRESENTATIVE") {
      if (selectedRow.mark_rep_status_b === "MARKET_REPRESENTATIVE_SUBMITTED") {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "QC_MANAGER") {
      if (selectedRow && selectedRow.qc_status === "QC_APPROVED") {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtontabSub = () => {
    if (roleauth === "MARKET_REPRESENTATIVE") {
      if (selectedRow.qc_status === "QC_APPROVED") {
        return "block";
      } else {
        return "none";
      }
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Marketing</p>,
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
                <td colSpan="15">Date</td>
                <td colSpan="15">
                  <Input
                    type="date"
                    name="requestDate"
                    style={{ padding: "5px" }}
                    value={uniqueDate}
                    onChange={handleChange}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Requisition No.</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="requisitionNo"
                    style={{ width: "100%", padding: "5px" }}
                    value={uniqueReq}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Sample requisition posted by</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="sampleRequisitionPostedBy"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.sampleRequisitionPostedBy}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Remarks by unit</td>
                <td colSpan="15">
                  <Input
                    type="number"
                    name="remarksByUnit"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.remarksByUnit}
                    onChange={handleChange}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    onKeyDown={handleE}
                    min={0}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Dispatch Date</td>
                <td colSpan="15">
                  <Input
                    type="date"
                    name="dispatchString"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.dispatchString}
                    onChange={handleChange}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Customer Name</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="customerName"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.customerName}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Product type</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="productType"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.productType}
                    onChange={handleChange}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Types of Raw Material</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="typeOfRawMaterial"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.typeOfRawMaterial}
                    onChange={handleChange}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Raw Material certificate if any</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="rawMaterialCertificate"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.rawMaterialCertificate}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Shape</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="shape"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.shape}
                    onChange={handleChange}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">
                  Width and Length
                  <br />
                  (Applicable for Pleat, Wool roll & Roll goods)
                </td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="widthAndLength"
                    style={{ width: "100%", padding: "5px" }}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    value={formData.widthAndLength}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">GSM</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="gsm"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.gsm}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Pattern</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="pattern"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.pattern}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Edge</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="edge"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.edge}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">No. of Pieces/bag</td>
                <td colSpan="15">
                  <Input
                    type="number"
                    name="noOfPiecesBag"
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.noOfPiecesBag}
                    onChange={handleChange}
                    min={0}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Bag type</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="bagType"
                    style={{ width: "100%", padding: "5px" }}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    value={formData.bagType}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">No of packs required</td>
                <td colSpan="15">
                  <Input
                    type="number"
                    name="noOfPacksRequired"
                    style={{ width: "100%", padding: "5px" }}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    value={formData.noOfPacksRequired}
                    onChange={handleChange}
                    onKeyDown={handleE}
                    min={0}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">
                  Customer requirement/feedback - Marketing comments if any
                </td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="customerRequirementFeedback"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.customerRequirementFeedback}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Sample Category for Sample cost</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="sampleCategoryForCost"
                    style={{ width: "100%", padding: "5px" }}
                    disabled={!isEditable || roleauth === "QC_MANAGER"}
                    value={formData.sampleCategoryForCost}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
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
      label: <p>QC Manager/QC Designee</p>,

      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td colSpan="15">Sale Order No.</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="saleOrderNo"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.saleOrderNo}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    disabled={
                      !isEditable || roleauth === "MARKET_REPRESENTATIVE"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Reference Image</td>
                <td colSpan="15">
                  Attach an Image:
                  <Input
                    type="file"
                    name="referenceImage"
                    style={{ width: "100%", padding: "5px" }}
                    onChange={handleImageChange}
                    disabled={
                      !isEditable || roleauth === "MARKET_REPRESENTATIVE"
                    }
                  />
                  {formData.referenceImage && (
                    <div>
                      <img
                        src={`data:image/png;base64,${formData.referenceImage}`}
                        alt="Reference Preview"
                        style={{
                          width: "200px",
                          height: "auto",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="15">Sample Reference No.</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="sampleReferenceNo"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.sampleReferenceNo}
                    onChange={handleChange}
                    disabled={
                      !isEditable || roleauth === "MARKET_REPRESENTATIVE"
                    }
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Sample Prepared by</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="samplePreparedBy"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.samplePreparedBy}
                    onChange={handleChange}
                    disabled={
                      !isEditable || roleauth === "MARKET_REPRESENTATIVE"
                    }
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Sample Approved by</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="sampleApprovedBy"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.sampleApprovedBy}
                    onChange={handleChange}
                    disabled={
                      !isEditable || roleauth === "MARKET_REPRESENTATIVE"
                    }
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Marketing Review</p>,
      children: (
        <div>
          <table>
            <Button
              loading={submitLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButtontabSub(),
              }}
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleSubmit}
              shape="round"
            >
              &nbsp;Submit
            </Button>
            <tbody>
              <tr>
                <td colSpan="15">Sample Received by at CO Office</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="sampleReceivedByAtCoOffice"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.sampleReceivedByAtCoOffice}
                    onChange={handleChange}
                    disabled={
                      !(
                        selectedRow.mark_rep_status_b ===
                          "WAITING_FOR_APPROVAL" &&
                        selectedRow.qc_status === "QC_APPROVED"
                      ) ||
                      !dataAvailable ||
                      roleauth === "QC_MANAGER"
                    }
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Comments</td>
                <td colSpan="15">
                  <Input
                    type="text"
                    name="comments"
                    style={{ width: "100%", padding: "5px" }}
                    value={formData.comments}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    disabled={
                      !(
                        selectedRow.mark_rep_status_b ===
                          "WAITING_FOR_APPROVAL" &&
                        selectedRow.qc_status === "QC_APPROVED"
                      ) ||
                      !dataAvailable ||
                      roleauth === "QC_MANAGER"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="15">Status</td>
                <td colSpan="15">
                  <Select
                    name="status"
                    style={{ width: "100%" }}
                    value={formData.status}
                    onChange={(value) =>
                      handleChange({ target: { name: "status", value } })
                    }
                    onKeyDown={(e) => handleSelectText(e)}
                    disabled={
                      !(
                        selectedRow.mark_rep_status_b ===
                          "WAITING_FOR_APPROVAL" &&
                        selectedRow.qc_status === "QC_APPROVED"
                      ) ||
                      !dataAvailable ||
                      roleauth === "QC_MANAGER"
                    }
                  >
                    <Select.Option value="Open">Open</Select.Option>
                    <Select.Option value="Closed">Closed</Select.Option>

                    {/* Add more options as needed */}
                  </Select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <BleachingHeader
          unit="Unit H"
          formName="NEW SAMPLE REQUEST"
          formatNo="PH-QCL01-F-029"
          // MenuBtn={
          //   <Button
          //     type="primary"
          //     icon={<TbMenuDeep />}
          //     onClick={showDrawer}
          //   ></Button>
          // }
          buttonsArray={[
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
            </>,
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
    </>
  );
};

export default QA_f029_new_sample_request;
