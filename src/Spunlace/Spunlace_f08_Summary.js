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

const Spunlace_f08_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [bmrOptions, setBmrOptions] = useState("");
  const [date, setDate] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const today = new Date().toISOString().split("T")[0];
  const [summaryData, setSummaryData] = useState("");
  const [reason, setReason] = useState(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printRecord, setPrintRecord] = useState({
    product_sum: "",
    lc_sum: "",
    strip_clean_sum: "",
    gr_clean_sum: "",
    mis_sum: "",
    others_sum: "",
    downtime_total_sum: "",
    er_sum: "",
    mr_sum: "",
    breakdown_total_sum: "",
    supervisor_sign: "",
    supervisor_submit_on: "",
    hod_sign: "",
    hod_submit_on: "",
    stoppageDetails: [],
  });
  const [printDate, setPrintDate] = useState("");
  const initialized = useRef(false);
  const initial = useRef(false);
  const [eSign, setESign] = useState({
    supervisor_sign: '',
    hod_sign: ''
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = printRecord[key];
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
          .catch((err) => {

          });
      }
    });
  }, [token, printRecord]);



  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      if (userRole !== "ROLE_SUPERVISOR" && userRole !== "ROLE_HOD" && userRole !== "ROLE_DESIGNEE") {
        message.warning(userRole + " does not have access to this form");
        navigate("/Precot/choosenScreen");
      }
    }
  }, [token])


  useEffect(() => {
    const fetchBmrOptions = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const options = response.data.map((option) => ({
          value: option.BMR_NO, // assuming value is the correct field for the value
          label: option.BMR_NO, // using value as label for display
        }));

        setBmrOptions(options);
      } catch (error) {
        console.error("Error fetching BMR options:", error);
      }
    };

    fetchBmrOptions();
  }, [token]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          let response;

          response = await axios.get(
            `${API.prodUrl}/Precot/api/spulance/getSummarydetailsF008`,
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

  useEffect(() => {

    if (printRecord.stoppageDetails.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintRecord(prevState => ({
          ...prevState,
          stoppageDetails: []
        }))
        setPrintButtonLoading(false);
      }, 3000)
    }
    setESign(prevState => ({
      ...prevState,
      supervisor_sign: null,
      hod_sign: null

    }))
  }, [printRecord]);

  const handlePrint = async () => {
    if (printDate == "") {
      message.warning("Please Select Date");
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/getdetailsForPrintF008?date=${printDate}`,
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



      setPrintRecord(response.data[0]);
      setTimeout(() => {
        fetchJob();
      }, 1000)
    } catch (error) {
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };
  // ------------------------------- PDE Data Validations --------------------

  const createStoppageDetails = (num, response) => {
    const details = [];
    response.data.forEach((responseData) => {

      const data = responseData.response;
      const maxLength = mapLengthForEach(data);

      for (let i = 0; i < maxLength; i++) {
        details.push({
          shiftId: responseData.shiftId,
          product_name: responseData.brand,
          order_number: responseData.order,
          product_in_kg: responseData.weight,
          lc: data.LC?.[i]?.totalHours || "N/A",
          strip_clean: data.SCL?.[i]?.totalHours || "N/A",
          gr_clean: data.CL?.[i]?.totalHours || "N/A",
          mis: data.MI?.[i]?.totalHours || "N/A",
          others: data.Others?.[i]?.totalHours || "N/A",
          downtime_total:
            (data.LC?.[i]?.totalHours || 0) +
            (data.SCL?.[i]?.totalHours || 0) +
            (data.CL?.[i]?.totalHours || 0) +
            (data.MI?.[i]?.totalHours || 0) +
            (data.Others?.[i]?.totalHours || 0),
          er: data.ER?.[i]?.totalHours || "N/A",
          mr: data.MR?.[i]?.totalHours || "N/A",
          breakdown_total:
            (data.ER?.[i]?.totalHours || 0) + (data.MR?.[i]?.totalHours || 0),
        });

      }
    });


    return details;
  };
  const mapLengthForEach = (data) => {
    const maxLength = Math.max(
      data.Others?.length || 0,
      data.MR?.length || 0,
      data.LC?.length || 0,
      data.CL?.length || 0,
      data.MI?.length || 0,
      data.SCL?.length || 0,
      data.ER?.length || 0
    );
    return maxLength;
  };

  const mapApiResponseToState = (response) => {

    const dataArray = response.data;
    let maxLength = 0;
    let sumOfMaxLengths = 0;

    dataArray.forEach((data) => {
      const lengths = [
        data.response.Others?.length || 0,
        data.response.MR?.length || 0,
        data.response.LC?.length || 0,
        data.response.CL?.length || 0,
        data.response.MI?.length || 0,
        data.response.SCL?.length || 0,
        data.response.ER?.length || 0,
      ];
      const currentMaxLength = Math.max(...lengths);
      if (currentMaxLength > maxLength) {
        maxLength = currentMaxLength;
      }
      sumOfMaxLengths += currentMaxLength;
    });
    return { maxLength, sumOfMaxLengths };
  };




  //--------------------------------------------------------------------------

  const fetchJob = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/splResponse1?date=${printDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length > 0) {
        const maxLength = mapApiResponseToState(response);

        const details = createStoppageDetails(maxLength.sumOfMaxLengths, response);
        setPrintRecord((prevFormData) => ({
          ...prevFormData,
          stoppageDetails: details,
        }));
      } else if (
        response.data.length == 0 ||
        response.data.response.length == 0
      ) {
        message.warning("No details found for the given date.");
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };


  const handleEdit = (record) => {
    if (record.date == "" || record.date == null) {
      message.warning("Please Select Date!");
      return;
    }


    navigate(`/Precot/Spunlace/F-08`, {
      state: {
        date: record.date,
      },
    });
  };

  const handleDate = (e) => {
    setDate(e.target.value);

  };

  const handleOk = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date!");
      return;
    }
    navigate(`/Precot/Spunlace/F-08`, {
      state: {
        date: date,
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
      render: (text) => formatDateOnly(text),
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
    render: (text) => (text ? text : 'N/A')
  };

  let columns;
  if (reason) {
    columns = [
      ...baseColumns.slice(0, 4),
      Reason,
      ...baseColumns.slice(4),
    ];
  } else {
    columns = baseColumns;
  }
  // ---------------------------------------------------------------------------
  const formatDateOnly = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
    setPrintDate('');
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const handlePrintDate = (e) => {
    setPrintDate(e.target.value);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const entriesPerPage = 15;
  const stoppageReport = [];
  let numberOfPages = Math.ceil(
    printRecord.stoppageDetails.length / entriesPerPage
  );

  if (printRecord || printRecord.stoppageDetails.length > 0) {
    for (
      let i = 0;
      i < printRecord.stoppageDetails.length;
      i += entriesPerPage
    ) {
      stoppageReport.push(
        printRecord.stoppageDetails.slice(i, i + entriesPerPage)
      );
    }
  }
  //------------------------- Page Wise Total ------------------------

  const handleTotal = (bodyContent) => {

    let prodInKgSum = 0;
    let lcSum = 0;
    let stripCleanSum = 0;
    let grCleanSum = 0;
    let misSum = 0;
    let othersSum = 0;
    let downtimeTotalSum = 0;
    let erSum = 0;
    let mrSum = 0;
    let breakdownTotalSum = 0;

    bodyContent.forEach(details => {
      prodInKgSum += (details.product_in_kg == null || details.product_in_kg == "N/A") ? 0 : details.product_in_kg;
      lcSum += (details.lc == null || details.lc == "N/A") ? 0 : details.lc;
      stripCleanSum += (details.strip_clean == null || details.strip_clean == "N/A") ? 0 : details.strip_clean;
      grCleanSum += (details.gr_clean == null || details.gr_clean == "N/A") ? 0 : details.gr_clean;
      misSum += (details.mis == null || details.mis == "N/A") ? 0 : details.mis;
      othersSum += (details.others == null || details.others == "N/A") ? 0 : details.others;
      downtimeTotalSum += (details.downtime_total == null || details.downtime_total == "N/A") ? 0 : details.downtime_total;
      erSum += (details.er == null || details.er == "N/A") ? 0 : details.er;
      mrSum += (details.mr == null || details.mr == "N/A") ? 0 : details.mr;
      breakdownTotalSum += (details.breakdown_total == null || details.breakdown_total == "N/A") ? 0 : details.breakdown_total;
    });
    return {
      prodInKgSum,
      lcSum,
      stripCleanSum,
      grCleanSum,
      misSum,
      othersSum,
      downtimeTotalSum,
      erSum,
      mrSum,
      breakdownTotalSum,
    }
  }

  //---------------------------------------------------------------------------
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
    <div>
      {/* //id="section-to-print-san" */}
      <div id="section-to-print-san">
        <style>
          {`
      @media print {
    @page {
      size: landscape;
    }
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
      }
    `}
        </style>
        {stoppageReport.map((bodyContent, pageIndex) => (
          <table>
            <thead>
              <tr>
                <th rowspan="4" colSpan={2} style={{ textAlign: "center", width: "15%" }}>
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
                <th rowspan="4" style={{ textAlign: "center" }} colSpan={9}>
                  Daily Stoppage Report - Spunlace
                </th>
                <th style={{}} colSpan={2}>
                  Format No.:
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    width: "10%",
                  }}
                  colSpan={1}
                >
                  PH-PRD02/F-008
                </th>
              </tr>
              <tr>
                <th style={{ width: "10%" }} colSpan={2}>
                  Revision No.:
                </th>
                <th
                  style={{ border: "1px solid black" }}
                  colSpan={1}
                >
                  01
                </th>
              </tr>
              <tr>
                <th style={{}} colSpan={2}>
                  Ref. SOP No.:
                </th>
                <th style={{}} colSpan={1}>
                  PH-PRD02-D-03
                </th>
              </tr>
              <tr>
                <th style={{}} colSpan={2}>
                  Page No.:
                </th>
                <th style={{}} colSpan={1}>
                  {pageIndex + 1} of {numberOfPages}
                </th>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10">
                  &nbsp;
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10">
                  &nbsp;
                </td>
              </tr>
              <tr><td colspan={14}>Date : {formatDateOnly(printDate)}</td></tr>
              <tr>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th rowspan="2" style={{ textAlign: "center", width: "10%" }}>
                  SHIFT
                </th>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  PRODUCT NAME
                </th>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  ORDER NO
                </th>
                <th rowspan="2" style={{ textAlign: "center" }}>
                  PROD .in KG
                </th>
                <th colspan="6" style={{ textAlign: "center" }}>
                  DOWN TIME in MIN
                </th>
                <th colspan="3" style={{ textAlign: "center" }}>
                  BREAK TIME in MIN
                </th>
              </tr>
              <tr>
                <th style={{ textAlign: "center" }}>LC</th>
                <th style={{ textAlign: "center" }}>STRIP CLEAN</th>
                <th style={{ textAlign: "center" }}>GR CLEAN</th>
                <th style={{ textAlign: "center" }}>MIS.</th>
                <th style={{ textAlign: "center" }}>OTHERS</th>
                <th style={{ textAlign: "center" }}>TOTAL</th>
                <th style={{ textAlign: "center" }}>ER</th>
                <th style={{ textAlign: "center" }}>MR</th>
                <th style={{ textAlign: "center" }}>TOTAL</th>
              </tr>
            </thead>

            <tbody>
              {bodyContent.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td style={{ textAlign: "center" }}>
                    {pageIndex == 0
                      ? rowIndex + 1
                      : rowIndex + 1 + pageIndex * 15}
                  </td>
                  <td style={{ textAlign: "center" }}>{row.shiftId}</td>
                  <td style={{ textAlign: "center", width: "20%" }}>{row.product_name}</td>
                  <td style={{ textAlign: "center" }}>{row.order_number}</td>
                  <td style={{ textAlign: "center" }}>{row.product_in_kg}</td>
                  <td style={{ textAlign: "center" }}>{row.lc}</td>
                  <td style={{ textAlign: "center" }}>{row.strip_clean}</td>
                  <td style={{ textAlign: "center" }}>{row.gr_clean}</td>
                  <td style={{ textAlign: "center" }}>{row.mis}</td>
                  <td style={{ textAlign: "center" }}>{row.others}</td>
                  <td style={{ textAlign: "center" }}>{row.downtime_total}</td>
                  <td style={{ textAlign: "center" }}>{row.er}</td>
                  <td style={{ textAlign: "center" }}>{row.mr}</td>
                  <td style={{ textAlign: "center" }}>{row.breakdown_total}</td>
                </tr>
              ))}
              ;
              <tr>
                <td style={{ textAlign: "center" }}>N/A</td>
                <td style={{ textAlign: "center" }}>N/A</td>
                <td style={{ textAlign: "center" }}>N/A</td>
                <td style={{ textAlign: "center" }}>N/A</td>
                <td style={{ textAlign: "center" }}>
                  {handleTotal(bodyContent).prodInKgSum == 0 ? 0 : handleTotal(bodyContent).prodInKgSum.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>{handleTotal(bodyContent).lcSum == 0 ? 0 : handleTotal(bodyContent).lcSum.toFixed(2)}</td>
                <td style={{ textAlign: "center" }}>
                  {handleTotal(bodyContent).stripCleanSum == 0 ? 0 : handleTotal(bodyContent).stripCleanSum.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>
                  {handleTotal(bodyContent).grCleanSum == 0 ? 0 : handleTotal(bodyContent).grCleanSum.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>{handleTotal(bodyContent).misSum == 0 ? 0 : handleTotal(bodyContent).misSum.toFixed(2)}</td>
                <td style={{ textAlign: "center" }}>
                  {handleTotal(bodyContent).othersSum == 0 ? 0 : handleTotal(bodyContent).othersSum.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>
                  {handleTotal(bodyContent).downtimeTotalSum == 0 ? 0 : handleTotal(bodyContent).downtimeTotalSum.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>{handleTotal(bodyContent).erSum == 0 ? 0 : handleTotal(bodyContent).erSum.toFixed(2)}</td>
                <td style={{ textAlign: "center" }}>{handleTotal(bodyContent).mrSum == 0 ? 0 : handleTotal(bodyContent).mrSum.toFixed(2)}</td>
                <td style={{ textAlign: "center" }}>
                  {handleTotal(bodyContent).breakdownTotalSum == 0 ? 0 : handleTotal(bodyContent).breakdownTotalSum.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td
                  style={{ paddingTop: "5px", borderBottom: "none", textAlign: "center" }}
                  colSpan="5"
                >
                  Production Supervisor Sign & Date{" "}
                </td>
                <td
                  style={{ paddingTop: "5px", borderBottom: "none", textAlign: "center" }}
                  colSpan="10"
                >HOD/Designee Sign & Date{" "}
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
                  colSpan="5"
                >
                  {" "}
                  {eSign.supervisor_sign ? (
                    <img
                      src={eSign.supervisor_sign}
                      alt="eSign"
                      style={{
                        width: "100px",
                        height: "50px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />) : null}
                  <br></br>
                  {printRecord.supervisor_sign} <br></br>
                  {formatPrintDate(printRecord.supervisor_submit_on)}
                </td>
                <td
                  style={{
                    display: "table-cell",
                    verticalAlign: "bottom",
                    paddingTop: "15px",
                    borderTop: "none",
                    textAlign: "center",
                  }}
                  colSpan="10"
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
                    />) : null}
                  <br></br>
                  {printRecord.hod_sign} <br></br>
                  {formatPrintDate(printRecord.hod_submit_on)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="11">
                  &nbsp;
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10">
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} colspan={3}>
                  Particulars
                </td>
                <td style={{ textAlign: "center" }} colSpan={4}>
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
                <td style={{ textAlign: "center" }} colspan={3}>
                  Name
                </td>
                <td style={{}} colSpan={4}></td>
                <td style={{}} colSpan={4}></td>
                <td style={{}} colSpan={4}></td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} colspan={3}>
                  Signature & Date
                </td>
                <td style={{}} colSpan={4}></td>
                <td style={{}} colSpan={4}></td>
                <td style={{}} colSpan={4}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>
      <BleachingHeader
        formName={"DAILY STOPPAGE REPORT - SPUNLACE"}
        formatNo={"PH-PRD02/F-008"}
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
        title="Daily Stoppage Report - Spunlace(Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel} >
            Cancel
          </Button>,
          <Button key="reject" type="primary" onClick={handlePrint} loading={printButtonLoading}>
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
        <br></br>
        <br></br>
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

export default Spunlace_f08_Summary;
