import { EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, Tooltip, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const COTTON_BUDS_F002_Summary = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: Portrait;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  }
`;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [printData, setPrintData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [newDate, setNewDate] = useState("");
  const [shift, setShift] = useState(null);
  const [gotobtn, setGotobtn] = useState(true);
  const [shiftLov, setShiftLov] = useState([]);
  const [datePrint, setDatePrint] = useState("");

  const [machineName, setMachineName] = useState(null);
  const [machineLOV, setMachineLOV] = useState([]);
  const [printParams, setPrintParams] = useState({
    date: "",
    shift: "",
    machineNamePrint: "",
  });
  const [eSign, setESign] = useState({});

  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {}, [newDate]);

  const handleShiftChange = (value) => {
    setShift(value);
    setGotobtn(false);
  };

  const handleMachineNameChange = (value) => {
    setMachineName(value);
    setGotobtn(false);
  };

  useEffect(() => {
    if (printData.length > 0) {
      setTimeout(() => {
        setPrintButtonLoading(false);
        window.print();
      }, [4000]);
    }
  }, [printData]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/buds/Service/getSliverSummary`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const machineLOV = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/buds/sap/Service/machineList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMachineLOV(response.data);
      } catch (error) {
        message.error(error.response.data.message);
      }
    };
    machineLOV();
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (
          data.hod_status == "HOD_REJECTED" ||
          data.supervisor_status == "SUPERVISOR_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);
  //---------------------------------------------------------------------------

  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setShiftLov(data);
        } else {
          console.error("API response is not an array", data);
          setShiftLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setShiftLov([]);
      }
    };

    fetchShiftOptions();
  }, [token]);

  // ---------------------------- Summary Table Column -------------------------
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
      dataIndex: "machineDate",
      key: "machineDate",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "Machine Name",
      dataIndex: "machineName",
      key: "machineName",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      align: "center",
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
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

  const Reason = {
    title: "Reason",
    dataIndex: "rejectReason",
    key: "rejectReason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleEdit = (record) => {
    navigate(`/Precot/COTTON_BUDS/F-002`, {
      state: {
        newdate: record.machineDate,
        shiftvalue: record.shift,
        machineName: record.machineName,
      },
    });
  };

  const formatPrintDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      date: "",
      shift: "",
      machineNamePrint: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const handlePrintParams = (e, name) => {
    if (name == "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        date: e.target.value,
      }));
    }
    if (name == "shift") {
      setPrintParams((prevState) => ({
        ...prevState,
        shift: e,
      }));
    }
    if (name == "machineNamePrint") {
      setPrintParams((prevState) => ({
        ...prevState,
        machineNamePrint: e,
      }));
    }
  };

  const handlePrint = async () => {
    if (
      printParams.machineNamePrint == "" &&
      printParams.shift == "" &&
      printParams.date == ""
    ) {
      message.warning("Please Select Atleast One Field");
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/buds/Service/printSliverProduction?date=${printParams.date}&shift=${printParams.shift}&machine_name=${printParams.machineNamePrint}`,
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
      const uniqueSigns = new Set();

      const fetchSignatures = async () => {
        for (const entry of response.data) {
          const { operator_sign, supervisor_sign, hod_submit_by } = entry;

          if (operator_sign && !uniqueSigns.has(operator_sign)) {
            uniqueSigns.add(operator_sign);
            fetchSignature(operator_sign, operator_sign);
          }
          if (supervisor_sign && !uniqueSigns.has(supervisor_sign)) {
            uniqueSigns.add(supervisor_sign);
            fetchSignature(supervisor_sign, supervisor_sign);
          }
          if (hod_submit_by && !uniqueSigns.has(hod_submit_by)) {
            uniqueSigns.add(hod_submit_by);
            fetchSignature(hod_submit_by, hod_submit_by);
          }
        }
      };

      await fetchSignatures();
      setPrintData(response.data);
    } catch (error) {
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  const fetchSignature = async (sign, key) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/image?username=${sign}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const url = `data:image/jpeg;base64,${base64}`;
      setESign((prevSign) => ({
        ...prevSign,
        [key]: url,
      }));
    } catch (err) {}
  };

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const goTo = () => {
    if (newDate == "" || newDate == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    } else if (machineName == "" || machineName == null) {
      message.warning("Please Select Machine Name");
      return;
    }
    navigate("/Precot/COTTON_BUDS/F-002", {
      state: {
        newdate: newDate,
        shiftvalue: shift,
        machineName: machineName,
      },
    });
  };

  return (
    <>
      <div>
        {contextHolder}
        <GlobalStyle />
        <div id="section-to-print">
          <style>
            {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print-san table th,
  #section-to-print-san table td {
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
          {printData.map((data, index) => (
            <div className="page-break">
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <td style={{ border: "none", padding: "20px" }}></td>
                  </tr>
                  <tr>
                    <td rowSpan={4} colSpan={1}>
                      <div style={{ textAlign: "center" }}>
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

                        <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                      </div>
                    </td>

                    <td
                      style={{
                        padding: "0.5em",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                      colSpan={4}
                      rowSpan={4}
                    >
                      DAILY PRODUCTION - SLIVER MAKING <br /> FOR COTTON BUDS
                    </td>
                    <td style={{ padding: "0.5em" }} colSpan={3}>
                      Format No.:
                    </td>
                    <td style={{ padding: "0.5em" }} colSpan={2}>
                      PH-PRD06/F-003
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }} colSpan={3}>
                      Revision No.:
                    </td>
                    <td style={{ padding: "0.5em" }} colSpan={2}>
                      01
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }} colSpan={3}>
                      Ref. SOP No.:
                    </td>
                    <td style={{ padding: "0.5em" }} colSpan={2}>
                      PH-PRD06-D-03
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }} colSpan={3}>
                      Page No.:
                    </td>
                    <td style={{ padding: "0.5em" }} colSpan={2}>
                      {index + 1} of {printData.length}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "none", padding: "10px" }}></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={10}>1. Machine Name: {data.machineName} </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>Date: {formatDate(data.machineDate)}</td>
                    <td colSpan={3}>Shift: {data.shift} </td>
                    <td colSpan={3}>Lay down No.: {data.laydownNumber}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Order No.</td>
                    <td colSpan={2}>{data.orderNumber}</td>
                    <td colSpan={3}>Mixing</td>
                    <td colSpan={3}>{data.mixing}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Customer Name</td>
                    <td colSpan={2}>{data.customerName}</td>
                    <td colSpan={6}>
                      Std. Wt in Grams (Wt. Tolerance in +/- 5%)
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={10}>2.Parameters:</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      GPM
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      Draft
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      Doffer Speed in rpm
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      Sliver Length in Mtrs
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      {data.gpm}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      {data.draft}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      {data.dofferSpeed}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      {data.sliverLength}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={10}> 3.Perfect Card Sliver Production:</td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "center" }}>S. No.</td>
                    <td style={{ textAlign: "center" }}>Sliver Can No</td>
                    <td style={{ textAlign: "center" }}>GPM</td>
                    <td style={{ textAlign: "center" }}>Carding M/c No</td>
                    <td style={{ textAlign: "center" }}>Net Wet (kgs)</td>
                    <td style={{ textAlign: "center" }}>S. No.</td>
                    <td style={{ textAlign: "center" }}>Sliver Can No</td>
                    <td style={{ textAlign: "center" }}>GPM</td>
                    <td style={{ textAlign: "center" }}>Carding M/c No</td>
                    <td style={{ textAlign: "center" }}>Net Wet (kgs)</td>
                  </tr>
                  {data.sliverLine.map((row, rowIndex) => (
                    <tr>
                      <td style={{ textAlign: "center" }}> {rowIndex + 1}</td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {row.sliverCanNumber1}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>{row.gpm1} </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {row.cardingMachineNumber1}
                      </td>
                      <td style={{ textAlign: "center" }}>{row.netWeight1} </td>
                      <td style={{ textAlign: "center" }}>{rowIndex + 1} </td>
                      <td style={{ textAlign: "center" }}>
                        {row.sliverCanNumber2}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>{row.gpm2} </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {row.cardingMachineNumber2}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {row.netWeight2}{" "}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan={4}>
                      {" "}
                      Total in Kg
                    </td>
                    <td style={{ textAlign: "center" }}>{data.total1}</td>
                    <td style={{ textAlign: "center" }} colSpan={4}>
                      Total in Kg
                    </td>
                    <td style={{ textAlign: "center" }}>{data.total2}</td>
                  </tr>
                  <tr>
                    <td colSpan={10}>
                      Total Production in Kg: {data.totalProduction}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2} colSpan={4}>
                      Waste in Kg
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      Compactor waste
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      Sliver Weight in Kgs
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      {data.compactorWaste}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      {data.sliverWeight}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={10}>4.Stoppage:</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      Nature Of Problem
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      Stop. Time
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      Restart Time
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      Idle Time (in Min)
                    </td>
                  </tr>
                  {data.stoppageDetails.map((row, rowIndex) => (
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        {row.problemNature}
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        {row.stopTime}
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={3}>
                        {row.restartTime}
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={3}>
                        {row.idleTime}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan={3}
                      style={{ textAlign: "center", borderBottom: "none" }}
                    >
                      Performed by Operator Sign & Date
                    </td>
                    <td
                      colSpan={3}
                      style={{ textAlign: "center", borderBottom: "none" }}
                    >
                      Checked by Supervisor Sign & Date{" "}
                    </td>
                    <td
                      colSpan={4}
                      style={{ textAlign: "center", borderBottom: "none" }}
                    >
                      Reviewed by HOD/ DesigneeSign & Date
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      style={{ textAlign: "center", borderTop: "none" }}
                    >
                      {eSign[data.operator_sign] ? (
                        <img
                          src={eSign[data.operator_sign]}
                          alt="Operator eSign"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                      <br />
                      {data.operator_sign}
                      <br />
                      {formatDateAndTime(data.operator_submitted_on)}
                    </td>
                    <td
                      colSpan={3}
                      style={{ textAlign: "center", borderTop: "none" }}
                    >
                      {eSign[data.supervisor_sign] ? (
                        <img
                          src={eSign[data.supervisor_sign]}
                          alt="Operator eSign"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                      <br />
                      {data.supervisor_sign}
                      <br />
                      {formatDateAndTime(data.supervisor_submit_on)}
                    </td>
                    <td
                      colSpan={4}
                      style={{ textAlign: "center", borderTop: "none" }}
                    >
                      {eSign[data.hod_submit_by] ? (
                        <img
                          src={eSign[data.hod_submit_by]}
                          alt="Operator eSign"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                      <br />
                      {data.hod_submit_by}
                      <br />
                      {formatDateAndTime(data.hod_submit_on)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td style={{ border: "none", padding: "10px" }}></td>
                  </tr>
                  <tr>
                    <td style={{ padding: "1em" }}>Particulars</td>
                    <td
                      style={{ padding: "1em", textAlign: "center" }}
                      colSpan={3}
                    >
                      Prepared By
                    </td>
                    <td
                      style={{ padding: "1em", textAlign: "center" }}
                      colSpan={3}
                    >
                      Reviewed By
                    </td>
                    <td
                      style={{ padding: "1em", textAlign: "center" }}
                      colSpan={3}
                    >
                      Approved By
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "1em" }}>Name</td>
                    <td style={{ padding: "1em" }} colSpan={3}></td>
                    <td style={{ padding: "1em" }} colSpan={3}></td>
                    <td style={{ padding: "1em" }} colSpan={3}></td>
                  </tr>
                  <tr>
                    <td style={{ padding: "1em" }}>Signature & Date</td>
                    <td style={{ padding: "1em" }} colSpan={3}></td>
                    <td style={{ padding: "1em" }} colSpan={3}></td>
                    <td style={{ padding: "1em" }} colSpan={3}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </div>
      </div>
      <BleachingHeader
        formName={"DAILY PRODUCTION - SLIVER MAKING FOR COTTON BUDS"}
        formatNo={"PH-PRD06/F-003"}
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Modal
        title="DAILY PRODUCTION - SLIVER MAKING FOR COTTON BUDS (Print)"
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
            OK
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
            style={{ marginRight: "1px", width: "30%", textAlign: "center" }}
          >
            Machine Name:
          </label>

          <Select
            showSearch
            placeholder="Machine Name"
            id="ph-select"
            options={machineLOV}
            value={printParams.machineNamePrint}
            onChange={(e) => {
              handlePrintParams(e, "machineNamePrint");
            }}
            size="medium"
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              margin: "10px",
              textAlign: "center",
              width: "200px",
            }}
            dropdownStyle={{ textAlign: "center" }}
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
            Date:
          </label>

          <Input
            onChange={(e) => {
              handlePrintParams(e, "date");
            }}
            type="date"
            size="small"
            style={{ width: "50%", height: "30px", textAlign: "center" }}
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
            Shift:
          </label>

          <Select
            showSearch
            value={printParams.shift}
            style={{ width: "50%", textAlign: "center" }}
            placeholder="Search Batch No"
            optionFilterProp="children"
            onChange={(e) => {
              handlePrintParams(e, "shift");
            }}
            dropdownStyle={{ textAlign: "center" }}
          >
            <Select.Option value="" disabled selected>
              Shift
            </Select.Option>
            {shiftLov.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "16px",
        }}
      >
        <Input
          addonBefore="Date"
          placeholder="Date"
          type="date"
          size="Medium"
          value={newDate}
          style={{
            fontWeight: "bold",
            width: "135px",
            marginTop: "10px",
            marginLeft: "10px",
            textAlign: "center",
          }}
          onChange={(e) => setNewDate(e.target.value)}
          max={today}
        />

        <Select
          showSearch
          value={shift}
          onChange={handleShiftChange}
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            margin: "10px",
            marginLeft: "70px",
            width: "200px",
            textAlign: "center",
          }}
          dropdownStyle={{ textAlign: "center" }}
          placeholder="Shift"
          optionFilterProp="children"
        >
          <Select.Option value="" disabled selected>
            Shift
          </Select.Option>
          {shiftLov.map((option) => (
            <Select.Option key={option.id} value={option.value}>
              {option.value}
            </Select.Option>
          ))}
        </Select>

        <Select
          showSearch
          placeholder="Machine Name"
          id="ph-select"
          options={machineLOV}
          onChange={handleMachineNameChange}
          value={machineName}
          size="medium"
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            margin: "10px",
            textAlign: "center",
            width: "200px",
          }}
          dropdownStyle={{ textAlign: "center" }}
        />

        <Button
          type="primary"
          style={{
            color: "#00308F",
            fontWeight: "bold",
            backgroundColor: "#E5EEF9",
            margin: "10px",
            marginLeft: "10px",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={goTo}
        >
          Go To
        </Button>
      </div>

      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default COTTON_BUDS_F002_Summary;
