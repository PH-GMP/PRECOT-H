 
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Modal,
  Select,
  Tabs,
  Tooltip
} from "antd";
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

const COTTON_BUDS_f02 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date, shift } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [DetailsByParam, setDetailsByParam] = useState("");
  const [Id, setId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [remarks, setRemarks] = useState("");
  const [stoppageDetails, setStoppageDetails] = useState("");
  const [lineId, setLineId] = useState([]);
  const [RecordTableDelete, setRecordTableDelete] = useState([]);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [machineNameLov, setMachineNameLov] = useState([]);
  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/buds/sap/Service/orderInfo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          const orderNumberLov = data.map((order) => ({
            value: order,
          }));
          setOrderNumberLov(orderNumberLov);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };

    fetchOrderNumberOptions();
  }, []);
  useEffect(() => {
    const fetchmachineNameOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/buds/sap/Service/machineList`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
 
        if (Array.isArray(data)) {
          setMachineNameLov(data);
        } else {
          console.error("API response is not an array", data);
          setMachineNameLov([]);
        }
      } catch (error) {
        console.error("Error fetching Machine Name options:", error);
        setMachineNameLov([]);
      }
    };

    fetchmachineNameOptions();
  }, [token]);
  const [rows, setRows] = useState([
    {
      lineIdF: "",
      machineName: "",
      manpowerAllocation: "",
      BMRRunning: "",
      BMRNext: "",
      ProductNameRunning: "",
      ProductNameNext: "",
    },
  ]);
  const handleAddRow = () => {
    const newLineId =
      rows.length > 0
        ? Math.max(...rows.map((row) => parseInt(row.lineIdF) || 0)) + 1
        : 1;
    const newRow = {
      lineIdF: newLineId.toString(),
      machineName: "",
      manpowerAllocation: "",
      BMRRunning: "",
      BMRNext: "",
      ProductNameRunning: "",
      ProductNameNext: "",
    };
    setRows([...rows, newRow]);
  };
  const handleChange = async (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    if (field === "BMRRunning") {
      const productName = await getProductName(value);
      if (productName) {
        updatedRows[index].ProductNameRunning = productName;
        setRows([...updatedRows]);
      }
    }
    if (field === "BMRNext") {
      const productName = await getProductName(value);
      if (productName) {
        updatedRows[index].ProductNameNext = productName;
        setRows([...updatedRows]);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

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

  const getProductName = async (value) => {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/buds/sap/Service/productChangeDetails?orderNumber=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Return the product name from the API response
      return response.data.product; // Assuming 'product' is the product name field
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };
  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.[0]?.supervisor_sign;
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [DetailsByParam, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.[0]?.hod_submit_by;
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [DetailsByParam, API.prodUrl, token]);

  const roleauth = localStorage.getItem("role");
  const disabled =
    roleauth === "ROLE_DESIGNEE" ||
    roleauth === "ROLE_HOD" ||
    (roleauth === "ROLE_SUPERVISOR" &&
      DetailsByParam?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" &&
      DetailsByParam?.[0]?.hod_status !== "HOD_REJECTED");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (
        DetailsByParam?.[0]?.supervisor_status == "SUPERVISOR_APPROVED" &&
        DetailsByParam?.[0]?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (DetailsByParam?.[0]?.supervisor_status == "SUPERVISOR_APPROVED" &&
          DetailsByParam?.[0]?.hod_status == "WAITING_FOR_APPROVAL") ||
        DetailsByParam?.[0]?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        DetailsByParam?.[0]?.hod_status == "HOD_APPROVED" ||
        DetailsByParam?.[0]?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (DetailsByParam?.[0]?.supervisor_status == "SUPERVISOR_APPROVED") {
        return "none";
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      return "none";
    }
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row? This action will be finalized after saving."
    );

    if (confirmDelete) {
      const lineIdToDelete = lineId[index];

      if (lineIdToDelete !== undefined) {
        setRecordTableDelete((prev) => [...prev, lineIdToDelete]);
      }
      const updatedLine = lineId.filter((_, i) => i !== index);
      setLineId(updatedLine);
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    } else {
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

  const SaveRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        logId: Id,
        formatName: "LOG BOOK – COTTON BUDS",
        formNumber: "PH-PRD06/F-002",
        logDate: date,
        logShift: shift,
        remarks: remarks,
        stoppageDetails: stoppageDetails,
        productionLine: rows.map((row, index) => ({
          ...(DetailsByParam.length !== 0 && { lineId: lineId[index] }),
          machineName: row.machineName,
          manPowerAllocation1: row.manpowerAllocation,
          bmrNumber1: row.BMRRunning,
          productaName1: row.ProductNameRunning,
          bmrNumber2: row.BMRNext,
          productaName2: row.ProductNameNext,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/buds/Service/saveLogbook`,
        payload,
        { headers }
      );
      if (RecordTableDelete.length > 0) {
        await Promise.all(
          RecordTableDelete.map(async (id) => {
            await axios.delete(
              `${ API.prodUrl}/Precot/api/buds/Service/deleteLogbookLine?id=${id}`,
              { headers }
            );
          })
        );
        setRecordTableDelete([]);
      }
      setTimeout(() => {
        navigate("/Precot/COTTON_BUDS/F-02/Summary");
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

    try {
      for (let row of rows) {
        if (!row.machineName || row.machineName.trim() === "") {
          message.error("Machine Name is mandatory for all rows.");
          setSubmitLoading(false);
          return;
        }
      }
      // for (let row of rows) {
      //   if (!row.manpowerAllocation || row.manpowerAllocation.trim() === '') {
      //     message.error('Manpower Allocation is mandatory for all rows.');
      //     setSubmitLoading(false);
      //     return;
      //   }
      // }
      const payload = {
        logId: Id,
        formatName: "LOG BOOK – COTTON BUDS",
        formNumber: "PH-PRD06/F-002",
        logDate: date,
        logShift: shift,
        remarks: remarks || "NA",
        stoppageDetails: stoppageDetails || "NA",
        productionLine: rows.map((row, index) => ({
          ...(DetailsByParam.length !== 0 && { lineId: lineId[index] }),
          machineName: row.machineName,
          manPowerAllocation1: row.manpowerAllocation || 0,
          bmrNumber1: row.BMRRunning || "NA",
          productaName1: row.ProductNameRunning || "NA",
          bmrNumber2: row.BMRNext || "NA",
          productaName2: row.ProductNameNext || "NA",
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/buds/Service/submitLogbook`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/COTTON_BUDS/F-02/Summary");
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

  const handleApprove = async () => {
    setSaveLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/buds/Service/approveLogbook`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/COTTON_BUDS/F-02/Summary");
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
        `${ API.prodUrl}/Precot/api/buds/Service/approveLogbook`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/COTTON_BUDS/F-02/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/COTTON_BUDS/F-02/Summary");
  };

  useEffect(() => {
    fetchDetailsByParam();
  }, []);

  const fetchDetailsByParam = async () => {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/buds/Service/getLogbookMaking?date=${date}&shift=${shift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setDetailsByParam(response.data);
      if (response.data && response.data.length !== 0) {
        const data = response.data[0];
        setId(data.logId);
        setRemarks(data.remarks);
        setStoppageDetails(data.stoppageDetails);
        setRows(
          data.productionLine?.map((item) => ({
            // lineIdF:item.sessionId,
            machineName: item.machineName,
            manpowerAllocation: item.manPowerAllocation1,
            BMRRunning: item.bmrNumber1,
            BMRNext: item.bmrNumber2,
            ProductNameRunning: item.productaName1,
            ProductNameNext: item.productaName2,
          }))
        );
        setLineId(
          response.data?.[0]?.productionLine?.map((item) => item.lineId)
        );
        if (
          ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
            response.data?.[0]?.supervisor_status != "SUPERVISOR_APPROVED") ||
          ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
            response.data?.[0]?.hod_status == "HOD_REJECTED")
        ) {
          message.error("Supervisor Not Yet Approved");
          setTimeout(() => {
            navigate("/Precot/COTTON_BUDS/F-02/Summary");
          }, 1500);
        }
      } else {
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
      label: <p>A . Machine Allocation & Production Details:</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Machine Name & No.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Manpower Allocation
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                BMR No.
              </th>
              <th colSpan="25" style={{ textAlign: "center" }}>
                Product Name
              </th>
            </tr>
            {rows?.map((row, index) => (
              <React.Fragment key={row.lineIdF}>
                <tr>
                  <td
                    colSpan="15"
                    rowSpan="2"
                    style={{ textAlign: "center", height: "30px" }}
                  >
                    {" "}
                    <Select
                      showSearch
                      value={row.machineName}
                      onChange={(value) =>
                        handleChange(index, "machineName", value)
                      }
                      style={{
                        width: "100%",
                        textAlign: "center",
                        height: "100%",
                      }}
                      placeholder="Search Machine Name"
                      disabled={disabled}
                    >
                      <Select.Option value="" disabled selected>
                        Select Machine Name
                      </Select.Option>
                      {machineNameLov.map((order) => (
                        <Select.Option key={order.value} value={order.value}>
                          {order.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                    <input
                      type="number"
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      onKeyDown={handleKeyDown}
                      value={row.manpowerAllocation}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "manpowerAllocation",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", height: "30px" }}
                  >
                    {" "}
                    <Select
                      showSearch
                      value={row.BMRRunning}
                      onChange={(value) =>
                        handleChange(index, "BMRRunning", value)
                      }
                      style={{ width: "100%", textAlign: "center" }}
                      placeholder="Search BMR Number"
                      disabled={disabled}
                    >
                      <Select.Option value="" disabled selected>
                        Select BMR Number
                      </Select.Option>
                      {orderNumberLov.map((order) => (
                        <Select.Option key={order.value} value={order.value}>
                          {order.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td colSpan="25" style={{ textAlign: "center" }}>
                    <Input className="inp-new" value={row.ProductNameRunning} />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", height: "30px" }}
                  >
                    <Select
                      showSearch
                      value={row.BMRNext}
                      onChange={(value) =>
                        handleChange(index, "BMRNext", value)
                      }
                      style={{ width: "100%", textAlign: "center" }}
                      placeholder="Search BMR Number"
                      disabled={disabled}
                    >
                      <Select.Option value="" disabled selected>
                        Select BMR Number
                      </Select.Option>
                      {orderNumberLov.map((order) => (
                        <Select.Option key={order.value} value={order.value}>
                          {order.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td colSpan="25" style={{ textAlign: "center" }}>
                    <Input className="inp-new" value={row.ProductNameNext} />
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: "35px",
                      textAlign: "center",
                      cursor: "pointer",
                      size: "40px",
                      border: "none",
                      display: disabled ? "none" : "block",
                    }}
                    onClick={() => handleDeleteRow(index)}
                  >
                    <DeleteOutlined
                      style={{ fontSize: "24px", color: "#ff4d4f" }}
                    />
                  </td>
                </tr>{" "}
              </React.Fragment>
            ))}
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <button
              onClick={handleAddRow}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "8px",
                padding: "8px",
                border: "none",
                display: disabled ? "none" : "block",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>B. Stoppage details:</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th
                colSpan="50"
                style={{ textAlign: "left", height: "20px", border: "none" }}
              >
                Stoppage details:
              </th>
            </tr>
            <tr>
              <th colSpan="50" style={{ textAlign: "center" }}>
                {" "}
                <TextArea
                  value={stoppageDetails}
                  onChange={(e) => setStoppageDetails(e.target.value)}
                  rows={4}
                  disabled={disabled}
                  style={{ width: "100%" }}
                />
              </th>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{ textAlign: "left", height: "20px", border: "none" }}
              >
                Remarks:
              </th>
            </tr>
            <tr>
              <th colSpan="50" style={{ textAlign: "center" }}>
                {" "}
                <TextArea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={4}
                  disabled={disabled}
                  style={{ width: "100%" }}
                />
              </th>
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
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Performed by Supervisor Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Reviewed by HOD / Designee Sign & Date
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
                {DetailsByParam?.[0]?.supervisor_status ===
                  "SUPERVISOR_APPROVED" && (
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
                        <div>{DetailsByParam?.[0]?.supervisor_sign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.[0]?.supervisor_submit_on
                          )}
                        </div>
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
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {(DetailsByParam?.[0]?.hod_status === "HOD_APPROVED" ||
                  DetailsByParam?.[0]?.hod_status === "HOD_REJECTED") && (
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
                        <div>{DetailsByParam?.[0]?.hod_submit_by}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.[0]?.hod_submit_on
                          )}
                        </div>
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
        formName="LOG BOOK – COTTON BUDS"
        formatNo="PH-PRD06/F-002"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE" ? (
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
              if (window.confirm("Are you sure want to logout")) {
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
          placeholder="date"
          value={formattedDate(date)}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="Shift:"
          placeholder="shift"
          value={shift}
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

export default COTTON_BUDS_f02;
