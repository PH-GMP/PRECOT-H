/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader.js";
import dayjs from "dayjs";
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
  DatePicker,
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

const PPC_002_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [shift, setShift] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const [printMonth, setPrintMonth] = useState("");
  const [printYear, setPrintYear] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const [date, setDate] = useState("");
  const [assistantDate, setAssistanatDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [shiftLov, setShiftLov] = useState([]);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [assistant, setAssistant] = useState("");
  const [hod_status, setHod_status] = useState("");
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedmonth, setSelectedmonth] = useState(null);
  const [monthyear, setMonthyear] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  function formatMonthYear(monthyear) {
    if (!monthyear) {
      // Return a default value or an empty string if monthyear is undefined or null
      return "Unknown";
    }
    const [year, month] = monthyear.split("-");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[parseInt(month) - 1]}/${year}`;
  }

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
  const date1 = formatDates(selectedDate);

  //     const GlobalStyle = createGlobalStyle`
  //     @media print {
  //       @page {
  //         size: landscape;
  //       }
  //     }
  //   `;
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
      // render: (text, record, index) => index + 1,
      render: (text, record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatdate(text),
    },
    {
      title: " Year-Month",
      dataIndex: "monthyear",
      key: "monthyear",
      align: "center",
    },
    // {
    //   title: "Year",
    //   dataIndex: "year",
    //   key: "year",
    //   align: "center",
    // },
    {
      title: "Assistant Status",
      dataIndex: "sup_status",
      key: "sup_status",
      align: "center",
    },
    {
      title: "Incharge Status",
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

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handlePrint = () => {
    setShowModal(true);

    // console.log("print screen works");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handleCancel = () => {
    setShowModal(false);
    // Reset form fields
    setSelectedmonth(null);
    setSelectedYear(null);
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
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });
        // console.log("edit response", res.data.orderNo);
        if (res.data && res.data.length !== 0) {
          const isHODRejected = res.data.some(
            (data) => data.ppc_Incharge_status === "INCHARGE_REJECTED"
          );
          setReason(isHODRejected);
        }

        res.data.forEach((item, index) => {
          // console.log(`orderNo for item ${index}:`, item.orderNo);
        });
        setGetData(res.data);
        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x, index) => ({
              // Handle potential null or undefined values
              date: x.date,
              sup_status: x.assistant_status,
              hod_status: x.ppc_Incharge_status,
              monthyear: x.monthyear,
              year: x.year,
              operator_status: x.operator_status,
              reason: x.reason || "NA",
            }))
          );
        } else {
          setSummary([]);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]); // Set an empty array in case of error
        navigate("/Precot/PPC/F-002/Summary");
      }
    };

    const summaryUrl = `${API.prodUrl}/Precot/api/Ppc/getMonthlyplanSummary`;

    fetchSummary(summaryUrl);
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (data.ppc_Incharge_status === "INCHARGE_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [getData]);

  // console.log("selectedShift", selectedShift);
  const handleMonthyearChange = (value) => {
    const formattedMonthYear = dayjs(value).format("YYYY-MM");
    console.log("formatted monthyear", formattedMonthYear);
    setMonthyear(formattedMonthYear); // Save the formatted value
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
  // const monthYear = `${year}-${month}`;
  console.log("monthyr", monthyear);
  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }

  const years = generateYearOptions(2024, 2040);

  const handleEdit = (x) => {
    // console.log("particular ", x);
    navigate("/Precot/PPC/F-002", {
      state: {
        date: x.date,
        monthyear: x.monthyear,
      },
    });
    // console.log("edit screen", x);
    // console.log("order Number123", x.orderNo);
  };

  const printDataSubmit = () => {
    if (hod_status !== "INCHARGE_APPROVED") {
      message.error("Incharge approval required before submitting.");
      return;
    }
    if (!printResponseData || printResponseData.length === 0) {
      // message.error("No data available to print.");
      return;
    }

    window.print();
  };

  const fetchBmrOptions = async (selectedYear) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    const monthYear = `${selectedYear}-${selectedmonth}`;
    console.log("monthyr", monthYear);
    axios
      .get(
        `${API.prodUrl}/Precot/api/Ppc/getMonthlyplanSummaryPrint?monthYear=${monthYear}`,
        { headers }
      )
      .then((res) => {
        const data = res.data[0];
        console.log("edit data", data);
        setAssistant(data.assistant_sign);
        setAssistanatDate(data.assistant_submit_on);
        setHod(data.hod_sign);
        setHodDate(data.ppc_Incharge_submit_on);
        setHod_status(data.ppc_Incharge_status);
        if (res.data && res.data.length > 0) {
          setPrintResponseData(res.data);
          setAssistant(res.data[0].assistant_sign);
          setAssistanatDate(res.data[0].assistant_submit_on);
          setHod(res.data[0].hod_sign);
          setHodDate(res.data[0].ppc_Incharge_submit_on);
          // setHod_status(res.data[0].hod_status);
          // setPrintLaydown(value);
        } else {
          setPrintResponseData([]);
          message.error("no data found...!");

          return;
        }
        //op
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.assistant_sign}`,
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
            setGetImage(url);
          })
          .catch((err) => {
            // console.log("Error in fetching image:", err);
          });
        //////////////
        //////////////
        //hod
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.ppc_Incharge_sign}`,
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
            setGetImage1(url);
          })
          .catch((err) => {
            // console.log("Error in fetching image:", err);
          });
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  };

  const handleNavigate = () => {
    if (monthyear == "") {
      // setError('Please select a date');
      message.warning("Please Select Month & Year");
    } else {
      navigate("/Precot/PPC/F-002", {
        state: { monthyear: monthyear },
      });
    }
  };

  const yearChange = (value) => {
    // console.log("Order number selected:", value);
    setSelectedYear(value);
    fetchBmrOptions(value);
  };
  const monthChange = (value) => {
    setSelectedmonth(value);
  };

  console.log("month", month);

  const formatDate = (dateStr) => {
    // Check if the date is already in the format dd/MM/yyyy
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

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {/* <div
          // key={pageIndex}
          style={{ marginTop: "40px", pageBreakAfter: "always" }}
        > */}
        {printResponseData.map((data, index) => (
          <table style={{ scale: "100%", marginTop: "30px" }}>
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
                <td rowspan="4" colSpan="10" style={{ textAlign: "center" }}>
                  <b>Monthly plan Summary Details</b>{" "}
                </td>
                <td colSpan="1">Format No.:</td>
                <td colSpan="3">PH-PPC01/F-002</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Revision No.:</td>
                <td colSpan="3">01</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Ref.SOP No.:</td>
                <td colSpan="3">PH-PPC01-D-01 </td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Page No.:</td>
                <td colSpan="3">
                  {" "}
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
                <th colSpan={9}>Month:{formatMonthYear(data.monthyear)}</th>
                <th colSpan={6}>Date :{data.date} </th>
              </tr>
              <tr>
                <th colSpan={1}>Description</th>
                <th colSpan={2}>Bleaching in Kg</th>
                <th colSpan={2}>Spunlace in Kg</th>
                <th colSpan={2}>Pad Punching in Bags</th>
                <th colSpan={2}>Ball Making in Bags</th>
                <th colSpan={2}>Pleat Making in Bags</th>
                <th colSpan={1}>Buds Making in Bags</th>
                <th colSpan={1}>Wool roll in Bags</th>
                <th colSpan={1}>External Fleece in Kg</th>
              </tr>
              {data?.productionData?.length > 0 && (
                <>
                  <tr>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      Total Required Production
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.bleachingKg || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.spunlaceKg || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.padPunchingBags || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.ballMakingBags || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.pleatMakingBags || ""}
                    </th>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.budsMakingBags || ""}
                    </th>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.woolRollBags || ""}
                    </th>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.externalFleece || ""}
                    </th>
                  </tr>

                  <tr>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      No of working days
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.workDaysBleaching || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.workDaysSpunlace || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.workDaysPadPunching || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.workDaysBallMaking || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.workDaysPleatMaking || ""}
                    </th>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.workDaysBudsMaking || ""}
                    </th>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.workDaysWoolRoll || ""}
                    </th>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.workDaysExternalFleece || ""}
                    </th>
                  </tr>

                  <tr>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      Required avg. prod./day
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.totalProdBleaching || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.totalProdSpunlace || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.totalProdPadPunching || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.totalProdBallMaking || ""}
                    </th>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.totalProdPleatMaking || ""}
                    </th>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.totalProdBudsMaking || ""}
                    </th>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.totalProdWoolRoll || ""}
                    </th>
                    <th colSpan={1} style={{ textAlign: "center" }}>
                      {data.productionData[0]?.totalProdExternalFleece || ""}
                    </th>
                  </tr>
                </>
              )}
              <tr>
                <th colSpan={15} style={{ height: "50px" }}>
                  Note: {data.note}
                </th>
              </tr>
              <tr>
                <th colSpan={15} style={{ height: "50px" }}>
                  Challenges: {data.challenges}
                </th>
              </tr>
              <tr>
                <th
                  colSpan={9}
                  style={{
                    height: "50px",
                    textAlign: "center",
                    verticalAlign: "top",
                  }}
                >
                  {" "}
                  Prepared By
                  <br />
                  {getImage && (
                    <img className="signature" src={getImage1} alt="logo" />
                  )}
                  <br />
                  {data.assistant_sign}
                  <br />
                  {formattedDateassistant}
                </th>
                <th
                  colSpan={6}
                  style={{
                    height: "50px",
                    textAlign: "center",
                    verticalAlign: "top",
                  }}
                >
                  Approved By <br />
                  {getImage1 && (
                    <img className="signature" src={getImage1} alt="logo" />
                  )}
                  <br />
                  {data.ppc_Incharge_sign}
                  <br />
                  {formattedDateHod}
                </th>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <br />
              <tr style={{ height: "30px" }}>
                <td colSpan={6}>Particulars</td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Prepard by
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Reviewed by
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Approved by
                </td>
              </tr>

              <tr style={{ height: "30px" }}>
                <td colSpan={6}>Name</td>
                <td colSpan={3}></td>
                <td colSpan={3}></td>
                <td colSpan={3}></td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={6}>Signature & Date</td>
                <td colSpan={3}></td>
                <td colSpan={3}></td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        ))}
        {/* </div> */}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="Monthly plan Summary Details"
        formatNo="PH-PPC01/F-002"
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
      {/* <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "15px",
          }}
        >
          <Form.Item label="Month">
            <Select
              onChange={monthChange}
              options={months}
              placeholder="Choose Month"
            />
          </Form.Item>
          <Form.Item label="Year">
            <Select
              onChange={yearChange}
              options={years}
              placeholder="Choose Year"
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
      </Row> */}
      <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "15px",
          }}
        >
          <Form.Item label="Month & Year">
            <DatePicker
              onChange={handleMonthyearChange}
              picker="month"
              format="YYYY-MM" // Ensures the format is yyyy-mm
              placeholder="Choose Month & Year"
              // disabledDate={(current) => current && current > dayjs().endOf('month')}
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
          // pagination={{ pageSize: 5 }}
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
            disabled={!selectedmonth || !selectedYear}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Month">
            <Select
              onChange={monthChange}
              options={months}
              placeholder="Choose Month"
              value={selectedmonth}
            />
          </Form.Item>
          <Form.Item label="Year">
            <Select
              onChange={yearChange}
              options={years}
              placeholder="Choose Year"
              value={selectedYear}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default PPC_002_summary;
