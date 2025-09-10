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

import TextArea from "antd/es/input/TextArea";

import logo from "../Assests/logo.png";

import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";

const Spunlace_f14 = () => {
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [chunkedData, setchunkeData] = useState([]);
  const [chunkedDataarray, setchunkeDataarray] = useState([]);
  const [totalweight, settotalweight] = useState(0);
  const [Rp_mixing, SetRp_mixing] = useState("");
  const [ORDER_No, SetORDER_No] = useState("");
  const [STD_WIDTH, SetSTD_WIDTH] = useState("");
  const [batchno, setbatchno] = useState([]);
  const [batchno2, setbatchno2] = useState([]);
  const [MIXING, SetMIXING] = useState("");
  const [id, setid] = useState("");
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
  console.log("state of selected", selectedRow[0]);
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  console.log(roleauth);
  const [modalData, setmodalData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [orderDescription, setOrderDescription] = useState("");
  const [OverallID, setOverallID] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
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
  const [showModal, setShowModal] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

  console.log("supervisor", selectedRow?.supervisor_status);
  const [shiftnumber, setshiftnumber] = useState([]);
  const roleBase = localStorage.getItem("role");

  const { state } = location;
  const { newdate, shiftvalue, orderNo } = state || {};
  let convertedShiftValue;
  const token = localStorage.getItem("token");
  const initial = useRef(false);
  const pageSize = 10; // Number of rows per page
  useEffect(() => {
    console.log("new Date", newdate, shiftvalue, orderNo);
    if (shiftvalue) {
      convertedShiftValue = convertShiftValue(shiftvalue);
      console.log("Converted Shift Value", convertedShiftValue);
      setshiftnumber(convertedShiftValue);
    } else {
      console.log("shiftvalue is not defined in the state object");
    }

    if (newdate) {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(newdate));

      setDate(formattedDate);

      console.log("PHNo create", newdate);
    }
    if (shiftvalue) {
      setShift(shiftvalue);
      console.log("Supplier create", shiftvalue);
    }
    if (orderNo) {
      SetORDER_No(orderNo);
      console.log("Supplier create", orderNo);
    }

    Orderdetails();
    fetchDataBy_status();
    // fetchDataBy_status_date();
  }, [newdate, shiftvalue, orderNo]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const fetchDataOrderNumber = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/baleWeight?order=${orderNo}&shift=${convertedShiftValue}&date=${newdate}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log("Shift details fetched:", res.data);
          const data = res.data.map((laydownno) => laydownno.value);
          console.log("data format", res.data);
          const flattenedData = res.data.reduce((acc, item) => {
            acc.push(item.BaleNo, item.NetWt);
            return acc;
          }, []);
          const totalWeight = parseFloat(
            res.data
              .reduce((sum, item) => sum + parseFloat(item.NetWt), 0)
              .toFixed(2)
          );

          console.log(totalWeight); // Output the rounded total weight

          settotalweight(totalWeight);
          const chunkArray = (array, chunkSize) => {
            const result = [];
            for (let i = 0; i < array.length; i += chunkSize) {
              result.push(array.slice(i, i + chunkSize));
            }
            return result;
          };

          // Chunk the flattened data into rows of 4 items
          const chunkedData = chunkArray(flattenedData, 6);
          console.log("value of chunked data", chunkedData.length);
          setchunkeDataarray(chunkedData.length);

          // Calculate total weight for the current page
          // const totalWeight2= currentData.reduce((acc, row) => acc + row[1], 0);
          setchunkeData(chunkedData);
          console.log("length of chunked Data", chunkedData.length);

          setbatchno(data);
          setbatchno2(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Date new", newdate);
    fetchDataOrderNumber();
    if (newdate) {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(newdate));

      setDate(formattedDate);

      console.log("PHNo create", newdate);
    }
    if (shiftvalue) {
      setShift(shiftvalue);
      console.log("Supplier create", shiftvalue);
    }
    if (orderNo) {
      SetORDER_No(orderNo);
      console.log("Supplier create", orderNo);
    }
  }, [newdate, shiftvalue, orderNo]);
  const totalPages = Math.ceil(chunkedData.length / pageSize);

  // Calculate the data to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData2 = chunkedData.slice(startIndex, endIndex);
  console.log("current Data", currentData2);
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
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status === "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_REJECTED" &&
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
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

  const Orderdetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/orderDetails?order=${orderNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      if (response.data && response.data.length > 0) {
        const data = response.data;
        console.log("data", data);

        SetRp_mixing(data[0].mix);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApprove = async () => {
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spulance/report/approveOrRejectF014`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-14/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spulance/report/approveOrRejectF014`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-14/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleClick = () => {
    // handleSubmit();
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  const handlePrint = () => {
    window.print();
  };

  const handleShiftChange = (value) => {
    console.log(" Shift ", value);
    setShift(value);
    // setGotobtn(false);
  };

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

  const fetchDataBy_status = async () => {
    console.log("newdate", newdate);

    const dateformat = moment(newdate).format("DD/MM/YYYY");

    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/report/fetchRPProdReport?order=${orderNo}&shift=${shiftvalue}&date=${newdate}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const data = res.data.map((laydownno) => laydownno.value);

            // console.log("data format -status", res.data[0].operator_status);
            // setOperatorstatus(res.data[0].operator_status);
            // setSupervisorStatus(res.data[0].supervisor_status);
            // setHodStatus(res.data[0].hod_status);
            setSelectedRow(res.data[0]);
            setid(res.data[0].id);
            setSupervisorSubmitOn(res.data[0].supervisor_submit_on);
            setOperatorSubmitOn(res.data[0].operator_submitted_on);
            setHodSubmitOn(res.data[0].hod_submit_on);
            setOperatorSign(res.data[0].operator_sign);
            setOperatorstatus(res.data[0].operator_status);
            setHodStatus(res.data[0].hod_status);
            setHodSign(res.data[0].hod_sign);
            setSupervisorStatus(res.data[0].supervisor_sign);
            setbatchno(data);
            setbatchno2(data);
            setSupervisorSign(res.data[0].supervisor_sign);

            if (roleBase === "ROLE_SUPERVISOR") {
              if (
                res.data[0].supervisor_status === "SUPERVISOR_REJECTED" ||
                res.data[0].hod_status === "HOD_REJECTED"
              ) {
                message.warning(
                  "Operator Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/Spunlace/F-14/Summary");
                }, 1500);
              }
            }

            if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
              if (
                res.data[0].operator_status !== "OPERATOR_APPROVED" ||
                res.data[0].supervisor_status !== "SUPERVISOR_APPROVED" ||
                res.data[0].supervisor_status === "SUPERVISOR_REJECTED" ||
                res.data[0].hod_status === "HOD_REJECTED"
              ) {
                message.warning(
                  "Operator Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/Spunlace/F-14/Summary");
                }, 1500);
              }
            }
          }
          // console.log("Shift details fetched:", res.data);
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.operator_sign}`,
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
              setGetImageOP(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
          /////////////////
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.supervisor_sign}`,
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
              setGetImageSUP(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
          ///////////////////
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.hod_sign}`,
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
              setGetImageHOD(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // const fetchDataBy_status_date = async () => {
  //   console.log("newdate",newdate);

  //   const dateformat = moment(newdate).format("DD/MM/YYYY");

  //   try {
  //     setLoading(true);
  //     axios
  //       .get(
  //         `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/getByDateShiftOrderNo=${orderNo}&shift=${shiftvalue}&date=${newdate}`,

  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log("res value of count",res);
  //         if (res.data && res.data.length > 0) {
  //           const data = res.data.map((laydownno) => laydownno.value);
  //           // console.log("data format -status", res.data[0].operator_status);
  //           // setOperatorstatus(res.data[0].operator_status);
  //           // setSupervisorStatus(res.data[0].supervisor_status);
  //           // setHodStatus(res.data[0].hod_status);
  //           setSelectedRow(res.data[0]);
  //           setid(res.data[0].id);
  //           setSupervisorSubmitOn(res.data[0].supervisor_submit_on);
  //           setOperatorSubmitOn(res.data[0].operator_submitted_on);
  //           setHodSubmitOn(res.data[0].hod_submit_on);
  //           setOperatorSign(res.data[0].operator_sign);
  //           setOperatorstatus(res.data[0].operator_status);
  //           setHodStatus(res.data[0].hod_status);
  //           setHodSign(res.data[0].hod_sign);
  //           setSupervisorStatus(res.data[0].supervisor_sign)
  //           setbatchno(data);
  //           setbatchno2(data);
  //           setSupervisorSign(res.data[0].supervisor_sign);
  //         }
  //         // console.log("Shift details fetched:", res.data);

  //       });

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const submitData = () => {
    setSaveLoading(true);
    console.log("Date1", token);
    console.log("value date", date);
    const parsedDate = moment(date, "DD/MM/YYYY"); // Parse the date
    const dateformat = parsedDate.format("YYYY-MM-DD");

    const payload = {
      id: id,
      formatName: "SHIFT WISE RP PRODUCTION REPORT",
      formatNo: "PH-PRD02/F-014",
      revisionNo: 1,
      refSopNo: "PH-PRD02-D-03",
      unit: "H",
      date: dateformat,
      shift: shift,
      orderNo: orderNo,
      rp_mixing: Rp_mixing,
    };
    console.log("Date Payload ", payload);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spulance/report/submitRPProdReport`,
        payload,
        { headers }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Form Submit Successfully" + res.data.message);
        navigate("/Precot/Spunlace/F-14/Summary");
      })
      .catch((err) => {
        console.log("Error", err.response.data.message);
        const errorMessage =
          err?.response?.data?.message ||
          "An error occurred while saving the form";
        message.error(errorMessage);
        setSubmitLoading(false);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/Spunlace/F-14/Summary");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formattedOperatorDate = OperatorSubmitOn
    ? moment(OperatorSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedSupervisorDate = SupervisorSubmitOn
    ? moment(SupervisorSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedhodDate = HodSubmitOn
    ? moment(HodSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const items = [
    {
      key: "1",
      label: <p>SHIFT WISE DAILY SLITER WINDER PRODUCTION REPORT</p>,
      children: (
        <div>
          <table border="1">
            <thead>
              <th>BALE NO</th>
              <th>WEIGHT IN KG</th>
              <th>BALE NO</th>
              <th>WEIGHT IN KG</th>
              <th>BALE NO</th>
              <th>WEIGHT IN KG</th>
            </thead>
            <tbody>
              {currentData2.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, cellIndex) => (
                    <td
                      style={{ textAlign: "center", fontSize: "14px" }}
                      key={cellIndex}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
              {/* {chunkedData.length} */}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Grand total in Kgs
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {totalweight}
                </td>
              </tr>
            </tfoot>
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
      label: <p>Reviews</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "90%", margin: "auto" }}>
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                Operator Sign & Date
              </td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                Production Supervisor Sign & Date
              </td>

              <td colSpan="10" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
            </tr>

            <tr>
              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                <div>
                  {selectedRow?.operator_status === "OPERATOR_APPROVED" && (
                    <>
                      {OperatorSign}
                      <br />
                      {formattedOperatorDate}
                      <br />

                      {getImageOP && (
                        <>
                          <br />
                          <img
                            src={getImageOP}
                            alt="logo"
                            className="signature"
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </td>
              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                <div>
                  {(selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
                    selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    selectedRow?.hod_status === "HOD_REJECTED") && (
                    <>
                      {SupervisorSign}
                      <br />
                      {formattedSupervisorDate}
                      <br />

                      {getImageSUP && (
                        <>
                          <br />
                          <img
                            src={getImageSUP}
                            alt="logo"
                            className="signature"
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </td>

              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                <div>
                  {(selectedRow?.hod_status === "HOD_APPROVED" ||
                    selectedRow?.hod_status === "HOD_REJECTED") && (
                    <>
                      {HodSign}
                      <br />
                      {formattedhodDate} <br />
                      {getImageHOD && (
                        <>
                          <br />
                          <img
                            src={getImageHOD}
                            alt="logo"
                            className="signature"
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
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
        formName="SHIFT WISE RP PRODUCTION REPORT"
        formatNo="PH-PRD02/F-014"
        sopNo="PH-PRD02-D-03"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "ROLE_SUPERVISOR" ||
          roleauth === "ROLE_HOD" ||
          roleauth === "ROLE_QA" ||
          roleauth === "ROLE_QC" ||
          roleauth === "ROLE_DESIGNEE" ? (
            <>
              <Button
                loading={loading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                onClick={handleApprove}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleRejectModal}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              {/* <Button
                          loading={saveLoading}
                          type="primary"
                          style={{
                            backgroundColor: "#E5EEF9",
                            color: "#00308F",
                            fontWeight: "bold",
                            display: canDisplayButton2(),
                          }}
                          onClick={handleSave}
                          shape="round"
                          icon={<IoSave color="#00308F" />}
                        >
                          &nbsp;Save
                        </Button> */}
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={submitData}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: "20px",
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
      <Modal
        title="Reject"
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        destroyOnClose={true}
        showSearch
        footer={[
          <Button
            key="submit"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            onClick={handleReject}
            disabled={!rejectRemarks}
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "5px",
        }}
      >
        <Input
          addonBefore="Date"
          placeholder="Date"
          value={date}
          readOnly
          onChange={handleDateChange}
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="Shift"
          placeholder="SHIFT"
          readOnly
          value={shift}
          style={{ width: "100%", height: "35px" }}

          // onChange={(e) => setBmr_No(e.target.value)}
        />

        <Input
          addonBefore="Order No"
          placeholder="ORDER No"
          readOnly
          value={orderNo}
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="RP Mixing"
          placeholder="RP Mixing"
          readOnly
          value={Rp_mixing}
          style={{ width: "100%", height: "35px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          marginTop: "5px",
        }}
      >
        {/* <Input
          addonBefore="Material Code"
          placeholder="MATERIAL CODE"
          readOnly
          value={MATERIAL_CODE}

         style={{ width: '100%', height: '35px' }}

     
        /> */}
      </div>
      {/* 
      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>


      <Input
      addonBefore="STD GSM"
      placeholder="STD GSM"
      readOnly
      value={STD_GSM}
      style={{ width: '100%', height: '35px' }}
      />
    
   

   



  <Input
      addonBefore="Pattern"
      placeholder="PATTERN"

      readOnly

      value={PATTERN}

     
      style={{  width: '100%', height: '35px' }}


    />  

 
 
      </div> */}

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

export default Spunlace_f14;
