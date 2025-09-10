/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Form,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
import API from "../baseUrl.json";

const QA_f012_internal_audit_report_summary = () => {
  const navigate = useNavigate();
  const [printResponseData, setPrintResponseData] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedYearValuePrint, setSelectedYearValuePrint] = useState("");
  const [selectedMonthValuePrint, setSelectedMonthValuePrint] = useState("");
  const [selectedDepartmentvaluePrint, setSelectedDepartmentvaluePrint] =
    useState("");
  const [open, setOpen] = useState(false);
  const [, setIsprintSelected] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  const [, setIsImages1Loaded] = useState(false);
  const [, setIsImages2Loaded] = useState(false);
  const [, setIsImages3Loaded] = useState(false);

  const formattedDatewithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };

  // Fetch audit schedule summary
  const fetchAuditScheduleSummary = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const summaryResponse = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditReport/getAuditReportSummary`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSummaryData(summaryResponse.data);
    } catch (error) {
      console.error("Error fetching audit schedule summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditScheduleSummary();
  }, []);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = printResponseData?.length * 3;

  // For auditeeSign images
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.auditeeSign;
      if (username) {
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
            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: "", // Store empty string in case of error
            }));
          })
          .finally(() => {
            setImagesLoaded((prevCount) => prevCount + 1); // Increment the counter regardless of success or failure
          });
      }
    });
  }, [printResponseData,API.prodUrl]);

  // For auditorSign images
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.auditorSign;
      if (username) {
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
            setGetImage2((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            setGetImage2((prevImages) => ({
              ...prevImages,
              [index]: "", // Store empty string in case of error
            }));
          })
          .finally(() => {
            setImagesLoaded((prevCount) => prevCount + 1); // Increment the counter regardless of success or failure
          });
      }
    });
  }, [printResponseData,API.prodUrl]);

  // For qaMrSign images
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.qaMrSign;
      if (username) {
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
            setGetImage3((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            setGetImage3((prevImages) => ({
              ...prevImages,
              [index]: "", // Store empty string in case of error
            }));
          })
          .finally(() => {
            setImagesLoaded((prevCount) => prevCount + 1); // Increment the counter regardless of success or failure
          });
      }
    });
  }, [printResponseData,API.prodUrl]);

  // Open print screen when all images are loaded
  useEffect(() => {
    if (imagesLoaded === totalImages) {
      window.print();
    }
  }, [imagesLoaded, totalImages]);

  // Print function
  const printSubmit = async () => {
    if (
      !selectedMonthValuePrint &&
      !selectedYearValuePrint &&
      !selectedDepartmentvaluePrint
    ) {
      message.warning("Please Select Month/Year/Department");
      return;
    }
    let monthP;
    let YearP;
    let DepP;
    if (selectedMonthValuePrint == null) {
      monthP = "";
    } else {
      monthP = selectedMonthValuePrint;
    }
    if (selectedYearValuePrint == null) {
      YearP = "";
    } else {
      YearP = selectedYearValuePrint;
    }
    if (selectedDepartmentvaluePrint == null) {
      DepP = "";
    } else {
      DepP = selectedDepartmentvaluePrint;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditReport/print?year=${YearP}&month=${monthP}&department=${DepP}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data && response.data.message != "No data") {
        setPrintResponseData(response.data);
      } else {
        message.warning(
          "No data available for the selected year/ month/Department."
        );
      }
    } catch (error) {
      message.error("Error fetching data. Please try again.");
      console.error("API Error:", error);
    }

    handleModalClose();
  };

  // Modal close handler
  const handleModalClose = () => {
    setShowModal(false);
    setIsprintSelected(false);
    setSelectedYearValuePrint(null);
    setSelectedMonthValuePrint(null);
    setSelectedDepartmentvaluePrint(null);
    setIsImages1Loaded(false);
    setIsImages2Loaded(false);
    setIsImages3Loaded(false);
  };

  // Handle month/year change
  const yearChange = (value) => setYear(value);
  const monthChange = (value) => setMonth(value);
  const departmentChange = (value) => setDepartment(value);
  const yearPrintChange = (value) => setSelectedYearValuePrint(value);
  const monthPrintChange = (value) => setSelectedMonthValuePrint(value);
  const departmentPrintChange = (value) =>
    setSelectedDepartmentvaluePrint(value);

  const generateFinancialYears = (
    startYear = new Date().getFullYear(),
    numberOfYears = 10
  ) => {
    let financialYears = [];
    for (let i = 0; i < numberOfYears; i++) {
      const year1 = startYear + i;
      const year2 = year1 + 1;
      financialYears.push(`${year1}-${year2}`);
    }
    return financialYears;
  };

  const years = generateFinancialYears();

  const yearOptions = years.map((year) => ({
    label: year,
    value: year,
  }));

  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const handlePrint = () => {
    setShowModal(true);
    setIsprintSelected(true);
    //
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  // Define columns for the audit schedule summary table
  const columns = [
    {
      title: "Year",
      dataIndex: "auditYear",
      key: "auditYear",
      width: "10%",
      align: "center",
    },
    {
      title: "Month",
      dataIndex: "auditMonth",
      key: "auditMonth",
      width: "10%",
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "20%",
      align: "center",
    },
    {
      title: "Auditee Status",
      dataIndex: "auditeeStatus",
      key: "auditeeStatus",
      width: "20%",
      align: "center",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
    },
    {
      title: "Auditor Status",
      dataIndex: "auditorStatus",
      key: "auditorStatus",
      width: "20%",
      align: "center",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
    },
    {
      title: "QA/MR Status",
      dataIndex: "qaMrStatus",
      key: "qaMrStatus",
      width: "30%",
      align: "center",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: "20%",
      align: "center",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<BiEdit />}
          style={{ width: "100%" }}
          onClick={() => handleEdit(record)}
        >
          Review
        </Button>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditDepartments`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const departmentOptions = response.data.map((dept) => ({
          label: dept.auditDepartment, // Displayed text
          value: dept.auditDepartment, // Value of the option
        }));

        setDepartments(departmentOptions);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleNavigate = () => {
    if (month == "") {
      // setError('Please select a date');
      message.warning("Please Select Month");
    } else if (year == "") {
      message.warning("Please select a year");
    } else if (department == "") {
      message.warning("Please select a Department");
    } else {
      navigate("/Precot/QualityAssurance/F-012/internal_audit_report", {
        state: {
          editYear: year,
          editMonth: month,
          editDepartment: department,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityAssurance/F-012/internal_audit_report", {
      state: {
        editYear: record.auditYear,
        editMonth: record.auditMonth,
        editDepartment: record.department,
        //status: record.auditScheduleStatus,
      },
    });
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {Array.isArray(printResponseData) && printResponseData.length > 0 ? (
          printResponseData?.map((report, index) => (
            <table style={{ marginTop: "10px", scale: "94%" }}>
              <br />
              <thead>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
                <tr>
                  <td colSpan="30" rowSpan="4" style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br />
                    Unit H
                  </td>
                  <th colSpan="80" rowSpan="4" style={{ textAlign: "center" }}>
                    INTERNAL AUDIT REPORT
                  </th>
                  <td colSpan="25">Format No:</td>
                  <td colSpan="25">PH-QAD01/F-012</td>
                </tr>
                <tr>
                  <td colSpan="25">Revision No:</td>
                  <td colSpan="25">02</td>
                </tr>
                <tr>
                  <td colSpan="25">Ref. SOP No:</td>
                  <td colSpan="25">PH-QAD01-D-17</td>
                </tr>
                <tr>
                  <td colSpan="25">Page No:</td>
                  <td colSpan="25">
                    {index + 1} of {printResponseData?.length}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
              </thead>

              <>
                <tbody>
                  {/* Auditee and IAR No. Row */}
                  <tr>
                    <td colSpan="100">
                      <strong>Name of Auditee(s):</strong> {report.auditeeName}
                    </td>
                    <td colSpan="60">
                      <strong>IAR No:</strong> {report.iarNo}
                    </td>
                  </tr>

                  {/* Auditor and Department Row */}
                  <tr>
                    <td colSpan="100">
                      <strong>Name of Auditor(s):</strong> {report.auditorName}
                    </td>
                    <td colSpan="60">
                      <strong>Department:</strong> {report.department}
                    </td>
                  </tr>

                  {/* Standard and Date Row */}
                  <tr>
                    <td colSpan="100">
                      <strong>Based on Standard:</strong> {report.standard}
                    </td>
                    <td colSpan="60">
                      <strong>Date:</strong> {formattedDate(report.reportDate)}
                    </td>
                  </tr>

                  {/* Clause Section Header */}
                  <tr>
                    <th colSpan="20" style={{ textAlign: "center" }}>
                      Clause No.
                    </th>
                    <th colSpan="80" style={{ textAlign: "center" }}>
                      Observation / Evidence
                    </th>
                    <th colSpan="60" style={{ textAlign: "center" }}>
                      Finding
                    </th>
                  </tr>

                  {/* Clause Info Rows */}
                  {report.clauseInfoList.map((clause) => (
                    <tr key={clause.clauseId}>
                      <td colSpan="20" style={{ textAlign: "center" }}>
                        {clause.clauseNo}
                      </td>
                      <td colSpan="80" style={{ textAlign: "center" }}>
                        {clause.observationEvidence}
                      </td>
                      <td colSpan="60" style={{ textAlign: "center" }}>
                        {clause.finding}
                      </td>
                    </tr>
                  ))}

                  {/* Remarks and NC Summary Rows */}
                  <tr>
                    <td
                      colSpan="100"
                      rowSpan="3"
                      style={{ verticalAlign: "top" }}
                    >
                      Remark(s) / Comment(s): {report.auditRemarks}
                    </td>
                    <td colSpan="60">
                      Total No. of NC Raised: {report.totalNoOfNc}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="60">No. of Minor NC: {report.noOfMinorNc}</td>
                  </tr>
                  <tr>
                    <td colSpan="60">No. of Major NC: {report.noOfMajorNc}</td>
                  </tr>
                  <tr>
                    <td colSpan="50" style={{ textAlign: "center" }}>
                      Signature of Auditee
                    </td>
                    <td colSpan="50" style={{ textAlign: "center" }}>
                      Signature of Auditor
                    </td>
                    <td colSpan="50" style={{ textAlign: "center" }}>
                      Signature of QA/MR
                    </td>
                  </tr>
                  {/* Signatures Row */}
                  <tr>
                    <td colSpan="50" style={{ textAlign: "center" }}>
                      {report.auditeeSign} <br />
                      {formattedDatewithTime(report.auditeeSubmitOn)}
                      <br />
                      {getImage1[index] && (
                        <img
                          src={getImage1[index]}
                          alt={`Auditee Sign ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            marginRight: "10px",
                            objectFit: "contain",
                            marginTop: "20px",
                          }}
                        />
                      )}
                    </td>
                    <td colSpan="50" style={{ textAlign: "center" }}>
                      {report.auditorSign} <br />
                      {formattedDatewithTime(report.auditorSubmitOn)}
                      <br />
                      {getImage2[index] && (
                        <img
                          src={getImage2[index]}
                          alt={`Auditoe Sign ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            marginRight: "10px",
                            objectFit: "contain",
                            marginTop: "20px",
                          }}
                        />
                      )}
                    </td>
                    <td colSpan="60" style={{ textAlign: "center" }}>
                      {report.qaMrSign} <br />
                      {formattedDatewithTime(report.qaMrSubmitOn)}
                      <br />
                      {getImage3[index] && (
                        <img
                          src={getImage3[index]}
                          alt={`QA Manager Sign ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            marginRight: "10px",
                            objectFit: "contain",
                            marginTop: "20px",
                          }}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </>
              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
                <tr>
                  <th colSpan="40">Particular</th>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Prepared by
                  </th>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Reviewed by
                  </th>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Approved by
                  </th>
                </tr>
                <tr>
                  <th colSpan="40">Name</th>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                </tr>
                <tr>
                  <th colSpan="40">Signature & Date</th>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                </tr>
              </tfoot>

              <br />
            </table>
          ))
        ) : (
          <tr>
            <td colSpan="2">No data available</td>
          </tr>
        )}
      </div>
      {/* Header Section */}
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="INTERNAL AUDIT REPORT"
        formatNo="PH-QAD01/F-012"
        MenuBtn={
          <Button
            type="primary"
            icon={<BiNavigation />}
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
      {/* Year and Month Selection */}
      <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          <Form.Item label="Year">
            <Select
              onChange={yearChange}
              options={yearOptions}
              placeholder="Choose Year"
            />
          </Form.Item>
          <Form.Item label="Month">
            <Select
              placeholder="Choose Month"
              style={{ width: "150px" }}
              onChange={monthChange}
              options={months}
            />
          </Form.Item>
          <Form.Item label="Department">
            <Select
              placeholder="Choose Department"
              style={{ width: "150px" }}
              onChange={departmentChange}
              options={departments}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<BiNavigation />}
              onClick={handleNavigate}
              shape="round"
            >
              Go To
            </Button>
          </Form.Item>
        </Form>
      </Row>
      {/* Table Display */}
      <Table
        bordered
        columns={columns}
        dataSource={summaryData}
        loading={loading}
        style={{ textAlign: "center", width: "100%" }}
      />
      {/* Modal for Printing */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="submit" type="primary" onClick={printSubmit}>
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
            Year:
          </label>
          <Select
            showSearch
            onChange={yearPrintChange}
            options={yearOptions}
            value={selectedYearValuePrint}
            style={{ width: "50%" }}
            placeholder="Choose Year"
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
            Department:
          </label>
          <Select
            showSearch
            onChange={departmentPrintChange}
            options={departments}
            value={selectedDepartmentvaluePrint}
            style={{ width: "50%" }}
            placeholder="Choose Department"
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
            Month:
          </label>{" "}
          <Select
            showSearch
            options={months}
            onChange={monthPrintChange}
            value={selectedMonthValuePrint}
            style={{ width: "50%" }}
            placeholder="Select Month"
          />{" "}
        </div>{" "}
      </Modal>{" "}
    </div>
  );
};
export default QA_f012_internal_audit_report_summary;
