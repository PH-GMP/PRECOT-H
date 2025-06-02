/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Tabs,
  Tooltip,
} from "antd";
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
const DryGoods_f05 = () => {
  const location = useLocation();
  const { shift, date, orderNos } = location.state;
  console.log("987", orderNos);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const [currentPage2, setCurrentPage2] = useState(1);
  const [recordsPerPage2, setRecordsPerPage2] = useState(5);
  const startIndex2 = (currentPage2 - 1) * recordsPerPage2;
  const endIndex2 = startIndex2 + recordsPerPage2;
  const [statusLoader, setStatusLoader] = useState(false);
  const [laydownLov, setLaydownLov] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [customerNameFields, setCustomerNameFields] = useState("");

  const [formData, setFormData] = useState({
    date: date,
    shift: shift,
    laydown_no: "",
    usable_kg: "",
    saleable_kg: "",
    order_no: "",
    product_name: "",
    customer_name: "",
    reason: "",
    operator_status: "",
    operator_save_by: "",
    operator_save_on: "",
    operator_submitted_by: "",
    operator_submitted_on: "",
    operator_sign: "",
    hod_status: "",
    hod_save_on: "",
    hod_save_by: "",
    hod_submit_on: "",
    hod_submit_by: "",
    hod_sign: "",
    prodDetails: [],
    selectedPOrder: "",  
    stoppage: [],
  });
 
  const getUniquePOrders = (prodDetails) => {
    return [...new Set(prodDetails.map((item) => item.POrder))];
  };
 
  const [laydown, setLayDown] = useState("");
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const initialized = useRef(false);
  const initialized2 = useRef(false);
  const initialized3 = useRef(false);
  const paginatedData = formData.prodDetails
    ? formData.prodDetails.slice(startIndex, endIndex)
    : [];
  const paginatedData2 = formData.stoppage
    ? formData.stoppage.slice(startIndex2, endIndex2)
    : [];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/DryGoods/F-05/Summary");
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setFormData((prevState) => ({
      ...prevState,
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
    if (!initialized3.current) {
      const token = localStorage.getItem("token");
      initialized3.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/goodsLaydown/LaydownLov`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option.drygoods_laydown_number,
              label: option.drygoods_laydown_number,
            }));
            setLaydownLov(a);
          }
        } catch (error) {
          // message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });

  useEffect(() => {
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
      if (username) {
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
  }, [token, formData.operator_sign, formData.hod_sign]);

 
  useEffect(() => {
    console.log("orderNos", orderNos);
    if (!initialized.current) {
      initialized.current = true;
      if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        setStatus((prevStatus) => ({
          ...prevStatus,
          fieldStatus: true,
        }));
      }
      const fetchProductionDetails = async () => {
        let pdeShift;
        switch (shift) {
          case "I":
            pdeShift = 1;
            break;
          case "II":
            pdeShift = 2;
            break;
          case "III":
            pdeShift = 3;
            break;
        }

        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/goods/api/dryGoodsMiniROll1?date=${date}&shift=${pdeShift}&oderno=${orderNos}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            message.warning("No Record Found");
  
          }

          if (response.data.length > 0) {
        
            const uniquePOrders = getUniquePOrders(response.data);

            setFormData((prevState) => ({
              ...prevState,
              prodDetails: response.data,
            }));
          }
        } catch (error) {
          message.error(error.response.data.message);
 
        }
      };

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/Drygoods/Service/getRolldetailsbyF05?date=${date}&shift=${shift}&order_no=${orderNos}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (
            (!response.data && role !== "ROLE_OPERATOR") ||
            (response.data.operator_status !== "OPERATOR_APPROVED" &&
              role !== "ROLE_OPERATOR")
          ) {
            message.warning("Operator Yet To Submit");
            setTimeout(() => {
              navigate("/Precot/DryGoods/F-05/Summary");
            }, 1000);
          }
          if (response.data) {
            const data = response.data;

            setFormData((prevState) => ({
              ...prevState,
              ...data,
            }));
            statusFunction(data);
          }
        } catch (error) {
          message.error(error.response?.data?.message);
          
        }
      };
      fetchProductionDetails();
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    const fetchStoppageData = async (order_no) => {
      console.log("Order No", order_no);
      if (order_no) {
        console.log("Order No Api Entered");
        let pdeShift;
        switch (shift) {
          case "I":
            pdeShift = 1;
            break;
          case "II":
            pdeShift = 2;
            break;
          case "III":
            pdeShift = 3;
            break;
        }
        setStatusLoader(true);
        try {
          console.log("Api Call Happen");
          const response2 = await axios.get(
            `${
            API.prodUrl
            }/Precot/api/goods/api/dryGoodsMiniROllStoppage?date=${date}&order_no=${Number(
              order_no
            )}&shift=${pdeShift}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Api called", response2.data);
          if (response2.data.length > 0) {
            setFormData((prevState) => ({
              ...prevState,
              stoppage: response2.data,
            }));
            setStatusLoader(false);
          } else if (response2.data.length == 0) {
            setFormData((prevState) => ({
              ...prevState,
              stoppage: [],
            }));
            setStatusLoader(false);
            if (
              formData.operator_status !== "OPERATOR_APPROVED" &&
              role == "ROLE_OPERATOR"
            ) {
              message.warning(
                "No Stoppage Records Found For The Order No " + order_no
              );
            }
          }
        } catch (error) {
          message.error(error.response2.data.message);
          setStatusLoader(false);
        }
      }
      setStatusLoader(false);
    };
    fetchStoppageData(orderNos);
  }, []);

  const statusFunction = (responseData) => {
    if (
      role == "ROLE_OPERATOR" &&
      responseData.operator_status == "OPERATOR_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_OPERATOR" &&
      responseData.operator_status == "OPERATOR_APPROVED" &&
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
      message.warning("Operator Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-05/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleSave = async () => {
    let apiUrl, payload;
    if (role == "ROLE_OPERATOR") {
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/saveMiniRollDetails05`;
      payload = {
        unit: "Unit H",
        formatNo: "PH-PRD04/F-005",
        formatName: "PRODUCTION REPORT - MINI ROLL",
        sopNumber: "PH-PRD04-D-03",
        revisionNo: "01",
        date: formData.date,
        shift: formData.shift,
        laydown_no: formData.laydown_no,
        order_no: formData.prodDetails[0]?.POrder || orderNos,
        product_name: formData.prodDetails[0]?.ProdDesc,
        customer_name: formData.customer_name,
        usable_kg: formData.usable_kg,
        saleable_kg: formData.saleable_kg,
      };
      const keysToCheck = [
        "operator_status",
        "operator_save_on",
        "operator_save_id",
        "operator_submitted_by",
        "operator_submitted_on",
        "operator_submitted_id",
        "hod_status",
        "hod_submit_on",
        "hod_submit_by",
        "hod_submit_id",
        "hod_save_on",
        "hod_save_by",
        "hod_save_id",
        "hod_sign",
        "roll_id",
      ];
      keysToCheck.forEach((key) => {
        if (formData[key]) {
          payload[key] = formData[key];
        }
      });
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/approveOrReject05`;
      payload = {
        id: formData.roll_id,
        status: "Approve",
      };
    }
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_OPERATOR" ? axios.post : axios.put;

      const response = await requestMethod(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200 || response.status == 201) {
        let successMsg;
        if (role == "ROLE_OPERATOR") {
          successMsg = "Form Saved Succesfully";
        } else {
          successMsg = response.data.message;
        }
        message.success(successMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-05/Summary");
        }, 1000);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setStatusLoader(false);
    }
  };
  const handleSubmit = async () => {
    let apiUrl, payload;
    if (role == "ROLE_OPERATOR") {
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/submitMiniRollDetails05`;
      payload = {
        unit: "Unit H",
        formatNo: "PH-PRD04/F-005",
        formatName: "PRODUCTION REPORT - MINI ROLL",
        sopNumber: "PH-PRD04-D-03",
        revisionNo: "01",
        date: formData.date,
        shift: formData.shift,
        laydown_no: formData.laydown_no ? formData.laydown_no : "NA",
        order_no: formData.prodDetails[0]?.POrder || orderNos,
        product_name: formData.prodDetails[0]?.ProdDesc,
        customer_name: formData.customer_name,
        usable_kg: formData.usable_kg ? formData.usable_kg : "NA",
        saleable_kg: formData.saleable_kg ? formData.saleable_kg : "NA",
      };
      const keysToCheck = [
        "operator_status",
        "operator_submitted_by",
        "operator_submitted_on",
        "operator_submitted_id",
        "hod_status",
        "hod_submit_on",
        "hod_submit_by",
        "hod_submit_id",
        "hod_sign",
        "roll_id",
      ];
      keysToCheck.forEach((key) => {
        if (formData[key]) {
          payload[key] = formData[key];
        }
      });
    }
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter The Reason");
        return;
      }
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/approveOrReject05`;
      payload = {
        id: formData.roll_id,
        status: "Reject",
        remarks: formData.reason,
      };
    }
    try {
      setSubmitLoading(true);
      const requestMethod = role === "ROLE_OPERATOR" ? axios.post : axios.put;
      const response = await requestMethod(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200 || response.status == 201) {
        let successMsg;
        if (role == "ROLE_OPERATOR") {
          successMsg = "Form Submitted Succesfully";
        } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
          successMsg = response.data.message;
        }
        message.success(successMsg);
        setSubmitLoading(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-05/Summary");
        }, 1000);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setSubmitLoading(false);
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
  const handleInput = (e, name) => {
    if (name == "saleable") {
      setFormData((prevState) => ({
        ...prevState,
        saleable_kg: e.target.value,
      }));
    } else if (name == "useable") {
      setFormData((prevState) => ({
        ...prevState,
        usable_kg: e.target.value,
      }));
    } else if (name == "laydown") {
      setFormData((prevState) => ({
        ...prevState,
        laydown_no: e,
      }));
    } else if (name == "customer_name") {
      setFormData((prevState) => ({
        ...prevState,
        customer_name: e.target.value,
      }));
    }
  };
  const handleKeyDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  useEffect(() => {}, [status]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSizeChange = (current, size) => {
    setRecordsPerPage(size);
    setCurrentPage(1);
  };
  const handlePageChange2 = (page) => {
    setCurrentPage2(page);
  };
  const handleSizeChange2 = (current, size) => {
    setRecordsPerPage2(size);
    setCurrentPage2(1);
  };
  const pageSizeOptions = [
    "5",
    "10",
    "20",
    "50",
    "100",
    formData.prodDetails.length.toString(),
  ].map(Number);
  pageSizeOptions.sort((a, b) => a - b);
  let netWeightTotal = 0;
  paginatedData.forEach((details) => {
    netWeightTotal +=
      details.RNWt == null || details.RNWt == "N/A" ? 0 : details.RNWt;
  });
  const pageSizeOptions2 = [
    "5",
    "10",
    "20",
    "50",
    "100",
    formData.prodDetails.length.toString(),
  ].map(Number);
  pageSizeOptions.sort((a, b) => a - b);

  const options = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  return (
    <>
      <BleachingHeader
        formName={"PRODUCTION REPORT - MINI ROLL"}
        formatNo={"PH-PRD04/F-005"}
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
              role == "ROLE_OPERATOR" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_OPERATOR" ? "Save" : "Approve"}
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
              role == "ROLE_OPERATOR" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_OPERATOR" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            {role == "ROLE_OPERATOR" ? " Submit" : "   Reject"}
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
        <Row gutter={[8, 8]} align="middle">
          <Col xs={18} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Date :"
                value={formatDate(formData.date)}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Shift :"
                value={formData.shift}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <div>
                <label>Laydown : &nbsp;&nbsp;&nbsp; </label>
                <Select
                  options={laydownLov}
                  mode="multiple"
                  onChange={(values) =>
                    handleInput(values.join(","), "laydown")
                  }
                  value={
                    formData.laydown_no ? formData.laydown_no.split(",") : []
                  }
                  style={{ textAlign: "center", width: "150px" }}
                  dropdownStyle={{ textAlign: "center" }}
                  disabled={status.fieldStatus}
                ></Select>
              </div>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
           

              <Input
                type="text"
                addonBefore="Order No :"
                value={orderNos}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              ></Input>

        
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Product Name :"
                name="prodname"
                min={0}
                value={formData.prodDetails[0]?.ProdDesc}
                style={{ width: "120%", textAlign: "center" }}
                readOnly
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Customer Name :"
                min={0}
                value={formData.customer_name}
                style={{
                  width: "120%",
                  textAlign: "center",
                  marginLeft: "20%",
                }}
                onChange={(e) => {
                  handleInput(e, "customer_name");
                }}
                readOnly={status.fieldStatus}
              ></Input>
            </Space>
          </Col>
        </Row>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Production Details " key="1">
          <table style={{ width: "70%" }}>
            <thead>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No.</td>
                <td style={{ textAlign: "center" }}>Roll No.</td>
                <td style={{ textAlign: "center" }}>Width in MM</td>
                <td style={{ textAlign: "center" }}>GSM</td>
                <td style={{ textAlign: "center" }}>Net Wt. in Kg</td>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((details, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    {startIndex + index + 1}
                  </td>
                  <td style={{ textAlign: "center" }}>{details.BaleNo}</td>
                  <td style={{ textAlign: "center" }}>{details.PWid}</td>
                  <td style={{ textAlign: "center" }}>{details.PGSM}</td>
                  <td style={{ textAlign: "center" }}>{details.RNWt}</td>
                </tr>
              ))}
              <br></br>
              <tr>
                <th
                  colSpan={4}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  {" "}
                  Total
                </th>
                <td style={{ textAlign: "center" }}>
                  {netWeightTotal == 0
                    ? netWeightTotal
                    : netWeightTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            pageSize={recordsPerPage}
            total={formData.prodDetails.length}
            onChange={handlePageChange}
            onShowSizeChange={handleSizeChange}
            showSizeChanger
            pageSizeOptions={pageSizeOptions.map((size) => size.toString())}
            style={{
              textAlign: "center",
              marginTop: "20px",
              float: "right",
            }}
          />
        </TabPane>
        <TabPane tab="Waste in KG" key="2">
          <table style={{ width: "50%" }}>
            <tr>
              <td
                style={{ textAlign: "center", width: "30%", padding: "40px" }}
                rowSpan={2}
              >
                {" "}
                Waste in Kg
              </td>
              <td style={{ textAlign: "center", width: "30%" }}> Usable</td>
              <td>
                <Input
                  type="text"
                  name="useable"
                  value={formData.usable_kg}
                  onChange={(e) => {
                    handleInput(e, "useable");
                  }}
                  onKeyDown={handleKeyDown}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", width: "30%" }}>Saleable</td>
              <td>
                <Input
                  type="text"
                  name="saleable"
                  value={formData.saleable_kg}
                  onChange={(e) => {
                    handleInput(e, "saleable");
                  }}
                  onKeyDown={handleKeyDown}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
          </table>
        </TabPane>
        <TabPane tab="Stoppage" key="3">
          <table style={{ width: "70%" }}>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Nature Of Problem
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Stop. Time
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Restart Time
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Idle Time (in Min)
              </td>
            </tr>
            {paginatedData2.map((details, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  {startIndex2 + index + 1}
                </td>
                <td style={{ textAlign: "center" }}>{details.SCAUSE}</td>
                <td style={{ textAlign: "center" }}>{details.FTime}</td>
                <td style={{ textAlign: "center" }}>{details.TTime}</td>
                <td style={{ textAlign: "center" }}>{details.FTime}</td>
              </tr>
            ))}
          </table>
          <Pagination
            current={currentPage2}
            pageSize={recordsPerPage2}
            total={formData.stoppage.length}
            onChange={handlePageChange2}
            onShowSizeChange={handleSizeChange2}
            showSizeChanger
            pageSizeOptions={pageSizeOptions.map((size) => size.toString())}
            style={{
              textAlign: "center",
              marginTop: "20px",
              float: "right",
            }}
          />
        </TabPane>
        <TabPane tab="Reviews" key="4">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  OPERATOR SIGN & DATE
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  HOD/DESIGNEE SIGN & DATE
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
                        {formData.operator_sign}
                        <br />
                        {formatDateAndTime(formData.operator_submitted_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.operator_sign ? (
                        <img
                          src={eSign.operator_sign}
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
                            {formatDateAndTime(formData.hod_submit_on)}
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

export default DryGoods_f05;
