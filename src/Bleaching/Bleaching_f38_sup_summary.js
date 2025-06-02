/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Typography,
  Button,
  DatePicker,
  Tooltip,
  Form,
  Select,
  Modal,
  Input,
  Avatar,
  Col,
  Row,
  Menu,
  Drawer,
  Popconfirm,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Bleaching_f38 from "./Bleaching_f38";
import { message } from "antd";
import { GoArrowLeft } from "react-icons/go";
import { BiNavigation, BiLock } from "react-icons/bi";
import { IoPrint, IoCreate } from "react-icons/io5";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import BleachingHeader from "../Components/BleachingHeader.js";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import logo from "../Assests/logo.png";

const { Title } = Typography;

const Bleaching_f38_sup_summary = () => {
  const [reason, setReason] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [bmrNoFrom, setBmrNoFrom] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const role = localStorage.getItem("role");
  const [bmrNoTo, setBmrNoTo] = useState("");
  const [MixingBMRfromOptions, setMixingBMRfromOptions] = useState([]);
  const [printresponseData, setPrintResponseData] = useState([]);
  const [printerror, setPrintError] = useState(true);
  const [PrintByDate, setPrintByDate] = useState(null);
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
 const [yearPrint, setYearPrint] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [isDateDisabled, setIsDateDisabled] = useState(false);
const [isYearMonthDisabled, setIsYearMonthDisabled] = useState(false);


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


  const { Option } = Select;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBmrNoFromChange = (value) => {
    setBmrNoFrom(value);
  };

  const handleBmrNoToChange = (value) => {
    setBmrNoTo(value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
    setMonthPrint(null);
    setDatePrint(null);
    setSelectedFromBmr(null);
    setSelectedToBmr(null);
    setIsDateDisabled(false);
    setIsYearMonthDisabled(false)
  };


  const handlePrint = () => {
    setShowModal(true);
  };
  const printDateSubmit = () => {
    window.print();
  };

  const [getImage, setGetImage] = useState("");


  const [fromBmrOptions, setFromBmrOptions] = useState([]);
  const [toBmrOptions, setToBmrOptions] = useState([]);
  const [selectedFromBmr, setSelectedFromBmr] = useState(null);
  const [selectedToBmr, setSelectedToBmr] = useState(null);

  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };
  
  // Function to get the month number
  const getMonthNumber = (monthName) => {
    return monthMap[monthName] || null; // Return null if the month is invalid
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
  
    const monthNumber = getMonthNumber(monthPrint); // Convert monthPrint to number
    if (!monthNumber) {
      console.error("Invalid month selected:", monthPrint);
      return;
    }
    
    // Fetch From BMR API
    const fetchFromBmr = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/Bleaching/Service/getFromBmr?month=${monthNumber}&year=${yearPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Map API response to Select options format
        setFromBmrOptions(
          response.data.map((item) => ({
            value: item.BMR_NO_FROM,
            label: item.BMR_NO_FROM,
          }))
        );
      } catch (err) {
        console.error("Error fetching From BMR data:", err);
      }
    };
  
    // Fetch To BMR API
    const fetchToBmr = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/Bleaching/Service/getToBmr?month=${monthNumber}&year=${yearPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Map API response to Select options format
        setToBmrOptions(
          response.data.map((item) => ({
            value: item.BMR_NO_TO,
            label: item.BMR_NO_TO,
          }))
        );
      } catch (err) {
        console.error("Error fetching To BMR data:", err);
      }
    };
  
    fetchFromBmr();
    fetchToBmr();
  }, [monthPrint, yearPrint]); // Add dependencies for monthPrint and yearPrint
  

  const handleFromBmrChange = (selectedOption) => {
    setSelectedFromBmr(selectedOption);
    console.log("Selected From BMR:", selectedOption);
  };

  const handleToBmrChange = (selectedOption) => {
    setSelectedToBmr(selectedOption);
    console.log("Selected To BMR:", selectedOption);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData?.[0]?.supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printresponseData, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printresponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 300);
    }
  }, [printresponseData]);

  


  const fetchPrintValue = () => {

    const monthNumber = getMonthNumber(monthPrint); // Convert monthPrint to number
  if (!monthNumber) {
    console.error("Invalid month selected:", monthPrint);
    return;
  }

    let monthP;
    let yearP;
    let dateP;
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
    if (datePrint == null) {
      dateP = "";
    } else {
      dateP = datePrint;
    }
    try {
      axios
        .get(
          // `${ API.prodUrl}/Precot/api/Bleaching/Service/getDateSummeryF38Print?month=${monthP}&year=${yearP}&date=${dateP}`,
          `${ API.prodUrl}/Precot/api/Bleaching/Service/getPrintF38?month=${monthNumber}&year=${yearPrint}&fromBmr=${selectedFromBmr}&toBmr=${selectedToBmr}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length != 0) {
            const printresponseData = res.data;
            setPrintResponseData(printresponseData);
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


  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData?.[0]?.hod_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printresponseData, API.prodUrl, token]);

  // const handleDatePrintChange = (event) => {
  //   setPrintByDate(event.target.value);
  //   const a = String(event.target.value).split("-").reverse().join("/");
  //   axios
  //     .get(
  //       `${ API.prodUrl}/Precot/api/Bleaching/Service/getDateSummeryF38?date=${a}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data && res.data.length > 0) {
  //         setPrintResponseData(res.data);
  //       } else {
  //         setPrintResponseData([]);
  //         console.log("print error", printerror);
  //         message.error("no data found...!");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // };

  useEffect(() => {
    const fetchBMRLOV = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/bleaching/generation/getAllMappingBmr`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMixingBMRfromOptions(response.data);
      } catch (error) {
        console.error("Error fetching BMR LOV:", error);
      }
    };

    fetchBMRLOV();
  }, []);

  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  localStorage.setItem("date", date);

  localStorage.setItem("bmrNoFrom", bmrNoFrom);

  localStorage.setItem("bmrNoTo", bmrNoTo);

  // const handleNavigate = (id) => {

  // };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/Bleaching/Service/getSupervisorSummeryF38`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const findReason = () => {
      for (const detail of data) {
        if (detail.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [data]);

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

  // const handleDateChange = (date, dateString) => {
  //   setDate(dateString);
  // };

  

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const formattedDate = selectedDate.split("-").reverse().join("/");
    setDate(formattedDate);
    console.log(formattedDate);
  };
  // const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const [day, month, year] = dateString.split("/");
    const date = new Date(year, month - 1, day);

    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  };

  const oconfirm = (e) => {
    console.log(e);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .delete(
        `${ API.prodUrl}/Precot/api/Bleaching/Service/deleteMachineCleaningRecord?id=${e.id}`,
        { headers }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Deleted Sucessfully");
        fetchData();
      })
      .catch((err) => {
        console.log("Error");
      });
    //////////////////
    // alert(id)
  };
  const ocancel = (e) => {
    console.log(e);
    //   message.error('Click on No');
  };

  ///////////////

  const ooconfirm = (e) => {
    if (date == null || date == "") {
      message.warning("Please Select Date");
      return;
    } else if (!bmrNoFrom) {
      message.warning("Please Select From Bmr");
      return;
    } else if (!bmrNoTo) {
      message.warning("Please Select To Bmr");
      return;
    } else {
      setError("");
      navigate("/Precot/Bleaching/F-38");
    }
  };
  const oocancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "From BMR",
      dataIndex: "bmr_no_from",
      key: "bmr_no_from",
      align: "center",
      render: (text) => (
        <div style={{ padding: "8px", fontSize: "10px" }}>{text}</div>
      ),
    },
    {
      title: "To BMR",
      dataIndex: "bmr_no_to",
      key: "bmr_no_to",
      align: "center",
      render: (text) => (
        <div style={{ padding: "8px", fontSize: "10px" }}>{text}</div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
      render: (text) => (
        <div style={{ padding: "8px", fontSize: "10px" }}>{text}</div>
      ),
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
      render: (text) => (
        <div style={{ padding: "8px", fontSize: "10px" }}>{text}</div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/Precot/Bleaching/F-38/Edit/${record.id}`)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => oconfirm(record)}
            onCancel={ocancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              // onClick={() =>
              //   navigate(`/Precot/Bleaching/F-38/Edit/${record.id}`)
              // }
              style={{ width: "100%" }}
            >
              Delete
            </Button>
          </Popconfirm>
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

  return (
    <div>
      {contextHolder}
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
        formName="Mixing Change Over & Machine Cleaning Checklist Summary Reports"
        formatNo="PH-PRD01/F-014"
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
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: 30,
          marginTop: "20px",
        }}
      >
        <Form.Item label=" Select Date:">
          {/* <DatePicker format="DD/MM/YYYY" style={{ width: "120px" }} onChange={handleDateChange} /> */}
          <input
            type="date"
            max={formattedToday}
            style={{ width: "120px", height: "27px" }}
            onChange={handleDateChange}
          />
        </Form.Item>
        <Form.Item label="BMR No From :">
          <Select
            style={{ width: "140px" }}
            onChange={handleBmrNoFromChange}
            value={bmrNoFrom}
            showSearch
          >
            {MixingBMRfromOptions.filter(
              (option) => option.BMR_NO !== bmrNoTo
            ).map((option) => (
              <Option key={option.BMR_NO} value={option.BMR_NO}>
                {option.BMR_NO}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="BMR No To:">
          <Select
            style={{ width: "140px" }}
            onChange={handleBmrNoToChange}
            value={bmrNoTo}
            showSearch
          >
            {MixingBMRfromOptions.filter(
              (option) => option.BMR_NO !== bmrNoFrom
            ).map((option) => (
              <Option key={option.BMR_NO} value={option.BMR_NO}>
                {option.BMR_NO}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Popconfirm
            title="Checking BMR"
            description="Are you sure you want to go with this from BMR and to BMR?"
            onConfirm={ooconfirm}
            onCancel={oocancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              icon={<BiNavigation color="#00308F" />}
              // onClick={handleNavigate}
            >
              Go To
            </Button>
          </Popconfirm>
        </Form.Item>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="id"
        size="medium"
        pagination={{ pageSize: 5 }}
        style={{ fontSize: "14px", height: "100%" }}
        rowClassName={() => "table-row"}
      />

      <div id="section-to-print">
        {printresponseData.map((item, index) => (
          <div key={index} style={{ marginTop: "2%", scale: "90%" }}>
            {/* <br></br> */}
            <table style={{ width: "90%", marginTop: "1%" }}>
              <tr>
                <td
                  colSpan="1"
                  rowSpan="6"
                  style={{ height: "30px", textAlign: "center" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
              </tr>
              <tr>
                <td colSpan="14" rowSpan="6" style={{ textAlign: "center" }}>
                  Mixing Change Over & Cleaning Check list
                  <br />
                  Blow room & Bleaching
                </td>
              </tr>
              <tr>
                <td colSpan="1">Format No.: </td>
                <td colSpan="8"> PH-PRD01/F-014</td>
              </tr>
              <tr>
                <td colSpan="1">Revision No.:</td>
                <td colSpan="8">01</td>
              </tr>
              <tr>
                <td colSpan="1">Ref.SOP No.:</td>
                <td colSpan="8">PH-PRDO1-D-03</td>
              </tr>
              <tr>
                <td colSpan="1">Page No.:</td>
                <td colSpan="8"> {index + 1} of 1</td>
              </tr>
            </table>
            <br></br>
            <table style={{ width: "90%" }}>
              {/* <td colSpan="22" style={{border:"none"}}>
        </td> */}
              <tr>
                <td colSpan="24">Date:{item.date} </td>
              </tr>
              <tr>
                <td colSpan="10">
                  {" "}
                  Mixing change over from : {item.mix_changeover_from}
                </td>
                <td colSpan="10">
                  Mixing change over To :{item.mix_changeover_to}
                </td>
              </tr>
              <tr>
                <td colSpan="10">BMR No From :{item.bmr_no_from}</td>
                <td colSpan="10">BMR No To :{item.bmr_no_to}</td>
              </tr>
              <tr>
                <td
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  colSpan="1"
                >
                  S.No.
                </td>
                <td
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  colSpan="5"
                >
                  Particular's
                </td>
                <td
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  colSpan="3"
                >
                  Status
                </td>
                <td
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  colSpan="2"
                >
                  S.No.
                </td>
                <td
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  colSpan="8"
                >
                  Particular's
                </td>
                <td
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  colSpan="1"
                >
                  Status
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="5">Laydown area cleaning</td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {item.laydown_area_cleaning}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  15
                </td>
                <td colSpan="8">Cake Press Machine 1 & 2 Cleaning</td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {item.cake_opener_clean}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="5">Blendomat cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.blendomat_cleaning}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  16
                </td>
                <td colSpan="5">
                  Kier machine 1, 2 & 3 cleaning & Chemical dispenser Cleaning
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.kier_machine_chemical_clean}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="5">BRF 425 cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.brf_425_unit}
                </td>

                <td colSpan="1" style={{ textAlign: "center" }}>
                  17
                </td>
                <td colSpan="5">
                  Chemical Buckets, chemical weighing balance cleaning
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.chemical_buckets_chemical_weighing_balance_cleaning}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="5">Fire divertor cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.fire_diverotor_cleaning}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  18
                </td>
                <td colSpan="5">Hydro Machine 1 & 2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.hydro_machine_cleaning}
                </td>
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="5">Metal Detector Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.metal_fire_detector}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  19
                </td>
                <td colSpan="5">Cake Opener Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.cake_opener_clean}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="5">CL - P Unit 1 & 2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.clp_unit_cleaning}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  20
                </td>
                <td colSpan="5">Dryer cleaning (6 Chamber Filters)</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.dryer_cleaning}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="5">BRF - 425 Cleaning 1 & 2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.brf_425_cleaning}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  21
                </td>
                <td colSpan="5">MTF Unit cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.mtf_unit_clean}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="5">MPM Unit 1 & 2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.mpm_unit_cleaning}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  22
                </td>
                <td colSpan="5">Rieter 1 & 2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.rieter_clean}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  9
                </td>
                <td colSpan="5">Applied unit 1 & 2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.applied_unit_cleaning_one}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  23
                </td>
                <td colSpan="5">Applied unit 1 & 2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.applied_unit_cleaning_two}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  10
                </td>
                <td colSpan="5">ERM Unit 1&2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.erm_unit_cleaning}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  24
                </td>

                <td colSpan="5">Metal & Fire Detector</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.metal_fire_detector}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  11
                </td>
                <td colSpan="5">CCP unit 1 & 2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.ccp_unit_cleaning}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  25
                </td>
                <td colSpan="5">Bale Press condensor & Conveyor Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.balepress_conveyor_cleaning}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  12
                </td>
                <td colSpan="5">Dustex Unit 1& 2 Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.dustex_unit_cleaning}
                </td>

                <td colSpan="1" style={{ textAlign: "center" }}>
                  26
                </td>
                <td colSpan="5">Bale Press Strapper machine Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.balepress_stapper_mechine_cleaning}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  13
                </td>
                <td colSpan="5">Carding Machins (1 to 6) Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.carding_machines_cleaning}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  27
                </td>
                <td colSpan="5">Bale Evacuation & Weighing Machine</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.bale_evacuation_weight_machine_cleaning}
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  14
                </td>
                <td colSpan="5">Hennatex condensor Unit Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.hennatex_condenser_unit}
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  28
                </td>

                <td colSpan="5">Bale Storage floor Cleaning</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {item.bake_storage_floor_cleaning}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="10"
                  style={{
                    height: "7px",
                    textAlign: "center",
                    border: "1px solid black",
                    height: "15%",
                  }}
                >
                  <b>Verified by Production Supervisor</b>
                  <br></br>
                  {/* <br></br> */}
                  <div>
                    {item.supervisor_sign && item.supervisor_submit_on ? (
                      <>
                        {item.supervisor_sign}
                        <br />
                        {new Date(item.supervisor_submit_on).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                        <br />
                        {getImage !== "" && (
                          <img
                            className="signature"
                            src={getImage}
                            alt="Supervisor"
                          />
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  Sign & Date
                </td>
                <td
                  colSpan="10"
                  style={{
                    textAlign: "center",
                    border: "1px solid black",
                    height: "8%",
                  }}
                >
                  <b>Reviewed by Head of the Department/Designee</b>
                  <br></br>
                  <br></br>
                  <div>
                    {item.hod_sign && item.hod_submit_on ? (
                      <>
                        {item.hod_sign}
                        <br />
                        {new Date(item.hod_submit_on).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                        <br />
                        {getImage1 !== "" && (
                          <img
                            className="signature"
                            src={getImage1}
                            alt="HOD"
                          />
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  Sign & Date
                </td>
              </tr>
              <tr>
                <td colSpan="22" style={{ border: "none" }}></td>
              </tr>

              <tfoot>
                <tr>
                  <td colSpan="4">Particular </td>
                  <td colSpan="5">Prepared By</td>
                  <td colSpan="5">Reviewed By</td>
                  <td colSpan="7">Approved By</td>
                </tr>

                <tr>
                  <td colSpan="4">Name </td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                  <td colSpan="7"></td>
                </tr>
                <tr>
                  <td colSpan="4">Signature & Date</td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                  <td colSpan="7"></td>
                </tr>
              </tfoot>
            </table>
            <br></br>
            <br></br>
            {/* <br></br> */}
            {/* <br></br> */}
            {/* <br></br> */}
          </div>
        ))}
      </div>

      <Modal
        //  title="Select Date"
        title={<div style={{ textAlign: "center" }}>Select Date</div>}
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
        {" "}
        {/* <Input
          style={{ width: 170, marginLeft: 150 }}
          type="date"
          max={today}
          onChange={handleDatePrintChange}
        /> */}
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
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date :
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
           From BMR
          </label>
          <Select
          options={fromBmrOptions}
          value={selectedFromBmr}
          style={{ width: "100%" }}
          onChange={handleFromBmrChange}
          placeholder="Select From BMR"
          isClearable
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
           To BMR
          </label>
          <Select
          options={toBmrOptions}
          value={selectedToBmr}
          style={{ width: "100%" }}
          onChange={handleToBmrChange}
          placeholder="Select To BMR"
          isClearable
        />
          </div>
      </Modal>
    </div>
  );
};

export default Bleaching_f38_sup_summary;