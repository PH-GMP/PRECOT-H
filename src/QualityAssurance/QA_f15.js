/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Tabs, Tooltip } from "antd";
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
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f15 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { year } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [DetailsByParam, setDetailsByParam] = useState("");
  const [planId, setplanId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [rows, setRows] = useState([
    {
      lineIdF: "",
      activity: "",
      planApr: "",
      planMay: "",
      planJun: "",
      planJul: "",
      planAug: "",
      planSept: "",
      planOct: "",
      planNov: "",
      planDec: "",
      planJan: "",
      planFeb: "",
      planMar: "",
      planRemarks: "",
      statusApr: "",
      statusMay: "",
      statusJun: "",
      statusJul: "",
      statusAug: "",
      statusSept: "",
      statusOct: "",
      statusNov: "",
      statusDec: "",
      statusJan: "",
      statusFeb: "",
      statusMar: "",
      statusRemarks: "",
    },
  ]);

 

  // onchange functions

  const handleActivityChange = (index, value) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].activity = value;
      return updatedRows;
    });
  };
  const handlePlanChange = (index, month, value) => {
    if (value.length > 1) {
      return;
    }
    if (value === "p" || value === "c") {
      value = value.toUpperCase();
    }
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][month] = value;

      return updatedRows;
    });
  };
  const handleRemarkChange = (index, month, value) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][month] = value;

      return updatedRows;
    });
  };

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.mr_sign;
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

  const handleAddRow = () => {
    const newLineId =
      rows.length > 0
        ? Math.max(...rows.map((row) => parseInt(row.lineIdF) || 0)) + 1
        : 1;
    const newRow = {
      lineIdF: newLineId.toString(),
      activity: "",
      planApr: "",
      planMay: "",
      planJun: "",
      planJul: "",
      planAug: "",
      planSept: "",
      planOct: "",
      planNov: "",
      planDec: "",
      planJan: "",
      planFeb: "",
      planMar: "",
      planRemarks: "",
      statusApr: "",
      statusMay: "",
      statusJun: "",
      statusJul: "",
      statusAug: "",
      statusSept: "",
      statusOct: "",
      statusNov: "",
      statusDec: "",
      statusJan: "",
      statusFeb: "",
      statusMar: "",
      statusRemarks: "",
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (lineIdF) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const updatedRows = rows.filter((row) => row.lineIdF !== lineIdF);
      setRows(updatedRows);
    }
  };

  const handleKeyDown = (event) => {
    if (!["C", "c"].includes(event.key) && event.key.length === 1) {
      event.preventDefault();
    }
  };
  const handleKeyDown2 = (event) => {
    if (!["P", "p"].includes(event.key) && event.key.length === 1) {
      event.preventDefault();
    }
  };

  const roleauth = localStorage.getItem("role");
  const disabled =
    (roleauth === "ROLE_MR" || roleauth === "QA_MANAGER") &&
    DetailsByParam?.mr_status === "MR_SUBMITTED";

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleauth === "ROLE_MR" || roleauth === "QA_MANAGER") {
      if (DetailsByParam?.mr_status === "MR_SUBMITTED") {
        return "none";
      }
    }
  };

  const handleSave = async () => {
    try {
      await SaveAnnualPlanRecord();
    } catch (error) {
      console.error("Error saving Annual Plan Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitAnnualPlanRecord();
    } catch (error) {
      console.error("Error submitting Annual Plan Record..", error);
    }
  };

  const SaveAnnualPlanRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "Annual Plan",
        formatNo: "PH-QAD01-F-015",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-18",
        unit: "H",
        year: year,
        id: planId,

        annualplanlines: rows.map((row) => ({
          activity: row.activity,
          apr_plan: row.planApr,
          may_plan: row.planMay,
          jun_plan: row.planJun,
          jul_plan: row.planJul,
          aug_plan: row.planAug,
          sept_plan: row.planSept,
          oct_plan: row.planOct,
          nov_plan: row.planNov,
          dec_plan: row.planDec,
          jan_plan: row.planJan,
          feb_plan: row.planFeb,
          mar_plan: row.planMar,
          plan_remarks: row.planRemarks,
          apr_status: row.statusApr,
          may_status: row.statusMay,
          jun_status: row.statusJun,
          jul_status: row.statusJul,
          aug_status: row.statusAug,
          sept_status: row.statusSept,
          oct_status: row.statusOct,
          nov_status: row.statusNov,
          dec_status: row.statusDec,
          jan_status: row.statusJan,
          feb_status: row.statusFeb,
          mar_status: row.statusMar,
          status_remarks: row.statusRemarks,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/qa/saveAnnualPlan`,
        payload,
        { headers }
      );
      setTimeout(() => {
        navigate("/Precot/QA/F-15/Summary");
      }, 1500);
      message.success("Annual Plan Record Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to save Annual Plan Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitAnnualPlanRecord = async () => {
    setSubmitLoading(true);

    try {
      for (let row of rows) {
        if (!row.activity || row.activity.trim() === "") {
          message.error("Activity field is mandatory for all rows.");
          setSubmitLoading(false);
          return;
        }
      }
      const payload = {
        formatName: "Annual Plan",
        formatNo: "PH-QAD01-F-015",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-18",
        unit: "H",
        year: year,
        id: planId,

        annualplanlines: rows.map((row) => ({
          line_id: row.lineId,
          activity: row.activity || "NA",
          apr_plan: row.planApr || "NA",
          may_plan: row.planMay || "NA",
          jun_plan: row.planJun || "NA",
          jul_plan: row.planJul || "NA",
          aug_plan: row.planAug || "NA",
          sept_plan: row.planSept || "NA",
          oct_plan: row.planOct || "NA",
          nov_plan: row.planNov || "NA",
          dec_plan: row.planDec || "NA",
          jan_plan: row.planJan || "NA",
          feb_plan: row.planFeb || "NA",
          mar_plan: row.planMar || "NA",
          plan_remarks: row.planRemarks || "NA",
          apr_status: row.statusApr || "NA",
          may_status: row.statusMay || "NA",
          jun_status: row.statusJun || "NA",
          jul_status: row.statusJul || "NA",
          aug_status: row.statusAug || "NA",
          sept_status: row.statusSept || "NA",
          oct_status: row.statusOct || "NA",
          nov_status: row.statusNov || "NA",
          dec_status: row.statusDec || "NA",
          jan_status: row.statusJan || "NA",
          feb_status: row.statusFeb || "NA",
          mar_status: row.statusMar || "NA",
          status_remarks: row.statusRemarks || "NA",
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/qa/submitAnnualPlan`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-15/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to submit Distribution and destruction Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-15/Summary");
  };

  useEffect(() => {
    fetchDetailsByParam();
  }, []);

  const fetchDetailsByParam = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/getdetailsbyParamAnnualplan?year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setDetailsByParam(response.data.body);

      if (response.data && response.data.body.message !== "No data") {
        const data = response.data.body;
        setplanId(data.id);
        setRows(
          data.annualplanlines?.map((item) => ({
            lineId: item.line_id,
            date: item.date,
            activity: item.activity,
            planApr: item.apr_plan,
            statusApr: item.apr_status,
            planMay: item.may_plan,
            statusMay: item.may_status,
            planJun: item.jun_plan,
            statusJun: item.jun_status,
            planJul: item.jul_plan,
            statusJul: item.jul_status,
            planAug: item.aug_plan,
            statusAug: item.aug_status,
            planSept: item.sept_plan,
            statusSept: item.sept_status,
            planOct: item.oct_plan,
            statusOct: item.oct_status,
            planNov: item.nov_plan,
            statusNov: item.nov_status,
            planDec: item.dec_plan,
            statusDec: item.dec_status,
            planJan: item.jan_plan,
            statusJan: item.jan_status,
            planFeb: item.feb_plan,
            statusFeb: item.feb_status,
            planMar: item.mar_plan,
            statusMar: item.mar_status,
            planRemarks: item.plan_remarks,
            statusRemarks: item.status_remarks,
          }))
        );
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
      label: <p>Annual Plan</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th colSpan="5" style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Process
              </th>
              <th colSpan="30" style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Apr.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                May.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Jun.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Jul.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Aug.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Sept.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Oct.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Nov.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Dec.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Jan.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Feb.
              </th>
              <th colSpan="5" style={{ textAlign: "center" }}>
                Mar.
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Remark
              </th>
            </tr>

            {rows.map((row, index) => (
              <React.Fragment key={row.lineIdF}>
                <tr>
                  <td colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                    {index + 1}
                  </td>
                  {index === 0 && (
                    <td
                      colSpan="10"
                      rowSpan={rows.length * 2}
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      MRM
                    </td>
                  )}
                  <td colSpan="20" rowSpan="2" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      className="inp-new"
                      style={{
                        width: "85%",
                        border: "none",
                        height: "35px",
                        paddingLeft: "2px",
                      }}
                      value={row.activity}
                     
                      onChange={(e) =>
                        handleActivityChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    Plan
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{
                        width: "85%",
                        border: "none",
                        height: "35px",
                        paddingLeft: "2px",
                      }}
                      value={rows[index].planApr}
                      onChange={(e) =>
                        handlePlanChange(index, "planApr", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planMay}
                      onChange={(e) =>
                        handlePlanChange(index, "planMay", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planJun}
                      onChange={(e) =>
                        handlePlanChange(index, "planJun", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planJul}
                      onChange={(e) =>
                        handlePlanChange(index, "planJul", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planAug}
                      onChange={(e) =>
                        handlePlanChange(index, "planAug", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planSept}
                      onChange={(e) =>
                        handlePlanChange(index, "planSept", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planOct}
                      onChange={(e) =>
                        handlePlanChange(index, "planOct", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planNov}
                      onChange={(e) =>
                        handlePlanChange(index, "planNov", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planDec}
                      onChange={(e) =>
                        handlePlanChange(index, "planDec", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planJan}
                      onChange={(e) =>
                        handlePlanChange(index, "planJan", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planFeb}
                      onChange={(e) =>
                        handlePlanChange(index, "planFeb", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      onKeyDown={handleKeyDown2}
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].planMar}
                      onChange={(e) =>
                        handlePlanChange(index, "planMar", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={row.planRemarks}
                      onChange={(e) =>
                        handleRemarkChange(index, "planRemarks", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    Status
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusApr}
                      onChange={(e) =>
                        handlePlanChange(index, "statusApr", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusMay}
                      onChange={(e) =>
                        handlePlanChange(index, "statusMay", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusJun}
                      onChange={(e) =>
                        handlePlanChange(index, "statusJun", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusJul}
                      onChange={(e) =>
                        handlePlanChange(index, "statusJul", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusAug}
                      onChange={(e) =>
                        handlePlanChange(index, "statusAug", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusSept}
                      onChange={(e) =>
                        handlePlanChange(index, "statusSept", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusOct}
                      onChange={(e) =>
                        handlePlanChange(index, "statusOct", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusNov}
                      onChange={(e) =>
                        handlePlanChange(index, "statusNov", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusDec}
                      onChange={(e) =>
                        handlePlanChange(index, "statusDec", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusJan}
                      onChange={(e) =>
                        handlePlanChange(index, "statusJan", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusFeb}
                      onChange={(e) =>
                        handlePlanChange(index, "statusFeb", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      onKeyDown={handleKeyDown}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={rows[index].statusMar}
                      onChange={(e) =>
                        handlePlanChange(index, "statusMar", e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      disabled={disabled}
                      className="inp-new"
                      style={{ width: "85%", height: "35px" }}
                      value={row.statusRemarks}
                      onChange={(e) =>
                        handleRemarkChange(
                          index,
                          "statusRemarks",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: "35px",
                      textAlign: "center",
                      cursor: "pointer",
                      size: "40px",
                      border: "none",
                      display: row.lineIdF ? "block" : "none",
                    }}
                    onClick={() => handleDeleteRow(row.lineIdF)}
                  >
                    {row.lineIdF && (
                      <DeleteOutlined
                        style={{ fontSize: "24px", color: "#ff4d4f" }}
                      />
                    )}
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
                padding: "5px",
                display: disabled ? "none" : "block",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
            <input
              type="text"
              readOnly
              className="inp-new"
              value="Letters used: ‘P’ for Plan, and ‘C’ for Completed"
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#000",
                width: "90%",
                textAlign: "right",
                marginBottom: "20px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Input
              type="text"
              readOnly
              addonBefore="Last Updated ON:"
              className="inp-new"
              value={formattedDate(DetailsByParam?.updatedAt)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#000",
                width: "30%",
                textAlign: "right",
                marginBottom: "10px",
              }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "50%", margin: "auto" }}>
            <tr>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                MR/QA Manager Sign & Date
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
                {DetailsByParam?.mr_status === "MR_SUBMITTED" && (
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
                        <div>{DetailsByParam?.mr_sign}</div>
                        <div>
                          {formattedDate(DetailsByParam?.mr_submitted_on)}
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
        formName="Annual Plan"
        formatNo="PH-QAD01-F-015"
        sopNo="PH-QAD01-D-18"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "QA_MANAGER" || role === "ROLE_MR" ? (
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
          ) : (
            <></>
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
          addonBefore="Year:"
          placeholder="Year"
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
    </div>
  );
};

export default QA_f15;
