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
const Bleaching_f01_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setweek] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [printresponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const [printMonth, setPrintMonth] = useState("");
  const [printYear, setPrintYear] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [getImage, setGetImage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData?.[0]?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [printresponseData,    API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData[printresponseData?.length - 1]?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
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
  }, [printresponseData,    API.prodUrl, token]);

  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  }
`;

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDates(text),
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

    console.log("print screen works");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    /*
${       API.prodUrl}/Precot/api/bleach/SanitizationMechineAndSurfaceSummaryForHod
${       API.prodUrl}/Precot/api/bleach/SanitizationMechineAndSurfaceSummaryForSupervisor
    */
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });
        console.log("edit response", res);
        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x, index) => ({
              month: x.month || "N/A", // Handle potential null or undefined values
              date: x.weekAndDate || "N/A",
              week: x.week || "N/A",
              sup_status: x.supervisor_status || "N/A",
              hod_status: x.hod_status || "N/A",
              year: x.year || "N/A",
              sms_id: x.sms_id || "N/A",
              index: x.index,
              reason: x.reason,
            }))
          );
        } else {
          setSummary([]); // Set an empty array if data is not as expected
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]); // Set an empty array in case of error
        navigate("/Precot/Bleaching/F-01/Summary");
      }
    };

    switch (userRole) {
      case "ROLE_SUPERVISOR":
        fetchSummary(
          `${   API.prodUrl}/Precot/api/bleach/SanitizationMechineAndSurfaceSummaryForSupervisor`
        );
        break;
      case "ROLE_HOD":
        fetchSummary(
          `${   API.prodUrl}/Precot/api/bleach/SanitizationMechineAndSurfaceSummaryForHod`
        );
        break;
      case "ROLE_DESIGNEE":
        fetchSummary(
          `${   API.prodUrl}/Precot/api/bleach/SanitizationMechineAndSurfaceSummaryForHod`
        );
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of summary) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summary]);

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
  const years = [
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" },
    { label: "2029", value: "2029" },
    { label: "2030", value: "2030" },
    { label: "2031", value: "2031" },
    { label: "2032", value: "2032" },
    { label: "2033", value: "2033" },
    { label: "2034", value: "2034" },
    { label: "2035", value: "2035" },
    { label: "2036", value: "2036" },
    { label: "2037", value: "2037" },
    { label: "2038", value: "2038" },
    { label: "2039", value: "2039" },
    { label: "2040", value: "2040" },
    { label: "2041", value: "2041" },
    { label: "2042", value: "2042" },
    { label: "2043", value: "2043" },
  ];
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
    console.log("particular ", x);
    navigate("/Precot/Bleaching/F-01", {
      state: {
        month: x.month,
        year: x.year,
        sms_id: x.sms_id,
        week: x.week,
      },
    });
    console.log("edit screen", x);
  };

  const monthChange = (value) => {
    setMonth(value);
  };

  const [loading, setLoading] = useState(false);

  const printDataSubmit = () => {
    window.print();
  };

  const yearChange = (value) => {
    setYear(value);
  };
  const fetchPrintData = async (selectedMonth) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${   API.prodUrl}/Precot/api/bleach/findSanitizationMechineAndSurfaceByMonthYear`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            year: selectedYear,
            month: selectedMonth,
          }),
        }
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setPrintResponseData(data);
        console.log("printed data", data);
      } else {
        setPrintResponseData([]);
      }
 
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide loading spinner after response or error
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

  // const displayRemark =
  //   uniqueRemarks.length > 0 ? uniqueRemarks.join(", ") : "Nil";

  const displayRemark = printresponseData
    .map((item) => {
      const formattedDate = formatDate(item.weekAndDate);
      const remarks = uniqueRemarks.length > 0 ? uniqueRemarks : "Nil"; // Default to "Nil" if no remarks
      return `${formattedDate} - ${remarks}`;
    })
    .join(", ");

  const handleNavigate = () => {
    if (month == "") {
      // setError('Please select a date');
      message.warning("Please Select Month");
    } else if (year == "") {
      message.warning("Please select a year");
    } else if (week == "") {
      message.warning("Please select a week");
    } else {
      navigate("/Precot/Bleaching/F-01", {
        state: { month: month, year: year, sms_id: "", week: week },
      });
    }
  };

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        <table style={{ width: "95%", height: "100%" }}>
          <thead>
            <tr style={{ height: "25px" }}>
              <td rowSpan="4" style={{ textAlign: "center", width: "10%" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "80px", height: "auto" }}
                />
                <br></br>

                <br></br>

                <b style={{ fontFamily: "Times New Roman" }}>Unit H</b>
              </td>
              <td rowspan="4" colSpan="2" style={{ textAlign: "center" }}>
                <b>Sanitization of Machines & Surfaces</b>{" "}
              </td>
              <td colSpan="3">Format No.:</td>
              <td colSpan="5">PH-PRD01/F-009</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="3">Revision No.:</td>
              <td colSpan="5">01</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="3">Ref.SOP No.:</td>
              <td colSpan="5">PH-PRD01-D-04</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="3">Page No.:</td>
              <td colSpan="5">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }}></td>
            </tr>
          </thead>
          {/* <br/> */}

          <tbody>
            <tr style={{ height: "30px", border: "none", width: "20%" }}>
              <td colSpan="2" style={{ width: "40%" }}>
                Chemical Name:{" "}
                {printresponseData && printresponseData[0]
                  ? printresponseData[0].nameOfTheChemical
                  : "N/A"}
              </td>
              <td colSpan="2" style={{ width: "30%" }}>
                Chemical Batch Number:{" "}
                {printresponseData && printresponseData[0]
                  ? printresponseData[0].chemicalBatchNumber
                  : "N/A"}
              </td>
              <td style={{ width: "10%" }} colSpan="6">
                Expire Date:{" "}
                {printresponseData && printresponseData[0]
                  ? printresponseData[0].expDate
                  : "N/A"}
              </td>
            </tr>
            <tr style={{ height: "30px", border: "none", width: "20%" }}>
              <td colSpan="2" style={{ width: "40%" }}>
                Department:{" "}
                {printresponseData && printresponseData[0]
                  ? printresponseData[0].department
                  : "N/A"}
              </td>
              <td colSpan="2" style={{ width: "30%" }}>
                Frequency:{" "}
                {printresponseData && printresponseData[0]
                  ? printresponseData[0].frequency
                  : "N/A"}
              </td>
              <td style={{ width: "10%" }} colSpan="6">
                Month & Year :{" "}
                {printresponseData && printresponseData[0]
                  ? printresponseData[0].month
                  : "N/A"}
                /{" "}
                {printresponseData && printresponseData[0]
                  ? printresponseData[0].year
                  : "N/A"}
              </td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td rowspan="3" style={{ textAlign: "center" }}>
                S.No.
              </td>
              <td rowSpan="3" colSpan="2" style={{ textAlign: "center" }}>
                Activity
              </td>
              <td colSpan="5" style={{ textAlign: "center", height: "20px" }}>
                Week & Date
              </td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td style={{ textAlign: "center" }}>1</td>
              <td style={{ textAlign: "center" }}>2</td>
              <td style={{ textAlign: "center" }}>3</td>
              <td style={{ textAlign: "center" }}>4</td>
              <td style={{ textAlign: "center" }}>5</td>
            </tr>

            <tr style={{ height: "30px", textAlign: "center" }}>
              <td style={{ height: "20px", textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "1")
                  ? formatDate(
                      printresponseData.find((item) => item.week === "1")
                        .weekAndDate
                    )
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "2")
                  ? formatDate(
                      printresponseData.find((item) => item.week === "2")
                        .weekAndDate
                    )
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "3")
                  ? formatDate(
                      printresponseData.find((item) => item.week === "3")
                        .weekAndDate
                    )
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "4")
                  ? formatDate(
                      printresponseData.find((item) => item.week === "4")
                        .weekAndDate
                    )
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "5")
                  ? formatDate(
                      printresponseData.find((item) => item.week === "5")
                        .weekAndDate
                    )
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td colSpan="8" style={{ height: "30px", textAlign: "left" }}>
                <b>BLEACHED COTTON BALE PRESS MACHINE</b>
              </td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td style={{ textAlign: "center" }}>1</td>
              <td colSpan="2">Conveyor at Bale Press</td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "1")
                  ? printresponseData
                      .find((item) => item.week === "1")
                      .activitesf01.find(
                        (activity) =>
                          activity.description === "Conveyor at Bale Press"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {/* {
  printresponseData?.find((item) => item.week === "1")?.activitesf01
    ?.find((activity) => activity.description === "Conveyor at Bale Press") 
    ? (
        activity.completed === true 
          ? "✓" 
          : activity.notApplicable === true 
          ? "X" 
          : activity.not_completed === true 
          ? "N/A" 
          : "N/A"
      ) 
    : "N/A"
} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "1")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Conveyor at Bale Press"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "2")
                  ? printresponseData
                      .find((item) => item.week === "2")
                      .activitesf01.find(
                        (activity) =>
                          activity.description === "Conveyor at Bale Press"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "2")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Conveyor at Bale Press"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "3")
                  ? printresponseData
                      .find((item) => item.week === "3")
                      .activitesf01.find(
                        (activity) =>
                          activity.description === "Conveyor at Bale Press"
                      ).completed == true ? "✓": "X": "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "3")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Conveyor at Bale Press"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "4")
                  ? printresponseData
                      .find((item) => item.week === "4")
                      .activitesf01.find(
                        (activity) =>
                          activity.description === "Conveyor at Bale Press"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "4")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Conveyor at Bale Press"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "5")
                  ? printresponseData
                      .find((item) => item.week === "5")
                      .activitesf01.find(
                        (activity) =>
                          activity.description === "Conveyor at Bale Press"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "5")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Conveyor at Bale Press"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td style={{ textAlign: "center" }}>2</td>
              <td colSpan="2">Pusher</td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "1")
                  ? printresponseData
                      .find((item) => item.week === "1")
                      .activitesf01.find(
                        (activity) => activity.description === "Pusher"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {/* {printresponseData?.find((item) => item.week === "1")
  ?.activitesf01?.find((activity) => activity.description === "Pusher")
  ?.completed === true
  ? "✓"
  : printresponseData?.find((item) => item.week === "1") 
    ? "X"
    : "N/A"} */}
                {/* {
  printresponseData?.find((item) => item.week === "1")?.activitesf01
    ?.find((activity) => activity.description === "Pusher") 
    ? (
        activity.completed === true 
          ? "✓" 
          : activity.notApplicable === true 
          ? "X" 
          : activity.not_completed === true 
          ? "N/A" 
          : "N/A"
      ) 
    : "N/A"
} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "1")
                    ?.activitesf01?.find(
                      (activity) => activity.description === "Pusher"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "2")
                  ? printresponseData
                      .find((item) => item.week === "2")
                      .activitesf01.find(
                        (activity) => activity.description === "Pusher"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "2")
                    ?.activitesf01?.find(
                      (activity) => activity.description === "Pusher"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "3")
                  ? printresponseData
                      .find((item) => item.week === "3")
                      .activitesf01.find(
                        (activity) => activity.description === "Pusher"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "3")
                    ?.activitesf01?.find(
                      (activity) => activity.description === "Pusher"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "4")
                  ? printresponseData
                      .find((item) => item.week === "4")
                      .activitesf01.find(
                        (activity) => activity.description === "Pusher"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "4")
                    ?.activitesf01?.find(
                      (activity) => activity.description === "Pusher"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "5")
                  ? printresponseData
                      .find((item) => item.week === "5")
                      .activitesf01.find(
                        (activity) => activity.description === "Pusher"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "5")
                    ?.activitesf01?.find(
                      (activity) => activity.description === "Pusher"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
            </tr>
            <tr style={{ height: "30px", textAlign: "center" }}>
              <td style={{ textAlign: "center" }}>3</td>
              <td colSpan="2">Inside part of Bale Press box</td>
              <td style={{ textAlign: "center" }}>
                {/* {printresponseData.find((item) => item.week === "1")
                  ? printresponseData
                      .find((item) => item.week === "1")
                      .activitesf01.find(
                        (activity) =>
                          activity.description ===
                          "Inside part of Bale Press box"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {/* {printresponseData?.find((item) => item.week === "1")
  ?.activitesf01?.find((activity) => activity.description === "Inside part of Bale Press box")
  ?.completed === true
  ? "✓"
  : printresponseData?.find((item) => item.week === "1") 
    ? "X"
    : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "1")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Inside part of Bale Press box"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {/* {printresponseData.find((item) => item.week === "2")
                  ? printresponseData
                      .find((item) => item.week === "2")
                      .activitesf01.find(
                        (activity) =>
                          activity.description ===
                          "Inside part of Bale Press box"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "2")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Inside part of Bale Press box"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {/* {printresponseData.find((item) => item.week === "3")
                  ? printresponseData
                      .find((item) => item.week === "3")
                      .activitesf01.find(
                        (activity) =>
                          activity.description ===
                          "Inside part of Bale Press box"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "3")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Inside part of Bale Press box"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {/* {printresponseData.find((item) => item.week === "4")
                  ? printresponseData
                      .find((item) => item.week === "4")
                      .activitesf01.find(
                        (activity) =>
                          activity.description ===
                          "Inside part of Bale Press box"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "4")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Inside part of Bale Press box"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {/* {printresponseData.find((item) => item.week === "5")
                  ? printresponseData
                      .find((item) => item.week === "5")
                      .activitesf01.find(
                        (activity) =>
                          activity.description ===
                          "Inside part of Bale Press box"
                      ).completed == true
                    ? "✓"
                    : "X"
                  : "N/A"} */}
                {(() => {
                  const activity = printresponseData
                    ?.find((item) => item.week === "5")
                    ?.activitesf01?.find(
                      (activity) =>
                        activity.description === "Inside part of Bale Press box"
                    );

                  return activity
                    ? activity.completed === true
                      ? "✓"
                      : activity.not_completed === true
                      ? "X"
                      : activity.notApplicable === true
                      ? "N/A"
                      : "N/A"
                    : "N/A";
                })()}
              </td>
            </tr>
            <tr>
              <td colSpan="8" style={{ height: "30px" }}>
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
            <tr style={{ height: "40px" }}>
              <td colSpan="2">
                <b>Sanitized by</b>
                <br></br>(Trained person)
              </td>
              <td colSpan="1">
                <b>Signature & Date </b>
              </td>
              {/* <td>Signature & Date</td> */}
              <td>
                {printresponseData.find((item) => item.week === "1") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "1")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br></br>
                    {printresponseData.find((item) => item.week === "1")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "1"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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
              <td>
                {printresponseData.find((item) => item.week === "2") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "2")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br></br>
                    {printresponseData.find((item) => item.week === "2")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "2"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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
              <td>
                {printresponseData.find((item) => item.week === "3") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "3")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br></br>
                    {printresponseData.find((item) => item.week === "3")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "3"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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
              <td>
                {printresponseData.find((item) => item.week === "4") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "4")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br></br>
                    {printresponseData.find((item) => item.week === "4")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "4"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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
              <td>
                {printresponseData.find((item) => item.week === "5") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "5")
                          .sanitized_by
                      }
                    </b>{" "}
                    <br></br>
                    {printresponseData.find((item) => item.week === "5")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "5"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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
              {/* <td>
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .sanitized_by
                  : "N/A"}

              </td> */}
              {/* <td> {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .sanitized_by
                  : "N/A"}
                  </td>
              
              <td> {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .sanitized_by
                  : "N/A"}</td>
              <td> {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .sanitized_by
                  : "N/A"}</td>
              <td> {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .sanitized_by
                  : "N/A"}</td> */}
            </tr>
            <tr style={{ height: "40px" }}>
              <td colSpan="2">
                <b>Verified by</b>
                <br></br>(Production Supervisor)
              </td>
              <td colSpan="1">
                <b>Signature & Date </b>
              </td>
              {/* <td>Signature & Date</td> */}
              <td>
                {printresponseData.find((item) => item.week === "1") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "1")
                          .supervisor_sign
                      }
                    </b>{" "}
                    <br></br>
                    {printresponseData.find((item) => item.week === "1")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "1"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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
              <td>
                {printresponseData.find((item) => item.week === "2") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "2")
                          .supervisor_sign
                      }
                    </b>{" "}
                    {printresponseData.find((item) => item.week === "2")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "2"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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
              <td>
                {printresponseData.find((item) => item.week === "3") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "3")
                          .supervisor_sign
                      }
                    </b>{" "}
                    <br></br>
                    {printresponseData.find((item) => item.week === "3")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "3"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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

              <td>
                {printresponseData.find((item) => item.week === "4") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "4")
                          .supervisor_sign
                      }
                    </b>{" "}
                    {printresponseData.find((item) => item.week === "4")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "4"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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
              <td>
                {printresponseData.find((item) => item.week === "5") ? (
                  <>
                    <b>
                      {
                        printresponseData.find((item) => item.week === "5")
                          .supervisor_sign
                      }
                    </b>{" "}
                    {printresponseData.find((item) => item.week === "5")
                      .supervisor_submit_on ? (
                      <b>
                        {new Date(
                          printresponseData.find(
                            (item) => item.week === "5"
                          ).supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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
            <tr style={{ height: "40px" }}>
              <td colSpan="2">
                <b>Reviewed by HOD/Designee</b>
                <br></br>(at least once in a month)
              </td>
              <td colSpan="1">
                <b>Signature & Date </b>
              </td>
              {/* <td>Signature & Date</td> */}
              <td colSpan="5">
                {printresponseData && printresponseData.length > 0 && (
                  <>
                    <b>
                      {printresponseData[printresponseData.length - 1].hod_sign}
                    </b>{" "}
                    <br></br>
                    {printresponseData[printresponseData.length - 1]
                      .hod_submit_on && (
                      <span>
                        <b>
                          {new Date(
                            printresponseData[
                              printresponseData.length - 1
                            ].hod_submit_on
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </b>
                      </span>
                    )}
                  </>
                )}
                {getImage1 !== "" && (
                  <img className="signature" src={getImage1} alt="HOD" />
                )}
              </td>
            </tr>
            {/* <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} ></td>
            </tr> */}
          </tbody>
          <br />
          <tfoot>
            {/* <tr>
              <td colspan="8" style={{ height: "10px" }}></td>
            </tr> */}
            <tr style={{ height: "30px" }}>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Particulars
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Prepard by
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Reviewed by
              </td>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Approved by
              </td>
            </tr>

            <tr style={{ height: "30px" }}>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Name
              </td>
              <td colSpan="1"></td>
              <td colSpan="1"></td>
              <td colSpan="6"></td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Signature & Date
              </td>
              <td colSpan="1"></td>
              <td colSpan="1"></td>
              <td colSpan="6"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
          </Col>

          <Col
            style={{
              marginLeft: "1em",
            }}
          >
            <p>{localStorage.getItem("username")}</p>
            <p
              style={{
                fontSize: "x-small",
              }}
            >
              {localStorage.getItem("role")}
            </p>
          </Col>
        </Row>

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            role === "ROLE_QA"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Chemical Issue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
          }
        />
      </Drawer>
      <BleachingHeader
        unit="Unit-H"
        formName="SANITIZATION OF MACHINES AND SURFACES "
        formatNo="PH-PRD01/F-009"
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
          <Form.Item label="Choose Month">
            <Select
              onChange={monthChange}
              options={months}
              placeholder="Choose Month"
            />
          </Form.Item>
          <Form.Item label="Choose Year">
            <Select
              onChange={yearChange}
              options={years}
              placeholder="Choose Year"
            />
          </Form.Item>
          <Form.Item label="Choose Week">
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
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        destroyOnClose={true}
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
            disabled={loading || !selectedMonth || !selectedYear}
            loading={loading}
          >
            Submit
          </Button>,
        ]}
      >
        <div>
          <label htmlFor="yearSelect">Select Year</label>
          <Select
            id="yearSelect"
            style={{
              width: "100%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "10%",
            }}
            onChange={(value) => setSelectedYear(value)}
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
        </div>
        <div>
          <label htmlFor="monthSelect">Select Month</label>
          <Select
            id="monthSelect"
            style={{
              width: "100%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "10%",
            }}
            onChange={(value) => {
              setSelectedMonth(value);
              fetchPrintData(value);
            }}
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
        </div>
      </Modal>
    </div>
  );
};
export default Bleaching_f01_summary;
