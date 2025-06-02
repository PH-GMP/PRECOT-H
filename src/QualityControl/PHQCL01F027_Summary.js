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

const QualityControl_f027_Summary = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const [selectedEqNo, setSelectedEqNo] = useState(null); // New state for eqno
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState(false);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [selectedPrintEqNo, setSelectedPrintEqNo] = useState(null); // New state for eqno
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [printData, setPrintData] = useState([]);
  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});
  const [formData, setFormData] = useState({
    eqNo: "", // Default empty value for equipment number
    date: "", // Default empty value for date
  });
  const [equipmentNumbers, setEquipmentNumbers] = useState([]);
  // State for unique eq_no values

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const handleSelectText = (e, name) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    }
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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  // Generate year options from current year to previous 20 years
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }

  // Generate month options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleGoToChange = () => {
    // Check if no fields are selected
    if (!selectedDate && !selectedEqNo) {
      message.error("Please fill in all fields.");
      return;
    }

    if (!selectedDate) {
      message.error("Please select a Date.");
      return;
    }

    if (!selectedEqNo) {
      message.error("Please select an Equipment Number.");
      return;
    }
    if (selectedDate && selectedEqNo) {
      navigate("/precot/QualityControl/PH-QCF-027", {
        state: {
          uniqueDate: selectedDate,
          uniqueEqNo: selectedEqNo,
        },
      });
    }
  };

  const handleModalClose = () => {
    setPrintLoading(false);
    setShowModal(false);
    setSelectedPrintDate(null);
    setSelectedPrintMonth(null);
    setSelectedPrintYear(null);
  };

  const printSubmit = () => {
    if (
      !selectedPrintEqNo &&
      !selectedPrintMonth &&
      !selectedPrintYear &&
      !selectedPrintDate
    ) {
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
    // Check if any date, month, or year is selected along with EQ No.
    if (!selectedPrintMonth && !selectedPrintYear && !selectedPrintDate) {
      message.error("Please select a date, month, or year along with EQ No.");
      handleModalClose();
      return;
    }
    // If EQ No. and at least one of date, month, or year is selected, proceed with the API call
    if (
      selectedPrintEqNo &&
      (selectedPrintMonth || selectedPrintYear || selectedPrintDate)
    ) {
      fetchPrintData(); // Call the function that handles the API request
    }
  };

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/chemicaltest/CLF027/print`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "json",
          }
        );
        const data = response.data;

        console.log("data", data);
        // Extract and filter unique eq_no values
        const uniqueEqNos = Array.from(new Set(data.map((item) => item.eq_id)));
        console.log("uniqueEqNos:", uniqueEqNos);
        // Set the unique eq_no values in state
        setEquipmentNumbers(uniqueEqNos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);

  const fetchPrintData = () => {
    let apiUrl = `${    API.prodUrl}/Precot/api/chemicaltest/CLF027/print?eq_no=${selectedPrintEqNo}`;

    // Append the appropriate date parameters to the API URL
    if (selectedPrintDate) {
      apiUrl += `&date=${selectedPrintDate}`;
    } else if (selectedPrintYear && selectedPrintMonth) {
      apiUrl += `&year=${selectedPrintYear}&month=${selectedPrintMonth}`;
    } else if (selectedPrintYear) {
      apiUrl += `&year=${selectedPrintYear}`;
    }

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure the token is set correctly
        },
        responseType: "json",
      })
      .then((response) => {
        console.log("Print Data:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintData(response.data);
          setPrintLoading(true);

          setTimeout(() => {
            window.print(); // Trigger printing
            handleModalClose(); // Close the modal after printing
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

  const handleEdit = (record) => {
    console.log("edit selected id", record.date, record.eq);

    console.log("x", record);

    navigate("/precot/QualityControl/PH-QCF-027", {
      state: {
        uniqueDate: record.date,
        uniqueEqNo: record.eq_id,
      },
    });
  };

  useEffect(() => {
    axios
      .get(`${    API.prodUrl}/Precot/api/chemicaltest/CLF027/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSummary(response.data); // Set the fetched data in state
        // Check if any record contains the "reason" field
        setReason(response.data.some((item) => item.reason));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Turn off loading after data is fetched
      });
  }, []);

  const getImage = (username, type) => {
    axios
      .get(`${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer",
      })
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const url = `data:image/jpeg;base64,${base64}`;

        if (type === "micro") {
          setGetImage1((prev) => ({ ...prev, [username]: url }));
        } else if (type === "chemist") {
          setGetImage2((prev) => ({ ...prev, [username]: url }));
        }
      })
      .catch((err) => {
        console.error("Error in fetching image:", err);
      });
  };

  // Fetch signatures for both microbiologist and chemist
  useEffect(() => {
    printData.forEach((data) => {
      if (data.micro_sign) {
        getImage(data.micro_sign, "micro");
      }
      if (data.chemist_sign) {
        // Assuming chemist's signature is stored as 'chemist_sign'
        getImage(data.chemist_sign, "chemist");
      }
    });
  }, [printData]);

  const handlePrintDateChange = (e) => {
    setSelectedPrintDate(e.target.value);
  };

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
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
    },
    {
      title: "EQ. Id",
      dataIndex: "eq_id",
      key: "eq_id",
      align: "center",
    },
    {
      title: "Microbiologist/Chemist Status",
      key: "status", // Unique key for this column
      align: "center",
      render: (text, record) => {
        return record.chemist_status || record.micro_status || "N/A"; // Display chemist_status if available, otherwise microstatus, or 'N/A' if neither exists
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          style={{ width: "100%" }}
          onClick={() => handleEdit(record)}
        >
          Review
        </Button>
      ),
    },
  ];

  // No longer conditionally adding the "Reason" column
  let columns = baseColumns;

  return (
    <>
      <div id="section-to-print">
        <style>
          {`
    @media print {
      @page {
        size: landscape;
        margin: 8mm; /* Add uniform margins to the printed page */
      }

      body {
        -webkit-print-color-adjust: exact;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }

      #section-to-print {
        width: 100%;
        margin: 0 auto; /* Centers content horizontally */
        padding-left: 5mm; /* Adjust this value if needed */
        padding-right: 5mm; /* Ensure some balance for print alignment */
        page-break-after: always,
         tableLayout: "fixed";
      }

      table {
        width: 100%;
        margin: auto;
      }
    }
  `}
        </style>

        {/* Logic for pagination */}
        {(() => {
          const entriesPerPage = 4;
          const totalPages = Math.ceil(printData.length / entriesPerPage);

          // Split the data into pages
          const pages = Array.from({ length: totalPages }, (_, i) =>
            printData.slice(i * entriesPerPage, (i + 1) * entriesPerPage)
          );
          return pages.map((printData, pageIndex) => (
            <div key={pageIndex}>
              <table
                className="f18table"
                style={{
                  width: "100%",
                  margin: "auto",
                  tableLayout: "fixed",
                  marginTop: "50px",
                }}
              >
                <thead>
                  <tr>
                    <td
                      colspan="5"
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
                      colspan="15"
                      rowSpan="4"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      DISTILLED WATER CONSUMPTION REPORT
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Format No.:
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      PH-QCL01/F-027
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Revision No.:
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      01
                    </td>
                  </tr>

                  <tr>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Ref. SOP No.:
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      PH-QCL01-D-13
                    </td>
                  </tr>

                  <tr>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Page No.:
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {" "}
                      {`${pageIndex + 1} of ${totalPages}`}
                    </td>
                  </tr>
                </thead>
                <br />
                <tbody>
                  <tr>
                    <td
                      colSpan="15"
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        border: "1px solid black",
                      }}
                    >
                      Frequency: Daily
                    </td>
                    <td
                      colSpan="15"
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        border: "1px solid black",
                      }}
                    >
                      EQ. ID No: {printData[0]?.eq_id}{" "}
                    </td>
                  </tr>

                  <tr></tr>
                  <tr></tr>

                  <tr>
                    <th>S.No</th>
                    <th
                      colSpan="2"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      Date
                    </th>
                    <th
                      colSpan="5"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      Opening Stock (approx. In Lit.){" "}
                    </th>
                    <th
                      colSpan="5"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      Quantity Taken (approx. In Lit.)
                    </th>
                    <th
                      colSpan="5"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      Taken By (Sign & Date)
                    </th>
                    <th
                      colSpan="5"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      Remaining Stock (approx. In Lit.)
                    </th>
                    <th
                      colSpan="5"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      Quantity Prepared (approx. In Lit.)
                    </th>
                    <th
                      colSpan="2"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      Remarks
                    </th>
                  </tr>
                  {printData.map((item, index) => {
                    let formattedMicroDate = item.micro_submit_on
                      ? moment(item.micro_submit_on).format("DD/MM/YYYY HH:mm")
                      : "";

                    let formattedChemistDate = item.chemist_submit_on
                      ? moment(item.chemist_submit_on).format(
                          "DD/MM/YYYY HH:mm"
                        )
                      : "";

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {item.date
                            ? moment(item.date).format("DD/MM/YYYY")
                            : "N/A"}
                        </td>
                        <td
                          colSpan="5"
                          style={{ padding: "10px", textAlign: "center" }}
                        >
                          {item.op_stock || "N/A"}
                        </td>
                        <td
                          colSpan="5"
                          style={{ padding: "10px", textAlign: "center" }}
                        >
                          {item.quantity_taken || "N/A"}
                        </td>
                        <td
                          colSpan="5"
                          style={{ padding: "10px", textAlign: "center" }}
                        >
                          {getImage1[item.micro_sign] ||
                          getImage2[item.chemist_sign] ? (
                            <img
                              src={
                                getImage1[item.micro_sign] ||
                                getImage2[item.chemist_sign]
                              }
                              alt={
                                item.micro_sign
                                  ? "Microbiologist Signature"
                                  : "Chemist Signature"
                              }
                              style={{ width: "50px", height: "auto" }}
                            />
                          ) : null}
                          <br />
                          {item.micro_sign} {item.chemist_sign}
                          <br />
                          {formattedChemistDate}
                          {formattedMicroDate}
                        </td>
                        <td
                          colSpan="5"
                          style={{ padding: "10px", textAlign: "center" }}
                        >
                          {item.remaining_stock || "N/A"}
                        </td>
                        <td
                          colSpan="5"
                          style={{ padding: "10px", textAlign: "center" }}
                        >
                          {item.quantity_prepared || "N/A"}
                        </td>
                        <td
                          colSpan="2"
                          style={{ padding: "10px", textAlign: "center" }}
                        >
                          {item.remarks || "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                <br />
                <tfoot>
                  <tr>
                    <td colspan="8" style={{ textAlign: "center" }}>
                      Particulars
                    </td>
                    <td colspan="7" style={{ textAlign: "center" }}>
                      Prepared by
                    </td>
                    <td colspan="7" style={{ textAlign: "center" }}>
                      Reviewed by
                    </td>
                    <td colspan="8" style={{ textAlign: "center" }}>
                      Apporved by
                    </td>
                  </tr>

                  <tr>
                    <td colspan="8" style={{ textAlign: "center" }}>
                      Name
                    </td>
                    <td colspan="7" style={{ textAlign: "center" }}></td>
                    <td colspan="7" style={{ textAlign: "center" }}></td>
                    <td colspan="8" style={{ textAlign: "center" }}></td>
                  </tr>

                  <tr>
                    <td colspan="8" style={{ textAlign: "center" }}>
                      Signature & Date
                    </td>
                    <td colspan="7" style={{ textAlign: "center" }}></td>
                    <td colspan="7" style={{ textAlign: "center" }}></td>
                    <td colspan="8" style={{ textAlign: "center" }}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ));
        })()}
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
        formName="DISTILLED WATER CONSUMPTION REPORT"
        formatNo="PH-QCL01/F-027"
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
        <Input
          addonBefore="Date"
          placeholder="Date"
          type="date"
          size="small"
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ fontWeight: "bold", width: "135px" }}
          max={getCurrentDate()}
        />

        <Input
          placeholder="Enter EQ.No."
          style={{ marginLeft: "40px", height: "28px", width: "135px" }}
          onChange={(e) => setSelectedEqNo(e.target.value)} // Set the typed equipment number
        />

        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "10px",
            height: "28px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          onClick={handleGoToChange}
        >
          Go to
        </Button>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={summary}
        pagination={{ pageSize: 10 }}
        rowKey="id" // Assuming each row has a unique id
        loading={loading}
        style={{ textAlign: "center" }}
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
                <Select.Option key={year} value={year}>
                  {year}
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
              {months.map((month, index) => (
                <Select.Option key={index} value={month}>
                  {month}
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
              Select Date:
            </label>
            <Input
              placeholder="Date"
              type="date"
              size="small"
              format="DD/MM/YYYY"
              value={selectedPrintDate}
              onChange={handlePrintDateChange}
              style={{ fontWeight: "", width: "135px", marginLeft: "" }}
              max={getCurrentDate()}
            />
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
              {equipmentNumbers.map((eqNo) => (
                <Select.Option key={eqNo} value={eqNo}>
                  {eqNo}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default QualityControl_f027_Summary;
