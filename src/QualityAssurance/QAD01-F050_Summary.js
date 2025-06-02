/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../Assests/logo.png";
import {
  Table,
  Modal,
  Select,
  InputGroup,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { Tabs, Button, Col, Input, Row } from "antd";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import moment from "moment";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f50_Summary = () => {
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

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [year, setYear] = useState("");
  const [newDate, setNewDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [yearPrint, setYearPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [getImage1, setGetImage1] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departmentList, setdepartmentList] = useState();
  const [PrintDepartmentName, setPrintDepartmentName] = useState("");
  const [PrintDate, setPrintDate] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("");

  const [getImage2, setGetImage2] = useState("");

  const fetchImages = async () => {
    setImagesLoaded(false); // Reset imagesLoaded for each call
    const token = localStorage.getItem("token");

    try {
      const promises = printResponseData.map((item, dataIndex) => {
        const qaInspectorUsername = item?.qa_inspector_sign;
        const managerUsername = item?.manager_sign;

        const requests = [];

        // QA Inspector image fetch
        if (qaInspectorUsername) {
          const qaRequest = axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${qaInspectorUsername}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImage1((prevImages) => ({
                ...prevImages,
                [dataIndex]: url,
              }));
            })
            .catch((err) => {
              if (err.response?.status !== 400) throw err; // Handle only non-400 errors
            });
          requests.push(qaRequest);
        }

        // Manager image fetch
        if (managerUsername) {
          const managerRequest = axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${managerUsername}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImage2((prevImages) => ({
                ...prevImages,
                [dataIndex]: url,
              }));
            })
            .catch((err) => {
              if (err.response?.status !== 400) throw err; // Handle only non-400 errors
            });
          requests.push(managerRequest);
        }

        return Promise.all(requests);
      });

      await Promise.all(promises);
      setImagesLoaded(true); // Mark images as loaded after all promises complete
    } catch (err) {
      console.error("Error in fetching images:", err);
    }
  };

  useEffect(() => {
    if (printResponseData && printResponseData.length > 0) {
      fetchImages();
    }
  }, [printResponseData]);

  // UseEffect to trigger print when imagesLoaded becomes true
  useEffect(() => {
    if (imagesLoaded) {
      console.log("Images loaded, triggering print...");
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 300);
    }
  }, [imagesLoaded]);

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrint = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setPrintDate(null);
    setYearPrint(null);
    setSelectedMonth("");
    setPrintDepartmentName("");
  };

  const onChangeDepartment = async (value, option) => {
    const selectedLabel = option.label;

    setDepartmentName(selectedLabel);
  };

  const onChangePrintDepartment = async (value, option) => {
    const selectedLabel = option.label;

    setPrintDepartmentName(selectedLabel);
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

  //   handle edit
  const handleEdit = (record) => {
    const { date, department } = record;
    navigate("/Precot/QA/F-50", {
      state: {
        Date: date,
        Department: department,
      },
    });
  };

  function generateYears(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ key: year.toString(), value: year.toString() });
    }
    return years;
  }

  const yearOptions = generateYears(2024, 2100);

  const handleYearChange = (value) => {
    setYear(value);
  };
  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/QA/Service/ListOfGHpWcsummary`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const isJSON = response.headers
        .get("content-type")
        ?.includes("application/json");

      let data = null;
      if (isJSON) {
        data = await response.json();
      }

      if (response.ok && data && data.length >= 0) {
        setTableData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            department: item.department,
            qa_inspector_status: item.qa_inspector_status,
            rej_reason: item.rej_reason,
            manager_status: item.manager_status,
            sno: index + 1,
          }))
        );
      } else {
        const errorMessage =
          data?.message || "Failed to fetch data or invalid response";
        message.error(errorMessage);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      const errorMessage =
        error?.message || "An unknown error occurred while fetching data";
      message.error(errorMessage);
    }
  };

  useEffect(() => {
    const findReason = () => {
      const rejectedStatus = tableData.some(
        (data) => data.manager_status === "MANAGER_REJECTED"
      );
      setReason(rejectedStatus);
    };

    findReason();
  }, [tableData]);

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "QA Inspector Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      align: "center",
    },
    {
      title: "QA_Manager/MR Status",
      dataIndex: "manager_status",
      key: "manager_status",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          style={{ width: "100%" }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const Reason = {
    title: "Reason",
    dataIndex: "rej_reason",
    key: "rej_reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  const monthNames = [
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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const fetchPrintData = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${API.prodUrl}/Precot/api/QA/Service/ListOfGHpWcPrint?`;

      if (PrintDate) url += `&date=${PrintDate}`;
      if (selectedMonth) url += `&month=${selectedMonth}`;
      if (yearPrint) url += `&year=${yearPrint}`;
      if (PrintDepartmentName) url += `&department=${PrintDepartmentName}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if there is no data or the API returns a specific 'No data' message
      if (
        response.data &&
        response.data.success &&
        response.data.message === "No data"
      ) {
        message.error("No data available .");
        handleModalClose();
      } else if (response.data && response.data.length > 0) {
        setPrintResponseData(response.data);
        console.log("printResponseData", response.data); // Updated to log the actual response
      } else {
        // Case when there is no response data or other unknown issues
        message.warning("No data available .");
        handleModalClose();
      }
    } catch (error) {
      message.error("Error fetching data. Please try again.");
      console.error("API Error:", error);
    }
  };

  const printSubmit = async () => {
    if (!isPrinting) {
      setIsPrinting(true);

      await fetchPrintData();
      await fetchImages();

      if (imagesLoaded) {
        console.log("Images loaded, triggering print...");
        window.print();
      } else {
        console.log("Images are not loaded yet.");
      }
      setIsPrinting(false);
      handleModalClose();
    }
  };

  useEffect(() => {
    const handleAfterPrint = () => {
      setIsPrinting(false); // Reset the printing flag after the print dialog closes
      handleModalClose(); // Ensure modal closes when printing completes
    };

    // Listen to the 'afterprint' event
    window.addEventListener("afterprint", handleAfterPrint);

    // Clean up event listener when the component unmounts
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  useEffect(() => {
    // Fetch department options from the API
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );

        const formattedData = response.data.map((x) => ({
          value: x.id,
          label: x.department,
        }));

        setdepartmentList(formattedData);
      } catch (error) {
        console.error("Error fetching department list:", error);
      }
    };

    fetchDepartments();
  }, []);

  //   goto button
  const goTo = () => {
    if (newDate == "" || newDate == null) {
      message.warning("Please Select Date");
      return;
    }

    if (departmentName == "" || departmentName == null) {
      message.warning("Please Select Department");
      return;
    }

    navigate("/Precot/QA/F-50", {
      state: {
        Date: newDate,
        Department: departmentName,
      },
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <div>
      <GlobalStyle />

      <div id="section-to-print">
        {printResponseData?.map((data, dataIndex) => (
          <div key={dataIndex} style={{ pageBreakBefore: "always" }}>
            <table
              style={{
                marginTop: "10px",
                marginLeft: "0px",
                scale: "100%",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
                <tr>
                  <td colSpan="20" rowspan="4" style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br /> Unit H
                  </td>
                  <th colSpan="50" rowSpan="4" style={{ textAlign: "center" }}>
                    LIST OF GLASS /HARD PLASTIC / WOOD / CERAMIC
                  </th>
                  <td colSpan="15">Format No.:</td>
                  <td colSpan="15">PH-QAD01-F-050</td>
                </tr>
                <tr>
                  <td colSpan="15">Revision No.:</td>
                  <td colSpan="15">01</td>
                </tr>
                <tr>
                  <td colSpan="15">Ref. SOP No.:</td>
                  <td colSpan="15">PH-QAD01-D-47</td>
                </tr>
                <tr>
                  <td colSpan="15">Page No.:</td>
                  <td colSpan="15"></td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="50">Type : Glass</td>
                  <td colSpan="50">Department:{data?.department}</td>
                </tr>
                {/* Loop through first printResponseData[0].typeslist */}
                {data?.typeslist
                  ?.filter((row) => row.types === "Glass")
                  ?.map((row, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {index + 1}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.identification_no}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.location}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.protection_safert_flim}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.risk_severity}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.frequency_of_check}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.remarks}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}

                <tr>
                  <td colSpan="100">Type : Hard Plastic</td>
                </tr>

                {/* Loop through second printResponseData[0].typeslist for HardPlastic */}
                {data?.typeslist
                  ?.filter((row) => row.types === "HardPlastic")
                  ?.map((row, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {index + 1}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.identification_no}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.location}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.protection_safert_flim}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.risk_severity}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.frequency_of_check}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.remarks}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}

                <tr>
                  <td colSpan="100">Type : Ceramic</td>
                </tr>

                {/* Loop through third printResponseData[0].typeslist for Ceramic */}
                {data?.typeslist
                  ?.filter((row) => row.types === "Ceramic")
                  ?.map((row, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {index + 1}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.identification_no}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.location}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.protection_safert_flim}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.risk_severity}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.frequency_of_check}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {row.remarks}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}

                <tr>
                  <td colSpan="100">
                    Note : For Risk Severity, please refer procedure for (i)
                    Control of Glass / Hard Plastic / Wood / Ceramic Materials
                    (QAD01/D-25 )
                  </td>
                </tr>

                <tr>
                  <td colSpan="50">
                    Summary :<br />
                    1. Total No. of Glass under control :{
                      data?.to_no_glass
                    }{" "}
                    Nos.
                    <br />
                    2. Total No. of Hard Plastic under control:{
                      data?.to_no_hp
                    }{" "}
                    Nos.
                    <br />
                    3. Total No. of Wood under control : {
                      data?.to_no_wood
                    } Nos. <br />
                    4. Total No. of Ceramic under control :{" "}
                    {data?.to_no_ceramic} Nos.
                    <br />
                  </td>

                  <td colSpan="50">
                    Abbreviation :<br />
                    G – Glass
                    <br />
                    H – Hard Plastic
                    <br />
                    W – Wood
                    <br />
                    C – Ceramic <br />
                  </td>
                </tr>

                <tr>
                  <td colSpan="30" rowspan="2" style={{ textAlign: "left" }}>
                    Calendar:
                    {(() => {
                      const date = new Date(data?.date);
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const year = date.getFullYear();

                      const formattedDate1 = `${day}/${month}/${year}`;

                      return ` ${formattedDate1}`;
                    })()}
                  </td>

                  <td colSpan="35" style={{ textAlign: "center" }}>
                    Prepared by
                  </td>

                  <td colSpan="35" style={{ textAlign: "center" }}>
                    Approved by
                  </td>
                </tr>

                <tr>
                  <td colSpan="35" style={{ textAlign: "center" }}>
                    {getImage1[dataIndex] && (
                      <img
                        src={getImage1[dataIndex]}
                        alt={"QAinspector Sign"}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "60px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      />
                    )}
                    <div style={{ textAlign: "center" }}>
                      {data?.qa_inspector_sign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDate(data?.qa_inspector_submitted_on)}
                    </div>
                  </td>

                  <td colSpan="35" style={{ textAlign: "center" }}>
                    {getImage2[dataIndex] && (
                      <img
                        src={getImage2[dataIndex]}
                        alt="QA Manager/MR Sign"
                        style={{
                          width: "60px",
                          height: "60px",
                          textAlign: "center",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      />
                    )}
                    <div style={{ textAlign: "center" }}>
                      {data?.manager_sign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDate(data?.manager_submitted_on)}
                    </div>
                  </td>
                </tr>
              </tbody>

              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
                <tr>
                  <th colSpan="25">Particular</th>
                  <th colSpan="25" style={{ textAlign: "center" }}>
                    Prepared by
                  </th>
                  <th colSpan="25" style={{ textAlign: "center" }}>
                    Reviewed by
                  </th>
                  <th colSpan="25" style={{ textAlign: "center" }}>
                    Approved by
                  </th>
                </tr>
                <tr>
                  <th colSpan="25">Name</th>
                  <td colSpan="25"></td>
                  <td colSpan="25"></td>
                  <td colSpan="25"></td>
                </tr>
                <tr>
                  <th colSpan="25">Signature & Date</th>
                  <td colSpan="25"></td>
                  <td colSpan="25"></td>
                  <td colSpan="25"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>

      {/* HEADER */}

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="LIST OF GLASS /HARD PLASTIC / WOOD / CERAMIC"
          formatNo="PH-QAD01-F-050"
          sopNo="PH-QAD01-D-47"
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
                confirm("Are you sure want to Logout") == true
                  ? navigate("/Precot")
                  : null;
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

        {/* Go To Row */}

        <Row
          align="middle"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "10px",
            justifyContent: "left",
            marginLeft: "10px",
          }}
        >
          <Col>
            <Input
              addonBefore="Date"
              placeholder="Date"
              type="date"
              size="small"
              value={newDate}
              style={{ width: "200px", fontWeight: "bold", marginRight: "1em" }}
              onChange={(e) => {
                setNewDate(e.target.value);
              }}
              max={getCurrentDate()}
            />
          </Col>
          <Col>
            <label>Department</label>
            <Select
              value={departmentName || undefined} // Ensures the component shows the placeholder when cleared
              onChange={onChangeDepartment}
              options={departmentList}
              size="small"
              style={{ width: "150px", height: "30px", marginLeft: "10px" }}
              placeholder="Select Department"
            />
          </Col>
          <Col>
            <Button
              key="go"
              onClick={goTo}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                width: "100%",
              }}
              shape="round"
              icon={<BiNavigation color="#00308F" />}
              type="primary"
            >
              Go to
            </Button>
          </Col>
        </Row>
      </div>
      {/* Table...Summary */}
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={tableData}
        />
      </div>

      {/* SUMMARY PRINT */}
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
          >
            Submit
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date:
          </label>
          <Input
            type="date"
            size="small"
            value={PrintDate}
            style={{ width: "250px", fontWeight: "bold", marginRight: "1em" }}
            onChange={(e) => setPrintDate(e.target.value)}
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Year:
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={setYearPrint}
            style={{ width: "250px", height: "32px" }}
            placeholder="Search Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled>
              Select Year
            </Select.Option>
            {yearOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Month:
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              width: "250px",
              height: "32px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              padding: "4px 8px",
              backgroundColor: "#fff",
              fontSize: "14px",
            }}
          >
            <option value="">--Select Month--</option>
            {monthNames.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Department:
          </label>
          <Select
            value={PrintDepartmentName || undefined} // Ensures the component shows the placeholder when cleared
            onChange={onChangePrintDepartment}
            options={departmentList}
            size="small"
            style={{ width: "250px", height: "32px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default QA_f50_Summary;
