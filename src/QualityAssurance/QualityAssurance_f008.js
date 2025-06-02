import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
import API from "../baseUrl.json";

const QualityAssuranceF008 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uniqueDate, uniqueEmpId, uniqueDep } = location.state || {};
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const token = localStorage.getItem("token");
  const roleauth = localStorage.getItem("role");
  const [mainId, setmainId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [open, setOpen] = useState(false);
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [deleteId, setDeleteId] = useState([]);

  // extract month year from date
  useEffect(() => {
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
      setMonth(monthNames[monthNumber]);
      setYear(year);
    }
  }, [uniqueDate]);

  const [employeeData, setEmployeeData] = useState({
    name: "",
    trainingCardNo: "",
    issuedBy: "",
    department: uniqueDep,
    employeeNo: uniqueEmpId,
    designation: "",
    dateOfJoining: "",
  });

  // Handle change for each input field
  const handleFieldChange = (field, value) => {
    setEmployeeData({
      ...employeeData,
      [field]: value,
    });
  };

  const [inputFieldsData, setInputFieldsData] = useState([
    {
      id: "",
      date: uniqueDate,
      sessionNo: "",
      topicName: "",
      sopNumber: "",
      traineeName: "",
      trainer: "",
      modeOfTraining: "",
      remarks: "",
    },
  ]);

  // Handle change for input fields
  const handleInputChange = (index, field, value) => {
    const updatedData = inputFieldsData.map((row, idx) =>
      idx === index ? { ...row, [field]: value } : row
    );
    setInputFieldsData(updatedData);

    // If field is sessionNo, fetch the trainer name for the selected session
    if (field === "sessionNo") {
      fetchTrainerName(index, value);
    }
  };

  const addRow = () => {
    setInputFieldsData([
      ...inputFieldsData,
      {
        date: uniqueDate,
        sessionNo: "",
        topicName: "",
        sopNumber: "",
        traineeName: "",
        trainer: "", // Set to empty initially
        modeOfTraining: "",
        remarks: "",
      },
    ]);
  };

  // Function to handle row deletion and store the row ID for later deletion

  const deleteRow = (index, rowId) => {
    if (inputFieldsData.length === 1) {
      alert("At least one row is required.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      if (rowId) {
        setDeleteId((prevDeleteId) => [...prevDeleteId, rowId]);
      }

      setInputFieldsData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  // Function to actually delete a row by ID after saving
  const handleDelete = async (rowId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${API.prodUrl}/Precot/api/QA/Service/api/deleteBmrIssueRegister?id=${rowId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
      }
    } catch (err) {
      console.error("Error deleting row:", err);
      message.error("An error occurred while deleting a row.");
    }
  };

  useEffect(() => {
    const fetchTrainingSessions = async () => {
      if (!uniqueDep) {
        console.error("No department specified.");
        return;
      }

      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/trainingSessionNoLov`,
          {
            params: { department: uniqueDep },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log response to verify the structure
        setTrainingSessions(response.data || []); // Ensure we set an array as default
      } catch (error) {
        console.error("Error fetching training sessions:", error);
        message.error("Failed to fetch training sessions.");
        setTrainingSessions([]); // Set an empty array in case of error
      }
    };

    fetchTrainingSessions();
  }, [uniqueDep]);

  const fetchTrainerName = async (index, sessionNo) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/GetTrainerName`,
        {
          params: { trainingSessionNo: sessionNo },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const trainerName = response.data.message; // Assuming trainer name is in message
      setInputFieldsData((prevData) =>
        prevData.map((row, idx) =>
          idx === index ? { ...row, trainer: trainerName } : row
        )
      );
    } catch (error) {
      console.error("Error fetching trainer name:", error);
      message.error("Failed to fetch trainer name.");
    }
  };

  useEffect(() => {
    if (uniqueEmpId && uniqueDep) {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/getByParam?employeeNo=${uniqueEmpId}&department=${uniqueDep}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          }
        )
        .then((response) => {
          if (response.data) {
            const data = response.data; // Assuming the data array is returned

            setmainId(data.card_id);
            // Set the employeeData state
            setEmployeeData({
              name: data.employeeName,
              trainingCardNo: data.trainingCardNo,
              issuedBy: data.issuedBy,
              department: data.department || uniqueDep,
              employeeNo: data.employeeNo || uniqueEmpId,
              designation: data.designation,
              dateOfJoining: data.dateOfJoining,
            });

            // Set inputFieldsData if there is any details array
            if (data.details && data.details.length > 0) {
              setInputFieldsData(
                data.details.map((detail) => ({
                  id: detail.line_id,
                  date: data.date || uniqueDate, // Assuming you want the date from the parent object
                  sessionNo: detail.trainingSessionNo,
                  topicName: detail.topicName,
                  sopNumber: detail.sopNo,
                  traineeName: detail.traineeName,
                  trainer: detail.trainerName,
                  modeOfTraining: detail.modeOfTraining,
                  remarks: detail.remarks,
                }))
              );
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [uniqueEmpId, uniqueDep]);

  const handleSave = async () => {
    // Prepare the payload
    setSaveLoading(true);

    const payload = {
      card_id: mainId,
      formatName: "TRAINING CARD",
      formatNo: "PH-QAD01-F-008",
      revisionNo: 1,
      refSopNo: "PH-QAD01-D-15",
      unit: "Unit H",
      employeeName: employeeData.name,
      trainingCardNo: employeeData.trainingCardNo,
      issuedBy: employeeData.issuedBy,
      department: employeeData.department,
      employeeNo: employeeData.employeeNo,
      designation: employeeData.designation,
      dateOfJoining: employeeData.dateOfJoining,
      date: uniqueDate,
      month: month,
      year: year,
      details: inputFieldsData.map((session) => ({
        line_id: session.id,
        trainingSessionNo: session.sessionNo,
        topicName: session.topicName,
        sopNo: session.sopNumber,
        traineeName: session.traineeName,
        trainerName: session.trainer,
        modeOfTraining: session.modeOfTraining,
        remarks: session.remarks,
        card_id: mainId,
      })),
    };

    const token = localStorage.getItem("token");

    try {
      // Make the API call using Axios
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/Save`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Training Card Report saved successfully!");

      setSaveLoading(false);

      // If save is successful, delete rows in deleteId
      if (deleteId.length > 0) {
        for (let i = 0; i < deleteId.length; i++) {
          await handleDelete(deleteId[i]);
        }
        setDeleteId([]); // Clear the deleteId array after successful deletion
      }

      // Navigate to summary page
      navigate("/Precot/QA/QA_F008_Summary");
    } catch (error) {
      setSaveLoading(false);
      console.error("API Error:", error);
      message.error("An error occurred while saving the report.");
    }
  };

  const handleSubmit = async () => {
    // Prepare the payload
    setSubmitLoading(true);

    // Check mandatory fields
    if (
      !employeeData.name ||
      !employeeData.trainingCardNo ||
      !employeeData.issuedBy ||
      !employeeData.designation ||
      !employeeData.dateOfJoining ||
      inputFieldsData.some(
        (session) =>
          !session.sessionNo ||
          !session.topicName ||
          !session.sopNumber ||
          !session.traineeName ||
          !session.modeOfTraining
      )
    ) {
      message.error("Please fill in all mandatory fields.");
      setSubmitLoading(false);
      return;
    }

    const payload = {
      card_id: mainId,
      formatName: "TRAINING CARD",
      formatNo: "PH-QAD01-F-008",
      revisionNo: 1,
      refSopNo: "PH-QAD01-D-15",
      unit: "Unit H",
      employeeName: employeeData.name,
      trainingCardNo: employeeData.trainingCardNo,
      issuedBy: employeeData.issuedBy,
      department: employeeData.department,
      employeeNo: employeeData.employeeNo,
      designation: employeeData.designation,
      dateOfJoining: employeeData.dateOfJoining,
      date: uniqueDate,
      month: month,
      year: year,
      details: inputFieldsData.map((session, index) => ({
        line_id: session.id,
        trainingSessionNo: session.sessionNo,
        topicName: session.topicName,
        sopNo: session.sopNumber,
        traineeName: session.traineeName,
        trainerName: session.trainer,
        modeOfTraining: session.modeOfTraining,
        remarks: session.remarks || "N/A",
        card_id: mainId,
      })),
    };

    const token = localStorage.getItem("token");

    try {
      // Make the API call using Axios
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/Submit`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Training Card Report submitted successfully!");

      setSubmitLoading(false);

      // If save is successful, delete rows in deleteId
      if (deleteId.length > 0) {
        for (let i = 0; i < deleteId.length; i++) {
          await handleDelete(deleteId[i]);
        }
        setDeleteId([]); // Clear the deleteId array after successful deletion
      }

      navigate("/Precot/QA/QA_F008_Summary");
    } catch (error) {
      setSubmitLoading(false);
      console.error("API Error:", error);
      message.error("An error occurred while saving the report.");
    }
  };

  // Function to handle keydown events
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleBack = () => {
    navigate("/Precot/QA/QA_F008_Summary");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Training Record Details</b>
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
                marginLeft: "20px",
                marginTop: "30px",
              }}
            >
              <thead>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Name of Employee:
                    <Input
                      type="text"
                      value={employeeData.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                    />
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Training Card No.:
                    <Input
                      type="text"
                      value={employeeData.trainingCardNo}
                      onChange={(e) =>
                        handleFieldChange("trainingCardNo", e.target.value)
                      }
                    />
                  </td>
                  <td
                    colSpan={4}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Issued by:
                    <Input
                      type="text"
                      value={employeeData.issuedBy}
                      onChange={(e) =>
                        handleFieldChange("issuedBy", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Department: {employeeData.department}
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Employee No.: {employeeData.employeeNo}
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Designation:
                    <Input
                      type="text"
                      value={employeeData.designation}
                      onChange={(e) =>
                        handleFieldChange("designation", e.target.value)
                      }
                    />
                  </td>
                  <td
                    colSpan={4}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Date of Joining:
                    <Input
                      type="date"
                      value={employeeData.dateOfJoining}
                      onChange={(e) =>
                        handleFieldChange("dateOfJoining", e.target.value)
                      }
                    />
                  </td>
                </tr>

                {/* //addrow */}
                <tr style={{ border: "1px solid black" }}>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    S.No.
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Date{" "}
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Training Session No.{" "}
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Topic Name
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    SOP Number
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Trainee Sign & Date{" "}
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Trainer Sign & Date{" "}
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Mode of Training
                  </th>

                  <th style={{ border: "1px solid black", padding: "5px" }}>
                    Remarks
                  </th>
                  <th style={{ border: "1px solid black", padding: "5px" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {inputFieldsData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      {index + 1}
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      {formatDate(row.date)}
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Select
                        style={{ width: "180px" }}
                        value={row.sessionNo}
                        onChange={(value) => {
                          handleInputChange(index, "sessionNo", value); // Update the sessionNo in input data
                          fetchTrainerName(value); // Fetch trainer name for selected session
                        }}
                        placeholder="Select Session"
                      >
                        {Array.isArray(trainingSessions) &&
                          trainingSessions.map((session) => (
                            <Select.Option
                              key={session.id}
                              value={session.value}
                            >
                              {session.value}
                            </Select.Option>
                          ))}
                      </Select>
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Input
                        type="text"
                        value={row.topicName}
                        onChange={(e) =>
                          handleInputChange(index, "topicName", e.target.value)
                        }
                      />
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Input
                        type="text"
                        value={row.sopNumber}
                        onChange={(e) =>
                          handleInputChange(index, "sopNumber", e.target.value)
                        }
                      />
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Input
                        type="text"
                        value={row.traineeName}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "traineeName",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      {row.trainer}
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Select
                        style={{ width: "150px" }}
                        value={row.modeOfTraining}
                        showSearch
                        filterOption={false}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleInputChange(
                              index,
                              "modeOfTraining",
                              e.target.value
                            );
                          }
                        }}
                        onChange={(value) =>
                          handleInputChange(index, "modeOfTraining", value)
                        }
                      >
                        <Select.Option value="On-The-Job">
                          On-The-Job
                        </Select.Option>
                        <Select.Option value="Classroom">
                          Classroom
                        </Select.Option>
                        <Select.Option value="Self reading">
                          Self reading
                        </Select.Option>
                        <Select.Option value="External">External</Select.Option>
                      </Select>
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Input
                        type="text"
                        value={row.remarks}
                        onChange={(e) =>
                          handleInputChange(index, "remarks", e.target.value)
                        }
                      />
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Button
                        type="primary"
                        danger
                        icon={<FaTrash />}
                        onClick={() => deleteRow(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
                marginRight: "50%",
                marginLeft: "35px",
                marginTop: "10px",
              }}
              onClick={addRow}
            >
              <AiOutlinePlus style={{ marginRight: "5px" }} />
              Add Row
            </Button>
          </div>
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
        formName="Training Card"
        formatNo="PH-QAD01-F-008"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") && (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
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

export default QualityAssuranceF008;
