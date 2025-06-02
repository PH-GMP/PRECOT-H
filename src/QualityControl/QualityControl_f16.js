/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
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
import QualityControl_f16_Summary from "./QualityControl_f16_Summary.js";

const { TabPane } = Tabs;
const QualityControl_f16 = () => {
  const location = useLocation();
  const { date, shift, chemical } = location.state;
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
  const today = new Date().toISOString().split("T")[0];
  const [statusLoader, setStatusLoader] = useState(false);
  const [chemicalLov, setChemicalLov] = useState([]);
  const [formData, setFormData] = useState({
    formatNo: "",
    revisionNo: "",
    formatName: "",
    refSopNo: "",
    date: "",
    shift: "",
    name_of_solution: "",
    standardized_lot_number: "",
    volume_of_solution: "",
    normality: "",
    to_be_name_of_solution: chemical,
    to_be_weight_of_chemical: "",
    to_be_volume_of_solution: "",
    volume_of_sample_solution: "",
    trail_01: "",
    trail_02: "",
    trail_03: "",
    average: "",
    normal_of_req_solution: "",
    lot_no: "",
    expiry_date: "",
    reason: "",
  });
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    chemist_sign: "",
    qa_exe_sign: "",
    manager_sign: "",
  });

  useEffect(() => {
    const chemicalLovApi = async () => {
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/QcForm/ChemicalName`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        console.log(response.data, "Api Response");
        setChemicalLov(options);
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    chemicalLovApi();
  }, [token]);

  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityControl/F-016/Summary");
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
    const signatureKeys = ["chemist_sign", "qa_exe_sign", "manager_sign"];
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
  }, [
    token,
    formData.chemist_sign,
    formData.qa_exe_sign,
    formData.manager_sign,
  ]);

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
            `${    API.prodUrl}/Precot/api/QcForm/getStandardOfChemicalF016?date=${date}&shift=${shift}&chemical=${formData.to_be_name_of_solution}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (role == "QA_MANAGER" || role == "QC_MANAGER") {
              message.warning("Chemist or QA Executive yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-016/Summary");
              }, 1000);
              return;
            }
          }
          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              (role == "QA_MANAGER" || role == "QC_MANAGER") &&
              data.chemist_status != "CHEMIST_APPROVED"
            ) {
              message.warning("Chemist or QA Executive yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-016/Summary");
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
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED" &&
      (responseData.manager_status == "WAITING_FOR_APPROVAL" ||
        responseData.manager_status == "QA_APPROVED" ||
        responseData.manager_status == "QC_APPROVED")
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
      (responseData.manager_status == "QA_APPROVED" ||
        responseData.manager_status == "QC_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.manager_status == "QC_REJECTED" ||
        responseData.manager_status == "QA_REJECTED")
    ) {
      message.warning("Chemist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-016/Summary");
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
    if (role == "ROLE_CHEMIST") {
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${    API.prodUrl}/Precot/api/QcForm/SaveStandardOfChemicalF016`;
      payload = {
        formatNo: "PH-QCL01/F-016",
        revisionNo: "01",
        formatName: "STANDARIZATION OF CHEMICAL SOLUTION",
        refSopNo: "PH-QCL01-D-05",
        date: date,
        shift: shift,
        name_of_solution: formData.name_of_solution,
        standardized_lot_number: formData.standardized_lot_number,
        volume_of_solution: formData.volume_of_solution,
        normality: formData.normality,
        to_be_name_of_solution: chemical,
        to_be_weight_of_chemical: formData.to_be_weight_of_chemical,
        to_be_volume_of_solution: formData.to_be_volume_of_solution,
        volume_of_sample_solution: formData.volume_of_sample_solution,
        trail_01: formData.trail_01,
        trail_02: formData.trail_02,
        trail_03: formData.trail_03,
        average: formData.average,
        normal_of_req_solution: formData.normal_of_req_solution,
        lot_no: formData.lot_no,
        expiry_date: formData.expiry_date,
      };
      if (formData.id) {
        payload.id = formData.id;
      }
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      apiurl = `${    API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF016`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.id,
        formatNo: "PH-QCL01-F-026",
        status: "Approve",
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_CHEMIST" ? axios.post : axios.put;
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
          navigate("/Precot/QualityControl/F-016/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    let apiurl, payload;
    if (role == "ROLE_CHEMIST") {
      const keysToValidate = [
        "weight_of_chemical",
        "volume_of_solution",
        "to_be_weight_of_chemical",
        "to_be_volume_of_solution",
        "volume_of_sample_solution",
        "trail_01",
        "trail_02",
        "trail_03",
        "average",
        "normal_of_req_solution",
        "lot_no",
        "expiry_date",
      ];
      const getName = (key) => {
        switch (key) {
          case "weight_of_chemical":
          case "volume_of_solution":
            return "Please Enter All Standard Sol I Fields";
          case "to_be_weight_of_chemical":
          case "to_be_volume_of_solution":
          case "volume_of_sample_solution":
            return "Please Enter All Standard Sol II Fields";
          case "trail_01":
          case "trail_02":
          case "trail_03":
            return "Please Enter All Burette Reading Fields";
          case "lot_no":
            return "Please Enter Lot No Fields";
          case "expiry_date":
            return " Please Enter Expiry Date Field";
        }
      };
      for (const key of keysToValidate) {
        console.log(key);
        if (formData[key] == "") {
          console.log(formData[key]);
          message.warning(` ${getName(key)} `);
          return;
        }
      }

      apiurl = `${    API.prodUrl}/Precot/api/QcForm/SubmitStandardOfChemicalF016`;
      payload = {
        formatNo: "PH-QCL01/F-016",
        revisionNo: "01",
        formatName: "STANDARIZATION OF CHEMICAL SOLUTION",
        refSopNo: "PH-QCL01-D-05",
        date: date,
        shift: shift,
        name_of_solution: formData.name_of_solution,
        standardized_lot_number: formData.standardized_lot_number,
        volume_of_solution: formData.volume_of_solution,
        normality: formData.normality,
        to_be_name_of_solution: chemical,
        to_be_weight_of_chemical: formData.to_be_weight_of_chemical,
        to_be_volume_of_solution: formData.to_be_volume_of_solution,
        volume_of_sample_solution: formData.volume_of_sample_solution,
        trail_01: formData.trail_01,
        trail_02: formData.trail_02,
        trail_03: formData.trail_03,
        average: formData.average,
        normal_of_req_solution: formData.normal_of_req_solution,
        lot_no: formData.lot_no,
        expiry_date: formData.expiry_date,
      };
      if (formData.id) {
        payload.id = formData.id;
      }
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = `${    API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF016`;
      payload = {
        id: formData.id,
        status: "Reject",
        formatNo: "",
        remarks: formData.reason,
      };
    }
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_CHEMIST" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(response.data.message);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-016/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
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

  const handleInput = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const handleE = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  useEffect(() => {
    console.log("Form Data", formData);
  }, [formData]);

  useEffect(() => {
    // let n2Result = 0;
    let v2Result = 0;
    // n2Result =
    //   (Number(formData.weight_of_chemical || 0) / 1000) *
    //   Number(formData.volume_of_solution || 0);
    v2Result =
      (Number(formData.trail_01 || 0) +
        Number(formData.trail_02 || 0) +
        Number(formData.trail_03 || 0)) /
      3;

    setFormData((prevState) => ({
      ...prevState,
      // normality: n2Result,
      average: v2Result,
    }));
  }, [
    formData.weight_of_chemical,
    formData.volume_of_solution,
    formData.trail_01,
    formData.trail_02,
    formData.trail_03,
  ]);

  // useEffect(() => {
  //   let n1Result = 0;
  //   console.log(Number(formData.normality || 0));
  //   console.log(Number(formData.average || 0));
  //   console.log(Number(formData.volume_of_sample_solution || 0));
  //   n1Result =
  //     (Number(formData.normality || 0) * Number(formData.average || 0)) /
  //     Number(formData.volume_of_sample_solution || 1);
  //   console.log(n1Result);
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     normal_of_req_solution: n1Result,
  //   }));
  // }, [
  //   ,
  //   formData.normality,
  //   formData.average,
  //   formData.volume_of_sample_solution,
  // ]);

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
        formName={"STANDARIZATION OF CHEMICAL SOLUTION"}
        formatNo={"PH-QCL01/F-016"}
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
              role == "ROLE_CHEMIST" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_CHEMIST" ? "Save" : "Approve"}
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
              role == "ROLE_CHEMIST" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_CHEMIST" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            {role == "ROLE_CHEMIST" ? " Submit" : "   Reject"}
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
        <Row gutter={[8, 8]} align="middle">
          <Col xs={24} sm={12} md={9}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                addonBefore="Date : "
                value={formatDate(date)}
                readOnly
                style={{ width: "100%", textAlign: "center" }}
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={9}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                addonBefore="Shift : "
                value={shift}
                readOnly
                style={{ width: "100%", textAlign: "center" }}
              ></Input>
            </Space>
          </Col>
        </Row>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Standard Sol I" key="2">
          <div style={{ height: "50vh" }}>
            <table>
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "15px" }}
                >
                  {" "}
                  Standardized Solution (Know Solution)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                <td style={{ textAlign: "center" }}>Name Of The Solution</td>
                <td style={{ textAlign: "center" }}>Lot Number</td>
                <td style={{ textAlign: "center" }}>
                  Volume of the Solution taken (ml)(V2)
                </td>
                <td style={{ textAlign: "center" }}>Normality (N2)</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "20px" }}>1</td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    style={{ width: "260px", textAlign: "center" }}
                    value={formData.name_of_solution}
                    onChange={(value) => {
                      handleInput(value, "name_of_solution"); // Pass the selected value directly
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleInput(e.target.value, "name_of_solution");
                      }
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                  >
                    <Select.Option value="Potassium Hydrogen phthalate (KHP)">
                      Potassium Hydrogen phthalate (KHP)
                    </Select.Option>
                    <Select.Option value="Hydrochloric acid (HCl)">
                      Hydrochloric acid (HCl)
                    </Select.Option>
                    <Select.Option value="Sodium Carbonate (Na2CO3)">
                      Sodium Carbonate (Na2CO3)
                    </Select.Option>

                    <Select.Option value="Sodium hydroxide (NaOH)">
                      Sodium hydroxide (NaOH)
                    </Select.Option>
                    <Select.Option value="Oxalic Acid ( C2H2O4 )">
                      Oxalic Acid ( C2H2O4 )
                    </Select.Option>
                    <Select.Option value="Potassium dichromate (K2Cr2O7)">
                      Potassium dichromate (K2Cr2O7)
                    </Select.Option>
                  </Select>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={formData.standardized_lot_number}
                    onChange={(e) => {
                      handleInput(e.target.value, "standardized_lot_number");
                    }}
                    onKeyDown={handleE}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={formData.volume_of_solution}
                    onChange={(e) => {
                      handleInput(e.target.value, "volume_of_solution");
                    }}
                    onKeyDown={handleE}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={formData.normality}
                    onChange={(e) => {
                      handleInput(e.target.value, "normality");
                    }}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>{" "}
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Standard Sol II" key="1">
          <div style={{ height: "50vh" }}>
            <table>
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "15px" }}
                >
                  {" "}
                  Standardized Solution (To be prepared)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                <td style={{ textAlign: "center" }}>Name Of The Solution</td>
                <td style={{ textAlign: "center" }}>
                  Weight of the chemical (gm)
                </td>
                <td style={{ textAlign: "center" }}>
                  Volume of the Solution Prepared (ml)
                </td>
                {/* <td style={{ textAlign: "center" }}>
                  Volume of the Sample Solution taken(ml) (V1)
                </td> */}
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "20px" }}>{1}</td>
                <td style={{ textAlign: "center" }}>{chemical}</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    value={formData.to_be_weight_of_chemical}
                    onChange={(e) => {
                      handleInput(e.target.value, "to_be_weight_of_chemical");
                    }}
                    onKeyDown={handleE}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    value={formData.to_be_volume_of_solution}
                    onChange={(e) => {
                      handleInput(e.target.value, "to_be_volume_of_solution");
                    }}
                    onKeyDown={handleE}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                {/* <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    value={formData.volume_of_sample_solution}
                    onChange={(e) => {
                      handleInput(e.target.value, "volume_of_sample_solution");
                    }}
                    onKeyDown={handleE}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td> */}
              </tr>
            </table>
          </div>
        </TabPane>

        <TabPane tab="Burrete Reading" key="3">
          <div style={{ height: "50vh" }}>
            <table>
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "15px" }}
                >
                  {" "}
                  Burette Solution Reading in ml
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                <td style={{ textAlign: "center" }}>Trial. 01</td>
                <td style={{ textAlign: "center" }}>Trial. 02</td>
                <td style={{ textAlign: "center" }}>Trial. 03</td>
                <td style={{ textAlign: "center" }}>Average (V1)</td>
              </tr>

              <tr>
                <td style={{ textAlign: "center", padding: "20px" }}>{1}</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    value={formData.trail_01}
                    onChange={(e) => {
                      handleInput(e.target.value, "trail_01");
                    }}
                    onKeyDown={handleE}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    value={formData.trail_02}
                    onChange={(e) => {
                      handleInput(e.target.value, "trail_02");
                    }}
                    onKeyDown={handleE}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    value={formData.trail_03}
                    onChange={(e) => {
                      handleInput(e.target.value, "trail_03");
                    }}
                    onKeyDown={handleE}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  {Number(formData.average).toFixed(2)}
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Remains" key="4">
          <div style={{ height: "50vh" }}>
            <table>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                <td style={{ textAlign: "center" }}>
                  Normality of the Prepared Solution (N1)
                </td>
                <td style={{ textAlign: "center" }}>Lot No.</td>
                <td style={{ textAlign: "center" }}>Expiry Date</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "20px" }}>{1}</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={formData.normal_of_req_solution}
                    onChange={(e) => {
                      handleInput(e.target.value, "normal_of_req_solution");
                    }}
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={formData.lot_no}
                    onChange={(e) => {
                      handleInput(e.target.value, "lot_no");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="date"
                    value={formData.expiry_date}
                    onChange={(e) => {
                      handleInput(e.target.value, "expiry_date");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="5">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  Prep.and Stand. Done By. (Sign and Date)
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Approved By (HOD)
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
                        {formData.chemist_sign}
                        <br />
                        {formatDateAndTime(formData.chemist_submit_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.chemist_sign ? (
                        <img
                          src={eSign.chemist_sign}
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
                  {formData.manager_status !== "WAITING_FOR_APPROVAL" &&
                    formData.manager_status !== "" && (
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
                            {formatDateAndTime(formData.manager_submit_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.manager_sign ? (
                            <img
                              src={eSign.manager_sign}
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

export default QualityControl_f16;
