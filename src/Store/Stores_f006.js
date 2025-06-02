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
  InputNumber,
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
import { DeleteOutlined, PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
const Stores_f006 = () => {
  const { state } = useLocation();
  const today = new Date().toISOString().split("T")[0];
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [gatePassNo, setGatePassNo] = useState("");
  const [goodsSentTo, setGoodsSentTo] = useState("");
  const [address, setAddress] = useState("");
  const [transporterName, setTransporterName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [goodsId, setGoodsId] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reasonForSendingOut, setReasonForSendingOut] = useState("");
  const [remarks, setRemarks] = useState("");
  const [storeInChargeStatus, setStoreInChargeStatus] = useState("");
  const [incharge, setIncharge] = useState("");
  const [hod, setHod] = useState("");
  const [date, setDate] = useState("");
  const [inchargeDate, setInchargeDate] = useState("");
  const [hodDate, setHodDate] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/Stores/F-006/Summary");
  };
  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");

  const [rows, setRows] = useState([
    { Sno: "", Description: "", Quantity: "", Reason: "", Remarks: "" },
  ]);
  const [addrows, setAddrows] = useState(false);
  const addRow = () => {
    setAddrows(true);
    setRows([
      ...rows,
      { Sno: "", Description: "", Quantity: "", Reason: "", Remarks: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleNumberInput = (index, field, value) => {
    
    if (!isNaN(value) && value.trim() !== "") {
      handleInputChange(index, field, value);
    }
  };

  const removeRow = (index) => {
    const newRows = rows.filter((row, rowIndex) => rowIndex !== index);
    setRows(newRows);
  };

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
  const date1 = formatDateUser(date);
  const formattedInchargeDate = formatDate(inchargeDate);
  const formattedHodDate = formatDate(hodDate);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    fetchBmrOptions();
  }, []);
  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${ API.prodUrl}/Precot/api/Store/getGatePass?gatePassNo=${state.gatePassNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("edit data", data);

      if (data) {
        setEditResponse(data[0]);
        setId(data[0].id);
        setDate(data[0].date);
        setGatePassNo(data[0].gatePassNo);
        setGoodsSentTo(data[0].goodsSentTo);
        setAddress(data[0].address);
        setTransporterName(data[0].transporterName);
        setVehicleNo(data[0].vehicleNo);

        
        if (data[0].goodsDetails && data[0].goodsDetails.length > 0) {
          const goodsDetail = data[0].goodsDetails[0];
          setGoodsId(goodsDetail.id);
          setDescription(goodsDetail.description);
          setQuantity(goodsDetail.quantity);
          setReasonForSendingOut(goodsDetail.reasonForSendingOut);
          setRemarks(goodsDetail.remark);
        }
        setRows(
          data[0].goodsDetails
            .filter(
              (product) =>
                product.description ||
                product.quantity ||
                product.reasonForSendingOut !== null ||
                product.remark !== null
            )
            .map((product) => ({
              id: product.id,
              Sno: product.Sno,
              Description: product.description,
              Quantity: product.quantity,
              Reason: product.reasonForSendingOut,
              Remarks: product.remark,
            }))
        );
        setStoreInChargeStatus(data[0].storeInchargeStatus);
        setIncharge(data[0].storeInchargeSign);
        setInchargeDate(data[0].storeInchargeSubmitOn);
        setHod(data[0].hod_sign);
        setHodDate(data[0].hod_submit_on);
      }
      if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
        if (data[0]?.hod_status === "HOD_REJECTED") {
          message.warning("Store Incharge or Dispatch Supervisor Not Yet Approved");
          setTimeout(() => {
            navigate("/Precot/Stores/F-006/Summary");
          }, 1500);
        }
      }
      
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "STORE_INCHARGE" || roleauth === "DISPATCH_SUPERVISOR") {
      if (
        editResponse?.storeInchargeStatus === "INCHARGE_APPROVED" &&
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        return "block"; 
      } else if (
        editResponse?.storeInchargeStatus === "INCHARGE_APPROVED" &&
        (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.hod_status === "HOD_APPROVED")
      ) {
        return "none"; 
      }
    } else if (roleauth === "ROLE_HOD") {
      if (
        editResponse?.hod_status === "HOD_APPROVED" ||
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        return "none"; 
      }
      return "block"; 
    } else {
      if (
        editResponse?.hod_status === "HOD_APPROVED" ||
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        return "none"; 
      }
      return "block"; 
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth === "STORE_INCHARGE" || roleauth === "DISPATCH_SUPERVISOR" ) {
      if (
        editResponse?.storeInchargeStatus === "INCHARGE_APPROVED" &&
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        return "none"; 
      } else if (
        editResponse?.storeInchargeStatus === "INCHARGE_APPROVED" &&
        (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.hod_status === "HOD_APPROVED")
      ) {
        return "none"; 
      }
    } else if (roleauth === "ROLE_HOD") {
      if (
        editResponse?.hod_status === "HOD_APPROVED" ||
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        return "none"; 
      }
      return "block"; 
    } else {
      if (
        editResponse?.hod_status === "HOD_APPROVED" ||
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        return "none"; 
      }
      return "block"; 
    }
  };

  const canEdit = () => {
    const isInchargeApproved =
      editResponse?.storeInchargeStatus === "INCHARGE_APPROVED";
    const isHodRejected = editResponse?.hod_status === "HOD_REJECTED";
    if (roleauth === "STORE_INCHARGE" || "DISPATCH_SUPERVISOR") {
      return isHodRejected || !isInchargeApproved; 
    }
    return false;
  };

  const isEditable = canEdit();

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = incharge;
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
          setGetImage(url);
        })
        .catch((err) => {
          
        });
    }
  }, [editResponse, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hod;
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
          setGetImage1(url);
        })
        .catch((err) => {
          
        });
    }
  }, [editResponse, API.prodUrl, token]);



  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    };

    const res = await axios
      .post(
        `${ API.prodUrl}/Precot/api/Store/Gatepass/approveOrReject`,
        {
          id: id,
          status: "Approve",
          remarks: "",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        
        
        message.success(res.data.message);
        navigate("/Precot/Stores/F-006/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        
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
      .post(
        `${ API.prodUrl}/Precot/api/Store/Gatepass/approveOrReject`,
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
        navigate("/Precot/Stores/F-006/Summary");
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
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;

    const payload = {
      id: id || null,
      formatName: "NON-RETURNABLE GATE PASS",
      formatNo: "PH- STR01/F-006",
      revisionNo: "02",
      refSopNo: "PH-STR01-D-02",
      date: date,
      unit: "H",
      gatePassNo: state.gatePassNo,
      goodsSentTo: goodsSentTo,
      address: address,
      transporterName: transporterName,
      vehicleNo: vehicleNo,      
      goodsDetails: rows.map((row, index) => ({
        id: row.id || null,
        sno: index + 1,
        description: row.Description,
        quantity: row.Quantity,
        reasonForSendingOut: row.Reason,
        remark: row.Remarks,
      })),
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${ API.prodUrl}/Precot/api/Store/Gatepass/Save`, payload, {
        headers,
      })
      .then((res) => {
        
        message.success("Sucessfully Saved");
        navigate("/Precot/Stores/F-006/Summary");
      })
      .catch((err) => {
        
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const isFormValid = () => {
    return (
      goodsSentTo &&
      address &&
      transporterName &&
      vehicleNo &&
      // description &&
      // quantity &&
      // reasonForSendingOut &&
      date
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      message.error("Please fill all required fields.");
      return;
    }

    setSubmitLoading(true);
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;

    const payload = {
      id: id || null,
      formatName: "NON-RETURNABLE GATE PASS",
      formatNo: "PH- STR01/F-006",
      revisionNo: "02",
      refSopNo: "PH-STR01-D-02",
      date: date,
      unit: "H",
      gatePassNo: state.gatePassNo,
      goodsSentTo: goodsSentTo,
      address: address,
      transporterName: transporterName,
      vehicleNo: vehicleNo,
      goodsDetails: rows.map((row, index) => ({
        id: row.id || null,
        sno: index + 1,
        description: row.Description,
        quantity: row.Quantity,
        reasonForSendingOut: row.Reason,
        remark: row.Remarks,
      })),
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(` ${ API.prodUrl}/Precot/api/Store/Gatepass/Submit`, payload, {
        headers,
      })
      .then((res) => {
        message.success("Sucessfully submitted");
        navigate("/Precot/Stores/F-006/Summary");
      })
      .catch((err) => {
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  
  const handleQuantity = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z0-9. ]*$/.test(inputValue)) {
      setQuantity(inputValue);
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Details</p>,
      children: (
        <table
          align="left"
          style={{ width: "50%", alignItems: "left", borderSpacing: "10px" }} 
        >
          {/* Row 1: Goods sent to and Address */}
          <tr>
            <td
              style={{
                width: "50%",
                verticalAlign: "top",
              }}
              colSpan={20}
            >
              <label>Goods sent to:</label>
              <Input.TextArea
                className="inp-new"
                style={{ width: "100%", minHeight: "100px", textAlign: "left" }}
                maxLength={200}
                value={goodsSentTo}
                onChange={(e) => setGoodsSentTo(e.target.value)}
                disabled={!isEditable}
              />
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "50%",
                verticalAlign: "top",
              }}
              colSpan={20}
            >
              <label>Address:</label>
              <Input.TextArea
                className="inp-new"
                style={{ width: "100%", minHeight: "100px", textAlign: "left" }}
                maxLength={200}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditable}
              />
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "50%",
                height: "35px",
                textAlign: "left",
                paddingRight: "10px",
              }}
              colSpan={10}
            >
              Name of the Transporter:
            </td>
            <td colSpan={10} style={{ width: "50%", paddingLeft: "10px" }}>
              <input
                className="inp-new"
                type="text"
                style={{ width: "100%" }}
                value={transporterName}
                onChange={(e)=>setTransporterName( e.target.value)}
                disabled={!isEditable}
              />
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "50%",
                height: "35px",
                textAlign: "left",
                paddingRight: "10px",
              }}
              colSpan={10}
            >
              Vehicle No.:
            </td>
            <td style={{ width: "50%", paddingLeft: "10px" }} colSpan={10}>
              <input
                className="inp-new"
                type="text"
                style={{ width: "100%" }}
                value={vehicleNo}
                onChange={(e)=>setVehicleNo(e.target.value)}
                disabled={!isEditable}
              />
            </td>
          </tr>
        </table>
      ),
    },
    {
      key: "2",
      label: <p>Goods</p>,
      children: (
        <div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  S. No.
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Description of Goods
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Quantity with Unit
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Reason for Sending Out
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Remark
                </th>
              </tr>
            </thead>
            <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </td>

                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <Input.TextArea
                    className="inp-new"
                    
                    style={{
                      
                      
                      textAlign: "center",
                      
                      boxSizing: "border-box",
                    }}
                    placeholder="Enter description of goods"
                    value={row.Description}
                    onChange={(e) =>
                      handleInputChange(index, "Description", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {/* <InputNumber
                    className="inp-new"
                    style={{
                      width: "100%",
                      height: "170px",
                      textAlign: "center",
                      paddingTop: "60px",
                      boxSizing: "border-box",
                    }}
                  
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={handleQuantity}
                    type="number"
                    disabled={!isEditable}
                  /> */}
                    <input
                  className="inp-new"
                  value={row.Quantity}
                  placeholder=""
                  onInput={handleQuantity}
                  onChange={(e) =>
                    handleInputChange(index, "Quantity", e.target.value)
                  }
                  disabled={!isEditable}
                />
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <Input
                    className="inp-new"
                    style={{
                      
                      
                      textAlign: "center",
                      
                      boxSizing: "border-box",
                    }}
                    placeholder="Enter reason"
                    value={row.Reason}
                    onChange={(e) =>
                      handleInputChange(index, "Reason", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    
                    
                    verticalAlign: "middle",
                  }}
                >
                  <Input.TextArea
                    className="inp-new"
                    
                    style={{
                      
                      
                      textAlign: "center",
                      
                      boxSizing: "border-box",
                    }}
                    placeholder="Enter remark or Nil"
                    value={row.Remarks}
                    onChange={(e) =>
                      handleInputChange(index, "Remarks", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                {editResponse?.storeInchargeStatus !== "INCHARGE_SAVED" && editResponse?.storeInchargeStatus !== "INCHARGE_APPROVED" && (
                <button
                  onClick={() => removeRow(index)} 
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
                  <DeleteTwoTone  style={{ fontSize: "20px", color: "red" }} />
             
                </button>
                )}
              </tr>
               ))}
            </tbody>
            {editResponse?.storeInchargeStatus !== "INCHARGE_SAVED" && editResponse?.storeInchargeStatus !== "INCHARGE_APPROVED" && (
            <button
              onClick={addRow}
              style={{
                backgroundColor: "green",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                fontSize: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
            )}
          </table>
        </div>
      ),
    },

    {
      key: "3",
      label: <p> Reviews </p>,
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
                <p>Prepared by: </p>
                <b>Sign & Date</b>
              </td>
              <td>
                <br />
                {(editResponse?.storeInchargeStatus === "INCHARGE_APPROVED" ||
                  editResponse?.storeInchargeStatus === "INCHARGE_REJECTED" ||
                  editResponse?.hod_status === "HOD_APPROVED" ||
                  editResponse?.hod_status === "HOD_REJECTED") &&
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
                <textarea
                  className="inp-new"
                  value={
                    incharge ? `${incharge}\n ${formattedInchargeDate}` : ""
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
                <p>Authorized by: </p>
                <b>Sign & Date</b>
              </td>
              <td>
                <br />
                {(editResponse?.hod_status === "HOD_APPROVED" ||
                  editResponse?.hod_status === "HOD_REJECTED") &&
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
                {(editResponse?.hod_status === "HOD_APPROVED" ||
                  editResponse?.hod_status === "HOD_REJECTED") && (
                  <textarea
                    className="inp-new"
                    value={hod ? `${hod}\n ${formattedHodDate}` : ""}
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
        formName="NON-RETURNABLE GATE PASS"
        formatNo="PH- STR01/F-006"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "ROLE_HOD" ? (
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
            rows={4} 
            style={{ width: "100%" }} 
          />
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="GatePass No:"
          placeholder="GatePass No."
          required
          value={state.gatePassNo}
          disabled
          style={{ width: "30%", height: "35px", paddingLeft: "1em" }}
        />
        <Input
          addonBefore="Date:"
          placeholder="date"
          type="date"
          required
          value={date}
          max={today}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "10%", height: "35px" }}
          disabled={!isEditable}
        />
      </div>
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

export default Stores_f006;
