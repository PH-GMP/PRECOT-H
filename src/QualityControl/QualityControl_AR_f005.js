import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
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
                response.data[0]?.qa_inspector_status ===
                "QA_INSPECTOR_APPROVED" &&
                response.data[0]?.qa_mng_status === "QA_MANAGER_REJECTED"
              ) {
                message.warning("QA Inspector Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/AR_F-005/Summary");
                }, 1500);
              }
            }


            setFormData({
              bmrNumber: data.bmr_no || BMR_No,
              details: data.line1.map((detail) => ({
                line_id: detail.line_id || "",
                date: detail.date || "",
                productName: detail.product_name || "",
                shaftNo: detail.shaft_no || "",
                mixing: detail.mixing || "",
                gsm: detail.gsm || "",
                pattern: detail.pattern || "",
                analysisNumber: detail.analysis_request_number || "",
                shift: detail.shift || "",
                jetlacePressure: detail.jetlace_parameters_pressure || "",
                jetlaceText: detail.jetlace_parameters_text || "",
                moistureMahlo: detail.moisture_mahlo || "",
                moistureProbe: detail.moisture_phobe || "",
                thickness: detail.thickness || "",
                strengthCD: detail.strength_cross_direction || "",
                strengthMD: detail.strength_machine_direction || "",
                friction: detail.friction || "",
                appearance: detail.appearance || "",
              })),
            });


          } else {
            fetchFormData()
            setFormData({
              bmrNumber: BMR_No,
              details: [
                {
                  line_id: "",
                  productName: "",
                  shaftNo: "",
                  mixing: "",
                  gsm: "",
                  pattern: "",
                  date: "",
                  analysisNumber: "",
                  shift: "",
                  jetlacePressure: "",
                  jetlaceText: "",
                  moistureMahlo: "",
                  moistureProbe: "",
                  thickness: "",
                  strengthCD: "",
                  strengthMD: "",
                  friction: "",
                  appearance: "",
                },
              ],
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

  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/chemicaltest/ARF005/PDE/${BMR_No}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "json",
        }
      );

      const staticRows = response.data.map((item) => ({
        analysisNumber: "",
        date: "",
        shift: "",
        jetlacePressure: "",
        jetlaceText: "",
        moistureMahlo: "",
        moistureProbe: "",
        thickness: "",
        strengthCD: "",
        strengthMD: "",
        friction: "",
        appearance: "",
        productName: item.product_name,
        shaftNo: item.shaftNo,
        mixing: item.mixing,
        gsm: item.gsm,
        pattern: item.pattern,
      }));

      setFormData((prev) => ({
        ...prev,
        details: staticRows.length ? staticRows : prev.details,
      }));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    bmrNumber: BMR_No,

    details: [
      {
        line_id: "",
        date: "",
        analysisNumber: "",
        shift: "",
        jetlacePressure: "",
        jetlaceText: "",
        moistureMahlo: "",
        moistureProbe: "",
        thickness: "",
        strengthCD: "",
        strengthMD: "",
        friction: "",
        appearance: "",
        productName: "",
        shaftNo: "",
        mixing: "",
        gsm: "",
        pattern: "",
      },
    ],
  });
  const addRow = () => {
    setFormData((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        {
          analysisNumber: "",
          date: "",
          shift: "",
          jetlacePressure: "",
          jetlaceText: "",
          moistureMahlo: "",
          moistureProbe: "",
          thickness: "",
          strengthCD: "",
          strengthMD: "",
          friction: "",
          appearance: "",
          productName: "",
          shaftNo: "",
          mixing: "",
          gsm: "",
          pattern: "",
        },
      ],
    }));
  };

  const deleteRow = (index) => {
    if (!Array.isArray(formData.details) || formData.details.length === 1) {
      alert("At least one row is required.");
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to delete this row? This action cannot be undone."
      )
    ) {
      const updatedRows = formData.details.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        details: updatedRows,
      }));
    }
  };

  // Function to handle input changes
  const handleInputChange = (field, value, index) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      details: updatedDetails,
    }));
  };
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

  // Fetch data from API when component mounts

  const handleSave = async () => {
    setSaveLoading(true);
    console.log("BMR_No", BMR_No);

    // Prepare the payload
    console.log("maind", mainID);

    const payload = {
      test_id: mainID || null,
      format: "Non-Woven Fleece Analysis Report",
      format_no: "PH-QCL01-AR-F-005",
      ref_sop_no: "PH-QCL01-D-05",
      revision_no: "03",
      bmr_no: formData.bmrNumber,


      line1: formData.details.map((row) => ({
        line_id: row.line_id || null,
        product_name: row.productName?.trim(),
        shaft_no: row.shaftNo,
        mixing: row.mixing,
        gsm: row.gsm,
        pattern: row.pattern,
        analysis_request_number: row.analysisNumber,
        date: row.date,
        shift: row.shift,
        jetlace_parameters_pressure: row.jetlacePressure,
        jetlace_parameters_text: row.jetlaceText,
        moisture_mahlo: row.moistureMahlo,
        moisture_phobe: row.moistureProbe,
        thickness: row.thickness,
        strength_cross_direction: row.strengthCD,
        strength_machine_direction: row.strengthMD,
        friction: row.friction,
        appearance: row.appearance,
      })),
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
    // Prepare the payload
    console.log("maind", mainID);

    const payload = {
      test_id: mainID || null,
      format: "Non-Woven Fleece Analysis Report",
      format_no: "PH-QCL01-AR-F-005",
      ref_sop_no: "PH-QCL01-D-05",
      revision_no: "03",
      bmr_no: formData.bmrNumber,


      line1: formData.details.map((row) => ({
        line_id: row.line_id || null,
        product_name: row.productName?.trim(),
        shaft_no: row.shaftNo,
        mixing: row.mixing,
        gsm: row.gsm,
        pattern: row.pattern,
        analysis_request_number: row.analysisNumber,
        date: row.date,
        shift: row.shift,
        jetlace_parameters_pressure: row.jetlacePressure,
        jetlace_parameters_text: row.jetlaceText,
        moisture_mahlo: row.moistureMahlo,
        moisture_phobe: row.moistureProbe,
        thickness: row.thickness,
        strength_cross_direction: row.strengthCD,
        strength_machine_direction: row.strengthMD,
        friction: row.friction,
        appearance: row.appearance,
      })),
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

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {formData.bmrNumber}
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
                marginLeft: "5px", // adjust this if necessary for your layout
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
                    Product Name
                  </th>


                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Shaft No.
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
                    Mixing
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    GSM
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Pattern
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
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(formData.details) &&
                  formData.details.map((detail, index) => (
                    <tr key={index}>

                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          value={detail.analysisNumber}
                          min={0}
                          onChange={(e) =>
                            handleInputChange(
                              "analysisNumber",
                              e.target.value,
                              index
                            )
                          }
                          style={{ minWidth: "60px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <Input
                          type="date"
                          value={detail.date}
                          onChange={(e) =>
                            handleInputChange("date", e.target.value, index)
                          }
                          max={getCurrentDate()}
                          style={{ minWidth: "60px" }}
                          disabled={!isEditable}
                        />
                        <Select
                          value={detail.shift}
                          onChange={(value) =>
                            handleInputChange("shift", value, index)
                          }
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

                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          min={0}
                          value={detail.productName}

                          onChange={(e) =>
                            handleInputChange("productName", e.target.value, index)
                          }

                          style={{ minWidth: "100px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          min={0}
                          value={detail.shaftNo}

                          onChange={(e) =>
                            handleInputChange("shaftNo", e.target.value, index)
                          }
                          style={{ minWidth: "70px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      {/* Jetlace Pressure and Jetlace Text */}
                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          value={detail.jetlacePressure}
                          min={0}

                          onChange={(e) =>
                            handleInputChange(
                              "jetlacePressure",
                              e.target.value,
                              index
                            )
                          }
                          style={{ minWidth: "60px", marginBottom: "10px" }}
                          disabled={!isEditable}
                        />
                        <TextArea
                          type="text"
                          value={detail.jetlaceText}
                          onChange={(e) =>
                            handleInputChange(
                              "jetlaceText",
                              e.target.value,
                              index
                            )
                          }
                          style={{ minWidth: "90px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          min={0}
                          value={detail.mixing}

                          onChange={(e) =>
                            handleInputChange("mixing", e.target.value, index)
                          }
                          style={{ minWidth: "100px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          min={0}
                          value={detail.gsm}

                          onChange={(e) =>
                            handleInputChange("gsm", e.target.value, index)
                          }
                          style={{ minWidth: "60px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          min={0}
                          value={detail.pattern}

                          onChange={(e) =>
                            handleInputChange("pattern", e.target.value, index)
                          }
                          style={{ minWidth: "70px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      {/* Moisture Mahlo (%) and Moisture Probe (%) */}
                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          value={detail.moistureMahlo}
                          min={0}

                          onChange={(e) =>
                            handleInputChange(
                              "moistureMahlo",
                              e.target.value,
                              index
                            )
                          }
                          style={{ minWidth: "60px", marginBottom: "10px" }}
                          disabled={!isEditable}
                        />
                        <TextArea
                          type="text"

                          value={detail.moistureProbe}
                          min={0}
                          onChange={(e) =>
                            handleInputChange(
                              "moistureProbe",
                              e.target.value,
                              index
                            )
                          }
                          disabled={!isEditable}
                          style={{ minWidth: "60px" }}
                        />
                      </td>

                      {/* Thickness (mm) */}
                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"

                          value={detail.thickness}
                          min={0}
                          onChange={(e) =>
                            handleInputChange(
                              "thickness",
                              e.target.value,
                              index
                            )
                          }
                          disabled={!isEditable}
                          style={{ minWidth: "60px" }}
                        />
                      </td>

                      {/* Strength in CD (N) */}
                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          value={detail.strengthCD}
                          min={0}
                          onChange={(e) =>
                            handleInputChange(
                              "strengthCD",
                              e.target.value,
                              index
                            )
                          }
                          style={{ minWidth: "60px" }}

                          disabled={!isEditable}
                        />
                      </td>

                      {/* Strength in MD (N) */}
                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          min={0}
                          value={detail.strengthMD}

                          onChange={(e) =>
                            handleInputChange(
                              "strengthMD",
                              e.target.value,
                              index
                            )
                          }
                          style={{ minWidth: "60px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      {/* Friction (N) */}
                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          min={0}
                          value={detail.friction}

                          onChange={(e) =>
                            handleInputChange("friction", e.target.value, index)
                          }
                          style={{ minWidth: "60px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      {/* Appearance */}
                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <TextArea
                          type="text"
                          value={detail.appearance}
                          onChange={(e) => {
                            const value = e.target.value;
                            handleInputChange("appearance", value, index);
                          }}
                          style={{ minWidth: "60px" }}
                          disabled={!isEditable}
                        />
                      </td>

                      {/* Action - Delete row button */}
                      <td
                        style={{
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        <Button
                          type="primary"
                          danger
                          onClick={() => deleteRow(index)}
                          disabled={!isEditable || formData.details.length <= 1}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

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
            disabled={!isEditable}
            onClick={addRow}
            icon={
              <AiOutlinePlus style={{ color: "#00308F", marginRight: "1px" }} />
            }
          >
            Add Row
          </Button>
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
                {selectedRow?.qa_inspector_status ===
                  "QA_INSPECTOR_APPROVED" && (
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
