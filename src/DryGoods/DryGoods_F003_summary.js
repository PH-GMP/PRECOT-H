/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Drygoods_f03_Summary = () => {
  const GlobalStyle = createGlobalStyle`
 
`;
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [ContaminationData, setContaminationData] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [datePrint, setDatePrint] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [orderNoPrint, setOrderNoPrint] = useState("");

  const [printResponseData, setPrintResponseData] = useState(null);
  const [ConsumtionData, setConsumtionData] = useState([]);
  const [reason, setReason] = useState(false);
  const [stoppagedata, setstoppagedata] = useState("");
  const [cakingData, setCakingData] = useState([]);
  const [batchNolistValue, setBatchNolistValue] = useState("Machine   Name"); // State for the value
  const [batchNolistLabel, setBatchNolistLabel] = useState(""); // State for the label
  const [batchNolistValue2, setBatchNolistValue2] = useState("Machine   Name"); // State for the value
  const [batchNolistLabel2, setBatchNolistLabel2] = useState(""); // State for the label
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [batchno, setbatchno] = useState([]);
  const [batchno2, setbatchno2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableshiftlov, setAvailableShiftslov] = useState("Select Shift");
  const { Option } = Select;
  const [availableshift2, setAvailableShifts2] = useState([]);
  const [availableshift, setAvailableShifts] = useState([]);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [availableshiftlov2, setAvailableShiftslov2] = useState("Select Shift");
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const machineNameLov = [
    { value: "BL1", label: "TEXCOR" },
    { value: "BL2", label: "LINK" },
  ];
  const machineNameLov2 = [
    { value: "BL1", label: "TEXCOR" },
    { value: "BL2", label: "LINK" },
  ];
  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift; // Return the original value if it doesn't match any case
    }
  };

  useEffect(() => {
    const fetchDataOrderNumber = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getDrygoodsOrderNoLov`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("datavalues", data);

        // console.log("Summary Get List",data)
        if (data && data.length >= 0) {
          // setOrderdetails(data);
          setbatchno(data);
        } else {
          message.error(data.message);
          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 1500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.data.message);
      } finally {
      }
    };
    fetchDataOrderNumber();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // fetchDataOrderNumber();
    fetchDataShift();
    const username = printResponseData?.supervisor_sign;
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
  }, [printResponseData,API.prodUrl, token]);
  const handleSelectChange = (value) => {
    const selectedMachine = machineNameLov.find(
      (MacLOV) => MacLOV.value === value
    );

    // Set both value and label in separate states
    setBatchNolistValue(value); // Set the value
    setBatchNolistLabel(selectedMachine?.label || ""); // Set the label
  };
  const handleSelectChange2 = (value) => {
    const selectedMachine = machineNameLov.find(
      (MacLOV) => MacLOV.value === value
    );

    // Set both value and label in separate states
    setBatchNolistValue2(value); // Set the value
    setBatchNolistLabel2(selectedMachine?.label || ""); // Set the label
  };
  const roleBase = localStorage.getItem("role");

  const fetchDataShift = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const shifts = res.data.map((shift) => shift.value);
          setAvailableShifts(shifts);
          setAvailableShifts2(shifts);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.hod_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.operator_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);
  const formattedDate_hod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const formattedDate_Op = () => {
    if (printResponseData?.operator_submitted_on) {
      const date = moment(printResponseData.operator_submitted_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDatesupervisor = () => {
    if (printResponseData?.supervisor_submit_on) {
      const date = moment(printResponseData.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDateheader = () => {
    if (printResponseData?.date) {
      const date = moment(printResponseData.date);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrint = () => {
    setShowModal(true);
    setIsFetchSuccessful(false);
    setDatePrint(null);
    setAvailableShiftslov2(null);
    setBatchNolistValue2(null);
    // console.log("print screen works");
  };
  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
    setAvailableShiftslov2(null);
    setBatchNolistValue2(null);
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

  const printSubmit = () => {
    updatePageNumbers();
    fetchPrintData();
  };

  const fetchPrintData = () => {
    let mac;
    if (batchNolistValue2 == "BL1") {
      mac = "TEXCOR";
    } else {
      mac = "LINK";
    }
    axios
      .get(
        `${API.prodUrl}/Precot/api/drygoods/getdetailsForPrintF003?date=${datePrint}&shift=${availableshiftlov2}&machine_name=${mac}&order_no=${orderNoPrint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("values of ", res);

        if (res.data.length == 0) {
          message.error("No Data Found");
          setShowModal(false);
        } else if (res.data && res.data.message !== "No data") {
          fetchData_StoppageDetails(res.data);
          setIsFetchSuccessful(true);
          setTimeout(() => {
            window.print();
          }, 3000);
          setPrintResponseData(res.data[0]);
          message.success("Data Fetched Successfully");
          console.log("print data", res.data);

          //api image for operator
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.operator_sign}`,
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
              setGetImageOP(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });
          //api image for supervisor
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.supervisor_sign}`,
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
              setGetImageSUP(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });
          //api image for hod
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.hod_sign}`,
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
              setGetImageHOD(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });
        } else {
          setPrintResponseData([]);
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  };

  const fetchData_StoppageDetails = async (value) => {
    if (value) {
      console.log("stoppage", value[0]);
      let machinename;
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (value[0].machine_name == "TEXCOR") {
          machinename = "BL1";
        } else {
          machinename = "BL2";
        }
        const numberShift = convertShiftValue(value[0].shift);
        let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getDrygoodsStoppageDetailsF003?date=${value[0].date}&shift=${numberShift}&order_no=${value[0].order_no}&machine_name=${machinename}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("datavalues", data);

        // console.log("Summary Get List",data)
        if (data && data.length >= 0) {
          setstoppagedata(data);
          console.log("setstoppage", data);
        } else {
          message.error(data.message);
          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 1500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.data.message);
      } finally {
      }
    }
  };
  //   handle edit
  const handleEdit = (record) => {
    console.log("record", record);

    navigate("/Precot/DryGoods/F-03", {
      state: {
        date: record.date,
        shift: record.shift,
        order_no: record.order_no,
        machineName: record.machine_name,
      },
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getSummarydetailsF003`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "ROLE_OPERATOR" ||
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_HOD"
      ) {
      }

      if (data && data.length >= 0) {
        setContaminationData(data);
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.response?.data?.message);
    } finally {
    }
  };
  //   summary table Get api

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
      render: (text, record, index) => index + 1,
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
      title: "Order No",
      dataIndex: "order_no",
      key: "order_no",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      align: "center",
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      render: (text) => (
        <div style={{ padding: "8px", textAlign: "center" }}>{text}</div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%", textAlign: "center" }}
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
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
  } else {
    columns = baseColumns;
  }

  //   goto button
  const goTo = () => {
    if (
      batchNolistValue == null ||
      batchNolistValue == "" ||
      batchNolistValue == "[]" ||
      batchNolistValue == "Machine   Name" ||
      batchNolistValue == 0
    ) {
      message.warning("Please Select Machine Name");
      return;
    } else if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    } else if (orderNo == "" || orderNo == null) {
      message.warning("Please Select Order No");
      return;
    } else if (
      availableshiftlov == null ||
      availableshiftlov == "" ||
      availableshiftlov == "[]" ||
      availableshiftlov == "Select Shift" ||
      availableshiftlov == 0
    ) {
      message.warning("Please Select Shift No");
      return;
    }
    navigate("/Precot/DryGoods/F-03", {
      state: {
        date: date,
        shift: availableshiftlov,
        machincevalue: batchNolistValue,
        machineName: batchNolistLabel,
        order_no: orderNo,
      },
    });
    // console.log("selected Date",date);
  };
  function updatePageNumbers() {
    const pageNumberElements = document.querySelectorAll(".page-number");
    const pageElements = document.querySelectorAll(".page");

    pageNumberElements.forEach((pageNumberElement, index) => {
      pageNumberElement.textContent = `Page ${index + 1} of ${
        pageElements.length
      }`;
    });
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

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
          { label: "Machine Name", value: printResponseData?.machine_name },
          { label: "Order No.", value: printResponseData?.order_no },
          { label: "Date", value: formattedDateheader() },
          { label: "Shift", value: printResponseData?.shift },
          { label: "Product", value: "Cotton Ball" },
          {
            label: "Customer Name",
            value: printResponseData?.coustomer_name || "NA",
          },
          { label: "Ball/Bag", value: printResponseData?.ball_or_bag || "NA" },
          {
            label: "Sale Order No.",
            value: printResponseData?.sale_order_no || "NA",
          },
          { label: "Brand", value: printResponseData?.brand || "NA" },
          { label: "Bag/Box", value: printResponseData?.bag_or_box || "NA" },
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
    currentPage.push({ type: "parameter", content: "1. Machine Parameters:" });
    rowCount++;

    // Add Parameter Headings
    const parameterHeadings = [
      { title: "Cutting Length in mm", colSpan: 1 },
      { title: "Feed Roller Speed in %", colSpan: 1 },
      { title: "Cutting Roller Speed in %", colSpan: 2 },
      { title: "Sliver Weight in Grams", colSpan: 3 },
      { title: "Ball Weight in Grams", colSpan: 2 },
      { title: "Counts / Bag", colSpan: 1 },
      { title: "Std. Bags/Hr", colSpan: 1 },
    ];

    currentPage.push({ type: "parameterheading", content: parameterHeadings });
    rowCount++;

    currentPage.push({
      type: "parameters",
      data: {
        cutting_length: printResponseData?.cutting_length,
        feed_roller: printResponseData?.feed_roller,
        cutting_roller: printResponseData?.cutting_roller,
        sliver_weight_grams: printResponseData?.sliver_weight_grams,
        ball_weight_grams: printResponseData?.ball_weight_grams,
        bag_counts: printResponseData?.bag_counts,
        std_bags_per_hr: printResponseData?.std_bags_per_hr,
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
      { title: "Can No.", colSpan: 3 },
      { title: "Grams/ MTRS", colSpan: 2 },
      { title: "Carding M/C No.", colSpan: 3 },
      { title: "Net Wt in Kg", colSpan: 2 },
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
    if (
      printResponseData?.sliverreceiptdetails &&
      printResponseData?.sliverreceiptdetails.length > 0
    ) {
      for (let detail of printResponseData?.sliverreceiptdetails) {
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
        hours_01: printResponseData?.hours_01,
        hours_02: printResponseData?.hours_02,
        hours_03: printResponseData?.hours_03,
        hours_04: printResponseData?.hours_04,
        hours_05: printResponseData?.hours_05,
        hours_06: printResponseData?.hours_06,
        hours_07: printResponseData?.hours_07,
        hours_08: printResponseData?.hours_08,
        total_sum: printResponseData?.total_sum,
      },
    });
    rowCount++;

    // Add Waste and Weight Headings
    const wasteHeadings = [
      { title: "Waste in Kg", colSpan: 3, rowSpan: 2 },
      { title: "Sliver weight in Kg", colSpan: 4 },
      { title: "Ball Weight in Kg", colSpan: 4 },
    ];

    currentPage.push({ type: "wasteheading", content: wasteHeadings });
    rowCount++;

    // Add Compactor & Sliver Weights
    currentPage.push({
      type: "output_weights",
      data: {
        compactor_wt: printResponseData?.sliver_weight_kg,
        sliver_wt: printResponseData?.ball_weight_kg,
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
    if (
      Array.isArray(printResponseData?.printPdeRes) &&
      printResponseData?.printPdeRes.length > 0
    ) {
      for (let row of printResponseData.printPdeRes) {
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
    // print section
    <div>
      <div id="section-to-print">
        {pages.map((rows, index) => (
          <div key={index} className="page-break">
            <div style={{ height: "70px" }}></div>
            <table style={{ marginTop: "10px", scale: "94%" }}>
              <thead>
                <tr>
                  <td colSpan="1" rowSpan="4" style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "80px", height: "auto" }}
                    />
                    <br />
                    Unit H
                  </td>
                  <th colSpan="6" rowSpan="4" style={{ textAlign: "center" }}>
                    Daily Production - Cotton Balls
                  </th>
                  <td colSpan="2">Format No.:</td>
                  <td colSpan="3">PH-PRD04/F-003</td>
                </tr>
                <tr>
                  <td colSpan="2">Revision No.:</td>
                  <td colSpan="3">01</td>
                </tr>
                <tr>
                  <td colSpan="2">Ref. SOP No.:</td>
                  <td colSpan="3">PH-PRD04-D-03</td>
                </tr>
                <tr>
                  <td colSpan="2">Page No.:</td>
                  <td colSpan="3">
                    {index + 1} of {totalPages}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
              </thead>
              <br />
              <tbody>
                {rows.map((row, rowIndex) => {
                  if (row.type === "static") {
                    if (row.label === "Machine Name") {
                      return (
                        <tr key={rowIndex}>
                          <td colSpan="2" style={{ textAlign: "left" }}>
                            Machine Name
                          </td>
                          <td colSpan="10" style={{ textAlign: "left" }}>
                            {printResponseData?.machine_name}
                          </td>
                        </tr>
                      );
                    }
                    if (row.label === "Order No.") {
                      return (
                        <tr key={rowIndex}>
                          <td colSpan="4" style={{ textAlign: "left" }}>
                            Order No.:{printResponseData?.order_no}
                          </td>
                          <td colSpan="4" style={{ textAlign: "left" }}>
                            {" "}
                            Date:{formattedDateheader()}
                          </td>
                          <td colSpan="4" style={{ textAlign: "left" }}>
                            Shift: {printResponseData?.shift}
                          </td>
                        </tr>
                      );
                    }
                    if (row.label === "Product") {
                      return (
                        <tr key={rowIndex}>
                          <td colSpan="4" style={{ textAlign: "left" }}>
                            Product:Cotton Ball
                          </td>
                          <td colSpan="4" style={{ textAlign: "left" }}>
                            {" "}
                            Customer Name:{printResponseData?.customer_name}
                          </td>
                          <td colSpan="4" style={{ textAlign: "left" }}>
                            {" "}
                            Ball/Bag: {printResponseData?.ball_or_bag || "NA"}
                          </td>
                        </tr>
                      );
                    }
                    if (row.label === "Sale Order No.") {
                      return (
                        <tr key={rowIndex}>
                          <td colSpan="4" style={{ textAlign: "left" }}>
                            {" "}
                            Sale Order No:
                            {printResponseData?.sale_order_no || "NA"}
                          </td>
                          <td colSpan="4" style={{ textAlign: "left" }}>
                            Brand:{printResponseData?.brand || "NA"}
                          </td>
                          <td colSpan="4" style={{ textAlign: "left" }}>
                            {" "}
                            Bag/Box: {printResponseData?.bag_or_box || "NA"}
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
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {printResponseData?.cutting_length}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {printResponseData?.feed_roller}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {printResponseData?.cutting_roller}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {printResponseData?.sliver_weight_grams}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {printResponseData?.ball_weight_grams}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {printResponseData?.bag_counts}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {printResponseData?.std_bags_per_hr}
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
                          {row.data.gram_or_mtrs}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {row.data.carding_mc_no}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {row.data.net_weight_kg}
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
                      <>
                        <tr key={rowIndex}>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            Bag
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.bag_hour1}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.bag_hour2}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.bag_hour3}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.bag_hour4}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.bag_hour5}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.bag_hour6}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.bag_hour7}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.bag_hour8}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {printResponseData?.box_total_hour}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            Box
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.box_hour1}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.box_hour2}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.box_hour3}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.box_hour4}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.box_hour5}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.box_hour6}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.box_hour7}
                          </td>
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {printResponseData?.box_hour8}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {printResponseData?.box_total_hour}
                          </td>
                        </tr>
                      </>
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
                            style={{ textAlign: "center", fontWeight: "bold" }}
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
                          {printResponseData?.sliver_weight_kg}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {printResponseData?.ball_weight_kg}
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
                            style={{ textAlign: "center", fontWeight: "bold" }}
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
                          <td colSpan="11" style={{ textAlign: "center" }}>
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
                        <td colSpan="2">{row.data.Remarks}</td>
                      </tr>
                    );
                  }
                })}
                {index + 1 === totalPages && (
                  <>
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        Operator Sign & Date
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        Production Supervisor Sign & Date
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        HOD / Designee Sign & Date
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <div
                          style={{
                            fontSize: "12px !important",
                            height: "100px",

                            textAlign: "center",
                          }}
                        >
                          {printResponseData?.operator_sign}
                          <br />
                          {formattedDate_Op()}
                          <br />

                          {getImage3 && (
                            <img
                              src={getImage3}
                              alt="logo"
                              className="signature"
                            />
                          )}
                        </div>
                      </td>
                      <td colSpan="4">
                        <div
                          style={{
                            fontSize: "12px !important",
                            height: "100px",
                            textAlign: "center",
                          }}
                        >
                          {printResponseData?.supervisor_sign}
                          <br></br>

                          {formattedDatesupervisor()}
                          <br></br>

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
                      </td>
                      <td colSpan="4">
                        <div
                          style={{
                            fontSize: "12px !important",
                            height: "100px",
                            textAlign: "center",
                          }}
                        >
                          {printResponseData?.hod_sign}
                          <br></br>
                          {formattedDate_hod()} <br></br>
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
                                justifyContent: "space-evenly",
                              }}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
              <br />

              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="12"></td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
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
                  <td colSpan="3">Name</td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                </tr>
                <tr>
                  <td colSpan="3">Signature & Date</td>
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

      {/* HEADER */}

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="Daily Production - Cotton Balls"
          formatNo="PH-PRD04/F-003"
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
                // eslint-disable-next-line no-unused-expressions
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
            marginBottom: "10px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "10px",
            justifyContent: "left",
            marginLeft: "10px",
          }}
        >
          <Col>
            <label>Select Machine Name :</label>
          </Col>
          <Col>
            <Select
              style={{ width: "150px" }}
              placeholder="Select Machine Name"
              value={batchNolistValue} // Only the value is used here
              onChange={handleSelectChange} // Custom onChange handler
              showSearch
            >
              {machineNameLov.map((MacLOV, index) => (
                <Select.Option key={index} value={MacLOV.value}>
                  {MacLOV.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <label>Date :</label>
          </Col>
          <Col>
            <Input
              onChange={handleDateChange}
              type="date"
              value={date}
              size="small"
              max={getCurrentDate()}
              //   max ={ formattedToday }
              style={{ width: "100%", height: "30px" }}
            />
          </Col>
          <Col>
            <label>Select Shift:</label>
          </Col>
          <Col>
            <Select
              style={{
                width: "150px",
                height: "40x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              placeholder="Select Shift No"
              value={availableshiftlov}
              onChange={setAvailableShiftslov}
            >
              {availableshift.map((shiftvalue, index) => (
                <Option key={index} value={shiftvalue}>
                  {shiftvalue}
                </Option>
              ))}
            </Select>
          </Col>

          <Col>
            <label>Select Order No:</label>
          </Col>
          <Col>
            <Select
              style={{
                width: "150px",
                height: "40x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              placeholder="Select Order No"
              value={orderNo}
              onChange={(value) => {
                setOrderNo(value);
              }}
              showSearch
            >
              {batchno.map((MacLOV, index) => (
                <Option key={index} value={MacLOV}>
                  {MacLOV}
                </Option>
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
          dataSource={ContaminationData}
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
            Date:
          </label>
          <Input
            type="date"
            value={datePrint}
            onChange={(e) => setDatePrint(e.target.value)}
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
            style={{
              width: "50%",
              height: "30x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Shift No"
            value={availableshiftlov2}
            onChange={setAvailableShiftslov2}
          >
            {availableshift2.map((shiftvalue, index) => (
              <Option key={index} value={shiftvalue}>
                {shiftvalue}
              </Option>
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
            Machine Name:
          </label>
          <Select
            style={{
              width: "50%",
              height: "30x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Machine Name"
            value={batchNolistValue2} // Only the value is used here
            onChange={(value) => {
              setBatchNolistValue2(value);
            }} // Custom onChange handler
            showSearch
          >
            {machineNameLov2.map((MacLOV, index) => (
              <Select.Option key={index} value={MacLOV.value}>
                {MacLOV.label}
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
            Order No:
          </label>
          <Select
            style={{ width: "150px", height: "100%" }}
            placeholder="Select Order No"
            value={orderNoPrint}
            onChange={(value) => {
              setOrderNoPrint(value);
            }}
            showSearch
          >
            {batchno.map((MacLOV, index) => (
              <Option key={index} value={MacLOV}>
                {MacLOV}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Drygoods_f03_Summary;
