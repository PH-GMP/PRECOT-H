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
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f01_Summary = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [orderNumber, setOrderNumber] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [orderNumberLovPrint, setOrderNumberLovPrint] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [orderNumberPrint, setOrderNumberPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [formateddateprint, setformateddateprint] = useState("");
  const [shiftPrint, setShiftPrint] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [orderNumberBasedHeaders, setorderNumberBasedHeaders] = useState(null);
  const [orderNumberBasedAbRp, setorderNumberBasedAbRp] = useState(null);
  const [aplength, setaplength] = useState(null);
  const [rpleangth, setrpleangth] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [ConsumtionData, setConsumtionData] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.operator_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);

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
          setGetImage3(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);
  // const maxLength = Math.max(aplength?.length, rpleangth?.length);
  // // console.log("max length of ap and rp ",maxLength);
  const formattedDate = () => {
    if (printResponseData?.operator_submitted_on) {
      const date = moment(printResponseData?.operator_submitted_on);
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
    if (datePrint) {
      const date = moment(datePrint);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDateHod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (
          data.hod_status === "HOD_REJECTED" ||
          data.supervisor_status === "SUPERVISOR_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);
  // const formattedDatesupervisor = moment(printResponseData?.supervisor_submit_on||'').format('DD/MM/YYYY');
  // const formattedDateHod = moment(printResponseData?.hod_submit_on||'').format('DD/MM/YYYY');

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
    setShiftPrint(null);
    setDatePrint(null);
    setOrderNumberPrint(null);
  };
  const handleShiftChange = (value) => {
    setShift(value);

    // console.log("shift value",shift)
  };

  const handleOrderNumberChange = (value) => {
    setOrderNumber(value);
    // console.log("order number value",orderNumber)
  };
  const handleEdit = (record) => {
    // console.log("recorddd",record)

    const { order_number } = record;
    const { date } = record;
    const { shift } = record;

    navigate("/Precot/Spunlace/F-01", {
      state: {
        orderNumber: order_number,
        date: date,
        shift: shift,
      },
    });
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

  //   summary table

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/spulance/supervisorSummaryF001`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCakingData(data);
      // console.log("role based get list",data)
      setConsumtionData(
        data.map((item, index) => ({
          key: item.header_id,
          date: item.date,
          supervisor_status: item.supervisor_status,
          operator_status: item.operator_status,
          hod_status: item.hod_status,
          order_number: item.order_number,
          shift: item.shift,
          sno: index + 1,
          reason: item.reason,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.message);
    } finally {
      // setLoading(false);
    }
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },

    {
      title: "Order Number",
      dataIndex: "order_number",
      key: "order_number",
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

  const handleShiftChangePrint = (value) => {
    setShiftPrint(value);
  };

  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
    // formateddateprint(value);
    const date = new Date(value);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setformateddateprint(formattedDate);
    // console.log("date value", formateddateprint);
  };
  const printSubmit = () => {
    window.print();
    handleModalClose();
  };

  const fetchOrderbasedHeadersPrint = (value) => {
    try {
      setOrderNumberPrint(value);

      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/orderDetails?order=${value}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const printResponseData = res.data[0];
            setorderNumberBasedHeaders(printResponseData);
          } else {
            message.error(res.data.message);
          }
        })

        .catch((err) => {
          // console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };
  // const fetchPrintValue = (value) => {
  //   try {
  //       setShiftPrint(value);
  //       if (orderNumberPrint ==""||orderNumberPrint==null) {
  //         message.warning('Please Select OrderNumber');
  //         return;
  //     }
  //     if (datePrint ==""||datePrint==null) {
  //       message.warning('Please Select Date');
  //       return;
  //   }

  //     axios.get(
  //        `${API.prodUrl}/Precot/api/spulance/approvedBaleConsumptions?order=${orderNumberPrint}&date=${datePrint}&shift=${value}`,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data && res.data.length > 0) {

  //         const printResponseData = (res.data[0]);
  //         setPrintResponseData(printResponseData);
  //         // console.log("print response...............",res.data[0]);
  //         // console.log("set print response",printResponseData);
  //       } else {
  //         message.error(res.data.message);
  //         handleModalClose();
  //       }
  //       // if(res.data.message === )
  //     })

  //     .catch((err) => {
  //       // console.log("Error", err);
  //     });
  //   } catch (error) {
  //     console.error('Error in handleDatePrintChange:', error);

  //   }
  // };
  useEffect(() => {
    // console.log("print response AbRp", orderNumberBasedAbRp);
  }, [orderNumberBasedAbRp]);

  function convertShift(shift) {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return null;
    }
  }

  const fetchPrintValue = (value) => {
    try {
      setOrderNumberPrint(value);
      setPrintLoading(true);
      console.log("value", value);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const formattedShift = convertShift(shiftPrint);
      fetchOrderbasedHeadersPrint(value);
      const orderDetailsPromise = axios.get(
        `${API.prodUrl}/Precot/api/spulance/approvedBaleConsumptions?order=${value}&date=${datePrint}&shift=${shiftPrint}`,
        { headers }
      );
      const baleByOrderPromise = axios.get(
        `${API.prodUrl}/Precot/api/spulance/baleByOrderdateshift?order=${value}&date=${datePrint}&shift=${formattedShift}`,
        { headers }
      );

      Promise.all([orderDetailsPromise, baleByOrderPromise])
        .then(([orderDetailsResponse, baleByOrderResponse]) => {
          if (
            orderDetailsResponse.data &&
            orderDetailsResponse.data.message !== "No data"
          ) {
            const printResponseData = orderDetailsResponse.data[0];
            setPrintResponseData(printResponseData);
            // setPrintResponseData(orderDetailsResponse.data);
            // console.log("first print api",printResponseData);
          } else {
            setPrintResponseData([]);
            message.error("no data found...!");
            handleModalClose();
          }

          if (baleByOrderResponse.data) {
            setorderNumberBasedAbRp(baleByOrderResponse.data);
            setPrintLoading(false);
          } else {
            setorderNumberBasedAbRp([]);
            message.error("no data found...!");
            handleModalClose();
          }
        })
        .catch((err) => {
          // console.log("Error", err);
          handleModalClose();
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  //   shift
  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

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
  // order number
  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      let shiftparam = "";
      if (shift == "I") {
        shiftparam = "1";
      } else if (shift == "II") {
        shiftparam = "2";
      } else {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/orderByDate?date=${date}&shift=${shiftparam}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

        if (Array.isArray(data)) {
          setOrderNumberLov(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };

    if (date && shift) {
      fetchOrderNumberOptions();
    }
  }, [date, shift, token]);

  useEffect(() => {
    const fetchOrderNumberOptionsPrint = async () => {
      let shiftparam = "";
      if (shiftPrint == "I") {
        shiftparam = "1";
      } else if (shiftPrint == "II") {
        shiftparam = "2";
      } else {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/orderByDate?date=${datePrint}&shift=${shiftparam}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

        if (Array.isArray(data)) {
          setOrderNumberLovPrint(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLovPrint([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLovPrint([]);
      }
    };

    if (datePrint && shiftPrint) {
      fetchOrderNumberOptionsPrint();
    }
  }, [datePrint, shiftPrint, token]);

  //   goto button
  const goTo = () => {
    if (orderNumber == "" || orderNumber == null) {
      message.warning("Please Select Order Number");
      return;
    } else if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    navigate("/Precot/Spunlace/F-01", {
      state: {
        orderNumber: orderNumber,
        date: date,
        shift: shift,
      },
    });
  };
  // Calculate total pages based on content height and window height
  const totalHeight = document.body.scrollHeight;
  const pageHeight = window.innerHeight;
  const totalPages = Math.ceil(totalHeight / pageHeight);

  // Set total pages in the placeholder
  const totalPagesElement = document.getElementById("totalPages");
  if (totalPagesElement) {
    totalPagesElement.textContent = totalPages;
  }

  // This function will be called for each printed page
  const currentPage = Math.ceil((window.scrollY + pageHeight) / pageHeight);
  const currentPageElement = document.getElementById("currentPage");
  if (currentPageElement) {
    currentPageElement.textContent = currentPage;
  }

  return (
    // print section
    <div>
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
              <th colSpan="45" rowSpan="4" style={{ textAlign: "center" }}>
                Bale Consumption Report
              </th>
              <td colSpan="15">Format No:</td>
              <td colSpan="25">PH-PRD02/F-001</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No:</td>
              <td colSpan="25">01</td>
            </tr>
            <td colSpan="15">Ref. SOP No:</td>
            <td colSpan="25">PH-PRD02-D-03</td>
            <tr>
              <td colSpan="15">Page No:</td>
              <td colSpan="25">
                Page <span id="currentPage"></span> of{" "}
                <span id="totalPages"></span>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th colSpan="20" style={{ height: "15px" }}>
                Date:
              </th>
              <th colSpan="30" style={{ height: "15px" }}>
                {formattedDateheader()}
              </th>
              <th colSpan="20" style={{ height: "15px" }}>
                Shift:
              </th>
              <th colSpan="30" style={{ height: "15px" }}>
                {shiftPrint}
              </th>
            </tr>
            <tr>
              <th colSpan="20" style={{ height: "15px" }}>
                Order No.:
              </th>
              <th colSpan="30" style={{ height: "15px" }}>
                {orderNumberPrint}
              </th>
              <th colSpan="20" style={{ height: "15px" }}>
                Mixing:
              </th>
              <th colSpan="30" style={{ height: "15px" }}>
                {orderNumberBasedHeaders && orderNumberBasedHeaders?.mix}
              </th>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "20px" }}>
                Customer Name:
              </th>
              <th colSpan="30" style={{ height: "20px" }}>
                {orderNumberBasedHeaders &&
                  orderNumberBasedHeaders?.customerName}
              </th>
              <th colSpan="5" style={{ height: "20px" }}>
                Material Code:
              </th>
              <th colSpan="30" style={{ height: "20px" }}>
                {orderNumberBasedHeaders && orderNumberBasedHeaders?.material}
              </th>
              <th colSpan="5" style={{ height: "20px" }}>
                STD GSM:
              </th>
              <th colSpan="25" style={{ height: "20px" }}>
                {orderNumberBasedHeaders && orderNumberBasedHeaders?.gsm}
              </th>
            </tr>
            <tr>
              <th colSpan="60" style={{ height: "20px", textAlign: "center" }}>
                AB COTTON{" "}
              </th>
              <th colSpan="40" style={{ height: "20px", textAlign: "center" }}>
                RP COTTON{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="20" style={{ height: "20px", textAlign: "center" }}>
                Batch No.{" "}
              </th>
              <th colSpan="20" style={{ height: "20px", textAlign: "center" }}>
                Bale No.{" "}
              </th>
              <th colSpan="20" style={{ height: "20px", textAlign: "center" }}>
                Net Wt. in KG{" "}
              </th>
              <th colSpan="20" style={{ height: "20px", textAlign: "center" }}>
                Bale No.{" "}
              </th>
              <th colSpan="20" style={{ height: "20px", textAlign: "center" }}>
                Net Wt. in KG{" "}
              </th>
            </tr>

            {/* {orderNumberBasedAbRp && orderNumberBasedAbRp.apBaleConsumptionResponse.map((item, index) => (
  <tr key={index}>
    <td colSpan="20" style={{ height: "15px", textAlign: "center" }}>
      {item.batchNo}
    </td>
    <td colSpan="20" style={{ height: "15px", textAlign: "center" }}>
      {item.baleNo}
    </td>
    <td colSpan="20" style={{ height: "15px", textAlign: "center" }}>
      {item.netWeight}
    </td>
    <td colSpan="20" style={{ height: "15px", textAlign: "center" }}>
      {orderNumberBasedAbRp &&orderNumberBasedAbRp.rpBaleConsumption[index].baleNo}
    </td>
    <td colSpan="20" style={{ height: "15px", textAlign: "center" }}>
      {orderNumberBasedAbRp &&orderNumberBasedAbRp.rpBaleConsumption[index].netWeight}
    </td>
  </tr>
))} */}
            {orderNumberBasedAbRp &&
              (() => {
                const apBaleConsumptionResponse =
                  orderNumberBasedAbRp.apBaleConsumptionResponse || [];
                // setaplength(apBaleConsumptionResponse);
                const rpBaleConsumption =
                  orderNumberBasedAbRp.rpBaleConsumption || [];
                // setrpleangth(rpBaleConsumption);
                const maxLength = Math.max(
                  apBaleConsumptionResponse.length,
                  rpBaleConsumption.length
                );

                return Array.from({ length: maxLength }, (_, index) => (
                  <tr key={index}>
                    <td
                      colSpan="20"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {apBaleConsumptionResponse[index]?.batchNo || "N/A"}
                    </td>
                    <td
                      colSpan="20"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {apBaleConsumptionResponse[index]?.baleNo || "N/A"}
                    </td>
                    <td
                      colSpan="20"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {apBaleConsumptionResponse[index]?.netWeight || "N/A"}
                    </td>
                    <td
                      colSpan="20"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {rpBaleConsumption[index]?.baleNo || "N/A"}
                    </td>
                    <td
                      colSpan="20"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {rpBaleConsumption[index]?.netWeight || "N/A"}
                    </td>
                  </tr>
                ));
              })()}

            <tr>
              <th colSpan="40" style={{ height: "10px", textAlign: "center" }}>
                Total
              </th>
              <td colSpan="20" style={{ height: "10px", textAlign: "center" }}>
                {" "}
                {printResponseData?.totalABWeight}
              </td>
              <th colSpan="20" style={{ height: "10px", textAlign: "center" }}>
                Total{" "}
              </th>
              <td colSpan="20" style={{ height: "10px", textAlign: "center" }}>
                {printResponseData?.totalRpWeight}
              </td>
            </tr>
            <tr>
              <td colSpan="34" style={{ height: "1opx", textAlign: "center" }}>
                Operator Sign & Date
              </td>
              <td colSpan="33" style={{ textAlign: "center" }}>
                Production Supervisor Sign & Date
              </td>
              <td colSpan="33" style={{ textAlign: "center" }}>
                HOD/ Designee Sign & Date
              </td>
            </tr>
            <tr>
              {/* <td colSpan="34" style={{ height: "50px", textAlign: "center", marginBottom: "auto", verticalAlign: "bottom" }}>
    {printResponseData?.operator_sign || ''}<br/>{formattedDate()}
  </td> */}
              <td
                colSpan="34"
                style={{
                  height: "48px",
                  textAlign: "center",
                  marginBottom: "auto",
                  verticalAlign: "bottom",
                  borderTop: "none",
                }}
              >
                {getImage1 && (
                  <img
                    src={getImage1}
                    alt="Operator Sign"
                    style={{
                      width: "50%",
                      height: "50%",
                      // marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />
                )}
                <br />
                {printResponseData?.operator_sign || ""}
                <br />
                {formattedDate()}
              </td>
              {/* <td colSpan="33" style={{ textAlign: "center", verticalAlign: "bottom" }}>
    {printResponseData?.supervisor_sign || ''}<br/>{formattedDatesupervisor()}
  </td> */}
              <td
                colSpan="33"
                style={{
                  height: "48px",
                  textAlign: "center",
                  marginBottom: "auto",
                  verticalAlign: "bottom",
                  borderTop: "none",
                }}
              >
                {getImage2 && (
                  <img
                    src={getImage2}
                    alt="Supervisor Sign"
                    style={{
                      width: "50%",
                      height: "50%",
                      // marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />
                )}{" "}
                <br />
                {printResponseData?.supervisor_sign || ""}
                <br />
                {formattedDatesupervisor()}
              </td>
              {/* <td colSpan="33" style={{ textAlign: "center", verticalAlign: "bottom" }}>
    {printResponseData?.hod_sign || ''}<br/>{formattedDateHod()}
  </td> */}
              <td
                colSpan="33"
                style={{
                  height: "48px",
                  textAlign: "center",
                  marginBottom: "auto",
                  verticalAlign: "bottom",
                  borderTop: "none",
                }}
              >
                {getImage3 && (
                  <img
                    src={getImage3}
                    alt="HOD Sign"
                    style={{
                      width: "50%",
                      height: "50%",
                      // marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />
                )}{" "}
                <br />
                {printResponseData?.hod_sign || ""}
                <br />
                {formattedDateHod()}
              </td>
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
          <br />
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
          formName="BALE CONSUMPTION  REPORT"
          formatNo="PH-PRD02/F-001"
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
        <Row
          align="middle"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "10px",
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
              max={formattedToday}
              style={{ width: "100%", height: "30px" }}
            />
          </Col>

          <Col>
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
            <label>Order Number:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={orderNumber}
              onChange={handleOrderNumberChange}
              style={{ width: "100%" }}
              placeholder="Search Order Number"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Order Number
              </Select.Option>
              {orderNumberLov.map((option) => (
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
      {/* TABLE */}
      {/* <Table  bordered
          style={{
            textAlign: "center",
            width: "100%",
           
          }}  columns={columns}  columns1={columns1} dataSource={ConsumtionData} /> */}
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={ConsumtionData}
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
            disabled={!shiftPrint}
            loading={printLoading}
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
            onChange={handleDatePrint}
            type="date"
            value={datePrint}
            size="small"
            max={formattedToday}
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
            showSearch
            value={shiftPrint}
            onChange={handleShiftChangePrint}
            style={{ width: "50%" }}
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
            Order Number:
          </label>
          <Select
            showSearch
            value={orderNumberPrint}
            onChange={fetchPrintValue}
            style={{ width: "50%" }}
            placeholder="Search Order Number"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Order Number
            </Select.Option>
            {orderNumberLovPrint.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Spunlace_f01_Summary;
