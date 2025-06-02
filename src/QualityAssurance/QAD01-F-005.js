import {
  Button,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Tabs,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import approveIcon from "../Assests/outlined-approve.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f005 = () => {
  const [datevalues, setdatevalues] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState(""); 
  const [deletedIds, setDeletedIds] = useState([]); 
  const [id, setid] = useState("");  
  const [Critical, setCritical] = useState("");
  const [showModal, setShowModal] = useState(false); 
  const [department, setdepartment] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [print, printdata] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState(""); 
  const [supersigndate, setsupersigndate] = useState(false);
  const [operator_signsignaturedate, setoperator_signsignaturedate] =
    useState("");
  const [hodsign, sethodsigndate] = useState("");
  const [availableshift, setAvailableShifts] = useState([]);
  const [availableshiftlov, setAvailableShiftslov] =
    useState("Select Department");
  const [selectedRow, setSelectedRow] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [dateprintsec, setisdateprintsec] = useState(false);
  const initial = useRef(false);
  const roleBase = localStorage.getItem("role");
  const onChange = (key) => {};
  const [saveBtnStatus, setSaveBtnStatus] = useState(true);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [rows, setRows] = useState([
    {
      employeeName: "",
      employeeCode: "",
      category: "",
      awarnessOfISO9001: "",
      awarnessOfISO14001: "",
      awarnessOfBRCGS: "",
      awarnessOfSA8000: "",
      awarnessOfGOTS: "",
      awarnessOfBSCI: "",
      awarnessOfETI: "",
      internalAuditorsTraining: "",
      goodHousekeepingSystem: "",
      chemicalHandlingSpillageSystem: "",
      wasteManagementSystem: "",
      environment: "",
      haccp: "",
      goodManufacturingPractices: "",
      rootCauseAnalysisAndCapa: "",
      firstAid: "",
      fireSafetyAndFireFighting: "",
      machineOperationAndSafety: "",
      usageOfPPE: "",
      companiesPolicies: "",
      qualityProductivityAndWasteControl: "",
      attitudeAndBehaviour: "",
    },
  ]);
  const { state } = location;
  const { datevalue, depno } = state || {};
  const { departments, years } = state || {}; 

  const handleDate = (value) => {
    setdatevalues(value);
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

 
  const handleAddRow = () => {
    const newRow = {
      item_description: "",
      identification_no: "",
      verification_frequency: "",
      location: "",
      remarks: "",
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = async (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (isConfirmed) {
      const id = rows[index].line_id;

      if (id) {
        setDeletedIds((prevDeletedIds) => [...prevDeletedIds, id]);
      }

      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      alert("Row deleted successfully.");
    }
  };

  const deleteRows = async () => {
    for (const id of deletedIds) {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/QA/Service/TrainingNeedIdentificationForm/delete=${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error(`Failed to delete row with ID: ${id}`);
        }
      } catch (error) {
        console.error(`Error deleting row with ID: ${id}`, error);
      }
    }

    setDeletedIds([]);
  };

  const handleInputChange = (field, value, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  const canDisplayButtons = () => {
    if (
      roleBase === "QA_MANAGER" ||
      (roleBase === "ROLE_DESIGNEE" && department === "QUALITY_ASSURANCE")
    ) {
      if (
        selectedRow?.qaManagerStatus == "QA_MR_SUBMITTED" &&
        (selectedRow?.hodStatus == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hodStatus == "HOD_SUBMITTED")
      ) {
        return "none";
      } else if (
        selectedRow?.qaManagerStatus == "QA_MANAGER_APPROVED" &&
        selectedRow?.hodStatus == "HOD_SUBMITTED"
      ) {
        return "none";
      }
    } else if (
      roleBase == "ROLE_HOD" ||
      (roleBase == "ROLE_DESIGNEE" && department !== "QUALITY_ASSURANCE")
    ) {
      if (
        selectedRow?.qaManagerStatus == "QA_MR_SUBMITTED" &&
        selectedRow?.hodStatus == "HOD_SUBMITTED"
      ) {
        return "none";
      } else if (
        selectedRow?.qaManagerStatus == "WAITING_FOR_APPROVAL" &&
        selectedRow?.hodStatus == "HOD_SUBMITTED"
      ) {
        return "none";
      } else if (selectedRow?.hodStatus == "HOD_REJECTED") {
        return "none";
      }
    }
  };
  const canDisplayButton2 = () => {
    if (
      roleBase === "QA_MANAGER" ||
      (roleBase === "ROLE_DESIGNEE" && department === "QUALITY_ASSURANCE")
    ) {
      if (
        selectedRow &&
        selectedRow?.qaManagerStatus === "QA_MR_SUBMITTED" &&
        selectedRow?.hodStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        selectedRow?.qaManagerStatus === "QA_MANAGER_APPROVED" &&
        selectedRow?.hodStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        selectedRow?.qaManagerStatus === "QA_MANAGER_APPROVED" &&
        selectedRow?.hodStatus === "HOD_SUBMITTED"
      ) {
        return "none";
      } else if (
        selectedRow?.qaManagerStatus === "QA_MR_SUBMITTED" &&
        selectedRow?.hodStatus === "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.qaManagerStatus === "QA_MR_SUBMITTED" &&
        selectedRow?.hodStatus === "HOD_SUBMITTED"
      ) {
        return "none";
      }
    }

    if (
      roleBase === "ROLE_HOD" ||
      (roleBase == "ROLE_DESIGNEE" && department !== "QUALITY_ASSURANCE")
    ) {
      if (selectedRow?.hodStatus === "HOD_SUBMITTED") {
        return "none";
      }
    }
  };
  const canEdit = () => {
    if (
      roleBase === "ROLE_HOD" ||
      (roleBase === "ROLE_DESIGNEE" && department !== "QUALITY_ASSURANCE")
    ) {
      console.log(
        "values of canedit",
        selectedRow?.hodStatus,
        selectedRow?.qaManagerStatus
      );
      if (
        selectedRow?.hodStatus === "HOD_SUBMITTED" &&
        selectedRow?.qaManagerStatus === "WAITING_FOR_APPROVAL"
      ) {
        return true;
      } else if (selectedRow?.hodStatus === "HOD_SAVED") {
        return false;
      }
    } else if (
      roleBase === "QA_MANAGER" ||
      (roleBase === "ROLE_DESIGNEE" && department === "QUALITY_ASSURANCE")
    ) {
      if (
        selectedRow?.qaManagerStatus === "QA_MR_SUBMITTED" &&
        selectedRow?.hodStatus === "HOD_SUBMITTED"
      ) {
        return "true";
      } else if (
        selectedRow?.hodStatus === "HOD_SUBMITTED" &&
        selectedRow?.qaManagerStatus === "WAITING_FOR_APPROVAL"
      ) {
        return true;
      } else if (
        (selectedRow?.qaManagerStatus === "QA_MR_SUBMITTED" ||
          selectedRow?.qaManagerStatus === "QA_MANAGER_APPROVED") &&
        (selectedRow?.hodStatus === "WAITING_FOR_APPROVAL" ||
          selectedRow?.hodStatus === "HOD_APPROVAL")
      ) {
        return "true";
      } else if (
        selectedRow?.qaManagerStatus === "QA_MANAGER_APPROVED" &&
        selectedRow?.hodStatus === "HOD_SUBMITTED"
      ) {
        return "true";
      }
    }
  };
  const isEditable = canEdit();

  const fetchdata_departmentid = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ccfno = response.data.map((shift) => shift.department);
      setAvailableShifts(ccfno);
      let dep_id = localStorage.getItem("departmentId");

      const foundDepartment = response.data.find((dept) => {
        const numericDepId = Number(dep_id);

        if (dept.id === numericDepId) {
          return true;
        } else {
          return false;
        }
      });

      if (foundDepartment) {
        setdepartment(foundDepartment.department);
        fetchData_date(foundDepartment.department);
      } else {
        setdepartment("Department not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData_date = async (value) => {
    try {
      setLoading(true);
      let depname;
      if (
        roleBase === "ROLE_HOD" ||
        (roleBase === "ROLE_DESIGNEE" && value !== "QUALITY_ASSURANCE")
      ) {
        depname = value;
      } else if (
        roleBase === "QA_MANAGER" ||
        (roleBase === "ROLE_DESIGNEE" && value === "QUALITY_ASSURANCE")
      ) {
        depname = departments;
      }

      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/TrainingNeedIdentificationForm/getByParam?year=${years}&department=${depname}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (
            roleBase === "QA_MANAGER" ||
            (roleBase === "ROLE_DESIGNEE" && value === "QUALITY_ASSURANCE")
          ) {
            if (res.data?.message === "No data") {
              navigate("/Precot/QualityAssurance/QA_F005_Summary");
              message.error("No Data found to approve");
            }
            if (!res.data || res.data.length === 0) {
              message.error("Record is Empty");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/QA_F005_Summary");
              }, 1500);
            }
          }

          if (res.data?.length === 0 || res.data == undefined) {
          } else {
            if (res.data?.hodSubmitOn) {
              const dateformat_hod = moment(res.data?.hodSubmitOn).format(
                "DD/MM/YYYY HH:mm"
              );
              sethodsigndate(dateformat_hod);
            } else {
              sethodsigndate("");
            }
            if (res.data?.qaManagerSubmitOn) {
              const dateformat_supervisor = moment(
                res.data?.qaManagerSubmitOn
              ).format("DD/MM/YYYY HH:mm");
              setsupersigndate(dateformat_supervisor);
            } else {
              setsupersigndate("");
            }
          }

          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            setAvailableShiftslov(res.data?.department);

            setid(res.data?.formId);
            setdatevalues(res.data?.date);
            setSelectedRow(res.data);

            if (
              roleBase === "QA_MANAGER" ||
              (roleBase == "ROLE_DESIGNEE" && value === "QUALITY_ASSURANCE")
            ) {
              if (res.data?.qaManagerStatus === "QA_MANAGER_REJECTED") {
                message.warning(
                  "HOD Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/QualityAssurance/QA_F005_Summary");
                }, 1500);
              }
            }

            setemptyarraycheck(res.data.body?.length);

            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.qaManagerSubmitBy}`,
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
                setGetImageSUP(url);
              })
              .catch((err) => {});

            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.hodSign}`,
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
                setGetImageHOD(url);
              })
              .catch((err) => {});
          } else {
          }

          if (res.data?.details) {
            setRows(
              res.data?.details.map((item) => ({
                line_id: item.line_id,
                employeeName: item.employeeName,
                employeeCode: item.employeeCode,
                category: item.category,
                awarnessOfISO9001: item.awarnessOfISO9001,
                awarnessOfISO14001: item.awarnessOfISO14001,
                awarnessOfBRCGS: item.awarnessOfBRCGS,
                awarnessOfSA8000: item.awarnessOfSA8000,
                awarnessOfGOTS: item.awarnessOfGOTS,
                awarnessOfBSCI: item.awarnessOfBSCI,
                awarnessOfETI: item.awarnessOfETI,
                internalAuditorsTraining: item.internalAuditorsTraining,
                goodHousekeepingSystem: item.goodHousekeepingSystem,
                chemicalHandlingSpillageSystem:
                  item.chemicalHandlingSpillageSystem,
                wasteManagementSystem: item.wasteManagementSystem,
                environment: item.environment,
                haccp: item.haccp,
                goodManufacturingPractices: item.goodManufacturingPractices,
                rootCauseAnalysisAndCapa: item.rootCauseAnalysisAndCapa,
                firstAid: item.firstAid,
                fireSafetyAndFireFighting: item.fireSafetyAndFireFighting,
                machineOperationAndSafety: item.machineOperationAndSafety,
                usageOfPPE: item.usageOfPPE,
                companiesPolicies: item.companiesPolicies,
                qualityProductivityAndWasteControl:
                  item.qualityProductivityAndWasteControl,
                attitudeAndBehaviour: item.attitudeAndBehaviour,
              }))
            );
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const setAllYes = () => {
    const updatedRows = rows.map((row) => ({
      ...row,
      awarnessOfISO9001: "YES",
      awarnessOfISO14001: "YES",
      awarnessOfBRCGS: "YES",
      awarnessOfSA8000: "YES",
      awarnessOfGOTS: "YES",
      awarnessOfBSCI: "YES",
      awarnessOfETI: "YES",
      internalAuditorsTraining: "YES",
      goodHousekeepingSystem: "YES",
      chemicalHandlingSpillageSystem: "YES",
      wasteManagementSystem: "YES",
      environment: "YES",
      haccp: "YES",
      goodManufacturingPractices: "YES",
      rootCauseAnalysisAndCapa: "YES",
      firstAid: "YES",
      fireSafetyAndFireFighting: "YES",
      machineOperationAndSafety: "YES",
      usageOfPPE: "YES",
      companiesPolicies: "YES",
      qualityProductivityAndWasteControl: "YES",
      attitudeAndBehaviour: "YES",
    }));
    setRows(updatedRows);
  };
  const setAllNo = () => {
    const updatedRows = rows.map((row) => ({
      ...row,
      awarnessOfISO9001: "NO",
      awarnessOfISO14001: "NO",
      awarnessOfBRCGS: "NO",
      awarnessOfSA8000: "NO",
      awarnessOfGOTS: "NO",
      awarnessOfBSCI: "NO",
      awarnessOfETI: "NO",
      internalAuditorsTraining: "NO",
      goodHousekeepingSystem: "NO",
      chemicalHandlingSpillageSystem: "NO",
      wasteManagementSystem: "NO",
      environment: "NO",
      haccp: "NO",
      goodManufacturingPractices: "NO",
      rootCauseAnalysisAndCapa: "NO",
      firstAid: "NO",
      fireSafetyAndFireFighting: "NO",
      machineOperationAndSafety: "NO",
      usageOfPPE: "NO",
      companiesPolicies: "NO",
      qualityProductivityAndWasteControl: "NO",
      attitudeAndBehaviour: "NO",
    }));
    setRows(updatedRows);
  };
 
  

  const handleSubmit = async () => {
    try {
      const invalidRowIndex = rows.findIndex(
        (row) => !row.employeeName || !row.employeeCode || !row.category
      );

      if (invalidRowIndex !== -1) {
        message.error(`Record is required for  S.No.${invalidRowIndex + 1}`);
        setSaveLoading(false);
      } else {
        listofsharptools_submit();
        await deleteRows();
        setSaveBtnStatus(true);
        setSubmitBtnStatus(true);
      }
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  } ;

  const handleBack = () => {
    navigate("/Precot/QualityAssurance/QA_F005_Summary");
  };

  const sharptools_save = () => {
    const isValid = () => {};
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }

    setSaveLoading(true);

    const payload = {
      productId: id,
      unit: "Unit H",
      formatNo: "PH-QAD01-F-005",
      formatName: "TRAINING NEED IDENTIFICATION FORM",
      revisionNo: "01",
      sopNumber: "PH-QAD01-D-15",
      formId: id,
      date: datevalues,
      year: years,
      department: department,

      details: rows.map((row) => ({
        line_id: row.line_id,
        employeeName: row.employeeName,
        employeeCode: row.employeeCode,
        category: row.category,
        awarnessOfISO9001: row.awarnessOfISO9001 || "NO",
        awarnessOfISO14001: row.awarnessOfISO14001 || "NO",
        awarnessOfBRCGS: row.awarnessOfBRCGS || "NO",
        awarnessOfSA8000: row.awarnessOfSA8000 || "NO",
        awarnessOfGOTS: row.awarnessOfGOTS || "NO",
        awarnessOfBSCI: row.awarnessOfBSCI || "NO",
        awarnessOfETI: row.awarnessOfETI || "NO",
        internalAuditorsTraining: row.internalAuditorsTraining || "NO",
        goodHousekeepingSystem: row.goodHousekeepingSystem || "NO",
        chemicalHandlingSpillageSystem:
          row.chemicalHandlingSpillageSystem || "NO",
        wasteManagementSystem: row.wasteManagementSystem || "NO",
        environment: row.environment || "NO",
        haccp: row.haccp || "NO",
        goodManufacturingPractices: row.goodManufacturingPractices || "NO",
        rootCauseAnalysisAndCapa: row.rootCauseAnalysisAndCapa || "NO",
        firstAid: row.firstAid || "NO",
        fireSafetyAndFireFighting: row.fireSafetyAndFireFighting || "NO",
        machineOperationAndSafety: row.machineOperationAndSafety || "NO",
        usageOfPPE: row.usageOfPPE || "NO",
        companiesPolicies: row.companiesPolicies || "NO",
        qualityProductivityAndWasteControl:
          row.qualityProductivityAndWasteControl || "NO",
        attitudeAndBehaviour: row.attitudeAndBehaviour || "NO",
      })),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingNeedIdentificationForm/Save`,
        payload,
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success("Form Saved successfully");

        navigate("/Precot/QualityAssurance/QA_F005_Summary");
      })
      .catch((err) => {
        setSaveLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSave = async () => {
    try {
      sharptools_save();
      await deleteRows();
      setSaveBtnStatus(true);
      setSubmitBtnStatus(true);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };

  const listofsharptools_submit = () => {
    const isValid = () => {
      if (!datevalues) return "Date  is required";
      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSaveLoading(true);

    setSaveLoading(true);
    const date_month = moment(datevalue, "YYYY-MM-DD");
    const year = date_month.year();
    const month = date_month.format("MMMM");

    const payload = {
      productId: id,
      unit: "Unit H",
      formatNo: "PH-QAD01-F-005",
      formatName: "TRAINING NEED IDENTIFICATION FORM",
      revisionNo: "01",
      sopNumber: "PH-QAD01-D-15",
      formId: id,
      date: datevalues,
      year: years,
      department: department,

      details: rows.map((row) => ({
        line_id: row.line_id,
        employeeName: row.employeeName || "NA",
        employeeCode: row.employeeCode || "NA",
        category: row.category || "NA",
        awarnessOfISO9001: row.awarnessOfISO9001 || "NO",
        awarnessOfISO14001: row.awarnessOfISO14001 || "NO",
        awarnessOfBRCGS: row.awarnessOfBRCGS || "NO",
        awarnessOfSA8000: row.awarnessOfSA8000 || "NO",
        awarnessOfGOTS: row.awarnessOfGOTS || "NO",
        awarnessOfBSCI: row.awarnessOfBSCI || "NO",
        awarnessOfETI: row.awarnessOfETI || "NO",
        internalAuditorsTraining: row.internalAuditorsTraining || "NO",
        goodHousekeepingSystem: row.goodHousekeepingSystem || "NO",
        chemicalHandlingSpillageSystem:
          row.chemicalHandlingSpillageSystem || "NO",
        wasteManagementSystem: row.wasteManagementSystem || "NO",
        environment: row.environment || "NO",
        haccp: row.haccp || "NO",
        goodManufacturingPractices: row.goodManufacturingPractices || "NO",
        rootCauseAnalysisAndCapa: row.rootCauseAnalysisAndCapa || "NO",
        firstAid: row.firstAid || "NO",
        fireSafetyAndFireFighting: row.fireSafetyAndFireFighting || "NO",
        machineOperationAndSafety: row.machineOperationAndSafety || "NO",
        usageOfPPE: row.usageOfPPE || "NO",
        companiesPolicies: row.companiesPolicies || "NO",
        qualityProductivityAndWasteControl:
          row.qualityProductivityAndWasteControl || "NO",
        attitudeAndBehaviour: row.attitudeAndBehaviour || "NO",
      })),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingNeedIdentificationForm/Submit`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Form Submitted successfully");

        navigate("/Precot/QualityAssurance/QA_F005_Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleKeyPress = (e) => {
    if (
      !/[0-9a-zA-Z._/\- ]/.test(e.key) && // Added space (' ') to the regex pattern
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'Tab' &&
      e.key !== 'Enter'
    ) {
      e.preventDefault();
    }
  };

  

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingNeedIdentificationForm/approveOrReject`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        message.success(res.data.message);
        navigate("/Precot/QualityAssurance/QA_F005_Summary");
      })
      .catch((err) => {
        setLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleRejectModal = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingNeedIdentificationForm/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: Critical,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        message.success(res.data.message);
        navigate("/Precot/QualityAssurance/QA_F005_Summary");
      })
      .catch((err) => {
        setLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
 
 

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;

      fetchdata_departmentid();
    }
  }, [token]);

  const items = [
    {
      key: "1",
      label: <p>TRAINING NEED IDENTIFICATION FORM</p>,
      children: (
        <div style={{ width: "100%" }}>
          <div style={{ marginBottom: "10px", marginLeft: "80%" }}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
                marginRight: "8px",
              }}
              disabled={isEditable}
              onClick={setAllYes}
              icon={
                <AiOutlineCheck
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Bulk Yes
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
                marginRight: "8px",
              }}
              disabled={isEditable}
              onClick={setAllNo}
              icon={
                <AiOutlineClose
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Bulk No
            </Button>
          </div>
          <style>
            {`
          .ant-radio-wrapper span.ant-radio + * {
            padding-inline-start: 0px;
            padding-inline-end: 0px;
            font-size: 8px;
          }
        `}
          </style>

          <table>
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  S.No
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Employee Name
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Employee Code
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Category
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Awareness of ISO 9001
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Awareness of ISO 14001
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Awareness of BRCGS
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Awareness of SA8000
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Awareness of GOTS
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Awareness of BSCI
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Awareness of ETI
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Internal Auditors Training
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Good House Keeping (5S) <br />
                  System
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Chemical Handling / Spillage
                  <br /> System
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Waste Management System
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Environment (Water <br /> Conservation, Pollution etc)
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  HACCP
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Good Manufacturing <br />
                  Practices (cGMP)
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Root Cause Analysis & CAPA
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  First Aid
                </th>
                <th
                  colSpan="1"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Fire Safety / Fire Fighting
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Machine Operation & Safety
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Usage of PPEs
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Companies Policies (Hygiene, Jewellery, Glass/Wood,
                  <br />
                  Sharp Tools, Quality, Anti-bribery, <br />
                  Environmental Policy etc)
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Quality, Productivity <br /> & Waste Control
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Attitude & Behaviour
                </th>

                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "0px",
                    textAlign: "left",
                  }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td style={{ height: "35px", textAlign: "center" }}>
                    {index + 1}
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="employeeName"
                      value={row.employeeName}
                      onChange={(e) =>
                        handleInputChange("employeeName", e.target.value, index)
                      }
                      disabled={isEditable}
                      style={{ width: "90px" }}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="employeeCode"
                      value={row.employeeCode}
                      onChange={(e) =>
                        handleInputChange("employeeCode", e.target.value, index)
                      }
                      style={{ width: "90px" }}
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="category"
                      value={row.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value, index)
                      }
                      style={{ width: "90px" }}
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.awarnessOfISO9001}
                      onChange={(e) =>
                        handleInputChange(
                          "awarnessOfISO9001",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.awarnessOfISO14001}
                      onChange={(e) =>
                        handleInputChange(
                          "awarnessOfISO14001",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.awarnessOfBRCGS}
                      onChange={(e) =>
                        handleInputChange(
                          "awarnessOfBRCGS",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.awarnessOfSA8000}
                      onChange={(e) =>
                        handleInputChange(
                          "awarnessOfSA8000",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.awarnessOfGOTS}
                      onChange={(e) =>
                        handleInputChange(
                          "awarnessOfGOTS",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.awarnessOfBSCI}
                      onChange={(e) =>
                        handleInputChange(
                          "awarnessOfBSCI",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.awarnessOfETI}
                      onChange={(e) =>
                        handleInputChange(
                          "awarnessOfETI",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.internalAuditorsTraining}
                      onChange={(e) =>
                        handleInputChange(
                          "internalAuditorsTraining",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.goodHousekeepingSystem}
                      onChange={(e) =>
                        handleInputChange(
                          "goodHousekeepingSystem",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.chemicalHandlingSpillageSystem}
                      onChange={(e) =>
                        handleInputChange(
                          "chemicalHandlingSpillageSystem",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.wasteManagementSystem}
                      onChange={(e) =>
                        handleInputChange(
                          "wasteManagementSystem",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.environment}
                      onChange={(e) =>
                        handleInputChange("environment", e.target.value, index)
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.haccp}
                      onChange={(e) =>
                        handleInputChange("haccp", e.target.value, index)
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.goodManufacturingPractices}
                      onChange={(e) =>
                        handleInputChange(
                          "goodManufacturingPractices",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.rootCauseAnalysisAndCapa}
                      onChange={(e) =>
                        handleInputChange(
                          "rootCauseAnalysisAndCapa",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.firstAid}
                      onChange={(e) =>
                        handleInputChange("firstAid", e.target.value, index)
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.fireSafetyAndFireFighting}
                      onChange={(e) =>
                        handleInputChange(
                          "fireSafetyAndFireFighting",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.machineOperationAndSafety}
                      onChange={(e) =>
                        handleInputChange(
                          "machineOperationAndSafety",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.usageOfPPE}
                      onChange={(e) =>
                        handleInputChange("usageOfPPE", e.target.value, index)
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.companiesPolicies}
                      onChange={(e) =>
                        handleInputChange(
                          "companiesPolicies",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.qualityProductivityAndWasteControl}
                      onChange={(e) =>
                        handleInputChange(
                          "qualityProductivityAndWasteControl",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Radio.Group
                      value={row.attitudeAndBehaviour}
                      onChange={(e) =>
                        handleInputChange(
                          "attitudeAndBehaviour",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                    >
                      <Radio value="YES">Yes</Radio>
                      <Radio value="NO">No</Radio>
                    </Radio.Group>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteRow(index)}
                      style={{ cursor: isEditable ? "not-allowed" : "pointer" }}
                      disabled={isEditable}
                    >
                      {" "}
                      <FaTrash color="red" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="100">
                  Note : Training Need shall be identified by respective HOD (In
                  case of training need please tick "√" mark)
                </td>
              </tr>
            </tbody>
            <div
              style={{
                textalign: "center",
                paddingLeft: "15px",
                width: "100%",
                paddingTop: "10px",
                cursor: isEditable ? "not-allowed" : "pointer",
              }}
            >
              <button
                onClick={handleAddRow}
                style={{
                  backgroundColor: "green",
                  border: "none",
                  color: "white",
                  padding: "6px",
                  borderRadius: "3px",
                  cursor: isEditable ? "not-allowed" : "pointer",
                }}
                disabled={isEditable}
              >
                Add Row
              </button>
            </div>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td colspan={50}>Prepared bY</td>
                <td colspan={50}>Verified by</td>
              </tr>
              <tr>
                <td colspan={50}>
                  {selectedRow?.hodStatus === "HOD_SUBMITTED" && (
                    <>
                      <div>{selectedRow?.hodSign}</div>
                      <div>{hodsign}</div>

                      {getImageHOD && (
                        <>
                          <br />
                          <img
                            src={getImageHOD}
                            alt="logo"
                            className="signature"
                          />
                        </>
                      )}
                    </>
                  )}
                </td>
                <td colspan={50}>
                  {(selectedRow?.qaManagerStatus === "QA_MANAGER_APPROVED" ||
                    selectedRow?.qaManagerStatus === "QA_MANAGER_REJECTED") && (
                    <>
                      <div>{selectedRow?.qaManagerSign}</div>
                      <div>{supersigndate}</div>

                      {getImageSUP && (
                        <>
                          <br />
                          <img
                            src={getImageSUP}
                            alt="logo"
                            className="signature"
                          />
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];
  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="TRAINING NEED IDENTIFICATION FORM"
        formatNo="PH-QAD01-F-005"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            key="back"
            type="primary"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Back
          </Button>,
          roleBase === "QA_MANAGER" ||
          (roleBase === "ROLE_DESIGNEE" && department === "QUALITY_ASSURANCE")
            ? [
                <Button
                  key="approve"
                  loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  onClick={handleApprove}
                  shape="round"
                  icon={<img src={approveIcon} alt="Approve Icon" />}
                >
                  &nbsp;Approve
                </Button>,

                <Button
                  key="reject"
                  loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<img src={approveIcon} alt="Approve Icon" />}
                  onClick={handleRejectModal}
                  shape="round"
                >
                  &nbsp;Reject
                </Button>,
              ]
            : roleBase === "ROLE_HOD" ||
              (roleBase === "ROLE_DESIGNEE" &&
                department !== "QUALITY_ASSURANCE")
            ? [
                <Button
                  key="save"
                  loading={saveLoading}
                  type="primary"
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButton2(),
                  }}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                >
                  Save
                </Button>,
                <Button
                  key="submit"
                  loading={saveLoading}
                  type="primary"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<GrDocumentStore color="#00308F" />}
                  shape="round"
                >
                  Submit
                </Button>,
              ]
            : null,
          <Button
            key="logout"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiLock color="#00308F" />}
            onClick={() => {
              if (window.confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                navigate("/Precot");
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user-info"
            trigger="click"
            style={{ backgroundColor: "#fff" }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#E5EEF9" }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,

          <Modal
            key="reject-modal"
            title="Reject"
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
            footer={[
              <Button
                key="submit-reject"
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                }}
                shape="round"
                onClick={handleReject}
              >
                Submit
              </Button>,
            ]}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <label style={{ marginRight: "8px" }}>Remarks:</label>
              <TextArea
                value={Critical}
                onChange={(e) => setCritical(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </Modal>,
        ]}
      />
      <div id="section-to-print" style={{ padding: "5px" }}>
        <br />

        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid #0000",
            padding: "5px",
          }}
        >
          <thead
            style={{ marginTop: "10px", width: "100%", marginBottom: "10px" }}
          >
            <tr>
              <td colSpan="2" rowSpan="4">
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "40px", height: "20px" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>UNIT H</div>
              </td>
              <td colSpan="4" rowSpan="4" style={{ textAlign: "center" }}>
                {" "}
                BLEACHING JOB CARD <br></br> PRD01/F-13
              </td>
              <td colSpan="3">Format No:</td>
              <td colSpan="3">PRD01/F-13</td>
            </tr>
            <tr>
              <td colSpan="3">Revision No:</td>
              <td colSpan="3">04</td>
            </tr>
            <tr>
              <td colSpan="3">Ref. SOP No:</td>
              <td colSpan="3">PRD01-D-12</td>
            </tr>
            <tr>
              <td colSpan="3">Page No:</td>
              <td colSpan="3">Page No 1 of 1</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2">BMR No</td>
              <td colSpan="4">{print && print.bmr_no}</td>
              <td colSpan="3">M/c No</td>
              <td colSpan="3">{print && print.mc_no}</td>
            </tr>
            <tr>
              <td colSpan="2">Date</td>
              <td colSpan="4">{dateprintsec}</td>
              <td colSpan="3">Batch No</td>
              <td colSpan="3">{print && print.sub_batch_no}</td>
            </tr>
            <tr>
              <td colSpan="2">date</td>
              <td colSpan="4">{print && print.date}</td>
              <td colSpan="3">Start Time</td>
              <td colSpan="3">{print && print.start_time}</td>
            </tr>
            <tr>
              <td colSpan="2">Finish</td>
              <td colSpan="4">{print && print.finish}</td>
              <td colSpan="3">End Time</td>
              <td colSpan="3">{print && print.end_time}</td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                S.No
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Process Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Chemicals Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Activity
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Standard Time in Minutes
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual Time in Minutes
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Observations
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                1
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Pre - Wetting
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 70
                ℃, Circulation @ 70 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.wetting}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.wetting_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                2
              </td>
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                }}
              >
                Sourcing & Bleaching
              </td>
              <td
                colSpan="2"
                rowspan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Caustic Soda Flakes, Haipolene & Sarofom & Hydrogen peroxide
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 60
                ℃, Chemical transferring, Temperature raising to 110 ℃,
                Circulation @ 110 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                100 +/- 20
              </td>
              <td
                colSpan="2"
                rowSpan="8"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.scouring}
              </td>
              <td
                colSpan="3"
                rowspan="8"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.scouring_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                3
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 01
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 95
                ℃, Circulation @ 95 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.hotwash_one}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :{" "}
                {print && print.hotwash_one_act_temp}
                <span style={{ fontSize: "11px" }}>℃ </span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                4
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 02
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 90
                ℃, Circulation @ 90 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                {" "}
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.hotwash_two}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.hotwash_two_act_temp}
                <span style={{ fontSize: "11px" }}> ℃</span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            {/* Nutralizing Wash */}

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                5
              </td>
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Nutralizing Wash
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Citric Acid, Sarofom, Setilon KN or bo_wiper_roller_speed 9490
                (for Crispy finish Only)
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Chemical transferring,
                Temperature raising to 70 ℃, Circulation @ 70 +/- 5 ℃ and
                Draining
              </td>
              <td
                colSpan="1"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                30 +/- 6
              </td>
              <td
                colSpan="2"
                rowSpan="5"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.newtralizing}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.newtralizing_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            {/* PH */}
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                6
              </td>
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Final Cloud{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Circulation @ Normal
                temperature, Surface Activity, pH conformation and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                20 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="5"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.newtralizing}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              > 
                pH actual:
                <span style={{ textAlign: "center" }}>
                  {" "}
                  {print && print.final_process_ph_temp}{" "}
                </span>
                <div>
                  Surface Activity actual:
                  <span>{print && print.final_process_act_temp}</span>
                </div> 
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                fontSize: "14px",
                padding: "4px",
                textAlign: "center",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              <td colSpan="11" style={{ textAlign: "center" }}>
                Chemical Consumption details (Batch Weight range 1250 ± 50 Kg)
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> Chemical Name</b>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Standards</b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Actual</b>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> Unit</b>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Caustic soda Flakes</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>28-42</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.caustic_soda_flakes}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Haipolene</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>10-12</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.haipolene}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Sarofom </p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>7.0-16.0</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.sarofom}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Hydrogen peroxide </p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>50-70</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.hydrogen_peroxide}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>liters</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <div>
                  {" "}
                  <p style={{ fontSize: "11px" }}>
                    <div>
                      Setilon KN : {print && print.customer_complaint_ref}
                    </div>
                    <div>
                      bo_wiper_roller_speed 9490 :{" "}
                      {print && print.bo_wiper_roller_speed}
                    </div>
                  </p>
                </div>
               </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>1.5-3.5</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.setilon_bo_wiper_roller_speed_actual}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Citric acid</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>6.5-9.5 </p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.citric_acid}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr>
              <td colSpan="11">
                <b style={{ fontSize: "11px" }}>
                  Note: Setilon KN or bo_wiper_roller_speed 9490 chemicals
                  should be added only for Crispy finish.
                </b>
              </td>
            </tr>
            <tr>
              <td colSpan="11">
                {" "}
                Remarks:
                {print && print.remarks}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Production Supervisor
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                HOD / Designees
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                QA
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div align="center">
                  {print && print.supervisor_sign}
                  <br />
                  {supersigndate}
                </div>
              </td>
              <td colSpan="4">
                <div align="center">
                  {print && print.hod_sign}
                  <br />
                  {hodsign}
                </div>
              </td>
              <td colSpan="2">
                {" "}
                <div align="center">
                  {print && print.operator_sign}
                  <br />
                  {operator_signsignaturedate}
                </div>
              </td>
            </tr> 
          </tfoot>
        </table>

        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid black",
            width: "100%",
            marginTop: "5px",
          }}
        >
          <tbody>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                <b style={{ fontSize: "11px", textAlign: "center" }}>
                  Production Supervisor{" "}
                </b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                <b style={{ fontSize: "11px", textAlign: "center" }}>
                  HOD / Designees
                </b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                <b style={{ fontSize: "11px", textAlign: "center" }}>QA </b>
              </td>
            </tr>

            <tr>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                  height: "60px",
                }}
              >
                <div align="center">
                  {print && print.supervisor_sign}
                  <br />
                  {supersigndate}
                </div> 
              </td>

              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                <div align="center">
                  {print && print.hod_sign}
                  <br />
                  {hodsign}
                </div> 
              </td>

              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                <div align="center">
                  {print && print.operator_sign}
                  <br />
                  {operator_signsignaturedate}
                </div> 
              </td>
            </tr>
          </tbody>
        </table>

        <table style={{ marginTop: 20 }}>
          <tr>
            <th colSpan="5">Particular</th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Prepared by</centre>
            </th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Reviewed by</centre>
            </th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Approved by</centre>
            </th>
          </tr>
          <tr>
            <th colSpan="5">Name</th>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <th colSpan="5">Signature & Date</th>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
          </tr>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Date"
          size="small"
          value={datevalues}
          type="date"
          style={{
            width: "200px",
          }}
          min={`${years}-01-01`}
          max={`${years}-12-31`}
          onChange={(e) => handleDate(e.target.value)}
        />
      </div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
      ,
    </div>
  );
};

export default QA_f005;
