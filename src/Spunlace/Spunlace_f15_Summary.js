/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
  message,
  Input,
  Modal,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BiLock, BiNavigation } from "react-icons/bi";
import BleachingTail from "../Components/BleachingTail.js";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { GrAdd } from "react-icons/gr";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import "../index.css";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const Spunlace_f15_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [bmrOptions, setBmrOptions] = useState("");
  const [navPage, setNavPage] = useState({ date: "", shift: "" });
  const [messageApi, contextHolder] = message.useMessage();
  const today = new Date().toISOString().split("T")[0];
  const [summaryData, setSummaryData] = useState("");
  const [reason, setReason] = useState(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [eSign, setESign] = useState({
    supervisor_sign: "",
    hod_sign: "",
  });
  const [printRecord, setPrintRecord] = useState({
    formatName: "RP BALE PRESS STOPPAGE REPORT",
    formatNo: "PH-PRD02/F-015",
    revisionNo: 1,
    refSopNo: "PH-PRD02-D-03",
    unit: "Unit H",
    date: "",
    supervisor_sign: "",
    supervisor_submit_on: "",
    supervisor_status: "",
    hod_sign: "",
    hod_submit_on: "",
    hod_status: "",
    stoppageReport: [],
  });
  const [printParam, setPrintParam] = useState({
    date: "",
    shift: "",
    orderNo: "",
  });
  const initialized = useRef(false);
  const initial = useRef(false);
  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      if (
        userRole !== "ROLE_SUPERVISOR" &&
        userRole !== "ROLE_HOD" &&
        userRole !== "ROLE_DESIGNEE"
      ) {
        message.warning(userRole + " does not have access to this form");
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1000);
      }
    }
  }, []);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          let response;

          response = await axios.get(
            `${ API.prodUrl}/Precot/api/spulance/report/hodSummaryF015`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [userRole, token]);

  useEffect(() => {
    if (printRecord.stoppageReport.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintRecord((prevState) => ({
          ...prevState,
          stoppageReport: [],
        }));
        setPrintButtonLoading(false);
      }, 2000);
      setESign((prevState) => ({
        ...prevState,
        supervisor_sign: null,
        hod_sign: null,
      }));
    }
  }, [printRecord.stoppageReport]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (data.hod_status == "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);
  const handlePrint = async () => {
    if (printParam.date == "" || printParam.date == null) {
      message.warning("Please select date");
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spulance/report/printRPBalePressStopage?date=${printParam.date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length > 0) {
        const data = response.data[0];
        setPrintRecord((prevState) => ({
          ...prevState,
          supervisor_sign: data.supervisor_sign,
          supervisor_submit_on: data.supervisor_submit_on,
          supervisor_status: data.supervisor_status,
          hod_sign: data.hod_sign,
          hod_submit_on: data.hod_submit_on,
          hod_status: data.hod_status,
        }));
        fetchData();
      } else {
        setPrintButtonLoading(false);
        message.warning(response.data.message);
      }
    } catch (error) {
      setPrintButtonLoading(false);
      console.error("Error fetching initial data:", error);
      message.error(error.response?.data?.message || "An error occurred.");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = printRecord[key];
      if (username) {
        // console.log("usernameparams", username);

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
            // console.log("Response:", res.data);
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
          .catch((err) => {
            // console.log("Error in fetching image:", err);
          });
      }
    });
  }, [printRecord.stoppageReport]);

  const fetchData = async () => {
    // console.log("Print response api called")
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spulance/aggregatedResults?date=${printParam.date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length > 0) {
        // console.log("If part entered")
        const printArray = response.data;
        setPrintRecord((prevState) => ({
          ...prevState,
          stoppageReport: printArray,
        }));
      }
    } catch (error) {
      setPrintButtonLoading(false);
      console.error("Error fetching stoppage report:", error);
    }
  };

  const handleEdit = (record) => {
    if (record.date == "" || record.date == null) {
      message.warning("No data for Date");
      return;
    }
    navigate(`/Precot/Spunlace/F-15`, {
      state: {
        date: record.date,
      },
    });
  };

  const handleDate = (e) => {
    setNavPage((prevState) => ({
      ...prevState,
      date: e.target.value,
    }));
  };

  const handleOk = () => {
    if (navPage.date == "" || navPage.date == null) {
      message.warning("Please Select Date!");
      return;
    }
    navigate(`/Precot/Spunlace/F-15`, {
      state: {
        date: navPage.date,
      },
    });
  };
  //   ----------------------------- Summary Table --------------------------
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
      render: (text) => formatDate(text),
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },

    {
      title: "Actions",
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
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
  } else {
    columns = baseColumns;
  }
  // ---------------------------------------------------------------------------
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatPrintDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrintCancel = () => {
    setPrintParam((prevState) => ({
      ...prevState,
      date: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const handlePrintDate = (e) => {
    setPrintParam((prevState) => ({
      ...prevState,
      date: e.target.value,
    }));
  };
  const entriesPerPage = 10;
  const stoppageReport = [];
  let numberOfPages = Math.ceil(
    printRecord.stoppageReport.length / entriesPerPage
  );

  if (printRecord || printRecord.stoppageReport.length > 0) {
    for (
      let i = 0;
      i < printRecord.stoppageReport.length;
      i += entriesPerPage
    ) {
      stoppageReport.push(
        printRecord.stoppageReport.slice(i, i + entriesPerPage)
      );
    }
  }
  return (
    // id="section-to-print-san"
    <div>
      <style>
        {`
                *{
                font-family:Arial, Helvetica, sans-serif;
                }
                .head{
                }

    `}
      </style>
      <div id="section-to-print-san" style={{ scale: "87%" }}>
        {stoppageReport.map((bodyContent, pageIndex) => (
          <table style={{ scale: "97%" }}>
            <thead>
              <tr>
                <th
                  className="head"
                  rowspan="4"
                  style={{ textAlign: "center", width: "15%" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "100px",
                      height: "auto",
                      textAlign: "center",
                    }}
                  />
                  <br /> Unit H
                </th>
                <th
                  className="head"
                  rowspan="4"
                  style={{ textAlign: "center", fontSize: "14px" }}
                  colSpan={5}
                >
                  RP Bale Press Stoppage Report
                </th>
                <th className="head" colSpan={3}>
                  Format No.:
                </th>
                <th
                  className="head"
                  style={{ border: "1px solid black", padding: "8px" }}
                  colSpan={3}
                >
                  PH-PRD02/F-015
                </th>
              </tr>
              <tr>
                <th className="head" colSpan={3}>
                  Revision No.:
                </th>
                <th
                  className="head"
                  style={{ border: "1px solid black", padding: "8px" }}
                  colSpan={3}
                >
                  01
                </th>
              </tr>
              <tr>
                <th className="head" colSpan={3}>
                  Ref. SOP No.:
                </th>
                <th className="head" style={{ padding: "8px" }} colSpan={3}>
                  PH-PRD02-D-03
                </th>
              </tr>
              <tr>
                <th className="head" colSpan={3}>
                  Page No.:
                </th>
                <th className="head" style={{ padding: "8px" }} colSpan={3}>
                  {pageIndex + 1} of {numberOfPages}
                </th>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  DATE
                </th>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  SHIFT
                </th>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  ORDER NO
                </th>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  NO OF BALES
                </th>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  PROD. IN KG
                </th>
                <th colspan="3" style={{ textAlign: "center", width: "15%" }}>
                  DOWN TIME IN MIN
                </th>
                <th colspan="3" style={{ textAlign: "center", width: "15%" }}>
                  BREAK DOWN IN MIN
                </th>
              </tr>
              <tr>
                <th style={{ textAlign: "center" }}>GR CLEAN</th>
                <th style={{ textAlign: "center" }}>MIS.</th>
                <th style={{ textAlign: "center" }}>OTHERS</th>
                <th style={{ textAlign: "center" }}>ER IN MIN</th>
                <th style={{ textAlign: "center" }}>MR IN MIN</th>
                <th style={{ textAlign: "center" }}>TOTAL</th>
              </tr>
            </thead>

            <tbody>
              {bodyContent.map((row, rowIndex) => (
                <tr>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {pageIndex == 0
                      ? rowIndex + 1
                      : rowIndex + 1 + pageIndex * 10}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {formatDate(printParam.date)}
                  </td>
                  <td style={{ textAlign: "center" }}>{row.ShiftID}</td>
                  <td style={{ textAlign: "center" }}>{row.POrder}</td>
                  <td style={{ textAlign: "center" }}>
                    {row.BaleCount == null ? "N/A" : row.BaleCount}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {row.TotalNetWeight == null ? "N/A" : row.TotalNetWeight}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {row.CG_Hours == null ? "N/A" : row.CG_Hours}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {row.MI_Hours == null ? "N/A" : row.MI_Hours}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {row.Others_Hours == null ? "N/A" : row.Others_Hours}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {row.ER_Hours == null ? "N/A" : row.ER_Hours}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {row.MR_Hours == null ? "N/A" : row.MR_Hours}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {row.Total_Hours == null ? 0 : row.Total_Hours}
                  </td>
                </tr>
              ))}
              ;
              <tr>
                <td
                  style={{
                    paddingTop: "5px",
                    borderBottom: "none",
                    width: "50%",
                    textAlign: "center",
                  }}
                  colSpan="4"
                >
                  {" "}
                  &nbsp;&nbsp;&nbsp; Production Supervisor Sign & Date{" "}
                </td>
                <td
                  style={{
                    paddingTop: "5px",
                    borderBottom: "none",
                    width: "50%",
                    textAlign: "center",
                  }}
                  colSpan="8"
                >
                  {" "}
                  &nbsp;&nbsp;&nbsp; HOD/Designee Sign & Date{" "}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    display: "table-cell",
                    verticalAlign: "bottom",
                    paddingTop: "15px",
                    borderTop: "none",
                    textAlign: "center",
                  }}
                  colSpan="4"
                >
                  {eSign.supervisor_sign ? (
                    <img
                      src={eSign.supervisor_sign}
                      alt="Supervisor eSign"
                      style={{
                        width: "100px",
                        height: "50px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : null}
                  <br></br>
                  {printRecord.supervisor_sign} <br></br>{" "}
                  {formatPrintDate(printRecord.supervisor_submit_on)}{" "}
                </td>
                <td
                  style={{
                    display: "table-cell",
                    verticalAlign: "bottom",
                    paddingTop: "15px",
                    borderTop: "none",
                    textAlign: "center",
                  }}
                  colSpan="8"
                >
                  {eSign.hod_sign ? (
                    <img
                      src={eSign.hod_sign}
                      alt="HOD eSign"
                      style={{
                        width: "100px",
                        height: "50px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : null}
                  <br></br>
                  {printRecord.hod_sign} <br></br>{" "}
                  {formatPrintDate(printRecord.hod_submit_on)}{" "}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>

              <tr>
                <td style={{ textAlign: "center" }} colspan={2}>
                  Particulars
                </td>
                <td style={{ textAlign: "center" }} colSpan={2}>
                  Prepared By
                </td>
                <td style={{ textAlign: "center" }} colSpan={4}>
                  Reviewed By
                </td>
                <td style={{ textAlign: "center" }} colSpan={4}>
                  Approved By
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} colspan={2}>
                  Name
                </td>
                <td style={{}} colSpan={2}></td>
                <td style={{}} colSpan={4}></td>
                <td style={{}} colSpan={4}></td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} colspan={2}>
                  Signature & Date
                </td>
                <td style={{}} colSpan={2}></td>
                <td style={{}} colSpan={4}></td>
                <td style={{}} colSpan={4}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>
      <BleachingHeader
        formName={"RP BALE PRESS STOPPAGE REPORT"}
        formatNo={"PH-PRD02/F-015"}
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
            data
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
      <Modal
        title="RP Bale Press Stoppage Report (Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handlePrint}
            loading={printButtonLoading}
          >
            OK
          </Button>,
        ]}
      >
        <label>
          Date
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :{" "}
        </label>
        <Input
          type="date"
          onChange={handlePrintDate}
          style={{
            width: "150px",
            marginLeft: 10,
            textAlign: "center",
          }}
          max={today}
        ></Input>
      </Modal>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <label style={{ marginTop: "8px" }}>Date : </label>
        <Input
          type="date"
          onChange={handleDate}
          style={{ width: "150px" }}
          max={today}
        />
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={handleOk}
        >
          Go To
        </Button>
      </div>
      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={summaryData}
      />
    </div>
  );
};

export default Spunlace_f15_Summary;
