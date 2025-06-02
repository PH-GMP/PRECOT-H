/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader.js";

import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const PPC_f003_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [shift, setShift] = useState("");
  const [CustomerName, setCustomerName] = useState("");
  const [customerNamePrint, setCustomerNamePrint] = useState("");
  const [customers, setCustomers] = useState([]);

  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [productName, setProductName] = useState("");
  const [gsm, setGsm] = useState("");
  const [width, setWidth] = useState("");
  const [unwinder, setUnwinder] = useState("");
  const [rewinder, setRewinder] = useState("");
  const [cutterTrim, setCutterTrim] = useState("");
  const [layonTrim, setLayonTrim] = useState("");
  const [noOfFlagsInRoll, setNoOfFlagsInRoll] = useState("");
  const [pressureAtMinDia, setPressureAtMinDia] = useState("");
  const [uwData, setUwData] = useState("");
  const [tension, setTension] = useState("");
  const [diameter, setDiameter] = useState("");
  const [mixing, setMixing] = useState("");
  const [pattern, setPattern] = useState("");
  const [moisture, setMoisture] = useState("");
  const [thickness, setThickness] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const [date, setDate] = useState("");
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [assistantStatus, setAssistantStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [plantHeadImage, setPlantHeadImage] = useState(null);
  const [abCottonImage, setABCottonImage] = useState(null);
  const [seniorManagerImage, setSeniorManagerImage] = useState(null);
  const [businessDevelopmentImage, setBusinessDevelopmentImage] =
    useState(null);
  const [businessDevelopment1Image, setBusinessDevelopment1Image] =
    useState(null);
  const [developmentPurchaseimage, setDevelopmentPurchaseImage] =
    useState(null);
  const [planningImage, setPlanningImage] = useState(null);
  const [storesImage, setStoresImage] = useState(null);
  const [spunlaceImage, setSpunlaceImage] = useState(null);
  const [padPunchingImage, setPadPunchingImage] = useState(null);
  const [ballPleatWoolrollImage, setBallPleatWoolrollImage] = useState(null);
  const [bagMakingImage, setBagMakingImage] = useState(null);
  const [qaqcImage, setQAQCImage] = useState(null);
  const [logisticDispatchImage, setLogisticDispatchImage] = useState(null);

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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
    },
    {
      title: "Market Representative Status",
      dataIndex: "marketRepresentativeStatus",
      key: "marketRepresentativeStatus",
      align: "center",
    },
    {
      title: "PPC Assistant Status",
      dataIndex: "assistantStatus",
      key: "assistantStatus",
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
            Edit
          </Button>
        </>
      ),
    },
  ];

  let columns = baseColumns;

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

        if (Array.isArray(res.data) && res.data.length > 0) {
          setSummary(res.data); // or res.data[0] if you need only one item
        } else {
          console.warn("Empty or unexpected data structure:", res.data);
          setSummary([]); // fallback to empty array
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
        navigate("/Precot/PPC/F-003/Summary");
      }
    };

    const summaryUrl = `${API.prodUrl}/Precot/api/Ppc/GetContractReviewMeetingSummary`;
    fetchSummary(summaryUrl);
  }, []);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(
          `${API.prodUrl}/Precot/api/Ppc/getCustomerName`,
          { headers }
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          const uniqueCustomers = Array.from(
            new Map(res.data.map((item) => [item.value, item])).values()
          );
          console.log("uniqueCustomers", uniqueCustomers);
          setCustomers(uniqueCustomers);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);

        navigate("/Precot/PPC/F-003/Summary");
      }
    };
    fetchCustomer();
  }, []);

  console.log("Summary", summary);

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };
  const handleEdit = (x) => {
    console.log("date", x.date);
    console.log("consumerNAme", x.customerName);
    navigate("/Precot/PPC/F-003", {
      state: {
        date: x.date,
        CustomerName: x.customerName,
      },
    });
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

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedDate("");
    setSelectedMonth("");
    setCustomerNamePrint("");
    setSelectedYear("");
    setPrintLoading(false);
    form.resetFields();
  };

  const printDataSubmit = () => {
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
        form.resetFields();
        return;
      }
    }
    fetchPrintData();
  };

  const fetchPrintData = () => {
    let baseUrl = `${API.prodUrl}/Precot/api/Ppc/GetContractReviewMeetingPrint?`;
    let query = [];

    if (selectedDate) {
      query.push(`date=${selectedDate}`);
    }
    if (selectedMonth) {
      query.push(`month=${selectedMonth}`);
    }
    if (selectedYear) {
      query.push(`year=${selectedYear}`);
    }
    if (customerNamePrint) {
      query.push(`customer=${customerNamePrint}`);
    }
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
        setPrintLoading(false);
      });
  };

  const handleNavigate = () => {
    if (date == "") {
      message.warning("Please Select date");
    }
    if (CustomerName == "") {
      message.warning("Please Enter Customer Name");
    } else {
      navigate("/Precot/PPC/F-003", {
        state: { date: date, CustomerName: CustomerName },
      });
    }
  };

  const recordsPerPage = 20;
  const totalPages = Math.ceil(
    (printResponseData.length * 40) / recordsPerPage
  );
  console.log("printResponseData.length", printResponseData.length);

  const paginateData = (data, currentPage) => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div>
      <div id="section-to-print">
        {printResponseData.map((data, index) => {
          return (
            <>
              <table
                style={{
                  marginTop: "30px",
                  borderCollapse: "collapse",
                  scale: "95%",
                }}
              >
                <thead>
                  <tr style={{ border: "none" }}>
                    <td
                      style={{ border: "none", padding: "5px" }}
                      colSpan="15"
                    ></td>
                  </tr>

                  <tr style={{ height: "20px" }}>
                    <td
                      colSpan="2"
                      rowSpan="4"
                      style={{ textAlign: "center", width: "10%" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "80px", height: "auto" }}
                      />
                      <br />
                      <b
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        Unit H
                      </b>
                    </td>
                    <td rowSpan="4" colSpan="8" style={{ textAlign: "center" }}>
                      <b
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        Contract Review Meeting
                      </b>
                    </td>
                    <td colSpan="1">Format No.:</td>
                    <td colSpan="3">PH-PPC01/F-003</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan="1">Revision No.:</td>
                    <td colSpan="3">01</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan="1">Ref.SOP No.:</td>
                    <td colSpan="3">PH-PPC01-D-02</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan="1">Page No.:</td>
                    <td colSpan="3">
                      {index * 2 + 1} of {printResponseData.length * 2}
                    </td>
                  </tr>
                </thead>
                <br />
                <tbody>
                  {/* {paginateData(printResponseData, pageIndex +1).map((data, index) => ( */}

                  {/* <React.Fragment key={index}> */}
                  <tr colSpan="15">
                    <td colSpan="15">DATE:{formatDates(data?.date)}</td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="15">Members Details:</td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="2">Department</td>
                    <td colSpan="5">Name</td>
                    <td colSpan="2">Sign</td>
                    <td colSpan="2">Department</td>
                    <td colSpan="2">Name</td>
                    <td colSpan="2">Sign</td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="1" style={{ height: "50px" }}>
                      Plant Head
                    </td>
                    <td colSpan="6">
                      {data.memberDetails?.find(
                        (member) => member.department === "Plant Head"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Plant Head"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) => member.department === "Plant Head"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Plant Head"
                      )?.name && formatDates(data.date)}
                    </td>
                    <td colSpan="2">AB Cotton</td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "AB Cotton"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="1">
                      {data.memberDetails?.find(
                        (member) => member.department === "AB Cotton"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) => member.department === "AB Cotton"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "AB Cotton"
                      )?.name && formatDates(data.date)}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="2" style={{ height: "50px" }}>
                      Senior Manager
                    </td>
                    <td colSpan="5">
                      {data.memberDetails?.find(
                        (member) => member.department === "Senior Manager"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Senior Manager"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) => member.department === "Senior Manager"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Senior Manager"
                      )?.name && formatDates(data.date)}
                    </td>
                    <td colSpan="2">Spunlace</td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Spunlace"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Spunlace"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) => member.department === "Spunlace"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Spunlace"
                      )?.name && formatDates(data.date)}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td rowSpan="2" colSpan="2" style={{ height: "55px" }}>
                      Business Development
                    </td>
                    <td rowSpan="2" colSpan="5">
                      {data.memberDetails?.find(
                        (member) => member.department === "Business Development"
                      )?.name || "NA"}
                      <br />
                      <br />
                      <br />
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Business Development"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Business Development"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) =>
                                member.department === "Business Development"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Business Development"
                      )?.name && formatDates(data.date)}
                    </td>
                    <td colSpan="2" style={{ height: "50px" }}>
                      Pad Punching
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Pad Punching"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Pad Punching"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) => member.department === "Pad Punching"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Pad Punching"
                      )?.name && formatDates(data.date)}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) =>
                          member.department === "Business Development1"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) =>
                                member.department === "Business Development1"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) =>
                          member.department === "Business Development1"
                      )?.name && formatDates(data.date)}
                    </td>
                    <td colSpan="2" style={{ height: "50px" }}>
                      Ball / Pleat/Wool roll
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) =>
                          member.department === "Ball / Pleat / Wool roll"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) =>
                          member.department === "Ball / Pleat / Wool roll"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) =>
                                member.department === "Ball / Pleat / Wool roll"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) =>
                          member.department === "Ball / Pleat / Wool roll"
                      )?.name && formatDates(data.date)}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="2" style={{ height: "50px" }}>
                      Development /Purchase
                    </td>
                    <td colSpan="5">
                      {data.memberDetails?.find(
                        (member) =>
                          member.department === "Development /Purchase"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) =>
                          member.department === "Development /Purchase"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) =>
                                member.department === "Development /Purchase"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) =>
                          member.department === "Development /Purchase"
                      )?.name && formatDates(data.date)}
                    </td>
                    <td colSpan="2">Bag Making</td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Bag Making"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Bag Making"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) => member.department === "Bag Making"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Bag Making"
                      )?.name && formatDates(data.date)}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="2" style={{ height: "50px" }}>
                      Planning
                    </td>
                    <td colSpan="5">
                      {data.memberDetails?.find(
                        (member) => member.department === "Planning"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Planning"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) => member.department === "Planning"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Planning"
                      )?.name && formatDates(data.date)}
                    </td>
                    <td colSpan="2">QA & QC</td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "QA & QC"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "QA & QC"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) => member.department === "QA & QC"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "QA & QC"
                      )?.name && formatDates(data.date)}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="2" style={{ height: "50px" }}>
                      Stores
                    </td>
                    <td colSpan="5">
                      {data.memberDetails?.find(
                        (member) => member.department === "Stores"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Stores"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) => member.department === "Stores"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Stores"
                      )?.name && formatDates(data.date)}
                    </td>
                    <td colSpan="2">Logistic /Dispatch</td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Logistic / Dispatch"
                      )?.name || "NA"}
                    </td>
                    <td colSpan="2">
                      {data.memberDetails?.find(
                        (member) => member.department === "Logistic / Dispatch"
                      )?.signature ? (
                        <img
                          src={`data:image/png;base64,${
                            data.memberDetails.find(
                              (member) =>
                                member.department === "Logistic / Dispatch"
                            )?.signature
                          }`}
                          style={{ height: "50px", width: "auto" }}
                        />
                      ) : (
                        <p>NA</p>
                      )}
                      <br />
                      {data.memberDetails?.find(
                        (member) => member.department === "Logistic / Dispatch"
                      )?.name && formatDates(data.date)}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="15">Details:{data.details}</td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="15">Customer Name:{data.customerName} </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="7">Billing address:{data.billingAddress}</td>
                    <td colSpan="8">Shipping address:{data.shippingAddress}</td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="5" style={{ height: "50px" }}>
                      Incoterm:{data.incoterm}
                    </td>
                    <td colSpan="5">PI/PO No.:{data.piPoNo}</td>
                    <td colSpan="5">
                      Approved Sample Req. No.:{data.approvedsamplereqNo}
                    </td>
                  </tr>
                  {/* </React.Fragment> */}
                </tbody>
                <br />
                <tfoot>
                  <tr style={{ height: "30px" }}>
                    <td colSpan={4}>Particulars</td>
                    <td colSpan={4}>Prepared by</td>
                    <td colSpan={3}>Reviewed by</td>
                    <td colSpan={3}>Approved by</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan={4}>Name</td>
                    <td colSpan={4}></td>
                    <td colSpan={3}></td>
                    <td colSpan={3}></td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan={4}>Signature & Date</td>
                    <td colSpan={4}></td>
                    <td colSpan={3}></td>
                    <td colSpan={3}></td>
                  </tr>
                </tfoot>
              </table>

              <table
                style={{
                  marginTop: "50px",
                  borderCollapse: "collapse",
                  scale: "95%",
                }}
              >
                <thead>
                  <tr style={{ height: "20px" }}>
                    <td
                      colSpan="2"
                      rowSpan="4"
                      style={{ textAlign: "center", width: "10%" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "80px", height: "auto" }}
                      />
                      <br />
                      <b
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        Unit H
                      </b>
                    </td>
                    <td
                      rowSpan="4"
                      colSpan="10"
                      style={{ textAlign: "center" }}
                    >
                      <b
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        Contract Review Meeting
                      </b>
                    </td>
                    <td colSpan="2">Format No.:</td>
                    <td colSpan="4">PH-PPC01/F-003</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan="2">Revision No.:</td>
                    <td colSpan="4">01</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan="2">Ref.SOP No.:</td>
                    <td colSpan="4">PH-PPC01-D-02</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan="2">Page No.:</td>
                    <td colSpan="4">
                      {index * 2 + 2} of {printResponseData.length * 2}
                    </td>
                  </tr>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }}></td>
                  </tr>
                </thead>

                <tbody>
                  {/* {paginateData(printResponseData, pageIndex +1).map((data, index) => ( */}

                  {/* <React.Fragment key={index}> */}
                  <tr
                    style={{ pageBreakBefore: "always", paddingTop: "5px" }}
                    colSpan="15"
                  >
                    <td colSpan="5" style={{ height: "50px" }}>
                      Payment Term:{data.paymentTerm}
                    </td>
                    <td colSpan="5">
                      PI/PO Date :{formatDates(data.plPoDate)}
                    </td>
                    <td colSpan="5">
                      Final artworks approved date :
                      {formatDates(data.finalArtworkApprovedDate)}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="5" style={{ height: "50px" }}>
                      Delivery Term:{data.deliveryTerm}
                    </td>
                    <td colSpan="5">
                      Customer required dispatch date:
                      {formatDates(data.customerDispatchDate)}
                    </td>
                    <td rowSpan="2" colSpan="5">
                      First production sample <br /> requirements (Yes/No) :
                      {data.firstProductionSample}
                      <br />
                      <br />
                      if yes, only possible during bulk <br />
                      production
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5" style={{ height: "50px" }}>
                      Port of Shipment:{data.portOfShipment}
                    </td>
                    <td colSpan="5">
                      Plant commitment date:
                      {formatDates(data.plantCommitmentDate)}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="5" style={{ height: "50px" }}>
                      Port of Destination:{data.portOfDestination}
                    </td>
                    <td colSpan="5">
                      Customer Master SAP No.:{data.customerMasterSAPNo}
                    </td>
                    <td rowSpan="2" colSpan="5">
                      Special instructions for packing & <br />
                      Packaging :{data.specialInstructions}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="5" style={{ height: "50px" }}>
                      Transporter :{data.transporter}
                    </td>
                    <td colSpan="5">
                      Price updated status in SAP:
                      {data.priceUpdateStatusInSap}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="5">Insurance :{data.insurance}</td>
                    <td colSpan="5">Currency :{data.currency}</td>
                    <td colSpan="5">
                      COA Requirements for <br /> shipment :
                      {data.coaRequirements}
                    </td>
                  </tr>
                  <tr colSpan="15">
                    <td colSpan="5">Freight Liner :{data.freightLiner}</td>
                    <td rowSpan="3" colSpan="5">
                      Commission (Yes/No) - {data.commissionSelected}
                      <br />
                      if yes,update details here <br />
                      {data.commissionDetails}
                    </td>
                    <td rowSpan="3" colSpan="5">
                      Inspection <br /> Method( Precot/External) :{" "}
                      {data.inspectionMethod}
                      <br />
                      If external, give brief <br /> details :
                      {data.inspectionMethodExternal}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">HS Code :{data.hsCode}</td>
                  </tr>
                  <tr>
                    <td colSpan="5">Penalty:{data.penalty}</td>
                  </tr>
                  <tr>
                    <td>Sr. No.</td>
                    <td colSpan="6">Product</td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      PDS No.
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      PO Qty. in Bags
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      Price / Bag
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      Currency
                    </td>
                  </tr>

                  {data.productDetails?.map((product, productIndex) => (
                    <tr key={product.reviewproductId}>
                      <td>{product.srNo}</td>
                      <td colSpan="6">{product.productName}</td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {product.pdsNo}
                      </td>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        {product.poQtyInBags}
                      </td>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        {product.pricePerBag}
                      </td>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        {product.currency}
                      </td>
                    </tr>
                  ))}

                  <tr colSpan="15">
                    <td colSpan="15">
                      Remarks: <br /> {data.remarks}{" "}
                    </td>
                  </tr>
                  {/* </React.Fragment> */}
                </tbody>
                <br />
                <tfoot>
                  <br />
                  <tr style={{ height: "30px" }}>
                    <td colSpan={5}>Particulars</td>
                    <td colSpan={5}>Prepared by</td>
                    <td colSpan={4}>Reviewed by</td>
                    <td colSpan={4}>Approved by</td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan={5}>Name</td>
                    <td colSpan={5}></td>
                    <td colSpan={4}></td>
                    <td colSpan={4}></td>
                  </tr>
                  <tr style={{ height: "30px" }}>
                    <td colSpan={5}>Signature & Date</td>
                    <td colSpan={5}></td>
                    <td colSpan={4}></td>
                    <td colSpan={4}></td>
                  </tr>
                </tfoot>
              </table>
            </>
          );
        })}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="CONTRACT REVIEW MEETING"
        formatNo="PH-PPC01/F-003"
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
          <Form.Item label="Date">
            <Input
              type="date"
              value={date}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Customer Name">
            <Input
              value={CustomerName}
              placeholder="Enter Customer Name"
              style={{ marginLeft: "10px", height: "28px", width: "300px" }}
              onChange={(e) => setCustomerName(e.target.value)} // Set the typed lot number
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
            onClick={printDataSubmit}
            loading={printLoading}
            disabled={
              !selectedDate &&
              !selectedMonth &&
              !selectedYear &&
              !customerNamePrint
            }
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Select Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
            validateStatus={selectedDate ? "success" : ""}
          >
            <Input
              max={today}
              type="date"
              onChange={(e) => handleDateChange(e.target.value)}
            />
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
                marginBottom: "10%",
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
                marginBottom: "10%",
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
            label="Customer Name"
            rules={[{ required: true, message: "Please select a customer" }]}
          >
            <Select
              value={customerNamePrint}
              placeholder="Enter Customer Name"
              style={{ height: "36x", width: "100%" }}
              onChange={(value) => setCustomerNamePrint(value)}
            >
              {customers?.map((customer) => {
                return (
                  <Select.Option key={customer.id} value={customer.value}>
                    {customer.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default PPC_f003_summary;
