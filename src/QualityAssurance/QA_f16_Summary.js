/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
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
import { PrintPageOrientation } from "../General/PrintPageOrientation.js";

const QA_f16_Summary = () => {
  PrintPageOrientation({ orientation: "landscape", scale: 0.9 });
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [SummaryData, setSummaryData] = useState([]);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [monthPrint, setMonthPrint] = useState("");
  const [yearPrint, setYearPrint] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [getMembersSignFirstHalf, setGetMembersSignFirstHalf] = useState([]);
  const [getMembersSignSecondHalf, setGetMembersSignSecondHalf] = useState([]);

  const monthsLov = [
    { id: 1, value: "January" },
    { id: 2, value: "February" },
    { id: 3, value: "March" },
    { id: 4, value: "April" },
    { id: 5, value: "May" },
    { id: 6, value: "June" },
    { id: 7, value: "July" },
    { id: 8, value: "August" },
    { id: 9, value: "September" },
    { id: 10, value: "October" },
    { id: 11, value: "November" },
    { id: 12, value: "December" },
  ];
  const TypeLov = [
    { id: 1, value: "QUALITY MANAGEMENT SYSTEM" },
    { id: 2, value: "SOCIAL ACCOUNTABILITY MANAGEMENT SYSTEM" },
    { id: 3, value: "ENVIRONMENTAL MANAGEMENT SYSTEM" },
  ];
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

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2040);
  const handleMonthPrintChange = (value) => {
    setMonthPrint(value);
  };
  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };

  const handleMonthChange = (value) => {
    setMonth(value);
  };
  const handleYearChange = (value) => {
    setYear(value);
  };
  const handleTypeChange = (value) => {
    setType(value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.mrOrQaManagerSign;
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
          .catch((err) => {});
      }
    });
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const allFirstHalfImages = [];
    const allSecondHalfImages = [];

    const fetchImages = async () => {
      const promises = [];
      setSaveLoading(true);
      printResponseData?.forEach((detail, detailIndex) => {
        const half = Math.ceil(detail.agendaformanagementattendees.length / 2);
        const firstHalf = detail.agendaformanagementattendees.slice(0, half);
        const secondHalf = detail.agendaformanagementattendees.slice(half);

        const firstHalfImages = [];
        const secondHalfImages = [];

        firstHalf.forEach((item, index) => {
          const username = item?.name;
          if (username) {
            promises.push(
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
                  firstHalfImages[index] = url;
                })
                .catch((err) => {
                  firstHalfImages[index] = "";
                })
            );
          } else {
            firstHalfImages[index] = "";
          }
        });

        secondHalf.forEach((item, index) => {
          const username = item?.name;
          if (username) {
            promises.push(
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
                  secondHalfImages[index] = url;
                })
                .catch((err) => {
                  secondHalfImages[index] = "";
                })
            );
          } else {
            secondHalfImages[index] = "";
          }
        });

        allFirstHalfImages[detailIndex] = firstHalfImages;
        allSecondHalfImages[detailIndex] = secondHalfImages;
      });

      await Promise.all(promises);

      setGetMembersSignFirstHalf(allFirstHalfImages);
      setGetMembersSignSecondHalf(allSecondHalfImages);
      setSaveLoading(false);
    };

    if (printResponseData) {
      fetchImages();
    }
  }, [printResponseData,API.prodUrl]);

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
    setMonthPrint(null);
    setYearPrint(null);
  };

  //   handle edit
  const handleEdit = (record) => {
    const { month } = record;
    const { year } = record;
    const { headings } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QA/F-16", {
      state: {
        month: month,
        year: year,
        type: headings,
      },
    });
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  //   summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/qa/getSummarydetailsAgenda`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data && data.length >= 0) {
        setSummaryData(
          data.map((item, index) => ({
            key: item.header_id,
            month: item.month,
            year: item.year,
            mrOrQaManagerStatus: item.mrOrQaManagerStatus,
            id: item.id,
            sno: index + 1,
            headings: item.headings,
          }))
        );
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      message.error(error.data.message);
    } finally {
    }
  };

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },

    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "MR / QA Manager Status",
      dataIndex: "mrOrQaManagerStatus",
      key: "mrOrQaManagerStatus",
      align: "center",
    },
    {
      title: "Actions",
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
    if (
      (monthPrint == "" || monthPrint == null) &&
      (yearPrint == "" || yearPrint == null)
    ) {
      message.warning("Please Select Month or Year");
      return;
    }
    fetchPrintValue();
  };
  useEffect(() => {
    if (!saveLoading && printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 2000);
    }
  }, [printResponseData]);
  const fetchPrintValue = () => {
    let monthP;
    let YearP;
    if (monthPrint == null) {
      monthP = "";
    } else {
      monthP = monthPrint;
    }
    if (yearPrint == null) {
      YearP = "";
    } else {
      YearP = yearPrint;
    }
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/qa/getdetailsForPrintAgenda?year=${YearP}&month=${monthP}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.body.message !== "No data") {
            const printResponseData = res.data.body;
            setPrintResponseData(printResponseData);
          } else {
            message.error(res.data.body.message);
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };
  //   goto button
  const goTo = () => {
    if (month == "" || month == null) {
      message.warning("Please Select Month");
      return;
    }
    if (year == "" || year == null) {
      message.warning("Please Select Year");
      return;
    }
    if (type == "" || type == null) {
      message.warning("Please Select Form Type");
      return;
    }
    navigate("/Precot/QA/F-16", {
      state: {
        month: month,
        year: year,
        type: type,
      },
    });
  };
  const recordsPerPage = 8;

  // Calculate total pages correctly
  const totalPages = Math.ceil(
    printResponseData?.reduce((acc, detail) => {
      return (
        acc +
        detail.agendatopicslines.length +
        Math.ceil(detail.agendaformanagementattendees.length / 2)
      );
    }, 0) / recordsPerPage
  );

  const [pageNumber, setPageNumber] = useState(1);

  return (
    // print section
    <div>
      <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => {
          const start = pageIndex * recordsPerPage;
          const end = start + recordsPerPage;
          const currentPageData = printResponseData.slice(start, end);
          const half = Math.ceil(
            printResponseData?.agendaformanagementattendees?.length / 2
          );
          const firstHalf =
            printResponseData?.agendaformanagementattendees?.slice(0, half);
          const secondHalf =
            printResponseData?.agendaformanagementattendees?.slice(half);
          return (
            <div
              key={pageIndex}
              style={{ marginTop: "40px", pageBreakAfter: "always" }}
            >
              {setPageNumber(pageIndex + 1)}
              <table
                style={{
                  marginTop: "10px",
                  scale: "94%",
                  tableLayout: "fixed",
                }}
                key={pageIndex}
              >
                <thead>
                  <tr>
                    <td
                      colSpan="15"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "100px", height: "auto" }}
                      />
                      <br />
                      Unit H
                    </td>
                    <th
                      colSpan="70"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      AGENDA FOR MANAGEMENT REVIEW MEETING
                    </th>
                    <td colSpan="15">Format No.:</td>
                    <td colSpan="15">PH-QAD01/F-016</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Revision No.:</td>
                    <td colSpan="15">01</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Ref. SOP No.:</td>
                    <td colSpan="15">PH-QAD01-D-18</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Page No.:</td>
                    <td colSpan="15">
                      {pageNumber} of {totalPages}
                    </td>
                  </tr>
                </thead>
                <br />
                <tbody>
                  {currentPageData.map((detail, index) => (
                    <>
                      <tr>
                        <td colSpan="40">Meeting No.: {detail.meetingNo}</td>
                        <td colSpan="40">Date: {formattedDate(detail.date)}</td>
                        <td colSpan="35">Time: {detail.time}</td>
                      </tr>
                      <tr>
                        <td colSpan="115">
                          Chair Person: {detail.chairPerson}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="115">Venue: {detail.venue}</td>
                      </tr>

                      {/* Agenda Topics */}
                      <tr>
                        <th colSpan="10" style={{ textAlign: "center" }}>
                          S. No.
                        </th>
                        <th colSpan="50" style={{ textAlign: "center" }}>
                          Topic
                        </th>
                        <th colSpan="30" style={{ textAlign: "center" }}>
                          Presented by
                        </th>
                        <th colSpan="25" style={{ textAlign: "center" }}>
                          Time allotted
                        </th>
                      </tr>
                      {detail.agendatopicslines?.map((item, idx) => (
                        <tr key={idx}>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {idx + 1}
                          </td>
                          <td colSpan="50" style={{ textAlign: "center" }}>
                            {item.topics}
                          </td>
                          <td colSpan="30" style={{ textAlign: "center" }}>
                            {item.presentedBy}
                          </td>
                          <td colSpan="25" style={{ textAlign: "center" }}>
                            {item.timeAlloted}
                          </td>
                        </tr>
                      ))}

                      {/* Members Present Section */}
                      <tr>
                        <th colSpan="115">MEMBERS PRESENT:</th>
                      </tr>
                      <tr>
                        <th colSpan="29" style={{ textAlign: "center" }}>
                          Name
                        </th>
                        <th colSpan="29" style={{ textAlign: "center" }}>
                          Sign.
                        </th>
                        <th colSpan="29" style={{ textAlign: "center" }}>
                          Name
                        </th>
                        <th colSpan="28" style={{ textAlign: "center" }}>
                          Sign.
                        </th>
                      </tr>
                      {firstHalf.map((attendee, idx) => (
                        <tr key={idx}>
                          <td colSpan="29" style={{ textAlign: "center" }}>
                            {attendee.name}
                          </td>
                          <td colSpan="29" style={{ textAlign: "center" }}>
                            {getMembersSignFirstHalf[index]?.[idx] && (
                              <img
                                src={getMembersSignFirstHalf[index][idx]}
                                alt={`Member Sign ${idx + 1}`}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "contain",
                                  marginTop: "20px",
                                }}
                              />
                            )}
                          </td>
                          <td colSpan="29" style={{ textAlign: "center" }}>
                            {secondHalf[idx]?.name}
                          </td>
                          <td colSpan="28" style={{ textAlign: "center" }}>
                            {getMembersSignSecondHalf[index]?.[idx] && (
                              <img
                                src={getMembersSignSecondHalf[index][idx]}
                                alt={`Member Sign ${idx + 1}`}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "contain",
                                  marginTop: "20px",
                                }}
                              />
                            )}
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <th colSpan="115">
                          Note: This Management Review Meeting covers all the
                          requirements of ISO 9001:2015 and BRC for Consumer
                          Products (Issue 4).
                        </th>
                      </tr>
                      <tr>
                        <td colSpan="65">Remarks: {detail.remarks}</td>
                        <td colSpan="50" style={{ textAlign: "center" }}>
                          MR/QA Manager Sign & Date
                          <br />
                          ----------------------------
                          <br />
                          {getImage1[index] && (
                            <img
                              src={getImage1[index]}
                              alt={`QA Manager Sign ${index + 1}`}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "contain",
                                marginTop: "20px",
                              }}
                            />
                          )}
                          <br />
                          {detail.mrOrQaManagerSign}
                          <br />
                          {formattedDatewithTime(
                            detail.mrOrQaManagerSubmittedOn
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>

                <br />
                <tfoot>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }} colSpan="115"></td>
                  </tr>
                  <tr>
                    <th colSpan="25">Particular</th>
                    <th colSpan="30" style={{ textAlign: "center" }}>
                      Prepared by
                    </th>
                    <th colSpan="30" style={{ textAlign: "center" }}>
                      Reviewed by
                    </th>
                    <th colSpan="30" style={{ textAlign: "center" }}>
                      Approved by
                    </th>
                  </tr>
                  <tr>
                    <th colSpan="25">Name</th>
                    <td colSpan="30"></td>
                    <td colSpan="30"></td>
                    <td colSpan="30"></td>
                  </tr>
                  <tr>
                    <th colSpan="25">Signature & Date</th>
                    <td colSpan="30"></td>
                    <td colSpan="30"></td>
                    <td colSpan="30"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        })}
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
          formName="AGENDA FOR MANAGEMENT REVIEW MEETING"
          formatNo="PH-QAD01/F-016"
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
            <label>Month :</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={month}
              onChange={handleMonthChange}
              style={{ width: "100%" }}
              placeholder="Search Month"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Month
              </Select.Option>
              {monthsLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Col>
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
                Select Year
              </Select.Option>
              {yearOptions.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <label>Type :</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={type}
              onChange={handleTypeChange}
              style={{ width: "100%" }}
              placeholder="Search Type"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Form Type
              </Select.Option>
              {TypeLov.map((option) => (
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
          dataSource={SummaryData}
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
            loading={saveLoading}
          >
            Submit
          </Button>,
        ]}
      >
        {" "}
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
            value={monthPrint}
            onChange={handleMonthPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Month"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Month
            </Select.Option>
            {monthsLov.map((option) => (
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
            <Select.Option value="" disabled selected>
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

export default QA_f16_Summary;
