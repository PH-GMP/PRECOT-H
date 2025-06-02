/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const { Option } = Select;
const Dispatch_f001_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [shift, setShift] = useState("");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fromSelectedDate, setFromSelectedDate] = useState("");
  const [toSelectedDate, setToSelectedDate] = useState("");

  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const [date, setDate] = useState("");
  const [assistantDate, setAssistanatDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const [loading, setLoading] = useState(false);
  const [productCode, setProductCode] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductCode, setSelectedProductCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchProductCode = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Dispatch/getProductname`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    };

    fetchProductCode();
  }, []);

  useEffect(() => {
    const fetchProductName = async () => {
      if (selectedProduct) {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Dispatch/getProductcode?Productname=${selectedProduct}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setProductCode(response.data);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      }
    };

    fetchProductName();
  }, [selectedProduct]);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (selectedProduct) {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Dispatch/getcustomer?Productname=${selectedProduct}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCustomers(response.data);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      }
    };

    fetchCustomers();
  }, [selectedProduct]);

  const handleProductCodeChange = (e) => {
    setSelectedCustomer(null);

    setSelectedProductCode(e);
  };
  const handleProductChange = (e) => {
    setSelectedCustomer(null);
    setSelectedProductCode(null);
    setSelectedProduct(e);
  };

  const formatDates = (dateString) => {
    if (!dateString) return "";
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateString)) {
      return dateString;
    }
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
  }
`;

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",

      render: (text, record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDates(text),
    },
    {
      title: " Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "Product Code",
      dataIndex: "product",
      key: "product",
      align: "center",
    },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
      align: "center",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      align: "center",
    },
    {
      title: "Supervisor Status ",
      dataIndex: "sup_status",
      key: "sup_status",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handlePrint = () => {
    setShowModal(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handleCancel = () => {
    setShowModal(false);

    setSelectedMonth("");
    setSelectedYear("");
    setSelectedCustomer("");
    setSelectedProduct("");
    setFromSelectedDate("");
    setSelectedProductCode("");
    setToSelectedDate("");
    setShift("");
    form.resetFields();
  };

  const formatdate = (dateStr) => {
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
          const isHODRejected = res.data.some(
            (data) => data.ppc_Incharge_status === "INCHARGE_REJECTED"
          );
          setReason(isHODRejected);
        }

        res.data.forEach((item, index) => {});
        setGetData(res.data);
        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x, index) => ({
              date: x.date,
              id: x.id,
              product: x.product,
              customer: x.customer,
              productname: x.productname,
              sup_status: x.dispatchSupervisorStatus,
              shift: x.shift,
              year: x.year,
              reason: x.reason,
            }))
          );
        } else {
          setSummary([]);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
        navigate("/Precot/Dispatch/F-001/Summary");
      }
    };
    const summaryUrl = `${API.prodUrl}/Precot/api/Dispatch/getFinishedGoodsStockSummary`;
    fetchSummary(summaryUrl);
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
    navigate("/Precot/Dispatch/F-001", {
      state: {
        date: x.date,
        id: x.id,
      },
    });
  };

  const printDataSubmit = () => {
    setLoading(true);
    fetchBmrOptions();
  };

  const fetchBmrOptions = async () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    const apiUrl = `${API.prodUrl}/Precot/api/Dispatch/GetPrintFinishedGoodsPrint?fromDate=${fromSelectedDate}&toDate=${toSelectedDate}&year=${selectedYear}&month=${selectedMonth}&productCode=${selectedProductCode}&productName=${selectedProduct}&customerName=${selectedCustomer}`;
    try {
      const res = await axios.get(apiUrl, { headers });
      if (res.data && res.data.length > 0) {
        const data = res.data;
        const updatedData = await Promise.all(
          data.map(async (item) => {
            try {
              const imageRes = await axios.get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${item.dispatchSupervisorSign}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  responseType: "arraybuffer",
                }
              );

              const base64 = btoa(
                new Uint8Array(imageRes.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              const imageUrl = `data:image/jpeg;base64,${base64}`;

              return { ...item, supervisorImage: imageUrl };
            } catch (error) {
              console.error("Error fetching image:", error);
              return { ...item, supervisorImage: null };
            }
          })
        );

        setPrintResponseData(updatedData);

        setTimeout(() => {
          window.print();
        }, 3000);
      } else {
        setPrintResponseData([]);
        message.error("No data found!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    if (date == "") {
      message.warning("Please Select Date");
    } else {
      navigate("/Precot/Dispatch/F-001", {
        state: { date: date },
      });
    }
  };

  const yearChange = (value) => {
    setSelectedYear(value);
  };
  const monthChange = (value) => {
    setSelectedMonth(value);
  };

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
  const formattedDateassistant = formatDate(assistantDate);
  const formattedDateHod = formatDate(hodDate);

  const groupDataByProductAndCustomer = (data) => {
    return data.reduce((groups, item) => {
      const key = `${item.product}-${item.customer}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {});
  };

  const groupedData = groupDataByProductAndCustomer(printResponseData);
  const groupedEntries = Object.entries(groupedData);
  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {groupedEntries.map(([key, items], pageIndex) => (
          <div
            key={key}
            style={{
              marginTop: "20px",
              pageBreakAfter:
                pageIndex < groupedEntries.length - 1 ? "always" : "auto",
            }}
          >
            <table style={{ scale: "100%", marginTop: "15px" }}>
              <thead>
                <tr style={{ border: "none" }}>
                  <td
                    style={{ border: "none", padding: "5px" }}
                    colSpan="10"
                  ></td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td
                    style={{ border: "none", padding: "5px" }}
                    colSpan="10"
                  ></td>
                </tr>
                <tr style={{ height: "20px" }}>
                  <td rowSpan="4" style={{ textAlign: "center", width: "10%" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "80px", height: "auto" }}
                    />
                    <b style={{ fontFamily: "Times New Roman, Times, serif" }}>
                      Unit H
                    </b>
                  </td>
                  <td rowspan="4" colSpan="7" style={{ textAlign: "center" }}>
                    <b>Finished Goods Stock Register</b>{" "}
                  </td>
                  <td colSpan="3">Format No.:</td>
                  <td colSpan="3">PH-DIS01/F-001</td>
                </tr>
                <tr style={{ height: "30px" }}>
                  <td colSpan="3">Revision No.:</td>
                  <td colSpan="3">01</td>
                </tr>
                <tr style={{ height: "30px" }}>
                  <td colSpan="3">Ref.SOP No.:</td>
                  <td colSpan="3">PH-DIS01-D-01</td>
                </tr>
                <tr style={{ height: "30px" }}>
                  <td colSpan="3">Page No.:</td>
                  <td colSpan="3">
                    {pageIndex + 1} of {groupedEntries.length}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }}></td>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr>
                  <td colSpan="14">Product Code: {items[0].product} </td>
                </tr>
                <tr>
                  <td colSpan="14">Product Name:{items[0].productname}</td>
                </tr>
                <tr>
                  <td colSpan="14">Customer Name: {items[0].customer}</td>
                </tr>
                <tr>
                  <td
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Date
                  </td>
                  <td
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Shift
                  </td>
                  <td
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Opening Stock (No. of Cartons)
                  </td>
                  <td
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Receipt Qty. (No. of cartons)
                  </td>
                  <td
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Dispatched Qty. (No. of Cartons)
                  </td>
                  <td
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Dispatched Qty. (No. of Cartons)
                  </td>
                  <td
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Closing Stock (No. of Cartons)
                  </td>
                  <td
                    colSpan="1"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Department
                  </td>
                  <td
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Remark{" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Received By (All) Sign & Date{" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Finished Goods Sign & Date
                  </td>
                </tr>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td
                      colSpan="1"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {formatDates(item.date)}
                    </td>
                    <td
                      colSpan="1"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.shift}
                    </td>
                    <td
                      colSpan="1"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.openingStockNoOfCartons}
                    </td>
                    <td
                      colSpan="1"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.receiptQtyNoOfCartons}
                    </td>
                    <td
                      colSpan="1"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.dispatchedQtyNoOfCartons}
                    </td>
                    <td
                      colSpan="1"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.issuedQtyNoOfCartons}
                    </td>
                    <td
                      colSpan="1"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.closingStockNoOfCartons}
                    </td>
                    <td
                      colSpan="1"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.department}
                    </td>
                    <td
                      colSpan="2"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.remark}
                    </td>
                    <td
                      colSpan="2"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.receivedByProduction}
                    </td>
                    <td
                      colSpan="2"
                      style={{ height: "15px", textAlign: "center" }}
                    >
                      {item.supervisorImage && (
                        <img
                          src={item.supervisorImage}
                          style={{ width: "100px", height: "auto" }}
                        />
                      )}
                      <br />
                      {item.dispatchSupervisorSign}
                      <br />
                      {formatDates(item.dispatchSupervisorSubmitOn)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <br />
              <tfoot>
                <br />
                <tr style={{ height: "30px" }}>
                  <td colSpan={3}>Particulars</td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Prepard by
                  </td>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    Reviewed by
                  </td>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    Approved by
                  </td>
                </tr>

                <tr style={{ height: "30px" }}>
                  <td colSpan={3}>Name</td>
                  <td colSpan={2}></td>
                  <td colSpan={4}></td>
                  <td colSpan={4}></td>
                </tr>
                <tr style={{ height: "30px" }}>
                  <td colSpan={3}>Signature & Date</td>
                  <td colSpan={2}></td>
                  <td colSpan={4}></td>
                  <td colSpan={4}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="FINISHED GOODS STOCK REGISTER"
        formatNo="PH-DIS01/F-001"
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
          pagination={{
            ...pagination,
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
          }}
          onChange={handleTableChange}
        />
      </div>

      <Modal
        title="Print"
        open={showModal}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDataSubmit}
            loading={loading}
            disabled={
              !(
                (selectedProductCode && selectedProduct && selectedCustomer) ||
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
          <Form.Item label="Product Name">
            <Select
              value={selectedProduct}
              onChange={handleProductChange}
              options={products}
              showSearch
              placeholder="Choose the Product Name"
            />
          </Form.Item>
          <Form.Item label="Product Code">
            <Select
              value={selectedProductCode}
              onChange={handleProductCodeChange}
              options={productCode}
              showSearch
              placeholder=""
              disabled={!selectedProduct}
            />
          </Form.Item>
          <Form.Item label="Customer">
            <Select
              id="customer-select"
              value={selectedCustomer}
              onChange={setSelectedCustomer}
              placeholder="Choose a customer"
              showSearch
              options={customers}
              disabled={!selectedProductCode}
            />
          </Form.Item>
          <Form.Item label=" Select Year">
            <Select
              onChange={yearChange}
              options={years}
              placeholder="Choose Year"
              value={selectedYear}
            />
          </Form.Item>
          <Form.Item name="month" label="Select Month">
            <Select
              style={{
                width: "100%",
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
export default Dispatch_f001_summary;
