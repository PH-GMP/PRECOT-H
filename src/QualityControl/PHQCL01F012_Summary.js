/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
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

const QualityControl_f01_Summary = () => {
  const [reason, setReason] = useState(false);
  const [equipmentList, setEquipmentList] = useState([
    "PH-E/I-LAB01",
    "PH-E/I-LAB02",
    "PH-E/I-LAB08",
  ]);
  const [printAvailability, setPrintAvailability] = useState({
    date: null,
    month: null,
    year: null,
    equipment: null,
  });
  const [printData, setPrintData] = useState([]);
  const [modalData, setmodalData] = useState([]);
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [selectedEqNo, setSelectedEqNo] = useState(null); // New state for eqno
  const [selectedDate, setSelectedDate] = useState("");
  const [newData, setnewData] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const [PrintBmr, setPrintBmr] = useState(null);
  const [summary, setSummary] = useState();
  const [getData, setGetData] = useState([]);
  const [selectedPrintEqNo, setSelectedPrintEqNo] = useState(null); // New state for eqno
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [printLoading, setPrintLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [Evaluation, setEvaluation] = useState({
    eq: "",
    date: "",
  });
  const [showModal, setShowModal] = useState(false);

  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});

  // Function to fetch image based on the username
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
        } else {
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
      if (data.microbiologist_sign) {
        getImage(data.microbiologist_sign, "micro");
      }
      if (data.manager_sign) {
        getImage(data.manager_sign, "manager");
      }
    });
  }, [printData]);

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (
          data.manager_status === "QC_REJECTED" ||
          data.manager_status === "QA_REJECTED"
        ) {
          setReason(true);
          break;
        } else {
          setReason(false);
        }
      }
    };
    findReason();
  }, [getData]);

  const handlePrintDateChange = (e) => {
    setSelectedPrintDate(e.target.value);
  };

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
  };

 const  handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleEquipmentChange = (value) => {
    setEvaluation((prev) => ({ ...prev, eq: value }));
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

  // const handleGoToChange = () => {
  //   // Check if no fields are selected
  //   if (!Evaluation.date && !Evaluation.eq) {
  //     message.error("Please fill in all fields.");
  //     console.error("Error fetching data:",Evaluation);
  //     return;
  //   }

  //   // if (!Evaluation.date) {
  //   //   message.error("Please select a Date.");
  //   //   return;
  //   // }

  //   if (!Evaluation.eq) {
  //     message.error("Please select an Equipment Number.");
  //     return;
  //   }
  //   if (Evaluation.date && Evaluation.eq) {
  //     navigate("/Precot/QualityControl/F-012", {
  //       state: {
  //         uniqueDate: Evaluation.date,
  //         uniqueEqNo: Evaluation.eq,
  //       },
  //     });
  //   }
  // };

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
      navigate("/Precot/QualityControl/F-012", {
        state: {
          uniqueDate: selectedDate,
          uniqueEqNo: selectedEqNo,
        },
      });
    }
  };
 
  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
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

  const fetchPrintData = () => {
    let apiUrl = `${    API.prodUrl}/Precot/api/qc/BacterialIncubatorF012/PrintForF012?eqIdNo=${selectedPrintEqNo}`;

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
        // Add logic to handle the response (e.g., show print preview or download file)
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

    navigate("/Precot/QualityControl/F-012", {
      state: {
        uniqueDate: record.date,
        uniqueEqNo: record.eq,
      },
    });
  };

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/qc/BacterialIncubatorF012/GetAll`,
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
      const formattedData = response.data.map((item, index) => ({
        formatName: item.format,
        formatNo: item.formatNo,
        revisionNo: item.revisionNo,
        refSopNo: item.refSopNo,
        unit: item.unit,
        date: item.date,
        id: item.id,
        chemist_status: item.chemist_status,
        microbiologist_status: item.microbiologist_status,
        qc_status: item.manager_status,
        eq: item.eqIdNo,
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

  // const handleEdit = (record) => {
  //   console.log("wer", record);
  //   const x = newData.filter((x, i) => {
  //     return record.headerID === x.header_id;
  //   });
  //   console.log("x", x);
  //   navigate("/Precot/QualityControl/F-001", {
  //     state: {
  //       subbatch: batchNolist,
  //       bmrnos2: availableBMRnoLov,
  //     },
  //   });
  // };

  const handleCreate = () => {
    navigate("/Precot/Bleaching/F-13");
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

  

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Equipment Id",
      dataIndex: "eq",
      key: "eq",
      align: "center",
    },
    {
      title: "MicroBiology Status",
      dataIndex: "microbiologist_status",
      key: "microbiologist_status",
      align: "center",
    },
    {
      title: "Manager Status",
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

  // Set columns conditionally based on the presence of "reason" field
  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
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

  return (
    <div>
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
              <td colspan="5" rowSpan="4" style={{ textAlign: "center", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif", marginTop: '50px' }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                /><br />
                Unit H</td>
              <th colspan="15" rowSpan="4" style={{ textAlign: "center", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif" }}>BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT</th>
              <td colspan="5" style={{ textAlign: "left", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif" }}>Format No.:</td>
              <td colspan="5" style={{ textAlign: "left", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif" }}>PH-QCL01/F-012</td>

            </tr>
            <tr>
              <td colspan="5" style={{ textAlign: "left", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif" }}>Revision No.:</td>
              <td colspan="5" style={{ textAlign: "left", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif" }}>01</td>
            </tr>

            <tr>
              <td colspan="5" style={{ textAlign: "left", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif" }}>Ref. SOP No.:</td>
              <td colspan="5" style={{ textAlign: "left", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif" }}>PH-QCL01-D-04</td>
            </tr>

            <tr>
              <td colspan="5" style={{ textAlign: "left", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif" }}>Page No.:</td>
              <td colspan="5" style={{ textAlign: "left", fontSize: "12pt", fontFamily: "Times New Roman, Times, serif" }}>  {`${pageIndex + 1} of ${totalPages}`}</td>
            </tr>
          </thead>
          <br/>
              <tbody>
              <tr>
              <td colSpan="10" style={{ textAlign: "left", padding: '10px', border: '1px solid black' }}>Frequency: Daily</td>
              <td colSpan="10" style={{ textAlign: "left", padding: '10px', border: '1px solid black' }}>EQ. ID No: {pageData[0]?.eqIdNo ||"N/A"} </td>
              <td colSpan="10" style={{ textAlign: "left", padding: '10px', border: '1px solid black' }}>Standard Temperature in℃: 35 to 37</td>
            </tr>

            <tr></tr>
            <tr></tr>
 
            <tr>
              <th >S.No</th>
              <th colSpan='3' style={{ textAlign:'center' }}>Date</th>
              <th colSpan='6' style={{ textAlign:'center' }}>Set temperature in ℃  </th>
              <th colSpan='6' style={{ textAlign:'center' }}>Observed temperature  in ℃</th>
              <th colSpan='6' style={{ textAlign:'center' }}>Checked By</th>
              <th colSpan='6' style={{ textAlign:'center' }}>Verified By</th>
              <th colSpan='2' style={{ textAlign:'center' }}>Status</th>
            </tr>
          
                {pageData.map((item, index) => {
                  let formattedMicroDate = item.microbiologist_submit_on
                    ? moment(item.microbiologist_submit_on).format("DD/MM/YYYY HH:mm")
                    : "";
          
                  let formattedManagerDate = item.manager_submit_on
                    ? moment(item.manager_submit_on).format("DD/MM/YYYY HH:mm")
                    : "";
          
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td colSpan='3' style={{ textAlign:'center' }}>{formatDate(item.date)}</td>
                      <td colSpan='6' style={{ textAlign:'center' }}>{item.setTemperature||"0"}</td>
                      <td colSpan='6' style={{ textAlign:'center' }}>{item.obserevedTemperature||"0"}</td>
                      <td colSpan ='6' style={{ textAlign: "center", padding: "10px",tableLayout: "fixed"}}>
                        {getImage1[item.microbiologist_sign] && (
                          <img
                            src={getImage1[item.microbiologist_sign]}
                            alt="Micro Signature"
                            style={{ width: "50px", height: "auto" }}
                          />
                        )}
                        <br />
                        {item.microbiologist_sign}
                        <br />
                        {formattedMicroDate}
                      </td>
                      <td colSpan='6'style={{ textAlign: "center", padding: "10px", tableLayout: "fixed" }}>
                        {getImage2[item.manager_sign] && (
                          <img
                            src={getImage2[item.manager_sign]}
                            alt="Manager Signature"
                            style={{ width: "50px", height: "auto" }}
                          />
                        )}
                        <br />
                        {item.manager_sign}
                        <br />
                        {formattedManagerDate}
                      </td>
                      <td colSpan='2' style={{ textAlign:'center' }}>{item.status||"N/A"}</td>
                    </tr>
                  );
                })}
              </tbody>
              <br/>
              <tfoot>
            <tr>
              <td colspan="8" style={{ textAlign: 'center' }}>Particulars</td>
              <td colspan="7" style={{ textAlign: 'center' }}>Prepared by</td>
              <td colspan="7" style={{ textAlign: 'center' }}>Reviewed by</td>
              <td colspan="8" style={{ textAlign: 'center' }}>Apporved by</td>
            </tr>

            <tr>
              <td colspan="8" style={{ textAlign: 'center' }}>Name</td>
              <td colspan="7" style={{ textAlign: 'center' }}></td>
              <td colspan="7" style={{ textAlign: 'center' }}></td>
              <td colspan="8" style={{ textAlign: 'center' }}></td>
            </tr>

            <tr>
              <td colspan="8" style={{ textAlign: 'center' }}>Signature & Date</td>
              <td colspan="7" style={{ textAlign: 'center' }}></td>
              <td colspan="7" style={{ textAlign: 'center' }}></td>
              <td colspan="8" style={{ textAlign: 'center' }}></td>
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
      <BleachingHeader
        unit="Unit-H"
        formName="BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT"
        formatNo="PH-QCL01/F-012"
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
        <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <div>
      
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
 
        <Select
          placeholder="Select EQ.No."
          style={{ marginLeft: "40px", height: "28px" }}
          onChange={(value) => setSelectedEqNo(value)} // Set the selected equipment number
        >
          <Select.Option value="PH-E/I-LAB01">PH-E/I-LAB01</Select.Option>
          <Select.Option value="PH-E/I-LAB02">PH-E/I-LAB02 </Select.Option>
          <Select.Option value="PH-E/I-LAB08">PH-E/I-LAB08 </Select.Option>
        </Select>
 
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

export default QualityControl_f01_Summary;
