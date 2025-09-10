/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
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

const QA_f03_Summary = () => {
  PrintPageOrientation({ orientation: "landscape", scale: 0.9 });
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [getImage1, setGetImage1] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [yearPrint, setYearPrint] = useState("");

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

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2070);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.supervisor_sign;
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
        .catch((err) => {});
    }
  }, [printResponseData,API.prodUrl, token]);

  const formattedDate = (dateString) => {
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
    setMonthPrint(null);
    setYearPrint(null);
    setDatePrint(null);
  };

  //   handle edit
  const handleEdit = (record) => {
    const { date } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QA/F-03", {
      state: {
        date: formattedDate,
      },
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleMonthPrintChange = (value) => {
    setMonthPrint(value);
  };
  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };
  const handleDateChangePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
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

      let apiUrl = `${API.prodUrl}/Precot/api/QA/Service/api/getDistributionAndDestructionSummary`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      console.log("Summary Get List", data);
      if (data && data.length >= 0) {
        setTableData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            month: item.month,
            year: item.year,
            qa_mr_status: item.qa_mr_status,
            id: item.id,
            sno: index + 1,
            reason: item.reason,
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
      title: "Date",
      dataIndex: "date",
      key: "formatDate",
      align: "center",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
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
      title: "MR / Designee Status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
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

  const printSubmit = () => {
    fetchPrintValue();
  };

  const fetchPrintValue = () => {
    let monthP;
    let YearP;
    let DateP;
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
    if (datePrint == null) {
      DateP = "";
    } else {
      DateP = datePrint;
    }
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/api/getDistributionAndDestructionPrint?month=${monthP}&year=${YearP}&date=${DateP}`,
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
            setPrintResponseData(printResponseData[0]);
            setTimeout(() => {
              window.print();
              handleModalClose();
            }, 2000);
          } else {
            message.error("No Data");
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    navigate("/Precot/QA/F-03", {
      state: {
        date: date,
      },
    });
  };

  const recordsPerPage = 8;
  const totalPages = Math.ceil(
    printResponseData?.details?.length / recordsPerPage
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
            <table style={{ marginTop: "10px", scale: "94%" }} key={pageIndex}>
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
                    Distribution and Destruction Record
                  </th>
                  <td colSpan="15">Format No.:</td>
                  <td colSpan="15">PH-QAD01/F-003</td>
                </tr>
                <tr>
                  <td colSpan="15">Revision No.:</td>
                  <td colSpan="15">01</td>
                </tr>
                <td colSpan="15">Ref. SOP No.:</td>
                <td colSpan="15">PH-QAD01-D-12</td>
                <tr>
                  <td colSpan="15">Page No.:</td>
                  <td colSpan="15">
                    {pageIndex + 1} of {totalPages}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="115"></td>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr>
                  <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                    S.No.
                  </th>
                  <th colSpan="80" style={{ textAlign: "center" }}>
                    Issuance record
                  </th>
                  <th colSpan="30" style={{ textAlign: "center" }}>
                    Destruction Record
                  </th>
                </tr>
                <tr>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Date
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Document No. & Version No.
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Document Name
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Type of Copy
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    No of copies
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Issued by sign & Date
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Issued to dept.
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Received by sign & date
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    No of copies Returned
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Returned by (Date & Sign){" "}
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Destroyed by Date & Sign
                  </th>
                </tr>
                {paginateData(printResponseData?.details, pageIndex + 1).map(
                  (detail, index) => (
                    <tr key={index}>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {index + 1 + pageIndex * recordsPerPage}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.date}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.documentNo}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.documentName}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.typeOfCopy}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.numberOfCopies}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.documentGivenBy}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.department}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.documentCollectedBy}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.noOfCopiesReturned}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {detail.returnedByDateAndSign}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {printResponseData.qa_mr_sign}
                        <br />
                        {formattedDate(printResponseData.qa_mr_save_on)}
                      </td>
                    </tr>
                  )
                )}
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
          formName="Distribution and Destruction Record"
          formatNo="PH-QAD01/F-003"
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
            <label>Date :</label>
          </Col>
          <Col>
            <Input
              onChange={handleDateChange}
              type="date"
              value={date}
              size="small"
              // max ={ formattedToday }
              style={{ width: "100%", height: "30px" }}
            />
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
          columns={baseColumns}
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
            Date:
          </label>
          <Input
            onChange={handleDateChangePrint}
            type="date"
            value={datePrint}
            max={formattedToday}
            size="small"
            style={{ width: "50%", height: "30px" }}
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
            value={monthPrint}
            onChange={handleMonthPrintChange}
            style={{ width: "50%" }}
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
            style={{ width: "50%" }}
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

export default QA_f03_Summary;
