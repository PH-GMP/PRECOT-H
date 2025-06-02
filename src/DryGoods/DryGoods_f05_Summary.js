/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  EditOutlined
} from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, Tooltip, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  BiLock,
  BiNavigation
} from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const DryGoods_f05_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [printOrder, setPrintOrder] = useState("");
  const [printParams, setPrintParams] = useState({
    date: "",
    shift: "",
  });
  const [formParams, setFormParams] = useState({
    date: "",
    shift: "",
    orderNos: "",
  });
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState({
    prodDetails: [],
    stoppage: [],
  });
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
  const role = localStorage.getItem("role");
  const [orderNO, setOrderNo] = useState("");
  const [eSign, setESign] = useState({
    operator_sign: "",
    hod_sign: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
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
    let apiUrl;
    if (role == "ROLE_OPERATOR") {
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/getOperatorSummarydetailsF05`;
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/getHodSummarydetailsF05`;
    }
    if (!initialized.current && apiUrl) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  
  useEffect(() => {
    const fetchDataLov = async () => {
      let pdeShift;
      switch (formParams.shift) {
        case "I":
          pdeShift = 1;
          break;
        case "II":
          pdeShift = 2;
          break;
        case "III":
          pdeShift = 3;
          break;
      }
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/goods/api/dryGoodsOderNo?date=${formParams.date}&shift=${pdeShift}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formattedOptions = response.data.map((item) => ({
          value: item,
          label: item,
        }));

        setOrderNoLov(formattedOptions);
      } catch (error) {
        message.error(
          error.response?.data?.message || "Failed to fetch order numbers."
        );
      }
    };

    // Fetch data only when both `date` and `shift` are available
    if (formParams.date && formParams.shift) {
      fetchDataLov();
    }
  }, [formParams.date, formParams.shift, token]);

  useEffect(() => {
    const fetchDataLovPrint = async () => {
      let pdeShift;
      switch (printParams.shift) {
        case "I":
          pdeShift = 1;
          break;
        case "II":
          pdeShift = 2;
          break;
        case "III":
          pdeShift = 3;
          break;
      }
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/goods/api/dryGoodsOderNo?date=${printParams.date}&shift=${pdeShift}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formattedOptions = response.data.map((item) => ({
          value: item,
          label: item,
        }));

        setOrderNoLov(formattedOptions);
      } catch (error) {
        message.error(
          error.response?.data?.message || "Failed to fetch order numbers."
        );
      }
    };

    // Fetch data only when both `date` and `shift` are available
    if (printParams.date && printParams.shift) {
      fetchDataLovPrint();
    }
  }, [printParams.date, printParams.shift, token]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (
          data.supervisor_status == "SUPERVISOR_REJECTED" ||
          data.hod_status == "HOD_REJECTED"
        ) {
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
      title: "Order No",
      dataIndex: "order_no",
      key: "order_no",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  const options = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  const [orderNoLov, setOrderNoLov] = useState([]);

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
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleEdit = (record) => {
    console.log(" record.orderNos", record.order_no);
    navigate(`/Precot/DryGoods/F-05`, {
      state: {
        date: record.date,
        shift: record.shift,
        orderNos: record.order_no,
      },
    });
  };

  useEffect(() => {
    if (printData.prodDetails.length > 0) {
      setTimeout(() => {
        window.print();
        handlePrintCancel();
        setPrintData((prevState) => ({
          ...prevState,
          prodDetails: [],
          stoppage: [],
        }));
        setPrintParams((prevState) => ({
          ...prevState,
          date: "",
          shift: "",
        }));
        setPrintButtonLoading(false);
      }, 3000);
    }
    setESign((prevState) => ({
      ...prevState,
      operator_sign: null,
      supervisor_sign: null,
      hod_sign: null,
    }));
  }, [printData]);

  const handlePrint = async () => {
    if (printParams.date == "" || printParams.date == null) {
      message.warning("Please Select Date");
      return;
    } else if (printParams.shift == "" || printParams.shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    try {
      setPrintButtonLoading(true);
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/Drygoods/Service/getRollForPrintF05?date=${printParams.date}&shift=${printParams.shift}&order_no=${printOrder}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }
      const data = response.data[0];
      setPrintData((prevState) => ({
        ...prevState,
        ...data,
      }));

      setTimeout(() => {
        fetchJob();
      }, 1000);
    } catch (error) {
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  const fetchJob = async () => {
    try {
      let pdeShift;
      switch (printParams.shift) {
        case "I":
          pdeShift = 1;
          break;
        case "II":
          pdeShift = 2;
          break;
        case "III":
          pdeShift = 3;
          break;
      }

      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/goods/api/dryGoodsMiniROll1?date=${printParams.date}&shift=${pdeShift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length > 0) {
        const data = response.data;
        setOrderNo(data[0].POrder);
        setPrintData((prevState) => ({
          ...prevState,
          prodDetails: data,
        }));
      }
    } catch (error) {
      message.error(error.response.data.message);
      setPrintButtonLoading(false);
    }
  };
  useEffect(() => {
    if (orderNO) {
      const handleOrderNo = async () => {
        let pdeShift;
        switch (printParams.shift) {
          case "I":
            pdeShift = 1;
            break;
          case "II":
            pdeShift = 2;
            break;
          case "III":
            pdeShift = 3;
            break;
          default:
            pdeShift = 0;
        }

        try {
          const response2 = await axios.get(
            `${ API.prodUrl}/Precot/api/goods/api/dryGoodsMiniROllStoppage?date=${
              printParams.date
            }&order_no=${Number(orderNO)}&shift=${pdeShift}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response2.data.length > 0) {
            setPrintData((prevState) => ({
              ...prevState,
              stoppage: response2.data,
            }));
            setOrderNo("");
          } else {
          }
        } catch (error) {
          console.error("API Call failed:", error.response?.data?.message);
          message.error(error.response?.data?.message);
          setPrintButtonLoading(false);
        }
      };
      handleOrderNo();
    }
  }, [orderNO]);

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      date: "",
      shift: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const handleParam = (e, name) => {
    if (name == "date") {
      setFormParams((prevState) => ({
        ...prevState,
        date: e.target.value,
      }));
    }
    if (name == "shift") {
      setFormParams((prevState) => ({
        ...prevState,
        shift: e,
      }));
    }
    if (name == "orderNos") {
      setFormParams((prevState) => ({
        ...prevState,
        orderNos: e,
      }));
    }
  };
  const handlePrintParams = (e, name) => {
    if (name == "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        date: e.target.value,
      }));
    }
    if (name == "shift") {
      setPrintParams((prevState) => ({
        ...prevState,
        shift: e,
      }));
    }
  };
  const handleOk = () => {
    if (formParams.date == "" || formParams.date == null) {
      message.warning("Please Select Date");
      return;
    } else if (formParams.shift == "" || formParams.shift == null) {
      message.warning("Please Select Shift");
      return;
    } else if (formParams.orderNos == "" || formParams.orderNos == null) {
      message.warning("Please Select orderNos");
      return;
    }

    navigate(`/Precot/DryGoods/F-05`, {
      state: {
        date: formParams.date,
        shift: formParams.shift,
        orderNos: formParams.orderNos,
      },
    });
  };
  const entriesPerPage = 15;
  const productionDetails = [];
  let numberOfPages = Math.ceil(printData.prodDetails.length / entriesPerPage);
  if (printData || printData.prodDetails.length > 0) {
    for (let i = 0; i < printData.prodDetails.length; i += entriesPerPage) {
      productionDetails.push(
        printData.prodDetails.slice(i, i + entriesPerPage)
      );
    }
  }
  const stoppageEntriesPerPage = 15;
  const stoppageDetails = [];
  let numberOfPages2;
  if (stoppageDetails.length > 0) {
    numberOfPages2 =
      Math.ceil(printData.stoppage.length / entriesPerPage) + numberOfPages;
  } else if (stoppageDetails.length == 0) {
    numberOfPages2 =
      Math.ceil(printData.stoppage.length / entriesPerPage) + numberOfPages + 1;
  }

  if (printData?.stoppage?.length > 0) {
    for (
      let i = 0;
      i < printData.stoppage.length;
      i += stoppageEntriesPerPage
    ) {
      stoppageDetails.push(
        printData.stoppage.slice(i, i + stoppageEntriesPerPage)
      );
    }
  }
  const handleTotal = (bodyContent) => {
    let netWeightTotal = 0;
    bodyContent.forEach((details) => {
      netWeightTotal += details.RNWt;
    });

    return { netWeightTotal };
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

  return (
    <>
      <div id="section-to-print-san">
        <style>
          {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print-san table th,
  #section-to-print-san table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
                .page-break {
                page-break-after: always;
            }
      }
    `}
        </style>

        {productionDetails.map((bodyContent, pageIndex) => (
          <div className="page-break">
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <tr>
                <td rowSpan={4}>
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
                  rowSpan={4}
                >
                  Production Report - Mini Roll
                </td>
                <td style={{ padding: "0.5em" }}>Format No.:</td>
                <td style={{ padding: "0.5em" }}>PH-PRD04/F-005</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Revision No.:</td>
                <td style={{ padding: "0.5em" }}>01</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Ref. Sop No.:</td>
                <td style={{ padding: "0.5em" }}>PH-PRD04-D-03</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Page No.:</td>
                <td style={{ padding: "0.5em" }}>
                  {pageIndex +
                    1 +
                    " of " +
                    (numberOfPages2 == 0 ? numberOfPages : numberOfPages2)}
                </td>
              </tr>
            </table>
            <>
              <table>
                <thead>
                  <tr style={{ border: "none" }}>
                    <td
                      style={{ border: "none", padding: "20px" }}
                      colSpan="10"
                    ></td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      Lay down No.: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {/* {printData.laydown_no ? printData.laydown_no : "NA"} */}
                      <span style={{ padding: "5px" }}>
                        {printData.laydown_no
                          ?.split(",")
                          .reduce((rows, item, index) => {
                            if (index % 3 === 0) rows.push([]);
                            rows[rows.length - 1].push(item.trim());
                            return rows;
                          }, [])
                          .map((row, rowIndex) => (
                            <div key={rowIndex}>{row.join(", ")}</div>
                          ))}
                      </span>
                    </td>
                    <td colSpan={3}>
                      Order No.: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {printData.order_no}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {" "}
                      Date : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {formatDate(printData.date)}{" "}
                    </td>
                    <td colSpan={3}>
                      {" "}
                      Shift : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{printData.shift}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {" "}
                      Product Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {printData.product_name}{" "}
                    </td>
                    <td colSpan={3}>
                      {" "}
                      Customer Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {printData.customer_name}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}> 1. Production Details: </td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "center" }}> S.No.</th>
                    <th style={{ textAlign: "center" }}>Roll No.</th>
                    <th style={{ textAlign: "center" }}>Width in MM </th>
                    <th style={{ textAlign: "center" }}>GSM </th>
                    <th style={{ textAlign: "center" }}>Net Wt .in Kg</th>
                  </tr>
                </thead>
                <tbody>
                  {bodyContent.map((row, rowIndex) => (
                    <tr key={rowIndex} style={{ width: "100%" }}>
                      <td style={{ textAlign: "center" }}>
                        {pageIndex == 0
                          ? rowIndex + 1
                          : rowIndex + 1 + pageIndex * 15}
                      </td>
                      <td style={{ textAlign: "center" }}>{row.BaleNo}</td>
                      <td style={{ textAlign: "center" }}>{row.PWid}</td>
                      <td style={{ textAlign: "center" }}>{row.PGSM}</td>
                      <td style={{ textAlign: "center" }}>{row.RNWt}</td>
                    </tr>
                  ))}
                  <tr>
                    <th
                      style={{ textAlign: "center", padding: "7px" }}
                      colSpan={4}
                    >
                      Total
                    </th>
                    <td style={{ textAlign: "center" }}>
                      {handleTotal(bodyContent).netWeightTotal == 0
                        ? 0
                        : handleTotal(bodyContent).netWeightTotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      Waste in Kg
                    </td>
                    <td style={{ textAlign: "center" }}> Usable</td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      {printData.usable_kg}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }}>Saleable</td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      {printData.saleable_kg}
                    </td>
                  </tr>{" "}
                  <tr>
                    <td
                      style={{
                        paddingTop: "5px",
                        borderBottom: "none",
                        textAlign: "center",
                      }}
                      colSpan="3"
                    >
                      Operator Sign & Date
                    </td>
                    <td
                      style={{
                        paddingTop: "5px",
                        borderBottom: "none",
                        textAlign: "center",
                      }}
                      colSpan="2"
                    >
                      HOD/Designee Sign & Date{" "}
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
                      colSpan="3"
                    >
                      {" "}
                      {eSign.operator_sign ? (
                        <img
                          src={eSign.operator_sign}
                          alt="eSign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                      <br></br>
                      {printData.operator_sign} <br></br>
                      {formatPrintDate(printData.operator_submitted_on)}
                    </td>
                    <td
                      style={{
                        display: "table-cell",
                        verticalAlign: "bottom",
                        paddingTop: "15px",
                        borderTop: "none",
                        textAlign: "center",
                      }}
                      colSpan="2"
                    >
                      {" "}
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
                      {printData.hod_sign} <br></br>
                      {formatPrintDate(printData.hod_submit_on)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "none", padding: "20px" }}></td>
                  </tr>
                </tbody>
              </table>
            </>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <td style={{ padding: "1em" }}>Particulars</td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Prepared By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Reviewed By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Approved By
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "1em" }}>Name</td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Signature & Date</td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
        {stoppageDetails.map((bodyContent, pageIndex) => (
          <div className="page-break">
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <tr>
                <td rowSpan={4}>
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
                  rowSpan={4}
                >
                  Production Report - Mini Roll
                </td>
                <td style={{ padding: "0.5em" }}>Format No.:</td>
                <td style={{ padding: "0.5em" }}>PH-PRD04/F-005</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Revision No.:</td>
                <td style={{ padding: "0.5em" }}>01</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Ref. Sop No.:</td>
                <td style={{ padding: "0.5em" }}>PH-PRD04-D-03</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Page No.:</td>
                <td style={{ padding: "0.5em" }}>
                  {numberOfPages + pageIndex + 1 + " of " + numberOfPages2}
                </td>
              </tr>
            </table>
            <table>
              <thead>
                <tr style={{ border: "none" }}>
                  <td
                    style={{ border: "none", padding: "20px" }}
                    colSpan="10"
                  ></td>
                </tr>
                <tr>
                  <td colSpan={5}>4.Stoppage:</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>S.No.</td>
                  <td style={{ textAlign: "center" }}>Nature Of Problem</td>
                  <td style={{ textAlign: "center" }}>Stop. Time</td>
                  <td style={{ textAlign: "center" }}>Restart Time</td>
                  <td style={{ textAlign: "center" }}>Idle Time (in Min)</td>
                </tr>
              </thead>
              <tbody>
                {bodyContent.map((row, rowIndex) => (
                  <tr key={rowIndex} style={{ width: "100%" }}>
                    <td style={{ textAlign: "center" }}>
                      {pageIndex == 0
                        ? rowIndex + 1
                        : rowIndex + 1 + pageIndex * 15}
                    </td>
                    <td style={{ textAlign: "center" }}>{row.SCAUSE}</td>
                    <td style={{ textAlign: "center" }}>{row.FTime}</td>
                    <td style={{ textAlign: "center" }}>{row.TTime}</td>
                    <td style={{ textAlign: "center" }}>{row.TotHrs}</td>
                  </tr>
                ))}
              </tbody>

              <tr>
                <td
                  style={{
                    paddingTop: "5px",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                  colSpan="3"
                >
                  Operator Sign & Date
                </td>
                <td
                  style={{
                    paddingTop: "5px",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  HOD/Designee Sign & Date{" "}
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
                  colSpan="3"
                >
                  {" "}
                  {eSign.operator_sign ? (
                    <img
                      src={eSign.operator_sign}
                      alt="eSign"
                      style={{
                        width: "100px",
                        height: "50px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : null}
                  <br></br>
                  {printData.operator_sign} <br></br>
                  {formatPrintDate(printData.operator_submitted_on)}
                </td>
                <td
                  style={{
                    display: "table-cell",
                    verticalAlign: "bottom",
                    paddingTop: "15px",
                    borderTop: "none",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  {" "}
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
                  {printData.hod_sign} <br></br>
                  {formatPrintDate(printData.hod_submit_on)}
                </td>
              </tr>
            </table>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ border: "none" }}>
                  <td
                    style={{ border: "none", padding: "20px" }}
                    colSpan="10"
                  ></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Particulars</td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Prepared By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Reviewed By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Approved By
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "1em" }}>Name</td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Signature & Date</td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
        {stoppageDetails.length == 0 && (
          <div className="page-break">
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <tr>
                <td rowSpan={4}>
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
                  rowSpan={4}
                >
                  Production Report - Mini Roll
                </td>
                <td style={{ padding: "0.5em" }}>Format No.:</td>
                <td style={{ padding: "0.5em" }}>PH-PRD04/F-005</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Revision No.:</td>
                <td style={{ padding: "0.5em" }}>01</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Ref. Sop No.:</td>
                <td style={{ padding: "0.5em" }}>PH-PRD04-D-03</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Page No.:</td>
                <td style={{ padding: "0.5em" }}>
                  {numberOfPages + 1 + " of " + numberOfPages2}
                </td>
              </tr>
            </table>
            <table>
              <thead>
                <tr style={{ border: "none" }}>
                  <td
                    style={{ border: "none", padding: "20px" }}
                    colSpan="10"
                  ></td>
                </tr>
                <tr>
                  <td colSpan={4}>4.Stoppage:</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Nature Of Problem</td>
                  <td style={{ textAlign: "center" }}>Stop. Time</td>
                  <td style={{ textAlign: "center" }}>Restart Time</td>
                  <td style={{ textAlign: "center" }}>Idle Time (in Min)</td>
                </tr>
              </thead>
              <tbody>
                <tr tyle={{ width: "100%" }}>
                  <td style={{ textAlign: "center" }}>NA</td>
                  <td style={{ textAlign: "center" }}>NA</td>
                  <td style={{ textAlign: "center" }}>NA</td>
                  <td style={{ textAlign: "center" }}>NA</td>
                </tr>
              </tbody>

              <tr>
                <td
                  style={{
                    paddingTop: "5px",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                  colSpan="3"
                >
                  Operator Sign & Date
                </td>
                <td
                  style={{
                    paddingTop: "5px",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  HOD/Designee Sign & Date{" "}
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
                  colSpan="3"
                >
                  {" "}
                  {eSign.operator_sign ? (
                    <img
                      src={eSign.operator_sign}
                      alt="eSign"
                      style={{
                        width: "100px",
                        height: "50px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : null}
                  <br></br>
                  {printData.operator_sign} <br></br>
                  {formatPrintDate(printData.operator_submitted_on)}
                </td>
                <td
                  style={{
                    display: "table-cell",
                    verticalAlign: "bottom",
                    paddingTop: "15px",
                    borderTop: "none",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  {" "}
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
                  {printData.hod_sign} <br></br>
                  {formatPrintDate(printData.hod_submit_on)}
                </td>
              </tr>
            </table>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ border: "none" }}>
                  <td
                    style={{ border: "none", padding: "20px" }}
                    colSpan="10"
                  ></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Particulars</td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Prepared By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Reviewed By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Approved By
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "1em" }}>Name</td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Signature & Date</td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <BleachingHeader
        formName={"PRODUCTION REPORT MINI - ROLL"}
        formatNo={"PH-PRD04/F-005"}
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
        title="Production Report - Mini Roll (Print)"
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
          &nbsp;&nbsp;
        </label>
        <Input
          type="date"
          onChange={(e) => {
            handlePrintParams(e, "date");
          }}
          value={printParams.date}
          style={{ textAlign: "center", width: "150px" }}
        ></Input>
        <br></br>
        <br></br>
        <label>
          Shift
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          : &nbsp;&nbsp;
        </label>
        <Select
          options={options}
          onChange={(e) => {
            handlePrintParams(e, "shift");
          }}
          value={printParams.shift}
          style={{ textAlign: "center", width: "150px" }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        ></Select>
        <br></br>
        <br></br>
        <label style={{ marginTop: "8px" }}>
          Order No &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;{" "}
        </label>
        <Select
          options={orderNoLov}
          value={printOrder}
          placeholder="Order No"
          onChange={(value) => {
            setPrintOrder(value);
          }}
          style={{
            width: "150px",
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
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
          style={{ width: "150px" }}
          type="date"
          onChange={(e) => {
            handleParam(e, "date");
          }}
          max={today}
        ></Input>
        <label style={{ marginTop: "8px" }}>Shift : </label>
        <Select
          options={options}
          placeholder="Shift"
          onChange={(e) => {
            handleParam(e, "shift");
          }}
          style={{
            width: "150px",
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
        <label style={{ marginTop: "8px" }}>Order No: </label>
        <Select
          options={orderNoLov}
          placeholder="Order No"
          onChange={(e) => {
            handleParam(e, "orderNos");
          }}
          style={{
            width: "150px",
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
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
      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default DryGoods_f05_Summary;
