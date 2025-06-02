/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Tabs,
  Modal,
  Spin,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";
import PrecotSidebar from "../Components/PrecotSidebar.js";

import logo from "../Assests/logo.png";

import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";

const Spunlace_f18 = () => {
  const [ORDER_No, SetORDER_No] = useState("");
  const [STD_WIDTH, SetSTD_WIDTH] = useState("");
  const [MIXING, SetMIXING] = useState("");
  const [MATERIAL_CODE, SetMATERIAL_CODE] = useState("");
  const [STD_ROLL_DIA, SetSTD_ROLL_DIA] = useState("");
  const [PRODUCT_NAME, SetPRODUCT_NAME] = useState("");
  const [PATTERN, SetPATTERN] = useState("");
  const [STD_THICKNESS, SetSTD_THICKNESS] = useState("");
  const [STD_GSM, SetSTD_GSM] = useState("");
  const [SHAFT_No, SetSHAFT_No] = useState("");
  const [ROLL_No, SetROLL_No] = useState("");
  const [LENGTH_MTRS, SetLENGTH_MTRS] = useState("");
  const [WIDTH_MM, SetWIDTH_MM] = useState("");
  const [NET_WT, SetNET_WT] = useState("");
  const [ROLL_GSM, SetROLL_GSM] = useState("");
  const [MOISTURE, SetMOISTURE] = useState("");
  const [ROLL_DIA, SetROLL_DIA] = useState("");
  const [REMARKS, SetREMARKS] = useState("");
  const [STD_MOISTURE, SetSTD_MOISTURE] = useState("");
  const [orderDetails, SetOrderDetails] = useState([]);
  const [getOrderDetails, SetGetOrderDetails] = useState([]);
  const [NewSave, setNewSave] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");
  // console.loglog("state of selected", selectedRow[0])
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  // console.loglog(roleauth);
  const [modalData, setmodalData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [orderDescription, setOrderDescription] = useState("");
  const [OverallID, setOverallID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [SupervisorSign, setSupervisorSign] = useState("");
  const [HodSign, setHodSign] = useState("");
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();
  const [HodSubmitOn, setHodSubmitOn] = useState("");
  const [OperatorSign, setOperatorSign] = useState("");
  const [OperatorSubmitOn, setOperatorSubmitOn] = useState("");
  const [Operatorstatus, setOperatorstatus] = useState("");
  const [SupervisorStatus, setSupervisorStatus] = useState("");
  const [HodStatus, setHodStatus] = useState("");
  const [ReportDetails, setReportDetails] = useState([]);

  const initial = useRef(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

  // console.loglog("supervisor",selectedRow?.supervisor_status)

  const roleBase = localStorage.getItem("role");

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.supervisor_sign;
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
  }, [selectedRow, API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hod_sign;
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
  }, [selectedRow, API.prodUrl]);

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_OPERATOR") {
      if (
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.hod_status !== "HOD_REJECTED" &&
        selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    } else if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/spulance/report/approveOrRejectF018`,
        {
          id: OverallID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.loglog("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-18/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.loglog("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/spulance/report/approveOrRejectF018`,
        {
          id: OverallID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.loglog("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-18/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.loglog("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      const { newdate, shiftvalue, orderNo } = state || {};
      checkBmrExists(newdate);
    }
  }, [date]);

  const checkBmrExists = async (date) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spulance/report/getByDateF018?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.loglog("response", response.data);

      if (
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data[0].supervisor_status !== "SUPERVISOR_APPROVED") ||
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data[0].hod_status == "HOD_REJECTED")
      ) {
        message.error("Supervisor Not Yet  Approved");
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-18/Summary");
        }, 1500);
      }
      response.data.length == 0 ? setNewSave(true) : setNewSave(false);
      if (response.data && response.data.length > 0) {
        const data = response.data;
        // console.loglog("data", data);

        // console.loglog("inside data", data);
        setHodSign(response.data[0].hod_sign);
        setHodStatus(response.data[0].hod_status);
        setHodSubmitOn(response.data[0].hod_submit_on);
        setSupervisorSign(response.data[0].supervisor_sign);
        setSupervisorStatus(response.data[0].supervisor_status);
        setSupervisorSubmitOn(response.data[0].supervisor_submit_on);
        setRemarks(response.data[0].remarks);
        setOverallID(response.data[0].id);
        // console.loglog("Id",response.data[0].id)
        setSelectedRow(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { state } = location;
  const { newdate, shiftvalue, orderNo } = state || {};

  useEffect(() => {
    const { newdate, shiftvalue, orderNo } = state || {};
    // console.loglog("Date new" , newdate);
    const formattedDate = moment(newdate, "DD/MM/YYYY").format("YYYY-MM-DD");
    // console.loglog("Formatted Date" , formattedDate);
    // const formattedDate = new Intl.DateTimeFormat('en-GB', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric',

    // }).format(newdate);

    setDate(formattedDate);

    // // console.loglog("PHNo create", newdate);
  });

  // Fetch data from API
  //   const fetchOrderDescription = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get('https://secure.focusrtech.com:5050/Precot/api/spulance/sampleReportOrders', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = response.data;

  //       const order = data.find(item => item.value === orderNo);
  //       if (order) {
  //         setOrderDescription(`${order.value}/${order.description}`);
  //       } else {
  //         setOrderDescription(orderNo);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching order description:', error);
  //     }
  //   };

  //   fetchOrderDescription();
  // }, [newdate, shiftvalue, orderNo]);

  const handleDateChange = (e) => {
    // setDate(e.target.value);
  };
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  const token = localStorage.getItem("token");

  const handlePrint = () => {
    window.print();
  };

  const handleRejectModal = () => {
    setShowModal(true);

    // console.loglog("print screen works");
  };

  const submitData = () => {
    const { newdate, shiftvalue, orderNo } = state || {};
    setSubmitLoading(true);
    // console.loglog("Date1", token);

    if (NewSave) {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD02/F-017",
        formatName: "SHIFT WISE STOPPAGE REPORT OF SLITER WINDER HOD",
        refSopNo: "PH-PRD02-D-03",
        revisionNo: "01",
        date: newdate,
        remarks: remarks,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${ API.prodUrl}/Precot/api/spulance/report/submitShiftWiseStoppage`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.loglog("Response", res.data);
          message.success("Form Submitted Successfully");
          navigate("/Precot/Spunlace/F-18/Summary");
        })
        .catch((err) => {
          // console.loglog("Error", err);
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD02/F-017",
        formatName: "SHIFT WISE STOPPAGE REPORT OF SLITER WINDER HOD",
        refSopNo: "PH-PRD02-D-03",
        revisionNo: "01",
        id: OverallID,
        date: newdate,
        remarks: remarks,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${ API.prodUrl}/Precot/api/spulance/report/submitShiftWiseStoppage`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.loglog("Response", res.data);
          message.success("Form Submitted Successfully");
          navigate("/Precot/Spunlace/F-18/Summary");
        })
        .catch((err) => {
          // console.loglog("Error", err);
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    }
  };

  useEffect(() => {
    const { newdate, shiftvalue, orderNo } = state || {};

    // console.loglog("Date new" , newdate);
    const formattedDate = moment(newdate, "DD/MM/YYYY").format("YYYY-MM-DD");
    // console.loglog("Formatted Date" , formattedDate);
    fetchGet(formattedDate);
  }, [newdate]);

  const fetchGet = async () => {
    const { newdate } = state || {};

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spulance/sliterwinderStoppageReport?date=${newdate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.loglog("response Fecthget", response.data);

      // console.loglog("Moistore",response.data[0].ER)
      // console.loglog("report rr",response.data[0].reportDetails)

      setReportDetails(response.data);

      SetGetOrderDetails(response.data);

      // SetMATERIAL_CODE(response.data.materialCode);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBack = () => {
    navigate("/Precot/Spunlace/F-18/Summary");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ReportDetails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ReportDetails.length / itemsPerPage);

  const [remarks, setRemarks] = useState("");

  const formattedOperatorDate = OperatorSubmitOn
    ? moment(OperatorSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedSupervisorDate = SupervisorSubmitOn
    ? moment(SupervisorSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedhodDate = HodSubmitOn
    ? moment(HodSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedDate = new Date(newdate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const items = [
    {
      key: "1",
      label: <p>Stoppage ReportDetails</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "100%", margin: "auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <td colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                  Date
                </td>
                <td colSpan="3" rowSpan="2" style={{ textAlign: "center" }}>
                  Shift
                </td>
                <td colSpan="3" rowSpan="2" style={{ textAlign: "center" }}>
                  Product Name
                </td>
                <td colSpan="3" rowSpan="2" style={{ textAlign: "center" }}>
                  Order No
                </td>
                <td colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                  Prod in Kg
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  DOWN TIME IN MIN
                </td>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  BREAK DOWN IN{" "}
                </td>
                <td colSpan="3" rowSpan="2" style={{ textAlign: "center" }}>
                  TOTAL TIME IN MIN
                </td>
              </tr>

              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  LC
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  GR Clean
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Others
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Total
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  ER
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  MR
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Total
                </td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((detail, index) => (
                <tr key={index}>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "4px" }}
                  >
                    {formattedDate}
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    {detail.ShiftID}
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    {detail.ProductName}
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    {detail.OrderNo}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.ProdInKg}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.LC}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.GR}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.Other}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.TotalDowntime}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.ER}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.MR}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {detail.TotalBreakdown}
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    {detail.TotalTimeInMin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="pagination"
            style={{ textAlign: "right", marginTop: "20px" }}
          >
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="pagination-button"
                style={{
                  padding: "5px 10px",
                  margin: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Previous
              </button>
            )}

            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="pagination-button"
                style={{
                  padding: "5px 10px",
                  margin: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>Remarks</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "20%", marginLeft: "10px" }}
          >
            <tr>
              <td colSpan="5" style={{ marginTop: "10px", height: "90px" }}>
                <input
                  style={{
                    height: "90px",
                    border: "none",
                    outline: "none",
                    textAlign: "center",
                  }}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },

    {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "70%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                Production Supervisor Sign & Date
              </td>

              <td colSpan="10" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
            </tr>

            <tr>
              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                {selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && (
                  <div>
                    {SupervisorSign}
                    <br />
                    {formattedSupervisorDate}
                    <br />
                    {getImage && (
                      <img
                        src={getImage}
                        alt="Supervisor Sign"
                        style={{
                          width: "70px",
                          height: "50px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "space-evenly",
                        }}
                      />
                    )}
                  </div>
                )}
              </td>

              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                {(selectedRow?.hod_status === "HOD_REJECTED" ||
                  selectedRow?.hod_status === "HOD_APPROVED") && (
                  <div>
                    {HodSign}
                    <br />
                    {formattedhodDate}
                    <br />
                    {getImage1 && (
                      <img
                        src={getImage1}
                        alt="Hod Sign"
                        style={{
                          width: "70px",
                          height: "50px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "space-evenly",
                        }}
                      />
                    )}
                  </div>
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="SHIFT WISE STOPPAGE REPORT OF SLITER WINDER"
        formatNo="PH-PRD02/F-017"
        sopNo="PH-PRD02-D-03"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            key="back"
            type="primary"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Back
          </Button>,
          ...(role === "ROLE_HOD" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE"
            ? [
                <Button
                  key="approve"
                  loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  onClick={handleApprove}
                  shape="round"
                  icon={<img src={approveIcon} alt="Approve Icon" />}
                >
                  &nbsp;Approve
                </Button>,
                <Button
                  key="reject"
                  loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<img src={rejectIcon} alt="Reject Icon" />}
                  onClick={handleRejectModal}
                  shape="round"
                >
                  &nbsp;Reject
                </Button>,
              ]
            : [
                // <Button
                //   key="save"
                //   loading={saveLoading}
                //   type="primary"
                //   onClick={ha}
                //   style={{
                //     backgroundColor: "#E5EEF9",
                //     color: "#00308F",
                //     fontWeight: "bold",
                //     display:canDisplayButton2(),
                //   }}
                //   shape="round"
                //   icon={<IoSave color="#00308F" />}
                // >
                //   Save
                // </Button>,
                <Button
                  key="submit"
                  loading={submitLoading}
                  type="primary"
                  onClick={submitData}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<GrDocumentStore color="#00308F" />}
                  shape="round"
                >
                  Submit
                </Button>,
              ]),
          <Button
            key="logout"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiLock color="#00308F" />}
            onClick={() => {
              if (window.confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                navigate("/Precot"); // Ensure navigate is defined or imported
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user-info"
            trigger="click"
            style={{ backgroundColor: "#fff" }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#E5EEF9" }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,
          <PrecotSidebar
            open={open}
            onClose={onClose}
            role={localStorage.getItem("role")}
          />,
          <Modal
            key="reject-modal"
            title="Reject"
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
            footer={[
              <Button
                key="submit-reject"
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                }}
                shape="round"
                onClick={handleReject}
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
              <label style={{ marginRight: "8px" }}>Remarks:</label>
              <TextArea
                value={rejectRemarks}
                onChange={(e) => setRejectRemarks(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </Modal>,
        ]}
      />

      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
    </div>
  );
};

export default Spunlace_f18;
