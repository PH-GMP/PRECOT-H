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

const QA_f26_Summary = () => {
  PrintPageOrientation({ orientation: "portrait", scale: 0.9 });
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const navigate = useNavigate();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  const [date, setDate] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [yearPrint, setYearPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (data.manager_status === "MANAGER_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2080);
  const monthOptions = [
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
  //   Formatted Date's
  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchImages = async () => {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 300);
      try {
        const promises = printResponseData.map((item, index) => {
          const qaInspectorUsername = item?.qa_inspector_sign;
          const managerUsername = item?.manager_sign;

          const requests = [];

          if (qaInspectorUsername) {
            const qaRequest = axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${qaInspectorUsername}`,
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
                setGetImage1((prevImages) => ({
                  ...prevImages,
                  [index]: url,
                }));
              });
            requests.push(qaRequest);
          }

          if (managerUsername) {
            const managerRequest = axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${managerUsername}`,
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
                setGetImage2((prevImages) => ({
                  ...prevImages,
                  [index]: url,
                }));
              });
            requests.push(managerRequest);
          }

          return Promise.all(requests);
        });

        await Promise.all(promises);
      } catch (err) {}
    };

    if (printResponseData?.length > 0) {
      fetchImages();
    }
  }, [printResponseData,API.prodUrl]);

  // Print Module
  const handlePrint = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
    setMonthPrint(null);
  };

  const printSubmit = () => {
    fetchPrintValue();
  };

  const fetchPrintValue = () => {
    let YearP;
    let monthP;
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
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/TemplatePrint?month=${monthP}&year=${YearP}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length !== 0) {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
          } else {
            message.error("No Data");
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  //   handle edit
  const handleEdit = (record) => {
    const { date } = record;
    navigate("/Precot/QA/F-26", {
      state: {
        date: date,
      },
    });
  };
  //   summary table
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/QA/Service/TemplateSummary`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (role === "ROLE_QA" || role === "QA_MANAGER" || role === "ROLE_MR") {
        setCakingData(data);
      }
      if (data && data.length >= 0) {
        setTableData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            qa_inspector_status: item.qa_inspector_status,
            manager_status: item.manager_status,
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
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  // Table Details
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
      key: "date",
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
      title: "QA Inspector",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      align: "center",
    },
    {
      title: "QA Manager/MR/Designee Status",
      dataIndex: "manager_status",
      key: "manager_status",
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

  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    navigate("/Precot/QA/F-26", {
      state: {
        date: date,
      },
    });
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {printResponseData?.map((data, index) => (
          <table
            style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
          >
            <br />
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="20" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="55" rowSpan="4" style={{ textAlign: "center" }}>
                  TEMPLATE FOR RECALL / MOCK RECALL
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="25">PH-QAD01/F-026</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="25">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="25">PH-QAD01-D-24</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="25">
                  {index + 1} of {printResponseData.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan="55" style={{ textAlign: "center" }}>
                  Parameters
                </th>
                <th colSpan="60" style={{ textAlign: "center" }}>
                  Details
                </th>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Date
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {formattedDate(data.date)}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Product Name
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.product_name}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Customer Name
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.customer_name}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  PO No. & Date
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.po_no_and_date}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Lot No. / Batch No.
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.lot_no}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Reason for (Recall)
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.reason_for_recall}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Manufacturing Date/Julian Date
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {formattedDate(data.manufacturing_date)}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Expiry Date
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {formattedDate(data.expiry_date)}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Quantity Produced
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.quality_produced}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Total Shipped Qty.
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.total_shipped_qty}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Dispatch Date
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {formattedDate(data.dispatch_date)}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Container No.
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.container_no}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Qty. in FG Warehouse at Precot
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.qty_in_fg}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Qty. Received on purchase invoice
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.qty_received}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Quantity sold (customer)
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.qty_sold}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Quantity Undistributed / stock in hand
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.qty_undistributed}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Members present in the meeting
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.members_present}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Informed to customer
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.informed_to_customer}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Qty. in Depot (Customer)
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.qty_in_depot}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Time taken to trace
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.time_taken_to_trace}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Further Action
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.further_action}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{}}>
                  Conclusion:
                </th>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {data.conclusuion}
                </td>
              </tr>
              <tr>
                <th colSpan="55" style={{ textAlign: "center" }}>
                  <b>Prepared by:</b>
                </th>
                <th colSpan="60" style={{ textAlign: "center" }}>
                  <b>Verify by:</b>
                </th>
              </tr>
              <tr>
                <td colSpan="55" style={{ textAlign: "center" }}>
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
                      alt={`QA Inspector Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "40px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData?.[index]?.qa_inspector_sign || ""}
                  <br />
                  {formattedDateWithTime(
                    printResponseData?.[index]?.qa_inspector_submitted_on
                  )}
                </td>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  {getImage2[index] && (
                    <img
                      src={getImage2[index]}
                      alt={`HOD/Designee Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "40px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData?.[index]?.manager_sign || ""}
                  <br />
                  {formattedDateWithTime(
                    printResponseData?.[index]?.manager_submitted_on
                  )}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="25">Particulars</th>
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
          formName="TEMPLATE FOR RECALL / MOCK RECALL"
          formatNo="PH-QAD01/F-026"
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
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={formattedToday}
              size="small"
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
          columns={columns}
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
            Year:
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={(value) => setYearPrint(value)}
            style={{ width: "100%" }}
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
            onChange={(value) => setMonthPrint(value)}
            style={{ width: "100%" }}
            placeholder="Search Month"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Month
            </Select.Option>
            {monthOptions.map((option) => (
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

export default QA_f26_Summary;
