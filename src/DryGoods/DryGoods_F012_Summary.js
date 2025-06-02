import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";

import {
  Button,
  Form,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import PrecotSidebar from "../Components/PrecotSidebar.js";

/*eslint-disabled*/

const DryGoods_F012_Summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
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
  const { confirm } = Modal;
  const [hodStatus, setHodStatus] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const [getData, setGetData] = useState([]);
  const [reason, setReason] = useState(false);
  const [printData, setPrintData] = useState("");
  const [reviews, setReviews] = useState({
    operator_sign: "",
    operator_submitted_on: "",
    hod_sign: "",
    hod_submit_on: "",
    operator_status: "",
    supervisor_sign: "",
    hod_status: "",
    supervisor_submit_on: "",
  });
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const [printParams, setPrintParams] = useState({
    printMonth: "",
    printYear: "",
  });
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const initialized = useRef(false);
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
      dataIndex: "supervisor_status",
      key: "supervisor_status",
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
    columns = [...baseColumns.slice(0, 6), Reason, ...baseColumns.slice(6)];
  } else {
    columns = baseColumns;
  }

  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      onOk() {
        localStorage.removeItem("token");
        navigate("/Precot");
      },
      onCancel() {},
    });
  };

  const handlePrint = () => {
    setShowModal(true);
  };

  const printDataSubmit = () => {
    if (hodStatus !== "HOD_APPROVED") {
      message.error("HOD approval required before submitting.");
      return;
    }
    window.print();
  };

  const handleCancel = () => {
    setShowModal(false);
    // Reset form fields
    setSelectedMonth("");
    setSelectedYear("");
    form.resetFields();
  };

  useEffect(() => {
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = reviews[key];
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [reviews]);

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const roleauth = localStorage.getItem("role");
      let apiUrl = "";
      if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
        apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/getHodSummarydetailsF12`;
      } else if (roleauth === "ROLE_SUPERVISOR") {
        apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/getSupSummarydetailsF12`;
      } else {
        message.error("Invalid role. Access denied.");
        navigate("/Precot/choosenScreen");
        return;
      }

      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

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
    navigate("/Precot/DryGoods/F-012", {
      state: {
        monthState: x.month,
        yearState: x.year,
        weekState: x.week,
      },
    });
    // console.log("edit screen", x);
  };

  const monthChange = (value) => {
    setMonth(value);
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
        .catch((err) => {});
    }
  }, [printresponseData, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData[printresponseData.length - 1]?.hod_sign;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [printresponseData, API.prodUrl, token]);

  const fetchPrintData = async (selectedYear) => {
    try {
      const response = await fetch(
        `${ API.prodUrl}/Precot/api/Drygoods/Service/getSaniPrintF12?month=${selectedMonth}&year=${selectedYear}`,
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
            `${ API.prodUrl}/Precot/api/Format/Service/image?username=${hodsign}`,
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

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (
          data.supervisor_status == "SUPERVISOR_REJECTED" ||
          data.hod_status == "HOD_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);

  const renderWeekHeaders = () => {
    return printresponseData.map((item, index) => (
      <th key={index} rowSpan={1} colSpan={1} style={{ textAlign: "center" }}>
        {`Week ${item.week}`}
      </th>
    ));
  };

  const renderActivityRow = (activityName, field) => {
    return (
      <tr>
        <td colSpan={2}>{activityName}</td>
        {printresponseData.map((item, index) => (
          <td key={index} style={{ textAlign: "center" }}>
            {item[field] === "Yes" ? "✔️" : item[field] === "No" ? "❌" : "NA"}
          </td>
        ))}
      </tr>
    );
  };

  const showPrintModal = () => {
    setIsModalPrint(true);
  };

  const handlePrintCancel = () => {
    setPrintParams({
      printMonth: "",
      printYear: "",
    });
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const handlePrintParams = (e, name) => {
    if (name == "printMonth") {
      setPrintParams((prevState) => ({
        ...prevState,
        printMonth: e,
      }));
    }
    if (name == "printYear") {
      setPrintParams((prevState) => ({
        ...prevState,
        printYear: e,
      }));
    }
  };

  const handlePrintShift = (value) => {
    // console.log("Shift", value)
    setPrintParams((prevState) => ({
      ...prevState,
      printYear: value,
    }));
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
      navigate("/Precot/DryGoods/F-012", {
        state: { monthState: month, yearState: year, weekState: week },
      });
    }
  };

  return (
    <div>
      <div id="section-to-print">
        <style>
          {`
     @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
    .page-break {
      page-break-after: always;
    }
      #section-to-print-san table th,
  #section-to-print-san table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
      }
    `}
        </style>
        <table className="page-break">
          {/* <thead> */}
            <tr style={{ border: "none" }}>
              <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
            </tr>

            <tr style={{ height: "5px" }}>
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
                <b>Sanitization Of Machines & Surfaces - Dry Goods</b>{" "}
              </td>
              <td colSpan="1">Format No.:</td>
              <td colSpan="2">PH-PRD04/F-012</td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="1">Revision No.:</td>
              <td colSpan="2">01</td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="1">Ref.SOP No.:</td>
              <td colSpan="2">PH-PRD04-D-03</td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="1">Page No.:</td>
              <td colSpan="2">01 of 02</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }}></td>
            </tr>
          {/* </thead> */}

          {/* <br /> */}
          {/* <tbody> */}
            <tr colSpan="8" style={{ height: "10px" }}>
              <td colSpan={4}>Frequency: Weekly</td>
              <td colSpan={4}>
                Month & Year: {selectedMonth}/{selectedYear}
              </td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td>Name of the Chemical</td>
              <td colSpan={2}>{printresponseData[0]?.name_of_chemical}</td>
              <td>Chemical Batch Number:</td>
              <td colSpan={2}>{printresponseData[0]?.chemical_batch_no}</td>
              <td>Exp. Date</td>
              <td colSpan={2}>
                {moment(printresponseData[0]?.exp_date).format("DD/MM/YYYY")}
              </td>
            </tr>
            <tr>
              <td colSpan={8} style={{ fontSize: "10px" }}>
                Note : All the surfaces of machines and packing tables, which
                are coming in direct contact with the product is to be sanitized
                with disinfectant solution
              </td>
            </tr>
            <tr style={{ height: "10px" }}>
              <th rowSpan={2} style={{ textAlign: "center" }}>
                S. No.
              </th>
              <th rowSpan={2} colSpan={2} style={{ textAlign: "center" }}>
                Check Points / Activity
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
              <td style={{ height: "20px", textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "1")
                  ? moment(
                      printresponseData.find((item) => item.week === "1")
                        .hod_submit_on
                    ).format("DD/MM/YYYY")
                  : "N/A"}
              </td>{" "}
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "2")
                  ? moment(
                      printresponseData.find((item) => item.week === "2")
                        .hod_submit_on
                    ).format("DD/MM/YYYY")
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "3")
                  ? moment(
                      printresponseData.find((item) => item.week === "3")
                        .hod_submit_on
                    ).format("DD/MM/YYYY")
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "4")
                  ? moment(
                      printresponseData.find((item) => item.week === "4")
                        .hod_submit_on
                    ).format("DD/MM/YYYY")
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "5")
                  ? moment(
                      printresponseData.find((item) => item.week === "5")
                        .hod_submit_on
                    ).format("DD/MM/YYYY")
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>1</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Balls M/c. No.1
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .balls_mc_no_01 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .balls_mc_no_01 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .balls_mc_no_01 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .balls_mc_no_01 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .balls_mc_no_01 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .balls_mc_no_01 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .balls_mc_no_01 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .balls_mc_no_01 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .balls_mc_no_01 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .balls_mc_no_01 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .balls_mc_no_01 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .balls_mc_no_01 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .balls_mc_no_01 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .balls_mc_no_01 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .balls_mc_no_01 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>2</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Balls M/c. No. 2
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .balls_mc_no_02 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .balls_mc_no_02 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .balls_mc_no_02 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .balls_mc_no_02 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .balls_mc_no_02 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .balls_mc_no_02 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .balls_mc_no_02 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .balls_mc_no_02 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .balls_mc_no_02 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .balls_mc_no_02 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .balls_mc_no_02 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .balls_mc_no_02 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .balls_mc_no_02 === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .balls_mc_no_02 === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .balls_mc_no_02 === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>3</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Sliver Making M/c.
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .sliver_making_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .sliver_making_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .sliver_making_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .sliver_making_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .sliver_making_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .sliver_making_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .sliver_making_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .sliver_making_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .sliver_making_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .sliver_making_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .sliver_making_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .sliver_making_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .sliver_making_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .sliver_making_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .sliver_making_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>4</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Rolls M/c.
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .rolls_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .rolls_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .rolls_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .rolls_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .rolls_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .rolls_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .rolls_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .rolls_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .rolls_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .rolls_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .rolls_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .rolls_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .rolls_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .rolls_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .rolls_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>5</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Pleat M/c.
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .pleat_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .pleat_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .pleat_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .pleat_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .pleat_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .pleat_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .pleat_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .pleat_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .pleat_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .pleat_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .pleat_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .pleat_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .pleat_mc === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .pleat_mc === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .pleat_mc === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>6</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Roll & Pleat Line
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>A</td>
              <td colSpan={7}>SLIVER & BALL MAKING: </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>1</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Sliver output area (Card delivery)
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .sliver_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .sliver_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .sliver_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .sliver_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .sliver_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .sliver_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .sliver_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .sliver_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .sliver_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .sliver_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .sliver_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .sliver_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .sliver_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .sliver_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .sliver_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>2</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Sliver Carrying Drums
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .sliver_carrying_drums === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .sliver_carrying_drums === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .sliver_carrying_drums === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .sliver_carrying_drums === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .sliver_carrying_drums === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .sliver_carrying_drums === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .sliver_carrying_drums === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .sliver_carrying_drums === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .sliver_carrying_drums === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .sliver_carrying_drums === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .sliver_carrying_drums === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .sliver_carrying_drums === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .sliver_carrying_drums === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .sliver_carrying_drums === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .sliver_carrying_drums === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>3</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Sliver Feeding mechanisms
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .sliver_feeding_mechanisms === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .sliver_feeding_mechanisms === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .sliver_feeding_mechanisms === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .sliver_feeding_mechanisms === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .sliver_feeding_mechanisms === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .sliver_feeding_mechanisms === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .sliver_feeding_mechanisms === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .sliver_feeding_mechanisms === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .sliver_feeding_mechanisms === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .sliver_feeding_mechanisms === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .sliver_feeding_mechanisms === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .sliver_feeding_mechanisms === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .sliver_feeding_mechanisms === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .sliver_feeding_mechanisms === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .sliver_feeding_mechanisms === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>4</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Balls output area
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .balls_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .balls_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .balls_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .balls_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .balls_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .balls_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .balls_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .balls_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .balls_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .balls_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .balls_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .balls_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .balls_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .balls_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .balls_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>5</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Packing Tables - Balls
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .packing_tables_balls === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .packing_tables_balls === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .packing_tables_balls === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .packing_tables_balls === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .packing_tables_balls === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .packing_tables_balls === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .packing_tables_balls === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .packing_tables_balls === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .packing_tables_balls === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .packing_tables_balls === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .packing_tables_balls === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .packing_tables_balls === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .packing_tables_balls === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .packing_tables_balls === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .packing_tables_balls === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>B</td>
              <td colSpan={7}>ROLLS & PLEAT MAKING: </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>1</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Carded web output area (Card delivery)
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .carded_web_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .carded_web_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .carded_web_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .carded_web_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .carded_web_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .carded_web_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .carded_web_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .carded_web_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .carded_web_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .carded_web_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .carded_web_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .carded_web_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .carded_web_output_area === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .carded_web_output_area === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .carded_web_output_area === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>2</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Conveyor
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .conveyor === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .conveyor === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .conveyor === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .conveyor === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .conveyor === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .conveyor === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .conveyor === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .conveyor === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .conveyor === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .conveyor === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .conveyor === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .conveyor === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .conveyor === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .conveyor === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .conveyor === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>3</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Roll winder
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .roll_winder === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .roll_winder === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .roll_winder === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .roll_winder === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .roll_winder === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .roll_winder === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .roll_winder === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .roll_winder === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .roll_winder === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .roll_winder === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .roll_winder === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .roll_winder === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .roll_winder === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .roll_winder === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .roll_winder === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>4</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Trolleys
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .trolleys === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .trolleys === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .trolleys === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .trolleys === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .trolleys === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .trolleys === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .trolleys === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .trolleys === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .trolleys === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .trolleys === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .trolleys === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .trolleys === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .trolleys === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .trolleys === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .trolleys === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>5</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Roll & Pleat machine
              </td>

              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .roll_pleat_line === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .roll_pleat_line === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .roll_pleat_line === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
