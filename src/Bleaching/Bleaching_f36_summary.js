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
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BiLock, BiNavigation } from "react-icons/bi";
import API from "../baseUrl.json";
import Bleaching_f36_edit from "./Bleaching_f36_edit";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import BleachingHeader from "../Components/BleachingHeader";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import { IoIosNavigate } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";
import { createGlobalStyle } from "styled-components";

const Bleaching_f36_Summary = () => {
  const [newDate, setNewDate] = useState("");
  const [shiftLogBook, setShiftLogBook] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState([]);
  // const [newData, setNewData] = useState();
  const [newData, setnewData] = useState();
  const [reason, setReason] = useState(false);

  const [summary, setSummary] = useState([]);

  const [supervisor_Data, setSupervisorData] = useState("");
  const [superData, setsupervisorData] = useState([]);
  const [hod_Data, setHodData] = useState();
  const [hoddata, sethodData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [slbId, setSlbId] = useState("");
  const [remarks, setRemarks] = useState("Nill");
  const [Cakepress1, setCakepress1] = useState("");
  const [Cakepress2, setCakepress2] = useState("");
  const [Kier01, setKier01] = useState("");
  const [Kier02, setKier02] = useState("");
  const [Kier03, setKier03] = useState("");
  const [Hydro01, setHydro01] = useState("");
  const [Hydro02, setHydro02] = useState("");
  const [CakeOpener, setCakeOpener] = useState("");
  // const [BalePress,setBalePress] = useState("");
  const [NoofBale, setNoofBale] = useState("");
  const [WeightingBale, setWeightingBale] = useState("");
  const [shiftget, setShiftGet] = useState([]);
  const [shiftstatus, setShiftStatus] = useState("");
  const [status, setStatus] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [routePath, setRoutePath] = useState("");
  // const [approverStatus, setApproverStatus] = useState("");
  const [supervisor_status, setSupervisorStatus] = useState("NULL");
  const [hod_status, setHodStatus] = useState("NULL");
  const [hod_submitted_on, setHodSubmittedOn] = useState("");
  const [productionSupervisorSign, setProductionSupervisorSign] = useState("");
  // const [supervisor, setSupervisor] = useState("");
  // const [hod, setHod] = useState("");
  const [apiStatus, setApistatus] = useState("");
  const [hodSign, setHodSign] = useState("");
  const [hod_approved_on, setHodApprovedOn] = useState("");
  const [prinBtnDisable, setprinBtnDisable] = useState(true);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [mail_status, setMailStatus] = useState("");
  const [supervisor_sign, setSupervisorSign] = useState("");
  const [supervisor_saved_on, setSupervisorSavedOn] = useState("");
  const [supervisor_saved_by, setSupervisorSavedBy] = useState("");
  const [supervisor_saved_id, setSupervisorSavedId] = useState(0);
  const [supervisor_submit_on, setSupervisorSubmitOn] = useState("");
  const [supervisor_submit_by, setSupervisorSubmitBy] = useState("");
  const [supervisor_submit_id, setSupervisorSubmitId] = useState(0);
  // const [supervisor_sign, setSupervisorSign] = useState("");
  // const [hod_sign, setHodSign] = useState("");
  const [hod_saved_on, setHodSavedOn] = useState("");
  const [hod_saved_by, setHodSavedBy] = useState("");
  const [hod_saved_id, setHodSavedId] = useState(0);
  const [hod_submit_on, setHodSubmitOn] = useState("");
  const [hod_submit_by, setHodSubmitBy] = useState("");
  const [hod_submit_id, setHodSubmitId] = useState(0);

  const [gotobtn, setGotobtn] = useState(true);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [formatchange, setFormatChange] = useState("");

  // Shift state....
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);

  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      // transform-origin: top right; /* Adjust the origin if needed */
      // transform-origin: bottom top ;
      transform-origin: bottom top;
      // transform-origin: top left;

    }
  }
