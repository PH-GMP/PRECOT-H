import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
import API from "../baseUrl.json";

const QA_f044_Corrective_summary = () => {
  const navigate = useNavigate();

  const [selectedDep, setSelectedDepartment] = useState(null);
  // New state for eqno
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState([]);
  const [selectedPrintYear, setSelectedPrintYear] = useState("");
  const [selectedPrintMonth, setSelectedPrintMonth] = useState("");
  const [selectedPrintDepart, setSelectedPrintDepart] = useState("");
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});
  const [getImage3, setGetImage3] = useState({}); 
  const token = localStorage.getItem("token");
  const [summary, setSummary] = useState([]); // State for the summary data
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }
 
  const today = new Date().toISOString().split("T")[0]; 

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
  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };
  const handlePrintMonthChange = (e) => {
    if (e) {
      setSelectedPrintMonth(e);
    }
  };
 
  const getImage = (username, type) => {
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
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const url = `data:image/jpeg;base64,${base64}`;

        if (type === "ins") {
          setGetImage1((prev) => ({ ...prev, [username]: url }));
        } else if (type === "des") {
          setGetImage2((prev) => ({ ...prev, [username]: url }));
        } else if (type === "qamng") {
          setGetImage3((prev) => ({ ...prev, [username]: url }));
        }
      })
      .catch((err) => {
        console.error("Error in fetching image:", err);
      });
  };

  // Fetch chemist and QC images for all data in printData
  useEffect(() => {
    printResponseData.forEach((data) => {
      if (data.qaInspectorSign) {
        getImage(data.qaInspectorSign, "ins");
      }
      if (data.qaDesigneeSign) {
        getImage(data.qaDesigneeSign, "des");
      }
      if (data.qaManagerMrSign) {
        getImage(data.qaManagerMrSign, "qamng");
      }
    });
  }, [printResponseData]);

 
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/correctiveActionReport/getActionReportSummary`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSummary(response.data); // Set the summary data
      })
      .catch((error) => {
        console.error(
          "Error fetching corrective action report summary:",
          error
        );
      })
      .finally(() => {
        setLoading(false); // Stop loading indicator
      });
  }, [token]);

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1, // Auto-increment S.No.
    },
    {
      title: "Date",
      dataIndex: "reportDate", // Assuming "reportDate" maps to the correct date field
      key: "reportDate",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "QA Inspector Status",
      dataIndex: "qaInspectorStatus",
      key: "qaInspectorStatus",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "QA Designee Status",
      dataIndex: "qaDesigneeStatus",
      key: "qaDesigneeStatus",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "QA Manager Status",
      dataIndex: "qaManagerMrStatus",
      key: "qaManagerMrStatus",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      align: "center",
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

  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  // Conditionally add the Reason column if there's data
  let columns = [...baseColumns];
  if (summary.some((item) => item.reason)) {
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleDepChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const printSubmit = () => {
    
    fetchPrintData();
  };

  const fetchPrintData = () => {
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/correctiveActionReport/print?year=${selectedPrintYear}&month=${selectedPrintMonth}&reportDate=${selectedPrintDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setPrintResponseData(res.data);

            setTimeout(() => {
              window.print();
              handleModalClose();
            }, 3000);
          } else {
            setPrintResponseData([]);
            message.error(res.data.message || "No data available");
            handleModalClose();
          }
        })
        .catch((err) => {
          message.error("Failed to fetch print data. Please try again.");
        });
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const handleGoToChange = () => {
    // Check if no fields are selected

    if (!selectedDate) {
      message.error("Please select a Date.");
      return;
    }

    if (selectedDate) {
      navigate("/Precot/QA/F-044/corrective", {
        state: {
          uniqueDate: selectedDate,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/F-044/corrective", {
      state: {
        uniqueDate: record.reportDate,
      },
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    navigate("/Precot/Bleaching/F-13");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrint = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPrintYear("");
    setSelectedPrintDate("");
    setSelectedPrintMonth("");
  };

  return (
    <> 
      <div id="section-to-print">
        <style>
          {`@media print {
 
    @page {
      size: A3 landscape;
    }
 
      body {
        -webkit-print-color-adjust: exact;
        width: 100%;
        height: 100%;
        transform: scale(0.8); /* Adjust scale as needed */
        transform-origin: top left right bottom; /* Adjust the origin if needed */
      }
    }
                      .page-break {
                page-break-after: always;
            }
  
