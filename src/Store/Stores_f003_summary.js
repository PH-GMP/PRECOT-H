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

const Stores_f003_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [fromSelectedDate, setFromSelectedDate] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [toSelectedDate, setToSelectedDate] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");
  const [date, setDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
  const [description, setDescription] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [invoice, setInvoice] = useState([]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleInvoiceNoChange = (e) => {
    const inputValue = e.target.value;
    setInvoiceNo(inputValue);
  };
  const handleDescrptionChange = (e) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
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
      title: "Invoice No.",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "op_status",
      key: "op_status",
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
    columns = [...baseColumns.slice(0, 6), Reason, ...baseColumns.slice(6)];
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
          const isHODRejected = res.data.some(data => data.store_in_charge_status === "INCHARGE_REJECTED");
          setReason(isHODRejected);
          setGetData(res.data);

          if (Array.isArray(res.data)) {
            setSummary(
              res.data.map((x, index) => ({

                date: x.date || "N/A",
                store_status: x.store_in_charge_status || "N/A",
                hod_status: x.hod_status || "N/A",
                description: x.description || "N/A",
                invoiceNo: x.invoiceNo || "N/A",
                op_status: x.operator_status || "N/A",
                reason: x.reason || "N/A",
                index: x.index,
              }))
            );
          }
        } else {
          setSummary([]);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
      }
    };

    const summaryUrl = `${ API.prodUrl}/Precot/api/Store/getReceptionChecklistSummary`;

    if (["STORE_OPERATOR", "STORE_INCHARGE"].includes(userRole)) {
      fetchSummary(summaryUrl);
    }
  }, []);

  useEffect(() => {
    const fetchInvoiceNo = async () => {

      try {
        const response = await axios.get(`${ API.prodUrl}/Precot/api/Store/Invoice`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // setInvoice(response.data);
        const formattedInvoices = response.data.map((invoice) => ({
          label: invoice,
          value: invoice,
        }));
        setInvoice(formattedInvoices);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchInvoiceNo();
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
    navigate("/Precot/Stores/F-003", {
      state: {
        description: x.description,
        invoiceNo: x.invoiceNo,
      },
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFromSelectedDate("");
    setToSelectedDate("");
    setSelectedMonth("");
    setSelectedYear("");
    setSelectedInvoice("");
    setPrintLoading(false);
    form.resetFields();
  };

  const printDataSubmit = () => {
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
    fetchPrintData();
  };

  const fetchPrintData = () => {
    let baseUrl = `${ API.prodUrl}/Precot/api/Store/getReceptionChecklistPrint?year=${selectedYear}&month=${selectedMonth}&invoice=${selectedInvoice}&fromDate=${fromSelectedDate}&toDate=${toSelectedDate}`;
    let query = [];





    let finalUrl = baseUrl + query.join("&");
    console.log("finalUrl", finalUrl);


    const token = localStorage.getItem("token");
    axios
      .get(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        console.log("Fetched data:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintResponseData(response.data);
          setPrintLoading(true);

          setTimeout(() => {
            window.print();
            handleModalClose();
          }, 3000);

          console.log("print data", response.data);
        } else {
          setPrintResponseData([]);
          setPrintLoading(false);
          message.error(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
        setPrintLoading(false);
      })
      .finally(() => {
        setPrintLoading(false);
      });
  };

  const handleNavigate = () => {
    if (invoiceNo == "") {
      message.warning("Please provide Invoice No.");
    } else if (description == "") {

      message.warning("Please provide Description");
    } else {
      navigate("/Precot/Stores/F-003", {
        state: { description: description, invoiceNo: invoiceNo },
      });
    }
  };

  const operator = printResponseData[0]?.operator_sign;
  const incharge = printResponseData[0]?.store_in_charge_sign;
  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = operator;
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
          setGetImage(url);
        })
        .catch((err) => {

        });
    }
  }, [printResponseData, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = incharge;
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
  const formattedDateoperator = formatDate(
    printResponseData.operator_submit_on
  );
  const dateformated = formatDates(selectedDate);

  return (
    <div>
      <div id="section-to-print">
        {printResponseData.map((data, index) => (
          <table style={{ scale: "90%", marginLeft: "10px" }}>
            <thead>
              <tr style={{ border: "none" }}>
                <td
                  style={{ border: "none", padding: "5px" }}
                  colSpan="15"
                ></td>
              </tr>

              <tr style={{ height: "20px" }}>
                <td rowSpan="4" style={{ textAlign: "center", width: "10%" }}>
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
                <td rowSpan="4" colSpan="10" style={{ textAlign: "center" }}>
                  <b style={{ fontFamily: "Times New Roman, Times, serif", }}>Reception Check List</b>{" "}
                </td>
                <td colSpan="1">Format No.:</td>
                <td colSpan="3">PH- STR01/F-003</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1" style={{ fontFamily: "Times New Roman, Times, serif", }}>Revision No.:</td>
                <td colSpan="3">01</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1" style={{ fontFamily: "Times New Roman, Times, serif", }}>Ref.SOP No.:</td>
                <td colSpan="3">PH-STR01-D-02</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1" style={{ fontFamily: "Times New Roman, Times, serif", }}>Page No.:</td>
                <td colSpan="3">
             {index + 1} of {printResponseData.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }}></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <th colSpan={1} style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th colSpan={6}>Parameters</th>
                <th colSpan={6}>Actual Observation</th>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  01
                </td>
                <td colSpan={6}>Date</td>
                <td colSpan={6}>{formatDates(data.date)}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  02
                </td>
                <td colSpan={6}>Supplier Name</td>
                <td colSpan={6}>{data.supplierName}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  03
                </td>
                <td colSpan={6}>Invoice No. / Invoice Date</td>
                <td colSpan={6}>{data.invoiceNo}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  04
                </td>
                <td colSpan={6}>Total Quantity</td>
                <td colSpan={6}>{data.totalQuantity}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  05
                </td>
                <td colSpan={6}>No. of {data.noOfBalesOrCans}</td>
                <td colSpan={6}>{data.noOfBalesOrCansCount}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  06
                </td>
                <td colSpan={6}>Weight (In Kg)</td>
                <td colSpan={6}>{data.weight}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  07
                </td>
                <td colSpan={6}>Description</td>
                <td colSpan={6}>{data.description}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  08
                </td>
                <td colSpan={6}>Vehicle No:</td>
                <td colSpan={6}>{data.vehicleNo}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  09
                </td>
                <td colSpan={6}>Organic Identification</td>
                <td colSpan={6}>{data.organicIdentification}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  10
                </td>
                <td colSpan={6}>Vehicle Condition</td>
                <td colSpan={6}>{data.vehicleCondition}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  11
                </td>
                <td colSpan={6}>Packing Condition</td>
                <td colSpan={6}>{data.packingCondition}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  12
                </td>
                <td colSpan={6}>Wet Condition</td>
                <td colSpan={6}>{data.wetCondition}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  13
                </td>
                <td colSpan={6}>Contamination, If Any</td>
                <td colSpan={6}>{data.contamination}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  14
                </td>
                <td colSpan={6}>Remarks</td>
                <td colSpan={6}>{data.remarks}</td>
              </tr>
              <tr>
                <td colSpan={7} style={{ textAlign: 'center' }}>
                  Checked by:<br />
                  {getImage && (
                    <img
                      className="signature"
                      src={getImage}
                      alt="logo"
                    />
                  )}{" "}
                  <br />
                  {data.operator_sign} <br />
                  {formatDate(data.operator_submit_on)}
                  <br />

                </td>
                <td colSpan={6} style={{ textAlign: 'center' }}>
                  Verified by:<br />
                  {getImage1 && (
                    <img
                      className="signature"
                      src={getImage1}
                      alt="logo"
                    />
                  )}{" "}
                  <br />
                  {data.store_in_charge_sign} <br />
                  {formatDate(data.store_in_charge_submit_on)}
                  <br />
                </td>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <br />
              <tr style={{ height: "30px" }}>
                <td colSpan={5}>Particulars</td>
                <td colSpan={3}>Prepared by</td>
                <td colSpan={4}>Reviewed by</td>
                <td colSpan={1}>Approved by</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={5}>Name</td>
                <td colSpan={3}></td>
                <td colSpan={4}></td>
                <td colSpan={1}></td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={5}>Signature & Date</td>
                <td colSpan={3}></td>
                <td colSpan={4}></td>
                <td colSpan={1}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="RECEPTION CHECK LIST"
        formatNo="PH- STR01/F-003"
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

      <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "15px",
          }}
        >
          <Form.Item label="Invoice No.:">
            <Input
              type="text"
              value={invoiceNo}
              placeholder="Invoice No."
              onChange={handleInvoiceNoChange}
            />
          </Form.Item>
          <Form.Item label=" Material Description">
            <Input
              type="text"
              value={description}
              placeholder="Description"
              onChange={handleDescrptionChange}
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
            onClick={printDataSubmit}
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
          <Form.Item label=" Select Invoice No.">
            <Select
              value={selectedInvoice}
              onChange={setSelectedInvoice}
              options={invoice}
              showSearch
              placeholder="Choose the Product Name"
            />
          </Form.Item>
          <Form.Item label="From Date">
            <Input
              type="date"
              value={fromSelectedDate}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setFromSelectedDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="To Date">
            <Input
              type="date"
              value={toSelectedDate}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setToSelectedDate(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Stores_f003_summary;
