import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../baseUrl.json";
import {
  Input,
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
  DatePicker,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { BiLock, BiNavigation } from "react-icons/bi";
import BleachingHeader from "../Components/BleachingHeader";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate, IoPrint } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const { Option } = Select;

const QualityControl_f030_Summary = () => {
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const [selectedEqNo, setSelectedEqNo] = useState(""); // New state for eqno
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null); // Months are 0-based, so +1
  const [selectedYear, setSelectedYear] = useState("");
  const [reason, setReason] = useState(false);
  const [summary, setSummary] = useState();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState();
  const [selectedPrintEqNo, setSelectedPrintEqNo] = useState(null); // New state for eqno
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [printData, setPrintData] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };
  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });

  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printData?.micro_sign; // Use printData instead of printResponseData
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [printData,     API.prodUrl]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printData?.micro_designee_sign; // Use printData instead of printResponseData
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [printData,     API.prodUrl]);

  let formattedMicroDate = printData?.micro_submit_on
    ? moment(printData.micro_submit_on).format("DD/MM/YYYY HH:mm")
    : "";

  let formattedDesigneeDate = printData?.micro_designee_submit_on
    ? moment(printData.micro_designee_submit_on).format("DD/MM/YYYY HH:mm")
    : "";
  let formattedCalDueDate = printData?.calibration_next_due_date
    ? moment(printData.calibration_next_due_date).format("DD/MM/YYYY")
    : "";
  let formattedDate = printData?.date
    ? moment(printData.date, "YYYY-MMMM-DD").format("DD/MM/YYYY")
    : "";

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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };
  const handlePrintEqChange = (value) => {
    setSelectedEqNo(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
  };
  const handleGoToChange = () => {
    // Check if no fields are selected
    if (!selectedYear || !selectedMonth || !selectedEqNo) {
      message.error("Please fill in all fields.");
      return;
    }

    // Navigate when all required fields are selected
    navigate("/precot/QualityControl/PH-QCF-030", {
      state: {
        uniqueYear: selectedYear,
        uniqueMonth: selectedMonth, // Use selectedMonth.value
        uniqueEqNo: selectedEqNo,
      },
    });
  };

  const handleModalClose = () => {
    setPrintLoading(false);
    setShowModal(false);
    setSelectedPrintDate(null);
    setSelectedPrintMonth(null);
    setSelectedPrintYear(null);
    setSelectedEqNo(null);
  };

  const printSubmit = () => {
    if (!selectedPrintEqNo && !selectedPrintMonth && !selectedPrintYear) {
      message.error(
        "No fields selected. Please select a field before printing."
      );
      handleModalClose();
      return; // Stop further execution if no fields are selected
    }

    // Check if EQ No. is selected, it's mandatory
    if (!selectedPrintEqNo) {
      message.error("EQ No. is mandatory for printing.");
      handleModalClose();
      return; // Stop further execution if EQ No. is not selected
    }

    // Check if both month and year are selected along with EQ No.
    if (!selectedPrintMonth || !selectedPrintYear) {
      message.error("Please select both month and year along with EQ No.");
      handleModalClose();
      return;
    }

    // If EQ No., month, and year are selected, proceed with the API call
    fetchPrintData();
  };

  const fetchPrintData = () => {
    let apiUrl = `${   API.prodUrl}/Precot/api/QcForm/PrintApiF030?eq_id=${selectedPrintEqNo}&year=${selectedPrintYear}&month=${selectedPrintMonth}`;

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        console.log("Print Data:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const data = response.data[0]; // Assuming you only want the first item

          setPrintData(data); // Set the data in the state
          setPrintLoading(true);

          setTimeout(() => {
            window.print();
            handleModalClose();
          }, 3000);
        } else {
          setPrintData([]); // Reset print data if no details found
          setPrintLoading(false);
          message.error(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose();
        }
      })
      .catch((error) => {
        console.error("Error fetching print data:", error);
        message.error("Error fetching data. Please try again.");
        setPrintLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(`${   API.prodUrl}/Precot/api/QcForm/DigitalSummary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedData = response.data; // Fetching data from the API
        setSummary(fetchedData); // Set the fetched data in the state

        // Check if any record contains the "reason" field
        const hasReasonField = fetchedData.some((item) => item.reason);
        setReason(hasReasonField); // Set reason based on the condition
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Turn off loading after data is fetched
      });
  }, [token]);

  const handleEdit = (record) => {
    console.log("edit selected id", record.eq);

    console.log("x", record);

    navigate("/precot/QualityControl/PH-QCF-030", {
      state: {
        uniqueMonth: record.month,
        uniqueEqNo: record.equip_id,
        uniqueYear: record.year,
      },
    });
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1, // Auto-increment S.No.
    },
    {
      title: "Eq. ID",
      dataIndex: "equip_id",
      key: "equip_id",
      align: "center",
      render: (text) => (text ? text : "N/A"), // Display equipment ID
    },

    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Microbiologist Status",
      dataIndex: "micro_status",
      key: "micro_status",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Designee Status",
      dataIndex: "micro_designee_status",
      key: "micro_designee_status",
      align: "center",
      render: (text) => (text ? text : " "),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          style={{ width: "100%" }}
        >
          Review
        </Button>
      ),
    },
  ];

  // Define the Reason column separately
  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  // Conditionally add the Reason column if the 'reason' field is present in the data
  let columns = [...baseColumns];
  if (reason) {
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  }

  return (
    <>
      <div id="section-to-print">
        <style>
          {`
        @media print {
            @page {
                size: landscape;
                margin: 5mm; /* Reduced margin */
            }

            body {
                -webkit-print-color-adjust: exact;
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
            }

            #section-to-print {
                width: 90%;
                margin: 0 auto;
                padding: 0; /* Removed padding for print */
                overflow: hidden; /* Prevent overflow */
            }

            table {
                width: 100%;
                margin: 0; /* Removed margin */
                table-layout: auto; /* Changed to auto */
                border-collapse: collapse; /* Collapses borders */
            }

            td {
                padding: 5px; /* Reduced padding */
                font-size: 10pt; /* Reduced font size */
            }
        }
        `}
        </style>

        <table
          className="f18table"
          style={{
            width: "100%",
            margin: "auto",
            tableLayout: "fixed",
            marginTop: "20px",
          }}
        >
          <tr>
            <td
              rowSpan="4"
              style={{
                textAlign: "center",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
                marginTop: "50px",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "100px", height: "auto" }}
              />
              <br />
              Unit H
            </td>
            <td
              rowSpan="4"
              colSpan="4"
              style={{
                textAlign: "center",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              <b>DIGITAL COLONY COUNTER CALIBRATION REPORT</b>
            </td>
            <td
              style={{
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
                padding: "10px",
              }}
            >
              Format No.:
            </td>
            <td
              style={{
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
                padding: "10px",
              }}
            >
              PH-QCL01-F-030
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
                padding: "10px",
              }}
            >
              Revision No.:
            </td>
            <td
              style={{
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
                padding: "10px",
              }}
            >
              01
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
                padding: "10px",
              }}
            >
              Ref. SOP No.:
            </td>
            <td
              style={{
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
                padding: "10px",
              }}
            >
              PH-QCL01-D-04
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
                padding: "10px",
              }}
            >
              Page No.:
            </td>
            <td
              style={{
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
                padding: "10px",
              }}
            >
              1 of 1
            </td>
          </tr>
        </table>

        <table
          style={{
            width: "100%",
            height: "50%",
            margin: "auto",
            tableLayout: "auto" /* Changed to auto */,
            marginTop: "20px" /* Reduced top margin */,
          }}
        >
          <tr>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              Frequency: Monthly
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              Date: {formattedDate || "N/A"}
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              EQ.ID No: {selectedPrintEqNo || "N/A"}
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              Month & Year: {selectedPrintMonth || "N/A"} &{" "}
              {selectedPrintYear || "N/A"}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "5px",
                textAlign: "center",
                fontFamily: "Times New Roman, Times, serif",
              }}
              rowSpan="3"
              colSpan="2"
            >
              Calibration Observations
            </td>
            <td
              style={{
                padding: "5px",
                textAlign: "center",
                fontFamily: "Times New Roman, Times, serif",
              }}
              colSpan="4"
            >
              Activity
            </td>
            <td
              style={{
                padding: "5px",
                textAlign: "center",
                fontFamily: "Times New Roman, Times, serif",
              }}
              colSpan="2"
            >
              Status
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              Centering and Sizing the Image
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              Cross Hair Calibrating pattern Plate - Perfectly centered with
              respect to the blue Cross Hair
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              <span
                style={{
                  fontFamily: "Times New Roman, Times, serif",
                  padding: "10px",
                }}
              >
                {printData?.centering_status === "Matched"
                  ? "Done"
                  : "Not Done"}
              </span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              Adjusting Plate Processing to Specific Plates
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              Black Background Calibration - Calibrate to 460 Counted Colonies
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              <span
                style={{
                  fontFamily: "Times New Roman, Times, serif",
                  padding: "10px",
                }}
              >
                {printData?.adjusting_status === "Matched"
                  ? "Matched"
                  : "Not matched"}
              </span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="4"
            >
              Calibration time: {printData?.calibration_time || "N/A"}
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              Status: {printData?.activity_status || "N/A"}
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="2"
            >
              Calibration next due date: {formattedCalDueDate || "N/A"}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
              colSpan="8"
            >
              Remarks: {printData?.remarks || "N/A"}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
                textAlign: "center",
              }}
              colSpan="5"
            >
              Checked By:
              {printData?.micro_status === "MICROBIOLOGIST_APPROVED" && (
                <>
                  {getImage && (
                    <>
                      <br />
                      <img
                        className="signature"
                        src={getImage}
                        alt="Microbiologist"
                      />
                    </>
                  )}
                  <br />
                  {printData.micro_sign}
                  <br />
                  {formattedMicroDate}
                </>
              )}
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
                textAlign: "center",
              }}
              colSpan="3"
            >
              Verified By:
              {printData?.micro_designee_status ===
                "MICRO_DESIGNEE_APPROVED" && (
                <>
                  {getImage1 && (
                    <>
                      <br />
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Micro Designee"
                      />
                    </>
                  )}
                  <br />
                  {printData.micro_designee_sign}
                  <br />
                  {formattedDesigneeDate}
                </>
              )}
            </td>
          </tr>
        </table>

        <table
          className="f18table"
          style={{
            width: "100%",
            margin: "auto",
            tableLayout: "fixed",
            marginTop: "20px",
          }}
        >
          <tr>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
            >
              Particulars
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
            >
              Prepared by
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
            >
              Reviewed by
            </td>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
            >
              Approved by
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
            >
              Name
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                fontFamily: "Times New Roman, Times, serif",
                padding: "5px",
              }}
            >
              Signature & Date
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
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
                          if (window.confirm("Are you sure want to logout")) {
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
                          if (window.confirm("Are you sure want to logout")) {
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
                          if (window.confirm("Are you sure want to logout")) {
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
        formName="DIGITAL COLONY COUNTER CALIBRATION REPORT"
        formatNo="PH-QCL01/F-030"
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
              if (window.confirm("Are you sure want to logout")) {
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
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginTop: "10px",
          marginBottom: "10px",
          justifyContent: "start",
        }}
      >
        <Select
          id="yearSelect"
          style={{
            width: "20%",
            height: "36x",
            borderRadius: "0px",
            border: "1px solid #dddd",
            backgroundColor: "white",
            marginBottom: "3%",
          }}
          onChange={(value) => setSelectedYear(value)}
          placeholder="Select Year"
        >
          <Select.Option value="" disabled selected hidden>
            Select Year
          </Select.Option>
          {years.map((year) => (
            <Select.Option key={year.value} value={year.value}>
              {year.label}
            </Select.Option>
          ))}
        </Select>

        <Select
          id="monthSelect"
          style={{
            width: "20%",
            height: "36px",
            borderRadius: "0px",
            border: "1px solid #dddd",
            backgroundColor: "white",
            marginBottom: "3%",
            marginLeft: "30px",
          }}
          onChange={(value) => setSelectedMonth(value)} // Set selectedMonth directly to the value (string)
          placeholder="Select Month"
        >
          <Select.Option value="" disabled hidden>
            Select Month
          </Select.Option>
          {months.map((month) => (
            <Select.Option key={month.value} value={month.value}>
              {month.label}
            </Select.Option>
          ))}
        </Select>

        <Select
          id="EQ.id"
          style={{
            width: "20%",
            height: "36x",
            borderRadius: "0px",
            border: "1px solid #dddd",
            backgroundColor: "white",
            marginBottom: "3%",
            marginLeft: "30px",
          }}
          // onChange={(value) => setSelectMonth(value)}
          onChange={(value) => setSelectedEqNo(value)}
          placeholder="Select EQ.id"
        >
          <Select.Option value="" disabled selected hidden>
            Select Eq.id
          </Select.Option>

          <Select.Option value="PH-E/I-LAB01">PH-E/I-LAB01</Select.Option>
          <Select.Option value="PH-E/I-LAB02">PH-E/I-LAB02</Select.Option>
          <Select.Option value="PH-E/I-LAB08">PH-E/I-LAB08</Select.Option>
          <Select.Option value="PH-E/I-LAB09">PH-E/I-LAB09</Select.Option>
          <Select.Option value="PH-E/I-LAB38">PH-E/I-LAB38</Select.Option>
        </Select>

        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginBottom: "3%",
            marginLeft: "50px",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={handleGoToChange}
        >
          Go To
        </Button>
      </div>

      <Table
        bordered
        style={{ textAlign: "center" }}
        columns={columns}
        dataSource={summary}
      />
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
            loading={printLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <div
          style={{
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select Year:
            </label>
            <Select
              style={{ width: "135px", height: "28px", color: "black" }}
              value={selectedPrintYear}
              onChange={handlePrintYearChange}
              placeholder="Select Year"
            >
              {years.map((year) => (
                <Select.Option key={year.value} value={year.value}>
                  {year.label}
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
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select Month:
            </label>
            <Select
              style={{
                width: "135px",
                height: "28px",
                color: "black",
                marginLeft: "",
              }}
              value={selectedPrintMonth}
              placeholder="Select Month"
              onChange={handlePrintMonthChange}
            >
              {months.map((month) => (
                <Select.Option key={month.value} value={month.value}>
                  {month.label}
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
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select EQ.No.:
            </label>
            <Select
              placeholder="Select EQ.No."
              style={{ marginLeft: "0px", height: "28px" }}
              value={selectedPrintEqNo || undefined} // Control the value with state
              onChange={(value) => setSelectedPrintEqNo(value)} // Set the selected equipment number
            >
              <Select.Option value="PH-E/I-LAB01">PH-E/I-LAB01</Select.Option>
              <Select.Option value="PH-E/I-LAB02">PH-E/I-LAB02</Select.Option>
              <Select.Option value="PH-E/I-LAB08">PH-E/I-LAB08</Select.Option>
              <Select.Option value="PH-E/I-LAB09">PH-E/I-LAB09</Select.Option>
              <Select.Option value="PH-E/I-LAB38">PH-E/I-LAB38</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>

      {/*Print*/}
    </>
  );
};
export default QualityControl_f030_Summary;
