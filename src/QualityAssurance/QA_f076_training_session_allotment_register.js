import { Button, Input, message, Tabs, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f076_training_session_register = () => {
  const location = useLocation();
  const { uniqueDate, uniqueDep } = location.state || {}; // Destructure `uniqueDate` safely
  const navigate = useNavigate();
  const [mainid, setmainid] = useState("");
  const token = localStorage.getItem("token");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const departmentCodeMap = {
    BLEACHING: "PRD01",
    SPUNLACE: "PRD02",
    PAD_PUNCHING: "PRD03",
    DRY_GOODS: "PRD04",
    QUALITY_CONTROL: "QCL01",
    QUALITY_ASSURANCE: "QAD01",
    PPC: "PPC01",
    STORE: "STR01",
    DISPATCH: "DIS01",
    PRODUCT_DEVELOPMENT: "DVP01",
  };

  const uniqueYear = new Date().getFullYear().toString().slice(-2); // Current year in 'YY' format
  const [sessionCounter, setSessionCounter] = useState(1);
  const [open, setOpen] = useState(false);
  const departmentCode = departmentCodeMap[uniqueDep] || ""; // Default to empty string if uniqueDep not found in map

  const [rows, setRows] = useState([
    {
      id: "",
      date: uniqueDate,
      TrainingSessionNo: `TS/${departmentCode}/${uniqueYear}/${String(
        sessionCounter
      ).padStart(4, "0")}`,
      TopicName: "",
      SOPNumber: "",
      TrainingSessionAllotmentby: "",
      Remarks: "",
    },
  ]);

  const addRow = () => {
    setRows((prevRows) => {
      const nextSessionNo = sessionCounter + prevRows.length;
      const newSessionNo = `TS/${departmentCode}/${uniqueYear}/${String(
        nextSessionNo
      ).padStart(4, "0")}`;

      return [
        ...prevRows,
        {
          date: uniqueDate,
          TrainingSessionNo: newSessionNo,
          TopicName: "",
          SOPNumber: "",
          TrainingSessionAllotmentby: "",
          Remarks: "",
        },
      ];
    });
  };

  const deleteRow = (index, rowId) => {
    if (rows.length === 1) {
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

      setRows((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  // Function to actually delete a row by ID after saving
  const handleDelete = async (rowId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingSessionAllotmentRegister/delete?id=${rowId}`,
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

  function formatMonthYear(uniqueDate) {
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

  const [date, setDate] = useState("");
  const [dep, setDep] = useState("");

  // const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");
  const roleauth = localStorage.getItem("role");

  const [shift, setShift] = useState(null);
  const [remarks, setRemarks] = useState("");

  const [PackingDetails, setPackingDetails] = useState([]);
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
  };

  const handleSelectText = (e) => {
    if (
      !/[0-9a-zA-Z._/ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const username = selectedRow?.operator_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {});
    }
  }, [selectedRow, API.prodUrl]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hod_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {});
    }
  }, [selectedRow, API.prodUrl]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fetchLastSessionNumber = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/qa/number/generationbasedDpt`,
          {
            headers,
            params: {
              department: uniqueDep,
              formNumber: "PH-QAD01-F-076",
            },
          }
        );

        if (response.data.success) {
          const lastSessionNumber = parseInt(
            response.data.message.split("/")[3],
            10
          );
          setSessionCounter(lastSessionNumber + 1);
        }
      } catch (error) {
        console.error("Error fetching last session number:", error);
      }
    };

    if (uniqueDate && uniqueDep) {
      fetchLastSessionNumber();

      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/TrainingSessionAllotmentRegister/getByParam`,
          {
            headers,
            params: { date: uniqueDate, department: uniqueDep },
          }
        )
        .then((response) => {
          if (
            response.data &&
            Array.isArray(response.data.details) &&
            response.data.details.length > 0
          ) {
            if (roleauth === "ROLE_DESIGNEE" || roleauth === "ROLE_HOD") {
              if (response.data?.hodStatus === "HOD_SUBMITTED") {
                message.warning("Already Approved");
                setTimeout(() => {
                  navigate(
                    "/Precot/QualityAssurance/F-076/QA_f076_training_session_allotment_register_summary"
                  );
                }, 2000);
              }
            }

            setmainid(response.data.formId);
            setRows(
              response.data.details.map((item, index) => ({
                id: item.lineId,
                date: response.data.date || uniqueDate,
                TrainingSessionNo:
                  item.trainingSessionNumber ||
                  `TS/${departmentCode}/${uniqueYear}/${String(
                    sessionCounter + index
                  ).padStart(4, "0")}`,
                TopicName: item.topicName || "",
                SOPNumber: item.sopNumber || "",
                TrainingSessionAllotmentby: response.data.hodSaveBy || "",
                Remarks: item.remarks || "",
              }))
            );
          } else {
            setRows([
              {
                date: uniqueDate,
                TrainingSessionNo: `TS/${departmentCode}/${uniqueYear}/${String(
                  sessionCounter
                ).padStart(4, "0")}`,
                TopicName: "",
                SOPNumber: "",
                TrainingSessionAllotmentby: "",
                Remarks: "",
              },
            ]);
          }
        })
        .catch((err) =>
          console.error("Error fetching data by date and department:", err)
        );
    }
  }, [
    uniqueDate,
    uniqueDep,
    token,
    departmentCode,
    uniqueYear,
    sessionCounter,
  ]);

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDepChange = (e) => {
    setDep(e.target.value);
  };
  const handleBack = () => {
    navigate(
      "/Precot/QualityAssurance/F-076/QA_f076_training_session_allotment_register_summary"
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSave = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const payload = {
        formId: mainid,
        formatName: "TRAINING SESSION ALLOTMENT REGISTER",
        formatNo: "PH-QAD01-F-076",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-15",
        unit: "H",
        date: uniqueDate,
        year: payloadyear,
        month: payloadmonth,
        department: uniqueDep,
        details: rows.map((row) => ({
          lineId: row.id || "",
          trainingSessionNumber: row.TrainingSessionNo,
          topicName: row.TopicName,
          sopNumber: row.SOPNumber,
          remarks: row.Remarks || "N/A",
          formId: mainid,
        })),
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingSessionAllotmentRegister/Save`,
        payload,
        { headers }
      );

      message.success("Saved successful");

      if (deleteId.length > 0) {
        for (let i = 0; i < deleteId.length; i++) {
          await handleDelete(deleteId[i]);
        }
        setDeleteId([]);
      }

      setTimeout(() => {
        navigate(
          "/Precot/QualityAssurance/F-076/QA_f076_training_session_allotment_register_summary"
        );
      }, 2000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSubmit = async () => {
    const invalidRows = rows.filter((row) => {
      return !row.TopicName || !row.SOPNumber;
    });

    if (invalidRows.length > 0) {
      message.error(
        "Please provide both Topic Name and SOP Number for all rows."
      );

      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const payload = {
        formId: mainid,
        formatName: "TRAINING SESSION ALLOTMENT REGISTER",
        formatNo: "PH-QAD01-F-076",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-15",
        unit: "H",
        date: uniqueDate,
        year: payloadyear,
        month: payloadmonth,
        department: uniqueDep,
        details: rows.map((row) => ({
          lineId: row.id || "",
          trainingSessionNumber: row.TrainingSessionNo,
          topicName: row.TopicName,
          sopNumber: row.SOPNumber,
          remarks: row.Remarks,
          formId: mainid,
        })),
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingSessionAllotmentRegister/Submit`,
        payload,
        { headers }
      );

      message.success("Submitted successful");
      if (deleteId.length > 0) {
        for (let i = 0; i < deleteId.length; i++) {
          await handleDelete(deleteId[i]);
        }
        setDeleteId([]);
      }

      setTimeout(() => {
        navigate(
          "/Precot/QualityAssurance/F-076/QA_f076_training_session_allotment_register_summary"
        );
      }, 2000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PackingDetails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(PackingDetails.length / itemsPerPage);

  const handleTextareaChange = (event) => {
    setRemarks(event.target.value);
  };

  const formattedOperatorDate = selectedRow?.operator_submitted_on
    ? moment(selectedRow?.operator_submitted_on).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedhodDate = selectedRow?.hod_submit_on
    ? moment(selectedRow?.hod_submit_on).format("DD/MM/YYYY HH:mm")
    : "";

  const totalProductionQty = currentItems.reduce(
    (total, item) => total + (item.ProductionQty || 0),
    0
  );

  const items = [
    {
      key: "1",
      label: <p>Form</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "100%", margin: "auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th colSpan="21" style={{ padding: "3px", textAlign: "left" }}>
                  Department: {uniqueDep}{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan="1">S. No.</th>
                <th colSpan="3">Date</th>
                <th colSpan="3">Training Session No.</th>
                <th colSpan="3">Topic Name</th>
                <th colSpan="3">SOP Number</th>
                <th colSpan="3">Training Session Allotment by</th>
                <th colSpan="3">Remarks</th>
                <th colSpan="2">Action</th>
              </tr>

              {rows.map((row, index) => (
                <tr key={index + 1}>
                  <td colSpan="1" style={{ padding: "6px" }}>
                    {index + 1}
                  </td>
                  <td colSpan="3">
                    <Input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        handleInputChange(index, "date", e.target.value)
                      }
                      disabled
                    />
                  </td>
                  <td colSpan="3">
                    <Input
                      type="text"
                      value={row.TrainingSessionNo}
                      style={{ width: "100%" }}
                      readOnly
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "TrainingSessionNo",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td colSpan="3">
                    <Input
                      type="text"
                      value={row.TopicName}
                      onChange={(e) =>
                        handleInputChange(index, "TopicName", e.target.value)
                      }
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                    />
                  </td>
                  <td colSpan="3">
                    <Input
                      type="text"
                      value={row.SOPNumber}
                      onChange={(e) =>
                        handleInputChange(index, "SOPNumber", e.target.value)
                      }
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                    />
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    {row.TrainingSessionAllotmentby}
                  </td>
                  <td colSpan="3">
                    <Input
                      type="text"
                      value={row.Remarks}
                      onChange={(e) =>
                        handleInputChange(index, "Remarks", e.target.value)
                      }
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                    />
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "5px" }}
                  >
                    <Button
                      type="primary"
                      danger
                      icon={<FaTrash />}
                      onClick={() => deleteRow(index)}
                    ></Button>
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
            }}
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
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit H"
        formName="TRAINING SESSION ALLOTMENT REGISTER SUMMARY"
        formatNo="PH-QAL01-F-076"
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
          addonBefore="Department"
          placeholder="Department"
          value={uniqueDep}
          readOnly
          onChange={handleDepChange}
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="year"
          placeholder="year"
          value={payloadyear}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="month"
          placeholder="month"
          value={payloadmonth}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />
      </div>
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

export default QA_f076_training_session_register;