`;

  const { Option } = Select;

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  const userName = localStorage.getItem("username");

  const navigate = useNavigate();

  const [stoppagestatus, setStoppageStatus] = useState(false);
  const [stoppageDetails, setStoppageDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [printDate, setPrintDate] = useState("");
  const [printShift, setPrintShift] = useState("");
  const handleDatePrint = (event) => {
    const value = event.target.value;
    // console.log(" Date ", value);
    setPrintDate(value);
  };

  const formattedDatesupervisor = () => {
    if (printResponseData?.[0]?.supervisor_submit_on) {
      const date = moment(printResponseData?.[0]?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.hod_sign;
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

  const formattedDate = printResponseData?.[0]?.date
    ? new Date(printResponseData[0].date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";
  const formattedDateHod = () => {
    if (printResponseData?.[0]?.hod_submit_on) {
      const date = moment(printResponseData?.[0]?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
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
  useEffect(() => {
    // console.log("print response data", printResponseData);
  }, [printResponseData]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchShifts = async (value) => {
    try {
      const numericShiftValue = convertShiftValue(value);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/bleach/findStoppageByDateAndShift`,
        {
          pack_dt: printDate,
          shift_id: numericShiftValue,
        },
        { headers }
      );

      if (response.data.status === "No Data") {
        setStoppageStatus(false);
      } else {
        setStoppageStatus(true);
        setStoppageDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPrintShift(null);
    setPrintDate(null);
  };
  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
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
  const convertShiftValue = (value) => {
    switch (value) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return value;
    }
  };
  const handlePrintChange = (value) => {
    try {
      setPrintShift(value);
      fetchShifts(value);

      axios
        .post(
          `${ API.prodUrl}/Precot/api/bleach/findByDateAndShift`,
          { date: printDate, shift: value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const printres = res.data;
            // console.log("print resssss", res.data[0]);
            // console.log("printtt", printres);
            setPrintResponseData(printres);
          } else {
            // setPrintResponseData([]);
            message.warning("No data found...!");
          }
        })
        .catch((err) => {
          // console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const fetchData = async () => {
    if (localStorage.getItem("role") == "ROLE_SUPERVISOR") {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(
          `${ API.prodUrl}/Precot/api/bleach/ShiftlogBookF36SummaryForSupervisor`,
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
              sopNumber: x.sopNumber,
              unit: x.unit,
              shift: x.shift,
              slb_id: x.slb_id,
              supervisor_status: x.supervisor_status,
              hod_status: x.hod_status,
              bmrNumber: x.bmrNumber,
              date: x.date,
              shift: x.shift,
              cakePress1: x.cakePress1,
              cakePress2: x.cakePress2,
              bmrNumber: x.bmrNumber,
              kier1: x.kier1,
              kier2: x.kier2,
              kier3: x.Kier3,
              hydro1: x.hydro1,
              hydro2: x.hydro2,
              cakeopenerDryerAbBalePress: x.cakeopenerDryerAbBalePress,
              noOfBales: x.noOfBales,
              weightInKg: x.weightInKg,
              remarks: x.remarks,
              supervisor_sign: x.supervisor_sign,
              hod_sign: x.hod_sign,
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
      localStorage.getItem("role") == "ROLE_HOD" ||
      localStorage.getItem("role") == "ROLE_DESIGNEE"
    ) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(`${ API.prodUrl}/Precot/api/bleach/ShiftlogBookF36SummaryForHod`, {
          headers,
        })
        .then((res) => {
          // console.log("post", res.data);
          const a = res.data.map((x, i) => {
            return {
              formatName: x.formatName,
              formatNo: x.formatNo,
              formatDate: x.date,
              revisionNo: x.revisionNo,
              sopNumber: x.sopNumber,
              unit: x.unit,
              shift: x.shift,
              slb_id: x.slb_id,
              supervisor_status: x.supervisor_status,
              hod_status: x.hod_status,
              bmrNumber: x.bmrNumber,
              date: x.date,
              shift: x.shift,
              cakePress1: x.cakePress1,
              cakePress2: x.cakePress2,
              bmrNumber: x.bmrNumber,
              kier1: x.kier1,
              kier2: x.kier2,
              kier3: x.Kier3,
              hydro1: x.hydro1,
              hydro2: x.hydro2,
              cakeopenerDryerAbBalePress: x.cakeopenerDryerAbBalePress,
              noOfBales: x.noOfBales,
              weightInKg: x.weightInKg,
              remarks: x.remarks,
              supervisor_sign: x.supervisor_sign,
              hod_sign: x.hod_sign,
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
      for (const data of summary) {
        console.log("hod status", data.hod_status);
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summary]);

  const handleViewDetails = (record) => {
    if (role == "ROLE_SUPERVISOR") {
      const x = summary.filter((x, i) => {
        return record.slb_id == x.slb_id;
      });
      // console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      setSelectedRow(x);
      setIsModalVisible(true);
    }
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      const x = summary.filter((x, i) => {
        return record.slb_id == x.slb_id;
      });
      // console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      setSelectedRow(x);
      setIsModalVisible(true);
    }
  };

  const handleEdit = (record) => {
    if (role == "ROLE_SUPERVISOR") {
      const x = summary.filter((x, i) => {
        return record.slb_id == x.slb_id;
      });
      // console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      setmodalData(x);
      navigate("/Precot/Bleaching/F-36/edit", {
        state: {
          date: x[0].date,
          shiftvalue: x[0].shift,
          slb_id: x[0].slb_id,
        },
      });
      // setnewModal(true);
    }
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      const x = summary.filter((x, i) => {
        return record.slb_id == x.slb_id;
      });
      // console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      // console.log("SlbId", x[0].slb_id);
      setmodalData(x);
      navigate("/Precot/Bleaching/F-36/edit", {
        state: {
          date: x[0].date,
          shiftvalue: x[0].shift,
          slb_id: x[0].slb_id,
        },
      });
      // setnewModal(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // setFormatChange(formatDateTime(new Date()));
      setCurrentDateTime(formatchange);
    }, 1000);
    setNewDate(new Date().toISOString().substring(0, 10));
    // console.log("first System date ", currentDateTime);
    // console.log("system date format  ", formatchange);
    return () => clearInterval(timer);
  }, []);

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
          `${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
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

  const handleShiftChange = (value) => {
    // console.log(" Shift ", value);
    setShift(value);
    setGotobtn(false);
  };

  const handleGoToChange = () => {
    if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    navigate("/Precot/Bleaching/F-36", {
      state: {
        date: newDate,
        shiftvalue: shift,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const printDateSubmit = () => {
    setShowModal(false);
    setPrintShift(null);
    setPrintDate(null);
    window.print();
  };
  // const handlePrint = () => {
  //   window.print();
  // };

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
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "formatDate",
      key: "formatDate",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        <header className="no-print" />
        <main>
          <table style={{ width: "90%" }}>
            <thead>
              <br />
              {/* <tr style={{ border: "none" }}>
              <td style={{ border: "none"  , height : "10px"}} colSpan="7"></td>
            </tr> */}
              <tr>
                <td
                  rowSpan="4"
                  style={{
                    textAlign: "center",
                    width: "20%",
                    verticalAlign: "bottom",
                  }}
                >
                  <td
                    style={{
                      width: "10%",
                      border: "none",
                      textAlign: "center",
                    }}
                  >
                    <img src={logo} alt="hj" width="100%" />{" "}
                  </td>
                  Unit H
                </td>
                <td rowspan="4" colSpan="4" style={{ textAlign: "center" }}>
                  Shift Log Book{" "}
                </td>
                <td>Format No.:</td>
                <td>{printResponseData && printResponseData[0].formatNo}</td>
              </tr>
              <tr>
                <td>Revision No.:</td>
                <td>{printResponseData && printResponseData[0].revisionNo}</td>
              </tr>
              <tr>
                <td>Ref.SOP No.:</td>
                <td>{printResponseData && printResponseData[0].sopNumber}</td>
              </tr>
              <tr>
                <td>Page No.:</td>
                <td>1 of 1</td>
              </tr>
              {/* <tr style={{ border: "none" }}>
                       <td style={{ border: "none" }} ></td>
                       </tr> */}
            </thead>
            <br />
            <tbody>
              <tr>
                <td colspan="4" style={{ height: "35px" }}>
                  Date: {formattedDate}
                </td>
                {/* <td colspan="2">{newData && newData[0].date}</td> */}
                {/* <td colspan="2">{formattedDate}</td> */}
                <td colspan="4">
                  Shift:{printResponseData && printResponseData[0].shift}
                </td>
                {/* <td colspan="2">{newData && newData[0].shift}</td> */}
              </tr>

              <tr>
                <td colSpan="7" style={{ height: "25px", textAlign: "left" }}>
                  <b>
                    Machine wise running details (at the time of handover):{" "}
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="7" style={{ height: "25px", textAlign: "left" }}>
                  Blow-room/Carding{" "}
                  <span>
                    BMR No :{" "}
                    {printResponseData && printResponseData[0].bmrNumber}
                  </span>
                </td>
                {/* <td colSpan="3"> BMR No : {newData && newData[0].bmrNumber}</td> */}
              </tr>
              <tr>
                <td colSpan="4">
                  Cake Press#01 :{" "}
                  {printResponseData && printResponseData[0].cakePress1}
                </td>
                <td colSpan="3">
                  Cake Press#02 :{" "}
                  {printResponseData && printResponseData[0].cakePress2}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {" "}
                  Kier#01 : {printResponseData && printResponseData[0].kier1}
                </td>
                <td colSpan="2">
                  {" "}
                  Kier#02 : {printResponseData && printResponseData[0].kier2}
                </td>
                <td colSpan="3">
                  {" "}
                  Kier#03 : {printResponseData && printResponseData[0].kier3}
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  {" "}
                  Hydro#01 : {printResponseData && printResponseData[0].hydro1}
                </td>
                <td colSpan="3">
                  {" "}
                  Hydro#02 : {printResponseData && printResponseData[0].hydro2}
                </td>
              </tr>
              <tr>
                <td colSpan="7">
                  <b>
                    Cake Opener, Dryer & AB Bale Press :{" "}
                    {printResponseData &&
                      printResponseData[0].cakeopenerDryerAbBalePress}
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="7" style={{ height: "25px", textAlign: "left" }}>
                  {" "}
                  <b>Bale Press Machine Production details :</b>
                </td>
              </tr>

              <tr>
                <td colSpan="4">
                  {" "}
                  No. of Bales :{" "}
                  {printResponseData && printResponseData[0].noOfBales}{" "}
                </td>
                <td colSpan="3">
                  {" "}
                  Weight in Kgs :{" "}
                  {printResponseData && printResponseData[0].weightInKg}
                </td>
              </tr>

              <tr>
                <td colSpan="7">
                  {" "}
                  <b>Stoppage details:</b>
                </td>
              </tr>

              <tr>
                <td rowSpan="2" colSpan="2" style={{ textAlign: "center" }}>
                  {" "}
                  Machine Name{" "}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {" "}
                  Time
                </td>
                <td rowSpan="2" colSpan="2" style={{ textAlign: "center" }}>
                  {" "}
                  Reasons
                </td>
                <td rowSpan="2" colSpan="1" style={{ textAlign: "center" }}>
                  {" "}
                  Remarks
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> From </td>
                <td style={{ textAlign: "center" }}> To</td>
              </tr>

              {stoppagestatus == true ? (
                <>
                  {stoppageDetails &&
                    stoppageDetails.map((line, index) => (
                      <tr key={index}>
                        <td colSpan="2">{line.mcn}</td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {line.f_time}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {line.t_time}
                        </td>
                        <td colSpan="2">{line.reason}</td>
                        <td colSpan="1">{line.remarks}</td>
                      </tr>
                    ))}
                </>
              ) : (
                <div
                  style={{
                    height: "30pt",
                  }}
                ></div>
              )}

              <tr colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                <td colSpan="7">
                  {" "}
                  Remarks :{printResponseData && printResponseData[0].remarks}
                </td>
              </tr>

              <tr>
                <td colSpan="3" style={{ height: "35px", textAlign: "center" }}>
                  Performed by Production Supervisor
                  <br></br>
                  <br></br>
                  {printResponseData && printResponseData[0].supervisor_sign}
                  <br></br>
                  {formattedDatesupervisor()}
                  <br></br>
                  {getImage !== "" && (
                    <img
                      className="signature"
                      src={getImage}
                      alt="Supervisor"
                    />
                  )}
                  <br></br>
                  Sign & Date
                </td>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  Reviewed By Head of the Department/Designee
                  <br></br>
                  <br></br>
                  <br></br>
                  {printResponseData && printResponseData[0].hod_sign}
                  <br></br>
                  {formattedDateHod()}
                  <br></br>
                  {getImage1 !== "" && (
                    <img className="signature" src={getImage1} alt="HOD" />
                  )}
                  <br></br>
                  Sign & Date
                </td>
              </tr>
              {/* <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="7"></td>
            </tr> */}
            </tbody>

            <br />
            {/* </table> */}

            {/* <table style={{ width: "100%", margin: "auto" }}> */}
            <tfoot>
              <tr>
                <td colSpan="2">Particulars</td>
                <td colSpan="2">Prepard by</td>
                <td colSpan="2">Reviewed by</td>
                <td>Approved by</td>
              </tr>

              <tr>
                <td colSpan="2">Name</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="2">Signature & Date</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </main>
        <footer className="no-print" />
      </div>
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
        formName="SHIFT LOG BOOK"
        formatNo="PH-PRD01/F-013"
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
            value={newDate}
            style={{ fontWeight: "bold", width: "135px" }}
            onChange={(e) => setNewDate(e.target.value)}
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

      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={summary}
        rowKey="slb_id"
      />
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDateSubmit}
            disabled={!printShift}
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
            width: "100%",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "40%", textAlign: "center" }}
          >
            Date:
          </label>
          <Input
            placeholder="Date"
            type="date"
            size="small"
            value={printDate}
            style={{ fontWeight: "bold", marginRight: "1em", width: "60%" }}
            onChange={handleDatePrint}
            max={getCurrentDate()}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            width: "100%",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "40%", textAlign: "center" }}
          >
            Shift:
          </label>

          <Select
            placeholder="Select Shift"
            value={printShift}
            onChange={handlePrintChange}
            style={{ fontWeight: "bold", marginright: "60px", width: "60%" }}
          >
            {shiftOptions.map((shift) => (
              <Option key={shift.id} value={shift.value}>
                {shift.value}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Bleaching_f36_Summary;
