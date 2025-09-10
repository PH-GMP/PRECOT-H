/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Row, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
const Engineering_FC004 = () => {
  const { Option } = Select;
  const { state } = useLocation();
  const token = localStorage.getItem("token");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [supervisorStatus, setSupervisorStatus] = useState("");
  // console.loglog("date,", state.date);
  const [open, setOpen] = useState(false);

  const [id, setId] = useState("");
  const departmentMap = {
    1: "Bleaching",
    2: "Spunlace",
    3: "Pad Punching",
    4: "Dry Goods",
    5: "Lab",
    6: "Quality Assurance",
    7: "PPC",
    8: "Store",
    9: "Dispatch",
    10: "Product Development",
    11: "Engineering",
    12: "Cotton Buds",
    13: "Marketing",
  };
  const [rcaNo, setRcaNo] = useState("");
  const [bisNo, setBisNo] = useState("");
  const departmentId = localStorage.getItem("departmentId");
  const [department, setDepartment] = useState(
    departmentMap[departmentId] || ""
  );
  const [product, setProduct] = useState("");
  const [productionLossMt, setProductionLossMt] = useState("");
  const [batchTimeLost, setBatchTimeLost] = useState("");
  const [rcaOwner, setRcaOwner] = useState("");
  const [rcaTeamMembers, setRcaTeamMembers] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [why1, setWhy1] = useState("");
  const [why2, setWhy2] = useState("");
  const [why3, setWhy3] = useState("");
  const [why4, setWhy4] = useState("");
  const [why5, setWhy5] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [assignedDepartment, setAssignedDepartment] = useState("");

  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");
  const [bisNos, setBisNos] = useState([]);
  const [selectedBisNo, setSelectedBisNo] = useState("");
  const [savedBisNo, setSavedBisNo] = useState("");

  // Step 1: Define state for rows
  const [correctiveRows, setCorrectiveRows] = useState([
    { serial: "", action: "", targetDate: "", responsibility: "", status: "" },
  ]);

  const [preventiveRows, setPreventiveRows] = useState([
    { serial: "", action: "", targetDate: "", responsibility: "", status: "" },
  ]);

  // Step 2: Create a function to add a new corrective row
  const addCorrectiveRow = () => {
    setCorrectiveRows([
      ...correctiveRows,
      {
        serial: "",
        action: "",
        targetDate: "",
        responsibility: "",
        status: "",
      },
    ]);
  };

  // Step 3: Create a function to add a new preventive row
  const addPreventiveRow = () => {
    setPreventiveRows([
      ...preventiveRows,
      {
        serial: "",
        action: "",
        targetDate: "",
        responsibility: "",
        status: "",
      },
    ]);
  };

  // Step 4: Create a function to handle input changes for corrective actions
  const handleCorrectiveInputChange = (index, field, value) => {
    const newRows = [...correctiveRows];
    newRows[index][field] = value;
    setCorrectiveRows(newRows);
  };

  // Step 5: Create a function to handle input changes for preventive actions
  const handlePreventiveInputChange = (index, field, value) => {
    const newRows = [...preventiveRows];
    newRows[index][field] = value;
    setPreventiveRows(newRows);
  };

  // Step 6: Create a function to remove a corrective row
  const removeCorrectiveRow = (index) => {
    const newRows = correctiveRows.filter((_, i) => i !== index);
    setCorrectiveRows(newRows);
  };

  // Step 7: Create a function to remove a preventive row
  const removePreventiveRow = (index) => {
    const newRows = preventiveRows.filter((_, i) => i !== index);
    setPreventiveRows(newRows);
  };

  const departmentchange = (value) => {
    setDepartment(value);
  };
  // const handleBisNo = (value) => { setSelectedBisNo(value) }

  const departmantLOV = [
    "Bleaching",
    "Spunlace",
    "Pad Punching",
    "Dry Goods",
    "Cotton Buds",
    "Lab",
    "Boiler",
    "ETP",
  ];

  const today = new Date().toISOString().split("T")[0];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/Engineering/FC-004/Summary");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchBisNos = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Engineering/getbisnos`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setBisNos((prevBisNos) => {
            if (!response.data.includes(selectedBisNo) && selectedBisNo) {
              return [...response.data, selectedBisNo];
            }
            return response.data;
          });
        }
      } catch (error) {
        console.error("Error fetching BIS Nos:", error);
      }
    };

    fetchBisNos();
  }, [selectedBisNo]);

  console.log("bisNo", selectedBisNo);

  const formatDateUser = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDate = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const date1 = formatDateUser(state.date);
  const formattedDatesupervisor = formatDate(supervisorDate);
  const formatedDateOperator = formatDate(operatorDate);
  const formattedDateHod = formatDate(hodDate);

  useEffect(() => {
    fetchBmrOptions();
  }, []);
  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/Engineering/getRootCause?date=${state.date}&rcaNo=${state.rcaNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const rcaData = data[0];
        setEditResponse(rcaData);
        setId(rcaData.id);
        setRcaNo(rcaData.rcaNo);
        setSelectedBisNo(rcaData.bisNo);
        setDate(rcaData.date);
        setDepartment(rcaData.department);
        setProduct(rcaData.product);
        setProductionLossMt(rcaData.productionLossMt);
        setBatchTimeLost(rcaData.batchTimeLost);
        setRcaOwner(rcaData.rcaOwner);
        setRcaTeamMembers(rcaData.rcaTeamMembers);
        setProblemDescription(rcaData.problemDescription);
        setWhy1(rcaData.why1);
        setWhy2(rcaData.why2);
        setWhy3(rcaData.why3);
        setWhy4(rcaData.why4);
        setWhy5(rcaData.why5);
        setRootCause(rcaData.rootCause);

        // Set corrective actions if available
        if (rcaData.correctiveActions && rcaData.correctiveActions.length > 0) {
          setCorrectiveRows(
            rcaData.correctiveActions.map((action) => ({
              id: action.id,
              action: action.correctiveaction,
              targetDate: action.correctivetargetDate,
              responsibility: action.correctiveresponsibility,
              status: action.correctivestatus,
            }))
          );
        }

        // Set preventive actions if available
        if (rcaData.preventiveActions && rcaData.preventiveActions.length > 0) {
          setPreventiveRows(
            rcaData.preventiveActions.map((action) => ({
              id: action.id,
              action: action.preventiveaction,
              targetDate: action.preventivetargetDate,
              responsibility: action.preventiveresponsibility,
              status: action.preventivestatus,
            }))
          );
        }

        // Other statuses and signatures
        setOperator(rcaData.supervisorSign);
        setOperatorDate(rcaData.supervisorSubmitOn);
        setSupervisor(rcaData.supervisorSign);
        setSupervisorDate(rcaData.supervisorSubmitOn);
        setHod(rcaData.hodSign);
        setHodDate(rcaData.hodSubmitOn);
        setSupervisorStatus(rcaData.supervisorStatus);
        console.log("sign", rcaData.supervisorSign);

        if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
          if (!data || data.length === 0) {
            message.warning("No data available. Redirecting to Summary.");
            setTimeout(() => {
              navigate("/Precot/Engineering/FC-004/Summary");
            }, 1500);
            return; // Exit early if there's no data
          }
          if (
            rcaData?.supervisorStatus !== "SUPERVISOR_APPROVED" ||
            rcaData?.hod_status === "HOD_REJECTED"
          ) {
            message.warning(
              "Operator Not Yet Approved or Previous Stage Rejected"
            );
            setTimeout(() => {
              navigate("/Precot/Engineering/FC-004/Summary");
            }, 1500);
          }
        }

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${rcaData.supervisorSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            // console.loglog("Response:", res.data);
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage2(url);
          })
          .catch((err) => {
            // console.loglog("Error in fetching image:", err);
          });
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };

  const canDisplayButtons = () => {
    if (
      roleauth === "ROLE_ENGINEER" ||
      roleauth === "ROLE_CIVIL" ||
      roleauth === "ROLE_MECHANICAL" ||
      roleauth === "ROLE_ELECTRICAL"
    ) {
      if (editResponse?.supervisorStatus === "SUPERVISOR_APPROVED") {
        if (editResponse?.hodStatus === "HOD_REJECTED") {
          return {
            save: "none",
            submit: "block",
            approve: "none",
            reject: "none",
          };
        }
        return {
          save: "none",
          submit: "none",
          approve: "none",
          reject: "none",
        };
      }
      return {
        save: "block",
        submit: "block",
        approve: "none",
        reject: "none",
      };
    }

    if (roleauth === "ROLE_HOD") {
      if (
        editResponse?.hodStatus === "HOD_APPROVED" ||
        editResponse?.hodStatus === "HOD_REJECTED"
      ) {
        return {
          save: "none",
          submit: "none",
          approve: "none",
          reject: "none",
        };
      }
      return {
        save: "none",
        submit: "none",
        approve: "block",
        reject: "block",
      };
    }

    return { save: "none", submit: "none", approve: "none", reject: "none" };
  };

  const displayConfig = canDisplayButtons();

  const displaySaveButton = displayConfig.save;
  const displaySubmitButton = displayConfig.submit;
  const displayApproveButton = displayConfig.approve;
  const displayRejectButton = displayConfig.reject;

  const canEdit = () => {
    if (
      roleauth === "ROLE_ENGINEER" ||
      roleauth === "ROLE_CIVIL" ||
      roleauth === "ROLE_MECHANICAL" ||
      roleauth === "ROLE_ELECTRICAL"
    ) {
 
      return (
        editResponse?.supervisorStatus !== "SUPERVISOR_APPROVED" ||
        editResponse?.hodStatus === "HOD_REJECTED"
      );
    }

    if (roleauth === "ROLE_HOD") {
 
      return false;
    }

    if (roleauth === "ROLE_DESIGNEE") {
      // Enable based on HOD status
      return (
        editResponse?.hodStatus === "WAITING_FOR_APPROVAL" ||
        editResponse?.hodStatus === "HOD_REJECTED"
      );
    }

    return false;
  };

  // Determine if inputs are editable
  const isEditable = canEdit();

  const roleToDepartmentMap = {
    ROLE_ENGINEER: "Engineering",
    ROLE_MECHANICAL: "Mechanical",
    ROLE_ELECTRICAL: "Electrical",
    ROLE_CIVIL: "Civil",
  };

 
  useEffect(() => {
    const role = localStorage.getItem("role");
    const department = roleToDepartmentMap[role];
    if (department) {
      setAssignedDepartment(department);
    }
  }, []);

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = supervisior;
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
          // console.loglog("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
        })
        .catch((err) => {
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hod;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
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
     
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = operator;
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
          // console.loglog("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  // console.loglog(productName);
  // console.loglog("noOfFlagsInRoll", mixing);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Engineering/RootCause/approveOrReject`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.loglog("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Engineering/FC-004/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.loglog("Err", err.response.data.message);
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
        `${API.prodUrl}/Precot/api/Engineering/RootCause/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.loglog("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Engineering/FC-004/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.loglog("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleSave = () => {
    setSaveLoading(true);
    const payload = {
      id: id || null,
      format: "Root Cause Analysis",
      format_no: "PH-ENG01/FC-004",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-05",
      rcaNo: state.rcaNo,
      bisNo: selectedBisNo,
      date: state.date,
      department: department,
      product: product,
      productionLossMt: productionLossMt,
      batchTimeLost: batchTimeLost,
      rcaOwner: rcaOwner,
      rcaTeamMembers: rcaTeamMembers,
      problemDescription: problemDescription,
      why1: why1,
      why2: why2,
      why3: why3,
      why4: why4,
      why5: why5,
      rootCause: rootCause,
      assignedDepartment: assignedDepartment,
      correctiveActions: correctiveRows.map((row, index) => ({
        id: row.id || null,
        correctiveaction: row.action,
        correctivetargetDate: row.targetDate, // Aligning with 'correctivetargetDate'
        correctiveresponsibility: row.responsibility, // Aligning with 'correctiveresponsibility'
        correctivestatus: row.status || "Open", // Aligning with 'correctivestatus'
      })),

      preventiveActions: preventiveRows.map((row, index) => ({
        id: row.id || null,
        preventiveaction: row.action,
        preventivetargetDate: row.targetDate,
        preventiveresponsibility: row.responsibility,
        preventivestatus: row.status || "Open",
      })),
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/Engineering/RootCause/Save`, payload, {
        headers,
      })
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/Engineering/FC-004/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const isFormValid = () => {
    return (
      // selectedBisNo &&
      // department &&
      product &&
      productionLossMt &&
      batchTimeLost &&
      rcaOwner &&
      rcaTeamMembers &&
      problemDescription &&
      why1 &&
      why2 &&
      why3 &&
      why4 &&
      why5 &&
      rootCause &&
      assignedDepartment
 
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      message.error("Please fill all required fields.");
      return;
    }
 
    setSubmitLoading(true);
    const payload = {
      id: id || null,
      format: "Root Cause Analysis",
      format_no: "PH-ENG01/FC-004",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-05",
      rcaNo: state.rcaNo,
      bisNo: selectedBisNo || "NA",
      date: state.date,
      department: department,
      product: product,
      productionLossMt: productionLossMt,
      batchTimeLost: batchTimeLost,
      rcaOwner: rcaOwner,
      rcaTeamMembers: rcaTeamMembers,
      problemDescription: problemDescription,
      why1: why1,
      why2: why2,
      why3: why3,
      why4: why4,
      why5: why5,
      rootCause: rootCause,
      assignedDepartment: assignedDepartment,
      correctiveActions: correctiveRows.map((row, index) => ({
        id: row.id || null,
        correctiveaction: row.action,
        correctivetargetDate: row.targetDate,
        correctiveresponsibility: row.responsibility,
        correctivestatus: row.status || "Open",
      })),

      preventiveActions: preventiveRows.map((row, index) => ({
        id: row.id || null,
        preventiveaction: row.action,
        preventivetargetDate: row.targetDate,
        preventiveresponsibility: row.responsibility,
        preventivestatus: row.status || "Open",
      })),
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(` ${API.prodUrl}/Precot/api/Engineering/RootCause/Submit`, payload, {
        headers,
      })
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/Engineering/FC-004/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const items = [
    {
      key: "1",
      label: <p> DETAILS </p>,
      children: (
        <div>
          <table align="left" style={{ width: "70%", margin: "auto" }}>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                RCA No.
              </td>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={state.rcaNo}
                  disabled
                />
              </td>
            </tr>
 
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                BIS No.
              </td>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                <select
                  className="inp-new"
                  value={selectedBisNo}
                  onChange={(e) => setSelectedBisNo(e.target.value)}
                  disabled={!isEditable || bisNos.length === 0}
                >
                  <option value="" disabled>
                    Select BIS No.
                  </option>
                  {bisNos.length > 0 ? (
                    bisNos.map((bis, index) => (
                      <option key={index} value={bis}>
                        {bis}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No BIS numbers available
                    </option>
                  )}
                </select>
              </td>
            </tr>

            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Date
              </td>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                <input
                  className="inp-new"
                  max={today}
                  type="date"
                  value={state.date}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Machine Name
              </td>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Department
              </td>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                <Select
                  showSearch
                  value={department}
                  onChange={departmentchange}
                  style={{ width: "100%" }}
                  placeholder="Search Batch No"
                  optionFilterProp="children"
                  disabled
                >
                  {departmantLOV.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Production Loss (MT)
              </td>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={productionLossMt}
                  onChange={(e) => setProductionLossMt(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                RCA Owner
              </td>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={rcaOwner}
                  onChange={(e) => setRcaOwner(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Batch Time Lost
              </td>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={batchTimeLost}
                  onChange={(e) => setBatchTimeLost(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                RCA Team members
              </td>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={rcaTeamMembers}
                  onChange={(e) => setRcaTeamMembers(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p> 5 WHY's?</p>,
      children: (
        <div>
          <table align="left" style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Problem Description:{" "}
              </td>
              <td colSpan={50} style={{ textAlign: "left", height: "35px" }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{ textAlign: "left" }}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Why?{" "}
              </td>
              <td colSpan={50} style={{ textAlign: "left", height: "35px" }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{
                    textAlign: "left",
                    paddingLeft: "3em",
                    width: "100%",
                    height: "auto",
                  }}
                  value={why1}
                  onChange={(e) => setWhy1(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Why?{" "}
              </td>
              <td colSpan={50} style={{ textAlign: "left", height: "35px" }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{
                    textAlign: "left",
                    paddingLeft: "3em",
                    width: "100%",
                    height: "auto",
                  }}
                  value={why2}
                  onChange={(e) => setWhy2(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Why?{" "}
              </td>
              <td colSpan={50} style={{ textAlign: "left", height: "35px" }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{
                    textAlign: "left",
                    paddingLeft: "3em",
                    width: "100%",
                    height: "auto",
                  }}
                  value={why3}
                  onChange={(e) => setWhy3(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Why?{" "}
              </td>
              <td colSpan={50} style={{ textAlign: "left", height: "35px" }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{
                    textAlign: "left",
                    paddingLeft: "3em",
                    width: "100%",
                    height: "auto",
                  }}
                  value={why4}
                  onChange={(e) => setWhy4(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Why?{" "}
              </td>
              <td colSpan={50} style={{ textAlign: "left", height: "35px" }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{
                    textAlign: "left",
                    paddingLeft: "3em",
                    width: "100%",
                    height: "auto",
                  }}
                  value={why5}
                  onChange={(e) => setWhy5(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: "center", height: "35px" }}>
                Root Cause
              </td>
              <td colSpan={50} style={{ textAlign: "left", height: "35px" }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{
                    textAlign: "left",
                    paddingLeft: "3em",
                    width: "100%",
                    height: "auto",
                  }}
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p> CAPA </p>,
      children: (
        <div>
          <table align="left" style={{ width: "100%", margin: "auto" }}>
 
            <thead>
              <tr>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  S.No.
                </td>
                <td
                  colSpan={50}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  Corrective Action
                </td>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  Target Date
                </td>
                <td
                  colSpan={20}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  Responsibility
                </td>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  Status
                </td>
       
              </tr>
            </thead>
            <tbody>
              {correctiveRows.map((row, index) => (
                <tr key={index}>
                  <td
                    colSpan={10}
                    style={{
                      textAlign: "left",
                      height: "35px",
                      paddingLeft: "3em",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={index + 1}
   
                      disabled={!isEditable}
                    />
                  </td>

                  <td
                    colSpan={50}
                    style={{
                      textAlign: "left",
                      height: "35px",
                      paddingLeft: "3em",
                      paddingRight: "3em",
                    }}
                  >
                    <textarea
                      className="inp-new"
                      value={row.action}
                      onChange={(e) => {
                        handleCorrectiveInputChange(
                          index,
                          "action",
                          e.target.value
                        );
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      style={{
                        width: "100%",
                        minHeight: "35px",
                        padding: "8px",
                        resize: "none",
                        overflowWrap: "break-word",
                        boxSizing: "border-box",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#000",
                        textAlign: "left",
                      }}
                      rows={1}
                      onInput={(e) => {
                        const value = e.target.value;
                        if (!/^[a-zA-Z0-9._, ]*$/.test(value)) {
                          e.target.value = value.slice(0, -1);
                        }
                      }}
                      disabled={!isEditable}
                    />
                  </td>

                  <td
                    colSpan={10}
                    style={{
                      textAlign: "center",
                      height: "35px",
                      paddingLeft: "3em",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="date"
                      value={row.targetDate}
                      onChange={(e) =>
                        handleCorrectiveInputChange(
                          index,
                          "targetDate",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td
                    colSpan={20}
                    style={{
                      textAlign: "left",
                      height: "35px",
                      paddingLeft: "3em",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={row.responsibility}
                      onChange={(e) =>
                        handleCorrectiveInputChange(
                          index,
                          "responsibility",
                          e.target.value
                        )
                      }
                      onInput={(e) => {
                        const value = e.target.value;
                        if (!/^[a-zA-Z0-9._, ]*$/.test(value)) {
                          e.target.value = value.slice(0, -1);
                        }
                      }}
                      disabled={!isEditable}
                    />
                  </td>

                  <td
                    colSpan={10}
                    style={{
                      textAlign: "center",
                      height: "35px",
                      paddingLeft: "3em",
                    }}
                  >
                    <select
                      className="inp-new"
                      value={row.status}
                      onChange={(e) =>
                        handleCorrectiveInputChange(
                          index,
                          "status",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        height: "35px",
                        padding: "8px",
                        boxSizing: "border-box",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#000",
                        textAlign: "center",
                      }}
                      disabled={!isEditable}
                    >
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </select>
                  </td>

                  {(editResponse?.supervisorStatus !== "SUPERVISOR_APPROVED" ||
                    editResponse?.hodStatus === "HOD_REJECTED") && (
                    <button
                      onClick={() => removeCorrectiveRow(index)}
                      style={{
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px",
                        fontSize: "10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      {" "}
                      <DeleteTwoTone
                        style={{ fontSize: "20px", color: "red" }}
                        disabled={!isEditable}
                      />
                    </button>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {(editResponse?.supervisorStatus !== "SUPERVISOR_APPROVED" ||
            editResponse?.hodStatus === "HOD_REJECTED") && (
            <button
              onClick={addCorrectiveRow}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "12px 20px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {" "}
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Corrective Row
            </button>
          )}
          <br />

           <table
            align="left"
            style={{ width: "100%", margin: "auto", marginTop: "20px" }}
          >
            <thead>
              <tr>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  S.No.
                </td>
                <td
                  colSpan={50}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  Preventive Action
                </td>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  Target Date
                </td>
                <td
                  colSpan={20}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  Responsibility
                </td>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  Status
                </td>
  
              </tr>
            </thead>
            <tbody>
              {preventiveRows.map((row, index) => (
                <tr key={index}>
                  <td
                    colSpan={10}
                    style={{
                      textAlign: "left",
                      height: "auto",
                      paddingLeft: "3em",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={index + 1}
                      disabled={!isEditable}
                    />
                  </td>

                  <td
                    colSpan={50}
                    style={{
                      textAlign: "left",
                      height: "35px",
                      paddingLeft: "3em",
                      paddingRight: "3em",
                    }}
                  >
                    <textarea
                      className="inp-new"
                      value={row.action}
                      onChange={(e) => {
                        handlePreventiveInputChange(
                          index,
                          "action",
                          e.target.value
                        );
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      style={{
                        width: "100%",
                        minHeight: "35px",
                        padding: "8px",
                        resize: "none",
                        overflowWrap: "break-word",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#000",
                        textAlign: "left",
                      }}
                      rows={1}
                      onInput={(e) => {
                        const value = e.target.value;
                        if (!/^[a-zA-Z0-9._, ]*$/.test(value)) {
                          e.target.value = value.slice(0, -1);
                        }
                      }}
                      disabled={!isEditable}
                    />
                  </td>

                  <td
                    colSpan={10}
                    style={{
                      textAlign: "center",
                      height: "auto",
                      paddingLeft: "3em",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="date"
                      value={row.targetDate}
                      onChange={(e) =>
                        handlePreventiveInputChange(
                          index,
                          "targetDate",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td
                    colSpan={20}
                    style={{
                      textAlign: "left",
                      height: "auto",
                      paddingLeft: "3em",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={row.responsibility}
                      onChange={(e) =>
                        handlePreventiveInputChange(
                          index,
                          "responsibility",
                          e.target.value
                        )
                      }
                      onInput={(e) => {
                        const value = e.target.value;
                        if (!/^[a-zA-Z0-9._, ]*$/.test(value)) {
                          e.target.value = value.slice(0, -1);
                        }
                      }}
                      disabled={!isEditable}
                    />
                  </td>
                  <td
                    colSpan={10}
                    style={{
                      textAlign: "left",
                      height: "35px",
                      paddingLeft: "3em",
                    }}
                  >
                    <select
                      className="inp-new"
                      value={row.status}
                      onChange={(e) =>
                        handlePreventiveInputChange(
                          index,
                          "status",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        height: "35px",
                        padding: "8px",
                        boxSizing: "border-box",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#000",
                      }}
                      disabled={!isEditable}
                    >
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </select>
                  </td>

                  {/* <td colSpan={10} style={{ textAlign: 'center', height: 'auto' }}> */}
                  {(editResponse?.supervisorStatus !== "SUPERVISOR_APPROVED" ||
                    editResponse?.hodStatus === "HOD_REJECTED") && (
                    <button
                      onClick={() => removePreventiveRow(index)}
                      style={{
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px",
                        fontSize: "10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      <DeleteTwoTone
                        style={{
                          fontSize: "20px",
                          color: "red",
                          border: "none",
                        }}
                      />
                    </button>
                  )}
                  {/* </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {(editResponse?.supervisorStatus !== "SUPERVISOR_APPROVED" ||
            editResponse?.hodStatus === "HOD_REJECTED") && (
            <button
              onClick={addPreventiveRow}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "12px 20px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {" "}
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Preventive Row
            </button>
          )}
        </div>
      ),
    },
    {
      key: "4",
      label: "REVIEWS",
      children: (
        <>
          <table align="left" style={{ width: 600, alignItems: "left" }}>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid black ",
                }}
              >
                <p>Submitted by: </p>
                <b>Sign & Date</b>
              </td>
              <td style={{}}>
             
                <textarea
                  className="inp-new"
                  value={
                    operator ? `${operator}\n ${formatedDateOperator}` : ""
                  }
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                />
            
                {getImage2 && (
                  <img
                    className="signature"
                    src={getImage2}
                    alt="logo"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto",
                    }}
                  />
                )}
                {/* )} */}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid ",
                }}
              >
                <p>Reviewed By: </p>
                <b>Sign & Date</b>
              </td>
              <td>
                <p style={{ textAlign: "center" }}></p>
                {editResponse?.supervisorStatus === "SUPERVISOR_APPROVED" && (
                  <textarea
                    className="inp-new"
                    value={hod ? `${hod}\n ${formattedDateHod}` : ""}
                    readOnly
                    rows="2"
                    style={{ resize: "none", overflow: "hidden" }}
                  />
                )}
                {((editResponse?.supervisorStatus === "SUPERVISOR_APPROVED" &&
                  editResponse?.hodStatus === "HOD_APPROVED") ||
                  editResponse?.hodStatus === "HOD_REJECTED") &&
                  getImage && (
                    <img
                      className="signature"
                      src={getImage}
                      alt="logo"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                      }}
                    />
                  )}
              </td>
            </tr>
          </table>
        </>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="ROOT CAUSE ANALYSIS"
        formatNo="PH-ENG01/FC-004"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons().approve,
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons().reject,
                }}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                onClick={handleRejectModal}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons().save,
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
                  
                  display: canDisplayButtons().submit,
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: "20px",
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
        title="Reject"
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        destroyOnClose={true}
        showSearch
        footer={[
          <Button
            key="submit"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            onClick={handleReject}
            disabled={!rejectRemarks}
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>

      <div style={{ paddingBottom: "2em" }}></div>
      <Row>
        <Tabs
          items={items}
           
          style={{
            width: "90%",
            position: "relative",
            left: "2%",
          }}
        />
      </Row>
    </div>
  );
};

export default Engineering_FC004;
