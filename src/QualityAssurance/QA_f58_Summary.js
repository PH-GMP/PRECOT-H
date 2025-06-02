/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { PrintPageOrientation } from "../General/PrintPageOrientation.js";

const QA_f58_Summary = () => {
  PrintPageOrientation({ orientation: "landscape", scale: 0.9 });
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const [eqId, setEqId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [yearPrint, setYearPrint] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [EQIDPrint, setEQIDPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [equipmentIdOpeions, setEquipmentIdOptions] = useState([]);
  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2080);

  const disabledGoto = role == "ROLE_SUPERVISOR" || role == "ROLE_QA";

  const monthOptions = [
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

  useEffect(() => {
    const departmentId = localStorage.getItem("departmentId");

    switch (departmentId) {
      case "1":
        setDepartment("BLEACHING");
        break;
      case "2":
        setDepartment("SPUNLACE");
        break;
      case "3":
        setDepartment("PAD_PUNCHING");
        break;
      case "4":
        setDepartment("DRY_GOODS");
        break;
      case "5":
        setDepartment("QUALITY_CONTROL");
        break;
      case "6":
        setDepartment("QUALITY_ASSURANCE");
        break;
      case "7":
        setDepartment("PPC");
        break;
      case "8":
        setDepartment("STORE");
        break;
      case "9":
        setDepartment("DISPATCH");
        break;
      case "10":
        setDepartment("PRODUCT_DEVELOPMENT");
        break;
      case "11":
        setDepartment("ENGINEERING");
        break;
      case "12":
        setDepartment("COTTON_BUDS");
        break;
      default:
        setDepartment("");
        break;
    }
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (
          data.supervisor_status === "SUPERVISOR_REJECTED" ||
          data.qa_inspector_status === "QA_INSPECTOR_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
        headers,
      })
      .then((response) => {
        setDepartmentOptions(response.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${API.prodUrl}/Precot/api/QA/Service/getEquipmentId`, { headers })
      .then((response) => {
        const allowedValues = new Set([
          "PH-E/I-LAB01",
          "PH-E/I-LAB02",
          "PH-E/I-LAB03",
        ]);

        // Filter and remove duplicates based on 'value'
        const filteredOptions = Array.from(
          new Map(
            response.data
              .filter((item) => allowedValues.has(item.value))
              .map((item) => [item.value, item]) // Ensure unique by 'value'
          ).values()
        );

        setEquipmentIdOptions(filteredOptions);
      })
      .catch(() => {});
  }, []);
  //   Formatted Date's
  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };

  //   Signature Images's
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.operator_sign;
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
            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {});
      }
    });
  }, [printResponseData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.supervisor_sign;
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
            setGetImage2((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {});
      }
    });
  }, [printResponseData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.qa_inspector_sign;
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
            setGetImage3((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {});
      }
    });
  }, [printResponseData, API.prodUrl, token]);

  // Print Module
  const handlePrint = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
    setMonthPrint(null);
    setDatePrint(null);
    setEQIDPrint(null);
  };

  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 300);
    }
  }, [printResponseData]);
  const fetchPrintValue = () => {
    let monthP;
    let yearP;
    let equipmentIdP;
    let dateP;
    if (monthPrint == null) {
      monthP = "";
    } else {
      monthP = monthPrint;
    }
    if (yearPrint == null) {
      yearP = "";
    } else {
      yearP = yearPrint;
    }
    if (EQIDPrint == null) {
      equipmentIdP = "";
    } else {
      equipmentIdP = EQIDPrint;
    }
    if (datePrint == null) {
      dateP = "";
    } else {
      dateP = datePrint;
    }
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/MetalDetectorPrint?month=${monthP}&year=${yearP}&date=${dateP}&eq_id=${equipmentIdP}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length != 0) {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
          } else {
            message.error("No Data");
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  //   handle edit
  const handleEdit = (record) => {
    const { metal_id } = record;
    const { department } = record;
    const { eq_id } = record;
    const { date } = record;
    navigate("/Precot/QA/F-58", {
      state: {
        id: metal_id,
        department: department,
        eqId: eq_id,
        date: date,
      },
    });
  };
  //   summary table
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    const departmentId = localStorage.getItem("departmentId");
    let department;
    if (departmentId == 1) {
      department = "BLEACHING";
    } else if (departmentId == 2) {
      department = "SPUNLACE";
    } else if (departmentId == 3) {
      department = "PAD_PUNCHING";
    } else if (departmentId == 4) {
      department = "DRY_GOODS";
    } else if (departmentId == 5) {
      department = "QUALITY_CONTROL";
    } else if (departmentId == 6) {
      department = "QUALITY_ASSURANCE";
    } else if (departmentId == 7) {
      department = "PPC";
    } else if (departmentId == 8) {
      department = "STORE";
    } else if (departmentId == 9) {
      department = "DISPATCH";
    } else if (departmentId == 10) {
      department = "PRODUCT_DEVELOPMENT";
    } else if (departmentId == 11) {
      department = "ENGINEERING";
    } else if (departmentId == 12) {
      department = "COTTON_BUDS";
    } else {
      department = "";
    }
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl;
      if (
        role === "ROLE_QA" ||
        role == "ROLE_MR" ||
        role == "QA_MANAGER"
      ) {
        apiUrl = `${API.prodUrl}/Precot/api/QA/Service/MetalDetectorSummary`;
      } else if (role === "ROLE_SUPERVISOR" || role === "ROLE_OPERATOR") {
        apiUrl = `${API.prodUrl}/Precot/api/QA/Service/MetalDetectorSummary?department=${department}`;
      } else {
        throw new Error("Role not found in localStorage.");
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "ROLE_QA" ||
        role === "ROLE_OPERATOR" ||
        role === "ROLE_SUPERVISOR"
      ) {
        setCakingData(data);
      }
      if (data && data.length >= 0) {
        setTableData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            eq_id: item.eq_id,
            department: item.department,
            operator_status: item.operator_status,
            supervisor_status: item.supervisor_status,
            qa_inspector_status: item.qa_inspector_status,
            metal_id: item.metal_id,
            sno: index + 1,
            reason: item.reason,
          }))
        );
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      message.error(error.message);
    } finally {
    }
  };

  // Table Details
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
      key: "date",
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "Equipment Id",
      dataIndex: "eq_id",
      key: "eq_id",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      align: "center",
    },
    {
      title: "Production Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "QA Inspector Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
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
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }

  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    if (department == "" || department == null) {
      message.warning("Please Select Department");
      return;
    }
    if (eqId == "" || eqId == null) {
      message.warning("Please Select Equipment Id");
      return;
    }
    navigate("/Precot/QA/F-58", {
      state: {
        date: date,
        department: department,
        eqId: eqId,
        id: "null",
      },
    });
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {printResponseData?.map((data, index) => (
          <table style={{ marginTop: "10px", scale: "94%" }}>
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
                  METAL DETECTOR CALIBRATION RECORD
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-QAD01-F-058</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-QAD01-D-44</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15">
                  {index + 1} of {printResponseData.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td colSpan="55">
                  <b>Department Name:{data.department} </b>
                </td>
                <td colSpan="60">
                  <b>EQ. ID. No.: {data.eq_id}</b>
                </td>
              </tr>
              <tr>
                <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                  Date
                </th>
                <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                  Time
                </th>
                <th colSpan="15" rowSpan="2" style={{ textAlign: "center" }}>
                  Product Name / Code
                </th>
                <th colSpan="45" style={{ textAlign: "center" }}>
                  Position
                </th>
                <th colSpan="15" rowSpan="2" style={{ textAlign: "center" }}>
                  Operators Signature
                </th>
                <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                  Corrective Action, If failed in Calibration
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Sign & Date
                </th>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  1
                </th>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  2
                </th>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  3
                </th>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  4
                </th>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  5
                </th>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  6
                </th>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  7
                </th>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  8
                </th>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  9
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Production Supervisor
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  QA Inspector
                </th>
              </tr>
              {data.details?.map((row, index) => (
                <tr key={index}>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {formattedDate(row.date)}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.time}
                  </td>
                  <td colSpan="15" style={{ textAlign: "center" }}>
                    {row.product_name}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.position1 === "Y"
                      ? "Yes"
                      : row.position1 === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.position2 === "Y"
                      ? "Yes"
                      : row.position2 === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.position3 === "Y"
                      ? "Yes"
                      : row.position3 === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.position4 === "Y"
                      ? "Yes"
                      : row.position4 === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.position5 === "Y"
                      ? "Yes"
                      : row.position5 === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.position6 === "Y"
                      ? "Yes"
                      : row.position6 === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.position7 === "Y"
                      ? "Yes"
                      : row.position7 === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.position8 === "Y"
                      ? "Yes"
                      : row.position8 === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {row.position9 === "Y"
                      ? "Yes"
                      : row.position9 === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="15" style={{ textAlign: "center" }}>
                    {" "}
                    {getImage1[index] && (
                      <img
                        src={getImage1[index]}
                        alt={`Operator Sign ${index + 1}`}
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
                    {data.operator_sign}
                    <br />
                    {formattedDateWithTime(data.operator_submitted_on)}
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {row.corrective_action}
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {getImage2[index] && (
                      <img
                        src={getImage2[index]}
                        alt={`Supervisor Sign ${index + 1}`}
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
                    {data.supervisor_sign}
                    <br />
                    {formattedDateWithTime(data.supervisor_submit_on)}
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {getImage3[index] && (
                      <img
                        src={getImage3[index]}
                        alt={`QA Inspector Sign ${index + 1}`}
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
                    {data.qa_inspector_sign}
                    <br />
                    {formattedDateWithTime(data.qa_inspector_submitted_on)}
                  </td>
                </tr>
              ))}
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
          formName="METAL DETECTOR CALIBRATION RECORD"
          formatNo="PH-QAD01-F-058"
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
            <label style={{ display: disabledGoto ? "none" : "block" }}>
              Date :
            </label>
          </Col>
          <Col>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={formattedToday}
              size="small"
              style={{
                width: "100%",
                height: "30px",
                display: disabledGoto ? "none" : "block",
              }}
            />
          </Col>
          <Col>
            <label style={{ display: disabledGoto ? "none" : "block" }}>
              Department :
            </label>
          </Col>
          <Col>
            <Input
              type="text"
              value={department}
              size="small"
              style={{
                width: "100%",
                height: "30px",
                display: disabledGoto ? "none" : "block",
              }}
            />
          </Col>
          <Col>
            <label style={{ display: disabledGoto ? "none" : "block" }}>
              Equipment Id :
            </label>
          </Col>
          <Col>
            <Select
              showSearch
              value={eqId}
              onChange={(value) => setEqId(value)}
              style={{
                width: "100%",
                display: disabledGoto ? "none" : "block",
              }}
              placeholder="Search Your Equipment Id"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Equipment Id
              </Select.Option>
              {equipmentIdOpeions.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
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
                display: disabledGoto ? "none" : "block",
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
          dataSource={tableData}
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
            Year:
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={(value) => setYearPrint(value)}
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
            Month:
          </label>
          <Select
            showSearch
            value={monthPrint}
            onChange={(value) => setMonthPrint(value)}
            style={{ width: "100%" }}
            placeholder="Search Month"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Month
            </Select.Option>
            {monthOptions.map((option) => (
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
            Date :
          </label>
          <Input
            onChange={(e) => setDatePrint(e.target.value)}
            type="date"
            value={datePrint}
            max={formattedToday}
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
            Equipment Id:
          </label>
          <Select
            showSearch
            value={EQIDPrint}
            onChange={(value) => setEQIDPrint(value)}
            style={{ width: "100%" }}
            placeholder="Search EQ.ID"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select EQ.ID
            </Select.Option>
            {equipmentIdOpeions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QA_f58_Summary;
