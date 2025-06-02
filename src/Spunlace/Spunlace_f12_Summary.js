/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Select, Descriptions, Menu, Avatar, Drawer } from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";
import { Tooltip } from "antd";
import API from "../baseUrl.json";
import { FaUserCircle } from "react-icons/fa";
import PrecotSidebar from "../Components/PrecotSidebar.js";
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

const Spunlace_f12_summary = () => {
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
  const [PHNo, setPHNo] = useState();
  const [orderNoPayload, setorderNoPayload] = useState();
  const [Supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
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
  const [reason, setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const { Option } = Select;

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const fetchOrderbasedHeadersPrint = (value) => {
    setOrderNumberPrint(value);
  };
  const printSubmit = () => {
    fetchPrintValue();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShiftPrint(null);
    setDatePrint(null);
    setOrderNumberPrint(null);
  };

  useEffect(() => {
    if (orderNumberPrint && datePrint && shiftPrint) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [orderNumberPrint, datePrint, shiftPrint]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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

    navigate("/Precot/Spunlace/F-12", {
      state: {
        newdate: date,
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
    // console.log("print screen works");
  };
  const printDateSubmit = () => {
    // checkDateExists();
    Shift();
  };
  const handleDateChange = (event) => {
    setPrintByDate(event.target.value);
  };

  const phOnChange = (Data) => {
    // console.log(
    //   "hh",
    //   orderNoPayload.filter((x, i) => {
    //     return Data == x.value;
    //   })
    // );

    const a = orderNoPayload.filter((x, i) => {
      return Data == x.value;
    });
    setOrderNo(a[0].value);
    setGotobtn(false);
  };

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
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const formattedDate = moment(datePrint, "YYYY-MM-DD").format("DD/MM/YYYY");

  // const fetchPrintValue = (value) => {
  //   try {
  //     setShiftPrint(value);
  //     axios.get(
  //       `${ API.prodUrl}/Precot/api/spulance/getSampleReportDetailsF012?order_no=${orderNumberPrint}&date=${formattedDate}&shift=${value}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       // console.log("Full response:", res.data);
  //       if (res.data && Array.isArray(res.data) && res.data.length > 0) {
  //         setPrintResponseData(res.data);
  //         // console.log("print response...............", res.data);
  //         setIsSubmitDisabled(false); // Enable the submit button
  //       } else if (res.data && res.data.message === "No data") {
  //         message.error("No data found...!");
  //         setIsSubmitDisabled(true); // Disable the submit button
  //       } else if (res.data && Array.isArray(res.data) && res.data.length === 0) {
  //         message.error("No data found...!");
  //         setIsSubmitDisabled(true); // Disable the submit button
  //       } else {
  //         message.error("Unexpected response format.");
  //         setIsSubmitDisabled(true); // Disable the submit button
  //       }
  //     })
  //     .catch((err) => {
  //       // console.log("Error", err);
  //       message.error('Error fetching data');
  //       setIsSubmitDisabled(true); // Disable the submit button in case of error
  //     });
  //   } catch (error) {
  //     console.error('Error in fetchPrintValue:', error);
  //     message.error('Error fetching data');
  //     setIsSubmitDisabled(true); // Disable the submit button in case of error
  //   }
  // };
  const fetchPrintValue = () => {
    try {
      const date = new Date(datePrint);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are 0-based, so add 1
      const year = date.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

      axios
        .get(
          `${ API.prodUrl}/Precot/api/spulance/getSampleReportDetailsF012?order_no=${orderNumberPrint}&date=${formattedDate}&shift=${shiftPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log("Full response:", res.data);
          if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            setPrintResponseData(res.data);
            setTimeout(() => {
              window.print();
            }, 3000);
            // console.log("print response...............", res.data);
            setIsSubmitDisabled(false); // Enable the submit button
          } else if (res.data && res.data.message === "No data") {
            message.error("No data found...!");
            setIsSubmitDisabled(true); // Disable the submit button
          } else if (
            res.data &&
            Array.isArray(res.data) &&
            res.data.length === 0
          ) {
            message.error("No data found...!");
            setIsSubmitDisabled(true); // Disable the submit button
          } else {
            message.error("Unexpected response format.");
            setIsSubmitDisabled(true); // Disable the submit button
          }
        })
        .catch((err) => {
          // console.log("Error", err);
          message.error("Error fetching data");
          setIsSubmitDisabled(true);
        });
    } catch (error) {
      console.error("Error in fetchPrintValue:", error);
      message.error("Error fetching data");
      setIsSubmitDisabled(true);
    }
  };

  // useEffect(() => {
  //   const OrderNoLovPayload = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(
  //         `${ API.prodUrl}/Precot/api/spulance/orders`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       // console.log("ORDER_NO", response.data);
  //       const data = response.data.map((item) => ({
  //         phNo: item.value,
  //         value: item.id,
  //       }));
  //       const a = response.data.map((x, i) => {
  //         return {
  //           value: x.value,
  //           label: x.value,
  //           date: x.date,
  //         };
  //       });
  //       setorderNoPayload(a);
  //       // console.log("lov", a);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   OrderNoLovPayload();
  // }, []);

  // useEffect(() => {
  //   const fetchOrderNumberOptions = async () => {
  //     try {
  //       const response = await fetch(
  //         `${ API.prodUrl}/Precot/api/spulance/orders`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       // console.log(data);

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
    const OrderNoLovPayload = async () => {
      let shiftparam = "";
      if (shift == "I") {
        shiftparam = "1";
      } else if (shift == "II") {
        shiftparam = "2";
      } else if (shift == "III") {
        shiftparam = "3";
      }
      try {
        const token = localStorage.getItem("token");
        console.log("api called orderbydate goto", newDate);
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/spulance/orderByDate?date=${newDate}&shift=${shiftparam}`,
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
    if (newDate && shift) {
      OrderNoLovPayload();
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
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/spulance/orderByDate?date=${datePrint}&shift=${shiftparam}`,
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
    }
  }, [printresponseData]);

  // console.log("selected print date");
  const handleprintSave = () => {
    // Handle save logic here
    setShowModal(false);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (orderNumberPrint && datePrint && shiftPrint) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [orderNumberPrint, datePrint, shiftPrint]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        let apiUrl = "";
        if (role === "ROLE_SUPERVISOR") {
          apiUrl = `${ API.prodUrl}/Precot/api/spulance/getSummarydetailsF012`;
        } else if (role === "ROLE_QC") {
          apiUrl = `${ API.prodUrl}/Precot/api/spulance/getSummarydetailsF012`;
        } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
          apiUrl = `${ API.prodUrl}/Precot/api/spulance/getSummarydetailsF012`;
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
            orderNo: item.order_no,

            productName: item.product_name,
            reason: item.reason,
            shift: item.shift,
            qc_status: item.qc_status,
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
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of ContaminationData) {
        if (
          data.hod_status === "HOD_REJECTED" ||
          data.qc_status === "QC_REJECTED"
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

  const handleEdit = (record) => {
    // console.log("recorddd", record);

    const { date, shift, orderNo } = record;

    // Navigate to the new route with the formatted date and other data
    navigate("/Precot/Spunlace/F-12", {
      state: {
        newdate: date,
        shiftvalue: shift,
        orderNo: orderNo,
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
      key: "date",
      align: "center",
      // render: (text) => formatDate(text),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      align: "center",
    },

    {
      title: "Supervisor Status",
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
      title: "QC Status",
      dataIndex: "qc_status",
      key: "qc_status",
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

  let numberOfPages = Math.ceil(printresponseData.length / 1);

  // console.log("pr", printresponseData[0]?.date);
  // const [supervisor_sign,setsupervisor_sign]=useState('');
  // const [Hod_sign,setHod_sign]=useState('');
  // const [qc_sign,setqc_sign]=useState('');
  // setsupervisor_sign(printresponseData[0].supervisor_sign);
  // setHod_sign(printresponseData[0].hod_sign);
  // setqc_sign(printresponseData[0].qc_sign);
  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (printresponseData && printresponseData.length > 0) {
      const username = printresponseData[0]?.supervisor_sign;
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
    }
  }, [printresponseData, API.prodUrl]);

  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (printresponseData && printresponseData.length > 0) {
      const username = printresponseData[0]?.qc_sign;
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
    }
  }, [printresponseData, API.prodUrl]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (printresponseData && printresponseData.length > 0) {
      const username = printresponseData[0]?.hod_sign;
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
    }
  }, [printresponseData, API.prodUrl]);

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
      <GlobalStyle />
      <div id="section-to-print">
        <table style={{ width: "95%", tableLayout: "fixed" }}>
          <thead>
            <br />
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>
            <tr>
              <td colSpan="3" rowSpan="4">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <div style={{ textAlign: "center" }}>Unit H </div>
              </td>

              <td colSpan="6" rowSpan="4" style={{ textAlign: "center" }}>
                SAMPLE REPORT
              </td>
              <td colSpan="3">Format No.:</td>
              {/* <td colSpan="3">PH-PRD02/F-012 </td> */}
              <td colSpan="3">PH-PRD02/F-011 </td>
            </tr>
            <tr>
              <td colSpan="3">Revision No.:</td>
              <td colSpan="3">01</td>
            </tr>
            <td colSpan="3">Ref SOP No.:</td>
            <td colSpan="3">PH-PRD02-D-03</td>
            <tr>
              <td colSpan="3">Page NO:</td>
              <td colSpan="3"></td>
            </tr>

            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="5">Date: {printresponseData[0]?.date}</td>
              <td colSpan="4">Shift:{printresponseData[0]?.shift} </td>
              <td colSpan="6">
                Order /Re-question No.: {printresponseData[0]?.order_no}
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                Product Name: {printresponseData[0]?.product_name}{" "}
              </td>
              <td colSpan="4">Mixing:{printresponseData[0]?.mixing} </td>
              <td colSpan="6">
                Material Code: {printresponseData[0]?.material_code}
              </td>
            </tr>
            <tr>
              <td colSpan="5">Std. Gsm : {printresponseData[0]?.std_gsm} </td>
              <td colSpan="4">
                Std. Thickness In MM: {printresponseData[0]?.std_thickness}{" "}
              </td>
              <td colSpan="3">
                Std. Moisture: {printresponseData[0]?.std_moisture}
              </td>
              <td colSpan="3">Pattern: {printresponseData[0]?.pattern}</td>
            </tr>

            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                S.No.
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Shaft No
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Roll No.
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Length in Mtrs
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Width in Mm
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Net Wt in KG
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Roll GSM
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Moisture <br /> in %
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Roll Dia <br /> in MM
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Remarks
              </td>
            </tr>

            {printresponseData[0]?.reportDetails.length > 0 ? (
              printresponseData[0]?.reportDetails.map((detail, index) => (
                <tr key={detail.detail_id || index}>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {index + 1}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.shaft_no}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.roll_no}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {detail.length}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {detail.width}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {detail.net_weight}
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    {detail.roll_gsm}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.moisture}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.roll_dai}
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

            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Superisor Sign & Date
              </td>

              <td colSpan="5" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                QC Sign & Date
              </td>
            </tr>

            <tr>
              <td
                colSpan="5"
                style={{ textAlign: "center", verticalAlign: "buttom" }}
              >
                {printresponseData[0]?.supervisor_sign}
                <br />
                {printresponseData[0]?.supervisor_submit_on
                  ? new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }).format(
                      new Date(printresponseData[0].supervisor_submit_on)
                    )
                  : ""}
                <br />
                {getImage1 && (
                  <img
                    src={getImage1}
                    alt="Supervisor Sign"
                    style={{
                      width: "22%",
                      height: "20%",
                      marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />
                )}
              </td>

              <td
                colSpan="5"
                style={{
                  height: "40px",
                  textAlign: "center",
                  verticalAlign: "buttom",
                }}
              >
                {printresponseData[0]?.hod_sign}
                <br />
                {printresponseData[0]?.hod_submit_on
                  ? new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }).format(new Date(printresponseData[0].hod_submit_on))
                  : ""}
                <br />
                {getImage2 && (
                  <img
                    src={getImage2}
                    alt="Hod Sign"
                    style={{
                      width: "30%",
                      height: "100%",
                      marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />
                )}
              </td>

              <td
                colSpan="5"
                style={{ textAlign: "center", verticalAlign: "buttom" }}
              >
                {printresponseData[0]?.qc_sign}
                <br />
                {printresponseData[0]?.qc_submit_on
                  ? new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }).format(new Date(printresponseData[0].qc_submit_on))
                  : ""}
                <br />
                {getImage3 && (
                  <img
                    src={getImage3}
                    alt="QC Sign"
                    style={{
                      width: "30%",
                      height: "50%",
                      marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />
                )}
              </td>
            </tr>
          </tbody>

          <br />

          <tfoot>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="11"></td>
            </tr>

            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Particular{" "}
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                prepared By
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Reviewed By
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Approved By
              </td>
            </tr>

            <tr>
              <td colSpan="3">Name </td>
              <td colSpan="4" style={{ textAlign: "center" }}></td>
              <td colSpan="4" style={{ textAlign: "center" }}></td>
              <td colSpan="4" style={{ textAlign: "center" }}></td>
            </tr>
            <tr>
              <td colSpan="3">Signature & Date</td>
              <td colSpan="4" style={{ textAlign: "center" }}></td>
              <td colSpan="4" style={{ textAlign: "center" }}></td>
              <td colSpan="4" style={{ textAlign: "center" }}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="SAMPLE REPORT"
          formatNo="PH-PRD02/F-011"
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
            <PrecotSidebar
              open={open}
              onClose={onClose}
              role={localStorage.getItem("role")}
            />,
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
            disabled={isSubmitDisabled}
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

export default Spunlace_f12_summary;
