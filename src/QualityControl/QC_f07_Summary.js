/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../Assests/logo.png";
import {
  Table,
  Modal,
  Select,
  InputGroup,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { Tabs, Button, Col, Input, Row } from "antd";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import moment from "moment";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { PrintPageOrientation } from "../General/PrintPageOrientation.js";

const QC_f07_Summary = () => {
  PrintPageOrientation({ orientation: "landscape", scale: 0.9 });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [GlasswareBreakage, setGlasswareBreakage] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [showModal, setShowModal] = useState(false);
  const [datePrint, setDatePrint] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [yearPrint, setYearPrint] = useState("");
  const [equipment, setEquipment] = useState("");
  const [equipmentPrint, setEquipmentPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [equipmentNoLov, setEquipmentNoLov] = useState([]);

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDatewithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.qc_sign;
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,     API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.chemist_sign;
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
            setGetImage2((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,     API.prodUrl, token]);

  const monthsLov = [
    { id: 1, value: "January" },
    { id: 2, value: "February" },
    { id: 3, value: "March" },
    { id: 4, value: "April" },
    { id: 5, value: "May" },
    { id: 6, value: "June" },
    { id: 7, value: "July" },
    { id: 8, value: "August" },
    { id: 9, value: "September" },
    { id: 10, value: "October" },
    { id: 11, value: "November" },
    { id: 12, value: "December" },
  ];
  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }

  const yearOptions = generateYearOptions(2024, 2040);

  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  useEffect(() => {
    const fetchEquipmentNo = async () => {
      try {
        const response = await fetch(
          `${   API.prodUrl}/Precot/api/chemicaltest/CLF007/PDE-EQID`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          setEquipmentNoLov(data);
        } else {
          setEquipmentNoLov([]);
        }
      } catch (error) {
        setEquipmentNoLov([]);
      }
    };

    fetchEquipmentNo();
  }, [token]);

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
  };
  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
    setYearPrint(null);
    setMonthPrint(null);
    setEquipment(null);
  };
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (
          data.qc_status === "QA_REJECTED" ||
          data.qc_status === "QC_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);

  const handlePrintDateChange = (event) => {
    setDatePrint(event.target.value);
  };

  //   handle edit
  const handleEdit = (record) => {
    const { date } = record;
    const { eq_id_no } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QC/F-07", {
      state: {
        date: formattedDate,
        equipment: eq_id_no,
      },
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };
  const handleEquipmentChange = (value) => {
    setEquipment(value);
  };
  const handleMonthPrintChange = (value) => {
    setMonthPrint(value);
  };
  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };
  const handleEquipmentPrintChange = (value) => {
    setEquipmentPrint(value);
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  //   summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${   API.prodUrl}/Precot/api/chemicaltest/CLF007/getAll`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "ROLE_CHEMIST" ||
        role === "QA_MANAGER" ||
        role === "QC_MANAGER" ||
        role === "CHEMIST_DESIGNEE"
      ) {
        setCakingData(data);
      }

      if (data && data.length >= 0) {
        setGlasswareBreakage(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            eq_id_no: item.eq_id_no,
            chemist_status: item.chemist_status,
            qc_status: item.qc_status,
            id: item.id,
            sno: index + 1,
            reason: item.reason,
          }))
        );
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      message.error(error.data.message);
    } finally {
    }
  };

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "formatDate",
      align: "center",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      title: "Equipment Name",
      dataIndex: "eq_id_no",
      key: "eq_id_no",
      align: "center",
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "QC Manager / QA Manager Status",
      dataIndex: "qc_status",
      key: "qc_status",
      align: "center",
    },
    {
      title: "Actions",
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

  const printSubmit = () => {
    if (
      (monthPrint == "" || monthPrint == null) &&
      (yearPrint == "" || yearPrint == null) &&
      (datePrint == "" || datePrint == null) &&
      (equipmentPrint == "" || equipmentPrint == null)
    ) {
      message.warning("Please Select Maditory Fields");
      return;
    }
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 2000);
    }
  }, [printResponseData]);
  const fetchPrintValue = () => {
    let monthP;
    let YearP;
    let dateP;
    let equipmentP;
    if (monthPrint == null) {
      monthP = "";
    } else {
      monthP = monthPrint;
    }
    if (yearPrint == null) {
      YearP = "";
    } else {
      YearP = yearPrint;
    }
    if (datePrint == null) {
      dateP = "";
    } else {
      dateP = datePrint;
    }
    if (equipmentPrint == null) {
      equipmentP = "";
    } else {
      equipmentP = equipmentPrint;
    }
    try {
      axios
        .get(
          `${   API.prodUrl}/Precot/api/chemicaltest/CLF007/print?year=${YearP}&month=${monthP}&eq_no=${equipmentP}&date=${dateP}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
          } else {
            message.error("No Data");
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };
  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    if (equipment == "" || equipment == null) {
      message.warning("Please Select Equipment Name");
      return;
    }
    navigate("/Precot/QC/F-07", {
      state: {
        date: date,
        equipment: equipment,
      },
    });
  };
  return (
    // print section
    <div>
      <div id="section-to-print">
        {printResponseData?.map((detail, index) => (
          <table style={{ marginTop: "10px", scale: "94%" }} key={index}>
            <br />
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="15" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="70" rowSpan="4" style={{ textAlign: "center" }}>
                  WEIGHING SCALE CALIBRATION REPORT{" "}
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-QCL01/F-007 </td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-QCL01-D-04</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15">
                  {index + 1} of {printResponseData?.length}
                </td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td colSpan="35">
                  <b>Frequency:</b>
                  {detail.frequency}
                </td>
                <td colSpan="40">
                  <b>EQ. ID. No:</b>
                  {detail.eq_id_no}
                </td>
                <td colSpan="40">
                  <b>Month & Year:</b>
                  {detail.month}/{detail.year}
                </td>
              </tr>
              <tr>
                <td colSpan="35">
                  <b>Balance Max. Weight:</b>
                  {detail.balancemaxweight}
                </td>
                <td colSpan="40">
                  <b>Balance Min.Weight:</b>
                  {detail.balanceminweight}
                </td>
                <td colSpan="40">
                  <b>Tolerance:</b>
                  {detail.tolerance}
                </td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                  <b>S.No.</b>
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <b>Standard Weights in g/Kg </b>
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {detail.text}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {detail.number}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {detail.number_b}
                </td>
                <td colSpan="15" rowSpan="2" style={{ textAlign: "center" }}>
                  Remark{" "}
                </td>
                <td colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                  Status{" "}
                </td>
                <td colSpan="15" rowSpan="2" style={{ textAlign: "center" }}>
                  Calibrated By{" "}
                </td>
                <td colSpan="15" rowSpan="2" style={{ textAlign: "center" }}>
                  Verified By{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <b>Date </b>
                </td>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  Observed readings{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center", height: "20px" }}>
                  1
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {formattedDate(detail.date)}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {detail.obser?.[0]?.test_lov}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {detail.obser?.[0]?.number_a}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {detail.obser?.[0]?.number_b}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {detail.obser?.[0]?.remark}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {" "}
                  {detail.obser?.[0]?.status === "Y"
                    ? "OK"
                    : detail.obser?.[0]?.status === "N"
                    ? "NOT OK"
                    : "NA"}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {getImage2[index] && (
                    <img
                      src={getImage2[index]}
                      alt={`QA Manager Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <br />
                  {detail.chemist_sign}
                  <br />
                  {formattedDatewithTime(detail.chemist_submit_on)}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
                      alt={`QA Manager Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <br />
                  {detail.qc_sign}
                  <br />
                  {formattedDatewithTime(detail.qc_submit_on)}
                </td>
              </tr>

              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              {/* <tr>
              <th colSpan="25"  style={{ textAlign: 'center' }}>EQ. ID No.</th>
              <th colSpan="15"  style={{ textAlign: 'center' }}>Balance Max. Weight:</th>
              <th colSpan="15"  style={{ textAlign: 'center' }}>Balance Min.Weight:</th>
              <th colSpan="15"  style={{ textAlign: 'center' }}>Tolerance:</th>
              <th colSpan="15"  style={{ textAlign: 'center' }}>STD WT1</th>
              <th colSpan="15"  style={{ textAlign: 'center' }}>STD WT2</th>
              <th colSpan="15"  style={{ textAlign: 'center' }}>STD WT3</th>
 </tr>
 <tr>
              <td colSpan="25"  style={{ textAlign: 'center' }}>PH-WM-02 </td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>220gm</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.001g</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.0003</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>100</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>50</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>1</td>
 </tr>
 <tr>
              <td colSpan="25"  style={{ textAlign: 'center' }}>PH-WM-03</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>820gm</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.01g</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.06</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>200</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>100</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>1</td>
 </tr>
 <tr>
              <td colSpan="25"  style={{ textAlign: 'center' }}>PH-WM-05</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>300gm</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.005g</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.03</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>200</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>100</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>1</td>
 </tr>
 <tr>
              <td colSpan="25"  style={{ textAlign: 'center' }}>PH-WM-06</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>220gm</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.001g</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.0003</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>200</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>100</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>1</td>
 </tr>
 <tr>
              <td colSpan="25"  style={{ textAlign: 'center' }}>PH-WM-26</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>220gm</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.001g</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>0.0003</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>100</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>50</td>
              <td colSpan="15"  style={{ textAlign: 'center' }}>1</td>
 </tr> */}
            </tbody>

            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="25">Particulars</th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="25">Name</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
              <tr>
                <th colSpan="25">Signature & Date</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
            </tfoot>
          </table>
        ))}
        {/* </div> */}
      </div>

      {/* HEADER */}

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="WEIGHING SCALE CALIBRATION REPORT "
          formatNo="PH-QCL01/F-007"
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
                confirm("Are you sure want to Logout") == true
                  ? navigate("/Precot")
                  : null;
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

        {/* Go To Row */}

        <Row
          align="middle"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "10px",
            justifyContent: "left",
            marginLeft: "10px",
          }}
        >
          <Col>
            <label>Date :</label>
          </Col>
          <Col>
            <Input
              onChange={handleDateChange}
              type="date"
              value={date}
              max={formattedToday}
              size="small"
              style={{ width: "100%", height: "30px" }}
            />
          </Col>
          <Col>
            <label>Equipment :</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={equipment}
              onChange={handleEquipmentChange}
              style={{ width: "100%" }}
              placeholder="Search Equipment"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Equipment
              </Select.Option>
              {equipmentNoLov.map((option) => (
                <Select.Option key={option.eqid} value={option.eqid}>
                  {option.eqid}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col>
            <Button
              key="go"
              onClick={goTo}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                width: "100%",
              }}
              shape="round"
              icon={<BiNavigation color="#00308F" />}
              type="primary"
            >
              Go to
            </Button>
          </Col>
        </Row>
      </div>
      {/* Table...Summary */}
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={GlasswareBreakage}
        />
      </div>

      {/* SUMMARY PRINT */}
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
          >
            Submit
          </Button>,
        ]}
      >
        {" "}
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
            onChange={handlePrintDateChange}
            max={formattedToday}
            type="date"
            value={datePrint}
            size="small"
            style={{ width: "100%", height: "30px" }}
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
            Month:
          </label>
          <Select
            showSearch
            value={monthPrint}
            onChange={handleMonthPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Month"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Month
            </Select.Option>
            {monthsLov.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Year:
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={handleYearPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Year
            </Select.Option>
            {yearOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Equipment Name:
          </label>
          <Select
            showSearch
            value={equipmentPrint}
            onChange={handleEquipmentPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Equipment"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Equipment
            </Select.Option>
            {equipmentNoLov.map((option) => (
              <Select.Option key={option.eqid} value={option.eqid}>
                {option.eqid}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QC_f07_Summary;
