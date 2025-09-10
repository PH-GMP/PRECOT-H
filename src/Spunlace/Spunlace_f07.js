/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import BleachingHeader from "../Components/BleachingHeader";
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
import axios from "axios";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const Spunlace_f07 = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  // const[loading,setLoading]=useState(false);
  const [operator, setOperator] = useState("");
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [reportId, setReportId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const { state } = useLocation();
  const [operatorDate, setOperatorDate] = useState("");
  // setDate(state.date);
  // console.log("date", state.date);
  // console.log("shift", state.shift);
  // setShift(state.shift);
  const [reportDetails, setReportDetails] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const roleauth = localStorage.getItem("role");
  // console.log("roleauth", roleauth)
  const token = localStorage.getItem("token");
  // const decodedToken = jwtDecode(token);
  const [editResponse, seteditResponse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    }
  useEffect(() => {
    const date = state.date;
    const shift = state.shift;
    const orderNo = state.orderNo;
    // const date = "2024-06-01"; 
    // const shift = "2";
    // console.log("date inside", state.date);
    // console.log("shift inside", state.shift);
    // console.log("orderNo", orderNumber);
    fetchActivity(date, shift, orderNo);
    fetchBmrOptions(date, shift, orderNo);

  }, []);

  const formatDate = (dateStr) => {
    // Check if the date is already in the format dd/MM/yyyy
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


  const formatDates = (dateStr) => {
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
  const formattedDatesupervisor = formatDate(supervisorDate);
  const formatedDateOperator = formatDate(operatorDate);
  const formattedDateHod = formatDate(hodDate);
  const dateformat = formatDates(state.date);
  // console.log("dateformat", dateformat);

 
  const canDisplayButtons = () => {
    if (roleauth === "ROLE_OPERATOR") {
      if (
        editResponse &&
        editResponse.operator_status === "OPERATOR_APPROVED" &&
        editResponse.hod_status !== "HOD_REJECTED" &&
        editResponse.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    }
    else if (roleauth == "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status === "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
          editResponse?.hod_status == "WAITING_FOR_APPROVAL") ||
        editResponse?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      } else if (
        (editResponse?.supervisor_status == "SUPERVISOR_REJECTED" &&
          editResponse?.hod_status == "WAITING_FOR_APPROVAL")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };


  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/RejectionReport/approveOrReject`,
        {
          id: reportId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-07/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/RejectionReport/approveOrReject`,
        {
          id: reportId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-07/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };


  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = supervisior;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hod;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);


  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = operator;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);


  // console.log("get image", getImage);






  const handleBack = () => {
    navigate("/Precot/Spunlace/F-07/Summary");
  };

  const storedOrderNo = localStorage.getItem('orderNo');
  // console.log("Stored orderNo:", storedOrderNo);

  const fetchBmrOptions = async (date, shift, orderNo) => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/spunlace/Service/RejectionReport/getByDateAndShift?date=${date}&shift=${shift}&orderNo=${orderNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log("edit data", data);
      seteditResponse(data);
      setDate(data.date);
      setShift(data.shift);
      setOrderNo(data.orderNo);
      setOperator(data.operator_sign);
      setOperatorDate(data.operator_submit_on);
      setSupervisor(data.supervisor_sign);
      setSupervisorDate(data.supervisor_submit_on);
      setHod(data.hod_sign);
      setHodDate(data.hod_submit_on);
      setReportId(data.reportId);

      if (roleauth === "ROLE_SUPERVISOR") {
        // console.log("Supervisor Role Detected");
        // console.log("Supervisor Status:", data?.supervisor_status);
        // console.log("HOD Status:", data?.hod_status);
  
        if (
          data?.supervisor_status === "SUPERVISOR_REJECTED" ||
          data?.hod_status === "HOD_REJECTED" 
        ) {
          message.warning("Operator Yet to Approved");
          setTimeout(() => {
            navigate('/Precot/Spunlace/F-07/Summary');
          }, 1500);
        }
      }
  
      if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
        if (
          data?.operator_status !== "OPERATOR_APPROVED" ||
          data?.supervisor_status !== "SUPERVISOR_APPROVED" ||
          data?.supervisor_status === "SUPERVISOR_REJECTED" ||
          data?.hod_status === "HOD_REJECTED"
        ) {
          message.warning("Operator Yet to Approved");
          setTimeout(() => {
            navigate('/Precot/Spunlace/F-07/Summary');
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };
  // console.log("reportId", reportId);
  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift;
    }
  };
  const numericShiftValue = convertShiftValue(shift);
  // console.log("numericShiftValue", numericShiftValue)

  const fetchActivity = async (date, shift, orderNo) => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/spulance/splRejection?date=${date}&shift=${convertShiftValue(shift)}&order=${orderNo}`,
        // `${API.prodUrl}/Precot/api/spulance/splRejection?date=2018-03-16&shift=1&order=80002146`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log("edit data", data);
      setReportDetails(data || " ");
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  };




  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newReportDetails = [...reportDetails];
    newReportDetails[index][name] = value;
    setReportDetails(newReportDetails);
  };
  // console.log("date---", date);
  // console.log("shift", shift);
  // console.log("orderNo", orderNo);
  // console.log("state.ordernumber", state.orderNo);

  const orderNumber = localStorage.getItem("orderno");

  // console.log("orderNumber", orderNumber);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    const payload = {
      reportId: reportId || null,
      formatName: "DAILY REJECTION REPORT - SPUNLACE",
      formatNo: "PH-PRD02/F-007",
      revisionNo: 1,
      refSopNo: "PH-PRD02-D-03",
      date: state.date,
      shift: state.shift,
      orderNo: state.orderNo,
      unit: "H",
      reportDetails: reportDetails
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/spunlace/Service/RejectionReport/SubmitDailyRejectionReport`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.log("Response", res.data);
        setSubmitLoading(false);
        message.success("Sucessfully Submitted");
        navigate("/Precot/Spunlace/F-07/Summary");
      })
      .catch((err) => {
        // console.log("Error", err);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  // Calculate the index range for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = reportDetails.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentRecords = Array.isArray(reportDetails) ? reportDetails.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  // Function to handle page change

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const items = [
    {
      key: "1",
      label: <p>Rejection Report </p>,
      children: (
        <div>
          <table align="left" style={{ width: "100%", height: "275%", tablelayout: "fixed", borderCollapse: "collapse" }} pagination={{ pageSize: 5 }}>
            <tr>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>Sl.No</th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>Product Name</th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>Pattern</th>
              <th colspan="10" style={{ height: "35px", textAlign: "center" }}>Order No</th>
              <th colspan="10" style={{ height: "35px", textAlign: "center" }}>Shaft No</th>
              <th colspan="10" style={{ height: "35px", textAlign: "center" }}>Roll No  </th>
              <th colspan="10" style={{ height: "35px", textAlign: "center" }}>Length InMtrs</th>
              <th colspan="10" style={{ height: "35px", textAlign: "center" }}>Net Wt. in Kg</th>
              <th colspan="10" style={{ height: "35px", textAlign: "center" }}>Roll Gsm</th>
              <th colspan="10" style={{ height: "35px", textAlign: "center" }}>Moisture In %</th>
              <th colspan="10" style={{ height: "35px", textAlign: "center" }}>Roll Dia InMm</th>
            </tr>

            {currentRecords.map((detail, index) => (
              <tr key={index}>
                <td colSpan="10" style={{ textAlign: "center" }}>{indexOfFirstRecord + index + 1}</td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="productName" value={detail.customerName || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "left" }} disabled />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="pattern" value={detail.pattern || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "center" }} disabled />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="orderNo" value={detail.orderNo || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "center" }} disabled />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="shaftNo" value={detail.shaftNo || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "center" }} disabled />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="rollNo" value={detail.baleNo || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "center" }} disabled />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="length" value={detail.length || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "center" }} disabled />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="netWt" value={detail.totalWeight || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "center" }} disabled />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="rollGsm" value={detail.gsm || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "center" }} disabled />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="moisture" value={detail.moisture || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "center" }} disabled />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input name="rollDia" value={detail.diameter || 'N/A'} onChange={(e) => handleInputChange(index, e)} style={{ fontSize: "10px", width: "100%", border: "none", textAlign: "center" }} disabled />
                </td>
              </tr>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
              <Button onClick={() => handlePageChange(currentPage - 1)} style={{ border: 'none' }} disabled={currentPage === 1} icon={<LeftOutlined />} />
              <span style={{ margin: '0 15px', fontSize: '12px' }}>{currentPage}</span>
              <Button onClick={() => handlePageChange(currentPage + 1)} style={{ border: 'none' }} disabled={indexOfLastRecord >= reportDetails.length} icon={<RightOutlined />} />
            </div>
          </table>

        </div>

      )
    },
    {
      key: "2",
      label: "Reviews",
      children: (
        <>
          <table align="left" style={{ width: 600, alignItems: "left" }}>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid black "
                }}
              >
                <p>Operator </p>
                <b>Sign & Date</b>
              </td>
              <td
                style={{
                  // borderRight: "none",
                }}
              >
                <textarea
                  className="inp-new"
                  value={operator ? `${operator}\n ${formatedDateOperator}` : ""}
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}

                />
                {editResponse?.operator_status === "OPERATOR_APPROVED" && getImage2 && (
                  <img className="signature"
                    src={getImage2}
                    alt="Operator"
                    style={{
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      margin: "0 auto"
                  }}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid "
                }}
              >
                <p>Production</p>
                <b>Sign & Date</b>
              </td>
              <td>
                <p style={{ textAlign: "center" }}></p>
                {(editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
                editResponse?.supervisor_status === "SUPERVISOR_APPROVED") && (
                <textarea
                  className="inp-new"
                  value={supervisior ? `${supervisior}\n ${formattedDatesupervisor}` : ""}
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                />
                )}
              {(editResponse?.supervisor_status === "SUPERVISOR_APPROVED" ||
                    editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
                    editResponse?.hod_status === "HOD_APPROVED" ||
                    editResponse?.hod_status === "HOD_REJECTED" ) &&
                  getImage && (
                  <img className="signature"
                    src={getImage}
                    alt="logo"
                    style={{
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      margin: "0 auto"
                  }}
                  />
                )}
              </td>

            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                }}
              >
                <p> HOD / Designee</p>
                <b>Sign & Date</b>
              </td>
              <td
                style={{
                  // borderRight: "none",
                }}
              >
                  {( editResponse?.hod_status === "HOD_APPROVED" ||
                    editResponse?.hod_status === "HOD_REJECTED" ) &&( 
                <textarea
                  className="inp-new"
                  value={hod ? `${hod}\n ${formattedDateHod}` : ""}
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                />
                    )}
                {(editResponse?.hod_status === "HOD_APPROVED" ||
                    editResponse?.hod_status === "HOD_REJECTED" ) &&
                  getImage1 && (
                  <img className="signature"
                    src={getImage1}
                    alt="logo"
                    style={{
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      margin: "0 auto"
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
        formName="DAILY REJECTION REPORT - SPUNLACE"
        formatNo="PH-PRD02/F-007"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
          onClick={showDrawer}
          ></Button>
        }

        buttonsArray={[

          roleauth === "ROLE_SUPERVISOR" ||
            roleauth === "ROLE_HOD" ||
            roleauth === "ROLE_QA" ||
            roleauth === "ROLE_QC" ||
            roleauth === "ROLE_DESIGNEE" ? (
            <>
              <Button
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
                icon={ <img src={approveIcon} alt="Approve Icon" />}
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
                  display: canDisplayButtons(),
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
              {/* <Button
                          loading={saveLoading}
                          type="primary"
                          style={{
                            backgroundColor: "#E5EEF9",
                            color: "#00308F",
                            fontWeight: "bold",
                            display: canDisplayButton2(),
                          }}
                          onClick={handleSave}
                          shape="round"
                          icon={<IoSave color="#00308F" />}
                        >
                          &nbsp;Save
                        </Button> */}
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
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
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '50px', marginTop: '20px' }}>
        <Input
          addonBefore="Date:"
          placeholder="Date"
          required
          value={formatDates(state.date)}
          disabled
          style={{ width: '20%', height: '35px' }}
        />
        <Input
          addonBefore="Shift:"
          placeholder="Shift"
          required
          value={state.shift}
          disabled
          style={{ width: '20%', height: '35px' }}
        />
        <Input
          addonBefore="Order No.:"
          placeholder="Order No"
          required
          value={state.orderNo}
          disabled
          style={{ width: '20%', height: '35px' }}
        />
      </div>

      <div style={{ paddingBottom: "2em" }}></div>
      <Row>
        <Tabs
          items={items}
          dataSource={reportDetails}
          pagination={{ pageSize: 5 }}
          bordered
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

export default Spunlace_f07;
