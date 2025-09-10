/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Input,
  Row,
  Tabs,
  Select,
  Form,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
  TimePicker,
  Modal,
  Table,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import jwtDecode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../baseUrl.json";
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoMdPrint } from "react-icons/io";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import moment from "moment";
import logo from "../Assests/logo.png";
import { GoArrowLeft } from "react-icons/go";
import gif from "../Assests/gif.gif";
import { TbMenuDeep } from "react-icons/tb";

import { createGlobalStyle } from "styled-components";

const QualityControl_f03_Summary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("username");

  const [newDate, setNewDate] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newMonth, setNewMonth] = useState("");
  const [gotobtn, setGotobtn] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [printBtnStatus, setPrintBtnStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [reason, setReason] = useState(false);
  const [materialDoc, setMaterialDoc] = useState();
  const [printFormNo, setPrintFormNo] = useState();
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectDate, setSelectDate] = useState("");

  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState();
  const [getData, setGetData] = useState([]);
  const [printData, setPrintData] = useState([]);
  const [formNo, setFormNo] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleDateChanges = (e) => {
    setNewDate(e.target.value);
  };

  const handleYearChanges = (e) => {
    setNewYear(e.target.value);
  };
  const handleMonthChanges = (e) => {
    setNewMonth(e.target.value);
  };

  const [formatName, setFormatName] = useState("");
  const [formatNo, setFormatNo] = useState("");
  const [revisionNo, setRevisionNo] = useState("");
  const [sopNo, setSopNo] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    const { formNo } = state || {};
    console.log("format No : ", formNo);
    setFormNo(formNo);

    if (formNo === "PH-QCL01-AR-F-008") {
      setFormatName("Floor Swab Microbiological Analysis Report");
      setFormatNo("PH-QCL01-AR-F-008");
      setRevisionNo("03");
      setSopNo("PH-QCL01-D-05");
      setUnit("Unit H");
    }

    if (formNo === "PH-QCL01-AR-F-009") {
      setFormatName("Handler's Swab Microbiological Analysis Report");
      setFormatNo("PH-QCL01-AR-F-009");
      setRevisionNo("03");
      setSopNo("PH-QCL01-D-05");
      setUnit("Unit H");
    }
    if (formNo === "PH-QCL01-AR-F-010") {
      setFormatName("Machine Swab Microbiological Analysis Report");
      setFormatNo("PH-QCL01-AR-F-010");
      setRevisionNo("03");
      setSopNo("PH-QCL01-D-05");
      setUnit("Unit H");
    }
  }, []);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const handleModalClose = () => {
    setPrintBtnStatus(false);
    setShowModal(false);
    setSelectDate("");
    setSelectMonth("");
    setSelectYear("");
  };

  const handlePrintDate = (e) => {
    // console.log(" date Value", e.target.value);

    setSelectDate(e.target.value);
    // setShiftBtnStatus(false);
    // const formatDates = Dateformat(e.target.value);
    // // console.log("Select Date", formatDates);
    // setPrintNewDate(formatDates);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  }`;

  const values_FormNo = [
    { value: "PH-QCL01-AR-F-008", label: "PH-QCL01-AR-F-008" },
    { value: "PH-QCL01-AR-F-009", label: "PH-QCL01-AR-F-009" },
    { value: "PH-QCL01-AR-F-010", label: "PH-QCL01-AR-F-010" },
  ];

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (
          data.qc_status === "QC_REJECTED" ||
          data.qc_status === "QA_REJECTED"
        ) {
          setReason(true);
          break;
        } else {
          setReason(false);
        }
      }
    };
    findReason();
  }, [getData]);

  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});

  const getImage = (username, type) => {
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

        if (type === "micro") {
          setGetImage1((prev) => ({ ...prev, [username]: url }));
        } else {
          setGetImage2((prev) => ({ ...prev, [username]: url }));
        }
      })
      .catch((err) => {
        console.error("Error in fetching image:", err);
      });
  };

  // Fetch chemist and QC images for all data in printData
  useEffect(() => {
    printData.forEach((data) => {
      if (data.microbiologist_sign) {
        getImage(data.microbiologist_sign, "micro");
      }
      if (data.qc_sign) {
        getImage(data.qc_sign, "manager");
      }
    });
  }, [printData]);

  useEffect(() => {
    const { formNo } = state || {};

    if (localStorage.getItem("role") === "ROLE_MICROBIOLOGIST") {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .get(
          `${API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetByFormatId`,
          {
            headers,
            params: { formatNo: formNo },
          }
        )
        .then((response) => {
          const filteredData = response.data.filter(
            (x) => x.formatNo === formNo
          ); // Filter based on formatNo

          if (filteredData.length !== 0) {
            setReason(true);
          } else {
            setReason(false);
          }

          setGetData(filteredData);

          const summaryData = filteredData.map((x) => ({
            formatName: x.formatName,
            formatNo: x.formatNo,
            revisionNo: x.revisionNo,
            refSopNo: x.refSopNo,
            unit: x.unit,
            date: x[`sampledDateF${formNo.split("-").pop()}`], // Dynamically choose the sampled date field
            id: x.id,
            microbiologist_status: x.microbiologist_status,
            qc_status: x.qc_status,
            materialDocNo: x.materialDocNo,
            reason: x.reason,
            arNumbers: x.details.map((detail) => detail.arNumber),
          }));

          setSummary(summaryData); // Set the filtered and mapped data
        })
        .catch(() => {});
    } else if (
      localStorage.getItem("role") === "QC_MANAGER" ||
      localStorage.getItem("role") === "QA_MANAGER"
    ) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .get(
          `${API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/getAllQcNotSubmitted`,
          {
            headers,
          }
        )
        .then((response) => {
          const formKeys = Object.keys(response.data);

          formKeys.forEach((formKey) => {
            if (formKey === formNo) {
              const filteredData = response.data[formKey].filter(
                (item) => item.formatNo === formKey
              );

              if (filteredData.length !== 0) {
                setReason(true);
              } else {
                setReason(false);
              }

              setGetData(filteredData);

              const summaryData = filteredData.map((x) => ({
                formatName: x.formatName,
                formatNo: x.formatNo,
                revisionNo: x.revisionNo,
                refSopNo: x.refSopNo,
                unit: x.unit,
                date: x[`sampledDateF${formKey.split("-").pop()}`], // Dynamically choose the sampled date field
                id: x.id,
                microbiologist_status: x.microbiologist_status,
                qc_status: x.qc_status,
                materialDocNo: x.materialDocNo,
                reason: x.reason,
                arNumbers: x.details.map((detail) => detail.arNumber),
              }));

              setSummary(summaryData);
            }
          });
        })
        .catch(() => {});
    }
  }, []);

  const handleGoToChange = () => {
    if (newDate == "") {
      // setError('Please select a date');
      message.warning("Please Select Date");
      return;
    }
    navigate("/Precot/QualityControl/Microbiology", {
      state: {
        date: newDate,
        // newMonth : newMonth,
        // newYear:newYear,
        formNo: formNo,
      },
    });
  };

  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };

  const printDateSubmit = () => {
    window.print();
    handleModalClose();
  };

  const handlePrintChange = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    // const a = String(event.target.value).split('-').reverse().join('/');

    // if (selectMonth == "" && selectYear == "") {
    //   // setError('Please select a date');
    //   message.warning("Please Select Month & Year :");
    //   return;
    // }

    axios
      .get(
        `${API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetReportForPrint`,
        {
          headers,
          params: {
            // materialDocNo : printmaterialDoc
            formatNo: formNo,
            date: selectDate,
            month: selectMonth,
            year: selectYear,
          },
        }
      )
      .then((res) => {
        if (res.data.length == 0) {
          console.log("first response", res.data);
          message.info("No Data Found");
        } else {
          console.log("first response", res.data);
          setPrintData(res.data);
          setTimeout(() => {
            // setLoading(false)
            window.print();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        message.error(err.res.message);
      });
  };

  const handleEdit = (record) => {
    if (role == "ROLE_MICROBIOLOGIST") {
      const x = summary.filter((x, i) => {
        return record.id == x.id;
      });
      console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      //   setmodalData(x);
      navigate("/Precot/QualityControl/Microbiology", {
        state: {
          id: x[0].id,
          formNo: x[0].formatNo,
          date: x[0].date,
          year: x[0].year,
          month: x[0].month,
        },
      });
      // setnewModal(true);
    }

    if (role == "QC_MANAGER" || role == "QA_MANAGER") {
      const x = summary.filter((x, i) => {
        return record.id == x.id;
      });
      console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      //   setmodalData(x);
      navigate("/Precot/QualityControl/Microbiology", {
        state: {
          id: x[0].id,
          formNo: x[0].formatNo,
          date: x[0].date,
          year: x[0].year,
          month: x[0].month,
        },
      });
      // setnewModal(true);
    }
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
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
      title: "AR .NO",
      dataIndex: "arNumbers",
      key: "arNumbers",
      align: "center",
      // render: (text) => formatDate(text),
    },
    {
      title: "MicroBiologist Status",
      dataIndex: "microbiologist_status",
      key: "microbiologist_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "qc_status",
      key: "qc_status",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "id",
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

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit={unit}
        formName={formatName}
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
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // display: printBtnStatus ? "block" : "none",
            }}
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
          >
            &nbsp;Print
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            // icon={<IoCaretBackCircleSharp color="#00308F" />}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
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

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        {/* <div>
          <label htmlFor="yearSelect">Select Year</label>
          <Select
            id="yearSelect"
            style={{
              width: "100%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "10%",
            }}
            onChange={(value) => setSelectYear(value)}
            placeholder="Select Year"
          >
            <Select.Option value="" disabled selected hidden>
              Select Year
            </Select.Option>
            {years.map((year) => (
              <Select.Option key={year.value} value={year.value}>
                {year.label}
              </Select.Option>
            ))}
          </Select>
          </div>
          <div>
          <label htmlFor="monthSelect">Select Month</label>
          <Select
            id="monthSelect"
            style={{
              width: "100%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "10%",
            }}
            onChange={(value) => setSelectMonth(value)}
            // onChange={(value) => handleDatePrintChange(value)}
            placeholder="Select Month"
          >
            <Select.Option value="" disabled selected hidden>
              Select Month
            </Select.Option>
            {months.map((month) => (
              <Select.Option key={month.value} value={month.value}>
                {month.label}
              </Select.Option>
            ))}
          </Select>
          </div> */}
        <div>
          <Input
            placeholder="Date"
            type="date"
            size="small"
            value={newDate}
            onChange={handleDateChanges}
            style={{ flex: 1 }}
            max={getCurrentDate()}
          />
        </div>
        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          onClick={handleGoToChange}
        >
          Go to
        </Button>
      </div>

      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
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
            onClick={handlePrintChange}
            disabled={printBtnStatus}
          >
            Print
          </Button>,
        ]}
      >
        <h4
          style={{ textAlign: "center", color: "blueviolet" }}
          htmlFor="yearSelect"
        >
          {formNo}
        </h4>{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            marginBottom: "16px",
          }}
        >
          <label
            htmlFor="yearSelect"
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Select Year
          </label>
          <Select
            id="yearSelect"
            style={{
              width: "100%",
            }}
            onChange={(value) => setSelectYear(value)}
            placeholder="Select Year"
          >
            <Select.Option value="" disabled selected hidden>
              Select Year
            </Select.Option>
            {years.map((year) => (
              <Select.Option key={year.value} value={year.value}>
                {year.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            marginBottom: "16px",
          }}
        >
          <>
            <label
              htmlFor="monthSelect"
              style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
            >
              Select Month
            </label>
            <Select
              id="monthSelect"
              style={{
                width: "100%",
              }}
              onChange={(value) => setSelectMonth(value)}
              // onChange={(value) => handleDatePrintChange(value)}
              placeholder="Select Month"
            >
              <Select.Option value="" disabled selected hidden>
                Select Month
              </Select.Option>
              {months.map((month) => (
                <Select.Option key={month.value} value={month.value}>
                  {month.label}
                </Select.Option>
              ))}
            </Select>
          </>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <label
            htmlFor="monthSelect"
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date:
          </label>
          <Input
            placeholder="Date"
            type="date"
            size="small"
            value={selectDate}
            onChange={handlePrintDate}
            style={{ width: "100%" }}
            max={getCurrentDate()}
          />
        </div>
      </Modal>
      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={summary}
        rowKey="id"
      />

      {/* print started here */}
      <GlobalStyle />
      <div id="section-to-print">
        <header className="no-print" />
        <main>
          {/* Helper function to chunk the data */}
          {(() => {
            const chunkArray = (data, size) => {
              const result = [];
              for (let i = 0; i < data.length; i += size) {
                result.push(data.slice(i, i + size));
              }
              return result;
            };

            const chunkedData = chunkArray(
              printData.flatMap((data) => data.details),
              3
            );

            return chunkedData.map((dataChunk, pageIndex) => (
              <div key={pageIndex} style={{ pageBreakAfter: "always" }}>
                {/* table header */}
                <table style={{ marginTop: "30px", width: "90%" }}>
                  <thead>
                    <tr>
                      <td style={{ border: "none", padding: "30px" }}></td>
                    </tr>
                    <tr>
                      <td
                        colSpan="15"
                        rowspan="4 "
                        style={{ textAlign: "center" }}
                      >
                        <img
                          src={logo}
                          alt="Logo"
                          style={{ width: "100px", height: "auto" }}
                        />
                        <br></br>
                        {unit}
                      </td>
                      <th
                        colSpan="45"
                        rowSpan="4"
                        style={{ textAlign: "center" }}
                      >
                        {printData[0]?.formatName || "Format Name"}
                      </th>
                      <td colSpan="20">Format No.:</td>
                      <td colSpan="20">
                        {printData[0]?.formatNo || "Format No"}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="20">Revision No.:</td>
                      <td colSpan="20">
                        {printData[0]?.revisionNo || "Revision No"}
                      </td>
                    </tr>
                    <td colSpan="20">Ref. SOP No.:</td>
                    <td colSpan="20">
                      {printData[0]?.refSopNo || "Ref SOP No"}
                    </td>
                    <tr>
                      <td colSpan="20">Page No.:</td>
                      <td colSpan="20">
                        {pageIndex + 1} of {chunkedData.length}
                      </td>
                    </tr>
                  </thead>
                  <br />
                  <tbody>
                    <tr>
                      <th
                        colSpan="10"
                        rowSpan="2"
                        style={{ textAlign: "center" }}
                      >
                        Sampled & Tested / Incubation Start on
                      </th>
                      <th
                        colSpan="10"
                        rowSpan="2"
                        style={{ textAlign: "center" }}
                      >
                        A.R Number
                      </th>
                      {(formNo === "PH-QCL01-AR-F-009" ||
                        formNo === "PH-QCL01-AR-F-010") && (
                        <th
                          colSpan="5"
                          rowSpan="2"
                          style={{ textAlign: "center" }}
                        >
                          location / machine
                        </th>
                      )}
                      {formNo === "PH-QCL01-AR-F-009" && (
                        <th
                          colSpan="5"
                          rowspan="2"
                          style={{ textAlign: "center" }}
                        >
                          Employee ID NO
                        </th>
                      )}
                      {formNo === "PH-QCL01-AR-F-008" && (
                        <th
                          colSpan="10"
                          rowSpan="2"
                          style={{ textAlign: "center" }}
                        >
                          Location
                        </th>
                      )}
                      <th colSpan="25" style={{ textAlign: "center" }}>
                        Test Parameters & Specification
                      </th>
                      <th
                        colSpan="10"
                        rowSpan="2"
                        style={{ textAlign: "center" }}
                      >
                        Test Completion Date
                      </th>
                      <th
                        colSpan="15"
                        rowSpan="2"
                        style={{ textAlign: "center" }}
                      >
                        Remark
                      </th>
                      <th
                        colSpan="10"
                        rowSpan="2"
                        style={{ textAlign: "center" }}
                      >
                        Tested by (Microbiologist)
                      </th>
                      <th
                        colSpan="10"
                        rowSpan="2"
                        style={{ textAlign: "center" }}
                      >
                        Approved by (QC In-Charge)
                      </th>
                      {/* <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>Actions</th> */}
                    </tr>
                    <tr>
                      <th colSpan="10" style={{ textAlign: "center" }}>
                        Total Viable Count (TVC - cfu/cm2) (Limit ≤1000)
                      </th>
                      <th colSpan="15" style={{ textAlign: "center" }}>
                        Total Fungal Count (TFC - cfu/cm2)(Limit ≤ 100)
                      </th>
                    </tr>
                    {dataChunk.map((detail, idx) => {
                      const mainObject = printData.find((pd) =>
                        pd.details.includes(detail)
                      );

                      // Choose the first non-null date, prioritize dateF001, dateF002, dateF003
                      const dateToDisplay =
                        mainObject?.sampledDateF008 ||
                        mainObject?.sampledDateF009 ||
                        mainObject?.sampledDateF010 ||
                        "N/A";

                      // Format the date only if it is not "N/A"
                      const formattedDate =
                        dateToDisplay !== "N/A"
                          ? formatDate(dateToDisplay)
                          : "N/A";

                      return (
                        <tr key={idx}>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {formattedDate}
                          </td>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {detail.arNumber}{" "}
                          </td>
                          {(formNo === "PH-QCL01-AR-F-009" ||
                            formNo === "PH-QCL01-AR-F-010") && (
                            <td colSpan="5" style={{ textAlign: "center" }}>
                              {" "}
                              {detail.location}{" "}
                            </td>
                          )}
                          {formNo === "PH-QCL01-AR-F-009" && (
                            <td colSpan="5" style={{ textAlign: "center" }}>
                              {" "}
                              {detail.employeeIdNo}{" "}
                            </td>
                          )}
                          {formNo === "PH-QCL01-AR-F-008" && (
                            <td colSpan="10" style={{ textAlign: "center" }}>
                              {" "}
                              {detail.location}{" "}
                            </td>
                          )}
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {detail.totalViableCount}
                          </td>
                          <td colSpan="15" style={{ textAlign: "center" }}>
                            {detail.totalFungalCount}
                          </td>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {formatDate(detail.testCompletionDate)}
                          </td>
                          <td colSpan="15" style={{ textAlign: "center" }}>
                            {detail.remark || "NA"}
                          </td>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {getImage1[mainObject.microbiologist_sign] && (
                              <img
                                src={getImage1[mainObject.microbiologist_sign]}
                                alt="Micro Signature"
                                style={{ width: "50px", height: "auto" }}
                              />
                            )}
                            <br />
                            {mainObject.microbiologist_sign}
                            <br />
                            {moment(mainObject.microbiologist_submit_on).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </td>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {getImage2[mainObject.qc_sign] && (
                              <img
                                src={getImage2[mainObject.qc_sign]}
                                alt="Manager Signature"
                                style={{ width: "50px", height: "auto" }}
                              />
                            )}
                            <br />
                            {mainObject.qc_sign}
                            <br />
                            {moment(mainObject?.qc_submit_on).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan="100">
                        Note: cfu/cm2- Colony forming unit per centimeter
                        square, A.R Number-Analytical Reference Number
                      </td>
                    </tr>
                  </tbody>
                  <br />
                  <tfoot>
                    <br />
                    <tr>
                      <th colSpan="25">Particulars</th>
                      <th colSpan="25" style={{ textAlign: "center" }}>
                        Prepared by
                      </th>
                      <th colSpan="25" style={{ textAlign: "center" }}>
                        Reviewed by
                      </th>
                      <th colSpan="25" style={{ textAlign: "center" }}>
                        Approved by
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="25">Name</th>
                      <td colSpan="25"></td>
                      <td colSpan="25"></td>
                      <td colSpan="25"></td>
                    </tr>
                    <tr>
                      <th colSpan="25">Signature & Date</th>
                      <td colSpan="25"></td>
                      <td colSpan="25"></td>
                      <td colSpan="25"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ));
          })()}
        </main>
        <footer className="no-print" />
      </div>
    </div>
  );
};

export default QualityControl_f03_Summary;
