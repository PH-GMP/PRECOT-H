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

const QualityAssurance_f43_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
  });
  const [formParams, setFormParams] = useState({
    date: "",
  });
  const [printLov, setPrintLov] = useState({
    monthLov: [],
    yearLov: [],
  });
  const role = localStorage.getItem("role");
  const [paginateData, setPaginatedData] = useState([]);
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
  const [eSign, setESign] = useState({
    supervisor_sign: "",
    hod_sign: "",
  });
  const [selectMonthDates, setSelectMonthDates] = useState([]);
  const deptId = localStorage.getItem("departmentId");
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
    const signatureKeys = ["supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[printData.length - 1]?.[key];
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
          .catch((err) => {
            
          });
      }
    });
  }, [token, printData]);
  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      let apiUrl;
      if (role == "ROLE_SUPERVISOR") {
        apiUrl = `${
        API.prodUrl
        }/Precot/api/QA/Service/GetSupervisorHodControlOfGHpWc?department=${getDeptName(
          deptId
        )}`;
      } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        apiUrl = `${
        API.prodUrl
        }/Precot/api/QA/Service/GetSupervisorSummeryControlOfGHpWc?department=${getDeptName(
          deptId
        )}`;
      }
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
          // message.error(error.response.data.message)
        }
      };
      fetchData();
    }
  }, [token, navigate]);

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
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
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
    navigate(`/Precot/QualityAssurance/F-051`, {
      state: {
        date: record.date,
        department: record.department,
      },
    });
  };

  const handleGo = () => {
    if (formParams.date == "") {
      message.warning("Please Select The Date");
      return;
    }
    navigate(`/Precot/QualityAssurance/F-051`, {
      state: {
        date: formParams.date,
        department: getDeptName(deptId),
      },
    });
  };
  const handlePrint = async () => {
    if (printParams.year == "" || printParams.year == null) {
      message.warning("Please Select The Year");
      return;
    }
    if (printParams.month == "" || printParams.month == null) {
      message.warning("Please Select The Month");
      return;
    }
    const monthDates = generateDatesForMonth(
      printParams.month,
      printParams.year
    );
    setSelectMonthDates(monthDates);

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/QA/Service/PrintControlOfGHpWc?month=${
          printParams.month
        }&year=${printParams.year}&department=${getDeptName(deptId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No Data Available To Print");
        setPrintButtonLoading(false);
        return;
      }
      const data = response.data;
      const flattenData = data.flatMap((item) =>
        item.ghpwcTypes.map((type) => ({
          ...type,
          date: item.date,
        }))
      );
      
      const transformedData = restructureData(flattenData);

      
      setPaginatedData(transformedData);
      setPrintData(response.data);
    } catch (error) {
      setPrintButtonLoading(false);
      message.warning(error.response.data.message);
    }
  };

  useEffect(() => {
    if (printData.length > 0) {
      setTimeout(() => {
        setPrintButtonLoading(false);
        window.print();
      }, [3000]);
    }
  }, [printData]);

  const restructureData = (data) => {
    const result = [];
    const dateMap = {};
    data.forEach((item) => {
      if (!dateMap[item.date]) {
        dateMap[item.date] = [];
      }
      dateMap[item.date].push(item);
    });

    const uniqueDates = Object.keys(dateMap);
    const maxItemsPerDate = Math.max(
      ...uniqueDates.map((date) => dateMap[date].length)
    );
    for (let i = 0; i < maxItemsPerDate; i++) {
      result.push({ row: [] });
    }

    uniqueDates.forEach((date) => {
      const items = dateMap[date];
      items.forEach((item, index) => {
        result[index].row.push(item);
      });
    });

    return result;
  };

  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
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
  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      year: "",
      month: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const generateDatesForMonth = (month, year) => {
    const dates = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      if (day < 10) {
        day = "0" + day;
      }
      const date = `${year}-${month}-${day}`;
      dates.push(date);
    }

    return dates;
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
        transform: scale(0.8); /* Adjust scale as needed */
        transform-origin: top left right bottom; /* Adjust the origin if needed */
      }
    }
                      .page-break {
                page-break-after: always;
            }
  `;

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

  const getMonthName = (num) => {
    switch (num) {
      case "01":
        return "JAN";
      case "02":
        return "FEB";
      case "03":
        return "MAR";
      case "04":
        return "APR";
      case "05":
        return "MAY";
      case "06":
        return "JUN";
      case "07":
        return "JUL";
      case "08":
        return "AUG";
      case "09":
        return "SEP";
      case "10":
        return "OCT";
      case "11":
        return "NOV";
      case "12":
        return "DEC";
    }
  };

  const getDeptName = (deptId) => {
    switch (Number(deptId)) {
      case 1:
        return "BLEACHING";
      case 2:
        return "SPUNLACE";
      case 3:
        return "PAD_PUNCHING";
      case 4:
        return "DRY_GOODS";
      case 6 :
          return 'QUALITY_ASSURANCE'
      case 12:
        return "COTTON_BUDS";
    }
  };

  const getColSpan = () => {
    switch (Number(selectMonthDates.length)) {
      case 31:
        return 31;
      case 29:
        return 29;
      case 30:
        return 30;
      case 28:
        return 28;
    }
  };

  const fetchPrintData = (index, date, content) => {
    
    let rowObject = {
      identification_no: "",
      identification_details: "",
      remarks: "",
      date: "",
    };
    if (content[index]) {
      rowObject = content[index].row.find((row) => row.date == date);
      return rowObject;
    }
    return rowObject;
  };

  const fetchPrintObjectData = (date, content) => {
    
    let rowObject = {
      date: "",
      checked_by: "",
    };

    const matchedObject = content.find((item) => item.date === date);

    if (matchedObject) {
      rowObject = {
        date: matchedObject.date,
        checked_by: matchedObject.checked_by,
      };
      
      return rowObject;
    }

    
    return rowObject;
  };

  // ------- For Two Rows --------------------------
  const firstTwoRows = paginateData.slice(0, 2);
  const remainingRows = paginateData.slice(2);

  const entriesPerPage = 2;
  const glassReport = [];
  
  let numberOfPages = Math.ceil(firstTwoRows.length / entriesPerPage);

  if (paginateData || paginateData.length > 0) {
    for (let i = 0; i < firstTwoRows.length; i += entriesPerPage) {
      
      glassReport.push(firstTwoRows.slice(i, i + entriesPerPage));
    }
  }

  // For More Than 2 Rows

  const entriesPerPage2 = 7;
  const glassReport2 = [];
  
  let numberOfPages2 = Math.ceil(remainingRows.length / entriesPerPage2);

  if (paginateData || paginateData.length > 0) {
    for (let i = 0; i < remainingRows.length; i += entriesPerPage2) {
      
      glassReport2.push(remainingRows.slice(i, i + entriesPerPage2));
    }
  }

  return (
    <>
      <div id="section-to-print">
        <GlobalStyle />
        {paginateData.length <= 2 && (
          <>
            {glassReport.map((bodyContent, pageIndex) => (
              <div className="page-break">
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr>
                    <td style={{ border: "none", padding: "10px" }}></td>
                  </tr>
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
                      CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC
                    </td>
                    <td style={{ padding: "0.5em" }}>Format No.:</td>
                    <td style={{ padding: "0.5em" }}>PH-QAD01-F-051</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Revision No.:</td>
                    <td style={{ padding: "0.5em" }}>01</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                    <td style={{ padding: "0.5em" }}>PH-QAD01-D-47</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Page No.:</td>
                    <td style={{ padding: "0.5em" }}>1 of 1 </td>
                  </tr>
                  <tr>
                    <td style={{ border: "none", padding: "5px" }}></td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <td style={{ padding: "10px" }} colSpan={33}>
                      Department Name: {printData[0].department}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={Number(selectMonthDates.length / 2) + 1}>
                      Month & Year : {getMonthName(printData[0].month)}&
                      {printData[0].year}{" "}
                    </td>
                    <td
                      colSpan={
                        Number(selectMonthDates.length) == 29 ||
                        Number(selectMonthDates.length) == 31
                          ? Number(selectMonthDates.length / 2) + 1
                          : Number(selectMonthDates.length / 2)
                      }
                    >
                      Frequency: Daily
                    </td>
                    <td rowSpan={3} style={{ textAlign: "center" }}>
                      Remarks
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={2} style={{ textAlign: "center" }}>
                      Identification No.
                    </td>
                    <td colSpan={getColSpan()} style={{ textAlign: "center" }}>
                      Status as on date
                    </td>
                  </tr>

                  <tr>
                    {selectMonthDates.map((record, rowIndex) => (
                      <td key={rowIndex} className="data-border">
                        <p
                          style={{
                            width: "10px",
                            height: "90px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {rowIndex + 1}
                        </p>
                      </td>
                    ))}
                  </tr>
                  {bodyContent.map((data, dataIndex) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {
                          bodyContent[dataIndex]?.row?.[
                            bodyContent[dataIndex].row.length - 1
                          ]?.identification_no
                        }
                      </td>
                      {selectMonthDates.map((record, rowIndex) => (
                        <td>
                          {fetchPrintData(dataIndex, record, bodyContent)
                            ?.identification_details
                            ? fetchPrintData(dataIndex, record, bodyContent)
                                ?.identification_details
                            : "NA"}
                        </td>
                      ))}
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {
                          bodyContent[dataIndex]?.row?.[
                            bodyContent[dataIndex].row.length - 1
                          ]?.remarks
                        }
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ textAlign: "center" }}>Checked by</td>
                    {selectMonthDates.map((record, rowIndex) => (
                      <td
                        key={rowIndex}
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                        }}
                      >
                        {fetchPrintObjectData(record, printData)?.checked_by
                          ? fetchPrintObjectData(record, printData)?.checked_by
                          : "NA"}
                      </td>
                    ))}
                    <td style={{ textAlign: "center" }}>
                      Abbreviation :-<br></br> Intact : I<br /> Crack : C<br />{" "}
                      Damage /<br /> Broken : D
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="16"
                      style={{
                        textAlign: "center",
                        width: "30%",
                        borderBottom: "none",
                      }}
                    >
                      Verified Supervisor:
                    </td>
                    <td
                      colspan="17"
                      style={{
                        textAlign: "center",
                        width: "35%",
                        borderBottom: "none",
                      }}
                    >
                      Production Head:
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="16"
                      style={{
                        height: "60%",
                        textAlign: "center",
                        borderTop: "none",
                      }}
                    >
                      {eSign.supervisor_sign ? (
                        <img
                          src={eSign.supervisor_sign}
                          alt="chemist eSign"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                      <br></br>
                      {printData[printData.length - 1]?.["supervisor_sign"]}
                      <br></br>
                      {formatDateAndTime(
                        printData[printData.length - 1]?.[
                          "supervisor_submit_on"
                        ]
                      )}
                    </td>
                    <td
                      colspan="17"
                      style={{
                        height: "60%",
                        textAlign: "center",
                        borderTop: "none",
                      }}
                    >
                      {eSign.hod_sign ? (
                        <img
                          src={eSign.hod_sign}
                          alt="chemist eSign"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                      <br></br>
                      {printData[printData.length - 1]?.["hod_sign"]}
                      <br></br>
                      {formatDateAndTime(
                        printData[printData.length - 1]?.["hod_submitted_on"]
                      )}
                    </td>
                  </tr>
                </table>

                <table>
                  <thead>
                    <tr>
                      <td style={{ border: "none", padding: "5px" }}></td>
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
          </>
        )}
        {paginateData.length > 2 && (
          <>
            {glassReport.map((bodyContent, pageIndex) => (
              <div className="page-break">
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr>
                    <td style={{ border: "none", padding: "10px" }}></td>
                  </tr>
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
                      CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC
                    </td>
                    <td style={{ padding: "0.5em" }}>Format No.:</td>
                    <td style={{ padding: "0.5em" }}>PH-QAD01-F-051</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Revision No.:</td>
                    <td style={{ padding: "0.5em" }}>01</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                    <td style={{ padding: "0.5em" }}>PH-QAD01-D-47</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Page No.:</td>
                    <td style={{ padding: "0.5em" }}>
                      1 of {numberOfPages2 + 1}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "none", padding: "15px" }}></td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <td style={{ padding: "10px" }} colSpan={33}>
                      Department Name: {printData[0].department}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={Number(selectMonthDates.length / 2) + 1}>
                      Month & Year : {getMonthName(printData[0].month)}&
                      {printData[0].year}{" "}
                    </td>
                    <td
                      colSpan={
                        Number(selectMonthDates.length) == 29 ||
                        Number(selectMonthDates.length) == 31
                          ? Number(selectMonthDates.length / 2) + 1
                          : Number(selectMonthDates.length / 2)
                      }
                    >
                      Frequency: Daily
                    </td>
                    <td rowSpan={3} style={{ textAlign: "center" }}>
                      Remarks
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={2} style={{ textAlign: "center" }}>
                      Identification No.
                    </td>
                    <td colSpan={getColSpan()} style={{ textAlign: "center" }}>
                      Status as on date
                    </td>
                  </tr>

                  <tr>
                    {selectMonthDates.map((record, rowIndex) => (
                      <td key={rowIndex} className="data-border">
                        <p
                          style={{
                            width: "10px",
                            height: "90px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {rowIndex + 1}
                        </p>
                      </td>
                    ))}
                  </tr>
                  {bodyContent.map((data, dataIndex) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {
                          bodyContent[dataIndex]?.row?.[
                            bodyContent[dataIndex].row.length - 1
                          ]?.identification_no
                        }
                      </td>
                      {selectMonthDates.map((record, rowIndex) => (
                        <td>
                          {fetchPrintData(dataIndex, record, bodyContent)
                            ?.identification_details
                            ? fetchPrintData(dataIndex, record, bodyContent)
                                ?.identification_details
                            : "NA"}
                        </td>
                      ))}
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {
                          bodyContent[dataIndex]?.row?.[
                            bodyContent[dataIndex].row.length - 1
                          ]?.remarks
                        }
                      </td>
                    </tr>
                  ))}
                </table>

                <table>
                  <thead>
                    <tr>
                      <td style={{ border: "none", padding: "15px" }}></td>
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
            {glassReport2.map((bodyContent, pageIndex) => (
              <div className="page-break">
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr>
                    <td style={{ border: "none", padding: "30px" }}></td>
                  </tr>
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
                      CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC
                    </td>
                    <td style={{ padding: "0.5em" }}>Format No.:</td>
                    <td style={{ padding: "0.5em" }}>PH-QAD01-F-051</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Revision No.:</td>
                    <td style={{ padding: "0.5em" }}>01</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                    <td style={{ padding: "0.5em" }}>PH-QAD01-D-47</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Page No.:</td>
                    <td style={{ padding: "0.5em" }}>
                      {pageIndex + 2} of {numberOfPages2 + 1}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "none", padding: "15px" }}></td>
                  </tr>
                </table>
                <table>
                  {bodyContent.map((data, dataIndex) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {
                          bodyContent[dataIndex]?.row?.[
                            bodyContent[dataIndex].row.length - 1
                          ]?.identification_no
                        }
                      </td>
                      {selectMonthDates.map((record, rowIndex) => (
                        <td>
                          {fetchPrintData(dataIndex, record, bodyContent)
                            ?.identification_details
                            ? fetchPrintData(dataIndex, record, bodyContent)
                                ?.identification_details
                            : "NA"}
                        </td>
                      ))}
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {
                          bodyContent[dataIndex]?.row?.[
                            bodyContent[dataIndex].row.length - 1
                          ]?.remarks
                        }
                      </td>
                    </tr>
                  ))}

                  {glassReport2.length == pageIndex + 1 && (
                    <>
                      <tr>
                        <td style={{ textAlign: "center" }}>Checked by</td>
                        {selectMonthDates.map((record, rowIndex) => (
                          <td
                            key={rowIndex}
                            style={{
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                              textAlign: "center",
                            }}
                          >
                            {fetchPrintObjectData(record, printData)?.checked_by
                              ? fetchPrintObjectData(record, printData)
                                  ?.checked_by
                              : "NA"}
                          </td>
                        ))}
                        <td style={{ textAlign: "center" }}>
                          Abbreviation :-<br></br> Intact : I<br /> Crack : C
                          <br /> Damage /<br /> Broken : D
                        </td>
                      </tr>
                    </>
                  )}

                  {glassReport2.length == pageIndex + 1 && (
                    <>
                      <tr>
                        <td
                          colspan="16"
                          style={{
                            textAlign: "center",
                            width: "30%",
                            borderBottom: "none",
                          }}
                        >
                          Verified Supervisor:
                        </td>
                        <td
                          colspan="17"
                          style={{
                            textAlign: "center",
                            width: "35%",
                            borderBottom: "none",
                          }}
                        >
                          Production Head:
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="16"
                          style={{
                            height: "60%",
                            textAlign: "center",
                            borderTop: "none",
                          }}
                        >
                          {eSign.supervisor_sign ? (
                            <img
                              src={eSign.supervisor_sign}
                              alt="chemist eSign"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}
                            />
                          ) : null}
                          <br></br>
                          {printData[printData.length - 1]?.["supervisor_sign"]}
                          <br></br>
                          {formatDateAndTime(
                            printData[printData.length - 1]?.[
                              "supervisor_submit_on"
                            ]
                          )}
                        </td>
                        <td
                          colspan="17"
                          style={{
                            height: "60%",
                            textAlign: "center",
                            borderTop: "none",
                          }}
                        >
                          {eSign.hod_sign ? (
                            <img
                              src={eSign.hod_sign}
                              alt="chemist eSign"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}
                            />
                          ) : null}
                          <br></br>
                          {printData[printData.length - 1]?.["hod_sign"]}
                          <br></br>
                          {formatDateAndTime(
                            printData[printData.length - 1]?.[
                              "hod_submitted_on"
                            ]
                          )}
                        </td>
                      </tr>
                    </>
                  )}
                </table>

                <table>
                  <thead>
                    <tr>
                      <td style={{ border: "none", padding: "15px" }}></td>
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
          </>
        )}
      </div>
      <BleachingHeader
        formName={"CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC"}
        formatNo={"PH-QAD01-F-051"}
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
        title="CONTROL OF GLASS /HARD PLASTIC / WOOD / CERAMIC (Print)"
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
          marginLeft: "10px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            marginTop: "8px",
          }}
        >
          Date :
        </div>
        <Input
          type="date"
          max={today}
          onChange={(e) => {
            handleFormParams(e.target.value, "date");
          }}
          style={{ width: "150px", textAlign: "center" }}
        ></Input>
        <Button
          key="go"
          onClick={handleGo}
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
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

export default QualityAssurance_f43_Summary;
