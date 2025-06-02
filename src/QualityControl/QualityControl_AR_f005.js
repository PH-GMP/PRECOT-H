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
import rejectIcon from "../Assests/outlined-reject.svg";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
import moment from "moment";
import PrecotSidebar from "../Components/PrecotSidebar";

const QCLARF05 = () => {
  const navigate = useNavigate();
  const [shift, setShift] = useState([]);
  const roleauth = localStorage.getItem("role");
  const [mainID, setMainID] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const location = useLocation();
  const { BMR_No } = location.state || {};
  const [open, setOpen] = useState(false);
  const [getImage, setGetImage] = useState("");
  const token = localStorage.getItem("token");
  const initialized = useRef(false);

  useEffect(() => {
    if (BMR_No) {
      const token = localStorage.getItem("token");
      const fetchFormData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/chemicaltest/ARF005/PDE/${BMR_No}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              responseType: "json", // Use json if the response is in JSON format
            }
          );

          // Extract values from the response
          const { gsm, shaftNo, mixing, pattern, product_name } =
            response.data[0];

          // Update formData state
          setFormData((prevState) => ({
            ...prevState,
            productName: product_name,
            shaftNo: shaftNo,
            mixing: mixing,
            gsm: gsm,
            pattern: pattern,
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchFormData();
    }
  }, [BMR_No]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qa_inspector_sign;
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
  }, [selectedRow, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qa_mng_sign;
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
  }, [selectedRow, API.prodUrl, token]);

  const [formData, setFormData] = useState({
    analysisNumber: "",
    bmrNumber: BMR_No,
    date: "",
    shift: "",
    productName: "",
    shaftNo: "",
    jetlacePressure: "",
    jetlaceText: "",
    mixing: "",
    gsm: "",
    pattern: "",
    moistureMahlo: "",
    moistureProbe: "",
    thickness: "",
    strengthCD: "",
    strengthMD: "",
    friction: "",
    appearance: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        responseType: "json", // Use json if the response is in JSON format
      })
      .then((res) => {
        setShift(res.data); // Set the fetched data to the shift state
      })
      .catch((error) => {
        console.error("Error fetching shift details:", error);
      });
  }, []);

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      console.log("BMR_No", BMR_No);
      const fetchData = async () => {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/chemicaltest/ARF005/${formData.bmrNumber}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "json",
            }
          );

          if (response.data && response.data.length > 0) {
            const data = response.data[0];
            setMainID(data.test_id);
            setSelectedRow(data);

            if (roleauth === "QA_MANAGER") {
              if (
                response.data[0]?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
                response.data[0]?.qa_mng_status === "QA_MANAGER_REJECTED"
              ) {
                message.warning("QA Inspector Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/AR_F-005/Summary");
                }, 1500);
              }
            }

            setFormData({
              analysisNumber: data.analysis_request_number,
              bmrNumber: data.bmr_no,
              date: data.date,
              shift: data.shift,
              jetlacePressure: data.jetlace_parameters_pressure,
              jetlaceText: data.jetlace_parameters_text,
              moistureMahlo: data.moisture_mahlo,
              moistureProbe: data.moisture_phobe,
              thickness: data.thickness,
              strengthCD: data.strength_cross_direction,
              strengthMD: data.strength_machine_direction,
              friction: data.friction,
              appearance: data.appearance,
            });
          } else {
            setFormData({
              analysisNumber: "",
              bmrNumber: BMR_No,
              date: "",
              shift: "",
              productName: "",
              shaftNo: "",
              jetlacePressure: "",
              jetlaceText: "",
              mixing: "",
              gsm: "",
              pattern: "",
              moistureMahlo: "",
              moistureProbe: "",
              thickness: "",
              strengthCD: "",
              strengthMD: "",
              friction: "",
              appearance: "",
            });
          }
        } catch (error) {
          // Handle any errors that occur during the fetch
          console.error("Error fetching data:", error);
          message.info("Unable to fetch data. Try again later..");
        }
      };

      fetchData();
    }
  }, [BMR_No]);

  const handleSave = async () => {
    setSaveLoading(true);
    console.log("BMR_No", BMR_No);

    // Prepare the payload
    console.log("maind", mainID);

    const payload = {
      test_id: mainID || null, // Update this with the actual test_id if needed
      format: "Non-Woven Fleece Analysis Report", // Fixed format name
      format_no: "PH-QCL01-AR-F-005", // Use the format number as specified
      ref_sop_no: "PH-QCL01-D-05", // Use the SOP number as specified
      revision_no: "03", // Use the revision number as specified
      bmr_no: formData.bmrNumber, // Use BMR number or 'NA'
      analysis_request_number: formData.analysisNumber, // Assuming analysisNumber is the same as request number
      date: formData.date, // Date or 'NA'
      shift: formData.shift, // Shift or 0
      product_name: formData.productName?.trim(), // Trimmed product name or 'NA'
      shaft_no: formData.shaftNo, // Shaft number or 0
      jetlace_parameters_pressure: formData.jetlacePressure, // Jetlace pressure or 0
      jetlace_parameters_text: formData.jetlaceText?.trim(), // Trimmed Jetlace text or 'NA'
      mixing: formData.mixing, // Mixing or 0
      gsm: formData.gsm, // GSM or 0
      pattern: formData.pattern, // Pattern or 0
      moisture_mahlo: formData.moistureMahlo, // Moisture Mahlo or 0
      moisture_phobe: formData.moistureProbe, // Moisture probe or 0
      thickness: formData.thickness, // Thickness or 0
      strength_cross_direction: formData.strengthCD, // Strength CD or 0
      strength_machine_direction: formData.strengthMD, // Strength MD or 0
      friction: formData.friction, // Friction or 0
      appearance: formData.appearance?.trim(), // Trimmed appearance or 'NA'
    };
    console.log(payload, "payload");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/chemicaltest/ARF005/save/nonwovenReport`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle successful response
      message.success("Non-Woven Fleece Analysis Report Saved Successfully..");
      console.log("Save successful:", response.data);
      navigate("/Precot/QualityControl/AR_F-005/Summary");
      setSaveLoading(false);
      // You might want to show a success message or reset the form here
    } catch (error) {
      setSaveLoading(false);
      // Handle error
      console.error("Error saving data:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    console.log("BMR_No", BMR_No);

    const allFieldsEmpty =
      !formData.analysisNumber &&
      !formData.date &&
      !formData.shift &&
      !formData.jetlacePressure &&
      !formData.jetlaceText?.trim() &&
      !formData.moistureMahlo &&
      !formData.moistureProbe &&
      !formData.thickness &&
      !formData.strengthCD &&
      !formData.strengthMD &&
      !formData.friction &&
      !formData.appearance?.trim();

    if (allFieldsEmpty) {
      message.error("No fields entered.");
      setSubmitLoading(false);
      return;
    }

    if (!formData.analysisNumber) {
      message.error("Please enter Analysis Reference Number.");
      setSubmitLoading(false);
      return;
    }
    if (!formData.date) {
      message.error("Please select a Date.");
      setSubmitLoading(false);
      return;
    }
    if (!formData.shift) {
      message.error("Please select Shift.");
      setSubmitLoading(false);
      return;
    }

    if (!formData.moistureMahlo) {
      message.error("Please enter Moisture Mahlo.");
      setSubmitLoading(false);
      return;
    }
    if (!formData.moistureProbe) {
      message.error("Please enter Moisture Probe.");
      setSubmitLoading(false);
      return;
    }
    if (!formData.thickness) {
      message.error("Please enter Thickness.");
      setSubmitLoading(false);
      return;
    }
    if (!formData.strengthCD) {
      message.error("Please enter Strength Cross Direction.");
      setSubmitLoading(false);
      return;
    }
    if (!formData.strengthMD) {
      message.error("Please enter Strength Machine Direction.");
      setSubmitLoading(false);
      return;
    }
    if (!formData.friction) {
      message.error("Please enter Friction.");
      setSubmitLoading(false);
      return;
    }
    if (!formData.appearance?.trim()) {
      message.error("Please enter Appearance.");
      setSubmitLoading(false);
      return;
    }

    // Prepare the payload
    console.log("maind", mainID);
    const payload = {
      test_id: mainID || null, // Update this with the actual test_id if needed
      format: "Non-Woven Fleece Analysis Report", // Fixed format name
      format_no: "PH-QCL01-AR-F-005", // Use the format number as specified
      ref_sop_no: "PH-QCL01-D-05", // Use the SOP number as specified
      revision_no: "03", // Use the revision number as specified
      bmr_no: formData.bmrNumber || "N/A", // Use BMR number or 'NA'
      analysis_request_number: formData.analysisNumber || 0, // Assuming analysisNumber is the same as request number
      date: formData.date || "N/A", // Date or 'NA'
      shift: formData.shift || 0, // Shift or 0
      product_name: formData.productName?.trim() || "N/A", // Trimmed product name or 'NA'
      shaft_no: formData.shaftNo || 0, // Shaft number or 0
      jetlace_parameters_pressure: formData.jetlacePressure || 0, // Jetlace pressure or 0
      jetlace_parameters_text: formData.jetlaceText?.trim() || "N/A", // Trimmed Jetlace text or 'NA'
      mixing: formData.mixing || 0, // Mixing or 0
      gsm: formData.gsm || 0, // GSM or 0
      pattern: formData.pattern || 0, // Pattern or 0
      moisture_mahlo: formData.moistureMahlo || 0, // Moisture Mahlo or 0
      moisture_phobe: formData.moistureProbe || 0, // Moisture probe or 0
      thickness: formData.thickness || 0, // Thickness or 0
      strength_cross_direction: formData.strengthCD || 0, // Strength CD or 0
      strength_machine_direction: formData.strengthMD || 0, // Strength MD or 0
      friction: formData.friction || 0, // Friction or 0
      appearance: formData.appearance?.trim() || "N/A", // Trimmed appearance or 'NA'
    };

    const token = localStorage.getItem("token");
    console.log("payload", payload);
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/chemicaltest/ARF005/Submit/nonwovenReport`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle successful response
      message.success(
        "Non-Woven Fleece Analysis Report Submitted Successfully.."
      );
      console.log("submit successful:", response.data);
      navigate("/Precot/QualityControl/AR_F-005/Summary");
      setSubmitLoading(false);
      // You might want to show a success message or reset the form here
    } catch (error) {
      setSubmitLoading(false);
      // Handle error
      console.error("Error saving data:", error);
      // You might want to show an error message to the user here
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
        `${API.prodUrl}/Precot/api/chemicaltest/ARF005/approval`,
        {
          id: mainID,
          formatNo: "PH-QCL01-AR-F-005",
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("res in approve", res);
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/AR_F-005/Summary");
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
      .post(
        `${API.prodUrl}/Precot/api/chemicaltest/ARF005/approval`,
        {
          id: mainID,
          formatNo: "PH-QCL01-AR-F-005",
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage reject", res.data.message);
        setSubmitLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/AR_F-005/Summary");
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
    if (roleauth === "ROLE_QA") {
      return !(
        (selectedRow.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow.qa_mng_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow.qa_mng_status === "QA_MANAGER_APPROVED")
      );
    } else if (roleauth === "QA_MANAGER") {
      return !(
        (selectedRow &&
          selectedRow.qa_inspector_status === "QA_INSPECTOR_APPROVED" && 
          (selectedRow.qa_mng_status === "WAITING_FOR_APPROVAL" ||
            selectedRow.qa_mng_status === "QA_MANAGER_APPROVED" ||
            selectedRow.qa_mng_status === "QA_MANAGER_REJECTED")) ||
        selectedRow.qa_inspector_status === "QA_SAVED"
      );
    } else {
      return false;
    }
  };

  const isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_QA") {
      if (
        (selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qa_mng_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qa_mng_status === "QA_MANAGER_APPROVED") ||
        (selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qa_mng_status === "QA_MANAGER_REJECTED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_QA") {
      if (
        (selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qa_mng_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qa_mng_status === "QA_MANAGER_APPROVED")
      ) {
        return "none";
      } else if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_mng_status === "QA_MANAGER_REJECTED"
      ) {
        return "block";
      }
    } else if (roleauth === "QA_MANAGER") {
      if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_mng_status === "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        (selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qa_mng_status === "QA_MANAGER_REJECTED") ||
        (selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qa_mng_status === "QA_MANAGER_APPROVED") ||
        selectedRow?.qa_inspector_status === "QA_SAVED"
      ) {
        return "none";
      }
    }
  };

  let formattedQAINSDate;
  if (selectedRow.qa_inspector_submit_on) {
    formattedQAINSDate = moment(selectedRow.qa_inspector_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQAINSDate = ""; // Or any other default value or error handling
  }

  let formattedQAMNGDate;
  if (selectedRow.qa_mng_submit_on) {
    formattedQAMNGDate = moment(selectedRow.qa_mng_submit_on).format(
      "DD/MM/YYYY HH:MM"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQAMNGDate = ""; // Or any other default value or error handling
  }

  const handleBack = () => {
    navigate("/Precot/QualityControl/AR_F-005/Summary");
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
          <b>Fleece Analysis Report Details</b>
        </p>
      ),
      children: (
        <div>
          <div>
            {/* unique parama table */}
            <table>
              <thead>
                <tr key="">
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Spunlace BMR No
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Product Name
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "5%",
                    }}
                  >
                    Shaft No
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Mixing
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "5%",
                    }}
                  >
                    GSM
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "5%",
                    }}
                  >
                    Pattern
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {formData.bmrNumber}
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {formData.productName}
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {formData.shaftNo}
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {formData.mixing}
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {formData.gsm}
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {formData.pattern}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* unique parama table end*/}

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
                      width: "10%",
                    }}
                  >
                    Analysis Reference Number
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Date and Shift
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Jetlace Parameters Pressure and text
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Moisture Mahlo (%) and Probe (%)
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Thickness (mm)
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Strength in CD (N)
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Strength in MD (N)
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Friction (N)
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Appearance
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* Analysis Request Number */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <Input
                      type="text"
                      value={formData.analysisNumber}
                      min={0}
                      onChange={(e) =>
                        handleInputChange("analysisNumber", e.target.value)
                      }
                      style={{ minWidth: "60px" }}
                      disabled={!isEditable}
                    />
                  </td>

                  {/* Date and Shift */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      max={getCurrentDate()}
                      style={{ minWidth: "60px" }}
                      disabled={!isEditable}
                    />

                    <Select
                      value={formData.shift}
                      onChange={(value) => handleInputChange("shift", value)}
                      style={{ width: "100%", marginTop: "10px" }}
                      disabled={!isEditable}
                    >
                      {shift.map((shiftItem) => (
                        <Select.Option
                          value={shiftItem.value}
                          key={shiftItem.id}
                        >
                          {shiftItem.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>

                  {/* Jetlace Pressure and Jetlace Text */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.jetlacePressure}
                      min={0}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange("jetlacePressure", e.target.value)
                      }
                      style={{ minWidth: "60px", marginBottom: "10px" }}
                      disabled={!isEditable}
                    />

                    <Input
                      type="text"
                      value={formData.jetlaceText}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleInputChange("jetlaceText", value); // valid input
                      }}
                      style={{ minWidth: "60px" }}
                      disabled={!isEditable}
                    />
                  </td>

                  {/* Moisture Mahlo (%) and Moisture Probe (%) */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.moistureMahlo}
                      min={0}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange("moistureMahlo", e.target.value)
                      }
                      style={{ minWidth: "60px", marginBottom: "10px" }}
                      disabled={!isEditable}
                    />

                    <Input
                      type="number"
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      value={formData.moistureProbe}
                      min={0}
                      onChange={(e) =>
                        handleInputChange("moistureProbe", e.target.value)
                      }
                      disabled={!isEditable}
                      style={{ minWidth: "60px" }}
                    />
                  </td>

                  {/* Thickness (mm) */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <Input
                      type="number"
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      value={formData.thickness}
                      min={0}
                      onChange={(e) =>
                        handleInputChange("thickness", e.target.value)
                      }
                      disabled={!isEditable}
                      style={{ minWidth: "60px" }}
                    />
                  </td>

                  {/* Strength in CD (N) */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.strengthCD}
                      min={0}
                      onChange={(e) =>
                        handleInputChange("strengthCD", e.target.value)
                      }
                      style={{ minWidth: "60px" }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      disabled={!isEditable}
                    />
                  </td>

                  {/* Strength in MD (N) */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <Input
                      type="number"
                      min={0}
                      value={formData.strengthMD}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange("strengthMD", e.target.value)
                      }
                      style={{ minWidth: "60px" }}
                      disabled={!isEditable}
                    />
                  </td>

                  {/* Friction (N) */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <Input
                      type="number"
                      min={0}
                      value={formData.friction}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange("friction", e.target.value)
                      }
                      style={{ minWidth: "60px" }}
                      disabled={!isEditable}
                    />
                  </td>

                  {/* Appearance */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <Input
                      type="text"
                      value={formData.appearance}
                      onChange={(e) => {
                        const value = e.target.value;

                        handleInputChange("appearance", value); // valid input
                      }}
                      style={{ minWidth: "60px" }}
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
                <b>Performed by QA Inspector Sign & Date</b>
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>Reviewed by QA Manager Sign & Date</b>
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
                {selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" && (
                  <>
                    {getImage && (
                      <img
                        className="signature"
                        src={getImage}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.qa_inspector_sign}
                    <br />
                    {formattedQAINSDate}
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
                {(selectedRow?.qa_mng_status === "QA_MANAGER_REJECTED" ||
                  selectedRow?.qa_mng_status === "QA_MANAGER_APPROVED") && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.qa_mng_sign}
                    <br />
                    {formattedQAMNGDate}
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
        formName="Non-Woven Fleece Analysis Report"
        formatNo="PH-QCL01-AR-F-005"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QA_MANAGER" ? (
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

export default QCLARF05;
