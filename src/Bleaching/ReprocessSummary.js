/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API from "../baseUrl.json";
import { FaPrint } from "react-icons/fa6";
import {
  Table,
  Button,
  Modal,
  Select,
  Tooltip,
  Menu,
  Row,
  Avatar,
  Col,
  Drawer,
  message,
  Form,
  Input,
  notification,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { BiLock, BiNavigation } from "react-icons/bi";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate, IoPrint } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { createGlobalStyle } from "styled-components";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";

const { Option } = Select;

const ReprocessSummary = () => {
  const [invoiceNo, setInvoiceNo] = useState([]);
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
    loadno: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
    date: "",
    loadno: "",
  });
  const initialized = useRef(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [summary, setSummaryData] = useState([]);
  const [batchnoprint, setbatchnoprint] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const role = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [printData, setPrintData] = useState([]);
  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    qc_sign: "",
  });
  const [yearLov, setYearLov] = useState([]);
  const [monthLov, setMonthLov] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [getImage, setGetImage] = useState("");

  const [BMR, setLayDown] = useState("");
  const [printBMR, setprintLayDown] = useState("");
  const [layDownOptions, setLayDownOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.supervisorSubmittedBy;
    if (username) {
      // // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow?.supervisorSubmittedBy,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hodSubmittedBy;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage1(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow, selectedRow?.hodSubmittedBy,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qaSign;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow?.qaSign,API.prodUrl, token]);

  const roleBase = localStorage.getItem("role");

  const canDisplayButtons = () => {
    if (roleBase === "ROLE_SUPERVISOR") {
      if (selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") {
        if (selectedRow?.hod_status === "HOD_REJECTED") {
          return "block";
        }
        if (
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status === "HOD_APPROVED" ||
          selectedRow?.hod_status === "HOD_REJECTED"
        ) {
          return "none";
        }
        if (selectedRow?.qa_status === "QA_APPROVED") {
          return "none";
        }
      }
    } else if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status === "HOD_APPROVED" ||
        selectedRow?.hod_status === "HOD_REJECTED"
      ) {
        return "none";
      }

      return "block";
    } else if (roleBase === "ROLE_QA") {
      if (
        selectedRow?.qa_status === "QA_APPROVED" ||
        selectedRow?.qa_status === "QA_REJECTED"
      ) {
        return "none";
      }
    } else {
      if (
        selectedRow?.qa_status === "QA_APPROVED" ||
        selectedRow?.qa_status === "QA_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleBase == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
        // emptyarraycheck == 0
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };
  const canDisplayPrint = () => {
    // console.log("ss", selectedRow?.supervisor_status);
    if (roleBase == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_status == "QA_APPROVED" &&
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "block";
      }
      return "none";
    } else if (roleBase == "ROLE_QA") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_status == "QA_APPROVED" &&
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "block";
      }
      return "none";
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_status == "QA_APPROVED" &&
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "block";
      }
      return "none";
    }
  };

  useEffect(() => {
    const fetchBatchOptions = async () => {
      if (!BMR) return; // Exit if BMR is empty

      try {
        // Clear options initially to prevent stale data
        setBatchOptions([]);

        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/fetchBatchByBMR?bmr_no=${BMR}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update options only if the response is successful
        if (response.data) {
          setBatchOptions(response.data);
          setSelectedRow(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching batch options:", error);
      }
    };

    fetchBatchOptions();
  }, [BMR]);

  useEffect(() => {
    // Fetch shift options from the API
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const fetchLayDown = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getcloseBMR
 `,
          { headers }
        );
        setLayDownOptions(response.data);
        // console.log("Laydown No", response.data);
      } catch (error) {
        console.error("Error fetching laydown:", error);
      }
    };
    fetchLayDown();
  }, []);

  const handlelogDown = (value) => {
    // console.log("BMR_NO", value);
    localStorage.setItem("BMR", value);
    setLayDown(value);
  };

  const handlelogprintDown = (value) => {
    // console.log("BMR_NO", value);
    setprintLayDown(value);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    let years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ value: year, label: year.toString() });
    }
    const currentMonth = new Date().getMonth() + 1;
    const allMonths = [
      { value: "01", label: "JAN" },
      { value: "02", label: "FEB" },
      { value: "03", label: "MAR" },
      { value: "04", label: "APR" },
      { value: "05", label: "MAY" },
      { value: "06", label: "JUN" },
      { value: "07", label: "JUL" },
      { value: "08", label: "AUG" },
      { value: "09", label: "SEP" },
      { value: "10", label: "OCT" },
      { value: "11", label: "NOV" },
      { value: "12", label: "DEC" },
    ];

    const filteredMonthBasedOnYear = allMonths.filter(
      (month) => parseInt(month.value) <= currentMonth
    );
    const months =
      printParams.year == currentYear ? filteredMonthBasedOnYear : allMonths;
    setMonthLov(months);

    setYearLov(years);
  }, [formParams.year, formParams.month, printParams.year, printParams.month]);

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "micro_sign", "qc_sign"];
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
  }, [token, printData.chemist_sign, printData.micro_sign, printData.qc_sign]);

  useEffect(() => {
    const fetchDatamillbatch = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/chemicaltest/ARF004/PDE`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const options = response.data
          .filter((option) => option.invoice_no !== "")
          .map((option) => ({
            value: option.invoice_no,
            label: option.invoice_no,
          }));

        setInvoiceNo(options);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDatamillbatch();
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/bleaching/Service/getReprocessSummary`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // setSummaryData(response.data);
          // setSelectedRow(response.data[0]);
          if (response.data && response.data.length > 0) {
            setSummaryData(response.data);
            setSelectedRow(response.data[0]);
            console.log("Selected new Row:", response.data[0]);
          } else {
            setSummaryData([]);
            setSelectedRow(null);
          }
        } catch (error) {
          // message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summary) {
        if (
          data.qc_status == "QC_REJECTED" ||
          data.qc_status == "QA_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summary]);

  const baseColumns = [
    {
      title: "BMR No",
      dataIndex: "bmrNumber",
      key: "bmrNumber",
      align: "center",
      //   render: (text, record, index) => index + 1,
    },

    {
      title: "Process Date",
      dataIndex: "processDate",
      key: "processDate",
      align: "center",
      render: (dateString) => {
        if (!dateString) return ""; // Return empty string if dateString is undefined or null
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
      },
    },
    {
      title: "Sub batch No",
      dataIndex: "subBatchNumber",
      key: "subBatchNumber",
      align: "center",
    },

    {
      title: "Supervisor Status",
      dataIndex: "supervisorStatus",
      key: "supervisorStatus",
      align: "center",
    },
    {
      title: "HOD Status",
      dataIndex: "hodStatus",
      key: "hodStatus",
      align: "center",
    },
    {
      title: "QA Status",
      dataIndex: "qaStatus",
      key: "qaStatus",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "rejectReason",
      key: "rejectReason",
      align: "center",
      render: (text) => text || "N/A",
    },

    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              handleEdit(record);
            }}
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

  const showDrawer = () => {
    setOpen(true);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let formattedMicroDate;
  if (printData.microbiologist_submit_on) {
    formattedMicroDate = moment(printData.microbiologist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }

  let formattedManagerDate;
  if (printData.manager_submit_on) {
    formattedManagerDate = moment(printData.manager_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedManagerDate = ""; // Or any other default value or error handling
  }

  //   const handleFormParams = (value, name) => {
  //     setFormParams((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   };

  const handleFormParams = (value, key) => {
    // Update the formParams state
    setFormParams((prev) => {
      const updatedParams = { ...prev, [key]: value };
      // Store updated loadno in localStorage if the key is 'loadno'
      if (key === "loadno") {
        localStorage.setItem("loadno", value);
      }
      return updatedParams;
    });
  };

  const handleGo = async () => {
    if (formParams.printBMR == "" || formParams.loadno == "") {
      message.warning("Please Select The BMR NO and Batch No");
      return;
    }

    navigate("/Precot/Reprocess", {
      state: {
        date: formParams.date,
        loadno: formParams.loadno,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/Reprocess", {
      state: {
        id: record.id,
      },
    });
  };

  const handlePrint = async () => {
    if (!printParams.date && !printBMR) {
      message.warning("Please select at least one field");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/Service/getReprocessReportPrint?bmrNumber=${printBMR}&date=${printParams.date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data.length == 0 ||
        response.data === "No data found for the provided parameters"
      ) {
        message.warning("No Data Available To Print");
        setPrintButtonLoading(false);
        return;
      }

      setPrintData(response.data[0]);
      const username = response.data[0]?.supervisorSubmittedBy;
      console.log("username", username);
      //getImage
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
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });

      const username1 = response.data[0]?.hodSign;
      console.log("username", username);
      //getImage
      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username1}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage1(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });

      const username2 = response.data.qaSubmittedBy;
      console.log("username", username2);
      //getImage

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (Object.keys(printData).length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, [2000]);
    }
  }, [printData]);

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      month: "",
      year: "",
      date: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const handlePrintParams = (value, name) => {
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name == "year" || name == "month") {
      setPrintParams((prevState) => ({
        ...prevState,
        date: "",
      }));
    }
    if (name == "year") {
      setPrintParams((prevState) => ({
        ...prevState,
        month: "",
      }));
    }

    if (name == "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        year: "",
        month: "",
      }));
    }
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
                    .page-break {
                page-break-after: always;
            }
}
`;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // const formatDate = (dateString) => {
  //   if (!dateString) return '';
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   return `${day}/${month}/${year} ${hours}:${minutes}`;
  // };

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

  const entriesPerPage = 3;
  const stoppageReport = [];
  let numberOfPages = Math.ceil((printData.length - 2) / entriesPerPage);

  if (printData || printData.length > 0) {
    for (let i = 2; i < printData.length; i += entriesPerPage) {
      stoppageReport.push(printData.slice(i, i + entriesPerPage));
    }
  }

  const mediaTypes = [
    {
      name: "SCDA",
      keys: [
        "scdaMediaWeight",
        "scdaDistilledWater",
        "scdaMediaQuantity",
        "scdaPhOfMediaRequired",
        "scdaPhMediaObserved",
        "scdaNoOfPlates",
        "scdaMediaPoured",
        "scdaQuantityUsed",
        "scdaRemainingQuantity",
        "scdaRemarks",
        "scdaPreparedBy",
        "scdaVerifiedBy",
      ],
    },
    {
      name: "SDA",
      keys: [
        "sdaMediaWeight",
        "sdaDistilledWater",
        "sdaMediaQuantity",
        "sdaPhOfMediaRequired",
        "scdaPhMediaObserved",
        "sdaNoOfPlates",
        "sdaMediaPoured",
        "sdaQuantityUsed",
        "scdaRemainingQuantiy",
        "sdaRemarks",
        "sdaPreparedBy",
        "sdaVerifiedBy",
      ],
    },
    {
      name: "VRBA",
      keys: [
        "vrbaMediaWeight",
        "vrbaDistilledWater",
        "vrbaMediaQuantity",
        "vrbaPhOfMediaRequired",
        "vrbaPhMediaObsereved",
        "vrbaNoOfPlates",
        "vrbaMediaPoured",
        "vrbaQuantityUsed",
        "vrbaRemainingQuantiy",
        "vrbaRemarks",
        "vrbaPreparedBy",
        "vrbaVerifiedBy",
      ],
    },
    {
      name: "Mac.Con.",
      keys: [
        "maccOnMediaWeight",
        "maccOnDistilledWater",
        "maccOnMediaQuantity",
        "maccOnPhOfMediaRequired",
        "maccOnPhMediaObsereved",
        "maccOnNoOfPlates",
        "maccOnMediaPoured",
        "maccOnQuantityUsed",
        "maccOnRemainingQuantiy",
        "maccOnRemarks",
        "maccOnPreparedBy",
        "maccOnVerifiedBy",
      ],
    },
    {
      name: "Citric",
      keys: [
        "citricMediaWeight",
        "citricDistilledWater",
        "citricMediaQuantity",
        "citricPhOfMediaRequired",
        "citricPhMediaObsereved",
        "citricNoOfPlates",
        "citricMediaPoured",
        "citricQuantityUsed",
        "citricRemainingQuantiy",
        "citricRemarks",
        "citricPreparedBy",
        "citricVerifiedBy",
      ],
    },
    {
      name: "VJ",
      keys: [
        "vjMediaWeight",
        "vjDistilledWater",
        "vjMediaQuantity",
        "vjPhOfMediaRequired",
        "vjPhMediaObsereved",
        "vjNoOfPlates",
        "vjMediaPoured",
        "vjQuantityUsed",
        "vjRemainingQuantiy",
        "vjRemarks",
        "vjPreparedBy",
        "vjVerifiedBy",
      ],
    },
    {
      name: "BGA",
      keys: [
        "bgaMediaWeight",
        "bgaDistilledWater",
        "bgaMediaQuantity",
        "bgaPhOfMediaRequired",
        "bgaPhMediaObsereved",
        "bgaNoOfPlates",
        "bgaMediaPoured",
        "bgaQuantityUsed",
        "bgaRemainingQuantiy",
        "bgaRemarks",
        "bgaPreparedBy",
        "bgaVerifiedBy",
      ],
    },
  ];

  const bufferSolutions = [
    {
      name: "NaCl",
      keys: ["naclMediaWeight", "naclDistilledWater", "naclMediaQuantity"],
    },
    {
      name: "KH2PO4",
      keys: [
        "kh2po4MediaWeight",
        "kh2po4DistilledWater",
        "kh2po4MediaQuantity",
      ],
    },
    {
      name: "Peptone Water",
      keys: [
        "peptoneWaterMediaWeight",
        "peptoneWaterDistilledWater",
        "peptoneWaterMediaQuantity",
      ],
    },
    {
      name: "Tween 80",
      keys: [
        "tween80MediaWeight",
        "tween80DistilledWater",
        "tween80MediaQuantity",
      ],
    },
  ];

  const formatDatenew = (dateString) => {
    if (!dateString) return ""; // Check if dateString is defined
    const [year, month, day] = dateString.split("-"); // Use "-" for splitting if that's the format
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div id="section-to-print">
        {printData && (
          <>
            <div className="page-break">
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tr>
                  <td style={{ border: "none", padding: "30px" }}></td>
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
                      <p style={{ fontFamily: "Times New Roman" }}>
                        {printData.unit}
                      </p>
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
                    RE-PROCESSING REPORT
                  </td>
                  <td style={{ padding: "0.5em" }}>Format No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-PRD01/F-016</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Revision No.:</td>
                  <td style={{ padding: "0.5em" }}>
                    {printData.revisionNumber}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-PRD01-D-03</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Page No.:</td>
                  <td style={{ padding: "0.5em" }}>1 of 1</td>
                </tr>
              </table>
              <br />
              <table>
                <tbody>
                  <tr>
                    <td width={150}>Date:</td>
                    <td colspan={20}>{formatDate(printData.processDate)}</td>
                  </tr>
                  <tr>
                    <td>BMR No:</td>
                    <td>{printData.bmrNumber}</td>
                    <td width={150}>Sub. Batch No:</td>
                    <td>{printData.subBatchNumber}</td>
                    <td width={150}>Bale No:</td>
                    <td>{printData.baleNumber}</td>
                  </tr>
                  <tr>
                    <td>Reason for Reprocess:</td>
                    <td colSpan="5">{printData.reasonReprocess}</td>
                  </tr>
                  <tr>
                    <td>Failure Stage:</td>
                    <td colSpan="5">{printData.failureStage}</td>
                  </tr>
                  <tr>
                    <td>Reprocess Qty (Kg):</td>
                    <td colSpan="5">{printData.reprocessQuantity}</td>
                  </tr>
                  <tr>
                    <td>Reference NC No (if any):</td>
                    <td colSpan="5">{printData.referenceNCnumber}</td>
                  </tr>
                  <tr>
                    <td>Reprocessed Stage:</td>
                    <td colSpan="5">{printData.reprocessStage}</td>
                  </tr>
                  <tr>
                    <td>Remarks:</td>
                    <td colSpan="5">{printData.remarks}</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <br />
              <table>
                <thead>
                  <tr>
                    <th>Performed by Production Supervisor Sign & Date</th>
                    <th>Verified by Head of the Dept. Sign & Date</th>
                    <th>Approved by QA Sign & Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {/* <img className="signature"
                  src={getImage}
                  alt="Supervisor"
                  
                /> */}
                      {getImage && (
                        <img
                          className="signature"
                          src={getImage}
                          alt="Supervisor"
                        />
                      )}
                      <br></br>
                      {printData.supervisorSubmittedBy}{" "}
                      {formatDate(printData.supervisorSubmittedOn)}
                    </td>
                    <td>
                      {/* <img className="signature"
                  src={getImage1}
                  alt="HOD"
                  
                /> */}
                      {getImage1 && (
                        <img className="signature" src={getImage1} alt="HOD" />
                      )}
                      <br></br>
                      {printData.hodSign}{" "}
                      {formatDate(printData.hodSubmittedDate)}
                    </td>
                    <td>
                      {/* <img className="signature"
                  src={getImage2}
                  alt="QA"
                  
                /> */}
                      {getImage2 && (
                        <img className="signature" src={getImage2} alt="QA" />
                      )}
                      <br></br>
                      {printData.qaSign} {formatDate(printData.qaSubmittedDate)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <BleachingHeader
        formName={"RE-PROCESSING REPORT"}
        formatNo={"PH-PRD01/F-016"}
        unit={"UNIT H"}
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
            BMR No :
          </div>
          <Select
            placeholder="Select BMR No"
            value={BMR}
            onChange={handlelogDown}
            style={{ width: 120, fontWeight: "bold" }}
            required
            showSearch
          >
            {layDownOptions.map((option) => (
              <Option key={option.id} value={option.bleach_bmr_no}>
                {option.bleach_bmr_no}
              </Option>
            ))}
          </Select>
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Batch No :
          </div>
          <Select
            value={formParams.loadno}
            onChange={(value) => handleFormParams(value, "loadno")}
            style={{ width: "150px", textAlign: "center" }}
            placeholder="Select load no"
          >
            {batchOptions.length > 0 ? (
              batchOptions.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))
            ) : (
              <Select.Option value="" disabled></Select.Option>
            )}
          </Select>
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
          dataSource={summary}
        />
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <Modal
          title="RE-PROCESSING REPORT (Print)"
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
          <br />
          <span style={{ marginRight: "30px" }}>Date : </span>{" "}
          <Input
            type="date"
            value={printParams.date}
            onChange={(e) => {
              handlePrintParams(e.target.value, "date");
            }}
            max={today}
            style={{ textAlign: "center", width: "150px" }}
            readOnly={printParams.year !== "" || printParams.month !== ""}
          ></Input>
          <br />
          <br />
          <span style={{ marginRight: "12px" }}>BMR No : </span>{" "}
          {/* <Input
            value={printParams.loadno}
            onChange={(e) => {
              handlePrintParams(e.target.value, 'loadno');
            }}
            max={today}
            style={{ textAlign: 'center', width: '200px' }}
            readOnly={printParams.year !== '' || printParams.month !== ''}
          ></Input> */}
          <Select
            placeholder="Select BMR No"
            value={printBMR}
            onChange={handlelogprintDown}
            style={{ width: 150, fontWeight: "bold" }}
            required
            showSearch
          >
            {/* {layDownOptions.map((BMR) => (
                        <Option key={BMR.BMR_NO} bleach_bmr_no={BMR.BMR_NO}>
                          {BMR.BMR_NO}
                        </Option> */}
            {layDownOptions.map((option) => (
              <Option key={option.id} value={option.bleach_bmr_no}>
                {option.bleach_bmr_no}
              </Option>
            ))}
          </Select>
          <br />
        </Modal>
      </div>
    </div>
  );
};

export default ReprocessSummary;
