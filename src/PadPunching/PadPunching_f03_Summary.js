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

const PadPunching_f03_Summary = () => {
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
  const [getImage3, setGetImage3] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState("");
  const [machineName, setMachineName] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const [machineNameLov, setmachineNameLov] = useState([]);
  const [datePrint, setDatePrint] = useState("");
  const [shiftPrint, setShiftPrint] = useState("");
  const [machineNamePrint, setMacineNamePrint] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const formattedDateSupervisor = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDateOnly = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY ");
      }
    }
    return "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.supervisor_sign;
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
  }, [printResponseData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.hod_sign;
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
  }, [printResponseData, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.qa_sign;
      setSaveLoading(true);
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
            setGetImage3((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            if (index === printResponseData.length - 1) {
              setSaveLoading(false);
            }
          });
      }
    });
  }, [printResponseData, API.prodUrl, token]);

  const formattedDatesupervisor = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDateCommon = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
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
  useEffect(() => {
    const fetchmachineNameOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/padpunching/MachineLov`,
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
          setmachineNameLov(data);
        } else {
          console.error("API response is not an array", data);
          setmachineNameLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setmachineNameLov([]);
      }
    };

    fetchmachineNameOptions();
  }, [token]);

  const handleShiftChange = (value) => {
    setShift(value);
    console.log("shift value", shift);
  };
  const handleShiftPrintChange = (value) => {
    setShiftPrint(value);
  };
  const handleMachineNameChange = (value) => {
    setMachineName(value);
  };
  const handleMachineNamePrintChange = (value) => {
    setMacineNamePrint(value);
  };

  //   print Model
  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };

  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 2000);
    }
  }, [printResponseData]);

  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
    setShiftPrint(null);
    setMacineNamePrint(null);
  };

  //   handle edit
  const handleEdit = (record) => {
    console.log("recorddd", record);
    const { machineName } = record;
    const { shift } = record;
    const { date } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/PadPunching/F-03", {
      state: {
        machineName: machineName,
        shift: shift,
        date: formattedDate,
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

      let apiUrl = `${ API.prodUrl}/Precot/api/punching/summaryproductChangeOverF03`;

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
        role === "ROLE_DESIGNEE" ||
        role === "ROLE_QA"
      ) {
        setCakingData(data);
      }

      console.log("Summary Get List", data);
      if (
        role === "ROLE_HOD" ||
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_DESIGNEE" ||
        role === "ROLE_QA"
      ) {
        setSummaryData(
          data.map((item, index) => ({
            key: item.header_id,
            machineName: item.machineName,
            shift: item.shift,
            qa_status: item.qa_status,
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
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "QA Status",
      dataIndex: "qa_status",
      key: "qa_status",
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

  const fetchPrintValue = () => {
    try {
      let dateP;
      let shiftP;
      let machineP;
      if (datePrint == null) {
        dateP = "";
      } else {
        dateP = datePrint;
      }
      if (shiftPrint == null) {
        shiftP = "";
      } else {
        shiftP = shiftPrint;
      }
      if (machineNamePrint == null) {
        machineP = "";
      } else {
        machineP = machineNamePrint;
      }

      axios
        .get(
          `${ API.prodUrl}/Precot/api/punching/getproductChangeOverPrintF03?date=${dateP}&shift=${shiftP}&machine=${machineP}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
            console.log("print response...............", res.data[0]);
            console.log("set print response", printResponseData);
          } else {
            message.error("No Data Found");
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
  const handleDatePrintChange = (event) => {
    const value = event.target.value;
    setDatePrint(value);
    console.log("date value", value);
  };
  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    console.log("date value", value);
  };

  //   goto button
  const goTo = () => {
    if ((machineName == "") | (machineName == null)) {
      message.warning("Please Select Machine Name");
      return;
    }
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
    navigate("/Precot/PadPunching/F-03", {
      state: {
        machineName: machineName,
        date: date,
        shift: shift,
      },
    });
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {printResponseData?.map((slice, index) => (
          <table
            style={{ marginTop: "10px", scale: "92%", tableLayout: "fixed" }}
            key={index}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="20" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="55" rowSpan="4" style={{ textAlign: "center" }}>
                  Product Change Over
                </th>
                <td colSpan="20">Format No.:</td>
                <td colSpan="20">PH-PRD03/F-003</td>
              </tr>
              <tr>
                <td colSpan="20">Revision No.:</td>
                <td colSpan="20">01</td>
              </tr>
              <td colSpan="20">Ref. SOP No.:</td>
              <td colSpan="20">PH-PRD04-D-03</td>
              <tr>
                <td colSpan="20">Page No.:</td>
                <td colSpan="20">
                  {index + 1} of {printResponseData.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan="20">
                  Date :{formattedDateOnly(printResponseData[index].date)}
                </th>
                <th colSpan="30">Shift :{printResponseData[index].shift}</th>
                <th colSpan="30">Time :{printResponseData[index].time}</th>
                <th colSpan="35">
                  Machine Name :{printResponseData[index].machineName}
                </th>
              </tr>
              <tr>
                <th colSpan="115">A.Product Details:</th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Sr. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Check Points
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Running Production
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Change Over To
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Product Name
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].productName1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].productName2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  PO No.
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].poNumber1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].poNumber2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Order No./BMR No.{" "}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].orderNo1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].orderNo2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Lot No./Julian Date
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].lotNo1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].lotNo2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Fleece GSM
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].fleezeGSM1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].fleezeGSM2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Fleece Pattern
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].fleezePattern1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].fleezePattern2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Pack Size (Pads per bag)
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].packSize1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].packSize2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Edge Condition
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].edgeCondition1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].edgeCondition2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  9
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  PDS No.
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].pdsNumber1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].pdsNumber2 || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="115">
                  {" "}
                  B.Removal of Packaging Materials of Running Product:
                </th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Sr. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Packaging Materials
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Removed (Yes / No)
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Remark
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Inner Bag
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].innerBag === "Y"
                      ? "Yes"
                      : printResponseData[index].innerBag === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].innerBagRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Outer Bag
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].outerBag === "Y"
                      ? "Yes"
                      : printResponseData[index].outerBag === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].outerBagRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Inner Carton / Dispenser Box
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].innerCarton === "Y"
                      ? "Yes"
                      : printResponseData[index].innerCarton === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].innerCartonRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Outer Carton
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].outerCarton === "Y"
                      ? "Yes"
                      : printResponseData[index].outerCarton === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].outerCartonRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Fleece Roll
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].fleezeRoll === "Y"
                      ? "Yes"
                      : printResponseData[index].fleezeRoll === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].fleezeRollRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="115">C.Tool / Dies & Machine Setting:</th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Sr. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Activity
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Completed (Yes / No)
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Remark
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Tool Change required
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].toolChangeRequired === "Y"
                      ? "Yes"
                      : printResponseData[index].toolChangeRequired === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].toolChangeRequiredRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Tool Change Done
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].toolChangeDone === "Y"
                      ? "Yes"
                      : printResponseData[index].toolChangeDone === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].toolChangeDoneRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Machine Setting
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].machineSetting === "Y"
                      ? "Yes"
                      : printResponseData[index].machineSetting === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].machineSettingRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="115">D.CCP Setting:</th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Sr. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Activity
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Completed (Yes / No)
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Remark
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Teaching of Metal Detector
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].metalDetectorTeach === "Y"
                      ? "Yes"
                      : printResponseData[index].metalDetectorTeach === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].metalDetectorTeachRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Functioning Check of Metal Detector
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].metalDetectorCheck === "Y"
                      ? "Yes"
                      : printResponseData[index].metalDetectorCheck === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].metalDetectorCheckRemarks || "NA"}
                </td>
              </tr>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <tr>
                <th colSpan="115">E. Production Start:</th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Sr. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Activity
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Completed (Yes / No)
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Remark
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Production ready to start
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].productionCheck === "Y"
                      ? "Yes"
                      : printResponseData[index].productionCheck === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].productionCheckRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  First Piece Inspection / Quality Verification
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? printResponseData[index].qualityVerification === "Y"
                      ? "Yes"
                      : printResponseData[index].qualityVerification === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {printResponseData[index].qualityVerificationRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  Production Supervisor Sign & Date
                </td>
                <td colSpan="25" style={{ textAlign: "center" }}>
                  CCP Maintained by
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                Verified by QA Sign & Date
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                HOD/ Designee Sign & Date
                </td>
              </tr>
              <tr>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
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
                  {printResponseData[index].supervisor_sign || ""}
                  <br />
                  {formattedDate(
                    printResponseData[index]?.supervisor_submit_on
                  )}
                </td>
                <td
                  colSpan="25"
                  style={{ height: "40px", textAlign: "center" }}
                >
                  {" "}
                  {printResponseData[index].ccpMaintainedBy || "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {getImage3[index] && (
                    <img
                      src={getImage3[index]}
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
                  {printResponseData[index].qa_sign || ""}
                  <br />
                  {formattedDate(printResponseData[index]?.qa_submit_on)}
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
                  {formattedDate(printResponseData[index]?.hod_submit_on)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="30">Particular</th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="30">Name</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="25"></td>
              </tr>
              <tr>
                <th colSpan="30">Signature & Date</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
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
          formName="Product Change Over"
          formatNo="PH-PRD03/F-003"
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
              placeholder="Search Shift"
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
          <Col>
            <Select
              showSearch
              value={machineName}
              onChange={handleMachineNameChange}
              style={{ width: "100%" }}
              placeholder="Search Machine Name No"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Machine Name
              </Select.Option>
              {machineNameLov.map((option) => (
                <Select.Option key={option.id} value={option.MCN}>
                  {option.MCN}
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
            //   disabled={!datePrint}
            loading={saveLoading}
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
            Date :
          </label>
          <Input
            onChange={handleDatePrintChange}
            type="date"
            value={datePrint}
            size="small"
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
            onChange={handleShiftPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Shift"
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
            Machine Name :
          </label>
          <Select
            showSearch
            value={machineNamePrint}
            onChange={setMacineNamePrint}
            style={{ width: "100%" }}
            placeholder="Search Machine Name No"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Machine Name
            </Select.Option>
            {machineNameLov.map((option) => (
              <Select.Option key={option.id} value={option.MCN}>
                {option.MCN}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default PadPunching_f03_Summary;
