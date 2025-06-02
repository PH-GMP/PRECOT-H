/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TabPane from "antd/es/tabs/TabPane.js";
import axios from "axios";
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
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const Drygoods_f01 = () => {
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const location = useLocation();
  const { date } = location.state;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [userList, setUserList] = useState([]);
  const [deleteID, setDeleteId] = useState({
    attendanceId: [],
    agendaId: [],
  });
  const [lov, setLov] = useState({
    userLov: [],
    statusLov: [
      { value: "Open", label: "Open" },
      { value: "Closed", label: "Closed" },
    ],
  });
  const [statusLoader, setStatusLoader] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    year: "",
    venue: "",
    agenda: "",
    reason: "",
    momHeaderDetails: [
      {
        so_no: "",
        name: "",
        department: "",
        sign: "",
      },
    ],
    momLineDetails: [
      {
        details_discussion: "",
        actn_taken: "",
        responsibility: "",
        target_date: "",
        status: "",
      },
    ],
  });
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityAssurance/F-027/Summary");
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setFormData((formData) => ({
      ...formData,
      reason: "",
    }));
  };
  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };

  useEffect(() => {
    if (!initialized.current) {
      if (role == "ROLE_PLANT_HEAD") {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/ListOfMomRecallParam?date=${date}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.message == "No data") {
            if (role == "ROLE_PLANT_HEAD") {
              message.warning("QA Manager or Designee yet to submit ");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-027/Summary");
              }, 1000);
              return;
            }
          }
          if (response.data.message !== "No data") {
            const data = response.data;
            if (
              role == "ROLE_PLANT_HEAD" &&
              data.manager_status != "MANAGER_APPROVED"
            ) {
              message.warning("QA Manager or Designee yet to submit ");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-027/Summary");
              }, 1000);
              return;
            }
            statusFunction(data);
            setFormData(data);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  }, []);

  const statusFunction = (responseData) => {
    if (
      (role === "QA_MANAGER" || role == "ROLE_DESIGNEE") &&
      responseData.manager_status == "MANAGER_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      (role === "QA_MANAGER" || role == "ROLE_DESIGNEE") &&
      responseData.manager_status == "MANAGER_APPROVED" &&
      (responseData.plant_head_status == "PLANT_HEAD_APPROVED" ||
        responseData.plant_head_status == "PLANT_HEAD_APPROVED" ||
        responseData.plant_head_status == "WAITING_FOR_APPROVAL" ||
        responseData.plant_head_status == "")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "ROLE_PLANT_HEAD" &&
      responseData.plant_head_status == "PLANT_HEAD_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "ROLE_PLANT_HEAD" &&
      responseData.plant_head_status == "PLANT_HEAD_REJECTED"
    ) {
      message.warning("QA Manager or Designee Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityAssurance/F-027/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  useEffect(() => {
    const signatureKeys = ["manager_sign", "plant_head_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
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
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {});
      }
    });
  }, [token, formData.plant_head_sign, formData.manager_sign]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Users/Service/getListOfUsers`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const options = response.data
          .filter((option) => option.username !== "sysadmin")
          .map((option) => ({
            value: option.username,
            label: option.username,
          }));

        setLov((prevState) => ({
          ...prevState,
          userLov: options,
        }));
        setUserList(response.data);
        response.data.map((data, index) =>
          fetchSignature(data.username, data.username)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
  }, []);

  const fetchSignature = async (sign, key) => {
    if (sign == "" || key == "") {
      return;
    }
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/image?username=${sign}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const url = `data:image/jpeg;base64,${base64}`;
      setESign((prevSign) => ({
        ...prevSign,
        [key]: url,
      }));
    } catch (err) {}
  };

  const getDeptId = (name) => {
    const deptID = userList.find(
      (data) => data.username === name
    )?.departmentId;
    console.log;
    const departmentName = getDeptName(deptID);
    return departmentName;
  };

  const getDeptName = (deptId) => {
    switch (Number(deptId)) {
      case 1:
        return "Bleaching";
      case 2:
        return "Spunlace";
      case 3:
        return "Pad Punching";
      case 4:
        return "Dry Goods";
      case 5:
        return "Quality Control";
      case 6:
        return "Quality Assurance";
      case 7:
        return "PPC";
      case 8:
        return "Store";
      case 9:
        return "Dispatch";
      case 10:
        return "Product Development";
      case 11:
        return "Engineering";
      case 12:
        return "Cotton Buds";
    }
  };

  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "QA_MANAGER" || role == "ROLE_DESIGNEE") {
      if (deleteID.attendanceId.length > 0) {
        try {
          for (let i = 0; i < deleteID.attendanceId.length; i++) {
            handleDelete(deleteID.attendanceId[i], "attendance");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      if (deleteID.agendaId.length > 0) {
        try {
          for (let i = 0; i < deleteID.agendaId.length; i++) {
            handleDelete(deleteID.agendaId[i], "discussion");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/SaveMomMocRecall`;
      payload = {
        mom_id: formData.mom_id,
        unit: "Unit H",
        formatNo: "PH-QAD01-F-027",
        formatName: "MINUTES OF MEETING - MOCK RECALL",
        sopNumber: "PH-QAD01-D-24",
        revisionNo: "01",
        date: date,
        year: getMonthAndYear(date).year,
        month: getMonthAndYear(date).month,
        venue: formData.venue,
        agenda: formData.agenda,
        reason: "",
        momHeaderDetails: formData.momHeaderDetails.map((row, index) => ({
          ...row,
          hed_id: row.hed_id,
          mom_id: formData.mom_id,
          so_no: index + 1,
          name: row.name,
          department: getDeptId(row.name),
          sign: row.sign,
        })),
        momLineDetails: formData.momLineDetails.map((row, index) => ({
          ...row,
          lin_id: row.lin_id,
          mom_id: formData.mom_id,
          details_discussion: row.details_discussion,
          actn_taken: row.actn_taken,
          responsibility: row.responsibility,
          target_date: row.target_date,
          status: row.status,
        })),
      };
    } else if (role == "ROLE_PLANT_HEAD") {
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/MomMocRecallapproveOrReject`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.mom_id,
        formatNo: "PH-QAD01-F-027",
        status: "Approve",
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod =
        role === "QA_MANAGER" || role == "ROLE_DESIGNEE"
          ? axios.post
          : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityAssurance/F-027/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_DESIGNEE" || role == "QA_MANAGER") {
      if (formData.venue == "" || formData.venue == null) {
        message.warning("Please Enter The Venue");
        return;
      }

      for (let index = 0; index < formData.momHeaderDetails.length; index++) {
        const row = formData.momHeaderDetails[index];
        if (row.name == "") {
          message.warning(`Please Select The Name in row ${index + 1}`);
          return;
        }
      }
      if (formData.agenda == "" || formData.agenda == null) {
        message.warning("Please Enter The Agenda");
        return;
      }
      for (let index = 0; index < formData.momLineDetails.length; index++) {
        const row = formData.momLineDetails[index];
        if (
          row.details_discussion == "" ||
          row.actn_taken == "" ||
          row.responsibility == "" ||
          row.target_date == "" ||
          row.status == ""
        ) {
          message.warning(
            `Please Enter The All Details in Agenda row ${index + 1}`
          );
          return;
        }
      }
      if (deleteID.attendanceId.length > 0) {
        try {
          for (let i = 0; i < deleteID.attendanceId.length; i++) {
            handleDelete(deleteID.attendanceId[i], "attendance");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      if (deleteID.agendaId.length > 0) {
        try {
          for (let i = 0; i < deleteID.agendaId.length; i++) {
            handleDelete(deleteID.agendaId[i], "discussion");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Submitted Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/SubmitMomMocRecall`;
      payload = {
        mom_id: formData.mom_id,
        unit: "Unit H",
        formatNo: "PH-QAD01-F-027",
        formatName: "MINUTES OF MEETING - MOCK RECALL",
        sopNumber: "PH-QAD01-D-24",
        revisionNo: "01",
        date: date,
        year: getMonthAndYear(date).year,
        month: getMonthAndYear(date).month,
        venue: formData.venue,
        agenda: formData.agenda,
        reason: "",
        momHeaderDetails: formData.momHeaderDetails.map((row, index) => ({
          ...row,
          hed_id: row.hed_id,
          mom_id: formData.mom_id,
          so_no: index + 1,
          name: row.name,
          department: getDeptId(row.name),
          sign: row.sign,
        })),
        momLineDetails: formData.momLineDetails.map((row, index) => ({
          ...row,
          lin_id: row.lin_id,
          mom_id: formData.mom_id,
          details_discussion: row.details_discussion,
          actn_taken: row.actn_taken,
          responsibility: row.responsibility,
          target_date: row.target_date,
          status: row.status,
        })),
      };
    } else if (role == "ROLE_PLANT_HEAD") {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }

      apiurl = `${API.prodUrl}/Precot/api/QA/Service/MomMocRecallapproveOrReject`;
      succesMsg = "Rejected Successfully";
      payload = {
        id: formData.mom_id,
        formatNo: "PH-QAD01-F-027",
        status: "Reject",
        remarks: formData.reason,
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod =
        role == "QA_MANAGER" || role == "ROLE_DESIGNEE"
          ? axios.post
          : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityAssurance/F-027/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleArrayInput = (value, fieldName, index, type) => {
    if (type == "attendance") {
      const updatedIdentity = formData.momHeaderDetails.map((row, idx) => {
        if (idx === index) {
          return { ...row, [fieldName]: value };
        }
        return row;
      });

      setFormData({
        ...formData,
        momHeaderDetails: updatedIdentity,
      });
    } else if (type == "agenda") {
      const updatedIdentity = formData.momLineDetails.map((row, idx) => {
        if (idx === index) {
          return { ...row, [fieldName]: value };
        }
        return row;
      });

      setFormData({
        ...formData,
        momLineDetails: updatedIdentity,
      });
    }
  };

  const handleAddRow = (type) => {
    if (type == "attendance") {
      setFormData((prevState) => ({
        ...prevState,
        momHeaderDetails: [
          ...prevState.momHeaderDetails,
          {
            so_no: "",
            name: "",
            department: "",
            sign: "",
          },
        ],
      }));
    } else if (type == "agenda") {
      setFormData((prevState) => ({
        ...prevState,
        momLineDetails: [
          ...prevState.momLineDetails,
          {
            details_discussion: "",
            actn_taken: "",
            responsibility: "",
            target_date: "",
            status: "",
          },
        ],
      }));
    }
  };
  const handleDeleteRow = async (index, rowId, type) => {
    if (type == "attendance") {
      if (formData.momHeaderDetails.length == 1) {
        return;
      }
      const confirm = window.confirm("Are You Sure To Delete This Row?");
      if (confirm) {
        if (rowId && formData.momHeaderDetails.length !== 1) {
          setDeleteId((prevState) => ({
            ...prevState,
            attendanceId: [...prevState.attendanceId, rowId],
          }));
          setFormData((prevState) => ({
            ...prevState,
            momHeaderDetails: prevState.momHeaderDetails.filter(
              (_, i) => i !== index
            ),
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            momHeaderDetails: prevState.momHeaderDetails.filter(
              (_, i) => i !== index
            ),
          }));
        }
      }
    }
    if (type == "agenda") {
      if (formData.momLineDetails.length == 1) {
        return;
      }
      const confirm = window.confirm("Are You Sure To Delete This Row?");
      if (confirm) {
        if (rowId && formData.momLineDetails.length !== 1) {
          setDeleteId((prevState) => ({
            ...prevState,
            agendaId: [...prevState.agendaId, rowId],
          }));
          setFormData((prevState) => ({
            ...prevState,
            momLineDetails: prevState.momLineDetails.filter(
              (_, i) => i !== index
            ),
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            momLineDetails: prevState.momLineDetails.filter(
              (_, i) => i !== index
            ),
          }));
        }
      }
    }
  };

  const handleDelete = async (rowID, type) => {
    let apiurl;
    if (type == "attendance") {
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/deleteMomRecall?id=${rowID}&key=HEADER`;
    } else if (type == "discussion") {
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/deleteMomRecall?id=${rowID}&key=LINE`;
    }

    try {
      const response = await axios.delete(apiurl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleObject = (value, key) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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
  const getMonthAndYear = (dateString) => {
    const formatDate = dateString.split("-");
    return { month: formatDate[1], year: formatDate[0] };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  return (
    <>
      <BleachingHeader
        formName={"MINUTES OF MEETING - MOCK RECALL"}
        formatNo={"PH-QAD01-F-027"}
        unit={"UNIT H"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status.saveStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role === "QA_MANAGER" || role == "ROLE_DESIGNEE" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role === "QA_MANAGER" || role == "ROLE_DESIGNEE"
              ? "Save"
              : "Approve"}
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status.submitStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role === "QA_MANAGER" || role == "ROLE_DESIGNEE" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={
              role === "QA_MANAGER" || role == "ROLE_DESIGNEE"
                ? handleSubmit
                : rejectFlow
            }
            loading={statusLoader}
          >
            {role === "QA_MANAGER" || role == "ROLE_DESIGNEE"
              ? " Submit"
              : "   Reject"}
          </Button>,
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
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
            onClick={handleSubmit}
            loading={statusLoader}
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
          onChange={handleRejectReason}
        ></TextArea>
      </Modal>

      <div style={{ margin: "10px" }}>
        <Input
          value={formatDate(date)}
          addonBefore={"Date :"}
          style={{ width: "200px", textAlign: "center" }}
          readOnly
        ></Input>
        <Input
          type="text"
          value={formData.venue}
          addonBefore={"Venue : "}
          onChange={(e) => {
            handleObject(e.target.value, "venue");
          }}
          onKeyDown={(e) => {
            handleSelectText(e);
          }}
          style={{ textAlign: "center", width: "200px", marginLeft: "5px" }}
          readOnly={status.fieldStatus}
        />
      </div>
      <Tabs>
        <TabPane tab="Members Present" key={1}>
          <div style={{ height: "50vh" }}>
            <table style={{ tableLayout: "fixed" }}>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S. No.</td>
                <td style={{ textAlign: "center" }}>Name</td>
                <td style={{ textAlign: "center" }}>Department</td>
                <td style={{ textAlign: "center" }}>Signature</td>
                <td style={{ textAlign: "center" }}>Actions</td>
              </tr>
              {formData.momHeaderDetails.map((data, index) => (
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {index + 1}
                  </td>
                  <td>
                    <Select
                      value={data.name}
                      options={lov.userLov}
                      onChange={(e) => {
                        handleArrayInput(e, "name", index, "attendance");
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                      showSearch
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {getDeptId(data.name)}{" "}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {eSign[data.name] ? (
                      <img
                        src={eSign[data.name]}
                        alt="Operator eSign"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Button
                      style={{
                        textAlign: "center",
                        backgroundColor: "red",
                        color: "white",
                        gap: "0px",
                      }}
                      onClick={() => {
                        handleDeleteRow(index, data.hed_id, "attendance");
                      }}
                      disabled={status.fieldStatus || statusLoader}
                      loading={statusLoader}
                    >
                      {" "}
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              ))}
              <Button
                onClick={() => {
                  handleAddRow("attendance");
                }}
                disabled={status.fieldStatus || statusLoader}
                style={{ width: "100px", marginTop: "10px" }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </Button>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Agenda / Topic" key={2}>
          <div style={{ height: "50vh" }}>
            <table style={{ tableLayout: "fixed" }}>
              <tr>
                <td style={{ textAlign: "center" }}>Agenda / Topic</td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Details of Discussion
                </td>
                <td style={{ textAlign: "center" }}>Action Taken</td>
                <td style={{ textAlign: "center" }}>Responsibility</td>
                <td style={{ textAlign: "center" }}>Target Date</td>
                <td style={{ textAlign: "center" }}>Status</td>
                <td style={{ textAlign: "center" }}>Actions</td>
              </tr>
              {formData.momLineDetails.map((data, index) => (
                <tr>
                  {index == 0 ? (
                    <td
                      style={{ textAlign: "center" }}
                      rowSpan={formData.momLineDetails.length}
                    >
                      {" "}
                      <TextArea
                        type="textArea"
                        value={formData.agenda}
                        onChange={(e) => {
                          handleObject(e.target.value, "agenda");
                        }}
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        style={{
                          height: "100%",
                          width: "100%",
                          textAlign: "center",
                          resize: "none",
                        }}
                        readOnly={status.fieldStatus}
                      ></TextArea>
                    </td>
                  ) : null}
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      type="text"
                      value={data.details_discussion}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "details_discussion",
                          index,
                          "agenda"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      type="text"
                      value={data.actn_taken}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "actn_taken",
                          index,
                          "agenda"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      type="text"
                      value={data.responsibility}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "responsibility",
                          index,
                          "agenda"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      type="date"
                      value={data.target_date}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "target_date",
                          index,
                          "agenda"
                        );
                      }}
                      min={date}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={data.status}
                      options={lov.statusLov}
                      onChange={(e) => {
                        handleArrayInput(e, "status", index, "agenda");
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                      showSearch
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Button
                      style={{
                        textAlign: "center",
                        backgroundColor: "red",
                        color: "white",
                        gap: "0px",
                      }}
                      onClick={() => {
                        handleDeleteRow(index, data.lin_id, "agenda");
                      }}
                      disabled={status.fieldStatus || statusLoader}
                      loading={statusLoader}
                    >
                      {" "}
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              ))}
              <Button
                onClick={() => {
                  handleAddRow("agenda");
                }}
                disabled={status.fieldStatus || statusLoader}
                style={{ width: "100px", marginTop: "10px" }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </Button>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="3">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="2" style={{ textAlign: "center", width: "35%" }}>
                  Prepared by:
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Approved by:
                </td>
              </tr>
              <tr>
                <td colspan="2" style={{ height: "60%", textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        {formData.manager_sign}
                        <br />
                        {formatDateAndTime(formData.manager_submitted_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.manager_sign ? (
                        <img
                          src={eSign.manager_sign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </td>
                <td colspan="1" style={{ height: "60%", textAlign: "center" }}>
                  {formData.plant_head_status !== "WAITING_FOR_APPROVAL" &&
                    formData.plant_head_status !== "" && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            {formData.plant_head_sign}
                            <br />
                            {formatDateAndTime(formData.plant_head_approved_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.plant_head_sign ? (
                            <img
                              src={eSign.plant_head_sign}
                              alt="Supervisor eSign"
                              style={{
                                width: "150px",
                                height: "70px",
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
            </table>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default Drygoods_f01;
