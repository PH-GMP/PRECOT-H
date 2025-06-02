/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../baseUrl.json";
import {
  Table,
  Button,
  Modal,
  Select,
  Tooltip,
  Menu,
  Row,
  Avatar,
  Col,
  Drawer,
  message,
  Form,
  notification,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BleachingEdit from "./BleachingEdit";
import { BiLock, BiNavigation } from "react-icons/bi";
import BleachingHeader from "../Components/BleachingHeader";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate, IoPrint } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";

const { Option } = Select;

const Bleaching_f13_Summary = () => {
  const [availableBMRno, setAvailableBMRno] = useState([]);
  const [reason, setReason] = useState(false);
  const [availableBMRnoLov, setAvailableBMRnoLov] = useState("Select BMR No");
  const [cakingData, setCakingData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [batchno, setbatchno] = useState([]);
  const [batchnoprint, setbatchnoprint] = useState([]);
  const [batchNolist, setBatchNolist] = useState("Select Batch No");
  const [batchNolistPrint, setBatchNolistPrint] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const role = localStorage.getItem("role");
  const [messageApi, contextHolder] = message.useMessage();
  const [bmrListPrint, setBmrListPrint] = useState([]);
  const [PrintBmr, setPrintBmr] = useState(null);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [printRecord, setPrintRecord] = useState([]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [showModal, setShowModal] = useState(false);

  const [getImage, setGetImage] = useState("");

  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

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
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData?.[0]?.supervisor_sign, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

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
  }, [printResponseData?.[0]?.hod_sign, API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.qa_sign;
    if (username) {
      console.log("usernameparams", username);

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
  }, [printResponseData?.[0]?.qa_sign, API.prodUrl, token]);

  useEffect(() => {
    if (token) {
      fetchDataLOV_BMRNO();
      if (localStorage.getItem("role") === "ROLE_SUPERVISOR") {
        fetchData_getBleachingJobSupervisorSummeryF13();
      } else if (
        localStorage.getItem("role") === "ROLE_HOD" ||
        localStorage.getItem("role") === "ROLE_DESIGNEE"
      ) {
        fetchData_geBleachingJobtHodSummeryF13();
      } else if (localStorage.getItem("role") === "ROLE_QA") {
        geBleachingJobQaSummeryF13();
      }
    }
    fetchBmrOptionsPrint();
  }, [token]);
  const handleBmrChangePrint = (value) => {
    console.log("value of print bmr", value);
    setPrintBmr(value);
    fetchDatabatchByBleachPrint(value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPrintBmr(null);
    setBatchNolistPrint(null);
  };

  const printDateSubmit = () => {
    window.print();
  };

  const fetchBmrOptionsPrint = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/bleaching/summary/allBmrAndLaydownLov`,
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
        // Extract the bmr_no values into a separate array
        const bmrOptions = data.map((item) => ({
          value: item.bmr_no,
          label: item.bmr_no,
        }));
        setBmrListPrint(bmrOptions);
        console.log("new laydown", bmrListPrint);
      } else {
        console.error("API response is not an array", data);
        setBmrListPrint([]);
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
      setBmrListPrint([]);
    } finally {
      setLoading(false); // Hide loading after the response or error
    }
  };

  const fetchDatabatchByBleach = async () => {
    ///Precot/api/bleaching/summary/batchByBleach/bleachjobcard?bmr_no=(New Api)
    ///Precot/api/bleaching/summary/batchByBleach?bmr_no=(Old Api)
    try {
      setLoading(true);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/summary/batchByBleach/bleachjobcard?bmr_no=${availableBMRnoLov}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.map((laydownno) => laydownno.value);
      setbatchno(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDatabatchByBleachPrint = async (value) => {
    try {
      setLoading(true);
      console.log("inside print bmr", value);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/summary/batchByBleach?bmr_no=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.map((laydownno) => laydownno.value);
      setbatchnoprint(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData_getBleachingJobSupervisorSummeryF13 = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/getBleachingJobSupervisorSummeryF13`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const a = response.data;
      // a.reverse();
      setnewData(response.data);
      setmodalData(response.data);
      setCakingData(
        response.data.map((item) => ({
          key: item.header_id,
          formatName: item.formatName,
          formatNo: item.formatNo,
          revisionNo: item.revisionNo,
          formatDate: item.formatDate,
          remarks: item.remarks,
          unit: item.unit,
          shift: item.shift,
          startTime: item.start_time,
          endTime: item.end_time,
          headerID: item.header_id,
          status: item.status,
          mail_status: item.mail_status,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of modalData) {
        if (
          data.hod_status == "HOD_REJECTED" ||
          data.qa_status === "QA_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [modalData]);

  const handlePrintChange = (value) => {
    try {
      setBatchNolistPrint(value);
      axios
        .get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/getBmrbatchNoDetails13?bmr_no=${PrintBmr}&batchNo=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setPrintResponseData(res.data);
            console.log("laydown print value", printResponseData);
            // setPrintLaydown(value);
          } else {
            setPrintResponseData([]);
            message.error("no data found...!");
          }
        })
        .catch((err) => {
          setPrintResponseData([]);
          console.log("Error", err);
          notification.warning({
            message: "Notification",
            description: err.response.data.message,
          });
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const fetchData_geBleachingJobtHodSummeryF13 = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/geBleachingJobtHodSummeryF13`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const a = response.data;
      // a.reverse();
      setnewData(response.data);
      setmodalData(response.data);
      console.log(a);
      const datefomrat = moment(a.date).format("DD/MM/YYYY HH:mm");
      console.log("dateformat", datefomrat);
      setCakingData(
        a.map((item) => ({
          key: item.header_id,
          formatName: item.formatName,
          formatNo: item.formatNo,
          revisionNo: item.revisionNo,
          formatDate: item.formatDate,
          remarks: item.remarks,
          unit: item.unit,
          shift: item.shift,
          startTime: item.start_time,
          endTime: item.end_time,
          headerID: item.header_id,
          status: item.status,
          mail_status: item.mail_status,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const geBleachingJobQaSummeryF13 = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/geBleachingJobQaSummeryF13`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const a = response.data;
      // a.reverse();
      setnewData(response.data);
      setmodalData(response.data);
      setCakingData(
        response.data.map((item) => ({
          key: item.header_id,
          formatName: item.formatName,
          formatNo: item.formatNo,
          revisionNo: item.revisionNo,
          formatDate: item.formatDate,
          remarks: item.remarks,
          unit: item.unit,
          shift: item.shift,
          startTime: item.start_time,
          endTime: item.end_time,
          headerID: item.header_id,
          status: item.status,
          mail_status: item.mail_status,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange_getbatch = (event) => {
    setAvailableBMRnoLov(event.target.value);
  };

  const fetchDataLOV_BMRNO = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvailableBMRno(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAvailableBMRnoLovChange = (value) => {
    console.log("BMR Value", value);
    setAvailableBMRnoLov(value);
    setBatchNolist(null); // Clear the batch number list
    fetchDatabatchByBleach(); // Assuming this is an existing function to fetch data
  };
  const handleGo = async () => {
    console.log(availableBMRno, batchNolist);

    if (availableBMRnoLov == "Select BMR No") {
      message.warning("Please Select BMR");
      return;
    } else if (batchNolist == null || batchNolist == "") {
      message.warning("Please Select Batch No");
      return;
    }

    navigate("/Precot/Bleaching/F-13", {
      state: {
        subbatch: batchNolist,
        bmrnos2: availableBMRnoLov,
      },
    });
  };

  const handleViewDetails = (record) => {
    const x = newData.filter((x, i) => {
      return record.headerID === x.header_id;
    });
    setSelectedRow(x);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    console.log("wer", record);
    const x = newData.filter((x, i) => {
      return record.headerID === x.header_id;
    });
    console.log("x", x);
    navigate("/Precot/Bleaching/F-13", {
      state: {
        subbatch: record.sub_batch_no,
        bmrnos2: record.bmr_no,
      },
    });
  };

  const handleCreate = () => {
    navigate("/Precot/Bleaching/F-13");
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDates(text),
    },
    {
      title: "BMRNO",
      dataIndex: "bmr_no",
      key: "bmr_no",
      align: "center",
    },
    {
      title: "Finish",
      dataIndex: "finish",
      key: "finish",
      align: "center",
    },
    {
      title: "BATCHNO",
      dataIndex: "sub_batch_no",
      key: "sub_batch_no",
      align: "center",
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },

    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      align: "center",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      align: "center",
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "QA Inspector status",
      dataIndex: "qa_status",
      key: "qa_status",
      align: "center",
    },
    {
      title: "Hod Status ",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },

    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, x) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(x)}
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
    columns = [...baseColumns.slice(0, 11), Reason, ...baseColumns.slice(11)];
  } else {
    columns = baseColumns;
  }
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const forDate = formatDate(printResponseData?.[0]?.date);
  console.log("Date ", forDate);
  return (
    <div>
      <div id="section-to-print" style={{ padding: "5px" }}>
        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid #0000",
            padding: "5px",
            width: "95%",
            marginTop: "3%",
            scale: "97%",
          }}
        >
          <thead
            style={{
              marginTop: "10px",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            {" "}
            <br></br>
            <br></br>
            <tr>
              <td colSpan="2" rowSpan="4">
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "40px", height: "20px" }}
                  />
                </div>
                <br></br>
                <div
                  style={{ textAlign: "center", fontFamily: "Times New Roman" }}
                >
                  Unit H
                </div>
              </td>
              <td colSpan="4" rowSpan="4" style={{ textAlign: "center" }}>
                {" "}
                Bleaching Job Card{" "}
              </td>
              <td colSpan="3">Format No.:</td>
              <td colSpan="3">PH-PRD01/F-007</td>
            </tr>
            <tr>
              <td colSpan="3">Revision No.:</td>
              <td colSpan="3">01</td>
            </tr>
            <tr>
              <td colSpan="3">Ref. SOP No.:</td>
              <td colSpan="3">PH-PRD01-D-03</td>
            </tr>
            <tr>
              <td colSpan="3">Page No.:</td>
              <td colSpan="3"> 1 of 2</td>
            </tr>
          </thead>
          <tr>
            <td colSpan="18" rowSpan="2" style={{ border: "none " }}></td>
          </tr>
          <tbody>
            <tr>
              <td colSpan="2">BMR No.</td>
              <td colSpan="4">{printResponseData?.[0]?.bmr_no}</td>
              <td colSpan="3">M/c No</td>
              <td colSpan="3">{printResponseData?.[0]?.mc_no}</td>
            </tr>
            <tr>
              <td colSpan="2">Date</td>
              <td colSpan="4">{forDate}</td>
              <td colSpan="3"> Sub. Batch No.</td>
              <td colSpan="3"> {printResponseData?.[0]?.sub_batch_no}</td>
            </tr>
            <tr>
              <td colSpan="2">Shift</td>
              <td colSpan="4">{printResponseData?.[0]?.shift}</td>
              <td colSpan="3">Start Time</td>
              <td colSpan="3">{printResponseData?.[0]?.start_time}</td>
            </tr>
            <tr>
              <td colSpan="2">Finish</td>
              <td colSpan="4">{printResponseData?.[0]?.finish}</td>
              <td colSpan="3">End Time</td>
              <td colSpan="3">{printResponseData?.[0]?.end_time}</td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                Steps
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                Process Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                Chemicals Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                  // paddingLeft: "1em",
                  // paddingRight: "1em",
                }}
              >
                Activity
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  // paddingLeft: "1em",
                  // paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                Standard Time in Minutes
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                  // paddingLeft: "1em",
                  // paddingRight: "1em",
                }}
              >
                Actual Time in Minutes
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                  // paddingLeft: "1em",
                  // paddingRight: "1em",
                }}
              >
                Observations
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                1
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Pre - Wetting
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 70
                ℃, Circulation @ 70 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                {printResponseData?.[0]?.wetting}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {printResponseData?.[0]?.wetting_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                2
              </td>
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                }}
              >
                Scouring & Bleaching
              </td>
              <td
                colSpan="2"
                rowspan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Caustic Soda Flakes, Haipolene & Sarofom & Hydrogen peroxide
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 60
                ℃, Chemical transferring, Temperature raising to 110 ℃,
                Circulation @ 110 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                100 +/- 20
              </td>
              <td
                colSpan="2"
                rowSpan="8"
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                {printResponseData?.[0]?.scouring}
              </td>
              <td
                colSpan="3"
                rowspan="8"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {printResponseData?.[0]?.scouring_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                3
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 01
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 95
                ℃, Circulation @ 95 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                {printResponseData?.[0]?.hotwash_one}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :{" "}
                {printResponseData?.[0]?.hotwash_one_act_temp}
                <span style={{ fontSize: "11px" }}>℃ </span>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                4
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 02
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 90
                ℃, Circulation @ 90 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                {" "}
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                {printResponseData?.[0]?.hotwash_two}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {printResponseData?.[0]?.hotwash_two_act_temp}
                <span style={{ fontSize: "11px" }}> ℃</span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                5
              </td>
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Nutralizing Wash
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Citric Acid, Sarofom, Setilon KN or Persoftal 9490 (for Crispy
                finish Only)
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Chemical transferring,
                Temperature raising to 70 ℃, Circulation @ 70 +/- 5 ℃ and
                Draining
              </td>
              <td
                colSpan="1"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                30 +/- 6
              </td>
              <td
                colSpan="2"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                {printResponseData?.[0]?.newtralizing}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {printResponseData?.[0]?.newtralizing_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                6
              </td>
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Final/Cold Wash{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Circulation @ Normal
                temperature, Surface Activity, pH conformation and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                20 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                {printResponseData?.[0]?.final_process}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                {/* <span style={{ textAlign: "center" }}>  {print && print.newtralizing_act_temp}</span> */}
                pH actual:
                <span style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData?.[0]?.final_process_ph_temp}
                  {" (Std. 5.5 - 6.5)"}
                </span>
                <div>
                  Surface Activity actual:
                  <span>
                    {printResponseData?.[0]?.final_process_act_temp}
                    {" (Std. < 5 Sec.)"}
                  </span>
                </div>
                {/* <span style={{ textAlign: "center" }}>  

      </span> */}
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <br></br>
            {/* <br></br>
          <br></br>
          <br></br>
          <br></br>
          */}
          </tbody>
          <tfoot>
            {/* <br /> */}

            <tr>
              <td style={{ padding: "1em" }} colSpan="4">
                Particulars
              </td>
              <td style={{ padding: "1em" }} colSpan="2">
                Prepared By
              </td>
              <td style={{ padding: "1em" }} colSpan="2">
                Reviewed By
              </td>
              <td style={{ padding: "1em" }} colSpan="2">
                Approved By
              </td>
            </tr>
            <tr>
              <td style={{ padding: "1em" }} colSpan="4">
                Name
              </td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
            </tr>
            <tr>
              <td style={{ padding: "1em" }} colSpan="4">
                Signature & Date
              </td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid #0000",
            padding: "5px",
            width: "95%",
            marginTop: "3%",
          }}
        >
          <thead
            style={{
              marginTop: "10px",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            {" "}
            <br></br>
            <br></br>
            <tr>
              <td colSpan="2" rowSpan="4">
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "40px", height: "20px" }}
                  />
                </div>
                <br></br>
                <div
                  style={{ textAlign: "center", fontFamily: "Times New Roman" }}
                >
                  Unit H
                </div>
              </td>
              <td colSpan="4" rowSpan="4" style={{ textAlign: "center" }}>
                {" "}
                Bleaching Job Card{" "}
              </td>
              <td colSpan="3">Format No.:</td>
              <td colSpan="3">PH-PRD01/F-007</td>
            </tr>
            <tr>
              <td colSpan="3">Revision No.:</td>
              <td colSpan="3">01</td>
            </tr>
            <tr>
              <td colSpan="3">Ref. SOP No.:</td>
              <td colSpan="3">PH-PRD01-D-03</td>
            </tr>
            <tr>
              <td colSpan="3">Page No.:</td>
              <td colSpan="3"> 2 of 2</td>
            </tr>
          </thead>
          <br />
          <br />
          <tbody>
            <tr
              style={{
                fontSize: "14px",
                padding: "2px",
                textAlign: "center",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              <td colSpan="11">
                Chemical Consumption details (Batch Weight range 1250 ± 50 Kg)
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> Chemical Name</b>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Standards</b>
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Actual</b>
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> Unit</b>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Caustic soda Flakes</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>28-42</p>
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                }}
              >
                {printResponseData?.[0]?.caustic_soda_flakes}
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Haipolene</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>10-12</p>
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                }}
              >
                {printResponseData?.[0]?.haipolene}
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Sarofom </p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>7.0-16.0</p>
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                }}
              >
                {printResponseData?.[0]?.sarofom}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Hydrogen peroxide </p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>50-70</p>
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                }}
              >
                {printResponseData?.[0]?.hydrogen_peroxide}
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>liters</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <div>
                  {" "}
                  <p style={{ fontSize: "11px" }}>
                    <div>
                      Setilon KN:{" "}
                      {printResponseData?.[0]?.setilon_kn === "OK" ? "✓" : ""}
                    </div>
                    <div>
                      Persoftal 9490 : {printResponseData?.[0]?.persoftal}
                    </div>
                  </p>
                </div>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>1.5-3.5</p>
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                }}
              >
                {printResponseData?.[0]?.setilon_persoftal_actual}
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Citric acid</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>6.5-9.5 </p>
              </td>
              <td
                colSpan="3"
                //contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {printResponseData?.[0]?.citric_acid}
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr>
              <td colSpan="11">
                <b style={{ fontSize: "11px" }}>
                  Note: Setilon KN or Persoftal 9490 chemicals should be added
                  only for Crispy finish.
                </b>
              </td>
            </tr>

            <tr>
              <td colSpan="11">
                {" "}
                Remarks:
                {printResponseData?.[0]?.remarks}
              </td>
            </tr>

            {/* <br /> */}
            {/* <br /> */}

            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Performed by Production Supervisor
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Verified by QA
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Reviewed by HOD / Designees
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <div
                  style={{
                    fontSize: "12px !important",
                    height: "100px",
                    textAlign: "center",
                  }}
                >
                  {printResponseData?.[0]?.supervisor_sign}
                  <br></br>
                  {/* <span style={{ marginLeft: '5px', marginRight: '5px' }}> - </span> */}
                  {printResponseData?.[0]?.supervisor_submit_on &&
                    new Date(
                      printResponseData?.[0]?.supervisor_submit_on
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                  <br></br>
                  {getImage !== "" && (
                    <img
                      className="signature"
                      src={getImage}
                      alt="Supervisor"
                    />
                  )}
                  <br></br> Sign & Date
                </div>
              </td>

              <td colSpan="3">
                <div
                  style={{
                    fontSize: "12px !important",
                    height: "100px",
                    textAlign: "center",
                  }}
                >
                  {printResponseData?.[0]?.qa_sign}
                  <br></br>
                  {/* <span style={{ marginLeft: '5px', marginRight: '5px' }}> - </span> */}
                  {/* {printResponseData?.[0]?.hod_submit_on &&
                  new Date(
                    printResponseData?.[0]?.hod_submit_on
                  ).formatDate("en-GB")}{" "} */}
                  {/* <br></br> Sign & Date */}
                  {printResponseData?.[0]?.qa_submit_on &&
                    new Date(
                      printResponseData?.[0]?.qa_submit_on
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  <br></br>
                  {getImage2 !== "" && (
                    <img className="signature" src={getImage2} alt="QA" />
                  )}
                  <br></br> Sign & Date
                </div>
              </td>
              <td colSpan="3">
                <div
                  style={{
                    fontSize: "12px !important",
                    height: "100px",
                    textAlign: "center",
                  }}
                >
                  {printResponseData?.[0]?.hod_sign}
                  {/* <span style={{ marginLeft: '5px', marginRight: '5px' }}> - </span> */}
                  <br></br>
                  {/* {printResponseData?.[0]?.hod_submit_on &&
                  new Date(
                    printResponseData?.[0]?.hod_submit_on
                  ).formatDate("en-GB")}{" "} */}
                  {/* <br></br> Sign & Date */}
                  {printResponseData?.[0]?.hod_submit_on &&
                    new Date(
                      printResponseData?.[0]?.hod_submit_on
                    ).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  <br></br>
                  {getImage1 !== "" && (
                    <img className="signature" src={getImage1} alt="HOD" />
                  )}
                  <br></br> Sign & Date
                </div>
              </td>
            </tr>
          </tbody>
          <br />
          <br />
          <tfoot>
            {/* <br /> */}

            <tr>
              <td style={{ padding: "1em" }} colSpan="4">
                Particulars
              </td>
              <td style={{ padding: "1em" }} colSpan="2">
                Prepared By
              </td>
              <td style={{ padding: "1em" }} colSpan="2">
                Reviewed By
              </td>
              <td style={{ padding: "1em" }} colSpan="2">
                Approved By
              </td>
            </tr>
            <tr>
              <td style={{ padding: "1em" }} colSpan="4">
                Name
              </td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
            </tr>
            <tr>
              <td style={{ padding: "1em" }} colSpan="4">
                Signature & Date
              </td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
              <td style={{ padding: "1em" }} colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
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

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            role === "ROLE_QA"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Chemical Issue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
          }
        />
      </Drawer>
      <BleachingHeader
        unit="Unit-H"
        formName="BLEACHING JOB CARD "
        formatNo="PH-PRD01/F-007"
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
            key="create"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            style={{
              marginRight: "12px",
              display:
                localStorage.getItem("role") === "OPERATOR" ? "block" : "none",
            }}
            type="primary"
          >
            Create
          </Button>,
          <Button
            key="back"
            // icon={<LeftOutlined />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            type="primary"
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
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select BMR No :
          </div>
          <Select
            style={{ width: "150px" }}
            placeholder="Select BMR No"
            showSearch
            value={availableBMRnoLov}
            onChange={handleAvailableBMRnoLovChange}
            onBlur={fetchDatabatchByBleach}
          >
            {availableBMRno.map((Bmrnolist, index) => (
              <Option key={index} value={Bmrnolist.BMR_NO}>
                {Bmrnolist.BMR_NO}
              </Option>
            ))}
          </Select>
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Batch No :
          </div>
          <Select
            style={{ width: "150px" }}
            placeholder="Select Batch No"
            value={batchNolist}
            onChange={setBatchNolist}
            showSearch
          >
            {batchno.map((MacLOV, index) => (
              <Option key={index} value={MacLOV}>
                {MacLOV}
              </Option>
            ))}
          </Select>
          <Button
            key="go"
            onClick={handleGo}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiNavigation color="#00308F" />}
            type="primary"
          >
            Go To
          </Button>
        </div>
        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={modalData}
        />
        <Modal
          title="Print"
          open={showModal}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          destroyOnClose={true}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={printDateSubmit}
              disabled={!batchNolistPrint || loading}
              loading={loading}
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
            <label style={{ marginRight: "8px" }}>BMR Number:</label>
            <Select
              style={{ width: "200px" }}
              placeholder="Select BMR No"
              value={PrintBmr}
              onChange={handleBmrChangePrint}
              showSearch
            >
              {bmrListPrint.map((Bmrnolist, index) => (
                <Option key={index} value={Bmrnolist.value}>
                  {Bmrnolist.label}
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
            <label style={{ marginRight: "8px" }}>Batch Number:</label>
            <Select
              style={{ width: "200px" }}
              placeholder="Select Batch No"
              value={batchNolistPrint}
              onChange={handlePrintChange}
              showSearch
            >
              {batchnoprint.map((MacLOV, index) => (
                <Option key={index} value={MacLOV}>
                  {MacLOV}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Bleaching_f13_Summary;
