import PrecotSidebar from "../Components/PrecotSidebar.js";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import { IoPrint, IoSave } from "react-icons/io5";
import { Button, message, Tooltip, Input, Select, Table, Modal } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import moment from "moment";
import logo from "../Assests/logo.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BiLock, BiNavigation } from "react-icons/bi";
import { createGlobalStyle } from "styled-components";
import { useEffect, useRef, useState } from "react";

const DryGoods_F013_Summary = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  }
`;
  const formatName = "Hand Sanitiasiton Report - Dry Goods ";
  const formatNo = "PH-PRD04/F-013";
  const revisionNo = "01";
  const sopNo = "PH-HRD01-D-29";
  const unit = "Unit H";
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const [date, setDate] = useState("");
  const [newDate, setNewDate] = useState("");
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [gotobtn, setGotobtn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [printdate, setPrintDate] = useState("");
  const [printNewDate, setPrintNewDate] = useState("");
  const [reason, setReason] = useState(false);
  const [summary, setSummary] = useState();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const navigate = useNavigate();
  const [shiftBtnStatus, setShiftBtnStatus] = useState(true);
  const [getData, setGetData] = useState([]);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const { Option } = Select;
  const { confirm } = Modal;
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [printParams, setPrintParams] = useState({
    datePrint: "",
    shiftPrint: "",
  });
  const [reviews, setReviews] = useState({
    hod_sign: "",
    hod_submit_on: "",
    supervisor_sign: "",
    supervisor_submit_on: "",
  });
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });

  useEffect(() => {
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = reviews[key];
      if (username) {
        console.log("usernameparams", username);

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
  }, [reviews]);

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
  const handleDate = (e) => {
 
    setDate(e.target.value);
 
    setNewDate(e.target.value);
  };
  const Dateformat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handlePrintParams = (e, name) => {
    if (name == "datePrint") {
      setPrintParams((prevState) => ({
        ...prevState,
        datePrint: e.target.value,
      }));
    }
    if (name == "shiftPrint") {
      setPrintParams((prevState) => ({
        ...prevState,
        shiftPrint: e,
      }));
    }
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

  const handleShiftChange = (value) => {
    setShift(value);
    setGotobtn(false);
  };

  const handleModalClose = () => {
    // setPrintBtnStatus(true);
    setShowModal(false);
    // setPrintDate("");
    // setPrintShift("");
  };

  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      onOk() {
        localStorage.removeItem("token");
        navigate("/Precot");
      },
      onCancel() {},
    });
  };

  const [sanitizationData, setSanitizationData] = useState([]);
  console.log("2", sanitizationData);

  const printDateSubmit = () => {
    if (printNewDate == "") {
      message.warning("Please Select Date");
      return;
    } else {
      window.print();
      handleModalClose();
    }
  };

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const roleauth = localStorage.getItem("role");
      let apiUrl = "";
      if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
        apiUrl = `${ API.prodUrl}/Precot/api/goods/getHandSanitationSummaryF013`;
      } else if (roleauth === "ROLE_SUPERVISOR") {
        apiUrl = `${ API.prodUrl}/Precot/api/goods/getHandSanitationSummaryF013`;
      } else {
        message.error("Invalid role. Access denied.");
        navigate("/Precot/choosenScreen");
        return;
      }

      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  const handlePrintDate = (e) => {
    // console.log(" date Value", e.target.value);
    setPrintDate(e.target.value);
    setShiftBtnStatus(false);
    const formatDates = Dateformat(e.target.value);
    // console.log("Select Date", formatDates);
    setPrintNewDate(formatDates);
  };

  const handleGoToChange = () => {
    if (newDate == "") {
      message.warning("Please Select Date");
      return;
    }
    if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    navigate("/Precot/DryGoods/F-013", {
      state: {
        date: newDate,
        shiftvalue: shift,
      },
    });
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          { headers }
        );
        setShiftOptions(response.data);
        // console.log("Shift Lov ", shiftOptions);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);

  const handleEdit = (record) => {
    navigate(`/Precot/DryGoods/F-013`, {
      state: {
        date: record.date,
        shiftvalue: record.shift,
      },
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
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  const handlePrint = async () => {
    if (printParams.datePrint == "" || printParams.datePrint == null) {
      message.warning("Please Select Date");
      return;
    }
    if (printParams.shiftPrint == "" || printParams.shiftPrint == "") {
      message.warning("Please Select Shift");
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/goods/getHandSanitationPrintF013?date=${printParams.datePrint}&shift=${printParams.shiftPrint}`,
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
      setSanitizationData(response.data);

      setReviews((prevState) => ({
        ...prevState,
        supervisor_sign: data.supervisor_sign,
        supervisor_submit_on: data.supervisor_submit_on,
        hod_sign: data.hod_sign,
        hod_submit_on: data.hod_submit_on,
        // operator_status: data.operator_status,
        // hod_status: data.hod_status,
      }));
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, 3000);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (sanitizationData > 0) {
      setTimeout(() => {
        window.print();
        // setSanitizationData((prevState) => ({
        //   ...prevState,
        //   sanitizationData: "",
        // }));
        setSanitizationData(null);
        setPrintButtonLoading(false);
      }, 3000);
    }
  }, [sanitizationData]);

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      datePrint: "",
      shiftPrint: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const rowsPerPage = 15;
