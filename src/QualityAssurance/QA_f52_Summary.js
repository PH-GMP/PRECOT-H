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
import {
  BiEdit,
  BiLock,
  BiNavigation,
  BiSolidAddToQueue,
} from "react-icons/bi";
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

const QA_f52_Summary = () => {
  PrintPageOrientation({ orientation: "portrait", scale: 0.9 });
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // print
  const [yearPrint, setYearPrint] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [reportNOPrint, setReportNoPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  // goto
  const [reportNO, setReportNO] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [allReportNo, setAllReportNo] = useState([]);
  const [ApprovedReportNo, setApprovedReportNo] = useState([]);

  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  // On Change Functions

  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };
  const handleMonthPrintChange = (value) => {
    setMonthPrint(value);
  };
  const handleDepartmentChange = (value) => {
    setDepartment(value);
  };
  const handleReportNoPrintChange = (value) => {
    setReportNoPrint(value);
  };
  const handleDatePrintChange = (event) => {
    const value = event.target.value;
    setDatePrint(value);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

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
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (
          data.manager_status === "MANAGER_REJECTED" ||
          data.hod_status === "HOD_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);
  // Lov's

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2080);
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
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${ API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
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
      .get(`${ API.prodUrl}/Precot/api/QA/Service/BreakageReportgetAllSeqNo`, {
        headers,
      })
      .then((response) => {
        setAllReportNo(response.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${ API.prodUrl}/Precot/api/QA/Service/BreakageReportgetApproveSeqNo`, {
        headers,
      })
      .then((response) => {
        setApprovedReportNo(response.data);
      })
      .catch(() => {});
  }, []);

  // auto generate number
  const Nogeneration = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
         API.prodUrl
        }/Precot/api/qa/number/generation?formNumber=${"PH-QAD01-F-052"}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReportNO(response.data);
      navigate("/Precot/QA/F-52", {
        state: {
          reportNo: response.data,
          department: department,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   Signature Images's
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.qa_inspector_sign;
      if (username) {
        

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
            
          });
      }
    });
  }, [printResponseData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.hod_sign;
      if (username) {
        

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
            
          });
      }
    });
  }, [printResponseData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.manager_sign;
      if (username) {
        

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
          .catch((err) => {
            
          });
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
    setReportNoPrint(null);
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
    let reportNoP;
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
    if (reportNOPrint == null) {
      reportNoP = "";
    } else {
      reportNoP = reportNOPrint;
    }
    if (datePrint == null) {
      dateP = "";
    } else {
      dateP = datePrint;
    }
    try {
      axios
        .get(
          `${ API.prodUrl}/Precot/api/QA/Service/BreakageReportPrint?month=${monthP}&year=${yearP}&reportNo=${reportNoP}&date=${dateP}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length !== 0) {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
          } else {
            message.error("No Date");
          }
        })
        .catch((err) => {
          
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  //   handle edit
  const handleEdit = (record) => {
    const { rep_seq_no } = record;
    const { department } = record;
    navigate("/Precot/QA/F-52", {
      state: {
        reportNo: rep_seq_no,
        department: department,
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
        role === "QA_MANAGER" ||
        role === "ROLE_QA" ||
        (role === "ROLE_DESIGNEE" && departmentId == 6)
      ) {
        apiUrl = `${ API.prodUrl}/Precot/api/QA/Service/BreakageReportsummary`;
      } else if (
        role === "ROLE_HOD" ||
        (role === "ROLE_DESIGNEE" && departmentId != 6)
      ) {
        apiUrl = `${ API.prodUrl}/Precot/api/QA/Service/BreakageReportGetHodummary?department=${department}`;
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
        role === "QA_MANAGER" ||
        role === "ROLE_HOD" ||
        role == "ROLE_DESIGNEE"
      ) {
        setCakingData(data);
      }
      if (data && data.length >= 0) {
        setTableData(
          data.map((item, index) => ({
            key: item.header_id,
            department: item.department,
            rep_seq_no: item.rep_seq_no,
            qa_inspector_status: item.qa_inspector_status,
            hod_status:
              item.hod_status === "HOD_APPROVED"
                ? "HOD / DESIGNEE APPROVED"
                : item.hod_status,
            manager_status: item.manager_status,
            id: item.id,
            reason: item.reason,
            sno: index + 1,
          }))
        );
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("No Access to this Form");
      setTimeout(() => {
        navigate("/Precot/choosenScreen");
      }, 1500);
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
      title: "Report Number",
      dataIndex: "rep_seq_no",
      key: "rep_seq_no",
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
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      align: "center",
    },
    {
      title: "HOD/ Designee Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "QA Manager/Designee Status",
      dataIndex: "manager_status",
      key: "manager_status",
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
            //   disabled={record.status == "SUBMIT" ? true : false}
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

  //   goto button
  const goTo = () => {
    if (reportNO == "" || reportNO == null) {
      message.warning("Report Number Empty!!");
      return;
    }
    if (department == "" || department == null) {
      message.warning("Please Select Department");
      return;
    }
    navigate("/Precot/QA/F-52", {
      state: {
        reportNo: reportNO,
        department: department,
      },
    });
  };

  const CreateNo = () => {
    if (department == "" || department == null) {
      message.warning("Please Select Department For New Report Number");
      return;
    } else {
      Nogeneration();
    }
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {printResponseData?.map((data, index) => (
          <table
            style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
          >
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
                  BREAKAGE REPORT <br />
                  (GLASS / HARD PLASTIC / WOOD / CERAMIC)
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-QAD01-F-052</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-QAD01-D-47</td>
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
                <td colSpan="55">Report No.: {data.rep_seq_no}</td>
                <td colSpan="30">Date:{formattedDate(data.date) || "NA"} </td>
                <td colSpan="30">Time: {data.time || "NA"}</td>
              </tr>
              <tr>
                <td colSpan="55">Type of Material: </td>
                <td colSpan="60">{data.type_of_material || "NA"}</td>
              </tr>
              <tr>
                <td colSpan="55">
                  Note : Reference Documents – Control of Glass / Hard
                  <br /> Plastic / Wood / Ceramics{" "}
                </td>
                <td colSpan="60">Department:{data.department || "NA"} </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <th
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  A. Incident Details –
                </th>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (i) Incident Reported on:
                  {formattedDateWithTime(data.inc_rep_on) || "NA"}{" "}
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (ii) Item: {data.item || "NA"}{" "}
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (iii) Identification No.: {data.identification || "NA"}
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (iv) Location: {data.location || "NA"}{" "}
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (v) Reason: {data.incident_reason || "NA"}
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (vi) Whether the same was protected or not:{" "}
                  {data.same_portal === "Y"
                    ? "Yes"
                    : data.same_portal === "N"
                    ? "No"
                    : "NA"}{" "}
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (vii) How much area was affected due to shattering of broken
                  pieces: {data.area || "NA"}
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (viii) Whether there was any material lying nearby:
                  {data.any_meterial === "Y"
                    ? "Yes"
                    : data.any_meterial === "N"
                    ? "No"
                    : "NA"}{" "}
                  <br /> (If Yes, identify the material with proper labeling,
                  store it separately and take action as per above mentioned
                  procedure)
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (ix) Immediately communicated to (Name / Department):{" "}
                  {data.communicate_to || "NA"}{" "}
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <td
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  (x) Incident Reported by: {data.reported_by || "NA"}
                </td>
              </tr>
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <th
                  style={{ borderBottom: "none", borderTop: "none" }}
                  colSpan="115"
                >
                  B. Disposition Action-{" "}
                </th>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  S. No.
                </th>
                <th colSpan="50" style={{ textAlign: "center" }}>
                  Check Points
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Action Status
                  <br />
                  (by Dept. In-charge)
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Verification(by QA)
                </th>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  i
                </th>
                <th colSpan="50">
                  Whether all the broken parts are properly collected from the
                  area or machine?
                </th>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_one_status === "Y"
                    ? "Yes"
                    : data.dep_actn_one_status === "N"
                    ? "No"
                    : "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_one_verifi_status || "NA"}
                  <br />
                  {formattedDate(data.dep_actn_one_verifi_date) || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  ii
                </th>
                <th colSpan="50">
                  Whether all the area / machine is cleaned properly?{" "}
                </th>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_two_status === "Y"
                    ? "Yes"
                    : data.dep_actn_two_status === "N"
                    ? "No"
                    : "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_two_verifi_status || "NA"}
                  <br />
                  {formattedDate(data.dep_actn_two_verifi_date) || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  iii
                </th>
                <th colSpan="50">
                  Whether affected material is removed from the work place?
                </th>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_therr_status === "Y"
                    ? "Yes"
                    : data.dep_actn_therr_status === "N"
                    ? "No"
                    : "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_three_verifi_status || "NA"}
                  <br />
                  {formattedDate(data.dep_actn_three_verifi_date) || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  iv
                </th>
                <th colSpan="50">
                  Whether all the material is inspected properly and found free
                  from contamination?
                </th>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_four_status === "Y"
                    ? "Yes"
                    : data.dep_actn_four_status === "N"
                    ? "No"
                    : "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_four_verifi_status || "NA"}
                  <br />
                  {formattedDate(data.dep_actn_four_verifi_date) || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  v
                </th>
                <th colSpan="50">
                  Whether all the broken parts and contaminated material is
                  disposed off properly?
                </th>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_five_status === "Y"
                    ? "Yes"
                    : data.dep_actn_five_status === "N"
                    ? "No"
                    : "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_five_verifi_status || "NA"}
                  <br />
                  {formattedDate(data.dep_actn_five_verifi_date) || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  vi
                </th>
                <th colSpan="50">
                  Whether all the activity is monitored by the departmental
                  supervisor and QA Inspector both?
                </th>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_six_status === "Y"
                    ? "Yes"
                    : data.dep_actn_six_status === "N"
                    ? "No"
                    : "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.dep_actn_six_verifi_status || "NA"}
                  <br />
                  {formattedDate(data.dep_actn_six_verifi_date) || "NA"}
                </td>
              </tr>
              <br />
              <br />
              <br />
              <br />
              <tr style={{ borderBottom: "none", borderTop: "none" }}>
                <th
                  style={{
                    borderBottom: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                  colSpan="115"
                >
                  C. Corrective / Preventive Action –{" "}
                </th>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  S. No.
                </th>
                <th colSpan="50" style={{ textAlign: "center" }}>
                  Actions
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Responsibility / Target Date
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Status
                </th>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  i
                </th>
                <th colSpan="50">
                  Can the broken glass / hard plastic be replaced with other
                  alternate material, to reduce number of glasses? If Yes.{" "}
                </th>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.cor_prev_actn_one_name || "NA"}
                  <br />
                  {formattedDate(data.cor_prev_actn_one_date) || "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.cor_prev_actn_one_verifi_status === "Y"
                    ? "Yes"
                    : data.cor_prev_actn_one_verifi_status === "N"
                    ? "No"
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  ii
                </th>
                <th colSpan="50">
                  Whether the broken glass / hard plastic is replaced?
                </th>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.cor_prev_actn_two_name || "NA"}
                  <br />
                  {formattedDate(data.cor_prev_actn_two_date) || "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.cor_prev_actn_two_verifi_status === "Y"
                    ? "Yes"
                    : data.cor_prev_actn_two_verifi_status === "N"
                    ? "No"
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  iii
                </th>
                <th colSpan="50">
                  Whether all the concerned personnel are trained properly? If
                  No -
                </th>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.cor_prev_actn_three_name || "NA"}
                  <br />
                  {formattedDate(data.cor_prev_actn_three_date) || "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {data.cor_prev_actn_two_three_status === "Y"
                    ? "Yes"
                    : data.cor_prev_actn_two_three_status === "N"
                    ? "No"
                    : "NA"}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="115"
                  style={{ height: "40px", verticalAlign: "top" }}
                >
                  Remarks:{data.remarks || "NA"} <br />
                </td>
              </tr>
              <tr>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  <b>Prepared by</b>
                </th>
                <th colSpan="40" style={{ textAlign: "center" }}>
                  <b>Reviewed By</b>
                </th>
                <th colSpan="40" style={{ textAlign: "center" }}>
                  <b>Approved by </b>
                </th>
              </tr>
              <tr>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
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
                  {printResponseData?.[index]?.qa_inspector_sign || ""}
                  <br />
                  {formattedDateWithTime(
                    printResponseData?.[index]?.qa_inspector_submitted_on
                  )}
                </td>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  {getImage2[index] && (
                    <img
                      src={getImage2[index]}
                      alt={`HOD/Designee Sign ${index + 1}`}
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
                  {printResponseData?.[index]?.hod_sign || ""}
                  <br />
                  {formattedDateWithTime(
                    printResponseData?.[index]?.hod_submitted_on
                  )}
                </td>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  {getImage3[index] && (
                    <img
                      src={getImage3[index]}
                      alt={`QA Manager/ Designee Sign ${index + 1}`}
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
                  {printResponseData?.[index]?.manager_sign || ""}
                  <br />
                  {formattedDateWithTime(
                    printResponseData?.[index]?.manager_submitted_on
                  )}
                </td>
              </tr>
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
          formName="Breakage Report (GLASS / HARD PLASTIC / WOOD / CERAMIC)"
          formatNo="PH-QAD01-F-052"
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
            <label>Report No:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={reportNO}
              onChange={(value) => setReportNO(value)}
              style={{ width: "100%" }}
              placeholder="Search Your Report Number"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Report Number
              </Select.Option>
              {allReportNo.map((option) => (
                <Select.Option
                  key={option.REP_SEQ_NO}
                  value={option.REP_SEQ_NO}
                >
                  {option.REP_SEQ_NO}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <label>Department:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={department}
              onChange={handleDepartmentChange}
              style={{ width: "100%" }}
              placeholder="Search Your Department"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Department
              </Select.Option>
              {departmentOptions.map((option) => (
                <Select.Option key={option.id} value={option.department}>
                  {option.department}
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
          <Col>
            <Button
              key="go"
              onClick={CreateNo}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                width: "100%",
              }}
              shape="round"
              icon={<BiSolidAddToQueue color="#00308F" />}
              type="primary"
            >
              Create
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
            Date:
          </label>
          <Input
            onChange={handleDatePrintChange}
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
            Report No:
          </label>
          <Select
            showSearch
            value={reportNOPrint}
            onChange={handleReportNoPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Report Number"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Report Number
            </Select.Option>
            {ApprovedReportNo.map((option) => (
              <Select.Option key={option.REP_SEQ_NO} value={option.REP_SEQ_NO}>
                {option.REP_SEQ_NO}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QA_f52_Summary;
