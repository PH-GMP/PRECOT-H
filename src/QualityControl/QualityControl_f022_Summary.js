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

const QualityControlF022Summary = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEqNo, setSelectedEqNo] = useState(null); // New state for eqno
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [selectedPrintFromDate, setselectedPrintFromDate] = useState("");
  const [selectedPrintToDate, setselectedPrintToDate] = useState("");

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

  // Function to fetch image based on the username
  const getImage = (username, type) => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
      let url = `${API.prodUrl}/Precot/api/chemicaltest/CLF022/getAll`;

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
            tested_date: item.testDate,
            microbiologist_status: item.micro_status,
            manager_status: item.qc_status,
            reason: item.reason || "N/A",
          }));

          setDataSource(fetchedData);

          const hasRejectedStatus = fetchedData.some(
            (item) =>
              item.manager_status === "QC_REJECTED" ||
              item.manager_status === "QA_REJECTED"
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

  const handlePrintDateFromChange = (e) => {
    setselectedPrintFromDate(e.target.value);
  };

  const handlePrintDateToChange = (e) => {
    setselectedPrintToDate(e.target.value);
  };

  const handleGoToChange = () => {
    if (selectedDate) {
      // Navigate to the path with the state
      navigate("/Precot/QualityControl/F-022", {
        state: {
          uniqueDate: selectedDate,
        },
      });
    } else {
      // Handle the case where year, month, or date is not selected
      message.error("Please select Tested Date.");
    }
  };

  const handleEdit = (record) => {
    navigate("/precot/QualityControl/F-022", {
      state: {
        uniqueDate: record.tested_date,
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
    setselectedPrintFromDate(null);
    setselectedPrintToDate(null);
  };

  const printSubmit = () => {
    if (
      !selectedPrintDate &&
      (!selectedPrintFromDate || !selectedPrintToDate)
    ) {
      message.error(
        "No fields selected. Please select a date or a range before printing."
      );
      handleModalClose();
      return; // Stop further execution if no fields are selected
    } else {
      fetchPrintData();
    }
  };

  const fetchPrintData = () => {
    let apiUrl = `${API.prodUrl}/Precot/api/chemicaltest/CLF022/print?`;

    // Check if only selectedPrintDate is provided
    if (selectedPrintDate) {
      apiUrl += `date=${selectedPrintDate}`;
    }

    // Check if both from and to dates are provided
    if (selectedPrintFromDate && selectedPrintToDate) {
      apiUrl += `fromdate=${selectedPrintFromDate}&toDate=${selectedPrintToDate}`;
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
      title: "Tested Date",
      dataIndex: "tested_date",
      key: "tested_date",
      align: "center",
      render: (text) => formatDate(text),
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

  return (
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Media Disposal Record"
        formatNo="PH-QCL01/F-022"
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

        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "30px",
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
              Select From Date:
            </label>
            <Input
              placeholder="Date"
              type="date"
              size="small"
              format="DD/MM/YYYY"
              value={selectedPrintFromDate}
              onChange={handlePrintDateFromChange}
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
              Select To Date:
            </label>
            <Input
              placeholder="Date"
              type="date"
              size="small"
              format="DD/MM/YYYY"
              value={selectedPrintToDate}
              onChange={handlePrintDateToChange}
              style={{ fontWeight: "", width: "135px", marginLeft: "" }}
              max={getCurrentDate()}
            />
          </div>
        </div>
      </Modal>

      {/* */}
      {/* <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: portrait;
          margin: 8mm;
        }
        body {
          -webkit-print-color-adjust: exact;
          width: 100%;
          height: 100%;
        }

        body * {
          visibility: hidden;
        }

        #section-to-print, #section-to-print * {
          visibility: visible;
        }

        .print-page {
          page-break-after: always;
          position: relative;
          width: 100%;
        }

        .print-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: white;
          z-index: 1000;
        }

        .print-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: white;
          z-index: 1000;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 10px;
          text-align: center;
          border: 1px solid black;
        }
      }
    `}
        </style>

        {(() => {
          const entriesPerPage = 1; // For demonstration, we assume 1 object per page
          const totalPages = Math.ceil(printData.length / entriesPerPage);

          // Split the data into pages
          const pages = Array.from({ length: totalPages }, (_, i) =>
            printData.slice(i * entriesPerPage, (i + 1) * entriesPerPage)
          );

          return pages.map((pageData, pageIndex) => (
            <div key={pageIndex} className="print-page">
              <table
                className="f18table"
                style={{ height: "50%", marginTop: "10%" }}
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
                      <br></br>
                      Unit H
                    </td>

                    <td
                      colSpan="60"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      Media Disposal Record
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Format No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      PH-QCL01-F-022
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
                    PH-QCL01-D-13
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
                <thead>
                  <tr style={{ border: "1px solid black" }}>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Tested Date
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Name of the Media
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Used for testing
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Load number
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Disposed Date
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Autoclave running time ( From-To )
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={1}
                      colSpan={2}
                    >
                      Setting for Discarding Autoclave
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={1}
                      colSpan={3}
                    >
                      Sign & Date
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        border: "1px solid black",
                      }}
                      rowSpan={2}
                    >
                      Remark
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={1}
                    >
                      Temp. In °C
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={1}
                    >
                      Time in min
                    </td>

                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={1}
                    >
                      Discarded by (Name)
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={1}
                    >
                      Inspected by
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={1}
                    >
                      Verified by
                    </td>
                  </tr>
                </thead>

                {pageData.map((data, index) => {
                  // Format microbiologist date
                  let formattedMicroDate = "";
                  if (data.micro_submit_on) {
                    formattedMicroDate = moment(data.micro_submit_on).format(
                      "DD/MM/YYYY HH:mm"
                    );
                  }

                  // Format manager date
                  let formattedManagerDate = "";
                  if (data.qc_submit_on) {
                    formattedManagerDate = moment(data.qc_submit_on).format(
                      "DD/MM/YYYY HH:mm"
                    );
                  }

                  return (
                    <tbody key={index}>
                      <tr>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {formatDate(data.testDate)}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.nameofMedia}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.usedForTesting}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.loadNumber}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {formatDate(data.disposedDate)}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {`${data.autoclaveRunningTime} - ${data.autoclaveRunningTime_to}`}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.temperatureInCelsius}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.timeInMinutes}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.discardedBy}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
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
                        <td style={{ textAlign: "center", padding: "10px" }}>
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
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {data.remarks}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {formatDate(data.testDate)}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.nameofMedia_c}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.usedForTesting_c}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.loadNumber_c}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {formatDate(data.disposedDate_c)}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {`${data.autoclaveRunningTime_c} - ${data.autoclaveRunningTime_c_to}`}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.temperatureInCelsius_c}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.timeInMinutes_c}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.discardedBy_c}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
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
                        <td style={{ textAlign: "center", padding: "10px" }}>
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
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {data.remarks_c}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {formatDate(data.testDate)}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.nameofMedia_d}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.usedForTesting_d}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.loadNumber_d}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {formatDate(data.disposedDate_d)}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {`${data.autoclaveRunningTime_d} - ${data.autoclaveRunningTime_d_to}`}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.temperatureInCelsius_d}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.timeInMinutes_d}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {data.discardedBy_d}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
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
                        <td style={{ textAlign: "center", padding: "10px" }}>
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
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            border: "1px solid black",
                          }}
                        >
                          {data.remarks_d}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={13}
                          style={{ padding: "10px", textAlign: "start" }}
                        >
                          Note: Soybean Casein Digest Agar [SCDA], Sabouraud
                          Dextrose Agar (SDA), Violet Red Bile Agar (VRBA),
                          Mac-Conkey Agar ( Mac.Con. ), Vogel- Johnson Agar
                          Base( VJ), Brilliant Green Agar [BGA], Cetrimide Agar(
                          Citri), Burkholderia Cepacia selective agar [BCSA]
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>

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
      </div> */}
      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: portrait;
          scale: 90%;
        }
        body {
          -webkit-print-color-adjust: exact;
          width: 100%;
          height: 100%;
        }

        body {
          -webkit-print-color-adjust: exact;
          width: 100%;
          height: 100%;
          transform: scale(0.9);
        }
        #section-to-print, #section-to-print * {
          visibility: visible;
        }

        .print-page {
          page-break-after: always;
          position: relative;
          width: 100%;
        }

        .print-header {
          top: 20%;
          left: 0;
          width: 100%;
          background: white;
          z-index: 1000;
        }

        .print-footer {
          bottom: 50%;
          left: 0;
          width: 100%;
          background: white;
          z-index: 1000;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 10px;
          text-align: center;
          border: 1px solid black;
        }

        thead {
          display: table-header-group;
        }

        tfoot {
          display: table-footer-group;
        }
      }
    `}
        </style>

        {(() => {
          const entriesPerPage = 2; // For demonstration, we assume 1 object per page
          const totalPages = Math.ceil(printData.length / entriesPerPage);

          // Split the data into pages
          const pages = Array.from({ length: totalPages }, (_, i) =>
            printData.slice(i * entriesPerPage, (i + 1) * entriesPerPage)
          );

          return pages.map((pageData, pageIndex) => (
            <div key={pageIndex} className="print-page">
              {/* Header */}
              <div className="print-header">
                <table
                  className="f18table"
                  style={{ height: "50%", marginTop: "5%" }}
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
                        <br></br>
                        Unit H
                      </td>
                      <td
                        colSpan="60"
                        rowSpan="4"
                        style={{ textAlign: "center" }}
                      >
                        Media Disposal Record
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        Format No.:
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        PH-QCL01-F-022
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
                      PH-QCL01-D-13
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
              </div>

              {/* Body */}
              <table style={{ marginTop: "5%" }}>
                <thead>
                  <tr style={{ border: "1px solid black" }}>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Tested Date
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Name of the Media
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Used for testing
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Load number
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Disposed Date
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      rowSpan={2}
                    >
                      Autoclave running time (From-To)
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      colSpan={2}
                    >
                      Setting for Discarding Autoclave
                    </td>
                    <td
                      style={{ padding: "10px", textAlign: "center" }}
                      colSpan={3}
                    >
                      Sign & Date
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        border: "1px solid black",
                      }}
                      rowSpan={2}
                    >
                      Remark
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      Temp. In °C
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      Time in min
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      Discarded by (Name)
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      Inspected by
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      Verified by
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {pageData.map((data, index) => {
                    // Format microbiologist date
                    let formattedMicroDate = "";
                    if (data.micro_submit_on) {
                      formattedMicroDate = moment(data.micro_submit_on).format(
                        "DD/MM/YYYY HH:mm"
                      );
                    }

                    // Format manager date
                    let formattedManagerDate = "";
                    if (data.qc_submit_on) {
                      formattedManagerDate = moment(data.qc_submit_on).format(
                        "DD/MM/YYYY HH:mm"
                      );
                    }

                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {formatDate(data.testDate)}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.nameofMedia}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.usedForTesting}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.loadNumber}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {formatDate(data.disposedDate)}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {`${data.autoclaveRunningTime} - ${data.autoclaveRunningTime_to}`}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.temperatureInCelsius}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.timeInMinutes}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.discardedBy}
                          </td>
                          <td style={{ textAlign: "center", padding: "10px" }}>
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
                          <td style={{ textAlign: "center", padding: "10px" }}>
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
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.remarks}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {formatDate(data.testDate)}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.nameofMedia_c}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.usedForTesting_c}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.loadNumber_c}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {formatDate(data.disposedDate_c)}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {`${data.autoclaveRunningTime_c} - ${data.autoclaveRunningTime_c_to}`}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.temperatureInCelsius_c}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.timeInMinutes_c}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.discardedBy_c}
                          </td>
                          <td style={{ textAlign: "center", padding: "10px" }}>
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
                          <td style={{ textAlign: "center", padding: "10px" }}>
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
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.remarks_c}
                          </td>
                        </tr>

                        <tr>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {formatDate(data.testDate)}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.nameofMedia_d}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.usedForTesting_d}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.loadNumber_d}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {formatDate(data.disposedDate_d)}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {`${data.autoclaveRunningTime_d} - ${data.autoclaveRunningTime_d_to}`}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.temperatureInCelsius_d}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.timeInMinutes_d}
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.discardedBy_d}
                          </td>
                          <td style={{ textAlign: "center", padding: "10px" }}>
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
                          <td style={{ textAlign: "center", padding: "10px" }}>
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
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            {data.remarks_d}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>

              {/* Footer */}
              <div className="print-footer">
                <table style={{ marginTop: "5%" }}>
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
                </table>
              </div>
            </div>
          ));
        })()}
      </div>
    </>
  );
};

export default QualityControlF022Summary;
