/* eslint-disable no-restricted-globals */
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Modal,
  Select,
  Table,
  Tooltip,
  message,
} from "antd";
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
import PrecotSidebar from "../Components/PrecotSidebar.js";
import {
  getDepartmentName,
  getFinancialYearByYear,
  handleKeyDown,
  printDateFormat,
  slashFormatDate,
  splitDateAndTime,
} from "../util/util.js";

const QA_F020_Summary = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const navigateForward = "/Precot/QA/QA_F020";
  const formName =
    "Non Conformity Report (For Machine Process/ WIP/ Finished Products)";
  const formatNo = "PH-QAD01-F-020";
  const [open, setOpen] = useState(false);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [selectedNc, setSelectedNc] = useState();
  const [createLoading, setCreateLoading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [summaryParams, setSummaryParams] = useState({
    date: "",
    department: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    ncrNo: "",
  });
  const [isReasonColumn, setIsReasonColumn] = useState(false);
  const [eSign, setESign] = useState({
    qaInspectorA: "",
    productionSupervisorA: "",
    productionSupervisorBCD: "",
    productionSupervisorSign: "",
    qaInspectorSign: "",
    productionHeadSign: "",
    qaManagerSign: "",
    qaInspectorE: "",
  });

  const [printData, setPrintData] = useState({
    tabName: "",
    tabStatus: "",
    action: "",
    format_name: "NON –CONFORMITY REPORT",
    format_no: "PH-QAD01-F-020",
    revision_no: 2,
    sop_number: "PH-QAD01-D-20",
    unit: "H",
    ncrNumber: "",
    bmrNumber: "",
    product: "",
    department: "",
    machineName: "",
    date: "",
    time: "",
    batchNo: "",
    financialYear: "",
    year: "",
    month: "",
    nonConfirmityNature: "",
    classificationMinor: "",
    classificationMajor: "",
    classificationCritical: "",
    category: "",
    quantityhold: "",
    qaInspectorA: "",
    qaInspectorIdA: "",
    qaInspectorDateA: "",
    productionSupervisorA: "",
    productionSupervisorIdA: "",
    productionSupervisorDateA: "",
    tabStatusA: "",
    correctionTaken: "",
    rootCause: "",
    why1: "",
    why2: "",
    why3: "",
    why4: "",
    why5: "",
    capa: "",
    capaDate: "",
    productionSupervisorBCD: "",
    productionSupervisorIdBCD: "",
    productionSupervisorDateBCD: "",
    qaInspectorBCD: "",
    qaInspectorIdBCD: "",
    qaInspectorDateBCD: "",
    tabStatusBCD: "",
    verificationCorrection: "",
    dateTabE: "",
    reprocess: "",
    diverted: "",
    acceptedDeviation: "",
    rejected: "",
    qtyAccepted: "",
    qtyRejected: "",
    dispositionDateTime: "",
    qaInspectorE: "",
    qaInspectorIdE: "",
    qaInspectorDateE: "",
    tabStatusE: "",
    productionSupervisorSubmittedBy: "",
    qaInspectorSubmittedBy: "",
    productionHeadSubmittedBy: "",
    qaManagerSubmittedBy: "",
    productionSupervisorSign: "",
    qaInspectorSign: "",
    productionHeadSign: "",
    qaManagerSign: "",
    productionSupervisorStatus: "",
    qaInspectorStatus: "",
    productionHeadStatus: "",
    qaManagerStatus: "",
    productionSupervisorSubmittedDate: "",
    qaInspectorSubmittedDate: "",
    productionHeadSubmittedDate: "",
    qaManagerSubmittedDate: "",
    productionSupervisorSubmittedId: "",
    qaInspectorSubmittedId: "",
    productionHeadSubmittedId: "",
    qaManagerSubmittedId: "",
    status: "CLOSED",
    reason: null,
  });
  const [ncrList, setNcrList] = useState([]);
  const [printNcrList, setPrintNcrList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "qaInspectorA",
      "productionSupervisorA",
      "productionSupervisorBCD",
      "productionSupervisorSign",
      "qaInspectorSign",
      "productionHeadSign",
      "qaManagerSign",
      "qaInspectorE",
    ];
    signatureKeys.forEach((key) => {
      if (printData) {
        const username = printData[key];

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
              setESign((prevSign) => ({
                ...prevSign,
                [key]: url,
              }));
            })
            .catch((err) => {});
        }
      }
    });
  }, [printData, printData && printData.pci_sign]);

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

  const handleSelectChange = (name, e) => {
    handleKeyDown(e);

    if (e.key == "Enter") {
      setSelectedNc(e.target.value);
    }
  };

  const handleGo = () => {
    console.log("selectedNc", selectedNc);
    if (!selectedNc) {
      message.warning("Please select Nc before proceeding");
      return;
    } else {
      navigate(navigateForward, {
        state: {
          ncrNo: selectedNc,
        },
      });
    }
  };

  const handleCreateModalOpen = () => {
    setIsModalCreate(true);
  };

  const handleCreate = () => {
    setCreateLoading(true);

    if (!summaryParams.date) {
      message.warning("Date is mandatory!");
      setCreateLoading(false);
      return;
    }
    if (!summaryParams.department) {
      message.warning("Department is mandatory!");
      setCreateLoading(false);
      return;
    }

    const { date, time } = splitDateAndTime(summaryParams.date);
    navigate(navigateForward, {
      state: {
        date: date,
        time: time,
        department: summaryParams.department,
        ncrNo: "",
      },
    });
    setCreateLoading(false);
  };

  const handleChange = (value, key) => {
    setSummaryParams((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handlePrintChange = (value) => {
    setPrintParams((prevFormData) => ({
      ...prevFormData,
      ncrNo: value,
    }));
  };

  const handlePrintYearChange = (date, dateString) => {
    setPrintParams((prevdata) => ({
      ...prevdata,
      year: dateString,
    }));

    const finYear = getFinancialYearByYear(dateString);

    getNcrByYear(finYear);
  };

  const handlePrint = () => {
    setPrintLoading(true);

    if (!printParams.ncrNo) {
      message.warning("Please Select NCR No!");
      setPrintLoading(false);
      return;
    }
    if (!printParams.year) {
      setPrintLoading(false);
      message.warning("Please Select Year!");
      return;
    }

    const token = localStorage.getItem("token");
    //
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/print?year=${printParams.year}&ncrNumber=${printParams.ncrNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.message === "No data") {
          message.warning(response.data.message);
          setPrintLoading(false);
          return;
        } else {
          if (response.data.length >= 0) {
            setPrintData(response.data[0]);

            setTimeout(() => {
              window.print();
              setPrintLoading(false);
            }, 2000);
          } else {
            message.warning("No data");
            setPrintLoading(false);
            return;
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {});
  };

  const [summaryData, setSummaryData] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleEdit = (record) => {
    navigate(navigateForward, {
      state: {
        date: record.date,
        department: record.department,
        time: record.time,
        ncrNo: record.ncrNumber,
      },
    });
  };

  const reasonColumn = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text, record) => {
      // Assuming qaManagerStatus is a field in the same record
      if (
        record.qaManagerStatus === "QA_MR_REJECTED" ||
        record.productionHeadStatus === "PRODUCTION_HEAD_REJECTED" ||
        record.productionSupervisorStatus ===
          "PRODUCTION_SUPERVISOR_REJECTED" ||
        record.tabStatusE === "REJECTED"
      ) {
        return text || "NA";
      }
      return "NA"; // Default value if reason is not present
    },
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "NCR No",
      dataIndex: "ncrNumber",
      key: "ncrNumber",
      align: "center",
    },

    {
      title: "BMR No",
      dataIndex: "bmrNumber",
      key: "bmrNumber",
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
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },

    {
      title: "Level 1 QA Inspector/ QC Chemist",
      dataIndex: "tabStatusA",
      key: "tabStatusA",
      align: "center",
      render: (text) => text || "NA",
    },
    {
      title: "Level 2 Production supervisor",
      dataIndex: "tabStatusBCD",
      key: "tabStatusBCD",
      align: "center",
      render: (text) => text || "NA",
    },

    {
      title: "Level 3 QA Inspector/ QC Chemist",
      dataIndex: "tabStatusE",
      key: "tabStatusE",
      align: "center",
      render: (text) => text || "NA",
    },

    {
      title: "Level 4 Production supervisor",
      dataIndex: "productionSupervisorStatus",
      key: "productionSupervisorStatus",
      align: "center",
      render: (text) => text || "NA",
    },

    {
      title: "Level 5 Production Head",
      dataIndex: "productionHeadStatus",
      key: "productionHeadStatus",
      align: "center",
      render: (text) => text || "NA",
    },

    {
      title: "QA Manager",
      dataIndex: "qaManagerStatus",
      key: "qaManagerStatus",
      align: "center",
      render: (text) => text || "NA",
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

  const getNcrByYear = (finYear) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/ncrNumberPrintLov?financialYear=${finYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        }
      )
      .then((response) => {
        if (!response.data.length > 0) {
          message.warning("no NCR available for this Year");
          return;
        }

        setPrintNcrList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle any errors
      });
  };

  useEffect(() => {
    const fetchData = () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const departmentId = localStorage.getItem("departmentId");
      const departName = getDepartmentName(departmentId);

      let resoureUrl = "/Precot/api/QA/Service/NonConformityReport/summary";
      if (role === "ROLE_SUPERVISOR" || role === "ROLE_HOD") {
        resoureUrl = `/Precot/api/QA/Service/NonConformityReport/summary?department=${departName}`;
      }

      axios
        .get(API.prodUrl + resoureUrl, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        })
        .then((response) => {
          setSummaryData(response.data);

          const hasReason = response.data.some(
            (item) => item.reason !== null && item.reason !== "NA"
          );

          setIsReasonColumn(hasReason);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        });
    };

    const fetchNCRLOV = () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/NcrLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
            },
          }
        )
        .then((response) => {
          setNcrList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        });
    };
    fetchData();
    fetchNCRLOV();
  }, []);

  const handleCreateModalClose = () => {
    setIsModalCreate(false);
    setCreateLoading(false);
    setSummaryParams({
      date: "",
      department: "",
    });
  };

  const handlePrintModalClose = () => {
    setIsModalPrint(false);
    setPrintLoading(false);
    setPrintNcrList([]);
    setPrintParams({
      year: "",
      ncrNo: "",
    });
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
        <label>Select NCR No: </label>
        <Select
          placeholder="Select NCR No"
          style={{
            width: 200,
            margin: 5,
          }}
          options={ncrList}
          onChange={(value) => {
            console.log("value", value);
            setSelectedNc(value);
          }}
          value={selectedNc}
          showSearch
        />
        <Button style={{ margin: "5px" }} onClick={handleGo}>
          GO
        </Button>
        {(role === "ROLE_QA" || role === "ROLE_CHEMIST") && (
          <Button style={{ margin: "5px" }} onClick={handleCreateModalOpen}>
            Create
          </Button>
        )}
      </div>

      <Modal
        title="Non Conformity Report (For Machine Process/ WIP/ Finished Products)"
        open={isModalCreate}
        width={380}
        destroyOnClose={true}
        onOk={() => setIsModalCreate(false)}
        onCancel={handleCreateModalClose}
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
            onClick={handleCreate}
            loading={createLoading}
          >
            Create
          </Button>,
        ]}
      >
        <div>
          <label style={{ padding: "0.5rem" }}>Select Department:</label>
          <Select
            onChange={(value) => handleChange(value, "department")}
            value={summaryParams.value}
            placeholder="Select department"
            style={{ margin: "0.5rem" }}
          >
            <Select.Option value="BLEACHING">BLEACHING</Select.Option>
            <Select.Option value="SPUNLACE">SPUNLACE</Select.Option>
            <Select.Option value="DRY_GOODS">DRY GOODS</Select.Option>
            <Select.Option value="PAD_PUNCHING">PAD PUNCHING</Select.Option>
          </Select>
        </div>
        <div>
          <label style={{ padding: "0.5rem" }}>Select Date:</label>
          <input
            type="datetime-local"
            onChange={(e) => handleChange(e.target.value, "date")}
            value={summaryParams.date}
            style={{ margin: "0.5rem" }}
            max={new Date().toISOString().slice(0, 16)}
          />
        </div>
      </Modal>

      <Modal
        title="Non Conformity Report (For Machine Process/ WIP/ Finished Products) (Print)"
        open={isModalPrint}
        width={380}
        destroyOnClose={true}
        onOk={() => setIsModalPrint(false)}
        onCancel={handlePrintModalClose}
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
          <label>Select Year: </label>
          <DatePicker picker="year" onChange={handlePrintYearChange} />
        </div>
        <div>
          <label>Select NCR No:</label>
          <Select
            placeholder="Select NCR No"
            style={{
              width: 200,
              margin: 5,
            }}
            options={printNcrList}
            onChange={handlePrintChange}
            value={!printParams.ncrNo ? null : printParams.ncrNo}
            showSearch
          />
        </div>
      </Modal>

      <div style={{ margin: "8px" }}>
        <Table
          style={{ textAlign: "center" }}
          columns={finalColumns}
          dataSource={summaryData}
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

        <table>
          <thead>
            <tr>
              <td style={{ padding: "1rem", border: "none" }}></td>
            </tr>
            <tr>
              <th rowSpan={4} style={{ textAlign: "center", height: "80px" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "50px", height: "auto" }}
                />{" "}
                <br></br>
                Unit H
              </th>
              <th style={{ textAlign: "center" }} rowSpan={4} colSpan={3}>
                {formName}
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
              <th style={{ textAlign: "center" }}>PH-QAD01-D-20</th>
            </tr>
            <tr>
              <th>Page NO:</th>
              <th style={{ textAlign: "center" }}>1 of 2</th>
            </tr>
            <tr>
              <td style={{ padding: "1rem", border: "none" }}></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.5rem" }}>
                <span>NCR No.:</span>
              </td>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                {printData.ncrNumber}
              </td>
              <td style={{ padding: "0.5rem" }}>
                <span>BMR No.:</span>
              </td>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                {printData.bmrNumber}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem" }}>
                <span>Product:</span>
              </td>
              <td style={{ padding: "0.5rem" }} colSpan={2}>
                {printData.product}
              </td>
              <td style={{ padding: "0.5rem" }}>Date & Time</td>
              <td style={{ padding: "0.5rem" }} colSpan={2}>
                <span style={{ marginRight: "3px" }}>
                  {slashFormatDate(printData.date)}
                </span>
                <span style={{ marginRight: "3px" }}>{printData.time}</span>
              </td>
            </tr>

            <tr>
              <td style={{ padding: "0.5rem" }}>Department/ Process</td>
              <td style={{ padding: "0.5rem" }}>{printData.department}</td>
              <td style={{ padding: "0.5rem" }}>Machine No.:</td>
              <td style={{ padding: "0.5rem" }}>{printData.machineName}</td>
              <td style={{ padding: "0.5rem" }}>FG No. /Batch No.:</td>
              <td style={{ padding: "0.5rem" }}>{printData.batchNo}</td>
            </tr>

            <tr>
              <td
                style={{ padding: "0.5rem", verticalAlign: "top" }}
                colSpan={4}
              >
                A. Nature of non-conformity(in detaill):
                {printData.nonConfirmityNature}
              </td>
              <td style={{ padding: "0.5rem" }} colSpan={2}>
                <div style={{ marginBottom: "10px" }}>Classification:</div>

                <div style={{ marginBottom: "10px" }}>
                  1. Minor [
                  {printData.classificationMinor === "Yes" ? "✓" : "✕"}]
                </div>
                <div style={{ marginBottom: "10px" }}>
                  2. Major [
                  {printData.classificationMajor === "Yes" ? "✓" : "✕"}]
                </div>
                <div>
                  3. Critical [
                  {printData.classificationCritical === "Yes" ? "✓" : "✕"}]
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem" }}>
                Quantity on Hold: {printData.quantityhold}
              </td>
              <td
                style={{ padding: "0.5rem", textAlign: "center" }}
                colSpan={2}
              >
                QA/QC(sign):
                <div style={{ marginTop: "0.3rem" }}>
                  <b> {printData.qaInspectorA}</b>
                </div>
                <div>
                  <b>{printDateFormat(printData.qaInspectorDateA)}</b>
                </div>
                <div>
                  {eSign.qaInspectorA ? (
                    <img
                      src={eSign.qaInspectorA}
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
              <td
                style={{ padding: "0.5rem", textAlign: "center" }}
                colSpan={3}
              >
                Production Supervisor(sign):
                <div style={{ marginTop: "0.3rem" }}>
                  <b> {printData.productionSupervisorA}</b>
                </div>
                <div>
                  <b>{printDateFormat(printData.productionSupervisorDateA)}</b>
                </div>
                <div>
                  {eSign.productionSupervisorA ? (
                    <img
                      src={eSign.productionSupervisorA}
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
                style={{ padding: "0.5rem", verticalAlign: "top" }}
                rowSpan={5}
                colSpan={5}
              >
                B. Correction Taken:{printData.correctionTaken}
              </td>
              <td style={{ padding: "0.5rem" }}>
                <div style={{ marginBottom: "10px" }}>Disposition:</div>
                <div style={{ marginBottom: "10px" }}>
                  To be Reprocess / Rework [
                  {printData.reprocess === "Yes" ? "✓" : "✕"}]
                </div>
                <div style={{ marginBottom: "10px" }}>
                  To be diverted [{printData.diverted === "Yes" ? "✓" : "✕"}]
                </div>
                <div style={{ marginBottom: "10px" }}>
                  Accepted under Deviation [
                  {printData.acceptedDeviation === "Yes" ? "✓" : "✕"}]
                </div>
                <div>Rejected [{printData.rejected === "Yes" ? "✓" : "✕"}]</div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem" }}>
                Qty. Accepted: {printData.qtyAccepted}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem" }}>
                Qty. Rejected : {printData.qtyRejected}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem" }}>
                Date & Time : {printData.dispositionDateTime}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem" }}>
                Produciton Supervisor:
                <div style={{ marginTop: "0.3rem" }}>
                  <b> {printData.productionSupervisorBCD}</b>
                </div>
                <div>
                  <b>
                    {printDateFormat(printData.productionSupervisorDateBCD)}
                  </b>
                </div>
                <div>
                  {eSign.productionSupervisorBCD ? (
                    <img
                      src={eSign.productionSupervisorBCD}
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
          </tbody>
          <tfoot>
            <tr>
              <td style={{ padding: "10px", border: "none" }}></td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                Particualrs
              </td>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                Prepared By
              </td>
              <td style={{ padding: "0.5rem" }}>Reviewed by</td>
              <td style={{ padding: "0.5rem" }}>Approved by</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                Name
              </td>
              <td colSpan={2} style={{ padding: "0.5rem" }}></td>
              <td style={{ padding: "0.5rem" }}></td>
              <td style={{ padding: "0.5rem" }}></td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                Signature & Date
              </td>
              <td colSpan={2} style={{ padding: "0.5rem" }}></td>
              <td style={{ padding: "0.5rem" }}></td>
              <td style={{ padding: "0.5rem" }}></td>
            </tr>
          </tfoot>
        </table>
        <tr>
          <td style={{ padding: "1rem", border: "none" }}></td>
        </tr>
        <table>
          <thead>
            <tr>
              <td style={{ padding: "1rem", border: "none" }}></td>
            </tr>
            <tr>
              <th rowSpan={4} style={{ textAlign: "center", height: "80px" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "50px", height: "auto" }}
                />{" "}
                <br></br>
                Unit H
              </th>
              <th style={{ textAlign: "center" }} rowSpan={4} colSpan={3}>
                {formName}
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
              <th style={{ textAlign: "center" }}>PH-QAD01-D-20</th>
            </tr>
            <tr>
              <th>Page NO:</th>
              <th style={{ textAlign: "center" }}> 2 of 2</th>
            </tr>
            <tr>
              <td style={{ padding: "1rem", border: "none" }}></td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ pageBreakBefore: "always" }}>
              <td colSpan={6}>
                <div style={{ margin: "10px" }}>C. Root Cause:</div>
                <div style={{ margin: "10px" }}>Why1: {printData.why1}</div>
                <div style={{ margin: "10px" }}>Why2: {printData.why2}</div>
                <div style={{ margin: "10px" }}>Why3: {printData.why3}</div>
                <div style={{ margin: "10px" }}>Why4: {printData.why4}</div>
                <div style={{ margin: "10px" }}>Why5: {printData.why5}</div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "none" }}></td>
            </tr>

            <tr>
              <td colSpan={6} style={{ padding: "0.5rem" }}>
                D. Corrective Action & Preventive Action:{" "}
                {printData.correctionTaken}
              </td>
            </tr>

            <tr>
              <td colSpan={6} style={{ padding: "0.5rem" }}>
                <div>
                  E. Verification of Correction / Corrective Action(s) Taken:{" "}
                  {printData.correctionTaken}
                </div>
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <div>
                    Digital Sign & Date:
                    <div style={{ marginTop: "0.3rem" }}>
                      <b> {printData.qaInspectorE}</b>
                    </div>
                    <div>
                      <b>{printDateFormat(printData.qaInspectorDateE)}</b>
                    </div>
                    <div>
                      {eSign.qaInspectorE ? (
                        <img
                          src={eSign.qaInspectorE}
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
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem" }} colSpan={2}>
                Date: {slashFormatDate(printData.dateTabE)}
              </td>
              <td
                style={{ padding: "0.5rem", textAlign: "center" }}
                colSpan={2}
              >
                Production (sign):
                <div style={{ marginTop: "0.3rem" }}>
                  <b> {printData.productionSupervisorSign}</b>
                </div>
                <div>
                  <b>
                    {printDateFormat(
                      printData.productionSupervisorSubmittedDate
                    )}
                  </b>
                </div>
                <div>
                  {eSign.productionSupervisorSign ? (
                    <img
                      src={eSign.productionSupervisorSign}
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
              <td
                style={{ padding: "0.5rem", textAlign: "center" }}
                colSpan={2}
              >
                QA / QC (sign):
                <div style={{ marginTop: "0.3rem" }}>
                  <b> {printData.qaInspectorSign}</b>
                </div>
                <div>
                  <b>{printDateFormat(printData.qaInspectorSubmittedDate)}</b>
                </div>
                <div>
                  {eSign.qaInspectorSign ? (
                    <img
                      src={eSign.qaInspectorSign}
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
                style={{ padding: "0.5rem", textAlign: "center" }}
                colSpan={4}
              >
                Production Head:
                <div style={{ marginTop: "0.3rem" }}>
                  <b> {printData.productionHeadSign}</b>
                </div>
                <div>
                  <b>
                    {printDateFormat(printData.productionHeadSubmittedDate)}
                  </b>
                </div>
                <div>
                  {eSign.productionHeadSign ? (
                    <img
                      src={eSign.productionHeadSign}
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
              <td style={{ padding: "0.5rem" }} colSpan={2}>
                QA / QC Head:
                <div style={{ marginTop: "0.3rem" }}>
                  <b> {printData.qaManagerSign}</b>
                </div>
                <div>
                  <b>{printDateFormat(printData.qaManagerSubmittedDate)}</b>
                </div>
                <div>
                  {eSign.qaManagerSign ? (
                    <img
                      src={eSign.qaManagerSign}
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
              <td style={{ padding: "1rem", border: "none" }}></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td style={{ padding: "10px", border: "none" }}></td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                Particualrs
              </td>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                Prepared By
              </td>
              <td style={{ padding: "0.5rem" }}>Reviewed by</td>
              <td style={{ padding: "0.5rem" }}>Approved by</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                Name
              </td>
              <td colSpan={2} style={{ padding: "0.5rem" }}></td>
              <td style={{ padding: "0.5rem" }}></td>
              <td style={{ padding: "0.5rem" }}></td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                Signature & Date
              </td>
              <td colSpan={2} style={{ padding: "0.5rem" }}></td>
              <td style={{ padding: "0.5rem" }}></td>
              <td style={{ padding: "0.5rem" }}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default QA_F020_Summary;
