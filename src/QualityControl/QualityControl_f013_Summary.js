/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Select, Descriptions, Menu, Avatar, Drawer } from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import { Tooltip } from "antd";
import moment from "moment";
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
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";
// import Padpunching_f25_summary from "./Padpunching_f25_Summary.js";

const QualityControl_F013_Summary = () => {
  const [open, setOpen] = useState(false);
  const [selectYear, setSelectYear] = useState("");
  const [Months, setMonths] = useState("");

  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      // transform-origin: top right; /* Adjust the origin if needed */
      // transform-origin: bottom top ;
      transform-origin: bottom top;
      // transform-origin: top left;

    }
  }
`;

  const [newDate, setNewDate] = useState("");
  const [neweqid, setEq] = useState("");

  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [ContaminationData, setContaminationData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [date, setDate] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);

  const [PrintByDate, setPrintByDate] = useState(null);
  const [printResponseData, setPrintResponseData] = useState([]);
  const [SecondResponseData, setSecondResponseData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [shiftLov, setShiftLov] = useState([]);
  const [reason, setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [getData, setGetData] = useState([]);
  const [summary, setSummary] = useState();
  const [selectedPrintEqNo, setSelectedPrintEqNo] = useState(null); // New state for eqno
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [printData, setPrintData] = useState([]);

  const [showModal, setShowModal] = useState(false);

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
  const formattedToday = `${year}-${month}-${day}`;

  console.log("SecondResponse", SecondResponseData);

  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});

  // Function to fetch image based on the username
  const getImage = (username, type) => {
    axios
      .get(`${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`, {
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

        if (type === "chemist") {
          setGetImage1((prev) => ({ ...prev, [username]: url }));
        } else if (type === "qc") {
          setGetImage2((prev) => ({ ...prev, [username]: url }));
        }
      })
      .catch((err) => {
        console.error("Error in fetching image:", err);
      });
  };

  // Fetch chemist and QC images for all data in printData
  useEffect(() => {
    printData.forEach((data) => {
      if (data.chemist_sign) {
        getImage(data.chemist_sign, "chemist");
      }
      if (data.qc_sign) {
        getImage(data.qc_sign, "qc");
      }
    });
  }, [printData]);

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

  const fetchPrintData = () => {
    let apiUrl = `${   API.prodUrl}/Precot/api/chemicaltest/CLF013/print?eq_no=${selectedPrintEqNo}`;

    // Build API URL based on selected fields
    if (selectedPrintDate) {
      apiUrl += `&date=${selectedPrintDate}`;
    } else if (selectedPrintYear && selectedPrintMonth) {
      // Pass year and month as separate parameters
      apiUrl += `&year=${selectedPrintYear}&month=${selectedPrintMonth}`;
    } else if (selectedPrintYear) {
      apiUrl += `&year=${selectedPrintYear}`;
    }

    // Make the API request
    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        // Handle the API response
        console.log("Print Data:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintData(response.data);
          setPrintLoading(true);

          setTimeout(() => {
            window.print(); // Proceed with printing
            handleModalClose(); // Close the modal after printing
          }, 3000);

          console.log("print data", response.data);
        } else {
          setPrintData([]); // Ensure printData is always an array
          setPrintLoading(false);
          message.error(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose(); // Close modal if no details found
        }
      })
      .catch((error) => {
        console.error("Error fetching print data:", error);
        message.error("Error fetching data. Please try again.");
        setPrintLoading(false);
      });
  };

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/chemicaltest/CLF013/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the reason field is present in the response
      if (response.data && response.data.length !== 0) {
        setReason(true);
      } else {
        setReason(false);
      }

      // Store the fetched data in the state
      setGetData(response.data);

      // Map the data to match the columns
      const formattedData = response.data.map((item) => ({
        id: item.lab_id, // S.No will be generated in the column render
        eq: item.eq_id_no,
        date: item.date,
        microbiologist_status: item.chemist_status,
        designee_status: item.qc_status,
        reason: item.reason,
      }));

      // Update the summary state
      setSummary(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Use the useEffect hook to fetch data on component mount
  useEffect(() => {
    getAll();
  }, []);

  const [gotobtn, setGotobtn] = useState(true);

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role = userRole;

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

  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };
  const printDateSubmit = () => {
    // checkDateExists();
  };
  const handleDateChange = (event) => {
    setPrintByDate(event.target.value);
  };
  const handlePrintDateChange = (e) => {
    setSelectedPrintDate(e.target.value);
  };

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    // Return in YYYY-MM-DD format for type="date" input
    return `${year}-${month}-${day}`;
  };
  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
  };
  const formattedDate = moment(datePrint, "YYYY-MM-DD").format("DD/MM/YYYY");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const goTo = () => {
    navigate("/Precot/QualityControl/F-013", {
      state: {
        date: newDate,
        Eqid: neweqid,

        //  year:selectYear,
        //  mon:Months,
      },
    });
  };

  const handleEdit = (record) => {
    console.log("edit selected id", record.date, record.eq);

    console.log("x", record);

    navigate("/Precot/QualityControl/F-013", {
      state: {
        date: record.date,
        Eqid: record.eq,
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Precot");
  };

  useEffect(() => {
    console.log("modal", modalData);
  }, [modalData]);

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
      render: (text, record, index) => index + 1, // Generating the serial number
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Equipment Id",
      dataIndex: "eq",
      key: "eq",
      align: "center",
    },
    {
      title: "Microbiologist Status",
      dataIndex: "microbiologist_status",
      key: "microbiologist_status",
      align: "center",
    },
    {
      title: "Designee Status",
      dataIndex: "designee_status",
      key: "designee_status",
      align: "center",
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

  // Define the Reason column separately
  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  // Set columns conditionally based on the presence of the "reason" field
  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  return (
    <div>
      {contextHolder}

      <GlobalStyle />
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
          page-break-after: always;
          tableLayout: "fixed";
        }

        table {
          width: 100%;
          margin: auto;
        }
      }
    `}
        </style>

        {(() => {
          const entriesPerPage = 4;
          const totalPages = Math.ceil(printData.length / entriesPerPage);

          // Split the data into pages
          const pages = Array.from({ length: totalPages }, (_, i) =>
            printData.slice(i * entriesPerPage, (i + 1) * entriesPerPage)
          );

          return pages.map((pageData, pageIndex) => (
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
                    <th
                      colspan="20"
                      rowSpan="4"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT
                    </th>
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
                      PH-QCL01/F-013
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
                      PH-QCL01-D-04
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
                      {`${pageIndex + 1} of ${totalPages}`}
                    </td>
                  </tr>
                </thead>
                <br />
                <tbody>
                  <tr>
                    <td
                      colSpan="12"
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        border: "1px solid black",
                      }}
                    >
                      Frequency: Daily
                    </td>
                    <td
                      colSpan="12"
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        border: "1px solid black",
                      }}
                    >
                      EQ. ID No: {selectedPrintEqNo || "N/A"}
                    </td>
                    <td
                      colSpan="11"
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        border: "1px solid black",
                      }}
                    >
                      Standard Temperature in ℃: 20 to 25
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: "left" }}>
                      S.No
                    </th>
                    <th colSpan="3" style={{ textAlign: "center" }}>
                      Date
                    </th>
                    <th colSpan="6" style={{ textAlign: "center" }}>
                      Set temperature in ℃
                    </th>
                    <th colSpan="6" style={{ textAlign: "center" }}>
                      Observed temperature in ℃
                    </th>
                    <th colSpan="7" style={{ textAlign: "center" }}>
                      Checked By
                    </th>
                    <th colSpan="7" style={{ textAlign: "center" }}>
                      Verified By
                    </th>
                    <th colSpan="4" style={{ textAlign: "center" }}>
                      Status
                    </th>
                  </tr>

                  {pageData.map((item, index) => {
                    let formattedQCDate = item.qc_submit_on
                      ? moment(item.qc_submit_on).format("DD/MM/YYYY HH:mm")
                      : "";

                    let formattedChemistDate = item.chemist_submit_on
                      ? moment(item.chemist_submit_on).format(
                          "DD/MM/YYYY HH:mm"
                        )
                      : "";
                    return (
                      <tr key={index}>
                        <td colSpan="2">{index + 1}</td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {formatDate(item.date) || "N/A"}
                        </td>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          {item.set_temperature || "0"}
                        </td>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          {item.obs_temperature || "0"}
                        </td>
                        <td
                          colSpan="7"
                          style={{
                            textAlign: "center",
                            padding: "10px",
                            tableLayout: "fixed",
                          }}
                        >
                          {getImage1[item.chemist_sign] && (
                            <img
                              src={getImage1[item.chemist_sign]}
                              alt="Chemist Signature"
                              style={{ width: "50px", height: "auto" }}
                            />
                          )}
                          <br />
                          {item.chemist_sign}
                          <br />
                          {formattedChemistDate}
                        </td>

                        <td
                          colSpan="7"
                          style={{
                            textAlign: "center",
                            padding: "10px",
                            tableLayout: "fixed",
                          }}
                        >
                          {getImage2[item.qc_sign] && (
                            <img
                              src={getImage2[item.qc_sign]}
                              alt="QC Signature"
                              style={{ width: "50px", height: "auto" }}
                            />
                          )}
                          <br />
                          {item.qc_sign}
                          <br />
                          {formattedQCDate}
                        </td>

                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.status || "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <br />
                <tfoot>
                  <tr>
                    <td colspan="11" style={{ textAlign: "center" }}>
                      Particulars
                    </td>
                    <td colspan="8" style={{ textAlign: "center" }}>
                      Prepared by
                    </td>
                    <td colspan="8" style={{ textAlign: "center" }}>
                      Reviewed by
                    </td>
                    <td colspan="8" style={{ textAlign: "center" }}>
                      Approved by
                    </td>
                  </tr>

                  <tr>
                    <td colspan="11" style={{ textAlign: "center" }}>
                      Name
                    </td>
                    <td colspan="8" style={{ textAlign: "center" }}></td>
                    <td colspan="8" style={{ textAlign: "center" }}></td>
                    <td colspan="8" style={{ textAlign: "center" }}></td>
                  </tr>

                  <tr>
                    <td colspan="11" style={{ textAlign: "center" }}>
                      Signature & Date
                    </td>
                    <td colspan="8" style={{ textAlign: "center" }}></td>
                    <td colspan="8" style={{ textAlign: "center" }}></td>
                    <td colspan="8" style={{ textAlign: "center" }}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ));
        })()}
      </div>

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT"
          formatNo="PH-QCL01/F-013 "
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
          ]}
        />
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />

        <div>
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="Medium"
            format="DD/MM/YYYY"
            max={getCurrentDate()}
            value={newDate}
            style={{
              width: "20%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "3%",
              marginLeft: "20px",
            }}
            onChange={(e) => setNewDate(e.target.value)}
          />
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
            onChange={(value) => setEq(value)}
            placeholder="Select EQ.id"
          >
            <Select.Option value="" disabled selected hidden>
              Select Eq.id
            </Select.Option>

            <Select.Option value="PH-E/I-LAB01">PH-E/I-LAB01</Select.Option>
            <Select.Option value="PH-E/I-LAB02">PH-E/I-LAB02</Select.Option>
            <Select.Option value="PH-E/I-LAB08">PH-E/I-LAB08</Select.Option>
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
            onClick={goTo}
          >
            Go To
          </Button>
        </div>
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
              <Select.Option value="PH-E/I-LAB01">PH-E/I-LAB01</Select.Option>
              <Select.Option value="PH-E/I-LAB02">PH-E/I-LAB02</Select.Option>
              <Select.Option value="PH-E/I-LAB08">PH-E/I-LAB08</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QualityControl_F013_Summary;
