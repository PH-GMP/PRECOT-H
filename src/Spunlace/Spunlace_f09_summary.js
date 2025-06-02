/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Input,
  Button,
  Col,
  Row,
  Tabs,
  Select,
  Form,
  message,
  Tooltip,
  Drawer,
  Avatar,
  Menu,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import BleachingHeader from "../Components/BleachingHeader";
import { jwtDecode } from "jwt-decode";
import { TbMenuDeep } from "react-icons/tb";
import { IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";

import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import moment from "moment";
import logo from "../Assests/logo.png";
import axios from "axios";
import { BiLock, BiNavigation } from "react-icons/bi";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f09_summary = () => {
  // Summary Parameters
  const [date, setDate] = useState("");
  const [shift, setShift] = useState(null);

  const formatName = "Spunlace Gsm Analysis Report";
  const formatNo = "PH-PRD02/F-009";
  const revisionNo = "01";
  const sopNo = "PH-PRD02-D-03";
  const unit = "UNIT-H";
  const [newDate, setNewDate] = useState("");
  const [orderNumberPrint, setOrderNumberPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [shiftPrint, setShiftPrint] = useState("");
  const [printNewDate, setPrintNewDate] = useState("");
  const [printdate, setPrintDate] = useState("");
  const [modalData, setmodalData] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  // Shift state....
  const [shiftOptions, setShiftOptions] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  //Order Lov.....
  const [orderNumber, setOrderNumber] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const userName = localStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const [gotobtn, setGotobtn] = useState(true);
  const [summary, setSummary] = useState();
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [printResponseDataPDFReport, setPrintResponseDataPDFReport] =
    useState(null);
  const { Option } = Select;
  const [cakingData, setCakingData] = useState([]);
  const [reason, setReason] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.supervisor_sign;
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
  }, [printResponseData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.hod_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl, token]);

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

  const printSubmit = () => {
    // if (orderNumberPrint == "" || orderNumberPrint == null) {
    //   message.warning("Please Select OrderNumber");
    //   return;
    // } else
     if (datePrint == "" || datePrint == null) {
      message.warning("Please Select Date");
      return;
    } else if (shiftPrint == "" || shiftPrint == null) {
      message.warning("Please Select Shift");
      return;
    }
    fetchPrintValue();
    handleModalClose();
  };
  const formattedDate = () => {
    if (printResponseData?.date) {
      const date = moment(printResponseData.date);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
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
  const formattedDateHod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
    setOrderNumberPrint(null);
    setShiftPrint(null);
    setSaveLoading(false);
  };
  const handleDateChangePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
    // console.log("date value", value);
    // fetchPrintValue(shiftPrint);
  };
  function formatDateString(dateString) {
    const parts = dateString.split("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  function convertShift(shift) {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return null;
    }
  }
  const fetchPrintValue = () => {
    try {
      setSaveLoading(true);
       
      const formattedDate = formatDateString(datePrint);
      let shiftparam = "";
      if (shiftPrint == "I") {
        shiftparam = "1";
      } else if (shiftPrint == "II") {
        shiftparam = "2";
      } else if (shiftPrint == "III") {
        shiftparam = "3";
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const firstApi = axios.get(
        `${ API.prodUrl}/Precot/api/spunlace/Service/SpunlaceGsmAnalysisReport/getByDateShiftOrderNoPrintApi?date=${datePrint}&shift=${shiftPrint}&orderNo=${orderNumberPrint}`,
        { headers }
      );
      const secondApi = axios.get(
        `${ API.prodUrl}/Precot/api/spulance/getMahloData?date=${formattedDate}&shift=${shiftparam}`,
        { headers }
      );

      Promise.all([firstApi, secondApi])
        .then(([oneResponse, twoResponse]) => {
          if (oneResponse.data && oneResponse.data.message !== "No data") {
            // console.log("print response", oneResponse.data);
            setPrintResponseData(oneResponse.data);
            setTimeout(() => {
              window.print(); // Proceed with printing
              handleModalClose(); // Close the modal after printing
            }, 3000);
            setSaveLoading(false);
          } else {
            message.error("No Data");
            handleModalClose();
          }

          if (twoResponse.data) {
            setSaveLoading(false);
            setPrintResponseDataPDFReport(twoResponse.data);
            setTimeout(() => {
              window.print();
            }, 3000);
            setSaveLoading(false);
          } else {
            message.error("no data found...!");
          }
        })
        .catch((err) => {
          // console.log("Error", err);
          message.error("No Data");
          handleModalClose();
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    } finally {
      // setSaveLoading(false)
    }
  };
  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
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
  // useEffect(() => {
  //   const fetchOrderNumberOptions = async () => {
  //     try {
  //       const response = await fetch(
  //         `${ API.prodUrl}/Precot/api/spulance/orders`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       // console.log(data);

  //       if (Array.isArray(data)) {
  //         setOrderNumberLov(data);
  //       } else {
  //         console.error("API response is not an array", data);
  //         setOrderNumberLov([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching BMR options:", error);
  //       setOrderNumberLov([]);
  //     }
  //   };

  //   fetchOrderNumberOptions();
  // }, [token]);

  useEffect(() => {
    console.log("shift", shift);
    const fetchOrderNumberOptions = async () => {
      let shiftparam = "";
      if (shift == "I") {
        shiftparam = "1";
      } else if (shift == "II") {
        shiftparam = "2";
      } else if (shift == "III") {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/spulance/orderByDate?date=${date}&shift=${shiftparam}`,
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
          setOrderNumberLov(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };
    if (date && shift) {
      fetchOrderNumberOptions();
    }
  }, [date, shift, token]);

  useEffect(() => {
    console.log("selectedShift", shiftPrint);
    const fetchOrderNumberOptionsPrint = async () => {
      let shiftparam = "";
      if (shiftPrint == "I") {
        shiftparam = "1";
      } else if (shiftPrint == "II") {
        shiftparam = "2";
      } else if (shiftPrint == "III") {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/spulance/orderByDate?date=${datePrint}&shift=${shiftparam}`,
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
          setOrderNumberLov(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };
    if (datePrint && shiftPrint) {
      fetchOrderNumberOptionsPrint();
    }
  }, [datePrint, shiftPrint, token]);

  const goTo = () => {
    if (orderNumber == "" || orderNumber == null) {
      message.warning("Please Select Order Number");
      return;
    } else if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    navigate("/Precot/Spunlace/F-09", {
      state: {
        orderNumber: orderNumber,
        date: date,
        shift: shift,
      },
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    // console.log("date value", value);
  };
  const handleShiftChange = (value) => {
    setShift(value);
    // console.log("shift value",shift)
  };
  const handleOrderNumberChange = (value) => {
    setOrderNumber(value);
    // console.log("order number value",orderNumber)
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //   handle edit
  const handleEdit = (record) => {
    // console.log("recorddd",record)
    const { orderNumber } = record;
    const { date } = record;
    const { shift } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/Spunlace/F-09", {
      state: {
        date: formattedDate,
        shift: shift,
        orderNumber: orderNumber,
      },
    });
    // console.log("selected Date edit",date,shift, orderNumber);
  };

  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const printDateSubmit = () => {
    window.print();
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  // Function to format the date
  const Dateformat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleDate = (e) => {
    // console.log(" date Value", e.target.value);
    setDate(e.target.value);
    const formatDates = Dateformat(e.target.value);
    // console.log("Select Date", formatDates);
    setNewDate(formatDates);
  };

  const handlePrintDate = (e) => {
    // console.log(" date Value", e.target.value);
    setPrintDate(e.target.value);
    const formatDates = Dateformat(e.target.value);
    // console.log("Select Date", formatDates);
    setPrintNewDate(formatDates);
  };

  const handleOrderNumberPrint = (value) => {
    setOrderNumberPrint(value);
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  const [CottonWasteData, setCottonWasteData] = useState([]);

  // summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${ API.prodUrl}/Precot/api/spunlace/Service/SpunlaceGsmAnalysisReport/getGsmAnalysisSummary`;

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

      // console.log("Summary Get List",data)
      if (
        role === "ROLE_HOD" ||
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_DESIGNEE"
      ) {
        setCottonWasteData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            orderNumber: item.orderNo,
            shift: item.shift,
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
      message.error(error.message);
    } finally {
    }
  };

  const handlePrintChange = () => {};

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    // {
    //   title: "Format Name",
    //   dataIndex: "formatName",
    //   key: "formatName",
    // },
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      align: "center",
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
      title: "Action",
      dataIndex: "slb_id",
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

  const entriesPerPage = 8;
  const slicelistPrintResponse = [];

  if (printResponseDataPDFReport) {
    for (
      let i = 0;
      i < printResponseDataPDFReport.length;
      i += entriesPerPage
    ) {
      slicelistPrintResponse.push(
        printResponseDataPDFReport.slice(i, i + entriesPerPage)
      );
    }
  }

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit={unit}
        formName={formatName}
        formatNo={formatNo}
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
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // display: printBtnStatus ? "block" : "none",
            }}
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
          >
            &nbsp;Print
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            // icon={<IoCaretBackCircleSharp color="#00308F" />}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
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

      <Row
        align="middle"
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          justifyContent: "flex-start",
          display: "flex",
          gap: "10px",
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
            // max ={ formattedToday }
            style={{ width: "100%", height: "30px" }}
          />
        </Col>

        <Col>
          {" "}
          <label>Shift:</label>
        </Col>
        <Col>
          <Select
            showSearch
            value={shift}
            onChange={handleShiftChange}
            style={{ width: "100%" }}
            placeholder="Select Shift"
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
        </Col>
        <Col>
          <label>Order Number:</label>
        </Col>
        <Col>
          <Select
            showSearch
            value={orderNumber}
            onChange={handleOrderNumberChange}
            style={{ width: "100%" }}
            placeholder="Search Order Number"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Order Number
            </Select.Option>
            {orderNumberLov.map((option) => (
              <Select.Option key={option.value} value={option.value}>
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
            loading={saveLoading}
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
            Date:
          </label>
          <Input
            onChange={handleDateChangePrint}
            type="date"
            value={datePrint}
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
            value={shiftPrint}
            onChange={(value) => {
              setShiftPrint(value);
            }}
            style={{ width: "50%" }}
            placeholder="Select Shift"
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
            OrderNumber:
          </label>
          <Select
            showSearch
            value={orderNumberPrint}
            onChange={handleOrderNumberPrint}
            style={{ width: "50%", height: "30px" }}
            placeholder="Search Order Number"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Order Number
            </Select.Option>
            {orderNumberLov.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>

      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={CottonWasteData}
        rowKey="slb_id"
      />
      {/* print started here */}
      <GlobalStyle />
      <div id="section-to-print">
        {slicelistPrintResponse.map((slice, pageIndex) => (
          <table
            style={{
              marginTop: "10px",
              scale: "95%",
              pageBreakBefore: pageIndex > 1 ? "always" : "auto",
            }}
            key={pageIndex}
          >
            <br />
            <br />
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="100"></td>
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
                <th colSpan="45" rowSpan="4" style={{ textAlign: "center" }}>
                  Spunlace GSM Analysis Report{" "}
                </th>
                <td colSpan="15">Format No:</td>
                <td colSpan="25">PH-PRD02/F-009</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No:</td>
                <td colSpan="25">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No:</td>
              <td colSpan="25">PH-PRD02-D-03</td>
              <tr>
                <td colSpan="15">Page No:</td>
                <td colSpan="25">
                  {pageIndex + 1} of {slicelistPrintResponse.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="100"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="30">
                  Date:{""}
                  {formattedDate()}{" "}
                </td>
                <td colSpan="40">
                  Shift:{""}
                  {printResponseData?.shift}{" "}
                </td>
                <td colSpan="30">
                  ORDER No.: {""}
                  {printResponseData?.orderNo}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="30">
                  PRODUCT NAME:{""}
                  {printResponseData?.productName}{" "}
                </td>
                <td colSpan="40">
                  MIXING: {""}
                  {printResponseData?.mixing}{" "}
                </td>
                <td colSpan="30">
                  MATERIAL CODE: {""}
                  {printResponseData?.materialCode}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="30">
                  STD GSM: {""}
                  {printResponseData?.stdGsm}{" "}
                </td>
                <td colSpan="40">
                  STD. MOISTURE in %: {""}
                  {printResponseData?.stdMoisture}{" "}
                </td>
                <td colSpan="30">
                  PATTERN: {""}
                  {printResponseData?.pattern}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="55" style={{ textAlign: "center" }}>
                  GSM AS PER MAHLO{" "}
                </td>
                <td colSpan="45" style={{ textAlign: "center" }}>
                  MOISTURE AS PER MAHLO{" "}
                </td>
              </tr>
              <tr>
                <th colSpan="10">SHAFT NO</th>
                <th colSpan="3">1</th>
                <th colSpan="3">2</th>
                <th colSpan="3">3</th>
                <th colSpan="3">4</th>
                <th colSpan="3">5</th>
                <th colSpan="3">6</th>
                <th colSpan="3">7</th>
                <th colSpan="3">8</th>
                <th colSpan="3">9</th>
                <th colSpan="3">10</th>
                <th colSpan="5">MAX</th>
                <th colSpan="5">MIN</th>
                <th colSpan="5">AVG</th>
                <th colSpan="3">1</th>
                <th colSpan="3">2</th>
                <th colSpan="3">3</th>
                <th colSpan="3">4</th>
                <th colSpan="3">5</th>
                <th colSpan="3">6</th>
                <th colSpan="3">7</th>
                <th colSpan="3">8</th>
                <th colSpan="3">9</th>
                <th colSpan="3">10</th>
                <th colSpan="5">MAX</th>
                <th colSpan="5">MIN</th>
                <th colSpan="5">AVG</th>
              </tr>
              {slice.map((row, index) => (
                <tr key={index}>
                  <td colSpan="10">{row.Roll}</td>
                  <td colSpan="3">{row.weight.Zone_1}</td>
                  <td colSpan="3">{row.weight.Zone_2}</td>
                  <td colSpan="3">{row.weight.Zone_3}</td>
                  <td colSpan="3">{row.weight.Zone_4}</td>
                  <td colSpan="3">{row.weight.Zone_5}</td>
                  <td colSpan="3">{row.weight.Zone_6}</td>
                  <td colSpan="3">{row.weight.Zone_7}</td>
                  <td colSpan="3">{row.weight.Zone_8}</td>
                  <td colSpan="3">{row.weight.Zone_9}</td>
                  <td colSpan="3">{row.weight.Zone_10}</td>
                  <td colSpan="5">{row.WeightMaxValue}</td>
                  <td colSpan="5">{row.WeightMinValue}</td>
                  <td colSpan="5">{row.WeightAverage}</td>
                  <td colSpan="3">{row.moisture.Zone_1}</td>
                  <td colSpan="3">{row.moisture.Zone_2}</td>
                  <td colSpan="3">{row.moisture.Zone_3}</td>
                  <td colSpan="3">{row.moisture.Zone_4}</td>
                  <td colSpan="3">{row.moisture.Zone_5}</td>
                  <td colSpan="3">{row.moisture.Zone_6}</td>
                  <td colSpan="3">{row.moisture.Zone_7}</td>
                  <td colSpan="3">{row.moisture.Zone_8}</td>
                  <td colSpan="3">{row.moisture.Zone_9}</td>
                  <td colSpan="3">{row.moisture.Zone_10}</td>
                  <td colSpan="5">{row.MoistureMaxValue}</td>
                  <td colSpan="5">{row.MoistureMinValue}</td>
                  <td colSpan="5">{row.MoistureAverage}</td>
                </tr>
              ))}

              {pageIndex === slicelistPrintResponse.length - 1 && (
                <>
                  <tr>
                    <td
                      colSpan="52"
                      style={{
                        height: "20px",
                        textAlign: "center",
                        borderBottom: "none",
                      }}
                    >
                      Production Supervisor Sign & Date
                    </td>
                    <td
                      colSpan="52"
                      style={{ textAlign: "center", borderBottom: "none" }}
                    >
                      HOD / Designee Sign & Date
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="52"
                      style={{
                        height: "48px",
                        textAlign: "center",
                        marginBottom: "auto",
                        verticalAlign: "bottom",
                        borderTop: "none",
                      }}
                    >
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Supervisor Sign"
                          style={{
                            width: "70%",
                            height: "70%",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                      <br /> {printResponseData?.supervisor_sign || ""} <br />
                      {formattedDatesupervisor()}
                    </td>
                    <td
                      colSpan="52"
                      style={{
                        height: "48px",
                        textAlign: "center",
                        verticalAlign: "bottom",
                        borderTop: "none",
                      }}
                    >
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="Hod Sign"
                          style={{
                            width: "70%",
                            height: "70%",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                      <br /> {printResponseData?.hod_sign || ""}
                      <br />
                      {formattedDateHod()}
                    </td>
                  </tr>
                </>
              )}
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
            <br />
          </table>
        ))}
      </div>

      {/* print ended here */}
    </div>
  );
};

export default Spunlace_f09_summary;
