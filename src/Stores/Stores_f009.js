/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
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
  Modal,
} from "antd";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const Stores_f009 = () => {
  const { state } = useLocation();
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [remarks, setRemarks] = useState("");
  const [duration, setDuration] = useState("");
  const [storeInChargeStatus, setStoreInChargeStatus] = useState("");
  const [operatorStatus, setOperatorStatus] = useState("");

  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [incharge, setIncharge] = useState("");
  const [inchargeDate, setInchargeDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showerPullRodCondition, setShowerPullRodCondition] = useState("");
  const [pushBoardCondition, setPushBoardCondition] = useState("");
  const [waterFlow, setWaterFlow] = useState("");
  const [performedBy, setPerformedBy] = useState("");
  const [verifiedBy, setVerifiedBy] = useState("");
  const [supervisorStatus, setSupervisorStatus] = useState("");
  // console.loglog("date,", state.date);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/Stores/F-009/Summary");
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
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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

  const date1 = formatDateUser(date);
  const formattedInchargeDate = formatDate(inchargeDate);
  const formatedDateOperator = formatDate(operatorDate);
  const formattedDateHod = formatDate(hodDate);

  const getMonthNameFromDate = (dateString) => {
    const months = [
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

    const date = new Date(dateString);

    const monthIndex = date.getMonth();

    return months[monthIndex];
  };
  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const monthSelected = getMonthNameFromDate(state.date);

  const yearSelected = getYearFromDate(state.date);

  const token = localStorage.getItem("token");
  // console.loglog(token);
  console.log("invoiceNO", state.invoiceNo);
  useEffect(() => {
    fetchBmrOptions();
  }, []);
  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/Store/getEyeWashChecklistCheckList?date=${state.date}`,
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
        setShowerPullRodCondition(data[0].showerPullRod);
        setPushBoardCondition(data[0].pushboard);
        setWaterFlow(data[0].waterflow);
        setRemarks(data[0].remarks);
        setEditResponse(data[0]);
        setStoreInChargeStatus(data[0].store_in_charge_status);
        setOperatorStatus(data[0].operator_status);
        setOperator(data[0].operator_sign);
        setIncharge(data[0].store_in_charge_sign);
        setInchargeDate(data[0].store_in_charge_submit_on);
        setOperatorDate(data[0].operator_submit_on);
        setId(data[0].id);
        setDate(data[0].date);
        setYear(data[0].year);
        setMonth(data[0].month);
        console.log("data[0].showerPullRod", data[0].showerPullRod);
        // Set the conditions based on data
      }

      // if (roleauth === "STORE_INCHARGE") {
      //   // console.loglog("Supervisor Role Detected");
      //   // console.loglog("Supervisor Status:", data?.supervisor_status);
      //   // console.loglog("HOD Status:", data?.hod_status);

      //   if (data?.store_in_charge_status === "STORE_INCHARGE") {
      //     message.warning(
      //       "Operator Not Yet Approved or Previous Stage Rejected"
      //     );
      //     setTimeout(() => {
      //       navigate("/Precot/Stores/F-009/Summary");
      //     }, 1500);
      //   }
      // }

      if (roleauth === "STORE_INCHARGE") {
        if (data[0]?.operator_status !== "OPERATOR_APPROVED" ||
          data[0]?.store_in_charge_status === "INCHARGE_REJECTED") {
          message.warning(
            "Operator Not Yet Approved"
          );
          setTimeout(() => {
            navigate("/Precot/Stores/F-009/Summary");
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };

  
  const canDisplayButtons = () => {
    if (roleauth === "STORE_OPERATOR") {
      // Operator approved and incharge rejected => show submit button
      if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "block"; // Show submit button
      }

      // Operator approved and incharge still pending or approved => hide submit button
      if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        (editResponse?.store_in_charge_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.store_in_charge_status === "INCHARGE_APPROVED")
      ) {
        return "none"; // Hide submit button
      }

      return "block"; // By default, show submit button
    } else if (roleauth === "STORE_INCHARGE") {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth === "STORE_OPERATOR") {
      if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        (editResponse?.store_in_charge_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.store_in_charge_status === "INCHARGE_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth === "STORE_INCHARGE") {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };
  const canEdit = () => {
    const isOperatorApproved =
      editResponse?.operator_status === "OPERATOR_APPROVED";
    const isInchargeApproved =
      editResponse?.store_in_charge_status === "INCHARGE_APPROVED";
    const isInchargeRejected =
      editResponse?.store_in_charge_status === "INCHARGE_REJECTED";

    if (roleauth === "STORE_OPERATOR") {
      return !isOperatorApproved || isInchargeRejected;
    }

    if (roleauth === "STORE_INCHARGE") {
      return !isOperatorApproved;
    }

    // Default to false (not editable) if none of the conditions match
    return false;
  };


  const isEditable = canEdit();

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = incharge;
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = operator;
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
  }, [editResponse,API.prodUrl, token]);

  // console.loglog(productName);
  // console.loglog("noOfFlagsInRoll", mixing);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Store/EyeWashConditionChecklist/approveOrReject`,
        {
          id: id,
          status: "Approve",
          remarks: "",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.loglog("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Stores/F-009/Summary");
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
    // window.print()
    // console.loglog("print screen works");
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
        `${API.prodUrl}/Precot/api/Store/EyeWashConditionChecklist/approveOrReject`,
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
        navigate("/Precot/Stores/F-009/Summary");
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
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;

    const payload = {
      id: id || null,
      formatName:
        "EYE WASH WITH SHOWER WORKING CONDITION CHECKLIST(CHEMICAL STORE)",
      formatNo: "PH-STR01/F-009",
      revisionNo: "02",
      sopNumber: "PH-STR01-D-02",
      date: state.date,
      showerPullRod: showerPullRodCondition || "NA",
      pushboard: pushBoardCondition || "NA",
      waterflow: waterFlow || "NA",
      unit: "H",
      remarks: remarkToSave,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/Store/EyeWashConditionChecklist/Save`,
        payload,
        {
          headers,
        }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/Stores/F-009/Summary");
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
    return showerPullRodCondition && pushBoardCondition && waterFlow && remarks;
  };

  const handleSubmit = () => {
    // if (!isFormValid()) {
    //   message.error("Please fill all required fields.");
    //   return;
    // }

    setSubmitLoading(true);
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;

    const payload = {
      id: id || null,
      formatName:
        "EYE WASH WITH SHOWER WORKING CONDITION CHECKLIST",
      formatNo: "PH-STR01/F-009",
      revisionNo: "02",
      sopNumber: "PH-STR01-D-02",
      date: state.date,
      showerPullRod: showerPullRodCondition || "NA",
      pushboard: pushBoardCondition || "NA",
      waterflow: waterFlow || "NA",
      unit: "H",
      remarks: remarkToSave,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(` ${API.prodUrl}/Precot/api/Store/EyeWashConditionChecklist/Submit`, payload, {
        headers,
      })
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/Stores/F-009/Summary");
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
      label: <p> Checklist</p>,
      children: (
        <div>
          <table
            align="left"
            style={{
              width: "40%",
              height: "100%",
              margin: "auto",
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <th>Date</th>
              <td>
                <input
                  type="date"
                  value={state.date}
                  disabled
                  style={{ width: "98%", height: "35px" , textAlign:'center'}}
                />
              </td>
            </tr>
            <tr>
              <th style={{ height: "55px", textAlign: "left" }}>
                Shower Pull Rod Condition
              </th>
              <td style={{paddingLeft:'40px', wordSpacing:'5px',alignContent:'space-evenly'}}>
                <Radio.Group
                  value={showerPullRodCondition}
                  onChange={(e) => setShowerPullRodCondition(e.target.value)}
                  disabled={!isEditable}
                >
                  <Radio value="TICK">&#x2713;</Radio>
                  <Radio value="CROSS">&#x2715;</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>

            <tr>
              <th style={{ height: "55px", textAlign: "left" }}>
                Push Board Condition
              </th>
              <td style={{paddingLeft:'40px', wordSpacing:'5px',alignContent:'space-evenly'}}>
                {" "}
                <Radio.Group
                  value={pushBoardCondition}
                  onChange={(e) => setPushBoardCondition(e.target.value)}
                  disabled={!isEditable}
                  style={{display:'flex',alignContent:'space-evenly'}}
                >
                  <Radio  value="TICK">&#x2713;</Radio>
                  <Radio value="CROSS">&#x2715;</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>

            <tr>
              <th style={{ height: "55px", textAlign: "left" }}>Water Flow</th>
              <td style={{paddingLeft:'40px', wordSpacing:'5px',alignContent:'space-evenly'}}>
                {" "}
                <Radio.Group
                  value={waterFlow}
                  onChange={(e) => setWaterFlow(e.target.value)}
                  disabled={!isEditable}
                >
                  <Radio value="TICK">&#x2713;</Radio>
                  <Radio value="CROSS">&#x2715;</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p> Remarks </p>,
      children: (
        <div>
          <table align="left" style={{ width: 500, alignItems: "left" }}>
            <p>Remarks</p>
            <Input.TextArea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              style={{ width: 600, height: 100 }}
              disabled={!isEditable}
            />
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Review</p>,
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
                <p>Performed By </p>
                <b>Sign & Date</b>
              </td>
              <td
                style={
                  {
                    // borderRight: "none",
                  }
                }
              >
                {editResponse?.operator_status === "OPERATOR_APPROVED" &&
                  getImage2 && (
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
             
                <textarea
                  className="inp-new"
                  value={
                    operator ? `${operator}\n ${formatedDateOperator}` : ""
                  }
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid ",
                }}
              >
                <p>Verified By </p>
                <b>Sign & Date</b>
              </td>
              <td>
                {(editResponse?.store_in_charge_status ===
                  "INCHARGE_APPROVED" ||
                  editResponse?.store_in_charge_status ===
                    "INCHARGE_REJECTED") &&
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
              
                <p style={{ textAlign: "center" }}></p>
                {(editResponse?.store_in_charge_status ===
                  "INCHARGE_REJECTED" ||
                  editResponse?.store_in_charge_status ===
                    "INCHARGE_APPROVED") && (
                  <textarea
                    className="inp-new"
                    value={
                      incharge ? `${incharge}\n ${formattedInchargeDate}` : ""
                    }
                    readOnly
                    rows="2"
                    style={{ resize: "none", overflow: "hidden" }}
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
        formName="EYE WASH WITH SHOWER WORKING CONDITION CHECKLIST (CHEMICAL STORE)"
        formatNo="PH- STR01/F-009"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "STORE_INCHARGE" ? (
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
              <Button
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
              </Button>
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
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
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

export default Stores_f009;
