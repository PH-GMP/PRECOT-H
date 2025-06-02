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
const Stores_f001 = () => {
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
  const [inTime, setInTime] = useState('');
  const [outTime, setOutTime] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [invoiceDcNo, setInvoiceDcNo] = useState("");
  const [invoiceNoDate, setInvoiceNoDate] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [securitySignDate, setSecuritySignDate] = useState('');
  const [grnNumber, setGrnNumber] = useState('');
  const [storeInChargeSignDate, setStoreInChargeSignDate] = useState('');
  // console.loglog("date,", state.date);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/Stores/F-001/Summary");
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
  const formattedInchargeDate = formatDate(storeInChargeSignDate);
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
        // /Precot/api/Store/getMetarialInwards?date=2024-12-16
        `${ API.prodUrl}/Precot/api/Store/getMetarialInwards?date=${state.date}`,
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
        const material = data[0];
        setEditResponse(material);
        setInTime(material.intime || '');
        setOutTime(material.outtime || '');
        setVehicleNumber(material.vehicleNumber || '');
        setSupplierName(material.supplierName || '');
        setInvoiceDcNo(material.invoiceDcNo || '');
        // setInvoiceDate(material.invoiceDate || '');
        setItemDescription(material.itemDescription || '');
        setQuantity(material.quantity || '');
        setSecuritySignDate(material.securitySignDate || '');
        setGrnNumber(material.grnNumber || '');
        setId(data[0].id);
        setDate(data[0].date);
        setYear(data[0].year);
        setMonth(data[0].month);
        setIncharge(data[0].store_in_charge_sign);
        setStoreInChargeSignDate(data[0].store_in_charge_submit_on);

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



    if (roleauth === "STORE_INCHARGE") {
      return !isInchargeApproved;
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
  }, [editResponse, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hod;
    if (username) {
      // console.loglog("usernameparams", username);

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
  }, [editResponse, API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = operator;
    if (username) {
      // console.loglog("usernameparams", username);

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
  }, [editResponse, API.prodUrl, token]);

  const handleSave = () => {
    setSaveLoading(true);

    const payload = {
      id: id || null,
      formatName: "MATERIAL INWARD REGISTER",
      formatNo: "PH- STR01/F-001",
      revisionNo: "02",
      sopNumber: "PH-STR01-D-02",
      unit: "H",
      date: state.date,
      intime: inTime,
      outtime: outTime,
      vehicleNumber: vehicleNumber,
      supplierName: supplierName,
      invoiceDcNo: invoiceDcNo,
      itemDescription: itemDescription,
      quantity: quantity,
      securitySignDate: securitySignDate,
      grnNumber: grnNumber,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${ API.prodUrl}/Precot/api/Store/MetarialInwards/Save`,
        payload,
        {
          headers,
        }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/Stores/F-001/Summary");
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
  const getMissingFields = () => {
    const missingFields = [];
    if (!inTime) missingFields.push("Please Provide In Time");
    if (!outTime) missingFields.push("Please Provide Out Time");
    if (!vehicleNumber) missingFields.push("Please Provide Vehicle Number");
    if (!supplierName) missingFields.push("Please Provide Supplier Name");
    if (!invoiceDcNo) missingFields.push("Please Provide Invoice/DC No");
    if (!itemDescription) missingFields.push("Please Provide Item Description");
    if (!quantity) missingFields.push("Please Provide Quantity");
    if (!grnNumber) missingFields.push("Please Provide GRN Number");
    if (!securitySignDate) missingFields.push("Please Provide Security Sign & Date")
    return missingFields;
  };

  const handleSubmit = () => {
    const missingFields = getMissingFields();

    if (missingFields.length > 0) {
      message.error(`Please fill the following fields: ${missingFields.join(", ")}`);
      return;
    }
    setSubmitLoading(true);

    const payload = {
      id: id || null,
      formatName: "MATERIAL INWARD REGISTER",
      formatNo: "PH- STR01/F-001",
      revisionNo: "02",
      sopNumber: "PH-STR01-D-02",
      unit: "H",
      date: state.date,
      intime: inTime,
      outtime: outTime,
      vehicleNumber: vehicleNumber,
      supplierName: supplierName,
      invoiceDcNo: invoiceDcNo,
      itemDescription: itemDescription,
      quantity: quantity,
      securitySignDate: securitySignDate,
      grnNumber: grnNumber,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(` ${ API.prodUrl}/Precot/api/Store/MetarialInwards/Submit`, payload, {
        headers,
      })
      .then((res) => {
        message.success("Sucessfully submitted");
        navigate("/Precot/Stores/F-001/Summary");
      })
      .catch((err) => {
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
              width: "100%",
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
                  style={{ width: "98%", height: "35px", textAlign: 'center' }}
                />
              </td>
            </tr>
            <tr>
              <th>In Time:</th>
              <td><input className="inp-new" style={{ textAlign: "center", height: '35px' }} type="time" value={inTime} onChange={(e) => setInTime(e.target.value)} disabled={!isEditable} /></td>
            </tr>
            <tr>
              <th>Out Time:</th>
              <td><input className="inp-new" style={{ textAlign: "center", height: '35px' }} type="time" value={outTime} onChange={(e) => setOutTime(e.target.value)} disabled={!isEditable} /></td>
            </tr>
            <tr>
              <th>Vehicle Number:</th>
              <td><input className="inp-new" style={{ textAlign: "center", height: '35px' }} type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} disabled={!isEditable} /></td>
            </tr>
            <tr>
              <th>Supplier Name:</th>
              <td><input className="inp-new" style={{ textAlign: "center", height: '35px' }} type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} disabled={!isEditable} /></td>
            </tr>
            <tr>
              <th>Invoice / DC No. and Date</th>
              <td><input className="inp-new" style={{ textAlign: "center", height: '35px' }} type="text" value={invoiceDcNo} onChange={(e) => setInvoiceDcNo(e.target.value)} disabled={!isEditable} /></td>
            </tr>
            <tr>
              <th>Item Description:</th>
              <td><input className="inp-new" style={{ textAlign: "center", height: '35px' }} type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} disabled={!isEditable} /></td>
            </tr>
            <tr>
              <th>Quantity:</th>
              <td><input className="inp-new" style={{ textAlign: "center", height: '35px' }} type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled={!isEditable} /></td>
            </tr>
            <tr>
              <th>GRN Number:</th>
              <td><input className="inp-new" style={{ textAlign: "center", height: '35px' }} type="text" value={grnNumber} onChange={(e) => setGrnNumber(e.target.value)} disabled={!isEditable} /></td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
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
                <p>Security</p>
                <b>Sign & Date</b>
              </td>
              <td>
                <textarea
                  className="inp-new"
                  value={
                    securitySignDate ? `${securitySignDate}` : ""
                  }
                  onChange={(e) => setSecuritySignDate(e.target.value)}
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                  disabled={!isEditable}
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
                <p>Store Incharge  </p>
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
        formName="MATERIAL INWARD REGISTER"
        formatNo="PH- STR01/F-001"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "STORE_INCHARGE" && (
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

export default Stores_f001;
