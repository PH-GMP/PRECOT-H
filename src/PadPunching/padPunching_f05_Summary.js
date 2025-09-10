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

const PadPunching_f05_Summary = () => {
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
  const [datePrint, setDatePrint] = useState("");
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
  const [machineName, setMachineName] = useState("");
  const [machineNameLov, setmachineNameLov] = useState([]);
  const [yearPrint, setYearPrint] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const handleMonthPrintChange = (value) => {
    setMonthPrint(value);
  };

  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };

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

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }

  const yearOptions = generateYearOptions(2024, 2040);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username =
        printResponseData[index]?.[printResponseData[index]?.length - 1]
          ?.hod_sign;
      setSaveLoading(true);
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
            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            if (index === printResponseData.length - 1) {
              setSaveLoading(false);
            }
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDateHod = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDatesupervisor = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  function formatDateToMonthYear(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options).replace(/\./g, "/");
  }

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

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

  const handleMachineNameChange = (value) => {
    setMachineName(value);
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
      }, 2000);
    }
  }, [printResponseData]);

  const handleModalClose = () => {
    setShowModal(false);
    setMonthPrint(null);
    setYearPrint(null);
  };

  //   handle edit
  const handleEdit = (record) => {
    console.log("recorddd", record);
    const { date } = record;
    const { machineName } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/PadPunching/F-05", {
      state: {
        date: formattedDate,
        machineName: machineName,
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

      let apiUrl = `${API.prodUrl}/Precot/api/PadPunching/Service/MachineCleaning/getMachineCleaningSummary`;

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
            date: item.date,
            machineName: item.machineName,
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
      title: "Date",
      dataIndex: "date",
      key: "formatDate",
      align: "center",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      title: "Machine Name",
      dataIndex: "machineName",
      key: "machineName",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  const fetchPrintValue = () => {
    let monthP;
    let yearP;
    if (monthPrint == null) {
      monthP = "";
    } else {
      monthP = monthPrint;
    }
    if (yearPrint == null) {
      yearP = "";
    } else {
      yearP = yearPrint;
    }
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/PadPunching/Service/MachineCleaning/getByMonthPrint?month=${monthP}&year=${yearP}`,
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
            console.log("details", res.data);
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

  // goto Button Fields

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    console.log("date value", value);
  };
  const handleDatePrintChange = (event) => {
    const value = event.target.value;
    setDatePrint(value);
    console.log("date value", value);
  };

  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    if (machineName == "" || machineName == null) {
      message.warning("Please Select Machine Name");
      return;
    }
    navigate("/Precot/PadPunching/F-05", {
      state: {
        date: date,
        machineName: machineName,
      },
    });
    console.log("selected Date in 23_______", date);
  };

  const [dateLov, setDateLov] = useState([]);
  useEffect(() => {
    const generateDates = () => {
      const dates = [];
      // Loop from 1 to 31
      for (let day = 1; day <= 31; day++) {
        dates.push(`${day}`);
      }
      return dates;
    };

    const dates = generateDates();
    console.log("Dates", dates);
    setDateLov(dates);
  }, [datePrint]);

  return (
    // print section
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {printResponseData?.map((slice, index) => (
          <table style={{ marginTop: "10px", scale: "95%" }} key={index}>
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
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
                <th colSpan="70" rowSpan="4" style={{ textAlign: "center" }}>
                  Machine Cleaning Check List
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-PRD03/F-005</td>
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
                  {index + 1} of {printResponseData.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
            </thead>
            <br />
            <br />
            <br />
            <br />
            <br />
            <tbody>
              <tr>
                <th colSpan="5" rowspan="2" style={{ textAlign: "center" }}>
                  Sr. No.
                </th>
                <th colSpan="10" rowspan="2" style={{ textAlign: "center" }}>
                  Cleaning Area
                </th>
                <th colSpan="7" rowspan="2" style={{ textAlign: "center" }}>
                  Frequency
                </th>
                <th colSpan="46">
                  Machine Name: {printResponseData[index][0].machineName}
                </th>
                <th colSpan="46">
                  Date for the Month of :{printResponseData[index][0].month}/
                  {printResponseData[index][0].year}
                </th>
              </tr>
              <tr>
                {dateLov.map((record, rowIndex) => (
                  <th key={rowIndex} colSpan="3">
                    <p
                      style={{
                        // width: "10px",
                        // height: "90px",
                        // display: "flex",
                        alignItems: "center",
                        // justifyContent: "center",
                      }}
                    >
                      {rowIndex + 1}
                    </p>
                  </th>
                ))}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="10">Punching Unit Parts</td>
                <td
                  colSpan="7"
                  rowSpan="12"
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Once in a Shift
                </td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const punchingUnitParts =
                    printData?.punchingUnitParts || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {punchingUnitParts === "Y"
                          ? "✓"
                          : punchingUnitParts === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="10">Pad pusher</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.padPusher || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  3{" "}
                </td>
                <td colSpan="10">Pad Ejector</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.padEjector || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="10">Pad Transport Wagon</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.padTransportWagon || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="10">Cleaning of Grease (main axle)</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.cleaningOfGrease || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="10">Critical Sensors </td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.criticalSensors || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="10">Roll Unwinding Conveyor</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.criticalSensors || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="10">Sealing Bag out feed Conveyor</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning =
                    printData?.sealingBagOutFeedConveyor || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  9
                </td>
                <td colSpan="10">Trim Collection Tank</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.trimCollectionTank || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  10
                </td>
                <td colSpan="10">Chiller Unit Filter</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.chillerUnitFilter || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  11
                </td>
                <td colSpan="10">Cleaning Carrier</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.cleaningCarrier || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  12
                </td>
                <td colSpan="10">Bag Magzine </td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.bagMagazine || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {machineCleaning === "Y"
                          ? "✓"
                          : machineCleaning === "N"
                          ? "X"
                          : "N/A"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="115" style={{ height: "10px" }}>
                  Remark / Comment (in case of any abnormality observed) :{" "}
                  {printResponseData[index]?.[
                    printResponseData[index]?.length - 1
                  ]?.remarks || "N/A"}
                </td>
              </tr>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <tr>
                <th colSpan="22" style={{ textAlign: "center" }}>
                  Cleaned by (Trained person) :
                </th>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.cleanedBy || "NA";
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {machineCleaning}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th colSpan="22" style={{ textAlign: "center" }}>
                  Verified by (Supervisor):
                </th>
                {dateLov.map((date, rowIndex) => {
                  const printData = printResponseData[index]?.find((data) => {
                    if (!data.date) {
                      return false;
                    }
                    const dateParts = data.date.split("-");
                    if (dateParts.length !== 3) {
                      return false;
                    }
                    const day = parseInt(dateParts[2]);
                    if (isNaN(day)) {
                      return false;
                    }
                    return day == date;
                  });
                  const machineCleaning = printData?.supervisor_sign || null;
                  return (
                    <td key={rowIndex} className="data-border" colSpan="3">
                      <p
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {machineCleaning}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td
                  colSpan="53"
                  style={{ height: "60px", position: "relative" }}
                >
                  <div style={{ display: "flex", alignItems: "left" }}>
                    <div>
                      Reviewed by HOD / Designee (atleast once in a month) :{" "}
                      <br />
                      <br />
                      <br />
                      {printResponseData[index]?.[
                        printResponseData[index]?.length - 1
                      ]?.hod_sign || ""}{" "}
                      <br />
                      {formattedDateHod(
                        printResponseData[index]?.[
                          printResponseData[index]?.length - 1
                        ]?.hod_submit_on || ""
                      )}
                    </div>
                    {getImage1[index] && (
                      <img
                        src={getImage1[index]}
                        alt={`Supervisor Sign ${index + 1}`}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginRight: "10px",
                          objectFit: "contain",
                          marginTop: "20px",
                        }}
                      />
                    )}
                  </div>
                </td>
                <td colSpan="62">
                  Note : <br />
                  Tick mark "√" indicates activity completed , Cross mark '"×"
                  indicate not completed and NA indicate not applicable..
                </td>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="30">Particular</th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="30">Name</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="25"></td>
              </tr>
              <tr>
                <th colSpan="30">Signature & Date</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
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
          formName="Machine Cleaning Check List"
          formatNo="PH-PRD03/F-005"
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
            gap: "10px",
            justifyContent: "left",
            marginLeft: "10px",
          }}
        >
          <Col>
            <label>Date :</label>
          </Col>
          <Col>
            <Input
              onChange={handleDateChange}
              type="date"
              value={date}
              size="small"
              //   max ={ formattedToday }
              style={{ width: "100%", height: "30px" }}
            />
          </Col>
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
              placeholder="Search Machine Name"
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
            loading={saveLoading}
          >
            Submit
          </Button>,
        ]}
      >
        {" "}
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

export default PadPunching_f05_Summary;
