/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
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
import { FaTrash } from "react-icons/fa";
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
import { BsMoisture } from "react-icons/bs";

const { Option } = Select;
const { TabPane } = Tabs;

const QualityControl_f26G = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const { customerName, productName, date } = location.state;
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
  const [formData, setFormData] = useState({
    formatNo: "",
    revisionNo: "",
    formatName: "",
    refSopNo: "",
    date: "",
    id: "",
    product: "",
    customer: "",
    batch_no: "",
    lot_no: "",
    po_no: "",
    quantity: "",
    testing_date: date,
    moisture: [
      {
        lineId: "",
        initial_weight: "",
        final_weight: "",
        result: "",
        remarks: "",
      },
    ],
    reason: "",
  });
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    chemist_sign: "",
    qa_exe_sign: "",
    manager_sign: "",
  });
  const initialized = useRef(false);

  const handleAddRow = () => {
    const newRow = {
      lineId: "",
      initial_weight: "",
      final_weight: "",
      result: "",
      remarks: "",
    };

    setFormData((prevData) => ({
      ...prevData,
      moisture: [...prevData.moisture, newRow], // Adding new row to the moisture array
    }));
  };

  const handleDeleteRow = (index) => {
    if (formData?.moisture?.length <= 1) {
      return; // Prevent deletion if there's only one row
    }
    setFormData((prevState) => ({
      ...prevState,
      moisture: prevState.moisture.filter((_, i) => i !== index), // Delete the row at the specified index
    }));
  };

  useEffect(() => {
    if (!initialized.current) {
      if (
        role == "QA_EXECUTIVE" ||
        role == "QA_MANAGER" ||
        role == "QC_MANAGER"
      ) {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/QcForm/getMoisturesF26G?product=${productName}&customer=${customerName}&testingDate=${date}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (role == "QA_EXECUTIVE") {
              message.warning("Chemist yet To approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-026G/Summary");
              }, 1000);
              return;
            }
            if (role == "QA_MANAGER" || role == "QC_MANAGER") {
              message.warning("Chemist or QA Executive yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-026G/Summary");
              }, 1000);
              return;
            }
          }
          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              role == "QA_EXECUTIVE" &&
              data.chemist_status != "CHEMIST_APPROVED"
            ) {
              message.warning("Chemist yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-026G/Summary");
              }, 1000);
              return;
            }
            if (
              (role == "QA_MANAGER" || role == "QC_MANAGER") &&
              (data.chemist_status != "CHEMIST_APPROVED" ||
                data.qa_exe_status != "QA_EXE_APPROVED")
            ) {
              message.warning("Chemist or QA Executive yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-026G/Summary");
              }, 1000);
              return;
            }
            statusFunction(data);
            setFormData((prevState) => ({
              ...prevState,
              id: data.id,
              product: data.product,
              customer: data.customer,
              batch_no: data.batch_no,
              lot_no: data.lot_no,
              po_no: data.po_no,
              quantity: data.quantity,
              testing_date: data.testing_date,
              moisture: data.details.map((detail) => ({
                lineId: detail.lineId,
                initial_weight: detail.initial_weight,
                final_weight: detail.final_weight,
                result: detail.result,
                remarks: detail.remarks,
              })),
            }));
          }
        } catch (error) {
          console.log(error);
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
      (responseData.qa_exe_status == "QA_EXE_APPROVED" ||
        responseData.qa_exe_status == "WAITING_FOR_APPROVAL") &&
      (responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED" ||
        responseData.manager_status == "WAITING_FOR_APPROVAL" ||
        responseData.manager_status == "")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "QA_EXECUTIVE" &&
      (responseData.manager_status == "QA_REJECTED" ||
        responseData.manager_status == "QC_REJECTED")
    ) {
      message.warning("Chemist Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-026G/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "QA_EXECUTIVE" &&
      responseData.qa_exe_status == "QA_EXE_APPROVED" &&
      (responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED" ||
        responseData.manager_status == "WAITING_FOR_APPROVAL")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "QA_EXECUTIVE" &&
      responseData.qa_exe_status == "QA_EXE_REJECTED"
    ) {
      message.warning("Chemist Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-026G/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      responseData.qa_exe_status == "WAITING_FOR_APPROVAL"
    ) {
      message.warning("QA Executive Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-026G/Summary");
      }, 1000);
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED")
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
      message.warning("Chemist Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-026G/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityControl/F-026G/Summary");
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
            `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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

  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST") {
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${ API.prodUrl}/Precot/api/QcForm/SaveMoisturesF26G`;
      payload = {
        id: formData.id || "",
        formatNo: "PH-QCL01/F-026G",
        revisionNo: "01",
        formatName: "CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%)",
        refSopNo: "PH-QCL01-D-05",
        date: formData.date||date,
        product: productName,
        customer: customerName,
        batch_no: formData.batch_no,
        lot_no: formData.lot_no,
        po_no: formData.po_no,
        quantity: formData.quantity,
        testing_date: formData.testing_date,
        details: formData.moisture?.map((item) => ({
          lineId: item.lineId || "",
          initial_weight: item.initial_weight,
          final_weight: item.final_weight,
          result: Number(item.result).toFixed(2),
          remarks: item.remarks || "NA",
        })),
      };
      if (formData.id) {
        payload.id = formData.id;
      }
    } else if (
      role == "QA_EXECUTIVE" ||
      role == "QA_MANAGER" ||
      role == "QC_MANAGER"
    ) {
      apiurl = `${ API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF26G`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.id,
        formatNo: "PH-QCL01-F-026G",
        status: "Approve",
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod = role == "ROLE_CHEMIST" ? axios.post : axios.put;
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
          navigate("/Precot/QualityControl/F-026G/Summary");
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
      const headerValidate = [
        
        "batch_no",
        "lot_no",
        "po_no",
        "quantity",
        "testing_date",
        "initial_weight",
        "final_weight",
      ];

      for (const key of headerValidate) {
        if (formData[key] == "") {
          const formattedKey = key.replace(/_/g, " ");
          message.warning(`Please Enter ${formattedKey} Field`);
          return;
        }
      }
      if (Number(formData.initial_weight) < Number(formData.final_weight)) {
        message.warning(
          "Final Weight Should be less than or equal to Initial Weight"
        );
        return;
      }
      if (Number(formData.result).toFixed(2) > 7.0) {
        console.log(formData.result);
        message.warning(
          "Result of Moisture Content % Should be Less Than Or Equal To 7.0 "
        );
        return;
      }

      apiurl = `${ API.prodUrl}/Precot/api/QcForm/SubmitMoisturesF26G`;
      payload = {
        id: formData.id || "",
        formatNo: "PH-QCL01/F-026G",
        revisionNo: "01",
        formatName: "CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%)",
        refSopNo: "PH-QCL01-D-05",
        date: formData.date||date,
        product: productName,
        customer: customerName,
        batch_no: formData.batch_no,
        lot_no: formData.lot_no,
        po_no: formData.po_no,
        quantity: formData.quantity,
        testing_date: formData.testing_date,
        details: formData.moisture?.map((item) => ({
          lineId: item.lineId || "",
          initial_weight: item.initial_weight,
          final_weight: item.final_weight,
          result: Number(item.result).toFixed(2),
          remarks: item.remarks || "NA",
        })),
      };
      if (formData.id) {
        payload.id = formData.id;
      }
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
      apiurl = `${ API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF26G`;
      payload = {
        id: formData.id,
        status: "Reject",
        formatNo: "PH-QCL01-F-026F",
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
          navigate("/Precot/QualityControl/F-026G/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };
  useEffect(() => {
    let result = 0;

    if (Number(formData.initial_weight)) {
      result =
        ((Number(formData.initial_weight) -
          Number(formData.final_weight || 0)) /
          Number(formData.initial_weight)) *
        100;
    }

    setFormData((prevState) => ({
      ...prevState,
      result: result,
    }));
  }, [formData.final_weight, formData.initial_weight]);

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

  // ------------- Form Lov's -------------------------
  const Lov1 = [
    { value: "Pass", label: "Pass" },
    { value: "Fail", label: "Fail" },
    {
      value: "Under conditionally passed",
      label: "Under conditionally passed",
    },
    { value: "Nil", label: "Nil" },
  ];

  // -------------------------------------------------

  // -------------- HandleINput Functions -----------
  const handleInput = (index, value, name) => {
    setFormData((prevState) => {
      const updatedMoisture = [...prevState.moisture];
      updatedMoisture[index] = { ...updatedMoisture[index], [name]: value };

      // Recalculate the result if necessary, for example:
      if (name === "initial_weight" || name === "final_weight") {
        const initialWeight = updatedMoisture[index].initial_weight;
        const finalWeight = updatedMoisture[index].final_weight;
        if (initialWeight && finalWeight) {
          updatedMoisture[index].result = (
            ((initialWeight - finalWeight) / initialWeight) *
            100
          ).toFixed(2);
        }
      }

      return {
        ...prevState,
        moisture: updatedMoisture,
      };
    });
  };
  const handleInputParant = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectText = (index, e, name) => {
    if (e.key === "Enter") {
      setFormData((prevState) => {
        const updatedMoisture = [...prevState.moisture];
        updatedMoisture[index] = {
          ...updatedMoisture[index],
          [name]: e.target.value,
        };

        return {
          ...prevState,
          moisture: updatedMoisture,
        };
      });
    }
  };

  const handleClear = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleBlur = (index) => {
    const currentRow = formData.moisture[index];

    if (Number(currentRow?.initial_weight) < Number(currentRow?.final_weight)) {
      message.warning(
        "Final Weight Should be less than or equal to Initial Weight"
      );
      handleInput(index, "", "final_weight");
    }

    if (
      Number(currentRow?.result).toFixed(2) > 7.0 &&
      currentRow?.initial_weight !== "" &&
      currentRow?.final_weight !== ""
    ) {
      message.warning(
        "Result of Moisture Content % Should be Less Than Or Equal To 7.0"
      );
    }
  };

  //-------------------------------------------------

  const handleE = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
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
        formName={"CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%)"}
        formatNo={"PH-QCL01/F-026G"}
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
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                addonBefore="Customer :"
                value={customerName}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
              <Input
                type="text"
                addonBefore="Lot No : "
                value={formData.lot_no}
                onChange={(e) => {
                  handleInputParant(e.target.value, "lot_no");
                }}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                addonBefore="Product :"
                value={productName}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
              <Input
                type="text"
                value={formData.po_no}
                onChange={(e) => {
                  handleInputParant(e.target.value, "po_no");
                }}
                addonBefore="PO No."
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              />
            </Space>
          </Col>
          <br></br>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                type="text"
                addonBefore="Batch No:"
                value={formData.batch_no}
                onChange={(e) => {
                  handleInputParant(e.target.value, "batch_no");
                }}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              />
              <Input
                type="text"
                addonBefore="Quantity (EA)"
                value={formData.quantity}
                onChange={(e) => {
                  handleInputParant(e.target.value, "quantity");
                }}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              />
            </Space>
          </Col>
        </Row>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Test Type I" key="1">
          <div style={{ height: "50vh" }}>
            <table>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "20px" }}
                  rowSpan={2}
                >
                  S.No.
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Testing <br /> Date
                </td>
                <td
                  style={{ textAlign: "center", padding: "10px" }}
                  rowSpan={1}
                >
                  Standard <br /> Moisture (%)
                </td>
                <td style={{ textAlign: "center" }} colSpan={3}>
                  Observations
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Remarks
                </td>{" "}
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Action
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center" }}
                  rowSpan={formData.moisture?.length + 1}
                >
                  ≤ 7.0
                </td>

                <td style={{ textAlign: "center", padding: "10px" }}>
                  Initial Weight <br /> (Cotton weight Before dry. (g))
                </td>
                <td style={{ textAlign: "center" }}>
                  Final Weight <br /> (Cotton Wt. after dry.(g))
                </td>
                <td style={{ textAlign: "center" }}>
                  Result Moisture <br /> Content (%)
                </td>
              </tr>
              {formData.moisture?.map((row, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {index + 1}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="date"
                      value={formData.testing_date}
                      onChange={(e) =>
                        handleInputParant(e.target.value, "testing_date")
                      }
                      readOnly
                      style={{ textAlign: "center" }}
                      max={today}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="text"
                      style={{ width: "100%", textAlign: "center" }}
                      status={status.fieldStatus}
                      value={row.initial_weight}
                      onBlur={handleBlur}
                      readOnly={status.fieldStatus}
                      onChange={(e) =>
                        handleInput(index, e.target.value, "initial_weight")
                      }
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      onKeyDown={handleE}
                      style={{ width: "100%", textAlign: "center" }}
                      value={row.final_weight}
                      onBlur={handleBlur}
                      readOnly={status.fieldStatus}
                      onChange={(e) =>
                        handleInput(index, e.target.value, "final_weight")
                      }
                      status={status.fieldStatus}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {row.result ? Number(row.result).toFixed(2) : row.result}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Select
                      options={Lov1}
                      value={row.remarks}
                      style={{ textAlign: "center", width: "300px" }}
                      onChange={(e) => handleInput(index, e, "remarks")}
                      onBlur={handleBlur}
                      dropdownStyle={{ textAlign: "center" }}
                      showSearch
                      filterOption={false}
                      onKeyDown={(e) => handleSelectText(index, e, "remarks")}
                      disabled={status.fieldStatus}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      danger
                      icon={<FaTrash style={{ fontSize: "10px" }} />}
                      onClick={() => handleDeleteRow(index)}
                      disabled={status.fieldStatus}
                      style={{
                        padding: "2px 4px",
                        fontSize: "10px",
                        height: "24px",
                        backgroundColor: "#ff4d4f",
                        borderColor: "#ff4d4f",
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
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
              onClick={handleAddRow}
              disabled={status.fieldStatus}
            >
              <AiOutlinePlus style={{ marginRight: "5px" }} />
              Add Row
            </Button>
          </div>
        </TabPane>

        <TabPane tab="Review" key={6}>
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  Prepared By.
                </td>
                <td colspan="2" style={{ textAlign: "center", width: "35%" }}>
                  Verified By.
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Approved By.
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

                <td colspan="2" style={{ height: "60%", textAlign: "center" }}>
                  {formData.qa_exe_status !== "WAITING_FOR_APPROVAL" &&
                    formData.qa_exe_status !== "" && (
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
                            {formData.qa_exe_sign}
                            <br />
                            {formatDateAndTime(formData.qa_exe_submit_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.qa_exe_sign ? (
                            <img
                              src={eSign.qa_exe_sign}
                              alt="eSign"
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

export default QualityControl_f26G;
