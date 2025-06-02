/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
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

const QA_F002_Summary = () => {
  const initial = useRef(false);
  const [deaprtment, setdepartment] = useState([]);
  const [deaprtment_list, setdepartment_list] = useState([]);
  const [modalData, setmodalData] = useState([]);
  const [monthPrint, setMonthPrint] = useState("");
  const [yearPrint, setYearPrint] = useState("");
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [availableshiftlov, setAvailableShiftslov] =
    useState("Select Department");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const navigate = useNavigate();
  const [batchno2, setbatchno2] = useState([]);
  const [batchNolist2, setBatchNolist2] = useState("Select Department Name");
  const [batchno, setbatchno] = useState([]);
  const [date, setdate] = useState([]);
  const [date1, setdate1] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const roleBase = localStorage.getItem("role");

  const departmentid = localStorage.getItem("departmentId");

  const typeLov = [
    { id: 1, value: "BLEACHING" },
    { id: 2, value: "SPUNLACE" },
    { id: 3, value: "PAD_PUNCHING" },
    { id: 4, value: "DRY_GOODS" },
    { id: 5, value: "QUALITY_CONTROL" },
    { id: 6, value: "QUALITY_ASSURANCE" },
    { id: 7, value: "PPC" },
    { id: 8, value: "STORE" },
    { id: 9, value: "DISPATCH" },
    { id: 10, value: "PRODUCT_DEVELOPMENT" },
    { id: 11, value: "ENGINEERING" },
    { id: 12, value: "COTTON_BUDS" },
    { id: 13, value: "MARKETTING" },
  ];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };
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

  const handleMonthPrintChange = (value) => {
    setMonthPrint(value);
  };
  const handleYearPrintChange = (value) => {
    setYearPrint(value);
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
  `;

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }
  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      fetchDataOrderNumber();
      fetchDataCCRNO();
      fetchdata_departmentid();
      fetchData_dep_by_id();
    }
  }, []);

  const fetchImages = async (printResponseData, token) => {
    if (!printResponseData) return;

    printResponseData.forEach((reportData, reportIndex) => {
      // Fetch HOD sign image
      const qaHodDesigneeSign = reportData?.qa_hod_designee_sign;
      if (qaHodDesigneeSign) {
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${qaHodDesigneeSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            },
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                "",
              ),
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImageHOD((prev) => ({ ...prev, [reportIndex]: url })); // Set image for the specific index
          })
          .catch((err) => {
            console.error("Error in fetching HOD image:", err);
          });
      }

      // Fetch MR sign image
      const qaMrSign = reportData?.qa_mr_sign;
      if (qaMrSign) {
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${qaMrSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            },
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                "",
              ),
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImageSUP((prev) => ({ ...prev, [reportIndex]: url })); // Set image for the specific index
          })
          .catch((err) => {
            console.error("Error in fetching MR image:", err);
          });
      }
    });
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
  const handleBlur = async (e) => {
    const newDate = e.target.value;
    setdate(newDate); // Update selected date state

    if (date) {
      const selectedDate = moment(date, "YYYY-MM-DD"); // Convert input date to moment object
      const selectedYear = selectedDate.year();
      const selectedMonth = selectedDate.month() + 1; // Month is 0-indexed (0 = January)

      try {
        setLoading(true);

        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/api/getRequestAndIssunceOfDocumentSummary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const isMatch = response.data.some((item) => {
          const itemMoment = moment(item.date, "YYYY-MM-DD");

          return (
            itemMoment.year() === selectedYear &&
            itemMoment.month() + 1 === selectedMonth
          );
        });

        if (isMatch) {
          setMatchFound(false);
        } else {
          setMatchFound(true);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchdata_departmentid = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      let dep_id = localStorage.getItem("departmentId");

      const foundDepartment = response.data?.find((dept) => {
        const numericDepId = Number(dep_id);

        if (dept.id === numericDepId) {
          return true;
        } else {
          return false; // Return false to continue searching
        }
      });

      if (foundDepartment) {
        setdepartment(foundDepartment.department);

        fetchData_dep_by_id(foundDepartment.department);
      } else {
        setdepartment("Department not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData_dep_by_id = async () => {
    const roleBase = localStorage.getItem("role");

    try {
      setLoading(true);

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/getRequestAndIssunceOfDocumentSummary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (
        response.data &&
        (response.data?.length > 0 || response.data?.length == undefined)
      ) {
        setmodalData(response.data);
      }
    } catch (error) {
      // Check if the error is a 403 Forbidden error
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
  };

  const handleprint_section = async () => {
    const shortMonth =
      monthsLov.find((month) => month.value === monthPrint)?.id - 1; // 0-based index
    const formattedMonth =
      shortMonth !== undefined ? monthNames[shortMonth] : "";

    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/getRequestAndIssunceOfDocumentPrint`,
        {
          params: {
            date: date1,
            month: formattedMonth,
            year: yearPrint,
            department: selectedType,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data?.length) {
        const resData = response.data;

        setPrintResponseData(response.data);

        message.success("Data fetched successfully.");

        await fetchImages(response.data, token);
        printDateSubmit();
      } else {
        message.error("No data found.");
      }
    } catch (err) {
      if (err.response) {
        console.error("Response error:", err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
      message.error("An error occurred while fetching data.");
    }
  };

  const fetchDataCCRNO = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data?.map((laydownno) => laydownno.department);
          setdepartment_list(data);
          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            const data = res.data?.map((laydownno) => laydownno.department);
            setdepartment_list(data);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataOrderNumber = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            const data = res.data?.map((laydownno) => laydownno.department);
            setbatchno(data);
            setbatchno2(data);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGo = async () => {
    if (
      date == null ||
      date == "" ||
      date == "[]" ||
      availableshiftlov == "Select Date" ||
      availableshiftlov == 0
    ) {
      message.warning("Please Select Date");
      return;
    }
    navigate("/Precot/QA/F-002", {
      state: {
        datevalue: date,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/F-002", {
      state: {
        datevalue: record.date,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    setIsFetchSuccessful(true);
    setShowModal(true);
  };

  const commonColumns = [
    {
      title: "S.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
      align: "center",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
    },

    {
      title: "HOD Status",
      dataIndex: "qa_hod_designee_status",
      key: "qa_hod_designee_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "QA Manager status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_, x) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(x)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  const handleModalClose = () => {
    setShowModal(false);
    setBatchNolist2(null);
    setMonthPrint(null);
    setYearPrint(null);
    setSelectedType(null);
    setdate1(null);
    setIsFetchSuccessful(true);
  };

  const printDateSubmit = () => {
    window.print();
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let columns = [...commonColumns];

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Request & Issuance of Document "
        formatNo="PH-QAD01/F-002"
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
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
          >
            Print
          </Button>,
          <Button
            key="back"
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            type="primary"
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
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

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Date
          </div>
          <Input
            type="date"
            value={date}
            onChange={handleBlur}
            size="small"
            max={getCurrentDate()}
            style={{ width: "10%", height: "30px" }}
          />
          <Button
            key="go"
            onClick={handleGo}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiNavigation color="#00308F" />}
            type="primary"
          >
            Go To
          </Button>
        </div>
        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={modalData}
        />

        <div id="section-to-print">
          <GlobalStyle />
          {printResponseData?.map((response, responseIndex) => (
            <div key={responseIndex} style={{ pageBreakAfter: "always" }}>
              <table
                style={{
                  borderCollapse: "collapse",
                  border: "1px solid #0000",
                  padding: "5px",
                  paddingTop: "70px",
                  scale: "90%",
                  width: "90%",
                }}
              >
                <thead>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }} colSpan="100"></td>
                  </tr>
                  <tr>
                    <td colSpan="5" rowSpan="4" style={{ textAlign: "center" }}>
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "80px", height: "auto" }}
                      />
                      <br />
                      Unit H
                    </td>
                    <th
                      colSpan="40"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      Request & Issuance of Document
                    </th>
                    <td colSpan="15">Format No.:</td>
                    <td colSpan="40">{response.formatNo}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Revision No.:</td>
                    <td colSpan="40">{response.revisionNumber}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Ref. SOP No.:</td>
                    <td colSpan="40">{response.sopNumber}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Page No.:</td>
                    <td colSpan="40">
                      {responseIndex + 1} of {printResponseData.length}
                    </td>
                  </tr>
                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }} colSpan="100"></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: "center" }}>
                      S.No.
                    </th>
                    <th colSpan="13" style={{ textAlign: "center" }}>
                      Date
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Document Name
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Document No.
                    </th>
                    <th colSpan="5" style={{ textAlign: "center" }}>
                      Revision No.
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Type of Copy
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      No. of Copies
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Reason
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Document Given By
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Document Collected By
                    </th>
                    <th colSpan="10" style={{ textAlign: "center" }}>
                      Remark
                    </th>
                  </tr>
                  {response.details?.length > 0 ? (
                    response.details.map((item, index) => (
                      <tr key={index}>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          {index + 1}
                        </td>
                        <td colSpan="13" style={{ textAlign: "center" }}>
                          {moment(item?.date).format("DD/MM/YYYY") || "NA"}
                        </td>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {item.documentName || "NA"}
                        </td>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {item.documentNo || "NA"}
                        </td>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          {item.revisionNo || "NA"}
                        </td>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {item.typeOfCopy || "NA"}
                        </td>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {item.numberOfCopies || "NA"}
                        </td>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {item.reason || "NA"}
                        </td>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {item.documentGivenBy || "NA"}
                        </td>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {item.documentCollectedBy || "NA"}
                        </td>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          {item.remark || "NA"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="100%">No data available</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="100">Comments: {response.comments}</td>
                  </tr>
                  <tr>
                    <td
                      colSpan="40"
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      Requested By (Sign & Date):
                      <br />
                      {response.qa_hod_designee_sign} <br />
                      {moment(response.qa_hod_designee_submit_on).format(
                        "DD/MM/YYYY",
                      )}
                      <div>
                        <img
                          src={getImageHOD[responseIndex]}
                          alt="QA Hod Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      </div>
                    </td>
                    <td
                      colSpan="60"
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      Approved by (Sign & Date):
                      <br />
                      {response.qa_mr_sign} <br />
                      {moment(response.qa_mr_submit_on).format("DD/MM/YYYY")}
                      <div>
                        <img
                          src={getImageSUP[responseIndex]}
                          alt="QA MR Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <Modal
          title="Print"
          open={showModal}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          footer={[
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginRight: 190,
              }}
              icon={<IoPrint color="#00308F" />}
              key="submit"
              type="primary"
              onClick={handleprint_section}
            >
              Print
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
              width: "100%",
            }}
          >
            {/* Select Date */}
            <div
              style={{
                display: "flex",
                alignItems: "left",
              }}
            >
              <label
                style={{
                  marginLeft: "8px",
                  width: "30%",
                  textAlign: "left",
                }}
              >
                Select Date:
              </label>
              <Input
                style={{ width: "50%" }}
                type="date"
                value={date1}
                onChange={(e) => {
                  setdate1(e.target.value);
                }}
              />
            </div>

            {/* Month */}
            <div
              style={{
                display: "flex",
                alignItems: "left",
              }}
            >
              <label
                style={{
                  marginLeft: "8px",
                  width: "30%",
                  textAlign: "left",
                }}
              >
                Month:
              </label>
              <Select
                showSearch
                value={monthPrint}
                onChange={handleMonthPrintChange}
                style={{ width: "50%" }}
                placeholder="Search Month"
                optionFilterProp="children"
              >
                {monthsLov.map((option) => (
                  <Select.Option key={option.id} value={option.value}>
                    {option.value}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Year */}
            <div
              style={{
                display: "flex",
                alignItems: "left",
              }}
            >
              <label
                style={{
                  marginLeft: "8px",
                  width: "30%",
                  textAlign: "left",
                }}
              >
                Year:
              </label>
              <Select
                showSearch
                value={yearPrint}
                onChange={handleYearPrintChange}
                style={{ width: "50%" }}
                placeholder="Search Year"
                optionFilterProp="children"
              >
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
                alignItems: "left",
              }}
            >
              <label
                style={{
                  marginLeft: "8px",
                  width: "30%",
                  textAlign: "left",
                }}
              >
                Department
              </label>
              <Select
                showSearch
                value={selectedType}
                onChange={handleTypeChange}
                style={{ width: "50%" }}
                placeholder="Select Type"
                optionFilterProp="children"
              >
                {typeLov.map((option) => (
                  <Select.Option key={option.id} value={option.value}>
                    {option.value}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QA_F002_Summary;
