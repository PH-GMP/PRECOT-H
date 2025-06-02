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

const QualityControlF014Summary = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loadNo, setLoadNo] = useState(null); // State to store selected form value
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

  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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
      if (data.microbiologist_sign) {
        getImage(data.microbiologist_sign, "micro");
      }
      if (data.manager_sign) {
        getImage(data.manager_sign, "manager");
      }
    });
  }, [printData]);

  // get api
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);

      const url =
        roleauth === "ROLE_MICROBIOLOGIST"
          ? `${    API.prodUrl}/Precot/api/qc/ValidationForAutoclaveChemistF014/GetAll`
          : roleauth === "QC_MANAGER" ||
            roleauth === "QA_MANAGER" ||
            roleauth === "MICRO_DESIGNEE"
          ? `${    API.prodUrl}/Precot/api/qc/ValidationForAutoclaveChemistF014/getAllManagerNotSubmitted`
          : null;

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
            loadNo: item.loadNo,
            EQ_ID_No: item.eqId,
            microbiologist_status: item.microbiologist_status,
            manager_status: item.manager_status,
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

  // Function to handle keydown events
  // const handleSelectText = (e) => {
  //   if (
  //     !/[0-9a-zA-Z._ ]/.test(e.key) &&
  //     e.key !== "Backspace" &&
  //     e.key !== "Delete" &&
  //     e.key !== "ArrowLeft" &&
  //     e.key !== "ArrowRight" &&
  //     e.key !== "Tab" &&
  //     e.key !== "/" &&
  //     e.key !== "-"
  //   ) {
  //     e.preventDefault();
  //   }

  //   if (e.key === "Enter") {
  //     setSelectedEqNo(e.target.value); // Set the selected value in the state
  //   }
  // };

  // // Function to handle dropdown change
  // const handleInput = (value) => {
  //   setSelectedEqNo(value); // Set the selected value from dropdown
  // };

  // const options = [
  //   { value: "PH-E/I-LAB07", label: "PH-E/I-LAB07" },
  //   { value: "PH-E/I-LAB03", label: "PH-E/I-LAB03" },
  // ];

  // Handle navigation
  const handleGoToChange = () => {
    // Check if no fields are selected
    if (!selectedDate && !selectedEqNo && !loadNo) {
      message.error("Please fill in all fields.");
      return;
    }

    if (!selectedDate) {
      message.error("Please select a Date.");
      return;
    }

    if (!loadNo) {
      message.error("Please Enter a Load No.");
      return;
    }

    if (!selectedEqNo) {
      message.error("Please select an Equipment Number.");
      return;
    }
    if (selectedDate && selectedEqNo && loadNo) {
      navigate("/precot/QualityControl/F-014", {
        state: {
          uniqueDate: selectedDate,
          uniqueEqNo: selectedEqNo,
          uniqueLoadNo: loadNo,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/precot/QualityControl/F-014", {
      state: {
        uniqueDate: record.date,
        uniqueEqNo: record.EQ_ID_No,
        uniqueLoadNo: record.loadNo,
      },
    });
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

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
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

  const handleLoadChange = (value) => {
    setLoadNo(value); // Update state with selected value
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
    let apiUrl = `${    API.prodUrl}/Precot/api/qc/ValidationForAutoclaveChemistF014/PrintForF014?eqIdNo=${selectedPrintEqNo}`;

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
      title: "Load No.",
      dataIndex: "loadNo",
      key: "loadNo",
      align: "center",
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Validation For AutoClave By Chemical Indicator"
        formatNo="PH-QCL01/F-014"
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
              <Select.Option value="PH-E/I-LAB07">PH-E/I-LAB07</Select.Option>
              <Select.Option value="PH-E/I-LAB03">PH-E/I-LAB03</Select.Option>
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

        <Input
          style={{ width: "135px", height: "28px", marginLeft: "30px" }}
          value={loadNo} // Use state value
          onChange={(e) => handleLoadChange(e.target.value)}
          // Update state on input change
          placeholder="Enter Load No."
        />

        {/* <Select
          placeholder="Select EQ.No."
          style={{ marginLeft: "0px", height: "28px", width: "150px" }}
          value={selectedEqNo}  
          onChange={handleInput}  
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSelectedEqNo(e.target.value);  
            }
          }} 
          dropdownStyle={{ textAlign: "center" }}
          showSearch
          filterOption={false}
        >
          <Select.Option>Medline</Select.Option>
        </Select> */}

        <Select
          placeholder="Select EQ.No."
          style={{ marginLeft: "40px", height: "28px" }}
          onChange={(value) => setSelectedEqNo(value)} // Set the selected equipment number
        >
          <Select.Option value="PH-E/I-LAB07">PH-E/I-LAB07</Select.Option>
          <Select.Option value="PH-E/I-LAB03">PH-E/I-LAB03</Select.Option>
        </Select>

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

      {/* */}
      <div id="section-to-print">
        <style>
          {`
    @media print {
      @page {
        size: landscape;
        margin: 8mm; /* Add uniform margins to the printed page */
      }

      body {
        -webkit-print-color-adjust: exact;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }

      #section-to-print {
        width: 100%;
        margin: 0 auto; /* Centers content horizontally */
        padding-left: 5mm; /* Adjust this value if needed */
        padding-right: 5mm; /* Ensure some balance for print alignment */
        page-break-after: always;
      }

      table {
        width: 100%;
        margin: auto;
      }
    }
  `}
        </style>

        {/* Logic for pagination */}
        {(() => {
          const entriesPerPage = 4;
          const totalPages = Math.ceil(printData.length / entriesPerPage);

          // Split the data into pages
          const pages = Array.from({ length: totalPages }, (_, i) =>
            printData.slice(i * entriesPerPage, (i + 1) * entriesPerPage)
          );

          return pages.map((pageData, pageIndex) => (
            <div key={pageIndex}>
              {/* Table header */}
              <table
                className="f18table"
                style={{ height: "50%", marginTop: "2%" }}
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
                      <br /> Unit H
                    </td>
                    <td
                      colSpan="60"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      Validation For AutoClave By Chemical Indicator
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Format No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      PH-QCL01/F-014
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
                      PH-QCL01-D-03
                    </td>
                  </tr>
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
                <tr>
                  <td
                    style={{
                      textAlign: "start",
                      padding: "10px",
                    }}
                    colSpan="4"
                  >
                    Frequency: Load Wise
                  </td>
                  <td
                    style={{
                      textAlign: "start",
                      padding: "10px",
                    }}
                    colSpan="3"
                  >
                    EQ. ID No: {pageData[0]?.eqId || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "20px",
                      minHeight: "20px",
                    }}
                  >
                    Date
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "20px",
                      minHeight: "20px",
                    }}
                  >
                    Load No.
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "20px",
                      minHeight: "20px",
                    }}
                  >
                    Chemical indicator strip
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "20px",
                      minHeight: "20px",
                    }}
                  >
                    Checked By
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "20px",
                      minHeight: "20px",
                    }}
                  >
                    Verified By
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "20px",
                      minHeight: "20px",
                    }}
                  >
                    Remarks
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "20px",
                      minHeight: "20px",
                    }}
                  >
                    Status
                  </td>
                </tr>

                {pageData.map((data, index) => {
                  // Format microbiologist date
                  let formattedMicroDate = "";
                  if (data.microbiologist_submit_on) {
                    formattedMicroDate = moment(
                      data.microbiologist_submit_on
                    ).format("DD/MM/YYYY HH:mm");
                  }

                  // Format manager date
                  let formattedManagerDate = "";
                  if (data.manager_submit_on) {
                    formattedManagerDate = moment(
                      data.manager_submit_on
                    ).format("DD/MM/YYYY HH:mm");
                  }

                  return (
                    <tr key={index}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {formatDate(data.date)}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {data.loadNo}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {data.chemicalIndicatorStrip}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {getImage1[data.microbiologist_sign] && (
                          <img
                            src={getImage1[data.microbiologist_sign]}
                            alt="Micro Signature"
                            style={{ width: "50px", height: "auto" }}
                          />
                        )}
                        <br />
                        {data.microbiologist_sign}
                        <br />
                        {formattedMicroDate}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {getImage2[data.manager_sign] && (
                          <img
                            src={getImage2[data.manager_sign]}
                            alt="Manager Signature"
                            style={{ width: "50px", height: "auto" }}
                          />
                        )}
                        <br />
                        {data.manager_sign}
                        <br />
                        {formattedManagerDate}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {data.remark}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {data.status}
                      </td>
                    </tr>
                  );
                })}
              </table>

              {/* Table footer */}
              <table style={{ marginTop: "2%" }}>
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
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
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
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
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Signature & Date
                  </td>
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

export default QualityControlF014Summary;
