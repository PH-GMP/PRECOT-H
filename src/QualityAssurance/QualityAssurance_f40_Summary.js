/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Select, Table, Tooltip, message, Input, Modal } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  BiBorderLeft,
  BiBorderNone,
  BiBorderRight,
  BiLock,
  BiNavigation,
} from "react-icons/bi";
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
import { createGlobalStyle } from "styled-components";

const QualityAssurance_f40_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
    shift: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
  });
  const [printLov, setPrintLov] = useState({
    monthLov: [],
    yearLov: [],
  });
  const [eSign, setESign] = useState({});
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
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
    });
  }, [token, printData]);
  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/F040/GETALL`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (data.qc_status == "QA_MANAGER_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);
  //---------------------------------------------------------------------------

  // ---------------------------- Summary Table Column -------------------------
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
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "QA Inspector Status",
      dataIndex: "ins_status",
      key: "ins_status",
      align: "center",
    },
    {
      title: "QA Manager / Designee Status",
      dataIndex: "qc_status",
      key: "qc_status",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleEdit = (record) => {
    navigate(`/Precot/QualityAssurance/F-040`, {
      state: {
        date: record.date,
        shift: record.shift,
      },
    });
  };

  const handlePrint = async () => {
    if (printParams.year == "" && printParams.month == "") {
      message.warning("Please Select Atleast One Field");
      return;
    }
    if (printParams.month !== "" && printParams.year == "") {
      message.warning("Please Select The Year");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/F040/print?month=${printParams.month}&year=${printParams.year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == "") {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      const mergedArray = response.data.flatMap((item) => {
        const {
          productionSampleA,
          productionSampleB,
          ins_sign,
          ins_submit_on,
          qc_sign,
          qc_submit_on,
        } = item;
        const maxLength = Math.max(
          productionSampleA.length,
          productionSampleB.length
        );

        const mergedSamples = Array.from({ length: maxLength }).map(
          (_, index) => ({
            ...productionSampleA[index],
            ...productionSampleB[index],
            ins_sign,
            ins_submit_on,
            qc_sign,
            qc_submit_on,
          })
        );

        return mergedSamples;
      });

      const uniqueSigns = new Set();

      const fetchSignatures = async () => {
        for (const entry of response.data) {
          const { qc_sign, ins_sign } = entry;

          if (ins_sign && !uniqueSigns.has(ins_sign)) {
            uniqueSigns.add(ins_sign);
            fetchSignature(ins_sign, ins_sign);
          }
          if (qc_sign && !uniqueSigns.has(qc_sign)) {
            uniqueSigns.add(qc_sign);
            fetchSignature(qc_sign, qc_sign);
          }
        }
      };

      await fetchSignatures();

      setPrintData(mergedArray);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (printData.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, [4000]);
    }
  }, [printData]);

  const fetchSignature = async (sign, key) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/image?username=${sign}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const url = `data:image/jpeg;base64,${base64}`;
      setESign((prevSign) => ({
        ...prevSign,
        [key]: url,
      }));
    } catch (err) {}
  };

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      year: "",
      month: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const handleFormParam = (value, key) => {
    setFormParams((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handlePrintParams = (value, name) => {
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name == "year") {
      setPrintParams((prevState) => ({
        ...prevState,
        month: "",
      }));
    }
  };
  const handleGo = () => {
    if (formParams.date == "") {
      message.warning("Please Select The Date");
      return;
    }
    if (formParams.shift == "") {
      message.warning("Please Select The Shift");
      return;
    }
    navigate(`/Precot/QualityAssurance/F-040`, {
      state: {
        date: formParams.date,
        shift: formParams.shift,
      },
    });
  };

  const shiftLov = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    let years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ value: year, label: year.toString() });
    }
    const currentMonth = new Date().getMonth() + 1;
    const allMonths = [
      { value: "01", label: "JAN" },
      { value: "02", label: "FEB" },
      { value: "03", label: "MAR" },
      { value: "04", label: "APR" },
      { value: "05", label: "MAY" },
      { value: "06", label: "JUN" },
      { value: "07", label: "JUL" },
      { value: "08", label: "AUG" },
      { value: "09", label: "SEP" },
      { value: "10", label: "OCT" },
      { value: "11", label: "NOV" },
      { value: "12", label: "DEC" },
    ];

    const filteredMonthBasedOnYear = allMonths.filter(
      (month) => parseInt(month.value) <= currentMonth
    );
    const months =
      printParams.year == currentYear ? filteredMonthBasedOnYear : allMonths;
    setPrintLov((prevState) => ({
      ...prevState,
      yearLov: years,
      monthLov: months,
    }));
  }, [printParams.year]);
  const GlobalStyle = createGlobalStyle`
    @media print {

    @page {
      size: A3 landscape;
    }

      body {
        -webkit-print-color-adjust: exact;
        width: 100%;
        height: 100%;
        transform: scale(0.8); /* Adjust scale as needed */
        transform-origin: top left right bottom; /* Adjust the origin if needed */
      }
    }
                      .page-break {
                page-break-after: always;
            }
  `;

  return (
    <>
      <div id="section-to-print">
        <GlobalStyle />

        <div className="page-break">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "20px" }}></td>
              </tr>
              <tr>
                <td rowSpan={4} colSpan={3}>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{
                        width: "80px",
                        height: "auto",
                        textAlign: "center",
                      }}
                    />
                    <br></br>
                    <br></br>

                    <p style={{ fontFamily: "Times New Roman" }} colSpan={3}>
                      {" "}
                      Unit H
                    </p>
                  </div>
                </td>

                <td
                  style={{
                    padding: "0.5em",
                    textAlign: "center",
                    fontWeight: "bold",
                    width: "60%",
                  }}
                  colSpan={9}
                  rowSpan={4}
                >
                  PRODUCTION RETAINED SAMPLE REGISTER
                </td>
                <td style={{ padding: "0.5em" }} colSpan={3}>
                  Format No.:
                </td>
                <td style={{ padding: "0.5em" }} colSpan={3}>
                  PH-QAD01-F-040
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }} colSpan={3}>
                  Revision No.:
                </td>
                <td style={{ padding: "0.5em" }} colSpan={3}>
                  01
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }} colSpan={3}>
                  Ref. SOP No.:
                </td>
                <td style={{ padding: "0.5em" }} colSpan={3}>
                  PH-QAD01-D-36
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }} colSpan={3}>
                  Page No.:
                </td>
                <td style={{ padding: "0.5em" }} colSpan={3}></td>
              </tr>
              <tr>
                <td style={{ border: "none", padding: "10px" }}></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center", width: "5px" }} rowSpan={2}>
                  S.No.
                </td>
                <td
                  style={{ textAlign: "center", padding: "10px" }}
                  rowSpan={2}
                >
                  Date
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Shift
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  FG No. / <br /> Batch No.
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Product <br /> Description
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Quantity <br /> in Nos
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Box <br /> No.
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Sample <br /> Disposal <br /> Date
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Sample <br /> Retained <br /> by
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Approved <br /> by <br></br>(QA Manager/ <br /> Designee)
                </td>
                <td style={{ textAlign: "center" }} colSpan={2}>
                  Sample Disposal <br /> Details
                </td>
                <td style={{ textAlign: "center" }} colSpan={5}>
                  Sample Issue / Opening & Returning Details
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Remark
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  Disposal <br /> Method
                </td>
                <td style={{ textAlign: "center" }}>
                  Disposed <br /> by
                </td>
                <td style={{ textAlign: "center" }}>
                  Bag <br /> Opened on
                </td>
                <td style={{ textAlign: "center" }}>Reason</td>
                <td style={{ textAlign: "center" }}>
                  Requested <br /> by{" "}
                </td>
                <td style={{ textAlign: "center" }}>
                  Approved <br /> by
                </td>
                <td style={{ textAlign: "center" }}>
                  Received <br /> by
                </td>
              </tr>
              {printData.map((data, pageIndex) => (
                <tr>
                  <td style={{ textAlign: "center" }}>{pageIndex + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.fgNoBatchNo ? formatDate(data.date) : "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.fgNoBatchNo ? data.shift : "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.fgNoBatchNo || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.productDescription || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.quantityInNos || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>{data.boxNo || "NA"}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.fgNoBatchNo
                      ? formatDate(data.sampleDisposalDate)
                      : "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {data.fgNoBatchNo ? (
                      eSign[data.ins_sign] ? (
                        <img
                          src={eSign[data.ins_sign]}
                          alt="Operator eSign"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null
                    ) : null}
                    <br />
                    {data.fgNoBatchNo ? data.ins_sign : "NA"}
                    <br />
                    {data.fgNoBatchNo
                      ? formatDateAndTime(data.ins_submit_on)
                      : null}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {data.fgNoBatchNo ? (
                      eSign[data.qc_sign] ? (
                        <img
                          src={eSign[data.qc_sign]}
                          alt="Operator eSign"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null
                    ) : null}
                    <br />
                    {data.fgNoBatchNo ? data.qc_sign : "NA"}
                    <br />
                    {data.fgNoBatchNo
                      ? formatDateAndTime(data.qc_submit_on)
                      : null}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.disposalMethod || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.disposedBy || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {formatDate(data.bagOpenedOn) || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>{data.reason || "NA"}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.requestedBy || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.approvedBy || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.receivedBy || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.remarks || "NA"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ border: "none", padding: "10px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colSpan={3}>
                  Particulars
                </td>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan={4}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan={5}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }} colSpan={6}>
                  Approved By
                </td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colSpan={3}>
                  Name
                </td>
                <td style={{ padding: "1em" }} colSpan={4}></td>
                <td style={{ padding: "1em" }} colSpan={5}></td>
                <td style={{ padding: "1em" }} colSpan={6}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colSpan={3}>
                  Signature & Date
                </td>
                <td style={{ padding: "1em" }} colSpan={4}></td>
                <td style={{ padding: "1em" }} colSpan={5}></td>
                <td style={{ padding: "1em" }} colSpan={6}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <BleachingHeader
        formName={"PRODUCTION RETAINED SAMPLE REGISTER"}
        formatNo={"PH-QAD01-F-040"}
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
      <Modal
        title="PRODUCTION RETAINED SAMPLE REGISTER (Print)"
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
        <span style={{ marginRight: "10px", marginLeft: "10px" }}>
          {" "}
          Year :{" "}
        </span>
        <Select
          options={printLov.yearLov}
          value={printParams.year}
          style={{ textAlign: "center", width: "200px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "year");
          }}
        ></Select>

        <br></br>
        <br />
        <span style={{ marginRight: "10px", marginLeft: "2px" }}>
          {" "}
          Month :{" "}
        </span>
        <Select
          options={printLov.monthLov}
          value={printParams.month}
          style={{ textAlign: "center", width: "200px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "month");
          }}
        ></Select>
      </Modal>
      <div style={{ margin: "10px" }}>
        <span> Date </span>
        <Input
          type="date"
          style={{ textAlign: "center", width: "150px" }}
          onChange={(e) => {
            handleFormParam(e.target.value, "date");
          }}
          max={today}
        ></Input>
        <span style={{ marginLeft: "5px" }}>Shift</span>
        <Select
          options={shiftLov}
          style={{ textAlign: "center", width: "150px", marginLeft: "5px" }}
          onChange={(e) => {
            handleFormParam(e, "shift");
          }}
          dropdownStyle={{ textAlign: "center" }}
        ></Select>
        <Button
          key="go"
          onClick={handleGo}
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          type="primary"
        >
          Go To
        </Button>
      </div>
      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default QualityAssurance_f40_Summary;
