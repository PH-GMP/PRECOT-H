/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from "react";
import BleachingHeader from "../Components/BleachingHeader";
import { IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { BiLock } from "react-icons/bi";
import { Button, Input, Tabs, Tooltip, message, Modal } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../baseUrl.json";
import moment from "moment";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import gif from "../Assests/gif.gif";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { TbMenuDeep } from "react-icons/tb";

const Spunlace_f09 = () => {
  const formatName = "Spunlace Gsm Analysis Report";
  const formatNo = "PH-PRD02/F-009";
  const revisionNo = "01";
  const sopNo = "PH-PRD02-D-03";
  const unit = "UNIT-H";
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [newDate, setNewDate] = useState("");
  // const [shift, setShift] = useState("");
  // const [orderNumber, setOrderNumber] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const [mixing, setMixing] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [materialCode, setMaterialCode] = useState("");
  const [stdGsm, setStdGsm] = useState("");
  const [pattern, setPattern] = useState("");
  const [tableData, setTableData] = useState([
    { shaftNo: "", gsm: [], moisture: [] },
  ]);
  const [reportDetails, setReportDetails] = useState("");
  const [reportId, setreportId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [rows, setRows] = useState([{}]);
  const handleKeyDown = (e) => {
    // Prevent negative values and letters
    if (e.key === "-" || e.key === "+" || e.key === "e") {
      e.preventDefault();
    }
  };

  const token = localStorage.getItem("token");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const userName = localStorage.getItem("username");
  const navigate = useNavigate();
  const { state } = useLocation();
  const roleauth = localStorage.getItem("role");

  const formattedDate = () => {
    if (reportDetails?.hod_submit_on) {
      const date = moment(reportDetails?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDatesupervisor = () => {
    if (reportDetails?.supervisor_submit_on) {
      const date = moment(reportDetails?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = reportDetails?.supervisor_sign;
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
  }, [reportDetails,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = reportDetails?.hod_sign;
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
  }, [reportDetails,API.prodUrl, token]);

  const handleRejectModal = () => {
    setShowModal(true);
    // console.log("print screen works");
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/SpunlaceGsmAnalysisReport/approveOrReject`,
        {
          id: reportId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-09/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/SpunlaceGsmAnalysisReport/approveOrReject`,
        {
          id: reportId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res);
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-09/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        reportDetails?.supervisor_status == "SUPERVISOR_APPROVED" &&
        reportDetails?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (reportDetails?.supervisor_status == "SUPERVISOR_APPROVED" &&
          reportDetails?.hod_status == "WAITING_FOR_APPROVAL") ||
        reportDetails?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        reportDetails?.hod_status == "HOD_APPROVED" ||
        reportDetails?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        reportDetails?.hod_status == "HOD_APPROVED" ||
        reportDetails?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        reportDetails?.supervisor_status == "SUPERVISOR_APPROVED" &&
        reportDetails?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        reportDetails?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (reportDetails?.hod_status == "WAITING_FOR_APPROVAL" ||
          reportDetails?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        reportDetails?.hod_status == "HOD_APPROVED" ||
        reportDetails?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        reportDetails?.hod_status == "HOD_APPROVED" ||
        reportDetails?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  // ----------------

  const [reportData, setreportData] = useState(null);

  const handleBack = () => {
    navigate("/Precot/Spunlace/F-09/Summary");
  };

  const { shift, date, orderNumber } = state || {};
  // console.log("values from summary",date, shift,orderNumber);

  useEffect(() => {
    fetchOrderDetails();
    fetchReportDetails();
    fetchDetailsByDateShiftOrderNo();
  }, []);

  const fetchDetailsByDateShiftOrderNo = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/Service/SpunlaceGsmAnalysisReport/getByDateShiftOrderNo?date=${date}&shift=${shift}&orderNo=${orderNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response (details based on date)", response.data);
      // console.log("Supervisor Sign:", response.data.hod_status);
      if (
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.hod_status == "HOD_REJECTED")
      ) {
        message.error("Not Yet Supervisor Approved");
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-09/Summary");
        }, 1500);
      }
      setemptyarraycheck(response.data.length);
      setReportDetails(response.data);

      // console.log("seted Report Details",reportDetails.date);

      if (response.data) {
        const data = response.data;
        if (data && data.message !== "No data") {
          setreportId(data.reportId);
        }
      } else {
        // setRows([]);
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.message);
    } finally {
    }
  };

  // fetch order Details
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/orderDetails?order=${orderNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        setOrderDetails(data);
        setMixing(data.mix);
        setCustomerName(data.customerName);
        setMaterialCode(data.material);
        setStdGsm(data.gsm);
        setPattern(data.patternDescription);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  function formatDateString(dateString) {
    const parts = dateString.split("-"); // Split the string into parts
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // Rearrange to DD-MM-YYYY
  }
  function convertShift(shift) {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return null;
    }
  }

  //fetch All Table Rows
  const fetchReportDetails = async () => {
    try {
      setLoading(true);
      const formattedDate = formatDateString(date);
      // console.log(formattedDate);
      const formattedShift = convertShift(shift);
      // console.log("converted shift",formattedShift)
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/getMahloData?date=${formattedDate}&shift=${formattedShift}&orderNumber=${orderNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.length > 0) {
        setreportData(response.data);
        // console.log("report data form api", reportData);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitGsmAnalysisReport();
    } catch (error) {
      console.error("Error saving Logbook - Spunlace Planning:", error);
    }
  };
  // const handleStaffNoChange = (e, index) => {
  //   const updatedReportData = [...reportData];
  //   updatedReportData[index].sraffNo = e.target.value;
  //   setreportData(updatedReportData);
  // };

  const submitGsmAnalysisReport = async () => {
    setSubmitLoading(true);
    try {
      const payload = {
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: 1,
        refSopNo: sopNo,
        unit: unit,
        reportId: reportId,

        date: date,
        shift: shift,
        orderNo: orderNumber,
        productName: customerName,
        mixing: mixing,
        materialCode: materialCode,
        stdGsm: stdGsm,
        stdMoisture: "",
        pattern: pattern,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/Service/SpunlaceGsmAnalysisReport/SubmitSpunlaceGsmAnalysisReport`,
        payload,
        { headers }
      );
      setTimeout(() => {
        navigate("/Precot/Spunlace/F-09/Summary");
      }, 1500);

      message.success("Submitted Successfully..!");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to submit !!");
    } finally {
      setSubmitLoading(false);
    }
  };
  // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = reportData?.slice(indexOfFirstRow, indexOfLastRow);
  const handleNextPage = () => {
    if (currentPage < Math.ceil(reportData?.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>GSM/MOISTURE Mahlo Details</b>
        </p>
      ),
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th colSpan="63" style={{ height: "35px", textAlign: "center" }}>
                GSM AS PER MAHLO
              </th>
              <th colSpan="42" style={{ height: "35px", textAlign: "center" }}>
                MOISTURE AS PER MAHLO
              </th>
            </tr>
            <tr>
              <th colSpan="11" style={{ height: "20px", textAlign: "center" }}>
                SHAFT NO
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                1
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                2
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                3
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                4
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                5
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                6
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                7
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                8
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                9
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                10
              </th>
              <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                MAX
              </th>
              <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                MIN
              </th>
              <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                AVG
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                1
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                2
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                3
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                4
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                5
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                6
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                7
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                8
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                9
              </th>
              <th colSpan="3" style={{ textAlign: "center" }}>
                10
              </th>
              <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                MAX
              </th>
              <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                MIN
              </th>
              <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                AVG
              </th>
            </tr>
            {currentRows?.map((row, index) => (
              <tr key={index}>
                <th
                  colSpan="11"
                  style={{ height: "20px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={row.Roll}
                    //  style={{ padding:"2px" }}
                  />
                </th>

                <th colSpan="4" style={{ height: "20px", textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_1} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_2} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_3} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_4} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_5} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_6} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_7} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_8} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_9} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.weight.Zone_10} />
                </th>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.WeightMaxValue} />
                </th>
                <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                  <input className="inp-new" value={row.WeightMinValue} />
                </th>

                <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                  <input className="inp-new" value={row.WeightAverage} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_1} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_2} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_3} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_4} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_5} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_6} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_7} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_8} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_9} />
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  <input className="inp-new" value={row.moisture.Zone_10} />
                </th>
                <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                  <input className="inp-new" value={row.MoistureMaxValue} />
                </th>
                <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                  <input className="inp-new" value={row.MoistureMinValue} />
                </th>
                <th colSpan="4" style={{ textAlign: "center", color: "red" }}>
                  <input className="inp-new" value={row.MoistureAverage} />
                </th>
              </tr>
            ))}
          </table>
          <div style={{ textAlign: "center", margin: "10px 0" }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(reportData?.length / rowsPerPage)
              }
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              Next
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p>
          <b>Reviews</b>
        </p>
      ),
      children: (
        <div style={{ width: "100%" }}>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Production Supervisor Sign & Date</b>
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>HOD / Designee Sign & Date</b>
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {reportDetails?.supervisor_status === "SUPERVISOR_APPROVED" && (
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
                        <div>{reportDetails?.supervisor_sign}</div>
                        <div>{formattedDatesupervisor()}</div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Supervisor Sign"
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
                colSpan="2"
                style={{
                  textAlign: "center",
                  // verticalAlign: "bottom"
                }}
              >
                {(reportDetails?.hod_status === "HOD_REJECTED" ||
                  reportDetails?.hod_status === "HOD_APPROVED") && (
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
                        <div>{reportDetails.hod_sign}</div>
                        <div>{formattedDate()}</div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="HOD Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                    </div>{" "}
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
      {loading == true ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            backgroundColor: "rgba(233,242,234,.6)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={gif} alt="loading" />
          <br />
          <p style={{ marginTop: "5px", fontSize: "18px", color: "#333" }}>
            Fetching Data from PDE, please wait...
          </p>
        </div>
      ) : null}
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit={unit}
        formName={formatName}
        formatNo={formatNo}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Input addonBefore="Date:" required value={date} disabled />
        <Input addonBefore="Shift:" required value={shift} disabled />
        <Input addonBefore="Order No:" required value={orderNumber} disabled />
        <Input addonBefore="Mixing:" value={mixing} disabled />
        <Input addonBefore="Material Code:" value={materialCode} disabled />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Input addonBefore="PRODUCT NAME:" value={customerName} disabled />
        <Input addonBefore="STD GSM:" value={stdGsm} disabled />
        <Input addonBefore="STD. MOISTURE in %:" disabled />
        <Input addonBefore="PATTERN:" value={pattern} disabled />
      </div>
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
    </div>
  );
};

export default Spunlace_f09;
