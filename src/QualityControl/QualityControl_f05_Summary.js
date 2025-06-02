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
import { useNavigate, useLocation } from "react-router-dom";
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

const QualityControl_f05_Summary = () => {
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
  const [GlasswareBreakage, setGlasswareBreakage] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [showModal, setShowModal] = useState(false);
  const [datePrint, setDatePrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);

  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [printResponseData,    API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,    API.prodUrl, token]);

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
          `${   API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/getByDatePrintApi?date=${event.target.value}`,
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
          } else {
            setPrintResponseData([]);
            message.error(res.data.message);
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };

  //   handle edit
  const handleEdit = (record) => {
    const { date } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QC/F-05", {
      state: {
        date: formattedDate,
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

  //   summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${   API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/getLogbookSummary`;

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

      if (data && data.length >= 0) {
        setGlasswareBreakage(
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
    window.print();
  };
  const fetchPrintValue = (value) => {
    try {
      axios
        .get(
          `${
               API.prodUrl
          }/Precot/api/spulance/fetchBaleConsumption?order=${12}&date=${datePrint}&shift=${value}`,
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
          } else {
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };
  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    navigate("/Precot/QC/F-05", {
      state: {
        date: date,
      },
    });
  };
  return (
    // print section
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        <table
          style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
        >
          <br />
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
                ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT
              </th>
              <td colSpan="15">Format No.:</td>
              <td colSpan="15">PH-QCL01/F-005</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No.:</td>
              <td colSpan="15">02</td>
            </tr>
            <td colSpan="15">Ref. SOP No.:</td>
            <td colSpan="15">PH-QCL01-D-05</td>
            <tr>
              <td colSpan="15">Page No.:</td>
              <td colSpan="15">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="115"></td>
            </tr>
          </thead>
          <br />
          <tbody>
            <tr>
              <th colSpan="115">BMR Number: </th>{" "}
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Tested Date
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Regular / Trial batch
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Batch No.
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Mixing
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Softener
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Local / Export
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Physical Appearance
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Odor
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Fiber Identification
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Foreign fibers
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                pH
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Surface Activity
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Acidity/ Alkalinity
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Sinking time
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Absorbency ( W.H.C.)
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Sulphate Ash
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Water Soluble Substances
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Ether Soluble Substances
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Drying loss (%)
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Fluorescence
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Extractable Colouring Matter
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Neps count/g
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                UQL mm
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                L (n) mm
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                L (w) mm. 9Fiber Average Length
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                SFC (n) %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                SFC (w) %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Micronaire Value
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Whiteness Index
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Total Viable Count (TVC - cfu/g)
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Total Fungal Count (TFC - cfu/g)
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Remarks
              </th>
              <th
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Accepted (A)/ Rejected (R)/
                <br />
                Accepted Under Deviation (AD)
              </th>
              <th
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Specification Passed
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Reported by (Chemist)
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Approved by
              </th>
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Specification
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                contains no more than
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Odorless
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                100 % cotton
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                occasionally a few isolated
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                6 to 8
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                present must not cover the
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No pink colour developed <br />
                with Methyl orange and <br />
                Phenolphthaline.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                max. 10 Sec.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 23 g/g
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 0.4 %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max 0.5 %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max 0.5 %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 8.0 %
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Few isolated intense blue
                <br /> fibers are allowed.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Not more intense colour.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 2500
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 12
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 7
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 10
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 90
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 80
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 2.8
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 80
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Max. 1000
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Max. 100
              </th>
            </tr>

            <tr>
              <td
                colSpan="3"
                style={{ textAlign: "center", height: "20px" }}
              ></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="5" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="5" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="5" style={{ textAlign: "center" }}></td>
              <td colSpan="4" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
            </tr>
          </tbody>
          <br />
          <tfoot>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="115"></td>
            </tr>
            <tr>
              <th colSpan="25">Particular</th>
              <th colSpan="30" style={{ textAlign: "center" }}>
                Prepared by
              </th>
              <th colSpan="30" style={{ textAlign: "center" }}>
                Reviewed by
              </th>
              <th colSpan="30" style={{ textAlign: "center" }}>
                Approved by
              </th>
            </tr>
            <tr>
              <th colSpan="25">Name</th>
              <td colSpan="30"></td>
              <td colSpan="30"></td>
              <td colSpan="30"></td>
            </tr>
            <tr>
              <th colSpan="25">Signature & Date</th>
              <td colSpan="30"></td>
              <td colSpan="30"></td>
              <td colSpan="30"></td>
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
          formName="ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT"
          formatNo="PH-QCL01/F-005"
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
          dataSource={GlasswareBreakage}
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
            style={{ width: "50%", height: "30px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default QualityControl_f05_Summary;
