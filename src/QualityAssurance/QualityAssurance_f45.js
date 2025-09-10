/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Tabs, Tooltip } from "antd";
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
const QualityAssurance_f43 = () => {
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
    reason: "",
    date: "",
    month: "",
    year: "",
    departmentName: "",
    details: [
      {
        date: "",
        departmentName: department,
        noOfBmr: "",
        issuedBy: "",
        receivedBy: "",
      },
    ],
  });
  const [deleteId, setDeleteId] = useState([]);
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    qa_inspector_sign: "",
    supervisor_sign: "",
  });
  const initialized = useRef(false);

  useEffect(() => {
    const signatureKeys = ["qa_inspector_sign", "supervisor_sign"];
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
  }, [formData.qa_inspector_sign, formData.supervisor_sign]);

  const deptValidation = (deptName) => {
    if (deptName !== department) {
      setTimeout(() => {
        message.warning("You Are Not Authorized to Access This Department");
        navigate("/Precot/QualityAssurance/F-045/Summary");
      }, [500]);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      if (role == "ROLE_SUPERVISOR") {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      if (role == "ROLE_SUPERVISOR") {
        const deptId = localStorage.getItem("departmentId");
        switch (Number(deptId)) {
          case 1:
            deptValidation("Bleaching");
            break;
          case 2:
            deptValidation("Spunlace");
            break;
          case 3:
            deptValidation("Pad Punching");
            break;
          case 4:
            deptValidation("Dry Goods");
            break;
          case 12:
            deptValidation("Cotton Buds");
            break;
        }
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/api/findByParamBmrIssueRegister?date=${date}&department=${department}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (role == "ROLE_SUPERVISOR") {
              message.warning("QA Inspector yet to submit");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-045/Summary");
              }, 1000);
              return;
            }
            if (role == "QA_MANAGER" || role == "ROLE_MR") {
              message.warning(
                `No data's are submitted on this date ${date} yet!`
              );
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-045/Summary");
              }, 2000);
              return;
            }
          }

          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              role == "ROLE_SUPERVISOR" &&
              data.qa_inspector_status != "QA_INSPECTOR_APPROVED"
            ) {
              message.warning("QA Inspector yet to Submit");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-045/Summary");
              }, 1000);
            }
            statusFunction(data);
            setFormData(response.data[0]);
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
      role == "ROLE_QA" &&
      responseData.qa_inspector_status == "QA_INSPECTOR_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_QA" &&
      responseData.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
      (responseData.supervisor_status == "WAITING_FOR_APPROVAL" ||
        responseData.supervisor_status == "PRODUCTION_SUPERVISOR_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "PRODUCTION_SUPERVISOR_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "PRODUCTION_SUPERVISOR_REJECTED"
    ) {
      message.warning("QA Inspector Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityAssurance/F-045/Summary");
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
    if (role == "ROLE_QA") {
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
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/saveBmrIssueRegister`;
      payload = {
        bmrIssueId: formData.bmrIssueId,
        unit: "Unit H",
        formatNo: "PH-QAD01/F-045",
        formatName: "BMR - Issue Register",
        sopNumber: "PH-QAD01-D-43",
        revisionNo: "01",
        reason: "",
        date: date,
        month: getMonthAndYear(date).month,
        year: getMonthAndYear(date).year,
        departmentName: department,
        details: formData.details.map((row, index) => ({
          ...row,
          date: date,
          departmentName: row.departmentName,
          noOfBmr: row.noOfBmr,
          bmrIssueId: formData.bmrIssueId,
          line_id: row.line_id,
        })),
      };
    } else if (role == "ROLE_SUPERVISOR") {
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectBmrIssueRegister`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.bmrIssueId,
        formatNo: "PH-QAD01/F-045",
        status: "Approve",
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_QA" ? axios.post : axios.put;
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
          navigate("/Precot/QualityAssurance/F-045/Summary");
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
    if (role == "ROLE_QA") {
      for (let index = 0; index < formData.details.length; index++) {
        const row = formData.details[index];
        if (row.noOfBmr === "") {
          message.warning(`Please Enter BMR Count in row ${index + 1}`);
          return;
        }
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
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/SubmitBmrIssueRegister`;
      payload = {
        bmrIssueId: formData.bmrIssueId,
        unit: "Unit H",
        formatNo: "PH-QAD01/F-045",
        formatName: "BMR - Issue Register",
        sopNumber: "PH-QAD01-D-43",
        revisionNo: "01",
        reason: "",
        date: date,
        month: getMonthAndYear(date).month,
        year: getMonthAndYear(date).year,
        departmentName: department,
        details: formData.details.map((row, index) => ({
          ...row,
          date: date,
          departmentName: row.departmentName,
          noOfBmr: row.noOfBmr,
          bmrIssueId: formData.bmrIssueId,
          line_id: row.line_id,
        })),
      };
    } else if (role == "ROLE_SUPERVISOR") {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }

      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectBmrIssueRegister`;
      succesMsg = "Rejected Successfully";
      payload = {
        id: formData.bmrIssueId,
        formatNo: "PH-QAD01/F-045",
        status: "Reject",
        remarks: formData.reason,
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_QA" ? axios.post : axios.put;
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
          navigate("/Precot/QualityAssurance/F-045/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleFormParams = (value, name, index) => {
    setFormData((prevState) => ({
      ...prevState,
      details: prevState.details.map((item, i) =>
        i == index ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleE = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleDelete = async (rowId) => {
    try {
      const response = await axios.delete(
        `${API.prodUrl}/Precot/api/QA/Service/api/deleteBmrIssueRegister?id=${rowId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
      }
    } catch (err) {
      setStatusLoader(false);
      message.error(err.response.data.message);
    }
  };
  const handleDeleteRow = async (index, rowId) => {
    if (formData.details.length == 1) {
      return;
    }
    const confirm = window.confirm("Are You Sure To Delete This Row?");
    if (confirm) {
      if (rowId && formData.details.length !== 1) {
        setDeleteId((prevDeleteId) => [...prevDeleteId, rowId]);
        setFormData((prevState) => ({
          ...prevState,
          details: prevState.details.filter((_, i) => i !== index),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          details: prevState.details.filter((_, i) => i !== index),
        }));
      }
    }
  };

  const handleAddRow = () => {
    setFormData((prevState) => ({
      ...prevState,
      details: [
        ...prevState.details,
        {
          date: "",
          departmentName: department,
          noOfBmr: "",
          issuedBy: "",
          receivedBy: "",
        },
      ],
    }));
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityAssurance/F-045/Summary");
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
        formName={"BMR - Issue Register"}
        formatNo={"PH-QAD01/F-045"}
        unit={"UNIT H"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_QA" || role === "ROLE_SUPERVISOR" ? (
            <>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  alignItems: "center",
                  gap: "8px",
                }}
                shape="round"
                icon={
                  role === "ROLE_QA" ? (
                    <IoSave color="#00308F" />
                  ) : (
                    <img src={approveIcon} alt="Approve Icon" />
                  )
                }
                onClick={handleSave}
                loading={statusLoader}
              >
                {role === "ROLE_QA" ? "Save" : "Approve"}
              </Button>

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
                  role === "ROLE_QA" ? (
                    <GrDocumentStore color="#00308F" />
                  ) : (
                    <img src={rejectIcon} alt="Reject Icon" />
                  )
                }
                onClick={role === "ROLE_QA" ? handleSubmit : rejectFlow}
                loading={statusLoader}
              >
                {role === "ROLE_QA" ? "Submit" : "Reject"}
              </Button>
            </>
          ) : null,

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
          addonBefore="Date :"
          style={{ textAlign: "center", width: "250px", marginLeft: "10px" }}
          readOnly
        ></Input>
      </div>
      <Tabs>
        <TabPane tab="BMR Count" key="1">
          <div style={{ height: "50vh" }}>
            <table style={{ width: "70%" }}>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S. No.</td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Department Name
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  No. of BMR
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  {" "}
                  Actions
                </td>
              </tr>
              {formData.details.map((row, index) => (
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {index + 1}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {department}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <Input
                      type="number"
                      value={row.noOfBmr}
                      min={1}
                      onChange={(e) => {
                        handleFormParams(e.target.value, "noOfBmr", index);
                      }}
                      style={{ width: "150px", textAlign: "center" }}
                      readOnly={status.fieldStatus}
                      disabled={role == "ROLE_MR" || role == "QA_MANAGER"}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "5px",
                    }}
                  >
                    <Button
                      style={{
                        textAlign: "center",
                        backgroundColor: "red",
                        color: "white",
                        gap: "0px",
                      }}
                      onClick={() => {
                        handleDeleteRow(index, row.line_id);
                      }}
                      disabled={
                        status.fieldStatus ||
                        statusLoader ||
                        role == "ROLE_MR" ||
                        role == "QA_MANAGER"
                      }
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
                disabled={
                  status.fieldStatus ||
                  statusLoader ||
                  role == "ROLE_MR" ||
                  role == "QA_MANAGER"
                }
                style={{
                  width: "100px",
                  marginTop: "10px",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </Button>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="2">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="2" style={{ textAlign: "center", width: "35%" }}>
                  Issued by
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Received by
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
                        {formData.qa_inspector_sign}
                        <br />
                        {formatDateAndTime(formData.qa_inspector_submit_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.qa_inspector_sign ? (
                        <img
                          src={eSign.qa_inspector_sign}
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
                  {formData.supervisor_status !== "WAITING_FOR_APPROVAL" &&
                    formData.supervisor_status !== "" && (
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

export default QualityAssurance_f43;
