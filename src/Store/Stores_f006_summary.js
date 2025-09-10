/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from "react";
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

const Stores_f006_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");
  const [date, setDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
  const [gatePassNo, setGatePassNo] = useState("");
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
      title: "GatePass No.",
      dataIndex: "gatePassNo",
      key: "gatePassNo",
      align: "center",
    },

    {
      title: "Store Incharge Status",
      dataIndex: "store_status",
      key: "store_status",
      align: "center",
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status",
      key: "hod_status",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
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
          const isHODRejected = res.data.some(data => data.hod_status === "HOD_REJECTED");
          setReason(isHODRejected);
        }
        setGetData(res.data);
       
        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x, index) => ({
             
              date: x.date || "N/A",
              store_status: x.storeInchargeStatus || "N/A",
              hod_status: x.hod_status || "N/A",
              description: x.description || "N/A",
              gatePassNo: x.gatePassNo || "N/A",
              goodsSentTo: x.goodsSentTo || "N/A",
              reason: x.reason || "N/A",
              index: x.index,
            }))
          );
        } else {
          setSummary([]);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
      }
    };

    const summaryUrl = `${API.prodUrl}/Precot/api/Store/getGatepassSummary`;

    // if (["STORE_INCHARGE", "ROLE_HOD"].includes(userRole)) {
    //   fetchSummary(summaryUrl);
    // }
    if (["STORE_INCHARGE", "ROLE_HOD","DISPATCH_SUPERVISOR"].includes(userRole)) {
      fetchSummary(summaryUrl);
    }
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [getData]);

 

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

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
   
    navigate("/Precot/Stores/F-006", {
      state: {
        gatePassNo: x.gatePassNo,
      },
    });
   
  };

 
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedDate("");
    setSelectedMonth("");
    setSelectedYear("");
    setPrintLoading(false);
    form.resetFields();
  };

  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");

  const [gatePass, setGatePass] = useState("");
  const [previousGatePass, setPreviousGatePass] = useState("");

  const hasFetched = useRef(false);
  useEffect(() => {
    const fetchPreviousGatePassNo = async () => {

      if (hasFetched.current || !token) return;

      hasFetched.current = true;

      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Store/lastGatePassNo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Previous Gate Pass:", response.data);
        setPreviousGatePass(response.data);
        const [x, a, z] = response.data.split("/").map(str => str.trim());
        const newZ = String(Number(z) + 1).padStart(z.length, "0");
        setGatePassNo(`${x}/${a}/${newZ}`);
      } catch (error) {
        console.error("Error fetching previous gate pass number:", error);
      }
    };

    fetchPreviousGatePassNo();
  }, [token]);

  console.log("gatepassno", gatePassNo);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGatePassNo(value);
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
        setFromSelectedDate("");
        setToSelectedDate("");
        form.resetFields();
        return;
      }
    }
    fetchData();
  };

  const fetchData = () => {
    let baseUrl = `${API.prodUrl}/Precot/api/Store/getGatePassPrint?year=${selectedYear}&month=${selectedMonth}&fromDate=${fromSelectedDate}&toDate=${toSelectedDate}`;
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
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.storeInchargeSign}`,
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
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.hod_sign}`,
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
        setPrintLoading(false);
      });
   
  };

  const handleNavigate = () => {
    if (gatePassNo == "") {
     
      message.warning("Please enter the Gate Pass No.");
    } else {
      navigate("/Precot/Stores/F-006", {
        state: { gatePassNo: gatePassNo },
      });
    }
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
  const formattedDateIncharge = formatDate(printResponseData.storeInchargeSign);
  const formatedDateOperator = formatDate(
    printResponseData.operator_submitted_on
  );
  const formattedDateHod = formatDate(printResponseData.hod_submit_on);
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
                <td
                  rowSpan="4"
                  colSpan="10"
                  style={{
                    textAlign: "center",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  <b>Non-Returnable Gate Pass</b>{" "}
                </td>
                <td colSpan="1">Format No.:</td>
                <td colSpan="3">PH-STR01/F-006</td>
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
                <td colSpan="2">Date:</td>
                <td colSpan="4">{formatDates(data.date)}</td>
                <td colSpan="3">Gate Pass No.:</td>
                <td colSpan="5">{data.gatePassNo}</td>
              </tr>
              <tr>
                <td colSpan="15">
                  To,
                  <br />
                  <b>Security Department,</b>
                  <br />
                  <br />
                  <p style={{ paddingLeft: "100px" }}>Please Pass out the following Goods.</p>
                  <br />
                  {/* <br />
                <br /> */}
                  Goods sent to: {data.goodsSentTo}
                  <br />
                  Address: {data.address}
                  <br />
                  Name of the Transporter: {data.transporterName}
                  <br />
                  Vehicle No.: {data.vehicleNo}
                </td>
              </tr>

              <tr>
                <td colSpan="2">S. No.</td>
                <td colSpan="5">Description of Goods</td>
                <td colSpan="2">
                  Quantity <br /> with Unit
                </td>
                <td colSpan="2">
                  Reason for
                  <br /> Sending Out
                </td>
                <td colSpan="3">Remark</td>
              </tr>

              {data.goodsDetails.map((goods, i) => (
                <tr key={goods.id}>
                  <td colSpan="2">{i + 1}</td>
                  <td colSpan="5">{goods.description}</td>
                  <td colSpan="2">{goods.quantity}</td>
                  <td colSpan="2">{goods.reasonForSendingOut}</td>
                  <td colSpan="3">{goods.remark || "NA"}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  Prepared by:
                  <br />
                  {getImage && (
                    <img
                      src={getImage}
                      alt="logo"
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {data.storeInchargeSign}
                  <br />
                  {formatDate(data.storeInchargeSubmitOn)}
                </td>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  Authorized by:
                  <br />
                  {getImage1 && (
                    <img
                      src={getImage1}
                      alt="logo"
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {data.hod_sign}
                  <br />
                  {formatDate(data.hod_submit_on)}
                </td>
              </tr>
              <br />
              <tr>
                <td
                  colSpan="15"
                  style={{
                    border: "none",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Plot # 14P-16, 26-28P, SEZ Textiles, KIADB Industrial Area,
                  Hanumanthapura PO. Hassan - 573201. GST - 29AABCP3038K2Z8
                </td>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <br />
              <tr style={{ height: "30px" }}>
                <td colSpan={6}>Particulars</td>
                <td colSpan={4}>Prepared by</td>
                <td colSpan={2}>Reviewed by</td>
                <td colSpan={1}>Approved by</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={6}>Name</td>
                <td colSpan={4}></td>
                <td colSpan={2}></td>
                <td colSpan={1}></td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={6}>Signature & Date</td>
                <td colSpan={4}></td>
                <td colSpan={2}></td>
                <td colSpan={1}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="NON-RETURNABLE GATE PASS"
        formatNo="PH- STR01/F-006"
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
          {/* <Form.Item label="Date">
            <Input
              type="date"
              value={date}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setDate(e.target.value)}
            />
             </Form.Item> */}
          {/* <Form.Item label="Gate Pass No.:">
            <Input
              type="text"
              value={gatePassNo}
              placeholder="GatePassNo."
              onChange={(e) => setGatePassNo(e.target.value)}
            />
          </Form.Item> */}
          <Form.Item>
            <label>Gate Pass No : </label>
            <input
              placeholder="Gate Pass No"
              value={gatePassNo}
              onChange={handleInputChange}
              style={{ width: "150px", textAlign: "center" }}
              disabled
              className="inp-new"
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
          <Form.Item>
            <Input
              addonBefore="Previous Gate Pass No"
              style={{
                width: "100%",
                textAlign: "center",
                marginLeft: "20px",
                backgroundColor: "white",
              }}
              value={previousGatePass}
            />
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
export default Stores_f006_summary;
