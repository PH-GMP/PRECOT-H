/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Space,
  Table,
  Tag,
  Button,
  Print,
  Tooltip,
  DatePicker,
  message,
  Select,
} from "antd";
import { Modal, Input, Form, Col, Drawer, Row, Menu, Avatar } from "antd";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import { IoSave, IoPrint } from "react-icons/io5";
import { BiLock, BiNavigation, BiEdit } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import dayjs from "dayjs";
import moment from "moment";
import "./style.css";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import BleachingTail from "../Components/BleachingTail";
import BleachingPrintHeader from "../Components/BleachingPrintHeader";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { createGlobalStyle } from "styled-components";

const Bleaching_f03_summary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([{ date: "" }]);
  // const [formData, setFormData] = useState([]);
  const formName = "Metal Detector Checklist";

  const formatNo = "PH-PRD01/F-002";
  const revisionNo = "02";
  const sopNo = "PH-PRD01-D-03";
  const pageNo = "1 of 1";
  const defaultDateFormat = "YYYY/MM/DD";
  const dateFormat = "DD/MM/YYYY";
  const todayFormatted = moment().format("YYYY/MM/DD");
  const [selectedDate, setSelectedDate] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [messageApi, contextHolder] = message.useMessage();
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [reason, setReason] = useState(false);
  const [displayDateFormat, setDisplayFormat] = useState("");
  // const [formattedDate, setFormattedDate] = useState("");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectMonthDates, setSelectMonthDates] = useState([]);
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectSection, setSelectSection] = useState("");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const token = localStorage.getItem("token");

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
  }
