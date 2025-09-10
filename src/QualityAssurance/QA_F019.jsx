/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { BarChart } from "@mui/x-charts/BarChart";
import { Button, Tabs, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import useApi from "../hooks/useApi.js";
import { useInputArray } from "../hooks/useInputArray.js";

const CustomerComplaint = () => {
  const role = localStorage.getItem("role");
  const summaryScreen = "/Precot/QA/cusRegisterSummary";
  const navigate = useNavigate();
  const { state } = useLocation();
  const [apiData, setApiData] = useState([]);
  const [apiData1, setApiData1] = useState([]);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const { values, handleInputChange, setValues } = useInputArray([
    {
      sno: 1,
      dateOfComplaint: "",
      complaintNo: "",
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

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(2);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = values.slice(indexOfFirstRow, indexOfLastRow);
  const getFinancialYear = (month, year) => {
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
    let startYear, endYear;
    const monthNumber = monthMap[month];

    if (monthNumber >= 4) {
      startYear = year;
      endYear = year + 1;
    } else {
      startYear = year - 1;
      endYear = year;
    }

    return `${startYear.toString().slice(-2)}-${endYear.toString().slice(-2)}`;
  };

  const month = state.month;
  const year = state.year;
  const financialYear = getFinancialYear(month, year);

  const { data, loading, error, isDisable, callApi } = useApi();

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
    // Construct URLs
    const url = `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/getForRegister?month=${month}&year=${year}`;
    callApi(url);
    callApi1(
      `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/getComplaintCountsGroupedByMonth?financialYear=${financialYear}`
    );
    callApi2(
      `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/getComplaintCounts?financialYear=${financialYear}`
    );
  }, []);

  useEffect(() => {
    if (data) {
      setValues(data);
      if (data.message === "No data") {
        navigate(summaryScreen);
        message.warning("No data for this month");
        return;
      }
    }
  }, [data]);

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
  // just for reference not in use
  const oriData = [
    {
      sno: 1,
      itemDescription: "",
      idetityTool: "",
      verifyFrequency: "",
      location: "",
      remarks: "",
    },
    {
      sno: 1,
      itemDescription: "",
      idetityTool: "",
      verifyFrequency: "",
      location: "",
      remarks: "",
    },
  ];

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

  const items = [
    {
      key: "1",
      label: <p>Training Card</p>,
      children: (
        <>
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
              {currentRows.map((data, index) => (
                <tr>
                  <td style={{ padding: "8px" }}>
                    {String(
                      index + 1 + (currentPage - 1) * rowsPerPage
                    ).padStart(2, "0")}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {formatDate(data.Date_of_Complaint)}
                  </td>
                  <td style={{ padding: "8px" }}>{data.Complaint_No}</td>

                  <td style={{ padding: "8px" }}>{data.Customer_name}</td>
                  <td style={{ padding: "8px" }}>
                    {data.Customer_Reference_Number}
                  </td>
                  <td style={{ padding: "8px" }}>{data.Product_Name}</td>
                  <td style={{ padding: "8px" }}>{data.Fg_No}</td>
                  <td style={{ padding: "8px", width: "13%" }}>
                    Grammage: {data.Grammage},<br></br>
                    Less Qty: {data.Less_Qty},<br></br>
                    Strength Of Product: {data.Strength_Of_Product},<br></br>
                    Chemical:{data.Chemical},<br></br>
                    Packing: {data.Packing},<br></br>
                    Contamination: {data.Contamination},<br></br>
                    Lesser Count:{data.Lesser_Count},<br></br>
                    others: {data.Others}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {data.Details_Of_Complaint_Sample}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {formatDate(data.Sample_Received_On)}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {formatDate(data.Complaint_Replied_On)}
                  </td>
                  <td style={{ padding: "8px" }}>{data.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <div style={{ textAlign: "center", margin: "10px" }}>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <span style={{ margin: "0 10px" }}>Page {currentPage}</span>

              <Button
                onClick={() =>
                  setCurrentPage((prev) =>
                    indexOfLastRow < values.length ? prev + 1 : prev
                  )
                }
                disabled={indexOfLastRow >= values.length}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: <p>Month Wise</p>,
      children: (
        <>
          {apiData && (
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
                  name: "value",
                  fill: "#8884d8",
                },
              ]}
              width={1200}
              height={400}
            />
          )}
        </>
      ),
    },
    {
      key: "3",
      label: <p>Complaint wise</p>,
      children: (
        <>
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
        </>
      ),
    },
  ];

  const handleBack = () => {
    navigate(summaryScreen);
  };
  return (
    <>
      {/*beginning of header part */}
      <BleachingHeader
        formName={"CUSTOMER COMPLAINT REGISTER"}
        formatNo={"PH-QAD01/F-019"}
        unit={"UNIT H"}
        MenuBtn={<Button type="primary" icon={<TbMenuDeep />}></Button>}
        buttonsArray={[
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
      {/* end of header part */}

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
    </>
  );
};

export default CustomerComplaint;
