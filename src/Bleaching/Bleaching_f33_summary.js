/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Space,
  Table,
  Tag,
  Button,
  Input,
  Print,
  Tooltip,
  DatePicker,
  message,
  Drawer,
  Col,
  Select,
  Avatar,
  Menu,
  Row,
  Modal,
  notification,
} from "antd";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import { IoSave, IoPrint } from "react-icons/io5";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import dayjs from "dayjs";
import moment from "moment";
import API from "../baseUrl.json";
import { jwtDecode } from "jwt-decode";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import logo from "../Assests/logo.png";
import { EditOutlined } from "@ant-design/icons";
// import './Nishatharan.css';
import { GoArrowLeft } from "react-icons/go";

const Bleaching_f33_summary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([{ date: "" }]);
  const formName = "EQUIPMENT USAGE LOG BOOK - WASTE BALE PRESS";
  const formatNo = "PH-PRD01/F-015";
  const revisionNo = "02";
  const sopNo = "PRD01-D-";
  const pageNo = "01 of 01";
  const defaultDateFormat = "YYYY-MM-DD";
  const dateFormat = "DD-MM-YYYY";
  const todayFormatted = moment().format("YYYY-MM-DD");
  const [reason, setReason] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [printResponseData, setPrintResponseData] = useState([]);
  const role = localStorage.getItem("role");
  const [PrintBmr, setPrintBmr] = useState(null);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
  const [printDate, setPrintDate] = useState("");
   const [yearPrint, setYearPrint] = useState("");
    const [monthPrint, setMonthPrint] = useState("");
    const [datePrint, setDatePrint] = useState("");
    const [datePrintTO, setDatePrintTO] = useState("");
    const [isDateDisabled, setIsDateDisabled] = useState(false);
    
  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2080);

  const monthOptions = [
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

  const [isYearMonthDisabled, setIsYearMonthDisabled] = useState(false);
  const [srState, setSrState] = useState([
    0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112, 119,
    126, 133, 140,
  ]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleDatePrintChange = (event) => {
    setPrintByDate(event.target.value);
    const a = String(event.target.value).split("-").reverse().join("/");
    const b = event.target.value;
    setPrintDate(b);
  };
  useEffect(() => {
    if (printResponseData.length > 0) {
      window.print();
    }
  }, [printResponseData]);

  const handlePrintData = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/EquipmentUsageF33/GetByDatePrint?date=${printDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        return;
      } else if (response.data.length > 0) {
        setPrintResponseData(response.data);
      }
    } catch (error) {
      messageApi.error(error.response.data.message);
    }
  };

  const handleYearChange = (value) => {
    setYearPrint(value);
    setMonthPrint(""); // Clear the month when year changes
    setIsDateDisabled(!!value); // Disable the date if a year is selected
  };
  
  const handleMonthChange = (value) => {
    setMonthPrint(value);
  };
  
  const handleDateChangeP = (value) => {
    setDatePrint(value);
    setYearPrint(""); // Clear the year when date is selected
    setMonthPrint(""); // Clear the month when date is selected
    setIsYearMonthDisabled(!!value); // Disable year and month if a date is selected
  };

    
  const handleDateChangePTo = (value) => {
    setDatePrintTO(value)
    setYearPrint(""); // Clear the year when date is selected
    setMonthPrint(""); // Clear the month when date is selected
    setIsYearMonthDisabled(!!value); // Disable year and month if a date is selected
  };


  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
    setMonthPrint(null);
    setDatePrint(null);
    setDatePrintTO(null)
    setIsDateDisabled(false);
    setIsYearMonthDisabled(false)
  };
  const printDateSubmit = () => {
    window.print();
  };
  const handleEditClick = (record) => {
    const slashDate = record.date;
    // console.log('date in summary', record.date);
    navigate("/Precot/Bleaching/F-33", { state: { slashDate } });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const notificationMessage = (messageType, errorMessage) => {
    messageApi.open({
      type: messageType,
      content: errorMessage,
    });
  };
  const handleBack = () => {
    // console.log("back button clicked");
    navigate("/Precot/choosenScreen");
  };
  const formatDate = (dateString) => {
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
      render: (text) => formatDate(text),
    },
    // {
    //   title: 'Bale No',
    //   dataIndex: 'bale_no',
    //   key: 'bale_no',
    //   align: 'center'
    // },
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
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const fetchData = () => {
      axios
        .get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/EquipmentUsageF33/GetAll`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include accessToken in the request headers
            },
          }
        )
        .then((response) => {
          const data = response.data;
          // Map API response to the format needed for options
          // console.log( 'data' ,response.data);
          setFormData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, []);
  useEffect(() => {
    const findReason = () => {
      for (const data of formData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [formData]);

  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    setPrintByDate("");
    // console.log("print screen works");
    // Add any other print-related logic here
  };

  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 300);
    }
  }, [printResponseData]);

  const fetchPrintValue = () => {
    let monthP;
    let yearP;
    let dateP;
    let datePTO

    const monthMap = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };

     if (monthPrint == null || monthPrint === "") {
    monthP = "";
  } else {
    monthP = monthMap[monthPrint] || "";
  }
    if (yearPrint == null) {
      yearP = "";
    } else {
      yearP = yearPrint;
    }
    if (datePrint == null) {
      dateP = "";
    } else {
      dateP = datePrint;
    }
    if (datePrintTO == null) {
      datePTO = "";
    } else {
      datePTO = datePrintTO;
    }
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/EquipmentUsageF33/GetByDatePrint?month=${monthP}&year=${yearP}&fromDate=${dateP}&toDate=${datePTO}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length != 0) {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
          } else {
            message.error("No Data");
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };


  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  const handleDateChange = (e) => {
    // // console.log('date', date);
    // const formattedDate = date.toISOString().split('T')[0];
    // const actualDate = new Date(date);
    // const localDate = new Date(actualDate.getTime() - actualDate.getTimezoneOffset() * 60000);
    // const formattedDate = localDate.toISOString().split('T')[0];
    // // console.log('date', formattedDate);
    // setSelectedDate(formattedDate);
    setSelectedDate(e.target.value);
  };

  const handleClick = () => {
    // console.log('selectedDate', selectedDate);

    if (!selectedDate) {
      notificationMessage("warning", "Please select Date");
      return;
    }
    const slashDate = selectedDate;
    navigate("/Precot/Bleaching/F-33", { state: { slashDate } });
  };
  const entriesPerPage = 7;
  const equipUse = [];
  let numberOfPages = Math.ceil(printResponseData.length / entriesPerPage);

  if (printResponseData || printResponseData.length > 0) {
    for (let i = 0; i < printResponseData.length; i += entriesPerPage) {
      equipUse.push(printResponseData.slice(i, i + entriesPerPage));
    }
  }

  return (
    <div>
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
      {contextHolder}
      <div className="no-print">
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
              shape="round"
              icon={<IoPrint color="#00308F" />}
              onClick={handlePrint}
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
              onClick={() => handleBack()}
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
      </div>
      <div style={{ display: "flex" }}>
        {/* <DatePicker style={{ margin: '10px' }} format={dateFormat} onChange={(date, dateString) => handleDateChange(date)} className='no-print' /> */}
        <input
          type="date"
          style={{
            margin: "10px",
            padding: "3px",
            borderRadius: "5px",
            border: "1px solid black",
          }}
          onChange={handleDateChange}
          max={formattedToday}
          className="no-print"
        />
        <Button
          key="go"
          onClick={handleClick}
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginTop: "10px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          type="primary"
        >
          Go To
        </Button>
      </div>
      <Table
        dataSource={[...formData].reverse()}
        columns={columns}
        pagination={{
          pageSize: pageSize,
        }}
        className="bale-waste-summary"
      />
      ;
      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: landscape;
        }
        // body {
        //   -webkit-print-color-adjust: exact;
        // }
        body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
        #section-to-print {
          page-break-after: always;
        }
      }
    `}
        </style>

        {equipUse.map((bodyContent, pageIndex) => (
          <table style={{ width: "90%", marginTop: "1%" }}>
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              {pageIndex >= 1 && (
                <>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }} colSpan="10"></td>
                  </tr>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }} colSpan="10"></td>
                  </tr>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }} colSpan="10"></td>
                  </tr>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }} colSpan="10"></td>
                  </tr>
                </>
              )}
              <tr>
                <td colSpan="3" rowSpan="4">
                  <td
                    style={{
                      width: "40%",
                      verticalAlign: "top",
                      textAlign: "center",
                      border: "none",
                    }}
                  >
                    <span style={{ textAlign: "center", width: "100%" }}>
                      <img
                        src={logo}
                        alt="hj"
                        width="45%"
                        style={{ textAlign: "center" }}
                      />{" "}
                    </span>
                    <br></br>
                    <span
                      style={{
                        textAlign: "center",
                        width: "100%",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      Unit H
                    </span>
                  </td>
                </td>
                <th
                  colSpan="11"
                  rowSpan="4"
                  style={{ textAlign: "center", fontSize: 14, width: "50%" }}
                >
                  Equipment Usage Log Book Waste Bale Press
                </th>
                <td colSpan="1">Format No.:</td>
                <td colSpan="5"> PH-PRD01/F-015</td>
              </tr>
              <tr>
                <td colSpan="1">Revision No.:</td>
                <td colSpan="5">01</td>
              </tr>
              <tr>
                <td colSpan="1">Ref.SOP No.:</td>
                <td colSpan="5">PH-PRD01-D-04</td>
              </tr>
              <tr>
                <td colSpan="1">Page No.:</td>
                <td colSpan="5">
                  {pageIndex + 1} of {numberOfPages}
                </td>
              </tr>
            </thead>
            <tbody style={{ marginBottom: "30px" }}>
              {/* <tr style={{ border: "none" }}>
          <td style={{ border: "none", padding: "5px" }} colSpan="10"></td>
        </tr> */}
              {/* <tr style={{ border: "none" }}>
                <td style={{ border: "none", padding: "3px" }} colSpan="10"></td>
              </tr> */}
              <br />
              <tr>
                <td colSpan={1} rowSpan={2} style={{ textAlign: "center" }}>
                  S.No.
                </td>
                <td colSpan={2} rowSpan={2} style={{ textAlign: "center" }}>
                  Date
                </td>
                <td colSpan={2} rowSpan={2} style={{ textAlign: "center" }}>
                  Waste Code
                </td>
                <td colSpan={2} rowSpan={2} style={{ textAlign: "center" }}>
                  Bale No.
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Weight in KG
                </td>
                <td colSpan={1} rowSpan={2} style={{ textAlign: "center" }}>
                  Remarks
                </td>
                <td colSpan={4} rowSpan={2} style={{ textAlign: "center" }}>
                  Performed by <br></br>Prod. Supervisior{" "}
                </td>
                <td colSpan={4} rowSpan={2} style={{ textAlign: "center" }}>
                  Reviewed by <br></br>Hod/Designee{" "}
                </td>
              </tr>
              <tr>
                <td className="data-border-header">Gross Weight</td>
                <td className="data-border-header">Net Weight</td>
              </tr>
              {/* <br></br> */}
              {bodyContent.map((row, rowIndex) => (
                <React.Fragment>
                  <tr>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      {srState[pageIndex] + rowIndex + 1}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {" "}
                      {new Date(row.date).toLocaleDateString("en-GB")}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {row.waste_code}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {row.bale_no}
                    </td>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      {row.gross_weight}
                    </td>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      {row.net_weight}
                    </td>
                    {/* <td colSpan="1" style={{ textAlign: "center" }}>{row.remarks ? row.remarks : 'N/A'}</td> */}
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      {row.remarks == "" ||
                      row.remarks == null ||
                      row.remarks == undefined
                        ? "N/A"
                        : row.remarks}
                    </td>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      {row.supervisor_sign}
                      <br />
                      {new Date(row.supervisor_submit_on).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      {row.hod_sign}
                      <br />
                      {new Date(row.hod_submit_on).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                  {/* <tr>
              <td colSpan="10" style={{ height: "60px", textAlign: "center", verticalAlign: "bottom", border: '1px solid black' }}>
                <div>
                  {item.supervisor_sign && item.supervisor_submit_on ? (
                    <>
                      {item.supervisor_sign}
                      <br />
                      {new Date(item.supervisor_submit_on).toLocaleDateString("en-GB")}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                Sign & Date
              </td>
            </tr> */}
                </React.Fragment>
              ))}
            </tbody>
            <br />

            <tfoot style={{ marginTop: "10px" }}>
              <td style={{ border: "none", padding: "5px" }} colSpan="10"></td>
              <tr>
                <td colSpan="5">Particular </td>
                <td colSpan="4">Prepared By</td>
                <td colSpan="5">Reviewed By</td>
                <td colSpan="6">Approved By</td>
              </tr>
              <tr>
                <td colSpan="5">Name</td>
                <td colSpan="4"></td>
                <td colSpan="5"></td>
                <td colSpan="6"></td>
              </tr>
              <tr>
                <td colSpan="5">Signature & Date</td>
                <td colSpan="4"></td>
                <td colSpan="5"></td>
                <td colSpan="6"></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
        footer={[
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: 190,
            }}
            icon={<IoPrint color="#00308F" />}
            key="submit"
            type="primary"
            onClick={printSubmit}
          >
            Print
          </Button>,
        ]}
      >
        {/*  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>


         <Input
            style={{ width: 170, marginLeft: 150 }}
            type="date"
            max={today}
            value={PrintByDate}
            onChange={handleDatePrintChange}
          />

        </div> */}

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
            Year:
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={handleYearChange}
            style={{ width: "100%" }}
            placeholder="Search Year"
            optionFilterProp="children"
            disabled={isYearMonthDisabled}
          >
            <Select.Option value="" disabled selected>
              Select Year
            </Select.Option>
            {yearOptions.map((option) => (
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
            Month:
          </label>
          <Select
            showSearch
            value={monthPrint}
            onChange={handleMonthChange}
            style={{ width: "100%" }}
            placeholder="Search Month"
            optionFilterProp="children"
            disabled={isYearMonthDisabled || !yearPrint}
          >
            <Select.Option value="" disabled selected>
              Select Month
            </Select.Option>
            {monthOptions.map((option) => (
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
          From Date :
          </label>
          <Input
            onChange={(e) => handleDateChangeP(e.target.value)}
            type="date"
            value={datePrint}
            max={formattedToday}
            size="small"
            style={{ width: "100%", height: "30px" }}
            disabled={isDateDisabled}
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
           TO Date :
          </label>
          <Input
            onChange={(e) => handleDateChangePTo(e.target.value)}
            type="date"
            value={datePrintTO}
            // max={formattedToday}
            size="small"
            style={{ width: "100%", height: "30px" }}
            disabled={isDateDisabled}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Bleaching_f33_summary;
