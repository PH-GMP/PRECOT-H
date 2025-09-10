/* eslint-disable no-restricted-globals */
import { BarChart } from "@mui/x-charts/BarChart";
import { Button, DatePicker, message, Modal, Select, Tooltip } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import BleachingPrintHeader from "../Components/BleachingPrintHeader.js";
import BleachingTail from "../Components/BleachingTail.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import useApi from "../hooks/useApi.js";
import { useInputArray } from "../hooks/useInputArray.js";

const QA_F019_summary = () => {
  const navigate = useNavigate();
  const formName = "CUSTOMER COMPLAINT REGISTER";
  const formatNo = "PH-QAD01/F-019";
  const revNo = "3";
  const refSopNo = "PH-QAD01-D-19";
  const customerComplaint = "/Precot/QA/customerComplaint";
  const [open, setOpen] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedPrintDate, setSelectedPrintDate] = useState();
  const [apiData1, setApiData1] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPrintFinYear, setSelectedPrintFinYear] = useState();
  const [apiData, setApiData] = useState([]);
  const itemsPerPage = 25;

  const { values, handleInputChange, setValues } = useInputArray([
    {
      sno: 1,
      dateOfComplaint: "",
      cusName: "",
      cusRefNum: "",
      prodDes: "",
      lotNumber: "",
      natureOfComplaint: "",
      detOfCompSam: "",
      sampleReceivedOn: "",
      comRepOnDate: "",
      status: "",
    },
  ]);

  const dataSource = values;

  const totalPages = Math.ceil(dataSource.length / itemsPerPage);

  const paginateData = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
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

  const handleGo = () => {
    if (selectedMonth === "") {
      message.warning("Please select Month !");
      return;
    }
    if (selectedYear === "") {
      message.warning("Please select Year !");
      return;
    }
    navigate(customerComplaint, {
      state: {
        month: selectedMonth,
        year: selectedYear,
      },
    });
  };

  const {
    data: printDatas,
    loading: printLoadings,
    error: printerror,
    isDisable: printisDisable,
  } = useApi(
    `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/printApiRegister?financialYear=25-26`
  );

  const handlePrintDateChange = (date, dateString) => {
    const selectedDate = dayjs(date);

    // Get the year of the selected date
    const year = selectedDate.year();

    // Get the financial year
    let startYear, endYear;
    if (selectedDate.month() + 1 >= 4) {
      startYear = year;
      endYear = year + 1;
    } else {
      startYear = year - 1;
      endYear = year;
    }

    const financialYear = `${startYear.toString().slice(-2)}-${endYear
      .toString()
      .slice(-2)}`;
    setSelectedPrintFinYear(financialYear);
    {
      financialYear && console.log("print datas", printDatas);
    }
  };

  const handlePrint = () => {
    setPrintLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/printApiRegister?financialYear=${selectedPrintFinYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.message === "No data") {
          message.warning("No data");
          setPrintLoading(false);
          return;
        }
        setValues(response.data);

        setTimeout(() => {
          window.print();
          setPrintLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {});
  };

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year, label: year };
  });

  const handleModalClose = () => {
    setIsModalPrint(false);
    setPrintLoading(false);
    setSelectedPrintDate("");
  };

  const {
    data: data1,
    loading: loading1,
    error: error1,
    isDisable: isDisable1,
    callApi: callApi1,
  } = useApi();
  const {
    data: data2,
    loading: loading2,
    error: error2,
    isDisable: isDisable2,
    callApi: callApi2,
  } = useApi();

  useEffect(() => {
    if (selectedPrintFinYear) {
      callApi1(
        `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/getComplaintCountsGroupedByMonth?financialYear=${selectedPrintFinYear}`
      );
      callApi2(
        `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/getComplaintCounts?financialYear=${selectedPrintFinYear}`
      );
    }
  }, [selectedPrintFinYear]);

  const allMonths = [
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

  const transformedMonthData = apiData
    .map((item) =>
      allMonths.map((month) => ({
        category: month,
        value: item[month] || 0,
      }))
    )
    .flat();

  const transformedData = apiData1
    .map((item) => [
      { category: "grammage", value: item.grammage },

      { category: "less_qty", value: item.less_qty },
      { category: "chemical", value: item.chemical },
      { category: "packing", value: item.packing },
      { category: "strength_of_product", value: item.strength_of_product },
      { category: "lesser_count", value: item.lesser_count },
      { category: "others", value: item.others },
      { category: "contamination", value: item.contamination },
    ])
    .flat();

  useEffect(() => {
    if (data1) {
      let apiData = [];
      apiData.push(data1);
      setApiData(apiData);
    }
  }, [data1]);
  useEffect(() => {
    if (data2) {
      let apiData = [];
      apiData.push(data2);
      setApiData1(apiData);
    }
  }, [data2]);

  return (
    <>
      <BleachingHeader
        formName={formName}
        formatNo={formatNo}
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
            width: "50%",
          }}
        >
          <div style={{ margin: "10px", marginBottom: "20px" }}>
            <b>Summary by Month and Year</b>
            <hr></hr>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Select
              placeholder="Select Month"
              style={{ margin: "10px", width: "40%" }}
              options={months}
              onChange={(value) => setSelectedMonth(value)}
              value={selectedMonth}
            />
            <Select
              placeholder="Select Year"
              style={{ margin: "10px", width: "40%" }}
              options={years}
              onChange={(value) => setSelectedYear(value)}
              value={selectedYear}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleGo} style={{ margin: "10px" }}>
              GO
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="House Keeping Checklist (Print)"
        open={isModalPrint}
        width={380}
        destroyOnClose={true}
        onOk={() => setIsModalPrint(false)}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            type="primary"
            onClick={handlePrint}
            loading={printLoading}
          >
            Print
          </Button>,
        ]}
      >
        <div>
          <label>Select Year: </label>
          <DatePicker onChange={handlePrintDateChange} picker="year" />
        </div>
      </Modal>

      <div id="section-to-print">
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
      #section-to-print table th,
  #section-to-print table td {
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
        {Array.from({ length: totalPages }, (_, pageIndex) => (
          <div key={pageIndex} style={{ pageBreakAfter: "always" }}>
            <BleachingPrintHeader
              formName={formName}
              formatNo={formatNo}
              revisionNo={revNo}
              refSopNo={refSopNo}
              pageNo={pageIndex + 1}
            />
            <br></br>

            {/* Table part here  */}
            <table style={{ width: "100%" }}>
              <thead>
                <th style={{ padding: "8px" }}>S No</th>
                <th style={{ padding: "8px" }}>Date of Complaint</th>
                <th style={{ padding: "8px" }}>Complaint No</th>
                <th style={{ padding: "8px" }}>Customer Name</th>
                <th style={{ padding: "8px" }}>Customer Reference Number</th>
                <th style={{ padding: "8px" }}>Product Description</th>

                <th style={{ padding: "8px" }}>FG / Lot Number</th>
                <th style={{ padding: "8px" }}>Nature of Complaint</th>
                <th style={{ padding: "8px" }}>Details of Complaint sample</th>
                <th style={{ padding: "8px" }}>Sample Receved On</th>
                <th style={{ padding: "8px" }}>Complaint Replied On Date</th>
                <th style={{ padding: "8px" }}>Status</th>
              </thead>
              <tbody>
                {paginateData(dataSource, pageIndex + 1).map((data, index) => (
                  <tr>
                    <td style={{ padding: "8px" }}>
                      {String(index + 1 + pageIndex * itemsPerPage).padStart(
                        2,
                        "0"
                      )}
                    </td>
                    <td style={{ padding: "8px" }}>{data.Date_of_Complaint}</td>
                    <td style={{ padding: "8px" }}>{data.Complaint_No}</td>

                    <td style={{ padding: "8px" }}>{data.Customer_name}</td>
                    <td style={{ padding: "8px" }}>
                      {data.Customer_Reference_Number}
                    </td>
                    <td style={{ padding: "8px" }}>{data.prodDes}</td>
                    <td style={{ padding: "8px" }}>{data.Fg_No}</td>
                    <td style={{ padding: "8px" }}>{data.natureOfComplaint}</td>
                    <td style={{ padding: "8px" }}>
                      {data.Details_Of_Complaint_Sample}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {data.Sample_Received_On}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {data.Complaint_Replied_On}
                    </td>
                    <td style={{ padding: "8px" }}>{data.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br></br>
            <BleachingTail />
          </div>
        ))}
        <div style={{ pageBreakBefore: "always", marginTop: "100px" }}>
          <BleachingPrintHeader
            formName={formName}
            formatNo={formatNo}
            revisionNo={revNo}
            refSopNo={refSopNo}
            pageNo={totalPages + 1}
          />
          <br></br>
          <h1>Charts</h1>
          <div style={{ marginTop: "100px" }}>
            <h2>Monthly</h2>
            <BarChart
              dataset={transformedMonthData}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  id: "barCategories",
                  data: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "June",
                    "July",
                    "Aug",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  scaleType: "band",
                  padding: { left: 20, right: 20 },
                },
              ]}
              series={[
                {
                  dataKey: "value",
                  name: "Values",
                  fill: "#8884d8",
                },
              ]}
              barCategoryGap={20}
              width={1200}
              height={400}
            />
          </div>
          <div style={{ marginTop: "100px" }}>
            <h2>Category</h2>
            <BarChart
              dataset={transformedData}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  id: "barCategories",
                  data: [
                    "Grammage",
                    "Less qty",
                    "Chemical",
                    "Packing",
                    "Product Strength",
                    "Less count",
                    "others",
                    "Contamination",
                  ],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  dataKey: "value",
                  name: "Values",
                  fill: "#8884d8",
                },
              ]}
              barCategoryGap={10}
              width={1200}
              height={400}
            />
          </div>
          <br></br>
          <BleachingTail />
        </div>
      </div>
    </>
  );
};

export default QA_F019_summary;
