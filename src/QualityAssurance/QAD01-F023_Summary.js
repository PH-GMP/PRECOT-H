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
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f23_Summary = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [yearPrint, setYearPrint] = useState("");
  const [Supplier, setSupplier] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2040);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.hod_sign;
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
            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {})
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.qa_manager_sign;
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
            setGetImage2((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {})
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.plant_head_sign;
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
            setGetImage3((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {})
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);

  const handleYearPrintChange = (value) => {
    setYearPrint(value);
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

  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (data.qa_manager_status === "QA_MR_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);

  useEffect(() => {
    fetchData();
  }, []);

  //   handle edit
  const handleEdit = (record) => {
    const { date, Supplier } = record;

    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QA/F-23", {
      state: {
        date: formattedDate,
        supplierName: Supplier,
      },
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };
  const role = localStorage.getItem("role");
  const fetchData = async () => {
    if (
      role == "ROLE_HOD" ||
      role == "ROLE_MR" ||
      role == "QA_MANAGER" ||
      role == "QA_DESIGNEE"
    ) {
      try {
        const token = localStorage.getItem("token");

        // Check if the role is not "role_hod", navigate to the chosen screen

        const apiUrl = `${API.prodUrl}/Precot/api/QA/Service/supplierAuditReport/getSupplierAuditReportSummary`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data && Array.isArray(data)) {
          if (data.length > 0) {
            setTableData(
              data.map((item, index) => ({
                key: item.header_id,
                date: item.reportDate,
                Supplier: item.supplierName,
                auditorStatus: item.auditorStatus,
                supplierStatus: item.supplierStatus,
                hod_status: item.hod_status,
                id: item.id,
                sno: index + 1,
                reason: item.reason,
              }))
            );
          } else {
            message.error("No records found.");
          }
        } else if (data && data.message) {
          message.error(data.message);
          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 1500);
        } else {
          message.error("Unexpected response from the server.");
        }
      } catch (error) {
        message.error("Error fetching data: " + error.message);
      }
    }
  };

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
      title: "Supplier Name",
      dataIndex: "Supplier",
      key: "Supplier",
      align: "center",
    },

    {
      title: "Auditor Status",
      dataIndex: "auditorStatus",
      key: "auditorStatus",
      align: "center",
    },
    {
      title: "Supplier Status",
      dataIndex: "supplierStatus",
      key: "supplierStatus",
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
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }
  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 100);
    }
  }, [printResponseData]);

  const fetchPrintValue = (value) => {
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/qa/getdetailsForPrintIncidence?year=${yearPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.body.message !== "No data") {
            const printResponseData = res.data.body;
            setPrintResponseData(printResponseData);
          } else {
            message.error("No data");
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }

    if (Supplier == "" || Supplier == "") {
      message.warning("Please Enter Supplier");
      return;
    }
    navigate("/Precot/QA/F-23", {
      state: {
        date: date,
        supplierName: Supplier,
      },
    });
  };

  return (
    <div>
      <div id="section-to-print">
        <table style={{ marginTop: "10px", scale: "94%" }}>
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
                Supplier Audit Report
              </th>
              <td colSpan="15">Format No.:</td>
              <td colSpan="15">PH-QAD01/F-023</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No.:</td>
              <td colSpan="15">01</td>
            </tr>
            <td colSpan="15">Ref. SOP No.:</td>
            <td colSpan="15">PH-QAD01-D-22</td>
            <tr>
              <td colSpan="15">Page No.:</td>
              <td colSpan="15">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="115"></td>
            </tr>
          </thead>
          <br />
          <tbody>
            <tr>
              <td colSpan="115">Date:</td>
            </tr>
            <tr>
              <td colSpan="70">Supplier Name:</td>
              <td colSpan="45" rowspan="3">
                Address:{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="70">Supplier’s Representative: </td>
            </tr>
            <tr>
              <td colSpan="70">Auditor(s): </td>
            </tr>

            <tr>
              <td colSpan="115">
                Objectives: <br />
              </td>
            </tr>
            <tr>
              <td colSpan="115">
                Scope: <br />
              </td>
            </tr>
            <tr>
              <td colSpan="115">
                Methodology:
                <br />
              </td>
            </tr>
            <tr>
              <td colSpan="115">
                Areas Audited:
                <br />
              </td>

              <br />
            </tr>

            <tr>
              <td colSpan="115">
                Attachments:
                <br />
              </td>
            </tr>
            <tr>
              <td colSpan="115">observation:</td>
            </tr>

            <tr>
              <td colSpan={60} style={{ textAlign: "center" }}>
                Auditee
              </td>
              <td colSpan={55} style={{ textAlign: "center" }}>
                Auditor(s)
              </td>
            </tr>

            <tr>
              <td
                colSpan={60}
                style={{ textAlign: "center", height: "50px" }}
              ></td>
              <td colSpan={55} style={{ textAlign: "center" }}></td>
            </tr>
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

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="Supplier Audit Report"
          formatNo="PH-QAD01/F-023"
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
              style={{ width: "100%", height: "30px" }}
            />
          </Col>
          <Col style={{ display: "flex", alignItems: "center" }}>
            <label
              htmlFor="supplierInput"
              style={{ marginRight: "10px", minWidth: "100px" }}
            >
              Supplier Name:
            </label>
            <Input
              id="supplierInput"
              type="text"
              value={Supplier}
              onChange={(e) => setSupplier(e.target.value)}
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
            disabled={!yearPrint}
          >
            Submit
          </Button>,
        ]}
      >
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
            style={{ width: "100%" }}
            placeholder="Search Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              SelectYear
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

export default QA_f23_Summary;
