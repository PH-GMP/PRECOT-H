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

const QualityControlARF012Summary = () => {
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
  const [images, setImages] = useState({});
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [showReasonColumn, setShowReasonColumn] = useState(false);

  useEffect(() => {
    const fetchImage = async (roleSign) => {
      try {
        const res = await axios.get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${roleSign}`,
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
      const signatures = new Set();

      printData.forEach((item) => {
        if (item.chemist_sign) signatures.add(item.chemist_sign);
        if (item.qc_sign) signatures.add(item.qc_sign);
      });

      for (const sign of signatures) {
        if (!newImages[sign]) {
          const image = await fetchImage(sign);
          if (image) newImages[sign] = image;
        }
      }

      setImages((prev) => ({ ...prev, ...newImages }));
    };

    fetchAllImages();
  }, [printData, token,      API.prodUrl]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const apiUrl =
      roleauth === "ROLE_CHEMIST"
        ? `${    API.prodUrl}/Precot/api/qc/DistilledWaterAnalysisReportARF012/getAllChemistNotSubmitted`
        : roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER"
        ? `${    API.prodUrl}/Precot/api/qc/DistilledWaterAnalysisReportARF012/getAllQcNotSubmitted`
        : null; // Handle invalid role if necessary

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        // Transform the data to fit the table format
        let snoCounter = 1;
        const transformedData = response.data.map((item) => ({
          Sno: snoCounter++,
          date: item.date || "NA",
          year: item.year || "NA",
          month: item.month || "NA",
          chemistry_status: item.chemist_status,
          qc_status: item.qc_status,
          reason: item.reason || "N/A",
        }));
        setTableData(transformedData);

        const hasRejectedStatus = transformedData.some(
          (item) =>
            item.qc_status === "QC_REJECTED" || item.qc_status === "QA_REJECTED"
        );
        setShowReasonColumn(hasRejectedStatus);
      })
      .catch((error) => {
        // Handle errors
        message.error("Error fetching data: " + error.message);
      });
  }, []);

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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleGoToChange = () => {
    if (selectedDate) {
      // Navigate to the path with the state
      navigate("/Precot/QualityControl/AR_F-012", {
        state: { selectedDate },
      });
    } else {
      // Handle the case where year, month, or date is not selected
      message.error("Please select a Date.");
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityControl/AR_F-012", {
      state: {
        entryDate: record.date,
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
    if (selectedPrintDate || selectedPrintMonth || selectedPrintYear) {
      fetchPrintData();
    } else {
      message.error("Please select a any field before printing.");
      handleModalClose();
    }
  };

  const fetchPrintData = () => {
    let baseUrl = `${    API.prodUrl}/Precot/api/qc/DistilledWaterAnalysisReportARF012/GetByDateMonthYear/print?`;
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
    console.log("finalUrl", finalUrl);

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
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
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
      title: "Chemist Status",
      dataIndex: "chemistry_status",
      key: "chemistry_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "qc_status",
      key: "qc_status",
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

  return (
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="Distilled Water Analysis Report"
        formatNo="PH-QCL01-AR-F-012"
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
        </div>
      </Modal>

      <Table dataSource={tableData} columns={columns} rowKey="Sno" />
      {/* */}

      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: landscape;
        }
        body {
          -webkit-print-color-adjust: exact;
          width: 100%;
          height: 100%;
          transform: scale(0.9);
          // transform-origin: top left;
        }
        #section-to-print {
          page-break-after: always;
        }
      }
    `}
        </style>

        {/* Helper function to chunk the data */}
        {(() => {
          console.log(Array.isArray(printData)); // Should log `true`
          console.log(printData);

          const chunkArray = (data, size) => {
            const result = [];
            for (let i = 0; i < data.length; i += size) {
              result.push(data.slice(i, i + size));
            }
            return result;
          };

          const chunkedData = chunkArray(
            Array.isArray(printData) ? printData : [],
            4
          );

          return chunkedData.map((dataChunk, pageIndex) => (
            <div key={pageIndex} style={{ pageBreakAfter: "always" }}>
              {/* Header table */}
              <table
                className="f18table"
                style={{ width: "90%", height: "50%", marginTop: "6%" }}
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
                      Distilled Water Analysis Report
                    </th>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Format No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      PH-QCL01-AR-F-012
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
                      PH-QCL01-D-05
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Page No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {pageIndex + 1} of {chunkedData.length}
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
                        padding: "10px",
                      }}
                    >
                      S.No
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Date
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Analytical Reference Number
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      pH (Std. 5 - 7)
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Turbidity in NTU {"(Std. < 0.5)"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Total Dissolved Solids in PPM {"(Std. < 10)"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Hardness in PPM {"(Std. < 10)"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Checked By
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Approved By
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Remarks
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {dataChunk.map((item, index) => {
                    // Format dates for each item
                    const formattedChemistDate = item.chemist_submit_on
                      ? moment(item.chemist_submit_on).format(
                          "DD/MM/YYYY HH:mm"
                        )
                      : ""; // Default to an empty string if date is not available

                    const formattedQCDate = item.qc_submit_on
                      ? moment(item.qc_submit_on).format("DD/MM/YYYY HH:mm")
                      : ""; // Default to an empty string if date is not available

                    return (
                      <tr key={item.id}>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {index + 1 + pageIndex * 4}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {formatDate(item.date)}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.analyticalRequestNo}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.ph}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.turbidityInNtu}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.totalDissolvedSolidsInPpm}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.hardnessInPpm}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {images[item.chemist_sign] && (
                            <img
                              className="signature"
                              src={images[item.chemist_sign]}
                              alt="Chemist Signature"
                              style={{ width: "70px", height: "30px" }}
                            />
                          )}
                          <br />
                          {item.chemist_sign}
                          <br />
                          {formattedChemistDate}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {images[item.qc_sign] && (
                            <img
                              className="signature"
                              src={images[item.qc_sign]}
                              alt="QC Signature"
                              style={{ width: "70px", height: "30px" }}
                            />
                          )}
                          <br />
                          {item.qc_sign}
                          <br />
                          {formattedQCDate}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.remark}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Footer table */}
              <table style={{ marginTop: "1%", width: "90%" }}>
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
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
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
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
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Signature & Date
                  </td>
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

export default QualityControlARF012Summary;
