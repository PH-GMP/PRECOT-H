import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrecotSidebar from "../Components/PrecotSidebar";
import BleachingHeader from "../Components/BleachingHeader";
import { Input, Button, Table, Select, message, Tooltip, Modal } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import axios from "axios";
import logo from "../Assests/logo.png";
const { Option } = Select;

const QualityControlF010Summary = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [printLoading, setPrintLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEqNo, setSelectedEqNo] = useState(null); // New state for eqno
  const roleauth = localStorage.getItem("role");
  const [tableData, setTableData] = useState([]);
  const token = localStorage.getItem("token");
  const [printData, setPrintData] = useState([]);
  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});
  const [showReasonColumn, setShowReasonColumn] = useState(false);

  // Function to fetch image based on the username
  const getImage = (username, type) => {
    axios
      .get(`${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer",
      })
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const url = `data:image/jpeg;base64,${base64}`;

        if (type === "chemist") {
          setGetImage1((prev) => ({ ...prev, [username]: url }));
        } else {
          setGetImage2((prev) => ({ ...prev, [username]: url }));
        }
      })
      .catch((err) => {
        console.error("Error in fetching image:", err);
      });
  };

  // Fetch chemist and QC images for all data in printData
  useEffect(() => {
    printData.forEach((data) => {
      if (data.chemist_sign) {
        getImage(data.chemist_sign, "chemist");
      }
      if (data.manager_sign) {
        getImage(data.manager_sign, "manager");
      }
    });
  }, [printData]);

  // Fetch data based on the role
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "";
        if (roleauth === "ROLE_CHEMIST") {
          apiUrl = `${    API.prodUrl}/Precot/api/qc/WiraFiberFinessF010/getAllChemistNotSubmitted`;
        } else if (
          roleauth === "QC_MANAGER" ||
          roleauth === "QA_MANAGER" ||
          roleauth === "CHEMIST_DESIGNEE"
        ) {
          apiUrl = `${    API.prodUrl}/Precot/api/qc/WiraFiberFinessF010/getAllQcNotSubmitted`;
        }

        if (apiUrl) {
          const response = await axios.get(apiUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "json",
          });
          console.log("response", response.data);

          let snoCounter = 1;
          const transformedData = response.data.map((item) => ({
            Sno: snoCounter++, // Increment the serial number for each row
            calibration_date: item.calibrationDate || "N/A",
            calibration_next_due_date: item.calibNextDueDate || "N/A",
            chemist_status: item.chemist_status,
            manager_status: item.manager_status,
            reason: item.reason || "N/A",
            year: item.year,
            month: item.month,
            eqIdNo: item.eqIdNo,
          }));

          setTableData(transformedData); // Set the transformed data to table state

          const hasRejectedStatus = transformedData.some(
            (item) =>
              item.manager_status === "QC_REJECTED" ||
              item.manager_status === "QA_REJECTED" ||
              item.manager_status === "CHEMIST_DESIGNEE_REJECTED"
          );

          setShowReasonColumn(hasRejectedStatus);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [roleauth]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
  };

  const handleGoToChange = () => {
    if (!selectedYear && !selectedMonth && !selectedEqNo) {
      message.error("Please fill in all required fields.");
      return;
    }

    if (!selectedYear) {
      message.error("Please select a Year.");
      return;
    }

    if (!selectedMonth) {
      message.error("Please select a Month.");
      return;
    }

    if (!selectedEqNo) {
      message.error("Please select an Equipment Number.");
      return;
    }

    if (selectedYear && selectedMonth && selectedEqNo) {
      navigate("/precot/QualityControl/F-010", {
        state: {
          selectedYear: selectedYear,
          selectedMonth: selectedMonth,
          selectedEqNo: selectedEqNo,
        },
      });
    } else {
      // Handle the case where year or month is not selected
      message.error("Please select a year and month.");
    }
  };

  const handleEdit = (record) => {
    console.log("params", record.date, record.month, record.eqIdNo);
    navigate("/precot/QualityControl/F-010", {
      state: {
        selectedYear: record.year,
        selectedMonth: record.month,
        selectedEqNo: record.eqIdNo,
      },
    });
  };

  // Generate year options from current year to previous 20 years
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }

  // Generate month options
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

  const showDrawer = () => {
    // setOpen(true);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleModalClose = () => {
    setPrintLoading(false);
    setShowModal(false);
    setSelectedPrintMonth(null);
    setSelectedPrintYear(null);
  };

  const handlePrint = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const printSubmit = () => {
    if (selectedPrintMonth || selectedPrintYear) {
      fetchPrintData();
    } else {
      message.error("Please select a any field before printing.");
      handleModalClose();
    }
  };

  const fetchPrintData = () => {
    let baseUrl = `${    API.prodUrl}/Precot/api/qc/WiraFiberFinessF010/GetByMonthYear/print?`;
    let query = [];

    if (selectedPrintMonth) {
      query.push(`month=${selectedPrintMonth}`);
    }
    if (selectedPrintYear) {
      query.push(`year=${selectedPrintYear}`);
    }

    // Join the query parameters to the base URL
    let finalUrl = baseUrl + query.join("&");
    console.log("finalUrl", finalUrl);
    // Make the API call using axios
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

        // Ensure that the response is an array, even if no data is found
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintData(response.data);
          setPrintLoading(true);

          setTimeout(() => {
            window.print(); // Proceed with printing
            handleModalClose(); // Close the modal after printing
          }, 3000);

          console.log("print data", response.data);
        } else {
          setPrintData([]); // Ensure printData is always an array
          setPrintLoading(false);
          message.error(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose(); // Close modal if no details found
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
        setPrintLoading(false);
      });
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "Sno", // Use the 'Sno' field from the transformed data
      key: "Sno",
      align: "center",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "manager_status",
      key: "manager_status",
      align: "center",
    },
    ...(showReasonColumn
      ? [
          {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            align: "center",
          },
        ]
      : []),
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          style={{ width: "100%" }}
          onClick={() => handleEdit(record)}
        >
          Review
        </Button>
      ),
    },
  ];

  let columns = [...baseColumns];

  let formattedChemistDate;
  if (printData?.chemist_submit_on) {
    formattedChemistDate = moment(printData?.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }

  let formattedQCDate;
  if (printData?.manager_submit_on) {
    formattedQCDate = moment(printData?.manager_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <BleachingHeader
        unit="Unit-H"
        formName="WIRA Fiber Fineness Tester Calibration Report"
        formatNo="PH-QCL01/F-010"
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
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
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
              if (window.confirm("Are you sure want to logout")) {
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
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={printSubmit}
            loading={printLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <div
          style={{
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select Year:
            </label>
            <Select
              style={{ width: "135px", height: "28px", color: "black" }}
              value={selectedPrintYear}
              onChange={handlePrintYearChange}
              placeholder="Select Year"
            >
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select Month:
            </label>
            <Select
              style={{
                width: "135px",
                height: "28px",
                color: "black",
                marginLeft: "",
              }}
              value={selectedPrintMonth}
              placeholder="Select Month"
              onChange={handlePrintMonthChange}
            >
              {months.map((month, index) => (
                <Option key={index} value={month}>
                  {month}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginTop: "10px",
          marginBottom: "10px",
          justifyContent: "start",
        }}
      >
        <Select
          style={{ width: "120px", color: "black", height: "28px" }}
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Select Year"
        >
          {years.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>

        <Select
          style={{
            width: "150px",
            color: "black",
            marginLeft: "",
            height: "28px",
          }}
          value={selectedMonth}
          placeholder="Select Month"
          onChange={handleMonthChange}
        >
          {months.map((month, index) => (
            <Option key={index} value={month}>
              {month}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Select EQ.No."
          style={{ marginLeft: "0px", height: "28px" }}
          onChange={(value) => setSelectedEqNo(value)} // Set the selected equipment number
        >
          <Select.Option value="PH-E/I-LAB37">PH-E/I-LAB37</Select.Option>
        </Select>

        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            height: "28px",
            marginLeft: "40px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          onClick={handleGoToChange}
        >
          Go to
        </Button>
      </div>

      <Table columns={baseColumns} dataSource={tableData} rowKey="Sno" />

      {/* */}

      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: portrait;
        }
        body {
          -webkit-print-color-adjust: exact;
          width: 100%;
          height: 100%;
          transform: scale(0.9);
        }
        #section-to-print {
          page-break-after: always;
        }
      }
    `}
        </style>

        {/* Map over each main object */}
        {printData?.map((mainObject, pageIndex) => {
          const formatDat = (date) => {
            return date ? moment(date).format("DD/MM/YYYY HH:mm") : ""; // Default value for null/undefined
          };

          const formattedChemistDate = formatDat(mainObject.chemist_submit_on);
          const formattedQCDate = formatDat(mainObject.manager_submit_on);

          return (
            <div key={mainObject.id} style={{ pageBreakAfter: "always" }}>
              {/* Table header */}
              <table
                className="f18table"
                style={{ marginTop: "7%", width: "90%", height: "50%" }}
              >
                <tbody>
                  <tr>
                    <td
                      colSpan="10"
                      rowSpan="4"
                      style={{ textAlign: "center", height: "80px" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "100px", height: "auto" }}
                      />
                      <br />
                      Unit H
                    </td>
                    <td
                      colSpan="60"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      WIRA Fiber Fineness Tester Calibration Report
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Format No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      PH-QCL01/F-010
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Revision No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      01
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Ref. SOP No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      PH-QCL01-D-04
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Page NO.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {pageIndex + 1} of {printData.length}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table style={{ marginTop: "20px", width: "90%" }}>
                <tbody>
                  <tr>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      Frequency: Monthly
                    </td>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      EQ. ID. No.: PH-E/I-LAB37
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="8" style={{ padding: "10px" }}>
                      Calibration date:{" "}
                      {formatDate(mainObject.calibrationDate) || "0"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="8" style={{ padding: "10px" }}>
                      Setting before Calibration:{" "}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      Flow offset: {mainObject.flowOffset || "0"}
                    </td>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      PL gain: {mainObject.plGain || "0"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      Pressure off set: {mainObject.pressureOffSet || "0"}
                    </td>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      PH gain: {mainObject.phGain || "0"}
                    </td>
                  </tr>

                  {/* Details array */}
                  <tr>
                    <td
                      colSpan="3"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      Reference Cotton Micronaire value
                    </td>
                    <td
                      colSpan="1"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      Observed
                    </td>
                    <td
                      colSpan="2"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      Ratio
                    </td>
                    <td
                      colSpan="1"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      PL gain
                    </td>
                    <td
                      colSpan="1"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      New PL gain
                    </td>
                  </tr>

                  {mainObject.details?.map((detail, index) => (
                    <tr key={index}>
                      <td
                        colSpan="3"
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        {detail.refCottonMicroValue}
                      </td>
                      <td
                        colSpan="1"
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        {detail.obsr}
                      </td>
                      <td
                        colSpan="2"
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        {detail.ratio}
                      </td>
                      <td
                        colSpan="1"
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        {detail.plGain}
                      </td>
                      <td
                        colSpan="1"
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        {detail.newPlGain}
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td
                      colSpan="7"
                      style={{ textAlign: "end", padding: "10px" }}
                    >
                      AVG:
                    </td>
                    <td
                      className="autoAvgCal"
                      colSpan="1"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      {mainObject.newPlGainAvg || "0"}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "10px" }} colSpan="8">
                      Ratio= Observed mic./ Reference mic.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px" }} colSpan="8">
                      New PL gain= Ratio x PL gain
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="settingAfterCalibration"
                      colSpan="8"
                      style={{ padding: "10px" }}
                    >
                      Setting After Calibration:
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      Flow offset: {mainObject.calibratedFlowOffSet || "0"}
                    </td>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      PL gain: {mainObject.calibratedPlGain || "0"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      Pressure off set:{" "}
                      {mainObject.calibratedPressureOffSet || "0"}
                    </td>
                    <td colSpan="4" style={{ padding: "10px" }}>
                      PH gain: {mainObject.calibratedPhGain || "0"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="calibrationNextDueDate"
                      colSpan="8"
                      style={{ padding: "10px" }}
                    >
                      Calibration next due date:{" "}
                      {formatDate(mainObject.calibNextDueDate) || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="remarks"
                      colSpan="8"
                      style={{ padding: "10px" }}
                    >
                      Remarks: {mainObject.remarks || "N/A"}
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan="4"
                      className="checkedBY"
                      style={{
                        textAlign: "center",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      Checked By <br />
                      {getImage1[mainObject.chemist_sign] && (
                        <img
                          className="signature"
                          src={getImage1[mainObject.chemist_sign]}
                          alt="Operator"
                          style={{ width: "100px", height: "auto" }}
                        />
                      )}
                      <br />
                      {mainObject.chemist_submit_by}
                      <br />
                      {formattedChemistDate}
                    </td>
                    <td
                      colSpan="4"
                      className="verifiedBy"
                      style={{
                        textAlign: "center",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      Verified By <br />
                      {getImage2[mainObject.manager_sign] && (
                        <img
                          className="signature"
                          src={getImage2[mainObject.manager_sign]}
                          alt="Supervisor Sign"
                          style={{ width: "100px", height: "auto" }}
                        />
                      )}
                      <br />
                      {mainObject.manager_submit_by}
                      <br />
                      {formattedQCDate}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Table footer */}
              <table style={{ marginTop: "2%", width: "90%" }}>
                <tbody>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "start",
                        padding: "5px 0px 5px 10px",
                      }}
                    >
                      Particulars
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Prepared by
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Reviewed by
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Approved by
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "start",
                        padding: "5px 0px 5px 10px",
                      }}
                    >
                      Name
                    </td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "start",
                        padding: "5px 0px 5px 10px",
                      }}
                    >
                      Signature & Date
                    </td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QualityControlF010Summary;
