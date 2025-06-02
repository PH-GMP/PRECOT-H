/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  EditOutlined
} from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, Tooltip, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  BiLock,
  BiNavigation
} from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const DryGoods_f01_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [printParams, setPrintParams] = useState({
    date: "",
    shift: "",
    laydownNo: "",
  });
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState({
    consumptionReports: [],
  });
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
  const initialized3 = useRef(false);
  const [laydownLov, setLaydownLov] = useState([]);
  const [formParams, setFormParams] = useState({
    date: "",
    shift: "",
    laydown: "",
  });
  const [eSign, setESign] = useState({
    operator_sign: "",
    hod_sign: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["operator_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [token, printData]);
  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/drygoods/getSummarydetailsF001`,
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
    const findReason = () => {
      for (const data of summaryData) {
        if (
          data.supervisor_status == "SUPERVISOR_REJECTED" ||
          data.hod_status == "HOD_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);
  //---------------------------------------------------------------------------

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
      dataIndex: "date",
      key: "date",
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
      title: "Laydown No",
      dataIndex: "laydown_no",
      key: "laydown_no",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
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
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 6), Reason, ...baseColumns.slice(6)];
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
    navigate(`/Precot/DryGoods/F-01`, {
      state: {
        date: record.date,
        shift: record.shift,
        laydownNo: record.laydown_no,
      },
    });
  };

  useEffect(() => {
    if (printData.consumptionReports.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintData((prevState) => ({
          ...prevState,
          consumptionReports: [],
        }));
        setPrintButtonLoading(false);
      }, 3000);
    }
    setESign((prevState) => ({
      ...prevState,
      operator_sign: null,
      supervisor_sign: null,
      hod_sign: null,
    }));
  }, [printData]);

  const handlePrint = async () => {
    if (printParams.date == "" || printParams.date == null) {
      message.warning("Please Select Date");
      return;
    }
    if (printParams.shift == "" || printParams.shift == "") {
      message.warning("Please Select Shift");
      return;
    }
    if (printParams.laydownNo == "" || printParams.laydownNo == "") {
      message.warning("Please Select Laydown No");
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/drygoods/getdetailsForPrintF001?date=${printParams.date}&shift=${printParams.shift}&laydown_no=${printParams.laydownNo}`,
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
      const data = response.data[0];
      setPrintData((prevState) => ({
        ...prevState,
        ...data,
      }));
      setTimeout(() => {
        fetchJob();
      }, 1000);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  console.log("formParams.date", formParams.date);

  const fetchLaydownNo = async (value) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/goodsLaydown/getLaydownByDateAndShift?date=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length > 0) {
        const a = response.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        console.log("response.data", response.data);
        console.log("a", a);
        setLaydownLov(a);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const fetchLaydownNoPrint = async (value) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/goodsLaydown/getLaydownByDateAndShift?date=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length > 0) {
        const a = response.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        console.log(response.data); // Log API response
        console.log(a); // Log mapped values
        setLaydownLov(a);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const fetchJob = async () => {
    let pdeShift;
    switch (printParams.shift) {
      case "I":
        pdeShift = 1;
        break;
      case "II":
        pdeShift = 2;
        break;
      case "III":
        pdeShift = 3;
        break;
    }
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/drygoods/baleReport?date=${printParams.date}&shift=${pdeShift}&laydown_no=${printParams.laydownNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length > 0) {
        setPrintData((prevState) => ({
          ...prevState,
          consumptionReports: response.data,
        }));
      }
    } catch (error) {
      message.error(error.response.data.message);
      setPrintButtonLoading(false);
    }
  };
  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      date: "",
      shift: "",
      laydownNo: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const handlePrintParams = (e, name) => {
    if (name == "date") {
      setLaydownLov([]);
      setPrintParams((prevState) => ({
        ...prevState,
        laydownNo: null,
        date: e.target.value,
      }));
      fetchLaydownNoPrint(e.target.value);
    }
    if (name == "shift") {
      setPrintParams((prevState) => ({
        ...prevState,
        shift: e,
      }));
    }
    if (name == "laydown") {
      setPrintParams((prevState) => ({
        ...prevState,
        laydownNo: e,
      }));
    }
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
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handleParam = (e, name) => {
    console.log("value of date ", name);
    if (name === "date") {
      console.log("value of inside date ", name);
      setLaydownLov([]); // Reset laydown options
      setFormParams((prevState) => ({
        ...prevState,
        laydown: null, // Clear selected laydown
        date: e.target.value,
      }));

      fetchLaydownNo(e.target.value); // Fetch new laydown options
    }

    if (name === "laydown") {
      setFormParams((prevState) => ({
        ...prevState,
        laydown: e,
      }));
    }

    if (name === "shift") {
      setFormParams((prevState) => ({
        ...prevState,
        shift: e,
      }));
    }
  };

  const handleOk = () => {
    if (formParams.date == "" || formParams.date == null) {
      message.warning("Please Select Date");
      return;
    } else if (formParams.shift == "" || formParams.shift == null) {
      message.warning("Please Select Shift");
      return;
    } else if (formParams.laydown == "" || formParams.laydown == null) {
      message.warning("Please Select Laydown");
      return;
    }

    navigate(`/Precot/DryGoods/F-01`, {
      state: {
        date: formParams.date,
        shift: formParams.shift,
        laydownNo: formParams.laydown,
      },
    });
  };
  const options = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  const entriesPerPage = 20;
  const consumptionReport = [];

  // Split the data into pages
  if (printData && printData.consumptionReports.length > 0) {
    for (
      let i = 0;
      i < printData.consumptionReports.length;
      i += entriesPerPage
    ) {
      consumptionReport.push(
        printData.consumptionReports.slice(i, i + entriesPerPage)
      );
    }

    // Check if the last page is empty and remove it if necessary
    if (consumptionReport.length > 0) {
      const lastPage = consumptionReport[consumptionReport.length - 1];
      if (lastPage.length === 0) {
        consumptionReport.pop(); // Remove the last page if it's empty
      }
    }
  }

  // Calculate the number of pages after ensuring the last page is not empty
  let numberOfPages = consumptionReport.length;

  useEffect(() => {
    console.log("PrintData", printData);
  }, [printData]);

  const handleTotal = (bodyContent) => {
    let netWeightTotal = 0;
    bodyContent.forEach((details) => {
      netWeightTotal += details.NetWt;
    });
    console.log("Net Weight", netWeightTotal);
    return { netWeightTotal };
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

  return (
    <>
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
      }
    `}
        </style>
        {consumptionReport.map((bodyContent, pageIndex) => (
          <>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <tr>
                <td style={{ padding: "10px", border: "none" }}></td>
              </tr>
              <tr>
                <td rowSpan={4}>
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
                    width: "60%",
                  }}
                  rowSpan={4}
                >
                  Bale Consumption Report
                </td>
                <td style={{ padding: "0.5em" }}>Format No .:</td>
                <td style={{ padding: "0.5em" }}>PH-PRD04/F-001</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Revision No .:</td>
                <td style={{ padding: "0.5em" }}>01</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Ref Sop.No .:</td>
                <td style={{ padding: "0.5em" }}>PH-PRD04-D-03</td>
              </tr>
              <tr>
                <td style={{ padding: "0.5em" }}>Page No .:</td>
                <td style={{ padding: "0.5em" }}>
                  {pageIndex + 1 + " of " + numberOfPages}
                </td>
              </tr>
            </table>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                marginTop: "2%",
              }}
            >
              <thead>
                <tr>
                  <td colSpan={2}>
                    {" "}
                    Date : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {formatDate(printData.date)}{" "}
                  </td>
                  <td colSpan={2}>
                    {" "}
                    Mixing : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{printData.mixing}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    Shift : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{printData.shift}
                  </td>
                  <td colSpan={2}>
                    Lay Down No.: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {printData.laydown_no}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}> Ab Cotton in Kg: </td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center", width: "10%" }}> S.No.</th>
                  <th style={{ textAlign: "center", width: "30%" }}>
                    Batch No.
                  </th>
                  <th style={{ textAlign: "center", width: "30%" }}>
                    Bale No.
                  </th>
                  <th style={{ textAlign: "center", width: "30%" }}>
                    Net Weight in Kg.
                  </th>
                </tr>
              </thead>
              <tbody>
                {bodyContent.map((row, rowIndex) => (
                  <tr key={rowIndex} style={{ width: "100%" }}>
                    <td style={{ textAlign: "center", width: "10%" }}>
                      {pageIndex == 0
                        ? rowIndex + 1
                        : rowIndex + 1 + pageIndex * 20}
                    </td>
                    <td style={{ textAlign: "center", width: "40%" }}>
                      {row.BatchNo}
                    </td>
                    <td style={{ textAlign: "center", width: "30%" }}>
                      {row.BaleNo}
                    </td>
                    <td style={{ textAlign: "center", width: "30%" }}>
                      {row.NetWt}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th
                    style={{ textAlign: "center", padding: "7px" }}
                    colSpan={3}
                  >
                    Total
                  </th>
                  <td style={{ textAlign: "center" }}>
                    {handleTotal(bodyContent).netWeightTotal == 0
                      ? 0
                      : handleTotal(bodyContent).netWeightTotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      paddingTop: "5px",
                      borderBottom: "none",
                      textAlign: "center",
                    }}
                    colSpan="2"
                  >
                    Operator Sign & Date
                  </td>
                  <td
                    style={{
                      paddingTop: "5px",
                      borderBottom: "none",
                      textAlign: "center",
                    }}
                    colSpan="2"
                  >
                    HOD/Designee Sign & Date{" "}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      display: "table-cell",
                      verticalAlign: "bottom",
                      paddingTop: "15px",
                      borderTop: "none",
                      textAlign: "center",
                    }}
                    colSpan="2"
                  >
                    {" "}
                    {eSign.operator_sign ? (
                      <img
                        src={eSign.operator_sign}
                        alt="eSign"
                        style={{
                          width: "100px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                    <br></br>
                    {printData.operator_sign} <br></br>
                    {formatPrintDate(printData.operator_submitted_on)}
                  </td>
                  <td
                    style={{
                      display: "table-cell",
                      verticalAlign: "bottom",
                      paddingTop: "15px",
                      borderTop: "none",
                      textAlign: "center",
                    }}
                    colSpan="2"
                  >
                    {" "}
                    {eSign.hod_sign ? (
                      <img
                        src={eSign.hod_sign}
                        alt="HOD eSign"
                        style={{
                          width: "100px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                    <br></br>
                    {printData.hod_sign} <br></br>
                    {formatPrintDate(printData.hod_submit_on)}
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                marginTop: "2%",
              }}
            >
              <thead>
                <tr>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Particulars
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Prepared By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Reviewed By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Approved By
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "1em", textAlign: "center" }}>Name</td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Signature & Date
                  </td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                  <td style={{ padding: "1em" }}></td>
                </tr>
              </tbody>
            </table>
          </>
        ))}
      </div>
      <BleachingHeader
        formName={"BALE CONSUMPTION REPORT"}
        formatNo={"PH-PRD04/F-001"}
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
        title="Bale Consumption Details (Print)"
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
        <label>
          Date
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
          &nbsp;&nbsp;
        </label>
        <Input
          type="date"
          onChange={(e) => {
            handlePrintParams(e, "date");
          }}
          style={{ textAlign: "center", width: "150px" }}
        ></Input>
        <br></br>
        <br></br>
        <label>
          Shift
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          : &nbsp;&nbsp;
        </label>
        <Select
          options={options}
          onChange={(e) => {
            handlePrintParams(e, "shift");
          }}
          style={{ textAlign: "center", width: "150px" }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        ></Select>
        <br></br>
        <br></br>
        <label>Laydown No : &nbsp;&nbsp;</label>
        <Select
          options={laydownLov}
          value={printParams.laydownNo}
          onChange={(e) => {
            handlePrintParams(e, "laydown");
          }}
          style={{ textAlign: "center", width: "150px" }}
          showSearch
          dropdownStyle={{ textAlign: "center" }}
        ></Select>
      </Modal>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <label style={{ marginTop: "8px" }}>Date : </label>
        <Input
          style={{ width: "150px" }}
          type="date"
          onChange={(e) => {
            handleParam(e, "date");
          }}
          max={today}
        ></Input>
        <label style={{ marginTop: "8px" }}>Shift : </label>
        <Select
          options={options}
          placeholder="Shift"
          onChange={(e) => {
            handleParam(e, "shift");
          }}
          style={{
            width: "150px",
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
        <label style={{ marginTop: "8px" }}>Laydown No : </label>
        <Select
          value={formParams.laydown}
          options={laydownLov}
          onChange={(e) => {
            handleParam(e, "laydown");
          }}
          style={{ textAlign: "center", width: "150px" }}
          showSearch
          dropdownStyle={{ textAlign: "center" }}
        ></Select>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={handleOk}
        >
          Go To
        </Button>
      </div>
      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default DryGoods_f01_Summary;
