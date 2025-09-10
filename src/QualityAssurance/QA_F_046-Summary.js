/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, Tooltip, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
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
import "../index.css";

const QA_F_041_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
  });
  const [printLov, setPrintLov] = useState({
    monthLov: [],
    yearLov: [],
  });
  const [hodLov, setHodLov] = useState([]);
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
  const [eSign, setESign] = useState({
    qaManagerSubmitByTab2: "",
    qaManagerSubmitByTab3: "",
    qcSign: "",
    developmentSign: "",
    bleachingSign: "",
    SpunlaceSign: "",
    cottonBudsSign: "",
    padPunchingSign: "",
    qaSign: "",
    engineeringComments: "",
    ppcSign: "",
    wareHouseSign: "",
    othersSign: "",
    qaManagerSubmitByTab5: "",
    qaManagerSubmitByTab6: "",
    qaManagerSubmitByTab7: "",
    hodSubmitByTab8: "",
    qaManagerSubmitByTab8: "",
    hodSubmitByTab9: "",
    hodSubmitByTab10: "",
    hodSubmitByTab11: "",
    qaManagerOrDesigneeSubmitBy: "",
  });
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
      (month) => parseInt(month.value) <= currentMonth,
    );
    const months =
      printParams.year == currentYear ? filteredMonthBasedOnYear : allMonths;
    setPrintLov((prevState) => ({
      ...prevState,
      yearLov: years,
      monthLov: months,
    }));
  }, [printParams.year]);

  useEffect(() => {
    const fetchUserDataAndImages = () => {
      hodLov.forEach((user) => {
        const { value } = user;

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${value}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              responseType: "arraybuffer",
            },
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                "",
              ),
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setESign((prevSign) => ({
              ...prevSign,
              [value]: url,
            }));
          })
          .catch((err) => {});
      });
    };
    fetchUserDataAndImages();
  }, [token, hodLov]);

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
        },
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          "",
        ),
      );
      const url = `data:image/jpeg;base64,${base64}`;
      setESign((prevSign) => ({
        ...prevSign,
        [key]: url,
      }));
    } catch (err) {}
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "qa_inspector_sign",
      "qa_mr_sign",
      "qaManagerSubmitByTab2",
      "qaManagerSubmitByTab3",
      "qcSign",
      "wareHouseSign",
      "developmentSign",
      "bleachingSign",
      "SpunlaceSign",
      "cottonBudsSign",
      "padPunchingSign",
      "qaSign",
      "engineeringComments",
      "ppcSign",
      "othersSign",
      "qaManagerSubmitByTab5",
      "qaManagerSubmitByTab6",
      "qaManagerSubmitByTab7",
      "hodSubmitByTab8",
      "qaManagerSubmitByTab8",
      "hodSubmitByTab9",
      "hodSubmitByTab10",
      "hodSubmitByTab11",
      "qaManagerOrDesigneeSubmitBy",
    ];
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
            },
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                "",
              ),
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
  }, [token, printData.body?.qaManagerOrDesigneeSubmitBy]);
  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          let apiUrl;
          apiUrl = `${API.prodUrl}/Precot/api/qa/getSummaryBatchReleaseNotes`;
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response?.data?.message || "Error fetching data");
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (data.qa_mr_status == "QA_MR_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);

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
      title: "QA Manager/Designee",
      dataIndex: "qaManagerOrDesigneeStatus",
      key: "qaManagerOrDesigneeStatus",
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
    navigate(`/Precot/QualityAssurance/QA_F_046`, {
      state: {
        date: record.date,
      },
    });
  };

  const handlePrint = async () => {
    if (printParams.year == "" || printParams.year == null) {
      message.warning("Please Select The Year");
      return;
    }
    if (printParams.month == "" || printParams.month == null) {
      message.warning("Please Select The month");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/getdetailsForPrintBatchReleaseNotes?year=${printParams.year}&month=${printParams.month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.message == 0) {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      const uniqueSigns = new Set();

      const fetchSignatures = async () => {
        try {
          const uniqueSigns = new Set();

          for (const entry of response.data.body) {
            Object.keys(eSign).forEach((signKey) => {
              const signValue = entry[signKey];

              if (signValue && !uniqueSigns.has(signValue)) {
                uniqueSigns.add(signValue);
                fetchSignature(signValue, signValue);
              }
            });
          }
          const body = response?.data?.body;

          if (Array.isArray(body) && body.length > 0) {
            setPrintData(body[0]); // Take the first record
          } else if (body?.success === true && body?.message === "No data") {
            message.warning("No data available to print");
          } else {
            message.error("Unexpected response from server");
          }
        } catch (error) {}
      };

      await fetchSignatures();

      const body = response?.data?.body;

      if (Array.isArray(body) && body.length > 0) {
        setPrintData(body[0]); // Take the first record
      } else if (body?.success === true && body?.message === "No data") {
        message.warning("No data available to print");
      } else {
        message.error("Unexpected response from server");
      }

      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, 2000);
    } catch (error) {
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };
  //
  //   useEffect(() => {
  //     if (printData.length > 0) {
  //       setTimeout(() => {
  //         window.print();
  //         setPrintButtonLoading(false);
  //       }, [4000]);
  //     }
  //   }, [printData]);

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      year: "",
      month: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const handleGo = () => {
    if (formParams.date == "") {
      message.warning("Please Select The Date");
      return;
    }
    navigate(`/Precot/QualityAssurance/QA_F_046`, {
      state: {
        date: formParams.date,
      },
    });
  };

  const handleParams = (value, key, state) => {
    if (state == "form") {
      setFormParams((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
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

  const GlobalStyle = createGlobalStyle`
    @media print {
      @page {
        size: Portrait;
      }
      body {
        -webkit-print-color-adjust: exact;
        width: 100%;
        height: 100%;
        transform: scale(0.9); /* Adjust scale as needed */
        transform-origin: top left right bottom; /* Adjust the origin if needed */
      }
    }
                      .page-break {
                page-break-after: always;
            }
  `;

  const recordsPerPage = 8;
  const RecordsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1); // Optional: Not required if auto paginating

  // Sequential page counter
  let pageNumber = 1;
  const totalPages = Math.ceil(
    printData?.batchreleasenoteslines?.length / recordsPerPage,
  );

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };
  return (
    <>
      <div id="section-to-print">
        <GlobalStyle />

        {/* {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          > */}
        {/* {printData.map((record, dateIndex) => {
        const lines = record.batchreleasenoteslines || [];
        const pagesForThisDate = Math.ceil(lines.length / RecordsPerPage);

        const pages = Array.from({ length: pagesForThisDate }, (_, pageIndex) => {
          const start = pageIndex * RecordsPerPage;
          const paginatedLines = lines.slice(start, start + RecordsPerPage);

          const currentPageNum = pageNumber;
          pageNumber++; // Increment page number for each rendered page
          <div key={`date-${dateIndex}-page-${pageIndex}`} className="print-page">
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr>
                  <td style={{ border: "none", padding: "20px" }}></td>
                </tr>
                <tr>
                  <td rowSpan={4} colSpan={1}>
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

                      <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                    </div>
                  </td>

                  <td
                    style={{
                      padding: "0.5em",
                      textAlign: "center",
                      fontWeight: "bold",
                      width: "60%",
                    }}
                    colSpan={4}
                    rowSpan={4}
                  >
                    BATCH RELEASE NOTE
                  </td>
                  <td style={{ padding: "0.5em" }}>Format No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QAD01/F-046</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Revision No.:</td>
                  <td style={{ padding: "0.5em" }}>01</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QAD01-D-43</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Page No.:</td>
                  <td style={{ padding: "0.5em" }}>
                    {" "}
                    {pageIndex + 1} of {totalPages}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
              </thead>
              <tbody style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "10%" }} colSpan={7}>
                    Date: {formatDate(printData.date)}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan={2}>
                    S. No.{" "}
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={2}>
                    BMR No.
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={2}>
                    Product Name
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={2}>
                    Batch No. / Lot No.
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Quantity (Kg)
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={2}>
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Total</td>
                  <td style={{ textAlign: "center" }}>Released</td>
                </tr>
                {paginateData(
                  printData?.batchreleasenoteslines,
                  pageIndex + 1
                ).map((dataline, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {index + 1 + pageIndex * recordsPerPage}
                    </td>
                    <td style={{ textAlign: "center" }}>{dataline.bmrNo}</td>
                    <td style={{ textAlign: "center" }}>
                      {dataline.productName}
                    </td>
                    <td style={{ textAlign: "center" }}>{dataline.lotNo}</td>
                    <td style={{ textAlign: "center" }}>{dataline.totalQty}</td>
                    <td style={{ textAlign: "center" }}>
                      {dataline.releasedQty}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {printData.qaManagerOrDesigneeSubmitBy} <br />
                      {formatDateAndTime(
                        printData.qaManagerOrDesigneeSubmitOn
                      )}{" "}
                      <br />
                      {eSign[printData.qaManagerOrDesigneeSubmitBy] ? (
                        <img
                          src={eSign[printData.qaManagerOrDesigneeSubmitBy]}
                          alt="Operator eSign"
                          style={{
                            width: "100%",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={7} style={{ border: "none", padding: "10px" }}>
                    The above-mentioned Batches/Lots can be cleared for sale.
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Particulars</td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Prepared By
                  </td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Reviewed By
                  </td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Name</td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Signature & Date</td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
          })} */}
        {/* {printData.map((record, dateIndex) => { */}
        {/* {Array.isArray(printData) && printData.length > 0 && printData.map((record, dateIndex) => {
            const lines = record.batchreleasenoteslines || [];
            const pagesForThisDate = Math.ceil(lines.length / RecordsPerPage);
            
            
           
            
            return Array.from({ length: pagesForThisDate }, (_, pageIndex) => {
              const start = pageIndex * RecordsPerPage;
              const paginatedLines = lines.slice(start, start + RecordsPerPage);
              
              const currentPageNum = pageNumber; // Assign current page number
              pageNumber++;

              return (
                <div
                  key={`date-${dateIndex}-page-${pageIndex}`}
                  className="print-page"
                >
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      tableLayout: "fixed",
                    }}
                  >
                    <thead>
                      <tr>
                        <td style={{ border: "none", padding: "20px" }}></td>
                      </tr>
                      <tr>
                        <td rowSpan={4} colSpan={1}>
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
                            <br />
                            <br />
                            <p style={{ fontFamily: "Times New Roman" }}>
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
                          colSpan={4}
                          rowSpan={4}
                        >
                          BATCH RELEASE NOTE
                        </td>
                        <td style={{ padding: "0.5em" }}>Format No.:</td>
                        <td style={{ padding: "0.5em" }}>PH-QAD01/F-046</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5em" }}>Revision No.:</td>
                        <td style={{ padding: "0.5em" }}>01</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                        <td style={{ padding: "0.5em" }}>PH-QAD01-D-43</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.5em" }}>Page No.:</td>
                        <td style={{ padding: "0.5em" }}>
                  
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: "none", padding: "10px" }}></td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={7}>Date: {formatDate(record.date)}</td>{" "}
                      
                      </tr>
                      <tr>
                        <td style={{ textAlign: "center" }} rowSpan={2}>
                          S. No.
                        </td>
                        <td style={{ textAlign: "center" }} rowSpan={2}>
                          BMR No.
                        </td>
                        <td style={{ textAlign: "center" }} rowSpan={2}>
                          Product Name
                        </td>
                        <td style={{ textAlign: "center" }} rowSpan={2}>
                          Batch No. / Lot No.
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          Quantity (Kg)
                        </td>
                        <td style={{ textAlign: "center" }} rowSpan={2}>
                          Approved By
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "center" }}>Total</td>
                        <td style={{ textAlign: "center" }}>Released</td>
                      </tr>
                      {paginatedLines.map((dataline, index) => (
                        <tr key={index}>
                          <td style={{ textAlign: "center" }}>
                            {index + 1 + pageIndex * RecordsPerPage}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {dataline.bmrNo}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {dataline.productName}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {dataline.lotNo}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {dataline.totalQty}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {dataline.releasedQty}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {record.qaManagerOrDesigneeSubmitBy} <br />
                            {formatDateAndTime(
                              record.qaManagerOrDesigneeSubmitOn
                            )}{" "}
                            <br />
                            {eSign[record.qaManagerOrDesigneeSubmitBy] ? (
                              <img
                                src={eSign[record.qaManagerOrDesigneeSubmitBy]}
                                alt="Operator eSign"
                                style={{
                                  width: "100%",
                                  height: "70px",
                                  objectFit: "contain",
                                  mixBlendMode: "multiply",
                                }}
                              />
                            ) : null}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          colSpan={7}
                          style={{ border: "none", padding: "10px" }}
                        >
                          The above-mentioned Batches/Lots can be cleared for
                          sale.
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td style={{ border: "none", padding: "10px" }}></td>
                      </tr>
                      <tr>
                        <td style={{ padding: "1em" }}>Particulars</td>
                        <td
                          style={{ padding: "1em", textAlign: "center" }}
                          colSpan={2}
                        >
                          Prepared By
                        </td>
                        <td
                          style={{ padding: "1em", textAlign: "center" }}
                          colSpan={2}
                        >
                          Reviewed By
                        </td>
                        <td
                          style={{ padding: "1em", textAlign: "center" }}
                          colSpan={2}
                        >
                          Approved By
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "1em" }}>Name</td>
                        <td style={{ padding: "1em" }} colSpan={2}></td>
                        <td style={{ padding: "1em" }} colSpan={2}></td>
                        <td style={{ padding: "1em" }} colSpan={2}></td>
                      </tr>
                      <tr>
                        <td style={{ padding: "1em" }}>Signature & Date</td>
                        <td style={{ padding: "1em" }} colSpan={2}></td>
                        <td style={{ padding: "1em" }} colSpan={2}></td>
                        <td style={{ padding: "1em" }} colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              );
            });
          })} */}
        {Array.isArray(printData) && printData.length > 0 ? (
          printData.map((record, dateIndex) => {
            const lines = record.batchreleasenoteslines || [];
            const pagesForThisDate = Math.ceil(lines.length / RecordsPerPage);

            return Array.from({ length: pagesForThisDate }, (_, pageIndex) => {
              const start = pageIndex * RecordsPerPage;
              const paginatedLines = lines.slice(start, start + RecordsPerPage);

              const currentPageNum = pageNumber++;

              return (
                <div
                  key={`date-${dateIndex}-page-${pageIndex}`}
                  className="print-page"
                  style={{ pageBreakAfter: "always" }}
                >
                  <h3>Page {currentPageNum}</h3>
                  <h4>Date: {record.date}</h4>
                  <table border="1" style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>BMR No.</th>
                        <th>Product Name</th>
                        <th>Batch No. / Lot No.</th>
                        <th>Total Qty</th>
                        <th>Released Qty</th>
                        <th>Approved By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedLines.map((line, lineIndex) => (
                        <tr key={lineIndex}>
                          <td>{lineIndex + 1 + pageIndex * RecordsPerPage}</td>
                          <td>{line.bmrNo}</td>
                          <td>{line.productName}</td>
                          <td>{line.lotNo}</td>
                          <td>{line.totalQty}</td>
                          <td>{line.releasedQty}</td>
                          <td>{record.qaManagerOrDesigneeSubmitBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            });
          })
        ) : (
          <p>No data to display</p>
        )}
      </div>
      <BleachingHeader
        formName={"BATCH RELEASE NOTE"}
        formatNo={"PH-QAD01/F-046"}
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
        title="BATCH RELEASE NOTE (Print)"
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
        Date :
        <Input
          type="date"
          style={{ marginLeft: "5px", width: "150px", textAlign: "center" }}
          max={today}
          onChange={(e) => {
            handleParams(e.target.value, "date", "form");
          }}
        ></Input>
        <Button
          key="go"
          onClick={handleGo}
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "10px",
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

export default QA_F_041_Summary;
