/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader.js";

import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Menu,
  Row,
  Select,
  Table,
  Tooltip,
  Modal,
  Input,
  message,
} from "antd";
import { FaUserCircle } from "react-icons/fa";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { FaPrint } from "react-icons/fa6";
import { createGlobalStyle } from "styled-components";
import { render } from "@testing-library/react";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Stores_f001_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [shift, setShift] = useState("");

  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");

  const token = localStorage.getItem("token");
  const [printLoading, setPrintLoading] = useState("");
  const [date, setDate] = useState("");
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
  const [forkliftNo, setForkliftNo] = useState("");
  const [fromSelectedDate, setFromSelectedDate] = useState("");
  const [toSelectedDate, setToSelectedDate] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const formatDates = (dateStr) => {
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
  const date1 = formatDates(date);
  const date2 = formatDates(selectedDate);

  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
    }
  }
`;

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
      render: (text) => formatDates(text),
    },
    {
      title: "supplierName",
      dataIndex: "supplierName",
      key: "supplierName",
      align: "center",
    },
    {
      title: "Store Incharge Status",
      dataIndex: "store_status",
      key: "store_status",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      align: "center",
      render: (_, x) => (
        <>
          <Button
            icon={<BiEdit />}
            onClick={() => handleEdit(x)}
            style={{ width: "100%", border: "none" }}
          >
            Edit
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

  const handlePrint = () => {
    setShowModal(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });
        if (res.data && res.data.length !== 0) {
          setGetData(res.data);
          console.log("edit response", res.data);

          const isHODRejected = res.data.some(
            (data) => data.store_in_charge_status === "INCHARGE_REJECTED"
          );
          setReason(isHODRejected);

          setSummary(
            res.data.map((x) => ({
              date: x.date,
              store_status: x.store_in_charge_status,
              hod_status: x.hod_status,
              month: x.month,
              supplierName: x.supplierName,
              reason: x.reason,
              year: x.year,
              index: x.index,
            }))
          );
        } else {
          setSummary([]);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
        navigate("/Precot/Stores/F-001/Summary");
      }
    };

    const summaryUrl = `${ API.prodUrl}/Precot/api/Store/getMetarialInwardsSummary`;

    if (["STORE_INCHARGE"].includes(userRole)) {
      fetchSummary(summaryUrl);
    }
  }, []);

  const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }

  const years = generateYearOptions(2024, 2040);

  const handleEdit = (x) => {
    navigate("/Precot/Stores/F-001", {
      state: {
        date: x.date,
      },
    });
  };

  const handleModalClose = () => {
    setShowModal(false);

    setPrintLoading(false);
    setFromSelectedDate("");
    setToSelectedDate("");
    setSelectedMonth("");
    setSelectedYear("");
    form.resetFields();
  };

  const printSubmit = () => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const selectedMonthFromDate = dateObj.getMonth() + 1;
      const selectedYearFromDate = dateObj.getFullYear();

      if (
        selectedMonth &&
        selectedYear &&
        (selectedMonthFromDate !== Number(selectedMonth) ||
          selectedYearFromDate !== Number(selectedYear))
      ) {
        message.error(
          "The selected date does not match the selected month and year."
        );
        setSelectedMonth("");
        setSelectedYear("");
        form.resetFields();
        return;
      }
    }
    fetchData();
  };

  const [imageMap, setImageMap] = useState({});
  const fetchImage = (username) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
          resolve({ username, url });
        })
        .catch((err) => {
          console.error("Error fetching image:", err);
          resolve({ username, url: null });
        });
    });
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const finalUrl = `${ API.prodUrl}/Precot/api/Store/getMetarialInwardsPrint?year=${selectedYear}&month=${selectedMonth}&fromDate=${fromSelectedDate}&toDate=${toSelectedDate}`;

    try {
      const response = await axios.get(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        setPrintLoading(true);
        setPrintResponseData(response.data);

        const usernames = response.data.map(
          (item) => item.store_in_charge_sign
        );
        const uniqueUsernames = [...new Set(usernames)];

        const imageResults = await Promise.all(
          uniqueUsernames.map((username) => fetchImage(username))
        );

        const updatedImageMap = { ...imageMap };
        imageResults.forEach(({ username, url }) => {
          if (url) {
            updatedImageMap[username] = url;
          }
        });
        setImageMap(updatedImageMap);

        setTimeout(() => {
          window.print();
          handleModalClose();
          setPrintLoading(false);
        }, 3000);
      } else {
        setPrintResponseData([]);
        setPrintLoading(false);
        message.error("No details found for the selected form. Cannot print.");
        handleModalClose();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data. Please try again.");
      setPrintLoading(false);
    }
  };

  const handleNavigate = () => {
    if (date == "") {
      message.warning("Please Select Date");
    } else {
      navigate("/Precot/Stores/F-001", {
        state: { date: date },
      });
    }
  };

  const [getImage, setGetImage] = useState("");

  const [getImage1, setGetImage1] = useState("");

  const formatDate = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const formattedDatesupervisor = formatDate(
    printResponseData.supervisor_submit_on
  );
  const formatedDateOperator = formatDate(
    printResponseData.operator_submitted_on
  );
  const formattedDateHod = formatDate(printResponseData.hod_submit_on);
  const dateformated = formatDates(selectedDate);

  const recordsPerPage = 5;
  const totalPages = Math.ceil(printResponseData.length / recordsPerPage);
  console.log("printResponseData.length", printResponseData.length);
  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <table key={pageIndex} style={{ scale: "90%", marginLeft: "10px" }}>
            <thead>
              <tr style={{ border: "none" }}>
                <td
                  style={{ border: "none", padding: "5px" }}
                  colSpan="15"
                ></td>
              </tr>
              <tr style={{ height: "20px" }}>
                <td
                  rowSpan="4"
                  colSpan="2"
                  style={{ textAlign: "center", width: "10%" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "80px", height: "auto" }}
                  />
                  <br />
                  <b style={{ fontFamily: "Times New Roman, Times, serif" }}>
                    Unit H
                  </b>
                </td>
                <td
                  rowSpan="4"
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  <b>MATERIAL INWARD REGISTER</b>{" "}
                </td>
                <td colSpan="1">Format No.:</td>
                <td colSpan="2">PH- STR01/F-001</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Revision No.:</td>
                <td colSpan="3">01</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Ref.SOP No.:</td>
                <td colSpan="3">PH-STR01-D-02</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Page No.:</td>
                <td colSpan="3">
                  {pageIndex + 1} of {totalPages}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }}></td>
              </tr>
            </thead>
            <br />

            <tbody>
              <tr>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Sr.
                  <br /> No
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Date
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  In Time{" "}
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Out Time
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Vehicle <br /> Number
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Supplier
                  <br /> Name
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Invoice /<br /> DC No. <br />
                  and Date
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Item <br />
                  Description
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Quantity
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  Security
                  <br /> Sign &<br /> Date
                </th>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  GRN
                  <br /> Number
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  Store In
                  <br /> charge Sign <br />& Date
                </th>
              </tr>
              {paginateData(printResponseData, pageIndex + 1).map(
                (data, index) => (
                  <tr key={index}>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {pageIndex * recordsPerPage + index + 1}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {formatDates(data.date)}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {data.intime}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {data.outtime}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {data.vehicleNumber}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {data.supplierName}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {data.invoiceDcNo}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {data.itemDescription}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {data.quantity}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {data.securitySignDate}
                    </th>
                    <th
                      colSpan="1"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {data.grnNumber}
                    </th>
                    <th
                      colSpan="2"
                      style={{ textAlign: "center", alignContent: "center" }}
                    >
                      {" "}
                      {imageMap[data.store_in_charge_sign] && (
                        <img
                          className="signature"
                          src={imageMap[data.store_in_charge_sign]}
                          alt="logo"
                        />
                      )}{" "}
                      <br />
                      {data.store_in_charge_sign} <br />
                      {formatDate(data.store_in_charge_submit_on)}
                      <br />
                    </th>
                  </tr>
                )
              )}
            </tbody>
            <br />
            <tfoot>
              <br />
              <tr style={{ height: "30px" }}>
                <td colSpan={3}>Particulars</td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Prepared by
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Reviewed by
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Approved by
                </td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={3}>Name</td>
                <td colSpan={3} style={{ textAlign: "center" }}></td>
                <td colSpan={3} style={{ textAlign: "center" }}></td>
                <td colSpan={4} style={{ textAlign: "center" }}></td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={3}>Signature & Date</td>
                <td colSpan={3} style={{ textAlign: "center" }}></td>
                <td colSpan={3} style={{ textAlign: "center" }}></td>
                <td colSpan={4} style={{ textAlign: "center" }}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="MATERIAL INWARD REGISTER"
        formatNo="PH- STR01/F-001"
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
            onClick={handlePrint}
            icon={<FaPrint color="#00308F" />}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
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
      <div style={{ paddingBottom: "2em" }}></div>

      {/* header code above */}
      <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "15px",
          }}
        >
          <Form.Item label="Date">
            <Input
              type="date"
              value={date}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              key="Create"
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
              shape="round"
              icon={<BiNavigation />}
              onClick={handleNavigate}
            >
              Go To
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={summary}
        />
      </div>
      <Modal
        title="Print"
        open={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printSubmit}
            loading={printLoading}
            disabled={
              !(
                (fromSelectedDate && toSelectedDate) ||
                (selectedMonth && selectedYear)
              )
            }
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="year"
            label="Select Year"
            rules={[{ required: true, message: "Please select a year" }]}
          >
            <Select
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              onChange={(value) => {
                setSelectedYear(value);
              }}
              placeholder="Select Year"
              disabled={fromSelectedDate || toSelectedDate}
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
          </Form.Item>
          <Form.Item
            name="month"
            label="Select Month"
            rules={[{ required: true, message: "Please select a month" }]}
          >
            <Select
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              onChange={(value) => setSelectedMonth(value)}
              placeholder="Select Month"
              disabled={fromSelectedDate || toSelectedDate}
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
          </Form.Item>
          <Form.Item label="From Date">
            <Input
              type="date"
              value={fromSelectedDate}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setFromSelectedDate(e.target.value)}
              disabled={selectedMonth || selectedYear}
            />
          </Form.Item>
          <Form.Item label="To Date">
            <Input
              type="date"
              value={toSelectedDate}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setToSelectedDate(e.target.value)}
              disabled={selectedMonth || selectedYear}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Stores_f001_summary;
