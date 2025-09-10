/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  message,
  Modal,
  notification,
  Select,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import axios from "axios";
import moment from "moment";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const { Option } = Select;
const QA_F21_Summary = () => {
  const initial = useRef(false);
  const [deaprtment_list, setdepartment_list] = useState([]);
  const [availableBMRnoLov, setAvailableBMRnoLov] = useState("Select BMR No");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [ccfno_number, setccfno_number] = useState("");
  const [chartdata, setchartdata] = useState("");
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [chartdata_print, setchartdata_print] = useState("");
  const [printfinancial, setprintfinancial] = useState([]);
  const [availableshiftlov, setAvailableShiftslov] = useState("Select Year");
  const [availablemonths, setavailablemonths] = useState(
    "Select FinancialYear"
  );
  const [availablemonths_chart, setavailablemonths_chart] = useState(
    "Select FinancialYear"
  );
  const [availableshiftlov2, setAvailableShiftslov2] = useState("Select Month");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const navigate = useNavigate();
  const [saveLoading, setSaveLoading] = useState(false);
  const [batchno2, setbatchno2] = useState([]);
  const [batchNolist2, setBatchNolist2] = useState("Select Department Name");
  const [selectedMonth, setSelectedMonth] = useState("Select FinancialYear");
  const [batchno, setbatchno] = useState([]);
  const [date, setdate] = useState([]);
  const [date1, setdate1] = useState([]);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const startYear = 2024; // Change this to your desired start year
  const numberOfYears = 20; // Specify how many years you want
  const generateFinancialYears = (startYear, numberOfYears) => {
    const financialYears = [];
    for (let i = 0; i < numberOfYears; i++) {
      const start = startYear + i;
      const end = start + 1; // Next year
      financialYears.push(`${start}-${end}`); // Format: YYYY-YYYY
    }

    return financialYears;
  };
  const financialYears = generateFinancialYears(startYear, numberOfYears);
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

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 50; i++) {
    years.push(currentYear + i);
  }

  const years_fin = [];
  for (let i = 0; i <= 50; i++) {
    const startYear = currentYear + i;
    const endYear = startYear + 1;
    years_fin.push(`${startYear}-${endYear}`);
  }

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      fetchDataOrderNumber();
      fetchDataCCRNO();
    }
  }, []);

  const handlego_chart = async () => {
    fetchchartapi();
  };

  const fetchchartapi = async () => {
    const roleBase = localStorage.getItem("role");
    const monthIndex = months.indexOf(availablemonths);
    if (monthIndex >= 1 && monthIndex < 3) {
      var valuestring = availableshiftlov2 + 1;
    } else {
      var valuestring = availableshiftlov2;
    }
    try {
      setLoading(true);

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityLogBook/trendChart?financialYear=${availablemonths}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        response.data &&
        typeof response.data === "object" &&
        Object.keys(response.data).length === 0
      ) {
        message.warning("No Data Found");
        setavailablemonths(null);
        setAvailableShiftslov2(null);
        setchartdata(null);
        setShowModal(false);
        setLoading(false);
      } else {
        const data = Object.entries(response.data).map(([name, value]) => ({
          name,
          value,
        }));

        // Move the "Total" entry to the end
        data.sort((a, b) => {
          if (a.name === "Total") return 1; // Move "Total" to the end
          if (b.name === "Total") return -1; // Keep "Total" at the end
          return 0; // Keep the order of other elements unchanged
        });

        setchartdata(data);
        setLoading(false);
      }
    } catch (error) {
      // Check if the error is a 403 Forbidden error
      if (error.response && error.response.status === 403) {
        message.warning("You do not have permission to access this form.");
        setTimeout(() => {
          navigate("/Precot/choosenScreen"); // Redirect to the summary page
        }, 1500);
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const fetchchartapi_chart = async (value) => {
    const monthIndex = months.indexOf(availablemonths_chart);

    if (monthIndex >= 1 && monthIndex < 3) {
      var valuestring = value + 1;
    } else {
      var valuestring = value;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityLogBook/trendChart?financialYear=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        response.data &&
        typeof response.data === "object" &&
        Object.keys(response.data).length === 0
      ) {
        setavailablemonths(null);
        setAvailableShiftslov2(null);
        setchartdata(null);
        setavailablemonths(null);
        setAvailableShiftslov2(null);
      } else {
        const data = Object.entries(response.data).map(([name, value]) => ({
          name,
          value,
        }));
        data.sort((a, b) => {
          if (a.name === "Total") return 1; // Move "Total" to the end
          if (b.name === "Total") return -1; // Keep "Total" at the end
          return 0; // Keep the order of other elements unchanged
        });

        setchartdata_print(data);
        setchartdata(null);
      }
    } catch (error) {
      // Check if the error is a 403 Forbidden error
      if (error.response && error.response.status === 403) {
        message.warning("You do not have permission to access this form.");
        setTimeout(() => {
          navigate("/Precot/choosenScreen"); // Redirect to the summary page
        }, 1500);
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchData_dep_by_id = async (value) => {
    const roleBase = localStorage.getItem("role");

    try {
      setLoading(true);

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityLogBook/getForNCLogbook?year=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.message == "No data") {
        message.warning("No Data Found");
        setmodalData(null);
      }
      // If the request is successful, handle the response data
      else if (
        response.data &&
        (response.data?.length > 0 || response.data?.length == undefined)
      ) {
        setmodalData(response.data);
      }
    } catch (error) {
      // Check if the error is a 403 Forbidden error
      if (error.response && error.response.status === 403) {
        message.warning("You do not have permission to access this form.");
        setTimeout(() => {
          navigate("/Precot/choosenScreen"); // Redirect to the summary page
        }, 1500);
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleprint_section = async (value) => {
    const valueFin = `${value}-${value + 1}`;
    const [start, end] = value.split("-").map(Number);
    setprintfinancial(value);

    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityLogBook/getNCLogbookPrint?financialYear=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data[0]) {
          setPrintResponseData(res.data);
          fetchchartapi_chart(value);
          setIsFetchSuccessful(false);
        } else {
          setPrintResponseData([]);
          message.error("No data found...!");
          setBatchNolist2(null);
          setIsFetchSuccessful(false);
          setShowModal(false);
          return;
        }
      })
      .catch((err) => {
        setPrintResponseData([]);
        setShowModal(false);

        notification.warning({
          message: "Notification",
          description: err.message,
        });
      });
  };

  const fetchDataCCRNO = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data?.map((laydownno) => laydownno.department);
          setdepartment_list(data);

          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            const data = res.data?.map((laydownno) => laydownno.department);
            setdepartment_list(data);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataOrderNumber = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            const data = res.data?.map((laydownno) => laydownno.department);
            setbatchno(data);
            setbatchno2(data);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = async (year) => {
    setAvailableShiftslov(year);
    fetchData_dep_by_id(year);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    // window.print();
    setIsFetchSuccessful(true);
    setShowModal(true);
    setavailablemonths_chart(null);
    setprintfinancial(null);
  };

  const commonColumns = [
    {
      title: "S.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
      align: "center",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
    },

    {
      title: "NCR No.",
      dataIndex: "ncrNumber",
      key: "ncrNumber",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Machine Name",
      dataIndex: "machineName",
      key: "machineName",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "FG / LOT No.",
      dataIndex: "fgNo",
      key: "fgNo",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Nature of Non-Conformity",
      dataIndex: "nonConfirmityNature",
      key: "nonConfirmityNature",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Classification (Critical / Major / Minor)",
      dataIndex: [
        "classificationCritical",
        "classificationMajor",
        "classificationMinor",
      ], // Using an array for multiple indices
      key: "classification", // Use a simplified key
      render: (text, record) => {
        const {
          classificationCritical,
          classificationMajor,
          classificationMinor,
        } = record;
        const classifications = [];
        if (classificationCritical === "Yes") classifications.push("Critical");
        if (classificationMajor === "Yes") classifications.push("Major");
        if (classificationMinor === "Yes") classifications.push("Minor");
        return (
          <div style={{ padding: "8px" }}>
            {classifications.length > 0 ? classifications.join(", ") : "None"}
          </div>
        );
      },
    },

    {
      title: "Updated by Sign & Date",
      dataIndex: "qaInspector",
      key: "qaInspector",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "CAPA Received Date",
      dataIndex: "capaDate",
      key: "capaDate",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
  ];

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedYear(null);
    setSelectedMonth(null);
    setBatchNolist2(null);
    setdate1(null);
    setIsFetchSuccessful(true);
  };
  const handleDatePrintChange = (event) => { };
  const printDateSubmit = () => {
    window.print();
    setavailablemonths_chart(null);
    setprintfinancial(null);
    setchartdata_print(null);
    setShowModal(false);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let columns = [...commonColumns];
  const items = [
    {
      key: "1",
      label: <p>NON-CONFORMITY LOG BOOK</p>,
      children: (
        <>
          {" "}
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
              Select Year:
            </div>
            <Select
              style={{
                width: "150px",
                height: "40x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              placeholder="Select Year"
              value={availableshiftlov}
              onChange={handleYearChange}
              showSearch
            >
              {years?.map((year, index) => (
                <Option key={index} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>
          <Table
            bordered
            style={{ textAlign: "center" }}
            columns={columns}
            dataSource={modalData}
          />
        </>
      ), // Make sure to provide valid JSX here
    },
    {
      key: "2",
      label: <p>NON-CONFORMITY LOG BOOK CHART</p>,
      children: (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "14px", marginTop: "8px" }}>
                Select FinancialYear:
              </div>
              <Select
                style={{
                  width: "150px",
                  height: "40px", // Fix the typo in 'height'
                  borderRadius: "0px",
                  border: "1px solid #dddd",
                  backgroundColor: "white",
                }}
                showSearch
                placeholder="Select FinancialYear"
                value={availablemonths}
                onChange={setavailablemonths}
              >
                {financialYears?.map((month, index) => (
                  <Option key={index} value={month}>
                    {month}
                  </Option>
                ))}
              </Select>
              <Button
                key="go"
                onClick={handlego_chart}
                loading={saveLoading}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                }}
                shape="round"
                icon={<BiNavigation color="#00308F" />}
                type="primary"
              >
                Submit
              </Button>
            </div>
          </div>
          <div>
            <div style={{ flex: "1", marginRight: "20px" }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartdata}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tickFormatter={(name) =>
                      name.length > 10 ? `${name.substring(0, 10)}...` : name
                    }
                    textAnchor="end"
                  />
                  <YAxis
                    ticks={[2, 4, 6, 8, 10, 12]} // Custom ticks on the Y-axis
                    domain={[0, 12]} // Set the domain to accommodate your max tick
                  />
                  {/* Tooltip component handles the hover behavior */}
                  <Tooltip
                    cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                    wrapperStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                    }}
                    formatter={(value, name, props) => [
                      value,
                      props.payload.name,
                    ]} // Show 'name' on hover
                  />
                  <Bar dataKey="value" fill="#FFC107" stroke="#4CAF50">
                    {/* This will add the data labels on top of the bars */}
                    <LabelList dataKey="value" position="top" fill="#000" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ul
                style={{
                  listStyleType: "none",
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {chartdata && chartdata.length > 0 ? (
                  chartdata.map((item) => (
                    <li
                      key={item.name}
                      style={{
                        marginLeft: "5px",
                        marginBottom: "5px",
                        padding: "3px",
                        border: "1px solid #000",
                        textAlign: "center", // Center align text within the list item
                      }}
                    >
                      <strong>{item.name}:</strong> {item.value}
                    </li>
                  ))
                ) : (
                  <li style={{ textAlign: "center" }}>None</li>
                )}
              </ul>
            </div>
          </div>
        </>
      ),
    },
  ];

  const recordsPerPage = 8;
  const totalPages = Math.ceil(printResponseData?.length / recordsPerPage);

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };
  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="NON-CONFORMITY LOG BOOK "
        formatNo="PH-QAD01/F-021"
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
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
          >
            Print
          </Button>,
          <Button
            key="back"
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            type="primary"
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
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

      <div>
        <Tabs
          defaultActiveKey="1"
          items={items}
          style={{
            display: "flex",
            width: "90%",
            position: "relative",
            left: "2%",
          }}
        />
        <div id="section-to-print">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex} style={{ pageBreakAfter: "always" }}>
              <table
                style={{
                  borderCollapse: "collapse",
                  border: "1px solid #0000",
                  padding: "5px",
                  paddingTop: "70px",
                  scale: "90%",
                }}
              >
                <thead>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }} colSpan="100"></td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      rowspan="4 "
                      style={{ textAlign: "center" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "80px", height: "auto" }}
                      />
                      <br></br>
                      Unit H
                    </td>
                    <th
                      colSpan="40"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      NON-CONFORMITY LOG BOOK
                    </th>
                    <td colSpan="20">Format No.:</td>
                    <td colSpan="35">PH-QAD01/F-021</td>
                  </tr>
                  <tr>
                    <td colSpan="20">Revision No.:</td>
                    <td colSpan="35">01</td>
                  </tr>
                  <td colSpan="20">Ref. SOP No.:</td>
                  <td colSpan="35">PH-QAD01-D-20</td>
                  <tr>
                    <td colSpan="20">Page No.:</td>
                    <td colSpan="35">
                      {" "}
                      {pageIndex + 1} of {totalPages}
                    </td>
                  </tr>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }} colSpan="100"></td>
                  </tr>
                </thead>
                <br />
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: "center" }}>
                      {" "}
                      S.No.
                    </th>
                    <th colSpan="13" style={{ textAlign: "center" }}>
                      Date
                    </th>
                    <th colSpan="5" style={{ textAlign: "center" }}>
                      NCR No.
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Department
                    </th>
                    <th colSpan="5" style={{ textAlign: "center" }}>
                      Machine Name
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Product Name
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      FG / LOT No.
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Nature of Non-Conformity
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Classification (Critical / Major / Minor)
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Updated by Sign & Date{" "}
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      CAPA Received Date
                    </th>
                    <th colSpan="5" style={{ textAlign: "center" }}>
                      Status
                    </th>
                  </tr>
                  {printResponseData?.length > 0 ? (
                    paginateData(printResponseData, pageIndex + 1).map(
                      (item, index) => (
                        <tr key={item.id}>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            {index + 1}
                          </td>
                          <td colSpan="13" style={{ textAlign: "center" }}>
                            {item?.date
                              ? moment(item?.date).format("DD/MM/YYYY")
                              : "NA"}
                          </td>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            {item.ncrNumber || "NA"}
                          </td>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {item.department || "NA"}
                          </td>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            {item.machineName || "NA"}
                          </td>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {item.product || "NA"}
                          </td>
                          <td colSpan="10">{item.batchNo || "NA"}</td>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {item.nonConfirmityNature || "NA"}
                          </td>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            {[
                              item.classificationCritical === "Yes"
                                ? "Critical"
                                : null,
                              item.classificationMajor === "Yes"
                                ? "Major"
                                : null,
                              item.classificationMinor === "Yes"
                                ? "Minor"
                                : null,
                            ]
                              .filter(Boolean) // Remove null values
                              .join(", ") || "NA"}
                          </td>
                          <td colSpan="10">{item.qaInspectorSign || "NA"}</td>
                          <td colSpan="10">{item.capaDate || "NA"}</td>
                          <td colSpan="5">{item.status || "NA"}</td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="100%">No data available</td>
                    </tr>
                  )}
                  {pageIndex + 1 === totalPages && (
                    <>
                      <tr>
                        <td colSpan="100%">
                          <div
                            className={`chart-container ${isPrinting ? "printing" : ""
                              }`}
                          >
                            <BarChart
                              width={800}
                              height={300}
                              data={chartdata_print}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="name"
                                tickFormatter={(name) =>
                                  name.length > 14
                                    ? `${name.substring(0, 14)}...`
                                    : name
                                }
                                textAnchor="middle" // Centers the labels
                                interval={0} // Ensures that all labels are displayed
                              />
                              <YAxis
                                ticks={[2, 4, 6, 8, 10, 12]}
                                domain={[0, 12]}
                              />
                              <Tooltip />
                              <Bar
                                dataKey="value"
                                fill={isPrinting ? "#000" : "#FFC107"}
                                stroke="#4CAF50"
                              >
                                <LabelList
                                  dataKey="value"
                                  position="top"
                                  fill={isPrinting ? "#fff" : "#000"}
                                />
                              </Bar>
                            </BarChart>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <ul
                              style={{
                                listStyleType: "none",
                                padding: 0,
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                              }}
                            >
                              {chartdata_print && chartdata_print.length > 0 ? (
                                chartdata_print.map((item) => (
                                  <li
                                    key={item.name}
                                    style={{
                                      marginLeft: "5px",
                                      marginBottom: "5px",
                                      padding: "3px",
                                      border: "1px solid #000",
                                      textAlign: "center", // Center align text within the list item
                                    }}
                                  >
                                    <strong>{item.name}:</strong> {item.value}
                                  </li>
                                ))
                              ) : (
                                <li style={{ textAlign: "center" }}>None</li>
                              )}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                  <br />
                </tbody>
                <br />
                <tfoot>
                  <tr>
                    <td colspan="20" style={{ padding: "1em" }}>
                      Particulars
                    </td>
                    <td colspan="20" style={{ padding: "1em" }}>
                      Prepared By
                    </td>
                    <td colspan="30" style={{ padding: "1em" }}>
                      Reviewed By
                    </td>
                    <td colspan="30" style={{ padding: "1em" }}>
                      Approved By
                    </td>
                  </tr>
                  <tr>
                    <td colspan="20" style={{ padding: "1em" }}>
                      Name
                    </td>
                    <td colspan="20" style={{ padding: "1em" }}></td>
                    <td colspan="30" style={{ padding: "1em" }}></td>
                    <td colspan="30" style={{ padding: "1em" }}></td>
                  </tr>
                  <tr>
                    <td colspan="20" style={{ padding: "1em" }}>
                      Signature & Date
                    </td>
                    <td colspan="20" style={{ padding: "1em" }}></td>
                    <td colspan="30" style={{ padding: "1em" }}></td>
                    <td colspan="30" style={{ padding: "1em" }}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </div>

        <Modal
          title="Print"
          open={showModal}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          footer={[
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginRight: 190,
              }}
              icon={<IoPrint color="#00308F" />}
              key="submit"
              type="primary"
              onClick={printDateSubmit}
              disabled={isFetchSuccessful}
            >
              Print
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
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
              Select FinancialYear:
            </div>
            <Select
              style={{
                width: "100%",
                height: "40x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              placeholder="Select Year"
              value={printfinancial}
              onChange={handleprint_section}
              showSearch
            >
              {years_fin?.map((year, index) => (
                <Option key={index} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QA_F21_Summary;
