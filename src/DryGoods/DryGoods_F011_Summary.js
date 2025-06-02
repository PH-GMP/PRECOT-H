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
import BleachingPrintHeader from "../Components/BleachingPrintHeader.js";

const DryGoods_F011_Summary = () => {
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
`;
  const formatName = "Ball, Pleat & Wool Roll Finished Goods Transfer Record";
  const formatNo = "PH-PRD04/F-011";
  const revisionNo = "01";
  const sopNo = "PH-PRD04-D-03";
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
  const [isModalPrint, setIsModalPrint] = useState(false);
  const { Option } = Select;
  const { confirm } = Modal;
  const [getData, setGetData] = useState([]);
  const [reviews, setReviews] = useState({
    operator_sign: "",
    operator_submitted_on: "",
    hod_sign: "",
    hod_submit_on: "",
    operator_status: "",
    hod_status: "",
  });
  const [printParams, setPrintParams] = useState({
    datePrint: "",
    shiftPrint: "",
  });
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const initialized = useRef(false);
  const [printData, setPrintData] = useState({
    finishedLines: [],
  });
  const [printData1, setPrintData1] = useState();
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });

  console.log("print value", printData);

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

  useEffect(() => {
    if (printData.finishedLines.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintData((prevState) => ({
          ...prevState,
          finishedLines: [],
        }));
        setPrintButtonLoading(false);
      }, 3000);
    }

  }, [printData]);

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

  const handleEdit = (record) => {
    navigate(`/Precot/DryGoods/F-011`, {
      state: {
        date: record.date,
        shiftvalue: record.shift,
      },
    });
  };

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
 
    setShowModal(false);
 
  };

  const printDateSubmit = () => {
    if (printNewDate == "") {
      message.warning("Please Select Date");
      return;
    } else {
      window.print();
      handleModalClose();
    }
  };

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
    navigate("/Precot/DryGoods/F-011", {
      state: {
        date: newDate,
        shiftvalue: shift,
      },
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
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

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const roleauth = localStorage.getItem("role");

      if (roleauth !== "ROLE_SUPERVISOR") {
        message.error("Invalid role. Access denied.");
        navigate("/Precot/choosenScreen");
        return;
      }

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/drygoods/getSummarydetailsF011`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

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

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [getData]);

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
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
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
        `${ API.prodUrl}/Precot/api/drygoods/getdetailsForPrintF011?date=${printParams.datePrint}&shift=${printParams.shiftPrint}`,
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
      setPrintData1(response.data);
      const data = response.data[0];
      setPrintData((prevState) => ({
        ...prevState,
        ...data,
      }));
      setReviews((prevState) => ({
        ...prevState,
        supervisor_sign: data.supervisor_sign,
        supervisor_submit_on: data.supervisor_submit_on,
 
      }));
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      datePrint: "",
      shiftPrint: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const entriesPerPage = 15;
  const consumptionReport = [];
  let numberOfPages = Math.ceil(
    printData.finishedLines.length / entriesPerPage
  );

  if (printData || printData.finishedLines.length > 0) {
    for (let i = 0; i < printData.finishedLines.length; i += entriesPerPage) {
      consumptionReport.push(
        printData.finishedLines.slice(i, i + entriesPerPage)
      );
    }
  }

  return (
    <div>
      <div>
 
        <GlobalStyle />
        <div id="section-to-print">
 
          <style>
            {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.7); /* Adjust scale as needed */
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
          <main>
            {consumptionReport.map((bodyContent, pageIndex) => (
              <>
                <BleachingPrintHeader
                  style={{ width: "100%" }}
                  formName={
                    "Ball,Pleate & Wool Roll Finished Goods Transfer Record"
                  }
                  formatNo={"PH-PRD04/F-011"}
                  revisionNo={"01"}
                  refSopNo={"PH-PRD04-D-03"}
                  pageNo={pageIndex + 1 + " of " + numberOfPages}
                />
                <table style={{ marginTop: "10px", width: "97%" }}>
                  <tbody>
                    <tr>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        Date
                      </th>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        Shift
                      </th>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        PO No.
                      </th>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        Product Name
                      </th>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        Material Code No.
                      </th>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        No. Of Box in Pallet
                      </th>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        No. Of Pallet
                      </th>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        Total Box in Nos
                      </th>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        FG Sign & date
                      </th>
                      <th style={{ height: "20px", textAlign: "center" }}>
                        Transfer Sign & date
                      </th>
                    </tr>
                  </tbody>
                  {printData1.map((item, index) =>
                    item.finishedLines.map((row, rowIndex) => (
                      <tr
                        key={`${index}-${rowIndex}`}
                        style={{ width: "100%" }}
                      >
                        <td style={{ textAlign: "center", width: "10%" }}>
                          {moment(item.date).format("DD/MM/YYYY")}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.shift}</td>
                        <td style={{ textAlign: "center" }}>{row.po_no}</td>
                        <td style={{ textAlign: "center" }}>
                          {row.product_name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {row.material_code_no}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {row.no_of_boxes_in_pallet}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {row.no_of_pallet}
                        </td>
                        <td style={{ textAlign: "center" }}>{row.total_box}</td>
                        <td style={{ textAlign: "center" }}>
                          {row.fg_name} <br></br>
                          {formatDateAndTime(item.supervisor_submit_on)}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.supervisor_sign}
                          <br></br>
                          {formatDateAndTime(item.supervisor_submit_on)}
                        </td>
                      </tr>
                    ))
                  )}

                  <br />
                  <tfoot>
                    <tr>
                      <th colSpan="3">Particular</th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        Prepared by
                      </th>
                      <th colSpan="3" style={{ textAlign: "center" }}>
                        Reviewed by
                      </th>
                      <th colSpan="2" style={{ textAlign: "center" }}>
                        Approved by
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="3">Name</th>
                      <td colSpan="2"></td>
                      <td colSpan="3"></td>
                      <td colSpan="2"></td>
                    </tr>
                    <tr>
                      <th colSpan="3">Signature & Date</th>
                      <td colSpan="2"></td>
                      <td colSpan="3"></td>
                      <td colSpan="2"></td>
                    </tr>
                  </tfoot>
                </table>
              </>
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
        title="Print"
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
            {/* <span>Select Shift:</span> */}
            <Select
              placeholder="Select Shift"
      
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
export default DryGoods_F011_Summary;
