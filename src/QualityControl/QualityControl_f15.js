/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Button,
  message,
  Select,
  Tooltip,
  Tabs,
  Input,
  Space,
  Row,
  Col,
} from "antd";
import { IoSave, IoPrint } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BleachingHeader from "../Components/BleachingHeader.js";
import BleachingTail from "../Components/BleachingTail.js";
import { GoArrowLeft } from "react-icons/go";
import "../index.css";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { TiTick } from "react-icons/ti";
import { AiFillCloseSquare } from "react-icons/ai";
import API from "../baseUrl.json";
import { Table, Modal, DatePicker, Form, Drawer, Menu, Avatar } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import TabPane from "antd/es/tabs/TabPane.js";

const QualityControl_f15 = () => {
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { year, month, eqId } = location.state;
  const [selectedMonth, setSelectedMonth] = useState("");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [statusLoader, setStatusLoader] = useState(false);
  const [formData, setFormData] = useState({
    // "test_id": 101,
    format: "",
    format_no: "",
    ref_sop_no: "",
    unit: "",
    remarks: "",
    date: "",
    load_no: "",
    chemical_indicator: "",
    status: "",
    year: "",
    month: "",
    reason: "",
    expiry_date: "",
    amploe_sterilization_a: "",
    amploe_sterilization_b: "",
    amploe_sterilization_c: "",
    amploe_sterilization_d: "",
    amploe_sterilization_obs: "",
    amploe_sterilization_result: "",
    amploe_discrad_a: "",
    amploe_discrad_b: "",
    amploe_discrad_c: "",
    amploe_discrad_d: "",
    amploe_discrad_obs: "",
    amploe_discrad_result: "",
    result: "",
    eq_id: "",
    lot_no: "",
  });
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    micro_sign: "",
    qc_sign: "",
  });
  const initialized = useRef(false);
  const startDate = `${year}-${month}-01`;
  const [endDate, setEndDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const endDateBasedOnMonth = new Date(year, month, 0)
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0");

    if (year === currentYear && month === currentMonth) {
      setEndDate(today);
    } else {
      setEndDate(endDateBasedOnMonth);
    }
  }, [month]);

  useEffect(() => {
    const signatureKeys = ["micro_sign", "qc_sign"];
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
    if (role != "ROLE_MICROBIOLOGIST") {
      setStatus((prevState) => ({
        ...prevState,
        fieldStatus: true,
      }));
    }
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${    API.prodUrl}/Precot/api/chemicaltest/CLF015?year=${year}&month=${month}&eqid=${eqId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (role == "QA_MANAGER" || role == "QC_MANAGER") {
              message.warning("Microbiologist yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-015/Summary");
              }, 1000);
              return;
            }
          }
          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              (role == "QA_MANAGER" || role == "QC_MANAGER") &&
              data.micro_status != "MICROBIOLOGIST_APPROVED"
            ) {
              message.warning("Microbiologist yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-015/Summary");
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
      role == "ROLE_MICROBIOLOGIST" &&
      responseData.micro_status == "MICROBIOLOGIST_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      responseData.micro_status == "MICROBIOLOGIST_APPROVED" &&
      (responseData.qc_status == "WAITING_FOR_APPROVAL" ||
        responseData.qc_status == "QC_APPROVED" ||
        responseData.qc_status == "QA_APPROVED")
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
      (responseData.qc_status == "QC_APPROVED" ||
        responseData.qc_status == "QA_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.qc_status == "QC_REJECTED" ||
        responseData.qc_status == "QA_REJECTED")
    ) {
      message.warning("Microbiologist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-015/Summary");
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
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/CLF015/save/VAC`;
      payload = {
        test_id: formData.test_id,
        format: "VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR",
        format_no: "PH-QCL01/F-015",
        ref_sop_no: "01",
        unit: "UNIT H",
        remarks: formData.remarks || "NA",
        date: formData.date,
        load_no: formData.load_no,
        year: year,
        month: month,
        expiry_date: formData.expiry_date,
        amploe_sterilization_a: formData.amploe_sterilization_a,
        amploe_sterilization_b: formData.amploe_sterilization_b,
        amploe_sterilization_c: formData.amploe_sterilization_c,
        amploe_sterilization_d: formData.amploe_sterilization_d,
        amploe_sterilization_obs: formData.amploe_sterilization_obs,
        amploe_sterilization_result: formData.amploe_sterilization_result,
        amploe_discrad_a: formData.amploe_discrad_a,
        amploe_discrad_b: formData.amploe_discrad_b,
        amploe_discrad_c: formData.amploe_discrad_c,
        amploe_discrad_d: formData.amploe_discrad_d,
        amploe_discrad_obs: formData.amploe_discrad_obs,
        amploe_discrad_result: formData.amploe_discrad_result,
        result: formData.result,
        eq_id: eqId,
        lot_no: formData.lot_no,
      };
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/CLF015/approval`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.test_id,
        formatNo: "PH-QCL01/F-015",
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
          navigate("/Precot/QualityControl/F-015/Summary");
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
      succesMsg = "Data Submitted Succesfully";
      const keysToValidate = [
        "date",
        "expiry_date",
        "amploe_sterilization_a",
        "amploe_discrad_a",
        "lot_no",
        "amploe_sterilization_b",
        "amploe_discrad_b",
        "amploe_sterilization_c",
        "amploe_discrad_c",
        "amploe_sterilization_d",
        "amploe_discrad_d",
        "load_no",
        "amploe_sterilization_obs",
        "amploe_discrad_obs",
        "result",
        "amploe_sterilization_result",
        "amploe_discrad_result",
      ];
      const getName = (key) => {
        switch (key) {
          case "date":
            return "Please Select Date";
          case "expiry_date":
          case "amploe_sterilization_a":
          case "amploe_discrad_a":
            return "Please Fill All Expiry Date Fields";
          case "lot_no":
          case "amploe_sterilization_b":
          case "amploe_discrad_b":
            return "Please Fill All Biological indicator Lot No Fields ";
          case "amploe_sterilization_c":
          case "amploe_discrad_c":
            return "Please Fill All Load No Fields ";
          case "amploe_sterilization_d":
          case "amploe_discrad_d":
            return "Please Fill All Type of load Fields";
          case "load_no":
          case "amploe_sterilization_obs":
          case "amploe_discrad_obs":
            return "Please Fill All Observation Fields";
          case "result":
          case "amploe_sterilization_result":
          case "amploe_discrad_result":
            return "Please Fill All Result Fields";
        }
      };
      for (const key of keysToValidate) {
        if (formData[key] == "") {
          console.log(formData[key]);
          message.warning(` ${getName(key)} `);
          return;
        }
      }

      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/CLF015/submit/VAC`;
      payload = {
        test_id: formData.test_id,
        format: "VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR",
        format_no: "PH-QCL01/F-015",
        ref_sop_no: "01",
        unit: "UNIT H",
        remarks: formData.remarks || "NA",
        date: formData.date,
        load_no: formData.load_no,
        year: year,
        month: month,
        expiry_date: formData.expiry_date,
        amploe_sterilization_a: formData.amploe_sterilization_a,
        amploe_sterilization_b: formData.amploe_sterilization_b,
        amploe_sterilization_c: formData.amploe_sterilization_c,
        amploe_sterilization_d: formData.amploe_sterilization_d,
        amploe_sterilization_obs: formData.amploe_sterilization_obs,
        amploe_sterilization_result: formData.amploe_sterilization_result,
        amploe_discrad_a: formData.amploe_discrad_a,
        amploe_discrad_b: formData.amploe_discrad_b,
        amploe_discrad_c: formData.amploe_discrad_c,
        amploe_discrad_d: formData.amploe_discrad_d,
        amploe_discrad_obs: formData.amploe_discrad_obs,
        amploe_discrad_result: formData.amploe_discrad_result,
        result: formData.result,
        eq_id: eqId,
        lot_no: formData.lot_no,
      };
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      succesMsg = "Rejected Successfully";
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/CLF015/approval`;
      payload = {
        id: formData.test_id,
        status: "Reject",
        formatNo: "",
        remarks: formData.reason,
      };
    }
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
          navigate("/Precot/QualityControl/F-015/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityControl/F-015/Summary");
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
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
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
  }, [token, formData]);

  useEffect(() => {
    switch (month) {
      case "01":
        setSelectedMonth("JAN");
        break;
      case "02":
        setSelectedMonth("FEB");
        break;
      case "03":
        setSelectedMonth("MAR");
        break;
      case "04":
        setSelectedMonth("APR");
        break;
      case "05":
        setSelectedMonth("MAY");
        break;
      case "06":
        setSelectedMonth("JUN");
        break;
      case "07":
        setSelectedMonth("JULY");
        break;
      case "08":
        setSelectedMonth("AUG");
        break;
      case "09":
        setSelectedMonth("SEP");
        break;
      case "10":
        setSelectedMonth("OCT");
        break;
      case "11":
        setSelectedMonth("NOV");
        break;
      case "12":
        setSelectedMonth("DEC");
        break;
    }
  }, [month]);

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
  const handleKeyDown_text = (e) => {
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
        formName={"VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR"}
        formatNo={"PH-QCL01/F-015"}
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
      <div style={{ margin: "10px" }}>
        <Input
          type="text"
          value={year}
          addonBefore="Year : "
          style={{ textAlign: "center", width: "200px" }}
          readOnly
        ></Input>
        <Input
          type="text"
          value={selectedMonth}
          addonBefore="Month : "
          style={{ textAlign: "center", width: "200px", marginLeft: "10px" }}
          readOnly
        ></Input>
        <Input
          type="text"
          value={eqId}
          addonBefore="EQ. ID No:  "
          style={{ textAlign: "center", width: "200px", marginLeft: "10px" }}
          readOnly
        ></Input>
        <Input
          type="date"
          addonBefore="Date : "
          value={formData.date}
          onChange={(e) => {
            handleInput(e.target.value, "date");
          }}
          min={startDate}
          max={endDate}
          style={{ textAlign: "center", width: "200px", marginLeft: "10px" }}
          readOnly={status.fieldStatus}
        ></Input>
      </div>

      <Tabs>
        <TabPane tab="VFA I" key="1">
          <table style={{ tableLayout: "fixed", width: "95%" }}>
            <tr>
              <td
                style={{ textAlign: "center", padding: "20px", width: "25%" }}
              >
                Biological indicator (Geo bacillus Stearothermophilus )
              </td>
              <td style={{ textAlign: "center", width: "25%" }}>
                Ampoule ( As such: un-steriled)
              </td>
              <td style={{ textAlign: "center", width: "25%" }}>
                Ampoule used for Sterilization Autoclave
              </td>
              <td style={{ textAlign: "center", width: "25%" }}>
                Ampoule used for Discarding Autoclave
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "2px" }}>
                Expiry date
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="date"
                  value={formData.expiry_date}
                  onChange={(e) => {
                    handleInput(e.target.value, "expiry_date");
                  }}
                  style={{ textAlign: "center" }}
                  min={startDate}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="date"
                  value={formData.amploe_sterilization_a}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_sterilization_a");
                  }}
                  min={startDate}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="date"
                  value={formData.amploe_discrad_a}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_discrad_a");
                  }}
                  min={startDate}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "2px" }}>
                Biological indicator Lot No.
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.lot_no}
                  onChange={(e) => {
                    handleInput(e.target.value, "lot_no");
                  }}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_sterilization_b}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_sterilization_b");
                  }}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_discrad_b}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_discrad_b");
                  }}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "2px" }}>Load No.</td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                Not applicable
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_sterilization_c}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_sterilization_c");
                  }}
               
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_discrad_c}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_discrad_c");
                  }}
                  
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "2px" }}>
                Type of load{" "}
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                Not applicable
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_sterilization_d}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_sterilization_d");
                  }}
                  onKeyDown={(e) => handleKeyDown_text(e)}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_discrad_d}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_discrad_d");
                  }}
                  onKeyDown={(e) => handleKeyDown_text(e)}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Cycle temperature & Time{" "}
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                Not Autoclaved
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                121℃ @ 20min{" "}
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                121℃ @ 20min
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Incubation temperature & Time
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                55 to 60 °C & 48 Hrs.
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                55 to 60 °C & 48 Hrs.
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                55 to 60 °C & 48 Hrs.
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "2px" }}>
                Observation
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.load_no}
                  onChange={(e) => {
                    handleInput(e.target.value, "load_no");
                  }}
                 
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_sterilization_obs}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_sterilization_obs");
                  }}
                  onKeyDown={(e) => handleKeyDown_text(e)}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_discrad_obs}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_discrad_obs");
                  }}
                  onKeyDown={(e) => handleKeyDown_text(e)}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "2px" }}>Result</td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.result}
                  onChange={(e) => {
                    handleInput(e.target.value, "result");
                  }}
                  onKeyDown={(e) => handleKeyDown_text(e)}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_sterilization_result}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_sterilization_result");
                  }}
                  onKeyDown={(e) => handleKeyDown_text(e)}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  type="text"
                  value={formData.amploe_discrad_result}
                  onChange={(e) => {
                    handleInput(e.target.value, "amploe_discrad_result");
                  }}
                  onKeyDown={(e) => handleKeyDown_text(e)}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
          </table>
        </TabPane>
        <TabPane tab="Remarks" key="2">
          <table>
            <tr>
              <td style={{ padding: "20px" }}>Remarks : </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) => {
                    handleInput(e.target.value, "remarks");
                  }}
                  onKeyDown={(e) => handleKeyDown_text(e)}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "20px" }}>
                Note:<br></br>Pass =sterilized (medium remained purple )
                <br></br>Fail = not sterilized ( medium turned yellow & cell
                grew )
              </td>
            </tr>
          </table>
        </TabPane>
        <TabPane tab="Reviews" key="3">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  Checked By :
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Verified By :
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

export default QualityControl_f15;
