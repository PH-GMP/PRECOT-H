/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Menu,
  Row,
  Select,
  Table,
  Tooltip,
  Modal,
  notification,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import "./AppliedContamination.css";
import "./barkavi.css";
import "./Saishiva.css";
import "./Santhosh.css";
import useMessage from "antd/es/message/useMessage";
import { GoArrowLeft } from "react-icons/go";
import moment from 'moment';
import logo from "../Assests/logo.png";

const Bleaching_f04_summary = () => {
  const [role, setRole] = useState("");
  const [reason,setReason] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [summary, setSummary] = useState([]);
  const [initialDate, setInitialDate] = useState("");
  const [bmrList, setBmrList] = useState([]);
  const [bmrListNew, setBmrListNew] = useState([]);
  const [bmrListPrint, setBmrListPrint] = useState([]);
  const [bmr, setBmr] = useState("");
  const navigate = useNavigate();
  const message = useMessage();
  const [messageApi, contextHolder] = message;
  const [showModal, setShowModal] = useState(false);
  const [PrintValue, setPrintValue] = useState(null);
  const [printResponseData, setPrintResponseData] = useState(null);
  const formattedDate = () => {
    if (printResponseData?.[0]?.hod_submit_on) {
      const date = moment(printResponseData?.[0]?.hod_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };
  const formattedDatesupervisor = () => {
    if ( printResponseData?.[0]?.supervisor_submit_on) {
      const date = moment( printResponseData?.[0]?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };

  const token = localStorage.getItem("token");
  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  
  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData?.[0]?.supervisor_sign,API.prodUrl, token]);


  useEffect(() => {
    //Filtered API Response
    axios
        .get(
          `${API.prodUrl}/Precot/api/bleaching/summary/fetchApprovedBMR?formNumber=PRD01/F04`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            }
          }
        )
        .then((res) => {
          console.log("Response:c", res.data);
         const a = res.data.map((x,i) =>{
          return {
            label:x.value,
            value:x.value
          }
         })
          
         console.log("AAAA",a)

         setBmrListNew(a)
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
  },[])

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.hod_sign;
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
  }, [printResponseData?.[0]?.hod_sign,API.prodUrl, token]);
  
  const handleModalClose = () => {
    setShowModal(false);
    setPrintValue(null);
  };
  const printDateSubmit = () => {
    window.print();
  };
  useEffect(() => {
    setInitialDate(new Date().toISOString().substring(0, 10));
    const x = localStorage.getItem("role");
    setRole(x);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .get(`${API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`, {
        headers,
      })
      .then((res) => {
        // console.log("BMRLOV", res.data);
        const a = res.data.map((x, i) => {
          return {
            value: x.BMR_NO,
            label: x.BMR_NO,
          };
        });
        // console.log("aa", a);
        setBmrList(a);
      })
      .catch((err) => {
        // console.log("Error", err);
      });

    if (localStorage.getItem("role") == "ROLE_SUPERVISOR") {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(`${API.prodUrl}/Precot/api/bleaching/Service/getSupervisorSummeryF04`, {
          headers,
        })
        .then((res) => {
          // console.log("post", res.data);
          const a = res.data.map((x, i) => {
            return {
              bmrno: x.bmrNumber,
              date: x.date,
              mail_status: x.mail_status,
              sup_status: x.supervisor_status,
              hod_status: x.hod_status,
              reason:x.reason
            };
          });
          // console.log("aaa", a);
          setSummary(a);
        })
        .catch((err) => {
          // console.log("Error", err);
        });
    } else if (
      localStorage.getItem("role") == "ROLE_HOD" ||
      localStorage.getItem("role") == "ROLE_DESIGNEE"
    ) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(`${API.prodUrl}/Precot/api/bleaching/Service/getHodSummeryF04`, {
          headers,
        })
        .then((res) => {
          // console.log("post", res.data);
          const a = res.data.map((x, i) => {
            return {
              bmrno: x.bmrNumber,
              date: x.date,
              mail_status: x.mail_status,
              sup_status: x.supervisor_status,
              hod_status: x.hod_status,
              reason:x.reason
            };
          });
          // console.log("aaa", a);
          setSummary(a);
        })
        .catch((err) => {
          // console.log("Error", err);
        });
    }
  }, []);

  useEffect(() => { 
    const findReason = () => {
      for (const data of summary) {
          if (data.hod_status == "HOD_REJECTED") {
              setReason(true);
              break;
          }
      }
    };
    findReason();
  }, [summary]);

  useEffect(() => {
    const fetchBmrOptionsPrint = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/bleaching/summary/allBmrAndLaydownLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        // console.log(data);

        if (Array.isArray(data)) {
          // Extract the bmr_no values into a separate array
          const bmrOptions = data.map((item) => ({
            value: item.bmr_no,
            label: item.bmr_no,
          }));
          setBmrListPrint(bmrOptions);
        } else {
          console.error("API response is not an array", data);
          setBmrListPrint([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setBmrListPrint([]);
      }
    };

    fetchBmrOptionsPrint();
  }, []);

  const handleDatePrintChange = (value) => {
    setPrintValue(value);
    axios
      .get(`${API.prodUrl}/Precot/api/bleaching/Service/getBmrDetailsF04?bmr=${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setPrintResponseData(res.data);
          // console.log("print response", printResponseData);
          // setPrintValue(value);
        } else {
          setPrintResponseData([]);
          message.error("no data found...!");
        }
      })
      .catch((err) => {
        setPrintResponseData([]);
        // console.log("Error", err);
        notification.warning({
          message: "Notification",
          description: err.response.data.message,
        });
      });
  };

  const handleEdit = (x) => {
    // console.log("particular", x);
    navigate("/Precot/Bleaching/F-04", {
      state: { bmrno: x.bmrno, date: x.date },
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
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, x, index) => <p>{index + 1}</p>,
    },
    {
      title: "BMR No",
      dataIndex: "bmrno",
      key: "bmrno",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Supervisor Status",
      dataIndex: "sup_status",
      key: "sup_status",
      align: "center",
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, x) => (
        <Button
          icon={<BiEdit />}
          onClick={() => handleEdit(x)}
          style={{ width: "100%" }}
        >
          Review
        </Button>
      ),
    },
  ];

  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : 'N/A')
  };
   
  let columns;
  if (reason) {
    columns = [
      ...baseColumns.slice(0, 5),
      Reason,                  
      ...baseColumns.slice(5),    
    ];
  } else {
    columns = baseColumns;
  }

  const bmrChange = (values) => {
    // console.log("values", values);
    setBmr(values);
  };

  const newNavigate = () => {
    if (initialDate == "") {
      messageApi.open({
        type: "warning",
        content: "Please Select Date",
      });
    } else if (bmr == "") {
      messageApi.open({
        type: "warning",
        content: "Please Select BMR",
      });
    } else {
      navigate("/Precot/Bleaching/F-04", {
        state: { bmrno: bmr, date: initialDate },
      });
    }
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  

  return (
    <div>
      <div
        id="section-to-print"
        style={{
          fontFamily: "sans-serif",
          scale:"97%"
        }}
      >
        <header className="no-print" style={{ width: "90%" }} />
        <main>
          <table style={{ marginTop: "5%", width: "90%" }}>
            <tbody>
              <tr>
                <td colSpan="3" rowspan="4" style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "100px",
                      height: "auto",
                      textAlign: "center",
                    }}
                  />
                  <br></br>
                  <br></br>
                  Unit H
                </td>
                <th
                  colSpan="7"
                  rowspan="4"
                  style={{ height: "60px", textAlign: "center" }}
                >
                  Applied Contamination Report
                  <br />
                  (Raw Cotton)
                </th>
                <td colSpan="5">Format No .:</td>
                <td colSpan="4">PH-PRD01/F-003</td>
              </tr>

              <tr>
                <td colSpan="5">Revision No.:</td>
                <td colSpan="4">01</td>
              </tr>
              <tr>
                <td colSpan="5">Ref sopNo.:</td>
                <td colSpan="4">PH-PRD01-D-03</td>
              </tr>
              <tr>
                <td colSpan="5">PageNo.:</td>
                <td colSpan="4">1 of 1</td>
              </tr>
              <tr>
                <td colSpan="10" style={{ border: "none" }}></td>
              </tr>
              <tr>
                {/* <td colSpan="10">Date : {printResponseData?.[0]?.date}</td> */}
                <td colSpan="10">
                  Date : {formatDate(printResponseData?.[0]?.date)}
                </td>
                {/* {formatDate(newDate)} */}
                {/* <td colSpan="5">{printResponseData?.[0]?.date}</td> */}
                <td colSpan="9">
                  BMR No : {printResponseData?.[0]?.bmrNumber}
                </td>
                {/* <td colSpan="4">{printResponseData?.[0]?.bmrNumber}</td> */}
              </tr>
              <tr>
                <td colSpan="1" rowSpan="3">
                  S.No.
                </td>
                <td colSpan="2" rowSpan="3">
                  Types of Contamination:
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  B&W-1
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  B&W-2
                </td>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  CCP#01-A(XPI-1)
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  CCP#01-B(XPI-2)
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No.of <br />
                  Contamination
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref . Sample
                </td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No.of <br /> Contamination
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref . Sample
                </td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No .of <br /> Contamination
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref . Sample
                </td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No .of <br /> Contamination
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref . Sample
                </td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Hair
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[0]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[0]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[0]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[0]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Jute
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[1]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[1]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[1]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[1]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Colour Threads
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[2]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[2]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[2]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[2]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                Strapper
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[3]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[3]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[3]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[3]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Metal piece{" "}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[4]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[4]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[4]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[4]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Brown/Rusty cotton{" "}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[5]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[5]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[5]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[5]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Plastic
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[6]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[6]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[6]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[6]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Black Cotton
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[7]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[7]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[7]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[7]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  9
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Oil Cotton
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[8]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[8]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[8]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[8]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  10
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Soils
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[9]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[9]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[9]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[9]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  11
                </td>
                <td colSpan="2">Yellow Cotton</td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[10]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[10]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[10]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[10]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  12
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Paper
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[11]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[11]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[11]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[11]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  13
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Stick
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[12]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[12]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[12]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[12]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  14
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Feather
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[13]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[13]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[13]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[13]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  15
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Cloth
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[14]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[14]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[14]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[14]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  16
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  White Poly Propylene
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[15]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[15]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[15]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[15]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  17
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Colour Poly Propylene
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[16]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[16]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[16]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[16]
                      ?.bw4Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  18
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Rubber Piece
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[17]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[17]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[17]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsRawCottonF04?.[17]
                      ?.bw3Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Total :
                </td>
                <td colSpan="4" style={{ paddingLeft: "3em" }}>
                  {printResponseData?.[0]?.total_0ne}
                </td>
                <td colSpan="4" style={{ paddingLeft: "4em" }}>
                  {printResponseData?.[0]?.total_two}
                </td>
                <td colSpan="4" style={{ paddingLeft: "4em" }}>
                  {printResponseData?.[0]?.total_three}
                </td>
                <td colSpan="4" style={{ paddingLeft: "4em" }}>
                  {printResponseData?.[0]?.total_four}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Performed by Production Supervisor
                  <br></br>
                  <br></br>
                  <p> {printResponseData?.[0]?.supervisor_sign}
                    <br />
                    {formattedDatesupervisor()}</p>
                    {getImage !== "" && (
                    <img className="signature"
                          src={getImage}
                          alt="Supervisor"
                          
                        />)}
                    <br></br>
                  Sign&date
                </td>
                <td
                  colSpan="10"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Reviewed by Head of the Department/Designee
                  <br></br>
                  <br></br>
                  <p>
                    {printResponseData?.[0]?.hod_sign}
                    <br />
                    {formattedDate()}
                  </p>
                  {getImage1 !== "" && (
                  <img className="signature"
                          src={getImage1}
                          alt="HOD"
                          
                        />)}
                        <br></br>
                  Sign&date
                </td>
              </tr>
              <tr>
                {/* <td
                  colSpan="9"
                  style={{
                    height: "50px",
                    textAlign: "center",
                    verticalAlign: "bottom",
                  }}
                >
                  <p>
                    {printResponseData?.[0]?.supervisor_sign}
                    <br />
                    {formattedDatesupervisor()}
                  </p>
                  Sign&date
                </td> */}
                {/* <td
                  colSpan="10"
                  style={{
                    height: "50px",
                    textAlign: "center",
                    verticalAlign: "bottom",
                    border:"none"
                  }}
                >
                  <p>
                    {printResponseData?.[0]?.hod_sign}
                    <br />
                    {formattedDate()}
                  </p>
                  Sign&date
                </td> */}
              </tr>
              <tr>
                <td colSpan="10" style={{ border: "none" }}></td>
              </tr>
              <tr>

              </tr>
              <tr>
                <td colSpan="4">Particulars</td>
                <td colSpan="5">Perpared by</td>
                <td colSpan="5">Reviewed by</td>
                <td colSpan="5">Apporved by</td>
              </tr>
              <tr>
                <td colSpan="4">Name</td>
                <td colSpan="5"></td>
                <td colSpan="5"></td>
                <td colSpan="5"></td>
              </tr>
              <tr>
                <td colSpan="4">Signature & Date</td>
                <td colSpan="5"></td>
                <td colSpan="5"></td>
                <td colSpan="5"></td>
              </tr>
            </tbody>
          </table>
        </main>
        <footer className="no-print" />
      </div>
      {contextHolder}
      <BleachingHeader
        unit="Unit-H"
        formName="APPLIED CONTAMINATION REPORT "
        formatNo="PH-PRD01/F-003"
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
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
          </Col>

          <Col
            style={{
              marginLeft: "1em",
            }}
          >
            <p>{localStorage.getItem("username")}</p>
            <p
              style={{
                fontSize: "x-small",
              }}
            >
              {localStorage.getItem("role")}
            </p>
          </Col>
        </Row>

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            role === "ROLE_QA"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Chemical Issue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
          }
        />
      </Drawer>
      <Row
        style={{
          width: "100%",
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            margin: 0,
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            margin: "1em",
          }}
        >
          <Form.Item
            label="Date"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              padding: 0,
            }}
          >
            <Input
              style={{
                margin: 0,
              }}
              type="date"
              max={formattedToday}
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="BMR No"
            style={{
              margin: "0px 2em 0px 0px",
              padding: 0,
            }}
          >
            <Select
              onChange={bmrChange}
              options={bmrList}
              placeholder="Choose BMR"
              style={{
                margin: 0,
                padding: 0,
              }}
              showSearch
            />
          </Form.Item>
          <Form.Item
            style={{
              margin: 0,
              padding: 0,
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<BiNavigation color="#00308F" />}
              shape="round"
              onClick={newNavigate}
            >
              Go to
            </Button>
          </Form.Item>
        </Form>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={summary}
        />
      </Row>
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDateSubmit}
            disabled={!PrintValue}
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
          <Form.Item label="BMR NO" style={{ textAlign: "center" }}>
            <Select
              onChange={handleDatePrintChange}
              options={bmrListNew}
              value={PrintValue}
              placeholder="Choose BMR"
              showSearch
            />
          </Form.Item>
        </div>
      </Modal>
    </div>
  );
};

export default Bleaching_f04_summary;