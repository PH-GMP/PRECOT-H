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
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f39_summary = () => { 
  const token = localStorage.getItem("token"); 
  const [open, setOpen] = useState(false);
  const [ContaminationData, setContaminationData] = useState([]); 
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [datePrint, setDatePrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null); 
  const [reason, setReason] = useState(false);
  const [stoppagedata, setstoppagedata] = useState("");
  const [cirno, setcirno] = useState("");
  const [dep, set_dep] = useState("");
  const [cakingData, setCakingData] = useState([]);
  const [batchNolistValue, setBatchNolistValue] = useState("Machine   Name"); // State for the value
  const [batchNolistLabel, setBatchNolistLabel] = useState(""); // State for the label
  const [batchNolistValue2, setBatchNolistValue2] = useState("Machine   Name"); // State for the value
  const [batchNolistLabel2, setBatchNolistLabel2] = useState(""); // State for the label
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [getImage4, setGetImage4] = useState("");
  const [qa_date, set_qa_date] = useState("");
  const [securitydate, setsecuritydate] = useState("");
  const [dispatch_supervisor_submit_on, setdispatch_supervisor_submit_on] =
    useState("");
  const [qa_manager, setqa_manager] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const { Option } = Select;
  const [availableshift2, setAvailableShifts2] = useState([]); 
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [availableshiftlov2, setAvailableShiftslov2] = useState("Select Shift");
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const machineNameLov = [
    { value: "BL1", label: "TEXCOR" },
    { value: "BL2", label: "LINK" },
  ]; 
  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift; // Return the original value if it doesn't match any case
    }
  };
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
          setGetImage1(url);
        })
        .catch((err) => {
           
        });
    }
  }, [printResponseData, API.prodUrl, token]);
 
  const roleBase = localStorage.getItem("role");

  const fetchDataCIRno = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/api/getContainerInspectionReportCirLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => { 
          const shifts = res.data.map((shift) => shift.CIR_NO);

          setAvailableShifts2(shifts);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
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
          setGetImage2(url);
        })
        .catch((err) => {
          
        });
    }
  }, [printResponseData, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.operator_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {
          
        });
    }
  }, [printResponseData, API.prodUrl, token]);
  const handleChange_bmr = (value) => {
    const departmentString = value.join(", "); // Convert array to comma-separated string
    set_dep(departmentString); // Update state with the string
  };
  const formattedDate_hod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
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
    setIsFetchSuccessful(false);
    setDatePrint(null);
    setAvailableShiftslov2(null);
    setBatchNolistValue2(null);
    //
  };
  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
    setAvailableShiftslov2(null);
    setBatchNolistValue2(null);
  };
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);  

  
  //   handle edit
  const handleEdit = (record) => { 
    navigate("/Precot/QA/F-39", {
      state: {
        date: record.date,
        cir: record.cirNo,
        departments: record.department,
      },
    });
    //
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    //
  };
  useEffect(() => {
    if (token) {
      fetchData();
      fetchDataCIRno();
    }
  }, [token]);

  //   summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/QA/Service/api/getContainerInspectionReportSummary`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "ROLE_OPERATOR" ||
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_HOD"
      ) { 
      }
 
      if (data && data?.length >= 0) {
        setContaminationData(data);
      } else {
        message.error(data?.message); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.data?.message);
    } finally {
    }
  };
  const fetchCrno = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/qa/number/generation?formNumber=PH-QAD01-F-039`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => { 

          setcirno(res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  //   summary table Get api

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
      render: (text, record, index) => index + 1,
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
      title: "QA Inspectors Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      align: "center",
    },
    {
      title: "Dispatch Supervisor Status",
      dataIndex: "dispatch_supervisor_status",
      key: "dispatch_supervisor_status",
      align: "center",
    },
    {
      title: "Security Status",
      dataIndex: "security_status",
      key: "security_status",
      align: "center",
    },

    {
      title: "QA_MR Status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      render: (text) => (
        <div style={{ padding: "8px", textAlign: "center" }}>{text}</div>
      ),
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
            style={{ width: "100%", textAlign: "center" }} 
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

  const printSubmit = () => {
    updatePageNumbers();
    window.print();
  };
  const fetchPrintValue = (value) => {
    setAvailableShiftslov2(value);
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/api/getContainerInspectionReportPrint?date=${datePrint}&cirNo=${value}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data?.message !== "No data") {
            const printResponseData = res.data[0];
            setPrintResponseData(printResponseData);
            message.success("Data Fetched Successfully"); 
            setIsFetchSuccessful(true); 
            if (res.data[0]?.qa_inspector_submit_on) {
              const dateformat_qa = moment(
                res.data[0]?.qa_inspector_submit_on
              ).format("DD/MM/YYYY HH:mm");
              set_qa_date(dateformat_qa);
            } else {
              set_qa_date("");
            }
            if (res.data[0]?.security_submit_on) {
              const dateformat_security = moment(
                res.data[0]?.security_submit_on
              ).format("DD/MM/YYYY HH:mm");
              setsecuritydate(dateformat_security);
            } else {
              setsecuritydate("");
            }
            if (res.data[0]?.dispatch_supervisor_submit_on) {
              const dateformat_dispatch = moment(
                res.data[0]?.dispatch_supervisor_submit_on
              ).format("DD/MM/YYYY HH:mm");
              setdispatch_supervisor_submit_on(dateformat_dispatch);
            } else {
              setdispatch_supervisor_submit_on("");
            }
            if (res.data[0]?.qa_mr_submit_on) {
              const dateformat_qa = moment(res.data[0]?.qa_mr_submit_on).format(
                "DD/MM/YYYY HH:mm"
              );
              setqa_manager(dateformat_qa);
            } else {
              setqa_manager("");
            } 
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.qa_inspector_sign}`,
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
              .catch((err) => {
                //
              });

            //getimage2 ->security
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.security_sign}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                }
              )
              .then((res) => {
                //
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
                //
              });
            //getimage2 ->dispatch_supervisor
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.dispatch_supervisor_sign}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                }
              )
              .then((res) => {
                //
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
                const url = `data:image/jpeg;base64,${base64}`;
                setGetImage3(url);
              })
              .catch((err) => {
                //
              });

            //getimage2 ->QA_manager
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.qa_mr_sign}`,
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
                setGetImage4(url);
              })
              .catch((err) => {
               
              });
          } else {
           
            setPrintResponseData([]);
            message.error("No data found...!");

            setIsFetchSuccessful(false);
            setShowModal(false);
            return;
          }
        })
        .catch((err) => {
         
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };
 
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    if (dep == "" || dep == null) {
      message.warning("Please Select Department");
      return;
    }
    navigate("/Precot/QA/F-39", {
      state: {
        date: date,
        cir: cirno,
        departments: dep,
      },
    });
    //
  };
  function updatePageNumbers() {
    const pageNumberElements = document.querySelectorAll(".page-number");
    const pageElements = document.querySelectorAll(".page");

    pageNumberElements.forEach((pageNumberElement, index) => {
      pageNumberElement.textContent = `Page ${index + 1} of ${
        pageElements.length
      }`;
    });
  }

  return (
    // print section
    <div>
      <div id="section-to-print">
        <table style={{ marginTop: "10px", scale: "94%" }}>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
            <tr>
              <td colSpan="5" rowspan="4 " style={{ textAlign: "center" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <br></br>
                Unit H
              </td>
              <th colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                CONTAINER INSPECTION REPORT{" "}
              </th>
              <td colSpan="10">Format No.:</td>
              <td colSpan="20">PH-QAD01-F-039</td>
            </tr>
            <tr>
              <td colSpan="10">Revision No.:</td>
              <td colSpan="20">03</td>
            </tr>
            <td colSpan="10">Ref. SOP No.:</td>
            <td colSpan="20">PH-QAD01-D-35</td>
            <tr>
              <td colSpan="10">Page No.:</td>
              <td colSpan="20">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead>
          <br />
          <tbody>
            <tr>
              <td colSpan="70">CIR No. :{printResponseData?.cirNo}</td>
              <td colSpan="30">
                Date:{moment(printResponseData?.date).format("DD/MM/YYYY")}
              </td>
            </tr>
            <tr>
              <td colSpan="60" rowSpan="7">
                Product Description & Quantity :
                <div
                  style={{
                    height: "180px",
                    lineHeight: "180px",
                    textAlign: "left",
                  }}
                >
                  {printResponseData?.productDescription}
                </div>
              </td>
              <td colSpan="40">Customer : {printResponseData?.customer}</td>
            </tr>
            <tr>
              <td colSpan="40">
                Container No.: {printResponseData?.containerNO}
              </td>
            </tr>
            <tr>
              <td colSpan="40">Lot No.: {printResponseData?.lotNo}</td>
            </tr>
            <tr>
              <td colSpan="40">Invoice No.: {printResponseData?.invoiceNo}</td>
            </tr>
            <tr>
              <td colSpan="40" style={{ width: "100", padding: "0px" }}>
                <table style={{ width: "100", padding: "0px" }}>
                  <tr>
                    <td
                      rowSpan="2"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-lr",
                        textAlign: "center",
                      }}
                    >
                      Seal
                    </td>
                    <td colSpan="2">
                      One Time Lock (OTL) No. :{" "}
                      {printResponseData?.sealOneTimeLockNo}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      Stemer Seal No. :{printResponseData?.sealSteamerSealNo}{" "}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="40">
                High Security Seal : {printResponseData?.highSecuritySeal}
              </td>
            </tr>
            <tr>
              <td colSpan="40">
                Seal Affixed Properly Verified :{" "}
                {printResponseData?.sealAffixPropertyVerified}
              </td>
            </tr>
            <tr>
              <td colSpan="100" style={{ textAlign: "center" }}>
                17 POINTS CONTAINER INSPECTION REVIEW
              </td>
            </tr>

            <tr>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check Point No.
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check Points
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Observation
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check Point No.
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check Points
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Observation
              </th>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                01
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Bumper
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.bumper}{" "}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                10
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Outside / Under Carriage
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.outsideUnderCarriage}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                02
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Engine
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.engine}{" "}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                11
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Outside / Inside Doors
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.outsideInsideDoors}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                03
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Tyre
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.tyre}{" "}
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                12
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                InsideFloor
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.insideFloor}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                04
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Truck Floor
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.truckFloor}{" "}
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                13
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Side (Left & Right) Walls{" "}
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.sideWalls}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                05
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Fuel Tank
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.fuelTank}{" "}
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                14
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Front Walls{" "}
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.frontWalls}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                06
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Cab/Storage Compartment
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.cabSotrageCompartment}{" "}
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                15
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Ceiling / Roof{" "}
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.ceilingRoof}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                07
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Air Tanks
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.airTanks}
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                16
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Refrigeration Unit
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.refrigerationUnit}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                08
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Drive Shafts
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.driveShafts}
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                17
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Exhaust{" "}
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.exhaust}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                09
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Fifth Wheel
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.fifthWheel}
              </td>
              <td
                colSpan="15"
                style={{ textAlign: "center", color: "#ffff" }}
              ></td>
              <td
                colSpan="15"
                style={{ textAlign: "center", color: "#ffff" }}
              ></td>
              <td
                colSpan="20"
                style={{ textAlign: "center", color: "#ffff" }}
              ></td>
            </tr>
            <br />

            <tr>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Sr No.
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check List
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Result
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Sr No.
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check List
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Result
              </th>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                01
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Condition of container
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.conditionOfContainer}{" "}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Department having any stuffing plan
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.departmentHavingAnyStuffingPlan}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                a
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Roof free from damages & holes
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.roofFreeFromDamagesHoles}{" "}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                a
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Stuffed as per plan.
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.stuffedAsPerPlan}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                b
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                All the sides free from damages & hole
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.allTheSidesFreeFromDamagesHoles}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                b
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                No. of packages stuffed as per plan
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.noOfPackagesStuffed}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                C
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Free from Joint Gaps
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.freeFromJointGraps}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                4 a
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Department having copy of contract
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.departmentHavingCopyOfContract}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                d
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Free from rust
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.freeFromRust}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                b
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Stuffing is carried out as per instructions?
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.stuffingIsCarriedOutAsPerInstruction}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                e
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Properly painted
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.properlyPainted}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                c
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Is there any special instruction?
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.isThereAnySpecialInstruction}
              </td>
            </tr>
            <br />
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                f
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Over all good condition
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.overallGoodCondition}{" "}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                d
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Is the stuffing is done as per special instruction?
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {
                  printResponseData?.isTheStuffingIsDoneAsPerSpecialInstruction
                }{" "}
              </td>
            </tr>

            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                g
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Free from stains / dirt
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.freeFromStaindirt}{" "}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                5 a
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Is polythene sheet used for floor covering?
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.isPolytheneSheetUsedForFloorCovering}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                h
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Properly Cleaned
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.properlyCleaned}{" "}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                b
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Is polythene clean?
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.isPolytheneClean}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                i
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Free from any unwanted smell
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.freeFromAnyUnwantedSmell}{" "}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                6
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                All the packages properly identified.
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.allThePackagesProperlyIdentified}
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Fumigation done ?
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {printResponseData?.famigationDone}
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                7
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Any other Special requirements?
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.anyOtherSpecialRequriement}{" "}
              </td>
            </tr>
            <br />
            <tr>
              <td colSpan="100" style={{ textAlign: "left" }}>
                Remarks:{printResponseData?.remarks}
              </td>
            </tr>
            <tr>
              <th colSpan="10" style={{ textAlign: "center" }}>
                {" "}
                S.No.
              </th>
              <th colSpan="90" style={{ textAlign: "center" }}>
                BMR
              </th>
            </tr>
            {printResponseData?.details?.length > 0 ? (
              printResponseData.details.map((item, index) => (
                <tr key={item.id}>
                  {
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {" "}
                      {index + 1}
                    </td>
                  }
                  {
                    <td colSpan="90" style={{ textAlign: "center" }}>
                      {item.bmr}
                    </td>
                  }
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%">No data available</td>
              </tr>
            )}
            <br />
            <tr>
              <td colSpan="33" style={{ borderBottom: "1px solid #ffff" }}></td>
              <td colSpan="34" style={{ padding: "10px" }}>
                Description
              </td>
              <td colSpan="33" style={{ padding: "10px" }}>
                Sign & Date
              </td>
            </tr>
            <tr>
              <td rowspan="4" colSpan="33" style={{ padding: "10px" }}>
                Final Conclusion:{printResponseData?.finalConclusion}
              </td>

              <td colSpan="34" style={{ padding: "10px" }}>
                Container Checked by (Security) :
              </td>
              <td colSpan="33" style={{ padding: "10px" }}>
                {printResponseData?.security_sign}
                {securitydate}
                <div>
                  {getImage2 && (
                    <img
                      src={getImage2}
                      alt="QA Sign"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "20px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        justifyContent: "space-evenly",
                      }}
                    />
                  )}
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="34" style={{ padding: "10px" }}>
                Reviewed by (Container & Seal - Dispatch) :
              </td>
              <td colSpan="33" style={{ padding: "10px" }}>
                {printResponseData?.dispatch_supervisor_sign}
                {dispatch_supervisor_submit_on}
                <div>
                  {getImage3 && (
                    <img
                      src={getImage3}
                      alt="QA Sign"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "20px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        justifyContent: "space-evenly",
                      }}
                    />
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="34" style={{ padding: "10px" }}>
                Inspected by (QA Inspector) :
              </td>
              <td colSpan="33" style={{ padding: "10px" }}>
                {printResponseData?.qa_inspector_sign}
                <div>
                  {getImage1 && (
                    <img
                      src={getImage1}
                      alt="QA Sign"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "20px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        justifyContent: "space-evenly",
                      }}
                    />
                  )}
                </div>
                {qa_date}
              </td>
            </tr>
            <tr>
              <td colSpan="34" style={{ padding: "10px" }}>
                Approved by (Manager QA/Designee) :
              </td>
              <td colSpan="33" style={{ padding: "10px" }}>
                {printResponseData?.qa_mr_sign}
                {qa_manager}
                <div>
                  {getImage4 && (
                    <img
                      src={getImage4}
                      alt="QA Sign"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginLeft: "20px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        justifyContent: "space-evenly",
                      }}
                    />
                  )}
                </div>
              </td>
            </tr>

            <br />
          </tbody>
          <br />
          <tfoot>
            <tr>
              <th colSpan="25">Particular</th>
              <th colSpan="25" style={{ textAlign: "center" }}>
                Prepared by
              </th>
              <th colSpan="25" style={{ textAlign: "center" }}>
                Reviewed by
              </th>
              <th colSpan="25" style={{ textAlign: "center" }}>
                Approved by
              </th>
            </tr>
            <tr>
              <th colSpan="25">Name</th>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
            </tr>
            <tr>
              <th colSpan="25">Signature & Date</th>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
            </tr>
          </tfoot>
        </table>
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
          formName="CONTAINER INSPECTION REPORT"
          formatNo="PH-QAD01-F-039"
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
        {roleBase === "ROLE_QA" && (
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
                size="small"
                max={getCurrentDate()}
                onBlur={fetchCrno}
                style={{ width: "100%", height: "30px" }}
              />
            </Col>

            <Col>
              <label>Department :</label>
            </Col>
            <Col>
              <Select
                mode="multiple"
                placeholder="Select Department"
                style={{ width: 200 }}
                onChange={handleChange_bmr}
              >
                <Option value="bleaching">BLEACHING</Option>
                <Option value="padpunching">PAD_PUNCHING</Option>
                <Option value="drygoods">DRY_GOODS</Option>
                <Option value="spunlace">SPUNLACE</Option>
                <Option value="buds">COTTON_BUDS</Option>
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
        )}
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
            disabled={!isFetchSuccessful}
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
            Date:
          </label>
          <Input
            type="date"
            value={datePrint}
            onChange={(e) => setDatePrint(e.target.value)}
            size="small" 
            style={{ width: "50%", height: "30px" }}
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
            CIR NO:
          </label>
          <Select
            style={{
              width: "50%",
              height: "30x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select CIR No"
            value={availableshiftlov2}
            onChange={fetchPrintValue}
          >
            {availableshift2.map((shiftvalue, index) => (
              <Option key={index} value={shiftvalue}>
                {shiftvalue}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QA_f39_summary;
