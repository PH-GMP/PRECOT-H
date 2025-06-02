import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Table, Select, message, Tooltip, Modal } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { FaLock, FaUserCircle } from "react-icons/fa";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import API from "../baseUrl.json";
import axios from "axios";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader";
import moment from "moment";
import PrecotSidebar from "../Components/PrecotSidebar";

const QualityControlF018Summary = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEqNo, setSelectedEqNo] = useState(null); // New state for eqno
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrintEqNo, setSelectedPrintEqNo] = useState(null); // New state for eqno
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const roleauth = localStorage.getItem("role");
  const [dataSource, setDataSource] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [printData, setPrintData] = useState([]);
  const [showReasonColumn, setShowReasonColumn] = useState(false);
  const [open, setOpen] = useState(false);
  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});
  const [equipmentNumbers, setEquipmentNumbers] = useState([]); // State for unique eq_no values

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/chemicaltest/CLF018/print`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "json",
          }
        );
        const data = response.data;

        console.log("data", data);
        // Extract and filter unique eq_no values
        const uniqueEqNos = Array.from(new Set(data.map((item) => item.eq_no)));
        console.log("uniqueEqNos,uniqueEqNos", uniqueEqNos);
        // Set the unique eq_no values in state
        setEquipmentNumbers(uniqueEqNos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);

  // Function to fetch image based on the username
  const getImage = (username, type) => {
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

        if (type === "micro") {
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
      if (data.micro_sign) {
        getImage(data.micro_sign, "micro");
      }
      if (data.qc_sign) {
        getImage(data.qc_sign, "qc");
      }
    });
  }, [printData]);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      let url = "";
      if (
        roleauth === "ROLE_MICROBIOLOGIST" ||
        roleauth === "QC_MANAGER" ||
        roleauth === "QA_MANAGER" ||
        roleauth === "MICRO_DESIGNEE"
      ) {
        url = `${ API.prodUrl}/Precot/api/chemicaltest/CLF018/getAll`;
      }

      if (url) {
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          });
          const fetchedData = response.data.map((item) => ({
            ...item,
            date: item.date,
            EQ_ID_No: item.eq_no,
            microbiologist_status: item.micro_status,
            manager_status: item.qc_status,
            reason: item.reason || "N/A",
          }));

          setDataSource(fetchedData);

          const hasRejectedStatus = fetchedData.some(
            (item) =>
              item.manager_status === "QC_REJECTED" ||
              item.manager_status === "QA_REJECTED" ||
              item.manager_status === "MICRO_DESIGNEE_REJECTED"
          );
          setShowReasonColumn(hasRejectedStatus);
        } catch (error) {
          console.error("Error fetching data:", error);
          message.error("Failed to fetch data");
        }
      }
      // setLoading(false);
    };

    fetchData();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePrintDateChange = (e) => {
    setSelectedPrintDate(e.target.value);
  };

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
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

  const handleGoToChange = () => {
    // Check if no fields are selected
    if (!selectedDate && !selectedEqNo) {
      message.error("Please fill in all fields.");
      return;
    }

    if (!selectedDate) {
      message.error("Please select a Date.");
      return;
    }

    if (!selectedEqNo) {
      message.error("Please select an Equipment Number.");
      return;
    }
    if (selectedDate && selectedEqNo) {
      navigate("/precot/QualityControl/F-018", {
        state: {
          uniqueDate: selectedDate,
          uniqueEqNo: selectedEqNo,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/precot/QualityControl/F-018", {
      state: {
        uniqueDate: record.date,
        uniqueEqNo: record.EQ_ID_No,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPrintLoading(false);
    setSelectedPrintDate(null);
    setSelectedPrintEqNo(null); // This resets the selected EQ No.
    setSelectedPrintMonth(null);
    setSelectedPrintYear(null);
  };

  const printSubmit = () => {
    if (
      !selectedPrintEqNo &&
      !selectedPrintMonth &&
      !selectedPrintYear &&
      !selectedPrintDate
    ) {
      message.error(
        "No fields selected. Please select a field before printing."
      );
      handleModalClose();

      return; // Stop further execution if no fields are selected
    }

    // Check if EQ No. is selected, it's mandatory
    if (!selectedPrintEqNo) {
      message.error("EQ No. is mandatory for printing.");
      handleModalClose();
      return; // Stop further execution if EQ No. is not selected
    }
    // Check if any date, month, or year is selected along with EQ No.
    if (!selectedPrintMonth && !selectedPrintYear && !selectedPrintDate) {
      message.error("Please select a date, month, or year along with EQ No.");
      handleModalClose();
      return;
    }
    // If EQ No. and at least one of date, month, or year is selected, proceed with the API call
    if (
      selectedPrintEqNo &&
      (selectedPrintMonth || selectedPrintYear || selectedPrintDate)
    ) {
      fetchPrintData(); // Call the function that handles the API request
    }
  };

  const fetchPrintData = () => {
    let apiUrl = `${ API.prodUrl}/Precot/api/chemicaltest/CLF018/print?eq_no=${selectedPrintEqNo}`;

    // Build API URL based on selected fields
    if (selectedPrintDate) {
      apiUrl += `&date=${selectedPrintDate}`;
    } else if (selectedPrintYear && selectedPrintMonth) {
      // Pass year and month as separate parameters
      apiUrl += `&year=${selectedPrintYear}&month=${selectedPrintMonth}`;
    } else if (selectedPrintYear) {
      apiUrl += `&year=${selectedPrintYear}`;
    }
    // Make the API request
    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        // Handle the API response
        console.log("Print Data:", response.data);
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
        // Add logic to handle the response (e.g., show print preview or download file)
      })
      .catch((error) => {
        console.error("Error fetching print data:", error);
        message.error("Error fetching data. Please try again.");
        setPrintLoading(false);
      });
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

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
      key: "formatDate",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "EQ. ID No",
      dataIndex: "EQ_ID_No",
      key: "EQ_ID_No",
      align: "center",
    },
    {
      title: "Microbiologist Status",
      dataIndex: "microbiologist_status",
      key: "microbiologist_status",
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
  let columns = [...baseColumns];

  // Function to handle keydown events
  const handleSelectText = (e) => {
    if (e.key === "Enter") {
      setSelectedEqNo(e.target.value); // Set the selected value in the state
    }
  };

  // Function to handle dropdown change
  const handleInput = (value) => {
    setSelectedEqNo(value); // Set the selected value from dropdown
  };

  const options = [
    { value: "PH-E/I-LAB53", label: "PH-E/I-LAB53" },
    { value: "PH-E/I-LAB14", label: "PH-E/I-LAB14" },
  ];

  return (
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Temperature & Relative Humidity Record of Dry & Wet Bulb"
        formatNo="PH-QCL01/F-018"
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
        <Input
          addonBefore="Date"
          placeholder="Date"
          type="date"
          size="small"
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ fontWeight: "bold", width: "135px" }}
          max={getCurrentDate()}
        />

        <Select
          placeholder="Select EQ.No."
          style={{ marginLeft: "50px", height: "28px", width: "150px" }}
          options={options} // Dropdown options
          value={selectedEqNo} // Selected value from state
          onChange={handleInput} // Handle dropdown changes
          onKeyDown={handleSelectText} // Handle key inputs
          dropdownStyle={{ textAlign: "center" }}
          showSearch
          filterOption={false}
        />

        {/* <Select
          placeholder="Select EQ.No."
          style={{ marginLeft: "40px", height: "28px" }}
          onChange={(value) => setSelectedEqNo(value)} // Set the selected equipment number
        >
          <Select.Option value="PH-E/I-LAB53">PH-E/I-LAB53</Select.Option>
          <Select.Option value="PH-E/I-LAB14">PH-E/I-LAB14 </Select.Option>
        </Select> */}

        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "10px",
            height: "28px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          onClick={handleGoToChange}
        >
          Go to
        </Button>
      </div>

      <Table
        columns={baseColumns}
        dataSource={dataSource}
        // loading={loading}
        rowKey="id" // Ensure each row has a unique key
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
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
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
                <Select.Option key={index} value={month}>
                  {month}
                </Select.Option>
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
              Select Date:
            </label>
            <Input
              placeholder="Date"
              type="date"
              size="small"
              format="DD/MM/YYYY"
              value={selectedPrintDate}
              onChange={handlePrintDateChange}
              style={{ fontWeight: "", width: "135px", marginLeft: "" }}
              max={getCurrentDate()}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select EQ.No.:
            </label>
            <Select
              placeholder="Select EQ.No."
              style={{ marginLeft: "0px", height: "28px" }}
              value={selectedPrintEqNo || undefined} // Control the value with state
              onChange={(value) => setSelectedPrintEqNo(value)} // Set the selected equipment number
            >
              {equipmentNumbers.map((eqNo) => (
                <Select.Option key={eqNo} value={eqNo}>
                  {eqNo}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>

      {/* id="section-to-print" */}
      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: portrait;
          margin: 8mm;
        }
        body {
          -webkit-print-color-adjust: exact;
          visibility: hidden;
        }

        #section-to-print {
          visibility: visible;
        }

        .print-page {
          page-break-after: always;
        }

        .print-header,
        .print-footer {
          position: relative;
          width: 100%;
        }
      }
    `}
        </style>

        {(() => {
          const entriesPerPage = 3;
          const totalPages = Math.ceil(printData.length / entriesPerPage);

          // Split the data into pages
          const pages = Array.from({ length: totalPages }, (_, i) =>
            printData.slice(i * entriesPerPage, (i + 1) * entriesPerPage)
          );

          return pages.map((pageData, pageIndex) => (
            <div key={pageIndex}>
              <table
                className="f18table"
                style={{ height: "50%", marginTop: "5%" }}
              >
                <tbody>
                  <tr>
                    <th
                      colSpan="10"
                      rowSpan="4"
                      style={{ textAlign: "center", height: "80px" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "100px", height: "auto" }}
                      />
                      <br></br>
                      Unit H
                    </th>

                    <th
                      colSpan="60"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      Temperature & Relative Humidity Record of Dry & Wet Bulb
                    </th>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Format No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      PH-QCL01-F-018
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Revision No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      02
                    </td>
                  </tr>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    Ref. SOP No.:
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    PH-QCL01-D-03
                  </td>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Page No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {`${pageIndex + 1} of ${totalPages}`}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table style={{ marginTop: "2%" }}>
                {/* Header Row */}
                <tr>
                  <td style={{ padding: "10px" }} colSpan="10">
                    EQ. ID.No.: {pageData[0]?.eq_no || "N/A"}
                  </td>
                  <td style={{ padding: "10px" }} colSpan="8">
                    Frequency: Daily
                  </td>
                </tr>

                {/* Column Headers */}
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "10%",
                    }}
                    colSpan="2"
                  >
                    S. No
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "20px",
                    }}
                    colSpan="2"
                  >
                    Date
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "20px",
                    }}
                    colSpan="2"
                  >
                    Time
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "110px",
                    }}
                    colSpan="2"
                  >
                    Dry bulb temp. ℃
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "110px",
                    }}
                    colSpan="2"
                  >
                    Wet bulb temp. ℃
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "40px",
                    }}
                    colSpan="2"
                  >
                    RH %
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan="2"
                  >
                    Checked By
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan="2"
                  >
                    Verified By
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan="2"
                  >
                    Remarks
                  </td>
                </tr>

                {/* Data Rows */}
                {pageData.map((data, index) => {
                  const overallIndex =
                    pageIndex * entriesPerPage * 2 + index * 2 + 1;

                  // Format dates
                  let formattedMicroDate = data.micro_submit_on
                    ? moment(data.micro_submit_on).format("DD/MM/YYYY HH:mm")
                    : "";
                  let formattedManagerDate = data.qc_submit_on
                    ? moment(data.qc_submit_on).format("DD/MM/YYYY HH:mm")
                    : "";

                  return (
                    <React.Fragment key={index}>
                      {/* First Row of Data */}
                      <tr>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {overallIndex}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {formatDate(data.date)}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.time}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.bulb_c}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.wetbulb_c}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.rh}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {getImage1[data.micro_sign] && (
                            <img
                              src={getImage1[data.micro_sign]}
                              alt="Micro Signature"
                              style={{ width: "50px", height: "auto" }}
                            />
                          )}
                          <br />
                          {data.micro_sign}
                          <br />
                          {formattedMicroDate}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {getImage2[data.qc_sign] && (
                            <img
                              src={getImage2[data.qc_sign]}
                              alt="Manager Signature"
                              style={{ width: "50px", height: "auto" }}
                            />
                          )}
                          <br />
                          {data.qc_sign}
                          <br />
                          {formattedManagerDate}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.remarks}
                        </td>
                      </tr>

                      {/* Second Row of Data */}
                      <tr>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {overallIndex + 1}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {formatDate(data.date)}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.time2}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.bulb_d}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.wetbulb_d}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.rh2}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {getImage1[data.micro_sign] && (
                            <img
                              src={getImage1[data.micro_sign]}
                              alt="Micro Signature"
                              style={{ width: "50px", height: "auto" }}
                            />
                          )}
                          <br />
                          {data.micro_sign}
                          <br />
                          {formattedMicroDate}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {getImage2[data.qc_sign] && (
                            <img
                              src={getImage2[data.qc_sign]}
                              alt="Manager Signature"
                              style={{ width: "50px", height: "auto" }}
                            />
                          )}
                          <br />
                          {data.qc_sign}
                          <br />
                          {formattedManagerDate}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "10px" }}
                          colSpan="2"
                        >
                          {data.remarks2}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </table>

              <table style={{ marginTop: "2%" }}>
                <tr>
                  <th
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Particulars
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Prepared by
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Reviewed by
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Approved by
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Name
                  </th>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                </tr>
                <tr>
                  <th
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Signature & Date
                  </th>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                </tr>
              </table>
            </div>
          ));
        })()}
      </div>
    </>
  );
};

export default QualityControlF018Summary;