`;
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const [printData, setPrintData] = useState([
    {
      remarks: "",
      hod_submit_by: "",
    },
  ]);
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printData?.[0]?.hod_sign;
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
  }, [printData, API.prodUrl, token]);

  const [printButtonLoading, setPrintButtonLoading] = useState(false);


  const handlePrintSummary = () => {
    setPrintButtonLoading(true);

    // Validate if all fields are selected
    if (selectMonth === "" || selectMonth === null) {
      message.warning("Please Select Month!");
      setPrintButtonLoading(false);
      return;
    } else if (selectYear === "" || selectYear === null) {
      message.warning("Please Select Year!");
      setPrintButtonLoading(false);
      return;
    } else if (selectSection === "" || selectSection === null) {
      message.warning("Please Select Section!");
      setPrintButtonLoading(false);
      return;
    }

    const monthDates = generateDatesForMonth(selectMonth, selectYear);
    setSelectMonthDates(monthDates);

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const apiUrl = `${API.prodUrl}/Precot/api/bleaching/Service/MetalDetectorList/getByMonthMetalDetectorList?month=${selectMonth}&year=${selectYear}&section=${selectSection}`;

    axios
      .get(apiUrl, config)
      .then((response) => {
        if (response.data.length > 0) {
          setPrintData(response.data);
          // Only attempt print if data is not empty
          setTimeout(() => {
            if (response.data.length > 0) {
              window.print();
            } else {
              setPrintButtonLoading(false);
            }
          }, 3000);
        } else {
          // Treat empty array as an error
          message.error("No data found");
          setPrintButtonLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error calling API:", error);
        message.error("Error fetching data. Please try again.");
        setPrintButtonLoading(false);
      })
      .finally(() => {
        // Ensure loading state is cleared after success or error
        setPrintButtonLoading(false);
      });
  };

  const handleCancel = () => {
    setIsPrintModalOpen(false);
    setSelectMonth("");
    setSelectYear("");
    setSelectSection("");
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of formData) {
        if (data.hod_status == "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [formData]);

  const [initialValues, setInitialValues] = useState({
    date: "",
    selectSection: "",
    currentMonthDates: [],
  });
  const notificationMessage = (messageType, errorMessage) => {
    messageApi.open({
      type: messageType,
      content: errorMessage,
    });
  };

  const generateDatesForMonth = (month, year) => {
    const dates = [];

    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      if (day < 10) {
        day = "0" + day;
      }
      const date = `${day}/${month}/${year}`;
      console.log('date  generateDatesForMonth =', date);
      dates.push(date);
    }
    console.log('dates  generateDatesForMonth =', dates);

    return dates;
  };

  let datesInOctober2024 = [];

  const getMonthFromDate = (dateStr) => {
    // console.log('dateString', dateStr);
    const dateParts = dateStr.split("/");
    return dateParts[1];
  };
  const getYearFromDate = (dateStr) => {
    const dateParts = dateStr.split("/");
    return dateParts[0];
  };

  const handleEditClick = (record) => {
    // const month = getMonthFromDate("22-06-2024");
    const date = record.date;
    const month = getMonthFromDate(date);
    const year = getYearFromDate(date);
    // console.log('current Month Dates', month);

    const initialValues = {
      date: date,
      selectSection: record.section,
    };
    navigate("/Precot/Bleaching/F-03", { state: { initialValues } });
  };

  // const formatDate = (dateString) => {
  //   // console.log("antd date" , dateString)
  //   const [year, month, day] = dateString.split('-');
  //   return `${day}/${month}/${year}`;
  // };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const baseColumns = [
    {
      title: "S. NO",
      dataIndex: "sNo",
      key: "sNo",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Equipment Name",
      dataIndex: "equipmentName",
      key: "equipmentName",
      align: "center",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<BiEdit />}
          style={{ width: "100%" }}
          onClick={() => handleEditClick(record)}
        >
          Review
        </Button>
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

  const handleDateChange = (e) => {

    const date = e.target.value;
    const formattedDate = formatedDate(date);
    const month = getMonthFromDate(formattedDate);
    const year = getYearFromDate(formattedDate);

    setInitialValues((prevValues) => ({
      ...prevValues,
      date: formattedDate,
    }));

    // selectMonthDates = [];
  };

  const handleSelctChange = (value) => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      selectSection: value,
    }));
  };

  const formatedDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatedDateforSummary = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleClick = () => {
    // console.log(initialValues.date, initialValues.selectSection)
    if (initialValues.date == "") {
      notificationMessage("warning", "please select Date!");
    } else if (
      initialValues.selectSection == "" ||
      initialValues.selectSection == null
    ) {
      notificationMessage("warning", "please select Section!");
    } else {
      // console.log('initial', initialValues);
      navigate("/Precot/Bleaching/F-03", { state: { initialValues } });
    }
  };


  const fetchPrintData = (date) => {
    const transformValue = (value) => {
      switch (value) {
        case "yes":
          return "✓";
        case "no":
          return "X";
        case "NA":
          "NA";
        default:
          return value;
      }
    };

    const record = printData.find((record) => record.date == date);

    let result = {
      metalContaminatedMaterials: "",
      noOfMetalContaminants: "",
      functionCheck: "",
      checkedBy: "",
      cleanedBy: "",
      hod_submit_by: "",
    };

    if (record) {
      result = {
        metalContaminatedMaterials: transformValue(
          record.metalContaminatedMaterials
        ),
        noOfMetalContaminants: transformValue(record.noOfMetalContaminants),
        functionCheck: transformValue(record.functionCheck),
        checkedBy: transformValue(record.supervisor_submit_by),
        cleanedBy: record.cleanedBy,
        hod_submit_by: transformValue(record.hod_submit_by),
      };
    } else {
      result = {
        metalContaminatedMaterials: transformValue("NA"),
        noOfMetalContaminants: transformValue("-"),
        functionCheck: transformValue("NA"),
        checkedBy: "",
        cleanedBy: "",
        hod_submit_by: "",
      };
    }

    return result;
  };

  const processMetalContaminatedMaterials = (selectMonthDates) => {
    console.log("processMetalContaminatedMaterials ehted");
    let lastValidIndex = -1;

    selectMonthDates.forEach((row, index) => {
      const value = fetchPrintData(row).metalContaminatedMaterials;
      if (value === "✓" || value === "X") {
        lastValidIndex = index;
      }
    });

    return selectMonthDates.map((row, index) => {
      console.log("processMetalContaminatedMaterials row", row);
      let value = fetchPrintData(row).metalContaminatedMaterials;
      if (value === "NA" && index > lastValidIndex) {
        value = "";
      }
      console.log("processMetalContaminatedMaterials value", value);

      return value;
    });
  };
  const processedData = processMetalContaminatedMaterials(selectMonthDates);

  const processFunctionCheck = (selectMonthDates) => {
    console.log("processFunctionCheck ehted");
    let lastValidIndex = -1;

    selectMonthDates.forEach((row, index) => {
      const value = fetchPrintData(row).functionCheck;
      if (value === "✓" || value === "X") {
        lastValidIndex = index;
      }
    });

    return selectMonthDates.map((row, index) => {
      console.log("processfunctionCheck row", row);
      let value = fetchPrintData(row).functionCheck;
      if (value === "NA" && index > lastValidIndex) {
        value = "";
      }
      console.log("processfunctionCheck value", value);

      return value;
    });
  };

  const processedFunctionCheck = processFunctionCheck(selectMonthDates);

  useEffect(() => {
    const role = localStorage.getItem("role");
    let url = `${API.prodUrl}/Precot/api/bleaching/Service/MetalDetectorList/getAllSupervisorNotSubmitted`;
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      url = `${API.prodUrl}/Precot/api/bleaching/Service/MetalDetectorList/getAllHodNotSubmitted`;
    }
    const fetchData = () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // const formattedDate = response.data ? convertDateFormat(response.data.date) : '';

            setFormData(response.data);
          })
          .catch((error) => {
            notificationMessage("error", "Failed to fetch data from API");
          });
      } else {
        notificationMessage("error", "No token found");
      }
    };

    fetchData();
  }, []);
  const getMonthName = (monthNumber) => {
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
    return months[monthNumber - 1]; // Adjust month index
  };
  const formattedHodSubmitOn = formatDate(
    printData.length > 0 && printData[printData.length - 1].hod_submit_on
      ? printData[printData.length - 1].hod_submit_on
      : ""
  );

  return (
    <div>
      <GlobalStyle />
      {contextHolder}
      <div>
        {
          <div id="section-to-print">
            <div>
              <div style={{ marginTop: "25px" }}>
                <BleachingPrintHeader
                  formName={formName}
                  formatNo={formatNo}
                  revisionNo={revisionNo}
                  refSopNo={sopNo}
                  pageNo={"1 of 2"}
                />
              </div>
              <br></br>
              <div style={{ marginTop: "7px" }}>
                <table style={{ borderCollapse: "collapse", width: "97%" }}>
                  <br />
                  <br />
                  <thead>
                    <tr>
                      <td className="data-border" colSpan={34}>
                        Section : {selectSection}
                      </td>
                    </tr>
                    <tr>
                      <td className="data-border" colSpan={34}>
                        Equipment Name : VETAL
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="data-border"
                        rowSpan={2}
                        style={{ width: "10px" }}
                      >
                        S.No.
                      </td>
                      <td
                        className="data-border"
                        rowSpan={2}
                        style={{ textAlign: "center" }}
                      >
                        Cleaning Area
                      </td>
                      <td
                        className="data-border"
                        rowSpan={2}
                        style={{ textAlign: "center" }}
                      >
                        <p style={{ transform: "rotate(270deg)" }}>Frequency</p>
                      </td>
                      <td className="data-border" colSpan={31}>
                        Date for the Month of: {getMonthName(selectMonth)}/
                        {selectYear}
                      </td>
                    </tr>

                    <tr>
                      {selectMonthDates.map((record, rowIndex) => (
                        <td key={rowIndex} className="data-border">
                          <p
                            style={{
                              width: "10px",
                              height: "90px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {rowIndex + 1}
                          </p>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="data-border" colSpan={34}>
                        I. CLEANING OF EQUIPMENT :
                      </td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="data-border" style={{ width: "10px" }}>
                        1
                      </td>
                      <td className="data-border">
                        Machine Cleaning & Removing Ejected <br></br>(metal
                        contaminated) materials
                      </td>
                      <td
                        className="data-border"
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                      >
                        <p>Daily</p>
                      </td>



                      {processedData.map((value, rowIndex) => (
                        <td className="data-border">
                          <p
                            style={{
                              width: "10px",
                              height: "70px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* {value} */}
                            {
                              value == "NA" ? (
                                <div style={{
                                  writingMode: "vertical-rl",
                                  transform: "rotate(180deg)",
                                  textAlign: "center",
                                  height: "50px", // adjust height as needed
                                  display: "flex",
                                  alignItems: "flex-end", // align text at the bottom
                                  justifyContent: "center"
                                }}>
                                  NA
                                </div>
                              ) : (
                                "✓"
                              )
                            }
                          </p>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="data-border" style={{ width: "10px" }}>
                        2
                      </td>
                      <td className="data-border">
                        No. of Metal Contamination Found
                      </td>
                      <td
                        className="data-border"
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                      >
                        <p>Daily</p>
                      </td>
                      {selectMonthDates.map((row, rowIndex) => (
                        <td className="data-border">
                          <p
                            style={{
                              width: "10px",
                              height: "70px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {
                              fetchPrintData(row).noOfMetalContaminants === "-" ? (
                                <div style={{
                                  writingMode: "vertical-rl",
                                  transform: "rotate(180deg)",
                                  textAlign: "center",
                                  height: "50px", // adjust height as needed
                                  display: "flex",
                                  alignItems: "flex-end", // align text at the bottom
                                  justifyContent: "center"
                                }}>
                                  NA
                                </div>
                              ) : (
                                fetchPrintData(row).noOfMetalContaminants
                              )
                            }
                          </p>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="data-border" colSpan={3}>
                        Cleaned by
                      </td>
                      {selectMonthDates.map((row, rowIndex) => (
                        <td className="data-border">
                          <p
                            style={{
                              width: "10px",
                              height: "90px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {/* {printData[0].metalContaminatedMaterials} */}
                            {fetchPrintData(row).cleanedBy || "NA"}
                          </p>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                  <br></br>
                </table>
              </div>
              <div style={{ marginTop: "5px", pageBreakAfter: "always" }}>
                <BleachingTail />
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <div>
                <BleachingPrintHeader
                  formName={formName}
                  formatNo={formatNo}
                  revisionNo={revisionNo}
                  refSopNo={sopNo}
                  pageNo={"2 of 2"}
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <table style={{ borderCollapse: "collapse", width: "97%" }}>
                  <thead>
                    <tr>
                      <td className="data-border" colSpan={34}>
                        II. CALIBRATION CHECK OF EQUIPMENT :
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="data-border" style={{ width: "10px" }}>
                        1
                      </td>
                      <td className="data-border">
                        Functioning of Metal Detector <br></br>/ Calibration
                        Check <br></br>(both detection & ejection) Using Ferrous{" "}
                        <br></br>Size : 3.0 mm
                      </td>
                      <td className="data-border">
                        <p style={{ transform: "rotate(270deg)" }}>Daily</p>
                      </td>

                      {processedFunctionCheck.map((value, rowIndex) => (
                        <td className="data-border">
                          <p
                            style={{
                              width: "10px",
                              height: "100px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* {printData[0].metalContaminatedMaterials} */}
                            {value}
                          </p>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="data-border" colSpan={3}>
                        Checked by
                      </td>
                      {selectMonthDates.map((row, rowIndex) => (
                        <td className="data-border">
                          <p
                            style={{
                              width: "10px",
                              height: "100px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {fetchPrintData(row).checkedBy || "NA"}
                          </p>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td
                        className="data-border"
                        style={{ width: "100%" }}
                        colSpan={34}
                      >
                        <p style={{ height: "80px" }}>
                          Remark/ comment(in case of any abnormality):{" "}
                          {printData.length > 0 ? printData[0].remarks : ""}
                          <br></br>
                          <br></br>
                          Note :The process of cleaning and checking the
                          equipment (metal detector) shall be carried out at the
                          first shift.
                          <br />
                          Tick mark "√" indicates activity completed, Cross mark
                          '"×" indicate not completed & "-" indicates metal not
                          found.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="data-border" colSpan={34}>
                        <p style={{ height: "80px" }}>
                          Reviewed by Head of the Department or Designee:
                          {/* {printData.length > 0 ? printData[0].hod_submit_by : ''}
                        <br></br>
                        {formattedHodSubmitOn}
                        <br></br>

                       Sign&date */}
                          {(printData[0].hod_status === "HOD_REJECTED" ||
                            printData[0].hod_status === "HOD_APPROVED") && (
                              <>
                                {/* <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >*/}
                                <div>
                                  {" "}
                                  {printData.length > 0
                                    ? printData[0].hod_submit_by
                                    : ""}
                                  <br></br>
                                  {formattedHodSubmitOn}
                                  <br></br>
                                </div>
                                {getImage !== "" && (
                                  <img
                                    className="signature"
                                    src={getImage}
                                    alt="HOD"
                                  />
                                )}
                                {/* </div> */}
                                {/* <span style={{fontSize:'11px',marginLeft:"0px"}}>Signature & Date</span> */}
                              </>
                            )}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ margin: "40px 0", marginTop: "25px" }}>
                <BleachingTail />
              </div>
            </div>
          </div>
        }
      </div>
      <div className="no-print">
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
              localStorage.getItem("role") == "ROLE_QA"
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
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Raw Material Isuue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "6",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
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
                        onClick={() => navigate("/Precot")}
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
        <Modal
          title="Print"
          open={isPrintModalOpen}
          onOk={() => setIsPrintModalOpen(false)}
          onCancel={() => handleCancel()}
          destroyOnClose={true}
          footer={[
            <Button
              loading={printButtonLoading}
              key="submit"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              type="primary"
              icon={<FaPrint color="#00308F" />}
              onClick={handlePrintSummary}
            >
              Print
            </Button>,
          ]}
        >
          {" "}
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
              value={selectYear}
              onChange={(value) => setSelectYear(value)}
              placeholder="Select Year"
            >
              {years.map((year) => (
                <Select.Option key={year.value} value={year.value}>
                  {year.label}
                </Select.Option>
              ))}
            </Select>

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
                onChange={(value) => setSelectMonth(value)}
                placeholder="Select Month"
              >
                {months.map((month) => (
                  <Select.Option key={month.value} value={month.value}>
                    {month.label}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <label htmlFor="yearSelect">Select Section</label>
              <Select
                // defaultValue="Blow room (CCP - 02A)"
                placeholder="Please select selectSection"
                style={{
                  width: "100%",
                }}
                onChange={(value) => setSelectSection(value)}
                options={[
                  {
                    value: "Blow room (CCP - 02A)",
                    label: "Blow room (CCP - 02A)",
                  },
                  {
                    value: "Bleaching (CCP - 02B)",
                    label: "Bleaching (CCP - 02B)",
                  },
                ]}
              />
            </div>
          </div>
        </Modal>

        <BleachingHeader
          formName={formName}
          formatNo={formatNo}
          unit={"UNIT H"}
          MenuBtn={
            <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
            ></Button>
          }
          buttonsArray={[
            // <Button
            //     onClick={handleBack}
            //     style={{ backgroundColor: "blue", color: "white", marginRight: '10px' }}
            //     type="primary"
            // >
            //     Back
            // </Button>,
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              onClick={() => setIsPrintModalOpen(true)}
              icon={<FaPrint color="#00308F" />}
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
              onClick={() => navigate("/Precot/choosenScreen")}
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
                if (confirm("You Want to logged out")) {
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
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <DatePicker style={{ margin: '10px' }} format={dateFormat} onChange={(date, dateString) => handleDateChange(date)} className='no-print' /> */}
        <label>Date :</label>
        <input
          type="date"
          style={{
            margin: "10px",
            padding: "5px",
            borderRadius: "10px",
            border: "1px solid black",
          }}
          onChange={handleDateChange}
          className="no-print"
          max={formattedToday}
        />
        <Select
          // defaultValue="Blow room (CCP - 02A)"
          placeholder="Please select section"
          style={{
            width: 220,
          }}
          onChange={handleSelctChange}
          options={[
            {
              value: "Blow room (CCP - 02A)",
              label: "Blow room (CCP - 02A)",
            },
            {
              value: "Bleaching (CCP - 02B)",
              label: "Bleaching (CCP - 02B)",
            },
          ]}
        />
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
          onClick={handleClick}
        // disabled={gotobtn}
        >
          Go To
        </Button>
      </div>

      <Table
        dataSource={formData}
        columns={columns}
        pagination={{
          pageSize: pageSize,
        }}
        className="bale-waste-summary"
      />
    </div>
  );
};

export default Bleaching_f03_summary;
