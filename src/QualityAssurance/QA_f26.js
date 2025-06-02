/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Input, message, Modal, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
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
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f26 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [DetailsByParam, setDetailsByParam] = useState("");
  const [Id, setId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const dateObject = new Date(date);
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();
  const [showModal, setShowModal] = useState(false);
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [productName, setProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [poNoAndDate, setPoNoAndDate] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [reason, setReason] = useState("");
  const [ManufacturingDate, setManufacturingDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantityProced, setQuantityProced] = useState("");
  const [totalShippedQty, setTotalShippedQty] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const [containedNo, setContainedNo] = useState("");
  const [QtyInFG, setQuantityInFG] = useState("");
  const [QtyReceived, setQtyReceived] = useState("");
  const [QuantitySold, setQuantitySold] = useState("");
  const [QuantityUndistributed, setQuantityUndistributed] = useState("");
  const [membersPresent, setMembersPresent] = useState("");
  const [informedToCustomer, setInformedToCustomer] = useState("");
  const [QtyInDepot, setQtyInDepot] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [furtherAction, setFutherAction] = useState("");
  const [conclusion, setConclusion] = useState("");

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
  const monthName = monthNames[monthIndex];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const disabled =
    (role === "ROLE_QA" &&
      DetailsByParam?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
      DetailsByParam?.manager_status === "WAITING_FOR_APPROVAL") ||
    DetailsByParam?.manager_status === "MANAGER_APPROVED" ||
    (role === "QA_MANAGER" &&
      (DetailsByParam?.manager_status === "WAITING_FOR_APPROVAL" ||
        DetailsByParam?.manager_status === "MANAGER_APPROVED" ||
        DetailsByParam?.manager_status === "MANAGER_REJECTED")) ||
    (role === "ROLE_MR" &&
      (DetailsByParam?.manager_status === "WAITING_FOR_APPROVAL" ||
        DetailsByParam?.manager_status === "MANAGER_APPROVED" ||
        DetailsByParam?.manager_status === "MANAGER_REJECTED")) ||
    (role === "ROLE_DESIGNEE" &&
      (DetailsByParam?.manager_status === "WAITING_FOR_APPROVAL" ||
        DetailsByParam?.manager_status === "MANAGER_APPROVED" ||
        DetailsByParam?.manager_status === "MANAGER_REJECTED"));

  const canDisplayButtons = () => {
    if (role == "ROLE_QA") {
      if (
        DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
        DetailsByParam?.manager_status == "MANAGER_REJECTED"
      ) {
        return "block";
      } else if (
        (DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
          DetailsByParam?.manager_status == "WAITING_FOR_APPROVAL") ||
        DetailsByParam?.manager_status == "MANAGER_APPROVED"
      ) {
        return "none";
      }
    } else if (
      role == "QA_MANAGER" ||
      role == "ROLE_MR" ||
      role == "ROLE_DESIGNEE"
    ) {
      if (
        DetailsByParam?.manager_status == "MANAGER_APPROVED" ||
        DetailsByParam?.manager_status == "MANAGER_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_QA") {
      if (
        DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
        DetailsByParam?.manager_status == "MANAGER_REJECTED"
      ) {
        return "none";
      } else if (
        DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
        (DetailsByParam?.manager_status == "WAITING_FOR_APPROVAL" ||
          DetailsByParam?.manager_status == "MANAGER_APPROVED")
      ) {
        return "none";
      }
    } else if (
      role == "QA_MANAGER" ||
      role == "ROLE_MR" ||
      role == "ROLE_DESIGNEE"
    ) {
      if (
        DetailsByParam?.manager_status == "MANAGER_APPROVED" ||
        DetailsByParam?.manager_status == "MANAGER_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        DetailsByParam?.manager_status == "MANAGER_APPROVED" ||
        DetailsByParam?.manager_status == "MANAGER_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  // Formated Date's

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.qa_inspector_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {});
    }
  }, [DetailsByParam, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.manager_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {});
    }
  }, [DetailsByParam, API.prodUrl, token]);

  const handleKeyDown = (e) => {
    const isAlphanumeric = /^[a-zA-Z.,]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z.,0-9]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownNum = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  const handleSave = async () => {
    try {
      await SaveRecord();
    } catch (error) {
      console.error("Error saving Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitRecord();
    } catch (error) {
      console.error("Error submitting Record..", error);
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
        `${API.prodUrl}/Precot/api/QA/Service/ApproveOrRejectTemplate`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-26/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/ApproveOrRejectTemplate`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-26/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  const handleRejectModal = () => {
    setShowModal(true);
  };

  const SaveRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "TEMPLATE FOR RECALL / MOCK RECALL",
        formatNo: "PH-QAD01-F-026",
        revisionNo: 1,
        refSopNo: "PH-QAD01-D-24",
        unit: "H",
        id: Id,
        date: date,
        month: monthName,
        year: year,
        product_name: productName,
        customer_name: customerName,
        po_no_and_date: poNoAndDate,
        lot_no: lotNo,
        reason_for_recall: reason,
        manufacturing_date: ManufacturingDate,
        expiry_date: expiryDate,
        quality_produced: quantityProced,
        total_shipped_qty: totalShippedQty,
        dispatch_date: dispatchDate,
        container_no: containedNo,
        qty_in_fg: QtyInFG,
        qty_received: QtyReceived,
        qty_sold: QuantitySold,
        qty_undistributed: QuantityUndistributed,
        members_present: membersPresent,
        informed_to_customer: informedToCustomer,
        qty_in_depot: QtyInDepot,
        time_taken_to_trace: timeTaken,
        further_action: furtherAction,
        conclusuion: conclusion,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SaveTemplate`,
        payload,
        { headers }
      );
      setTimeout(() => {
        navigate("/Precot/QA/F-26/Summary");
      }, 1500);
      message.success("Record Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to save Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitRecord = async () => {
    setSubmitLoading(true);
    if (ManufacturingDate == "null" || ManufacturingDate == "") {
      message.warning("Manufacturing Date Required");
      setSubmitLoading(false);
      return;
    }
    if (expiryDate == "null" || expiryDate == "") {
      message.warning("Expiry Date Required");
      setSubmitLoading(false);
      return;
    }
    if (dispatchDate == "null" || dispatchDate == "") {
      message.warning("Dispatch Date Required");
      setSubmitLoading(false);
      return;
    }

    try {
      const payload = {
        formatName: "TEMPLATE FOR RECALL / MOCK RECALL",
        formatNo: "PH-QAD01-F-026",
        revisionNo: 1,
        refSopNo: "PH-QAD01-D-24",
        unit: "H",
        id: Id,
        date: date,
        month: monthName,
        year: year,
        product_name: productName || "NA",
        customer_name: customerName || "NA",
        po_no_and_date: poNoAndDate || "NA",
        lot_no: lotNo || "NA",
        reason_for_recall: reason || "NA",
        manufacturing_date: ManufacturingDate || "NA",
        expiry_date: expiryDate || "NA",
        quality_produced: quantityProced || "NA",
        total_shipped_qty: totalShippedQty || "NA",
        dispatch_date: dispatchDate || "NA",
        container_no: containedNo || "NA",
        qty_in_fg: QtyInFG || 0,
        qty_received: QtyReceived || 0,
        qty_sold: QuantitySold || 0,
        qty_undistributed: QuantityUndistributed || 0,
        members_present: membersPresent || "NA",
        informed_to_customer: informedToCustomer || "NA",
        qty_in_depot: QtyInDepot || 0,
        time_taken_to_trace: timeTaken || 0,
        further_action: furtherAction || "NA",
        conclusuion: conclusion || "NA",
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SubmitTemplate`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-26/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to submit Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-26/Summary");
  };

  useEffect(() => {
    fetchDetailsByParam();
  }, []);

  const fetchDetailsByParam = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/getTemplate?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setDetailsByParam(response.data[0]);
      if (response.data && response.data.length !== 0) {
        setId(response.data[0].id);
        setProductName(response.data[0].product_name);
        setCustomerName(response.data[0].customer_name);
        setPoNoAndDate(response.data[0].po_no_and_date);
        setLotNo(response.data[0].lot_no);
        setReason(response.data[0].reason_for_recall);
        setManufacturingDate(response.data[0].manufacturing_date);
        setExpiryDate(response.data[0].expiry_date);
        setQuantityProced(response.data[0].quality_produced);
        setTotalShippedQty(response.data[0].total_shipped_qty);
        setDispatchDate(response.data[0].dispatch_date);
        setContainedNo(response.data[0].container_no);
        setQuantityInFG(response.data[0].qty_in_fg);
        setQtyReceived(response.data[0].qty_received);
        setQuantitySold(response.data[0].qty_sold);
        setQuantityUndistributed(response.data[0].qty_undistributed);
        setMembersPresent(response.data[0].members_present);
        setInformedToCustomer(response.data[0].informed_to_customer);
        setQtyInDepot(response.data[0].qty_in_depot);
        setTimeTaken(response.data[0].time_taken_to_trace);
        setFutherAction(response.data[0].further_action);
        setConclusion(response.data[0].conclusuion);
      }

      if (
        ((role == "QA_MANAGER" ||
          role == "ROLE_MR" ||
          role == "ROLE_DESIGNEE") &&
          response.data[0]?.qa_inspector_status != "QA_INSPECTOR_APPROVED") ||
        ((role == "QA_MANAGER" ||
          role == "ROLE_MR" ||
          role == "ROLE_DESIGNEE") &&
          response.data[0]?.manager_status == "MANAGER_REJECTED")
      ) {
        message.error("QA Inspector Not Yet Approved");
        setTimeout(() => {
          navigate("/Precot/QA/F-26/Summary");
        }, 1500);
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Details</p>,
      children: (
        <div>
          <table
            style={{
              width: "107%",
              margin: "auto",
              tableLayout: "fixed",
              marginTop: "30px",
            }}
          >
            <tr>
              <th style={{ textAlign: "center", height: "20px" }}>
                Parameters
              </th>
              <th style={{ textAlign: "center" }}>Details</th>
              <th style={{ textAlign: "center" }}>Parameters</th>
              <th style={{ textAlign: "center" }}>Details</th>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>Date</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                <Input
                  value={formattedDate(date)}
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                Manufacturing Date/Julian Date
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setManufacturingDate(e.target.value)}
                  value={ManufacturingDate}
                  max={formattedToday}
                  disabled={disabled}
                  type="date"
                  style={{ width: "100%", textAlign: "center" }}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                Product Name
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                <Input
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  disabled={disabled}
                  type="text"
                  onKeyDown={handleKeyDown}
                  style={{ width: "100%", textAlign: "center" }}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Expiry Date</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setExpiryDate(e.target.value)}
                  value={expiryDate}
                  disabled={disabled}
                  type="date"
                  style={{ width: "100%", textAlign: "center" }}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                Customer Name
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setCustomerName(e.target.value)}
                  value={customerName}
                  disabled={disabled}
                  type="text"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Quantity Produced</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setQuantityProced(e.target.value)}
                  value={quantityProced}
                  disabled={disabled}
                  type="text"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown2}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                PO No. & Date
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setPoNoAndDate(e.target.value)}
                  value={poNoAndDate}
                  disabled={disabled}
                  type="text"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown2}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Total Shipped Qty.</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setTotalShippedQty(e.target.value)}
                  value={totalShippedQty}
                  disabled={disabled}
                  type="text"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown2}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                Lot No. / Batch No.
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setLotNo(e.target.value)}
                  value={lotNo}
                  disabled={disabled}
                  type="text"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown2}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Dispatch Date</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setDispatchDate(e.target.value)}
                  value={dispatchDate}
                  disabled={disabled}
                  type="date"
                  style={{ width: "100%", textAlign: "center" }}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                Reason for (Recall)
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setReason(e.target.value)}
                  value={reason}
                  disabled={disabled}
                  type="text"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Container No.</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setContainedNo(e.target.value)}
                  value={containedNo}
                  disabled={disabled}
                  type="text"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown2}
                />{" "}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Details-2</p>,
      children: (
        <div>
          <table
            style={{
              width: "107%",
              margin: "auto",
              tableLayout: "fixed",
              marginTop: "40px",
            }}
          >
            <tr>
              <th style={{ textAlign: "center", height: "20px" }}>
                Parameters
              </th>
              <th style={{ textAlign: "center" }}>Details</th>
              <th style={{ textAlign: "center" }}>Parameters</th>
              <th style={{ textAlign: "center" }}>Details</th>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                Qty. in FG Warehouse at Precot
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setQuantityInFG(e.target.value)}
                  value={QtyInFG}
                  disabled={disabled}
                  type="number"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDownNum}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Informed to customer</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setInformedToCustomer(e.target.value)}
                  value={informedToCustomer}
                  type="text"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                Qty. Received on purchase invoice
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setQtyReceived(e.target.value)}
                  value={QtyReceived}
                  type="number"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDownNum}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Qty. in Depot (Customer)</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setQtyInDepot(e.target.value)}
                  value={QtyInDepot}
                  type="number"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDownNum}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                Quantity sold (customer)
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setQuantitySold(e.target.value)}
                  value={QuantitySold}
                  type="number"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDownNum}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Time taken to trace</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setTimeTaken(e.target.value)}
                  value={timeTaken}
                  type="number"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDownNum}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                Quantity Undistributed / stock in hand
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setQuantityUndistributed(e.target.value)}
                  value={QuantityUndistributed}
                  type="number"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDownNum}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Further Action</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setFutherAction(e.target.value)}
                  value={furtherAction}
                  disabled={disabled}
                  type="text"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "20px" }}>
                Members present in the meeting
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setMembersPresent(e.target.value)}
                  value={membersPresent}
                  disabled={disabled}
                  type="text"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown2}
                />{" "}
              </td>
              <td style={{ textAlign: "center" }}>Conclusion</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => setConclusion(e.target.value)}
                  value={conclusion}
                  disabled={disabled}
                  type="text"
                  onKeyDown={handleKeyDown}
                  style={{ width: "100%", textAlign: "center" }}
                />{" "}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "80%", margin: "auto", marginTop: "30px" }}>
            <tr>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                QA - Inspector Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                QA Manager, Designee or MR Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {DetailsByParam?.qa_inspector_status ===
                  "QA_INSPECTOR_APPROVED" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{DetailsByParam?.qa_inspector_sign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.qa_inspector_submitted_on
                          )}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="MR/QA Manager Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {(DetailsByParam?.manager_status === "MANAGER_APPROVED" ||
                  DetailsByParam?.manager_status === "MANAGER_REJECTED") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{DetailsByParam?.manager_sign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.manager_submitted_on
                          )}
                        </div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="MR/QA Manager/Designee Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
            </tr>
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
        formName="Template For Recall / Mock Recall"
        formatNo="PH-QAD01-F-026"
        sopNo="PH-QAD01-D-24"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_MR" ||
          role === "ROLE_DESIGNEE" ||
          role === "QA_MANAGER" ? (
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
                loading={submitLoading}
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
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
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

      {/* Unique Param Row*/}
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
          addonBefore="Date:"
          placeholder="Date"
          value={formattedDate(date)}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="Month:"
          placeholder="month"
          value={monthName}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="Year:"
          placeholder="year"
          value={year}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
      </div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
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
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default QA_f26;
