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
// import BleachingEdit from "./rawCottomAnalysisForm";
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

const QualityControl_f01_Summary = () => {
  //Signature Images
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  //

  const [availableBMRno, setAvailableBMRno] = useState([]);
  const [reason, setReason] = useState(false);
  const [availableBMRnoLov, setAvailableBMRnoLov] = useState(null);
  console.log("98", availableBMRno);

  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);

  const token = localStorage.getItem("token");
  const [printData, setPrintData] = useState("");
  const navigate = useNavigate();

  const [eSign, setESign] = useState({
    chemist_sign: "",
    microbiologist_sign: "",
    qc_sign: "",
  });

  const [batchnoprint, setbatchnoprint] = useState([]);
  const [batchNolist, setBatchNolist] = useState("Select Batch No");
  const [batchNolistPrint, setBatchNolistPrint] = useState("");
  const [open, setOpen] = useState(false);

  const [isModalPrint, setIsModalPrint] = useState(false);

  const role = localStorage.getItem("role");

  const [bmrListPrint, setBmrListPrint] = useState([]);

  const [printResponseData, setPrintResponseData] = useState(null);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [formParams, setFormParams] = useState({
    subBatchNo: "",
    printSubBatchNo: "",
  });

  const [summary, setSummary] = useState();
  const [getData, setGetData] = useState([]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [showModal, setShowModal] = useState(false);

  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "microbiologist_sign", "qc_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
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
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [
    token,
    printData.chemist_sign,
    printData.microbiologist_sign,
    printData.qc_sign,
  ]);

  useEffect(() => {
    // Define an async function to fetch data
    const fetchDatamillbatch = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/GetPdeBatchNo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        setAvailableBMRno(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDatamillbatch();
  }, []);

  useEffect(() => {
    // Define an async function to fetch data
    const fetchDatamillbatch = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/GetPdeBatchNo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        setbatchnoprint(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDatamillbatch();
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (data.qc_status === "QC_REJECTED") {
          setReason(true);
          break;
        } else {
          setReason(false);
        }
      }
    };
    findReason();
  }, [getData]);

  const handleModalClose = () => {
    setShowModal(false);

    setBatchNolistPrint(null);
  };

  const [loadingPrint, setLoadingPrint] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Summary based on Roles
  const fetchData_getBleachingJobSupervisorSummeryF13 = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/GetAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.length !== 0) {
        setReason(true);
      } else {
        setReason(false);
      }
      setGetData(response.data);

      const a = response.data;

      console.log("response data : ", a);

      const v = response.data.map((x, i) => {
        return {
          formatName: x.formatName,
          formatNo: x.formatNo,
          revisionNo: x.revisionNo,
          refSopNo: x.refSopNo,
          unit: x.unit,
          date: x.date,
          id: x.id,
          chemist_status: x.chemist_status,
          microbiologist_status: x.microbiologist_status,
          qc_status: x.qc_status,
          millBatchNo: x.millBatchNo,
          reason: x.reason,
        };
      });

      setSummary(v);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData_geBleachingJobtHodSummeryF13 = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/GetAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.length !== 0) {
        setReason(true);
      } else {
        setReason(false);
      }
      setGetData(response.data);

      const a = response.data;

      console.log("response data : ", a);

      const v = response.data.map((x, i) => {
        return {
          formatName: x.formatName,
          formatNo: x.formatNo,
          revisionNo: x.revisionNo,
          refSopNo: x.refSopNo,
          unit: x.unit,
          date: x.date,
          id: x.id,
          chemist_status: x.chemist_status,
          microbiologist_status: x.microbiologist_status,
          qc_status: x.qc_status,
          millBatchNo: x.millBatchNo,
          reason: x.reason,
        };
      });

      setSummary(v);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const geBleachingJobQaSummeryF13 = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/getAllQcNotSubmitted`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.length !== 0) {
        setReason(true);
      } else {
        setReason(false);
      }
      setGetData(response.data);

      const a = response.data;

      console.log("response data : ", a);

      const v = response.data.map((x, i) => {
        return {
          formatName: x.formatName,
          formatNo: x.formatNo,
          revisionNo: x.revisionNo,
          refSopNo: x.refSopNo,
          unit: x.unit,
          date: x.date,
          id: x.id,
          chemist_status: x.chemist_status,
          microbiologist_status: x.microbiologist_status,
          qc_status: x.qc_status,
          millBatchNo: x.millBatchNo,
          reason: x.reason,
        };
      });

      setSummary(v);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      if (localStorage.getItem("role") === "ROLE_CHEMIST") {
        fetchData_getBleachingJobSupervisorSummeryF13();
      } else if (localStorage.getItem("role") === "ROLE_MICROBIOLOGIST") {
        fetchData_geBleachingJobtHodSummeryF13();
      } else if (
        localStorage.getItem("role") === "QC_MANAGER" ||
        localStorage.getItem("role") === "QA_MANAGER"
      ) {
        geBleachingJobQaSummeryF13();
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(printData).length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, [2000]);
    }
  }, [printData]);

  //Edit
  const handleEdit = (record) => {
    console.log("edit selected id", record);

    console.log("x", record);

    navigate("/Precot/PH-QCL01-AR-F-001/edit/", {
      state: {
        subbatch: batchNolist,
        bmrnos2: availableBMRnoLov,
        formID: record,
      },
    });
  };
  //

  //Print Change LOV
  const handlePrintChange = (value) => {
    setPrintResponseData(value);
  };

  //Outside LOV
  const handleAvailableBMRnoLovChange = (value) => {
    console.log("BMR Value", value);
    setAvailableBMRnoLov(value);
    setBatchNolist(null);
  };

  const handleGo = async () => {
    console.log(availableBMRno, batchNolist);

    navigate("/Precot/PH-QCL01-AR-F-001/edit/", {
      state: {
        subbatch: batchNolist,
        bmrnos2: availableBMRnoLov,
        formID: null,
      },
    });
  };

  const showPrintModal = () => {
    setIsModalPrint(true);
  };

  const handlePrintCancel = () => {
    setFormParams((prevState) => ({
      ...prevState,
      printSubBatchNo: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  //Header Buttons
  const handleCreate = () => {
    navigate("/Precot/Bleaching/F-13");
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = async () => {
    if (formParams.printSubBatchNo == "") {
      message.warning("Please Select Mill Batch No");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/GetReportForPrint?millBatchNo=${formParams.printSubBatchNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No Data Available To Print");
        setPrintButtonLoading(false);
        return;
      }

      setPrintData(response.data[0]);
      console.log("printt", printData);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };
  //

  // Summary Table
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Mill Batch No",
      dataIndex: "millBatchNo",
      key: "millBatchNo",
      align: "center",
    },

    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "MicroBiology Status ",
      dataIndex: "microbiologist_status",
      key: "microbiologist_status",
      align: "center",
    },
    {
      title: "QC/QA Head",
      dataIndex: "qc_status",
      key: "qc_status",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(id)}
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

  return (
    <div>
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
                    onClick: () => navigate("/Precot/Mapping"),
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
                    onClick: () => navigate("/Precot/Mapping"),
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
                    onClick: () => navigate("/Precot/Mapping"),
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
      <div id="section-to-print">
        <style>
          {`
      @media print {
         @page {
      size: landscape;
       margin: 0;
    }
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print table th,
  #section-to-print table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
                .page-break {
                page-break-after: always;
            }
      }
    `}
        </style>
        <div className="page-break">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "80px",
                      height: "auto",
                      textAlign: "center",
                    }}
                  />
                  <br></br>
                  <br></br>

                  <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                </div>
              </td>

              <td
                style={{
                  padding: "0.5em",
                  textAlign: "center",
                  fontWeight: "bold",
                  width: "60%",
                }}
                rowSpan={4}
              >
                RAW COTTON ANALYSIS REPORT <br />
                (VC / CN / CN-2)
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-001</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>1 of 5</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>

          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                PHYSICAL AND CHEMCAL TEST
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: "left" }}>
                Mill Batch No.: {printData?.millBatchNo}{" "}
              </td>
              <td colSpan={2} style={{ textAlign: "left" }}>
                A.R No.: {printData.physicalAndChemicalTests?.[0]?.arNo}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: "left" }}>
                Supplier :{" "}
                {printData.physicalAndChemicalTests?.[0]?.supplier || "N/A"}{" "}
              </td>
              <td colSpan={2} style={{ textAlign: "left" }}>
                Cotton variety :{" "}
                {printData.physicalAndChemicalTests?.[0]?.cottonVaritey ||
                  "N/A"}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: "left" }}>
                Station :{" "}
                {printData.physicalAndChemicalTests?.[0]?.station || "N/A"}{" "}
              </td>
              <td colSpan={2} style={{ textAlign: "left" }}>
                No.of Bales :{" "}
                {printData.physicalAndChemicalTests?.[0]?.noOfBale || "N/A"}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: "left" }}>
                Bill/ Invoice No :{" "}
                {printData.physicalAndChemicalTests?.[0]?.billOrInvoiceNo ||
                  "N/A"}{" "}
              </td>
              <td colSpan={2} style={{ textAlign: "left" }}>
                Quantity (Kg) :{" "}
                {printData.physicalAndChemicalTests?.[0]?.quantity || "N/A"}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={1} style={{ textAlign: "left" }}>
                Date of receipt :{" "}
                {formatDate(
                  printData.physicalAndChemicalTests?.[0]?.dateOfReceipt
                )}{" "}
              </td>
              <td colSpan={3} style={{ textAlign: "left" }}>
                Tested date :{" "}
                {formatDate(
                  printData.physicalAndChemicalTests?.[0]?.testedDate
                )}{" "}
              </td>
              <td colSpan={2} style={{ textAlign: "left" }}>
                Sample Size :{" "}
                {printData.physicalAndChemicalTests?.[0]?.sampleSize}{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Parameter Tested</td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                Tolerance/ Range / Requirements
              </td>
              <td style={{ textAlign: "center" }}>Observation</td>
              <td style={{ textAlign: "center" }}>Remark</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                1. Identification Test
              </td>
              <td colSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                Fibers are 100% Cotton Under microscopic observation
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.identificationTestObsr
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.identificationTestRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                2. Micronaire value. µg/in
              </td>
              <td colSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                VC
              </td>
              <td style={{ padding: "5px" }}>(3.5-8.0)</td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.micronaireValueObsr
                  : ""}
              </td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.micronaireValueRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                CN
              </td>
              <td>(2.8-4.5)</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                CN-2
              </td>
              <td>(2.8-4.5)</td>
            </tr>
            <tr>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                3. Average Length. mm (manual)
              </td>
              <td colSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                VC
              </td>
              <td style={{ padding: "5px" }}>min.10</td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.avarageLengthObsr
                  : ""}
              </td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.avarageLengthRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                CN
              </td>
              <td>min.10</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                CN-2
              </td>
              <td>min.8.0</td>
            </tr>
            <tr>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                4. Neps. count/gm
              </td>
              <td colSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                VC
              </td>
              <td style={{ padding: "5px" }}>max.700</td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.nepsObsr
                  : ""}
              </td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.nepsRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                CN
              </td>
              <td>max.1000</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                CN-2
              </td>
              <td>max.5000</td>
            </tr>
            <tr>
              <td rowSpan={5} style={{ textAlign: "left", padding: "5px" }}>
                5.Upper Quartile Length.mm by wt. UQL (w)
              </td>
              <td rowSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                VC
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Long</td>
              <td style={{ textAlign: "left", padding: "5px" }}>(25-39)</td>
              <td rowSpan={5} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.upperQuartileLengthObsr
                  : ""}
              </td>
              <td rowSpan={5} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.upperQuartileLengthRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>(21-24)</td>
            </tr>
            <tr>
              <td>Short</td>
              <td>(13-20)</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                CN
              </td>
              <td>min. 12</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                CN-2
              </td>
              <td>min. 10</td>
            </tr>
          </table>
          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "30px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "80px",
                      height: "auto",
                      textAlign: "center",
                    }}
                  />
                  <br></br>
                  <br></br>

                  <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                </div>
              </td>

              <td
                style={{
                  padding: "0.5em",
                  textAlign: "center",
                  fontWeight: "bold",
                  width: "60%",
                }}
                rowSpan={4}
              >
                RAW COTTON ANALYSIS REPORT <br />
                (VC / CN / CN-2)
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-001</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>2 of 5</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center" }}>Parameter Tested</td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                Tolerance/ Range / Requirements
              </td>
              <td style={{ textAlign: "center" }} colSpan={2}>
                Observation
              </td>
              <td style={{ textAlign: "center" }}>Remarks</td>
            </tr>
            <tr>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                6.Length by weight. mm L (w)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>VC</td>
              <td style={{ padding: "5px" }}>min. 15</td>
              <td rowSpan={3} colSpan={2} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.lengthByWeightObsr
                  : ""}
              </td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.lengthByWeightRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN</td>
              <td>min. 10</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN-2</td>
              <td>min. 8</td>
            </tr>

            <tr>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                7.Length by number.mm L(n)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>VC</td>
              <td style={{ padding: "5px" }}>min. 13</td>
              <td rowSpan={3} colSpan={2} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.lengthByNoObsr
                  : ""}
              </td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.lengthByNoRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN</td>
              <td>min. 7</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN-2</td>
              <td>min. 6</td>
            </tr>
            <tr>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                8. Short fiber Content. by wt.% SFC(w)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>VC</td>
              <td style={{ padding: "5px" }}>max.25</td>
              <td rowSpan={3} colSpan={2} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.shortFiberCntByWtObsr
                  : ""}
              </td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.shortFiberContentByWtRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN</td>
              <td>max.85</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN-2</td>
              <td>max.85</td>
            </tr>
            <tr>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                9. Short fiber Content. by number % SFC(n)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>VC</td>
              <td style={{ padding: "5px" }}>max.45</td>
              <td rowSpan={3} colSpan={2} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.shortFiberContentByNoObsr
                  : ""}
              </td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.shortFiberContentByNoRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN</td>
              <td>max.90</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN-2</td>
              <td>max.95</td>
            </tr>
            <tr>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                10. Whiteness Indices (Berger 10deg/D65)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>VC</td>
              <td style={{ padding: "5px" }}>min.25</td>
              <td rowSpan={3} colSpan={2} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.whitenessIndicesObsr
                  : ""}
              </td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.whitenessIndicesRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN</td>
              <td>min.20</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN-2</td>
              <td>min.75</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                11. Fluorescence (Under UV)
              </td>
              <td colSpan={2} style={{ textAlign: "left", padding: "5px" }}>
                No intense blue fluorescence. Few isolated fibers passable.
              </td>
              <td colSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.flourescenceObsr
                  : ""}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.flourescenceRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td rowSpan={2} style={{ textAlign: "left", padding: "5px" }}>
                12. Ash content (%)
                <br /> RESULT = [(B-A) x100]/ 5
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>VC</td>
              <td rowSpan={2} style={{ padding: "5px" }}>
                max. 1.50
              </td>
              <td style={{ padding: "5px" }}>Final Wt.(g)-B</td>
              <td style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.ashContentFlWtObsr
                  : ""}
              </td>
              <td rowSpan={2} style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.ashContentRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN</td>
              <td>Initial</td>
              <td style={{ textAlign: "center" }}>
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.ashContentIlWtObsr
                  : ""}
              </td>
            </tr>
          </table>
          {/* <table>
            <tr>
              <td colSpan={4} style={{ padding: "5px" }}>
                Remark(s):{" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.final_remark
                  : ""}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ padding: "5px" }}>
                Note: Parameter No.-9,10 & 11 are for information purpose
                only.Abbreviation: Max-Maximum, Min-Minimum, mm-millimeter,
                Wt-weight, g-gram,sec-Seconds, µg/in-Microgram per inch,
                Avg.-Average, JP - Japanish Pharmacopoeia,BP-British
                Pharmacopoeia, EP - European Pharmacopoeia, US-United States
                Pharmacopoeia.A.R. No-Analytical Request Number.{" "}
              </td>
            </tr>
          </table> */}

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "30px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "80px",
                      height: "auto",
                      textAlign: "center",
                    }}
                  />
                  <br></br>
                  <br></br>

                  <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                </div>
              </td>

              <td
                style={{
                  padding: "0.5em",
                  textAlign: "center",
                  fontWeight: "bold",
                  width: "60%",
                }}
                rowSpan={4}
              >
                RAW COTTON ANALYSIS REPORT <br />
                (VC / CN / CN-2)
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-001</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>3 of 5</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center" }}>Parameter Tested</td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                Tolerance/ Range / Requirements
              </td>
              <td style={{ textAlign: "center" }} colSpan={2}>
                Observation
              </td>
              <td style={{ textAlign: "center" }}>Remarks</td>
            </tr>
            <tr>
              <td rowSpan={3}>
                A= Crucible Wt.(g) <br /> B= Crucible Wt.with 5 g. sample's ash.
                content (g)
              </td>
              <td></td>
              <td></td>
              <td>Wt.(g)-A</td>
              <td></td>
              <td rowSpan={3}></td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                CN-2
              </td>

              <td rowSpan={2}>max. 0.5</td>
              <td> B-A</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.ashContentFrBAObsr
                  : ""}
              </td>
            </tr>
            <tr>
              <td>RESULTS(%)</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.ashContentFrResObsr
                  : ""}
              </td>
            </tr>
            <tr>
              <td rowSpan={4}>
                13. Ether Soluble Substances % RESULT = [(Y-X) x100]/ 5 X= Flask
                Wt.(g) Y= Flask Wt.with 5 g. sample's Ether soluble extract.(g)
              </td>
              <td style={{ textAlign: "center" }}>VC</td>
              <td rowSpan={4}>max.0.75</td>
              <td>Final Wt.(g)-Y</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.eitherSolSubFlWtObsr
                  : ""}
              </td>
              <td rowSpan={4} style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.eitherSolSubRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN</td>
              <td>Initial Wt.(g)-X</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.eitherSolSubIlWtObsr
                  : ""}
              </td>
            </tr>
            <tr>
              <td rowSpan={2} style={{ textAlign: "center" }}>
                CN-2
              </td>
              <td>Y-X</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.eitherSolSubFrYXObsr
                  : ""}
              </td>
            </tr>
            <tr>
              <td>RESULTS (%) </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.eitherSolSubFrResObsr
                  : ""}
              </td>
            </tr>
            <tr>
              <td rowSpan={4}>
                14. Moisture content (%) RESULT = [(K-L) x100]/ K K= Cotton
                Wt.(g) before dry L= Cotton Wt.(g) after dry
              </td>
              <td style={{ textAlign: "center" }}>VC</td>
              <td rowSpan={4}>max 8.0</td>
              <td>Initial Wt.(g)-K</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.moistureContentIlWtObsr
                  : ""}
              </td>
              <td rowSpan={4} style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.moistureContentRmrk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN</td>
              <td>Final Wt.(g)-L</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.moistureContentFlWtObsr
                  : ""}
              </td>
            </tr>
            <tr>
              <td rowSpan={2} style={{ textAlign: "center" }}>
                CN-2
              </td>
              <td>K-L</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.moistureContentFrKlObsr
                  : ""}
              </td>
            </tr>
            <tr>
              <td>RESULTS (%)</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.moistureContentFrResObsr
                  : ""}
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "30px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "80px",
                      height: "auto",
                      textAlign: "center",
                    }}
                  />
                  <br></br>
                  <br></br>

                  <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                </div>
              </td>

              <td
                style={{
                  padding: "0.5em",
                  textAlign: "center",
                  fontWeight: "bold",
                  width: "60%",
                }}
                rowSpan={4}
              >
                RAW COTTON ANALYSIS REPORT <br />
                (VC / CN / CN-2)
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-001</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>4 of 5</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ marginTop: "-1rem" }}>
            <tr>
              <td rowSpan={3}>
                15. Trash (%) RESULTS= [N x 100]/M M= Cotton Wt.(g) N= Trash
                Wt.(g)
              </td>
              <td style={{ textAlign: "center" }}>VC</td>
              <td>max. 3.5</td>
              <td>Cotton Wt.(g)-M</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.trashCottonWtMObsr
                  : ""}
              </td>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.trashRemark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN</td>
              <td>max. 0.6</td>
              <td>Trash Wt.(g)-N</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.trashTrashWtNObsr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>CN-2</td>
              <td>Not Applicable</td>
              <td>RESULTS (%)</td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.trashResObsr
                  : ""}
              </td>
            </tr>
            <tr>
              <td colSpan={6} style={{ padding: "5px" }}>
                Remark(s):{" "}
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.finalRemark
                  : ""}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={6} style={{ padding: "5px" }}>
                Note : Abbreviations: CN- Comber Noils, VC-Virgin cotton.
                CN2-Exfoliating products opened material. Max.-Maximum,
                Min.-Minimum, mm-millimeter, Wt.-weight, g.-gram, sec.-Seconds,
                µg/in-Microgram per inch, Avg.-Average, A.R. No- Analytical
                Reference Number.
              </td>
            </tr>
            <tr>
              <td>
                Lot Status :
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.lotStatus
                  : ""}{" "}
              </td>
              <td style={{ width: "20%" }} colSpan={1}>
                Accepted Quantity(Kg):
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.lotStatusAccepted ||
                    "N/A"
                  : ""}{" "}
              </td>
              <td colSpan={2}>
                Accepted Under Deviation (Kg):
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]
                      ?.lotStatusAcceptedUnderDeviation || "N/A"
                  : ""}
              </td>
              <td colSpan={2}>
                Rejected (Kg):
                {printData.physicalAndChemicalTests?.length > 0
                  ? printData?.physicalAndChemicalTests[0]?.lotStatusRejected ||
                    "N/A"
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                style={{
                  textAlign: "center",
                  borderBottom: "none",
                  width: "50%",
                }}
              >
                Tested by (Chemist):{" "}
              </td>
              <td
                colSpan={3}
                style={{
                  textAlign: "center",
                  borderBottom: "none",
                  width: "50%",
                }}
              >
                Approved by:{" "}
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "30px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                  width: "50%",
                }}
              >
                {eSign.chemist_sign ? (
                  <img
                    src={eSign.chemist_sign}
                    alt="chemist eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.chemist_sign}
                <br></br>
                {formatDateAndTime(printData.chemist_submit_on)}
              </td>
              <td
                colSpan={3}
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "30px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                  width: "50%",
                }}
              >
                {eSign.qc_sign ? (
                  <img
                    src={eSign.qc_sign}
                    alt="qc eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.qc_sign}
                <br></br>
                {formatDateAndTime(printData.qc_submit_on)}
              </td>
            </tr>
          </table>
          <table style={{ marginTop: "-1rem" }}>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "30px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "80px",
                      height: "auto",
                      textAlign: "center",
                    }}
                  />
                  <br></br>
                  <br></br>

                  <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                </div>
              </td>

              <td
                style={{
                  padding: "0.5em",
                  textAlign: "center",
                  fontWeight: "bold",
                  width: "60%",
                }}
                rowSpan={4}
              >
                RAW COTTON ANALYSIS REPORT <br />
                (VC / CN / CN-2)
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-001</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>5 of 5</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "center", marginTop: "-3rem" }}>
            <tr>
              <td style={{ border: "none", padding: "20px" }}> </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={11}>
                MICROBIOLOGICAL TEST
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
                rowSpan={3}
              >
                Sampled on
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
                rowSpan={3}
              >
                Tested /Incubation Start on
              </td>
              <td style={{ textAlign: "center" }} colSpan={7}>
                Test Parameters & Specification{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
                colSpan={2}
                rowSpan={3}
              >
                Test Completion Date{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
                rowSpan={2}
              >
                Total Viable Count (TVC - cfu/g)
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
                rowSpan={2}
              >
                Total Fungal Count (TFC - cfu/g)
              </td>
              <td style={{ textAlign: "center" }} colSpan={5}>
                Pathogens{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
              >
                Gram negative bacteria or Coliform
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
              >
                Escherechia coli (E.coli)
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
              >
                Staphylococcos aures (S.aur )
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
              >
                Pseudomonas aerogenosa (P.aer)
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "100px",
                  padding: "10px",
                }}
              >
                Salmonella (Sal.)
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
              >
                {printData.microbiologicalTests?.length > 0 &&
                printData?.microbiologicalTests[0]?.sampledOn !== ""
                  ? formatDate(printData?.microbiologicalTests[0]?.sampledOn)
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
              >
                {printData.microbiologicalTests?.length > 0 &&
                printData?.microbiologicalTests[0]
                  ?.testedOrIncubationStartOn !== ""
                  ? formatDate(
                      printData?.microbiologicalTests[0]
                        ?.testedOrIncubationStartOn
                    )
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
              >
                {printData.microbiologicalTests?.length > 0
                  ? printData?.microbiologicalTests[0]?.totalViableCount
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
              >
                {printData.microbiologicalTests?.length > 0
                  ? printData?.microbiologicalTests[0]?.totalFungalCount
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
              >
                {printData.microbiologicalTests?.length > 0
                  ? printData?.microbiologicalTests[0]?.coliform
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
              >
                {printData.microbiologicalTests?.length > 0
                  ? printData?.microbiologicalTests[0]?.ecoli
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
              >
                {printData.microbiologicalTests?.length > 0
                  ? printData?.microbiologicalTests[0]?.saur
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
              >
                {printData.microbiologicalTests?.length > 0
                  ? printData?.microbiologicalTests[0]?.paer
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
              >
                {printData.microbiologicalTests?.length > 0
                  ? printData?.microbiologicalTests[0]?.sal
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "70px",
                  padding: "10px",
                }}
                colSpan={2}
              >
                {printData.microbiologicalTests?.length > 0 &&
                printData?.microbiologicalTests[0]?.testCompletionDate !== ""
                  ? formatDate(
                      printData?.microbiologicalTests[0]?.testCompletionDate
                    )
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td rowSpan={2} colSpan={6}>
                {" "}
                Note : cfu/g- Colony forming unit per gram.
              </td>
              <td colSpan={5}>
                {" "}
                Remark:{" "}
                {printData.microbiologicalTests?.length > 0
                  ? printData?.microbiologicalTests[0]?.remark
                  : "NA"}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                Product:{" "}
                {printData.microbiologicalTests?.length > 0
                  ? printData?.microbiologicalTests[0]?.product
                  : "NA"}{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "center", borderBottom: "none" }}
                colSpan={6}
              >
                Tested by (Microbiologist):{" "}
              </td>
              <td
                style={{ textAlign: "center", borderBottom: "none" }}
                colSpan={5}
              >
                Approved by:{" "}
              </td>
            </tr>
            <tr>
              <td
                colSpan={6}
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.microbiologist_sign ? (
                  <img
                    src={eSign.microbiologist_sign}
                    alt="Operator eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.microbiologist_sign}
                <br></br>
                {formatDateAndTime(printData.microbiologist_submit_on)}
              </td>
              <td
                colSpan={5}
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.qc_sign ? (
                  <img
                    src={eSign.qc_sign}
                    alt="qc eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.qc_sign}
                <br></br>
                {formatDateAndTime(printData.qc_submit_on)}
              </td>
            </tr>
          </table>

          <table style={{ marginTop: "-1rem" }}>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <BleachingHeader
        unit="Unit-H"
        formName="RAW COTTON ANALYSIS REPORT"
        formatNo="PH-QCL01-AR-F-001"
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
            onClick={showPrintModal}
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
            Select Mill Batch No :
          </div>
          <Select
            style={{ width: "150px" }}
            placeholder="Select Mill Batch No"
            showSearch
            value={availableBMRnoLov}
            onChange={handleAvailableBMRnoLovChange}
            // onBlur={fetchDatabatchByBleach}
          >
            {availableBMRno.map((Bmrnolist, index) => (
              <Option key={index} value={Bmrnolist.value}>
                {Bmrnolist.value}
              </Option>
            ))}
          </Select>

          {availableBMRnoLov && (
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
          )}
        </div>
        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={summary}
        />
        <Modal
          title="Print"
          open={isModalPrint}
          // onOk={handleModalClose}
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
          {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px" }}>Mill Batch Number:</label>
            <Select
              style={{ width: "200px" }}
              placeholder="Select Batch No"
              value={formParams.printSubBatchNo}
              onChange={(e) => {
                handleFormParams(e, "printSubBatchNo");
              }}
              showSearch
            >
              {batchnoprint.map((MacLOV, index) => (
                <Option key={index} value={MacLOV.value}>
                  {MacLOV.value}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QualityControl_f01_Summary;
