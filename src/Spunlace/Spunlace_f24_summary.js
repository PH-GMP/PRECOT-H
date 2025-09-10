/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";

import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Menu,
  Row,
  Select,
  Table,
  Tooltip,
  Modal,
  Input,
  message,
} from "antd";
import { FaUserCircle } from "react-icons/fa";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { FaPrint } from "react-icons/fa6";
import { createGlobalStyle } from "styled-components";
import { render } from "@testing-library/react";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f24_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [week, setweek] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [printresponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  // const[weeks,setWeeks]=useState([])
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [hodStatus, setHodStatus] = useState("");
  const [getData, setGetData] = useState([]);
  const [reason, setReason] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "Week",
      dataIndex: "week",
      key: "week",
      align: "center",
    },

    {
      title: "Supervisor Status",
      dataIndex: "sup_status",
      key: "sup_status",
      align: "center",
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      align: "center",
      render: (_, x) => (
        <>
          <Button
            icon={<BiEdit />}
            onClick={() => handleEdit(x)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }

  const handlePrint = () => {
    setShowModal(true);

    // console.log("print screen works");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    const userRole = localStorage.getItem("role");
    setRole(userRole);

    let hasErrorOccurred = false; // Flag to prevent duplicate error messages

    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });
        // console.log("edit response", res);
        setGetData(res.data);
        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x) => ({
              month: x.month || "N/A",
              date: x.weekAndDate || "N/A",
              week: x.week || "N/A",
              sup_status: x.supervisor_status || "N/A",
              hod_status: x.hod_status || "N/A",
              year: x.year || "N/A",
              sms_id: x.sms_id || "N/A",
              op_status: x.operator_status || "N/A",
              reason: x.reason || "N/A",
              index: x.index,
            }))
          );
        } else {
          setSummary([]); // Set an empty array if data is not as expected
        }
      } catch (err) {
        if (!hasErrorOccurred) {
          // Check if error has already occurred
          console.error("Error fetching summary data", err);
          message.error(err.response?.data?.message || "An error occurred");
          hasErrorOccurred = true; // Set the flag to true after showing the error message
          setSummary([]); // Set an empty array in case of error
          navigate("/Precot/choosenScreen");
        }
      }
    };

    const summaryUrl = `${API.prodUrl}/Precot/api/spunlace/Service/SanitizationOfMachinesAndSurfaces/getSMSSummary`;

    if (
      [
        "ROLE_OPERATOR",
        "ROLE_SUPERVISOR",
        "ROLE_HOD",
        "ROLE_DESIGNEE",
      ].includes(userRole)
    ) {
      fetchSummary(summaryUrl);
    }

    // To prevent multiple API calls due to strict mode, you can add a cleanup function
    return () => {
      hasErrorOccurred = true; // Ensure that the effect doesn't run again
    };
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [getData]);

  const months = [
    { label: "January", value: "JAN" },
    { label: "February", value: "FEB" },
    { label: "March", value: "MAR" },
    { label: "April", value: "APR" },
    { label: "May", value: "MAY" },
    { label: "June", value: "JUN" },
    { label: "July", value: "JUL" },
    { label: "August", value: "AUG" },
    { label: "September", value: "SEP" },
    { label: "October", value: "OCT" },
    { label: "November", value: "NOV" },
    { label: "December", value: "DEC" },
  ];

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }

  const years = generateYearOptions(2024, 2040);
  const weeks = [
    { value: "1", label: "week1" },
    { value: "2", label: "week2" },
    { value: "3", label: "week3" },
    { value: "4", label: "week4" },
    { value: "5", label: "week5" },
  ];

  const weekChange = (value) => {
    setweek(value);
  };

  const handleEdit = (x) => {
    // console.log("particular ", x);
    navigate("/Precot/Spunlace/F-24", {
      state: {
        month: x.month,
        year: x.year,
        sms_id: x.sms_id,
        week: x.week,
      },
    });
    // console.log("edit screen", x);
  };

  const monthChange = (value) => {
    setMonth(value);
  };
  const handleCancel = () => {
    setShowModal(false);
    // Reset form fields
    setSelectedMonth("");
    setSelectedYear("");
    form.resetFields();
  };
  const printDataSubmit = () => {
    if (hodStatus !== "HOD_APPROVED") {
      message.error("HOD approval required before submitting.");
      return;
    }
    window.print();
  };

  const yearChange = (value) => {
    setYear(value);
  };
  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData?.[0]?.supervisor_sign;
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
  }, [printresponseData,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData[printresponseData.length - 1]?.hod_sign;
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
  }, [printresponseData,API.prodUrl, token]);
  const fetchPrintData = async (selectedYear) => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/spunlace/Service/SanitizationOfMachinesAndSurfaces/findByMonthYearPrintApi?month=${selectedMonth}&year=${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data && data.length > 0) {
        setPrintResponseData(data);
        const lastData = data[data.length - 1];
        const hodsign = lastData?.hod_sign;
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${hodsign}`,
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
        // console.log("data[0]", data[0]);
        setHodStatus(data[0].hod_status);
        // console.log("Printed data", data);
      } else {
        setPrintResponseData([]);
      }

      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };
  const unwantedRemarks = ["NA", "N/A", "Nill", "NILL", "Nil", "NIL", ""];

  const uniqueRemarks = [
    ...new Set(printresponseData.map((item) => item.remarks)),
  ].filter((remark) => !unwantedRemarks.includes(remark));

  const displayRemark =
    uniqueRemarks.length > 0 ? uniqueRemarks.join(", ") : "NA";

  const handleNavigate = () => {
    if (month == "") {
      // setError('Please select a date');
      message.warning("Please Select Month");
    } else if (year == "") {
      message.warning("Please select a year");
    } else if (week == "") {
      message.warning("Please select a week");
    } else {
      navigate("/Precot/Spunlace/F-24", {
        state: { month: month, year: year, sms_id: "", week: week },
      });
    }
  };

  return (
    <div>
      <div id="section-to-print">
        <br />
        <table style={{ scale: "98%", marginTop: "20px" }}>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
            </tr>

            <tr style={{ height: "20px" }}>
              <td
                colSpan="1"
                rowSpan="4"
                style={{ textAlign: "center", width: "10%" }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "80px", height: "auto" }}
                />
                <br />
                <b style={{ fontFamily: "Times New Roman, Times, serif" }}>
                  Unit H
                </b>
              </td>
              <td rowSpan="4" colSpan="5" style={{ textAlign: "center" }}>
                <b>Sanitization Of Machines & Surfaces</b>{" "}
              </td>
              <td colSpan="1">Format No.:</td>
              <td colSpan="2">PH-PRD02/F-024</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="1">Revision No.:</td>
              <td colSpan="2">01</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="1">Ref.SOP No.:</td>
              <td colSpan="2">PH-PRD02-D-04</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="1">Page No.:</td>
              <td colSpan="2">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }}></td>
            </tr>
          </thead>
          <br />

          <tbody>
            <tr colSpan="8" style={{ height: "30px" }}>
              <td colSpan={2} style={{ height: "30px" }}>
                Department:{" "}
                {printresponseData.length > 0
                  ? printresponseData[0].department
                  : ""}
              </td>
              <td colSpan={3}>
                Frequency:{" "}
                {printresponseData.length > 0
                  ? printresponseData[0].frequency
                  : ""}
              </td>
              <td colSpan={3}>
                Month & Year: {selectedMonth}/{selectedYear}
              </td>
            </tr>
            <tr style={{ height: "35px" }}>
              <th rowSpan={2} style={{ textAlign: "center" }}>
                Sr. No.
              </th>
              <th rowSpan={2} colSpan={2} style={{ textAlign: "center" }}>
                Activity
              </th>
              <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>
                Week 1
              </th>
              <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>
                Week 2
              </th>
              <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>
                Week 3
              </th>
              <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>
                Week 4
              </th>
              <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>
                Week 5
              </th>
            </tr>
            <tr>
              {/* <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>{printresponseData.length > 0 ? printresponseData[0].weekAndDate : ""}</th>
                            <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>{printresponseData.length > 0 ? printresponseData[1].weekAndDate : ""}</th>
                            <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>{printresponseData.length > 0 ? printresponseData[2].weekAndDate : ""}</th>
                            <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>{printresponseData.length > 0 ? printresponseData[3].weekAndDate : ""}</th>
                            <th rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>{printresponseData.length > 0 ? printresponseData[4].weekAndDate : ""}</th> */}

              <td style={{ height: "20px", textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                    .weekAndDate
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                    .weekAndDate
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                    .weekAndDate
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                    .weekAndDate
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                    .weekAndDate
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>1</td>
              <td colSpan={2} style={{ height: "30px" }}>
                Slitter / Cutter & Rollers
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "1")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Slitter / Cutter & Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "2")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Slitter / Cutter & Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "3")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Slitter / Cutter & Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "4")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Slitter / Cutter & Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "5")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Slitter / Cutter & Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "center" }}>2</td>
              <td colSpan={2} style={{ height: "30px" }}>
                Fleece Transfer Rollers
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "1")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Fleece Transfer Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "2")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Fleece Transfer Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "3")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Fleece Transfer Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "4")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Fleece Transfer Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "5")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Fleece Transfer Rollers"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "center" }}>3</td>
              <td colSpan={2} style={{ height: "30px" }}>
                Fleece Cutters
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "1")
                  ?.activites.find(
                    (activity) => activity.activity === "Fleece Cutters"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "2")
                  ?.activites.find(
                    (activity) => activity.activity === "Fleece Cutters"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "3")
                  ?.activites.find(
                    (activity) => activity.activity === "Fleece Cutters"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "4")
                  ?.activites.find(
                    (activity) => activity.activity === "Fleece Cutters"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "5")
                  ?.activites.find(
                    (activity) => activity.activity === "Fleece Cutters"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "center" }}>4</td>
              <td colSpan={2} style={{ height: "30px" }}>
                Roll Winder
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "1")
                  ?.activites.find(
                    (activity) => activity.activity === "Roll Winder"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "2")
                  ?.activites.find(
                    (activity) => activity.activity === "Roll Winder"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "3")
                  ?.activites.find(
                    (activity) => activity.activity === "Roll Winder"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "4")
                  ?.activites.find(
                    (activity) => activity.activity === "Roll Winder"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "5")
                  ?.activites.find(
                    (activity) => activity.activity === "Roll Winder"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "center" }}>5</td>
              <td colSpan={2} style={{ height: "30px" }}>
                Shaft Removing Platform
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "1")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Shaft Removing Platform"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "2")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Shaft Removing Platform"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "3")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Shaft Removing Platform"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "4")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Shaft Removing Platform"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "5")
                  ?.activites.find(
                    (activity) =>
                      activity.activity === "Shaft Removing Platform"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "center" }}>6</td>
              <td colSpan={2} style={{ height: "30px" }}>
                Trollies
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "1")
                  ?.activites.find(
                    (activity) => activity.activity === "Trollies"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "2")
                  ?.activites.find(
                    (activity) => activity.activity === "Trollies"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "3")
                  ?.activites.find(
                    (activity) => activity.activity === "Trollies"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "4")
                  ?.activites.find(
                    (activity) => activity.activity === "Trollies"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "5")
                  ?.activites.find(
                    (activity) => activity.activity === "Trollies"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "center" }}>7</td>
              <td colSpan={2} style={{ height: "30px" }}>
                Weighing Scale
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "1")
                  ?.activites.find(
                    (activity) => activity.activity === "Weighing Scale"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "2")
                  ?.activites.find(
                    (activity) => activity.activity === "Weighing Scale"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "3")
                  ?.activites.find(
                    (activity) => activity.activity === "Weighing Scale"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "4")
                  ?.activites.find(
                    (activity) => activity.activity === "Weighing Scale"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "5")
                  ?.activites.find(
                    (activity) => activity.activity === "Weighing Scale"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>8</td>
              <td colSpan={2} style={{ height: "30px" }}>
                Pallets
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "1")
                  ?.activites.find(
                    (activity) => activity.activity === "Pallets"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "2")
                  ?.activites.find(
                    (activity) => activity.activity === "Pallets"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "3")
                  ?.activites.find(
                    (activity) => activity.activity === "Pallets"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "4")
                  ?.activites.find(
                    (activity) => activity.activity === "Pallets"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData
                  .find((item) => item.week === "5")
                  ?.activites.find(
                    (activity) => activity.activity === "Pallets"
                  ).isCompleted === "Yes"
                  ? "✓"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td colSpan="8" style={{ height: "50px", verticalAlign: "top" }}>
                <b>Remark/Comment</b>(in case of any abnormality observed):
                {displayRemark}
              </td>
            </tr>
            <tr>
              <td colSpan="8" style={{ height: "20px" }}>
                Note: Tick mark "✓" indicates activity completed & Cross mark
                "X" indicate not completed.
              </td>
            </tr>
            <tr style={{ height: "60px" }}>
              <td colSpan="3">
                <b>Sanitized by (Trained person) :</b>
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "1") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "1")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "1")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "1"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "1"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "2") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "2")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "2")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "2"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "2"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "3") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "3")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "3")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "3"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "3"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "4") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "4")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "4")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "4"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "4"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "5") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "5")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "5")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "5"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "5"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
            </tr>

            <tr style={{ height: "60px" }}>
              <td colSpan="3">
                <b>Verified by (Supervisor):</b>
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "1") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "1")
                          .supervisor_sign
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "1")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "1"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "1"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "2") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "2")
                          .supervisor_sign
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "2")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "2"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "2"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "3") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "3")
                          .supervisor_sign
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "3")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "3"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "3"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "4") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "4")
                          .supervisor_sign
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "4")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "4"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "4"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "5") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "5")
                          .supervisor_sign
                      }
                    </b>{" "}
                    <br />
                    {printresponseData.find((item) => item.week === "5")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "5"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB") +
                          " " +
                          new Date(
                            printresponseData.find(
                              (item) => item.week === "5"
                            ).supervisor_submit_on
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </b>
                    ) : (
                      <b>N/A</b>
                    )}
                  </>
                ) : (
                  <b>N/A</b>
                )}
              </td>
            </tr>

            <tr>
              <td colSpan="8" style={{ height: "60px", verticalAlign: "top" }}>
                <b>
                  Reviewed by HOD Signature & Date (at least once in a month) :
                </b>
                <br />
                {printresponseData && printresponseData.length > 0 && (
                  <>
                    <b>
                      {printresponseData[printresponseData.length - 1].hod_sign}
                    </b>
                    <br />
                    {printresponseData[printresponseData.length - 1]
                      .hod_submit_on && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <span>
                            <b>
                              {new Date(
                                printresponseData[
                                  printresponseData.length - 1
                                ].hod_submit_on
                              ).toLocaleString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </b>
                          </span>
                          {getImage && (
                            <img
                              src={getImage1}
                              alt="logo"
                              style={{
                                width: "10%",
                                height: "5%",
                                marginTop: "0.2em", // Space between date/time and image
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                                display: "block", // Block level for consistent positioning
                              }}
                            />
                          )}
                        </div>
                      )}
                  </>
                )}
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }}></td>
            </tr>
          </tbody>
          <br />
          <tfoot>
            {/* <tr>
              <td colspan="8" style={{ height: "10px" }}></td>
            </tr> */}
            <tr colSpan="8" style={{ height: "30px" }}>
              <td colSpan="2">Particulars</td>
              <td colSpan="3">Prepard by</td>
              <td colSpan="2">Reviewed by</td>
              <td colSpan="2">Approved by</td>
            </tr>

            <tr colSpan="8" style={{ height: "30px" }}>
              <td colSpan="2">Name</td>
              <td colSpan="3"></td>
              <td colSpan="2"></td>
              <td colSpan="2"></td>
            </tr>
            <tr colSpan="8" style={{ height: "30px" }}>
              <td colSpan="2">Signature & Date</td>
              <td colSpan="3"></td>
              <td colSpan="2"></td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="SANITIZATION OF MACHINES AND SURFACES "
        formatNo="PH-PRD02/F-024"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            type="primary"
            onClick={handlePrint}
            icon={<FaPrint color="#00308F" />}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Print
          </Button>,
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
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
      <div style={{ paddingBottom: "2em" }}></div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      {/* header code above */}
      <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "15px",
          }}
        >
          <Form.Item label="Month">
            <Select
              onChange={monthChange}
              options={months}
              placeholder="Choose Month"
            />
          </Form.Item>
          <Form.Item label="Year">
            <Select
              onChange={yearChange}
              options={years}
              placeholder="Choose Year"
            />
          </Form.Item>
          <Form.Item label="Week">
            <Select
              placeholder="Choose Week"
              style={{
                width: "150px", // Adjust the width as needed
              }}
              onChange={weekChange}
              // value={setweek}
              options={weeks}
            />
          </Form.Item>
          <Form.Item>
            <Button
              key="Create"
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
              shape="round"
              icon={<BiNavigation />}
              onClick={handleNavigate}
            >
              Go To
            </Button>
          </Form.Item>
        </Form>
      </Row>

      <Table
        columns={columns}
        dataSource={summary}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Print"
        open={showModal}
        onOk={printDataSubmit}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            type="primary"
            onClick={printDataSubmit}
            disabled={!selectedMonth || !selectedYear}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="month"
            label="Select Month"
            rules={[{ required: true, message: "Please select a month" }]}
          >
            <Select
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
                marginBottom: "10%",
              }}
              onChange={(value) => setSelectedMonth(value)}
              placeholder="Select Month"
            >
              <Select.Option value="" disabled selected hidden>
                Select Month
              </Select.Option>
              {months.map((month) => (
                <Select.Option key={month.value} value={month.value}>
                  {month.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="year"
            label="Select Year"
            rules={[{ required: true, message: "Please select a year" }]}
          >
            <Select
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
                marginBottom: "10%",
              }}
              onChange={(value) => {
                setSelectedYear(value);
                fetchPrintData(value);
              }}
              placeholder="Select Year"
            >
              <Select.Option value="" disabled selected hidden>
                Select Year
              </Select.Option>
              {years.map((year) => (
                <Select.Option key={year.value} value={year.value}>
                  {year.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Spunlace_f24_summary;
