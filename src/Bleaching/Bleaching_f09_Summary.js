/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Menu,
  Row,
  Select,
  Table,
  Tooltip,
  message,
  Input,
  Modal,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  BiBorderLeft,
  BiBorderNone,
  BiBorderRight,
  BiLock,
  BiNavigation,
} from "react-icons/bi";
import BleachingTail from "../Components/BleachingTail.js";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { GrAdd } from "react-icons/gr";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import "../index.css";
import moment from "moment";

const Bleaching_f09_Summary = () => {
  const [equipUsageLogBook, setEquipUsageLogBook] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [newData, setNewData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [rows, setRows] = useState();
  const token = localStorage.getItem("token");
  const [bmrNo, setBmrNo] = useState("");
  const [reason, setReason] = useState(false);
  const navigate = useNavigate();
  const [bmrOptions, setBmrOptions] = useState([]);
  const [subBatchOptions, setSubBatchOptions] = useState([]);
  const decodedToken = jwtDecode(token);
  const [showButton, setShowButton] = useState(false);
  const userRole = decodedToken.role;
  const role = localStorage.getItem("role");
  const [bmr, setBmr] = useState("");
  const [bmrNoModal, setBmrNoModal] = useState("");
  const [subBatchNo, setSubBatchNo] = useState("");
  const [subBatchNoInput, setSubBatchNoInput] = useState("");
  const [printRecord, setPrintRecord] = useState([]);
  const [fromBmr, setFromBmr] = useState("");
  const [toBmr, setToBmr] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [priviousSubBatchRes, setpriviousSubBatchRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage, setGetImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleSubBatchInputChange = (e) => {
    const value = e.target.value;
    setSubBatchNoInput(value);
    // console.log("input " + value);
    setSubBatchNo(value);

    // console.log("subBatch " + value);
  };

  const formatDateP = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleOk = () => {
    // if(priviousSubBatchRes == subBatchNo && previousBmr != bmrNoModal){
    //   message.warning('Sub batch no already exist');
    //   return;
    // }
    // if (!bmrNoModal && !subBatchNo) {
    //   message.warning("BMR No and Sub Batch No are required.");
    //   return;
    // }
    if (!bmrNoModal) {
      message.warning("BMR No required.");
      return;
    }
    setIsModalOpen(false);
    setBmrNo(bmrNoModal);
    setSubBatchNo(subBatchNoInput);

    navigate(`/Precot/Bleaching/F-09`, {
      state: {
        bmrNoParam: bmrNoModal,
        subBatchNoParam: subBatchNoInput,
      },
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePrintCancel = () => {
    setIsModalPrint(false);
  };

  const [allbmrOptions, setallBmrOptions] = useState([]);
  useEffect(() => {
    const fetchAllBmrOptions = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/summary/fetchApprovedBMR?formNumber=PH-PRD01/F09`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        setallBmrOptions(options);
      } catch (error) {
        console.error("Error fetching BMR options:", error);
      }
    };

    fetchAllBmrOptions();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (userRole === "ROLE_SUPERVISOR") {
          response = await axios.get(
            `${API.prodUrl}/Precot/api/bleach/bleachequipmentusagelogbookf09SummaryForSupervisor`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (userRole === "ROLE_HOD" || userRole == "ROLE_DESIGNEE") {
          response = await axios.get(
            `${API.prodUrl}/Precot/api/bleach/bleachequipmentusagelogbookf09SummaryForHod`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        if (response.data && response.data.length !== 0) {
          setReason(true);
        } else {
          setReason(false);
        }

        // console.log(response.data, "Api Response");
        setNewData(response.data);
        // console.log("Get Api :", newData);
        setModalData(response.data);
        // console.log("Response data", response.data);
        setEquipUsageLogBook(
          response.data.map((item) => ({
            key: item.id,
            id: item.id,
            formatName: item.formatName,
            formatNo: item.formatNo,
            revisionNo: item.revisionNo,
            refSopNo: item.refSopNo,
            status: item.status,
            mailStatus: item.mailStatus,
            unit: item.unit,
            bmrNo: item.bmrNo,
            reason: item.reason,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userRole, token]);

  useEffect(() => {
    const findReason = () => {
      for (const data of newData) {
        if (data.hod_status == "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [newData]);

  const handleViewDetails = (record) => {
    const selected = newData.find((item) => item.id === record.id);
    setSelectedRow(selected);
    setNewStatus(selected.status);
    setModalData(selected);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    const encodedBmrNo = encodeURIComponent(record.bmrNumber);
    const encodedSubBatchNo = encodeURIComponent(record.subbatch_no);

    const decodedBmrNo = decodeURIComponent(encodedBmrNo);
    // console.log(decodedBmrNo);
    setBmrNo(decodedBmrNo);
    // console.log("record",record)
    navigate(`/Precot/Bleaching/F-09`, {
      state: {
        bmrNoParam: record.bmrNumber,
        subBatchNoParam: record.subbatch_no,
      },
    });
  };

  useEffect(() => {
    const fetchBmrOptions = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("BMR Options:", response.data); // Log the response data
        const options = response.data.map((option) => ({
          value: option.BMR_NO, // assuming value is the correct field for the value
          label: option.BMR_NO, // using value as label for display
        }));
        // console.log(response.data, "Api Response");
        setBmrOptions(options);
      } catch (error) {
        console.error("Error fetching BMR options:", error);
      }
    };

    fetchBmrOptions();
  }, [token]);
  // Include bmrSubbatch in the dependency array

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    // if (printRecord.length > 0 && getImage !== "" && getImage1 !== "" ) {
    //   // setLoading(false);
    //   window.print();
    // }
    if (
      printRecord.length > 0 &&
      (getImage !== "" || getImage === "") &&
      (getImage1 !== "" || getImage1 === "")
    ) {
      // console.log("condition second");
      window.print();
    }
  }, [printRecord, getImage, getImage1]);

  const handlePrint = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleach/bleachequipmentusagelogbookf09ByBmrRange?fromBmr=${fromBmr}&toBmr=${toBmr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        return;
      }

      // console.log("Data fetched:", response.data);

      // Transform date format in response data
      const transformedData = response.data.map((item) => {
        const transformDate = (dateString) => {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${day}/${month}/${year} ${hours}:${minutes}`;
        };
        const submittedDate = (dateString) => {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };

        return {
          ...item,
          start_date: transformDate(item.start_date),
          end_date: transformDate(item.end_date),
          supervisor_submit_on: formatDateP(item.supervisor_submit_on),
          hod_submit_on: formatDateP(item.hod_submit_on),
        };
      });

      setPrintRecord(transformedData);
    } catch (error) {
      messageApi.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchprivioussubbatchNo = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleach/getLastSubbatchNo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setpriviousSubBatchRes(response.data[0].SUBBATCH_NO);
        const [batchPart, subBatchPart] = String(
          response.data[0].SUBBATCH_NO
        ).split("/");
        const newSubBatchPart = String(Number(subBatchPart) + 1).padStart(
          4,
          "0"
        );
        setSubBatchNoInput(`${batchPart}/${newSubBatchPart}`);
      } catch (error) {
        console.error("Error fetching BMR options:", error);
      }
    };

    fetchprivioussubbatchNo();
  }, [token]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
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
      title: "BMR No",
      dataIndex: "bmrNumber",
      key: "bmrNumber",
      align: "center",
    },
    {
      title: "Sub Batch No",
      dataIndex: "subbatch_no",
      key: "subbatch_no",
      align: "center",
    },
    {
      title: "Start Date & Time",
      dataIndex: "start_date",
      key: "start_date",
      align: "center",
      render: (text) => moment(text).format("DD/MM/YYYY-HH:mm"),
    },
    {
      title: "End Date & Time",
      dataIndex: "end_date",
      key: "end_date",
      align: "center",
      render: (text) => moment(text).format("DD/MM/YYYY-HH:mm"),
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
      key: "actions",
      align: "center",
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

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printRecord?.[0]?.supervisor_sign;
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
          // setLoading(true);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
          setGetImage("");
        });
    }
  }, [printRecord,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printRecord?.[0]?.hod_sign;
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
          // setLoading(true);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
          setGetImage1("");
        });
    }
  }, [printRecord,API.prodUrl, token]);

  // console.log("get image", getImage);

  const bmrHandleChange = (value) => {
    setShowButton(true);
    setBmr(value);
    setBmrNoModal(value);
    // console.log("Selected BMR:", value);
  };
  const fromBmrHandle = (value) => {
    setShowButton(true);
    setFromBmr(value);
  };
  const toBmrHandle = (value) => {
    setShowButton(true);
    setToBmr(value);
  };
  const handleSubBatchChange = (value) => {
    setSubBatchNo(value);
  };
  const handleGo = () => {
    const encodedBmrNo = encodeURIComponent(bmr);
    navigate(`/Precot/Bleaching/F-11/${encodedBmrNo}`);
  };
  const toPrint = () => {
    window.print();
    setIsModalOpen(false);
  };

  // const entriesPerPage = 10;
  // const cakePress = [];
  // let numberOfPages = Math.ceil(printRecord.length / entriesPerPage);

  // if (printRecord || printRecord.length > 0) {
  //   for (let i = 0; i < printRecord.length; i += entriesPerPage) {
  //     cakePress.push(printRecord.slice(i, i + entriesPerPage));
  //   }
  // }

  // const recordsPerPage = 8;
  // const totalPages = Math.ceil(printRecord.length / recordsPerPage);

  // const paginateData = (data, pageNumber) => {
  //   const start = (pageNumber - 1) * recordsPerPage;
  //   return data?.slice(start, start + recordsPerPage);
  // };

  const recordsPerPage = 5;
  // const printRecord = data || []; // Ensure it's always an array

  const totalPages = Math.ceil(printRecord.length / recordsPerPage);

  const paginateData = (data, pageNumber) => {
    if (!Array.isArray(data)) {
      console.error("paginateData error: data is not an array", data);
      return []; // Return an empty array to prevent errors
    }

    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };

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
      {/* id="section-to-print" */}
      <div id="section-to-print-san" style={{}}>
        <style>
          {`
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
    `}
        </style>
        {/* {cakePress.map((bodyContent, pageIndex) => ( */}
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <table style={{ width: "90%", marginTop: "2%" }}>
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ height: "30px", padding: "2px" }}>
                <th
                  rowSpan="4"
                  style={{ textAlign: "center", padding: "2px" }}
                  colSpan="3"
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "100px",
                      height: "auto",
                      textAlign: "center",
                    }}
                  />
                  <br /> Unit H
                </th>
                <th
                  rowSpan="4"
                  style={{ textAlign: "center", padding: "2px" }}
                  colSpan="5"
                >
                  Equipment Usage Log Book - Cake Press
                </th>
                <th colSpan="2" style={{ padding: "2px" }}>
                  Format No.:
                </th>
                <th
                  style={{ border: "1px solid black", padding: "3px" }}
                  colSpan="1"
                >
                  PH-PRD01/F-006
                </th>
              </tr>
              <tr style={{ height: "30px", padding: "3px" }}>
                <th colSpan="2" style={{ padding: "3px" }}>
                  Revision No.:
                </th>
                <th
                  style={{ border: "1px solid black", padding: "3px" }}
                  colSpan="1"
                >
                  01
                </th>
              </tr>
              <tr style={{ height: "30px", padding: "2px" }}>
                <th colSpan="2" style={{ padding: "2px" }}>
                  Ref.SOP No.:
                </th>
                <th style={{ padding: "3px" }} colSpan="1">
                  PH-PRD01-D-03
                </th>
              </tr>
              <tr style={{ height: "30px", padding: "2px" }}>
                <th colSpan="2" style={{ padding: "2px" }}>
                  Page No.:
                </th>
                <th style={{ padding: "2px" }} colSpan="1">
                  {pageIndex + 1} of {totalPages}
                </th>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr>
                <th style={{ textAlign: "center", width: "50px" }}>S.No.</th>
                <th style={{ textAlign: "center" }}>BMR No.</th>
                <th style={{ textAlign: "center" }}>Mixing</th>
                <th style={{ textAlign: "center" }}>Sub Batch No.</th>
                <th style={{ textAlign: "center" }}>M/C No.</th>
                <th style={{ textAlign: "center" }}>
                  Temperature <br></br> in °C
                  <br />
                  (40 to 60)
                </th>

                <th style={{ textAlign: "center" }}>
                  Start Date & <br></br> Time
                </th>
                <th style={{ textAlign: "center" }}>
                  End Date & <br></br> Time
                </th>
                <th style={{ textAlign: "center" }}>Remarks</th>
                <th style={{ textAlign: "center" }}>
                  Performed by Prod<br></br>Supervisor
                  <br />
                  Date & Sign
                </th>
                <th style={{ textAlign: "center" }}>
                  Reviewed by HOD/ Designee
                  <br /> Date & Sign
                </th>
              </tr>
            </thead>

            <tbody>
              {paginateData(printRecord, pageIndex + 1).map((item, index) => (
                <tr key={index} style={{ height: "50px" }}>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {/* {index + 1} */}
                    {index + 1 + pageIndex * recordsPerPage}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.bmrNumber}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.mixing}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.subbatch_no}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.mc_no}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.temperature}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.start_date}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.end_date}
                  </td>
                  <td style={{ fontWeight: "normal", textAlign: "center" }}>
                    {item.remarks}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.supervisor_sign}
                    <br />
                    {item.supervisor_submit_on}
                    {getImage && (
                      <img
                        className="signature"
                        src={getImage}
                        alt="Supervisor"
                      />
                    )}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.hod_sign}
                    <br />
                    {item.hod_submit_on}
                    {getImage1 && (
                      <img className="signature" src={getImage1} alt="HOD" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="11"></td>
              </tr>

              <tr>
                <td style={{ padding: "1em" }} colspan="2">
                  Particulars
                </td>
                <td style={{ padding: "1em" }} colspan="3">
                  Prepared By
                </td>
                <td style={{ padding: "1em" }} colspan="3">
                  Reviewed By
                </td>
                <td style={{ padding: "1em" }} colspan="3">
                  Approved By
                </td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colspan="2">
                  Name
                </td>
                <td style={{ padding: "1em" }} colspan="3"></td>
                <td style={{ padding: "1em" }} colspan="3"></td>
                <td style={{ padding: "1em" }} colspan="3"></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colspan="2">
                  Signature & Date
                </td>
                <td style={{ padding: "1em" }} colspan="3"></td>
                <td style={{ padding: "1em" }} colspan="3"></td>
                <td style={{ padding: "1em" }} colspan="3"></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <div className="section-to-hide">
        <div className="bleachHeaderPrint">
          <BleachingHeader
            formName={"EQUIPMENT USAGE LOGBOOK CAKE PRESS"}
            formatNo={"PH-PRD01/F-006"}
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
                icon={<FaPrint color="#00308F" />}
                onClick={showPrintModal}
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
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <label>Select BMR : </label>
          <Select
            options={bmrOptions}
            onChange={bmrHandleChange}
            style={{
              width: "150px",
              marginLeft: 10,
              borderRadius: "40px",
              textAlign: "center",
            }}
            dropdownStyle={{
              color: "#00308F",
              textAlign: "center",
            }}
          />
          <br />
          <br />
          <label>Sub Batch No : </label>
          <input
            placeholder="Sub Batch No"
            value={subBatchNoInput}
            onChange={handleSubBatchInputChange}
            style={{ width: "150px", textAlign: "center" }}
            disabled
            className="inp-new"
          />
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiNavigation color={"#00308F"} />}
            onClick={handleOk}
          >
            Go To
          </Button>
          <Input
            addonBefore="Previous Sub Batch No"
            style={{
              width: "300px",
              textAlign: "center",
              marginLeft: "20px",
              backgroundColor: "lightgray",
            }}
            value={priviousSubBatchRes}
          />
        </div>

        <Table
          bordered
          style={{
            textAlign: "center",
          }}
          columns={columns}
          dataSource={newData}
        />
      </div>
      <Modal
        title="Equipment Usage Log Book-Cake Press (Print)"
        open={isModalPrint}
        onOk={handlePrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
      >
        <label>From BMR : </label>
        <Select
          showSearch
          options={allbmrOptions}
          onChange={fromBmrHandle}
          style={{
            width: "150px",
            marginLeft: 10,
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
        <br />
        <br />
        <label>To BMR &nbsp;&nbsp;&nbsp;&nbsp; : </label>
        <Select
          showSearch
          options={allbmrOptions}
          onChange={toBmrHandle}
          style={{
            width: "150px",
            marginLeft: 10,
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
      </Modal>
    </div>
  );
};

export default Bleaching_f09_Summary;
