/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Input, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { FaPrint } from "react-icons/fa6";
import API from "../baseUrl.json";

import { EditOutlined } from "@ant-design/icons";

import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { printDateFormat, slashFormatDate } from "../util/util.js";

const BudsF001EquipSummary = () => {
  const navigate = useNavigate();
  const initialized = useRef(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [shiftvalue, setshiftvalue] = useState("");

  const [formParams, setFormParams] = useState({
    date: "",
    shift: "",
    saleOrderNo: "",
  });
  const shiftOptions = ["I", "II", "III"];
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
    date: "",
    shift: "",
  });

  const [eSign, setESign] = useState([
    {
      operator_submitted_by: null,
      supervisor_submit_by: null,
      hod_submit_by: null,
    },
  ]);

  const [reason, setReason] = useState(false);
  const [bmrLov, setBmrLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([
    {
      id: 1,
      value: "I",
    },
    {
      id: 2,
      value: "II",
    },
    {
      id: 3,
      value: "III",
    },
  ]);

  const [summaryData, setSummaryData] = useState([]);

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 21 }, (_, i) => currentYear - i);
  const { Option } = Select;
  const [printDatas, setPrintDatas] = useState([]);
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

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
      dataIndex: "equipmentDate",
      key: "equipmentDate",
      align: "center",
      render: (text) => slashFormatDate(text),
    },

    {
      title: "Shift",
      dataIndex: "equipmentShift",
      key: "equipmentShift",
      align: "center",
    },
 
    {
      title: "BMR No",
      dataIndex: "saleOrderNo",
      key: "saleOrderNo",
      align: "center",
      render: (text) => text || "NA",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      align: "center",
      render: (text) => text || "NA",
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
      render: (text) => text || "NA",
    },
    {
      title: "Hod Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
      render: (text) => text || "NA",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              navigate("/Precot/CottonBuds/F-001", {
                state: {
                  date: record.equipmentDate,
                  shift: record.equipmentShift,
                  saleOrderNo: record.saleOrderNo,
                },
              })
            }
            style={{ width: "100%" }}
          >
            Review
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
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
  } else {
    columns = baseColumns;
  }

  const handlePrintParams = (value, name) => {
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const handleChange = (name, value) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGo = () => {
    if (formParams.date == "") {
      message.warning("Please Select the Date");
      return;
    }
    if (formParams.shift == "") {
      message.warning("Please Select the Shift");
      return;
    }
    if (formParams.saleOrderNo == "") {
      message.warning("Please Select the Sale Order No");
      return;
    }

    navigate("/Precot/CottonBuds/F-001", {
      state: {
        date: formParams.date,
        shift: formParams.shift,
        saleOrderNo: formParams.saleOrderNo,
      },
    });
  };
  const handleShift = async (e) => {
    setshiftvalue(e);
  };
  const GlobalStyle = createGlobalStyle`
    @media print {
      @page {
        size: landscape;
      }
      body {
        -webkit-print-color-adjust: exact;
        width: 100%;
        height: 100%;
        transform: scale(0.9); /* Adjust scale as needed */
        transform-origin: top left right bottom; /* Adjust the origin if needed */
      }
    }
                      .page-break {
                page-break-after: always;
            }
  `;

  const handlePrint = async (e) => {
    const token = localStorage.getItem("token");
    setPrintButtonLoading(true);
 
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/buds/Service/printEquipmentDetails?year=${printParams.year}&month=${printParams.month}&date=${printParams.date}&shift=${printParams.shift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      setPrintDatas(response.data);

      setTimeout(() => {
        setPrintButtonLoading(false);
        window.print();
      }, 1000);
    } catch (error) {
       
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  const handlePrintCancel = () => {
    setPrintParams({
      month: "",
      year: "",
      date: "",
      shift: "",
    });
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  //   useEffect(() => {
  //     if (printResponseData && printResponseData) {
  //         setIsFetchSuccessful(false);
  //     } else {
  //         setIsFetchSuccessful(true);
  //     }
  //   }, [printResponseData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "operator_submitted_by",
      "supervisor_submit_by",
      "hod_submit_by",
    ];
    signatureKeys.forEach((key) => {
      if (printDatas && printDatas.length > 0) {
        printDatas.forEach((dataItem, index) => {
          let newSign = {}; // Create a new object for the current printData item

          signatureKeys.forEach((key) => {
            const username = dataItem[key];

            if (username) {
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
                  newSign[key] = url;

                  setESign((prevSign) => {
                    const updatedSigns = [...prevSign];
                    updatedSigns[index] = {
                      ...updatedSigns[index],
                      ...newSign,
                    };
                    return updatedSigns;
                  });

                 })
                .catch((err) => {
                   
                });
            }
          });
        });
      }
    });
  }, [printDatas]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const token = localStorage.getItem("token");
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/buds/Service/equipmentDetailSummary`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
          const hasReason = response.data.some(
            (item) => item.reason !== null && item.reason !== "NA"
          );

          setReason(hasReason);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      const fetchBMR = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/buds/bmr/fetchProductionDetails`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setBmrLov(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchBMR();
      fetchData();
    }
  }, []);

  let indexCount = 0;

  const recordsPerPage = 5;

  const totalPages = Math.ceil(printDatas.length / recordsPerPage);

  const paginateData = (data, pageNumber) => {
    if (!Array.isArray(data)) {
      console.error("paginateData error: data is not an array", data);
      return [];
    }

    const start = (pageNumber - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    return data.slice(start, end);
  };

  return (
    <>
      <BleachingHeader
        formName={"EQUIPMENT USAGE LOGBOOK - COTTON BUDS"}
        formatNo={"PH-PRD06/F-001"}
        unit={"UNIT H"}
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
      <Modal
        title="EQUIPMENT USAGE LOGBOOK - COTTON BUDS (Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handlePrint}
            loading={printButtonLoading}
          >
            Print
          </Button>,
        ]}
      >
        <div>
          <Input
            addonBefore="Date"
            size="small"
            value={printParams.date}
            type="date"
            style={{
              width: "200px",
            }}
            disabled={printParams.year !== "" || printParams.month !== ""}
            onChange={(e) => handlePrintParams(e.target.value, "date")}
          />
        </div>
        <div style={{ paddingTop: "5px" }}>
          <label> Select Year :</label>

          <Select
            style={{
              width: "100%",
              height: "40px",
            }}
            placeholder="Select Year"
            value={printParams.year}
            onChange={(value) => handlePrintParams(value, "year")}
            disabled={printParams.date !== ""}
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
            fontSize: "14px",
            marginTop: "8px",
          }}
        >
          Select Month:
        </div>
        <Select
          style={{
            width: "100%",
            height: "40px",
            borderRadius: "0px",
            border: "1px solid #ddd",
            backgroundColor: "white",
          }}
          placeholder="Select Month"
          value={printParams.month}
          onChange={(value) => handlePrintParams(value, "month")}
          disabled={printParams.date !== ""}
        >
          {months?.map((shiftvalue, index) => (
            <Option key={index} value={shiftvalue.value}>
              {shiftvalue.label}
            </Option>
          ))}
        </Select>

        <div style={{ paddingTop: "5px" }}>
          <label> Select Shift :</label>
          <Select
            placeholder="Select Shift"
            style={{ width: "100%" }}
            value={printParams.shift}
            onChange={(value) => handlePrintParams(value, "shift")}
          >
            {shiftOptions.map((shift, index) => (
              <Option key={index} value={shift}>
                {shift}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
      <div>
        <input
          type="date"
          onChange={(e) => handleChange("date", e.target.value)}
          style={{ margin: "0.5rem" }}
        />
        <Select
          placeholder="Shift"
          options={shiftLov}
          onChange={(value) => handleChange("shift", value)}
          style={{ margin: "0.5rem", width: "5rem" }}
        />
        <Select
          placeholder="Select BMR"
          options={bmrLov}
          onChange={(value) => handleChange("saleOrderNo", value)}
          style={{ margin: "0.5rem", width: "8rem" }}
        />
        <Button onClick={handleGo} style={{ margin: "0.5rem" }}>
          Go
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={summaryData}
          style={{ margin: "0.5rem" }}
        />
        <div id="section-to-print">
          <GlobalStyle />

          <div>
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                style={{ marginTop: "40px", pageBreakAfter: "always" }}
              >
                <table key={pageIndex}>
                  <thead>
                    <tr>
                      <td style={{ border: "none", padding: "0.5rem" }}></td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        rowspan="4 "
                        style={{ textAlign: "center" }}
                      >
                        <img
                          src={logo}
                          alt="Logo"
                          style={{
                            width: "80px",
                            height: "auto",
                            textAlign: "center",
                          }}
                        />
                        <br></br>
                        <br></br>
                        Unit H
                      </td>
                      <th
                        colSpan={12}
                        rowSpan="4"
                        style={{ textAlign: "center" }}
                      >
                        EQUIPMENT USAGE LOGBOOK - COTTON BUDS
                      </th>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        Format No.:
                      </td>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        PH-PRD06/F-001
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        Revision No.:
                      </td>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        01
                      </td>
                    </tr>
                    <td colSpan={2} style={{ padding: "0.5rem" }}>
                      Ref. SOP No.:
                    </td>
                    <td colSpan={2} style={{ padding: "0.5rem" }}>
                      PH-PRD06-D-03
                    </td>
                    <tr>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        Page No.:
                      </td>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        {" "}
                        {pageIndex + 1} of {totalPages}
                      </td>
                    </tr>
                    <tr style={{ border: "none" }}>
                      <td style={{ border: "none", padding: "0.5rem" }}></td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        S.No.
                      </th>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        Date
                      </th>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        Shift
                      </th>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        Machine ID
                      </th>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        Sale Order No.
                      </th>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        Prod. Order No.
                      </th>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        Product Name
                      </th>
                      <th
                        colSpan="3"
                        style={{ padding: "0.5rem", textAlign: "center" }}
                      >
                        QTY.
                      </th>
                      <th
                        colSpan="2"
                        style={{ padding: "0.5rem", textAlign: "center" }}
                      >
                        Operation
                      </th>
                      <th
                        colSpan="2"
                        style={{ padding: "0.5rem", textAlign: "center" }}
                      >
                        Cleaning
                      </th>
                      <th style={{ padding: "0.5rem" }} colSpan={2}>
                        Breakdown / Preventive Maintenance
                      </th>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        Done By Sign & Date
                      </th>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        Checked By Sign & Date
                      </th>
                      <th rowSpan="2" style={{ padding: "0.5rem" }}>
                        Reviewed By Sign & Date
                      </th>
                    </tr>
                    <tr>
                      <th style={{ padding: "0.5rem", textAlign: "center" }}>
                        Open Qty
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "center" }}>
                        Prod Qty
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "center" }}>
                        Bal Qty
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "center" }}>
                        Start
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "center" }}>
                        End
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "center" }}>
                        Start
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "center" }}>
                        End
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "center" }}>
                        Start
                      </th>
                      <th style={{ padding: "0.5rem", textAlign: "center" }}>
                        End
                      </th>
                    </tr>
             

                    {printDatas &&
                      paginateData(printDatas, pageIndex + 1).map(
                        (reportData, reportIndex) =>
                          reportData?.equipmentLine?.map((item, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: "center" }}>
                                {++indexCount}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {moment(reportData?.equipmentDate).format(
                                  "DD/MM/YYYY"
                                )}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {reportData.equipmentShift || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.machineName || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {reportData.saleOrderNo || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.productionOrder || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.productName || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.openQuantity || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.prodQuantity || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.balanceQuantity || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.startOperation || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.endOperation || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.startCleaning || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.endCleaning || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.startBreakdown || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.endBreakdown || "N/A"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <div>{reportData.operator_submitted_by}</div>
                                <div>
                                  {printDateFormat(
                                    reportData.operator_submitted_on
                                  )}
                                </div>
                                <div>
                                  {eSign[reportIndex]
                                    ?.operator_submitted_by && (
                                    <img
                                      src={
                                        eSign[reportIndex]
                                          ?.operator_submitted_by
                                      }
                                      alt="operator_sign"
                                      style={{
                                        width: "100px",
                                        height: "50px",
                                        objectFit: "contain",
                                        mixBlendMode: "multiply",
                                      }}
                                    />
                                  )}
                                </div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <div>{reportData.supervisor_submit_by}</div>
                                <div>
                                  {printDateFormat(
                                    reportData.supervisor_submit_on
                                  )}
                                </div>
                                <div>
                                  {eSign[reportIndex]?.supervisor_submit_by && (
                                    <img
                                      src={
                                        eSign[reportIndex]?.supervisor_submit_by
                                      }
                                      alt="supervisor_sign"
                                      style={{
                                        width: "100px",
                                        height: "50px",
                                        objectFit: "contain",
                                        mixBlendMode: "multiply",
                                      }}
                                    />
                                  )}
                                </div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <div>{reportData.hod_submit_by}</div>
                                <div>
                                  {printDateFormat(reportData.hod_submit_on)}
                                </div>
                                <div>
                                  {eSign[reportIndex]?.hod_submit_by && (
                                    <img
                                      src={eSign[reportIndex]?.hod_submit_by}
                                      alt="hod_sign"
                                      style={{
                                        width: "100px",
                                        height: "50px",
                                        objectFit: "contain",
                                        mixBlendMode: "multiply",
                                      }}
                                    />
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                      )}
                  </tbody>

                  <tfoot>
                    <tr style={{ border: "none" }}>
                      <td style={{ border: "none", padding: "0.5rem" }}></td>
                    </tr>

                    <tr>
                      <td colspan="5" style={{ padding: "1em" }}>
                        Particulars
                      </td>
                      <td colspan="5" style={{ padding: "1em" }}>
                        Prepared By
                      </td>
                      <td colspan="5" style={{ padding: "1em" }}>
                        Reviewed By
                      </td>
                      <td colspan="4" style={{ padding: "1em" }}>
                        Approved By
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5" style={{ padding: "1em" }}>
                        Name
                      </td>
                      <td colspan="5" style={{ padding: "1em" }}></td>
                      <td colspan="5" style={{ padding: "1em" }}></td>
                      <td colspan="4" style={{ padding: "1em" }}></td>
                    </tr>
                    <tr>
                      <td colspan="5" style={{ padding: "1em" }}>
                        Signature & Date
                      </td>
                      <td colspan="5" style={{ padding: "1em" }}></td>
                      <td colspan="5" style={{ padding: "1em" }}></td>
                      <td colspan="4" style={{ padding: "1em" }}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BudsF001EquipSummary;
