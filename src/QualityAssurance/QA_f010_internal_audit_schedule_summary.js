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

const QA_f010_internal_audit_schedule_summary = () => {
  const navigate = useNavigate();
  const [printResponseData, setPrintResponseData] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedYearValuePrint, setSelectedYearValuePrint] = useState("");
  const [selectedMonthValuePrint, setSelectedMonthValuePrint] = useState("");
  const [open, setOpen] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [isPrintSelected, setIsprintSelected] = useState(false);
  const [isImages1Loaded, setIsImages1Loaded] = useState(false);

  // Fetch audit schedule summary
  const fetchAuditScheduleSummary = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const summaryResponse = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditScheduleSummary`,
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

  useEffect(() => {
    fetchImages1();
  }, [printResponseData]);

  // Fetch image for HOD sign
  const fetchImages1 = async () => {
    const token = localStorage.getItem("token");

    if (Array.isArray(printResponseData)) {
      const promises = printResponseData.map(async (item, index) => {
        const username = item?.scheduleSignName;
        if (username) {
          try {
            const res = await axios.get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
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
            const url = `data:image/jpeg;base64,${base64}`;

            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          } catch (err) {
            console.error("Error in fetching image:", err);
          }
        }
      });

      // Wait for all image fetch promises to complete
      await Promise.all(promises);
      //alert("before uploading status");
      setIsImages1Loaded(true);
      //alert(isImages1Loaded);
    } else {
      setIsImages1Loaded(true);
    }
  };

  const printSubmit = () => {
    window.print();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsprintSelected(false);
    setSelectedYearValuePrint(null);
    setSelectedMonthValuePrint(null);
    setIsImages1Loaded(false);
  };

  // Handle month/year change
  const yearChange = (value) => setYear(value);
  const monthChange = (value) => setMonth(value);
  const yearPrintChange = (value) => {
    setSelectedYearValuePrint(value);
    setSelectedMonthValuePrint("");
  };
  const monthPrintChange = async (value) => {
    setSelectedMonthValuePrint(value);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/print?year=${selectedYearValuePrint}&month=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.message === "No data") {
        message.error("No data Found");
        setShowModal(false);
      } else if (response.data) {
        setPrintResponseData(response.data);
        setIsFetchSuccessful(false);
      } else {
        message.warning("No data available for the selected year and month.");
      }
    } catch (error) {
      // message.error("Error fetching data. Please try again.");
      console.error("API Error:", error);
    }
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => ({
      label: (currentYear + i).toString(),
      value: (currentYear + i).toString(),
    }));
  };

  const years = generateYears();
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

  const columns = [
    {
      title: "Year",
      dataIndex: "auditScheduleYear",
      key: "auditScheduleYear",
      width: "20%",
    },
    {
      title: "Month",
      dataIndex: "auditScheduleMonth",
      key: "auditScheduleMonth",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "auditScheduleStatus",
      key: "auditScheduleStatus",
      width: "20%",
      render: (text) => text.replace(/_/g, " "),
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

  const handleNavigate = () => {
    if (month == "") {
      message.warning("Please Select Month");
    } else if (year == "") {
      message.warning("Please select a year");
    } else {
      navigate("/Precot/QualityAssurance/F-010/internal_audit_schedule", {
        state: {
          editYear: year,
          editMonth: month,
          status: "",
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityAssurance/F-010/internal_audit_schedule", {
      state: {
        editYear: record.auditScheduleYear,
        editMonth: record.auditScheduleMonth,
        status: record.auditScheduleStatus,
      },
    });
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {Array.isArray(printResponseData) && printResponseData.length > 0 ? (
          printResponseData.map((scheduleItem, scheduleIndex) => (
            <table
              style={{ marginTop: "10px", scale: "94%" }}
              key={`schedule-${scheduleIndex}`}
            >
              <br />
              <thead>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
                <tr>
                  <td colSpan="5" rowSpan="4" style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br />
                    Unit H
                  </td>
                  <th colSpan="80" rowSpan="4" style={{ textAlign: "center" }}>
                    INTERNAL AUDIT SCHEDULE
                  </th>
                  <td colSpan="10">Format No:</td>
                  <td colSpan="55">PH-QAD01/F-010</td>
                </tr>
                <tr>
                  <td colSpan="10">Revision No:</td>
                  <td colSpan="55">02</td>
                </tr>
                <tr>
                  <td colSpan="10">Ref. SOP No:</td>
                  <td colSpan="55">PH-QAD01-D-17</td>
                </tr>
                <tr>
                  <td colSpan="10">Page No:</td>
                  <td colSpan="55">
                    {scheduleIndex + 1} of {printResponseData?.length}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th colSpan="25" style={{ height: "15px" }}>
                    Department To Be Audited
                  </th>
                  <th colSpan="25" style={{ height: "15px" }}>
                    Name Of Auditee
                  </th>
                  <th colSpan="25" style={{ height: "15px" }}>
                    Name Of Auditors
                  </th>
                  <th colSpan="25" style={{ height: "15px" }}>
                    Topic
                  </th>
                  <th colSpan="30" style={{ height: "15px" }}>
                    Date
                  </th>
                  <th colSpan="30" style={{ height: "15px" }}>
                    Time
                  </th>
                </tr>

                {scheduleItem.internalAuditList &&
                scheduleItem.internalAuditList.length > 0 ? (
                  scheduleItem.internalAuditList
                    .filter(
                      (schedule) =>
                        !["MR [SMR01]", "Marketing [MKT01]"].includes(
                          schedule?.department
                        )
                    )
                    .map((schedule, index) => (
                      <tr key={`${scheduleIndex}-${index}`}>
                        <td
                          colSpan="25"
                          style={{ height: "15px", textAlign: "center" }}
                        >
                          {schedule?.department ==
                          "Sliver, Balls, Rolls, Pleat Making [PRD04]"
                            ? "Dry Goods"
                            : schedule?.department || "NA"}
                        </td>
                        <td
                          colSpan="25"
                          style={{ height: "15px", textAlign: "center" }}
                        >
                          {schedule?.auditee || "NA"}
                        </td>
                        <td
                          colSpan="25"
                          style={{ height: "15px", textAlign: "center" }}
                        >
                          {schedule?.auditor || "NA"}
                        </td>
                        <td
                          colSpan="25"
                          style={{ height: "15px", textAlign: "center" }}
                        >
                          {schedule?.auditType || "NA"}
                        </td>
                        <td
                          colSpan="30"
                          style={{ height: "15px", textAlign: "center" }}
                        >
                          {schedule?.auditDate
                            ? moment(schedule.auditDate).format("DD/MM/YYYY")
                            : "NA"}
                        </td>
                        <td
                          colSpan="30"
                          style={{ height: "15px", textAlign: "center" }}
                        >
                          {schedule?.auditTime || "NA"}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr key={`empty-${scheduleIndex}`}>
                    <td colSpan="160" style={{ textAlign: "center" }}>
                      No audits available for {scheduleItem.auditScheduleMonth}{" "}
                      {scheduleItem.auditScheduleYear}
                    </td>
                  </tr>
                )}

                <tr>
                  <td
                    colSpan="100"
                    className="data-border-signature"
                    style={{ verticalAlign: "top" }}
                  >
                    <div style={{ marginTop: "10px" }}>
                      <strong>NOTE:-</strong>
                      <ol style={{ paddingLeft: "15px" }}>
                        <li>
                          All auditees are requested to co-operate with auditors
                          and be available for the audit on the planned date &
                          time.
                        </li>
                        <li>
                          In case of leave, inform MR / Asst. MR for
                          re-scheduling the audit at least 2 days before the
                          scheduled date.
                        </li>
                        <li>Audit is based on the requirements of ISO.</li>
                        <li>
                          Please note that the audit is on the system, not on
                          individual performance.
                        </li>
                        <li>
                          All auditors are requested to fill up the audit report
                          / NC report after conducting the audit.
                        </li>
                        <li>
                          Please verify the effectiveness of previous
                          Non-conformity closed.
                        </li>
                      </ol>
                    </div>
                  </td>
                  <td
                    colSpan="60"
                    style={{
                      textAlign: "center",
                      height: "48px",
                      verticalAlign: "top",
                      borderTop: "none",
                    }}
                  >
                    <strong>QA/MR-</strong>
                    {scheduleItem.scheduleSignName} on{" "}
                    {moment(scheduleItem.scheduleSubmitOn).format(
                      "DD/MM/YYYY, HH:mm"
                    )}
                    <br />
                    {getImage1[scheduleIndex] ? (
                      <img
                        src={getImage1[scheduleIndex]}
                        alt={`QA Sign ${scheduleIndex + 1}`}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "60px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      />
                    ) : (
                      <span>No image available</span>
                    )}
                  </td>
                </tr>
              </tbody>

              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="160"></td>
                </tr>
                <tr>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Particular
                  </th>
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
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Name
                  </th>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                </tr>
                <tr>
                  <th colSpan="40" style={{ textAlign: "center" }}>
                    Signature & Date
                  </th>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                  <td colSpan="40" style={{ textAlign: "center" }}></td>
                </tr>
              </tfoot>
              <br />
            </table>
          ))
        ) : (
          <table>
            <tbody>
              <tr>
                <td colSpan="160" style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
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
        formName="INTERNAL AUDIT SCHEDULE"
        formatNo="PH-QAD01/F-010"
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
              // eslint-disable-next-line no-unused-expressions
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
      {/* Year and Month Selection */}
      <Row>
        <Form style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
          <Form.Item label="Year">
            <Select
              onChange={yearChange}
              options={years}
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
          <Button
            key="submit"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: 190,
            }}
            icon={<IoPrint color="#00308F" />}
            onClick={printSubmit}
            disabled={isFetchSuccessful}
          >
            Print
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
            options={years}
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
            Month:
          </label>
          <Select
            showSearch
            options={months}
            onChange={monthPrintChange}
            value={selectedMonthValuePrint}
            style={{ width: "50%" }}
            placeholder="Select Month"
          />{" "}
        </div>
      </Modal>{" "}
    </div>
  );
};
export default QA_f010_internal_audit_schedule_summary;
