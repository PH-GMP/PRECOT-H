/* eslint-disable no-restricted-globals */
import { Button, Modal, Tooltip, message } from "antd";
import React from "react";
import BleachingHeader from "../Components/BleachingHeader.js";

import { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
// import Table from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Select, Table } from "antd";
import axios from "axios";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import {
  convertDate,
  getYear,
  getYears,
  handleKeyDown,
  printDateFormat,
  slashFormatDate,
} from "../util/util.js";

const QA_F013_Summary = () => {
  const navigate = useNavigate();
  const navigateForward = "/Precot/QA/QA_F013";
  const formName = "INTERNAL AUDIT NC REPORT";
  const formatNo = "PH-QAD01-F-013";
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const pageSize = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [printYear, setPrintYear] = useState();
  const [printIar, setPrintIar] = useState();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const departmentId = localStorage.getItem("departmentId");
  const [printIAROtions, setprintIAROtions] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const [isReasonColumn, setIsReasonColumn] = useState(false);

  const [eSign, setESign] = useState([
    {
      firstAuditorSign: "",
      auditeeSign: "",
      qaMrSign: "",
      secondAuditorSign: "",
    },
  ]);

  const [printData, setPrintData] = useState([
    {
      unit: "UNIT H",
      formatName: "Internal Audit NC Report",
      formatNo: "PH-QAD01-F-013",
      revisionNo: 2,
      sopNumber: "PH-QAD01-D-17",
      auditYear: "",
      iarNo: "",
      reportDate: "",
      department: "",
      ncrNo: "",
      clauseNo: "",
      natureOfNonConformity: "",
      severity: "",
      agreedCompletionDate: "",
      signatureOfAuditor: null,
      signatureOfAuditee: null,
      corrections: "",
      rootCause1: "",
      rootCause2: "",
      rootCause3: "",
      rootCause4: "",
      rootCause5: "",
      correctivePreventiveAction: "",
      verificationOfActionTaken: "",
      auditorComments: "",
      ncrClosingDate: "",
      nameOfAuditor: "",
      statusOfNC: "",
      correctiveActionFoundToBe: "",
      ncrIs: "",
      ncrClosedOnTime: "",
      reason: null,
      firstAuditorStatus: null,
      firstAuditorSaveOn: null,
      firstAuditorSaveBy: null,
      firstAuditorSaveId: null,
      firstAuditorSubmitOn: null,
      firstAuditorSubmitBy: null,
      firstAuditorSubmitId: null,
      firstAuditorSign: null,
      auditeeStatus: null,
      auditeeSaveOn: null,
      auditeeSaveBy: null,
      auditeeSaveId: null,
      auditeeSubmitOn: null,
      auditeeSubmitBy: null,
      auditeeSubmitId: null,
      auditeeSign: null,
      secondAuditorStatus: null,
      secondAuditorSaveOn: null,
      secondAuditorSaveBy: null,
      secondAuditorSaveId: null,
      secondAuditorSubmitOn: null,
      secondAuditorSubmitBy: null,
      secondAuditorSubmitId: null,
      secondAuditorSign: null,
      qaMrStatus: "QA_MR_SAVED",
      qaMrSubmitStatus: null,
      qaMrSaveOn: "",
      qaMrSaveBy: "",
      qaMrSaveId: "",
      qaMrSubmitOn: null,
      qaMrSubmitBy: null,
      qaMrSubmitId: null,
      qaMrSign: null,
    },
  ]);

  const [NCRList, setNCRList] = useState([]);

  const [IARList, setIARList] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);

  const [creationList, setCreationList] = useState({
    iar: "",
    date: "",
    department: "",
    ncr: "",
  });

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showPrintModal = () => {
    setIsModalPrint(true);
  };

  const handleGo = () => {
    if (creationList.iar === "") {
      message.warning("Please select IAR!");
      return;
    } else if (creationList.date === "") {
      message.warning("Please select Date!");
      return;
    } else if (creationList.department === "") {
      message.warning("Please select Department!");
      return;
    } else if (creationList.ncr === "") {
      message.warning("Please Enter/Select ncr!");
      return;
    }

    navigate(navigateForward, {
      state: {
        iar: creationList.iar,
        date: creationList.date,
        department: creationList.department,
        year: getYear(creationList.date),
        ncr: creationList.ncr,
      },
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/print`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          const uniqueIarNos = [
            ...new Set(response.data.map((item) => item.iarNo)),
          ];

          setprintIAROtions(uniqueIarNos);
        } else {
          message.warning(response.data.message);
          setPrintLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {});
  }, []);

  const handlePrint = () => {
    setPrintLoading(true);
    const token = localStorage.getItem("token");
    //
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/print?year=${printYear}&iarNo=${printIar}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPrintData(response.data);

          setTimeout(() => {
            window.print();
            setPrintLoading(false);
          }, 2000);
        } else {
          message.warning(response.data.message);
          setPrintLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {});
  };

  const [data, setData] = useState([
    {
      reportId: 1,
      auditYear: "2024",
      iarNo: "24-25/IAR 001",
      ncrNo: "24-25/NCR 001",
      department: "MR [SMR01]",
      firstAuditorStatus: null,
      secondAuditorStatus: null,
      auditeeStatus: null,
      qaMrStatus: "QA_MR_SAVED",
      qaMrSubmitStatus: null,
      reason: null,
    },
    {
      reportId: 2,
      auditYear: "2024",
      iarNo: null,
      ncrNo: "24-25/NCR 001",
      department: "PAD_PUNCHING",
      firstAuditorStatus: null,
      secondAuditorStatus: null,
      auditeeStatus: null,
      qaMrStatus: "QA_MR_SAVED",
      qaMrSubmitStatus: null,
      reason: null,
    },
  ]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/QA_F013", {
      state: {
        ncr: record.ncrNo,
        department: record.department,
        year: record.auditYear,
        iar: record.iarNo,
      },
    });
  };

  const reasonColumn = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => text || "NA",
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => {
        return (currentPage - 1) * pageSize + (index + 1);
      },
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
      render: (text) => text || "N/A",
    },

    {
      title: "IAR NO",
      dataIndex: "iarNo",
      key: "iarNo",
      align: "center",
      render: (text) => text || "N/A",
    },

    {
      title: "NCR NO",
      dataIndex: "ncrNo",
      key: "ncrNo",
      align: "center",
      render: (text) => text || "N/A",
    },

    {
      title: "Auditor status",
      dataIndex: "firstAuditorStatus",
      key: "firstAuditorStatus",
      align: "center",
      render: (text) => text || "N/A",
    },

    {
      title: "Auditee status",
      dataIndex: "auditeeStatus",
      key: "auditeeStatus",
      align: "center",
      render: (text) => text || "N/A",
    },
    {
      title: "Auditor status",
      dataIndex: "secondAuditorStatus",
      key: "secondAuditorStatus",
      align: "center",
      render: (text) => text || "N/A",
    },

    {
      title: "QA / MR Approval status",
      dataIndex: "qaMrStatus",
      key: "qaMrStatus",
      align: "center",
      render: (text) => text || "N/A",
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

  const finalColumns = isReasonColumn
    ? [...columns.slice(0, -1), reasonColumn, columns[columns.length - 1]] // Insert before the last column
    : columns;

  const handleChange = (name, value) => {
    setCreationList((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, e) => {
    handleKeyDown(e);

    if (e.key == "Enter") {
      setCreationList((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = () => {
      // Get the token from localStorage

      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/getAuditNCReportSummary`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
            },
          }
        )
        .then((response) => {
          // Log the response data
          setData(response.data); // Set the data to state

          const hasReason = response.data.some(
            (item) => item.reason !== null && item.reason !== "NA"
          );

          setIsReasonColumn(hasReason);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        });
    };

    const fetchIAR = () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/getIARFromAuditReport`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
            },
          }
        )
        .then((response) => {
          // Log the response data
          const transformedData = response.data.map((item, index) => ({
            value: item,
            id: index + 1,
          }));

          setIARList(transformedData); // Set the data to state
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        });
    };

    const getListOfDepartment = () => {
      axios
        .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        })
        .then((response) => {
          const transformedData = response.data
            // auditor cannot audit their department
            .filter((item) => departmentId != item.id)
            .map((item) => ({
              value: item.department,
              id: item.id,
            }));

          setDepartmentList(transformedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        })
        .finally(() => {});
    };

    const getNCRList = () => {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/getOpenNcrs`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
            },
          }
        )
        .then((response) => {
          const transformedData = response.data.map((item, index) => ({
            value: item,
            id: index + 1,
          }));
          setNCRList(transformedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        })
        .finally(() => {});
    };

    fetchData();
    fetchIAR();
    getListOfDepartment();
    getNCRList();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "firstAuditorSign",
      "auditeeSign",
      "secondAuditorSign",
      "qaMrSign",
    ];

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

  const handleModalClose = () => {
    setIsModalPrint(false);
    setPrintLoading(false);
    setPrintYear();
    setPrintIar();
  };

  // ncr format validation
  const handleBlur = () => {
    const pattern = /^\d{2}-\d{2}\/NCR \d{3,}$/;
    if (!pattern.test(creationList["ncr"])) {
      message.warning("Invalid format. Expected format is XX-XX/NCR XXX.");
      setCreationList((prevFormData) => ({
        ...prevFormData,
        ncrNo: "",
      }));
    }
  };

  const handlePrintDateChange = (value) => {
    setPrintYear(value);
  };

  const handlePrintIARChange = (value) => {
    setPrintIar(value);
  };

  const handlePrintScreen = () => {
    window.print();
  };

  return (
    <>
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
            // onClick={handlePrint}
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

      <div>
        {/* <input type="date" style={{ margin: '8px', padding: '5px' }} onChange={handleChange} value={selectedDate} /> */}

        <div>
          <span style={{ padding: "5px" }}>Select IAR: </span>
          <Select
            placeholder="Select IAR No"
            style={{
              width: 200,
              margin: 5,
            }}
            options={IARList}
            value={creationList.iar}
            onChange={(value) => handleChange("iar", value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChange("iar", e.target.value);
              }
            }}
            filterOption={false}
            showSearch
          />
          <span>Select Department:</span>
          <Select
            placeholder="Select Department No"
            style={{
              width: 200,
              margin: 5,
            }}
            options={departmentList}
            onChange={(value) => handleChange("department", value)}
          />
        </div>
        <div>
          <span style={{ padding: "5px" }}>select date :</span>
          <input
            type="date"
            onChange={(e) => handleChange("date", e.target.value)}
            style={{ padding: "5px" }}
            max={new Date().toISOString().split("T")[0]}
          />

          <span style={{ padding: "5px" }}>Select / Enter NCR No: </span>
          <Select
            placeholder="Select NCR No"
            style={{
              width: 200,
              margin: 5,
            }}
            options={NCRList}
            value={creationList["ncr"] == "" ? null : creationList["ncr"]}
            onChange={(value) => handleChange("ncr", value)}
            filterOption={false}
            showSearch
            {...(role === "ROLE_HOD" && {
              onBlur: handleBlur,
              onInputKeyDown: (e) => handleSelectChange("ncr", e),
              onKeyDown: (e) => handleSelectChange("ncr", e),
            })}
          />
        </div>
        <Button style={{ margin: "5px" }} onClick={handleGo}>
          GO
        </Button>
      </div>

      <Modal
        title="Internal Audit NC Report (Print)"
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
          <div style={{ margin: "20px" }}>
            <label>Select Year: </label>
            <Select
              placeholder="Years"
              options={getYears(2000)}
              value={printYear}
              onChange={handlePrintDateChange}
            ></Select>
          </div>
          <div style={{ margin: "20px" }}>
            <label>Select IAR: </label>
            <Select
              placeholder="Select IAR"
              value={printIar}
              onChange={handlePrintIARChange}
              style={{ width: "8rem" }}
            >
              {printIAROtions.map((iar, index) => (
                <Select.Option key={index} value={iar}>
                  {iar}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>

      <div style={{ margin: "8px" }}>
        <Table
          style={{ textAlign: "center" }}
          columns={finalColumns}
          dataSource={data}
          pagination={{
            pageSize: pageSize,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>

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
        {printData.map((data, index) => (
          <>
            <table style={{ width: "99%", marginTop: "" }}>
              <thead>
                <tr>
                  <td style={{ border: "none", padding: "30px" }}></td>
                </tr>
                <tr>
                  <th rowSpan={4} style={{ width: "100px" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />{" "}
                    <br></br>
                    Unit H
                  </th>
                  <th style={{ textAlign: "center", width: "50%" }} rowSpan={4}>
                    Internal Audit NC Report (Non-Confirmity Sheet)
                  </th>
                  <th style={{ width: "40px" }}>Format No:</th>
                  <th>PH-QAD01-F-013</th>
                </tr>
                <tr>
                  <th style={{ width: "40px" }}>Revision No:</th>
                  <th>02</th>
                </tr>
                <tr>
                  <th style={{ width: "40px" }}>Ref. SOP No:</th>
                  <th>PH-QAD01-D-17</th>
                </tr>
                <tr>
                  <th style={{ width: "40px" }}>Page No:</th>
                  <th>
                    {index + 1} of {printData.length}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    style={{ padding: "10px", border: "none", margin: "none" }}
                  ></td>
                </tr>

                <tr>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    Date:
                  </td>
                  <td colSpan={2} style={{ padding: "5px" }}>
                    {slashFormatDate(data.reportDate)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    Department: {data.department}
                  </td>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    NCR No: {data.ncrNo}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "5px" }}>
                    Non conformity raised against Clause No: {data.clauseNo}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "5px" }}>
                    Requirement No: {data.iarNo}
                  </td>
                </tr>
                <tr>
                  <td
                    rowSpan={4}
                    colSpan={2}
                    style={{ padding: "5px", verticalAlign: "top" }}
                  >
                    Nature of Non-confirmity:{data.natureOfNonConformity}
                  </td>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    Severity: {data.severity}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    Agreed Completion Date: {data.agreedCompletionDate}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    Signature of Auditee(s):
                    <div>{data.auditeeSign}</div>
                    <div>{printDateFormat(data.auditeeSubmitOn)}</div>
                    <div>
                      {eSign.length > 0 && eSign[index]?.auditeeSign ? (
                        <img
                          src={eSign.length > 0 && eSign[index]?.auditeeSign}
                          alt="firstAuditorSign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    Signature of Auditor(s):
                    <div>{data.firstAuditorSign}</div>
                    <div>{printDateFormat(data.firstAuditorSubmitOn)}</div>
                    <div>
                      {eSign.length > 0 && eSign[index]?.firstAuditorSign ? (
                        <img
                          src={
                            eSign.length > 0 && eSign[index]?.firstAuditorSign
                          }
                          alt="firstAuditorSign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "5px" }}>
                    Correction(s): {data.corrections}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "5px" }}>
                    <p>Root Cause:</p>
                    <p style={{ padding: "5px" }}>Why1: {data.rootCause1}</p>
                    <p style={{ padding: "5px" }}>Why2: {data.rootCause2}</p>
                    <p style={{ padding: "5px" }}>Why3: {data.rootCause3}</p>
                    <p style={{ padding: "5px" }}>Why4: {data.rootCause4}</p>
                    <p style={{ padding: "5px" }}>Why5: {data.rootCause5}</p>
                  </td>
                </tr>

                <tr>
                  <td colSpan={4} style={{ padding: "5px" }}>
                    <p style={{ padding: "5px" }}>
                      Corrective & Preventive Action(s):
                      {data.correctivePreventiveAction}
                    </p>
                    <p style={{ padding: "5px" }}>
                      Verification of Action Taken :
                      {data.verificationOfActionTaken}
                    </p>
                    <p style={{ padding: "5px" }}>
                      Auditor Comments :{data.auditorComments}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>
                    NCR Closing Date:{" "}
                    {slashFormatDate(convertDate(data.ncrClosingDate))}
                  </td>
                  <td style={{ padding: "5px" }}>
                    Name of Auditor: {data.nameOfAuditor}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    Signature(Auditor)
                    <div>{data.secondAuditorSign}</div>
                    <div>{printDateFormat(data.secondAuditorSubmitOn)}</div>
                    <div>
                      {eSign.length > 0 && eSign[index]?.secondAuditorSign ? (
                        <img
                          src={
                            eSign.length > 0 && eSign[index]?.secondAuditorSign
                          }
                          alt="firstAuditorSign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: "5px" }}>
                    <p style={{ padding: "5px" }}>
                      Final Conclusion/ Status of NC: {data.statusOfNC}
                    </p>
                    <p style={{ padding: "5px" }}>
                      Corrective Action taken is found to be:
                      {data.correctiveActionFoundToBe}
                    </p>
                    <p style={{ padding: "5px" }}>NCR is: {data.ncrIs}</p>
                    <p style={{ padding: "5px" }}>
                      NCR closed within agreed / acceptable time frame:{" "}
                      {data.ncrClosedOnTime}
                    </p>
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    Signature of QA / MR
                    <div>{data.qaMrSign}</div>
                    <div>{printDateFormat(data.qaMrSubmitOn)}</div>
                    <div>
                      {eSign.length > 0 && eSign[index]?.qaMrSign ? (
                        <img
                          src={eSign.length > 0 && eSign[index]?.qaMrSign}
                          alt="firstAuditorSign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "5px" }}>
                    Note : NC shall be closed within 30 days from the date of
                    audit, by taking necessary corrective / Preventive Actions
                    as per Procedure .
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "10px", border: "none", margin: "none" }}
                  ></td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td>Particulars</td>
                  <td style={{ width: "33%" }}>Prepared By</td>
                  <td style={{ width: "33%" }}>Reviewed By</td>
                  <td style={{ width: "33%" }}>Approved by</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Signature & Date</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
            <div className="page-break"></div>
          </>
        ))}
      </div>
    </>
  );
};

export default QA_F013_Summary;
