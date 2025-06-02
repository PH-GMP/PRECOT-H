/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import {
  Table,
  Modal,
  Select,
  Descriptions,
  Menu,
  Avatar,
  Drawer,
  notification,
} from "antd";
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

const Spunlace_f11_summary = () => {
  const initial = useRef(false);
  const [getImageQA, setGetImageQA] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [newDate, setNewDate] = useState("");
  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [getData, setGetData] = useState([]);
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
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [reason, setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const { Option } = Select;

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const formatDates = (dateStr) => {
    // Check if the date is already in the format dd/MM/yyyy
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const formattedDatesupervisor = formatDates(
    printresponseData.supervisor_submit_on
  );
  const formatedqa = formatDates(printresponseData.qa_submit_on);
  const formattedDateHod = formatDates(printresponseData.hod_submit_on);

  const fetchOrderbasedHeadersPrint = (value) => {
    setOrderNumberPrint(value);
    const parsedDate = moment(date, "DD/MM/YYYY"); // Parse the date
    const dateformat = parsedDate.format("YYYY-MM-DD");
    axios
      .get(
        `${ API.prodUrl}/Precot/api/spunlace/Service/ProductChangeOverCheckList/findByDateShiftOrderNoPrintApi?date=${datePrint}&shift=${shiftPrint}&orderNo=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("responsive print", res.data.length);
        if (
          res.data &&
          (res.data.length > 0 || res.data.length === undefined)
        ) {
          setPrintResponseData(res.data);
          console.log("responsive printss", res.data);
          //QA
          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.supervisor_sign}`,
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
          ////
          //sup
          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.hod_sign}`,
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
          ////
          //QA
          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.qa_sign}`,
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
              setGetImageQA(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
          ////

          if (res.data.message == "No data") {
            message.error(res.data.message);
            setShowModal(false);
          } else {
            message.success("Data Fetched Successfully");
            setShowModal(true);
            setIsFetchSuccessful(true);
          }
          // message.notification(res.data.message);
        } else {
          setPrintResponseData([]);

          return;
        }
      })
      .catch((err) => {
        setPrintResponseData([]);

        console.log("Error", err);
        notification.warning({
          message: "Notification",
          description: err.response.data.message || "An error occurred",
        });
        navigate("Precot/choosenScreen");
      });
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
        console.log("Shift Lov ", shiftOptions);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

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
    navigate("/Precot/Spunlace/F-11", {
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
    setIsFetchSuccessful(false);
    setDatePrint(null);
    setShiftPrint(null);
    setOrderNumberPrint(null);
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

  const phOnChange = (Data) => {
    console.log(
      "hh",
      orderNoPayload.filter((x, i) => {
        return Data == x.value;
      })
    );

    const a = orderNoPayload.filter((x, i) => {
      return Data == x.value;
    });
    setOrderNo(a[0].value);
    setGotobtn(false);
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

  const fetchPrintValue = (value) => {
    setShiftPrint(value);
  };

  useEffect(() => {
    const OrderNoLovPayload = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("api called orderbydate goto", newDate);
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/spulance/orders`,
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
        setOrderNumberLov(a);
        console.log("lov", a);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    OrderNoLovPayload();
  }, []);

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

  // useEffect(() => {
  //   if (printresponseData.length > 0) {
  //     window.print();
  //   }
  // }, [printresponseData]);

  // console.log("selected print date",);
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
    if (!initial.current) {
      initial.current = true;
      const fetchData = async () => {
        axios
          .get(
            `${ API.prodUrl}/Precot/api/spunlace/Service/ProductChangeOverCheckList/getSummary`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("values of res ", res.data);
            setGetData(res.data);
            setnewData(res.data);
            setmodalData(res.data);
            setContaminationData(res.data);
          })
          .catch((err) => {
            console.log("Error", err);
            notification.warning({
              message: "Notification",
              description: err.response.data.message,
            });
            // Mark the error as logged
          });
      };

      fetchData();
    }
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
    const x = newData.filter((x) => {
      return record.listId === x.listId;
    });

    if (x.length > 0) {
      const firstElement = x[0];
      console.log("x", firstElement.date);
      const dateformat = moment(firstElement.date).format("YYYY-MM-DD");
      navigate("/Precot/Spunlace/F-11", {
        state: {
          newdate: dateformat,
          shiftvalue: firstElement.shift,
          orderNo: firstElement.orderNoFrom,
        },
      });
    } else {
      console.error("No matching record found");
    }
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
      dataIndex: "orderNoFrom",
      key: "orderNoFrom",
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
      title: "QA Status",
      dataIndex: "qa_status",
      key: "qa_status",
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

  // let numberOfPages = Math.ceil(printresponseData.length / 1);

  // console.log("pr", printresponseData[0]?.date)
  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 8), Reason, ...baseColumns.slice(8)];
  } else {
    columns = baseColumns;
  }
  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (
          data.hod_status === "HOD_REJECTED" ||
          data.qa_status === "QA_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [getData]);

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
      <div id="section-to-print">
        <table style={{ scale: "90%" }}>
          <thead>
            <tr>
              <td colSpan="3" rowSpan="4">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <div style={{ textAlign: "center" }}>Unit H </div>
              </td>

              <td colSpan="11" rowSpan="4" style={{ textAlign: "center" }}>
                PRODUCT CHANGE OVER CHECK LIST SPUNLACE
              </td>
              <td colSpan={3}>Format No.:</td>
              <td colSpan={3}>PH-PRD02/F-010 </td>
            </tr>
            <tr>
              <td colSpan={3}>Revision No.:</td>
              <td colSpan={3}>01</td>
            </tr>
            <td colSpan={3}>Ref SOP No.:</td>
            <td colSpan={3}>PH-PRD02-D-03</td>
            <tr>
              <td colSpan={3}>Page NO:</td>
              <td colSpan={3}>1 of 1 </td>
            </tr>

            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={10} style={{ paddingLeft: "8px" }}>
                Date:{printresponseData.date}{" "}
              </td>
              <td colSpan={10} style={{ paddingLeft: "8px" }}>
                Shift:{printresponseData.shift}
              </td>
            </tr>

            <tr>
              <td colSpan={10} style={{ paddingLeft: "8px" }}>
                Order No From {printresponseData.orderNoFrom}{" "}
              </td>
              <td colSpan={10} style={{ paddingLeft: "8px" }}>
                Product Name {printresponseData.productName}
              </td>
            </tr>

            <tr>
              <td colSpan={4} style={{ paddingLeft: "8px" }}>
                Mixing From{" "}
              </td>
              <td colSpan={6} style={{ paddingLeft: "8px" }}>
                {printresponseData.mixingFrom}
              </td>
              <td colSpan={3} style={{ paddingLeft: "8px" }}>
                Mixing To
              </td>
              <td colSpan={7} style={{ paddingLeft: "8px" }}>
                {printresponseData.mixingTo}
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ paddingLeft: "8px" }}>
                Shaft Number
              </td>
              <td colSpan={6} style={{ paddingLeft: "8px" }}>
                {printresponseData.shaftNumber}
              </td>
              <td colSpan={3} style={{ paddingLeft: "8px" }}>
                Roll Number
              </td>
              <td colSpan={7} style={{ paddingLeft: "8px" }}>
                {printresponseData.rollNumber}
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ paddingLeft: "5px", fontSize: "14px" }}>
                For Organic: Material from All Machine Removed and Packed
              </td>
            </tr>
            <tr>
              <td colSpan={8} style={{ paddingLeft: "8px" }}>
                Machine Cleaned Thoroughly
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Yes/No
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                {printresponseData.machineCleanedThoroughly}
              </td>
            </tr>
            <tr>
              <td colSpan={8} style={{ paddingLeft: "8px" }}>
                Setting And Parameters changed
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                As Per STD Parameters
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                {printresponseData.settingAndParametersChanged}
              </td>
            </tr>
            <tr>
              <td colSpan={8} style={{ paddingLeft: "8px" }}>
                Material Mixing Changed
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Yes/No
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                {printresponseData.materialMixingChanged}
              </td>
            </tr>

            <tr>
              <td colSpan={8} style={{ paddingLeft: "8px" }}>
                Trail roll Taken and Send for QC Approval
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Yes/No
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                {printresponseData.trialRollTakenQcApproval}
              </td>
            </tr>
            <tr>
              <td colSpan={8} style={{ paddingLeft: "8px" }}>
                QC Checked And approval For Trail Run
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Yes/No
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                {printresponseData.qcCheckedApprovalTrialRun}
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ paddingLeft: "8px" }}>
                QC Report:
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ paddingLeft: "8px" }}>
                CD :
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printresponseData.qcCd}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ paddingLeft: "8px" }}>
                MD :
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printresponseData.qcMd}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ paddingLeft: "8px" }}>
                GSM :
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printresponseData.qcGsm}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ paddingLeft: "8px" }}>
                MOISTURE :
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printresponseData.qcMoisture}
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ paddingLeft: "8px" }}>
                THICKNESS :
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                {printresponseData.qcThickness}
              </td>
            </tr>

            <tr>
              <td colSpan={20}>SPUNLACE STANDARD OPERATING PARAMETERS</td>
            </tr>
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Product Name
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Pattern Top
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Pattern-Bottom
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No of Rolls x Width
              </td>
            </tr>
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                {" "}
                {printresponseData.productName}
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                {printresponseData.patternTop}
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                {printresponseData.patternBottom}
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                {printresponseData.noOfRollsWidth}
              </td>
            </tr>
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                GSM
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                MOISTURE
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                ROLL NET WT KG
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                ROLL DIA IN MM
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                ROLL LENGTH in MTRS
              </td>
            </tr>
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                {printresponseData.qcGsm}
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                {printresponseData.qcMoisture}
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                {printresponseData.rollNetWt}
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                {printresponseData.rollDia}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.rollLength}
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Bale opener{" "}
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                BO
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                WBO-1
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                WBO-2
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                ALC Cards
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                GSM
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                REITER Cards
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                GSM
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Material
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                {printresponseData.materialBO}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.materialWBO1}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.materialWBO2}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                ALC1
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.gsmAlc1}
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                R C60 1
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.gsmRc601}
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Percentage
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                {printresponseData.percentageBO}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.percentageWBO1}{" "}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.percentageWBO2}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                ALC2
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.gsmAlc2}
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                R C60 2
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.gsmRc602}
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ paddingLeft: "5px" }}>
                JETLACE SETTINGS:
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                &nbsp;
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                Vacuum in %
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                PW in PSI
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                INJ01 in Bar
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                IPA in Bar
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                INJ11 in Bar
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                INJ12 in Bar
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                INJ21 in Bar
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                STD
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                60 to 95
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                0 to 10
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                10 to 50
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                10 to 90
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                10 to 90
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                10 to 90
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                10 to 90
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                SET
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                {printresponseData.jetlaceVacuumSet}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.jetlacePwSet}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.jetlaceInj01Set}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printresponseData.jetlaceIpaSet}
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                {printresponseData.jetlaceInj11Set}
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                {printresponseData.jetlaceInj12Set}
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                {printresponseData.jetlaceInj21Set}
              </td>
            </tr>
            <tr>
              <td colSpan={20}>
                <div> Remarks:</div>
                {printresponseData.remarks}
              </td>
            </tr>
            <tr>
              <td
                colSpan="6"
                style={{
                  height: "50px",
                  textAlign: "center",
                  verticalAlign: "top",
                }}
              >
                Prod. Supervisor Sign & Date: <br />
                {printresponseData.supervisor_sign} <br />
                {formattedDatesupervisor}
                <br />
                {getImageSUP && (
                  <img src={getImageSUP} alt="logo" className="signature" />
                )}
              </td>
              <td
                colSpan="7"
                style={{
                  height: "50px",
                  textAlign: "center",
                  verticalAlign: "top",
                }}
              >
                HOD / Designee Sign & Date: <br />
                {printresponseData.hod_sign} <br />
                {formattedDateHod}
                <br />
                {getImageHOD && (
                  <img src={getImageHOD} alt="logo" className="signature" />
                )}
              </td>
              <td
                colSpan="7"
                style={{
                  height: "50px",
                  textAlign: "center",
                  verticalAlign: "top",
                }}
              >
                QA Sign & Date: <br />
                {printresponseData.qa_sign} <br />
                {formatedqa}
                <br />
                {getImageQA && (
                  <img src={getImageQA} alt="logo" className="signature" />
                )}
              </td>
            </tr>
          </tbody>
          <br />
          <tfoot>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="20"></td>
            </tr>

            <tr>
              <td colSpan="5">Particular</td>
              <td colSpan="5">Prepared By</td>
              <td colSpan="5">Reviewed By</td>
              <td colSpan="5">Approved By</td>
            </tr>

            <tr>
              <td colSpan="5">Name </td>
              <td colSpan="5"></td>
              <td colSpan="5"></td>
              <td colSpan="5"></td>
            </tr>
            <tr>
              <td colSpan="5">Signature & Date</td>
              <td colSpan="5"></td>
              <td colSpan="5"></td>
              <td colSpan="5"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="PRODUCT CHANGE OVER CHECK LIST SPUNLACE "
          formatNo="PH-PRD02/F-010"
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
            size="small"
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
            disabled={!isFetchSuccessful}
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
            Order No:
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

export default Spunlace_f11_summary;
