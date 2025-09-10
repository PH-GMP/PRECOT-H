/* eslint-disable no-restricted-globals */
import {
  Button,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip
} from "antd";
import React from "react";
import BleachingHeader from "../Components/BleachingHeader.js";

import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";

const Buds_f038_Summary = () => {
  const navigate = useNavigate();
  const initial = useRef(false);

  const GlobalStyle = createGlobalStyle`
    @media print {
      @page {
        size: portrait;
      }
      body {
        -webkit-print-color-adjust: exact;
        width: 100%;
        height: 80%;
        transform: scale(0.9); /* Adjust scale as needed */
        // transform-origin: top right; /* Adjust the origin if needed */
        // transform-origin: bottom top ;
        transform-origin: bottom top;
        // transform-origin: top left;
  
      }
    }
  `;

  const formName = "FINAL INSPECTION REPORT (PRE - DISPATCH)";
  const formatNo = "PH-QAD01/F-038";
  const [selectedpOrder, setSelectedpOrder] = useState("");

  const pOrderChange = (value) => setSelectedpOrder(value);
  const [open, setOpen] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [BMR, setBMR] = useState([]);
  const [selectedBMr, setSelectedBMR] = useState("");
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState([]);
  const [printResponseData, setPrintResponseData] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(null);
  const [shift, setShift] = useState("");
  const [pOrder, setPOrder] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [isImages1Loaded, setIsImages1Loaded] = useState(false);
  const [isImages3Loaded, setIsImages3Loaded] = useState(false);
  const [bmrNo, setBmrNo] = useState("");

  const bmrChange = (value) => {
    setSelectedBMR(value);
    setSelectedpOrder("");
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleShiftChange = (value) => {
    setShift(value); // Use the selected value directly
  };

  const handlePOrderChange = (e) => setPOrder(e.target.value);

  const handleBmrNoChange = (e) => setBmrNo(e.target.value);

  const shifts = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  // Fetch audit schedule summary
  const fetchInspectReportSummary = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const summaryResponse = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/getFinalInspectionReportSummary?formatNo=PH-QAD01/F-038`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", summaryResponse.data);

      if (summaryResponse.data.success === false) {
        console.log("Error message:", summaryResponse.data.message);
      } else {
        setSummaryData(summaryResponse.data);
      }
    } catch (error) {
      console.error("Error fetching audit schedule summary:", error);

      if (error.response) {
        const errorMessage =
          error.response.data.message || "An error occurred. Please try again.";
        message.error(errorMessage);
        navigate("/Precot/choosenScreen");
      } else {
        message.error(
          "An unexpected error occurred. Please check your network connection."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      fetchInspectReportSummary();
    }
  }, []);

  const fetchImages3 = async () => {
    const token = localStorage.getItem("token");

    if (Array.isArray(printResponseData)) {
      const promises = printResponseData.map(async (item, index) => {
        const username = item?.qa_mr_sign;
        if (username) {
          try {
            const res = await axios.get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                responseType: "arraybuffer",
              }
            );
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;

            setGetImage3((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          } catch (err) {
            console.error("Error in fetching image:", err);
          }
        }
      });

      // Wait for all image fetch promises to complete
      await Promise.all(promises);
      setIsImages3Loaded(true); // Set to true when all images are loaded
    } else {
      setIsImages3Loaded(true);
    }
  };

  const fetchImages1 = async () => {
    const token = localStorage.getItem("token");

    if (Array.isArray(printResponseData)) {
      const promises = printResponseData.map(async (item, index) => {
        const username = item?.qa_inspector_sign;
        if (username) {
          try {
            const res = await axios.get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                responseType: "arraybuffer",
              }
            );
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;

            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          } catch (err) {
            console.error("Error in fetching image:", err);
          }
        }
      });

      // Wait for all image fetch promises to complete
      await Promise.all(promises);
      setIsImages1Loaded(true);
    } else {
      setIsImages1Loaded(true);
    }
  };

  // Define columns for the audit schedule summary table
  const columns = [
    {
      title: "BMR",
      dataIndex: "bmrNo",
      key: "bmrNo",
      width: "20%",
    },

    {
      title: "QA_Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      width: "20%",
      render: (text) =>
        text
          ? text
              .replace(/QA_INS/g, "QA_INSPECTOR")
              .replace(/QAINSPECTOR_SAVED/g, "QA_INSPECTOR_SAVED")
              .replace(/_/g, " ")
          : text,
    },
    {
      title: "QA/MR Status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
      width: "20%",
      render: (text) => (text ? text.replace(/_/g, " ") : text),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: "20%",
      render: (text) => (text ? text.replace(/_/g, " ") : "N/A"),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<BiEdit />}
          style={{ width: "100%" }}
          onClick={() => handleEdit(record)}
        >
          Review
        </Button>
      ),
    },
  ];

  const handleEdit = (record) => {
    navigate("/Precot/Buds/Buds_F038", {
      state: {
        editDate: record.date,
        editShift: record.shift,
        editpOrder: record.porder,
        editBMR: record.bmrNo,
      },
    });
  };

  useEffect(() => {
    fetchBMRLov();
  }, []);

  const showPrintModal = () => {
    setIsModalPrint(true);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleNavigate = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select shift");
      return;
    } else if (selectedBMr == "" || selectedBMr == null) {
      message.warning("Please Select BmrNo");
      return;
    } else if (selectedpOrder == "" || selectedpOrder == null) {
      message.warning("Please Select BmrNo");
      return;
    }

    navigate("/Precot/Buds/Buds_F038", {
      state: {
        editBMR: selectedBMr,
        editDate: date,
        editShift: shift,
        editpOrder: selectedpOrder,
      },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleModalClose = () => {
    setIsModalPrint(false);
    setDate(null);
    setShift(null);
    setSelectedBMR(null);
    setIsImages1Loaded(false);
    setIsImages3Loaded(false);
    setSelectedpOrder(null);
  };

  const fetchBMRLov = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");
      //alert(selectedDepartment);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/getAllBatchNumbers/finalInspectionReport`, // Replace with your actual API base URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token in Authorization header
          },
        }
      );
      const bmrOptions = response.data.map((dept) => ({
        label: dept,
        value: dept,
      }));
      setBMR(bmrOptions);
    } catch (error) {
      console.error("Error fetching department LOV:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBMr) {
      fetchpOderLov();
    }
  }, [selectedBMr]);

  const fetchpOderLov = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/findOrderNoByBmr/finalInspectionReport?batchNo=${selectedBMr}`, // Replace with your actual API base URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const pOrderOptions = response.data.map((dept) => ({
        label: dept,
        value: dept,
      }));
      setPOrder(pOrderOptions);
    } catch (error) {
      console.error("Error fetching department LOV:", error);
    } finally {
      setLoading(false);
    }
  };

  const printSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      // Construct the dynamic URL
      let url = `${API.prodUrl}/Precot/api/QA/Service/api/getFinalInspectionReportPrint?date=${date}&formatNo=PH-QAD01/F-038`;

      // Add parameters only if they are provided
      if (shift) {
        url += `&shift=${shift}`;
      }
      if (pOrder) {
        url += `&pOrder=${selectedpOrder}`;
      }
      if (bmrNo) {
        url += `&bmrNo=${selectedBMr}`;
      }

      // Make the API request
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Check for the API response
      console.log("API Response:", response);
      console.log(response.data);

      // Handle the case where the response contains "No data"
      if (response.data.success && response.data.message === "No data") {
        message.error(response.data.message); // Show the error message
      } else if (response.data) {
        console.log("Setting print response data");
        setPrintResponseData(response.data);

        // Uncomment to trigger print if necessary
        // window.print();
      } else {
        message.warning("No data available for the selected year and month.");
      }
    } catch (error) {
      message.error("Error fetching data. Please try again.");
      console.error("API Error:", error);
    }

    handleModalClose();
  };

  useEffect(() => {
    fetchImages1();
    fetchImages3();
  }, [printResponseData]);

  // useEffect(() => {
  //     if(isImages1Loaded  && isImages3Loaded && printResponseData){
  //         window.print();
  //     }
  // }, [isImages1Loaded]);

  useEffect(() => {
    if (isImages3Loaded && isImages1Loaded && printResponseData) {
      window.print();
    }
  }, [isImages3Loaded, isImages1Loaded, printResponseData]);

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
            // onClick={handlePrint}
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
      <Row>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
            gap: "10px", // Reduces the gap between items
          }}
        >
          <Input
            addonBefore="Date.:"
            placeholder="Date.:"
            type="date"
            value={date}
            max={today}
            style={{ width: "15%" }} // Adjusted width to be consistent
            onChange={(e) => setDate(e.target.value)}
          />

          <div style={{ display: "flex", alignItems: "center", width: "15%" }}>
            <label style={{ marginRight: "5px", marginLeft: "17px" }}>
              Shift:
            </label>
            <Select
              value={shift}
              onChange={(value) => setShift(value)}
              style={{ width: "100%" }}
            >
              <Select.Option value="I">I</Select.Option>
              <Select.Option value="II">II</Select.Option>
              <Select.Option value="III">III</Select.Option>
            </Select>
          </div>

          <div style={{ display: "flex", alignItems: "center", width: "15%" }}>
            <label style={{ marginRight: "5px" }}>BMR:</label>
            <Select
              value={selectedBMr}
              placeholder="Choose BMR"
              style={{ width: "100%" }}
              onChange={bmrChange}
              options={BMR}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", width: "20%" }}>
            <label style={{ marginRight: "5px" }}>Porder:</label>
            <Select
              showSearch
              value={selectedpOrder}
              placeholder="Choose P Order"
              style={{ width: "100%" }}
              onChange={pOrderChange}
              options={pOrder}
            />
          </div>

          <Button
            type="primary"
            icon={<BiNavigation />}
            style={{ width: "10%", marginLeft: "10px" }} // Adjusted to avoid large gaps
            onClick={handleNavigate}
            shape="round"
          >
            Go To
          </Button>
        </div>
      </Row>

      <Table
        bordered
        columns={columns}
        dataSource={summaryData}
        loading={loading}
        style={{ textAlign: "center", width: "100%" }}
      />

      <Modal
        title="Final Inspection Report (Print)"
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
            onClick={printSubmit}
            loading={printLoading}
          >
            Print
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date:
          </label>
          <Input
            type="Date"
            onChange={handleDateChange}
            style={{ width: "50%" }}
            max={today}
            placeholder="Select Date"
            value={date}
          />
        </div>

        {/* Shift Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Shift:
          </label>
          <Select
            showSearch
            options={shifts}
            onChange={handleShiftChange}
            style={{ width: "50%" }}
            placeholder="Select Shift"
            value={shift}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            BMR No:
          </label>
          <Select
            showSearch
            value={selectedBMr}
            placeholder="Choose BMR"
            style={{ width: "100%" }}
            onChange={bmrChange}
            options={BMR}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            P Order:
          </label>
          <Select
            showSearch
            value={selectedpOrder}
            placeholder="Choose P Order"
            style={{ width: "100%" }}
            onChange={pOrderChange}
            options={pOrder}
          />
        </div>
      </Modal>

      <GlobalStyle />
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

        {Array.isArray(printResponseData) && printResponseData.length > 0 ? (
          printResponseData?.map((responseData, index) => (
            <table style={{ tableLayout: "fixed", width: "1000px" }}>
              <thead>
                <tr>
                  <td
                    style={{ height: "30px", border: "none", outline: "none" }}
                  ></td>
                </tr>

                <tr>
                  <th
                    rowSpan={4}
                    printDateSubmit
                    style={{ textAlign: "center", height: "80px" }}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />{" "}
                    <br></br>
                    Unit H
                  </th>
                  <th style={{ textAlign: "center" }} rowSpan={4} colSpan={2}>
                    FINAL INSPECTION REPORT (PRE - DISPATCH)
                  </th>
                  <th>Format No.:</th>
                  <th style={{ textAlign: "center" }}>PH-QAD01/F-038</th>
                </tr>
                <tr>
                  <th>Revision No.:</th>
                  <th style={{ textAlign: "center" }}>01</th>
                </tr>
                <tr>
                  <th>Ref. SOP No.:</th>
                  <th style={{ textAlign: "center" }}>PH-QAD01-D-32</th>
                </tr>
                <tr>
                  <th>Page No.:</th>
                  <th style={{ textAlign: "center" }}>
                    {index + 1}of {printResponseData?.length}
                  </th>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={3}>
                    Product Description:{" "}
                    {responseData?.productDescription || "N/A"}
                  </td>
                  <td style={{ padding: "5px" }}>
                    BMR No. {responseData?.bmrNo || "N/A"}
                  </td>
                  <td style={{ padding: "5px" }} colSpan={1}>
                    FIR No.: {responseData?.firNo || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={3}>
                    Customer Name:{responseData?.customerName || "N/A"}
                  </td>
                  <td style={{ padding: "5px" }} colSpan={1}>
                    P Order:{responseData?.porder || "N/A"}
                  </td>
                  <td style={{ padding: "5px" }}>
                    Date:{" "}
                    {responseData?.date
                      ? new Date(responseData.date).toLocaleDateString("en-GB")
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>
                    Total Quantity:{responseData?.totalQantity || "N/A"}
                  </td>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    Item Code.:{responseData?.itemCode || "N/A"}
                  </td>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    FG No.:{responseData?.fgNo || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    AQL Sample Size.:{responseData.aqlSampleSize || "N/A"}
                  </td>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    Lot No.:{responseData.lotNo || "N/A"}
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    General Inspection Level - II
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <span style={{ fontWeight: "bold" }}>Parameters</span>
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Sample Size
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Specification
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    Actual finding / reading
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Qty./Pack
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={5}
                  >
                    {responseData?.qtyBagSamplesize || "N/A"}
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.qtyBagSpecification || "N/A"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    {responseData?.qtyBagActualFindings || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Weight/Pack
                  </td>

                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.weightBagSpecification || "N/A"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    {responseData?.weightBagActualFindings || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Artwork printing on bags / Label
                  </td>

                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.fillingHeightSpecification || "N/A"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    {responseData?.fillingHeightActualFindings || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    No. of Pack per carton
                  </td>

                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.gsmWeightOfBallsSpecification || "N/A"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    {responseData?.gsmWeightOfBallsActualFindings || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Length & Dia
                  </td>

                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.surfacePatternSpecification || "N/A"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    colSpan={2}
                  >
                    {responseData?.surfacePatternActualFindings || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Category
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Defects
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    No. Of Defects Observed
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Total No. of Defects Observed
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Maximum No. of Defects Allowed
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={8}
                  >
                    CRITICAL (AQL - Nil)
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Lesser Quantity
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.lesserQuantity || "0"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={8}
                  >
                    {responseData?.criticalTotalNoOfDefectObserved || "0"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={8}
                  >
                    {responseData?.criticalMaximumNoOfDefectObserved || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Incorrect Packaging Material (Poly bag / SRT / Label)
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.incorrectPackagingMaterial || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Wrong / Missing Lot Number
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.wrongMissingLotNumber || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Metal / Insect Contamination
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.metalInsectContamination || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Significant Foreign Material
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.significantForeignMaterial || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Incorrect Bar code on bag / SRP / Label / Shipper
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.incorrectBarCodeOnBag || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Improper shape & Size
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.improperShaperSize || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Dis-coloration
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.majorDiscoloration || "0"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={5}
                  >
                    MAJOR (AQL - 2.5)
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Bend / Broken / stippling buds
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.foldedPads || "0"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={5}
                  >
                    {responseData?.majorTotalNoOfDefectObserved || "0"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={5}
                  >
                    {responseData?.majorMaximumNoOfDefectObserved || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Plastic / Hair / Dirt / Dust contamination's
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.dustContamination || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Improper buds Alignment
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.lowerFillingHeight || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Improper / Open / Damaged Sealing
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.improperOpenDamagedSealing || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    No cotton at ends / Less Bonding Strength
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.noCottonAtEnds || "0"}
                  </td>
                </tr>

                {/* minor */}

                <tr>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={6}
                  >
                    MINOR (AQL - 4)
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Colour Contamination
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.minorColourContamination || "0"}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={6}
                  >
                    {responseData.minorTotalNoOfDefectObserved}
                  </td>
                  <td
                    style={{ padding: "5px", textAlign: "center" }}
                    rowSpan={6}
                  >
                    {responseData?.minorMaximumNoOfDefectObserved || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Black Contamination
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.blackContamination || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Less cotton dia
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.lessGsm || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Edge Condition (sharp)
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.edgeCondition || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Hard buds / Small Size buds
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.hardBalls || "0"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Less Cotton / Loose Cotton / Missing cotton at end
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    {responseData?.lessCotton || "0"}
                  </td>
                </tr>

                <tr>
                  <td colSpan={5} style={{ padding: "5px", textAlign: "left" }}>
                    Lot Status: {responseData?.lotStatus || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td colSpan={5} style={{ padding: "5px", textAlign: "left" }}>
                    Remark: {responseData?.remark || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Inspected by:
                  </td>
                  <td colSpan={2}>
                    <div style={{ textAlign: "center" }}>
                      {responseData.qa_inspector_sign} on{" "}
                      {new Date(
                        responseData.qa_inspector_submit_on
                      ).toLocaleDateString("en-GB")}
                      <br />
                      {new Date(
                        responseData.qa_inspector_submit_on
                      ).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      <br />
                      {getImage1[index] ? (
                        <img
                          src={getImage1[index]}
                          alt={`Ins Sign ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "60px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      ) : null}
                    </div>
                  </td>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    Approved by:
                  </td>
                  <td>
                    <div style={{ textAlign: "center" }}>
                      {responseData.qa_mr_sign} on{" "}
                      {new Date(
                        responseData.qa_mr_submit_on
                      ).toLocaleDateString("en-GB")}{" "}
                      <br />
                      {new Date(
                        responseData.qa_mr_submit_on
                      ).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      <br />
                      {getImage3[index] ? (
                        <img
                          src={getImage3[index]}
                          alt={`Mr Sign ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "60px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              </tbody>
              <br />

              <tfoot>
                <tr>
                  <td
                    colSpan={1}
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Particulars
                  </td>
                  <td colSpan={1}>Prepared by</td>
                  <td colSpan={2}>Reviewed by</td>
                  <td colSpan={1}>Approved by</td>
                </tr>
                <tr>
                  <td
                    colSpan={1}
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Name
                  </td>
                  <td colSpan={1}></td>
                  <td colSpan={2}></td>
                  <td colSpan={1}></td>
                </tr>
                <tr>
                  <td
                    colSpan="1"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Signature & Date
                  </td>
                  <td colSpan="1"></td>
                  <td colSpan="2"></td>
                  <td colSpan="1"></td>
                </tr>
              </tfoot>
            </table>
          ))
        ) : (
          <tr>
            <td colSpan="2">No data available</td>
          </tr>
        )}
      </div>
    </>
  );
};

export default Buds_f038_Summary;
