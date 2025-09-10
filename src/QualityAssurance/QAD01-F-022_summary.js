/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row, Select, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f22_Summary = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [year, setYear] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [yearPrint, setYearPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.designeeSign;
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
          setGetImage1(url);
        })
        .catch((err) => { });
    }
  }, [printResponseData,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.qaManagerMrSign;
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
          setGetImage2(url);
        })
        .catch((err) => { });
    }
  }, [printResponseData,API.prodUrl, token]);

  const formattedDate = (dateStr) => {
    if (!dateStr) return "";
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
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
  };
  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
  };

  //   handle edit
  const handleEdit = (record) => {
    const { year } = record;
    navigate("/Precot/QA/F-22", {
      state: {
        year: year,
      },
    });
  };
  function generateYearRanges(startYear, endYear) {
    const yearRanges = [];
    for (let year = startYear; year < endYear; year++) {
      yearRanges.push({
        key: `${year}-${year + 1}`,
        value: `${year}-${year + 2}`,
      });
    }
    return yearRanges;
  }

  const yearOptions = generateYearRanges(2024, 2100);

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

      let apiUrl = `${API.prodUrl}/Precot/api/QA/Service/supplierAuditPlan/getAuditPlanSummary`;

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
            year: item.financialYear,
            designee_status: item.designeeStatus,
            qa_status: item.qaManagerMrStatus,
            reason: item.reason,
            id: item.id,
            sno: index + 1,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      const errorMessage =
        error?.message || "An unknown error occurred while fetching data";
      message.error(errorMessage);
    }
  };

  // Check for rejected QA Manager/MR status and set 'reason' accordingly
  useEffect(() => {
    const findReason = () => {
      const rejectedStatus = tableData.some(
        (data) => data.qa_status === "QA_MANAGER_MR_REJECTED"
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
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "Designee",
      dataIndex: "designee_status",
      key: "designee_status",
      align: "center",
    },
    {
      title: "QA_Manager/MR Status",
      dataIndex: "qa_status",
      key: "qa_status",
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

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
  } else {
    columns = baseColumns;
  }

  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 100);
    }
  }, [printResponseData]);

  const fetchPrintValue = (value) => {
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/supplierAuditPlan/print?financialYear=${yearPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const printResponseData = res.data;
            setPrintResponseData(res.data);
          } else if (res.data && res.data.message) {
            message.error(res.data.message);
          } else {
            message.error("No data available");
          }
        })
        .catch((err) => {
          message.error("Failed to fetch data");
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  //   goto button
  const goTo = () => {
    if (year == "" || year == null) {
      message.warning("Please Select Year");
      return;
    }

    if (year == "" || year == null) {
      message.warning("Please Select Year");
      return;
    }
    navigate("/Precot/QA/F-22", {
      state: {
        year: year,
      },
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading 0 if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month and pad with leading 0 (month is 0-based)
    const year = date.getFullYear(); // Get the year

    return `${day}/${month}/${year}`;
  }

  const rowsPerPage = 20;
  const preparePaginatedData = (
    auditPlanInfoList = [],
    financialYear = "N/A"
  ) => {
    let pages = [];
    let currentPage = [];
    let rowCount = 0;

    // Sections: Packing, Chemical, Cotton
    const sections = [
      {
        type: "Material Packing",
        title: "Packing Material Supplier List",
        addMonthHeaders: true,
      },
      {
        type: "chemical Supplier",
        title: "Chemical Supplier List",
        addMonthHeaders: false,
      },
      {
        type: "cotton supplier",
        title: "Cotton Supplier List",
        addMonthHeaders: false,
      },
    ];

    sections.forEach(({ type, title, addMonthHeaders }) => {
      const filteredData =
        auditPlanInfoList?.filter((row) => row.supplierType === type) || [];

      if (filteredData.length > 0) {
        // Add Section Heading Row
        currentPage.push({ type: "sectionHeader", content: title });

        // Add heading as a separate row
        if (type !== "Material Packing") {
          currentPage.push({
            type: "headingRow",
            content: (
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  colSpan="100"
                >
                  {title}
                </td>
              </tr>
            ),
          });
        }
        rowCount++;
      }

      // Add Month Headers **Only for Packing Material Supplier List**
      if (
        addMonthHeaders &&
        financialYear &&
        typeof financialYear === "string"
      ) {
        const startYear = financialYear.split("-")[0] || "2024";
        const midYear = (parseInt(startYear) + 1).toString();
        const endYear = (parseInt(midYear) + 1).toString();
        const startYearLastTwo = startYear.slice(-2);
        const midYearLastTwo = midYear.slice(-2);
        const endYearLastTwo = endYear.slice(-2);

        const monthHeaders = [
          { text: "SNo", width: "1px" },
          { text: title, colSpan: 2 },
          ...[
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
          ].map((month) => `${month}. '${startYearLastTwo}`),
          ...["Jan", "Feb", "Mar"].map(
            (month) => `${month}. '${midYearLastTwo}`
          ),
          ...[
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
          ].map((month) => `${month}. '${midYearLastTwo}`),
          ...["Jan", "Feb", "Mar"].map(
            (month) => `${month}. '${endYearLastTwo}`
          ),
        ];

        currentPage.push({ type: "sectionHeadings", content: monthHeaders });
        rowCount++;
      }

      filteredData.forEach((row, index) => {
        if (rowCount >= rowsPerPage) {
          pages.push(currentPage);
          currentPage = [];
          rowCount = 0;
        }

        const formatDate = (dateStr) => {
          if (!dateStr || dateStr.toLowerCase() === "null")
            return <span>NA</span>; // Handle missing values
          const [year, month, day] = dateStr.split("-"); // Extract YYYY, MM, DD
          return (
            <span
              style={{
                whiteSpace: "nowrap",
                display: "block",
                textAlign: "center",
              }}
            >
              {`${day}/${month}/`} <br /> {year}
            </span>
          );
        };
        // Utility function to clean plan values (replace empty/missing values with "NA")
        const formatPlanValue = (value) =>
          !value || value.toLowerCase() === "null" ? "NA" : value;

        currentPage.push({
          type: "sectionData",
          index: index + 1,
          supplierName: row.supplierName,
          planOrActual: "Plan",
          values: [
            formatPlanValue(row.year1AprilPlan),
            formatPlanValue(row.year1MayPlan),
            formatPlanValue(row.year1JunePlan),
            formatPlanValue(row.year1JulyPlan),
            formatPlanValue(row.year1AugustPlan),
            formatPlanValue(row.year1SeptemberPlan),
            formatPlanValue(row.year1OctoberPlan),
            formatPlanValue(row.year1NovemberPlan),
            formatPlanValue(row.year1DecemberPlan),
            formatPlanValue(row.year1JanuaryPlan),
            formatPlanValue(row.year1FebruaryPlan),
            formatPlanValue(row.year1MarchPlan),
            formatPlanValue(row.year2AprilPlan),
            formatPlanValue(row.year2MayPlan),
            formatPlanValue(row.year2JunePlan),
            formatPlanValue(row.year2JulyPlan),
            formatPlanValue(row.year2AugustPlan),
            formatPlanValue(row.year2SeptemberPlan),
            formatPlanValue(row.year2OctoberPlan),
            formatPlanValue(row.year2NovemberPlan),
            formatPlanValue(row.year2DecemberPlan),
            formatPlanValue(row.year2JanuaryPlan),
            formatPlanValue(row.year2FebruaryPlan),
            formatPlanValue(row.year2MarchPlan),
          ],
          actualValues: [
            formatDate(row.year1AprilActual),
            formatDate(row.year1MayActual),
            formatDate(row.year1JuneActual),
            formatDate(row.year1JulyActual),
            formatDate(row.year1AugustActual),
            formatDate(row.year1SeptemberActual),
            formatDate(row.year1OctoberActual),
            formatDate(row.year1NovemberActual),
            formatDate(row.year1DecemberActual),
            formatDate(row.year1JanuaryActual),
            formatDate(row.year1FebruaryActual),
            formatDate(row.year1MarchActual),
            formatDate(row.year2AprilActual),
            formatDate(row.year2MayActual),
            formatDate(row.year2JuneActual),
            formatDate(row.year2JulyActual),
            formatDate(row.year2AugustActual),
            formatDate(row.year2SeptemberActual),
            formatDate(row.year2OctoberActual),
            formatDate(row.year2NovemberActual),
            formatDate(row.year2DecemberActual),
            formatDate(row.year2JanuaryActual),
            formatDate(row.year2FebruaryActual),
            formatDate(row.year2MarchActual),
          ],
        });

        rowCount += 2;
      });
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  };

  const pages = preparePaginatedData(
    printResponseData?.[0]?.auditPlanInfoList || [],
    printResponseData?.[0]?.financialYear || "N/A"
  );

  return (
    <div>
      <div id="section-to-print">
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className="page">
            <table
              className="audit-table"
              style={{
                marginTop: "20px",
                marginLeft: "0px",
                marginRight: "20px",
                scale: "95%",
              }}
            >
              <thead>
                <tr>
                  <td colSpan="2" rowspan="4" style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br></br>
                    Unit H
                  </td>
                  <th colSpan="15" rowSpan="4" style={{ textAlign: "center" }}>
                    SUPPLIER’S AUDIT PLAN
                  </th>
                  <td colSpan="5">Format No.:</td>
                  <td colSpan="5">PH-QAD01/F-022</td>
                </tr>
                <tr>
                  <td colSpan="5">Revision No.:</td>
                  <td colSpan="5">01</td>
                </tr>
                <tr>
                  <td colSpan="5">Ref. SOP No.:</td>
                  <td colSpan="5">PH-QAD01-D-22</td>
                </tr>
                <tr>
                  <td colSpan="5">Page No.:</td>
                  <td colSpan="5">
                    {pageIndex + 1} of {pages.length}
                  </td>
                </tr>
                <br />
                <tr>
                  <td colSpan={100}>
                    Year:{printResponseData?.[0]?.financialYear}
                  </td>
                </tr>
              </thead>
              <tbody>
                {page.map((row, index) => {
                  if (row.type === "sectionHeader") {
                    if (
                      row.content === "Chemical Supplier List" ||
                      row.content === "Cotton Supplier List"
                    ) {
                      return (
                        <tr key={index}>
                          <td
                            style={{
                              fontWeight: "bold",
                              textAlign: "left",
                              fontSize: "16px",
                            }}
                            colSpan="100"
                          >
                            {row.content}
                          </td>
                        </tr>
                      );
                    }
                  }
                  if (row.type === "sectionHeadings") {
                    return (
                      <tr key={index} className="month-header">
                        {row.content.map((header, idx) => {
                          if (typeof header === "object") {
                            return (
                              <th
                                key={idx}
                                style={{ textAlign: "left" }}
                                colSpan={header.colSpan}
                              >
                                {header.text}
                              </th>
                            ); // Correctly apply colSpan
                          }
                          return (
                            <th
                              key={idx}
                              style={
                                idx === 0
                                  ? { width: "2px", textAlign: "left" }
                                  : {}
                              }
                            >
                              {header}
                            </th>
                          );
                        })}
                      </tr>
                    );
                  }
                  if (
                    row.type === "sectionData" &&
                    row.planOrActual === "Plan"
                  ) {
                    return (
                      <>
                        {/* First row for Plan */}
                        <tr key={`${index}-plan`}>
                          <td rowSpan="2" colSpan={1} style={{ width: "3%" }}>
                            {row.index}
                          </td>{" "}
                          {/* Merge SNo */}
                          <td rowSpan="2" style={{ width: "5%" }}>
                            {row.supplierName}
                          </td>{" "}
                          {/* Merge Supplier Name */}
                          <td>Plan</td>
                          {row.values.map((value, idx) => (
                            <td
                              key={idx}
                              style={{ textAlign: "center", width: "10%" }}
                            >
                              {value || "—"}
                            </td>
                          ))}
                        </tr>
                        {/* Second row for Actual */}
                        <tr key={`${index}-actual`}>
                          <td>Actual</td>
                          {row.actualValues.map((value, idx) => (
                            <td
                              key={idx}
                              style={{ textAlign: "center", width: "10%" }}
                            >
                              {value || "—"}
                            </td>
                          ))}
                        </tr>
                      </>
                    );
                  }
                  return null;
                })}
                <tr>
                  <td colSpan="14" style={{ textAlign: "center" }}>
                    Prepared by
                  </td>

                  <td colSpan="14" style={{ textAlign: "center" }}>
                    Approved by
                  </td>
                </tr>

                <tr>
                  <td colSpan="14" style={{ textAlign: "center" }}>
                    {getImage1 && (
                      <img
                        src={getImage1}
                        alt="Designee Sign"
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
                      {printResponseData?.[0]?.designeeSign}
                      <br />
                    </div>

                    <div style={{ textAlign: "center" }}>
                      {formattedDate(printResponseData?.[0]?.designeeSubmitOn)}
                    </div>
                  </td>

                  <td colSpan="14" style={{ textAlign: "center" }}>
                    {getImage2 && (
                      <img
                        src={getImage2}
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
                      {printResponseData?.[0]?.qaManagerMrSign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDate(
                        printResponseData?.[0]?.qaManagerMrSubmitOn
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="250"></td>
                </tr>
                <tr>
                  <th colSpan="7">Particular</th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Prepared by
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Reviewed by
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Approved by
                  </th>
                </tr>
                <tr>
                  <th colSpan="7">Name</th>
                  <td colSpan="7"></td>
                  <td colSpan="7"></td>
                  <td colSpan="7"></td>
                </tr>
                <tr>
                  <th colSpan="7">Signature & Date</th>
                  <td colSpan="7"></td>
                  <td colSpan="7"></td>
                  <td colSpan="7"></td>
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
          formName="SUPPLIER’S AUDIT PLAN"
          formatNo="PH-QAD01/F-022"
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
            <label>Year :</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={year}
              onChange={handleYearChange}
              style={{ width: "100%" }}
              placeholder="Search Year"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                SelectYear
              </Select.Option>
              {yearOptions.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
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
            onClick={printSubmit} // Ensure this points to your submit handler
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
            Year:
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={handleYearPrintChange}
            style={{ width: "100%" }}
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
      </Modal>
    </div>
  );
};

export default QA_f22_Summary;
