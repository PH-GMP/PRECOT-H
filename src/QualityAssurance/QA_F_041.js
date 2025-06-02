/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Radio,
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
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_F_041 = () => {
  const { TextArea } = Input;
  const [tabNo, setTabNo] = useState("1");
  const [statusLoader, setStatusLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const initialized = useRef(false);
  const { TabPane } = Tabs;
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];
  const [controlGeneration, setControlGeneration] = useState([]);
  const [tabName, setTabName] = useState(
    role == "ROLE_HOD" || role == "ROLE_DESIGNEE" ? "Tab_1" : "Tab_2",
  );
  const categorizationLov = [
    { value: "Minor", label: "Minor" },
    { value: "Major", label: "Major" },
    { value: "Critical", label: "Critical" },
  ];
  const changeControlLov = [
    { value: "Temporary", label: "Temporary" },
    { value: "Permanent", label: "Permanent" },
  ];
  const yesNoLov = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });

  const [departmentList, setdepartmentList] = useState();
  const [deleteId, setDeleteId] = useState([]);
  const [hodLov, setHodLov] = useState([]);
  const { date, changeControl } = location.state;
  const departmentId = localStorage.getItem("departmentId");
  const userName = localStorage.getItem("username");
  const getMonthAndYear = (dateString) => {
    const formatDate = dateString.split("-");
    const year = formatDate[0];
    const monthNumber = parseInt(formatDate[1], 10) - 1;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[monthNumber];
    return { month, year };
  };

  const [formData, setFormData] = useState({
    action: "",
    formatName: "QA CHANGE CONTROL FORM",
    formatNo: "PH-QAD01-F-041",
    ref_sop_no: "PH-QCL01-D-05 & PH-QCL01-D-11",
    revisionNo: "01",
    sopNumber: "PH-QAD01-D-37",
    unit: "Unit H",
    // Tab 1
    department: "",
    date: "",
    typeOfChangeControl: "",
    changeControlTo: changeControl,
    existingProcedure: "",
    proposedChange: "",
    reasonForChange: "",
    attachments: "",
    // Tab 2
    changeControlNumber: "",
    targetDate: "",
    // Tab 3
    categoryOfChange: "",
    riskAssessment: "",
    product: "",
    facility: "",
    equipment: "",
    trainingRequirements: "",
    trainingRequirementsText: "",
    approvalByContractGiver: "",
    approvalByContractGiverText: "",
    commentsTab3: "",
    // Tab 4
    qcComments: "",
    qcSign: "",
    developmentComments: "",
    developmentSign: "",
    bleachingComments: "",
    bleachingSign: "",
    SpunlaceComments: "",
    SpunlaceSign: "",
    cottonBudsComments: "",
    cottonBudsSign: "",
    padPunchingComments: "",
    padPunchingSign: "",
    qaComments: "",
    qaSign: "",
    ppcComments: "",
    ppcSign: "",
    engineeringComments: "",
    engineeringSign: "",
    wareHouseComments: "",
    wareHouseSign: "",
    othersComments: "",
    othersSign: "",
    // Tab5
    actionItem: "",
    details: [
      {
        actionItemNo: "",
        actionItemDescription: "",
        responsiblePerson: "",
        resposibleDepartment: "",
      },
    ],
    additionalComments: "",
    // Tab 6
    commentsTab6: "",
    // Tab 7
    commentsTab7: "",
    // Tab 8
    dateOfRequest: "",
    justificationForDateExtension: "",
    // Tab 9
    implementationChanges: "",
    // Tab 10
    suppportingDocuments: "",
    // Tab 11
    implementationVerification: "",
    // Tab 12
    closureOfChangeControl: "",
  });

  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    qc_sign: "",
    qaSign: "",
    hodSubmitByTab11: "",
    qaManagerSubmitByTab2: "",
    qaManagerSubmitByTab3: "",
    qaManagerSubmitByTab5: "",
    qaManagerSubmitByTab6: "",
    qaManagerSubmitByTab7: "",
    hodSubmitByTab8: "",
    qaManagerSubmitByTab8: "",
    hodSubmitByTab9: "",
    hodSubmitByTab10: "",
    qaManagerSubmitByTab12: "",
    bleachingSign: "",
    SpunlaceSign: "",
    qcSign: "",
    ppcSign: "",
    qaSign: "",
    developmentSign: "",
    engineeringSign: "",
    cottonBudsComments: "",
  });

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers },
        );
        const a = response.data.map((x, i) => {
          return {
            value: x.department,
            label: x.department,
          };
        });
        setdepartmentList(a);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  const handleDelete = async (rowId) => {
    try {
      const response = await axios.delete(
        `${API.prodUrl}/Precot/api/QA/Service/ChangeControlForm/delete?id=${rowId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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

  const handleFormParams = (value, name, index) => {
    setFormData((prevState) => ({
      ...prevState,
      details: prevState.details.map((item, i) =>
        i == index ? { ...item, [name]: value } : item,
      ),
    }));
  };

  const handleAddRow = () => {
    setFormData((prevState) => ({
      ...prevState,
      details: [
        ...prevState.details,
        {
          actionItemNo: "",
          actionItemDescription: "",
          responsiblePerson: "",
          resposibleDepartment: "",
        },
      ],
    }));
  };

  useEffect(() => {
    const signatureKeys = [
      "chemist_sign",
      "micro_sign",
      "qc_sign",
      "hodSubmitByTab11",
      "qaManagerSubmitByTab2",
      "qaManagerSubmitByTab3",
      "qaManagerSubmitByTab5",
      "qaManagerSubmitByTab6",
      "qaManagerSubmitByTab7",
      "hodSubmitByTab8",
      "qaManagerSubmitByTab8",
      "hodSubmitByTab9",
      "hodSubmitByTab10",
      "qaManagerSubmitByTab12",
      "qaSign",
      "bleachingSign",
      "SpunlaceSign",
      "qcSign",
      "ppcSign",
      "qaSign",
      "developmentSign",
      "engineeringSign",
      "cottonBudsComments",
    ];
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
            },
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                "",
              ),
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
  }, [
    token,
    formData.chemist_sign,
    formData.micro_sign,
    formData.hodSubmitByTab11,
    formData.qaManagerSubmitByTab2,
    formData.qaManagerSubmitByTab3,
    formData.qaManagerSubmitByTab5,
    formData.qaManagerSubmitByTab6,
    formData.qaManagerSubmitByTab7,
    formData.hodSubmitByTab8,
    formData.qaManagerSubmitByTab8,
    formData.hodSubmitByTab9,
    formData.hodSubmitByTab10,
    formData.qaManagerSubmitByTab12,
    formData.qaSign,
    formData.bleachingSign,
    formData.padPunchingSign,
    formData.qcSign,
    formData.ppcSign,
    formData.qaSign,
    formData.developmentSign,
    formData.engineeringSign,
    formData.cottonBudsComments,
  ]);

  useEffect(() => {
    if (role == "ROLE_MICROBIOLOGIST") {
      setTabNo("8");
    }
  }, [role]);

  const [initiatingDept, setInitiatingDepartment] = useState("");

  const departmentMap = {
    1: "BLEACHING",
    2: "SPUNLACE",
    3: "PAD_PUNCHING",
    4: "DRY_GOODS",
    5: "QUALITY_CONTROL",
    6: "QUALITY_ASSURANCE",
    7: "PPC",
    8: "STORE",
    9: "DISPATCH",
    10: "PRODUCT_DEVELOPMENT",
    11: "ENGINEERING",
    12: "COTTON_BUDS",
  };

  useEffect(() => {
    if (departmentId) {
      setInitiatingDepartment(departmentMap[departmentId] || "");
    }
  }, [departmentId]);

  useEffect(() => {
    const controlGeneration = async () => {
      try {
        if (tabNo === "2") {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/qa/number/generationbasedDpt?department=${initiatingDept}&formNumber=PH-QAD01-F-041`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          setControlGeneration(response.data);
        }
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    controlGeneration();
  }, [token, tabNo, formData.department]);

  useEffect(() => {
    const hodLovApi = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/ChangeControlForm/changeControlNumberLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Filter out entries with empty value and remove duplicates
        const uniqueValues = response.data
          .filter((item) => item.value.trim() !== "") // Remove empty values
          .reduce((acc, current) => {
            const isDuplicate = acc.some(
              (item) => item.value === current.value,
            );
            if (!isDuplicate) {
              acc.push(current); // Add only unique values
            }
            return acc;
          }, []);

        setHodLov(uniqueValues);
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    hodLovApi();
  }, [token]);

  useEffect(() => {
    if (!initialized.current) {
      if (role == "QA_MANAGER" || role == "QC_MANAGER") {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/ChangeControlForm/getByParam?date=${date}&changeControlTo=${changeControl}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data;

      statusFunction(data);
      setFormData((prevState) => ({
        ...prevState,
        ...data,
        obser:
          data.details && data.details.length > 0
            ? [{ ...prevState.details, ...data.details }]
            : prevState.details,
      }));
    } catch (error) {}
  };
  const statusFunction = (data) => {
    if (role == "ROLE_CHEMIST" && data.chemist_status == "CHEMIST_APPROVED") {
      setStatus((prevState) => ({
        ...prevState,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_CHEMIST" &&
      data.chemist_status == "CHEMIST_APPROVED" &&
      (data.qc_status == "WAITING_FOR_APPROVAL" ||
        data.qc_status == "QA_APPROVED" ||
        data.qc_status == "QC_APPROVED" ||
        data.qc_status == "" ||
        data.qc_status == null)
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
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
        data.qc_status == "QC_APPROVED" ||
        data.qc_status == "" ||
        data.qc_status == null)
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
      message.warning("Chemist or Microbiologist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityAssurance/QA_F_041_Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleApiRequest = async (actionType) => {
    let apiurl, payload, succesMsg;
    const tabFields = {
      1: [
        "department",
        "typeOfChangeControl",
        "existingProcedure",
        "proposedChange",
        "reasonForChange",
        "attachments",
      ],
      2: ["changeControlNumber"],
      3: [
        "categoryOfChange",
        "riskAssessment",
        "product",
        "facility",
        "equipment",
        "trainingRequirements",
        "trainingRequirementsText",
        "approvalByContractGiver",
        "approvalByContractGiverText",
        "commentsTab3",
      ],
      4: [
        "qcComments",
        "developmentComments",
        "bleachingComments",
        "SpunlaceComments",
        "cottonBudsComments",
        "padPunchingComments",
        "qaComments",
        "ppcComments",
        "engineeringComments",
        "wareHouseComments",
        "othersComments",
      ],
      5: ["actionItem", "additionalComments"],
      6: ["commentsTab6"],
      7: ["commentsTab7"],
      8: ["justificationForDateExtension"],
      9: ["implementationChanges"],
      10: ["suppportingDocuments"],
      11: ["implementationVerification"],
      12: ["closureOfChangeControl"],
    };
    if (actionType === "SUBMITTED") {
      if (tabNo === "2" && !formData.targetDate) {
        message.warning("Please fill Target Date field in Tab 2.");
        return;
      }
      if (tabNo === "8" && !formData.dateOfRequest) {
        message.warning("Please fill Date of Request field in Tab 8.");
        return;
      }

      const fieldsForTab = tabFields[tabNo];

      for (let field of fieldsForTab) {
        if (
          formData[field] === "" ||
          formData[field] === null ||
          formData[field] === undefined
        ) {
          formData[field] = "N/A";
        }
      }
    }
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE" || "QA_MANAGER") {
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
      let name, name1, name2, name3, name4, name5, name6, name7, name8;

      succesMsg =
        actionType === "SAVED"
          ? "Data Saved Successfully"
          : actionType === "SUBMITTED"
            ? "Submitted Successfully"
            : "Approved Successfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/ChangeControlForm/SaveSubmit`;
      payload = {
        formId: formData.formId,
        formatName: "QA CHANGE CONTROL FORM",
        formatNo: "PH-QAD01-F-041",
        revisionNo: "1",
        sopNumber: "PH-QAD01-D-37",
        unit: "Unit H",
        tabName: tabName,
        action: actionType,
        department: role,
        date: date,
        year: getMonthAndYear(date).year,
        month: getMonthAndYear(date).month,
        typeOfChangeControl: formData.typeOfChangeControl,
        changeControlTo: changeControl,
        existingProcedure: formData.existingProcedure,
        proposedChange: formData.proposedChange,
        reasonForChange: formData.reasonForChange,
        attachments: formData.attachments,
        changeControlNumber: controlGeneration.message,
        targetDate: formData.targetDate,
        categoryOfChange: formData.categoryOfChange,
        riskAssessment: formData.riskAssessment,
        product: formData.product,
        facility: formData.facility,
        equipment: formData.equipment,
        trainingRequirements: formData.trainingRequirements,
        trainingRequirementsText: formData.trainingRequirementsText,
        approvalByContractGiver: formData.approvalByContractGiver,
        approvalByContractGiverText: formData.approvalByContractGiverText,
        commentsTab3: formData.commentsTab3,
        qcComments: formData.qcComments,
        developmentComments: formData.developmentComments,
        bleachingComments: formData.bleachingComments,
        SpunlaceComments: formData.SpunlaceComments,
        cottonBudsComments: formData.cottonBudsComments,
        padPunchingComments: formData.padPunchingComments,
        qaComments: formData.qaComments,
        ppcComments: formData.ppcComments,
        engineeringComments: formData.engineeringComments,
        wareHouseComments: formData.wareHouseComments,
        othersComments: formData.othersComments,
        actionItem: formData.actionItem,
        details: formData.details,
        additionalComments: formData.additionalComments,
        commentsTab6: formData.commentsTab6,
        commentsTab7: formData.commentsTab7,
        dateOfRequest: formData.dateOfRequest,
        justificationForDateExtension: formData.justificationForDateExtension,
        implementationChanges: formData.implementationChanges,
        suppportingDocuments: formData.suppportingDocuments,
        implementationVerification: formData.implementationVerification,
        closureOfChangeControl: formData.closureOfChangeControl,
      };

      if (actionType === "SUBMITTED") {
        if (departmentId === "6" && tabNo === "4") {
          name = userName;
        }
        if (departmentId === "10" && tabNo === "4") {
          name1 = userName;
        }
        if (departmentId === "1" && tabNo === "4") {
          name2 = userName;
        }
        if (departmentId === "2" && tabNo === "4") {
          name3 = userName;
        }
        if (departmentId === "12" && tabNo === "4") {
          name4 = userName;
        }
        if (departmentId === "3" && tabNo === "4") {
          name5 = userName;
        }
        if (departmentId === "5" && tabNo === "4") {
          name6 = userName;
        }
        if (departmentId === "7" && tabNo === "4") {
          name7 = userName;
        }
        if (departmentId === "11" && tabNo === "4") {
          name8 = userName;
        }
        payload.qaSign = name || formData.qaSign;
        payload.developmentSign = name1 || formData.developmentSign;
        payload.bleachingSign = name2 || formData.bleachingSign;
        payload.SpunlaceSign = name3 || formData.SpunlaceSign;
        payload.cottonBudsSign = name4 || formData.cottonBudsSign;
        payload.padPunchingSign = name5 || formData.padPunchingSign;
        payload.qcSign = name6 || formData.qcSign;
        payload.ppcSign = name7 || formData.ppcSign;
        payload.engineeringSign = name8 || formData.engineeringSign;
      }
    } else if (role == "QC_MANAGER") {
      apiurl = `${API.prodUrl}/Precot/api/chemicaltest/ARF011/approval`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.test_id,
        formatNo: "PH-QCL01-AR-F-011",
        status: "Approve",
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod =
        role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
          ? axios.post
          : axios.put;
      const response = await axios.post(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QualityAssurance/QA_F_041_Summary");
  };

  const handleInput11 = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInput = (e, name) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showDrawer = () => {
    setOpen(true);
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

  const setTabNumber = (e) => {
    if (e == "13") {
      return;
    }
    setTabNo(e);
    setTabName(`Tab_${e}`);
  };

  const handleSave = () => handleApiRequest("SAVED");
  const handleSubmit = () => handleApiRequest("SUBMITTED");
  const handleApprove = () => handleApiRequest("APPROVED");

  return (
    <>
      <BleachingHeader
        formName={"CHANGE CONTROL FORM"}
        formatNo={"PH-QAD01-F-041"}
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
      <div style={{ margin: "5px", display: "flex" }}>
        <Row gutter={[8, 8]} align="middle">
          <Col xs={20} sm={10} md={7}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                type="date"
                addonBefore="Date:"
                value={date}
                max={today}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
            </Space>
          </Col>
          <Col xs={20} sm={10} md={6}>
            <Space
              direction="vertical"
              style={{ width: "100%", marginRight: "20rem" }}
            >
              <Input
                type="text"
                value={changeControl}
                addonBefore="Change Control No:"
                style={{ width: "200%", textAlign: "center" }}
                readOnly
              />
            </Space>
          </Col>
        </Row>
      </div>
      <Tabs
        defaultActiveKey="1"
        onChange={(e) => {
          setTabNumber(e);
        }}
      >
        {(role == "ROLE_HOD" ||
          role == "ROLE_DESIGNEE" ||
          role == "QA_MANAGER") && (
          <>
            <TabPane tab="1.INITIATION OF PROPOSAL FOR CHANGE" key="1">
              <Row align="middle">
                <Col xs={20} sm={10} md={8}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div style={{ display: "flex", marginLeft: "0.6rem" }}>
                      <label>Initiating Department: </label>
                      <Select
                        value={role}
                        options={departmentList && departmentList}
                        onChange={(e) => {
                          handleInput11(e, "department");
                        }}
                        dropdownStyle={{ textAlign: "center" }}
                        style={{
                          width: "220px",
                          textAlign: "center",
                          marginLeft: "0.6rem",
                        }}
                        disabled={
                          role == "QA_MANAGER" ||
                          formData.statusTab1 == "SUBMITTED"
                        }
                      ></Select>
                    </div>
                  </Space>
                </Col>
                <Col xs={20} sm={10} md={8}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div style={{ display: "flex", marginLeft: "0.6rem" }}>
                      <label>Type of change control: </label>
                      <Select
                        value={formData.typeOfChangeControl}
                        options={changeControlLov}
                        onChange={(e) => {
                          handleInput11(e, "typeOfChangeControl");
                        }}
                        dropdownStyle={{ textAlign: "center" }}
                        style={{
                          width: "220px",
                          textAlign: "center",
                          marginLeft: "0.6rem",
                        }}
                        disabled={
                          role == "QA_MANAGER" ||
                          formData.statusTab1 == "SUBMITTED"
                        }
                      ></Select>
                    </div>
                  </Space>
                </Col>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginLeft: "12rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab1 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginLeft: "1rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab1 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </Row>
              <table style={{ width: "90%", marginTop: "1rem" }}>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>SOP</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !== "SOP" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                      //
                    >
                      <Radio value="SOP">&#x2713;</Radio>
                      <Radio value={"NA"}>NA</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>VENDOR</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !== "VENDOR" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="VENDOR">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>NEW DOCUMENT</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !== "NEW DOCUMENT" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="NEW DOCUMENT">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>SPECIFICATION</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !== "SPECIFICATION" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="SPECIFICATION">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>FACILITY</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !== "FACILITY" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="FACILITY">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>DRAWINGS</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !== "DRAWINGS" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="DRAWINGS">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>METHOD/STP</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !== "METHOD/STP" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="METHOD/STP">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>PROTOCOL</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !== "PROTOCOL" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="PROTOCOL">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td rowSpan={2} style={{ textAlign: "center" }}>
                    BATCH MANUFACTURING RECORD
                  </td>
                  <td rowSpan={2} style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !==
                          "BATCH MANUFACTURING RECORD" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="BATCH MANUFACTURING RECORD">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>
                    OTHERS IF ANY (SPECIFY):
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !==
                          "OTHERS IF ANY (SPECIFY)" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="OTHERS IF ANY (SPECIFY)">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>EQUIPMENT/UTILITY</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Radio.Group
                      value={
                        formData.changeControlTo !== "EQUIPMENT/UTILITY" &&
                        formData.changeControlTo !== ""
                          ? "NA"
                          : formData.changeControlTo
                      }
                      onChange={(e) => handleInput(e, "changeControlTo")}
                      disabled
                    >
                      <Radio value="EQUIPMENT/UTILITY">&#x2713;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr style={{ height: "2.5rem" }}>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    Existing procedure/Standard procedure:
                  </td>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      style={{ textAlign: "center" }}
                      value={formData.existingProcedure}
                      onChange={(e) => {
                        handleInput(e, "existingProcedure");
                      }}
                      readOnly={
                        role == "QA_MANAGER" ||
                        formData.statusTab1 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "2.5rem" }}>
                  {" "}
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    Proposed Change:
                  </td>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      style={{ textAlign: "center" }}
                      value={formData.proposedChange}
                      onChange={(e) => {
                        handleInput(e, "proposedChange");
                      }}
                      readOnly={
                        role == "QA_MANAGER" ||
                        formData.statusTab1 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "2.5rem" }}>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    Reason/ Justification for change:
                  </td>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      style={{ textAlign: "center" }}
                      value={formData.reasonForChange}
                      onChange={(e) => {
                        handleInput(e, "reasonForChange");
                      }}
                      readOnly={
                        role == "QA_MANAGER" ||
                        formData.statusTab1 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "2.5rem" }}>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    Attachments (if any)
                  </td>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      style={{ textAlign: "center" }}
                      value={formData.attachments}
                      onChange={(e) => {
                        handleInput(e, "attachments");
                      }}
                      readOnly={
                        role == "QA_MANAGER" ||
                        formData.statusTab1 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
              </table>
            </TabPane>
          </>
        )}
        {(role == "ROLE_HOD" ||
          role == "ROLE_DESIGNEE" ||
          role == "QA_MANAGER") && (
          <>
            <TabPane tab="2.CHANGE CONTROL NUMBER ALLOTMENT BY QA" key="2">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    display:
                      (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab2 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab2 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "90%",
                  marginTop: "1rem",
                  tableLayout: "fixed",
                }}
              >
                <tr style={{ height: "2.5rem" }}>
                  <td style={{ textAlign: "center" }}>Change control Number</td>
                  <td style={{ textAlign: "center" }}>
                    {controlGeneration.message}
                  </td>
                </tr>
                <tr style={{ height: "8rem" }}>
                  <td style={{ textAlign: "center" }}>
                    Change control number assigned/allotted by QA (Sign & Date)
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {formData.qaManagerSubmitByTab2} <br />
                    {formatDateAndTime(formData.qaManagerSubmitOnTab2)} <br />
                    {eSign.qaManagerSubmitByTab2 ? (
                      <img
                        src={eSign.qaManagerSubmitByTab2}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}{" "}
                  </td>
                </tr>
                <tr style={{ height: "2.5rem" }}>
                  <td style={{ textAlign: "center" }}>
                    Target date for change control closer
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="date"
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab2 == "SUBMITTED"
                      }
                      value={formData.targetDate}
                      max={today}
                      onChange={(e) => {
                        handleInput(e, "targetDate");
                      }}
                    />
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="3.QA ASSESSMENT FOR THE PROPOSED CHANGE" key="3">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    display:
                      (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab3 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab3 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "90%",
                  marginTop: "1rem",
                  tableLayout: "fixed",
                  marginBottom: "1rem",
                }}
              >
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>
                    Categorization of change
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    {" "}
                    <Select
                      value={formData.categoryOfChange}
                      options={categorizationLov}
                      onChange={(e) => {
                        handleInput11(e, "categoryOfChange");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ width: "100%", textAlign: "center" }}
                      disabled={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    ></Select>
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  {" "}
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    Risk assessment (risk if the change is implemented)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <Input
                      type="text"
                      style={{ textAlign: "center" }}
                      value={formData.riskAssessment}
                      onChange={(e) => {
                        handleInput(e, "riskAssessment");
                      }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>Product</td>
                  <td>
                    {" "}
                    <Input
                      type="text"
                      style={{ textAlign: "center" }}
                      value={formData.product}
                      onChange={(e) => {
                        handleInput(e, "product");
                      }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>Facility</td>
                  <td>
                    {" "}
                    <Input
                      type="text"
                      style={{ textAlign: "center" }}
                      value={formData.facility}
                      onChange={(e) => {
                        handleInput(e, "facility");
                      }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>Equipment</td>
                  <td>
                    {" "}
                    <Input
                      type="text"
                      style={{ textAlign: "center" }}
                      value={formData.equipment}
                      onChange={(e) => {
                        handleInput(e, "equipment");
                      }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>Training requirements</td>
                  <td>
                    {" "}
                    <Select
                      value={formData.trainingRequirements}
                      options={yesNoLov}
                      onChange={(e) => {
                        handleInput11(e, "trainingRequirements");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ width: "100%", textAlign: "center" }}
                      disabled={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    ></Select>
                  </td>
                  <td>
                    {" "}
                    <Input
                      type="text"
                      style={{ textAlign: "center" }}
                      value={formData.trainingRequirementsText}
                      onChange={(e) => {
                        handleInput(e, "trainingRequirementsText");
                      }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>
                    Approval by contract giver
                  </td>
                  <td>
                    {" "}
                    <Select
                      value={formData.approvalByContractGiver}
                      options={yesNoLov}
                      onChange={(e) => {
                        handleInput11(e, "approvalByContractGiver");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ width: "100%", textAlign: "center" }}
                      disabled={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    ></Select>
                  </td>
                  <td>
                    {" "}
                    <Input
                      type="text"
                      style={{ textAlign: "center" }}
                      value={formData.approvalByContractGiverText}
                      onChange={(e) => {
                        handleInput(e, "approvalByContractGiverText");
                      }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "2rem" }}>
                  <td style={{ textAlign: "center" }}>Comments</td>
                  <td colSpan={2}>
                    {" "}
                    <Input
                      type="text"
                      style={{ textAlign: "center" }}
                      value={formData.commentsTab3}
                      onChange={(e) => {
                        handleInput(e, "commentsTab3");
                      }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab3 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "4rem" }}>
                  <td style={{ textAlign: "center" }}>
                    Assessment done by (QA) Sign & date:
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {" "}
                    {formData.qaManagerSubmitByTab3} <br />
                    {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br />
                    {eSign.qaManagerSubmitByTab3 ? (
                      <img
                        src={eSign.qaManagerSubmitByTab3}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}{" "}
                  </td>
                </tr>
              </table>
            </TabPane>
          </>
        )}
        {(role == "ROLE_HOD" ||
          role == "ROLE_DESIGNEE" ||
          role == "QA_MANAGER") && (
          <>
            <TabPane
              tab="4.CHANGE-CROSS FUNCTIONAL DEPARTMENT REVIEW & APPROVAL"
              key="4"
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab4 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab4 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </div>
              {departmentId == "1" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>Bleaching</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.bleachingComments}
                        onChange={(e) => {
                          handleInput(e, "bleachingComments");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.bleachingSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.bleachingSign ? (
                        <img
                          src={eSign.bleachingSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "2" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>Spunlace</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.SpunlaceComments}
                        onChange={(e) => {
                          handleInput(e, "SpunlaceComments");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.SpunlaceSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.SpunlaceSign ? (
                        <img
                          src={eSign.SpunlaceSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "3" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>Pad punching</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.padPunchingComments}
                        onChange={(e) => {
                          handleInput(e, "padPunchingComments");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />{" "}
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.padPunchingSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.padPunchingSign ? (
                        <img
                          src={eSign.padPunchingSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "4" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>Dry Goods</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.dr}
                        onChange={(e) => {
                          handleInput(e, "dr");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.qaSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.qaSign ? (
                        <img
                          src={eSign.qaSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "5" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>Quality Control</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.qcComments}
                        onChange={(e) => {
                          handleInput(e, "qcComments");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.qcSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.qcSign ? (
                        <img
                          src={eSign.qcSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "6" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>Quality Assurance</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.qaComments}
                        onChange={(e) => {
                          handleInput(e, "qaComments");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.qaSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.qaSign ? (
                        <img
                          src={eSign.qaSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "7" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>PPC</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.ppcComments}
                        onChange={(e) => {
                          handleInput(e, "ppcComments");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.ppcSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.ppcSign ? (
                        <img
                          src={eSign.ppcSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "8" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>Store</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.store}
                        onChange={(e) => {
                          handleInput(e, "store");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />{" "}
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.qaSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.qaSign ? (
                        <img
                          src={eSign.qaSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "9" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>Dispatch</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.dispa}
                        onChange={(e) => {
                          handleInput(e, "dispa");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.qaSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.qaSign ? (
                        <img
                          src={eSign.qaSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "10" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>Development</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.developmentComments}
                        onChange={(e) => {
                          handleInput(e, "developmentComments");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.developmentSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.developmentSign ? (
                        <img
                          src={eSign.developmentSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "11" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>ENGINEERING</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.engineeringComments}
                        onChange={(e) => {
                          handleInput(e, "engineeringComments");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.engineeringSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.engineeringSign ? (
                        <img
                          src={eSign.engineeringSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
              {departmentId == "12" && (
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    tableLayout: "fixed",
                  }}
                >
                  <tr style={{ height: "1.5rem" }}>
                    <td style={{ textAlign: "center" }}>Department</td>
                    <td style={{ textAlign: "center" }}>COTTON BUDS</td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Comments</td>
                    <td style={{ textAlign: "center" }}>
                      <TextArea
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.cottonBudsComments}
                        onChange={(e) => {
                          handleInput(e, "cottonBudsComments");
                        }}
                        readOnly={
                          role == "QA_MANAGER" ||
                          formData.statusTab4 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                  <tr style={{ height: "5rem" }}>
                    <td style={{ textAlign: "center" }}>Sign & Date</td>
                    <td style={{ textAlign: "center" }}>
                      {formData.cottonBudsSign} <br />
                      {/* {formatDateAndTime(formData.qaManagerSubmitOnTab3)} <br /> */}
                      {eSign.cottonBudsSign ? (
                        <img
                          src={eSign.cottonBudsSign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                </table>
              )}
            </TabPane>
          </>
        )}
        {(role == "ROLE_HOD" ||
          role == "ROLE_DESIGNEE" ||
          role == "QA_MANAGER") && (
          <>
            <TabPane
              tab="5.QUALITY ASSURANCE ASSESSMENT & CREATION OF ACTION ITEM"
              key="5"
            >
              <Row align="middle">
                {/* <Col xs={20} sm={10} md={8}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div style={{ display: "flex", marginLeft: "0.6rem" }}>
                      <Input
                        type="text"
                        addonBefore="Action Item"
                        value={formData.actionItem}
                        onChange={(e) => {
                          handleInput(e, "actionItem");
                        }}
                        style={{ width: "100%", textAlign: "center" }}
                        readOnly={
                          role == "ROLE_HOD" ||
                          formData.statusTab5 == "SUBMITTED"
                        }
                      />
                    </div>
                  </Space>
                </Col> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginLeft: "63rem",
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#E5EEF9",
                      color: "#00308F",
                      fontWeight: "bold",
                      alignItems: "center",
                      // marginLeft: "20rem",
                      display:
                        (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                        formData.statusTab5 !== "SUBMITTED"
                          ? "block"
                          : "none",
                    }}
                    shape="round"
                    onClick={handleSave}
                    loading={statusLoader}
                  >
                    Save
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#E5EEF9",
                      marginLeft: "0.3rem",
                      color: "#00308F",
                      fontWeight: "bold",
                      alignItems: "center",
                      display:
                        (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                        formData.statusTab5 !== "SUBMITTED"
                          ? "block"
                          : "none",
                    }}
                    shape="round"
                    onClick={handleSubmit}
                    loading={statusLoader}
                  >
                    Submit
                  </Button>
                </div>
              </Row>

              <div style={{ height: "50vh" }}>
                <table style={{ width: "80%", marginTop: "1rem" }}>
                  <tr>
                    <td style={{ padding: "0.5rem" }} colSpan={5}>
                      Action Item:
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      Action Item No.
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      Action item Description
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      Responsible Department
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      Responsible person
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
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
                        <Input
                          value={row.actionItemDescription}
                          // min={1}
                          onChange={(e) => {
                            handleFormParams(
                              e.target.value,
                              "actionItemDescription",
                              index,
                            );
                          }}
                          style={{ width: "150px", textAlign: "center" }}
                          readOnly={
                            role == "ROLE_HOD" ||
                            formData.statusTab5 == "SUBMITTED"
                          }
                        ></Input>
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          value={row.responsiblePerson}
                          // min={1}
                          onChange={(e) => {
                            handleFormParams(
                              e.target.value,
                              "responsiblePerson",
                              index,
                            );
                          }}
                          style={{ width: "150px", textAlign: "center" }}
                          readOnly={
                            role == "ROLE_HOD" ||
                            formData.statusTab5 == "SUBMITTED"
                          }
                        ></Input>
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          value={row.resposibleDepartment}
                          // min={1}
                          onChange={(e) => {
                            handleFormParams(
                              e.target.value,
                              "resposibleDepartment",
                              index,
                            );
                          }}
                          style={{ width: "150px", textAlign: "center" }}
                          readOnly={
                            role == "ROLE_HOD" ||
                            formData.statusTab5 == "SUBMITTED"
                          }
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
                            handleDeleteRow(index, row.lineId);
                          }}
                          disabled={
                            role == "ROLE_HOD" ||
                            formData.statusTab5 == "SUBMITTED"
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
                      role == "ROLE_HOD" || formData.statusTab5 == "SUBMITTED"
                    }
                    style={{ width: "100px", marginTop: "10px" }}
                  >
                    <PlusOutlined style={{ marginRight: "8px" }} />
                    Add Row
                  </Button>
                  <tr>
                    <td
                      colSpan={3}
                      style={{ textAlign: "center", padding: "5px" }}
                    >
                      Additional comments/Changes
                    </td>
                    <td
                      rowSpan={2}
                      colSpan={2}
                      style={{ textAlign: "center", padding: "5px" }}
                    >
                      Sign & Date <br />
                      {formData.qaManagerSubmitByTab5} <br />
                      {formatDateAndTime(formData.qaManagerSubmitOnTab5)} <br />
                      {eSign.qaManagerSubmitByTab5 ? (
                        <img
                          src={eSign.qaManagerSubmitByTab5}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      style={{ textAlign: "center", padding: "5px" }}
                    >
                      {" "}
                      <Input
                        type="text"
                        style={{ textAlign: "center" }}
                        value={formData.additionalComments}
                        onChange={(e) => {
                          handleInput(e, "additionalComments");
                        }}
                        readOnly={
                          role == "ROLE_HOD" ||
                          formData.statusTab5 == "SUBMITTED"
                        }
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </TabPane>
          </>
        )}
        {(role == "ROLE_HOD" ||
          role == "ROLE_DESIGNEE" ||
          role == "QA_MANAGER") && (
          <>
            <TabPane tab="6.APPROVAL BY CONTRACT GIVER" key="6">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    display:
                      (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab6 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab6 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "90%",
                  marginTop: "1rem",
                  tableLayout: "fixed",
                }}
              >
                <tr style={{ height: "5rem" }}>
                  <td style={{ textAlign: "center" }}>Comments: </td>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    <TextArea
                      style={{ textAlign: "center" }}
                      value={formData.commentsTab6}
                      onChange={(e) => {
                        handleInput(e, "commentsTab6");
                      }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab6 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "5rem" }}>
                  <td style={{ textAlign: "center" }}>Approved by (Name)</td>
                  <td style={{ textAlign: "center" }}>
                    {formData.qaManagerSubmitByTab6}
                  </td>
                  <td style={{ textAlign: "center" }}>Sign & Date</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {formData.qaManagerSubmitByTab6} <br />
                    {formatDateAndTime(formData.qaManagerSubmitOnTab6)} <br />
                    {eSign.qaManagerSubmitByTab6 ? (
                      <img
                        src={eSign.qaManagerSubmitByTab6}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="7.APPROVAL BY QA- Manager /DESIGNEE" key="7">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    display:
                      (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab7 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab7 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "90%",
                  marginTop: "1rem",
                  tableLayout: "fixed",
                }}
              >
                <tr style={{ height: "5rem" }}>
                  <td style={{ textAlign: "center" }}>Comments: </td>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    <TextArea
                      style={{ textAlign: "center" }}
                      value={formData.commentsTab7}
                      onChange={(e) => {
                        handleInput(e, "commentsTab7");
                      }}
                      readOnly={
                        role == "ROLE_HOD" || formData.statusTab7 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "5rem" }}>
                  <td style={{ textAlign: "center" }}>Approved by (Name)</td>
                  <td style={{ textAlign: "center" }}>
                    {formData.qaManagerSubmitByTab7}
                  </td>
                  <td style={{ textAlign: "center" }}>Sign & Date</td>
                  <td style={{ textAlign: "center" }}>
                    {formData.qaManagerSubmitByTab7} <br />
                    {formatDateAndTime(formData.qaManagerSubmitOnTab7)} <br />
                    {eSign.qaManagerSubmitByTab7 ? (
                      <img
                        src={eSign.qaManagerSubmitByTab7}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              </table>
            </TabPane>
          </>
        )}
        {(role == "QA_MANAGER" ||
          role == "ROLE_DESIGNEE" ||
          role == "ROLE_HOD" ||
          role == "ROLE_DESIGNEE") && (
          <>
            <TabPane
              tab="8.Change control closure date extension request "
              key="8"
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.hodStatusTab8 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.hodStatusTab8 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") &&
                      formData.qaManagerStatusTab8 !== "APPROVED" &&
                      formData.hodStatusTab8 == "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleApprove}
                  loading={statusLoader}
                >
                  Approved
                </Button>
              </div>
              <table
                style={{
                  width: "90%",
                  marginTop: "1rem",
                  tableLayout: "fixed",
                }}
              >
                <tr style={{ height: "2.5rem" }}>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Date of Request:{" "}
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <Input
                      type="date"
                      style={{ width: "100%", textAlign: "center" }}
                      value={formData.dateOfRequest}
                      onChange={(e) => {
                        handleInput(e, "dateOfRequest");
                      }}
                      max={today}
                      readOnly={
                        role == "QA_MANAGER" ||
                        formData.hodStatusTab8 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Justification for extension of date:
                  </td>
                  <td
                    colSpan={2}
                    style={{ textAlign: "center", height: "2.5rem" }}
                  >
                    <Input
                      style={{ width: "100%", textAlign: "center" }}
                      value={formData.justificationForDateExtension}
                      onChange={(e) => {
                        handleInput(e, "justificationForDateExtension");
                      }}
                      readOnly={
                        role == "QA_MANAGER" ||
                        formData.hodStatusTab8 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>

                {(role == "ROLE_HOD" || role == "ROLE_DESIGNEE") && (
                  <>
                    <tr style={{ height: "5rem" }}>
                      <td style={{ textAlign: "center" }}>Prepared by Name</td>
                      <td style={{ textAlign: "center" }}>
                        {formData.hodSubmitByTab8}
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        {formData.hodSubmitByTab8} <br />
                        {formatDateAndTime(formData.hodSubmitOnTab8)} <br />
                        {eSign.hodSubmitByTab8 ? (
                          <img
                            src={eSign.hodSubmitByTab8}
                            alt="Operator eSign"
                            style={{
                              width: "150px",
                              height: "70px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                      </td>
                    </tr>
                  </>
                )}
                {(role == "QA_MANAGER" || role == "ROLE_DESIGNEE") && (
                  <>
                    <tr style={{ height: "5rem" }}>
                      <td style={{ textAlign: "center" }}>Prepared by Name</td>
                      <td style={{ textAlign: "center" }}>
                        {formData.hodSubmitByTab8}
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        {formData.hodSubmitByTab8} <br />
                        {formatDateAndTime(formData.hodSubmitOnTab8)} <br />
                        {eSign.hodSubmitByTab8 ? (
                          <img
                            src={eSign.hodSubmitByTab8}
                            alt="Operator eSign"
                            style={{
                              width: "150px",
                              height: "70px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                      </td>
                    </tr>
                    <tr style={{ height: "5rem" }}>
                      <td style={{ textAlign: "center" }}>Approved by Name</td>
                      <td style={{ textAlign: "center" }}>
                        {formData.qaManagerSubmitByTab8}
                      </td>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        {formData.qaManagerSubmitByTab8} <br />
                        {formatDateAndTime(formData.qaManagerSubmitOnTab8)}{" "}
                        <br />
                        {eSign.qaManagerSubmitByTab8 ? (
                          <img
                            src={eSign.qaManagerSubmitByTab8}
                            alt="Operator eSign"
                            style={{
                              width: "150px",
                              height: "70px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                      </td>
                    </tr>
                  </>
                )}
              </table>
            </TabPane>
          </>
        )}
        {(role == "ROLE_HOD" ||
          role == "ROLE_DESIGNEE" ||
          role == "QA_MANAGER") && (
          <>
            <TabPane tab="9.Implementation changes" key="9">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab9 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab9 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "90%",
                  marginTop: "1rem",
                  tableLayout: "fixed",
                }}
              >
                <tr>
                  <td style={{ textAlign: "center" }}>
                    Implementation changes:
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      style={{ width: "100%", textAlign: "center" }}
                      value={formData.implementationChanges}
                      onChange={(e) => {
                        handleInput(e, "implementationChanges");
                      }}
                      readOnly={
                        role == "QA_MANAGER" ||
                        formData.statusTab9 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>

                <tr style={{ height: "8rem" }}>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Initiator / Implementer: <br />
                    {formData.hodSubmitByTab9} <br />
                    {formatDateAndTime(formData.hodSubmitOnTab9)} <br />
                    {eSign.hodSubmitByTab9 ? (
                      <img
                        src={eSign.hodSubmitByTab9}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="10.Supporting Documents" key="10">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab10 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") &&
                      formData.statusTab10 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "90%",
                  marginTop: "1rem",
                  tableLayout: "fixed",
                }}
              >
                <tr>
                  <td style={{ textAlign: "center" }}>Supporting Documents:</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      style={{ width: "100%", textAlign: "center" }}
                      value={formData.suppportingDocuments}
                      onChange={(e) => {
                        handleInput(e, "suppportingDocuments");
                      }}
                      readOnly={
                        role == "QA_MANAGER" ||
                        formData.statusTab10 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "10rem" }}>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Initiator / Implementer: <br />
                    {formData.hodSubmitByTab10} <br />
                    {formatDateAndTime(formData.hodSubmitOnTab10)} <br />
                    {eSign.hodSubmitByTab10 ? (
                      <img
                        src={eSign.hodSubmitByTab10}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              </table>
            </TabPane>
          </>
        )}
        {(role == "ROLE_HOD" ||
          role == "ROLE_DESIGNEE" ||
          role == "QA_MANAGER") && (
          <>
            <TabPane
              tab="11.Implementation verification & Closure of Change Control"
              key="11"
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "0.3rem",
                    display:
                      role === "ROLE_HOD" &&
                      formData.statusTab11 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSave}
                  loading={statusLoader}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      role === "ROLE_HOD" &&
                      formData.statusTab11 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "90%",
                  marginTop: "1rem",
                  tableLayout: "fixed",
                }}
              >
                <tr>
                  <td style={{ textAlign: "center" }}>
                    Implementation verification & Closure of Change Control
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      style={{ width: "100%", textAlign: "center" }}
                      value={formData.implementationVerification}
                      onChange={(e) => {
                        handleInput(e, "implementationVerification");
                      }}
                      readOnly={
                        role == "QA_MANAGER" ||
                        role == "ROLE_DESIGNEE" ||
                        formData.statusTab11 === "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "10rem" }}>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Reviewed & Approved by
                    <br />
                    {formData.hodSubmitByTab11} <br />
                    {formatDateAndTime(formData.hodSubmitOnTab11)} <br />
                    {eSign.hodSubmitByTab11 ? (
                      <img
                        src={eSign.hodSubmitByTab11}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="12.Closure of Change Control" key="12">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginRight: "3rem",
                    display:
                      role === "QA_MANAGER" &&
                      formData.statusTab11 === "SUBMITTED" &&
                      departmentId === "6" &&
                      formData.statusTab12 !== "SUBMITTED"
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={handleSubmit}
                  loading={statusLoader}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "90%",
                  marginTop: "1rem",
                  tableLayout: "fixed",
                }}
              >
                <tr>
                  <td style={{ textAlign: "center" }}>
                    Closure of Change Control
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      style={{ width: "100%", textAlign: "center" }}
                      value={formData.closureOfChangeControl}
                      onChange={(e) => {
                        handleInput(e, "closureOfChangeControl");
                      }}
                      readOnly={
                        role == "ROLE_HOD" ||
                        role == "ROLE_DESIGNEE" ||
                        formData.statusTab12 == "SUBMITTED"
                      }
                    />
                  </td>
                </tr>
                <tr style={{ height: "6rem" }}>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Approved by: <br />
                    {formData.qaManagerSubmitByTab12} <br />
                    {formatDateAndTime(formData.qaManagerSubmitOnTab12)} <br />
                    {eSign.qaManagerSubmitByTab12 ? (
                      <img
                        src={eSign.qaManagerSubmitByTab12}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              </table>
            </TabPane>
          </>
        )}
      </Tabs>
    </>
  );
};

export default QA_F_041;
