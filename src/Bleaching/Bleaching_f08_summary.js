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
  message,
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
import { GoArrowLeft } from "react-icons/go";
import { jwtDecode } from "jwt-decode";
import BleachingHeader from "../Components/BleachingHeader";
import moment from "moment";

import logo from "../Assests/logo.png";
const Bleaching_f08_summary = () => {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [summary, setSummary] = useState([]);
  const [initialDate, setInitialDate] = useState("");
  const [bmrList, setBmrList] = useState([]);
  const [reason, setReason] = useState(false);
  const [bmr, setBmr] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const [showModal, setShowModal] = useState(false);
  const [PrintValue, setPrintValue] = useState(null);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [bmrListPrint, setBmrListPrint] = useState([]);
  const [bmrOptionsNew,setBmrOptionsNew] =useState([]);

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.supervisor_sign;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {

    //Filtered API Response
    axios
        .get(
          `${ API.prodUrl}/Precot/api/bleaching/summary/fetchApprovedBMR?formNumber=PH-PRD01/F-011`,
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

         setBmrOptionsNew(a)
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
  },[])

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.hod_sign;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl, token]);

  const showDrawer = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Precot");
  };
  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.loglog("print screen works");
    // Add any other print-related logic here
  };

  const formattedDate = () => {
    if (printResponseData?.[0]?.hod_submit_on) {
      const date = moment(printResponseData?.[0]?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const formattedDatesupervisor = () => {
    if (printResponseData?.[0]?.supervisor_submit_on) {
      const date = moment(printResponseData?.[0]?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const onClose = () => {
    setOpen(false);
  };
  const printDateSubmit = () => {
    window.print();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPrintValue(null);
  };
  useEffect(() => {
    setInitialDate(new Date().toISOString().substring(0, 10));
    const x = localStorage.getItem("role");
    setRole(x);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", 
    };

    axios
      .get(`${ API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`, {
        headers,
      })
      .then((res) => {
        // console.loglog("BMRLOV", res.data);

        const a = res.data.map((x, i) => {
          return {
            value: x.BMR_NO,
            label: x.BMR_NO,
          };
        });
        // console.loglog("aa", a);
        setBmrList(a);
      })
      .catch((err) => {
        // console.loglog("Error", err);
      });

    if (localStorage.getItem("role") == "ROLE_SUPERVISOR") {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Bleaching/Service/getAppliedAbCottonSupervisorSummeryF08`,
          {
            headers,
          }
        )
        .then((res) => {
          // console.loglog("post", res.data);
          const a = res.data.map((x, i) => {
            return {
              bmrno: x.bmrNumber,
              date: x.date,
              mail_status: x.mail_status,
              sup_status: x.supervisor_status,
              hod_status: x.hod_status,
              reason: x.reason,
            };
          });
          // console.loglog("aaa", a);
          setSummary(a);
        })
        .catch((err) => {
          // console.loglog("Error", err);
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
        .get(
          `${ API.prodUrl}/Precot/api/Bleaching/Service/geAppliedAbCottontHodSummeryF08`,
          {
            headers,
          }
        )
        .then((res) => {
          // console.loglog("post", res.data);
          const a = res.data.map((x, i) => {
            return {
              bmrno: x.bmrNumber,
              date: x.date,
              mail_status: x.mail_status,
              sup_status: x.supervisor_status,
              hod_status: x.hod_status,
              reason: x.reason,
            };
          });
          // console.loglog("aaa", a);
          setSummary(a);
        })
        .catch((err) => {
          // console.loglog("Error", err);
        });
    }
  }, []);
  useEffect(() => {
    const findReason = () => {
      for (const data of summary) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summary]);

  const handleEdit = (x) => {
    // console.loglog("particular", x);
    navigate("/Precot/Bleaching/F-08", {
      state: { bmrno: x.bmrno, date: x.date },
    });
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formattedDate1 = () => {
    if (printResponseData?.[0]?.date) {
      const date = moment(printResponseData?.[0]?.date);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
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
      title: "BMR NO",
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
      title: "Hod Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, x) => (
        <>
          <Button
            icon={<BiEdit />}
            onClick={() => handleEdit(x)}
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

  const bmrChange = (values) => {
    // console.loglog("values", values);
    setBmr(values);
  };
  useEffect(() => {
    const fetchBmrOptionsPrint = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/bleaching/summary/allBmrAndLaydownLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        // console.loglog(data);

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
    try {
      setPrintValue(value);
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Bleaching/Service/getBmrDetailsF08?bmr=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setPrintResponseData(res.data);
            // console.loglog("print response", printResponseData);
            // setPrintValue(value);
          } else {
            setPrintResponseData([]);
            message.error("no data found...!");
          }
        })
        .catch((err) => {
          setPrintResponseData([]);
          // console.loglog("Error", err);
          notification.warning({
            message: "Notification",
            description: err.response.data.message,
          });
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const newNavigate = () => {
    if (initialDate == "") {
      // setError('Please select a date');
      message.warning("Please Select Date");
      return;
    } else if (bmr == "") {
      // setError('Please select a date');
      message.warning("Please Select BMR");
      return;
    }
    navigate("/Precot/Bleaching/F-08", {
      state: { bmrno: bmr, date: initialDate },
    });
  };
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  return (
    <div>
      <div id="section-to-print">
        <header className="no-print" />
        <main>
          <table style={{ width: "95%", marginTop: "2%", scale: "97%" }}>
            <tbody>
              <tr>
                <td colSpan="2" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  <br></br>
                  Unit H
                </td>
                <th
                  colSpan="5"
                  rowspan="4"
                  style={{ height: "60px", textAlign: "center" }}
                >
                  Applied Contamination Report
                  <br />
                  (Absorbent Bleached Cotton)
                </th>
                <td colSpan="2">Format No.:</td>
                <td colSpan="2">PH-PRD01/F-011</td>
              </tr>

              <tr>
                <td colSpan="2">Revision No.:</td>
                <td colSpan="2">01</td>
              </tr>
              <tr>
                <td colSpan="2">Ref .sopNo.:</td>
                <td colSpan="2">PH-PRD01-D-03</td>
              </tr>
              <tr>
                <td colSpan="2">PageNo.:</td>
                <td colSpan="2">1 of 1</td>
              </tr>
              <td colSpan="11" style={{ border: "none" }}></td>
              <tr>
                <td colSpan="5">Date : {formattedDate1()}</td>
                {/* <td colSpan="3">{printResponseData?.[0]?.date}</td> */}
                <td colSpan="6">BMR No :{printResponseData?.[0]?.bmrNumber}</td>
                {/* <td colSpan="3">{printResponseData?.[0]?.bmrNumber}</td> */}
              </tr>
              <tr>
                <td colSpan="1" rowSpan="3" style={{ textAlign: "center" }}>
                  S.No.
                </td>
                <td colSpan="2" rowSpan="3">
                  Types of Contamination
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  CCP#03-A
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  CCP#03-B
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No. of <br />
                  Contamination
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref. Sample
                </td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No .of <br /> Contamination
                </td>
                {/* <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref .Sample
                </td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Hair
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[0]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[0]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Jute
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[1]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[1]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Colour Threads{" "}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[2]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[2]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Wrapper
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[3]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[3]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Metal piece{" "}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[4]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[4]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Brown/Rusty cotton{" "}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[5]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[5]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Plastic
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[6]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[6]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Black Cotton
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[7]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[7]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  9
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Unbleached Cotton
                </td>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[8]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[8]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  10
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Oil Cotton
                </td>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[9]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[9]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  11
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Soils
                </td>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[10]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[10]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  12
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Yellow Cotton
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[11]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[11]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  13
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Paper
                </td>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[12]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[12]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  14
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Stick
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[13]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[13]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  15
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Feather
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[14]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[14]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  16
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Cloth
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[15]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[15]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  17
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  White Poly Propylene
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[16]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[16]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  18
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Colour Poly Propylene
                </td>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[17]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[17]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  19
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Rubber Piece
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[18]
                      ?.bw1Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {
                    printResponseData?.[0]?.detailsAbCottonF04?.[18]
                      ?.bw2Contamination
                  }
                </td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Total :
                </td>
                <td colSpan="4" style={{ paddingLeft: "5em" }}>
                  {printResponseData?.[0]?.total_01}
                </td>
                <td colSpan="4" style={{  textAlign: "center" }}>
                  {printResponseData?.[0]?.total_02}
                </td>
              </tr>
              <tr>
                <td colSpan="5 " style={{ textAlign: "center", height: "15%" }}>
                  Performed by Production Supervisor <br></br>
                  {printResponseData?.[0]?.supervisor_sign}
                  {<br />}
                  {formattedDatesupervisor()}
                  <br />
                  {getImage !== "" && (
                  <img className="signature"
                    src={getImage}
                    style={{
                      width: "60px",
                              height: "20px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                    }}
                    alt="Supervisor"
                    
                  />)}
                  {" "}
                  <br></br>
                  Sign&Date
                </td>
                <td colSpan="6" style={{ textAlign: "center", height: "15%" }}>
                  Reviewed by Head of the Department/Designee <br></br>
                  <br></br> {printResponseData?.[0]?.hod_sign}
                  {<br />}
                  {formattedDate()}
                  <br/>
                  {getImage1 !== "" && (
                  <img className="signature"
                    src={getImage1}
                    style={{
                      width: "60px",
                              height: "20px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                    }}
                    alt="HOD"
                    
                  />)}
                  <br></br>
                  Sign&Date
                </td>
              </tr>
              <td colSpan="11" style={{ border: "none" }}></td>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Particulars
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Perpared by
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Reviewed by
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Apporved by
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Name
                </td>
                <td colSpan="2"></td>
                <td colSpan="4"></td>
                <td colSpan="5"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Signature & Date
                </td>
                <td colSpan="2"></td>
                <td colSpan="4"></td>
                <td colSpan="5"></td>
              </tr>
            </tbody>
          </table>
        </main>
        <footer className="no-print" />
      </div>
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
      <BleachingHeader
        unit="Unit-H"
        formName="APPLIED CONTAMINATION REPORT - 
                  ABSORBENT BLEACHED COTTON "
        formatNo="PH-PRD01/F-011"
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
              // display: saveBtnStatus ? "block" : "none",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
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
            //  onClick={handleLogout}
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

      <Form
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "10px",
          gap: "10px",
        }}
      >
        <Form.Item label="Date">
          <Input
            type="date"
            max={formattedToday}
            value={initialDate}
            onChange={(e) => setInitialDate(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="BMR NO">
          <Select
            onChange={bmrChange}
            options={bmrList}
            placeholder="Choose BMR"
          />
        </Form.Item>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={newNavigate}
        >
          Go To
        </Button>
      </Form>
      <Row
        style={{
          width: "100%",
        }}
      >
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
              value={PrintValue}
              options={bmrOptionsNew}
              placeholder="Choose BMR"
              showSearch
            />
          </Form.Item>
        </div>
      </Modal>
    </div>
  );
};

export default Bleaching_f08_summary;