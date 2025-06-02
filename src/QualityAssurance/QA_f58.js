/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Tabs,
  Modal,
  Spin,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
  Radio,
  Checkbox,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import moment from "moment";

const QA_f58 = () => {
  const navigate = useNavigate();
  let role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date, department, eqId, id } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [DetailsByParam, setDetailsByParam] = useState("");
  const [Id, setId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [rows, setRows] = useState([
    {
      lineIdF: "1",
      time: "",
      productName: "",
      action: "",
      positionOne: "",
      positionTwo: "",
      positionThree: "",
      positionFour: "",
      positionFive: "",
      positionSix: "",
      positionSeven: "",
      positionEight: "",
      positionNine: "",
    },
  ]);
  const [lineId, setLineId] = useState([]);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toDelete, setToDelete] = useState([]);
  const handleRejectModal = () => {
    setShowModal(true);
  };
  const disabled =
    (role == "ROLE_OPERATOR" &&
      DetailsByParam?.operator_status == "OPERATOR_APPROVED" &&
      DetailsByParam?.supervisor_status !== "SUPERVISOR_REJECTED" &&
      DetailsByParam?.qa_inspector_status !== "QA_INSPECTOR_REJECTED") ||
    role == "ROLE_SUPERVISOR" ||
    role == "ROLE_QA";

  
  const dateObject = new Date(date);
  const monthIndex = dateObject.getMonth();
  const yearName = dateObject.getFullYear();
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
  const monthName = monthNames[monthIndex];

  useEffect(() => {
    setToDelete([]);
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleKeyDownNum = (e) => {
    const isAlphanumeric = /^[a-zA-Z.0-9,]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const canDisplayButtons = () => {
    if (role === "ROLE_OPERATOR") {
      if (
        DetailsByParam &&
        DetailsByParam.operator_status === "OPERATOR_APPROVED" &&
        DetailsByParam.qa_inspector_status !== "QA_INSPECTOR_REJECTED" &&
        DetailsByParam.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else if (role == "ROLE_SUPERVISOR") {
      if (
        DetailsByParam?.supervisor_status == "SUPERVISOR_APPROVED" &&
        DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_REJECTED"
      ) {
        return "block";
      } else if (
        (DetailsByParam?.supervisor_status == "SUPERVISOR_APPROVED" &&
          DetailsByParam?.qa_inspector_status == "WAITING_FOR_APPROVAL") ||
        DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "ROLE_QA") {
      if (
        DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_APPROVED" ||
        DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_APPROVED" ||
        DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_OPERATOR") {
      if (DetailsByParam?.operator_status == "OPERATOR_APPROVED") {
        return "none";
      }
    } else if (role == "ROLE_SUPERVISOR" || role == "ROLE_QA") {
      return "none";
    }
  };

  const handleAddRow = () => {
    const newLineId =
      rows.length > 0
        ? Math.max(...rows.map((row) => parseInt(row.lineIdF, 10) || 0)) + 1
        : 1;

    const newRow = {
      lineIdF: newLineId.toString(),
      time: "",
      productName: "",
      action: "",
      positionOne: "",
      positionTwo: "",
      positionThree: "",
      positionFour: "",
      positionFive: "",
      positionSix: "",
      positionSeven: "",
      positionEight: "",
      positionNine: "",
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setLineId((prevLineIds) => [...prevLineIds, newRow.lineIdF]);
  };
  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row? This action will be finalized after saving."
    );

    if (confirmDelete) {
      const lineIdToDelete = lineId[index];
      setToDelete((prevToDelete) => {
        return lineIdToDelete !== undefined &&
          !prevToDelete.includes(lineIdToDelete)
          ? [...prevToDelete, lineIdToDelete]
          : prevToDelete;
      });

      setLineId((prevLineId) => {
        return prevLineId.filter((_, i) => i !== index);
      });

      setRows((prevRows) => {
        return prevRows.filter((_, i) => i !== index);
      });
    } else {
      
    }
  };

  // formatted dates
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.operator_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {
          
        });
    }
  }, [DetailsByParam, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.supervisor_sign;
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
        .catch((err) => {
          
        });
    }
  }, [DetailsByParam, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.qa_inspector_sign;
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
        .catch((err) => {
          
        });
    }
  }, [DetailsByParam, API.prodUrl, token]);

  const handleSave = async () => {
    try {
      await SaveRecord();
    } catch (error) {
      console.error("Error saving Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitRecord();
    } catch (error) {
      console.error("Error submitting Record..", error);
    }
  };

  const SaveRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "METAL DETECTOR CALIBRATION RECORD",
        formatNo: "PH-QAD01-F-058",
        revisionNo: 1,
        sopNumber: "PH-QAD01-D-44",
        unit: "H",
        department: department,
        eq_id: eqId,
        date: date,
        month: monthName,
        year: yearName,
        metal_id: Id,
        details: rows.map((row, index) => ({
          date: date,
          time: row.time,
          ...(DetailsByParam.length !== 0 && { line_id: lineId[index] }),
          // line_id:lineId[index],
          product_name: row.productName,
          position1: row.positionOne,
          position2: row.positionTwo,
          position3: row.positionThree,
          position4: row.positionFour,
          position5: row.positionFive,
          position6: row.positionSix,
          position7: row.positionSeven,
          position8: row.positionEight,
          position9: row.positionNine,
          corrective_action: row.action,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SaveMetalDetector`,
        payload,
        { headers }
      );
      if (toDelete.length > 0) {
        
        await Promise.all(
          toDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/deleteMetalCalibration?line_id=${id}`,
              { headers }
            );
          })
        );
        setToDelete([]);
      }
      setTimeout(() => {
        navigate("/Precot/QA/F-58/Summary");
      }, 1500);
      message.success("Record Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data?.message);
      throw new Error("Failed to save Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitRecord = async () => {
    setSubmitLoading(true);

    try {
      const payload = {
        formatName: "METAL DETECTOR CALIBRATION RECORD",
        formatNo: "PH-QAD01-F-058",
        revisionNo: 1,
        sopNumber: "PH-QAD01-D-44",
        unit: "H",
        department: department,
        eq_id: eqId,
        date: date,
        month: monthName,
        year: yearName,
        metal_id: Id,
        details: rows.map((row, index) => ({
          date: date,
          time: row.time,
          ...(DetailsByParam.length !== 0 && { line_id: lineId[index] }),
          // line_id:lineId[index],
          product_name: row.productName || "NA",
          position1: row.positionOne,
          position2: row.positionTwo,
          position3: row.positionThree,
          position4: row.positionFour,
          position5: row.positionFive,
          position6: row.positionSix,
          position7: row.positionSeven,
          position8: row.positionEight,
          position9: row.positionNine,
          corrective_action: row.action || "NA",
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SubmitMetalDetector`,
        payload,
        { headers }
      );
      if (toDelete.length > 0) {
        await Promise.all(
          toDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/deleteMetalCalibration?line_id=${id}`,
              { headers }
            );
          })
        );
        setToDelete([]);
      }
      setTimeout(() => {
        navigate("/Precot/QA/F-58/Summary");
      }, 1500);

      message.success("Submitted Successfully");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data?.message);
      throw new Error("Failed to submit Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/ApproveOrRejectMetalDetector`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-58/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/ApproveOrRejectMetalDetector`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-58/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-58/Summary");
  };

  useEffect(() => {
    if (id !== "null") {
      fetchDetailsByParam();
    } else {
      if (role == "QA_MANAGER" || role == "ROLE_MR") {
        message.warning(`No data's are submitted yet!`);
        setTimeout(() => {
          navigate("/Precot/QA/F-58/Summary");
        }, 2000);
        return;
      }
    }
  }, []);

  const fetchDetailsByParam = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/getById?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setDetailsByParam(response.data);
      if (response.data && response.data.length !== 0) {
        setId(response.data.metal_id);
        setLineId(response.data.details.map((item) => item.line_id));
        setRows(
          response.data.details.map((item) => ({
            time: item.time,
            productName: item.product_name,
            positionOne: item.position1,
            positionTwo: item.position2,
            positionThree: item.position3,
            positionFour: item.position4,
            positionFive: item.position5,
            positionSix: item.position6,
            positionSeven: item.position7,
            positionEight: item.position8,
            positionNine: item.position9,
            action: item.corrective_action,
          }))
        );
      } else {
        
      }
      if (
        (role == "ROLE_QA" &&
          response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
        (role == "ROLE_QA" &&
          response.data.qa_inspector_status == "QA_INSPECTOR_REJECTED")
      ) {
        message.error("Supervisor Not Yet Approved");
        setTimeout(() => {
          navigate("/Precot/QA/F-58/Summary");
        }, 1500);
      }
      if (
        (role == "ROLE_SUPERVISOR" &&
          response.data.operator_status !== "OPERATOR_APPROVED") ||
        (role == "ROLE_SUPERVISOR" &&
          (response.data.supervisor_status == "SUPERVISOR_REJECTED" ||
            response.data.qa_inspector_status == "QA_INSPECTOR_REJECTED"))
      ) {
        message.error("Operator Not Yet Approved");
        setTimeout(() => {
          navigate("/Precot/QA/F-58/Summary");
        }, 1500);
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      // message.error(error.message);
    } finally {
    }
  };
  // Onchange Functions
  const handleTimeChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].time = value;
    setRows(updatedRows);
  };
  const handleProductNameChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].productName = value;
    setRows(updatedRows);
  };
  const handleActionChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].action = value;
    setRows(updatedRows);
  };
  const handlePositionOneChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].positionOne = value;
    setRows(updatedRows);
  };
  const handlePositionTwoChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].positionTwo = value;
    setRows(updatedRows);
  };
  const handlePositionThreeChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].positionThree = value;
    setRows(updatedRows);
  };
  const handlePositionFourChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].positionFour = value;
    setRows(updatedRows);
  };
  const handlePositionFiveChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].positionFive = value;
    setRows(updatedRows);
  };
  const handlePositionSixChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].positionSix = value;
    setRows(updatedRows);
  };
  const handlePositionSevenChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].positionSeven = value;
    setRows(updatedRows);
  };
  const handlePositionEightChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].positionEight = value;
    setRows(updatedRows);
  };
  const handlePositionNineChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].positionNine = value;
    setRows(updatedRows);
  };
  const items = [
    {
      key: "1",
      label: <p>Record</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th
                colSpan="10"
                rowSpan="2"
                style={{ textAlign: "center", height: "30px" }}
              >
                Date
              </th>
              <th colSpan="15" rowSpan="2" style={{ textAlign: "center" }}>
                Time
              </th>
              <th colSpan="25" rowSpan="2" style={{ textAlign: "center" }}>
                Product Name / Code
              </th>
              <th colSpan="90" style={{ textAlign: "center" }}>
                Position
              </th>
              <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                Corrective Action, If failed in Calibration
              </th>
              <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                Actions
              </th>
            </tr>
            <tr>
              <th colSpan="10" style={{ textAlign: "center", height: "20px" }}>
                1
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                2
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                3
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                4
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                5
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                6
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                7
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                8
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                9
              </th>
            </tr>
            {rows.map((row, index) => (
              <tr key={row.lineIdF}>
                <td
                  colSpan="10"
                  style={{ textAlign: "center", height: "20px" }}
                >
                  {formattedDate(date)}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  <input
                    type="time"
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.time}
                    onChange={(e) => handleTimeChange(e.target.value, index)}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                  />
                </td>
                <td colSpan="25" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.productName}
                    onChange={(e) =>
                      handleProductNameChange(e.target.value, index)
                    }
                    onKeyDown={handleKeyDownNum}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                  />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={row.positionOne === "Y"}
                    value={row.positionOne}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    onChange={(e) =>
                      handlePositionOneChange(
                        e.target.checked ? "Y" : null,
                        index
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ✔
                  </Checkbox>
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={row.positionTwo === "Y"}
                    value={row.positionTwo}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    onChange={(e) =>
                      handlePositionTwoChange(
                        e.target.checked ? "Y" : null,
                        index
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ✔
                  </Checkbox>
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={row.positionThree === "Y"}
                    value={row.positionThree}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    onChange={(e) =>
                      handlePositionThreeChange(
                        e.target.checked ? "Y" : null,
                        index
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ✔
                  </Checkbox>
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={row.positionFour === "Y"}
                    value={row.positionFour}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    onChange={(e) =>
                      handlePositionFourChange(
                        e.target.checked ? "Y" : null,
                        index
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ✔
                  </Checkbox>
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={row.positionFive === "Y"}
                    value={row.positionFive}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    onChange={(e) =>
                      handlePositionFiveChange(
                        e.target.checked ? "Y" : null,
                        index
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ✔
                  </Checkbox>
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={row.positionSix === "Y"}
                    value={row.positionSix}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    onChange={(e) =>
                      handlePositionSixChange(
                        e.target.checked ? "Y" : null,
                        index
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ✔
                  </Checkbox>
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={row.positionSeven === "Y"}
                    value={row.positionSeven}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    onChange={(e) =>
                      handlePositionSevenChange(
                        e.target.checked ? "Y" : null,
                        index
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ✔
                  </Checkbox>
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={row.positionEight === "Y"}
                    value={row.positionEight}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    onChange={(e) =>
                      handlePositionEightChange(
                        e.target.checked ? "Y" : null,
                        index
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ✔
                  </Checkbox>
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Checkbox
                    checked={row.positionNine === "Y"}
                    value={row.positionNine}
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    onChange={(e) =>
                      handlePositionNineChange(
                        e.target.checked ? "Y" : null,
                        index
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ✔
                  </Checkbox>
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {" "}
                  <input
                    type="text"
                    className="inp-new"
                    disabled={
                      disabled || role == "QA_MANAGER" || role == "ROLE_MR"
                    }
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.action}
                    onChange={(e) => handleActionChange(e.target.value, index)}
                    onKeyDown={handleKeyDownNum}
                  />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    danger
                    style={{
                      width: "90%",
                      padding: "10px",
                    }}
                    icon={<FaTrash />}
                    disabled={role == "ROLE_MR" || role == "QA_MANAGER"}
                    onClick={() => handleDeleteRow(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </table>
          <Button
            onClick={handleAddRow}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              border: "none",
              marginTop: "10px",
              padding: "7px",
              display: disabled ? "none" : "block",
            }}
            disabled={role == "ROLE_MR" || role == "QA_MANAGER"}
          >
            <PlusOutlined style={{ marginRight: "8px" }} />
            Add Row
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Operator Signature
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Production Supervisor Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                QA Inspector Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {DetailsByParam?.operator_status === "OPERATOR_APPROVED" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{DetailsByParam?.operator_sign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.operator_submitted_on
                          )}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Operator Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {(DetailsByParam?.supervisor_status === "SUPERVISOR_APPROVED" ||
                  DetailsByParam?.supervisor_status ===
                    "SUPERVISOR_REJECTED") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{DetailsByParam?.supervisor_sign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.supervisor_submit_on
                          )}
                        </div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="Production Supervisor Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {(DetailsByParam?.qa_inspector_status ===
                  "QA_INSPECTOR_APPROVED" ||
                  DetailsByParam?.qa_inspector_status ===
                    "QA_INSPECTOR_REJECTED") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{DetailsByParam?.qa_inspector_sign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.qa_inspector_submitted_on
                          )}
                        </div>
                      </div>
                      {getImage3 && (
                        <img
                          src={getImage3}
                          alt="QA Inspector Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
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
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="METAL DETECTOR CALIBRATION RECORD"
        formatNo="PH-QAD01-F-058"
        sopNo="PH-QAD01-D-44"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_SUPERVISOR" || role === "ROLE_QA" ? (
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
                icon={<img src={approveIcon} alt="Approve Icon" />}
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
          ) : role === "ROLE_OPERATOR" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButton2(),
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
          ) : (
            <></>
          ),
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
              if (confirm("Are you sure want to logout")) {
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

      {/* Unique Param Row*/}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          value={formattedDate(date)}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="Department Name:"
          placeholder="Department Name"
          value={department}
          style={{ width: "30%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="EQ. ID. No.:"
          placeholder="EQ. Id"
          value={eqId}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
      </div>
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

export default QA_f58;
