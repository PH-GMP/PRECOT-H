/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Select, Table, Tooltip, message, Input, Modal } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  BiBorderLeft,
  BiBorderNone,
  BiBorderRight,
  BiLock,
  BiNavigation,
} from "react-icons/bi";
import BleachingTail from "../Components/BleachingTail.js";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { GrAdd } from "react-icons/gr";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import "../index.css";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { createGlobalStyle } from "styled-components";

const QualityAssurance_f43_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
  });
  const [printLov, setPrintLov] = useState({
    monthLov: [],
    yearLov: [],
  });
  const [hodLov, setHodLov] = useState([]);
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
  const [eSign, setESign] = useState({
    qa_inspector_sign: "",
    qa_mr_sign: "",
  });
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    let years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ value: year, label: year.toString() });
    }
    const currentMonth = new Date().getMonth() + 1;
    const allMonths = [
      { value: "01", label: "JAN" },
      { value: "02", label: "FEB" },
      { value: "03", label: "MAR" },
      { value: "04", label: "APR" },
      { value: "05", label: "MAY" },
      { value: "06", label: "JUN" },
      { value: "07", label: "JUL" },
      { value: "08", label: "AUG" },
      { value: "09", label: "SEP" },
      { value: "10", label: "OCT" },
      { value: "11", label: "NOV" },
      { value: "12", label: "DEC" },
    ];

    const filteredMonthBasedOnYear = allMonths.filter(
      (month) => parseInt(month.value) <= currentMonth
    );
    const months =
      printParams.year == currentYear ? filteredMonthBasedOnYear : allMonths;
    setPrintLov((prevState) => ({
      ...prevState,
      yearLov: years,
      monthLov: months,
    }));
  }, [printParams.year]);

  useEffect(() => {
    const fetchUserDataAndImages = () => {
      hodLov.forEach((user) => {
        
        const { value } = user;
        

        axios
          .get(`${ API.prodUrl}/Precot/api/Format/Service/image?username=${value}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          })
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setESign((prevSign) => ({
              ...prevSign,
              [value]: url,
            }));
          })
          .catch((err) => {
            
          });
      });
    };
    fetchUserDataAndImages();
  }, [token, hodLov]);

  useEffect(() => {
    const hodLovApi = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/Users/Service/getListOfUsers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data
          .filter((user) => user.roles.some((role) => role.name === "ROLE_HOD"))
          .map((option) => ({
            value: option.username,
            label: option.username,
          }));
        setHodLov(options);
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    hodLovApi();
  }, [token]);

  const fetchSignature = async (sign, key) => {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/Format/Service/image?username=${sign}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const url = `data:image/jpeg;base64,${base64}`;
      setESign((prevSign) => ({
        ...prevSign,
        [key]: url,
      }));
    } catch (err) {
      
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["qa_inspector_sign", "qa_mr_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
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
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            
          });
      }
    });
  }, [token, printData]);
  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/QA/Service/api/getQualityReviewMeetingsSummary`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (data.qa_mr_status == "QA_MR_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);
  //---------------------------------------------------------------------------

  // ---------------------------- Summary Table Column -------------------------
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
      key: "date",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "QA Inspector Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      align: "center",
    },
    {
      title: "QA Manager/Designee/MR Status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
      align: "center",
    },
    {
      title: "Actions",
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
  const formatDate = (dateString) => {
    if (!dateString || dateString == "NA") return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const handleEdit = (record) => {
    navigate(`/Precot/QualityAssurance/F-043`, {
      state: {
        date: record.date,
      },
    });
  };

  const handlePrint = async () => {
    if (printParams.year == "" || printParams.year == null) {
      message.warning("Please Select The Year");
      return;
    }
    if (printParams.month == "" || printParams.month == null) {
      message.warning("Please Select The month");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/QA/Service/api/getQualityReviewMeetingsPrint?month=${printParams.month}&year=${printParams.year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message == "No data") {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      const uniqueSigns = new Set();

      const fetchSignatures = async () => {
        for (const entry of response.data) {
          const { qa_mr_sign, qa_inspector_sign } = entry;

          if (qa_inspector_sign && !uniqueSigns.has(qa_inspector_sign)) {
            uniqueSigns.add(qa_inspector_sign);
            fetchSignature(qa_inspector_sign, qa_inspector_sign);
          }
          if (qa_mr_sign && !uniqueSigns.has(qa_mr_sign)) {
            uniqueSigns.add(qa_mr_sign);
            fetchSignature(qa_mr_sign, qa_mr_sign);
          }
        }
      };

      await fetchSignatures();

      setPrintData(response.data);
    } catch (error) {
      
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (printData.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, [4000]);
    }
  }, [printData]);

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      year: "",
      month: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const handleGo = () => {
    if (formParams.date == "") {
      message.warning("Please Select The Date");
      return;
    }
    navigate(`/Precot/QualityAssurance/F-043`, {
      state: {
        date: formParams.date,
      },
    });
  };

  const handleParams = (value, key, state) => {
    if (state == "form") {
      setFormParams((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };
  const handlePrintParams = (value, name) => {
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name == "year") {
      setPrintParams((prevState) => ({
        ...prevState,
        month: "",
      }));
    }
  };
  const GlobalStyle = createGlobalStyle`
    @media print {
      @page {
        size: landscape;
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
  `;
  return (
    <>
      <div id="section-to-print">
        <GlobalStyle />
        {printData.map((data, pageIndex) => (
          <div className="page-break">
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <td style={{ border: "none", padding: "20px" }}></td>
                </tr>
                <tr>
                  <td rowSpan={4} colSpan={1}>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={logo}
                        alt="Logo"
                        style={{
                          width: "80px",
                          height: "auto",
                          textAlign: "center",
                        }}
                      />
                      <br></br>
                      <br></br>

                      <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                    </div>
                  </td>

                  <td
                    style={{
                      padding: "0.5em",
                      textAlign: "center",
                      fontWeight: "bold",
                      width: "60%",
                    }}
                    colSpan={4}
                    rowSpan={4}
                  >
                    QUALITY REVIEW MEETING
                  </td>
                  <td style={{ padding: "0.5em" }}>Format No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QAD01-F-043</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Revision No.:</td>
                  <td style={{ padding: "0.5em" }}>01</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QAD01-D-41</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Page No.:</td>
                  <td style={{ padding: "0.5em" }}></td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ width: "10%" }} colSpan={1}>
                    Venue :{" "}
                  </td>
                  <td colSpan={4}>{data.venue}</td>
                  <td style={{ width: "20%", textAlign: "center" }}>
                    Start Time
                  </td>
                  <td style={{ width: "20%" }}>{data.startTime}</td>
                </tr>
                <tr>
                  <td colSpan={1}>Date : </td>
                  <td colSpan={4}>{formatDate(data.date)}</td>
                  <td style={{ textAlign: "center" }}>End Time</td>
                  <td>{data.endTime}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    Attendance Sheet
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>S. No.</td>
                  <td style={{ textAlign: "center" }} colSpan={1}>
                    Name of Participants
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={1}>
                    Designation
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Sign
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Remark
                  </td>
                </tr>
                {data.details.map((row, index) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "center" }} colSpan={1}>
                      {row.nameOfParticipants}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={1}>
                      {row.designation}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      {" "}
                      {eSign[row.nameOfParticipants] ? (
                        <img
                          src={eSign[row.nameOfParticipants]}
                          alt="Operator eSign"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      {row.remarks}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: "10px", border: "none" }}></td>
                </tr>

                <tr>
                  <td style={{ textAlign: "center" }}>S.NO.</td>
                  <td style={{ textAlign: "center" }} colSpan={1}>
                    Discussion Points
                  </td>
                  <td style={{ textAlign: "center" }}>Description</td>
                  <td style={{ textAlign: "center" }}>Action Plan</td>
                  <td style={{ textAlign: "center" }}>Responsibility</td>
                  <td style={{ textAlign: "center" }}>Target Date</td>
                  <td style={{ textAlign: "center" }}>Status</td>
                </tr>
                {data.detail.map((row, index) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "center" }}>
                      {row.discussionPoints}
                    </td>
                    <td style={{ textAlign: "center" }}>{row.description}</td>
                    <td style={{ textAlign: "center" }}>{row.actionPlan}</td>
                    <td style={{ textAlign: "center" }}>
                      {row.responsibility}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {row.targetDate !== "NA"
                        ? formatDate(row.targetDate)
                        : "NA"}
                    </td>
                    <td style={{ textAlign: "center" }}>{row.status}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    style={{ textAlign: "center", borderBottom: "none" }}
                    colSpan={3}
                  >
                    Prepared by:{" "}
                  </td>
                  <td
                    style={{ textAlign: "center", borderBottom: "none" }}
                    colSpan={4}
                  >
                    Approved by:{" "}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", borderTop: "none" }}
                    colSpan={3}
                  >
                    {eSign[data.qa_inspector_sign] ? (
                      <img
                        src={eSign[data.qa_inspector_sign]}
                        alt="Operator eSign"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                    <br />
                    {data.qa_inspector_sign}
                    <br />
                    {formatDateAndTime(data.qa_inspector_submit_on)}
                  </td>
                  <td
                    style={{ textAlign: "center", borderTop: "none" }}
                    colSpan={4}
                  >
                    {eSign[data.qa_mr_sign] ? (
                      <img
                        src={eSign[data.qa_mr_sign]}
                        alt="Operator eSign"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                    <br />
                    {data.qa_mr_sign}
                    <br />
                    {formatDateAndTime(data.qa_mr_submit_on)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Particulars</td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Prepared By
                  </td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Reviewed By
                  </td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Name</td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Signature & Date</td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>
      <BleachingHeader
        formName={"QUALITY REVIEW MEETING"}
        formatNo={"PH-QAD01-F-043"}
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Modal
        title="QUALITY REVIEW MEETING (Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handlePrint}
            loading={printButtonLoading}
          >
            OK
          </Button>,
        ]}
      >
        <span style={{ marginRight: "10px", marginLeft: "10px" }}>
          {" "}
          Year :{" "}
        </span>
        <Select
          options={printLov.yearLov}
          value={printParams.year}
          style={{ textAlign: "center", width: "200px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "year");
          }}
        ></Select>

        <br></br>
        <br />
        <span style={{ marginRight: "10px", marginLeft: "2px" }}>
          {" "}
          Month :{" "}
        </span>
        <Select
          options={printLov.monthLov}
          value={printParams.month}
          style={{ textAlign: "center", width: "200px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "month");
          }}
        ></Select>
      </Modal>
      <div style={{ margin: "10px" }}>
        Date :
        <Input
          type="date"
          style={{ marginLeft: "5px", width: "150px", textAlign: "center" }}
          max={today}
          onChange={(e) => {
            handleParams(e.target.value, "date", "form");
          }}
        ></Input>
        <Button
          key="go"
          onClick={handleGo}
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          type="primary"
        >
          Go To
        </Button>
      </div>
      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default QualityAssurance_f43_Summary;
