/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiLock, BiSolidAddToQueue } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_F048_Summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
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
    12: "COTTON_BUDS",
    13: "MARKETING",
  };

  const departmentId = localStorage.getItem("departmentId");
  const today = new Date().toISOString().split("T")[0];
  const [department, setDepartment] = useState(
    departmentMap[departmentId] || ""
  );
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [deviationNo, setDeviationNo] = useState("");
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [getImage4, setGetImage4] = useState("");
  const [getImage5, setGetImage5] = useState("");
  const [getImage6, setGetImage6] = useState("");
  const [getImage7, setGetImage7] = useState("");
  const [getImage8, setGetImage8] = useState("");
  const [getImage9, setGetImage9] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
    // Reset form fields
    setSelectedDeviationNo("");
    setSelectedDepartment("");
    setSelectedMonth("");
    setSelectedYear("");
    form.resetFields();
  };

  const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  function generateYearOptions(startYear) {
    const currentYear = new Date().getFullYear();
    const endYear = Math.max(
      currentYear + (currentYear - startYear),
      startYear + 16
    );
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }

    return years;
  }

  const years = generateYearOptions(2024);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const formatDates = (dateStr) => {
    if (!dateStr) return "";
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
      title: "Date of Initiation",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDates(text),
    },
    {
      title: "Deviation No.",
      dataIndex: "deviationNumber",
      key: "deviationNumber",
      align: "center",
    },
    {
      title: " Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "action",
      align: "center",
      render: (_, x) => (
        <>
          <Button
            icon={<BiEdit />}
            onClick={() => handleEdit(x)}
            style={{ width: "100%", border: "none" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  let columns = baseColumns;

  const handlePrint = () => {
    setShowModal(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    const departmentNames = {
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
      12: "COTTON_BUDS",
      13: "MARKETING",
    };

    const departmentName = departmentNames[departmentId];
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });
        if (res.data && res.data.length !== 0) {
          setReason(true);
        } else {
          setReason(false);
        }
        setGetData(res.data);
        let filteredData = res.data;
        if (
          parseInt(departmentId) === 6 &&
          (userRole === "QA_MANAGER" || userRole === "ROLE_MR")
        ) {
          filteredData = res.data;
        } else if (departmentName) {
          filteredData = res.data.filter(
            (x) => x.department === departmentName
          );
        }

        if (Array.isArray(filteredData)) {
          setSummary(
            filteredData.map((x, index) => ({
              // Handle potential null or undefined values
              date: x.dateOfIniation,
              deviationNumber: x.deviationNumber,
              initiatingDepartment: x.initiatingDepartment,
              department: x.department,
              sup_status: x.sec1SupervisorStatus,
              hod_status: x.receiverstatus,
              shift: x.shift,
              orderNo: x.orderNo,
              op_status: x.operator_status,
              reason: x.reason,
              index: x.index,
            }))
          );
        } else {
          setSummary([]);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
        navigate("/Precot/QA/F-048/Summary");
      }
    };

    const summaryUrl = `${API.prodUrl}/Precot/api/QA/Service/deviationForm/getDeviationFormSummary`;

    fetchSummary(summaryUrl);
  }, []);

  useEffect(() => {
    if (departmentId) {
      setDepartment(departmentMap[departmentId] || "");
    }
  }, [departmentId]);

  const selectedDepartmentchange = (value) => {
    setSelectedDepartment(value);
    fetchDeviationNo(value);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };
  const handleEdit = (x) => {
    navigate("/Precot/QA/F-048", {
      state: {
        date: x.date,
        deviationNo: x.deviationNumber,
        department: x.department,
      },
    });
  };

  const departmantLOV = [
    "BLEACHING",
    "SPUNLACE",
    "PAD_PUNCHING",
    "DRY_GOODS",
    "QUALITY_CONTROL",
    "QUALITY_ASSURANCE",
    "PPC",
    "STORE",
    "DISPATCH",
    "PRODUCT_DEVELOPMENT",
    "ENGINEERING",
    "COTTON_BUDS",
    "MARKETING",
  ];

  const printSubmit = () => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const selectedMonthFromDate = dateObj.getMonth() + 1;
      const selectedYearFromDate = dateObj.getFullYear();
      if (
        selectedMonth &&
        selectedYear &&
        (selectedMonthFromDate !== Number(selectedMonth) ||
          selectedYearFromDate !== Number(selectedYear))
      ) {
        message.error(
          "The selected date does not match the selected month and year."
        );
        setSelectedMonth("");
        setSelectedYear("");
        form.resetFields();
        return;
      }
    }
    fetchData();
  };

  const fetchData = () => {
    let baseUrl = `${API.prodUrl}/Precot/api/QA/Service/deviationForm/print?year=${selectedYear}&month=${selectedMonth}&dateOfIniation=${selectedDate}&deviationNumber=${selectedDeviationNo}`;
    let query = [];

    let finalUrl = baseUrl + query.join("&");

    const token = localStorage.getItem("token");
    axios
      .get(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintResponseData(response.data);
          setPrintLoading(true);

          setTimeout(() => {
            window.print(); // Proceed with printing
            handleModalClose(); // Close the modal after printing
          }, 3000);
        } else {
          setPrintResponseData([]); // Ensure printData is always an array
          setPrintLoading(false);
          message.error(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose(); // Close modal if no details found
        }
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec1SupervisorSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
          .catch((err) => {
            console.error("Error in fetching assistant image:", err);
          });

        // Fetch image for QC
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec1HodDesigneeSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage1(url); // Store QC image URL
          })
          .catch((err) => {
            console.error("Error in fetching QC image:", err);
          });

        // Fetch image for QA
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec1QaManagerMrReviewSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage2(url); // Store QA image URL
          })
          .catch((err) => {
            console.error("Error in fetching QA image:", err);
          });
        // Fetch image for PPC
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec1QaManagerMrInvgSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage3(url); // Store PPC image URL
          })
          .catch((err) => {
            console.error("Error in fetching PPC image:", err);
          });

        // Fetch image for Bleaching
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec2SupervisorSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage4(url); // Store Bleaching image URL
          })
          .catch((err) => {
            console.error("Error in fetching Bleaching image:", err);
          });

        // Fetch image for Spunlace
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec2HodDesigneeSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage5(url); // Store Spunlace image URL
          })
          .catch((err) => {
            console.error("Error in fetching Spunlace image:", err);
          });

        // Fetch image for Pad Punching
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec2QaManagerMrSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage6(url); // Store Pad Punching image URL
          })
          .catch((err) => {
            console.error("Error in fetching Pad Punching image:", err);
          });

        // Fetch image for Dry Goods
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec3SupervisorSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage7(url); // Store Dry Goods image URL
          })
          .catch((err) => {
            console.error("Error in fetching Dry Goods image:", err);
          });

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec3HodDesigneeSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage8(url); // Store Dry Goods image URL
          })
          .catch((err) => {
            console.error("Error in fetching Dry Goods image:", err);
          });
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.sec3QaManagerMrSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage9(url); // Store Dry Goods image URL
          })
          .catch((err) => {
            console.error("Error in fetching Dry Goods image:", err);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
        setPrintLoading(false);
      })
      .finally(() => {
        setPrintLoading(false);
      });
  };

  const [deviationNos, setDeviationNos] = useState([]);
  const [selectedDeviationNo, setSelectedDeviationNo] = useState("");

  useEffect(() => {
    if (selectedDepartment) {
      fetchDeviationNo(selectedDepartment);
    } else {
      setDeviationNos([]); // Clear BIS numbers if no department is selected
    }
  }, [selectedDepartment]);

  const fetchDeviationNo = async (department) => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/QA/Service/deviationForm/getDeviationNumberByDepartment?department=${department}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.length > 0) {
        setDeviationNos(data);
      } else {
        setDeviationNos([]);
        message.warning("No BIS Numbers available for this department.");
      }
    } catch (error) {
      console.error("Error fetching BIS numbers:", error);
      message.error("Failed to fetch BIS numbers.");
    }
  };

  const CreateNo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select date");
      return;
    } else {
      Nogeneration();
    }
  };

  const Nogeneration = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/number/generationbasedDpt?formNumber=PH- QAD01/F-048&department=${department}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setDeviationNo(response.data.message);
      navigate("/Precot/QA/F-048", {
        state: {
          date: date,
          department: department,
          deviationNo: response.data.message,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div id="section-to-print">
        {printResponseData?.map((data, index) => (
          <table style={{ marginTop: "30px", scale: "95%" }}>
            <thead>
              <tr style={{ border: "none" }}>
                <td
                  style={{ border: "none", padding: "5px" }}
                  colSpan="15"
                ></td>
              </tr>

              <tr style={{ height: "20px" }}>
                <td
                  colSpan="2"
                  rowSpan="4"
                  style={{ textAlign: "center", width: "10%" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "80px", height: "auto" }}
                  />
                  <br />
                  <b style={{ fontFamily: "Times New Roman, Times, serif" }}>
                    Unit H
                  </b>
                </td>
                <td rowSpan="4" colSpan="4" style={{ textAlign: "center" }}>
                  <b>Deviation Form </b>{" "}
                </td>
                <td colSpan="1">Format No.:</td>
                <td colSpan="1">PH-QAD01/F-048</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Revision No.:</td>
                <td colSpan="1">01</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Ref.SOP No.:</td>
                <td colSpan="1">PH-QAD01-D-44</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Page No.:</td>
                <td colSpan="1">
                  {index + 1} of {printResponseData.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }}></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td colSpan={1}>
                  Date of <br />
                  Initiation:{" "}
                </td>
                <td colSpan={2}>{formatDates(data.dateOfInitiation)}</td>
                <td colSpan={1}>
                  Initiating <br />
                  Department:{" "}
                </td>
                <td colSpan={2}>{data.department}</td>
                <td colSpan={1}>
                  Deviation <br />
                  Number:{" "}
                </td>
                <td colSpan={2}>{data.deviationNumber}</td>
              </tr>
              <tr>
                <td colSpan={9}>Description of Deviation: </td>
              </tr>
              <tr>
                <td colSpan={9}>{data.descriptionOfDeviation} </td>
              </tr>
              <tr>
                <td colSpan={9}>Impact Assessment: </td>
              </tr>
              <tr>
                <td colSpan={9}> {data.impactAssessment}</td>
              </tr>
              <tr>
                <td colSpan={9}>Immediate action taken: </td>
              </tr>
              <tr>
                <td colSpan={9}> {data.immediateActionTaken}</td>
              </tr>
              <tr>
                <td colSpan={4}>
                  Deviation Initiator Name:{" "}
                  {getImage && (
                    <img className="signature" src={getImage} alt="logo" />
                  )}
                  <br /> {data.sec1SupervisorSign} <br /> Sign & date:{" "}
                  {formatDates(data.sec1SupervisorSubmitOn)}
                </td>
                <td colSpan={5}>QA Review Comments: {data.qaReviewComments}</td>
              </tr>
              <tr>
                <td colSpan={4}>
                  Reviewed By (Res. Dept., HOD/Designee) <br /> Name:{" "}
                  {getImage1 && (
                    <img className="signature" src={getImage1} alt="logo" />
                  )}
                  <br /> {data.sec1HodDesigneeSign} <br /> Sign & date:{" "}
                  {formatDates(data.sec1HodDesigneeSubmitOn)}
                </td>
                <td colSpan={5}>
                  Approved By (QA Manager/MR) Name:
                  {getImage2 && (
                    <img className="signature" src={getImage2} alt="logo" />
                  )}
                  <br /> {data.sec1QaManagerMrReviewSign}
                  <br />
                  Sign & date: {formatDates(data.sec1QaManagerMrReviewSubmitOn)}
                </td>
              </tr>
              <tr>
                <td colSpan={9}>Investigation:</td>
              </tr>
              <tr>
                <td colSpan={9}> {data.investigation} </td>
              </tr>
              <tr>
                <td colSpan={9}>
                  QA Assessment: Classification of Deviation filled by QA:
                </td>
              </tr>
              <tr>
                <td colSpan={9}> {data.qaAssessment} </td>
              </tr>
              <tr>
                <td colSpan={9}>
                  QA Manager/MR:
                  {getImage3 && (
                    <img className="signature" src={getImage3} alt="logo" />
                  )}
                  <br /> {data.sec1QaManagerMrInvgSign}
                  <br />
                  Sign & Date: {formatDates(data.sec1QaManagerMrInvgSubmitOn)}
                </td>
              </tr>
              <tr>
                <td colSpan={9}>CAPA: </td>
              </tr>
              <tr>
                <td colSpan={9}> {data.capa} </td>
              </tr>
              <tr>
                <td colSpan={9}>
                  {" "}
                  Deviation closure date extension request (If Any):{" "}
                  {data.closureDateExtentionRequest} <br />
                  Date of Request: {data.dateOfRequest}
                  <br />
                  Justification for extension of date:{" "}
                  {data.justificationOfRequest}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  Requested by <br />
                  (Initiating department) <br />
                  Name:{" "}
                  {getImage4 && (
                    <img className="signature" src={getImage4} alt="logo" />
                  )}
                  <br /> {data.sec2SupervisorSign} <br />
                  Sign & date: {formatDates(data.sec2SupervisorSubmitOn)}{" "}
                </td>
                <td colSpan={3}>
                  Reviewed by (HOD of Initiator department):
                  <br />
                  Name:{" "}
                  {getImage5 && (
                    <img className="signature" src={getImage5} alt="logo" />
                  )}
                  <br /> {data.sec2HodDesigneeSign} <br />
                  Sign & date: {formatDates(data.sec2HodDesigneeSubmitOn)}{" "}
                </td>
                <td colSpan={3}>
                  Approved by (QA Manager/MR) <br />
                  Name:
                  {getImage6 && (
                    <img className="signature" src={getImage6} alt="logo" />
                  )}
                  <br /> {data.sec2QaManagerMrSign} <br />
                  Sign & date: {formatDates(data.sec2QaManagerMrSubmitOn)}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan={9}>Attachments / Supporting documents: </td>
              </tr>
              <tr>
                <td colSpan={9}> {data.attachmentsSupportingDocs} </td>
              </tr>
              <tr>
                <td colSpan={9}>Closure of Deviation: </td>
              </tr>
              <tr>
                <td colSpan={9}> {data.closureOfDeviation} </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  Initiator Name:{" "}
                  {getImage7 && (
                    <img className="signature" src={getImage7} alt="logo" />
                  )}
                  <br /> {data.sec3SupervisorSign}
                  <br /> Sign & date: {formatDates(data.sec3SupervisorSubmitOn)}
                </td>
                <td colSpan={5}>
                  Reviewed By (HOD/Designee) Name:
                  {getImage8 && (
                    <img className="signature" src={getImage8} alt="logo" />
                  )}
                  <br /> {data.sec3HodDesigneeSign} <br />
                  Sign & date: {formatDates(data.sec3HodDesigneeSubmitOn)}
                </td>
              </tr>
              <tr>
                <td colSpan={9}> Final Approval of Closure of Deviation: </td>
              </tr>
              <tr>
                <td colSpan={9}> {data.finalApprovalOfClosure}</td>
              </tr>
              <tr>
                <td colSpan={9}>
                  Approved by (QA Manager/MR) Name:{" "}
                  {getImage8 && (
                    <img className="signature" src={getImage8} alt="logo" />
                  )}
                  <br /> {data.sec3QaManagerMrSign}
                  <br />
                  Sign & date: {formatDates(data.sec3QaManagerMrSubmitOn)}
                </td>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <br />
              <tr style={{ height: "30px" }}>
                <td colSpan={3}>Particulars</td>
                <td colSpan={2}>Prepared by</td>
                <td colSpan={2}>Reviewed by</td>
                <td colSpan={2}>Approved by</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={3}>Name</td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={3}>Signature & Date</td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="DEVIATION FORM"
        formatNo="PH- QAD01/F-048"
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
            onClick={handlePrint}
            icon={<FaPrint color="#00308F" />}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
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
      <div style={{ paddingBottom: "2em" }}></div>

      {/* header code above */}
      <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "25px",
          }}
        >
          <Form.Item label="Date">
            <Input
              type="date"
              value={date}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Item>

          <Form.Item label=" Department Name:">
            <Select
              showSearch
              value={department}
              onChange={(e) => setDepartment(e)}
              style={{ width: "100%" }}
              placeholder="Search Batch No"
              optionFilterProp="children"
              disabled
            >
              <Select.Option value="" disabled selected>
                Department Name:
              </Select.Option>
              {departmantLOV.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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
        </Form>
      </Row>
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={summary}
        />
      </div>
      <Modal
        title="Print"
        open={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printSubmit}
            disabled={
              !selectedDepartment &&
              !selectedDate &&
              (!selectedMonth || !selectedYear)
            }
            loading={printLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label=" Department Name:">
            <Select
              showSearch
              value={selectedDepartment}
              onChange={selectedDepartmentchange}
              style={{ width: "100%" }}
              placeholder="Search Batch No"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Department Name:
              </Select.Option>
              {departmantLOV.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Deviation No." required>
            <Select
              value={selectedDeviationNo}
              onChange={setSelectedDeviationNo}
              placeholder="Select Deviation No."
              style={{ width: "100%" }}
              disabled={!selectedDepartment}
            >
              {deviationNos.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Select Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
            validateStatus={selectedDate ? "success" : ""}
          >
            <Input
              type="date"
              max={today}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="month"
            label="Select Month"
            rules={[{ required: true, message: "Please select a month" }]}
          >
            <Select
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              onChange={(value) => setSelectedMonth(value)}
              placeholder="Select Month"
            >
              <Select.Option value="" disabled selected hidden>
                Select Month
              </Select.Option>
              {months.map((month) => (
                <Select.Option key={month.value} value={month.value}>
                  {month.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="year"
            label="Select Year"
            rules={[{ required: true, message: "Please select a year" }]}
          >
            <Select
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
                marginBottom: "10%",
              }}
              onChange={(value) => {
                setSelectedYear(value);
              }}
              placeholder="Select Year"
            >
              <Select.Option value="" disabled selected hidden>
                Select Year
              </Select.Option>
              {years.map((year) => (
                <Select.Option key={year.value} value={year.value}>
                  {year.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default QA_F048_Summary;
