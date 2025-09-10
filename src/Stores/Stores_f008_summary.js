/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader.js";

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

const Stores_f008_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const [fromSelectedDate, setFromSelectedDate] = useState("");
  const [toSelectedDate, setToSelectedDate] = useState("");
  const token = localStorage.getItem("token");
  const [printLoading, setPrintLoading] = useState(false);
  const [date, setDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
  const [forkliftNo, setForkliftNo] = useState("");
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [selectedForkliftNo, setSelectedForkliftNo] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const formatDates = (dateStr) => {
    if (!dateStr) return "";
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
  const date1 = formatDates(date);
  const date2 = formatDates(selectedDate);

  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDates(text),
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
      title: "Forklift No.",
      dataIndex: "forkliftNo",
      key: "forkliftNo",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "op_status",
      key: "op_status",
      align: "center",
    },
    {
      title: "Store Incharge Status",
      dataIndex: "store_status",
      key: "store_status",
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
            style={{ width: "100%", border: "none" }}
          >
            Edit
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

    // console.loglog("print screen works");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });
        if (res.data && res.data.length !== 0) {
          const isHODRejected = res.data.some(data => data.store_in_charge_status === "INCHARGE_REJECTED");
          setReason(isHODRejected);
          setGetData(res.data);
          // console.loglog("edit response", res);
          if (Array.isArray(res.data)) {
            setSummary(
              res.data.map((x, index) => ({
                // Handle potential null or undefined values
                date: x.date || "N/A",
                store_status: x.store_in_charge_status || "N/A",
                hod_status: x.hod_status || "N/A",
                month: x.month || "N/A",
                forkliftNo: x.forkliftNo || "N/A",
                op_status: x.operator_status || "N/A",
                reason: x.reason || "N/A",
                year: x.year || "N/A",
                index: x.index,
              }))
            );
          } else {
            setSummary([]); // Set an empty array if data is not as expected
          }
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
        navigate("/Precot/Stores/F-008/Summary");
      }
    };

    const summaryUrl = `${API.prodUrl}/Precot/api/Store/getForkliftCheckListSummary`;

    if (["STORE_OPERATOR", "STORE_INCHARGE"].includes(userRole)) {
      fetchSummary(summaryUrl);
    }
  }, []);

  // useEffect(() => {
  //   const findReason = () => {
  //     for (const data of getData) {
  //       if (data.store_in_charge_status === "INCHARGE_REJECTED") {
  //         setReason(true);
  //         break;
  //       }
  //     }
  //   };
  //   findReason();
  // }, [getData]);

  // console.loglog("numericShiftValue", numericShiftValue)

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const forkliftNumber = [
    { label: "PH-E/I-ENG15", value: "PH-E/I-ENG15" },
    { label: "PH-E/I-ENG16", value: "PH-E/I-ENG16 " },
  ];

  const forkliftNoChange = (value) => {
    setForkliftNo(value);
  };

  const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }

  const years = generateYearOptions(2024, 2040);


  const handleEdit = (x) => {
    // console.loglog("particular ", x);
    navigate("/Precot/Stores/F-008", {
      state: {
        date: x.date,
        forkliftNo: x.forkliftNo,
        month: x.month,
        year: x.year,
      },
    });
    // console.loglog("edit screen", x);
  };

  // console.loglog("orderNo", orderNo);
  const handleModalClose = () => {
    setShowModal(false);
    // Reset form fields
    setFromSelectedDate("");
    setToSelectedDate("");
    setSelectedMonth("");
    setSelectedYear("");
    setSelectedForkliftNo("");
    setPrintLoading(false);
    form.resetFields();
  };
  const printSubmit = () => {
    fetchData();
  };

  const fetchData = () => {
    // let baseUrl = `${API.prodUrl}/Precot/api/Store/ForkliftCheckListPrint?`;
    let baseUrl = `${API.prodUrl}/Precot/api/Store/ForkliftCheckListPrint?year=${selectedYear}&month=${selectedMonth}&fromDate=${fromSelectedDate}&toDate=${toSelectedDate}&forkliftNo=${selectedForkliftNo}`;
    let query = [];

    // if (selectedDate) query.push(`date=${selectedDate}`);
    // if (selectedMonth) query.push(`month=${selectedMonth}`);
    // if (selectedYear) query.push(`year=${selectedYear}`);

    let finalUrl = baseUrl;
    console.log("finalUrl", finalUrl);

    const token = localStorage.getItem("token");

    axios
      .get(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const fetchedData = response.data;
          setPrintResponseData(fetchedData);
          setPrintLoading(true);

          // Fetch signatures for each entry
          fetchedData.forEach((data, index) => {
            // Fetch operator signature
            if (data.operator_sign) {
              axios
                .get(
                  `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.operator_sign}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
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
                  console.error("Error fetching operator image:", err);
                });
            }

            // Fetch store in-charge signature
            if (data.store_in_charge_sign) {
              axios
                .get(
                  `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.store_in_charge_sign}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
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
                  setGetImage1(url); // Save signature image by index
                })
                .catch((err) => {
                  console.error("Error fetching in-charge image:", err);
                });
            }
          });
          setTimeout(() => {
            window.print();
            handleModalClose();
          }, 3000);
        } else {
          setPrintResponseData([]);
          setPrintLoading(false);
          message.error(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose();
        }

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
        setPrintLoading(false);
      });
  };

  console.log("image", Image);

  const handleNavigate = () => {
    if (date == "") {
      // setError('Please select a date');
      message.warning("Please Select Date");
    } else if (forkliftNo == "") {
      message.warning("Please Select Forklift No.");
    } else {
      navigate("/Precot/Stores/F-008", {
        state: { forkliftNo: forkliftNo, date: date, month: month, year: year },
      });
    }
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
  const formattedDatesupervisor = formatDate(
    printResponseData.supervisor_submit_on
  );
  const formatedDateOperator = formatDate(
    printResponseData.operator_submitted_on
  );

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
    const monthName = months[date.getMonth()];

    return monthName.slice(0, 3).toUpperCase();
  };
  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  // const monthSelected = getMonthNameFromDate();

  // const yearSelected = getYearFromDate(printResponseData.year);

  const formattedDateHod = formatDate(printResponseData.hod_submit_on);
  const dateformated = formatDates(selectedDate);
  // console.loglog("formatedOperator", formatedDateOperator);
  return (
    <div>
      <GlobalStyle />
      {/* <div id="section-to-print">
        {Object.entries(
          printResponseData.reduce((groupedData, data) => {
            if (!groupedData[data.forkliftNo]) {
              groupedData[data.forkliftNo] = [];
            }
            groupedData[data.forkliftNo].push(data);
            return groupedData;
          }, {})
        ).map(([forkliftNo, forkliftData], groupIndex) => (
          <table style={{ scale: "90%", marginLeft: "10px" }} key={groupIndex}>
            <thead>
              <tr style={{ border: "none" }}>
                <td
                  style={{ border: "none", padding: "5px" }}
                  colSpan="15"
                ></td>
              </tr>
              <tr style={{ height: "20px" }}>
                <td rowSpan="4" style={{ textAlign: "center", width: "10%" }}>
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
                <td rowSpan="4" colSpan="10" style={{ textAlign: "center" }}>
                  <b>Forklift Movement Checklist</b>
                </td>
                <td colSpan="1">Format No.:</td>
                <td colSpan="3">PH- STR01/F-008</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Revision No.:</td>
                <td colSpan="3">02</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Ref.SOP No.:</td>
                <td colSpan="3">PH-STR01-D-05</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Page No.:</td>
                <td colSpan="3">
                  {groupIndex + 1} of {Object.keys(printResponseData).length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }}></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td colSpan="6">Forklift No.: {forkliftNo} </td>
                <td colSpan="4">Capacity (Kg): {forkliftData[0].capacity}</td>
                <td colSpan="4">
                  Month & Year: {forkliftData[0].month}/{forkliftData[0].year}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Date
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Start <br /> Meter <br /> Reading
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  End <br /> Meter <br /> Reading
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Total Meter <br />
                  reading of <br /> the day
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  In <br /> Km
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Out <br /> Km
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Total <br /> Km
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Charge In <br /> Time
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Charge Out <br /> Time
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Total <br /> Charge
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Remarks
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Forklift <br /> Operator <br /> Sign & Date
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Checked <br /> by <br /> Sign & <br /> Date
                </td>
              </tr>
              {forkliftData.map((data, index) => (
                <tr key={index}>
                  <td
                    colSpan="1"
                    style={{ textAlign: "center", height: "20px" }}
                  >
                    {formatDates(data.date)}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {data.startMeterReading}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {data.endMeterReading}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {data.totalMeterReading}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {data.inKm}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {data.outKm}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {data.totalKm}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {formatDate(data.chargeInTime)}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {formatDate(data.chargeOutTime)}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {data.totalCharge}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {data.remarks}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {getImage && <img className="signature" src={getImage} />}
                    <br />
                    {data.operator_sign} <br />
                    {formatDate(data.operator_submit_on)}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {getImage1 && <img className="signature" src={getImage1} />}
                    <br />
                    {data.store_in_charge_sign} <br />
                    {formatDate(data.store_in_charge_submit_on)}
                  </td>
                </tr>
              ))}
            </tbody>
            <br />
            <tfoot>
              <br />
              <tr style={{ height: "30px" }}>
                <td colSpan={5}>Particulars</td>
                <td colSpan={3}>Prepared by</td>
                <td colSpan={3}>Reviewed by</td>
                <td colSpan={2}>Approved by</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={5}>Name</td>
                <td colSpan={3}></td>
                <td colSpan={3}></td>
                <td colSpan={2}></td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={5}>Signature & Date</td>
                <td colSpan={3}></td>
                <td colSpan={3}></td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div> */}
      <div id="section-to-print">
        {Object.entries(
          printResponseData.reduce((groupedData, data) => {
            if (!groupedData[data.forkliftNo]) {
              groupedData[data.forkliftNo] = [];
            }
            groupedData[data.forkliftNo].push(data);
            return groupedData;
          }, {})
        ).map(([forkliftNo, forkliftData], groupIndex) => {
          const recordsPerPage = 5;
          const totalPages = Math.ceil(forkliftData.length / recordsPerPage);
          const paginatedData = [];
          for (let i = 0; i < forkliftData.length; i += recordsPerPage) {
            paginatedData.push(forkliftData.slice(i, i + recordsPerPage));
          }

          return paginatedData.map((pageData, pageIndex) => (
            // <table style={{ scale: "90%", marginLeft: "10px" }} key={`${groupIndex}-${pageIndex}`}>
            <div style={{ pageBreakAfter: "always" }} key={`${groupIndex}-${pageIndex}`}>
              <table style={{ scale: "90%", marginLeft: "10px" }}>
                <thead>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
                  </tr>
                  <tr style={{ height: "20px" }}>
                    <td rowSpan="4" style={{ textAlign: "center", width: "10%" }}>
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "80px", height: "auto" }}
                      />
                      <br />
                      <b style={{ fontFamily: "Times New Roman, Times, serif" }}>Unit H</b>
                    </td>
                    <td rowSpan="4" colSpan="10" style={{ textAlign: "center" }}>
                      <b>Forklift Movement Checklist</b>
                    </td>
                    <td colSpan="1">Format No.:</td>
                    <td colSpan="3">PH- STR01/F-008</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan="1">Revision No.:</td>
                    <td colSpan="3">02</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan="1">Ref.SOP No.:</td>
                    <td colSpan="3">PH-STR01-D-05</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan="1">Page No.:</td>
                    <td colSpan="3">
                      {pageIndex + 1} of {totalPages}
                    </td>
                  </tr>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }}></td>
                  </tr>
                </thead>
                <br />
                <tbody>
                  <tr>
                    <td colSpan="6">Forklift No.: {forkliftNo} </td>
                    <td colSpan="4">Capacity (Kg): {pageData[0].capacity}</td>
                    <td colSpan="4">
                      Month & Year: {pageData[0].month}/{pageData[0].year}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1" style={{ textAlign: "center" }}>Date</td>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      Start <br /> Meter <br /> Reading
                    </td>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      End <br /> Meter <br /> Reading
                    </td>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      Total Meter <br />
                      reading of <br /> the day
                    </td>
                    <td colSpan="1" style={{ textAlign: "center" }}>In Km</td>
                    <td colSpan="1" style={{ textAlign: "center" }}>Out Km</td>
                    <td colSpan="1" style={{ textAlign: "center" }}>Total Km</td>
                    <td colSpan="1" style={{ textAlign: "center" }}>Charge In Time</td>
                    <td colSpan="1" style={{ textAlign: "center" }}>Charge Out Time</td>
                    <td colSpan="1" style={{ textAlign: "center" }}>Total Charge</td>
                    <td colSpan="1" style={{ textAlign: "center" }}>Remarks</td>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      Forklift <br /> Operator <br /> Sign & Date
                    </td>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      Checked <br /> by <br /> Sign & <br /> Date
                    </td>
                  </tr>
                  {pageData.map((data, index) => (
                    <tr key={index}>
                      <td colSpan="1" style={{ textAlign: "center", height: "20px" }}>
                        {formatDates(data.date)}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{data.startMeterReading}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{data.endMeterReading}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{data.totalMeterReading}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{data.inKm}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{data.outKm}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{data.totalKm}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{formatDate(data.chargeInTime)}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{formatDate(data.chargeOutTime)}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{data.totalCharge}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>{data.remarks}</td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {getImage && <img className="signature" src={getImage} />}
                        <br />
                        {data.operator_sign} <br />
                        {formatDate(data.operator_submit_on)}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {getImage1 && <img className="signature" src={getImage1} />}
                        <br />
                        {data.store_in_charge_sign} <br />
                        {formatDate(data.store_in_charge_submit_on)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <br />
                <tfoot>
                  <br />
                  <tr style={{ height: "30px" }}>
                    <td colSpan={5}>Particulars</td>
                    <td colSpan={3}>Prepared by</td>
                    <td colSpan={3}>Reviewed by</td>
                    <td colSpan={2}>Approved by</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan={5}>Name</td>
                    <td colSpan={3}></td>
                    <td colSpan={3}></td>
                    <td colSpan={2}></td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan={5}>Signature & Date</td>
                    <td colSpan={3}></td>
                    <td colSpan={3}></td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ));
        })}
      </div>;



      <BleachingHeader
        unit="Unit-H"
        formName="FORKLIFT MOVEMENT CHECKLIST"
        formatNo="PH-STR01/F-008"
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
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
          <Form.Item label="Date">
            <Input
              type="date"
              value={date}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Forklift No.:">
            <Select
              onChange={forkliftNoChange}
              options={forkliftNumber}
              placeholder="Forklift No."
              style={{ width: "120%" }}
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
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={summary}
        />
      </div>
      <Modal
        title="Print"
        open={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printSubmit}
            // disabled={!selectedDate && (!selectedMonth || !selectedYear)}
            disabled={
              !(
                (fromSelectedDate && toSelectedDate) ||
                (selectedMonth && selectedYear)
              )
            }
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
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
              }}
              onChange={(value) => {
                setSelectedYear(value);
              }}
              placeholder="Select Year"
              disabled={fromSelectedDate || toSelectedDate}
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
              }}
              onChange={(value) => setSelectedMonth(value)}
              placeholder="Select Month"
              disabled={fromSelectedDate || toSelectedDate}
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
          <Form.Item label="Forklift No.:">
            <Select
              value={selectedForkliftNo}
              onChange={setSelectedForkliftNo}
              options={forkliftNumber}
              placeholder="Forklift No."
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="From Date">
            <Input
              type="date"
              value={fromSelectedDate}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setFromSelectedDate(e.target.value)}
              disabled={selectedMonth || selectedYear}
            />
          </Form.Item>
          <Form.Item label="To Date">
            <Input
              type="date"
              value={toSelectedDate}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setToSelectedDate(e.target.value)}
              disabled={selectedMonth || selectedYear}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Stores_f008_summary;
