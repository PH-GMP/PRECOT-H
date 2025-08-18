/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader";

const { Option } = Select;

const QualityControl_ARF011_Summary = () => {
  const [availableBMRno, setAvailableBMRno] = useState([]);
  const [reason, setReason] = useState(false);
  const [fumigationDate, setFumigationDate] = useState(null);
  console.log("98", availableBMRno);

  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);

  const token = localStorage.getItem("token");
  const [printData, setPrintData] = useState("");
  const navigate = useNavigate();

  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    qc_sign: "",
  });

  const [batchnoprint, setbatchnoprint] = useState([]);
  const [batchNolist, setBatchNolist] = useState("Select Batch No");
  const [batchNolistPrint, setBatchNolistPrint] = useState("");
  const [open, setOpen] = useState(false);

  const [isModalPrint, setIsModalPrint] = useState(false);

  const role = localStorage.getItem("role");

  const [bmrListPrint, setBmrListPrint] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

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
    const signatureKeys = ["chemist_sign", "micro_sign", "qc_sign"];
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
  }, [token, printData.chemist_sign, printData.micro_sign, printData.qc_sign]);

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
        `${API.prodUrl}/Precot/api/chemicaltest/ARF011/getAll`,
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
          fumigation_date: formatDate(x.fumigation_date),
          chemist_status: x.chemist_status,
          micro_status: x.micro_status,
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
        `${API.prodUrl}/Precot/api/chemicaltest/ARF011/getAll`,
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
          fumigation_date: formatDate(x.fumigation_date),
          chemist_status: x.chemist_status,
          micro_status: x.micro_status,
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
        `${API.prodUrl}/Precot/api/chemicaltest/ARF011/getAll`,
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
          fumigation_date: formatDate(x.fumigation_date),
          chemist_status: x.chemist_status,
          micro_status: x.micro_status,
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
        fetchData_getBleachingJobSupervisorSummeryF13();
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
    console.log("edit selected record", record);

    console.log("x", record);

    const [day, month, year] = record.fumigation_date.split("/");
    const formattedFumigationDate = `${year}-${month}-${day}`;

    navigate("/Precot/QualityControl/F-ARF011", {
      state: {
        fumigation: formattedFumigationDate,
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
  const handleAvailableBMRnoLovChange = (event) => {
    const value = event.target.value;
    console.log("BMR Value", value);
    setFumigationDate(value);
    setBatchNolist(null);
  };

  const handleGo = async () => {
    console.log(availableBMRno, batchNolist);

    navigate("/Precot/QualityControl/F-ARF011", {
      state: {
        fumigation: fumigationDate,
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
        `${API.prodUrl}/Precot/api/chemicaltest/ARF011/print/?date=${formParams.printSubBatchNo}`,
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
      title: "Fumigation Date",
      dataIndex: "fumigation_date",
      key: "fumigation_date",
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
      dataIndex: "micro_status",
      key: "micro_status",
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
                    .page-break {
                page-break-after: always;
            }
}
`;

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
        <GlobalStyle />
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
                FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR{" "}
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-011</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>06</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>
                PH-QCL01-D-05 &<br />
                PH-QCL01-D-11
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>01 of 04</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table>
            <tr>
              <td colSpan={6}>Chemical Name: {printData.chemical_name} </td>
              <td colSpan={5}>Dilution (if): {printData.dilution}</td>
              <td colSpan={6}>
                Report Date: {formatDate(printData.report_date)}
              </td>
            </tr>
            <tr>
              <td colSpan={11}>
                Solution Prepared by: {printData.solution_prepared_by}
              </td>
              <td colSpan={6}>
                Fumigation Date: {formatDate(printData.fumigation_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
                rowSpan={3}
              >
                S. No.
              </td>
              <td style={{ textAlign: "center" }} rowSpan={3}>
                Department
              </td>
              <td style={{ textAlign: "center" }} rowSpan={3}>
                Area / Location
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
                rowSpan={3}
              >
                No. of M/c. used
              </td>
              <td style={{ textAlign: "center" }} colSpan={3}>
                Fumigation Time
              </td>
              <td style={{ textAlign: "center" }} colSpan={2}>
                Sample Collected <br /> Dates for <br /> microbiological test{" "}
              </td>
              <td style={{ textAlign: "center" }} colSpan={7}>
                Microbiological Count / Analysis
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
                rowSpan={3}
              >
                Remark
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                From
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                To
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                Total (minutes)
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                Before Fumigation
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                After Fumigation
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                Analytical Reference. Number
              </td>
              <td style={{ textAlign: "center" }} colSpan={2}>
                Total Viable Count (TVC) (≤1000 cfu/plate)
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                % of Reduction
              </td>
              <td style={{ textAlign: "center" }} colSpan={2}>
                Total Fungal Count(TFC) ( ≤ 100 cfu/plate)
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                % of Reduction
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Before</td>
              <td style={{ textAlign: "center" }}>After</td>
              <td style={{ textAlign: "center" }}>Before</td>
              <td style={{ textAlign: "center" }}>After</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>1</td>
              <td style={{ textAlign: "center" }}>Raw Cotton Godown</td>
              <td style={{ textAlign: "center" }}>Raw Cotton Godown</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 ? printData?.obser[0]?.total : ""}
              </td>
              <td style={{ textAlign: "center" }} rowSpan={5}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.before_fumigation
                  : ""}
              </td>
              <td style={{ textAlign: "center" }} rowSpan={5}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.after_fumigation
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.analytical_request_number
                  ? printData?.obser[0]?.analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 ? printData?.obser[0]?.remark : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>2</td>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                Bleaching
              </td>
              <td style={{ textAlign: "center" }}>Blow Room carding</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.bl_analytical_request_number
                  ? printData?.obser[0]?.bl_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>3</td>
              <td style={{ textAlign: "center" }}>RBlow Room carding</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.bl_blrc_analytical_request_number
                  ? printData?.obser[0]?.bl_blrc_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_blrc_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>4</td>
              <td style={{ textAlign: "center" }}>Bleaching Area</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.bl_wbp_analytical_request_number
                  ? printData?.obser[0]?.bl_wbp_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_wbp_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>5</td>
              <td style={{ textAlign: "center" }}>AB Cotton Godown</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.bl_ba_analytical_request_number
                  ? printData?.obser[0]?.bl_ba_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.bl_ba_remark
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
                FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR{" "}
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-011</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>06</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>
                PH-QCL01-D-05 &<br />
                PH-QCL01-D-11
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>02 of 04</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center" }}>6</td>
              <td style={{ textAlign: "center" }}>FG</td>
              <td style={{ textAlign: "center" }}>Finished Goods Godown</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {" "}
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }} rowSpan={7}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.before_fumigation
                  : ""}
              </td>
              <td style={{ textAlign: "center" }} rowSpan={7}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.after_fumigation
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.fg_analytical_request_number
                  ? printData?.obser[0]?.fg_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fg_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>7</td>
              <td style={{ textAlign: "center" }} rowSpan={3}>
                VMI
              </td>
              <td style={{ textAlign: "center" }}>
                Bag making/ <br />
                Old Packing
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.vmi_analytical_request_number
                  ? printData?.obser[0]?.vmi_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_total_viable_afte
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>8</td>
              <td style={{ textAlign: "center" }}>ACE-2 packing Area</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.vmi_bmop_analytical_request_number
                  ? printData?.obser[0]?.vmi_bmop_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_bmop_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }}>FALU 5×6 Packaging</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.vmi_ace2pa_analytical_request_number
                  ? printData?.obser[0]?.vmi_ace2pa_analytical_request_numbers
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.vmi_ace2pa_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>10</td>
              <td style={{ textAlign: "center" }} rowSpan={3}>
                Jetlace
              </td>
              <td style={{ textAlign: "center" }}>Roll Storage area</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.jet_analytical_request_number
                  ? printData?.obser[0]?.jet_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>11</td>
              <td style={{ textAlign: "center" }}>Roll Winding</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {" "}
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_no_mc_used
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.jet_rw_analytical_request_number
                  ? printData?.obser[0]?.jet_rw_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_rw_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>12</td>
              <td style={{ textAlign: "center" }}>Ball making area</td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {" "}
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_no_mc_used
                  : ""}
              </td>

              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_railway_time_from
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_railway_time_to
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_total
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0 &&
                  printData?.obser[0]?.jet_bma_analytical_request_number
                  ? printData?.obser[0]?.jet_bma_analytical_request_number
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_total_viable_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_total_viable_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_viable_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_total_fungal_before
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_total_fungal_after
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_fungal_reduction
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.jet_bma_remark
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
                  FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR{" "}
                </td>
                <td style={{ padding: "0.5em" }}>Format No.:</td>
                <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-011</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Revision No.:</td>
                <td style={{ padding: "0.5em" }}>06</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                <td style={{ padding: "0.5em" }}>
                  PH-QCL01-D-05 &<br />
                  PH-QCL01-D-11
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Page No.:</td>
                <td style={{ padding: "0.5em" }}>03 of 04</td>
              </tr>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
            </table>
            <table style={{ tableLayout: "fixed" }}>
              <tr>
                <td style={{ textAlign: "center" }}>13</td>
                <td style={{ textAlign: "center" }}>Spunlace</td>
                <td style={{ textAlign: "center" }}>Roll & Ropple packing</td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_no_mc_used
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_railway_time_from
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_railway_time_to
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_total
                    : ""}
                </td>
                <td style={{ textAlign: "center" }} rowSpan={5}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.before_fumigation
                    : ""}
                </td>
                <td style={{ textAlign: "center" }} rowSpan={5}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.after_fumigation
                    : ""}
                </td>

                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0 &&
                    printData?.obser[0]?.spun_analytical_request_number
                    ? printData?.obser[0]?.spun_analytical_request_number
                    : "NA"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_total_viable_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_total_viable_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_viable_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_total_fungal_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_total_fungal_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_fungal_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spun_remark
                    : ""}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>14</td>
                <td style={{ textAlign: "center" }}></td>
                <td style={{ textAlign: "center" }}>RP Bale </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_no_mc_used
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_railway_time_from
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_railway_time_to
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_total
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0 &&
                    printData?.obser[0]?.spl_rb_analytical_request_number
                    ? printData?.obser[0]?.spl_rb_analytical_request_number
                    : "NA"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_total_viable_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_total_viable_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_viable_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_total_fungal_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_total_fungal_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_fungal_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.spl_rb_remark
                    : ""}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>15</td>
                <td style={{ textAlign: "center" }}>lab</td>
                <td style={{ textAlign: "center" }}>
                  Micro
                  <br />
                  biological laboratory
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_no_mc_used
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_railway_time_from
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_railway_time_to
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_total
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0 &&
                    printData?.obser[0]?.lab_analytical_request_number
                    ? printData?.obser[0]?.lab_analytical_request_number
                    : "NA"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_total_viable_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_total_viable_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_viable_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_total_fungal_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_total_fungal_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_fungal_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lab_remark
                    : ""}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>16</td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Changing Rooms
                </td>
                <td style={{ textAlign: "center" }}>Gents Changing Room</td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_no_mc_used
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_railway_time_from
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_railway_time_to
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_total
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0 &&
                    printData?.obser[0]?.chan_analytical_request_number
                    ? printData?.obser[0]?.chan_analytical_request_number
                    : "NA"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_total_viable_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_total_viable_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_viable_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_total_fungal_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_total_fungal_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_fungal_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chan_remark
                    : ""}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>17</td>
                <td style={{ textAlign: "center" }}>Ladies Changing roon</td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_no_mc_used
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_railway_time_from
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_railway_time_to
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_total
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0 &&
                    printData?.obser[0]?.chn_lcr_analytical_request_number
                    ? printData?.obser[0]?.chn_lcr_analytical_request_number
                    : "NA"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_total_viable_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_total_viable_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_viable_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_total_fungal_before
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_total_fungal_after
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_fungal_reduction
                    : ""}
                </td>
                <td style={{ textAlign: "center" }}>
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.chn_lcr_remark
                    : ""}
                </td>
              </tr>
              <tr>
                <td colSpan={6}>
                  Result / Overall Conclusion :{" "}
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.result
                    : ""}{" "}
                </td>
                <td colSpan={11} rowSpan={2}>
                  Remarks / Action decided (in case of any abnormality) :{" "}
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.action_decided
                    : ""}
                </td>
              </tr>
              <tr>
                <td colSpan={6}>
                  Fumigation done is found to be {printData?.fumigation_name}
                </td>
              </tr>
              <tr>
                <td colSpan={17}>
                  Note : Before starting fumigation, please ensure that no
                  products or materials are kept in open condition. Use PPEs
                  while doing fumigation and vacate the area once the fogger
                  machine is started. cfu/plate- Colony forming unit per plate,{" "}
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
                  FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR{" "}
                </td>
                <td style={{ padding: "0.5em" }}>Format No.:</td>
                <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-011</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Revision No.:</td>
                <td style={{ padding: "0.5em" }}>06</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                <td style={{ padding: "0.5em" }}>
                  PH-QCL01-D-05 &<br />
                  PH-QCL01-D-11
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Page No.:</td>
                <td style={{ padding: "0.5em" }}>04 of 04</td>
              </tr>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
            </table>
            <table>
              <tr>
                <td style={{ borderBottom: "none" }}>
                  Fumigation done by : <br />{" "}
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
                  {formatDateAndTime(printData.chemist_submit_on)}{" "}
                </td>
                <td style={{ borderBottom: "none" }}>
                  Tested by (Microbiologist) : <br />
                  {eSign.micro_sign ? (
                    <img
                      src={eSign.micro_sign}
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
                  {printData.micro_sign}
                  <br></br>
                  {formatDateAndTime(printData.micro_submit_on)}
                </td>
                <td style={{ borderBottom: "none" }}>
                  Approved By : QC In charge <br />
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
              <td style={{ borderTop: "none" }}></td>
              <td
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              ></td>
              <td
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              ></td>
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
        </div>
      </div>
      <BleachingHeader
        unit="Unit-H"
        formName=" FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR"
        formatNo="PH-QCL01-AR-F-011"
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
            Select Date :
          </div>

          <Input
            type="date"
            max={formattedToday}
            style={{ width: "150px", textAlign: "center" }}
            value={fumigationDate}
            onChange={handleAvailableBMRnoLovChange}
          ></Input>
          {fumigationDate && (
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
            <label style={{ marginRight: "8px" }}>Fumigation Date:</label>

            <Input
              type="date"
              max={formattedToday}
              style={{ width: "200px" }}
              placeholder="Select Fumigation Date"
              value={formParams.printSubBatchNo}
              onChange={(e) => {
                handleFormParams(e.target.value, "printSubBatchNo");
              }}
            ></Input>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QualityControl_ARF011_Summary;
