/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Drygoods_f09_Summary = () => {
  const GlobalStyle = createGlobalStyle`

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
  const [batchNolist, setBatchNolist] = useState("Machine Name");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [batchno, setbatchno] = useState([]);
  const [batchno2, setbatchno2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableshiftlov, setAvailableShiftslov] = useState("Select OrderNo");
  const { Option } = Select;
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [availableshift2, setAvailableShifts2] = useState([]);
  const [availableshift, setAvailableShifts] = useState([]);
  const [batchNolistValue2, setBatchNolistValue2] = useState("Machine Name"); // State for the value
  const machineNameLov = [
    { value: "TEXCOR", label: "TEXCOR" },
    { value: "LINK", label: "LINK" },
    { value: "PLT1", label: "PLT1" },
    { value: "PLT2", label: "PLT2" },
    { value: "WRL", label: "WRL" },
  ];
  const machineNameLov2 = [
    { value: "TEXCOR", label: "TEXCOR" },
    { value: "LINK", label: "LINK" },
    { value: "PLT1", label: "PLT1" },
    { value: "PLT2", label: "PLT2" },
    { value: "WRL", label: "WRL" },
  ];
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const formattedDate_hod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate_QA = () => {
    if (printResponseData?.qa_submit_on) {
      const date = moment(printResponseData?.qa_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDatesupervisor = () => {
    if (printResponseData?.supervisor_submit_on) {
      const date = moment(printResponseData?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchDataOrderNumber();
    fetchDataShift();
    const username = printResponseData?.supervisor_sign;
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
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchDataOrderNumber();
    fetchDataShift();
    const username = printResponseData?.hod_sign;
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
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchDataOrderNumber();
    fetchDataShift();
    const username = printResponseData?.hod_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);
  const fetchDataOrderNumber = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/drygoods/getDrygoodsOrderNoLov`, {
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
  const fetchDataShift = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/goods/getDrygoodsProductChangeOrderNoLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // // console.log("Shift details fetched:", res.data);
          // // console.log("Shift details fetched:", res.data);
          const shifts = res.data.map((shift) => shift);
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
    const username = printResponseData?.hod_sign;
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
  }, [printResponseData,API.prodUrl, token]);

  const formattedDate = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const formattedDateheader = () => {
    if (printResponseData?.date) {
      const date = moment(printResponseData?.date);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedccpMaintaned_date = () => {
    if (printResponseData?.ccpMaintainedDate) {
      const date = moment(printResponseData?.ccpMaintainedDate);
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
    setDatePrint(null);
    setIsFetchSuccessful(false);
    setBatchNolistValue2(null);
    // console.log("print screen works");
  };
  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);

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

  const handlePrintDateChange = (event) => {
    try {
      setBatchNolistValue2(event);
      axios
        .get(
          `${API.prodUrl}/Precot/api/goods/getproductChangeOverPrintF09?date=${datePrint}&machine=${event}`,
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
            message.success("Data Fetched Successfully");
            setPrintResponseData(res.data[0]);
            setIsFetchSuccessful(true);

            console.log("print response data", printResponseData);
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
    // console.log("recorddd",record)
    // const{date}=record;
    // const formattedDate = moment(date).format('YYYY-MM-DD');
    navigate("/Precot/DryGoods/F-09", {
      state: {
        date: record.date,
        shift: record.section,
        orderNo: record.machineName,
        machineName: record.machineName,
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

      let apiUrl = `${API.prodUrl}/Precot/api/goods/summaryproductChangeOverF09`;

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
      console.error("Error fetching data:", error);
      message.error(error.data.message);
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
      title: "QA Status",
      dataIndex: "qa_status",
      key: "qa_status",
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
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };
  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    } else if (
      availableshiftlov == null ||
      availableshiftlov == "" ||
      availableshiftlov == "[]" ||
      availableshiftlov == "Select OrderNo" ||
      availableshiftlov == 0
    ) {
      message.warning("Please Select Order No");
      return;
    } else if (
      batchNolist == null ||
      batchNolist == "" ||
      batchNolist == "[]" ||
      batchNolist == "Machine Name" ||
      batchNolist == 0
    ) {
      message.warning("Please Select Machince Name");
      return;
    }
    navigate("/Precot/DryGoods/F-09", {
      state: {
        date: date,
        shift: availableshiftlov,
        orderNo: batchNolist,
        machineName: batchNolist,
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
              <td colSpan={10} rowspan="4 " style={{ textAlign: "center" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <br></br>
                Unit H
              </td>
              <th colSpan={80} rowSpan="4" style={{ textAlign: "center" }}>
                Product Change Over{" "}
              </th>
              <td colSpan={5}>Format No.:</td>
              <td colSpan={5}>PH-PRD04/F-009</td>
            </tr>
            <tr>
              <td colSpan={5}>Revision No.:</td>
              <td colSpan={5}>01</td>
            </tr>
            <td colSpan={5}>Ref. SOP No.:</td>
            <td colSpan={5}>PH-PRD04-D-03</td>
            <tr>
              <td colSpan={5}>Page No.:</td>
              <td colSpan={5}>1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead>
          <br />
          <tbody>
            <tr>
              <td colSpan={50} style={{ textAlign: "left" }}>
                {" "}
                Date:{formattedDateheader()}
              </td>
              <td colSpan={50} style={{ textAlign: "left" }}>
                Machine:{printResponseData?.machineName}
              </td>
            </tr>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                A. Product Details:
              </th>
            </tr>
            <tr>
              <th colSpan={10} style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan={40} style={{ textAlign: "center" }}>
                Check Points
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Running Production
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Change Over To
              </th>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Order No.
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.orderNo1}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.orderNo2}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Product Name
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.productName1}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.productName2}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Lot No
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.lotNo1}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.lotNo2}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                4
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Roll gm/Sliver Weight
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.sliverWeight1}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.sliverWeight2}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                5
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Pack Size (qty per bag)
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.packSize1}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.packSize2}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                6
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                PDS No./ Rev.No
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.pdsNumber1}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.pdsNumber2}
              </td>
            </tr>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                B.Removed of Unwanted Packing Materials of Running Product:
              </th>
            </tr>
            <tr>
              <th colSpan={10} style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan={40} style={{ textAlign: "center" }}>
                Packing Materials{" "}
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Qty.
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Remove (Yes/No)
              </th>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Inner Bag in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.innerBag}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.innerBagRemove}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Outer Bag in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.outerBag}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.outerBagRemove}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Inner Carton in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.innerCarton}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.innerCartonRemove}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                4
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Outer carton in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.outerCarton}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.outerCartonRemove}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                5
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Sliver in Kg
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.silverWeight}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.silverWeightRemove}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                6
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Roll in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.rollNo}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.rollNoRemove}
              </td>{" "}
            </tr>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                C.Tool & Machine Settings:
              </th>
            </tr>
            <tr>
              <th colSpan={10} style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan={40} style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Completed Status
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Remove{" "}
              </th>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Tool Change required
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.toolChangeRequired}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.toolChangeRequiredRemove}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Tool Change Done
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.toolChangeDone}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.toolChangeDoneRemove}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Machine Setting
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.machineSetting}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.machineSettingRemove}
              </td>
            </tr>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                D. CCP Setting:
              </th>
            </tr>
            <tr>
              <th colSpan={10} style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan={75} style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Status
              </th>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={75} style={{ textAlign: "center" }}>
                Teaching of Metal Detector
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.metalDetectorTeach}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={75} style={{ textAlign: "center" }}>
                Functioning Check Of Metal Detector
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.metalDetectorCheck}
              </td>
            </tr>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                E. Production Start:
              </th>
            </tr>
            <tr>
              <th colSpan={10} style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan={40} style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Completed (Yes/No)
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Remarks{" "}
              </th>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Production Ready To Start
              </td>

              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.productionCheck}
              </td>

              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.productionCheckRemarks}
              </td>
            </tr>

            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                First Piece Inspection /Quality verification
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.qualityVerification}
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                {printResponseData?.qualityVerificationRemarks}
              </td>
            </tr>

            <tr>
              <td colSpan={25} style={{ height: "35px", textAlign: "center" }}>
                Production Supervisor
              </td>
              <td colSpan={25} style={{ height: "35px", textAlign: "center" }}>
                CCP Maintained by
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                Verified by (QA Inspector)
              </td>
            </tr>

            <tr>
              <td
                colSpan={25}
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {printResponseData?.supervisor_status ===
                  "SUPERVISOR_APPROVED" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{printResponseData?.supervisor_sign}</div>
                        <div>{formattedDatesupervisor()}</div>
                      </div>
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
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>
              <td colSpan={25}>
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "auto",
                    // verticalAlign: "bottom",
                  }}
                >
                  {printResponseData?.ccpMaintainedBy}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "auto",
                    // verticalAlign: "bottom",
                  }}
                >
                  {formattedccpMaintaned_date()}
                </div>
              </td>

              <td
                colSpan={25}
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {printResponseData?.qa_status === "QA_APPROVED" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{printResponseData?.qa_sign}</div>
                        <div>{formattedDate_QA()}</div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="QA Sign"
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
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>

              <td
                colSpan={25}
                style={{
                  textAlign: "center",
                  // verticalAlign: "bottom"
                }}
              >
                {(printResponseData?.hod_status === "HOD_REJECTED" ||
                  printResponseData?.hod_status === "HOD_APPROVED") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{printResponseData.hod_sign}</div>
                        <div>{formattedDate_hod()}</div>
                      </div>
                      {getImage3 && (
                        <img
                          src={getImage3}
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
                    </div>{" "}
                  </>
                )}
              </td>
            </tr>
          </tbody>
          <br />
          <tfoot style={{ marginTop: "10px" }}>
            <tr>
              <th colSpan={25}>Particular</th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Prepared by
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Reviewed by
              </th>
              <th colSpan={25} style={{ textAlign: "center" }}>
                Approved by
              </th>
            </tr>
            <tr>
              <th colSpan={25}>Name</th>
              <td colSpan={25}></td>
              <td colSpan={25}></td>
              <td colSpan={25}></td>
            </tr>
            <tr>
              <th colSpan={25}>Signature & Date</th>
              <td colSpan={25}></td>
              <td colSpan={25}></td>
              <td colSpan={25}></td>
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
          formName="Product Change Over "
          formatNo="PH-PRD04/F-009"
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
            <label>Select Machince Name :</label>
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
              max={getCurrentDate()}
              size="small"
              //   max ={ formattedToday }
              style={{ width: "100%", height: "30px" }}
            />
          </Col>
          <Col>
            <label>Select OrderNO:</label>
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
              placeholder="Select Order No"
              showSearch
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
            disabled={!isFetchSuccessful}
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
            onChange={handlePrintDateChange} // Custom onChange handler
            showSearch
          >
            {machineNameLov2.map((MacLOV, index) => (
              <Select.Option key={index} value={MacLOV.value}>
                {MacLOV.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Drygoods_f09_Summary;
