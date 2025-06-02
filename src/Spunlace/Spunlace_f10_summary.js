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
import BleachingHeader from "../Components/BleachingHeader";
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

const Spunlace_f10_Summary = () => {
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
  const [printResponseData, setPrintResponseData] = useState(null);
  const [ConsumtionData, setConsumtionData] = useState([]);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);

  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

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

  const formattedDate = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData.hod_submit_on);
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
    // console.log("print screen works");
  };
  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
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

  const handlePrintDateChange = (event) => {
    try {
      setDatePrint(event.target.value);
      axios
        .get(
          `${ API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/getByDatePrintApi?date=${event.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.message !== "No data") {
            setPrintResponseData(res.data);
            // console.log("print response",printResponseData.date);
            // setPrintValue(value);
          } else {
            setPrintResponseData([]);
            message.error(res.data.message);
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

  //   handle edit
  const handleEdit = (record) => {
    // console.log("recorddd",record)
    const { date } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/Spunlace/F-10", {
      state: {
        date: formattedDate,
      },
    });
    // console.log("selected Date edit",date);
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    // console.log("date value", value);
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

      let apiUrl = `${ API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/getLogbookSummary`;

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
      if (data && data.length >= 0) {
        setContaminationData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
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
      message.error(error.data.message);
    } finally {
    }
  };

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
      title: "Actions",
      dataIndex: "",
      key: "actions",
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
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
  } else {
    columns = baseColumns;
  }

  const printSubmit = () => {
    updatePageNumbers();
    window.print();
  };
  const fetchPrintValue = (value) => {
    try {
      axios
        .get(
          `${
          API.prodUrl
          }/Precot/api/spulance/fetchBaleConsumption?order=${12}&date=${datePrint}&shift=${value}`,
          // `${ API.prodUrl}/Precot/api/spulance/fetchBaleConsumption?order=ORD5678&date=2024-07-10&shift=III`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.message !== "No data") {
            const printResponseData = res.data[0];
            setPrintResponseData(printResponseData);
            // console.log("print response...............",res.data[0]);
            // console.log("set print response",printResponseData);
          } else {
            // console.log("response message", res.data[0].message);
          }
        })
        .catch((err) => {
          // console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };
  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    navigate("/Precot/Spunlace/F-10", {
      state: {
        date: date,
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

  return (
    // print section
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        <table style={{ marginTop: "10px", scale: "94%" }}>
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
              <th colSpan="55" rowSpan="4" style={{ textAlign: "center" }}>
                Logbook - Spunlace Planning
              </th>
              <td colSpan="15">Format No.:</td>
              <td colSpan="15">PH-QAD01/F-052</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No.:</td>
              <td colSpan="15">01</td>
            </tr>
            <td colSpan="15">Ref. SOP No.:</td>
            <td colSpan="15">PH-PRD02-D-03</td>
            <tr>
              <td colSpan="15">Page No.:</td>
              <td colSpan="15">1 of 2</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead>
          <br />
          <tbody>
            <tr>
              <th colSpan="70" style={{ height: "35px" }}>
                DAILY PRODUCTION PLAN:
              </th>
              <th colSpan="30" style={{ height: "35px" }}>
                Date:{formattedDateheader()}
              </th>
            </tr>
            <tr>
              <th colSpan="9" style={{ height: "35px", textAlign: "center" }}>
                S. No.
              </th>
              <th colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                Order No.
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Product Name
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                Mixing
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Planned Prod. in KG
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                GSM
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Width in mm
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Thickness in mm
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Moisture in %
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Pattern
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Remarks
              </th>
            </tr>
            {printResponseData?.prodPlanDetails?.map((row, index) => (
              <tr key={index}>
                <td colSpan="9" style={{ height: "35px", textAlign: "center" }}>
                  {index + 1}
                </td>
                <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                  {row.orderNo}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.prodName}
                </td>
                <td colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                  {row.mixing}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.plannedProdKG}
                </td>
                <td colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                  {row.gsm}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.width}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.thickness}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.moisture}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.pattern}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.remarks}
                </td>
              </tr>
            ))}
            <tr>
              <th
                colSpan="100"
                style={{
                  height: "60px",
                  textAlign: "left",
                  verticalAlign: "top",
                }}
              >
                SPECIAL INSTRUCTION: <br />
                {printResponseData?.splInstruction}
              </th>
            </tr>
            <br />
            <br />
          </tbody>
          <br />
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

        <table style={{ marginTop: "10px", scale: "94%" }}>
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
              <th colSpan="55" rowSpan="4" style={{ textAlign: "center" }}>
                Logbook - Spunlace Planning
              </th>
              <td colSpan="15">Format No.:</td>
              <td colSpan="15">PH-QAD01/F-052</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No.:</td>
              <td colSpan="15">01</td>
            </tr>
            <td colSpan="15">Ref. SOP No.:</td>
            <td colSpan="15">PH-PRD02-D-03</td>
            <tr>
              <td colSpan="15">Page No.:</td>
              <td colSpan="15">2 of 2</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead>
          <br />
          <tbody>
            <br />
            <br />
            <tr>
              <th
                colSpan="25"
                rowSpan="3"
                style={{ height: "35px", textAlign: "center" }}
              >
                MACHINE
              </th>
              <th
                colSpan="15"
                rowSpan="2"
                style={{ height: "35px", textAlign: "center" }}
              >
                STD FOR SHIFT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                1st SHIFT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                2nd SHIFT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                3rd SHIFT{" "}
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                GENERAL SHIFT{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                PRESENT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                PRESENT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                PRESENT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                PRESENT
              </th>
            </tr>
            <tr>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="25" style={{ height: "35px", textAlign: "center" }}>
                SPUNLACE
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_stdPh}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_stdOther}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_ph_1S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_Other_1S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_ph_2S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_Other_2S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_ph_3S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_Other_3S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_ph_GS}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.spunlace_Other_GS}
              </th>
            </tr>
            <tr>
              <th colSpan="25" style={{ height: "35px", textAlign: "center" }}>
                RP BALE PRESS
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_stdPh}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_stdOther}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_ph_1S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_Other_1S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_ph_2S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_Other_2S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_ph_3S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_Other_3S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_ph_GS}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.rpBale_Other_GS}
              </th>
            </tr>
            <tr>
              <th colSpan="25" style={{ height: "35px", textAlign: "center" }}>
                SLITERWINDER/DATA ENTRY
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_stdPh}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_stdOther}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_ph_1S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_Other_1S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_ph_2S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_Other_2S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_ph_3S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_Other_3S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_ph_GS}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.sliterWinder_Other_GS}
              </th>
            </tr>
            <tr>
              <th colSpan="25" style={{ height: "35px", textAlign: "right" }}>
                TOTAL
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_stdPh}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_stdOther}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_ph_1S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_Other_1S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_ph_2S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_Other_2S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_ph_3S}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_Other_3S}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_ph_GS}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.total_Other_GS}
              </th>
            </tr>
            <tr>
              <th colSpan="40" style={{ height: "35px", textAlign: "center" }}>
                Production Supervisor Sign & Date
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.supervisor_sign}
                <br />
                {formattedDatesupervisor()}
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.supervisor_sign}
                <br />
                {formattedDatesupervisor()}
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.supervisor_sign}
                <br />
                {formattedDatesupervisor()}
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                {printResponseData?.supervisor_sign}
                <br />
                {formattedDatesupervisor()}
              </th>
            </tr>
            <tr>
              {/* <th colSpan="100" style={{ height: "35px", textAlign: "center" }}>HOD / Designee Sign & Date <br/> {printResponseData?.hod_sign}<br/>{formattedDate()}</th> */}
              <td colSpan="40" style={{ height: "35px" }}>
                HOD / Designee Sign & Date {" : "}
              </td>
              <td
                colSpan="10"
                style={{
                  textAlign: "center",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                {printResponseData?.hod_sign || ""}
                <br />
                {formattedDate()}
              </td>
              <td
                colSpan="10"
                style={{
                  height: "35px",
                  textAlign: "left",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                {getImage2 && (
                  <img
                    src={getImage2}
                    alt="HOD Sign"
                    style={{
                      width: "70%",
                      height: "70%",
                      marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                      textAlign: "left",
                    }}
                  />
                )}
              </td>
              <td
                colSpan="40"
                style={{ borderLeft: "none", borderRight: "none" }}
              ></td>
            </tr>
          </tbody>
          <br />
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
          formName="LOGBOOK – SPUNLACE PLANNING"
          formatNo="PH-QAD01/F-052"
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
            disabled={!datePrint}
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
            onChange={handlePrintDateChange}
            type="date"
            value={datePrint}
            size="small"
            // max ={ formattedToday }
            style={{ width: "50%", height: "30px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Spunlace_f10_Summary;
