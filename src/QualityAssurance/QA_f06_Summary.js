/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  EditOutlined
} from "@ant-design/icons";
import {
  Button, Col,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip
} from "antd";
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

const QA_f06_Summary = () => {
  PrintPageOrientation({ orientation: "landscape", scale: 0.9 });
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [year, setYear] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [yearPrint, setYearPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const navigate = useNavigate(); 
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (data.qaManagerMrStatus === "QA_MANAGER_MR_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.qaDesigneeSign;
    if (username) {
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
        .catch((err) => {
          
        });
    }
  }, [printResponseData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.qaManagerMrSign;
    if (username) {
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
        .catch((err) => {
          
        });
    }
  }, [printResponseData, API.prodUrl, token]);

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
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
    navigate("/Precot/QA/F-06", {
      state: {
        year: year,
      },
    });
  };

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2100);
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

  //   summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      let apiUrl = `${ API.prodUrl}/Precot/api/QA/Service/trainingCalendar/getTrainingCalendarSummary`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "ROLE_DESIGNEE" ||
        role === "QA_MANAGER" ||
        role === "ROLE_MR"
      ) {
        setCakingData(data);
      }
      if (data && data.message != "User is not allowed to get the Details!") {
        setTableData(
          data.map((item, index) => ({
            key: item.calendarId,
            year: item.year,
            qaDesigneeStatus: item.qaDesigneeStatus,
            qaManagerMrStatus: item.qaManagerMrStatus,
            id: item.id,
            sno: index + 1,
            reason: item.reason,
          }))
        );
      } else {
        message.error(data);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message); 
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
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "Designee Status",
      dataIndex: "qaDesigneeStatus",
      key: "qaDesigneeStatus",
      align: "center",
    },
    {
      title: "QA Manager/MR Status",
      dataIndex: "qaManagerMrStatus",
      key: "qaManagerMrStatus",
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
            //   disabled={record.status == "SUBMIT" ? true : false}
          >
            Review
          </Button>
        </>
      ),
    },
  ];
  let columns;
  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };
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
      }, 500);
    }
  }, [printResponseData]);
  const fetchPrintValue = (value) => {
    try {
      axios
        .get(
          `${ API.prodUrl}/Precot/api/QA/Service/trainingCalendar/print?year=${yearPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.message !== "No data") {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  }; 
  const goTo = () => {
    if (year == "" || year == null) {
      message.warning("Please Select Year");
      return;
    }
    navigate("/Precot/QA/F-06", {
      state: {
        year: year,
      },
    });
  };
  const recordsPerPage = 10;
  const totalPages = Math.ceil(
    printResponseData?.[0]?.trainingSessionList?.length / recordsPerPage || 0
  );
  
  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };


  return (
    // print section
    <div>
    <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          >
            <table key={pageIndex}
              style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
              className="page"
            >
              <br />
              <thead>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="115"></td>
                </tr>
                <tr>
                  <td colSpan="15" rowspan="4 " style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br></br>
                    Unit H
                  </td>
                  <th colSpan="70" rowSpan="4" style={{ textAlign: "center" }}>
                    TRAINING CALENDAR
                  </th>
                  <td colSpan="15">Format No.:</td>
                  <td colSpan="15">PH-QAD01-F-006</td>
                </tr>
                <tr>
                  <td colSpan="15">Revision No.:</td>
                  <td colSpan="15">01</td>
                </tr>
                <td colSpan="15">Ref. SOP No.:</td>
                <td colSpan="15">PH-QAD01-D-15</td>
                <tr>
                  <td colSpan="15">Page No.:</td>
                  <td colSpan="15" >{pageIndex + 1} of {totalPages}</td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="115"></td>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr>
                  <th colSpan="6" rowSpan="3" style={{ textAlign: "center" }}>
                    S. No.
                  </th>
                  <th colSpan="25" rowSpan="3" style={{ textAlign: "center" }}>
                    Training Topics
                  </th>
                  <td colSpan="42">
                    <b>Months for the Year:{printResponseData?.[0]?.year}</b>
                  </td>
                  <td colSpan="42">
                    <b>Updated on Date:</b>
                    {formattedDateWithTime(printResponseData?.[0]?.updatedAt)}
                  </td>
                </tr>

                <tr>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Jan.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Feb.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Mar.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Apr.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    May.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Jun.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Jul.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Aug.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Sept.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Oct.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Nov.
                  </th>
                  <th colSpan="7" style={{ textAlign: "center" }}>
                    Dec.
                  </th>
                </tr>
                <tr>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Plan
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Act.
                  </th>
                </tr>
                {paginateData(printResponseData[0].trainingSessionList, pageIndex + 1).map(
                  (row, index) => (
                    <tr key={index}>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        {index + 1 + pageIndex * recordsPerPage}
                      </td>
                      <td colSpan="25" style={{ textAlign: "center" }}>
                        {row.trainingTopic}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.januaryPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.januaryActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.februaryPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.februaryActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.marchPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.marchActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.aprilPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.aprilActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.mayPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.mayActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.junePlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.juneActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.julyPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.julyActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.augustPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.augustActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.septemberPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.septemberActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.octoberPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.octoberActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.novemberPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.novemberActual}
                      </td>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {row.decemberPlan}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {row.decemberActual}
                      </td>
                    </tr>
                  )
                )}
                  {pageIndex + 1 === totalPages && (
                  <>
                <tr>
                  <th colSpan="55">
                    Note : This annual plan can be updated as and when required
                    considering the need and demand by user dept.{" "}
                  </th>
                  <td colSpan="30" rowSpan="2">
                    <div style={{ textAlign: "center" }}>
                      <b>Prepared by:</b>{" "}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Designee Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {printResponseData?.[0]?.qaDesigneeSign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDateWithTime(
                        printResponseData?.[0]?.qaDesigneeSubmitOn
                      )}
                    </div>
                  </td>
                  <td colSpan="30" rowSpan="2">
                    <div style={{ textAlign: "center" }}>
                      <b>Approved by: </b>{" "}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="MR/QA Manager Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {printResponseData?.[0]?.qaManagerMrSign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDateWithTime(
                        printResponseData?.[0]?.qaManagerMrSubmitOn
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th colSpan="55">
                    Legends : Two digits number indicates date of particular month;
                    Letter 'P' indicates Plan; Letter 'C' indicates Completed.
                  </th>
                </tr>
                </>
                )}
              </tbody>
              <br />
              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="115"></td>
                </tr>
                <tr>
                  <th colSpan="25">Particulars</th>
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
          formName="TRAINING CALENDAR"
          formatNo="PH-QAD01-F-006"
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
            onClick={printSubmit}
            disabled={!yearPrint}
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

export default QA_f06_Summary;
