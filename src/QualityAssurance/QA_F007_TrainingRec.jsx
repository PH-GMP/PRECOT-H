import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { TbMenuDeep } from "react-icons/tb";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

import axios from "axios";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import SignatureCanvas from "react-signature-canvas";

import {
  getYearAndMonth,
  printDateFormat,
  slashFormatDate,
} from "../util/util.js";

const role = localStorage.getItem("role");

export default function QA_F007_TrainingRec() {
  const signatureRefs = useRef({});

  const navigate = useNavigate();
  const location = useLocation();

  const { TextArea } = Input;
  const { date, selectedDepartment } = location.state || {};
  // const { date } = state || {};
  // const { loadno } = state || {};
  const initialized = useRef(false);

  const [rejectModal, setRejectModal] = useState(false);

  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const [isSaveButton, setIsSaveButton] = useState("block");
  const [isSubmitButton, setIsSubmitButton] = useState("block");
  const [isLoading, setIsLoading] = useState(false);
  const [trainingId, setTrainingId] = useState("");

  const [eSign, setESign] = useState({
    hod_sign: null,
  });

  const { year, month } = getYearAndMonth(date);

  const [formData, setFormData] = useState({
    formatName: "TRAINING RECORD",
    formatNo: "PH-QAD01/F-007",
    revisionNo: "03",
    refSopNo: "PH-QAD01-D-15",
    unit: "Unit H",
    date: date,
    month: month,
    year: year,
    department: selectedDepartment,
    mode_of_training: "",
    topic: "",
    training_session_no: "",
    content: "",
    venue: "",
    start_time: "",
    end_time: "",
    name_of_trainer: "",
    reference_document: "",
    trainer_signature_and_date: "",
    reason: "",
    hod_status: "",
    hod_saved_on: "",
    hod_saved_by: "",
    hod_saved_id: "",
    hod_submitted_on: "",
    hod_submitted_by: null,
    hod_submitted_id: null,
    hod_sign: "",
    details: [
      {
        name_of_the_employee: "",
        employee_id: "",
        department: "",
        signature: "",
      },
    ],
  });

  const [sessionNumberOptions, setSessionNumberOptions] = useState([]);

  const [rejectReason, setRejectReason] = useState();

  const handleCancel = () => {
    setRejectModal(false);
  };

  // Initialize or update signatureRefs when details change
  useEffect(() => {
    signatureRefs.current = formData.details.map(
      (_, i) => signatureRefs.current[i] || null
    );
  }, [formData.details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedDetails = [...prevFormData.details];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [name]: value,
      };

      return {
        ...prevFormData,
        details: updatedDetails,
      };
    });
  };

  const handleSaveSignature = (actualIndex, base64Image) => {
    console.log("actualIndex", actualIndex);
    setFormData((prevFormData) => {
      const updatedDetails = [...prevFormData.details];
      updatedDetails[actualIndex] = {
        ...updatedDetails[actualIndex],
        signature: base64Image,
      };
      return {
        ...prevFormData,
        details: updatedDetails,
      };
    });
  };

  const handleClearSignature = (actualIndex) => {
    setFormData((prevFormData) => {
      const updatedDetails = [...prevFormData.details];
      updatedDetails[actualIndex] = {
        ...updatedDetails[actualIndex],
        signature: "",
      };
      return {
        ...prevFormData,
        details: updatedDetails,
      };
    });
  };

  const handleCheckBoxChange = (index) => {
    // Update details to mark only the selected radio button
    const updatedDetails = formData.details.map((detail, i) => ({
      ...detail,
      selected: i === index ? !detail.selected : false,
    }));
    setFormData((prevData) => ({
      ...prevData,
      details: updatedDetails,
    }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const role = localStorage.getItem("role");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;

  // Calculate the total number of pages
  const totalPages = Math.ceil(formData.details.length / recordsPerPage);

  // Determine the data slice for the current page
  const currentRecords = formData.details.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      details: [
        ...prevFormData.details,
        {
          name_of_the_employee: "",
          employee_id: "",
          department: "",
          signature: "",
        },
      ],
    }));
  };

  const handleDeleteRows = () => {
    console.log("working form data trainingId", trainingId);

    if (!trainingId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        details: prevFormData.details.filter((row) => !row.selected),
      }));
      message.success("Row deleted successfully");
      return;
    }

    // Identify rows with line_id for API deletion
    const selectedRowsWithId = formData.details.filter(
      (row) => row.selected && row.line_id
    );

    // Identify rows without line_id for local deletion
    const selectedRowsWithoutId = formData.details.filter(
      (row) => row.selected && !row.line_id
    );

    // Remove selected rows from UI
    setFormData((prevFormData) => ({
      ...prevFormData,
      details: prevFormData.details.filter((row) => !row.selected),
    }));

    // If no rows with line_id, no API call is required
    if (selectedRowsWithId.length === 0) {
      if (selectedRowsWithoutId.length > 0) {
        message.success("Row deleted successfully");
      } else {
        message.warning("No rows selected for deletion");
      }
      return;
    }

    const selectedIds = selectedRowsWithId.map((row) => row.line_id);

    const token = localStorage.getItem("token");

    axios
      .delete(
        `${API.prodUrl}/Precot/api/QA/Service/deleteTrainingRecordLines?line_id=${selectedIds}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Row deleted successfully");
        fetchDataByDateAndDepartment();
      })
      .catch((error) => {
        console.error("Error deleting selected rows:", error);
      });
  };

  const checkMandatoryFields = () => {
    const { mode_of_training, training_session_no, start_time, end_time } =
      formData;
    const missingFields = [];
    if (!mode_of_training) missingFields.push("Mode of Training ");
    if (!training_session_no) missingFields.push("Training Session Number");
    if (!start_time) missingFields.push("Start time");
    if (!end_time) missingFields.push("End time");

    return missingFields;
  };

  const validateDisableFields = (response) => {
    if (
      role === "ROLE_HOD" ||
      role === "QA_MANAGER" ||
      role === "HR_EXECUTIVE" ||
      role === "ROLE_MR"
    ) {
      if (response.hod_status === "HOD_SAVED") {
        setIsFieldsDisabled(false);
      } else {
        setIsFieldsDisabled(true);
      }
    } else {
      setIsFieldsDisabled(true);
    }
  };

  const validateHideButtons = (response) => {
    if (
      role === "ROLE_HOD" ||
      role === "QA_MANAGER" ||
      role === "HR_EXECUTIVE" ||
      role === "ROLE_MR"
    ) {
      if (response.hod_status === "HOD_SAVED") {
        setIsSaveButton("block");
        setIsSubmitButton("block");
        return;
      } else {
        setIsSaveButton("none");
        setIsSubmitButton("none");
      }
    } else {
      setIsSaveButton("none");
      setIsSubmitButton("none");
    }
  };

  const fetchDataByDateAndDepartment = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/getTrainingRecord?date=${date}&department=${selectedDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          const res = response.data[0];

          // Map details with signature properly formatted
          const updatedDetails =
            res.details?.map((item) => ({
              ...item,
              signature: item.signature
                ? `data:image/png;base64,${item.signature}`
                : "",
            })) || [];

          // Update state
          setTrainingId(res.training_id);
          setFormData({
            ...res,
            details: updatedDetails,
          });

          validateHideButtons(response.data[0]);
          validateDisableFields(response.data[0]);
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const fetchTrainingSessionNumber = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/trainingSessionNoLov?department=${selectedDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setSessionNumberOptions(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect to call fetch function when the component mounts
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchDataByDateAndDepartment();
      fetchTrainingSessionNumber();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["hod_sign"];
    signatureKeys.forEach((key) => {
      console.log("new Data", formData);
      if (formData) {
        const username = formData[key];
        console.log("usernameparams", username);

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
  }, [formData]);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    formData.details = formData.details.map((detail) => ({
      name_of_the_employee: detail.name_of_the_employee,
      employee_id: detail.employee_id,
      department: detail.department,
      signature: detail.signature ? detail.signature.split(",")[1] : null,
    }));

    setFormData({ ...formData });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SaveTrainingRecord`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data saved successfully:", response.data);
      message.success("saved successfully");
      navigate("/Precot/QA/F007/Summary");
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Unable to Save Form");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const missingFields = checkMandatoryFields();

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        message.warning(`Please fill in the mandatory field: ${field}`);
      });
      setIsLoading(false);
      return;
    }

    if (!formData.topic) {
      formData.topic = "N/A";
    }
    if (!formData.content) {
      formData.content = "N/A";
    }
    if (!formData.venue) {
      formData.venue = "N/A";
    }
    if (!formData.name_of_trainer) {
      formData.name_of_trainer = "N/A";
    }
    if (!formData.reference_document) {
      formData.reference_document = "N/A";
    }

    formData.details = formData.details.map((detail) => ({
      name_of_the_employee: detail.name_of_the_employee || "N/A",
      employee_id: detail.employee_id || "N/A",
      department: detail.department || "N/A",
      signature: detail.signature ? detail.signature.split(",")[1] : "N/A",
    }));

    setFormData({ ...formData });

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SubmitTrainingRecord`,
        formData, // Ensure the payload is sent in the body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('Data saved successfully:', response.data);
      message.success("Submitted successfully!");
      setIsLoading(false);
      navigate("/Precot/QA/F007/Summary");
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Unable to Submit Form");
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qc/ApproveMediaPreparationF019`,
        {
          id: formData.id,
          status: "Reject",
          remarks: rejectReason,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        setIsLoading(false);
        navigate("/Precot/QualityControl/F-019/Summary");
      })
      .catch((err) => {
        setIsLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {});
  };

  const handleBack = () => {
    navigate("/Precot/QA/F007/Summary");
  };

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="TRAINING RECORD"
        formatNo="PH-QAD01/F-007"
        sopNo="PH-QAD01-D-15"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        const
        buttonsArray={[
          <>
            <Button
              loading={isLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: isSaveButton,
              }}
              onClick={handleSave}
              shape="round"
              icon={<IoSave color="#00308F" />}
            >
              &nbsp;Save
            </Button>
            <Button
              loading={isLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: isSubmitButton,
              }}
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleSubmit}
              shape="round"
            >
              &nbsp;Submit
            </Button>
          </>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
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
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Are you sure want to logout")) {
                // localStorage.removeItem('token');
                localStorage.removeItem("token");
                localStorage.removeItem("role");

                // Clear role state
                // setRole(null);
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
            loading={isLoading}
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

      <table style={{ marginTop: "0.5rem" }}>
        <tbody>
          <tr>
            <td style={{ padding: "0.5rem" }}>Mode of Training</td>
            <td>
              <Select
                placeholder="select Mode of Training "
                value={
                  formData.mode_of_training ? formData.mode_of_training : null
                }
                onChange={(value) =>
                  handleSelectChange(value, "mode_of_training")
                }
                style={{ width: "100%" }}
                disabled={isFieldsDisabled}
              >
                <Select.Option value="On-The-Job">On-The-Job</Select.Option>
                <Select.Option value="Classroom">Classroom</Select.Option>
                <Select.Option value="Self reading">Self reading</Select.Option>
                <Select.Option value="External">External</Select.Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td>
              <span style={{ margin: "0 0.5rem" }}>Topic:</span>
              <Input
                name="topic"
                onChange={handleChange}
                value={formData.topic}
                style={{ width: "80%" }}
                disabled={isFieldsDisabled}
              />
            </td>
            <td>
              <span style={{ margin: "0.5rem" }}>
                Date:{slashFormatDate(formData.date)}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "0.5rem" }}>Training Session No.</td>
            <td>
              <Input
                type="text"
                value={
                  formData.training_session_no
                    ? formData.training_session_no
                    : null
                }
                onChange={(e) =>
                  handleSelectChange(e.target.value, "training_session_no")
                }
                style={{ width: "100%" }}
                disabled={isFieldsDisabled}
              />
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>
              <span style={{ margin: "0.5rem" }}>Contents:</span>
              <TextArea
                style={{ resize: "none" }}
                name="content"
                value={formData.content}
                onChange={handleChange}
                disabled={isFieldsDisabled}
              />
            </td>
            <td>
              <span style={{ margin: "0.5rem" }}>Venue:</span>
              <Input
                style={{ width: "90%" }}
                name="venue"
                onChange={handleChange}
                value={formData.venue}
                disabled={isFieldsDisabled}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span style={{ margin: "0.5rem" }}>Start Time:</span>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                style={{ width: "70%" }}
                disabled={isFieldsDisabled}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span style={{ margin: "0.5rem" }}>End Time:</span>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                style={{ width: "70%" }}
                disabled={isFieldsDisabled}
              />
            </td>
          </tr>
          <tr>
            <td>
              Name of the Trainer:
              <Input
                name="name_of_trainer"
                value={formData.name_of_trainer}
                onChange={handleChange}
                style={{ width: "60%" }}
                disabled={isFieldsDisabled}
              />
            </td>
            <td>
              Reference Document, if any:
              <Input
                name="reference_document"
                value={formData.reference_document}
                onChange={handleChange}
                style={{ width: "60%" }}
                disabled={isFieldsDisabled}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <td style={{ padding: "1rem" }}></td>
            <td style={{ padding: "0.5rem", textAlign: "center" }}>S.No.</td>
            <td style={{ padding: "0.5rem", textAlign: "center" }}>
              Name of the Employee
            </td>
            <td style={{ padding: "0.5rem", textAlign: "center" }}>
              Employee ID.
            </td>
            <td style={{ padding: "0.5rem", textAlign: "center" }}>Dept.</td>
            <td style={{ padding: "0.5rem", textAlign: "center" }}>
              Signature
            </td>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((detail, index) => (
            <tr>
              <td style={{ textAlign: "center" }}>
                <input
                  name="selected"
                  type="checkbox"
                  checked={detail.selected}
                  value={detail.selected}
                  onChange={() =>
                    handleCheckBoxChange(
                      (currentPage - 1) * recordsPerPage + index
                    )
                  }
                />
              </td>
              <td style={{ padding: "0.5rem", textAlign: "center" }}>
                {(currentPage - 1) * recordsPerPage + index + 1}
              </td>
              <td>
                <Input
                  name="name_of_the_employee"
                  value={detail.name_of_the_employee}
                  onChange={(e) =>
                    handleArrayChange(
                      (currentPage - 1) * recordsPerPage + index,
                      e
                    )
                  }
                  disabled={isFieldsDisabled}
                />
              </td>
              <td>
                <Input
                  name="employee_id"
                  value={detail.employee_id}
                  onChange={(e) =>
                    handleArrayChange(
                      (currentPage - 1) * recordsPerPage + index,
                      e
                    )
                  }
                  disabled={isFieldsDisabled}
                />
              </td>
              <td>
                <Input
                  name="department"
                  value={detail.department}
                  onChange={(e) =>
                    handleArrayChange(
                      (currentPage - 1) * recordsPerPage + index,
                      e
                    )
                  }
                  disabled={isFieldsDisabled}
                />
              </td>
              <td>
                {formData.hod_status !== "HOD_SUBMITTED" ? (
                  !detail.signature ? (
                    <>
                      <SignatureCanvas
                        ref={(ref) => {
                          const actualIndex =
                            (currentPage - 1) * recordsPerPage + index;
                          signatureRefs.current[actualIndex] = ref;
                        }}
                        penColor="green"
                        canvasProps={{
                          width: 400,
                          height: 150,
                          className: "sigCanvas",
                          style: { border: "1px solid #ccc" },
                        }}
                        backgroundColor="#f9e5e1"
                      />
                      <div style={{ marginTop: "5px" }}>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => {
                            const actualIndex =
                              (currentPage - 1) * recordsPerPage + index;
                            const canvas = signatureRefs.current[actualIndex];
                            if (canvas) {
                              canvas.getTrimmedCanvas().toBlob((blob) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64 = reader.result.split(",")[1];
                                  handleSaveSignature(
                                    actualIndex,
                                    `data:image/png;base64,${base64}`
                                  );
                                };
                                reader.readAsDataURL(blob);
                              }, "image/png");
                            }
                          }}
                        >
                          Save
                        </Button>

                        <Button
                          size="small"
                          style={{ marginLeft: "8px" }}
                          onClick={() => {
                            const actualIndex =
                              (currentPage - 1) * recordsPerPage + index;
                            const canvas = signatureRefs.current[actualIndex];
                            if (canvas) {
                              canvas.clear();
                              handleClearSignature(actualIndex);
                            }
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </>
                  ) : (
                    <img
                      src={detail.signature}
                      alt="Signature"
                      style={{ height: "50px", objectFit: "contain" }}
                    />
                  )
                ) : detail.signature ? (
                  <img
                    src={detail.signature}
                    alt="Signature"
                    style={{ height: "50px", objectFit: "contain" }}
                  />
                ) : (
                  "No signature selected"
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td style={{ padding: "0.5rem", textAlign: "center" }} colSpan={6}>
              <div>Trainer Signature & Date:</div>
              {formData.hod_status !== "HOD_SAVED" && (
                <div>
                  <div>{formData.hod_sign}</div>
                  <div>{printDateFormat(formData.hod_submitted_on)}</div>
                  <div>
                    {eSign.hod_sign ? (
                      <img
                        src={eSign.hod_sign}
                        alt="microbiologist_sign"
                        style={{
                          width: "100px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{ marginTop: "0.5rem", textAlign: "center", display: "flex" }}
      >
        {/* display: isSaveButton  */}
        <Button
          onClick={handleAddRow}
          style={{ margin: "0 1rem", display: isSaveButton }}
        >
          Add Row
        </Button>
        <Button
          onClick={handleDeleteRows}
          style={{ margin: "0 1rem", display: isSaveButton }}
        >
          Remove
        </Button>
      </div>
      <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <span style={{ margin: "0 1rem" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
