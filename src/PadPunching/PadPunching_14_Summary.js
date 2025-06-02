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

const PadPunching_14_Summary = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); 
      transform-origin: top left right bottom; 
    }
  }
`;
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const navigate = useNavigate();
  const [summaryData, setSummaryData] = useState([]);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState("");
  const [machineName, setMachineName] = useState("");
  const [productName, setProductName] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const [datePrint, setDatePrint] = useState("");
  const [shiftPrint, setShiftPrint] = useState("");
  const [NameOptions, setNameOptions] = useState([]);

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [receiverOptions, setReceiverOptions] = useState([]);

  useEffect(() => {
    const fetchReciever = async () => {
      try {
        const response = await axios.get(
          `${  API.prodUrl}/Precot/api/PadPunching/Service/productNamesBags`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data.map((item) => ({
          label: item.value || "Unknown",
          value: item.value,
        }));
        setReceiverOptions(options);
        setFilteredOptions(options);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    };

    fetchReciever();
  }, []);

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredOptions(receiverOptions);
    } else {
      const filtered = receiverOptions.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const handleSelectText = (e, name) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      setProductName(e.target.value);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.operator_sign;
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${  API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,    API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.hod_sign;
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${  API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
            setGetImage2((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,    API.prodUrl, token]);

  const formattedDateOperator = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const formattedDateHod = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate = () => {
    if (datePrint) {
      const date = moment(datePrint);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  // shift lov
  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${  API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

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

  const handleShiftChange = (value) => {
    setShift(value);
    console.log("shift value", shift);
  };
  const handleMachineNameChange = (value) => {
    setMachineName(value);
  };
  const handleProductNameChange = (rowIndex, value) => {
    // const value = event.target.value;
    // setProductName(value);
    const updatedNames = productName.map((name, index) =>
      index === rowIndex ? value : name
    );
    setProductName(updatedNames);
  };
  // const handleShiftPrintChange = (value) => {
  //   setShiftPrint(value);
  // };

  //   print Model
  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };

  const printSubmit = () => {
    if (
      (datePrint == "" || datePrint == null) &&
      (shiftPrint == "" || shiftPrint == null)
    ) {
      message.warning("Atleast One Input Need to Print");
      return;
    }
    window.print();
    handleModalClose();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShiftPrint(null);
    setDatePrint(null);
  };

  //   handle edit
  const handleEdit = (record) => {
    console.log("recorddd", record);
    const { date } = record;
    const { shift } = record;
    const { machineName } = record;
    const { productName } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/PadPunching/F-14", {
      state: {
        date: formattedDate,
        shift: shift,
        machineName: machineName,
        productName: productName,
      },
    });
    console.log("selected Date edit", date);
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

      let apiUrl = `${  API.prodUrl}/Precot/api/PadPunching/Service/BagMaking/getBagMakingSpecificationSummary`;

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
        role === "ROLE_HOD" ||
        role === "ROLE_DESIGNEE"
      ) {
        setCakingData(data);
      }

      console.log("Summary Get List", data);
      if (
        role === "ROLE_HOD" ||
        role === "ROLE_OPERATOR" ||
        role === "ROLE_DESIGNEE"
      ) {
        setSummaryData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            shift: item.shift,
            machineName: item.machineName,
            productName: item.productName,
            operator_status: item.operator_status,
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
    } finally {
    }
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
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "Machine Name",
      dataIndex: "machineName",
      key: "machineName",
      align: "center",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      align: "center",
    },
    {
      title: "Hod/Designee Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
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
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }

  const fetchPrintValue = (value) => {
    let date;
    if (datePrint == null) {
      date = "";
    } else {
      date = datePrint;
    }
    try {
      setShiftPrint(value);

      axios
        .get(
          `${  API.prodUrl}/Precot/api/PadPunching/Service/BagMaking/getByDateShiftPrint?date=${date}&shift=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.message !== "No data") {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
            console.log("print response...............", res.data[0]);
            console.log("set print response", printResponseData);
          } else {
            message.error(res.data.message);
            handleModalClose();
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  const fetchPrintValue2 = (event) => {
    try {
      setDatePrint(event.target.value);
      if (shiftPrint == null) {
        const shift = "";
      }
      axios
        .get(
          `${  API.prodUrl}/Precot/api/PadPunching/Service/BagMaking/getByDateShiftPrint?date=${event.target.value}&shift=${shift}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.message !== "No data") {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
            console.log("print response...............", res.data[0]);
            console.log("set print response", printResponseData);
          } else {
            message.error(res.data.message);
            handleModalClose();
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  // Shift LOV

  // goto Button Fields

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    console.log("date value", value);
  };
  const handleDatePrintChange = (event) => {
    const value = event.target.value;
    setDatePrint(value);
  };

  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    if (machineName == "" || machineName == null) {
      message.warning("Please Select Machine Name");
      return;
    }
    if (productName == "" || productName == null) {
      message.warning("Please Select Product Name");
      return;
    }
    navigate("/Precot/PadPunching/F-14", {
      state: {
        date: date,
        shift: shift,
        machineName: machineName,
        productName: productName,
      },
    });
    console.log("selected Date in 23_______", date);
  };

  return (
    // print section
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {printResponseData?.map((slice, index) => (
          <table
            style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
            key={index}
          >
            <thead>
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
                  {" "}
                  BAG MAKING - SPECIFICATION DETAILS
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-PRD05/F-002</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-PRD05-D-03</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15">
                  {index + 1}of {printResponseData.length}
                </td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td colSpan="40"></td>
                <td colSpan="30">DATE:{formattedDate()}</td>
                <td colSpan="30">SHIFT :{printResponseData[index].shift}</td>
              </tr>
              <tr>
                <td colSpan="40">A. PRODUCT & MACHINE DETAILS:</td>
                <td colSpan="60">B.PROCESS CONTROL :</td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Sr. No.
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Machine Name
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Product Name
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Sr. No.
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Process Parameter & Units
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Standards
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  Units
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Actual Observations
                </td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="4" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="15" rowSpan="4" style={{ textAlign: "center" }}>
                  {printResponseData[index].machineName}
                </td>
                <td colSpan="20" rowSpan="4" style={{ textAlign: "center" }}>
                  {printResponseData[index].productName}
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Side Sealing Temperature
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  190 - 220
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  ℃
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].sideSealTemp}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Thread Sealing Temperature
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  120 - 155
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  ℃
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].threadSealTemp}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Thread Sealing Pressure
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  1.0 - 2.5
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  KG
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].threadSealPressure}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Main Air Pressure
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  5 - 7
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  BAR
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].mainAirPressure}
                </td>
              </tr>
              <tr>
                <td colSpan="36">C. PRODUCT CONTROL :</td>
                <td colSpan="64" style={{ textAlign: "center" }}>
                  Actual Observations
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Sr. No.
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Parameter
                </td>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  Specification
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  8
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Length of Bag
                </td>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].lenSpecification || "NA"}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].length1 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].length2 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].length3 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].length4 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].length5 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].length6 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].length7 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].length7 || 0}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Width of Bag
                </td>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].widthSpecification ||
                    "NA"}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].widht1 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].widht2 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].widht3 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].widht4 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].widht5 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].widht6 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].widht7 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].widht8 || 0}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Bottom Gusset Size
                </td>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0]
                    .bottomGussetSpecification || "NA"}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].bottomGusset1 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].bottomGusset2 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].bottomGusset3 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].bottomGusset4 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].bottomGusset5 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].bottomGusset6 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].bottomGusset7 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].bottomGusset8 || 0}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Top Gusset Size
                </td>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].topGussetSpecification ||
                    "NA"}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].topGusset1 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].topGusset2 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].topGusset3 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].topGusset4 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].topGusset5 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].topGusset6 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].topGusset7 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].topGusset8 || 0}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Film Thickness in micron
                </td>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0]
                    .filmThicknessSpecification || "NA"}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].filmThickness1 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].filmThickness2 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].filmThickness3 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].filmThickness4 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].filmThickness5 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].filmThickness6 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].filmThickness7 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].filmThickness8 || 0}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Empty Bag Weight
                </td>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0]
                    .emptyBagWtSpecification || "NA"}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].emptyBagWt1 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].emptyBagWt2 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].emptyBagWt3 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].emptyBagWt4 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].emptyBagWt5 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].emptyBagWt6 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].emptyBagWt7 || 0}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  {printResponseData[index].details[0].emptyBagWt8 || 0}
                </td>
              </tr>
              <tr>
                <td colSpan="100">
                  {" "}
                  Note : 05 Bags are collected randomly from last 01 hour
                  production & checked.
                </td>
              </tr>
              <tr>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  Operator Sign & Date
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  HOD / Designee Sign & Date
                </td>
                <td colSpan="40" rowSpan="2" style={{ verticalAlign: "top" }}>
                  Remarks: <br />
                  {printResponseData[index].remarks || "NA"}{" "}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="30"
                  style={{ height: "40px", textAlign: "center" }}
                >
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
                      alt={`Supervisor Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData[index].operator_sign || ""}
                  <br />
                  {formattedDateOperator(
                    printResponseData[index]?.operator_submitted_on
                  )}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {getImage2[index] && (
                    <img
                      src={getImage2[index]}
                      alt={`hod Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData[index].hod_sign || ""}
                  <br />
                  {formattedDateHod(printResponseData[index]?.hod_submit_on)}
                </td>
              </tr>
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
          </table>
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
          formName="BAG MAKING - SPECIFICATION DETAILS"
          formatNo="PH-PRD05/F-002"
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
            marginBottom: "2px",
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
            {" "}
            <label>Shift:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={shift}
              onChange={handleShiftChange}
              style={{ width: "100%" }}
              placeholder="Search Batch No"
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
            {" "}
            <label>Machine Name:</label>
          </Col>
          <Col span={4}>
            <Select
              style={{ width: "100%" }}
              value={machineName}
              onChange={handleMachineNameChange}
              placeholder="Machine Name"
            >
              <Select.Option value="" disabled selected>
                Machine Name
              </Select.Option>
              <Select.Option value="BAG MAKING - 01">
                BAG MAKING - 01
              </Select.Option>
              <Select.Option value="BAG MAKING - 02">
                BAG MAKING - 02
              </Select.Option>
            </Select>
          </Col>
          <Col>
            {" "}
            <label>Product Name:</label>
          </Col>
          <Col span={5}>
            <Select
              style={{ width: "100%" }}
              value={productName}
              onChange={(e) => setProductName(e)}
              dropdownStyle={{ textAlign: "center" }}
              showSearch
              // onSearch={handleSearch}
              // style={{
              //   width: "120%",
              //   height: "36px",
              //   borderRadius: "0px",
              //   border: "1px solid #dddd",
              //   backgroundColor: "white",
              // }}
              // onInputKeyDown={(e) => {
              //   handleSelectText(e, "productName");
              // }}
              // filterOption={false}
              // onKeyDown={(e) => {
              //   handleSelectText(e, "receivedByProduction");
              // }}
            >
              {filteredOptions.map((option) => (
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
          dataSource={summaryData}
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
            onChange={fetchPrintValue2}
            type="date"
            value={datePrint}
            size="small"
            //   max ={ formattedToday }
            style={{ width: "100%", height: "30px" }}
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
            Shift :
          </label>
          <Select
            showSearch
            value={shiftPrint}
            onChange={fetchPrintValue}
            style={{ width: "100%" }}
            placeholder="Select Shift"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Shift
            </Select.Option>
            {shiftLov.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default PadPunching_14_Summary;
