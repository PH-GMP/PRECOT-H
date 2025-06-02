/* eslint-disable no-restricted-globals */
import { EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Select, Spin, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import {
    getFullMonthFromNumber,
    printDateFormat,
    slashFormatDate,
} from "../util/util.js";

const QA_F017_Summary = () => {
  const navigate = useNavigate();
  const naviagateForm = "/Precot/QA/QA_F017";
  const formName = "Minutes of MRM";
  const formatNo = "PH-QAD01-F-017";
  const [loadingState, setLoadingState] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [printMonth, setPrintMonth] = useState();
  const [printyear, setPrintyear] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [selectedHeading, setSelectHeading] = useState();
  const [summaryData, setSummaryData] = useState([]);
  const [headingsLov, setHeadingsLov] = useState([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [eSign, setESign] = useState([
    {
      mrOrQaManagerSign: "",
    },
  ]);

  const [printData, setPrintData] = useState([
    {
      unit: "Unit H",
      formatNo: "FMT-001",
      formatName: "Review Meeting",
      sopNumber: "SOP-100",
      revisionNo: "Rev-3",
      date: "",
      month: "",
      year: "",
      period_of_review: "",
      mrm_no: "",
      subject: "",
      participants: "",
      remark: null,
      mrOrQaManagerStatus: "",
      mrOrQaManagerSavedOn: "",
      mrOrQaManagerSavedBy: "",
      mrOrQaManagerSavedId: "",
      mrOrQaManagerSubmittedOn: "",
      mrOrQaManagerSubmittedBy: "",
      mrOrQaManagerSubmittedId: "",
      mrOrQaManagerSign: "",
      minutesofmrmlines: [
        {
          line_id: 3,
          topics: "",
          details_of_discussion: "",
          actions_decided: "",
          responsibility: "",
          target_date: "",
          id: 8,
        },
      ],
    },
  ]);

  const columns = [
    {
      title: "S. No",
      key: "sno",
      align: "center",
      render: (text, record, index) => {
        return (currentPage - 1) * pageSize + (index + 1);
      },
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => {
        return slashFormatDate(date);
      },
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
      title: "Headings",
      dataIndex: "headings",
      key: "headings",
      align: "center",
    },

    {
      title: "MR / QA Status",
      dataIndex: "mrOrQaManagerStatus",
      key: "mrOrQaManagerStatus",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      align: "center",
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

  const showPrintModal = () => {
    setIsModalPrint(true);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleGo = () => {
    if (year === undefined || month === undefined) {
      message.warning("please select month");
      return;
    }

    if (selectedHeading === undefined) {
      message.warning("please select headings");
    }

    navigate(naviagateForm, {
      state: {
        month: getFullMonthFromNumber(year, month),
        year: year,
        headings: selectedHeading,
      },
    });
  };

  const handleEdit = (record) => {
    navigate(naviagateForm, {
      state: {
        month: record.month,
        year: record.year,
        headings: record.headings,
      },
    });
  };

  const handlePrintMonthChange = (e) => {
    const [year, month] = e.target.value.split("-");

    setPrintMonth(getFullMonthFromNumber(year, month));
    setPrintyear(year);
  };

  const handleMonthChange = (e) => {
    const [year, month] = e.target.value.split("-");

    setMonth(month);

    setYear(year);

    fetchHeadingLovData(year, getFullMonthFromNumber(year, month));
  };

  const handleSelectChange = (value) => {
    setSelectHeading(value);
  };

  const handlePrint = () => {
    setPrintLoading(true);

    const token = localStorage.getItem("token");

    if (!printyear || !printMonth) {
      message.warning("please select month");
      setPrintLoading(false);
      return;
    }

    axios
      .get(
        `${API.prodUrl}/Precot/api/qa/getdetailsForPrintMOM?year=${printyear}&month=${printMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.body.message === "No data") {
          setPrintLoading(false);
          message.warning("No data available for this month!!");
        } else {
          setPrintData(response.data.body);
          setTimeout(() => {
            window.print();
            setPrintLoading(false);
          }, 2000);
        }
      })
      .catch((error) => {
        setPrintLoading(false);
        console.error("Error fetching data:", error);
      });
  };

  const handleModalClose = () => {
    setIsModalPrint(false);
    setPrintLoading(false);
  };

  const fetchHeadingLovData = (year, month) => {
    setLoadingState(true);
    const token = localStorage.getItem("token");
    // Get the token from localStorage

    axios
      .get(
        `${API.prodUrl}/Precot/api/qa/getdetailsbyAgendaParamMOM?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        }
      )
      .then((response) => {
        if (response.data.body.message === "No data") {
          setHeadingsLov([]);
          message.warning("no data avail for this month");
        } else {
          const transformedHeadings = response.data.body.map((item, index) => ({
            value: item.headings,
            id: index + 1, // Assigning an incremental ID
          }));
          setHeadingsLov(transformedHeadings);
        }
        setLoadingState(false);
      })
      .catch((error) => {
        setLoadingState(false);
        console.error("Error fetching data:", error); // Handle any errors
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["mrOrQaManagerSign"];

    if (printData && printData.length > 0) {
      printData.forEach((dataItem, index) => {
        let newSign = {}; // Create a new object for the current printData item

        signatureKeys.forEach((key) => {
          const username = dataItem[key];

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
                newSign[key] = url;

                setESign((prevSign) => {
                  const updatedSigns = [...prevSign];
                  updatedSigns[index] = {
                    ...updatedSigns[index],
                    ...newSign,
                  };
                  return updatedSigns;
                });
              })
              .catch((err) => {});
          }
        });
      });
    }
  }, [printData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = () => {
      // Get the token from localStorage

      axios
        .get(`${API.prodUrl}/Precot/api/qa/getSummarydetailsMOM`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        })
        .then((response) => {
          if (response.status === 403) {
            message.warning("You are not authorized person to view this form");
            navigate("/Precot/choosenScreen");
            return; // Stop further execution
          }
          setSummaryData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        });
    };
    fetchData();
  }, []);

  return (
    <>
      {
        <Spin spinning={loadingState}>
          <BleachingHeader
            formName={formName}
            formatNo={formatNo}
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
                icon={<FaPrint color="#00308F" />}
                onClick={showPrintModal}
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
          <label style={{ padding: "0.5rem" }}>Select Month: </label>
          <input
            type="month"
            style={{ padding: "0.5rem", margin: "0.5rem" }}
            onChange={handleMonthChange}
          />
          <Select
            placeholder="select headings"
            options={headingsLov}
            value={selectedHeading ?? null}
            onChange={handleSelectChange}
            style={{ width: "30rem", margin: "0.5rem", textAlign: "center" }}
          />
          <Button onClick={handleGo}>Go</Button>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Table
              dataSource={summaryData}
              columns={columns}
              style={{ width: "98%" }}
              pagination={{
                pageSize: pageSize,
                onChange: (page) => setCurrentPage(page),
              }}
            />
          </div>

          <Modal
            title="Minutes of MRM (Print)"
            open={isModalPrint}
            width={380}
            destroyOnClose={true}
            onOk={() => setIsModalPrint(false)}
            onCancel={handleModalClose}
            footer={[
              <Button
                key="submit"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                }}
                shape="round"
                type="primary"
                onClick={handlePrint}
                loading={printLoading}
              >
                Print
              </Button>,
            ]}
          >
            <div>
              <label style={{ padding: "0.5rem" }}>Select Month: </label>
              <input
                type="month"
                style={{ padding: "0.5rem", margin: "0.5rem" }}
                onChange={handlePrintMonthChange}
              />
            </div>
          </Modal>

          <div id="section-to-print">
            <style>
              {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print table th,
  #section-to-print table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
                .page-break {
                page-break-after: always;
            }
      }
    `}
            </style>

            {printData.map((eachData, index) => (
              <div style={{ pageBreakAfter: "always" }}>
                <table>
                  <thead>
                    <tr>
                      <td style={{ padding: "1rem", border: "none" }}></td>
                    </tr>
                    <tr>
                      <th
                        rowSpan={4}
                        style={{ textAlign: "center", height: "80px" }}
                      >
                        <img
                          src={logo}
                          alt="Logo"
                          style={{ width: "50px", height: "auto" }}
                        />{" "}
                        <br></br>
                        Unit H
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        rowSpan={4}
                        colSpan={3}
                      >
                        Minutes of MRM
                      </th>
                      <th>Format No:</th>
                      <th style={{ textAlign: "center" }}>{formatNo}</th>
                    </tr>
                    <tr>
                      <th>Revision No.:</th>
                      <th style={{ textAlign: "center" }}>01</th>
                    </tr>
                    <tr>
                      <th>Ref. SOP No:</th>
                      <th style={{ textAlign: "center" }}>PH-QAD01-D-18</th>
                    </tr>
                    <tr>
                      <th>Page No:</th>
                      <th style={{ textAlign: "center" }}>
                        {index + 1} of {printData.length}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "1rem", border: "none" }}></td>
                    </tr>
                    <React.Fragment key={index}>
                      <tr>
                        <td colSpan={3} style={{ padding: "0.5rem" }}>
                          Date:{slashFormatDate(eachData.date)}
                        </td>
                        <td colSpan={3} style={{ padding: "0.5rem" }}>
                          MRM No: {eachData.mrm_no}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6} style={{ padding: "0.5rem" }}>
                          <span>
                            Period of Review: {eachData.period_of_review}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6} style={{ padding: "0.5rem" }}>
                          <span>Subject: {eachData.subject}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6} style={{ padding: "0.5rem" }}>
                          <span>Participants: {eachData.participants}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "center", padding: "0.5rem" }}>
                          <span>S.No</span>
                        </td>
                        <td style={{ textAlign: "center", padding: "0.5rem" }}>
                          Subject
                        </td>
                        <td style={{ textAlign: "center", padding: "0.5rem" }}>
                          Details of Discussion
                        </td>
                        <td style={{ textAlign: "center", padding: "0.5rem" }}>
                          Actions Decided
                        </td>
                        <td style={{ textAlign: "center", padding: "0.5rem" }}>
                          Responsibility / Target Date
                        </td>
                        <td style={{ textAlign: "center", padding: "0.5rem" }}>
                          Remark / Reference Annexure
                        </td>
                      </tr>

                      {eachData.minutesofmrmlines.map((data, index) => (
                        <tr>
                          <td
                            style={{ textAlign: "center", padding: "0.5rem" }}
                          >
                            <span>{index + 1}</span>
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "0.5rem" }}
                          >
                            <span>{data.topics}</span>
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "0.5rem" }}
                          >
                            <span>{data.details_of_discussion}</span>
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "0.5rem" }}
                          >
                            <span>{data.actions_decided}</span>
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "0.5rem" }}
                          >
                            <span style={{ margin: "0 5px" }}>
                              {data.responsibility}
                            </span>

                            <span style={{ margin: "0 5px" }}>
                              {slashFormatDate(data.target_date)}
                            </span>
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "0.5rem" }}
                          >
                            <span>{data.remark}</span>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          colSpan={3}
                          style={{ textAlign: "center", padding: "0.5rem" }}
                        >
                          <p>Prepared By:</p>

                          <b>
                            {eachData.mrOrQaManagerSign}
                            <br></br>
                            {printDateFormat(eachData.mrOrQaManagerSubmittedOn)}
                          </b>
                          <br></br>
                          {eSign.length > 0 &&
                          eSign[index]?.mrOrQaManagerSign ? (
                            <img
                              src={
                                eSign.length > 0 &&
                                eSign[index]?.mrOrQaManagerSign
                              }
                              alt="mrOrQaManagerSign"
                              style={{
                                width: "100px",
                                height: "50px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}
                            />
                          ) : null}
                        </td>
                        <td
                          colSpan={3}
                          style={{ padding: "0.5rem", textAlign: "center" }}
                        >
                          <p>Approved By:</p>

                          <b>
                            {eachData.mrOrQaManagerSign}
                            <br></br>
                            {printDateFormat(eachData.mrOrQaManagerSubmittedOn)}
                          </b>
                          <br></br>
                          {eSign.length > 0 &&
                          eSign[index]?.mrOrQaManagerSign ? (
                            <img
                              src={
                                eSign.length > 0 &&
                                eSign[index]?.mrOrQaManagerSign
                              }
                              alt="mrOrQaManagerSign"
                              style={{
                                width: "100px",
                                height: "50px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}
                            />
                          ) : null}
                        </td>
                      </tr>

                      {/* for exrta space */}
                    </React.Fragment>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ padding: "1rem", border: "none" }}></td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Particualrs</td>
                      <td>Prepared By</td>
                      <td>Reviewed by</td>
                      <td>Approved by</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Name</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Signature & Date</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))}
          </div>
        </Spin>
      }
    </>
  );
};

export default QA_F017_Summary;
