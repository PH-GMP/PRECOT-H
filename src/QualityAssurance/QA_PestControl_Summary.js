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

const QA_PestControl_Summary = () => {
  PrintPageOrientation({ orientation: "portrait", scale: 0.9 });
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [ContaminationData, setContaminationData] = useState([]);
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [yearPrint, setYearPrint] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { formNo } = state || {};
  const [showModal, setShowModal] = useState(false);
  const [datePrint, setDatePrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [typeOfService, setTypeOfService] = useState("");
  const [formName, setformName] = useState("");
  const [chemicalAndDosage, setChemicalAndDosage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const today = new Date();
  const yearF = today.getFullYear();
  const monthF = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yearF}-${monthF}-${day}`;

  useEffect(() => {
    if (formNo === "PH-HRD01/F-015") {
      setformName(
        "PEST CONTROL SERVICE REPORT - IFIM for House, Drain, Flesh Flies"
      );
      setTypeOfService(
        "Integrated Flying Insect Management for House Flies, Drain Flies, Flesh Flies"
      );
      setChemicalAndDosage(
        "Deltamethrin 2.5%SC, Propoxur 2% Bait, Propoxur 20% EC, Lambda cyhalothrin 10% WP"
      );
    } else if (formNo === "PH-HRD01/F-016") {
      setformName(
        "PEST CONTROL SERVICE REPORT - ILM Service for House Lizards"
      );
      setTypeOfService(
        "Integrated Lizard Management (ILM) Service for House Lizards"
      );
      setChemicalAndDosage("Turbble Gum");
    } else if (formNo === "PH-HRD01/F-017") {
      setformName(
        "PEST CONTROL SERVICE REPORT - ISMS for Spider & Crawling Insects"
      );
      setTypeOfService(
        "Integrated Spider Management Service for Spider & Crawling Insects"
      );
      setChemicalAndDosage("Propoxur 20% EC");
    } else if (formNo === "PH-HRD01/F-018") {
      setformName("PEST CONTROL SERVICE REPORT - IPM for Mosquitoes");
      setTypeOfService("IPM (Thermal Fogging) for Mosquitoes");
      setChemicalAndDosage("Deltamethrin 1.25% w/w or 1.% w/v  ");
    } else if (formNo === "PH-HRD01/F-019") {
      setformName(
        "PEST CONTROL SERVICE REPORT - Pro-Guard Service for Crawling Insects"
      );
      setTypeOfService("Pro-Guard Service for Crawling Insects");
      setChemicalAndDosage(
        "Deltamethrin 2.5%SC, Propoxur 20% EC, Cyfluthrin 5% EW."
      );
    } else if (formNo === "PH-HRD01/F-014") {
      setformName("PEST CONTROL SERVICE REPORT - IMM Service for Mosquitoes");
      setTypeOfService(
        "IMM (Integrated Mosquito Management) Service for Mosquitoes"
      );
      setChemicalAndDosage(
        "Cyfluthrin 5% EW, Lambda cyhalothrin 10% WP, Deltamethrin 2.5% SC"
      );
    } else {
      setformName("");
      setTypeOfService("");
      setChemicalAndDosage("");
    }
  }, [formNo]);

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const formattedDate1 = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.pci_sign;
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
          .catch((err) => {})
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.qa_mr_sign;
      setSaveLoading(true);
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
          .catch((err) => {})
          .finally(() => {
            if (index === printResponseData.length - 1) {
              setSaveLoading(false);
            }
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);

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
    setMonthPrint(null);
    setYearPrint(null);
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
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (data.qa_mr_status === "QA_MR_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);

  const handleYearChange = (value) => {
    setYear(value);
  };

  const handleMonthChange = (value) => {
    setMonth(value);
  };
  const handleMonthPrintChange = (value) => {
    setMonthPrint(value);
  };
  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };

  //   handle edit
  const handleEdit = (record) => {
    const { date } = record;
    const { month } = record;
    const { year } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QA/PestControl", {
      state: {
        date: formattedDate,
        formNo: formNo,
        month: month,
        year: year,
      },
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };
  const handleDateChangePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
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

      let apiUrl = `${API.prodUrl}/Precot/api/QA/Service/PestController/getPestControllerSummary?format_no=${formNo}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (role === "ROLE_PCI_TRAINED_PERSON" || role === "QA_MANAGER") {
        setCakingData(data);
      }

      if (data && data.length >= 0) {
        setContaminationData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            month: item.month,
            year: item.year,
            pci_status: item.pci_status,
            qa_mr_status: item.qa_mr_status,
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

    ...(formNo !== "PH-HRD01/F-016" &&
    formNo !== "PH-HRD01/F-017" &&
    formNo !== "PH-HRD01/F-018"
      ? [
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
        ]
      : []),
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },

    {
      title: "PCI Status",
      dataIndex: "pci_status",
      key: "pci_status",
      align: "center",
    },
    {
      title: "QA Manager Status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
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
  let splitNO;
  if (
    formNo === "PH-HRD01/F-016" ||
    formNo === "PH-HRD01/F-017" ||
    formNo === "PH-HRD01/F-018"
  ) {
    splitNO = 5;
  } else {
    splitNO = 6;
  }
  if (reason) {
    columns = [
      ...baseColumns.slice(0, splitNO),
      Reason,
      ...baseColumns.slice(splitNO),
    ];
  } else {
    columns = baseColumns;
  }

  const printSubmit = () => {
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
    let api;
    let monthP;
    let YearP;
    let DateP;
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
      DateP = "";
    } else {
      DateP = datePrint;
    }
    if (
      formNo == "PH-HRD01/F-015" ||
      formNo == "PH-HRD01/F-019" ||
      formNo == "PH-HRD01/F-014"
    ) {
      api = `${API.prodUrl}/Precot/api/QA/Service/PestController/print?format_no=${formNo}&month=${monthP}&year=${YearP}&date=${DateP}`;
    } else if (
      formNo == "PH-HRD01/F-016" ||
      formNo == "PH-HRD01/F-017" ||
      formNo == "PH-HRD01/F-018"
    ) {
      api = `${API.prodUrl}/Precot/api/QA/Service/PestController/print?format_no=${formNo}&month=${monthP}&year=${YearP}`;
    } else {
      api = "";
    }
    try {
      axios
        .get(api, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data && res.data.message !== "No data") {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };
  //   goto button
  const goTo = () => {
    if (
      formNo === "PH-HRD01/F-015" ||
      formNo === "PH-HRD01/F-019" ||
      formNo === "PH-HRD01/F-014"
    ) {
      if (date == "" || date == null) {
        message.warning("Please Select Date");
        return;
      }
      navigate("/Precot/QA/PestControl", {
        state: {
          date: date,
          formNo: formNo,
        },
      });
    }
    if (
      formNo === "PH-HRD01/F-016" ||
      formNo === "PH-HRD01/F-017" ||
      formNo === "PH-HRD01/F-018"
    ) {
      if (month == "" || month == null) {
        message.warning("Please Select Month");
        return;
      }
      if (year == "" || year == null) {
        message.warning("Please Select Year");
        return;
      }
      navigate("/Precot/QA/PestControl", {
        state: {
          month: month,
          year: year,
          formNo: formNo,
        },
      });
    }
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {printResponseData?.map((slice, index) => (
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
                  PEST CONTROL SERVICE REPORT
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">{formNo}</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-HRD01-D-02</td>
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
              {(formNo == "PH-HRD01/F-016" ||
                formNo == "PH-HRD01/F-017" ||
                formNo == "PH-HRD01/F-018" ||
                formNo == "PH-HRD01/F-019" ||
                formNo == "PH-HRD01/F-014") && (
                <tr>
                  <td colSpan="40">
                    <b>Frequency :</b> {printResponseData?.[index]?.frequency}
                  </td>
                  <td colSpan="40">
                    <b>Date :</b>{" "}
                    {formattedDate1(printResponseData?.[index]?.date)}
                  </td>
                  <td colSpan="35">
                    <b>Next Due Date :</b>
                    {formattedDate1(
                      printResponseData?.[index]?.next_due_date
                    )}{" "}
                  </td>
                </tr>
              )}
              {formNo == "PH-HRD01/F-015" && (
                <tr>
                  <td colSpan="57">
                    <b>Frequency : </b>
                    {printResponseData?.[index]?.frequency}{" "}
                  </td>
                  <td colSpan="58">
                    <b>Date :</b>{" "}
                    {formattedDate1(printResponseData?.[index]?.date)}{" "}
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="115">
                  <b>Type of Service :</b>
                  {typeOfService}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="115">
                  <b>Name of the chemical & Dosage:</b>
                  {chemicalAndDosage}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="115">
                  <b>Pest Treatment Given by (Name of PCI Trained Person) : </b>
                  {printResponseData?.[index]?.pci_trained_person || ""}{" "}
                </td>
              </tr>

              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  <b>Sr. No.</b>
                </th>
                <th colSpan="38" style={{ textAlign: "center" }}>
                  <b>Area of Treatment</b>
                </th>
                <th colSpan="38" style={{ textAlign: "center" }}>
                  <b>
                    Treatment Provided
                    <br />
                    (Yes / No)
                  </b>
                </th>
                <th colSpan="39" style={{ textAlign: "center" }}>
                  <b>Remark</b>
                </th>
              </tr>
              {printResponseData?.[index]?.details?.map((slice, index) => (
                <tr>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    <b>{index + 1}</b>
                  </th>
                  <th colSpan="38" style={{ textAlign: "center" }}>
                    <b>{slice.area_of_treatments}</b>
                  </th>
                  <td colSpan="38" style={{ textAlign: "center" }}>
                    {slice.treatment_provided === "Y"
                      ? "Yes"
                      : slice.treatment_provided === "N"
                      ? "No"
                      : "NA"}
                  </td>
                  <td colSpan="39" style={{ textAlign: "center" }}>
                    {slice.remarks}
                  </td>
                </tr>
              ))}
              <td style={{ width: "15px" }} colSpan="115">
                <b>Remarks:</b>
                {printResponseData?.[index]?.remarks}
              </td>
              <tr>
                <th colSpan="55" style={{ textAlign: "center" }}>
                  <b>Pest Control Done by (PCI)</b>
                </th>
                <th colSpan="60" style={{ textAlign: "center" }}>
                  <b>Manager - QA Sign & Date</b>
                </th>
              </tr>
              <tr>
                <td colSpan="55" style={{ textAlign: "center" }}>
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
                      alt={`PCI Sign ${index + 1}`}
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
                  {printResponseData?.[index]?.pci_sign || ""}
                  <br />
                  {formattedDate(printResponseData?.[index]?.pci_submit_on)}
                </td>
                <td colSpan="60" style={{ textAlign: "center" }}>
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
                  {printResponseData?.[index]?.qa_mr_sign || ""}
                  <br />
                  {formattedDate(printResponseData?.[index]?.qa_mr_submit_on)}
                </td>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="25">Particular</th>
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
          formName="PEST CONTROL SERVICE REPORT"
          formatNo={formNo}
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
                // eslint-disable-next-line no-unused-expressions
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
          {(formNo === "PH-HRD01/F-015" ||
            formNo === "PH-HRD01/F-019" ||
            formNo === "PH-HRD01/F-014") && (
            <>
              <Col>
                <label htmlFor="dateInput">Date:</label>
              </Col>
              <Col>
                <Input
                  id="dateInput"
                  onChange={handleDateChange}
                  type="date"
                  value={date}
                  max={formattedToday}
                  style={{ width: "100%", height: "30px" }}
                />
              </Col>
            </>
          )}
          {(formNo === "PH-HRD01/F-016" ||
            formNo === "PH-HRD01/F-017" ||
            formNo === "PH-HRD01/F-018") && (
            <>
              <Col>
                {" "}
                <label>Month:</label>
              </Col>
              <Col>
                <Select
                  showSearch
                  value={month}
                  onChange={handleMonthChange}
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
              </Col>{" "}
            </>
          )}

          {(formNo === "PH-HRD01/F-016" ||
            formNo === "PH-HRD01/F-017" ||
            formNo === "PH-HRD01/F-018") && (
            <>
              {" "}
              <Col>
                {" "}
                <label>Year:</label>
              </Col>
              <Col>
                <Select
                  showSearch
                  value={year}
                  onChange={handleYearChange}
                  style={{ width: "100%" }}
                  placeholder="Search Year"
                  optionFilterProp="children"
                >
                  <Select.Option value="" disabled selected>
                    SelectYear
                  </Select.Option>
                  {yearOptions.map((option) => (
                    <Select.Option key={option.id} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
              </Col>{" "}
            </>
          )}
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
          dataSource={ContaminationData}
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
            loading={saveLoading}
          >
            Submit
          </Button>,
        ]}
      >
        {" "}
        {(formNo === "PH-HRD01/F-015" ||
          formNo === "PH-HRD01/F-019" ||
          formNo === "PH-HRD01/F-014") && (
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
              onChange={handleDateChangePrint}
              type="date"
              value={datePrint}
              max={formattedToday}
              size="small"
              style={{ width: "50%", height: "30px" }}
            />
          </div>
        )}
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
            style={{ width: "50%" }}
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
            style={{ width: "50%" }}
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
      </Modal>
    </div>
  );
};

export default QA_PestControl_Summary;
