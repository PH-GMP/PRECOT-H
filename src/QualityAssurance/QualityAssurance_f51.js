/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
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

const { TabPane } = Tabs;
const QualityAssurance_f51 = () => {
  const location = useLocation();
  const { department, date } = location.state;
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [statusLoader, setStatusLoader] = useState(false);
  const [formData, setFormData] = useState({ 
    date: date,
    month: "",
    year: "",
    department: department,
    reason: "",
    checked_by: "", 
    ghpwcTypes: Array.from({ length: 159 }, (_, i) => ({
      identification_no: `HP${String(i + 1).padStart(3, "0")}`,
      identification_details: "",
      remarks: "",
    })),
  });

  const handleBulkUpdate = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      ghpwcTypes: prevState.ghpwcTypes.map((row) => ({
        ...row,
        identification_details: value,
      })),
    }));
  };
  const setRemarksNil = () => {
    setFormData((prevState) => ({
      ...prevState,
      ghpwcTypes: prevState.ghpwcTypes.map((row) => ({
        ...row,
        remarks: "Nil",
      })),
    }));
  };

  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    supervisor_sign: "",
    hod_sign: "",
  });
  const [deleteId, setDeleteId] = useState([]);
  const initialized = useRef(false);
  const departmentId = localStorage.getItem("departmentId");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityAssurance/F-051/Summary");
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
    const signatureKeys = ["supervisor_sign", "hod_sign"];
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
  }, [token, formData]);

  useEffect(() => {
    if (!initialized.current) {
      if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/ParamControlOfGHpWc?date=${date}&department=${department}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.message == "No data") {
            if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
              message.warning("Supervisor yet to submit");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-051/Summary");
              }, 1000);
              return;
            }
          }
          if (response.data.message !== "No data") {
            getDeptValidation(response.data.department);
            const data = response.data;
            if (
              (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
              data.supervisor_status != "SUPERVISOR_APPROVED"
            ) {
              message.warning("Supervisor yet to Submit");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-051/Summary");
              }, 1000);
            }
            statusFunction(data);
            setFormData(response.data);
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
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED" &&
      (responseData.hod_status == "WAITING_FOR_APPROVAL" ||
        responseData.hod_status == "HOD_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_REJECTED"
    ) {
      message.warning("Supervisor Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityAssurance/F-051/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_SUPERVISOR") {
      if (deleteId.length > 0) {
        try {
          for (let i = 0; i < deleteId.length; i++) {
            handleDelete(deleteId[i]);
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/SaveControlOfGHpWc`;
      payload = {
        id: formData.id,
        unit: "UNIT H",
        formatNo: "PH-QAD01-F-051",
        formatName: "CONTROL OF GLASS / HARD PLASTIC / WOOD / CERAMIC",
        sopNumber: "PH-QAD01-D-47",
        revisionNo: "01",
        date: date,
        month: getMonthAndYear(date).month,
        year: getMonthAndYear(date).year,
        department: department,
        reason: "",
        checked_by: formData.checked_by,
        ghpwcTypes: formData.ghpwcTypes.map((row, index) => ({
          ...row,
          types_id: row.types_id,
          id: formData.id,
          identification_no: row.identification_no,
          identification_details: row.identification_details,
          remarks: row.remarks || "Nil",
        })),
      };
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/ControlOfGHpWcapproveOrReject`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.id,
        formatNo: "PH-QAD01-F-051",
        status: "Approve",
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_SUPERVISOR" ? axios.post : axios.put;
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
          navigate("/Precot/QualityAssurance/F-051/Summary");
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
    if (role == "ROLE_SUPERVISOR") {
      for (let index = 0; index < formData.ghpwcTypes.length; index++) {
        const row = formData.ghpwcTypes[index];
        if (row.identification_no == "" || row.identification_details == "") {
          message.warning(`Please Enter The Details In Row ${index + 1}`);
          return;
        }
      }

      if (formData.checked_by == "") {
        message.warning("Please Enter The Details In Checked By");
        return;
      }

      if (deleteId.length > 0) {
        try {
          for (let i = 0; i < deleteId.length; i++) {
            handleDelete(deleteId[i]);
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Submitted Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/SubmitControlOfGHpWc`;
      payload = {
        id: formData.id,
        unit: "UNIT H",
        formatNo: "PH-QAD01-F-051",
        formatName: "CONTROL OF GLASS / HARD PLASTIC / WOOD / CERAMIC",
        sopNumber: "PH-QAD01-D-47",
        revisionNo: "01",
        date: date,
        month: getMonthAndYear(date).month,
        year: getMonthAndYear(date).year,
        department: department,
        reason: "",
        checked_by: formData.checked_by,
        ghpwcTypes: formData.ghpwcTypes.map((row, index) => ({
          ...row,
          types_id: row.types_id,
          id: formData.id,
          identification_no: row.identification_no,
          identification_details: row.identification_details,
          remarks: row.remarks || "Nil",
        })),
      };
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/ControlOfGHpWcapproveOrReject`;
      succesMsg = "Rejected Successfully";
      payload = {
        id: formData.id,
        formatNo: "PH-QAD01-F-051",
        status: "Reject",
        remarks: formData.reason,
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_SUPERVISOR" ? axios.post : axios.put;
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
          navigate("/Precot/QualityAssurance/F-051/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const getMonthAndYear = (dateString) => {
    const formatDate = dateString.split("-");
    return { month: formatDate[1], year: formatDate[0] };
  };

  const handleFormFields = (value, fieldName, index) => {
    const updatedIdentity = formData.ghpwcTypes.map((row, idx) => {
      if (idx === index) {
        return { ...row, [fieldName]: value };
      }
      return row;
    });

    setFormData({
      ...formData,
      ghpwcTypes: updatedIdentity,
    });
  };

  const handleInput = (value, key) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getDeptValidation = (dept) => {
    if (getDeptName(departmentId) !== dept) {
      message.warning("This Date Is Already Used By Other Department");
      setTimeout(() => {
        navigate("/Precot/QualityAssurance/F-051/Summary");
      }, [1000]);
    }
  };

  const getDeptName = (deptId) => {
    switch (Number(deptId)) {
      case 1:
        return "BLEACHING";
      case 2:
        return "SPUNLACE";
      case 3:
        return "PAD_PUNCHING";
      case 4:
        return "DRY_GOODS";
      case 6:
        return "QUALITY_ASSURANCE";
      case 12:
        return "COTTON_BUDS";
    }
  };
  const handleDelete = async (rowId) => {
    try {
      const response = await axios.delete(
        `${API.prodUrl}/Precot/api/QA/Service/ControlOfGHpWcdelete?id=${rowId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        setStatusLoader(false);
      }
    } catch (err) {}
  };

  const handleAddRow = () => {
    setFormData((prevState) => ({
      ...prevState, 
      ghpwcTypes: [
        ...prevState.ghpwcTypes,
        {
          identification_no: `HP${String(
            prevState.ghpwcTypes.length + 1
          ).padStart(3, "0")}`,
          identification_details: "",
          remarks: "",
        },
      ],
    }));
  };
  const handleDeleteRow = async (index, rowId) => {
    if (formData.ghpwcTypes.length == 1) {
      return;
    }
    const confirm = window.confirm("Are You Sure To Delete This Row?");
    if (confirm) {
      if (rowId && formData.ghpwcTypes.length !== 1) {
        setDeleteId((prevDeleteId) => [...prevDeleteId, rowId]);
        setFormData((prevState) => ({
          ...prevState,
          ghpwcTypes: prevState.ghpwcTypes.filter((_, i) => i !== index),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          ghpwcTypes: prevState.ghpwcTypes.filter((_, i) => i !== index),
        }));
      }
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

  
  const statusLov = [
    { value: "I", label: "I" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];
 
  return (
    <>
      <BleachingHeader
        formName={"CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC"}
        formatNo={"PH-QAD01-F-051"}
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
              role == "ROLE_SUPERVISOR" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_SUPERVISOR" ? "Save" : "Approve"}
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
              role == "ROLE_SUPERVISOR" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_SUPERVISOR" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            {role == "ROLE_SUPERVISOR" ? " Submit" : "   Reject"}
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
      <div style={{ margin: "20px" }}>
        <Input
          addonBefore="Department Name : "
          value={formData.department}
          style={{ textAlign: "center", width: "350px" }}
          readOnly
        ></Input>
        {/* <Input addonBefore="Month & Year :  "  value={formatMonthAndYear(date)} style={{textAlign:'center', width:'250px', marginLeft:'10px'}} readOnly></Input> */}
        <Input
          addonBefore="Date :  "
          value={formatDate(date)}
          style={{ textAlign: "center", width: "200px", marginLeft: "10px" }}
          readOnly
        ></Input>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Identify I" key="1">
          <div style={{ height: "50vh" }}>
            <table style={{ tableLayout: "fixed" }}>
              <tr>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Identification No.
                </td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Status as on date
                  <div style={{ display: "flex" }}>
                    <Button
                      onClick={() => handleBulkUpdate("I")}
                      style={{ marginRight: "10px", fontStyle: "10px" }}
                    >
                      Bulk I
                    </Button>
                    <Button
                      onClick={() => handleBulkUpdate("C")}
                      style={{ marginRight: "10px", fontStyle: "10px" }}
                    >
                      Bulk C
                    </Button>
                    <Button
                      style={{ marginRight: "10px", fontStyle: "10px" }}
                      onClick={() => handleBulkUpdate("D")}
                    >
                      Bulk D
                    </Button>
                  </div>
                </td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Remarks
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={setRemarksNil}>Bulk Nil</Button>
                  </div>
                </td>
                <td style={{ textAlign: "center" }}> Action</td>
              </tr>
              {formData.ghpwcTypes.map((row, index) => (
                <tr>
                  <td>
                    <Input
                      type="text"
                      value={row.identification_no}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleFormFields(
                          e.target.value,
                          "identification_no",
                          index
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={row.identification_details}
                      options={statusLov}
                      style={{ width: "100%", textAlign: "center" }}
                      onChange={(e) => {
                        handleFormFields(e, "identification_details", index);
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.remarks}
                      onChange={(e) => {
                        handleFormFields(e.target.value, "remarks", index);
                      }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
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
                        handleDeleteRow(index, row.types_id);
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
                onClick={handleAddRow}
                disabled={status.fieldStatus || statusLoader}
                style={{ width: "100px", marginTop: "10px" }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </Button>
            </table>
            <table style={{ marginTop: "10px" }}>
              <tr>
                <td style={{ padding: "5px" }}>
                  Abbreviation :- Intact : I Crack : C Damage / Broken : D
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Checked By I" key="2">
          <div style={{ height: "50vh" }}>
            <table style={{ tableLayout: "fixed" }}>
              <tr>
                <td style={{ textAlign: "center", padding: "50px" }}>
                  Checked by{" "}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={formData.checked_by}
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                      width: "400px",
                    }}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    onChange={(e) => {
                      handleInput(e.target.value, "checked_by");
                    }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="3">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="2" style={{ textAlign: "center", width: "35%" }}>
                  Verified Supervisor
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Production Head
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
                        {formData.supervisor_sign}
                        <br />
                        {formatDateAndTime(formData.supervisor_submit_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.supervisor_sign ? (
                        <img
                          src={eSign.supervisor_sign}
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
                  {formData.hod_status !== "WAITING_FOR_APPROVAL" &&
                    formData.hod_status !== "" && (
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
                            {formData.hod_sign}
                            <br />
                            {formatDateAndTime(formData.hod_submitted_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.hod_sign ? (
                            <img
                              src={eSign.hod_sign}
                              alt="HOD eSign"
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

export default QualityAssurance_f51;
