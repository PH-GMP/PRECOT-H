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
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload, FaDownload, FaUserCircle } from "react-icons/fa";
import BleachingHeader from "../Components/BleachingHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";

import moment from "moment";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f23 = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date, supplierName } = state || {};

  console.log("sss", supplierName);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [fetchedData, setFetchedData] = useState("");
  const [incidenceId, setIncidenceId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
  const [department, setDepartment] = useState("");

  const [SupplierRep, SetSupplierRep] = useState("");

  const [Objectives, setObjectives] = useState("");
  const [Scope, SetScope] = useState("");
  const [Methodology, SetMethodology] = useState("");
  const [AreasAudited, SetAreasAudited] = useState("");
  const [Attachments, setAttachments] = useState("");
  const [Observation, setObservation] = useState("");
  const [Auditor, setAuditor] = useState("");
  const [Address, SetAddress] = useState("");
  const [SupplierMail, SetSupplierMail] = useState("");
  const [AuditorMail, SetAuditorMail] = useState("");
  const [reportId, setreportId] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [remark, setRemark] = useState("");
  const [statusOfActionTaken, setStatusOfActionTaken] = useState("");
  const SeverityLov = [
    { id: 1, value: " High" },
    { id: 2, value: "Medium" },
    { id: 3, value: "Low" },
  ];
  const StatusLov = [
    { id: 1, value: " Open" },
    { id: 2, value: "Closed" },
    { id: 3, value: "In-process" },
  ];
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDatewithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const canDisplayButtons = () => {
    if (
      role == "ROLE_HOD" ||
      role == "ROLE_MR" ||
      role == "QA_MANAGER" ||
      role == "QA_DESIGNEE"
    ) {
      if (selectedRow?.auditorStatus === "AUDITOR_SUBMITTED") {
        return "none";
      }
      return "block";
    }
    return "block";
  };

  const canDisplayButtons1 = () => {
    if (
      role == "ROLE_HOD" ||
      role == "ROLE_MR" ||
      role == "QA_MANAGER" ||
      role == "QA_DESIGNEE"
    ) {
      if (selectedRow?.auditorStatus !== "AUDITOR_SUBMITTED") {
        return "none";
      }
      return "block";
    }
    return "block";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.auditorSign;
    if (username) {
      console.log("usernameparams", username);

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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow, API.prodUrl, token]);

  const roleauth = localStorage.getItem("role");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const token = localStorage.getItem("token");

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const supplier = supplierName;
      const fileName = `${supplier}/${date}`;
      formData.append("fileName", fileName);

      const report = reportId;
      formData.append("reportId", report);

      // Show loader message
      const loadingMessage = message.loading("Uploading... Please wait.", 0); // 0 duration keeps it open

      try {
        const response = await axios.put(
          `${API.prodUrl}/Precot/api/QA/Service/supplierAuditReport/saveReportPdf`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }
        );

        message.success("PDF uploaded successfully!");
        setTimeout(() => {
          navigate("/Precot/QA/F-23/Summary");
        }, 1500);
      } catch (error) {
        console.error("Error uploading PDF:", error);
        alert("Error uploading PDF. Please try again.");
      } finally {
        // Remove loader message
        loadingMessage(); // Close the loading message
      }
    } else {
      alert("No file selected.");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/supplierAuditReport/getReportPdf?reportId=${reportId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedDate = new Date(date).toLocaleDateString("en-GB");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${supplierName}_${formattedDate}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        navigate("/Precot/QA/F-23/Summary");
      }, 1500);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await SaveManagementOfIncidents();
    } catch (error) {
      console.error("Error saving Management Of Incidence:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitManagementOfIncidence();
    } catch (error) {
      console.error("Error submitting Management Of Incidence..", error);
    }
  };

  const SaveManagementOfIncidents = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        unit: "Unit-H",
        formatName: "Supplier Audit Report",
        formatNo: "PH-QAD01-F-023",
        revisionNo: "2",
        sopNumber: "PH-QAD01-D-22",
        reportDate: date,
        supplierName: supplierName,
        auditorNameToSign: "",
        auditorDateToSign: "",
        supplierDateToSign: "",
        supplierStatus: "",
        supplierRepresentative: SupplierRep === "" ? "NA" : SupplierRep,
        auditors: Auditor === "" ? "NA" : Auditor,
        supplierEmailId: SupplierMail === "" ? "NA" : SupplierMail,
        auditorEmailId: AuditorMail === "" ? "NA" : AuditorMail,
        address: Address === "" ? "NA" : Address,
        objectives: Objectives === "" ? "NA" : Objectives,
        scope: Scope === "" ? "NA" : Scope,
        methodology: Methodology === "" ? "NA" : Methodology,
        areasAudited: AreasAudited === "" ? "NA" : AreasAudited,
        attachments: Attachments === "" ? "NA" : Attachments,
        observation: Observation === "" ? "NA" : Observation,
        ...(reportId && { reportId: reportId }),
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/supplierAuditReport/saveSupplierAuditReport`,
        payload,
        { headers }
      );

      message.success("Report Saved Successfully..");
      setTimeout(() => {
        navigate("/Precot/QA/F-23/Summary");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save  Report !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const validateForm = () => {
    if (!SupplierMail || SupplierMail.length === 0) {
      message.error("Please Enter the Supplier MailId");
      return false;
    }

    if (!AuditorMail || AuditorMail.length === 0) {
      message.error("Please Enter the Auditor MailId");
      return false;
    }

    return true;
  };

  const SubmitManagementOfIncidence = async () => {
    setSubmitLoading(true);

    if (!validateForm()) {
      setSubmitLoading(false);
      return;
    }

    try {
      const payload = {
        unit: "Unit-H",
        formatName: "Supplier Audit Report",
        formatNo: "PH-QAD01-F-023",
        revisionNo: "2",
        sopNumber: "PH-QAD01-D-22",
        reportDate: date,
        supplierName: supplierName,
        auditorNameToSign: "",
        auditorDateToSign: "",
        supplierDateToSign: "",
        supplierStatus: "",

        supplierRepresentative: SupplierRep === "" ? "NA" : SupplierRep,
        auditors: Auditor === "" ? "NA" : Auditor,
        supplierEmailId: SupplierMail === "" ? "NA" : SupplierMail,
        auditorEmailId: AuditorMail === "" ? "NA" : AuditorMail,
        address: Address === "" ? "NA" : Address,
        objectives: Objectives === "" ? "NA" : Objectives,
        scope: Scope === "" ? "NA" : Scope,
        methodology: Methodology === "" ? "NA" : Methodology,
        areasAudited: AreasAudited === "" ? "NA" : AreasAudited,
        attachments: Attachments === "" ? "NA" : Attachments,
        observation: Observation === "" ? "NA" : Observation,
        ...(reportId && { reportId: reportId }),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/supplierAuditReport/submitSupplierAuditReport`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-23/Summary");
      }, 1500);
      message.success("Report Submitted Successfully");
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error("Failed to submit Report!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-23/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/supplierAuditReport/getReportByDateAndSupplier?supplierName=${supplierName}&reportDate=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      console.log("Data", response.data);

      if (response.data) {
        SetSupplierRep(response.data.supplierRepresentative);
        setAuditor(response.data.auditors);
        SetAddress(response.data.address);
        SetSupplierMail(response.data.supplierEmailId);
        SetAuditorMail(response.data.auditorEmailId);
        setObjectives(response.data.objectives);
        SetScope(response.data.scope);
        SetMethodology(response.data.methodology);
        SetAreasAudited(response.data.areasAudited);
        setAttachments(response.data.attachments);
        setObservation(response.data.observation);
        setreportId(response.data.reportId);
        setSelectedRow(response.data);
      } else {
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Supplier Audit Report</p>,
      children: (
        <div>
          <table style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}>
            <tr>
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Objectives:
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={Objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  rows={1}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                  disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
                />
              </th>
            </tr>
            <tr>
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Scope:{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={Scope}
                  disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
                  onChange={(e) => SetScope(e.target.value)}
                  rows={1}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                />
              </th>
            </tr>
            <tr>
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Methodology:{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={Methodology}
                  disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
                  onChange={(e) => SetMethodology(e.target.value)}
                  rows={1}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                />
              </th>
            </tr>

            <tr>
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Areas Audited :{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={AreasAudited}
                  disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
                  onChange={(e) => SetAreasAudited(e.target.value)}
                  rows={1}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                />
              </th>
            </tr>

            <tr>
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Attachments:{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={Attachments}
                  disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
                  onChange={(e) => setAttachments(e.target.value)}
                  rows={1}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                />
              </th>
            </tr>

            <tr>
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Observation:{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={Observation}
                  disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
                  onChange={(e) => setObservation(e.target.value)}
                  rows={1}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                />
              </th>
            </tr>
          </table>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "50%", margin: "auto" }}>
            <tr>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Auditor(s)
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
                {selectedRow?.auditorStatus === "AUDITOR_SUBMITTED" && (
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
                        <div>{selectedRow?.auditorSign}</div>
                        <div>
                          {formattedDatewithTime(selectedRow?.auditorSubmitOn)}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Hod Sign"
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
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="Supplier Audit Report"
        formatNo="PH-QAD01-F-023"
        sopNo="PH-QAD01-D-22"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role == "ROLE_HOD" ||
          role == "ROLE_MR" ||
          role == "QA_MANAGER" ||
          role == "QA_DESIGNEE" ? (
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
          ) : null,
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
              display: canDisplayButtons1(),
            }}
            shape="round"
            icon={<FaUpload color="#00308F" />}
            onClick={() => {
              document.getElementById("pdf-upload-input").click();
            }}
          >
            &nbsp;PDF
          </Button>,
          <input
            type="file"
            id="pdf-upload-input"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleUpload}
          />,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: canDisplayButtons1(),
            }}
            shape="round"
            icon={<FaDownload color="#00308F" />}
            onClick={handleDownload}
          >
            &nbsp;PDF
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
              if (confirm("Are you sure you want to logout?")) {
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

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          marginLeft: "20px",
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          value={formattedDate(date)}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
          disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
        />
        <Input
          addonBefore="Supplier Name"
          placeholder="Supplier Name"
          value={supplierName}
          readOnly
          style={{ width: "30%", height: "35px" }}
          disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
        />
        <Input
          addonBefore="Supplier’s Representative: "
          placeholder="Supplier’s Representative: "
          type="text"
          value={SupplierRep}
          onChange={(e) => SetSupplierRep(e.target.value)}
          style={{ width: "30%", height: "35px" }}
          disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
        />

        <Input
          addonBefore="Auditor:"
          type="text"
          value={Auditor}
          onChange={(e) => setAuditor(e.target.value)}
          style={{ width: "24%", height: "35px", marginRight: "25px" }}
          placeholder="Enter the Auditor Name"
          disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          marginLeft: "20px",
          maxWidth: "100%",
        }}
      >
        <Input
          addonBefore="Supplier Mail:"
          type="email"
          value={SupplierMail}
          onChange={(e) => SetSupplierMail(e.target.value)}
          style={{ width: "30%", height: "35px", marginLeft: "5px" }}
          placeholder="Enter the Supplier Mail"
          disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
        />

        <Input
          addonBefore="Auditor Mail:"
          type="email"
          value={AuditorMail}
          disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
          onChange={(e) => SetAuditorMail(e.target.value)}
          style={{ width: "30%", height: "35px", marginRight: "10px" }}
          placeholder="Enter the Auditor Mail"
        />

        <Input.TextArea
          addonBefore="Address"
          placeholder="Enter Address"
          value={Address}
          onChange={(e) => SetAddress(e.target.value)}
          style={{ width: "25%", height: "50px" }}
          disabled={selectedRow.auditorStatus === "AUDITOR_SUBMITTED"}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "22px",
          width: "100%",
          marginLeft: "20px",
          maxWidth: "100%",
        }}
      ></div>

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

export default QA_f23;
