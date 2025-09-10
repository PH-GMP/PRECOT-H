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
import { BiLock, BiNavigation } from "react-icons/bi";
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
const Bleaching_f11_Summary = () => {
  const [equipUsageLogBook, setEquipUsageLogBook] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [reason, setReason] = useState(false);
  const [newData, setNewData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [rows, setRows] = useState();
  const token = localStorage.getItem("token");
  const [bmrNo, setBmrNo] = useState("");
  const navigate = useNavigate();
  const [bmrOptions, setBmrOptions] = useState([]);
  const [subBatchOptions, setSubBatchOptions] = useState([]);
  const decodedToken = jwtDecode(token);
  const [showButton, setShowButton] = useState(false);
  const userRole = decodedToken.role;
  const [bmr, setBmr] = useState("");
  const [bmrNoModal, setBmrNoModal] = useState("");
  const [subBatchNo, setSubBatchNo] = useState("");
  const [bmrSubbatch, setbmrSubBatch] = useState("");
  const [printRecord, setPrintRecord] = useState([]);
  const [fromBmr, setFromBmr] = useState("");
  const [toBmr, setToBmr] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const [allbmrOptions, setallBmrOptions] = useState([]);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [getImage, setGetImage] = useState("");

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
          setLoading(true);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printRecord]);

  const [getImage1, setGetImage1] = useState("");

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
          setLoading(true);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printRecord,API.prodUrl, token]);

  useEffect(() => {
    const fetchAllBmrOptions = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/summary/allBmrAndLaydownLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("BMR Options:", response.data); // Log the response data
        const options = response.data.map((option) => ({
          value: option.bmr_no, // assuming value is the correct field for the value
          label: option.bmr_no, // using value as label for display
        }));
        // console.log(response.data,"Api Response")
        setallBmrOptions(options);
      } catch (error) {
        console.error("Error fetching BMR options:", error);
      }
    };

    fetchAllBmrOptions();
  }, []);

  const handleOk = () => {
    if (!bmrNoModal && !subBatchNo) {
      message.warning("BMR No and Sub Batch No are required.");
      return;
    }
    if (!bmrNoModal) {
      message.warning("BMR No required.");
      return;
    } else if (!subBatchNo) {
      message.warning("Sub Batch No Required.");
      return;
    }

    setIsModalOpen(false);
    setBmrNo(bmrNoModal);
    setSubBatchNo(subBatchNo);

    navigate(`/Precot/Bleaching/F-11`, {
      state: {
        bmrNoParam: bmrNoModal,
        subBatchNoParam: subBatchNo,
      },
    });
  };
  const handleCancel = () => {
    setBmrNoModal("");
    setSubBatchNo("");
    setIsModalOpen(false);
  };
  const handlePrintCancel = () => {
    setFromBmr("");
    setToBmr("");
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (userRole === "ROLE_SUPERVISOR") {
          response = await axios.get(
            `${API.prodUrl}/Precot/api/bleaching/Service/EquipLogHydroExtracotor/getAllSupervisorNotSubmitted`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (userRole == "ROLE_HOD" || userRole == "ROLE_DESIGNEE") {
          response = await axios.get(
            `${API.prodUrl}/Precot/api/bleaching/Service/EquipLogHydroExtracotor/getAllHodNotSubmitted`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        // console.log(response.data, "Api Response");
        setNewData(response.data);
        // console.log("Get Api :", newData)
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
        if (data.hod_status === "HOD_REJECTED") {
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
    const encodedBmrNo = encodeURIComponent(record.bmrNo);
    const encodedSubBatchNo = encodeURIComponent(record.subBatchNo);

    const decodedBmrNo = decodeURIComponent(encodedBmrNo);
    // console.log(decodedBmrNo)
    setBmrNo(decodedBmrNo);

    navigate(`/Precot/Bleaching/F-11`, {
      state: {
        bmrNoParam: record.bmrNo,
        subBatchNoParam: record.subBatchNo,
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
        // console.log('BMR Options:', response.data); // Log the response data
        const options = response.data.map((option) => ({
          value: option.BMR_NO, // assuming value is the correct field for the value
          label: option.BMR_NO, // using value as label for display
        }));
        // console.log(response.data, "Api Response")
        setBmrOptions(options);
      } catch (error) {
        console.error("Error fetching BMR options:", error);
      }
    };

    fetchBmrOptions();
  }, [token]);

  useEffect(() => {
    const fetchSubBatchOptions = async () => {
      ///Precot/api/bleaching/summary/batchByBleach?bmr_no=(Old Api)
      ///Precot/api/bleaching/summary/batchByBleach/hydroextractor?bmr_no=(New Api)
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/summary/batchByBleach/hydroextractor?bmr_no=${bmrNoModal}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('Sub Batch Options:', response.data); // Log the response data
        const options = response.data.map((option) => ({
          value: option.value,
          label: option.value, // Use description for label
        }));
        setSubBatchOptions(options);
      } catch (error) {
        console.error("Error fetching Sub Batch options:", error);
      }
    };

    if (bmrSubbatch) {
      fetchSubBatchOptions();
    }
  }, [token, bmrSubbatch, bmrNo]); // Include bmrSubbatch in the dependency array

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  // useEffect(() => {
  //   if (printRecord.length > 0 )  {

  //     window.print();
  //   }
  // }, [printRecord]);
  useEffect(() => {
    setTimeout(() => {
      if (printRecord.length > 0) {
        window.print();
        setGetImage("");
        setGetImage1("");
        setPrintButtonLoading(false);
      }
    }, 3000);
  }, [printRecord]);

  const handlePrint = async () => {
    if (fromBmr == "") {
      message.warning("Please Select From BMR");
      return;
    } else if (toBmr == "") {
      message.warning("Please Select To BMR");
      return;
    }
    setPrintButtonLoading(true);

    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/Service/EquipLogHydroExtracotor/GetByBmrRange?fromBmr=${fromBmr}&toBmr=${toBmr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      // console.log('Data fetched:', response.data);

      setPrintRecord(response.data);
      // if (printRecord.length > 0 || loading === true)  {

      //   window.print();
      // }
    } catch (error) {
      console.error("Error fetching data or printing:", error);
      messageApi.error(error.response.data.message);
      setPrintButtonLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
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
      dataIndex: "bmrNo",
      key: "bmrNo",
      align: "center",
    },
    {
      title: "Sub Batch No",
      dataIndex: "subBatchNo",
      key: "subBatchNo",
      align: "center",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (text) => formatDate(text),
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
    columns = [...baseColumns.slice(0, 6), Reason, ...baseColumns.slice(6)];
  } else {
    columns = baseColumns;
  }

  const bmrHandleChange = (value) => {
    setShowButton(true);
    setBmr(value);
    setBmrNoModal(value);
    setbmrSubBatch(value);
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
  // const entriesPerPage = 10;
  // const hydroExtractor = [];
  // let numberOfPages = Math.ceil(printRecord.length / entriesPerPage);

  // if (printRecord||printRecord.length>0 ) {
  //   for (let i = 0; i < printRecord.length; i += entriesPerPage) {
  //     hydroExtractor.push(printRecord.slice(i, i + entriesPerPage));
  //   }
  // }
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

      {/* style={{ border: "none",padding:"10px" }}style={{ border: "none" }}  Print Changes*/}
      <div id="section-to-print-san" style={{ marginTop: "40px" }}>
        <style>
          {`
      @media print {
        @page {
          size: landscape;
        }
      }
    `}
        </style>

        {/* {hydroExtractor.map((bodyContent, pageIndex) => ( */}
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <table style={{ width: "90%" }}>
            <thead style={{ width: "90%" }}>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr>
                <th
                  rowSpan="4"
                  style={{ textAlign: "center", height: "30px" }}
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
                <th rowSpan="4" style={{ textAlign: "center" }} colSpan="5">
                  Equipment Usage Log Book - Hydro Extractor
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Format No.:
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                  colSpan="1"
                >
                  PH-PRD01/F-008
                </th>
              </tr>
              <tr>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Revision No.:
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                  colSpan="1"
                >
                  01
                </th>
              </tr>
              <tr>
                <th
                  colSpan="1"
                  style={{ textAlign: "center", whiteSpace: "nowrap" }}
                >
                  Ref.SOP No.:
                </th>
                <th style={{ textAlign: "center" }} colSpan="1">
                  PH-PRD01-D-03
                </th>
              </tr>
              <tr>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Page No.:
                </th>
                <th
                  style={{ textAlign: "center", whiteSpace: "nowrap" }}
                  colSpan="1"
                >
                  {pageIndex + 1} of {totalPages}
                </th>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr>
                <th style={{ textAlign: "center", padding: "0", width: "5%" }}>
                  S.No.
                </th>
                <th style={{ textAlign: "center", width: "8%" }} colSpan="2">
                  BMR No.
                </th>
                <th style={{ textAlign: "center", width: "8%" }}>Mixing</th>
                <th style={{ textAlign: "center", width: "8%" }}>
                  Sub Batch No.
                </th>
                <th style={{ textAlign: "center", width: "8%" }}>M/C No.</th>
                <th style={{ textAlign: "center", width: "15%" }}>
                  Timer Setting
                  <br /> in Analog Gauge <br />
                  (Std.: 0.3 to 0.7)
                </th>
                <th style={{ textAlign: "center", width: "15%" }}>Remarks</th>
                <th style={{ textAlign: "center", width: "16%" }}>
                  Performed by Prod .<br />
                  Supervisor
                  <br />
                  Date & Sign
                </th>
                <th style={{ textAlign: "center", width: "17%" }}>
                  Reviewed by HOD/ Designee
                  <br />
                  Date & Sign{" "}
                </th>
              </tr>
            </thead>

            <tbody>
              {paginateData(printRecord, pageIndex + 1).map((item, index) => (
                <tr key={index}>
                  {/* {bodyContent.map((row, rowIndex) => (
        <tr key={`${rowIndex}`}> */}
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {" "}
                    {index + 1 + pageIndex * recordsPerPage}
                  </td>
                  <td
                    style={{ textAlign: "center", fontWeight: "normal" }}
                    colSpan="2"
                  >
                    {item.bmrNo}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.mixing}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.subBatchNo}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.mcNo}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {item.timerSetting}
                  </td>
                  <td style={{ fontWeight: "normal", textAlign: "center" }}>
                    {item.remarks}
                  </td>
                  <td
                    style={{
                      display: "table-cell",
                      verticalAlign: "bottom",
                      textAlign: "center",
                      height: "50px",
                      fontWeight: "normal",
                    }}
                  >
                    {getImage !== "" ? (
                      <img
                        src={getImage}
                        alt="Supervisor"
                        style={{
                          width: "auto",
                          height: "30px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                    <br></br>
                    {item.supervisor_sign}
                    <br /> {formatDate(item.supervisor_submit_on)}
                  </td>
                  <td
                    style={{
                      display: "table-cell",
                      verticalAlign: "bottom",
                      textAlign: "center",
                      fontWeight: "normal",
                    }}
                  >
                    {getImage1 ? (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="HOD"
                        style={{
                          width: "auto",
                          height: "30px",
                        }}
                      />
                    ) : null}
                    <br></br>
                    {item.hod_sign}
                    <br></br>
                    {formatDate(item.hod_submit_on)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="2">
                  Particulars
                </td>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="4">
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="2">
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="2">
                  Approved By
                </td>
              </tr>
              <tr>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="2">
                  Name
                </td>
                <td style={{ padding: "1em" }} colSpan="4"></td>
                <td style={{ padding: "1em" }} colSpan="2"></td>
                <td style={{ padding: "1em" }} colSpan="2"></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colSpan="2">
                  Signature & Date
                </td>
                <td style={{ padding: "1em" }} colSpan="4"></td>
                <td style={{ padding: "1em" }} colSpan="2"></td>
                <td style={{ padding: "1em" }} colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <div className="section-to-hide">
        <div className="bleachHeaderPrint">
          <BleachingHeader
            formName={"EQUIPMENT USAGE LOGBOOK HYDRO EXTRACTOR "}
            formatNo={"PH-PRD01/F-008"}
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
          <label>BMR No :</label>
          <Select
            options={bmrOptions}
            onChange={bmrHandleChange}
            style={{
              width: "150px",
              borderRadius: "40px",
              textAlign: "center",
            }}
            dropdownStyle={{
              color: "#00308F",
              textAlign: "center",
            }}
            showSearch
          />
          <label>Sub Batch No :</label>
          <Select
            options={subBatchOptions}
            onChange={handleSubBatchChange}
            style={{
              width: "150px",
              borderRadius: "40px",
              textAlign: "center",
            }}
            dropdownStyle={{
              color: "#00308F",
              textAlign: "center",
            }}
            showSearch
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
        title="Equipment Usage Log Book-Hydro Extractor (Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handlePrint}
            loading={printButtonLoading}
          >
            OK
          </Button>,
        ]}
      >
        <label>From BMR : </label>
        <Select
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
          showSearch
        />
        <br />
        <br />
        <label>To BMR &nbsp;&nbsp;&nbsp;&nbsp; : </label>
        <Select
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
          showSearch
        />
      </Modal>
    </div>
  );
};

export default Bleaching_f11_Summary;