const sanitizationList = sanitizationData[0]?.sanitizationList || [];
const pages = [];

for (let i = 0; i < sanitizationList.length; i += rowsPerPage) {
  pages.push(sanitizationList.slice(i, i + rowsPerPage));
}

  return (
    <div>
      <div>
        {/* {contextHolder} */}
        {/* print started here */}
        <GlobalStyle />
        <div id="section-to-print">
          <header className="no-print" />
          <main>
          {pages.map((pageData, pageIndex) => (
      <table key={pageIndex} style={{ marginTop: "10px", width: "90%" }}>
              <thead>
                <tr>
                  <td colSpan="5" rowspan="4 " style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br></br>
                    {unit}
                  </td>
                  <th colSpan="18" rowSpan="4" style={{ textAlign: "center" }}>
                    {formatName}
                  </th>
                  <td colSpan="1">Format No.:</td>
                  <td colSpan="1">{formatNo}</td>
                </tr>
                <tr>
                  <td colSpan="1">Revision No.:</td>
                  <td colSpan="1">{revisionNo}</td>
                </tr>
                <td colSpan="1">Ref. SOP No.:</td>
                <td colSpan="1">{sopNo}</td>
                <tr>
                  <td colSpan="1">Page No.:</td>
                  <td colSpan="1">{pageIndex + 1} of {pages.length}</td>
                </tr>
              </thead>
              <br />

              <tbody>
                <tr>
                  <td colSpan={14}>
                    Date: {moment(printParams.datePrint).format("DD/MM/YYYY")}
                  </td>
                  <td colSpan={14}>Shift: {printParams.shiftPrint}</td>
                </tr>
                <tr>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    S No
                  </th>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    ID-NO
                  </th>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    1 Hour
                  </th>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    2 Hour
                  </th>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    3 Hour
                  </th>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    4 Hour
                  </th>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    5 Hour
                  </th>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    6 Hour
                  </th>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    7 Hour
                  </th>
                  <th
                    colSpan="2"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    8 Hour
                  </th>
                  <th
                    colSpan="3"
                    style={{ height: "20px", textAlign: "center" }}
                  >
                    Remarks
                  </th>
                </tr>
                {/* {sanitizationData[0]?.sanitizationList?.map((row, index) => (
                  <tr key={index}> */}
                   {pageData.map((row, index) => (
            <tr key={index}>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {/* {index + 1} */}
                      {index + 1 + pageIndex * rowsPerPage}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {row.idNumber}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {row.hour1 === "Yes"
                        ? "✓"
                        : row.hour1 === "No"
                        ? "✕"
                        : row.hour1 === "NA"
                        ? "NA"
                        : "N/A"}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {row.hour2 === "Yes"
                        ? "✓"
                        : row.hour2 === "No"
                        ? "✕"
                        : row.hour2 === "NA"
                        ? "NA"
                        : "N/A"}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {row.hour3 === "Yes"
                        ? "✓"
                        : row.hour3 === "No"
                        ? "✕"
                        : row.hour3 === "NA"
                        ? "NA"
                        : "N/A"}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {row.hour4 === "Yes"
                        ? "✓"
                        : row.hour4 === "No"
                        ? "✕"
                        : row.hour4 === "NA"
                        ? "NA"
                        : "N/A"}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {row.hour5 === "Yes"
                        ? "✓"
                        : row.hour5 === "No"
                        ? "✕"
                        : row.hour5 === "NA"
                        ? "NA"
                        : "N/A"}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {row.hour6 === "Yes"
                        ? "✓"
                        : row.hour6 === "No"
                        ? "✕"
                        : row.hour6 === "NA"
                        ? "NA"
                        : "N/A"}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {row.hour7 === "Yes"
                        ? "✓"
                        : row.hour7 === "No"
                        ? "✕"
                        : row.hour7 === "NA"
                        ? "NA"
                        : "N/A"}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {row.hour8 === "Yes"
                        ? "✓"
                        : row.hour8 === "No"
                        ? "✕"
                        : row.hour8 === "NA"
                        ? "NA"
                        : "N/A"}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {row.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* <br /> */}
              <tr>
                <td colSpan={28}>
                  ಗಮನಿಸಿ: ALCONOX- ಸಾಕಷ್ಟು ಪ್ರಮಾಣದ ಹ್ಯಾಂಡ್ ಸ್ಯಾನಿಟೈಜರ್ ಅನ್ನು
                  ಅನ್ವಯಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೈಗಳನ್ನು ಒಟ್ಟಿಗೆ ಉಜ್ಜಿಕೊಳ್ಳಿ, ಅಂಗೈಗಳು,
                  ಬೆರಳುಗಳು ಮತ್ತು ಉಗುರುಗಳು ಸೇರಿದಂತೆ ನಿಮ್ಮ ಕೈಗಳ ಎಲ್ಲಾ ಬೆರಳುಗಳನ್ನು
                  ಕನಿಷ್ಠ 20 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಉಜ್ಜಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.
                </td>
              </tr>
              <tr>
                <td colSpan={14} style={{ height: "10%", textAlign: "center" }}>
                  <b>Verified by Production Supervisor Sign & Date</b>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "table-cell",
                          verticalAlign: "bottom",
                          paddingTop: "15px",
                          borderTop: "none",
                          textAlign: "center",
                        }}
                      >
                        {eSign.supervisor_sign ? (
                          <img
                            src={eSign.supervisor_sign}
                            alt="eSign"
                            style={{
                              width: "100px",
                              height: "50px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        {sanitizationData[0]?.supervisor_sign} <br></br>
                        {formatPrintDate(
                          sanitizationData[0]?.supervisor_submit_on
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td colSpan={14} style={{ height: "10%", textAlign: "center" }}>
                  <b>
                    Reviewed by Head of the Department / Designee Sign & Date
                  </b>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "table-cell",
                          verticalAlign: "bottom",
                          paddingTop: "15px",
                          borderTop: "none",
                          textAlign: "center",
                        }}
                      >
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
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {sanitizationData[0]?.hod_sign} <br></br>
                    {formatPrintDate(sanitizationData[0]?.hod_submit_on)}
                  </div>
                </td>
              </tr>
              <br />
              {pageIndex === pages.length - 1 && (
              <tfoot>
                <tr>
                  <th colSpan="7">Particulars</th>
                  <th colSpan="6" style={{ textAlign: "center" }}>
                    Prepared by
                  </th>
                  <th colSpan="6" style={{ textAlign: "center" }}>
                    Reviewed by
                  </th>
                  <th colSpan="6" style={{ textAlign: "center" }}>
                    Approved by
                  </th>
                </tr>
                <tr>
                  <th colSpan="7">Name</th>
                  <td colSpan="6"></td>
                  <td colSpan="6"></td>
                  <td colSpan="6"></td>
                </tr>
                <tr>
                  <th colSpan="7">Signature & Date</th>
                  <td colSpan="6"></td>
                  <td colSpan="6"></td>
                  <td colSpan="6"></td>
                </tr>
              </tfoot>
              )}
            </table>
          ))}
          </main>
          <footer className="no-print" />
        </div>
      </div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit={unit}
        formName={formatName}
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
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // display: printBtnStatus ? "block" : "none",
            }}
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={showPrintModal}
          >
            &nbsp;Print
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            // icon={<IoCaretBackCircleSharp color="#00308F" />}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
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
            onClick={handleLogout}
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
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            // format="DD/MM/YYYY"
            value={date}
            style={{ fontWeight: "bold", width: "135px" }}
            onChange={handleDate}
            max={getCurrentDate()}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <span>
            {" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select
            Shift:
          </span>
        </div>
        <Select
          placeholder="Select Shift"
          value={shift}
          onChange={handleShiftChange}
          style={{ width: 120, fontWeight: "bold" }}
        >
          {shiftOptions.map((shift) => (
            <Option key={shift.id} value={shift.value}>
              {shift.value}
            </Option>
          ))}
        </Select>
        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          onClick={handleGoToChange}
        >
          Go to
        </Button>
      </div>

      <Modal
        title="Hand Sanitiasiton Report (Print)"
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
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "16px",
          }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            // format="DD/MM/YYYY"
            onChange={(e) => {
              handlePrintParams(e, "datePrint");
            }}
            style={{ fontWeight: "bold", width: "135px" }}
            max={getCurrentDate()}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20%",
            }}
          >
            <Select
              placeholder="Select Shift"
              // value={shift}
              // disabled={shiftBtnStatus}
              onChange={(e) => {
                handlePrintParams(e, "shiftPrint");
              }}
              style={{ width: 130, fontWeight: "bold" }}
            >
              {shiftOptions.map((shift) => (
                <Option key={shift.id} value={shift.value}>
                  {shift.value}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={summaryData}
        rowKey="filterId"
      />
    </div>
  );
};
export default DryGoods_F013_Summary;
