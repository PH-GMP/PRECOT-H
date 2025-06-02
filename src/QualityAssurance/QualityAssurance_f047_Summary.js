import { EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
const { Option } = Select;

const QualityAssurance_f047_Summary = () => {
  const [selectedDep, setSelectedDepartment] = useState(null);
  const [selectedBMR, setSelectedBMR] = useState("");

  const [selectedPrintBMR, setSelectedPrintBMR] = useState("");
  const [selectedPrintDepartment, setSelectedPrintDepartment] = useState(null);

  const [bmrOptions, setBmrOptions] = useState([]);
  const [bmrPrintOptions, setBmrPrintOptions] = useState([]);

  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [printData, setPrintData] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [showReasonColumn, setShowReasonColumn] = useState(false);
  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});

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

        if (type === "ins") {
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
      if (data.ins_sign) {
        getImage(data.ins_sign, "ins");
      }
      if (data.qc_sign) {
        getImage(data.qc_sign, "qc");
      }
    });
  }, [printData]);

  //bmr api
  useEffect(() => {
    const fetchBMRValues = async () => {
      if (!selectedDep) return; // Do nothing if no department is selected

      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Engineering/getProductionDetails?department=${selectedDep}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          }
        );
        const uniqueOptions = Array.from(new Set(response.data));
        setBmrOptions(uniqueOptions);
      } catch (error) {
        console.error("Failed to load BMR values:", error);
        message.error("Failed to load BMR values. Please try again.");
      }
    };

    fetchBMRValues();
  }, [selectedDep]);

  //bmr api
  useEffect(() => {
    const fetchBMRValues = async () => {
      if (!selectedPrintDepartment) return; // Do nothing if no department is selected

      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Engineering/getProductionDetails?department=${selectedPrintDepartment}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          }
        );
        const uniqueOptions = Array.from(new Set(response.data));
        setBmrPrintOptions(uniqueOptions);
      } catch (error) {
        console.error("Failed to load BMR values:", error);
        message.error("Failed to load BMR values. Please try again.");
      }
    };

    fetchBMRValues();
  }, [selectedPrintDepartment]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API.prodUrl}/Precot/api/QA/F047/GETALL`;

      const token = localStorage.getItem("token");

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
            bmr: item.bmrNo || "N/A",
            department: item.department || "N/A",
            qa_ins_status: item.ins_status,
            chemist_status: item.qc_status_b,
            qa_des_status: item.qc_status,
            reason: item.reason || "N/A",
          }));

          setDataSource(fetchedData);

          // Check if any object has a rejected qc_status
          const hasRejectedStatus = fetchedData.some(
            (item) => item.qc_status === "QC_REJECTED"
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

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
  };

  const handleGoToChange = () => {
    // Check if no fields are selected
    if (!selectedBMR && !selectedDep) {
      message.error("Please fill in all fields.");
      return;
    }

    if (!selectedBMR) {
      message.error("Please select BMR No.");
      return;
    }

    if (!selectedDep) {
      message.error("Please select an Department Name.");
      return;
    }

    if (selectedBMR && selectedDep) {
      navigate("/Precot/QA/QA_F047", {
        state: {
          uniqueBMR: selectedBMR,
          uniqueDep: selectedDep,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/QA_F047", {
      state: {
        uniqueBMR: record.bmr,
        uniqueDep: record.department,
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
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    setShowModal(true);
    //
  };

  const handleModalClose = () => {
    setPrintLoading(false);
    setShowModal(false);
    setSelectedPrintDepartment(null);
    setSelectedPrintBMR(null);
    setSelectedPrintMonth(null);
    setSelectedPrintYear(null);
  };

  const printSubmit = () => {
    if (
      (selectedPrintBMR && selectedPrintDepartment) ||
      selectedPrintMonth ||
      selectedPrintYear
    ) {
      fetchPrintData();
    } else {
      message.error("Please select a any field before printing.");
      handleModalClose();
    }
  };

  const fetchPrintData = () => {
    let baseUrl = `${API.prodUrl}/Precot/api/QA/F047/print?`;
    let query = [];

    // Construct the query based on selected fields
    if (selectedPrintBMR) {
      query.push(`bmr=${selectedPrintBMR}`);
    }
    if (selectedPrintDepartment) {
      query.push(`department=${selectedPrintDepartment}`);
    }
    if (selectedPrintMonth) {
      query.push(`month=${selectedPrintMonth}`);
    }
    if (selectedPrintYear) {
      query.push(`year=${selectedPrintYear}`);
    }

    // Join the query parameters to the base URL
    let finalUrl = baseUrl + query.join("&");

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
        // Ensure that the response is an array, even if no data is found
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintData(response.data);
          setPrintLoading(true);

          setTimeout(() => {
            window.print(); // Proceed with printing
            handleModalClose(); // Close the modal after printing
          }, 3000);
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
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "BMR NO.",
      dataIndex: "bmr",
      key: "bmr",
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "QA Inspector Status",
      dataIndex: "qa_ins_status",
      key: "qa_ins_status",
      align: "center",
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "QA Manager or Designee Status",
      dataIndex: "qa_des_status",
      key: "qa_des_status",
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

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit H"
        formName="BATCH RELEASE CHECKLIST"
        formatNo="PH-QAD01-F-047"
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
          marginLeft: "",
          justifyContent: "start",
        }}
      >
        <label
          style={{
            marginRight: "0px",
            marginTop: "5px",
            fontSize: "15px",
            textAlign: "start",
          }}
        >
          Select Department Name:
        </label>
        <Select
          placeholder="Select Department Name"
          style={{ width: "200px", marginLeft: "0px", height: "28px" }}
          onChange={(value) => setSelectedDepartment(value)} // Set the selected equipment number
        >
          <Select.Option value="Pad_Punching">PAD PUNCHING</Select.Option>
          <Select.Option value="Dry_Goods">DRY GOODS</Select.Option>
          <Select.Option value="Cotton_Buds">COTTEN BUDS</Select.Option>
        </Select>

        <label
          style={{
            marginRight: "-10px",
            marginTop: "5px",
            fontSize: "15px",
            textAlign: "start",
          }}
        >
          Select BMR Number:
        </label>
        <Select
          placeholder="Select BMR"
          value={selectedBMR}
          showSearch
          onChange={(value) => setSelectedBMR(value)}
          style={{ width: "200px", height: "28px" }}
        >
          {bmrOptions.length > 0 &&
            bmrOptions.map((bmr) => (
              <Select.Option key={bmr} value={bmr}>
                {bmr}
              </Select.Option>
            ))}
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
          {/* fields */}

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
              style={{ width: "135px", height: "28px", color: "black" }}
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select Department:
            </label>
            <Select
              placeholder="Select Department Name"
              style={{ width: "135px", height: "28px", color: "black" }}
              onChange={(value) => setSelectedPrintDepartment(value)} // Set the selected equipment number
            >
              <Select.Option value="Bleaching">BLEACHING</Select.Option>
              <Select.Option value="Spunlace">SPUNLACE</Select.Option>
              <Select.Option value="Pad_Punching">PAD PUNCHING</Select.Option>
              <Select.Option value="Dry_Goods">DRY GOODS</Select.Option>
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
              Select BMR:
            </label>
            <Select
              placeholder="Select BMR"
              showSearch
              value={selectedPrintBMR}
              onChange={(value) => setSelectedPrintBMR(value)}
              style={{ width: "135px", height: "28px", color: "black" }}
            >
              {bmrPrintOptions.length > 0 &&
                bmrPrintOptions.map((bmr) => (
                  <Select.Option key={bmr} value={bmr}>
                    {bmr}
                  </Select.Option>
                ))}
            </Select>
          </div>
        </div>
      </Modal>

      <Table
        columns={baseColumns}
        dataSource={dataSource}
        rowKey="id" // Ensure each row has a unique key
      />

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
          transform: scale(0.9);
        }

        body * {
          visibility: hidden;
        }

        #section-to-print, #section-to-print * {
          visibility: visible;
        }

        #section-to-print {
          page-break-after: always;
        }
        .page {
          page-break-after: always;
        }
      }
    `}
        </style>

        {printData.map((data, index) => {
          // Declare variables within the function body
          let formattedInsDate = data.ins_submit_on
            ? moment(data.ins_submit_on).format("DD/MM/YYYY HH:mm")
            : "";
          let formattedQCDate = data.qc_submit_on
            ? moment(data.qc_submit_on).format("DD/MM/YYYY HH:mm")
            : "";

          return (
            <div className="page" key={index}>
              {/* Table header */}
              <table
                className="f18table"
                style={{ width: "90%", marginTop: "8%" }}
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
                      BATCH RELEASE CHECKLIST
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Format No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      PH-QAD01-F-047
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
                      PH-QAD01-D-43{" "}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Page No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {index + 1} of {printData.length}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Table body */}
              <table style={{ marginTop: "2%", width: "90%" }}>
                <tbody>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Date: {data.date}
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Department: {data.department}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      S. No.
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={5}
                    >
                      Particulars
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={4}
                    >
                      Status
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      1
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      BMR Number
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.bmrNo}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      2
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Product Name
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.prodName}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      3
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Product code
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.prodCode}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      4
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Batch No./Lot No.
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.batchNo}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      5
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Mfg. Date
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.mfgDate}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      6
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Expiry Date
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.expDate}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      7
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Batch started on
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.batchStart}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      8
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Batch completed on
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.batchEnd}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      9
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Any Special treatment done
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.specialTreatment}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={10}
                      style={{ padding: "2px", textAlign: "start" }}
                    >
                      TO BE COMPLETED BY QUALITY CONTROL
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      1
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Finished product sampled as per SOP
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.sampledPerSop}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      2
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Tested for EP
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.testedEp}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      3
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Description and physical parameters
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.descPhysParams}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      4
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Complete analysis done as per specification
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.analysisDone}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      5
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      All calculations are checked and verified
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.calcChecked}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      6
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Retain samples are kept
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.retainSamples}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      7
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Done by (QC Chemist)
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.doneByQc}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={10}
                      style={{ padding: "2px", textAlign: "start" }}
                    >
                      TO BE COMPLETED BY QUALITY ASSURANCE
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      1
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      BMR handed over to QA
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.bmrToQa}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      2
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Line clearances are given by QA
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.lineClearanceQa}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      3
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Material packed as per PDS
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.packedPerPds}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      4
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Packing and Labeling as per standard
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.stdPackLabel}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      5
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Special packing/labeling as per Customer
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.specPackLabel}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      6
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      Any deviation in the process
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.processDeviation}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={1}
                    >
                      7
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={5}
                    >
                      All calculations are checked and verified
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={4}
                    >
                      {data.calcVerified}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={10}
                    >
                      Result: This batch is {data.batchresult} for sale.
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={5}
                    >
                      Checked by QA
                    </td>
                    <td
                      style={{ padding: "2px", textAlign: "center" }}
                      colSpan={5}
                    >
                      Approved by (QA Manager/Designee)
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={1}
                    >
                      Name
                    </td>
                    <td colSpan={4}>{data.ins_sign}</td>
                    <td colSpan={5}>
                      {getImage1[data.ins_sign] && (
                        <img
                          src={getImage1[data.ins_sign]}
                          alt="Chemist Signature"
                          style={{ width: "50px", height: "auto" }}
                        />
                      )}
                      <br />
                      {formattedInsDate}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "2px", textAlign: "start" }}
                      colSpan={1}
                    >
                      Sign & Date
                    </td>
                    <td colSpan={4}>{data.qc_sign}</td>
                    <td colSpan={5}>
                      {getImage2[data.qc_sign] && (
                        <img
                          src={getImage2[data.qc_sign]}
                          alt="Chemist Signature"
                          style={{ width: "50px", height: "auto" }}
                        />
                      )}
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
    </div>
  );
};

export default QualityAssurance_f047_Summary;
