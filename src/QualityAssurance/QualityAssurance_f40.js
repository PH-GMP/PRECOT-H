/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Tabs, Tooltip } from "antd";
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

const QualityAssurance_f40 = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { date, shift } = location.state;
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
    saveStatus2: false,
    submitStatus2: false,
    fieldStatus2: false,
  });
  const [statusLoader, setStatusLoader] = useState(false);
  const [deleteID, setDeleteId] = useState({
    registerId: [],
    issueID: [],
  });
  const today = new Date().toISOString().split("T")[0];
  const [tabNo, setTabNo] = useState("");
  const [formData, setFormData] = useState({
    format: "PRODUCTION RETAINED SAMPLE REGISTER",
    format_no: "PH-QAD01/F-040",
    ref_sop_no: "PH-QAD01-D-36",
    month: "",
    shift: "",
    date: "",
    year: "",
    product: "",
    sampleRetainedBy: "",
    approvedBy: "",
    issue_status: "",
    productionSampleA: [
      {
        shift: "",
        date: "",
        year: "",
        month: "",
        product: "",
        fgNoBatchNo: "",
        productDescription: "",
        quantityInNos: "",
        boxNo: "",
        sampleDisposalDate: "",
        sampleRetainedBy: "",
        approvedBy: "",
      },
    ],
    productionSampleB: [],
  });
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    qc_sign: "",
    ins_sign: "",
  });
  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityAssurance/F-040/Summary");
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
    const signatureKeys = ["qc_sign", "ins_sign"];
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
  }, [token, formData.ins_sign, formData.qc_sign]);

  useEffect(() => {
    if (!initialized.current) {
      setTabNo("1");
      if (role == "QA_MANAGER" || role == "ROLE_DESIGNEE") {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/F040/productionRetain?date=${date}&shift=${shift}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (
              role == "QA_MANAGER" ||
              role == "ROLE_DESIGNEE" ||
              role == "ROLE_MR"
            ) {
              message.warning("QA Inspector yet to submit");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-040/Summary");
              }, 1000);
              return;
            }

            setStatus((prevState) => ({
              ...prevState,
              saveStatus2: true,
              submitStatus2: true,
              fieldStatus2: true,
            }));
          }
          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              (role == "QA_MANAGER" || role == "ROLE_DESIGNEE") &&
              data.ins_status != "QA_INSPECTOR_APPROVED"
            ) {
              message.warning("QA Inspector yet to Submit");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-040/Summary");
              }, 1000);
            }
            if (data.qc_status !== "QA_MANAGER_APPROVED") {
              setStatus((prevState) => ({
                ...prevState,
                saveStatus2: true,
                submitStatus2: true,
                fieldStatus2: true,
              }));
            }
            statusFunction(data);
            statusFuncton2(data);
            setFormData(response.data[0]);

            if (
              data.qc_status == "QA_MANAGER_APPROVED" &&
              data.productionSampleB.length == 0
            ) {
              handleAddRow("issue");
            }
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
      responseData.ins_status == "QA_INSPECTOR_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_QA" &&
      responseData.ins_status == "QA_INSPECTOR_APPROVED" &&
      (responseData.qc_status == "WAITING_FOR_APPROVAL" ||
        responseData.qc_status == "QA_MANAGER_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "ROLE_DESIGNEE") &&
      responseData.qc_status == "QA_MANAGER_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "ROLE_DESIGNEE") &&
      responseData.qc_status == "QA_MANAGER_REJECTED"
    ) {
      message.warning("QA Inspector Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityAssurance/F-040/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const statusFuncton2 = (data) => {
    if (data.issue_status == "QA_INSPECTOR_APPROVED") {
      setStatus((prevState) => ({
        ...prevState,
        saveStatus2: true,
        submitStatus2: true,
        fieldStatus2: true,
      }));
    }
  };

  const handleSave = async (type, tab) => {
    console.log("Clicked Two");
    let apiurl, payload, succesMsg;
    if (tab == "register" && type == "Save") {
      if (deleteID.registerId.length > 0) {
        try {
          for (let i = 0; i < deleteID.registerId.length; i++) {
            handleDelete(deleteID.registerId[i], "attendence");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/F040/saveproductionRetain`;
      payload = {
        test_id: formData.test_id,
        format: "PRODUCTION RETAINED SAMPLE REGISTER",
        format_no: "PH-QAD01/F-040",
        ref_sop_no: "PH-QAD01-D-36",
        month: getMonthAndYear(date).month,
        shift: shift,
        date: date,
        year: getMonthAndYear(date).year,
        issue_status: "",
        productionSampleA: formData.productionSampleA.map((row, index) => ({
          ...row,
          id: row.id,
          shift: shift,
          date: date,
          year: getMonthAndYear(date).year,
          month: getMonthAndYear(date).month,
          fgNoBatchNo: row.fgNoBatchNo,
          productDescription: row.productDescription,
          quantityInNos: row.quantityInNos,
          boxNo: row.boxNo,
          sampleDisposalDate: row.sampleDisposalDate,
          test_id: formData.test_id,
        })),
      };
    } else if (type == "Approve" && tab == "register") {
      apiurl = `${API.prodUrl}/Precot/api/QA/F040/approval`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.test_id,
        formatNo: "PH-QAD01/F-040",
        status: "Approve",
      };
    } else if (tab == "issue" && type == "Save") {
      if (deleteID.issueID.length > 0) {
        try {
          for (let i = 0; i < deleteID.issueID.length; i++) {
            handleDelete(deleteID.issueID[i], "issue");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/F040/saveproductionRetain`;
      payload = {
        test_id: formData.test_id,
        format: "PRODUCTION RETAINED SAMPLE REGISTER",
        format_no: "PH-QAD01/F-040",
        ref_sop_no: "PH-QAD01-D-36",
        revison_number: "01",
        month: getMonthAndYear(date).month,
        shift: shift,
        date: date,
        issue_status: "ISSUE_SAVED",
        year: getMonthAndYear(date).year,
        productionSampleA: formData.productionSampleA.map((row, index) => ({
          ...row,
          id: row.id,
          shift: shift,
          date: date,
          year: getMonthAndYear(date).year,
          month: getMonthAndYear(date).month,
          fgNoBatchNo: row.fgNoBatchNo,
          productDescription: row.productDescription,
          quantityInNos: row.quantityInNos,
          boxNo: row.boxNo,
          sampleDisposalDate: row.sampleDisposalDate,
          test_id: formData.test_id,
        })),
        productionSampleB: formData.productionSampleB.map((row, index) => ({
          ...row,
          id: row.id,
          date: date,
          shift: shift,
          year: getMonthAndYear(date).year,
          month: getMonthAndYear(date).month,
          disposalMethod: row.disposalMethod,
          disposedBy: row.disposedBy,
          bagOpenedOn: row.bagOpenedOn,
          reason: row.reason,
          product: row.product,
          requestedBy: row.requestedBy,
          approvedBy: row.approvedBy,
          receivedBy: row.receivedBy,
          test_id: formData.test_id,
          remarks: row.remarks || "NA",
        })),
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod = type === "Save" ? axios.post : axios.put;
      const response = await axios.post(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityAssurance/F-040/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async (type, tab) => {
    console.log("clicked");
    let apiurl, payload, succesMsg;
    if (tab == "register" && type == "Submit") {
      for (let index = 0; index < formData.productionSampleA.length; index++) {
        const row = formData.productionSampleA[index];
        if (
          row.fgNoBatchNo == "" ||
          row.productDescription == "" ||
          row.quantityInNos == "" ||
          row.boxNo == "" ||
          row.sampleDisposalDate == ""
        ) {
          message.warning(
            `Please Enter The All Details in Register row ${index + 1}`
          );
          return;
        }
      }

      if (deleteID.registerId.length > 0) {
        try {
          for (let i = 0; i < deleteID.registerId.length; i++) {
            handleDelete(deleteID.registerId[i], "attendence");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Submitted Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/F040/submitproductionRetain`;
      payload = {
        test_id: formData.test_id,
        format: "PRODUCTION RETAINED SAMPLE REGISTER",
        format_no: "PH-QAD01/F-040",
        ref_sop_no: "PH-QAD01-D-36",
        revison_number: "01",
        month: getMonthAndYear(date).month,
        shift: shift,
        date: date,
        year: getMonthAndYear(date).year,
        productionSampleA: formData.productionSampleA.map((row, index) => ({
          ...row,
          id: row.id,
          shift: shift,
          date: date,
          year: getMonthAndYear(date).year,
          month: getMonthAndYear(date).month,
          fgNoBatchNo: row.fgNoBatchNo,
          productDescription: row.productDescription,
          quantityInNos: row.quantityInNos,
          boxNo: row.boxNo,
          sampleDisposalDate: row.sampleDisposalDate,
          test_id: formData.test_id,
        })),
      };
    } else if (type == "Reject" && tab == "register") {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        return;
      }
      apiurl = `${API.prodUrl}/Precot/api/QA/F040/approval`;
      succesMsg = "Rejected Successfully";
      payload = {
        id: formData.test_id,
        formatNo: "PH-QAD01/F-040",
        status: "Reject",
        remarks: formData.reason,
      };
    } else if (tab == "issue" && type == "Submit") {
      succesMsg = "Data Submitted Sucessfully";
      if (formData.productionSampleB.length == 0) {
        message.warning("Please Enter The Details");
        return;
      }
      for (let index = 0; index < formData.productionSampleB.length; index++) {
        const row = formData.productionSampleB[index];
        if (
          row.disposalMethod == "" ||
          row.disposedBy == "" ||
          row.bagOpenedOn == "" ||
          row.reason == "" ||
          row.requestedBy == "" ||
          row.approvedBy == "" ||
          row.receivedBy == ""
        ) {
          message.warning(
            `Please Enter The All in Issue Details row ${index + 1}`
          );
          return;
        }
      }
      if (deleteID.issueID.length > 0) {
        try {
          for (let i = 0; i < deleteID.issueID.length; i++) {
            handleDelete(deleteID.issueID[i], "issue");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      for (let index = 0; index < formData.productionSampleB.length; index++) {
        const row = formData.productionSampleB[index];
        if (
          row.disposalMethod == "" ||
          row.disposedBy == "" ||
          row.bagOpenedOn == "" ||
          row.requestedBy == "" ||
          row.reason == "" ||
          row.approvedBy == "" ||
          row.receivedBy == "" ||
          row.product == ""
        ) {
          message.warning(
            `Please Enter The All Details in Sample Issue row ${index + 1}`
          );
          return;
        }
      }
      apiurl = `${API.prodUrl}/Precot/api/QA/F040/submitproductionRetain`;
      payload = {
        test_id: formData.test_id,
        format: "PRODUCTION RETAINED SAMPLE REGISTER",
        format_no: "PH-QAD01/F-040",
        ref_sop_no: "PH-QAD01-D-36",
        revison_number: "01",
        month: getMonthAndYear(date).month,
        shift: shift,
        date: date,
        issue_status: "ISSUE_SUBMITTED",
        year: getMonthAndYear(date).year,
        productionSampleA: formData.productionSampleA.map((row, index) => ({
          ...row,
          id: row.id,
          shift: shift,
          date: date,
          year: getMonthAndYear(date).year,
          month: getMonthAndYear(date).month,
          fgNoBatchNo: row.fgNoBatchNo,
          productDescription: row.productDescription,
          quantityInNos: row.quantityInNos,
          boxNo: row.boxNo,
          sampleDisposalDate: row.sampleDisposalDate,
          test_id: formData.test_id,
        })),
        productionSampleB: formData.productionSampleB.map((row, index) => ({
          ...row,
          id: row.id,
          date: date,
          shift: shift,
          year: getMonthAndYear(date).year,
          month: getMonthAndYear(date).month,
          disposalMethod: row.disposalMethod,
          disposedBy: row.disposedBy,
          bagOpenedOn: row.bagOpenedOn,
          reason: row.reason,
          product: row.product,
          requestedBy: row.requestedBy,
          approvedBy: row.approvedBy,
          receivedBy: row.receivedBy,
          test_id: formData.test_id,
          remarks: row.remarks || "NA",
        })),
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod = type === "Submit" ? axios.post : axios.put;
      const response = await axios.post(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityAssurance/F-040/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleAddRow = (type) => {
    if (type == "register") {
      setFormData((prevState) => ({
        ...prevState,
        productionSampleA: [
          ...prevState.productionSampleA,
          {
            fgNoBatchNo: "",
            productDescription: "",
            quantityInNos: "",
            boxNo: "",
            sampleDisposalDate: "",
          },
        ],
      }));
    } else if (type == "issue") {
      setFormData((prevState) => ({
        ...prevState,
        productionSampleB: [
          ...prevState.productionSampleB,
          {
            disposalMethod: "",
            disposedBy: "",
            bagOpenedOn: "",
            reason: "",
            requestedBy: "",
            approvedBy: "",
            receivedBy: "",
            remarks: "",
          },
        ],
      }));
    }
  };

  const handleDeleteRow = async (index, rowId, type) => {
    if (type == "register") {
      if (formData.productionSampleA.length == 1) {
        return;
      }
      const confirm = window.confirm("Are You Sure To Delete This Row?");
      if (confirm) {
        if (rowId && formData.productionSampleA.length !== 1) {
          setDeleteId((prevState) => ({
            ...prevState,
            registerId: [...prevState.registerId, rowId],
          }));
          setFormData((prevState) => ({
            ...prevState,
            productionSampleA: prevState.productionSampleA.filter(
              (_, i) => i !== index
            ),
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            productionSampleA: prevState.productionSampleA.filter(
              (_, i) => i !== index
            ),
          }));
        }
      }
    }
    if (type == "issue") {
      if (formData.productionSampleB.length == 1) {
        return;
      }
      const confirm = window.confirm("Are You Sure To Delete This Row?");
      if (confirm) {
        if (rowId) {
          setDeleteId((prevState) => ({
            ...prevState,
            issueID: [...prevState.issueID, rowId],
          }));
          setFormData((prevState) => ({
            ...prevState,
            productionSampleB: prevState.productionSampleB.filter(
              (_, i) => i !== index
            ),
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            productionSampleB: prevState.productionSampleB.filter(
              (_, i) => i !== index
            ),
          }));
        }
      }
    }
  };

  const handleDelete = async (rowID, type) => {
    let apiurl;
    if (type == "attendence") {
      apiurl = `${API.prodUrl}/Precot/api/QA/F040/deleteChildA/${rowID}`;
    } else if (type == "issue") {
      apiurl = `${API.prodUrl}/Precot/api/QA/F040/deleteChildB/${rowID}`;
    }

    try {
      const response = await axios.delete(apiurl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {}
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

  const handleE = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleArrayInput = (value, fieldName, index, type) => {
    if (type == "register") {
      const updatedIdentity = formData.productionSampleA.map((row, idx) => {
        if (idx === index) {
          return { ...row, [fieldName]: value };
        }
        return row;
      });

      setFormData({
        ...formData,
        productionSampleA: updatedIdentity,
      });
    } else if (type == "issue") {
      const updatedIdentity = formData.productionSampleB.map((row, idx) => {
        if (idx === index) {
          return { ...row, [fieldName]: value };
        }
        return row;
      });

      setFormData({
        ...formData,
        productionSampleB: updatedIdentity,
      });
    }
  };

  useEffect(() => {
    if (
      today > calculateYear(date) &&
      tabNo == "3" &&
      formData.qc_status == "QA_MANAGER_APPROVED"
    ) {
      message.warning("Date Expired!");
      setTimeout(() => {
        navigate("/Precot/QualityAssurance/F-040/Summary");
      }, 1000);
    }
    if (formData.qc_status !== "QA_MANAGER_APPROVED" && tabNo == "3") {
      message.info("You Can Access This Tab Only If Tab 1 Approved");
    }
  }, [tabNo]);

  const calculateYear = (dateString) => {
    if (!dateString) return "";
    console.log(dateString);
    const [year, month, day] = dateString.split("-").map(Number);
    const initialDate = new Date(year, month - 1, day);
    const nextYearDate = new Date(initialDate);
    nextYearDate.setFullYear(initialDate.getFullYear() + 1);
    const formattedNextYearDate = `${nextYearDate.getFullYear()}-${(
      nextYearDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${nextYearDate.getDate().toString().padStart(2, "0")}`;
    console.log(formattedNextYearDate);
    return formattedNextYearDate;
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
        formName={"PRODUCTION RETAINED SAMPLE REGISTER"}
        formatNo={"PH-QAD01/F-040"}
        unit={"UNIT H"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          ...(tabNo !== "3"
            ? [
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
                    role == "ROLE_QA" ? (
                      <IoSave color="#00308F" />
                    ) : (
                      <img
                        src={approveIcon}
                        alt="Approve Icon"
                        color="#00308F"
                      />
                    )
                  }
                  onClick={() => {
                    role == "ROLE_QA"
                      ? handleSave("Save", "register")
                      : handleSave("Approve", "register");
                  }}
                  loading={statusLoader}
                >
                  {role == "ROLE_QA" ? "Save" : "Approve"}
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
                    role == "ROLE_QA" ? (
                      <GrDocumentStore color="#00308F" />
                    ) : (
                      <img src={rejectIcon} alt="Reject Icon" />
                    )
                  }
                  onClick={() => {
                    role == "ROLE_QA"
                      ? handleSubmit("Submit", "register")
                      : rejectFlow();
                  }}
                  loading={statusLoader}
                >
                  {role == "ROLE_QA" ? "Submit" : "   Reject"}
                </Button>,
              ]
            : [
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: status.saveStatus2 ? "none" : "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                  onClick={() => {
                    handleSave("Save", "issue");
                  }}
                  loading={statusLoader}
                >
                  Save
                </Button>,

                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: status.submitStatus2 ? "none" : "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  shape="round"
                  icon={<GrDocumentStore color="#00308F" />}
                  onClick={() => {
                    handleSubmit("Submit", "issue");
                  }}
                  loading={statusLoader}
                >
                  Submit
                </Button>,
              ]),
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
            onClick={() => {
              handleSubmit("Reject", "register");
            }}
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
        {(tabNo == "1" || tabNo == "2") && (
          <>
            <Input
              addonBefore={"Date "}
              value={formatDate(date)}
              style={{ textAlign: "center", width: "180px" }}
              readOnly
            />
            <Input
              addonBefore={"Shift "}
              value={shift}
              style={{ textAlign: "center", width: "180px", marginLeft: "5px" }}
              readOnly
            />
          </>
        )}
        {tabNo == "3" && (
          <>
            <Input
              addonBefore={"Valid Till "}
              value={formatDate(calculateYear(date))}
              style={{ textAlign: "center", width: "180px", marginLeft: "5px" }}
              readOnly
            />
          </>
        )}
      </div>
      <Tabs
        onChange={(e) => {
          setTabNo(e);
        }}
      >
        <TabPane tab="Register I" key={1}>
          <div style={{ height: "40vh" }}>
            <table style={{ tableLayout: "fixed" }}>
              <tr>
                <td style={{ textAlign: "center" }}>S.No</td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  FG No. / Batch No.
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Product Description
                </td>
                <td style={{ textAlign: "center" }}>Quantity in Nos</td>
                <td style={{ textAlign: "center" }}>Box No.</td>
                <td style={{ textAlign: "center" }}>Sample Disposal Date</td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Actions
                </td>
              </tr>
              {formData.productionSampleA.map((row, index) => (
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {" "}
                    {index + 1}{" "}
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.fgNoBatchNo}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "fgNoBatchNo",
                          index,
                          "register"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.productDescription}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "productDescription",
                          index,
                          "register"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={row.quantityInNos}
                      onKeyDown={handleE}
                      min={1}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "quantityInNos",
                          index,
                          "register"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.boxNo}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "boxNo",
                          index,
                          "register"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="date"
                      value={row.sampleDisposalDate}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "sampleDisposalDate",
                          index,
                          "register"
                        );
                      }}
                      min={date}
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
                        handleDeleteRow(index, row.id, "register");
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
                  handleAddRow("register");
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
        <TabPane tab="Reviews" key={2}>
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="2" style={{ textAlign: "center", width: "35%" }}>
                  Sample Retained by
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Approved by (QA Manager/ Designee)
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
                        {formData.ins_sign}
                        <br />
                        {formatDateAndTime(formData.ins_submit_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.ins_sign ? (
                        <img
                          src={eSign.ins_sign}
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
        <TabPane tab="Sample Issue" key={3}>
          <div style={{ height: "40vh" }}>
            <table>
              <tr>
                <td
                  colSpan={2}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Sample Disposal Details
                </td>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Sample Issue / Opening & Returning Details
                </td>
                <td
                  style={{ textAlign: "center", padding: "10px" }}
                  rowSpan={2}
                >
                  remark
                </td>
                <td
                  style={{ textAlign: "center", padding: "20px" }}
                  rowSpan={2}
                >
                  Actions
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Disposal Method
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Disposed by
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Bag Opened on
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Reason{" "}
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Requested by{" "}
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Approved by
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Received by
                </td>
              </tr>
              {formData.productionSampleB.map((row, index) => (
                <tr>
                  <td>
                    <Input
                      type="text"
                      value={row.disposalMethod}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "disposalMethod",
                          index,
                          "issue"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus2}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.disposedBy}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "disposedBy",
                          index,
                          "issue"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus2}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="date"
                      value={row.bagOpenedOn}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bagOpenedOn",
                          index,
                          "issue"
                        );
                      }}
                      min={date}
                      readOnly={status.fieldStatus2}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.reason}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "reason",
                          index,
                          "issue"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus2}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.requestedBy}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "requestedBy",
                          index,
                          "issue"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus2}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.approvedBy}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "approvedBy",
                          index,
                          "issue"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus2}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.receivedBy}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "receivedBy",
                          index,
                          "issue"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus2}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.remarks}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "remarks",
                          index,
                          "issue"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus2}
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
                        handleDeleteRow(index, row.id, "issue");
                      }}
                      disabled={status.fieldStatus2 || statusLoader}
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
                  handleAddRow("issue");
                }}
                disabled={status.fieldStatus2 || statusLoader}
                style={{ width: "100px", marginTop: "10px" }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </Button>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default QualityAssurance_f40;