`}
        </style>

        {printResponseData.map((dataObj, mainIndex) => {
          const formattedHODDate = dataObj.qaInspectorSubmitOn
            ? moment(dataObj.qaInspectorSubmitOn).format("DD/MM/YYYY HH:mm")
            : "";
          const formattedDESDate = dataObj.qaDesigneeSubmitOn
            ? moment(dataObj.qaDesigneeSubmitOn).format("DD/MM/YYYY HH:mm")
            : "";
          const formattedMNGDate = dataObj.qaManagerMrSubmitOn
            ? moment(dataObj.qaManagerMrSubmitOn).format("DD/MM/YYYY HH:mm")
            : "";

          return (
            <div key={mainIndex} style={{ pageBreakAfter: "always" }}>
              <table>
                <thead>
                  <tr>
                    <td
                      colSpan="5"
                      rowSpan="4"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{
                          width: "100px",
                          height: "auto",
                          textAlign: "center",
                        }}
                      />
                      <br />
                      Unit H
                    </td>
                    <td
                      colSpan="15"
                      rowSpan="4"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      CORRECTIVE ACTION REPORT
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      Format No.:
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      PH-QAD01/F-044
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      Revision No.:
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      01
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      Ref. SOP No.:
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      PH-QAD01-D-21
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      Page No.:
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      {mainIndex + 1} of {printResponseData.length}
                    </td>
                  </tr>
                </thead>
                <br />
                <tbody>
                  <tr>
                    <th colSpan="1" style={{ textAlign: "center" }}>
                      Observation No.
                    </th>
                    <th colSpan="3" style={{ textAlign: "center" }}>
                      Date
                    </th>
                    <th colSpan="3" style={{ textAlign: "center" }}>
                      Process / Product Description
                    </th>
                    <th colSpan="3" style={{ textAlign: "center" }}>
                      Observation / Nature of Non-conformity
                    </th>
                    <th colSpan="3" style={{ textAlign: "center" }}>
                      Root Cause Analysis
                    </th>
                    <th colSpan="6" style={{ textAlign: "center" }}>
                      Corrective Action
                    </th>
                    <th colSpan="3" style={{ textAlign: "center" }}>
                      Responsibility
                    </th>
                    <th colSpan="6" style={{ textAlign: "center" }}>
                      Target Date
                    </th>
                    <th colSpan="6" style={{ textAlign: "center" }}>
                      Effectiveness of Action Taken
                    </th>
                  </tr>

                  {dataObj.actionReportInfoList.map((detail, detailIndex) => {
                    return (
                      <tr key={detail.infoId || detailIndex}>
                        <td colSpan="1" style={{ padding: "6px" }}>
                          {detail.observationNo || "N/A"}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {moment(detail.date).format("DD/MM/YYYY") || "N/A"}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {detail.processProductDescription || "N/A"}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {detail.natureOfNonConfirmity || "N/A"}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {detail.rootCauseAnalysis || "N/A"}
                        </td>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          {detail.correctiveAction || "N/A"}
                        </td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          {detail.responsibility || "N/A"}
                        </td>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          {moment(detail.targetDate).format("DD/MM/YYYY") ||
                            "N/A"}
                        </td>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          {detail.effectivenessOfActionTaken || "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="11" style={{ textAlign: "center" }}>
                      Prepared:
                      <br />
                      {getImage1[dataObj.qaInspectorSign] && (
                        <img
                          src={getImage1[dataObj.qaInspectorSign]}
                          alt="Signature"
                          style={{ width: "50px", height: "auto" }}
                        />
                      )}
                      <br />
                      {dataObj.qaInspectorSign || "N/A"}
                      <br />
                      {formattedHODDate || "N/A"}
                    </td>
                    <td colSpan="11" style={{ textAlign: "center" }}>
                      {" "}
                      Verified:
                      <br />
                      {getImage2[dataObj.qaDesigneeSign] && (
                        <img
                          src={getImage2[dataObj.qaDesigneeSign]}
                          alt="Signature"
                          style={{ width: "50px", height: "auto" }}
                        />
                      )}
                      <br />
                      {dataObj.qaDesigneeSign || "N/A"}
                      <br />
                      {formattedDESDate || "N/A"}
                    </td>
                    <td colSpan="12" style={{ textAlign: "center" }}>
                      Reviewed:
                      <br />
                      {getImage3[dataObj.qaManagerMrSign] && (
                        <img
                          src={getImage3[dataObj.qaManagerMrSign]}
                          alt="Signature"
                          style={{ width: "50px", height: "auto" }}
                        />
                      )}
                      <br />
                      {dataObj.qaManagerMrSign || "N/A"}
                      <br />
                      {formattedMNGDate || "N/A"}
                    </td>
                  </tr>
                </tbody>
                <br />
                <tfoot>
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Particulars
                    </td>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Prepared by
                    </td>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Reviewed by
                    </td>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Approved by
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Name
                    </td>
                    <td colSpan="7" style={{ textAlign: "center" }}></td>
                    <td colSpan="7" style={{ textAlign: "center" }}></td>
                    <td colSpan="8" style={{ textAlign: "center" }}></td>
                  </tr>
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Signature & Date
                    </td>
                    <td colSpan="7" style={{ textAlign: "center" }}></td>
                    <td colSpan="7" style={{ textAlign: "center" }}></td>
                    <td colSpan="8" style={{ textAlign: "center" }}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        })}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="CORRECTIVE ACTION REPORT"
        formatNo="PH-QAD01/F-044"
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
        <input
          addonBefore="Date"
          placeholder="Date"
          type="date" 
          format="DD-MM-YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ fontWeight: "bold", width: "135px" }}
          max={today}
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
        loading={loading}
        style={{ textAlign: "center" }}
        columns={columns}
        dataSource={summary}
        rowKey="reportId" // Assuming reportId is unique for each row
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
          <label style={{ marginRight: "8px", textAlign: "start" }}>
            Select Date:
          </label>
          <Input
            addonBefore="Date"
            size="small"
            value={selectedPrintDate}
            type="date"
            style={{
              width: "200px",
            }}
            onChange={(e) => setSelectedPrintDate(e.target.value)}
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
            {months.map((month) => (
              <Select.Option key={month.value} value={month.value}>
                {month.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </>
  );
};
export default QA_f044_Corrective_summary;
