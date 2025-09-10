import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import PrecotSidebar from "../Components/PrecotSidebar";
import BleachingHeader from "../Components/BleachingHeader";
import { Input, Button, Table, Select, message, Tooltip, Modal } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { FaLock, FaUserCircle } from "react-icons/fa";
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

const QCLInwardBookSummary = () => {
  const navigate = useNavigate();
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedPrintForm, setSelectedPrintForm] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [datePrint, setDatePrint] = useState("");
  const [tableData, setTableData] = useState([]);
  const [shift, setShift] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [printData, setPrintData] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const { Option } = Select;
  const [images, setImages] = useState({}); // To store images for each signature
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false); // Track if all images are loaded

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${   API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        responseType: "json", // Use json if the response is in JSON format
      })
      .then((res) => {
        setShift(res.data); // Set the fetched data to the shift state
      })
      .catch((error) => {
        console.error("Error fetching shift details:", error);
      });
  }, []);

  useEffect(() => {
    const fetchImage = async (roleSign) => {
      try {
        const res = await axios.get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${roleSign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        );
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        return `data:image/jpeg;base64,${base64}`;
      } catch (err) {
        console.error("Error in fetching image:", err);
        return null;
      }
    };

    const fetchAllImages = async () => {
      const newImages = {};
      for (const mainObject of printData) {
        const roleSign =
          mainObject.chemist_sign ||
          mainObject.microbiologist_sign ||
          mainObject.etp_sign;

        if (roleSign && !newImages[roleSign]) {
          newImages[roleSign] = await fetchImage(roleSign);
        }
      }
      setImages((prev) => ({ ...prev, ...newImages }));

      // If all required images are fetched, set the flag to true
      setAllImagesLoaded(true);
    };

    // Trigger fetching of all images
    if (printData.length > 0) {
      fetchAllImages();
    }
  }, [printData, token]);

  useEffect(() => {
    // Open the print window only after all images are loaded
    if (allImagesLoaded) {
      setTimeout(() => {
        window.print(); // Trigger the print window
        handleModalClose();
      }, 500); // Adding a small delay to ensure everything renders
    }
  }, [allImagesLoaded]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${   API.prodUrl}/Precot/api/qc/SampleInwardBookF1F2F3/GetAll`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        // Transform the data to fit the table format
        const transformedData = transformDataForTable(response.data);
        setTableData(transformedData);
      })
      .catch((error) => {
        // Handle errors
        message.error("Error fetching data: " + error.message);
      });
  }, []);

  const transformDataForTable = (data) => {
    let result = [];
    let snoCounter = 1;
    Object.keys(data).forEach((formatKey) => {
      data[formatKey].forEach((entry) => {
        result.push({
          Sno: snoCounter++,
          date: entry.dateF001 || entry.dateF002 || entry.dateF003,
          month: entry.month,
          year: entry.year,
          shift: entry.details?.length > 0 ? entry.details[0].shift : null, // First shift value from details array
          formatName: entry.formatName, // Get the formatName from the formatKey
          chemistry_status: entry.chemist_status, // Default to "N/A" if not present
          microbiologist_status: entry.microbiologist_status,
          etp_status: entry.etp_status, // Same for microbiologist
        });
      });
    });
    return result; // Return the transformed data
  };

  const handleShiftChange = (value) => {
    setSelectedShift(value); // Update the selected shift
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePrintDateChange = (e) => {
    setSelectedPrintDate(e.target.value);
  };

  const handlePrintFormChange = (value) => {
    setSelectedPrintForm(value);
  };

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleFormChange = (value) => {
    setSelectedForm(value);
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
    let path = "";
    console.log("roleauth", roleauth);

    // Check if all fields are missing
    if (!selectedDate && !selectedShift && !selectedForm) {
      message.error("All fields should be selected.");
      return;
    }

    // Ensure individual required selections are made
    let isError = false;

    if (!selectedDate) {
      message.error("Please select a Date.");
      isError = true;
    }

    if (!selectedShift) {
      message.error("Please select a Shift.");
      isError = true;
    }

    if (isError) {
      return;
    }

    // Check if the form is selected
    if (!selectedForm) {
      message.error("Please select a Form.");
      return;
    }
    // Check if the role is selected/authorized
    if (!roleauth) {
      message.error("Role is incorrect or not authorized.");
      return;
    }

    // Initialize the path variable to an invalid state
    let isValidForm = false;
    let isValidRole = false;
    console.log("selectedForm", selectedForm);

    // Determine if the form and role are valid
    if (selectedForm === "physical" && roleauth === "ROLE_CHEMIST") {
      path = "/precot/QualityControl/F-001";
      isValidForm = true;
      isValidRole = true;
    } else if (selectedForm === "micro" && roleauth === "ROLE_MICROBIOLOGIST") {
      path = "/precot/QualityControl/F-002";
      isValidForm = true;
      isValidRole = true;
    } else if (
      (selectedForm === "etp" && roleauth === "ROLE_ETP") ||
      (selectedForm === "etp" && roleauth === "ROLE_CHEMIST")
    ) {
      path = "/precot/QualityControl/F-003";
      isValidForm = true;
      isValidRole = true;
    } else {
      console.log("isValidRole", isValidRole);
      // Invalid form or role
      if (selectedForm && !isValidRole) {
        message.error(
          "Role is incorrect or not authorized for the selected Form."
        );
      } else if (roleauth && !isValidForm) {
        message.error("Form is not valid for the selected Role.");
      } else {
        message.error("Form and Role are not valid.");
      }
      return;
    }

    // Navigate to the path with the state
    navigate(path, {
      state: { selectedDate, selectedShift },
    });
  };

  const handleEdit = (record) => {
    // Extract formatKey from the record
    const formName = record.formatName.toUpperCase();

    // Determine the path based on formatKey
    let path = "";
    switch (formName) {
      case "PHYSICAL AND CHEMICAL LAB SAMPLE INWARD BOOK":
        path = "/precot/QualityControl/F-001";
        break;
      case "MICROBIOLOGY LAB SAMPLE INWARD BOOK":
        path = "/precot/QualityControl/F-002";
        break;
      case "ETP LAB SAMPLE INWARD BOOK":
        path = "/precot/QualityControl/F-003";
        break;
      default:
        console.error(`Unknown formatKey: ${formName}`);
        return; // Exit the function if formatKey is unknown
    }

    // Navigate to the determined path with the entryDate state
    console.log("record.shift, record.date", record.shift, record.date);
    navigate(path, {
      state: {
        entryDate: record.date,
        selectedMonth: record.month,
        selectedYear: record.year,
        selectedShift: record.shift,
      },
    });
  };

  const formatDate = (dateString) => {
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
    setSelectedPrintForm(null);
    setSelectedPrintDate(null);
    setSelectedPrintYear(null);
    setSelectedPrintMonth(null);
  };

  const printSubmit = () => {
    if (selectedPrintForm) {
      fetchPrintData(selectedPrintForm); // Call fetchPrintData with the selected form number
    } else {
      message.error("Please select a form before printing.");
      handleModalClose();
    }
  };

  const fetchPrintData = (formNo) => {
    let Print_API_URL = `${   API.prodUrl}/Precot/api/qc/SampleInwardBookF1F2F3/GetReportForPrint`;

    const date = selectedPrintDate;
    const month = selectedPrintMonth || "";
    const year = selectedPrintYear || "";

    if (date && month && year) {
      Print_API_URL += `?date=${date}&formatNo=${formNo}&month=${month}&year=${year}`;
    } else if (date) {
      Print_API_URL += `?date=${date}&formatNo=${formNo}&month=&year=`;
    } else if (month && year) {
      Print_API_URL += `?date=&formatNo=${formNo}&month=${month}&year=${year}`;
    } else if (month) {
      Print_API_URL += `?date=&formatNo=${formNo}&month=${month}&year=`;
    } else if (year) {
      Print_API_URL += `?date=&formatNo=${formNo}&month=&year=${year}`;
    }

    axios
      .get(Print_API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        if (
          response.data &&
          response.data.length > 0 &&
          response.data[0].details &&
          response.data[0].details.length > 0
        ) {
          setPrintData(response.data);
          setPrintLoading(true);
          setAllImagesLoaded(false); // Reset image loading flag
        } else {
          setPrintLoading(false);
          message.error("No details found for the selected form.");
        }
      })
      .catch((error) => {
        setPrintLoading(false);
        message.error("Error fetching print data: " + error.message);
      });
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "Sno",
      key: "Sno",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "formatDate",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Form Name",
      dataIndex: "formatName",
      key: "formatName",
      align: "center",
    },
    {
      title: "Chemistry Status",
      dataIndex: "chemistry_status",
      key: "chemistry_status",
      align: "center",
    },
    {
      title: "Microbiologist Status",
      dataIndex: "microbiologist_status",
      key: "microbiologist_status",
      align: "center",
    },
    {
      title: "ETP Status",
      dataIndex: "etp_status",
      key: "etp_status",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
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

  let columns = [...baseColumns];

  const cellStyle = {
    textAlign: "center",
    padding: "10px",
  };

  return (
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Sample Inward Book"
        formatNo=""
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

      {/* unique params selectors*/}
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
          style={{ fontWeight: "bold", width: "135px", marginLeft: "" }}
          max={getCurrentDate()}
        />

        <Select
          value={selectedShift}
          onChange={handleShiftChange}
          placeholder="Select Shift"
          style={{ width: "135px", height: "28px", marginLeft: "30px" }}
        >
          {shift.map((shiftItem) => (
            <Select.Option value={shiftItem.id} key={shiftItem.id}>
              {shiftItem.value}
            </Select.Option>
          ))}
        </Select>

        <Select
          id="monthSelect"
          style={{ width: "135px", height: "28px", marginLeft: "0px" }}
          onChange={handleFormChange}
          placeholder="Select Form"
        >
          <Select.Option value="physical">
            Physical And Chemical Lab
          </Select.Option>
          <Select.Option value="micro">Microbiology Lab</Select.Option>
          <Select.Option value="etp">ETP Log Book </Select.Option>
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

      <Table dataSource={tableData} columns={columns} rowKey="Sno" />

      {/* modal */}
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
              Select Form:
            </label>
            <Select
              id="monthSelect"
              value={selectedPrintForm}
              style={{ width: "135px", height: "28px" }}
              onChange={handlePrintFormChange}
              placeholder="Select Form"
            >
              <Select.Option value="PH-QCL01/F-001">
                Physical And Chemical Lab Sample Inward Book
              </Select.Option>
              <Select.Option value="PH-QCL01/F-002">
                Microbiology Lab Sample Inward Book
              </Select.Option>
              <Select.Option value="PH-QCL01/F-003">
                ETP Lab Sample Inward Book
              </Select.Option>
            </Select>
          </div>
        </div>
      </Modal>

      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: landscape;
          scale: 90%;
        }
        body {
          -webkit-print-color-adjust: exact;
          width: 100%;
          height: 100%;
          transform: scale(0.9);
        }
        #section-to-print {
          page-break-after: always;
        }
      }
    `}
        </style>

        {/* Helper function to chunk the data */}
        {(() => {
          const chunkArray = (data, size) => {
            const result = [];
            for (let i = 0; i < data.length; i += size) {
              result.push(data.slice(i, i + size));
            }
            return result;
          };

          const chunkedData = chunkArray(
            printData.flatMap((data) => data.details),
            3
          );

          return chunkedData.map((dataChunk, pageIndex) => (
            <div key={pageIndex} style={{ pageBreakAfter: "always" }}>
              {/* Header table */}
              <table
                className="f18table"
                style={{
                  marginTop: "5%",
                  width: "90%",
                  height: "50%",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      colSpan="10"
                      rowSpan="4"
                      style={{ textAlign: "center", height: "80px" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "100px", height: "auto" }}
                      />
                      <br />
                      Unit H
                    </th>
                    <th
                      colSpan="60"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      {printData[0]?.formatName || "Format Name"}
                    </th>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Format No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {printData[0]?.formatNo || "Format No"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Revision No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {printData[0]?.revisionNo || "Revision No"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Ref. SOP No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {printData[0]?.refSopNo || "Ref SOP No"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Page NO.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {pageIndex + 1} of {chunkedData.length}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Data Display Table */}
              <table
                style={{
                  marginTop: "20px",
                  height: "50%",
                  width: "90%",
                }}
              >
                <thead>
                  <tr>
                    <td
                      style={{
                        textAlign: "center",
                        transform: "rotate(270deg)",
                        padding: "5px 15px",
                        width: "20px",
                        height: "40px",
                        fontSize: "20px",
                      }}
                    >
                      Date
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        transform: "rotate(270deg)",
                        padding: "5px 15px",
                        width: "20px",
                        height: "40px",
                        fontSize: "20px",
                      }}
                    >
                      Shift
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "5px 5px",
                        width: "100px",
                        height: "40px",
                        fontSize: "20px",
                      }}
                    >
                      Description of Material
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        transform: "rotate(270deg)",
                        padding: "5px 15px",
                        width: "20px",
                        height: "40px",
                        fontSize: "20px",
                      }}
                    >
                      Quantity
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        transform: "rotate(270deg)",
                        padding: "5px 15px",
                        width: "200px",
                        height: "40px",
                        fontSize: "20px",
                      }}
                    >
                      UOM
                    </td>
                    {printData[0]?.formatNo === "PH-QCL01/F-001" && (
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                          padding: "5px 15px",
                          width: "200px",
                          height: "40px",
                          fontSize: "20px",
                        }}
                      >
                        BMR No.
                      </td>
                    )}
                    <td
                      style={{
                        textAlign: "center",
                        transform: "rotate(270deg)",
                        padding: "60px 15px",
                        width: "50px",
                        height: "20px",
                        fontSize: "20px",
                      }}
                    >
                      Sample given/Done by (sign & date)
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        transform: "rotate(270deg)",
                        padding: "60px 15px",
                        width: "50px",
                        height: "40px",
                        fontSize: "20px",
                      }}
                    >
                      Sample received by (sign & date)
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        transform: "rotate(270deg)",
                        padding: "5px 15px",
                        width: "20px",
                        height: "40px",
                        fontSize: "20px",
                      }}
                    >
                      Remarks
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {dataChunk.map((detail, idx) => {
                    // Find the main object that contains the current detail
                    const mainObject = printData.find((pd) =>
                      pd.details.includes(detail)
                    );

                    // Choose the first non-null date, prioritize dateF001, dateF002, dateF003
                    const dateToDisplay =
                      mainObject?.dateF001 ||
                      mainObject?.dateF002 ||
                      mainObject?.dateF003 ||
                      "N/A";

                    // Format the date only if it is not "N/A"
                    const formattedDate =
                      dateToDisplay !== "N/A"
                        ? formatDate(dateToDisplay)
                        : "N/A";

                    const shiftToRoman = (shift) => {
                      const romanMap = { 1: "I", 2: "II", 3: "III" };
                      return romanMap[shift] || shift;
                    };

                    return (
                      <tr key={idx}>
                        <td style={cellStyle}>{formattedDate}</td>
                        <td style={cellStyle}>{shiftToRoman(detail.shift)}</td>
                        <td style={cellStyle}>
                          {detail.descriptionOfMaterial}
                        </td>
                        <td style={cellStyle}>{detail.quantity}</td>
                        <td style={cellStyle}>{detail.uom}</td>
                        {printData[0]?.formatNo === "PH-QCL01/F-001" && (
                          <td style={cellStyle}>{detail.bmrNo || "N/A"}</td>
                        )}
                        <td style={cellStyle}>
                          {(() => {
                            const roleSign =
                              mainObject?.chemist_sign ||
                              mainObject?.microbiologist_sign ||
                              mainObject?.etp_sign ||
                              "No signatures available";
                            const roleImage = images[roleSign] || null;

                            // Get submit date based on available signatures
                            const submitDate =
                              mainObject?.chemist_submit_on ||
                              mainObject?.microbiologist_submit_on ||
                              mainObject?.etp_submit_on ||
                              null;

                            // Log the submitDate to debug
                            console.log("submitDate:", submitDate);

                            // Format the date, check for validity
                            const formattedSubmitDate = submitDate
                              ? moment(submitDate).isValid()
                                ? moment(submitDate).format("DD/MM/YYYY")
                                : "N/A"
                              : "N/A";

                            return (
                              <>
                                {/* Display sampleGivenBy and formattedSubmitDate here */}
                                {detail.sampleGivenBy} <br />
                                {formattedSubmitDate}
                              </>
                            );
                          })()}
                        </td>

                        <td style={cellStyle}>
                          {(() => {
                            const roleSign =
                              mainObject?.chemist_sign ||
                              mainObject?.microbiologist_sign ||
                              mainObject?.etp_sign ||
                              "No signatures available";
                            const roleImage = images[roleSign] || null;

                            // Get submit date based on available signatures
                            const submitDate =
                              mainObject?.chemist_submit_on ||
                              mainObject?.microbiologist_submit_on ||
                              mainObject?.etp_submit_on ||
                              null;

                            // Format the date, check for validity
                            const formattedSubmitDate = submitDate
                              ? moment(submitDate).isValid()
                                ? moment(submitDate).format("DD/MM/YYYY HH:mm")
                                : "N/A"
                              : "N/A";

                            return (
                              <>
                                {/* Display signature image, role, and formatted submit date */}
                                {roleImage && (
                                  <img
                                    src={roleImage}
                                    alt={`${roleSign} signature`}
                                    style={{ width: "70px", height: "40px" }}
                                  />
                                )}
                                <br />
                                {roleSign}
                                <br />
                                {formattedSubmitDate}
                              </>
                            );
                          })()}
                        </td>

                        <td style={cellStyle}>{detail.remark}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Footer Table */}
              <table
                style={{
                  marginTop: "20px",
                  width: "90%",
                  height: "50%",
                }}
              >
                <tr>
                  <th
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Particulars
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Prepared by
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Reviewed by
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Approved by
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Name
                  </th>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                </tr>
                <tr>
                  <th
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Signature & Date
                  </th>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                </tr>
              </table>
            </div>
          ));
        })()}
      </div>
    </>
  );
};

export default QCLInwardBookSummary;
