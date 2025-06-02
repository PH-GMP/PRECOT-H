/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import {
  InputNumber,
  Dropdown,
  Space,
  Input,
  Form,
  DatePicker,
  Button,
  Tabs,
  message,
  Tooltip,
  Modal,
  Row,
  Col,
  Select,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { BiLock } from "react-icons/bi";
import API from "../baseUrl.json";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { TbMenuDeep } from "react-icons/tb";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { FaUserCircle } from "react-icons/fa";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f20 = () => {
  const { TextArea } = Input;
  const [tabNo, setTabNo] = useState("1");
  const [statusLoader, setStatusLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = location.state;
  const initialized = useRef(false);
  const { TabPane } = Tabs;
  const [rejectModal, setRejectModal] = useState(false);
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [formData, setFormData] = useState({
    // "test_id": 12345,
    arNumber: "",
    sampledDate: "",
    testedIncubationStartOn: "",
    sampleDescription: "",
    testParametersSpecification: "",
    testCompletionDate: "",
    remark: "",
    testedBySignDate: "",
    acceptedRejected: "",
    approvedBySignDate: "",
    totalViableCountTVC: "",
    totalFungalCountTFC: "",
    gramNegativeBacteriaColiform: "",
    ecoli: "",
    staphylococcusAureus: "",
    pseudomonasAeruginosa: "",
    salmonella: "",
    reason: "",
    format: "",
    format_no: "",
    ref_sop_no: "",
    unit: "",
    year: "",
    month: "",
  });

  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    qc_sign: "",
  });

  useEffect(() => {
    const gettedDate = new Date(date);
    setFormData((prevState) => ({
      ...prevState,
      year: gettedDate.getFullYear(),
      month: gettedDate.getMonth() + 1,
    }));
  }, [date]);

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "micro_sign", "qc_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
    });
  }, [token, formData.micro_sign, formData.qc_sign]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/chemicaltest/ARF004/PDEData?pde=${date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          const data = response.data[0];
          setFormData((prevState) => ({
            ...prevState,
            supplier: data.supplier || "NA",
            description: data.description || "NA",
            po_no: data.pono || "NA",
            quantity: data.quantity || "NA",
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      if (role == "QA_MANAGER" || role == "QC_MANAGER") {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${    API.prodUrl}/Precot/api/chemicaltest/CLF020?date=${date}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (role == "QA_MANAGER" || role == "QC_MANAGER") {
              message.warning("Microbiologist Yet To Approve");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-020/Summary");
              }, [1000]);
            }
          }

          if (response.data.length > 0) {
            const data = response.data[0];
            console.log("forms Data", data);
            statusFunction(data);
            console.log(data);
            setFormData(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  const statusFunction = (data) => {
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      data.micro_status == "MICROBIOLOGIST_APPROVED"
    ) {
      setStatus((prevState) => ({
        ...prevState,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      data.micro_status == "MICROBIOLOGIST_APPROVED" &&
      (data.qc_status == "WAITING_FOR_APPROVAL" ||
        data.qc_status == "QA_APPROVED" ||
        data.qc_status == "QC_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      data.micro_status !== "MICROBIOLOGIST_APPROVED"
    ) {
      message.warning("Microbiologist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-020/Summary");
      }, 1000);
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (data.qc_status == "QA_APPROVED" || data.qc_status == "QC_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (data.qc_status == "QC_REJECTED" || data.qc_status == "QA_REJECTED")
    ) {
      message.warning(" Microbiologist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-020/Summary");
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
    if (role == "ROLE_MICROBIOLOGIST") {
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/CLF020/save/micro`;
      payload = {
        test_id: formData.test_id,
        arNumber: formData.arNumber,
        sampledDate: formData.sampledDate,
        testedIncubationStartOn: date,
        sampleDescription: formData.sampleDescription,
        testParametersSpecification: formData.testParametersSpecification,
        testCompletionDate: formData.testCompletionDate,
        remark: formData.remark || "NA",
        acceptedRejected: formData.acceptedRejected,
        totalViableCountTVC: formData.totalViableCountTVC,
        totalFungalCountTFC: formData.totalFungalCountTFC,
        gramNegativeBacteriaColiform: formData.gramNegativeBacteriaColiform,
        ecoli: formData.ecoli,
        staphylococcusAureus: formData.staphylococcusAureus,
        pseudomonasAeruginosa: formData.pseudomonasAeruginosa,
        salmonella: formData.salmonella,
        format: "MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS",
        format_no: "PH-QCL01/F-20",
        ref_sop_no: "PH-QCL01-D-05",
        unit: "UNIT H",
        year: formData.year,
        month: formData.month,
      };
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/CLF020/approval`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.test_id,
        formatNo: "PH-QCL01/F-20",
        status: "Approve",
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod =
        role == "ROLE_MICROBIOLOGIST" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-020/Summary");
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

    if (role == "ROLE_MICROBIOLOGIST") {
      if (!handleMandatory()) {
        return;
      }
      payload = {
        test_id: formData.test_id,
        arNumber: formData.arNumber,
        sampledDate: formData.sampledDate,
        testedIncubationStartOn: date,
        sampleDescription: formData.sampleDescription,
        testParametersSpecification: formData.testParametersSpecification,
        testCompletionDate: formData.testCompletionDate,
        remark: formData.remark || "NA",
        acceptedRejected: formData.acceptedRejected,
        totalViableCountTVC: formData.totalViableCountTVC,
        totalFungalCountTFC: formData.totalFungalCountTFC,
        gramNegativeBacteriaColiform: formData.gramNegativeBacteriaColiform,
        ecoli: formData.ecoli,
        staphylococcusAureus: formData.staphylococcusAureus,
        pseudomonasAeruginosa: formData.pseudomonasAeruginosa,
        salmonella: formData.salmonella,
        format: "MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS",
        format_no: "PH-QCL01/F-20",
        ref_sop_no: "PH-QCL01-D-05",
        unit: "UNIT H",
        year: formData.year,
        month: formData.month,
      };
      succesMsg = "Submitted Successfully ";
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/CLF020/submit/micro`;
    } else if (
      role == "QA_EXECUTIVE" ||
      role == "QA_MANAGER" ||
      role == "QC_MANAGER"
    ) {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/CLF020/approval`;
      succesMsg = "Rejected Successfully";
      payload = {
        id: formData.test_id,
        status: "Reject",
        formatNo: "",
        remarks: formData.reason,
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod =
        role == "ROLE_MICROBIOLOGIST" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-020/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleMandatory = () => {
    if (formData.sampledDate == "") {
      message.warning("Please Select Sampled Date");
      return false;
    }
    if (formData.arNumber == "") {
      message.warning("Please Enter Ar Number");
      return false;
    }
    if (formData.sampleDescription == "") {
      message.warning("Please Enter Sample Description");
      return false;
    }
    if (formData.totalViableCountTVC == "") {
      message.warning("Please Enter Total Viable Count");
      return false;
    }
    if (formData.totalFungalCountTFC == "") {
      message.warning("Please Enter Total Fungal Count");
      return false;
    }
    if (formData.gramNegativeBacteriaColiform == "") {
      message.warning("Please select Gram Negatie");
      return false;
    }
    if (formData.ecoli == "") {
      message.warning("Please select Ecoli");
      return false;
    }
    if (formData.staphylococcusAureus == "") {
      message.warning("Please select Staphylococcos");
      return false;
    }
    if (formData.pseudomonasAeruginosa == "") {
      message.warning("Please select Pseudomonas");
      return false;
    }
    if (formData.salmonella == "") {
      message.warning("Please select Salmonella");
      return false;
    }
    if (formData.testCompletionDate == "") {
      message.warning("Please Select Test Completion Date");
      return false;
    }
    if (formData.acceptedRejected == "") {
      message.warning("Please Select Accepted/Rejected");
      return false;
    }

    return true;
  };
  const handleFieldClear = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      obser: [
        {
          ...prevState.obser[0],
          [name]: "",
        },
      ],
    }));
  };
  const handleFieldClear2 = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleBlurMicro = () => {
    if (status.fieldStatus) {
      return;
    }
    if (role == "ROLE_MICROBIOLOGIST") {
      if (
        Number(formData.totalViableCountTVC) > 1000 &&
        formData.totalViableCountTVC !== ""
      ) {
        message.warning(
          "Total Viable Count should be less than or equal to 1000"
        );
      }
      if (
        Number(formData.totalFungalCountTFC) > 100 &&
        formData.totalFungalCountTFC !== ""
      ) {
        message.warning(
          "Total Fungal Count should be less than or equal to 100"
        );
      }
    }
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-020/Summary");
  };

  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };
  const handleInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleE = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setFormData((formData) => ({
      ...formData,
      reason: "",
    }));
  };
  const onClose = () => {
    setOpen(false);
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
  const arLov = [
    { value: "A", label: "A" },
    { value: "R", label: "R" },
  ];
  const pathogenLov = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
  ];

  const handleKeyDownNA = (e) => {
    const { value } = e.target;
    if (
      !/^[0-9.]$/.test(e.key) &&
      e.key !== "N" &&
      e.key !== "A" &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    console.log("Form Data", formData);
  }, [formData]);

  const setTabNumber = (e) => {
    if (e == "9") {
      return;
    }
    setTabNo(e);
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

  const formatDateWithSlash = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split(".");
    return parts.join("/");
  };

  return (
    <>
      <BleachingHeader
        formName={"MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS"}
        formatNo={"PH-QCL01/F-20"}
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
              role == "ROLE_MICROBIOLOGIST" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_MICROBIOLOGIST" ? "Save" : "Approve"}
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
              role == "ROLE_MICROBIOLOGIST" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_MICROBIOLOGIST" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            {role == "ROLE_MICROBIOLOGIST" ? " Submit" : "   Reject"}
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
      <div style={{ margin: "10px", display: "flex" }}>
        <Input
          type="date"
          addonBefore="Sampled Date"
          value={formData.sampledDate}
          max={today}
          onChange={(e) => {
            handleInput(e.target.value, "sampledDate");
          }}
          style={{ width: "150px", textAlign: "center" }}
          readOnly={status.fieldStatus}
        />
        <Input
          type="text"
          addonBefore="A.R. No.:"
          value={formData.arNumber}
          onChange={(e) => {
            handleInput(e.target.value, "arNumber");
          }}
          style={{ width: "250px", textAlign: "center", marginLeft: "95px" }}
          readOnly={status.fieldStatus}
        />

        <Input
          type="text"
          value={formatDate(date)}
          addonBefore="Tested /Incubation Start on"
          style={{ width: "300px", textAlign: "center", marginLeft: "10px" }}
          readOnly
        />
        <Input
          type="text"
          value={formData.sampleDescription}
          addonBefore="Sample Description : "
          
          onChange={(e) => {
            handleInput(e.target.value, "sampleDescription");
          }}
          style={{ width: "300px", textAlign: "center", marginLeft: "10px" }}
          readOnly={status.fieldStatus}
        />
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Micro Test I" key="1">
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }} colSpan={7}>
                Test Parameters & Specification{" "}
              </td>
              <td
                style={{ textAlign: "center", padding: "10px" }}
                rowSpan={3}
                colSpan={2}
              >
                Test Completion Date{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }} rowSpan={2}>
                Total Viable Count (TVC - cfu/g) (Limit ≤1000){" "}
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} rowSpan={2}>
                Total Fungal Count (TFC - cfu/g)(Limit ≤ 100)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} colSpan={5}>
                {" "}
                Pathogens{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Gram negative bacteria or Coliform (Should be Absent){" "}
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                {" "}
                Escherechia coli (E.coli)(Should be Absent)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Staphylococcos aures (S.aur )(Should be Absent)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Pseudomonas aerogenosa (P.aer) (Should be Absent)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Salmonella (Sal.)(Should be Absent)
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                <Input
                  type="number"
                  value={formData.totalViableCountTVC}
                  style={{ textAlign: "center", width: "100%" }}
                  min={0}
                  onChange={(e) => {
                    handleInput(e.target.value, "totalViableCountTVC");
                  }}
                  readOnly={status.fieldStatus}
                  onKeyDown={handleE}
                  onBlur={handleBlurMicro}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                <Input
                  type="number"
                  value={formData.totalFungalCountTFC}
                  style={{ textAlign: "center", width: "100%" }}
                  min={0}
                  onChange={(e) => {
                    handleInput(e.target.value, "totalFungalCountTFC");
                  }}
                  readOnly={status.fieldStatus}
                  onKeyDown={handleE}
                  onBlur={handleBlurMicro}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {/* <Select
                  value={formData.gramNegativeBacteriaColiform}
                  options={pathogenLov}
                  onChange={(e) => {
                    handleInput(e, "gramNegativeBacteriaColiform");
                  }}
                  dropdownStyle={{ textAlign: "center" }}
                  style={{ textAlign: "center", width: "100%" }}
                  disabled={status.fieldStatus}
                  onBlur={handleBlurMicro}
                ></Select> */}
                <Input
                  type="text"
                  value={formData.gramNegativeBacteriaColiform}
                  onChange={(e) => {
                    handleInput(e.target.value, "gramNegativeBacteriaColiform");
                  }}
                  style={{
                    textAlign: "center",
                  }}
                  readOnly={status.fieldStatus}
                />
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {/* <Select
                  value={formData.ecoli}
                  options={pathogenLov}
                  onChange={(e) => {
                    handleInput(e, "ecoli");
                  }}
                  dropdownStyle={{ textAlign: "center" }}
                  style={{ textAlign: "center", width: "100%" }}
                  disabled={status.fieldStatus}
                  onBlur={handleBlurMicro}
                ></Select> */}
                <Input
                  type="text"
                  value={formData.ecoli}
                  onChange={(e) => {
                    handleInput(e.target.value, "ecoli");
                  }}
                  style={{
                    textAlign: "center",
                  }}
                  readOnly={status.fieldStatus}
                />
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {/* <Select
                  value={formData.staphylococcusAureus}
                  options={pathogenLov}
                  onChange={(e) => {
                    handleInput(e, "staphylococcusAureus");
                  }}
                  dropdownStyle={{ textAlign: "center" }}
                  style={{ textAlign: "center", width: "100%" }}
                  disabled={status.fieldStatus}
                  onBlur={handleBlurMicro}
                ></Select> */}
                <Input
                  type="text"
                  value={formData.staphylococcusAureus}
                  onChange={(e) => {
                    handleInput(e.target.value, "staphylococcusAureus");
                  }}
                  style={{
                    textAlign: "center",
                  }}
                  readOnly={status.fieldStatus}
                />
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {/* <Select
                  value={formData.pseudomonasAeruginosa}
                  options={pathogenLov}
                  onChange={(e) => {
                    handleInput(e, "pseudomonasAeruginosa");
                  }}
                  dropdownStyle={{ textAlign: "center" }}
                  style={{ textAlign: "center", width: "100%" }}
                  disabled={status.fieldStatus}
                  onBlur={handleBlurMicro}
                ></Select> */}
                <Input
                  type="text"
                  value={formData.pseudomonasAeruginosa}
                  onChange={(e) => {
                    handleInput(e.target.value, "pseudomonasAeruginosa");
                  }}
                  style={{
                    textAlign: "center",
                  }}
                  readOnly={status.fieldStatus}
                />
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {/* <Select
                  value={formData.salmonella}
                  options={pathogenLov}
                  onChange={(e) => {
                    handleInput(e, "salmonella");
                  }}
                  dropdownStyle={{ textAlign: "center" }}
                  style={{ textAlign: "center", width: "100%" }}
                  disabled={status.fieldStatus}
                  onBlur={handleBlurMicro}
                ></Select> */}
                <Input
                  type="text"
                  value={formData.salmonella}
                  onChange={(e) => {
                    handleInput(e.target.value, "salmonella");
                  }}
                  style={{
                    textAlign: "center",
                  }}
                  readOnly={status.fieldStatus}
                />
              </td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={2}>
                <Input
                  type="date"
                  value={formData.testCompletionDate}
                  style={{ textAlign: "center", width: "100%" }}
                  onChange={(e) => {
                    handleInput(e.target.value, "testCompletionDate");
                  }}
                  readOnly={status.fieldStatus || formData.tested_on == ""}
                  onBlur={handleBlurMicro}
                ></Input>
              </td>
            </tr>
            <br />
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "5px" }}>
                Remark:{" "}
                <Input
                  type="text"
                  value={formData.remark}
                  style={{ textAlign: "center", width: "70%" }}
                  onChange={(e) => {
                    handleInput(e.target.value, "remark");
                  }}
                  onKeyDown={(e) => {
                    handleSelectText(e);
                  }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td colSpan={5} style={{ textAlign: "center", padding: "5px" }}>
                Accepted (A)/ Rejected ( R ){" "}
                <Select
                  value={formData.acceptedRejected}
                  onChange={(e) => {
                    handleInput(e, "acceptedRejected");
                  }}
                  options={arLov}
                  style={{
                    textAlign: "center",
                    width: "150px",
                    marginLeft: "5px",
                  }}
                  dropdownStyle={{ textAlign: "center" }}
                  disabled={status.fieldStatus}
                ></Select>
              </td>
            </tr>
          </table>
        </TabPane>
        <TabPane tab="Reviews" key="2">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  Tested By (Sign & Date)
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Approved By (Sign & Date)
                </td>
              </tr>
              <tr>
                <td colspan="1" style={{ height: "60%", textAlign: "center" }}>
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
                        {formData.micro_sign}
                        <br />
                        {formatDateAndTime(formData.micro_submit_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.micro_sign ? (
                        <img
                          src={eSign.micro_sign}
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
                  {formData.qc_status !== "WAITING_FOR_APPROVAL" &&
                    formData.qc_status !== "" && (
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
                            {formData.qc_sign}
                            <br />
                            {formatDateAndTime(formData.qc_submit_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.qc_sign ? (
                            <img
                              src={eSign.qc_sign}
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

export default QualityControl_f20;
