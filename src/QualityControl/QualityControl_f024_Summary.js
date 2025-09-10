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
import moment from "moment";
const { Option } = Select;

const QualityControlF024Summary = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [datePrint, setDatePrint] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [printData, setPrintData] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (roleauth === "LAB_ASSISTANT") {
          const response = await axios.get(
            `${   API.prodUrl}/Precot/api/chemicaltest/CLF024/getAll`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "json",
            }
          );
          let snoCounter = 1;
          const transformedData = response.data.map((item) => ({
            Sno: snoCounter++,
            date: item.date || "NA",
            year: item.year || "NA",
            month: item.month || "NA",
            disposedQuantity: item.disposedQuantity || "NA",
            lab_assistant_status: item.chemist_status,
            disposalReceived: item.disposalReceived || "N/A",
          }));
          setData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchData();
  }, [roleauth]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    console.log(e.target.value);
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

  const handleGoToChange = () => {
    if (selectedDate) {
      // Navigate to the path with the state
      navigate("/Precot/QualityControl/F-024", {
        state: {
          selectedDate: selectedDate,
        },
      });
    } else {
      // Handle the case where year, month, or date is not selected
      message.error("Please select a Date.");
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityControl/F-024", {
      state: {
        selectedDate: record.date,
        selectedMonth: record.month,
        selectedYear: record.year,
      },
    });
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
    setSelectedPrintMonth(null);
    setSelectedPrintYear(null);
  };

  const printSubmit = () => {
    // Check if at least one field is selected
    if (selectedPrintDate || selectedPrintMonth || selectedPrintYear) {
      fetchPrintData();
    } else {
      message.error("Please select any field before printing.");
      handleModalClose();
    }
  };

  const fetchPrintData = () => {
    // Base URL for the API
    const baseUrl = `${   API.prodUrl}/Precot/api/chemicaltest/CLF024/print?`;
    let query = [];

    // Construct the query based on selected fields
    if (selectedPrintDate) {
      query.push(`date=${selectedPrintDate}`);
    }
    if (selectedPrintMonth) {
      query.push(`month=${selectedPrintMonth}`);
    }
    if (selectedPrintYear) {
      query.push(`year=${selectedPrintYear}`);
    }

    // Join the query parameters to the base URL
    let finalUrl = baseUrl + query.join("&");
    console.log("finalUrl:", finalUrl);

    // Make the API call using axios
    const token = localStorage.getItem("token");
    axios
      .get(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        console.log("Fetched data:", response.data);

        // Ensure that the response is an array, even if no data is found
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintData(response.data);
          setPrintLoading(true);

          // Set a timeout for printing
          setTimeout(() => {
            window.print(); // Proceed with printing
            handleModalClose(); // Close the modal after printing
          }, 3000);

          console.log("Print data:", response.data);
        } else {
          setPrintData([]); // Ensure printData is always an array
          setPrintLoading(false);
          message.warning(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose(); // Close modal if no details found
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
        setPrintLoading(false);
      });
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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
      key: "date",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Disposed Quantity",
      dataIndex: "disposedQuantity",
      key: "disposedQuantity",
      align: "center",
    },
    {
      title: "Disposal Received",
      dataIndex: "disposalReceived",
      key: "disposalReceived",
      align: "center",
    },
    {
      title: "Lab Assistant Status",
      dataIndex: "lab_assistant_status",
      key: "lab_assistant_status",
      align: "center",
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

  let columns = [...baseColumns];

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit H"
        formName="Disposal Record (CHEMICAL/MEDIA)"
        formatNo="PH-QCL01/F-024"
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

        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            height: "28px",
            marginLeft: "40px",
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
        </div>
      </Modal>

      <Table
        columns={baseColumns}
        dataSource={data}
        rowKey="Sno" // Use Sno as the unique key for rows
      />

      {/*  */}
      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: portrait;
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

        {(() => {
          const itemsPerPage = 15; // Number of items per page
          const totalPages = Math.ceil(printData.length / itemsPerPage); // Total pages needed

          // Split the printData into chunks for each page
          const pages = Array.from({ length: totalPages }, (_, pageIndex) => {
            const startIndex = pageIndex * itemsPerPage;
            const pageData = printData.slice(
              startIndex,
              startIndex + itemsPerPage
            );

            return (
              <div key={pageIndex} style={{ pageBreakAfter: "always" }}>
                {/* Header table */}
                <table
                  className="f18table"
                  style={{ width: "90%", height: "50%", marginTop: "7%" }}
                >
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
                        <br />
                        Unit H
                      </td>
                      <td
                        colSpan="60"
                        rowSpan="4"
                        style={{ textAlign: "center" }}
                      >
                        Disposal Record (CHEMICAL/MEDIA)
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        Format No.:
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        PH-QCL01/F-024
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
                        PH-QCL01-D-13
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        Page No.:
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        {pageIndex + 1} of {totalPages}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Data display table */}
                <table style={{ marginTop: "2%", width: "90%" }}>
                  <thead>
                    <tr>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          fontSize: "20px",
                        }}
                      >
                        Date
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          fontSize: "20px",
                        }}
                      >
                        Name of the Disposed material
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          fontSize: "20px",
                        }}
                      >
                        Disposed Quantity (in approx. Grams)
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          fontSize: "20px",
                        }}
                      >
                        Disposed by
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          fontSize: "20px",
                        }}
                      >
                        Disposals Received
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((item, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {formatDate(item.date)}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.disposalName}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.disposedQuantity}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.disposedby}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.disposalReceived}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer table */}
                <table style={{ marginTop: "2%", width: "90%" }}>
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
                </table>
              </div>
            );
          });

          return pages; // Render all pages
        })()}
      </div>
    </div>
  );
};

export default QualityControlF024Summary;
