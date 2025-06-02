/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  EditOutlined
} from "@ant-design/icons";
import {
  message,
  Modal,
  Select,
  Table,
  Tooltip
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader.js";

import { CheckOutlined } from "@ant-design/icons"; // Import the tick icon
import { Button, Col, Input, Row } from "antd";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { createGlobalStyle } from "styled-components";
import API from "../baseUrl.json";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Drygoods_f06_Summary = () => {
  const GlobalStyle = createGlobalStyle`
 
`;
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [ContaminationData, setContaminationData] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const [chunkedData, setchunkeData] = useState([]);
  const [chunkedData_array, setchunkeData_array] = useState([]);
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const [stoppagedata, setstoppagedata] = useState("");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [fleecedetails, setfleecedetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [datePrint, setDatePrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [ConsumtionData, setConsumtionData] = useState([]);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [batchNolist, setBatchNolist] = useState("Machince Name");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [batchno, setbatchno] = useState([]);
  const [batchno2, setbatchno2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableshiftlov, setAvailableShiftslov] = useState("Select Shift");
  const { Option } = Select;
  const [getImage3, setGetImage3] = useState("");
  const [availableshift2, setAvailableShifts2] = useState([]);
  const [availableshift, setAvailableShifts] = useState([]);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [availableshiftlov2, setAvailableShiftslov2] = useState("Select Shift");
  const [batchNolistValue2, setBatchNolistValue2] = useState("Machine   Name"); // State for the value
  const [orderNo, setOrderNo] = useState("");
  const [orderNoList, setOrderNoList] = useState([]);
  const [orderNoPrint, setOrderNoPrint] = useState([]);

  useEffect(() => {
    const fetchDataOrderNumber = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        let apiUrl = `${ API.prodUrl}/Precot/api/drygoods/OrderLovForF006`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("datavalues", data);

        // console.log("Summary Get List",data)
        if (data && data.length >= 0) {
          // setOrderdetails(data);
          setOrderNoList(data);
        } else {
          message.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.data.message);
      } finally {
      }
    };
    fetchDataOrderNumber();
  }, []);

  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift; // Return the original value if it doesn't match any case
    }
  };
  const machineNameLov = [
    { value: "PL1", label: "PL1" },
    { value: "PL2", label: "PL2" },
    { value: "RL1", label: "RL1" },
  ];
  const machineNameLov2 = [
    { value: "PL1", label: "PL1" },
    { value: "PL2", label: "PL2" },
    { value: "RL1", label: "RL1" },
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchDataOrderNumber();
    fetchDataShift();
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
  const fetchDataOrderNumber = async () => {
    try {
      setLoading(true);
      axios
        .get(`${ API.prodUrl}/Precot/api/drygoods/getDrygoodsOrderNoLov`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // // console.log("Shift details fetched:", res.data);
          const data = res.data.map((laydownno) => laydownno);
          setbatchno(data);
          setbatchno2(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
  const fetchDetailsByFleecetDetails = async (e) => {
    if (e) {
      try {
        // const dateapi =moment(date).format('DD/MM/YYYY');
        // console.log("stored Date inside Api", date);

        const numberShift = convertShiftValue(e.shift);
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/drygoods/FleecetDetailsF006?date=${e.date}&shift=${numberShift}&order_no=${e.order_no}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("responsedata", response);
        // console.log("response (details based on date)", response.data);

        // console.log("seted planing response",planingDetailsByDate);

        if (response.data) {
          const data = response.data;
          console.log("FleecetDetails", response.data);
          // console.log("set response date for all fields", data)

          setfleecedetails(response.data);
          const itemsPerPage = 10;

          // Slice the data to show only the first 10 items
          const currentItems = fleecedetails.slice(0, itemsPerPage);
          const chunkArray = (array, chunkSize) => {
            const result = [];
            for (let i = 0; i < array.length; i += chunkSize) {
              result.push(array.slice(i, i + chunkSize));
            }
            return result;
          };
          const chunkedData = chunkArray(fleecedetails, 6);
          setchunkeData(chunkedData);
          console.log("Chunked Data", chunkedData);
        } else {
        }
      } catch (error) {
        console.error("Error checking BMR existence:", error);
        message.error(error.message);
      } finally {
      }
    }
  };
  const fetchData_StoppageDetails = async (value) => {
    if (value) {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const numberShift = convertShiftValue(value.shift);

        let apiUrl = `${ API.prodUrl}/Precot/api/drygoods/getStoppageDetailsF006?date=${value.date}&shift=${numberShift}&order_no=${value.order_no}`;
        // let apiUrl = `${ API.prodUrl}/Precot/api/drygoods/getStoppageDetailsF006?date=${date}&shift=${numberShift}&order_no=${'800005272'}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("datavalues", data);

        // console.log("Summary Get List",data)
        if (data && data.length >= 0) {
          setstoppagedata(data);
          console.log("setstoppage", data);
        } else {
          // message.error(data.message)
          // setTimeout(() => {
          //   navigate("/Precot/choosenScreen");
          // }, 1500)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.data.message);
      } finally {
      }
    }
  };
  const fetchDataShift = async () => {
    try {
      setLoading(true);
      axios
        .get(`${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // // console.log("Shift details fetched:", res.data);
          // // console.log("Shift details fetched:", res.data);
          const shifts = res.data.map((shift) => shift.value);
          setAvailableShifts(shifts);
          setAvailableShifts2(shifts);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.operator_sign;
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
          setGetImage3(url);
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
  const formattedDate_hod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate_Op = () => {
    if (printResponseData?.operator_submitted_on) {
      const date = moment(printResponseData.operator_submitted_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
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
    setIsFetchSuccessful(false);
    setDatePrint(null);
    setAvailableShiftslov2(null);
    setBatchNolistValue2(null);
    // console.log("print screen works");
  };
  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
    setAvailableShiftslov2(null);
    setBatchNolistValue2(null);
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

  const fetchPrint = () => {
    try {
      axios
        .get(
          `${ API.prodUrl}/Precot/api/drygoods/getdetailsForPrintF006?date=${datePrint}&shift=${availableshiftlov2}&machine_name=${batchNolistValue2}&order_no=${orderNoPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.length == 0) {
            message.error("No Data Found");
            setShowModal(false);
          } else if (res.data && res.data.message !== "No data") {
            setTimeout(() => {
              window.print();
              handleModalClose();
            }, 3000);
            setPrintResponseData(res.data[0]);
            message.success("Data Fetched Successfully");
            fetchData_StoppageDetails(res.data[0]);
            fetchDetailsByFleecetDetails(res.data[0]);

            setIsFetchSuccessful(true);
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
    console.log("record", record);
    console.log("record.orderNo", record.order_no);
    // const{date}=record;
    // const formattedDate = moment(date).format('YYYY-MM-DD');
    navigate("/Precot/DryGoods/F-06", {
      state: {
        date: record.date,
        shift: record.shift,
        order_no: record.order_no,
        machineName: record.product_name,
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

      let apiUrl = `${ API.prodUrl}/Precot/api/drygoods/getSummarydetailsF006`;

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
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_HOD"
      ) {
        //setCakingData(data);
      }

      // console.log("Summary Get List",data)
      if (data && data.length >= 0) {
        setContaminationData(data);
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      message.error(error?.data?.message);
    } finally {
    }
  };
  //   summary table Get api

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
      render: (text, record, index) => index + 1,
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
      title: "Order No",
      dataIndex: "order_no",
      key: "order_no",
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
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      render: (text) => (
        <div style={{ padding: "8px", textAlign: "center" }}>{text}</div>
      ),
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
            style={{ width: "100%", textAlign: "center" }}
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
    fetchPrint();
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
    if (
      batchNolist == null ||
      batchNolist == "" ||
      batchNolist == "[]" ||
      batchNolist == "Machince Name" ||
      batchNolist == 0
    ) {
      message.warning("Please Select Machine Name");
      return;
    } else if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    } else if (orderNo == "" || orderNo == null) {
      message.warning("Please Select Order No");
      return;
    } else if (
      availableshiftlov == null ||
      availableshiftlov == "" ||
      availableshiftlov == "[]" ||
      availableshiftlov == "Select Shift" ||
      availableshiftlov == 0
    ) {
      message.warning("Please Select Shift No");
      return;
    }
    console.log("orderNo", orderNo);
    navigate("/Precot/DryGoods/F-06", {
      state: {
        date: date,
        shift: availableshiftlov,
        machineName: batchNolist,
        order_no: orderNo,
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
      <div id="section-to-print">
        <table style={{ marginTop: "10px", scale: "94%" }}>
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
                Daily Production(Pleate /Wool Roll)
              </th>
              <td colSpan="15">Format No.:</td>
              <td colSpan="15">PH-PRD04/F-006</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No.:</td>
              <td colSpan="15">01</td>
            </tr>
            <td colSpan="15">Ref. SOP No.:</td>
            <td colSpan="15">PH-PRD04-D-03</td>
            <tr>
              <td colSpan="15">Page No.:</td>
              <td colSpan="15">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead>
          <br />
          <tbody>
            <tr>
              <th colSpan={40}>Product: {printResponseData?.product_name}</th>
              <th colSpan={30}> Date:{formattedDateheader()} </th>
              <th colSpan={30}>Shift: {printResponseData?.shift}</th>
            </tr>
            <tr>
              <th colSpan={40}>
                Order No.:{printResponseData?.order_no || "NA"}{" "}
              </th>
              <th colSpan={30}>
                {" "}
                Customer Name:{printResponseData?.coustomer_name || "NA"}{" "}
              </th>
              <th colSpan={30}>Brand: {printResponseData?.brand || "NA"}</th>
            </tr>
            <tr>
              <th colSpan={40}>
                Perforate Type:
                {printResponseData?.perforate_type === "Ok" ? (
                  <CheckOutlined />
                ) : (
                  "NA"
                )}{" "}
                {/* Show tick icon if value is 'ok', otherwise 'NA' */}{" "}
              </th>

              <th colSpan={30}>
                {" "}
                Non Perforated Type:{" "}
                {printResponseData?.non_perforate_type === "Ok" ? (
                  <CheckOutlined />
                ) : (
                  "NA"
                )}{" "}
                {/* Show tick icon if value is 'ok', otherwise 'NA' */}{" "}
              </th>
              <th colSpan={30}>
                Bag/Box: {printResponseData?.bag_or_box || "NA"}
              </th>
            </tr>

            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                1.Parameters:
              </th>
            </tr>
            <tr>
              <th
                colSpan={30}
                style={{ textAlign: "left", paddingLeft: "6px" }}
              >
                Grams:{printResponseData?.grams}
              </th>
              <th
                colSpan={40}
                style={{ textAlign: "left", paddingLeft: "6px" }}
              >
                Width:{printResponseData?.width}
              </th>
              <th
                colSpan={30}
                style={{ textAlign: "left", paddingLeft: "6px" }}
              >
                Height:{printResponseData?.height}
              </th>
            </tr>

            <tr>
              <th colSpan={100}>2.Fleece Receipt:</th>
            </tr>
            <tr>
              <th colSpan="10" style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                RollNo.
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Width in MM{" "}
              </th>
              <th colSpan="30" style={{ textAlign: "center" }}>
                GSM
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Net Wt. in Kg
              </th>
            </tr>
            {(fleecedetails || []).map((item, index) => (
              <tr key={index}>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {index + 1}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.rollNo}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.width_in_mm}
                </td>
                <td colSpan={30} style={{ textAlign: "center" }}>
                  {item.gsm}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.net_wt}
                </td>
              </tr>
            ))}
            {/* {chunkedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, cellIndex) => (
                    <td colSpan="3" style={{ textAlign: 'center', fontSize: "14px" }} key={cellIndex}>{value}</td>
                  ))}
                </tr>
              ))}   */}
            <tr>
              <th colSpan={100}>3. Out put:</th>
            </tr>
            <tr>
              <th
                colSpan={10}
                style={{ textAlign: "left", paddingleft: "5px" }}
              >
                Hours
              </th>
              <th colSpan={10} style={{ textAlign: "center" }}>
                1
              </th>
              <th colSpan={10} style={{ textAlign: "center" }}>
                2
              </th>
              <th colSpan={10} style={{ textAlign: "center" }}>
                3
              </th>
              <th colSpan={10} style={{ textAlign: "center" }}>
                4
              </th>
              <th colSpan={10} style={{ textAlign: "center" }}>
                5
              </th>
              <th colSpan={10} style={{ textAlign: "center" }}>
                6
              </th>
              <th colSpan={10} style={{ textAlign: "center" }}>
                7
              </th>
              <th colSpan={10} style={{ textAlign: "center" }}>
                8
              </th>
              <th colSpan={10} style={{ textAlign: "center" }}>
                Total
              </th>
            </tr>
            <tr>
              <td
                colSpan={10}
                style={{ textAlign: "left", paddingleft: "5px" }}
              >
                Bags
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.bag_hour1}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.bag_hour2}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.bag_hour3}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.bag_hour4}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.bag_hour5}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.bag_hour6}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.bag_hour7}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.bag_hour8}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.bag_total_hour}
              </td>
            </tr>
            <tr>
              <td
                colSpan={10}
                style={{ textAlign: "left", paddingleft: "5px" }}
              >
                Box
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.box_hour1}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.box_hour2}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.box_hour3}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.box_hour4}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.box_hour5}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.box_hour6}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.box_hour7}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.box_hour8}
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printResponseData?.box_total_hour}
              </td>
            </tr>
            <tr>
              <th colSpan={100}>Waste in Kg: {printResponseData?.waste_kg}</th>
            </tr>
            <tr>
              <th colSpan={120}>4.Stoppage:</th>
            </tr>
            <tr>
              <th colSpan="10" style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan={20} style={{ textAlign: "center" }}>
                Nature Of Problem
              </th>
              <th colSpan={20} style={{ textAlign: "center" }}>
                Stop. Time
              </th>
              <th colSpan={30} style={{ textAlign: "center" }}>
                Restart Time
              </th>
              <th colSpan={20} style={{ textAlign: "center" }}>
                Idle Time (in Min)
              </th>
              <th colSpan={20} style={{ textAlign: "center" }}>
                Remarks
              </th>
            </tr>
            {(stoppagedata || []).map((item, index) => (
              <tr key={index}>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {index + 1}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.SCAUSE}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.FTime}
                </td>
                <td colSpan={30} style={{ textAlign: "center" }}>
                  {item.TTime}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.TotHrs}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.remarks}
                </td>
              </tr>
            ))}
            <br />
            <br />

            <tr>
              <td colSpan="30" style={{ textAlign: "center" }}>
                Operator Sign & Date
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Performed by Production Supervisor
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                Reviewed by HOD / Designee
              </td>
            </tr>
            <tr>
              <td colSpan="30">
                <div
                  style={{
                    fontSize: "12px !important",
                    height: "100px",

                    textAlign: "center",
                  }}
                >
                  {printResponseData?.operator_sign}
                  <br />
                  {formattedDate_Op()}
                  <br />

                  {getImage3 && (
                    <img src={getImage3} alt="logo" className="signature" />
                  )}
                </div>
              </td>
              <td colSpan="40">
                <div
                  style={{
                    fontSize: "12px !important",
                    height: "100px",
                    textAlign: "center",
                  }}
                >
                  {printResponseData?.supervisor_sign}
                  <br></br>
                  {/* <span style={{ marginLeft: '5px', marginRight: '5px' }}> - </span> */}
                  {formattedDatesupervisor()}
                  <br></br>

                  {getImage1 && (
                    <img
                      src={getImage1}
                      alt="Supervisor Sign"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginLeft: "20px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        justifyContent: "center",
                      }}
                    />
                  )}
                </div>
              </td>
              <td colSpan="30">
                <div
                  style={{
                    fontSize: "12px !important",
                    height: "100px",
                    textAlign: "center",
                  }}
                >
                  {printResponseData?.hod_sign}
                  <br></br>
                  {formattedDate_hod()} <br></br>
                  {getImage2 && (
                    <img
                      src={getImage2}
                      alt="HOD Sign"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginLeft: "20px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        justifyContent: "space-evenly",
                      }}
                    />
                  )}
                </div>
              </td>
            </tr>
            <br />
          </tbody>
          <br />
          <tfoot
            style={{
              marginTop: "2em",
            }}
          >
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
        \
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
          formName="Daily Production(Pleate /Wool Roll)"
          formatNo="PH-PRD04/F-006"
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
            <label>Select Machince Name:</label>
          </Col>
          <Col>
            <Select
              style={{ width: "150px" }}
              placeholder="Select Machince Name"
              value={batchNolist}
              onChange={setBatchNolist}
              showSearch
            >
              {machineNameLov.map((MacLOV, index) => (
                <Option key={index} value={MacLOV.value}>
                  {MacLOV.value}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <label>Date :</label>
          </Col>
          <Col>
            <Input
              onChange={handleDateChange}
              type="date"
              value={date}
              size="small"
              max={getCurrentDate()}
              //   max ={ formattedToday }
              style={{ width: "100%", height: "30px" }}
            />
          </Col>
          <Col>
            <label>Select Shift:</label>
          </Col>
          <Col>
            <Select
              style={{
                width: "150px",
                height: "40x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              placeholder="Select Shift No"
              value={availableshiftlov}
              onChange={setAvailableShiftslov}
            >
              {availableshift.map((shiftvalue, index) => (
                <Option key={index} value={shiftvalue}>
                  {shiftvalue}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <label>Select Order No:</label>
          </Col>
          <Col>
            <Select
              style={{ width: "180px", height: "100%" }}
              placeholder="Select Order No"
              value={orderNo}
              onChange={(value) => {
                setOrderNo(value);
              }}
              showSearch
            >
              {orderNoList.map((MacLOV, index) => (
                <Option key={index} value={MacLOV}>
                  {MacLOV}
                </Option>
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
            type="date"
            value={datePrint}
            onChange={(e) => setDatePrint(e.target.value)}
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
            style={{
              width: "50%",
              height: "30x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Shift No"
            value={availableshiftlov2}
            onChange={setAvailableShiftslov2}
          >
            {availableshift2.map((shiftvalue, index) => (
              <Option key={index} value={shiftvalue}>
                {shiftvalue}
              </Option>
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
            Machine Name:
          </label>
          <Select
            style={{
              width: "50%",
              height: "30x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Machine Name"
            value={batchNolistValue2} // Only the value is used here
            onChange={(value) => {
              setBatchNolistValue2(value);
            }} // Custom onChange handler
            showSearch
          >
            {machineNameLov2.map((MacLOV, index) => (
              <Select.Option key={index} value={MacLOV.value}>
                {MacLOV.label}
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
            Order No:
          </label>
          <Select
            style={{ width: "180px", height: "100%" }}
            placeholder="Select Order No"
            value={orderNoPrint}
            onChange={(value) => {
              setOrderNoPrint(value);
            }}
            showSearch
          >
            {orderNoList.map((MacLOV, index) => (
              <Option key={index} value={MacLOV}>
                {MacLOV}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Drygoods_f06_Summary;