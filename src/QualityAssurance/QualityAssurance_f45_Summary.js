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

const QualityAssurance_f43_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [printParams, setPrintParams] = useState({
    month: "",
    year: "",
    deptName: "",
    date: "",
  });
  const [formParams, setFormParams] = useState({
    deptName: "",
    date: "",
  });
  const [printLov, setPrintLov] = useState({
    monthLov: [],
    yearLov: [],
  });

  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
  const [eSign, setESign] = useState({});
  const deptId = localStorage.getItem("departmentId");

  const role = localStorage.getItem("role");

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
    const token = localStorage.getItem("token");
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
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
            `${ API.prodUrl}/Precot/api/QA/Service/api/getBmrIssueRegisterSummary`,
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
        if (data.supervisor_status == "PRODUCTION_SUPERVISOR_REJECTED") {
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
      title: "Department",
      dataIndex: "departmentName",
      key: "departmentName",
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
      title: "QA Inspector Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      align: "center",
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }
  const formatDate = (dateString) => {
    if (!dateString) return "";
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
    navigate(`/Precot/QualityAssurance/F-045`, {
      state: {
        date: record.date,
        department: record.departmentName,
      },
    });
  };

  const handleGo = () => {
    if (role == "ROLE_QA" && formParams.deptName == "") {
      message.warning("Please Select Department Name");
      return;
    }
    if (formParams.date == "") {
      message.warning("Please Select The Date");
      return;
    }

    let departmentName = getDepartmentName(deptId);

    navigate(`/Precot/QualityAssurance/F-045`, {
      state: {
        date: formParams.date,
        department:
          role == "ROLE_SUPERVISOR" ? departmentName : formParams.deptName,
      },
    });
  };

  const handlePrint = async () => {
    if (
      printParams.date == "" &&
      printParams.deptName == "" &&
      printParams.year == "" &&
      printParams.month == ""
    ) {
      message.warning("Please Select Atleast One Field");
      return;
    }
    if (printParams.month !== "" && printParams.year == "") {
      message.warning("Please Select The Year");
      return;
    }

    setPrintButtonLoading(true);

    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/QA/Service/api/getBmrIssueRegisterPrint?date=${printParams.date}&month=${printParams.month}&year=${printParams.year}&department=${printParams.deptName}`,
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
      //------------------ Digital Sign Part ---------------------------
      const uniqueSigns = new Set();

      const fetchSignatures = async () => {
        for (const entry of response.data) {
          const { qa_inspector_sign, supervisor_sign } = entry;
          if (qa_inspector_sign && !uniqueSigns.has(qa_inspector_sign)) {
            uniqueSigns.add(qa_inspector_sign);
            fetchSignature(qa_inspector_sign, qa_inspector_sign);
          }
          if (supervisor_sign && !uniqueSigns.has(supervisor_sign)) {
            uniqueSigns.add(supervisor_sign);
            fetchSignature(supervisor_sign, supervisor_sign);
          }
        }
      };

      await fetchSignatures();
      // ----------------------------------------------------

      const data = response.data;
      const responseData = data.flatMap((entry) =>
        entry.details.map((detail) => ({
          ...detail,
          qa_inspector_submit_on: entry.qa_inspector_submit_on,
          qa_inspector_sign: entry.qa_inspector_sign,
          supervisor_submit_on: entry.supervisor_submit_on,
          supervisor_sign: entry.supervisor_sign,
        }))
      );

      
      setPrintData(responseData);
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
      }, [5000]);
    }
  }, [printData]);

  useEffect(() => {
    if (role == "ROLE_SUPERVISOR") {
      setPrintParams((prevState) => ({
        ...prevState,
        deptName: getDepartmentName(deptId),
      }));
    }
  }, [isModalPrint]);

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
  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    if (name == "year" || name == "month") {
      setPrintParams((prevState) => ({
        ...prevState,
        date: "",
      }));
    }

    if (name == "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        month: "",
        year: "",
      }));
    }
  };
  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      month: "",
      year: "",
      deptName: "",
      date: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const deptLov = [
    { value: "Bleaching", label: "Bleaching" },
    { value: "Spunlace", label: "Spunlace" },
    { value: "Pad Punching", label: "Pad Punching" },
    { value: "Dry Goods", label: "Dry Goods" },
    // {value:'Quality Control',label:'Quality Control'},
    { value: "Cotton Buds", label: "Cotton Buds" },
  ];

  const getDepartmentName = (id) => {
    switch (Number(deptId)) {
      case 1:
        return "Bleaching";
        break;
      case 2:
        return "Spunlace";
        break;
      case 3:
        return "Pad Punching";
        break;
      case 4:
        return "Dry Goods";
        break;
      // case 5 :
      // return 'Quality Control'
      // break;
      case 12:
        return "Cotton Buds";
        break;
    }
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

  const entriesPerPage = 7;
  const bmrReport = [];
  let numberOfPages = Math.ceil(printData.length / entriesPerPage);

  if (printData || printData.length > 0) {
    for (let i = 0; i < printData.length; i += entriesPerPage) {
      bmrReport.push(printData.slice(i, i + entriesPerPage));
    }
  }

  useEffect(() => {
    
  }, [printData]);
  return (
    <>
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
      #section-to-print-san table th,
  #section-to-print-san table td {
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
        {bmrReport.map((bodyContent, pageIndex) => (
          <div className="page-break">
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <tr>
                <td
                  style={{
                    border: "none",
                    padding: pageIndex > 0 ? "40px" : "10px",
                  }}
                ></td>
              </tr>

              <tr>
                <td rowSpan={4}>
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
                  rowSpan={4}
                >
                  BMR - Issue Register
                </td>
                <td style={{ padding: "0.5em" }}>Format No.:</td>
                <td style={{ padding: "0.5em" }}>PH-QAD01-F-045</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Revision No.:</td>
                <td style={{ padding: "0.5em" }}>01</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                <td style={{ padding: "0.5em" }}>PH-QAD01-D-43</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Page No.:</td>
                <td style={{ padding: "0.5em" }}>
                  {pageIndex + 1} of {numberOfPages}
                </td>
              </tr>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
            </table>
            <table>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S. No.</td>
                <td style={{ textAlign: "center", padding: "10px" }}>Date</td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Department Name
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  No. of BMR
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Issued by{" "}
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Received by
                </td>
              </tr>
              {bodyContent.map((row, index) => (
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {pageIndex == 0 ? index + 1 : index + 1 + pageIndex * 7}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {formatDate(row.date)}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {row.departmentName}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {row.noOfBmr}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "bottom" }}>
                    {" "}
                    {eSign[row.qa_inspector_sign] ? (
                      <img
                        src={eSign[row.qa_inspector_sign]}
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
                    {row.qa_inspector_sign}
                    <br />
                    {formatDateAndTime(row.qa_inspector_submit_on)}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "bottom" }}>
                    {eSign[row.supervisor_sign] ? (
                      <img
                        src={eSign[row.supervisor_sign]}
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
                    {row.supervisor_sign} <br />
                    {formatDateAndTime(row.supervisor_submit_on)}
                  </td>
                </tr>
              ))}
            </table>

            <table>
              <thead>
                <tr>
                  <td style={{ border: "none", padding: "15px" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Particulars</td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Prepared By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Reviewed By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Approved By
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "1em" }}>Name</td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Signature & Date</td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <BleachingHeader
        formName={"BMR - Issue Register"}
        formatNo={"PH-QAD01-F-045"}
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
        title="BMR - Issue Register (Print)"
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
        <span style={{ marginRight: "50px", marginLeft: "2px" }}> Year : </span>
        <Select
          options={printLov.yearLov}
          value={printParams.year}
          style={{ textAlign: "center", width: "150px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "year");
          }}
          disabled={printParams.date !== ""}
        ></Select>

        <br></br>
        <br />
        <span style={{ marginRight: "40px", marginLeft: "2px" }}>
          {" "}
          Month :{" "}
        </span>
        <Select
          options={printLov.monthLov}
          value={printParams.month}
          style={{ textAlign: "center", width: "150px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "month");
          }}
          disabled={printParams.date !== ""}
        ></Select>
        <br />
        <br />
        {role == "ROLE_QA" && (
          <>
            <span style={{ marginRight: "10px", marginLeft: "2px" }}>
              {" "}
              Department :{" "}
            </span>
            <Select
              value={printParams.deptName}
              options={deptLov}
              onChange={(e) => {
                handlePrintParams(e, "deptName");
              }}
              style={{ textAlign: "center", width: "150px" }}
              dropdownStyle={{ textAlign: "center" }}
            ></Select>
            <br />
            <br />
          </>
        )}
        <span style={{ marginRight: "50px", marginLeft: "2px" }}> Date : </span>
        <Input
          type="date"
          max={today}
          value={printParams.date}
          style={{ width: "150px", textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e.target.value, "date");
          }}
          readOnly={printParams.month !== "" || printParams.year !== ""}
        ></Input>
      </Modal>
      <div style={{ margin: "10px" }}>
        {role == "ROLE_QA" && (
          <>
            <label>Department Name : </label>
            <Select
              value={formParams.deptName}
              options={deptLov}
              onChange={(e) => {
                handleFormParams(e, "deptName");
              }}
              style={{ textAlign: "center", width: "150px" }}
              dropdownStyle={{ textAlign: "center" }}
            ></Select>
          </>
        )}
        <label style={{ marginLeft: "2px" }}>Date : </label>
        <Input
          type="date"
          value={formParams.date}
          style={{ textAlign: "center", width: "150px" }}
          onChange={(e) => {
            handleFormParams(e.target.value, "date");
          }}
          max={today}
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
