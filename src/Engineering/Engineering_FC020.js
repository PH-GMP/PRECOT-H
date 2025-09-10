/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import BleachingHeader from "../Components/BleachingHeader.js";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Menu,
  Radio,
  Row,
  Select,
  Tabs,
  Tooltip,
  message,
  Modal
} from "antd";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { IoPrint, IoSave, IoCheckmarkDone } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Engineering_FC020 = () => {
  const { Option } = Select;
  const { state } = useLocation();
  const departmentId = localStorage.getItem("departmentId");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [processId, setProcessId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acceptorDate, setAcceptorDate] = useState("");
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

  const [id, setId] = useState('');
  const [dateOfRequest, setDateOfRequest] = useState("");
  const [worNo, setWorNo] = useState("");
  const [department, setDepartment] = useState("");
  const [area, setArea] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [detailsOfWork, setDetailsOfWork] = useState("");
  const [assignedDepartment, setAssignedDepartment] = useState("");
  const [comments, setComments] = useState("");
  const [closureDate, setClosureDate] = useState("");
  const [closureComments, setClosureComments] = useState("");
  const [initialComments, setInitialComments] = useState("");
  const [tentativeDate, setTentativeDate] = useState("");


  // Requester fields
  const [requesterStatus, setRequesterStatus] = useState("");
  const [requesterSavedOn, setRequesterSavedOn] = useState("");
  const [requesterSavedBy, setRequesterSavedBy] = useState("");
  const [requesterSubmitOn, setRequesterSubmitOn] = useState("");
  const [requesterSubmitBy, setRequesterSubmitBy] = useState("");
  const [requesterSign, setRequesterSign] = useState("");

  // Receiver fields
  const [accepterStatus, setAccepterStatus] = useState("");
  const [accepterSign, setAccepterSign] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverStatus, setReceiverStatus] = useState("");
  const [receiverSubmitBy, setReceiverSubmitBy] = useState("");
  const [receiverSign, setReceiverSign] = useState("");
  const [receiverSubmiton, setReceiverSubmiton] = useState("");
  // HOD fields

  const [hodStatus, setHodStatus] = useState("");

  const [approveLoading, setApproveLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);

  const departmantLOV = [
    "Bleaching",
    "Spunlace",
    "Pad Punching",
    "Dry Goods",
    "Cotton Buds",
    "Lab",
    "Boiler",
    "ETP",
    "Admin",
    "Store",
    "Dispatch",
    "Utility"
  ];
  const departmentMap = {
    "1": "Bleaching",
    "2": "Spunlace",
    "3": "Pad Punching",
    "4": "Dry Goods",
    "5": "Lab", // QC as Lab
    "6": "Quality Assurance",
    "7": "PPC",
    "8": "Store",
    "9": "Dispatch",
    "10": "Product Development",
    "11": "Engineering",
    "12": "Cotton Buds",
    "13": "Marketing"
  };

  useEffect(() => {
    if (departmentId) {
      setDepartment(departmentMap[departmentId] || "");
    }
  }, [departmentId]);

  const departmentchange = (value) => {
    setDepartment(value);
  }
  const today = new Date().toISOString().split("T")[0];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }
  const handleBack = () => {
    navigate("/Precot/Engineering/FC-020/Summary");
  };


  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");



  const formatDateUser = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDate = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/; // Matches "dd/MM/yyyy"
    if (datePattern.test(dateStr)) {
      return dateStr; // Return if already in desired format
    }

    try {
      const date = new Date(dateStr); // Parse the date string
      if (isNaN(date)) {
        throw new Error("Invalid date format");
      }

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
      console.error("Error formatting date:", error.message);
      return "Invalid date";
    }
  };



  const date1 = formatDateUser(state.date);
  const formattedDatesupervisor = formatDate(supervisorDate);
  const formatedDateAcceptor = formatDate(acceptorDate);
  const formattedDateHod = formatDate(hodDate);
  // console.loglog("date1", date1);
  // console.loglog("shift", state.shift);
  const token = localStorage.getItem("token");
  // console.loglog(token);

  useEffect(() => {

    fetchData();
    // approval();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/Engineering/getWorkorderlist?dateOfRequest=${state.date}&worNo=${state.worNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("edit data", data);
      if (data && data.length > 0) {
        const workOrder = data[0];
        setId(workOrder.id);
        setEditResponse(workOrder);
        console.log("editResponse", editResponse);
        setDateOfRequest(workOrder.dateOfRequest);
        setWorNo(workOrder.worNo);
        setDepartment(workOrder.department);
        setArea(workOrder.area);
        setTargetDate(workOrder.targetDate);
        setDetailsOfWork(workOrder.detailsOfWork);
        setAssignedDepartment(workOrder.assignedDepartment);
        setClosureDate(workOrder.closureDate);
        setComments(workOrder.comments || "");

        setRequesterStatus(workOrder.requesterStatus);
        setRequesterSavedOn(workOrder.requesterSavedOn);
        setRequesterSavedBy(workOrder.requesterSavedBy);
        setRequesterSubmitOn(workOrder.requesterSubmitOn);
        setRequesterSubmitBy(workOrder.requesterSubmitBy);
        setRequesterSign(workOrder.requesterSign);
        setAccepterSign(workOrder.accepterSign);
        setAccepterStatus(workOrder.accepterStatus);
        setTentativeDate(workOrder.tentativeDate);
        setInitialComments(workOrder.initialComments);
        setClosureComments(workOrder.closureComments);
        setReceiver(workOrder.receiver);
        setReceiverStatus(workOrder.receiverstatus);
        setReceiverSubmitBy(workOrder.receiverSubmitBy);
        setReceiverSign(workOrder.receiverSign);
        setReceiverSubmiton(workOrder.receiverSubmiton);
        setHod(workOrder.hodSign);
        setHodDate(workOrder.hodSubmitOn);
        setHodStatus(workOrder.hodStatus);

        setOperator(workOrder.operator_sign);
        setAcceptorDate(workOrder.accepterSubmitOn);
        setSupervisor(workOrder.supervisor_sign);
        setSupervisorDate(workOrder.supervisor_submit_on);
        setSupervisorStatus(workOrder.supervisor_status);
        // console.loglog("supervisoesdufheiljwkqmnfjknk", data.supervisor_status);
      }

     
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };


  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = requesterSign;
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
    const username = receiverSign;
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = accepterSign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse]);
  const [getImage3, setGetImage3] = useState("");

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
          setGetImage3(url);
        })
        .catch((err) => {
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse]);

  const isAcceptValid = () => {
    return (
      tentativeDate && initialComments
    );
  };


  const handleAccept = async () => {
   
    if (!isAcceptValid()) {
      message.error("Please fill Tentative date and Comments.");
      return;
    }
    setAcceptLoading(true);
    const payload = {
      id: id || null,
      unit: "H",
      format: "Work Order Request Form",
      format_no: "PH-ENG01/FC-020",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-05",
      dateOfRequest: dateOfRequest,
      worNo: worNo,
      department: department,
      area: area,
      targetDate: targetDate,
      detailsOfWork: detailsOfWork,
      assignedDepartment: assignedDepartment,
      tentativeDate: tentativeDate,
      initialComments: initialComments,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/Engineering/Workorder/Accept`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Accepted");
        navigate("/Precot/Engineering/FC-020/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setAcceptLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setAcceptLoading(false);

      });
  };

  const isFormclosure = () => {
    return (
      closureDate
    );
  };


  const handleComplete = async () => {
    setCompleteLoading(true);
    if (!isFormclosure()) {
      message.error("Please provide Closure Date.");
      return;
    }
    const payload = {
      id: id || null,
      unit: "H",
      format: "Work Order Request Form",
      format_no: "PH-ENG01/FC-020",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-05",
      dateOfRequest: dateOfRequest,
      worNo: worNo,
      department: department,
      area: area,
      targetDate: targetDate,
      detailsOfWork: detailsOfWork,
      assignedDepartment: assignedDepartment,
      closureDate: closureDate,
      tentativeDate: tentativeDate,
      initialComments: initialComments,
      closureComments: closureComments
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/Engineering/Workorder/Completed`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Completed");
        navigate("/Precot/Engineering/FC-020/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setCompleteLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setCompleteLoading(false);
      });
  };



  // console.loglog(productName);
  // console.loglog("noOfFlagsInRoll", mixing);
  const isValid = () => {
    return (
     comments
    );
  };


  const handleApprove = async () => {
    setSaveLoading(true);
    if (!isValid()) {
      message.error("Please Provide Comments");
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Engineering/Workorder/approve`,
        {
          id: id,
          status: "Approve",
          remarks: comments
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.loglog("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Engineering/FC-020/Summary");
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
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationSliterWinder/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
   
        message.success(res.data.message);
        navigate("/Precot/Engineering/FC-020/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
     
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
      format: "Work Order Request Form",
      format_no: "PH-ENG01/FC-020",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-05",
      dateOfRequest: state.date,
      worNo: state.worNo,
      department: department,
      area: area,
      targetDate: targetDate,
      detailsOfWork: detailsOfWork,
      assignedDepartment: assignedDepartment

    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/Engineering/Workorder/Save`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/Engineering/FC-020/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSaveLoading(false);
        message.error(err.response.data.message);
      }).finally(() => {
        setSaveLoading(false);

      });
  }
  const isFormValid = () => {
    return (
      department &&
      area &&
      targetDate &&
      detailsOfWork &&
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
      format: "Work Order Request Form",
      format_no: "PH-ENG01/FC-020",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-05",
      dateOfRequest: state.date,
      worNo: state.worNo,
      department: department,
      area: area,
      targetDate: targetDate,
      detailsOfWork: detailsOfWork,
      assignedDepartment: assignedDepartment

    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/Engineering/Workorder/Submit`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/Engineering/FC-020/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);

      });
  }

  const items = [
    {
      key: "1",
      label: <p>WORK ORDER REQUEST</p>,
      children: (
        <div>
          <table align="left" style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan={20} style={{ textAlign: 'center', height: '35px' }}>Date of Request</td>
              <td colSpan={30} style={{ textAlign: 'center', height: '35px' }}>
                <input className="inp-new" type="date" value={state.date} disabled />
              </td>
              <td colSpan={20} style={{ textAlign: 'center', height: '35px' }}>Target Date:</td>
              <td colSpan={30} style={{ textAlign: 'center', height: '35px' }}>
                <input
                  className="inp-new"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  disabled={editResponse?.requesterStatus === "REQUESTER_SUBMIT"} // Disable if submitted by HOD
                />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ textAlign: 'center', height: '35px' }}>Department</td>
              <td colSpan={30} style={{ textAlign: 'center', height: '35px' }}>
                <Select
                  showSearch
                  value={department}
                  onChange={departmentchange}
                  style={{ width: '100%' }}
                  autoFocus
                  optionFilterProp="children"
                  // disabled={editResponse?.requesterStatus === "REQUESTER_SUBMIT"} // Disable if submitted by HOD
                  disabled
                >
                  {departmantLOV.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </td>
              <td colSpan={20} style={{ textAlign: 'center', height: '35px' }}>Area:</td>
              <td colSpan={30} style={{ textAlign: 'center', height: '35px' }}>
                <input
                  className="inp-new"
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[a-zA-Z0-9._ ]*$/.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }}
                  disabled={editResponse?.requesterStatus === "REQUESTER_SUBMIT"} // Disable if submitted by HOD
                />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ textAlign: 'center', height: '35px' }}>WOR No.:</td>
              <td colSpan={80} style={{ textAlign: 'center', height: '35px' }}>
                <input className="inp-new" type="text" value={state.worNo} disabled />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ textAlign: 'center', height: '50px' }}>Details of work order/Work description:</td>
              <td colSpan={80} style={{ textAlign: 'center', height: '50px' }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  value={detailsOfWork}
                  onChange={(e) => setDetailsOfWork(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[a-zA-Z0-9._, ]*$/.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }}
                  style={{ minHeight: '110px' }}
                  disabled={editResponse?.requesterStatus === "REQUESTER_SUBMIT"} // Disable if submitted by HOD
                />
              </td>
            </tr>
            <tr>
              <td colSpan={25}>
                <p>Requested By <br /> (User Department)</p>
                <b>Sign & Date</b>
              </td>
              <td colSpan={25}>
                {(editResponse?.requesterStatus === "REQUESTER_SUBMIT") && (
                  <textarea
                    className="inp-new"
                    value={requesterSign ? `${requesterSign}\n ${formatDate(requesterSubmitOn)}` : ""}
                    readOnly
                    rows="2"
                    style={{ resize: "none", overflow: "hidden" }}
                  />
                )}
                {(editResponse?.requesterStatus === "REQUESTER_SUBMIT" ||
                  editResponse?.requesterStatus === "REQUESTER_REJECT") &&
                  getImage && (
                    <img className="signature"
                      src={getImage}
                      alt="logo"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto"
                      }}
                    />
                  )
                }
              </td>
              <td colSpan={25}>
                <p>Received by <br /> (Engineering Department) </p>
                {/* <b>Sign & Date</b> */}
              </td>
              <td colSpan={25}>
                <select
                  className="inp-new"
                  value={assignedDepartment}
                  onChange={(e) => setAssignedDepartment(e.target.value)}
                  style={{ width: "100%", textAlign: 'center', marginBottom: "1em" }}
                  disabled={editResponse?.requesterStatus === "REQUESTER_SUBMIT"} // Disable if submitted by HOD
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
                <p style={{ textAlign: "center" }}></p>
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>WORK ORDER ACCEPTANCE</p>,
      children: (
        <div>
          <table align="left" style={{ width: "100%", margin: "auto", borderCollapse: "collapse" }}>
            <tr>
              <td colSpan={20} style={{ textAlign: 'center', height: '35px' }}>Tentative Completion Date:</td>
              <td colSpan={80} style={{ textAlign: 'center', height: '35px' }}>
                <input
                  className="inp-new"
                  type="date"
                  value={tentativeDate}

                  onChange={(e) => setTentativeDate(e.target.value)}
                  style={{ width: '30%' }}
                  disabled={
                    !(
                      editResponse?.requesterStatus === "REQUESTER_SUBMIT" &&
                      editResponse?.accepterStatus !== "RECEIVER_ACCEPTED" &&
                      ["ROLE_ENGINEER", "ROLE_CIVIL", "ROLE_MECHANICAL"].includes(roleauth)
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ textAlign: 'center', height: '50px' }}>Comments (by Engineering):</td>
              <td colSpan={80} style={{ textAlign: 'center', height: '50px' }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  value={initialComments}
                  onChange={(e) => setInitialComments(e.target.value)}
                  style={{ minHeight: '110px', width: '100%', textAlign: 'left' }}
                  disabled={
                    !(
                      editResponse?.requesterStatus === "REQUESTER_SUBMIT" &&
                      editResponse?.accepterStatus !== "RECEIVER_ACCEPTED" &&
                      ["ROLE_ENGINEER", "ROLE_CIVIL", "ROLE_MECHANICAL"].includes(roleauth)
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ width: '25%', textAlign: 'center' }}>
                <p>Received By <br /> (Engineering Department)</p>
                <b>Sign & Date</b>
              </td>
              <td colSpan={80} >
                {(editResponse?.requesterStatus === "REQUESTER_SUBMIT") && (
                  <textarea
                    className="inp-new"
                    value={accepterSign ? `${accepterSign}\n ${formatDate(acceptorDate)}` : ""}
                    readOnly
                    rows="2"
                    style={{ resize: "none", overflow: "hidden" }}
                  />
                )}

                { getImage2 && (
                <img className="signature"
                  src={getImage2}
                  alt="signature"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto"
                  }}
                />
                )} 
              </td>

            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>WORK ORDER CLOSURE</p>,
      children: (
        <div>
          <table align="left" style={{ width: "100%", margin: "auto", borderCollapse: "collapse" }}>
            <tr>
              <td colSpan={20} style={{ textAlign: 'center', height: '35px' }}>Closure Date</td>
              <td colSpan={80} style={{ textAlign: 'center', height: '35px' }}>
                <input
                  className="inp-new"
                  type="date"
                  value={closureDate}
                  max={today}
                  onChange={(e) => setClosureDate(e.target.value)}
                  style={{ width: '30%' }}
                  disabled={
                    !(
                      ["ROLE_ENGINEER", "ROLE_CIVIL", "ROLE_MECHANICAL", "ROLE_ELECTRICAL"].includes(roleauth) &&
                      editResponse?.accepterStatus === "RECEIVER_ACCEPTED" &&
                      editResponse?.receiverstatus !== "RECEIVER_COMPLETED"
                    )
                  }

                />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ textAlign: 'center', height: '50px' }}>Comments (by Engineering):</td>
              <td colSpan={80} style={{ textAlign: 'center', height: '50px' }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  value={closureComments}
                  onChange={(e) => setClosureComments(e.target.value)}
                  style={{ minHeight: '110px', width: '100%', textAlign: 'left' }}
                  disabled={
                    !(
                      ["ROLE_ENGINEER", "ROLE_CIVIL", "ROLE_MECHANICAL", "ROLE_ELECTRICAL"].includes(roleauth) &&
                      editResponse?.accepterStatus === "RECEIVER_ACCEPTED" &&
                      editResponse?.receiverstatus !== "RECEIVER_COMPLETED"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ textAlign: 'center', height: '50px' }}>Comments (by Requester):</td>
              <td colSpan={80} style={{ textAlign: 'center', height: '50px' }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  style={{ minHeight: '110px', width: '100%', textAlign: 'left' }}
                  // disabled={editResponse?.hodStatus==="HOD_APPROVED" ||(editResponse?.receiverstatus !== "RECEIVER_COMPLETED" && editResponse?.requesterStatus==="REQUESTER_SUBMIT")}  
                  disabled={!(["ROLE_HOD"].includes(roleauth) && editResponse?.receiverstatus === "RECEIVER_COMPLETED")}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={25} style={{ width: '25%' }}>
                <p>Completed By <br /> (Engineering Department)</p>
                <b>Sign & Date</b>
              </td>
              <td colSpan={25} style={{ width: '25%' }}>
                <textarea
                  className="inp-new"
                  value={receiverSign ? `${receiverSign}\n ${formatDate(receiverSubmiton)}` : ""}
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                />
                {editResponse?.receiverstatus === "RECEIVER_COMPLETED" && getImage1 && (
                  <img className="signature"
                    src={getImage1}
                    alt="signature"
                    style={{
                      display: "block",
                      margin: "0 auto",
                      maxWidth: "100px",
                      maxHeight: "50px"
                    }}
                  />
                )}
              </td>
              <td colSpan={25} style={{ width: '25%' }}>
                <p>Verified By <br /> (User Department)</p>
                <b>Sign & Date</b>
              </td>
              <td colSpan={25} style={{ width: '25%' }}>
                {(editResponse?.supervisor_status === "SUPERVISOR_APPROVED" ||
                  editResponse?.supervisor_status === "SUPERVISOR_REJECTED") && (
                    <textarea
                      className="inp-new"
                      // value={verifier ? `${verifier}\n ${formatedDateVerifier}` : ""}
                      readOnly
                      rows="2"
                      style={{ resize: "none", overflow: "hidden", width: "10%" }}
                    />
                  )}
           
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];



  const renderButtons = () => {
    // Check the status of the work order
    const requesterStatus = editResponse?.requesterStatus;
    const receiverStatus = editResponse?.receiverstatus;
    const hodStatus = editResponse?.hodStatus;

    // HOD actions
    if (roleauth === "ROLE_HOD") {

      if (!editResponse || (Array.isArray(editResponse) && editResponse.length === 0)) {
        return (
          <>
            <Button
              loading={saveLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              onClick={handleSave}
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
              }}
              shape="round"
              onClick={handleSubmit}
              icon={<GrDocumentStore color="#00308F" />}
            >
              &nbsp;Submit
            </Button>
          </>
        );
      }
      // If the work order is in INITIAL status
      if (requesterStatus === "REQUESTER_SAVED") {
        return (
          <>
            <Button
              loading={saveLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              onClick={handleSave}
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
              }}
              shape="round"
              onClick={handleSubmit}
              icon={<GrDocumentStore color="#00308F" />}
            >
              &nbsp;Submit
            </Button>
          </>
        );
      }

      // If the work order is COMPLETED, show Approve button
      if (receiverStatus === "RECEIVER_COMPLETED" && hodStatus === "WAITING_FOR_APPROVAL") {
        return (
          <Button
            loading={approveLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            onClick={handleApprove}
            icon={<IoCheckmarkDone color="#00308F" />}
          >
            &nbsp;Approve
          </Button>
        );
      }
    }

    // Engineering roles actions
    if (["ROLE_ENGINEER", "ROLE_CIVIL", "ROLE_MECHANICAL", "ROLE_ELECTRICAL"].includes(roleauth)) {
      // If the work order is submitted and waiting for acceptance
      if (receiverStatus === "WAITING_FOR_APPROVAL") {
        return (
          <Button
            loading={acceptLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            onClick={handleAccept}
            icon={<IoCheckmarkDone color="#00308F" />}
          >
            &nbsp;Accept
          </Button>
        );
      }

      // If the work order is accepted, show Complete button
      // if (accepterStatus === "RECEIVER_ACCEPTED") {
      if (accepterStatus === "RECEIVER_ACCEPTED" && receiverStatus !== "RECEIVER_COMPLETED") {
        return (
          <Button
            loading={completeLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            onClick={handleComplete}
            icon={<IoCheckmarkDone color="#00308F" />}
          >
            &nbsp;Complete
          </Button>
        );
      }
    }

    return null;
  };




  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="WORK ORDER REQUEST FORM"
        formatNo="PH-ENG01/FC-020"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }

        buttonsArray={[


          renderButtons(),


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
      <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
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
          //onChange={onChange}
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

export default Engineering_FC020;
