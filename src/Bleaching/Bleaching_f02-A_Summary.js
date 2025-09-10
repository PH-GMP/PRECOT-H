/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { BiLock, BiNavigation, BiEdit } from "react-icons/bi";
import API from "../baseUrl.json";
import Bleaching_f36_edit from "./Bleaching_f36_edit";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import BleachingHeader from "../Components/BleachingHeader";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import { IoIosNavigate } from "react-icons/io";
import moment from "moment";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import logo from "../Assests/logo.png";
import { createGlobalStyle } from "styled-components";

const Bleaching_f02A_Summary = () => {
  const formatName = "House Keeping Cleaning Check List";
  const formatNo = "PRD01/F-02-A";
  const revisionNo = "03";
  const sopNo = "HRD01-D-55";
  const unit = "UNIT-H";
  const department = "Blow room & Carding, Waste Bale Press";
  const [reason, setReason] = useState(false);
  const [newDate, setNewDate] = useState("");

  // const [newData, setNewData] = useState();

  const [summary, setSummary] = useState([]);

  const [gotobtn, setGotobtn] = useState(true);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [formatchange, setFormatChange] = useState("");

  // Shift state....
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);

  const [newData, setNewData] = useState([]);
  const [dateLov, setDateLov] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [modalData, setmodalData] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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
  const { Option } = Select;

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const userName = localStorage.getItem("username");

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchData();
  // }, []);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setSelectMonth(null);
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

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });

  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const printDateSubmit = () => {
    window.print();
  };

  // Function to transform the value based on conditions
  const transformValue = (value) => {
    switch (value) {
      case "Y":
        return "✓";
      case "N":
        return "X";
      case "NA":
        return "NA";
      default:
        return value;
    }
  };

  useEffect(() => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.toLocaleString("default", { year: "numeric" });
    setMonth(month);
    setYear(year);
  }, []);
  // console.log("Month", month);
  // console.log("Year", year);

  useEffect(() => {
    const generateDates = (month, year) => {
      const dates = [];
      const daysInMonth = new Date(year, month, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        dates.push(`${day}`);
      }
      return dates;
    };
    const dates = generateDates(month, year);
    // console.log("Dates", dates);
    setDateLov(dates);
  }, dateLov);

  // const handleDatePrintChange = (selectMonth) => {
  //   // // console.log(" Event  " ,event);
  //   // setSelectMonth(event.target.value);
  //   // setSelectYear(event.target.value);

  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     "Content-Type": "application/json", // Adjust content type if needed
  //   };
  //   // const a = String(event.target.value).split('-').reverse().join('/');
  //   axios
  //     .get(
  //       `${API.prodUrl}/Precot/api/Bleaching/Service/getHouseKeepingMonthYearSummeryF02A`,
  //       {
  //         headers,
  //         params: {
  //           month: selectMonth,
  //           year: selectYear,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setNewData(res.data);
  //       setSelectMonth(selectMonth);
  //       setSelectYear(selectYear);
        

  //       // console.log("Select Month ", selectMonth);
  //       // console.log("Select year", selectYear);
  //       // console.log("New Data", newData);
  //       // setPrintDataValue(fetchPrintData(newData,selectMonth,selectYear));
  //       // printDateSubmit();
  //     })
  //     .catch((err) => {
  //       // console.log("Error", err);
  //     });
  // };


  const handleDatePrintChange = (selectMonth) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
  
    axios
      .get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/getHouseKeepingMonthYearSummeryF02A`,
        {
          headers,
          params: {
            month: selectMonth,
            year: selectYear,
          },
        }
      )
      .then((res) => {
        setNewData(res.data); // Store the fetched data
        setSelectMonth(selectMonth);
        setSelectYear(selectYear);
  
        // Show a message if no data exists
        if (res.data && res.data.length === 0) {
          message.warning("No data available for the selected month and year.");
        }
      })
      .catch((err) => {
        // Handle any errors
        console.log("Error fetching data:", err);
        message.error("An error occurred while fetching data.");
      });
  };
  

  
  const fetchPrintData = (newData, month, year) => {
    if (!Array.isArray(newData)) {
      console.error(
        "Error: newData is not an array. It is of type:",
        typeof newData
      );
      // console.log("newData value:", newData);
      return [
        {
          floorcleaning: "-",
          removalofunwantedmaterials: "-",
          sidewallscorners: "-",
          windows: "-",
          emergencyDoors: "-",
          fireExtinguishers: "-",
          firstAidBox: "-",
          rapidDoors: "-",
          remark: "-",
          cleaned_by:"-"
        },
      ];
    }

    const records = newData.filter(
      (record) => record.month === month && record.year === year
    );

    if (records.length === 0) {
      return [
        {
          floorcleaning: "-",
          removalofunwantedmaterials: "-",
          sidewallscorners: "-",
          windows: "-",
          emergencyDoors: "-",
          fireExtinguishers: "-",
          firstAidBox: "-",
          rapidDoors: "-",
          remark: "-",
          cleaned_by:"-"
        },
      ];
    }

    return records.map((record) => {
      const day = new Date(record.date).getDate(); // Extract day from date
      // // console.log(" Day ", day);
      return {
        day,
        floorcleaning: transformValue(record.floor_cleaninh),
        removalofunwantedmaterials: transformValue(
          record.removel_unwanted_meterials
        ),
        sidewallscorners: transformValue(record.side_wall_corners),
        windows: transformValue(record.windows),
        emergencyDoors: transformValue(record.emergency_door),
        fireExtinguishers: transformValue(record.fire_extinguishers),
        firstAidBox: transformValue(record.first_aid_box),
        rapidDoors: transformValue(record.rapid_doors),
        cleaned_by:record.cleaned_by,
        remark: record.remarks,
      };
    });
  };

  useEffect(() => {
    if (
      role == "ROLE_SUPERVISOR" ||
      role == "ROLE_HOD" ||
      role == "ROLE_HR" ||
      role == "ROLE_DESIGNEE"
    ) {
      fetchData();
    }
  }, []);
  const formattedDate = moment(newDate).format("DD/MM/YYYY HH:mm");

  const fetchData = async () => {
    // if (localStorage.getItem("role") == "ROLE_SUPERVISOR") {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/getHouseKeepingSummeryF02A`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log("post", res.data);
        const a = res.data.map((x, i) => {
          return {
            formatName: x.formatName,
            formatNo: x.formatNo,
            formatDate: x.date,
            revisionNo: x.revisionNo,
            sopNumber: x.refSopNo,
            unit: x.unit,
            date: x.date,
            clean_id: x.clean_id,
            department: x.department,
            emergencyDoors: x.emergency_door,
            fireExtinguishers: x.fire_extinguishers,
            firstAidBox: x.first_aid_box,
            floorcleaning: x.floor_cleaning,
            month: x.month,
            removalofunwantedmaterials: x.removal_unwanted_materials,
            rapidDoors: x.rapid_doors,
            sidewallscorners: x.side_wall_corners,
            windows: x.windows,
            year: x.year,
            remarks: x.remarks,
            supervisor_sign: x.supervisor_sign,
            supervisor_status: x.supervisor_status,
            hr_status: x.hr_status,
            hod_status: x.hod_status,
            hod_sign: x.hod_sign,
            hr_status: x.hr_status,
            reason: x.reason,
          };
        });
        // console.log("aaa", a);
        setSummary(a);
        // setnewData(a);
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of summary) {
        if (
          data.hod_status === "HOD_REJECTED" ||
          data.hr_status == "HR_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summary]);

  // const handleViewDetails = (record) => {
  //   if (role == "ROLE_SUPERVISOR") {
  //     const x = summary.filter((x, i) => {
  //       return record.slb_id == x.slb_id;
  //     });
  //     // console.log("X", x);
  //     // setNewStatus(x[0].supervisor_status);
  //     setSelectedRow(x);
  //     setIsModalVisible(true);
  //   }
  //   if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
  //     const x = summary.filter((x, i) => {
  //       return record.slb_id == x.slb_id;
  //     });
  //     // console.log("X", x);
  //     // setNewStatus(x[0].supervisor_status);
  //     setSelectedRow(x);
  //     setIsModalVisible(true);
  //   }
  // };

  const handleEdit = (record) => {
    // if (role == "ROLE_HR") {
    const x = summary.filter((x, i) => {
      return record.clean_id == x.clean_id;
    });
    // console.log("X", x);
    // setNewStatus(x[0].supervisor_status);
    // console.log("clean_Id", x[0].clean_id);
    setmodalData(x);
    navigate("/Precot/Bleaching/F-02A/Edit", {
      state: {
        date: x[0].date,
        // shiftvalue: x[0].shift,
        clean_id: x[0].clean_id,
      },
    });
    // setnewModal(true);
    //   }
    //   if (role == "ROLE_HOD") {
    //     const x = summary.filter((x, i) => {
    //       return record.clean_id == x.clean_id;
    //     });
    //     // console.log("X", x);
    //     // setNewStatus(x[0].supervisor_status);
    //     // console.log("clean_id", x[0].clean_id);
    //     setmodalData(x);
    //     navigate("/Precot/Bleaching/F-02A/edit", {
    //       state: {
    //         date: x[0].date,
    //         // shiftvalue: x[0].shift,
    //         clean_id: x[0].clean_id,
    //       },
    //     });
    //     // setnewModal(true);
    //   }
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     // setFormatChange(formatDateTime(new Date()));
  //     setCurrentDateTime(formatchange);
  //   }, 1000);
  //   setNewDate(new Date().toISOString().substring(0, 10));
  //   // console.log("first System date ", currentDateTime);
  //   // console.log("system date format  ", formatchange);
  //   return () => clearInterval(timer);
  // }, []);

  const handleDateChanges = (e) => {
    // console.log(" Date ", e.target.value);
    setNewDate(e.target.value);
    setGotobtn(false);
  };

  const handleGoToChange = () => {
    if (newDate == "") {
      // setError('Please select a date');
      message.warning("Please Select Date");
      return;
    }
    navigate("/Precot/Bleaching/F-02A", {
      state: {
        date: newDate,
        // shiftvalue: shift,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
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
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => (text),
    },

    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "HR Status",
      dataIndex: "hr_status",
      key: "hr_status",
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
      dataIndex: "slb_id",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<BiEdit />}
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
  const printDataList = fetchPrintData(newData, selectMonth, selectYear);

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
      <BleachingHeader
        unit={unit}
        formName={"HOUSE KEEPING CLEANING CHECK LIST "}
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
            key="back"
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
              // eslint-disable-next-line no-unused-expressions
              confirm("Are you sure,want to Logout") == true
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
      <div
        style={{
          width: "100%",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Form.Item
          label="Date"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginBottom: 0,
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Input
              placeholder="Date"
              type="date"
              size="small"
              value={newDate}
              onChange={handleDateChanges}
              style={{ flex: 1 }}
              max={getCurrentDate()}
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
              onClick={handleGoToChange}
            >
              Go to
            </Button>
          </div>
        </Form.Item>
      </div>
      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={summary}
      />

      <Modal
        title="Print"
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        destroyOnClose={true}
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
            onClick={printDateSubmit}
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
            onChange={(value) => setSelectYear(value)}
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
        </div>
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
            // onChange={(value) => setSelectMonth(value)}
            onChange={(value) => handleDatePrintChange(value)}
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
        </div>
      </Modal>

      {/* print started here */}
      <GlobalStyle />
      <div id="section-to-print" style={{ padding: "20px", width: "80%" }}>
        <header className="no-print" />
        <main>
          <table className="f18table" style={{ marginTop: "2%", width: "80%" }}>
          
            <br></br>
            <tbody>
              {/* <tr>
                <td colspan="90" style={{ height: "10px" }}></td>
              </tr> */}
            <tr style={{ width: "80%" }}>
                <th
                  colSpan="10"
                  rowSpan="4"
                  style={{ textAlign: "center", height: "80px" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />{" "}
                  <br></br>
                  Unit H
                </th>

                <th colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                  House Keeping Cleaning Check List
                </th>
                <td colSpan="8">Format No.:</td>
                <td colSpan="9">PRD01/F-02-A</td>
              </tr>
              <tr>
                <td colSpan="8">Revision No.:</td>
                <td colSpan="9">01</td>
              </tr>
              <td colSpan="8">Ref. SOP No.:</td>
              <td colSpan="9">HRD01-D-55</td>
              <tr>
                <td colSpan="8">Page NO.:</td>
                <td colSpan="9">1 of 1</td>
              </tr>
              <br/>
              <br/>
              <br/>
              <tr>
                <td colSpan="1" rowSpan="2" style={{ textAlign: "center" }}>
                  S.No.
                </td>
                <td colSpan="17" rowSpan="2">
                  Cleaning Area
                </td>
                <td colSpan="8" rowSpan="2">
                  Frequency
                </td>
                <td colSpan="31">
                  Date for the Month & Year of: {selectMonth}/{selectYear}{" "}
                </td>
                <td colSpan="31">
                  Department: Blow room & Carding, Waste Bale Press{" "}
                </td>
              </tr>
              <tr>
                {dateLov.map((record, rowIndex) => (
                  <td key={rowIndex} colSpan="2">
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
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {" "}
                  1
                </td>
                <td colSpan="17"> Floor cleaning - Dry</td>
                <td
                  colSpan="8"
                  rowSpan="4"
                  style={{ textAlign: "center", transform: "rotate(270deg)" }}
                >
                  Once in a day
                </td>

                {dateLov.map((date, rowIndex) => {
                  const printData = printDataList.find(
                    (data) => data.day === rowIndex + 1
                  );
                  return (
                    <td key={rowIndex} className="data-border" colSpan="2">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {printData ? printData.floorcleaning : "NA"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {" "}
                  2
                </td>
                <td colSpan="17"> Removal of unwanted materials</td>

                {dateLov.map((date, rowIndex) => {
                  const printData = printDataList.find(
                    (data) => data.day === rowIndex + 1
                  );
                  return (
                    <td key={rowIndex} className="data-border" colSpan="2">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {printData
                          ? printData.removalofunwantedmaterials
                          : "NA"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {" "}
                  3
                </td>
                <td colSpan="17"> Side walls & corners </td>

                {dateLov.map((date, rowIndex) => {
                  const printData = printDataList.find(
                    (data) => data.day === rowIndex + 1
                  );
                  return (
                    <td key={rowIndex} className="data-border" colSpan="2">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {printData ? printData.sidewallscorners : "NA"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {" "}
                  4
                </td>
                <td colSpan="17"> Windows</td>

                {dateLov.map((date, rowIndex) => {
                  const printData = printDataList.find(
                    (data) => data.day === rowIndex + 1
                  );
                  return (
                    <td key={rowIndex} className="data-border" colSpan="2">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {printData ? printData.windows : "NA"}
                      </p>
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {" "}
                  5
                </td>
                <td colSpan="17"> Emergency Doors</td>
                <td
                  colSpan="8"
                  rowSpan="4"
                  style={{ transform: "rotate(270deg)" }}
                >
                  {" "}
                  Twice in a week
                </td>

                {dateLov.map((date, rowIndex) => {
                  const printData = printDataList.find(
                    (data) => data.day === rowIndex + 1
                  );
                  return (
                    <td key={rowIndex} className="data-border" colSpan="2">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {printData ? printData.emergencyDoors : "NA"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {" "}
                  6
                </td>
                <td colSpan="17"> Fire Extinguishers</td>

                {dateLov.map((date, rowIndex) => {
                  const printData = printDataList.find(
                    (data) => data.day === rowIndex + 1
                  );
                  return (
                    <td key={rowIndex} className="data-border" colSpan="2">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {printData ? printData.fireExtinguishers : "NA"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {" "}
                  7
                </td>
                <td colSpan="17"> First Aid Box </td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printDataList.find(
                    (data) => data.day === rowIndex + 1
                  );
                  return (
                    <td key={rowIndex} className="data-border" colSpan="2">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {printData ? printData.firstAidBox : "NA"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {" "}
                  8
                </td>
                <td colSpan="17"> Rapid Doors</td>

                {dateLov.map((date, rowIndex) => {
                  const printData = printDataList.find(
                    (data) => data.day === rowIndex + 1
                  );
                  return (
                    <td key={rowIndex} className="data-border" colSpan="2">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {printData ? printData.rapidDoors : "NA"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr style={{ height: "50px" }}>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  9{" "}
                </td>
                <td colSpan="17">Roof cleaning</td>
                <td colSpan="8">Quarterly </td>
                <td
                  colSpan="18"
                  style={{ verticalAlign: "top", textAlign: "center" }}
                >
                  Cleaning carried by{" "}
                </td>
                <td
                  colSpan="20"
                  style={{ verticalAlign: "top", textAlign: "center" }}
                >
                  Cleaning completed On{" "}
                </td>
                <td
                  colSpan="24"
                  style={{ verticalAlign: "top", textAlign: "center" }}
                >
                  Cleaning verified by{" "}
                </td>
              </tr>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>



              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <tr>
                            {/* <td style={{padding:'5px', border:'none'}}></td> */}

                            <th
                                colSpan="10"
                                rowSpan="4"
                                printDateSubmit style={{ textAlign: "center", height: "80px", paddingTop: '20px' }}
                            >
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{ width: "100px", height: "auto" }}
                                />{" "}
                                <br></br>
                                Unit H
                            </th>

                            <th colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                            House Keeping Cleaning Check List

                            </th>
                            <td colSpan="8">Format No.:</td>
                            <td colSpan="9">PRD01/F-02-A</td>
                        </tr>
                        <tr>
                            <td colSpan="8">Revision No.:</td>
                            <td colSpan="9">01</td>
                        </tr>
                        <td colSpan="8">Ref. SOP No.:</td>
                        <td colSpan="9"> HRD01-D-55  </td>
                        <tr>
                            <td colSpan="8">Page NO.:</td>
                            <td colSpan="9">2 of 2</td>
                        </tr>
<br/>
              <tr>
                <td colSpan="88">
                  Remark / Comment (in case of any abnormality observed) :{" "}
                  {"Nil"}
                  {/* <p
                    // style={{
                    //   alignItems: "center",
                    //   justifyContent: "center",
                    // }}
                  >
                    
                  </p> */}
                </td>
              </tr>
              
              <tr>
            
                <td colSpan="26"> Cleaned By(Trained Person):</td>
                {dateLov.map((date, rowIndex) => {
                  const printData = printDataList.find(
                    (data) => data.day === rowIndex + 1
                  );
                  return (
                    <td key={rowIndex} className="data-border" colSpan="2">
                      <p
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: '5px',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word'
                      }}
                      >
                        {printData ? printData?.cleaned_by : "NA"}
                      </p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td colSpan="26">Verified by (Production Supervisor)</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                {/* <td colSpan="1"></td> */}
              </tr>
              <tr>
                <td colSpan="26">Verified by (HR)</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                {/* <td colSpan="1"></td> */}
              </tr>
              <tr style={{ padding: "2" }}>
                <td className="data-border" colSpan="26">
                  Reviewed By HOD:
                </td>
                <td className="data-border" colSpan="62"></td>
              </tr>
              <tr>
                {" "}
                <td colSpan="88">
                  Note: Tick mark "√" indicates activity completed & Cross mark
                  '"×" indicate not completed "NA" indicate no data.
                </td>
              </tr>
            </tbody>

            <br></br>

            <tfoot>
              <tr>
                <td colSpan="23">Particulars</td>
                <td colSpan="23">Prepard by</td>
                <td colSpan="22">Reviewed by</td>
                <td colSpan="20">Approved by</td>
              </tr>

              <tr>
                <td colSpan="23">Name</td>
                <td colSpan="23"></td>
                <td colSpan="22"></td>
                <td colSpan="20"></td>
              </tr>
              <tr>
                <td colSpan="23">Signature & Date</td>
                <td colSpan="23"></td>
                <td colSpan="22"></td>
                <td colSpan="20"></td>
              </tr>
            </tfoot>
          </table>
        </main>
        <footer className="no-print" />
      </div>
      {/* print ended here */}
    </div>
  );
};

export default Bleaching_f02A_Summary;