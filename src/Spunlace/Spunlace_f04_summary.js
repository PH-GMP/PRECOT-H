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

const Spunlace_f04_summary = () => {
  const formatName = "Filter Bag Consumption Details";
  const formatNo = "PH-PRD02/F-004";
  const revisionNo = "01";
  const sopNo = "PH-PRD02-D-03";
  const unit = "Unit H";

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
  }`;

  const [newDate, setNewDate] = useState("");
  const [date, setDate] = useState("");

  const [printNewDate, setPrintNewDate] = useState("");
  const [printdate, setPrintDate] = useState("");
  const [printshift, setPrintShift] = useState("");
  const [printBtnStatus, setPrintBtnStatus] = useState(true);
  const [modalData, setmodalData] = useState([]);

  // Shift state....
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [shiftBtnStatus, setShiftBtnStatus] = useState(true);

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

  const [newData, setNewData] = useState("");
  const [getData, setGetData] = useState([]);
  const [reason, setReason] = useState(false);
  const { Option } = Select;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleModalClose = () => {
    setPrintBtnStatus(true);
    setShowModal(false);
    setPrintDate("");
    setPrintShift("");
  };

  const printSubmit = () => {
    window.print();
    handleModalClose();
  };

  let formattedOperatorDate;
  if (newData.operator_submit_on) {
    formattedOperatorDate = moment(newData.operator_submit_on).format(
      "DD/MM/YYYY HH:MM"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedOperatorDate = ""; // Or any other default value or error handling
  }
  let formattedSupervisorDate;
  if (newData.supervisor_submit_on) {
    formattedSupervisorDate = moment(newData.supervisor_submit_on).format(
      "DD/MM/YYYY HH:MM"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedSupervisorDate = ""; // Or any other default value or error handling
  }
  let formattedHODDate;
  if (newData.hod_submit_on) {
    formattedHODDate = moment(newData.hod_submit_on).format("DD/MM/YYYY HH:MM");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedHODDate = ""; // Or any other default value or error handling
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [getImage, setGetImage] = useState("");
  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = newData.supervisor_sign;
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
  }, [newData,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = newData.hod_sign;
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
  }, [newData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = newData.operator_sign;
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
  }, [newData,API.prodUrl, token]);

  // console.log("get image", getImage);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
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
    setShiftBtnStatus(false);
    const formatDates = Dateformat(e.target.value);
    // console.log("Select Date", formatDates);
    setPrintNewDate(formatDates);
  };

  const handlePrintshift = (value) => {
    // console.log(" date Value", value);
    setPrintShift(value);
  };

  const handleShiftChange = (value) => {
    // console.log(" Shift ", value);
    setShift(value);
    setGotobtn(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchData = async () => {
    if (localStorage.getItem("role") == "ROLE_OPERATOR") {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/operatorSummary`,
          {
            headers,
          }
        )
        .then((res) => {
          // console.log("post", res.data);
          if (res.data && res.data.length !== 0) {
            setReason(true);
          } else {
            setReason(false);
          }
          setGetData(res.data);
          const a = res.data.map((x, i) => {
            return {
              formatName: x.formatName,
              formatNo: x.formatNo,
              revisionNo: x.revisionNo,
              refSopNo: x.refSopNo,
              unit: x.unit,
              date: x.date,
              shift: x.shift,
              filterId: x.filterId,
              supervisor_status: x.supervisor_status,
              hod_status: x.hod_status,
              supervisor_sign: x.supervisor_sign,
              hod_sign: x.hod_sign,
              operator_status: x.operator_status,
              operator_sign: x.operator_sign,
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
    } else if (localStorage.getItem("role") == "ROLE_SUPERVISOR") {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/supervisorSummary`,
          {
            headers,
          }
        )
        .then((res) => {
          // console.log("post", res.data);
          if (res.data && res.data.length !== 0) {
            setReason(true);
          } else {
            setReason(false);
          }
          setGetData(res.data);
          const a = res.data.map((x, i) => {
            return {
              formatName: x.formatName,
              formatNo: x.formatNo,
              revisionNo: x.revisionNo,
              refSopNo: x.refSopNo,
              unit: x.unit,
              date: x.date,
              shift: x.shift,
              filterId: x.filterId,
              supervisor_status: x.supervisor_status,
              hod_status: x.hod_status,
              supervisor_sign: x.supervisor_sign,
              hod_sign: x.hod_sign,
              operator_status: x.operator_status,
              operator_sign: x.operator_sign,
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
    } else if (
      role == "ROLE_HOD" ||
      localStorage.getItem("role") == "ROLE_DESIGNEE"
    ) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/supervisorSummary`,
          {
            headers,
          }
        )
        .then((res) => {
          // console.log("post", res.data);
          if (res.data && res.data.length !== 0) {
            setReason(true);
          } else {
            setReason(false);
          }
          setGetData(res.data);
          const a = res.data.map((x, i) => {
            return {
              formatName: x.formatName,
              formatNo: x.formatNo,
              revisionNo: x.revisionNo,
              refSopNo: x.refSopNo,
              unit: x.unit,
              date: x.date,
              shift: x.shift,
              filterId: x.filterId,
              supervisor_status: x.supervisor_status,
              hod_status: x.hod_status,
              supervisor_sign: x.supervisor_sign,
              hod_sign: x.hod_sign,
              operator_status: x.operator_status,
              operator_sign: x.operator_sign,
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
    }
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (
          data.hod_status === "HOD_REJECTED" ||
          data.supervisor_status === "SUPERVISOR_REJECTED"
        ) {
          setReason(true);
          break;
        } else {
          setReason(false);
        }
      }
    };
    findReason();
  }, [getData]);

  const handleEdit = (record) => {
    if (role == "ROLE_OPERATOR") {
      const x = summary.filter((x, i) => {
        return record.filterId == x.filterId;
      });
      // console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      setmodalData(x);
      navigate("/Precot/Spunlace/F-04", {
        state: {
          date: x[0].date,
          shiftvalue: x[0].shift,
          filterId: x[0].filterId,
        },
      });
      // setnewModal(true);
    }
    if (role == "ROLE_SUPERVISOR") {
      const x = summary.filter((x, i) => {
        return record.filterId == x.filterId;
      });
      // console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      setmodalData(x);
      navigate("/Precot/Spunlace/F-04", {
        state: {
          date: x[0].date,
          shiftvalue: x[0].shift,
          filterId: x[0].filterId,
        },
      });
      // setnewModal(true);
    }
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      const x = summary.filter((x, i) => {
        return record.filterId == x.filterId;
      });
      // console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      // console.log("SlbId", x[0].filterId);
      setmodalData(x);
      navigate("/Precot/Spunlace/F-04", {
        state: {
          date: x[0].date,
          shiftvalue: x[0].shift,
          filterId: x[0].filterId,
        },
      });
    }
    // setnewModal(true);
  };

  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const printDateSubmit = () => {
    if (printNewDate == "") {
      // setError('Please select a date');
      message.warning("Please Select Date");
      return;
    } else {
      // setShowModal(false);
      // setPrintShift("");
      // setPrintDate("");
      window.print();
      handleModalClose();
    }
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  // Shift Get api for show the shift values.....
  useEffect(() => {
    // Fetch shift options from the API
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          { headers }
        );
        setShiftOptions(response.data);
        // console.log("Shift Lov ", shiftOptions);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  // const handlePrintChange = () => {
  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     "Content-Type": "application/json", // Adjust content type if needed
  //   };
  //   // const a = String(event.target.value).split('-').reverse().join('/');

  //   // console.log( " date", printNewDate);
  //   // console.log("Shift",printshift);
  //   if (printNewDate == "" || printNewDate == null) {
  //     // setError('Please select a date');
  //     message.warning("Please Select Date");
  //     return;
  //   }
  //   if (printshift == "" || printshift == null) {
  //     message.warning("Please Select Shift");
  //     return;
  //   }

  //   // let params = {
  //   //   date:"",
  //   //   shift:""
  //   // };

  //   // if ( printNewDate !== "" && printshift !== "") {
  //   //   params.date= printNewDate,
  //   //   params.shift = printshift;
  //   // }

  //   axios
  //     .get(
  //       `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/getByDateAndShiftPrintApi`,
  //       {
  //         headers,
  //         params: {
  //             date:printNewDate,
  //             shift:printshift
  //           }
  //       }
  //     )
  //     .then((res) => {
  //       // console.log("first response", res.data);

  //       if (res.data) {
  //         // Check if res.data is an array and has at least one item
  //         if (Array.isArray(res.data) && res.data.length > 0) {
  //           // Assuming each item in the array has a 'details' property
  //           if (res.data[0].details && res.data[0].details.length > 0) {
  //             // // console.log("Details received:", res.data[0].details);
  //             // console.log("New Data received:", res.data[0]);
  //             setNewData(res.data);
  //             setPrintBtnStatus(false);
  //             // setShowModal(false);
  //             // // setPrintShift(null);
  //             // setPrintDate(null);
  //             // window.print();
  //             printSubmit();
  //           }
  //           // }else if (res.data.length > 0){
  //           //   // console.log("condition for the All data")
  //           //   setNewData(res.data);
  //           //   setPrintBtnStatus(false);
  //           //   printSubmit()
  //           // }
  //            else {
  //             // // console.log("No details available:", res.data[0].details);
  //             setNewData([]);
  //             setPrintBtnStatus(true);
  //           }
  //           // printSubmit();
  //         } else if (res.data.success === true && res.data.message) {
  //           // // console.log("No details available:", res.data.message);
  //           setNewData([]);
  //           message.warning("No Data Found");
  //           setShowModal(false);
  //           setPrintBtnStatus(true);
  //           // setPrintShift(null);
  //           setPrintDate(null);
  //         } else {
  //           // console.error("Unexpected response format:", res);
  //           setNewData([]);
  //           setPrintBtnStatus(true);
  //         }
  //       } else {
  //         // console.error("Unexpected response format:", res);
  //         setNewData([]);
  //         setPrintBtnStatus(true);
  //       }
  //     })
  //     // .then((res) => {
  //     //   window.print();
  //     // })
  //     .catch((err) => {
  //       // console.log("Error", err);
  //     });
  // };

  const handlePrintChange = (shift) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    // const a = String(event.target.value).split('-').reverse().join('/');

    if (printNewDate == "") {
      // setError('Please select a date');
      message.warning("Please Select Date");
      return;
    }

    axios
      .get(
        `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/getByDateAndShiftPrintApi`,
        {
          headers,
          params: {
            date: printNewDate,
            shift: shift,
          },
        }
      )
      .then((res) => {
        // console.log("first response", res.data);

        if (res.data) {
          // Check if res.data is an array and has at least one item
          if (Array.isArray(res.data) && res.data.length > 0) {
            // Assuming each item in the array has a 'details' property
            if (res.data[0].details && res.data[0].details.length > 0) {
              // // console.log("Details received:", res.data[0].details);
              // // console.log("New Data received:", res.data[0]);
              setNewData(res.data[0]);
              setPrintBtnStatus(false);
            } else {
              // // console.log("No details available:", res.data[0].details);
              setNewData([]);
              setPrintBtnStatus(true);
            }
          } else if (res.data.success === true && res.data.message) {
            // // console.log("No details available:", res.data.message);
            setNewData([]);
            message.warning("No Data Found");
            setShowModal(false);
            setPrintBtnStatus(true);
            // setPrintShift(null);
            setPrintDate(null);
          } else {
            // console.error("Unexpected response format:", res);
            setNewData([]);
            setPrintBtnStatus(true);
          }
        } else {
          // console.error("Unexpected response format:", res);
          setNewData([]);
          setPrintBtnStatus(true);
        }
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  };

  const handleGoToChange = () => {
    if (newDate == "") {
      // setError('Please select a date');
      message.warning("Please Select Date");
      return;
    }
    if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    navigate("/Precot/Spunlace/F-04", {
      state: {
        date: newDate,
        shiftvalue: shift,
      },
    });
  };

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
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      // render: (text) => formatDate(text),
    },

    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
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
  console.log("newData[0]?.details?.length:", newData[0]?.details?.length);
  if (newData?.length > 0 && newData[0]?.details) {
    console.log("Details length:", newData[0].details.length);
  } else {
    console.log("Data not available yet or missing details.");
  }
  console.log("newData:", newData);
  console.log("newData[0]:", newData[0]);
  console.log("newData[0]?.details:", newData?.details);
  console.log("newData[0]?.details?.length:", newData?.details?.length);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(newData?.details?.length / recordsPerPage);

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };

  return (
    <div>
      {/* print started here */}
      <GlobalStyle />
      <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          >
            <table style={{ marginTop: "10px", width: "90%" }}>
              <thead>
                <tr>
                  <td colSpan="5" rowspan="4 " style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br></br>
                    {unit}
                  </td>
                  <th colSpan="18" rowSpan="4" style={{ textAlign: "center" }}>
                    {formatName}
                  </th>
                  <td colSpan="1">Format No:</td>
                  <td colSpan="1">{formatNo}</td>
                </tr>
                <tr>
                  <td colSpan="1">Revision No:</td>
                  <td colSpan="1">{revisionNo}</td>
                </tr>
                <td colSpan="1">Ref. SOP No:</td>
                <td colSpan="1">{sopNo}</td>
                <tr>
                  <td colSpan="1">Page No:</td>
                  <td colSpan="1">
                    {pageIndex + 1} of {totalPages}
                  </td>
                </tr>
              </thead>
              <br />

              <tbody>
                <tr>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Date
                  </th>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Shift
                  </th>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Time
                  </th>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    No Of Bags Changed
                  </th>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    F-1
                  </th>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    F-2
                  </th>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    F-3
                  </th>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    F-4
                  </th>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Changed by <br />
                    Sign & Date
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Verified by Prod
                    <br />. Supervisor Sign & Date
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    HOD / Designee
                    <br />
                    Sign & Date
                  </th>
                </tr>

                {/* {newData &&
                newData.details &&
                Array.isArray(newData.details) &&
                newData.details.length > 0 ? (
                newData.details.map((line, index) => ( */}
                {newData.details.length > 0 ? (
                  paginateData(newData?.details, pageIndex + 1).map(
                    (line, index) => (
                      <tr key={index}>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {newData.date}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {newData.shift}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {line.time}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {line.noOfBags}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {line.f1}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {line.f2}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {line.f3}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {line.f4}
                        </td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {getImage2 !== "" && (
                            <img
                              className="signature"
                              src={getImage2}
                              alt="Operator"
                            />
                          )}
                          <br />
                          {newData.operator_sign}
                          <br />
                          {formattedOperatorDate}
                          <br />
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {getImage !== "" && (
                            <img
                              className="signature"
                              src={getImage}
                              alt="Supervisor"
                            />
                          )}
                          <br />
                          {newData.supervisor_sign}
                          <br />
                          {formattedSupervisorDate}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {getImage1 !== "" && (
                            <img
                              className="signature"
                              src={getImage1}
                              alt="HOD"
                            />
                          )}
                          <br />
                          {newData.hod_sign}
                          <br />
                          {formattedHODDate}
                          <br />
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="25" style={{ textAlign: "center" }}>
                      No details available
                    </td>
                  </tr>
                )}
              </tbody>
              <br />
              <tfoot>
                <tr>
                  <th colSpan="7">Particular</th>
                  <th colSpan="6" style={{ textAlign: "center" }}>
                    Prepared by
                  </th>
                  <th colSpan="6" style={{ textAlign: "center" }}>
                    Reviewed by
                  </th>
                  <th colSpan="6" style={{ textAlign: "center" }}>
                    Approved by
                  </th>
                </tr>
                <tr>
                  <th colSpan="7">Name</th>
                  <td colSpan="6"></td>
                  <td colSpan="6"></td>
                  <td colSpan="6"></td>
                </tr>
                <tr>
                  <th colSpan="7">Signature & Date</th>
                  <td colSpan="6"></td>
                  <td colSpan="6"></td>
                  <td colSpan="6"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>

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

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            format="DD/MM/YYYY"
            value={date}
            style={{ fontWeight: "bold", width: "135px" }}
            onChange={handleDate}
            max={getCurrentDate()}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <span>
            {" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select
            Shift:
          </span>
        </div>
        <Select
          placeholder="Select Shift"
          value={shift}
          onChange={handleShiftChange}
          style={{ width: 120, fontWeight: "bold" }}
        >
          {shiftOptions.map((shift) => (
            <Option key={shift.id} value={shift.value}>
              {shift.value}
            </Option>
          ))}
        </Select>
        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          onClick={handleGoToChange}
        >
          Go to
        </Button>
      </div>
      {/* 
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
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
            onClick={handlePrintChange}
            // disabled={printBtnStatus}
          >
            Print
          </Button>,
        ]}
      >
        {" "}
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            format="DD/MM/YYYY"
            value={printdate}
            style={{ fontWeight: "bold", width: "135px" }}
            onChange={handlePrintDate}
            max={getCurrentDate()}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <span>
              {" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select
              Shift:
            </span>
          </div>
          <Select
            placeholder="Select Shift"
            value={printshift}
            // onChange={(value) => handlePrintChange(value)}
            onChange={handlePrintshift}
            style={{ width: 120, fontWeight: "bold" }}
          >
            {shiftOptions.map((shift) => (
              <Option key={shift.id} value={shift.value}>
                {shift.value}
              </Option>
            ))}
          </Select>
        </div>
      </Modal> */}

      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
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
            disabled={printBtnStatus}
          >
            Print
          </Button>,
        ]}
      >
        {" "}
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            format="DD/MM/YYYY"
            value={printdate}
            style={{ fontWeight: "bold", width: "135px" }}
            onChange={handlePrintDate}
            max={getCurrentDate()}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <span>
              {" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select
              Shift:
            </span>
          </div>
          <Select
            placeholder="Select Shift"
            // value={shift}
            disabled={shiftBtnStatus}
            onChange={(value) => handlePrintChange(value)}
            style={{ width: 120, fontWeight: "bold" }}
          >
            {shiftOptions.map((shift) => (
              <Option key={shift.id} value={shift.value}>
                {shift.value}
              </Option>
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
        dataSource={summary}
        rowKey="filterId"
      />
    </div>
  );
};

export default Spunlace_f04_summary;