<br/>
            <tr colSpan="8" style={{ height: "60px" }}>
              <td colSpan="2">Particulars</td>
              <td colSpan="3">Prepard by</td>
              <td colSpan="2">Reviewed by</td>
              <td colSpan="2">Approved by</td>
            </tr>

            <tr colSpan="8" style={{ height: "60px" }}>
              <td colSpan="2">Name</td>
              <td colSpan="3"></td>
              <td colSpan="2"></td>
              <td colSpan="2"></td>
            </tr>
            <tr colSpan="8" style={{ height: "60px" }}>
              <td colSpan="2">Signature & Date</td>
              <td colSpan="3"></td>
              <td colSpan="2"></td>
              <td colSpan="2"></td>
            </tr>
            <br />
            <tr style={{ border: "none" }}>
              <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
            </tr>
            <tr style={{ height: "5px" }}>
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
                <b>Sanitization Of Machines & Surfaces - Dry Goods</b>{" "}
              </td>
              <td colSpan="1">Format No.:</td>
              <td colSpan="2">PH-PRD04/F-012</td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="1">Revision No.:</td>
              <td colSpan="2">01</td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="1">Ref.SOP No.:</td>
              <td colSpan="2">PH-PRD04-D-03</td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="1">Page No.:</td>
              <td colSpan="2">02 of 02</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }}></td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>6</td>
              <td colSpan={2} style={{ height: "10px" }}>
                Packing Tables
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .packing_tables === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "1")
                        .packing_tables === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "1")
                        .packing_tables === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .packing_tables === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "2")
                        .packing_tables === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "2")
                        .packing_tables === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .packing_tables === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "3")
                        .packing_tables === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "3")
                        .packing_tables === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .packing_tables === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "4")
                        .packing_tables === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "4")
                        .packing_tables === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .packing_tables === "Yes"
                    ? "✓"
                    : printresponseData.find((item) => item.week === "5")
                        .packing_tables === "No"
                    ? "✕"
                    : printresponseData.find((item) => item.week === "5")
                        .packing_tables === "Na"
                    ? "NA"
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>

            <tr>
              <td colSpan={3} style={{ height: "60px" }}>
                <b>Remark/Comment</b>
                <br />
                (in case of any abnormality observed) :
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1").remarks
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2").remarks
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3").remarks
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4").remarks
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5").remarks
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ height: "60px" }}>
                <b>Sanitized by (Trained person) :</b>
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .sanitized_by
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .sanitized_by
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .sanitized_by
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .sanitized_by
                  : "N/A"}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .sanitized_by
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ height: "60px" }}>
                <b>Verified by (Production Supervisor): </b>
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1")
                      .supervisor_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "1")
                  ? moment(
                      printresponseData.find((item) => item.week === "1")
                        .supervisor_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2")
                      .supervisor_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "2")
                  ? moment(
                      printresponseData.find((item) => item.week === "2")
                        .supervisor_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3")
                      .supervisor_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "3")
                  ? moment(
                      printresponseData.find((item) => item.week === "3")
                        .supervisor_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4")
                      .supervisor_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "4")
                  ? moment(
                      printresponseData.find((item) => item.week === "4")
                        .supervisor_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5")
                      .supervisor_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "5")
                  ? moment(
                      printresponseData.find((item) => item.week === "5")
                        .supervisor_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ height: "60px" }}>
                <b>Reviewed by HOD/ Designee </b>
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "1")
                  ? printresponseData.find((item) => item.week === "1").hod_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "1")
                  ? moment(
                      printresponseData.find((item) => item.week === "1")
                        .hod_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "2")
                  ? printresponseData.find((item) => item.week === "2").hod_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "2")
                  ? moment(
                      printresponseData.find((item) => item.week === "2")
                        .hod_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "3")
                  ? printresponseData.find((item) => item.week === "3").hod_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "3")
                  ? moment(
                      printresponseData.find((item) => item.week === "3")
                        .hod_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "4")
                  ? printresponseData.find((item) => item.week === "4").hod_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "4")
                  ? moment(
                      printresponseData.find((item) => item.week === "4")
                        .hod_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.find((item) => item.week === "5")
                  ? printresponseData.find((item) => item.week === "5").hod_sign
                  : "N/A"}
                <br />
                {printresponseData.find((item) => item.week === "5")
                  ? moment(
                      printresponseData.find((item) => item.week === "5")
                        .hod_submit_on
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }}></td>
            </tr>
          {/* </tbody> */}
          <br />
          {/* <tfoot> */}
            <tr colSpan="8" style={{ height: "60px" }}>
              <td colSpan="2">Particulars</td>
              <td colSpan="3">Prepard by</td>
              <td colSpan="2">Reviewed by</td>
              <td colSpan="2">Approved by</td>
            </tr>

            <tr colSpan="8" style={{ height: "60px" }}>
              <td colSpan="2">Name</td>
              <td colSpan="3"></td>
              <td colSpan="2"></td>
              <td colSpan="2"></td>
            </tr>
            <tr colSpan="8" style={{ height: "60px" }}>
              <td colSpan="2">Signature & Date</td>
              <td colSpan="3"></td>
              <td colSpan="2"></td>
              <td colSpan="2"></td>
            </tr>
          {/* </tfoot> */}
        </table>
      </div>
      <BleachingHeader
        unit="Unit-H"
        formName="Sanitization Of Machines & Surfaces - Dry Goods"
        formatNo="PH-PRD04/F-012"
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
            onClick={handleLogout}
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
                width: "150px",
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
        dataSource={summaryData}
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
export default DryGoods_F012_Summary;
