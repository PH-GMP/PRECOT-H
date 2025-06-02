/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  EditOutlined
} from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, Tooltip, message } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  BiLock,
  BiNavigation
} from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const DryGoods_F002_Summary = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: Portrait;
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
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [printData, setPrintData] = useState({
    details: [],
    printPdeRes: [],
  });
  console.log("333", printData.details);
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [newDate, setNewDate] = useState("");
  const [shift, setShift] = useState(null);
  const [gotobtn, setGotobtn] = useState(true);
  const [shiftLov, setShiftLov] = useState([]);
  const [date, setDate] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [shiftPrint, setShiftPrint] = useState("");
  const [machineName, setMachineName] = useState(null);
  const [printParams, setPrintParams] = useState({
    date: "",
    shift: "",
    machineNamePrint: "",
  });
  const [eSign, setESign] = useState({
    operator_sign: "",
    hod_sign: "",
  });
  const roleauth = localStorage.getItem("role");
  const [orderNo, setOrderNo] = useState([]);
  const [orderNoLov, setOrderNoLov] = useState([]);
  const [orderNoPrint, setOrderNoPrint] = useState([]);
  console.log("frds", machineName);

  const machineNameLov = [
    { value: "TC10-1", label: "TC10-1 " },
    { value: "TC10-2", label: "TC10-2" },
    { value: "PC-1", label: "PC-1" },
  ];

  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const fetchPDEDataLOV = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/goods/getSliver`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          const data = response.data;
          console.log("ResponsedPDE", data);
          setOrderNoLov(response.data);
        }
      } catch (error) {
        message.error(error.response.data.message);
      }
    };
    fetchPDEDataLOV();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}/${month}/${day}`;
  };

  const handleShiftChange = (value) => {
    setShift(value);
    setGotobtn(false);
  };

  const handleMachineNameChange = (value) => {
    setMachineName(value);
    setGotobtn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
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
  }, [token, printData]);

  useEffect(() => {
    if (printData.details.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintData((prevState) => ({
          ...prevState,
          details: [],
        }));
        setPrintButtonLoading(false);
      }, 3000);
    }
    setESign((prevState) => ({
      ...prevState,
      operator_sign: null,
      supervisor_sign: null,
      hod_sign: null,
    }));
  }, [printData]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const roleauth = localStorage.getItem("role");
      let apiUrl = "";
      if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
        apiUrl = `${API.prodUrl}/Precot/api/Drygoods/Service/getSliverSummarydetailsF02`;
      } else if (roleauth === "ROLE_OPERATOR") {
        apiUrl = `${API.prodUrl}/Precot/api/Drygoods/Service/getOperSummarydetailsF02`;
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
      for (const data of summaryData) {
        if (data.hod_status == "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);
  //---------------------------------------------------------------------------

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
        // console.log(data);

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

  // ---------------------------- Summary Table Column -------------------------
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
      render: (text) => formatDate(text),
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "Order No",
      dataIndex: "order_no",
      key: "order_no",
      align: "center",
    },
    {
      title: "Machine Name",
      dataIndex: "machine_name",
      key: "machine_name",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      align: "center",
    },
    {
      title: "Hod Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
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
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleEdit = (record) => {
    navigate(`/Precot/DryGoods/F-002`, {
      state: {
        newdate: record.date,
        shiftvalue: record.shift,
        machineName: record.machine_name,
        order_no: record.order_no,
      },
    });
  };

  const formatPrintDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      date: "",
      shift: "",
      machineNamePrint: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const handlePrintParams = (e, name) => {
    if (name == "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        date: e.target.value,
      }));
    }
    if (name == "shift") {
      setPrintParams((prevState) => ({
        ...prevState,
        shift: e,
      }));
    }
    if (name == "machineNamePrint") {
      setPrintParams((prevState) => ({
        ...prevState,
        machineNamePrint: e,
      }));
    }
  };

  const handlePrint = async () => {
    if (printParams.date == "" || printParams.date == null) {
      message.warning("Please Select Date");
      return;
    }
    if (printParams.shift == "" || printParams.shift == "") {
      message.warning("Please Select Shift");
      return;
    }
    if (
      printParams.machineNamePrint == "" ||
      printParams.machineNamePrint == ""
    ) {
      message.warning("Please Select MachineName");
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Drygoods/Service/getsliverDetailsForPrintF01?date=${printParams.date}&shift=${printParams.shift}&machine_name=${printParams.machineNamePrint}&order_no=${orderNoPrint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }
      const data = response.data[0];
      setPrintData((prevState) => ({
        ...prevState,
        ...data,
        details: response.data.map((x) => {
          return x.details;
        }),
      }));
      setTimeout(() => {
        fetchJob();
      }, 1000);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  const fetchJob = async () => {
    let pdeShift;
    switch (printParams.shift) {
      case "I":
        pdeShift = 1;
        break;
      case "II":
        pdeShift = 2;
        break;
      case "III":
        pdeShift = 3;
        break;
    }
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/goods/api/sliverStoppage?date=${printParams.date}&shift=${pdeShift}&machine_name=${printParams.machineNamePrint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length > 0) {
        setPrintData((prevState) => ({
          ...prevState,
          printPdeRes: response.data,
        }));
      }
    } catch (error) {
      message.error(error.response.data.message);
      setPrintButtonLoading(false);
    }
  };

  const entriesPerPage = 10;
  const consumptionReport = [];
  let numberOfPages = Math.ceil(printData.details.length / entriesPerPage);

  useEffect(() => {
    console.log("PrintData", printData);
  }, [printData]);

  if (printData || printData.details.length > 0) {
    for (let i = 0; i < printData.details.length; i += entriesPerPage) {
      consumptionReport.push(printData.details.slice(i, i + entriesPerPage));
    }
  }

  // useEffect(() => {
  //   if (printData) {
  //     setTimeout(() => {
  //       window.print();
  //     }, 3000);
  //   }
  //   // setESign((prevState) => ({
  //   //   ...prevState,
  //   //   operator_sign: null,
  //   //   supervisor_sign: null,
  //   //   hod_sign: null,
  //   // }));
  // }, [printData]);

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  // useEffect(() => {
  //   if (newDate) {
  //     const formattedDate = formatDateToDDMMYYYY(newDate);
  //     setDate(formattedDate);
  //   }
  // }, [newDate]);

  const goTo = () => {
    if (newDate == "" || newDate == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    } else if (machineName == "" || machineName == null) {
      message.warning("Please Select Machine Name");
      return;
    } else if (orderNo == "" || orderNo == null) {
      message.warning("Please Select Order No");
      return;
    }
    navigate("/Precot/DryGoods/F-002", {
      state: {
        newdate: newDate,
        shiftvalue: shift,
        machineName: machineName,
        order_no: orderNo,
      },
    });
  };

  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
  };

  const rowsPerPage = 30; // Define the number of rows per page

  // Prepare data by combining static and dynamic parts
  const preparePaginatedData = () => {
    let pages = [];
    let currentPage = [];
    let rowCount = 0;

    // 1. Add Static Content (this will always be on the first page)
    const staticContent = [
      {
        type: "static",
        content: [
          { label: "Machine Name", value: printData.machine_name },
          { label: "Date", value: moment(printData.date).format("DD/MM/YYYY") },
          { label: "Shift", value: printData.shift },
          { label: "Lay down No", value: printData.laydown_no },
          { label: "Order No.", value: printData.order_no },
          { label: "Mixing", value: printData.mixing },
          { label: "Std. Wt in Grams", value: printData.std_wt },
        ],
      },
    ];

    // Add static content to the first page
    for (const row of staticContent[0].content) {
      if (rowCount >= rowsPerPage) {
        pages.push(currentPage); // Push to next page if row count exceeds
        currentPage = [];
        rowCount = 0;
      }

      currentPage.push({ type: "static", label: row.label, value: row.value });
      rowCount++;
    }

    if (rowCount >= rowsPerPage) {
      pages.push(currentPage); // Push to next page if row count exceeds
      currentPage = [];
      rowCount = 0;
    }
    currentPage.push({ type: "parameter", content: "1.Parameters:" });
    rowCount++;

    // Add Parameter Headings
    const parameterHeadings = [
      { title: "GMP", colSpan: 2 },
      { title: "Draft", colSpan: 3 },
      { title: "Doffer Speed in RPM", colSpan: 3 },
      { title: "Sliver Length in MTRS", colSpan: 3 },
    ];

    currentPage.push({ type: "parameterheading", content: parameterHeadings });
    rowCount++;

    currentPage.push({
      type: "parameters",
      data: {
        gmp: printData.gmp,
        draft: printData.draft,
        doffer_speed: printData.doffer_speed,
        sliver_length: printData.sliver_length,
      },
    });
    rowCount++;

    // 2. Add Sliver Receipt Header
    if (rowCount >= rowsPerPage) {
      pages.push(currentPage); // Push to next page if row count exceeds
      currentPage = [];
      rowCount = 0;
    }
    currentPage.push({ type: "header", content: "2. Sliver Receipt:" });
    rowCount++;

    const sliverHeadings = [
      { title: "S. No.", colSpan: 1 },
      { title: "Sliver Can No", colSpan: 3 },
      { title: "GPM", colSpan: 2 },
      { title: "Carding M/c No.", colSpan: 3 },
      { title: "Net Wt. In Kg", colSpan: 2 },
    ];

    // Add Sliver Receipt Heading
    if (rowCount >= rowsPerPage) {
      pages.push(currentPage); // Push current page
      currentPage = [];
      rowCount = 0;
    }
    currentPage.push({ type: "heading", content: sliverHeadings });
    rowCount++;

    // Initialize Sliver Index for numbering
    let sliverIndex = 1;

    // 3. Add Sliver Receipt Data
    if (printData.details && printData.details.length > 0) {
      for (let detail of printData.details[0]) {
        if (rowCount >= rowsPerPage) {
          pages.push(currentPage); // Push to next page if row count exceeds
          currentPage = [];
          rowCount = 0;

          // Re-add headings on a new page
          currentPage.push({ type: "heading", content: sliverHeadings });
          rowCount++;
        }

        currentPage.push({
          type: "sliver",
          index: sliverIndex++,
          data: detail,
        });
        rowCount++;
      }
    }

    // Add "3. Output Details" Header
    currentPage.push({ type: "outputheader", content: "3. Output Details:" });
    rowCount++;

    // Add Hours Heading
    const hoursHeadings = [
      { title: "Hours", colSpan: 1 },
      { title: "1", colSpan: 1 },
      { title: "2", colSpan: 1 },
      { title: "3", colSpan: 1 },
      { title: "4", colSpan: 1 },
      { title: "5", colSpan: 1 },
      { title: "6", colSpan: 1 },
      { title: "7", colSpan: 1 },
      { title: "8", colSpan: 1 },
      { title: "Total", colSpan: 2 },
    ];

    currentPage.push({ type: "8hrheading", content: hoursHeadings });
    rowCount++;

    // Add Hourly Weight Data
    currentPage.push({
      type: "output_hours",
      data: {
        hours_01: printData.hours_01,
        hours_02: printData.hours_02,
        hours_03: printData.hours_03,
        hours_04: printData.hours_04,
        hours_05: printData.hours_05,
        hours_06: printData.hours_06,
        hours_07: printData.hours_07,
        hours_08: printData.hours_08,
        total_sum: printData.total_sum,
      },
    });
    rowCount++;

    // Add Waste and Weight Headings
    const wasteHeadings = [
      { title: "Waste in Kg", colSpan: 3, rowSpan: 2 },
      { title: "Compactor Wt. in Kg", colSpan: 4 },
      { title: "Sliver Weight in Kg", colSpan: 4 },
    ];

    currentPage.push({ type: "wasteheading", content: wasteHeadings });
    rowCount++;

    // Add Compactor & Sliver Weights
    currentPage.push({
      type: "output_weights",
      data: {
        compactor_wt: printData.compactor_wt,
        sliver_wt: printData.sliver_wt,
      },
    });
    rowCount++;

    // 5. Add Stoppage Header
    if (rowCount >= rowsPerPage) {
      pages.push(currentPage); // Push to next page if row count exceeds
      currentPage = [];
      rowCount = 0;
    }
    currentPage.push({ type: "header", content: "4. Stoppage:" });
    rowCount++;
    // Add Stoppage Headings
    const stoppageHeadings = [
      { title: "Nature Of Problem", colSpan: 3 },
      { title: "Stop. Time", colSpan: 2 },
      { title: "Restart Time", colSpan: 2 },
      { title: "Idle Time (in Min)", colSpan: 2 },
      { title: "Remarks", colSpan: 2 },
    ];

    currentPage.push({ type: "stoppageheading", content: stoppageHeadings });
    rowCount++;

    // 6. Add Stoppage Data
    if (printData.printPdeRes.length > 0) {
      for (let row of printData.printPdeRes) {
        if (rowCount >= rowsPerPage) {
          pages.push(currentPage); // Push to next page if row count exceeds
          currentPage = [];
          rowCount = 0;
        }

        currentPage.push({ type: "stoppage", data: row });
        rowCount++;
      }
    } else {
      // If no stoppage data is available, add a "No stoppage details" row
      currentPage.push({ type: "stoppage", data: null });
    }

    // Add the last page if it has data
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  };

  // Get the paginated data
  const pages = preparePaginatedData();
  const totalPages = pages.length;

  return (
    <>
      <div>
        {contextHolder}
        <GlobalStyle />
        <div id="section-to-print">
          <style>
            {`
     @media print {
  .page-break {
    break-before: page;
  }
}
    `}
          </style>
          <main>
            <div className="print-container">
              {pages.map((rows, index) => (
                <div key={index} className="page-break">
                  <table style={{ width: "98%", tableLayout: "fixed" }}>
                    <thead>
                      <tr>
                        <td style={{ border: "none", padding: "10px" }}></td>
                      </tr>
                      <tr>
                        <td
                          colSpan="2"
                          rowSpan="4"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={logo}
                            alt="Logo"
                            style={{ width: "80px", height: "auto" }}
                          />
                          <br />
                          Unit H
                        </td>
                        <th
                          colSpan="5"
                          rowSpan="4"
                          style={{ textAlign: "center" }}
                        >
                          Daily Production - Sliver Making
                        </th>
                        <td colSpan="2">Format No.:</td>
                        <td colSpan="2">PH-PRD04/F-002</td>
                      </tr>
                      <tr>
                        <td colSpan="2">Revision No.:</td>
                        <td colSpan="2">01</td>
                      </tr>
                      <tr>
                        <td colSpan="2">Ref. SOP No.:</td>
                        <td colSpan="2">PH-PRD04-D-03</td>
                      </tr>
                      <tr>
                        <td colSpan="2">Page No.:</td>
                        <td colSpan="2">
                          {index + 1} of {totalPages}
                        </td>
                      </tr>
                    </thead>
                    <br />
                    <tbody>
                      {rows.map((row, rowIndex) => {
                        if (row.type === "static") {
                          if (row.label === "Machine Name") {
                            return (
                              <tr key={rowIndex}>
                                <td colSpan="3" style={{ textAlign: "center" }}>
                                  Machine Name
                                </td>
                                <td colSpan="8" style={{ textAlign: "center" }}>
                                  {printData.machine_name}
                                </td>
                              </tr>
                            );
                          }
                          if (row.label === "Date") {
                            return (
                              <tr key={rowIndex}>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                  Date
                                </td>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                  {moment(printData.date).format("DD/MM/YYYY")}
                                </td>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                  Shift
                                </td>
                                <td colSpan="1" style={{ textAlign: "center" }}>
                                  {printData.shift}
                                </td>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                  Lay down No
                                </td>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                  <span
                                    style={{
                                      width: "100%",
                                      display: "inline-block",
                                    }}
                                  >
                                    {printData.laydown_no
                                      ?.split(",")
                                      .reduce((rows, item, index) => {
                                        if (index % 3 === 0) rows.push([]);
                                        rows[rows.length - 1].push(item.trim());
                                        return rows;
                                      }, [])
                                      .map((row, rowIndex) => (
                                        <div key={rowIndex}>
                                          {row.join(", ")}
                                        </div>
                                      ))}
                                  </span>
                                </td>
                              </tr>
                            );
                          }
                          if (row.label === "Order No.") {
                            return (
                              <tr key={rowIndex}>
                                <td colSpan="3" style={{ textAlign: "center" }}>
                                  Order No.
                                </td>
                                <td colSpan="3" style={{ textAlign: "center" }}>
                                  {printData.order_no}
                                </td>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                  Mixing
                                </td>
                                <td colSpan="3" style={{ textAlign: "center" }}>
                                  {printData.mixing}
                                </td>
                              </tr>
                            );
                          }
                          if (row.label === "Std. Wt in Grams") {
                            return (
                              <tr key={rowIndex}>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                  Std. Wt in Grams (Wt. Tolerance in +/- 5%)
                                </td>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                  {printData.std_wt}
                                </td>
                              </tr>
                            );
                          }
                        } else if (row.type === "parameter") {
                          return (
                            <tr key={rowIndex}>
                              <td colSpan="11" style={{ textAlign: "left" }}>
                                {row.content}
                              </td>
                            </tr>
                          );
                        } else if (row.type === "parameterheading") {
                          return (
                            <tr key={rowIndex}>
                              {row.content.map((heading, idx) => (
                                <td
                                  key={idx}
                                  colSpan={heading.colSpan}
                                  style={{ textAlign: "center" }}
                                >
                                  {heading.title}
                                </td>
                              ))}
                            </tr>
                          );
                        } else if (row.type === "parameters") {
                          return (
                            <tr key={rowIndex}>
                              <td colSpan="2" style={{ textAlign: "center" }}>
                                {printData.gmp}
                              </td>
                              <td colSpan="3" style={{ textAlign: "center" }}>
                                {printData.draft}
                              </td>
                              <td colSpan="3" style={{ textAlign: "center" }}>
                                {printData.doffer_speed}
                              </td>
                              <td colSpan="3" style={{ textAlign: "center" }}>
                                {printData.sliver_length}
                              </td>
                            </tr>
                          );
                        } else if (row.type === "header") {
                          return (
                            <tr key={rowIndex}>
                              <td colSpan="11" style={{ textAlign: "left" }}>
                                {row.content}
                              </td>
                            </tr>
                          );
                        } else if (row.type === "heading") {
                          return (
                            <tr key={rowIndex}>
                              {row.content.map((heading, idx) => (
                                <td
                                  key={idx}
                                  colSpan={heading.colSpan}
                                  style={{ textAlign: "center" }}
                                >
                                  {heading.title}
                                </td>
                              ))}
                            </tr>
                          );
                        } else if (row.type === "sliver") {
                          return (
                            <tr key={rowIndex}>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                {row.index}
                              </td>
                              <td colSpan="3" style={{ textAlign: "center" }}>
                                {row.data.can_no}
                              </td>
                              <td colSpan="2" style={{ textAlign: "center" }}>
                                {row.data.gpm}
                              </td>
                              <td colSpan="3" style={{ textAlign: "center" }}>
                                {row.data.carding_mc_no}
                              </td>
                              <td colSpan="2" style={{ textAlign: "center" }}>
                                {row.data.net_wt}
                              </td>
                            </tr>
                          );
                        }
                        if (row.type === "outputheader") {
                          return (
                            <tr key={rowIndex}>
                              <td colSpan="11" style={{ textAlign: "left" }}>
                                {row.content}
                              </td>
                            </tr>
                          );
                        } else if (row.type === "8hrheading") {
                          return (
                            <tr key={rowIndex}>
                              {row.content.map((heading, idx) => (
                                <td
                                  key={idx}
                                  colSpan={heading.colSpan}
                                  rowSpan={heading.rowSpan || 1}
                                  style={{ textAlign: "center" }}
                                >
                                  {heading.title}
                                </td>
                              ))}
                            </tr>
                          );
                        } else if (row.type === "output_hours") {
                          return (
                            <tr key={rowIndex}>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                Wt. In Kg
                              </td>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                {row.data.hours_01}
                              </td>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                {row.data.hours_02}
                              </td>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                {row.data.hours_03}
                              </td>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                {row.data.hours_04}
                              </td>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                {row.data.hours_05}
                              </td>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                {row.data.hours_06}
                              </td>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                {row.data.hours_07}
                              </td>
                              <td colSpan="1" style={{ textAlign: "center" }}>
                                {row.data.hours_08}
                              </td>
                              <td colSpan="2" style={{ textAlign: "center" }}>
                                {row.data.total_sum}
                              </td>
                            </tr>
                          );
                        }
                        if (row.type === "wasteheading") {
                          return (
                            <tr key={rowIndex}>
                              {row.content.map((heading, index) => (
                                <td
                                  key={index}
                                  colSpan={heading.colSpan}
                                  rowSpan={heading.rowSpan || 1}
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {heading.title}
                                </td>
                              ))}
                            </tr>
                          );
                        } else if (row.type === "output_weights") {
                          return (
                            <tr key={rowIndex}>
                              <td colSpan="4" style={{ textAlign: "center" }}>
                                {row.data.compactor_wt}
                              </td>
                              <td colSpan="4" style={{ textAlign: "center" }}>
                                {row.data.sliver_wt}
                              </td>
                            </tr>
                          );
                        }
                        if (row.type === "stoppageheading") {
                          return (
                            <tr key={rowIndex}>
                              {row.content.map((heading, index) => (
                                <td
                                  key={index}
                                  colSpan={heading.colSpan}
                                  rowSpan={heading.rowSpan || 1}
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {heading.title}
                                </td>
                              ))}
                            </tr>
                          );
                        } else if (row.type === "stoppage") {
                          if (!row.data) {
                            return (
                              <tr key={rowIndex}>
                                <td
                                  colSpan="11"
                                  style={{ textAlign: "center" }}
                                >
                                  No stoppage details
                                </td>
                              </tr>
                            );
                          }
                          return (
                            <tr key={rowIndex}>
                              <td colSpan="3">{row.data.Scause}</td>
                              <td colSpan="2">{row.data.FTime}</td>
                              <td colSpan="2">{row.data.TTime}</td>
                              <td colSpan="2">{row.data.TotHrs}</td>
                              <td colSpan="2">{row.data.remarks}</td>
                            </tr>
                          );
                        }
                      })}
                      {index + 1 === totalPages && (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            {" "}
                            Operator Sign & Date <br></br>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "table-cell",
                                    verticalAlign: "bottom",
                                    paddingTop: "15px",
                                    borderTop: "none",
                                    textAlign: "center",
                                  }}
                                >
                                  {eSign.operator_sign ? (
                                    <img
                                      src={eSign.operator_sign}
                                      alt="eSign"
                                      style={{
                                        width: "100px",
                                        height: "50px",
                                        objectFit: "contain",
                                        mixBlendMode: "multiply",
                                      }}
                                    />
                                  ) : null}
                                </div>
                                <div style={{ textAlign: "center" }}>
                                  {printData.operator_sign} <br></br>
                                  {formatPrintDate(
                                    printData.operator_submitted_on
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td colSpan="6" style={{ textAlign: "center" }}>
                            {" "}
                            HOD / Designee Sign & Date <br></br>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "table-cell",
                                    verticalAlign: "bottom",
                                    paddingTop: "15px",
                                    borderTop: "none",
                                    textAlign: "center",
                                  }}
                                >
                                  {eSign.hod_sign ? (
                                    <img
                                      src={eSign.hod_sign}
                                      alt="HOD eSign"
                                      style={{
                                        width: "100px",
                                        height: "50px",
                                        objectFit: "contain",
                                        mixBlendMode: "multiply",
                                      }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                              {printData.hod_sign} <br></br>
                              {formatPrintDate(printData.hod_submit_on)}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr style={{ border: "none" }}>
                        <td style={{ border: "none" }} colSpan="11"></td>
                      </tr>
                      <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          Particulars
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          Prepared by
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          Reviewed by
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          Approved by
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">Name</td>
                        <td colSpan="3" style={{ textAlign: "center" }}></td>
                        <td colSpan="3" style={{ textAlign: "center" }}></td>
                        <td colSpan="3" style={{ textAlign: "center" }}></td>
                      </tr>
                      <tr>
                        <td colSpan="2">Signature & Date</td>
                        <td colSpan="3" style={{ textAlign: "center" }}></td>
                        <td colSpan="3" style={{ textAlign: "center" }}></td>
                        <td colSpan="3" style={{ textAlign: "center" }}></td>
                      </tr>

                      <tr style={{ border: "none" }}>
                        <td style={{ border: "none" }} colSpan="11"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <BleachingHeader
        formName={"Daily Production - Sliver Making "}
        formatNo={"PH-PRD04/F-002"}
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
            icon={<FaPrint color="#00308F" />}
            onClick={showPrintModal}
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
      <Modal
        title="Daily Production - Sliver Making (Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handlePrint}
            loading={printButtonLoading}
          >
            OK
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
            style={{ marginRight: "1px", width: "30%", textAlign: "center" }}
          >
            Machine Name:
          </label>

          <Select
            showSearch
            placeholder="Machine Name"
            id="ph-select"
            options={machineNameLov}
            value={printParams.machineNamePrint}
            onChange={(e) => {
              handlePrintParams(e, "machineNamePrint");
            }}
            size="medium"
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              margin: "10px",
              width: "200px",
            }}
          />
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
            Date:
          </label>

          <Input
            onChange={(e) => {
              handlePrintParams(e, "date");
            }}
            type="date"
            size="small"
            // max ={ formattedToday }
            style={{ width: "50%", height: "30px" }}
          />
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
            Shift:
          </label>

          <Select
            showSearch
            value={printParams.shift}
            // onChange={fetchPrintValue}
            style={{ width: "50%" }}
            placeholder="Search Batch No"
            optionFilterProp="children"
            onChange={(e) => {
              handlePrintParams(e, "shift");
            }}
          >
            <Select.Option value="" disabled selected>
              Shift
            </Select.Option>
            {shiftLov.map((option) => (
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
            Order Number:
          </label>
          <Select
            showSearch
            value={orderNoPrint}
            onChange={(e) => setOrderNoPrint(e)}
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              width: "50%",
            }}
          >
            {orderNoLov.map((option) => (
              <Select.Option key={option.id} value={option.POrder}>
                {option.POrder}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "16px",
        }}
      >
        <Input
          addonBefore="Date"
          placeholder="Date"
          type="date"
          size="Medium"
          value={newDate}
          style={{
            fontWeight: "bold",
            width: "135px",
            marginTop: "10px",
            marginLeft: "10px",
          }}
          onChange={(e) => setNewDate(e.target.value)}
          max={today}
        />

        <Select
          showSearch
          value={shift}
          onChange={handleShiftChange}
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            margin: "10px",
            marginLeft: "70px",
            width: "200px",
          }}
          placeholder="Shift"
          optionFilterProp="children"
        >
          <Select.Option value="" disabled selected>
            Shift
          </Select.Option>
          {shiftLov.map((option) => (
            <Select.Option key={option.id} value={option.value}>
              {option.value}
            </Select.Option>
          ))}
        </Select>

        <Select
          showSearch
          placeholder="Machine Name"
          id="ph-select"
          options={machineNameLov}
          onChange={handleMachineNameChange}
          value={machineName}
          size="medium"
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            margin: "10px",

            width: "200px",
          }}
        />

        <Select
          showSearch
          placeholder="Select Order Number"
          value={orderNo}
          onChange={(e) => setOrderNo(e)}
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            width: "250px",
            marginTop: "10px",
            marginLeft: "1rem",
          }}
        >
          {orderNoLov.map((option) => (
            <Select.Option key={option.id} value={option.POrder}>
              {option.POrder}
            </Select.Option>
          ))}
        </Select>

        <Button
          type="primary"
          style={{
            // backgroundColor: OrderNo ? "#E5EEF9" : "#f5f5f5",
            color: "#00308F",
            fontWeight: "bold",
            backgroundColor: "#E5EEF9",
            margin: "10px",
            marginLeft: "10px",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={goTo}
        >
          Go To
        </Button>
      </div>

      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default DryGoods_F002_Summary;
