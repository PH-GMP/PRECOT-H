/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table, Modal, Select, Descriptions, Menu, Avatar, Drawer } from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import { Tooltip } from "antd";
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
const Spunlace_f17_summary = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
      margin: 0;
    }
   .page-break {
        page-break-after: always;
    }
    body {
      margin: 0;
      padding: 0;
      overflow: hidden; /* Prevent any scrolling */
      -webkit-print-color-adjust: exact;
    }

  
   
  }
`;

  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [newDate, setNewDate] = useState("");
  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [orderDetails, SetOrderDetails] = useState([]);
  const [orderDetails_sliterWinderLeft, SetOrderDetails_sliterWinderLeft] =
    useState([]);
  const [ContaminationData, setContaminationData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [PHNo, setPHNo] = useState();
  const [dateformat_op, setdateformat_op] = useState();
  const [dateformat_supervisor, setdateformat_supervisor] = useState();
  const [dateformat_hod, setdateformat_hod] = useState();
  const [orderNoPayload, setorderNoPayload] = useState();
  const [Supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
  const [printresponseData2, setPrintResponseData2] = useState([]);
  const [printresponseData, setPrintResponseData] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [gotobtn, setGotobtn] = useState(true);
  const [OrderNo, setOrderNo] = useState();
  const [orderNumberPrint, setOrderNumberPrint] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [datePrint, setDatePrint] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const [shiftPrintdis, setShiftPrintdis] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const [dateprint, setdateprint] = useState("");
  const [opsignprint, setopsignprint] = useState("");
  const [hodsignprint, sethodsignprint] = useState("");
  const [supsignprint, setsupsignprint] = useState("");
  const [productname, setproductname] = useState("");
  const [materialCode, setmaterialCode] = useState("");
  const [pattern, setpattern] = useState("");
  const [stdGsm, setstdGsm] = useState("");
  const { Option } = Select;
  const [remarks, setRemarks] = useState([]);
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const fetchPrintdata = async (value) => {
    try {
      const token = localStorage.getItem("token");
      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/getByDateShiftOrderNoPrintApi?orderNo=${value}&date=${datePrint}&shift=${shiftPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("sliderwindow", response.data.sliterWinderDetails);
          if (
            Array.isArray(response.data.sliterWinderDetails) &&
            response.data.sliterWinderDetails.length > 0
          ) {
            const newRemarks = response.data.sliterWinderDetails.map(
              (detail) => detail.remarks
            );
            console.log("values remarks", newRemarks);
            setRemarks(newRemarks);
            console.log("values remar33", remarks);
            const dateformat = moment(response.date).format("DD/MM/YYYY");
            const dateformat_op = moment(response.operator_submitted_on).format(
              "DD/MM/YYYY HH:mm"
            );
            const dateformat_supervisor = moment(
              response.supervisor_submit_on
            ).format("DD/MM/YYYY HH:mm");
            const dateformat_hod = moment(response.hod_submit_on).format(
              "DD/MM/YYYY HH:mm"
            );
            setdateformat_op(dateformat_op);
            setdateformat_supervisor(dateformat_supervisor);
            setdateformat_hod(dateformat_hod);
            setdateprint(dateformat);
            setproductname(response.data.productName);
            setmaterialCode(response.data.materialCode);
            setpattern(response.data.pattern);
            setstdGsm(response.data.stdGsm);
            setPrintResponseData2(response.data);
            console.log("values", response.data);
            setopsignprint(response.data.operator_sign);
            setsupsignprint(response.data.supervisor_sign);
            sethodsignprint(response.data.hod_sign);
          }
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data.operator_sign}`,
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
              setGetImageOP(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data.supervisor_sign}`,
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
              setGetImageSUP(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data.hod_sign}`,
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
              setGetImageHOD(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchOrderbasedHeadersPrint = (value) => {
    setOrderNumberPrint(value);
    fetchPrintdata(value);
    const numberShift = convertShiftValue(shiftPrint);
    try {
      const token = localStorage.getItem("token");
      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/roleGoodDetails?order=${value}&date=${datePrint}&shift=${numberShift}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const { sliterWinder, sliterWinderLeft } = response.data;
          console.log("response shift", sliterWinder);
          if (Array.isArray(sliterWinder) && sliterWinder.length > 0) {
            message.success("Data Fetched Successfully..");
            SetOrderDetails(sliterWinder);
            setShiftPrintdis(true);
          } else {
            message.error("No Records Found..");
            setOrderNumberPrint(null);
            setDatePrint(null);
            setShiftPrint(null);
            setShiftPrintdis(false);
            return;
            console.log("sliterWinder is empty or not an array");
          }

          if (Array.isArray(sliterWinderLeft) && sliterWinderLeft.length > 0) {
            SetOrderDetails_sliterWinderLeft(sliterWinderLeft);
          } else {
            console.log("sliterWinderLeft is empty or not an array");
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const printSubmit = () => {
    window.print();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShiftPrint(null);
    setDatePrint(null);
    setOrderNumberPrint(null);
  };

  const handleShiftChange = (value) => {
    console.log(" Shift ", value);
    setShift(value);
    setGotobtn(false);
  };

  const goTo = () => {
    if (!shift || !OrderNo || !newDate) {
      message.warning("Please select Shift, OrderNo, and Date");
      return;
    }
    navigate("/Precot/Spunlace/F-17", {
      state: {
        newdate: newDate,
        shiftvalue: shift,
        orderNo: OrderNo,
      },
    });
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role = userRole;

  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };
  const printDateSubmit = () => {
    // checkDateExists();
    Shift();
  };
  const handleDateChange = (event) => {
    setPrintByDate(event.target.value);
  };

  const phOnChange = (value) => {
    setOrderNo(value);
    setGotobtn(false);
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          { headers }
        );
        setShiftOptions(response.data);
        console.log("Shift Lov ", shiftOptions);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);
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

  const fetchPrintValue = (value) => {
    try {
      setShiftPrint(value);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/getSampleReportDetailsF012?order_no=${orderNumberPrint}&date=${datePrint}&shift=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("Full response:", res.data);
          if (res.data) {
            setPrintResponseData(res.data);
            console.log("print response...............", res.data);
          } else {
            message.error("No data found...!");
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in fetchPrintValue:", error);
    }
  };

  useEffect(() => {
    const OrderNoLovPayload = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/spulance/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("ORDER_NO", response.data);
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
        console.log("lov", a);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    OrderNoLovPayload();
  }, []);

  // useEffect(() => {
  //   const fetchOrderNumberOptions = async () => {
  //     try {
  //       const response = await fetch(
  //         `${API.prodUrl}/Precot/api/spulance/OrderLovsliterwinder`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       console.log(data);

  //       if (Array.isArray(data)) {
  //         setOrderNumberLov(data);
  //       } else {
  //         console.error("API response is not an array", data);
  //         setOrderNumberLov([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching BMR options:", error);
  //       setOrderNumberLov([]);
  //     }
  //   };

  //   fetchOrderNumberOptions();
  // }, [token]);

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      let shiftparam = "";
      if (shift == "I") {
        shiftparam = "1";
      } else if (shift == "II") {
        shiftparam = "2";
      } else if (shift == "III") {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/sliterWinderOrderByDate?date=${newDate}&shift=${shiftparam}`,
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
          const trimmedData = data.map((item) => item.value.trim());
          // console.loglog("Trimmed Order Numbers:", trimmedData);
          setOrderNumberLov(trimmedData);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };

    if (newDate && shift) {
      fetchOrderNumberOptions();
    }
  }, [newDate, shift]);

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      let shiftparam = "";
      if (shiftPrint == "I") {
        shiftparam = "1";
      } else if (shiftPrint == "II") {
        shiftparam = "2";
      } else if (shiftPrint == "III") {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/sliterWinderOrderByDate?date=${datePrint}&shift=${shiftparam}`,
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
          const trimmedData = data.map((item) => item.value.trim());
          // console.loglog("Trimmed Order Numbers:", trimmedData);
          setOrderNumberLov(trimmedData);
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
      fetchOrderNumberOptions();
    }
  }, [datePrint, shiftPrint]);

  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
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

  const Shift = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  useEffect(() => {
    if (printresponseData.length > 0) {
      window.print();
    }
  }, [printresponseData]);

  console.log("selected print date");
  const handleprintSave = () => {
    // Handle save logic here
    setShowModal(false);
  };

  // useEffect(() => {
  //   if (token) {
  //     fetchData();
  //   }
  // }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        let apiUrl = "";
        apiUrl = `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/getSummary`;
        // if (role === "ROLE_SUPERVISOR") {
        //   apiUrl = `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/getSummary`;
        // } else if (role === "ROLE_QC" ) {
        //   apiUrl = `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/getSummary`;
        // }
        // else if (role === "ROLE_HOD" ||role === "ROLE_DESIGNEE" ) {
        //   apiUrl = `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/getSummary`;
        // } else {
        //   throw new Error("Role not found in localStorage.");
        // }

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

        console.log("Fetched data:", data);

        if (!data || !Array.isArray(data)) {
          throw new Error("Data is not an array or undefined");
        }

        setnewData(data);
        setmodalData(data);
        setContaminationData(data);
        // setContaminationData(
        //   data.map((item) => ({
        //     key: item.header_id, // Assuming header_id is unique
        //     formatName: item.formatName,
        //     formatNo: item.formatNo,
        //     revisionNo: item.revisionNo,
        //     date: item.date,
        //     orderNo:item.orderNo,

        //     productName:item.productName,

        //     shift:item.shift,

        //     status: item.status,
        //     hod_status: item.hod_status,
        //     supervisor_status: item.supervisor_status,
        //     mailstatus: item.mail_status,
        //   }))
        // );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Precot");
  };

  useEffect(() => {
    console.log("modal", modalData);
  }, [modalData]);

  const handleEdit = (record) => {
    console.log("wer", record);

    const dateformat = moment(record.date).format("YYYY-MM-DD");
    navigate("/Precot/Spunlace/F-17", {
      state: {
        newdate: dateformat,
        shiftvalue: record.shift,
        orderNo: record.orderNo,
      },
    });
  };

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

  const handleCreate = () => {
    navigate("/Precot/ContaminationCheck");
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

  const commonColumns = [
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
      key: "date",
      align: "center",
      render: (text) => formatDate(text),
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
      title: "Supervisor  Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (text) => (
        <div style={{ padding: "8px", textAlign: "center" }}>{text}</div>
      ),
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

  let columns;

  let numberOfPages = Math.ceil(printresponseData.length / 1);

  console.log("pr", printresponseData2.date);
  const recordsPerPage = 8;
  const paginatedOrderDetails = paginateData(orderDetails, recordsPerPage);

  return (
    <div>
      {contextHolder}
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
      </Drawer>
      <div>
        {" "}
        <GlobalStyle />
        <div id="section-to-print">
          <div>
            {paginatedOrderDetails.map((pageData, pageIndex) => (
              <div key={pageIndex} className="page">
                {/* Header with Page Number */}
                <table style={{ marginTop: "10px", scale: "90%" }}>
                  <thead>
                    <tr style={{ border: "none" }}>
                      <td style={{ border: "none" }} colSpan="28"></td>
                    </tr>
                    <tr>
                      <td colSpan="4" rowSpan="4">
                        <img
                          src={logo}
                          alt="Logo"
                          style={{ width: "100px", height: "auto" }}
                        />
                        <div style={{ textAlign: "center" }}>Unit H</div>
                      </td>
                      <td
                        colSpan="12"
                        rowSpan="4"
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.2em",
                        }}
                      >
                        SHIFT WISE DAILY SLITER WINDER PRODUCTION REPORT
                      </td>
                      <td colSpan="5" style={{ fontWeight: "bold" }}>
                        Format No.:
                      </td>
                      <td colSpan="7">PH-PRD02/F-016</td>
                    </tr>
                    <tr>
                      <td colSpan="5" style={{ fontWeight: "bold" }}>
                        Revision No.:
                      </td>
                      <td colSpan="7">01</td>
                    </tr>
                    <tr>
                      <td colSpan="5" style={{ fontWeight: "bold" }}>
                        Ref SOP No.:
                      </td>
                      <td colSpan="7">PH-PRD02-D-03</td>
                    </tr>
                    <tr>
                      <td colSpan="5" style={{ fontWeight: "bold" }}>
                        Page NO.:
                      </td>
                      <td colSpan="7">
                        {pageIndex + 1} of {paginatedOrderDetails.length}
                      </td>
                    </tr>
                    <tr style={{ border: "none" }}>
                      <td style={{ border: "none" }} colSpan="28"></td>
                    </tr>
                    {pageIndex === 0 && (
                      <>
                        <tr>
                          <td colSpan="10" style={{ fontWeight: "bold" }}>
                            Date: {dateprint}
                          </td>
                          <td colSpan="8" style={{ fontWeight: "bold" }}>
                            Shift: {shiftPrint}
                          </td>
                          <td colSpan="10" style={{ fontWeight: "bold" }}>
                            Order /Re-question No: {orderNumberPrint}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="14" style={{ fontWeight: "bold" }}>
                            Product Name: {productname}
                          </td>
                          <td colSpan="14" style={{ fontWeight: "bold" }}>
                            Material Code: {materialCode}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="14" style={{ fontWeight: "bold" }}>
                            Std Gsm: {stdGsm}
                          </td>
                          <td colSpan="14" style={{ fontWeight: "bold" }}>
                            Pattern: {pattern}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <th
                        colSpan={13}
                        style={{
                          textAlign: "center",
                          // backgroundColor: "#f0f0f0",
                        }}
                      >
                        SPUNLACE SHAFT/ROLL DETAILS
                      </th>
                      <th
                        colSpan={15}
                        style={{
                          textAlign: "center",
                          // backgroundColor: "#f0f0f0",
                        }}
                      >
                        SLITER WINDER
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="1" style={{ textAlign: "center" }}>
                        S.No.
                      </th>
                      <th colSpan="3" style={{ textAlign: "center" }}>
                        SHAFT NO
                      </th>
                      <th colSpan="3" style={{ textAlign: "center" }}>
                        ROLL NO
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        ROLL WEIGHT IN KG
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        ROLL WIDTH IN MM
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        ROLL LENGTH IN MTRS
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        ROLL NO
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        ROLL LENGTH IN MTRS
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        SINGLE ROLL WEIGHT IN KG
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        NO OF ROLLS SLITED
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        TOTAL WEIGHT IN KG
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        SIDE TRIM WASTE IN KG
                      </th>
                      <th colSpan="3" style={{ textAlign: "center" }}>
                        REMARKS
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Map over the data for the current page */}
                    {pageData.map((order, index) => {
                      const uniqueShaftIDs = [
                        ...new Set(orderDetails.map((item) => item.ShaftID)),
                      ];
                      const shaftIndex = uniqueShaftIDs.indexOf(order.ShaftID);
                      const sliterWinderLeftData =
                        orderDetails_sliterWinderLeft[shaftIndex] || {};

                      return (
                        <tr key={index}>
                          {/* Table row content */}
                          <td colSpan="1" style={{ textAlign: "center" }}>
                            {index + 1 + pageIndex * recordsPerPage}
                          </td>
                          <td colSpan="3" style={{ textAlign: "center" }}>
                            {order.ShaftID || "NA"}
                          </td>
                          <td colSpan="3" style={{ textAlign: "center" }}>
                            {sliterWinderLeftData.BaleCount || "NA"}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {sliterWinderLeftData.TotalGrsWt || "NA"}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {sliterWinderLeftData.TotalTWid || "NA"}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {sliterWinderLeftData.TotalPLen || "NA"}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {order.BaleNo || "NA"}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {order.PLen || "NA"}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {order.GrsWt || "NA"}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {order.BaleCount || "NA"}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {order.PWid || "NA"}
                          </td>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {order.GrsWt || "NA"}
                          </td>
                          <td>
                            {remarks[index + pageIndex * recordsPerPage] ||
                              "NA"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    {pageIndex === paginatedOrderDetails.length - 1 && (
                      <>
                        <tr>
                          <td
                            colSpan="8"
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Operator Sign & Date
                          </td>
                          <td
                            colSpan="12"
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Production Supervisor Sign & Date
                          </td>
                          <td
                            colSpan="8"
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            HOD / Designee Sign & Date
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="8"
                            style={{
                              textAlign: "center",
                              verticalAlign: "bottom",
                            }}
                          >
                            {printresponseData2.operator_sign}
                            <br />
                            {dateformat_op}
                            <br />
                            {getImageOP && (
                              <img
                                src={getImageOP}
                                alt="Operator Signature"
                                style={{ width: "100px", height: "auto" }}
                              />
                            )}
                          </td>
                          <td
                            colSpan="12"
                            style={{
                              textAlign: "center",
                              verticalAlign: "bottom",
                            }}
                          >
                            {printresponseData2.supervisor_sign}
                            <br />
                            {dateformat_supervisor}
                            <br />
                            {getImageSUP && (
                              <img
                                src={getImageSUP}
                                alt="Supervisor Signature"
                                style={{ width: "100px", height: "auto" }}
                              />
                            )}
                          </td>
                          <td
                            colSpan="8"
                            style={{
                              textAlign: "center",
                              verticalAlign: "bottom",
                            }}
                          >
                            {printresponseData2.hod_sign}
                            <br />
                            {dateformat_hod}
                            <br />
                            {getImageHOD && (
                              <img
                                src={getImageHOD}
                                alt="HOD Signature"
                                style={{ width: "100px", height: "auto" }}
                              />
                            )}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr style={{ border: "none" }}>
                      <td style={{ border: "none" }} colSpan="28"></td>
                    </tr>
                    <tr>
                      <td colSpan="7" style={{ fontWeight: "bold" }}>
                        Particular
                      </td>
                      <td colSpan="7" style={{ fontWeight: "bold" }}>
                        Prepared By
                      </td>
                      <td colSpan="7" style={{ fontWeight: "bold" }}>
                        Reviewed By
                      </td>
                      <td colSpan="7" style={{ fontWeight: "bold" }}>
                        Approved By
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="7" style={{ fontWeight: "bold" }}>
                        Name
                      </td>
                      <td colSpan="7"></td>
                      <td colSpan="7"></td>
                      <td colSpan="7"></td>
                    </tr>
                    <tr>
                      <td colSpan="7" style={{ fontWeight: "bold" }}>
                        Signature & Date
                      </td>
                      <td colSpan="7"></td>
                      <td colSpan="7"></td>
                      <td colSpan="7"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="SHIFT WISE DAILY SLITER WINDER PRODUCTION REPORT"
          formatNo="PH-PRD02/F-016"
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
            value={shift}
            onChange={handleShiftChange}
            placeholder="Shift"
            size="medium"
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              margin: "10px",
              marginLeft: "70px",
              width: "200px", // Adjust the width as needed
            }}
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          >
            {shiftOptions.map((shift) => (
              <Option key={shift.id} value={shift.value}>
                {shift.value}
              </Option>
            ))}
          </Select>

          <Select
            showSearch
            placeholder="Order No"
            id="ph-select"
            onChange={phOnChange}
            value={OrderNo}
            size="medium"
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              margin: "10px",

              width: "200px", // Adjust the width as needed
            }}
          >
            <Select.Option value="" disabled selected>
              Select Order Number
            </Select.Option>
            {orderNumberLov.length > 0 ? (
              orderNumberLov.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))
            ) : (
              <Select.Option value="" disabled>
                No options available
              </Select.Option>
            )}
          </Select>

          <Button
            type="primary"
            style={{
              color: "#00308F",
              fontWeight: "bold",
              backgroundColor: "#E5EEF9",
              margin: "10px",
              marginLeft: "10px",
            }}
            shape="round"
            icon={<BiNavigation color={"#00308F"} />}
            onClick={goTo}
            //disabled={!shift || !OrderNo || !newDate}
          >
            Go To
          </Button>
        </div>
      </div>

      <Table columns={commonColumns} dataSource={ContaminationData} />

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
            disabled={!shiftPrintdis}
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
            onChange={fetchPrintValue}
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
            {orderNumberLov.length > 0 ? (
              orderNumberLov.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))
            ) : (
              <Select.Option value="" disabled>
                No options available
              </Select.Option>
            )}
          </Select>
          {/* <Select.Option value="" disabled selected>
                    Select Order Number
                    </Select.Option>
                    {orderNumberLov.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                    {option.value}
                    </Select.Option>
                 ))} */}
          {/* </Select> */}
        </div>
      </Modal>
    </div>
  );
};
const paginateData = (data, recordsPerPage) => {
  const totalPages = Math.ceil(data.length / recordsPerPage);
  const paginatedData = Array.from({ length: totalPages }, (v, i) =>
    data.slice(i * recordsPerPage, (i + 1) * recordsPerPage)
  );
  return paginatedData;
};
export default Spunlace_f17_summary;
