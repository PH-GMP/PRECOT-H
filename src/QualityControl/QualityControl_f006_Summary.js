import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrecotSidebar from "../Components/PrecotSidebar";
import BleachingHeader from "../Components/BleachingHeader";
import { Input, Button, Table, Select, message, Tooltip, Modal } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import axios from "axios";
import logo from "../Assests/logo.png";
const { Option } = Select;

const QualityControlF006Summary = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEqNo, setSelectedEqNo] = useState(null); // New state for eqno
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  // const [loading, setLoading] = useState(true);
  const roleauth = localStorage.getItem("role");
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [printData, setPrintData] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const chemistName = localStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [showReasonColumn, setShowReasonColumn] = useState(false);
  const [selectedPrintEqNo, setSelectedPrintEqNo] = useState(null); // New state for eqno
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

        if (type === "chemist") {
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
      if (data.chemist_sign) {
        getImage(data.chemist_sign, "chemist");
      }
      if (data.manager_sign) {
        getImage(data.manager_sign, "manager");
      }
    });
  }, [printData]);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);

      const url =
        roleauth === "ROLE_CHEMIST"
          ? `${    API.prodUrl}/Precot/api/qc/PhMeterCalibrationReportF006/GetAll`
          : roleauth === "QC_MANAGER" ||
            roleauth === "QA_MANAGER" ||
            roleauth === "CHEMIST_DESIGNEE"
          ? `${    API.prodUrl}/Precot/api/qc/PhMeterCalibrationReportF006/getAllQcNotSubmitted`
          : null;

      const token = localStorage.getItem("token");

      if (url) {
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          });
          const fetchedData = response.data.map((item) => ({
            ...item,
            date: item.date || "NA",
            eqno: item.eqIdNo || "NA",
            chemist_status: item.chemist_status,
            manager_status: item.manager_status,
            reason: item.reason || "NA",
          }));

          setDataSource(fetchedData);

          // Check if any object has a rejected manager_status
          const hasRejectedStatus = fetchedData.some(
            (item) =>
              item.manager_status === "QC_REJECTED" ||
              item.manager_status === "QA_REJECTED" ||
              item.manager_status === "CHEMIST_DESIGNEE_REJECTED"
          );

          setShowReasonColumn(hasRejectedStatus);
        } catch (error) {
          console.error("Error fetching data:", error);
          message.error("Failed to fetch data");
        }
      }
      // setLoading(false);
    };

    fetchData();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
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
      navigate("/precot/QualityControl/F-006", {
        state: {
          uniqueDate: selectedDate,
          uniqueEqNo: selectedEqNo,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/precot/QualityControl/F-006", {
      state: {
        uniqueDate: record.date,
        uniqueEqNo: record.eqIdNo,
      },
    });
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
    // console.log("print screen works");
  };

  const handleModalClose = () => {
    setPrintLoading(false);
    setShowModal(false);
    setSelectedPrintDate(null);
    setSelectedPrintEqNo(null);
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
    let apiUrl = `${    API.prodUrl}/Precot/api/qc/PhMeterCalibrationReportF006/GetByDateMonthYearEqId/print?eqIdNo=${selectedPrintEqNo}`;

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
      key: "formatDate",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "EQ. ID No.",
      dataIndex: "eqno",
      key: "eqno",
      align: "center",
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "manager_status",
      key: "manager_status",
      align: "center",
    },
    ...(showReasonColumn
      ? [
          {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            align: "center",
          },
        ]
      : []),
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
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

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="pH-Meter Calibration Report"
        formatNo="PH-QCL01/F-006"
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

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginTop: "10px",
          marginBottom: "10px",
          marginLeft: "",
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
          <Select.Option value="PH-E/I-LAB21">PH-E/I-LAB21</Select.Option>
          <Select.Option value="PH-E/I-LAB30">PH-E/I-LAB30</Select.Option>
          <Select.Option value="PH-E/I-LAB59">PH-E/I-LAB59</Select.Option>
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
          {/* fields */}

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
                <Option key={year} value={year}>
                  {year}
                </Option>
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
                <Option key={index} value={month}>
                  {month}
                </Option>
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
              <Select.Option value="PH-E/I-LAB21">PH-E/I-LAB21</Select.Option>
              <Select.Option value="PH-E/I-LAB30">PH-E/I-LAB30</Select.Option>
              <Select.Option value="PH-E/I-LAB59">PH-E/I-LAB59</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>

      <Table
        columns={baseColumns}
        dataSource={dataSource}
        rowKey="id" // Ensure each row has a unique key
      />
      {/*  */}
      <div id="section-to-print">
        <style>
          {`
        @media print {
          @page {
            size: portrait;
            scale: 90%;
          }
          body {
            -webkit-print-color-adjust: exact;
            width: 100%;
            height: 100%;
            transform: scale(0.9);
          }
  
          body * {
            visibility: hidden;
          }
  
          #section-to-print, #section-to-print * {
            visibility: visible;
          }
  
          #section-to-print {
            padding-left: 5mm; /* Adjust this value if needed */
            padding-right: 5mm; /* Ensure some balance for print alignment */
            page-break-after: always;
            width: 100%;
            margin: 0 auto; 
          }
          .page {
            page-break-after: always;
          }
        }
      `}
        </style>

        {(() => {
          const rowsPerPage = 13;

          // Grouping data by month and year
          const groupedData = printData.reduce((acc, data) => {
            const key = `${data.month}-${data.year}`;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(data);
            return acc;
          }, {});

          // Calculate total number of pages across all groups
          const totalGlobalPages = Object.values(groupedData).reduce(
            (acc, group) => acc + Math.ceil(group.length / rowsPerPage),
            0
          );

          let globalPageIndex = 0; // To track the page number across all groups

          // Render each month group in a separate page
          return Object.keys(groupedData).map((key, groupIndex) => {
            const currentGroup = groupedData[key];
            const totalPagesForGroup = Math.ceil(
              currentGroup.length / rowsPerPage
            );

            return Array.from({ length: totalPagesForGroup }).map(
              (_, pageIndex) => {
                const start = pageIndex * rowsPerPage;
                const end = start + rowsPerPage;
                const currentData = currentGroup.slice(start, end);
                const [month, year] = key.split("-");

                globalPageIndex++; // Increment the global page number

                return (
                  <div key={`${groupIndex}-${pageIndex}`} className="page">
                    {/* Table header */}
                    <table className="f18table" style={{ marginTop: "8%" }}>
                      <tbody>
                        <tr>
                          <td
                            colSpan="10"
                            rowSpan="4"
                            style={{ textAlign: "center", height: "80px" }}
                          >
                            <img
                              src={logo}
                              alt="Logo"
                              style={{ width: "100px", height: "auto" }}
                            />
                            <br /> Unit H
                          </td>
                          <td
                            colSpan="60"
                            rowSpan="4"
                            style={{ textAlign: "center" }}
                          >
                            pH-Meter Calibration Report
                          </td>
                          <td colSpan="10" style={{ paddingLeft: "5px" }}>
                            Format No.:
                          </td>
                          <td colSpan="10" style={{ paddingLeft: "5px" }}>
                            PH-QCL01/F-006
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="10" style={{ paddingLeft: "5px" }}>
                            Revision No.:
                          </td>
                          <td colSpan="10" style={{ paddingLeft: "5px" }}>
                            01
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="10" style={{ paddingLeft: "5px" }}>
                            Ref. SOP No.:
                          </td>
                          <td colSpan="10" style={{ paddingLeft: "5px" }}>
                            PH-QCL01-D-04
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="10" style={{ paddingLeft: "5px" }}>
                            Page No.:
                          </td>
                          <td colSpan="10" style={{ paddingLeft: "5px" }}>
                            {`${globalPageIndex} of ${totalGlobalPages}`}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Table body */}
                    <table style={{ marginTop: "2%" }}>
                      <tbody>
                        <tr>
                          <td
                            style={{ textAlign: "start", padding: "10px" }}
                            colSpan="3"
                          >
                            Frequency : Daily
                          </td>
                          <td
                            style={{ textAlign: "start", padding: "10px" }}
                            colSpan="3"
                          >
                            EQ. ID No.: {currentData[0]?.eqIdNo || "N/A"}
                          </td>
                          <td
                            style={{ textAlign: "start", padding: "10px" }}
                            colSpan="2"
                          >
                            Month & Year : {`${month}/${year}`}
                          </td>
                        </tr>
                        <tr style={{ border: "1px solid black" }}>
                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            rowSpan="3"
                          >
                            S.No.
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            rowSpan="3"
                          >
                            Date
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            colSpan={3}
                            rowSpan="1"
                          >
                            Buffer Solution
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            rowSpan="3"
                          >
                            Checked By
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            rowSpan="3"
                          >
                            Verified By
                          </td>

                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            rowSpan="3"
                          >
                            Remark
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            rowSpan="1"
                          >
                            4.0 (±0.01)
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            rowSpan="1"
                          >
                            7.0 (±0.01)
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            rowSpan="1"
                          >
                            10.0 or 9.2 (±0.01)
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ textAlign: "center", padding: "10px" }}
                            rowSpan="1"
                            colSpan={3}
                          >
                            Observed readings
                          </td>
                        </tr>
                        {/* Dynamically generate rows for current page */}
                        {currentData.map((data, index) => {
                          const formattedChemistDate = data.chemist_submit_on
                            ? moment(data.chemist_submit_on).format(
                                "DD/MM/YYYY HH:mm"
                              )
                            : "";

                          const formattedQCDate = data.manager_submit_on
                            ? moment(data.manager_submit_on).format(
                                "DD/MM/YYYY HH:mm"
                              )
                            : "";

                          return (
                            <tr key={data.id}>
                              <td
                                style={{ textAlign: "center", padding: "10px" }}
                              >
                                {start + index + 1}
                              </td>
                              <td
                                style={{ textAlign: "center", padding: "10px" }}
                              >
                                {formatDate(data.date)}
                              </td>
                              <td
                                style={{ textAlign: "center", padding: "10px" }}
                              >
                                {data.obsr1}
                              </td>
                              <td
                                style={{ textAlign: "center", padding: "10px" }}
                              >
                                {data.obsr2}
                              </td>
                              <td
                                style={{ textAlign: "center", padding: "10px" }}
                              >
                                {data.obsr3}
                              </td>
                              <td
                                style={{ textAlign: "center", padding: "10px" }}
                              >
                                {getImage1[data.chemist_sign] && (
                                  <img
                                    src={getImage1[data.chemist_sign]}
                                    alt="Chemist Signature"
                                    style={{ width: "50px", height: "auto" }}
                                  />
                                )}
                                <br />
                                {data.chemist_sign}
                                <br />
                                {formattedChemistDate}
                              </td>
                              <td
                                style={{ textAlign: "center", padding: "10px" }}
                              >
                                {getImage2[data.manager_sign] && (
                                  <img
                                    src={getImage2[data.manager_sign]}
                                    alt="QC Signature"
                                    style={{ width: "50px", height: "auto" }}
                                  />
                                )}
                                <br />
                                {data.manager_sign}
                                <br />
                                {formattedQCDate}
                              </td>
                              <td
                                style={{ textAlign: "center", padding: "10px" }}
                              >
                                {data.remark}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* Table footer */}
                    <table style={{ marginTop: "2%" }}>
                      <tbody>
                        <tr>
                          <td
                            colSpan="5"
                            style={{
                              textAlign: "start",
                              padding: "5px 0px 5px 10px",
                            }}
                          >
                            Particulars
                          </td>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            Prepared by
                          </td>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            Reviewed by
                          </td>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            Approved by
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="5"
                            style={{
                              textAlign: "start",
                              padding: "5px 0px 5px 10px",
                            }}
                          >
                            Name
                          </td>
                          <td colSpan="5"></td>
                          <td colSpan="5"></td>
                          <td colSpan="5"></td>
                        </tr>
                        <tr>
                          <td
                            colSpan="5"
                            style={{
                              textAlign: "start",
                              padding: "5px 0px 5px 10px",
                            }}
                          >
                            Signature & Date
                          </td>
                          <td colSpan="5"></td>
                          <td colSpan="5"></td>
                          <td colSpan="5"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              }
            );
          });
        })()}
      </div>
    </div>
  );
};
export default QualityControlF006Summary;
