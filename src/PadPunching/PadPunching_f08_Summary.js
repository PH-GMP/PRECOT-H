/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../Assests/logo.png";
import {
  Table,
  Modal,
  Select,
  InputGroup,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader.js";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { Tabs, Button, Col, Input, Row } from "antd";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import moment from "moment";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const PadPunching_f08_Summary = () => {
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
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const navigate = useNavigate();
  const [summaryData, setSummaryData] = useState([]);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState("");
  const [machineName, setMachineName] = useState("");
  const [month, setMonth] = useState("");
  const [yearPrint, setYearPrint] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const [machineNameLov, setmachineNameLov] = useState([]);
  const monthsLov = [
    { id: 1, value: "January" },
    { id: 2, value: "February" },
    { id: 3, value: "March" },
    { id: 4, value: "April" },
    { id: 5, value: "May" },
    { id: 6, value: "June" },
    { id: 7, value: "July" },
    { id: 8, value: "August" },
    { id: 9, value: "September" },
    { id: 10, value: "October" },
    { id: 11, value: "November" },
    { id: 12, value: "December" },
  ];
  const formattedDateSupervisor = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }

  const yearOptions = generateYearOptions(2024, 2040);
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username =
      printResponseData?.[printResponseData.length - 1]?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

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
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username =
      printResponseData?.[printResponseData.length - 1]?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

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
          console.log("Response:", res.data);
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
  }, [printResponseData,API.prodUrl, token]);

  const formattedDatesupervisor = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDateCommon = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setShiftLov(data);
        } else {
          console.error("API response is not an array", data);
          setShiftLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setShiftLov([]);
      }
    };

    fetchShiftOptions();
  }, [token]);
  useEffect(() => {
    const fetchmachineNameOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/padpunching/MachineLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setmachineNameLov(data);
        } else {
          console.error("API response is not an array", data);
          setmachineNameLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setmachineNameLov([]);
      }
    };

    fetchmachineNameOptions();
  }, [token]);

  const handleShiftChange = (value) => {
    setShift(value);
    console.log("shift value", shift);
  };
  const handleMachineNameChange = (value) => {
    setMachineName(value);
  };
  const handleWeekChange = (value) => {
    setWeek(value);
  };
  const handleMonthChange = (value) => {
    setMonth(value);
  };
  const handleYearChange = (value) => {
    setYear(value);
  };
  const handleMonthPrintChange = (value) => {
    setMonthPrint(value);
  };
  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };
  //   print Model
  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };

  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 100);
    }
  }, [printResponseData]);

  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
    setMonthPrint(null);
  };

  //   handle edit
  const handleEdit = (record) => {
    console.log("recorddd", record);
    const { machineName } = record;
    const { week } = record;
    const { month } = record;
    const { year } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/PadPunching/F-08", {
      state: {
        machineName: machineName,
        week: week,
        month08: month,
        year08: year,
      },
    });
    console.log("selected Date edit", date);
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  //   summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/PadPunching/Service/getSummarySanitisationOfMachinesAndSurfaces`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_HOD" ||
        role === "ROLE_DESIGNEE"
      ) {
        setCakingData(data);
      }

      console.log("Summary Get List", data);
      if (
        role === "ROLE_HOD" ||
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_DESIGNEE"
      ) {
        setSummaryData(
          data.map((item, index) => ({
            key: item.header_id,
            machineName: item.machineName,
            week: item.weekNo,
            month: item.month,
            year: item.year,
            supervisor_status: item.supervisor_status,
            hod_status: item.hod_status,
            id: item.id,
            sno: index + 1,
            reason: item.reason,
          }))
        );
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },
    {
      title: "Machine Name",
      dataIndex: "machineName",
      key: "machineName",
      align: "center",
    },
    {
      title: "Week",
      dataIndex: "week",
      key: "week",
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
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod/Designee Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%" }}
            //   disabled={record.status == "SUBMIT" ? true : false}
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

  const fetchPrintValue = () => {
    try {
      let monthP;
      let YearP;
      if (monthPrint == null) {
        monthP = "";
      } else {
        monthP = monthPrint;
      }
      if (yearPrint == null) {
        YearP = "";
      } else {
        YearP = yearPrint;
      }

      axios
        .get(
          `${API.prodUrl}/Precot/api/PadPunching/Service/findByMachineNameWeekNoMonthAndYearPrintApi/SanitisationOfMachinesAndSurfaces?month=${monthP}&year=${YearP}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.message !== "No data") {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
            console.log("print response...............", res.data[0]);
            console.log("set print response", printResponseData);
          } else {
            message.error(res.data.message);
            handleModalClose();
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  // Shift LOV

  // goto Button Fields
  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    console.log("date value", value);
  };

  //   goto button
  const goTo = () => {
    if ((machineName == "") | (machineName == null)) {
      message.warning("Please Select Machine Name");
      return;
    }
    if (week == "" || week == null) {
      message.warning("Please Select Week");
      return;
    }

    if (month == "" || month == null) {
      message.warning("Please Select Month");
      return;
    }
    if (year == "" || year == null) {
      message.warning("Please Select Year");
      return;
    }
    navigate("/Precot/PadPunching/F-08", {
      state: {
        machineName: machineName,
        week: week,
        month08: month,
        year08: year,
      },
    });
  };

  return (
    // print section
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {printResponseData?.map((slice, index) => (
          <table
            style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
            key={index}
          >
            <thead>
              <tr>
                <td colSpan="15" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="55" rowSpan="4" style={{ textAlign: "center" }}>
                  {" "}
                  Sanitization Of Machines & Surfaces
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-PRD03/F-008</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-PRD04-D-04</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15">
                  {index + 1}of {printResponseData?.length}
                </td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <th colSpan="15">Machine Name: </th>
                <td colSpan="15">
                  {printResponseData && printResponseData[index][0].machineName}
                </td>
                <th colSpan="20">Frequency: </th>
                <td colSpan="15">Weekly</td>
                <th colSpan="20">Month & Year:</th>
                <td colSpan="15">
                  {printResponseData && printResponseData[index][0].month}/
                  {printResponseData && printResponseData[index][0].year}
                </td>
              </tr>
              <tr>
                <th colSpan="25">Name of the Chemical: </th>
                <td colSpan="25">
                  {printResponseData && printResponseData[index]
                    ? printResponseData[index][0].nameOfChemical
                    : "N/A"}
                </td>
                <th colSpan="25">Chemical Batch Number: </th>
                <td colSpan="25">
                  {printResponseData && printResponseData[index]
                    ? printResponseData[index][0].chemicalBatchNumber
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th colSpan="20">Exp. Date: </th>
                <td colSpan="80">
                  {printResponseData && printResponseData[index]
                    ? formattedDateCommon(
                        printResponseData[index][0].expDate
                      ) || "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th colSpan="100">
                  Note : All the surfaces of machines and packing tables, which
                  are coming in direct contact with the product is to be
                  sanitized with disinfectant solution
                </th>
              </tr>
              <tr>
                <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                  S. No.
                </th>
                <th colSpan="20" rowSpan="2" style={{ textAlign: "center" }}>
                  Activity
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Week 1
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Week 2
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Week 3
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Week 4
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Week 5
                </th>
              </tr>
              <tr>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {(() => {
                    const weekData = printResponseData[index]?.find(
                      (item) => item.weekNo === "Week 1"
                    );
                    const dateStr = weekData ? weekData.date : null;
                    return dateStr ? formatDate(dateStr) : "N/A";
                  })()}
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  {(() => {
                    const weekData = printResponseData[index]?.find(
                      (item) => item.weekNo === "Week 2"
                    );
                    const dateStr = weekData ? weekData.date : null;
                    return dateStr ? formatDate(dateStr) : "N/A";
                  })()}
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  {(() => {
                    const weekData = printResponseData[index]?.find(
                      (item) => item.weekNo === "Week 3"
                    );
                    const dateStr = weekData ? weekData.date : null;
                    return dateStr ? formatDate(dateStr) : "N/A";
                  })()}
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  {(() => {
                    const weekData = printResponseData[index]?.find(
                      (item) => item.weekNo === "Week 4"
                    );
                    const dateStr = weekData ? weekData.date : null;
                    return dateStr ? formatDate(dateStr) : "N/A";
                  })()}
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  {(() => {
                    const weekData = printResponseData[index]?.find(
                      (item) => item.weekNo === "Week 5"
                    );
                    const dateStr = weekData ? weekData.date : null;
                    return dateStr ? formatDate(dateStr) : "N/A";
                  })()}
                </th>
              </tr>
              <tr>
                <td colSpan="5">1</td>
                <td colSpan="20">Roll Feeding Area / conveyor</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.rollFeedingAreaConveyor === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.rollFeedingAreaConveyor === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.rollFeedingAreaConveyor === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.rollFeedingAreaConveyor === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.rollFeedingAreaConveyor === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.rollFeedingAreaConveyor === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.rollFeedingAreaConveyor === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.rollFeedingAreaConveyor === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.rollFeedingAreaConveyor === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.rollFeedingAreaConveyor === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="5">2</td>
                <td colSpan="20">Punching Tools</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.punchingTools === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.punchingTools === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.punchingTools === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.punchingTools === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.punchingTools === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.punchingTools === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.punchingTools === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.punchingTools === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.punchingTools === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.punchingTools === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="5">3</td>
                <td colSpan="20">Tool / Dies surfaces</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.toolsDiesSurfaces === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.toolsDiesSurfaces === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.toolsDiesSurfaces === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.toolsDiesSurfaces === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.toolsDiesSurfaces === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.toolsDiesSurfaces === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.toolsDiesSurfaces === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.toolsDiesSurfaces === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.toolsDiesSurfaces === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.toolsDiesSurfaces === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="5">4</td>
                <td colSpan="20">Travel Rollers</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.travelRollers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.travelRollers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.travelRollers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.travelRollers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.travelRollers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.travelRollers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.travelRollers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.travelRollers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.travelRollers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.travelRollers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="5">5</td>
                <td colSpan="20">Carriers / Wagon / Magazine</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.carriersWagonMagazine === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.carriersWagonMagazine === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.carriersWagonMagazine === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.carriersWagonMagazine === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.carriersWagonMagazine === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.carriersWagonMagazine === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.carriersWagonMagazine === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.carriersWagonMagazine === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.carriersWagonMagazine === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.carriersWagonMagazine === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="5">6</td>
                <td colSpan="20">Pushers</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.pushers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.pushers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.pushers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.pushers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.pushers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.pushers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.pushers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.pushers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.pushers === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.pushers === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="5">7</td>
                <td colSpan="20">Chute (for FALU)</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.chuteForFalu === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.chuteForFalu === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.chuteForFalu === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.chuteForFalu === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.chuteForFalu === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.chuteForFalu === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.chuteForFalu === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.chuteForFalu === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.chuteForFalu === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.chuteForFalu === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="5">8</td>
                <td colSpan="20">Cutting Table (for 5x6/Puffs)</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.cuttingTable === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.cuttingTable === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.cuttingTable === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.cuttingTable === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.cuttingTable === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.cuttingTable === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.cuttingTable === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.cuttingTable === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.cuttingTable === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.cuttingTable === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="5">9</td>
                <td colSpan="20">Cutting Blades</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.cuttingBlades === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.cuttingBlades === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.cuttingBlades === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.cuttingBlades === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.cuttingBlades === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.cuttingBlades === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.cuttingBlades === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.cuttingBlades === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.cuttingBlades === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.cuttingBlades === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="5">10</td>
                <td colSpan="20">All packing Tables</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.allPackingTables === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.allPackingTables === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.allPackingTables === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.allPackingTables === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.allPackingTables === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.allPackingTables === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.allPackingTables === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.allPackingTables === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0
                    ? printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.allPackingTables === "Y"
                      ? "✓"
                      : printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.allPackingTables === "N"
                      ? "X"
                      : "N/A"
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="25">
                  Remark / Comment (in case of any abnormality observed) :{" "}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.remarks || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.remarks || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.remarks || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.remarks || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.remarks || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="25">Sanitized by Trained person</td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.sanitizedBy || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.sanitizedBy || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.sanitizedBy || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.sanitizedBy || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.sanitizedBy || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="25">Verified by Production Supervisor </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.supervisor_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.supervisor_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.supervisor_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />

                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.supervisor_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.supervisor_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />

                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.supervisor_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.supervisor_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />

                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.supervisor_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.supervisor_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />

                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.supervisor_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="25">Reviewed by HOD/ Designee </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 1"
                      )?.hod_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />

                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 1"
                        )?.hod_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 2"
                      )?.hod_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />

                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 2"
                        )?.hod_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 3"
                      )?.hod_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />

                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 3"
                        )?.hod_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 4"
                      )?.hod_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />

                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 4"
                        )?.hod_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(printResponseData[index])}
                      {printResponseData[index].find(
                        (item) => item.weekNo === "Week 5"
                      )?.hod_sign || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                  <br />

                  {printResponseData[index]?.length > 0 ? (
                    <>
                      {console.log(
                        "weekfidfj",
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )
                      )}
                      {formattedDatesupervisor(
                        printResponseData[index].find(
                          (item) => item.weekNo === "Week 5"
                        )?.hod_submit_on
                      ) || "N/A"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="100"></td>
              </tr>
              <tr>
                <th colSpan="25">Particular</th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="25">Name</th>
                <td colSpan="25"></td>
                <td colSpan="25"></td>
                <td colSpan="25"></td>
              </tr>
              <tr>
                <th colSpan="25">Signature & Date</th>
                <td colSpan="25"></td>
                <td colSpan="25"></td>
                <td colSpan="25"></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      {/* HEADER */}

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="Sanitization Of Machines & Surfaces "
          formatNo="PH-PRD03/F-008"
          MenuBtn={
            <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
            ></Button>
          }
          buttonsArray={[
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<IoPrint color="#00308F" />}
              onClick={handlePrint}
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
                confirm("Are you sure want to Logout") == true
                  ? navigate("/Precot")
                  : null;
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

        {/* Go To Row */}

        <Row
          align="middle"
          style={{
            marginTop: "10px",
            marginBottom: "2px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "20px",
            justifyContent: "left",
            marginLeft: "10px",
          }}
        >
          <Col>
            {" "}
            <label>Machine Name:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={machineName}
              onChange={handleMachineNameChange}
              style={{ width: "100%" }}
              placeholder="Search Machine Name No"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Machine Name
              </Select.Option>
              {machineNameLov.map((option) => (
                <Select.Option key={option.id} value={option.MCN}>
                  {option.MCN}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            {" "}
            <label>Week:</label>
          </Col>
          <Col>
            <Select
              style={{ width: "110%" }}
              value={week}
              showSearch
              onChange={handleWeekChange}
              placeholder="select Week"
            >
              <Select.Option value="" disabled selected>
                Week
              </Select.Option>
              <Select.Option value="Week 1">Week 1</Select.Option>
              <Select.Option value="Week 2">Week 2</Select.Option>
              <Select.Option value="Week 3">Week 3</Select.Option>
              <Select.Option value="Week 4">Week 4</Select.Option>
              <Select.Option value="Week 5">Week 5</Select.Option>
            </Select>
          </Col>

          <Col>
            {" "}
            <label>Month:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={month}
              onChange={handleMonthChange}
              style={{ width: "100%" }}
              placeholder="Search Month"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                month
              </Select.Option>
              {monthsLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col>
            {" "}
            <label>Year:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={year}
              onChange={handleYearChange}
              style={{ width: "100%" }}
              placeholder="Search Year"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Year
              </Select.Option>
              {yearOptions.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Button
              key="go"
              onClick={goTo}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                width: "100%",
              }}
              shape="round"
              icon={<BiNavigation color="#00308F" />}
              type="primary"
            >
              Go to
            </Button>
          </Col>
        </Row>
      </div>
      {/* Table...Summary */}
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={summaryData}
        />
      </div>

      {/* SUMMARY PRINT */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={printSubmit}
            //   disabled={!datePrint}
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Month :
          </label>
          <Select
            showSearch
            value={monthPrint}
            onChange={handleMonthPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Month"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              month
            </Select.Option>
            {monthsLov.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Year :
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={handleYearPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Year
            </Select.Option>
            {yearOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default PadPunching_f08_Summary;
