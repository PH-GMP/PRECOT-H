/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Select, Descriptions, Menu, Avatar, Drawer } from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import { Tooltip } from "antd";
import moment from "moment";
import API from "../baseUrl.json";
import { FaUserCircle } from "react-icons/fa";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import BleContaminationCheckEdit from "./BleContaminationCheckEdit_f05";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { Tabs, Button, Col, Input, Row, message } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoChevronBackSharp, IoPrint } from "react-icons/io5";
import { VscGoToFile, VscGoToSearch } from "react-icons/vsc";
import { GoArrowLeft } from "react-icons/go";
import { jwtDecode } from "jwt-decode";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f06_summary = () => {
  const [open, setOpen] = useState(false);

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

  const [newDate, setNewDate] = useState("");

  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [ContaminationData, setContaminationData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderNoPayload, setorderNoPayload] = useState();
  const [OrderNo, setOrderNo] = useState();
  const [Supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
  const [printResponseData, setPrintResponseData] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const [reason, setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [orderNumberPrint, setOrderNumberPrint] = useState("");

  const [getImage, setGetImage] = useState("");

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
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

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
          setGetImage1(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl]);

  // console.log("get image", getImage);

  const [getImage2, setGetImage2] = useState("");

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
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl]);

  // console.log("get image", getImage);

  const [gotobtn, setGotobtn] = useState(true);

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role = userRole;

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (newDate) {
      const formattedDate = formatDateToDDMMYYYY(newDate);
      setDate(formattedDate); // Save formatted date in date state
    }
  }, [newDate]);

  const handlePrint = () => {
    setShowModal(true);
    // console.log("print screen works");
  };
  const printDateSubmit = () => {
    // checkDateExists();
  };
  const handleDateChange = (event) => {
    setPrintByDate(event.target.value);
  };

  // useEffect(() => {

  //   setNewDate(new Date().toISOString().substring(0, 10));

  // }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}/${month}/${day}`;
  };

  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
  };
  const formattedDate = moment(datePrint, "YYYY-MM-DD").format("DD/MM/YYYY");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (orderNumberPrint && datePrint && shiftPrint) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [orderNumberPrint, datePrint, shiftPrint]);
  const fetchPrintValue = (value) => {
    try {
      setIsButtonDisabled(false); // Enable the button before making the request

      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/getByDateShiftOrderNoPrintApi?orderNo=${orderNumberPrint}&date=${formattedDate}&shift=${shiftPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log("Full response:", res.data);
          if (res.data && res.data.message !== "No data") {
            setPrintResponseData(res.data);
            // console.log("Print response:", res.data);
            setIsButtonDisabled(false); // Enable the button if data is found
          } else {
            message.error("No data found...!");
            setIsButtonDisabled(true); // Disable the button if no data is found
          }
        })
        .catch((err) => {
          // console.log("Error", err);
          setIsButtonDisabled(true); // Disable the button if an error occurs
        });
    } catch (error) {
      console.error("Error in fetchPrintValue:", error);
      setIsButtonDisabled(true);
    }
  };

  const fetchOrderbasedHeadersPrint = (value) => {
    setOrderNumberPrint(value);
    fetchPrintValue();
  };

  const Shift = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  const printSubmit = () => {
    window.print();
  };

  useEffect(() => {
    const OrderNoLovPayload = async () => {
      let shiftparam = "";
      if (shift == "I") {
        shiftparam = "1";
      } else if (shift == "II") {
        shiftparam = "2";
      } else {
        shiftparam = "3";
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/spulance/orderGoodsByDate?date=${newDate}&shift=${shiftparam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("ORDER_NO",response.data)
        const data = response.data.map((item) => ({
          phNo: item.value,
          value: item.id,
        }));
        const a = response.data.map((x, i) => {
          return {
            value: x.value,
            label: x.value,
            date: x.date,
          };
        });
        setorderNoPayload(a);
        // console.log("lov",a)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (newDate && shift) {
      OrderNoLovPayload();
    }
  }, [newDate, shift, token]);

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
          `${API.prodUrl}/Precot/api/spulance/orderGoodsByDate?date=${datePrint}&shift=${shiftparam}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
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
    if (datePrint && shiftPrint) {
      fetchOrderNumberOptionsPrint();
    }
  }, [datePrint, shiftPrint, token]);

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

  const handleShiftChange = (value) => {
    // console.log(" Shift ", value);
    setShift(value);
    setGotobtn(false);
  };

  const goTo = () => {
    if (newDate == "" || newDate == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    } else if (OrderNo == "" || OrderNo == null) {
      message.warning("Please Select Order No");
      return;
    }
    navigate("/Precot/Spunlace/F-06", {
      state: {
        newdate: date,
        shiftvalue: shift,
        orderNo: OrderNo,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        let apiUrl = "";
        if (role === "ROLE_SUPERVISOR") {
          apiUrl = `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/supervisorSummary`;
        } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
          apiUrl = `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/supervisorSummary`;
        } else if (role === "ROLE_OPERATOR") {
          apiUrl = `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/operatorSummary`;
        } else {
          throw new Error("Role not found in localStorage.");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();

        // console.log("Fetched data:", data);

        if (!data || !Array.isArray(data)) {
          throw new Error("Data is not an array or undefined");
        }

        setnewData(data);
        setmodalData(data);

        setContaminationData(
          data.map((item) => ({
            key: item.header_id, // Assuming header_id is unique
            formatName: item.formatName,
            formatNo: item.formatNo,
            revisionNo: item.revisionNo,
            date: item.date,
            orderNo: item.orderNo,
            reason: item.reason,

            productName: item.productName,

            shift: item.shift,
            operator_status: item.operator_status,
            status: item.status,
            hod_status: item.hod_status,
            supervisor_status: item.supervisor_status,
            mailstatus: item.mail_status,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Ensure this dependency array is correct for your use case

  useEffect(() => {
    const findReason = () => {
      for (const data of ContaminationData) {
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
  }, [ContaminationData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Precot");
  };

  useEffect(() => {
    // console.log("modal", modalData);
  }, [modalData]);

  const phOnChange = (Data) => {
    //  console.log("hh", orderNoPayload.filter((x, i) => {
    //   return Data == x.value
    // }))

    const a = orderNoPayload.filter((x, i) => {
      return Data == x.value;
    });
    setOrderNo(a[0].value);
    setGotobtn(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShiftPrint(null);
    setDatePrint(null);
    setOrderNumberPrint(null);
  };

  const handleEdit = (record) => {
    // console.log("recorddd",record)

    const { date, shift, orderNo } = record;

    navigate("/Precot/Spunlace/F-06", {
      state: {
        newdate: date,
        shiftvalue: shift,
        orderNo: orderNo,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new window.Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Order No",
      dataIndex: "orderNo",
      key: "orderNo",
      align: "center",
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "formatDate",
      align: "center",
      //render: (text) => formatDate(text),
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
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "HOD/Designee  Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Action",
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

  let columns = [...baseColumns];

  // Insert the "Reason" column before the "Action" column if `reason` exists
  if (reason) {
    const actionIndex = columns.findIndex((col) => col.key === "actions");
    columns.splice(actionIndex, 0, Reason);
  }

  let numberOfPages = Math.ceil(printResponseData.length / 1);

  // console.log("pr",printResponseData?.stdGsm)

  const recordsPerPage = 10;
  const totalPages = Math.ceil(
    printResponseData.reportDetails?.length / recordsPerPage
  );

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };

  return (
    <div>
      {contextHolder}
      {/* <Drawer
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

      </Drawer> */}
      <GlobalStyle />

      <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          >
            <table style={{ width: "90%", tableLayout: "fixed" }}>
              <br />
              <thead>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="11"></td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    rowSpan="4"
                    style={{ textAlign: "center", width: "10%" }}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br />
                    Unit H
                  </td>
                  <th
                    colSpan="5"
                    rowSpan="4"
                    style={{ height: "60px", textAlign: "center" }}
                  >
                    Daily Production Report - Spunlace
                  </th>
                  <td colSpan="2">Format No.:</td>
                  <td colSpan="2">PH-PRD02/F-006</td>
                </tr>
                <tr>
                  <td colSpan="2">Revision No.:</td>
                  <td colSpan="2">01</td>
                </tr>
                <tr>
                  <td colSpan="2">Ref sopNo.:</td>
                  <td colSpan="2">PH-PRD02-D-03</td>
                </tr>
                <tr>
                  <td colSpan="2">PageNo.:</td>
                  <td colSpan="2">
                    {" "}
                    {pageIndex + 1} of {totalPages}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="11"></td>
                </tr>
              </thead>

              <tbody>
                {pageIndex === 0 && (
                  <>
                    <tr>
                      <td colSpan="4">Date: {printResponseData?.date}</td>
                      <td colSpan="3">Shift: {printResponseData?.shift}</td>
                      <td colSpan="4">Std. Gsm: {printResponseData?.stdGsm}</td>
                    </tr>

                    <tr>
                      <td colSpan="4">
                        Order No.: {printResponseData?.orderNo}
                      </td>
                      <td colSpan="3">
                        Std. Width In MM: {printResponseData?.stdWidth}
                      </td>
                      <td colSpan="4">Mixing: {printResponseData?.mixing}</td>
                    </tr>

                    <tr>
                      <td colSpan="4">
                        Product Name: {printResponseData?.productName}
                      </td>
                      <td colSpan="3">
                        Std. Roll Dia In MM: {printResponseData?.stdRollDia}
                      </td>
                      <td colSpan="4">
                        Material Code: {printResponseData?.materialCode}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="7">Pattern: {printResponseData?.pattern}</td>
                      <td colSpan="4">
                        Std. Thickness In MM: {printResponseData?.stdThickness}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    S.No.
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    Shaft No.
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    Roll No.
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    Length <br /> In Mtrs
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    Width <br /> In MM
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    Net Wt. <br />
                    In Kg
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    Roll GSM
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    Moisture <br /> In %
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    Roll Dai <br /> In MM
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    Remarks
                  </td>
                </tr>

                {printResponseData?.reportDetails?.length > 0 ? (
                  // printResponseData.reportDetails.map((detail, index) => (
                  paginateData(
                    printResponseData.reportDetails,
                    pageIndex + 1
                  ).map((detail, index) => (
                    <tr key={detail.detailId || index}>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {index + 1 + pageIndex * recordsPerPage}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {detail.shaftNo}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {detail.rollNo}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {detail.length}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {detail.width}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {detail.netWt}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {detail.rollGsm}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {detail.moisture}
                      </td>
                      <td colSpan="1" style={{ textAlign: "center" }}>
                        {detail.rollDia}
                      </td>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        {detail.remarks || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">No report details available</td>
                  </tr>
                )}
                {pageIndex + 1 === totalPages && (
                  <>
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {" "}
                        Operator Sign & Date
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {" "}
                        Production Supervisor Sign & Date
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {" "}
                        HOD / Designee Sign & Date
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        style={{ textAlign: "center", verticalAlign: "buttom" }}
                      >
                        {printResponseData?.operator_sign}
                        <br />
                        {printResponseData?.operator_submit_on
                          ? new Intl.DateTimeFormat("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }).format(
                              new Date(printResponseData?.operator_submit_on)
                            )
                          : ""}
                        <br />
                        {getImage2 && (
                          <img
                            src={getImage2}
                            alt="Operator Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                      </td>

                      <td
                        colSpan="4"
                        style={{ textAlign: "center", verticalAlign: "buttom" }}
                      >
                        {printResponseData?.supervisor_sign}
                        <br />
                        {printResponseData?.supervisor_submit_on
                          ? new Intl.DateTimeFormat("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }).format(
                              new Date(printResponseData?.supervisor_submit_on)
                            )
                          : ""}
                        <br />
                        {getImage && (
                          <img
                            src={getImage}
                            alt="Supervisor Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                      </td>

                      <td
                        colSpan="4"
                        style={{
                          height: "40px",
                          textAlign: "center",
                          verticalAlign: "buttom",
                        }}
                      >
                        {printResponseData?.hod_sign}
                        <br />
                        {printResponseData?.hod_submit_on
                          ? new Intl.DateTimeFormat("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }).format(
                              new Date(printResponseData?.hod_submit_on)
                            )
                          : ""}
                        <br />
                        {getImage1 && (
                          <img
                            src={getImage1}
                            alt="Hod Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>

              <br />

              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="11"></td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    Particulars
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    Prepared by
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    Reviewed by
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    Approved by
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Name</td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                </tr>
                <tr>
                  <td colSpan="2">Signature & Date</td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                </tr>

                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="11"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="DAILY PRODUCTION REPORT - SPUNLACE"
          formatNo="PH-PRD02/F-006"
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
              onClick={handleBack}
              shape="round"
              icon={<GoArrowLeft color="#00308F" />}
            >
              Back
            </Button>,
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginRight: "10px",
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
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "16px",
          }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="Medium"
            format="DD/MM/YYYY"
            value={newDate}
            style={{
              fontWeight: "bold",
              width: "135px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
            onChange={(e) => setNewDate(e.target.value)}
            max={getCurrentDate()}
          />

          <Select
            showSearch
            value={shift}
            onChange={handleShiftChange}
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              margin: "10px",
              marginLeft: "70px",
              width: "200px", // Adjust the width as needed
            }}
            placeholder="Shift"
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

          <Select
            showSearch
            placeholder="Order No"
            id="ph-select"
            options={orderNoPayload}
            onChange={phOnChange}
            value={OrderNo}
            size="medium"
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              margin: "10px",

              width: "200px", // Adjust the width as needed
            }}
          />

          <Button
            type="primary"
            style={{
              backgroundColor: OrderNo ? "#E5EEF9" : "#f5f5f5",
              color: "#00308F",
              fontWeight: "bold",
              backgroundColor: "#E5EEF9",
              margin: "10px",
              marginLeft: "10px",
            }}
            shape="round"
            icon={<BiNavigation color={"#00308F"} />}
            onClick={goTo}
          >
            Go To
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={ContaminationData} />

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
            disabled={isButtonDisabled}
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
            showSearch
            value={shiftPrint}
            onChange={(value) => {
              setShiftPrint(value);
            }}
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
            onChange={fetchOrderbasedHeadersPrint}
            style={{ width: "50%" }}
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
        </div>
      </Modal>
    </div>
  );
};

export default Spunlace_f06_summary;
