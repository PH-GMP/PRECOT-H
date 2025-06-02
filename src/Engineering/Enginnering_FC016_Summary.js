/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader.js";

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

const Engineering_FC016_Summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [shift, setShift] = useState("");

  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [details, setDetails] = useState([]);
  const [role, setRole] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const departmentMap = {
    1: "Bleaching",
    2: "Spunlace",
    3: "Pad Punching",
    4: "Dry Goods",
    5: "Lab",
    6: "Quality Assurance",
    7: "PPC",
    8: "Store",
    11: "ETP",
  };

  const token = localStorage.getItem("token");
  const departmentId = localStorage.getItem("departmentId");
  const [department, setDepartment] = useState(
    departmentMap[departmentId] || ""
  );
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const [date, setDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [hodStatus, setHodStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedMachineNo, setSelectedMachineNo] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [machineIdNoOptions, setmachineIdNoOptions] = useState([]);
  const [machineIdNo, setmachineIdNo] = useState("");
  const [selectedMachineIdNo, setSelectedMachineIdNo] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
    setPrintLoading(false);
    setSelectedDate("");
    setDepartment("");
    setSelectedMonth("");
    setSelectedYear("");
    form.resetFields();
  };

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
      title: "department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "machine Id No",
      dataIndex: "machineIdNo",
      key: "machineIdNo",
      align: "center",
    },
    {
      title: "Supervisor Status",
      dataIndex: "sup_status",
      key: "sup_status",
      align: "center",
    },
    {
      title: "HOD Status",
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
            Edit
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
    const username = localStorage.getItem("username");
    setRole(userRole);
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });

        setGetData(res.data);
        const isHODRejected = res.data.some(
          (data) => data.hodStatus === "HOD_REJECTED"
        );
        setReason(isHODRejected);

        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x, index) => ({
              date: x.date,
              department: x.department,
              machineIdNo: x.machineIdNo,
              tolerance: x.tolerance,
              capacity: x.capacity,
              sup_status: x.engineeringSupervisorStatus,
              hod_status: x.hodStatus,
              shift: x.shift,
              orderNo: x.orderNo,
              op_status: x.operator_status,
              reason: x.reason,
              index: x.index,
            }))
          );
        } else {
          setSummary([]);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
      }
    };

    const summaryUrl = `${ API.prodUrl}/Precot/api/Engineering/getWeightScaleSummary?username=${username}`;

    fetchSummary(summaryUrl);
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (data[0]?.hodStatus === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [getData]);

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

  const handleMachineNoChange = (value) => {
    setSelectedMachineNo(value);
  };
  const handleEdit = (x) => {
    const { machineIdNo } = x;
    const machineDetails = machineData[machineIdNo] || {};
    const { tolerance, capacity } = machineDetails;
    navigate("/Precot/Engineering/FC-016", {
      state: {
        date: x.date,
        department: x.department,
        machineIdNo: x.machineIdNo,
        tolerance: tolerance,
        capacity: capacity,
      },
    });
  };
  const departmantLOV = [
    "Bleaching",
    "Spunlace",
    "Pad Punching",
    "QC",
    "ETP",
    "Store",
  ];

  const machineIdNoMapping = {
    Admin: ["PH-WB-01"],
    "QC Lab": [
      "PH-WM-01",
      "PH-WM-02",
      "PH-WM-03",
      "PH-WM-04",
      "PH-WM-05",
      "PH-WM-06",
      "PH-WM-16",
      "PH-WM-26",
    ],
    "Pad Punching": [
      "PH-WM-07",
      "PH-WM-08",
      "PH-WM-09",
      "PH-WM-10",
      "PH-WM-11",
    ],
    "Dry Goods": [
      "PH-WM-12",
      "PH-WM-15",
      "PH-WM-17",
      "PH-WM-18",
      "PH-WM-19",
      "PH-WM-20",
      "PH-WM-21",
      "PH-WM-22",
      "PH-WM-23",
    ],
    Store: ["PH-WM-13"],
    Spunlace: ["PH-WM-14"],
    Bleaching: ["PH-WM-24", "PH-WM-25"],
  };

  // const machineData = {
  //     "PH-WB-01": { capacity: "60 Tonns", tolerance: "NA" },
  //     "PH-WM-01": { capacity: "6 Kg", tolerance: "+/-0.6gm" },
  //     "PH-WM-02": { capacity: "220gm", tolerance: "+/-0.0003gm" },
  //     "PH-WM-03": { capacity: "820gm", tolerance: "+/-0.06gm" },
  //     "PH-WM-04": { capacity: "300gm", tolerance: "+/-0.03gm" },
  //     "PH-WM-05": { capacity: "300gm", tolerance: "+/-0.03gm" },
  //     "PH-WM-06": { capacity: "220gm", tolerance: "+/-0.0003gm" },
  //     "PH-WM-07": { capacity: "600kg", tolerance: "+/-0.9kg" },
  //     "PH-WM-08": { capacity: "6kg", tolerance: "+/-0.006kg" },
  //     "PH-WM-09": { capacity: "100kg", tolerance: "+/-0.06kg" },
  //     "PH-WM-10": { capacity: "6kg", tolerance: "+/-0.003kg" },
  //     "PH-WM-11": { capacity: "6kg", tolerance: "+/-0.003kg" },
  //     "PH-WM-12": { capacity: "6kg", tolerance: "+/-3gm" },
  //     "PH-WM-13": { capacity: "100kg", tolerance: "+/-0.06kg" },
  //     "PH-WM-14": { capacity: "600kg", tolerance: "+/-0.9kg" },
  //     "PH-WM-15": { capacity: "6 Kg", tolerance: "+/-3gm" },
  //     "PH-WM-16": { capacity: "3kg", tolerance: "+/-1.2gm" },
  //     "PH-WM-17": { capacity: "3kg", tolerance: "+/-1.2gm" },
  //     "PH-WM-18": { capacity: "6kg", tolerance: "+/-1.2gm" },
  //     "PH-WM-19": { capacity: "6kg", tolerance: "+/-1.2gm" },
  //     "PH-WM-20": { capacity: "6kg", tolerance: "+/-1.2gm" },
  //     "PH-WM-21": { capacity: "300g", tolerance: "+/-0.03gm" },
  //     "PH-WM-22": { capacity: "100kg", tolerance: "+/-0.06kg" },
  //     "PH-WM-23": { capacity: "100kg", tolerance: "+/-0.06kg" },
  //     "PH-WM-24": { capacity: "50kg", tolerance: "+/-0.045kg" },
  //     "PH-WM-25": { capacity: "600kg", tolerance: "+/-0.9kg" },
  //     "PH-WM-26": { capacity: "220gm", tolerance: "+/-0.0003gm" },
  // };

  const machineData = {
    "PH-WB-01": { capacity: "60 Tonns", tolerance: "NA" },
    "PH-WM-01": { capacity: "6 Kg", tolerance: "+/-0.6gm" },
    "PH-WM-02": { capacity: "220gm", tolerance: "+/-0.0003gm" },
    "PH-WM-03": { capacity: "820gm", tolerance: "+/-0.06gm" },
    "PH-WM-04": { capacity: "300gm", tolerance: "+/-0.03gm" },
    "PH-WM-05": { capacity: "300gm", tolerance: "+/-0.03gm" },
    "PH-WM-06": { capacity: "220gm", tolerance: "+/-0.0003gm" },
    "PH-WM-07": { capacity: "600kg", tolerance: "+/-900g" },
    "PH-WM-08": { capacity: "6kg", tolerance: "+/-03g" },
    "PH-WM-09": { capacity: "100kg", tolerance: "+/-600g" },
    "PH-WM-10": { capacity: "6kg", tolerance: "+/-03g" },
    "PH-WM-11": { capacity: "6kg", tolerance: "+/-03g" },
    "PH-WM-12": { capacity: "6kg", tolerance: "+/-3gm" },
    "PH-WM-13": { capacity: "100kg", tolerance: "+/-0.06kg" },
    "PH-WM-14": { capacity: "600kg", tolerance: "+/-0.9kg" },
    "PH-WM-15": { capacity: "6 Kg", tolerance: "+/-3gm" },
    "PH-WM-16": { capacity: "3kg", tolerance: "+/-1.2gm" },
    "PH-WM-17": { capacity: "3kg", tolerance: "+/-1.2gm" },
    "PH-WM-18": { capacity: "6kg", tolerance: "+/-1.2gm" },
    "PH-WM-19": { capacity: "6kg", tolerance: "+/-1.2gm" },
    "PH-WM-20": { capacity: "6kg", tolerance: "+/-1.2gm" },
    "PH-WM-21": { capacity: "300g", tolerance: "+/-0.03gm" },
    "PH-WM-22": { capacity: "100kg", tolerance: "+/-0.06kg" },
    "PH-WM-23": { capacity: "100kg", tolerance: "+/-0.06kg" },
    "PH-WM-24": { capacity: "50kg", tolerance: "+/-0.045kg" },
    "PH-WM-25": { capacity: "600kg", tolerance: "+/-0.9kg" },
    "PH-WM-26": { capacity: "220gm", tolerance: "+/-0.0003gm" },
  };
  const printSubmit = () => {
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
    fetchData();
  };

  const fetchData = () => {
    let baseUrl = `${ API.prodUrl}/Precot/api/Engineering/getweightScalePrint?machineIdNo=${selectedMachineIdNo}&month=${selectedMonth}&year=${selectedYear}`;
    let query = [];

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
          setDetails(response.data.details);
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
        axios
          .get(
            `${ API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.engineeringSupervisorSign}`,
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
            setGetImage(url);
          })
          .catch((err) => {});
        axios
          .get(
            `${ API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.hodSign}`,
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
            setGetImage1(url);
          })
          .catch((err) => {});
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
    } else if (machineIdNo == "") {
      message.warning("Please select the Weighing Balance");
    } else {
      const machineDetails = machineData[machineIdNo] || {};
      const { tolerance, capacity } = machineDetails;

      navigate("/Precot/Engineering/FC-016", {
        state: {
          date: date,
          machineIdNo: machineIdNo,
          department: department,
          tolerance: tolerance || "N/A",
          capacity: capacity || "N/A",
        },
      });
    }
  };
  const departmentchange = (value) => {
    setDepartment(value);
    setmachineIdNo("");
  };
  const selectedDepartmentchange = (value) => {
    setSelectedDepartment(value);
    setmachineIdNo("");
  };

  const machineOptions = machineIdNoMapping[department] || [];

  const machineOptions2 = machineIdNoMapping[selectedDepartment] || [];

  const formatDate = (dateStr) => {
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
  const formattedDatesupervisor = formatDate(
    printResponseData.supervisor_submit_on
  );
  const formatedDateOperator = formatDate(
    printResponseData.operator_submitted_on
  );
  const formattedDateHod = formatDate(printResponseData.hod_submit_on);
  const dateformated = formatDates(selectedDate);

  const recordsPerPage = 6;
  const totalPages = Math.ceil(printResponseData.length / recordsPerPage);

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };
  return (
    <div>
      <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <table style={{ marginTop: "30px", scale: "95%" }}>
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
                  <b style={{ fontFamily: "Times New Roman, Times, serif" }}>
                    Unit H
                  </b>
                </td>
                <td rowSpan="4" colSpan="3" style={{ textAlign: "center" }}>
                  <b>Weighing Scales Calibration Record</b>{" "}
                </td>
                <td colSpan="1">Format No.:</td>
                <td colSpan="2">PH-ENG01/FC-016</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Revision No.:</td>
                <td colSpan="2">01</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Ref.SOP No.:</td>
                <td colSpan="2">PH-ENG01-D-04</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Page No.:</td>
                <td colSpan="2">
                  {" "}
                  {pageIndex + 1} of {totalPages}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }}></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td colSpan={2}>Department Name:</td>
                <td colSpan={2}>{printResponseData[0]?.department}</td>
                <td colSpan={2}>Std wt. Cal. Cert No:</td>
                <td colSpan={2}>{printResponseData[0]?.stdWtCalCertNo}</td>
              </tr>
              <tr>
                <td colSpan={2}>Capacity:</td>
                <td colSpan={2}>{printResponseData[0]?.capacity}</td>
                <td colSpan={2}>Machine ID No:</td>
                <td colSpan={2}>{printResponseData[0]?.machineIdNo}</td>
              </tr>
              <tr>
                <td colSpan={2}>Tolerances:</td>
                <td colSpan={2}>{printResponseData[0]?.tolerances}</td>
                <td colSpan={2}>Measurement Unit:</td>
                <td colSpan={2}>{printResponseData[0]?.measurementunit}</td>
              </tr>
              <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Date
                </td>
                <td colSpan={1} style={{ textAlign: "center", width: "100px" }}>
                  Weight in <br />
                  (g / Kg)
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Observed weight
                  <br />
                  in <br />
                  (g / Kg)
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Range in <br />
                  (g / Kg)
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Done by
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Status <br />
                  (Pass/Fail)
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Checked <br />
                  by
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Remarks
                </td>
              </tr>

              {paginateData(printResponseData, pageIndex + 1).map(
                (record, index) =>
                  record.details.map((item, itemIndex) => (
                    <tr key={itemIndex} style={{ width: "50%" }}>
                      <td colSpan={1} style={{ textAlign: "center" }}>
                        {formatDates(record.date)}
                      </td>
                      <td colSpan={1} style={{ textAlign: "center" }}>
                        {item.weightInGKg}
                      </td>
                      <td colSpan={1} style={{ textAlign: "center" }}>
                        {item.observedWeightInGKg}
                      </td>
                      <td colSpan={1} style={{ textAlign: "center" }}>
                        {item.rangeInGKg}
                      </td>
                      <td colSpan={1} style={{ textAlign: "center" }}>
                        <>
                          {getImage && (
                            <img className="signature" src={getImage} />
                          )}
                        </>
                        <br />
                        {record.engineeringSupervisorSign}
                        <br />
                        {formatDate(record.engineeringSupervisorSubmitOn)}
                      </td>
                      <td colSpan={1} style={{ textAlign: "center" }}>
                        {item.status}{" "}
                      </td>
                      <td colSpan={1} style={{ textAlign: "center" }}>
                        {" "}
                        <>
                          {getImage1 && (
                            <img className="signature" src={getImage1} />
                          )}
                        </>
                        <br />
                        {record.hodSign}
                        <br />
                        {formatDate(record.hodSubmitOn)}
                        <br />
                      </td>
                      <td
                        colSpan={1}
                        style={{
                          textAlign: "center",
                          width: "50px",
                          textWrap: "pretty",
                        }}
                      >
                        {item.remarks}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
            <br />
            <tfoot>
              <br />
              <tr style={{ height: "30px" }}>
                <td colSpan={2}>Particulars</td>
                <td colSpan={2}>Prepared by</td>
                <td colSpan={2}>Reviewed by</td>
                <td colSpan={2}>Approved by</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={2}>Name</td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={2}>Signature & Date</td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="WEIGHING SCALES CALIBRATION RECORD"
        formatNo="PH-ENG01/FC-016"
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

      <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "25px",
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
          <Form.Item label=" Department Name:">
            <Select
              showSearch
              value={department}
              onChange={departmentchange}
              style={{ width: "100%" }}
              placeholder="Search Batch No"
              optionFilterProp="children"
              disabled
            >
              <Select.Option value="" disabled selected>
                Department Name:
              </Select.Option>
              {departmantLOV.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Machine ID">
            <Select
              showSearch
              value={machineIdNo}
              onChange={setmachineIdNo}
              style={{ width: "160px" }}
              placeholder="Select Machine ID"
              optionFilterProp="children"
              disabled={!department}
            >
              {machineOptions.map((id) => (
                <Select.Option key={id} value={id}>
                  {id}
                </Select.Option>
              ))}
            </Select>
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
            onClick={printSubmit}
            loading={printLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label=" Department Name:">
            <Select
              showSearch
              value={selectedDepartment}
              onChange={selectedDepartmentchange}
              style={{ width: "100%" }}
              placeholder="Search Batch No"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Department Name:
              </Select.Option>
              {departmantLOV.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Machine No."
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
            validateStatus={selectedDate ? "success" : ""}
          >
            <Select
              showSearch
              value={selectedMachineIdNo}
              onChange={setSelectedMachineIdNo}
              style={{ width: "100%" }}
              placeholder="Select Machine ID"
              optionFilterProp="children"
              disabled={!selectedDepartment}
            >
              {machineOptions2.map((id) => (
                <Select.Option key={id} value={id}>
                  {id}
                </Select.Option>
              ))}
            </Select>
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
        </Form>
      </Modal>
    </div>
  );
};
export default Engineering_FC016_Summary;
