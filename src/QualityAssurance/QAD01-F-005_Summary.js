/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const { Option } = Select;

const roleBase = localStorage.getItem("role");
const QAD01_005 = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      // transform-origin: top right; /* Adjust the origin if needed */
      // transform-origin: bottom top ;
      transform-origin: bottom top;
      // transform-origin: top left;

    }
  }
`;

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [opsignprint, setopsignprint] = useState("");
  const [modalData, setModalData] = useState(null);
  const [modaldata, setmodalData] = useState("");
  const [supsignprint, setsupsignprint] = useState("");
  const [hodsignprint, sethodsignprint] = useState("");
  const [date1, setdate1] = useState([]);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [cakingData, setCakingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [shift, setShift] = useState(null);
  const initial = useRef(false);
  const [printDate, setPrintDate] = useState("");
  const [printShift, setPrintShift] = useState("");
  const [gotobtn, setGotobtn] = useState(true);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [dateformat_supervisor, setdateformat_supervisor] = useState("");
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [dateformat_op, setdateformat_op] = useState("");
  const [getImage, setGetImage] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, index) => currentYear + index);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => { });
    }
  }, [printResponseData, API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.hod_sign;
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
          setGetImage1(url);
        })
        .catch((err) => { });
    }
  }, [printResponseData, API.prodUrl]);

  const formattedDate = printResponseData?.date
    ? new Date(printResponseData.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "";
  const formattedDateHod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const entriesPerPage = 8;
  const chunkedSanitizationList = [];
  if (
    printResponseData &&
    printResponseData &&
    printResponseData.sanitizationList
  ) {
    for (
      let i = 0;
      i < printResponseData.sanitizationList.length;
      i += entriesPerPage
    ) {
      chunkedSanitizationList.push(
        printResponseData.sanitizationList.slice(i, i + entriesPerPage)
      );
    }
  } else {
    console.warn(
      "printResponseData or sanitizationList is undefined or empty."
    );
  }

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [showModal, setShowModal] = useState(false);
  let formattedSupervisorDate;

  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    departmentsObject()
  }, [])

  const departmentsObject = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        console.log("first")
        const departmentMap = Object.fromEntries(
          response.data.map(dept => [dept.id, dept.department])
        );
        console.log("departmentMap", departmentMap)
        fetchData_dep_by_id(departmentMap);
        setDepartments(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of filteredData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [filteredData]);

  const printDateSubmit = () => {
    setSelectedYear(null);
    window.print();
    setShowModal(false);
  };

  const fetchData_dep_by_id = async (departmentMap) => {
    const storedIds = localStorage.getItem("departmentId");
    const DepartmentName = storedIds
      ?.split(",")
      .map((id) => departmentMap[parseInt(id)])
      .filter(Boolean)
      .join(",");

    const SUMMARY_ACCESS = DepartmentName?.includes("QUALITY_ASSURANCE");
    console.log("const SUMMARY_ACCESS = DepartmentName?.includes(QUALITY_ASSURANCE);")
    console.log("SUMMARY_ACCESS", SUMMARY_ACCESS)
    if (
      (roleBase === "ROLE_HOD" && !SUMMARY_ACCESS) ||
      (roleBase === "ROLE_DESIGNEE" && !SUMMARY_ACCESS)
    ) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/TrainingNeedIdentificationForm/HodSummary?department=${DepartmentName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          response.data &&
          (response.data.length > 0 || response.data.length === undefined)
        ) {
          setmodalData(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          message.warning("You do not have permission to access this form.");
          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 1500);
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    } else if (
      (roleBase === "QA_MANAGER" && SUMMARY_ACCESS) ||
      (roleBase === "ROLE_DESIGNEE" && SUMMARY_ACCESS)
    ) {
      console.log("(roleBase === QA_MANAGER && SUMMARY_ACCESS) ||  (roleBase === ROLE_DESIGNEE && SUMMARY_ACCESS)")
      try {
        setLoading(true);
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/TrainingNeedIdentificationForm/QaManagerSummary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If the request is successful, handle the response data
        if (
          response.data &&
          (response.data.length > 0 || response.data.length === undefined)
        ) {
          setmodalData(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          message.warning("You do not have permission to access this form.");
          setTimeout(() => {
            navigate("/Precot/choosenScreen"); // Redirect to the summary page
          }, 1500);
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const handlePrint = () => {
    setShowModal(true);
    setSelectedYear(null);
    setIsFetchSuccessful(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const shifts = res.data.map((shift) => shift.value);
        setShiftOptions(res.data);
      })
      .catch((err) => { });
  }, []);

  const departmentMap = {
    1: "BLEACHING",
    2: "SPUNLACE",
    3: "PAD_PUNCHING",
    4: "DRY_GOODS",
    5: "QUALITY_CONTROL",
    6: "QUALITY_ASSURANCE",
    7: "PPC",
    8: "STORE",
    9: "DISPATCH",
    10: "PRODUCT_DEVELOPMENT",
    11: "ENGINEERING",
    12: "COTTEN_BUDS",
    13: "MARKETING",
    14: "HR",
  };

  const handleGoToChange = () => {
    if (
      selectedYear == "" ||
      selectedYear == null ||
      selectedYear == "Select Year"
    ) {
      message.warning("Please Select Year");
      return;
    }

    if (
      !selectedDepartment
    ) {
      message.warning("Please Select Department");
      return;
    }

    //single department user conditon check
    const storedIds = localStorage.getItem("departmentId");

    let singleDepartmentId = null;

    if (storedIds && !storedIds.includes(",")) {
      singleDepartmentId = storedIds;
    }

    if (singleDepartmentId && selectedDepartment != departmentMap[singleDepartmentId]) {
      message.warning("Please Select Your Current Department");
      return;
    }

    //multiple department user check
    const DepartmentName = storedIds
      ?.split(",")
      .map((id) => departmentMap[parseInt(id)])
      .filter(Boolean)
      .join(",");

    console.log("DepartmentName", DepartmentName);
    console.log("DepartmentName?.includes(selectedDepartment)", DepartmentName?.includes(selectedDepartment))

    // Check if selected department id is in the list
    if (!DepartmentName?.includes(selectedDepartment)) {
      message.warning("Selected department is not in your department list");
      return;
    }

    navigate("/Precot/QualityAssurance/QA_F005", {
      state: {
        department: selectedDepartment,
        years: selectedYear,
      },
    });
  };

  const handleEdit = (record) => {

    navigate("/Precot/QualityAssurance/QA_F005", {
      state: {
        department: record.department,
        years: record.year,
      },
    });

    const x = cakingData.filter((x, i) => {
      return record.formatNo == formatNo;
    });
    setNewStatus(x);
    setModalData(record);
    setNewModal(true);
  };


  const handleYear = (value) => {
    setSelectedYear(value);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handlePrintChange = async (value) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage.");
      message.error("No token found. Please log in again.");
      return;
    }

    // Log the token for debugging purposes

    try {
      setSelectedYear(value);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingNeedIdentificationForm/print?year=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const resData = response.data;

      if (resData) {
        setPrintResponseData(resData);

        const formattedDate = moment(resData[0].date).format("DD/MM/YYYY");
        const dateformathod = moment(resData.hodSubmitOn).format(
          "DD/MM/YYYY HH:mm"
        );
        const dateformatQA = moment(resData.qaManagerSubmitOn).format(
          "DD/MM/YYYY HH:mm"
        );

        setdateformat_op(dateformatQA);
        setdateformat_supervisor(dateformathod);

        setopsignprint(resData.operator_sign);
        setsupsignprint(resData.supervisor_sign);
        sethodsignprint(resData.hod_sign);

        await fetchImages(resData, token); // Ensure images are fetched

        message.success("Data Fetched Successfully");
        setIsFetchSuccessful(false);
        setShowModal(true);
      } else {
        setPrintResponseData([]);

        message.error("No data found...!");
        setIsFetchSuccessful(true);
        setShowModal(false);
      }
    } catch (err) {
      setPrintResponseData([]);

      message.error("No Data Found");
      setIsFetchSuccessful(false);
      setShowModal(false);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchImages = async (printResponseData, token) => {
    printResponseData &&
      printResponseData.forEach((reportData, reportIndex) => {
        const username = reportData?.hodSign;
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
              setGetImageOP((prevImages) => ({
                ...prevImages,
                [reportIndex]: url,
              }));
            })
            .catch((err) => { });
        }

        // Similarly, fetch and set image for supervisor_sign
        const supervisorUsername = reportData?.qaManagerSign;
        if (supervisorUsername) {
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${supervisorUsername}`,
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
              setGetImageSUP((prevImages) => ({
                ...prevImages,
                [reportIndex]: url,
              }));
            })
            .catch((err) => { });
        }
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
  const baseColumns = [
    {
      title: "S.No",
      key: "serial",
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
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "Hod Status",
      dataIndex: "hodStatus",
      key: "hodStatus",
      align: "center",
    },
    {
      title: "QA Manager Status",
      dataIndex: "qaManagerStatus",
      key: "qaManagerStatus",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      render: (text) => (text ? text : "NA"),
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
    render: (text) => (text ? text : "NA"),
  };

  let columns = [...baseColumns];

  // Insert the "Reason" column before the "Action" column if `reason` exists
  if (reason) {
    const actionIndex = columns.findIndex((col) => col.key === "actions");
    columns.splice(actionIndex, 0, Reason);
  }

  let sanitizationList = [];
  if (selectedRow && selectedRow.sanitizationList) {
    sanitizationList = selectedRow.sanitizationList.slice(0, 1);
    while (sanitizationList.length < 1) {
      sanitizationList.push({});
    }
  }

  const formatNo = "PH-PRD02/F-025";

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        <style>
          {`
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
    `}
        </style>
        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid #0000",
            padding: "5px",
            paddingTop: "70px",
            scale: "90%",
          }}
        >
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
            <tr>
              <td colSpan="5" rowspan="4 " style={{ textAlign: "center" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "80px", height: "auto" }}
                />
                <br></br>
                Unit H
              </td>
              <th colSpan="40" rowSpan="4" style={{ textAlign: "center" }}>
                TRAINING NEED IDENTIFICATION FORM
              </th>
              <td colSpan="15">Format No.:</td>
              <td colSpan="40">PH-QAD01/F-005</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No.:</td>
              <td colSpan="40">01</td>
            </tr>
            <td colSpan="15">Ref. SOP No.:</td>
            <td colSpan="40">PH-QAD01-D-15</td>
            <tr>
              <td colSpan="15">Page No.:</td>
              <td colSpan="40">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead>
          <br />
          <tbody>
            {printResponseData &&
              printResponseData.map((reportData, reportIndex) => (
                <React.Fragment key={reportIndex}>
                  <tr>
                    <td colSpan="40" style={{ paddingLeft: "10px" }}>
                      Training Topics for the YEAR : {reportData?.year}
                    </td>

                    <td colSpan="30" style={{ paddingLeft: "10px" }}>
                      Department : {reportData?.department}
                    </td>
                    <td colSpan="30" style={{ paddingLeft: "10px" }}>
                      Date : {moment(reportData?.date).format("DD/MM/YYYY")}
                    </td>
                  </tr>

                  <tr style={{ border: "1px solid black" }}>
                    <th
                      colSpan="2"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      S.No
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Employee Name
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Employee Code
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Category
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Awareness of ISO 9001
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Awareness of ISO 14001
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Awareness of BRCGS
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Awareness of SA8000
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Awareness of GOTS
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Awareness of BSCI
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Awareness of ETI
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Internal Auditors Training
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Good House Keeping (5S) <br />
                      System
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Chemical Handling / Spillage
                      <br /> System
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Waste Management System
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Environment (Water <br /> Conservation, Pollution etc)
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      HACCP
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Good Manufacturing <br />
                      Practices (cGMP)
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Root Cause Analysis & CAPA
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      First Aid
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Fire Safety / Fire Fighting
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Machine Operation & Safety
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Usage of PPEs
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Companies Policies (Hygiene, Jewellery, Glass/Wood,
                      <br />
                      Sharp Tools, Quality, Anti-bribery, <br />
                      Environmental Policy etc)
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Quality, Productivity <br /> & Waste Control
                    </th>
                    <th
                      colSpan="4"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "2px",
                        textAlign: "left",
                      }}
                    >
                      Attitude & Behaviour
                    </th>
                  </tr>
                  {reportData?.details?.length > 0 ? (
                    reportData.details.map((item, index) => (
                      <tr key={index}>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {index + 1}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.employeeName || "NA"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.employeeCode || "NA"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.category || "NA"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.awarnessOfISO9001 || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.awarnessOfISO14001 || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.awarnessOfBRCGS || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.awarnessOfSA8000 || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.awarnessOfGOTS || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.awarnessOfBSCI || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.awarnessOfETI || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.internalAuditorsTraining || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.goodHousekeepingSystem || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.chemicalHandlingSpillageSystem || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.wasteManagementSystem || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.environment || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.haccp || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.goodManufacturingPractices || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.rootCauseAnalysisAndCapa || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.firstAid || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.fireSafetyAndFireFighting || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.machineOperationAndSafety || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.usageOfPPE || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.companiesPolicies || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.qualityProductivityAndWasteControl || "NO"}
                        </td>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          {item.attitudeAndBehaviour || "NO"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="100%">No data available</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="40">
                      Note : Training Need shall be identified by respective HOD
                      (In case of training need please tick "√" mark)
                    </td>
                    <td colSpan="30" style={{ textAlign: "center" }}>
                      Signature of HOD :{reportData?.hodSign} <br />
                      {dateformat_supervisor} <br />
                      {getImageOP[reportIndex] && (
                        <img
                          src={getImageOP[reportIndex]}
                          alt="Supervisor Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      )}
                    </td>
                    <td colSpan="30" style={{ textAlign: "center" }}>
                      Signature of QA :{reportData?.qaManagerSign} <br />
                      {dateformat_op} <br />
                      {getImageSUP[reportIndex] && (
                        <img
                          src={getImageSUP[reportIndex]}
                          alt="QA Inspector Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      )}
                    </td>
                  </tr>
                  <br />
                  <br />
                </React.Fragment>
              ))}
          </tbody>

          <br />
          <tfoot>
            <tr>
              <td colspan="20" style={{ padding: "1em" }}>
                Particulars
              </td>
              <td colspan="20" style={{ padding: "1em" }}>
                Prepared By
              </td>
              <td colspan="30" style={{ padding: "1em" }}>
                Reviewed By
              </td>
              <td colspan="30" style={{ padding: "1em" }}>
                Approved By
              </td>
            </tr>
            <tr>
              <td colspan="20" style={{ padding: "1em" }}>
                Name
              </td>
              <td colspan="20" style={{ padding: "1em" }}></td>
              <td colspan="30" style={{ padding: "1em" }}></td>
              <td colspan="30" style={{ padding: "1em" }}></td>
            </tr>
            <tr>
              <td colspan="20" style={{ padding: "1em" }}>
                Signature & Date
              </td>
              <td colspan="20" style={{ padding: "1em" }}></td>
              <td colspan="30" style={{ padding: "1em" }}></td>
              <td colspan="30" style={{ padding: "1em" }}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      {contextHolder}

      <BleachingHeader
        unit="Unit-H"
        formName="TRAINING NEED IDENTIFICATION FORM"
        formatNo="PH-QAD01/F-005"
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
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={() => navigate("/Precot/choosenScreen")}
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
              if (confirm("You Want to logged out")) {
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
          <PrecotSidebar
            open={open}
            onClose={onClose}
            role={localStorage.getItem("role")}
          />,
        ]}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <label style={{ marginRight: "10px" }}>Select Year:</label>
          <Select
            placeholder="Select Year"
            value={selectedYear}
            onChange={handleYear}
            style={{ width: "200", fontWeight: "bold", marginRight: "30px" }}
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>

          <label style={{ marginRight: "10px" }}>Select Department</label>
          <Select
            placeholder="Select Department"
            value={selectedDepartment}
            onChange={(value) => {
              setSelectedDepartment(value);
            }}
            style={{ width: "180px", textAlign: "center" }}
          >
            {departments.map((dept) => (
              <Select.Option
                key={dept.department}
                value={dept.department}
                style={{ textAlign: "center" }}
              >
                {dept.department}
              </Select.Option>
            ))}
          </Select>

          <Button
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
            Go To
          </Button>
        </div>
      </div>

      <Table
        bordered
        style={{ textAlign: "center" }}
        columns={columns}
        dataSource={apiData || modaldata}
      />

      <Modal
        title="Edit Form"
        visible={newModal}
        onCancel={() => setNewModal(false)}
        width="100vw"
      ></Modal>
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDateSubmit}
            disabled={isFetchSuccessful}
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
            width: "100%",
          }}
        >
          <label style={{ paddingRight: "10px" }}>Year:</label>
          <Select
            placeholder="Select Year"
            value={selectedYear}
            onChange={handlePrintChange}
            style={{ width: "100%", fontWeight: "bold", marginRight: "60px" }}
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QAD01_005;
