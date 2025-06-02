/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Tooltip,
  Select,
  message,
  Input,
  Drawer,
  Col,
  Avatar,
  Menu,
  Row,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiLock } from "react-icons/bi";
import BleachingTail from "../Components/BleachingTail.js";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { GrAdd } from "react-icons/gr";
import { FaPrint } from "react-icons/fa6";
import logo from "../Assests/logo.png";
import { GoArrowLeft } from "react-icons/go";
import API from "../baseUrl.json";

import { BiNavigation } from "react-icons/bi";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

const Bleaching_f34_Summary = () => {
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
  const navigate = useNavigate();
  const [bmrOptions, setBmrOptions] = useState([]);
  const [allbmrOptions, setallBmrOptions] = useState([]);
  const [reason, setReason] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subBatchOptions, setSubBatchOptions] = useState([]);
  const decodedToken = jwtDecode(token);
  const [showButton, setShowButton] = useState(false);
  const userRole = decodedToken.role;
  const [bmr, setBmr] = useState("");
  const [bmrNoModal, setBmrNoModal] = useState("");
  const [subBatchNo, setSubBatchNo] = useState("");
  const [subBatchNoInput, setSubBatchNoInput] = useState("");
  const [printRecord, setPrintRecord] = useState([]);
  const [fromBmr, setFromBmr] = useState("");
  const [toBmr, setToBmr] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const role = localStorage.getItem("role");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [open, setOpen] = useState(false);
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
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
        });
    }
  }, [printRecord, API.prodUrl, token]);

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
        });
    }
  }, [printRecord, API.prodUrl, token]);

  const handleSubBatchInputChange = (e) => {
    setSubBatchNoInput(e.target.value);
    setSubBatchNo(subBatchNoInput);
  };

  const handleOk = () => {
    if (!bmrNoModal) {
      message.warning("BMR No");
      return;
    }
    setIsModalOpen(false);
    setBmrNo(bmrNoModal);
    // const bmrNoParam = encodeURIComponent(bmrNoModal);

    navigate(`/Precot/Bleaching/F-34`, {
      state: {
        bmrNoParam: bmrNoModal,
      },
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePrintCancel = () => {
    setIsModalPrint(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (userRole === "ROLE_SUPERVISOR") {
          response = await axios.get(
            `${API.prodUrl}/Precot/api/bleach/bleachequipmentusagelogbookf34SummaryForSupervisor`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (userRole === "ROLE_HOD" || userRole == "ROLE_DESIGNEE") {
          response = await axios.get(
            `${API.prodUrl}/Precot/api/bleach/bleachequipmentusagelogbookf34SummaryForHod`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        // console.log(response.data, "Api Response");
        setNewData(response.data);
        // console.log("Get Api :", newData);
        setModalData(response.data);
        // console.log("Response data", response.data);
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
    const encodedBmrNo = encodeURIComponent(record.bmrNumber);
    const encodedSubBatchNo = encodeURIComponent(record.subbatch_no);

    const decodedBmrNo = decodeURIComponent(encodedBmrNo);
    // console.log(decodedBmrNo);
    setBmrNo(decodedBmrNo);

    navigate(`/Precot/Bleaching/F-34`, {
      state: {
        bmrNoParam: decodedBmrNo,
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

  useEffect(() => {
    const fetchAllBmrOptions = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/summary/fetchApprovedBMR?formNumber=PH-PRD01/F34`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("BMR Options:", response.data); // Log the response data
        const options = response.data.map((option) => ({
          value: option.value, // assuming value is the correct field for the value
          label: option.value, // using value as label for display
        }));
        // console.log(response.data, "Api Response");
        setallBmrOptions(options);
      } catch (error) {
        console.error("Error fetching BMR options:", error);
      }
    };

    fetchAllBmrOptions();
  }, [token]);

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  useEffect(() => {
    // if (printRecord.length > 0 && getImage !== "" && getImage1 !== "" ) {
    //   // setLoading(false);
    //   window.print();
    // }
    // else if(printRecord.length > 0 && (getImage !== "" || getImage === "") && (getImage1 !== "" || getImage1 === "") ){
    //   // console.log("condition second");
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
    setLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleach/bleachequipmentusagelogbookf34ByBmrRange?fromBmr=${fromBmr}&toBmr=${toBmr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print.");
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
          // // console.log("Submitted Date",dateString)
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");

          return `${day}/${month}/${year} ${hours}:${minutes} `;
        };

        return {
          ...item,
          start_date: transformDate(item.start_date),
          end_date: transformDate(item.end_date),

          supervisor_submit_on: submittedDate(item.supervisor_submit_on),
          hod_submit_on: submittedDate(item.hod_submit_on),
        };
      });

      setPrintRecord(transformedData);
    } catch (error) {
      messageApi.error(error.response.data.message);
    } finally {
      setLoading(false); // Set loading to false when the data is received or error occurs
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
    // console.log("Hours", hours);
    // console.log("Minutes", minutes);
    // console.log("date", dateString);

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
      dataIndex: "bmrNumber",
      key: "bmrNumber",
      align: "center",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

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

  const entriesPerPage = 5;
  const blowRoom = [];
  let numberOfPages = Math.ceil(printRecord.length / entriesPerPage);

  if (printRecord || printRecord.length > 0) {
    for (let i = 0; i < printRecord.length; i += entriesPerPage) {
      blowRoom.push(printRecord.slice(i, i + entriesPerPage));
    }
  }

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

      <div id="section-to-print-san">
        <style>
          {`
      @media print {
        @page {
          size: landscape;
        }
        body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: auto;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
        html, body {
    height: 100vh;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
  }
      }
    `}
        </style>
        <br />
        {blowRoom.map((bodyContent, pageIndex) => (
          <table style={{ marginTop: "2%", width: "90%" }}>
            <thead>
              {/* <tr style={{ border: "none", height: "5px" }}>
                <td style={{ border: "none" }} colSpan="11"></td>
              </tr> */}
              <tr style={{ height: "20px" }}>
                <td
                  rowSpan="4"
                  style={{
                    textAlign: "center",
                    height: "auto",
                    padding: "3px",
                  }}
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
                  <br />
                  <br></br> Unit H
                </td>
                <td
                  rowSpan="4"
                  style={{
                    textAlign: "center",
                    height: "auto",
                    padding: "3px",
                  }}
                  colSpan="6"
                >
                  Equipment Usage Log Book - Blow Room & Carding
                </td>
                <td colSpan="1">Format No.:</td>
                <td
                  style={{
                    border: "1px solid black",
                    height: "30px",
                    padding: "3px",
                  }}
                  colSpan="1"
                >
                  PH-PRD01/F-005
                </td>
              </tr>
              <tr style={{ height: "20px" }}>
                <td colSpan="1">Revision No.:</td>
                <td
                  style={{
                    border: "1px solid black",
                    height: "30px",
                    padding: "5px",
                  }}
                  colSpan="1"
                >
                  01
                </td>
              </tr>
              <tr style={{ height: "20px" }}>
                <td colSpan="1">Ref.SOP No.:</td>
                <td
                  style={{
                    border: "1px solid black",
                    height: "30px",
                    padding: "3px",
                  }}
                  colSpan="1"
                >
                  PRD01-D-11
                </td>
              </tr>
              <tr style={{ height: "20px" }}>
                <td colSpan="1">Page No.:</td>
                <td
                  style={{
                    border: "1px solid black",
                    height: "30px",
                    padding: "3px",
                  }}
                  colSpan="1"
                >
                  {pageIndex + 1} of {numberOfPages}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              {/* <br />
              <br /> */}
              <tr>
                <th style={{ textAlign: "center" }}>S.No.</th>
                <th style={{ textAlign: "center" }}>BMR No.</th>
                <th style={{ textAlign: "center" }}>Mixing</th>
                <th style={{ textAlign: "center" }}>No. Of Bales</th>
                <th style={{ textAlign: "center" }}>
                  Total Weight <br></br> (in Kg)
                </th>
                <th style={{ textAlign: "center" }}>Working Area</th>

                <th style={{ textAlign: "center" }}>
                  Start Date & <br></br> Time
                </th>
                <th style={{ textAlign: "center" }}>
                  End Date & <br></br> Time
                </th>
                <th style={{ textAlign: "center" }}>Remarks</th>
                <th style={{ textAlign: "center" }}>
                  Performed by Prod<br></br>Supervisor
                  <br /> Date & Sign
                  <br />
                </th>
                <th style={{ textAlign: "center" }}>
                  Reviewed by HOD/ Designee
                  <br /> Date & Sign
                  <br />{" "}
                </th>
              </tr>
              {/* <tr >
      <td style={{ border: "none" }} colSpan="11"></td>
      </tr> */}
            </thead>

            <tbody>
              {bodyContent.map((row, rowIndex) => (
                <tr key={`${rowIndex}`}>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {rowIndex + 1}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {row.bmrNumber}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {row.mixing}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {row.no_of_bales}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {row.total_weight}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {row.working_area}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {row.start_date}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "normal" }}>
                    {row.end_date}
                  </td>
                  <td style={{ fontWeight: "normal", textAlign: "center" }}>
                    {row.remarks}
                  </td>
                  <td
                    style={{
                      display: "table-cell",
                      verticalAlign: "bottom",
                      height: "50px",
                      fontWeight: "normal",
                      textAlign: "center",
                    }}
                  >
                    {row.supervisor_sign}
                    <br />
                    {row.supervisor_submit_on}
                    <br />
                    {getImage !== "" && (
                      <img
                        className="signature"
                        src={getImage}
                        alt="Supervisor"
                      />
                    )}
                  </td>
                  <td
                    style={{
                      display: "table-cell",
                      verticalAlign: "bottom",
                      fontWeight: "normal",
                      textAlign: "center",
                    }}
                  >
                    {row.hod_sign}
                    <br />
                    {row.hod_submit_on}
                    <br />
                    {getImage1 !== "" && (
                      <img className="signature" src={getImage1} alt="HOD" />
                    )}
                  </td>
                </tr>
              ))}
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="11"></td>
              </tr>
            </tbody>
            {/* <br />
            <br /> */}

            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="11"></td>
              </tr>
              <tr>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="2">
                  Particulars
                </td>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="3">
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="3">
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="3">
                  Approved By
                </td>
              </tr>
              <tr>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="2">
                  Name
                </td>
                <td
                  style={{ padding: "1em", textAlign: "center" }}
                  colSpan="3"
                ></td>
                <td style={{ padding: "1em" }} colSpan="3"></td>
                <td style={{ padding: "1em" }} colSpan="3"></td>
              </tr>
              <tr>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan="2">
                  Signature & Date
                </td>
                <td style={{ padding: "1em" }} colSpan="3"></td>
                <td style={{ padding: "1em" }} colSpan="3"></td>
                <td style={{ padding: "1em" }} colSpan="3"></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <div className="section-to-hide">
        <div className="bleachHeaderPrint">
          <BleachingHeader
            formName={"EQUIPMENT USAGE LOGBOOK BLOW ROOM & CARDING"}
            formatNo={"PH-PRD01/F-005"}
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
                onClick={handleBack}
                icon={<GoArrowLeft color="#00308F" />}
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
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <label style={{ margin: "0" }}>BMR No :</label>
          <Select
            className="select-create"
            options={bmrOptions}
            placeholder="Create"
            onChange={bmrHandleChange}
            style={{
              width: "150px",
              borderRadius: "40px",
              textAlign: "center",
            }}
            dropdownStyle={{
              textAlign: "center",
            }}
          />
          <Button
            onClick={handleOk}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            icon={<BiNavigation color="#00308F" />}
            shape="round"
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
        title="Equipment Usage Log Book-Blow Room & Carding (Print)"
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
            width: "140px",
            marginLeft: 10,
            borderRadius: "40px",
          }}
          dropdownStyle={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
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
            width: "140px",
            marginLeft: 10,
            borderRadius: "40px",
          }}
          dropdownStyle={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
          }}
        />
      </Modal>
    </div>
  );
};

export default Bleaching_f34_Summary;
