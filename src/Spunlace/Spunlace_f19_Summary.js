/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../Assests/logo.png";
import {
  Table,
  Modal,
  Select,
  InputGroup,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { Tabs, Button, Col, Input, Row } from "antd";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import moment from "moment";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f19_Summary = () => {
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
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const navigate = useNavigate();
  const [shiftLov, setShiftLov] = useState([]);
  const [shift, setShift] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [shiftPrint, setSiftPrint] = useState("");
  const [CottonWasteData, setCottonWasteData] = useState([]);
  const [cakingData, setCakingData] = useState([]);
  const [reason, setReason] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.supervisor_sign;
    if (username) {
      // console.loglog("usernameparams", username);

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
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.hod_sign;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);

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

  //   Formated Dates in SIGN

  const formattedDate = () => {
    if (printResponseData?.date) {
      const date = moment(printResponseData.date);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDatesupervisor = () => {
    if (printResponseData?.supervisor_submit_on) {
      const date = moment(printResponseData.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDateHod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  //   print Model
  const handlePrint = () => {
    setShowModal(true);
    // console.loglog("print screen works");
  };

  const printSubmit = () => {
    if (datePrint == "" || datePrint == null) {
      message.warning("Please Select Date");
      return;
    } else if (shiftPrint == "" || shiftPrint == null) {
      message.warning("Please Select Shift");
      return;
    }
    window.print();
    handleModalClose();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
    setSiftPrint(null);
  };

  //   const handlePrintDateChange = (event) => {
  //     try {
  //       setDatePrint(event.target.value);
  //       axios.get(
  //         `${API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/getByDatePrintApi?date=${event.target.value}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data) {
  //           setPrintResponseData(res.data);
  //           // console.loglog("print response",printResponseData.date);
  //           // setPrintValue(value);
  //         } else {
  //           setPrintResponseData([]);
  //           message.error("no data found...!");
  //         }
  //       })
  //       .catch((err) => {
  //         // console.loglog("Error", err);
  //       });
  //     } catch (error) {
  //       console.error('Error in handleDatePrintChange:', error);
  //     }
  //   };

  //   handle edit
  const handleEdit = (record) => {
    // console.loglog("recorddd",record)
    const { date } = record;
    const { shift } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/Spunlace/F-19", {
      state: {
        date: formattedDate,
        shift: shift,
      },
    });
    // console.loglog("selected Date edit",date,shift);
  };

  // Header Parametes
  //   const handleDateChange = (event) => {
  //     const value = event.target.value;
  //     setDate(value);
  //     // console.loglog("date value", value);
  //   };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseWasteReportSpunlace/getSummary`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_HOD" ||
        role === "ROLE_DESIGNEE"
      ) {
        setCakingData(data);
      }

      // console.loglog("Summary Get List",data)
      if (
        role === "ROLE_HOD" ||
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_DESIGNEE"
      ) {
        setCottonWasteData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            shift: item.shift,
            supervisor_status: item.supervisor_status,
            hod_status: item.hod_status,
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
      console.error("Error fetching data:", error);
      // message.error(error.message);
    } finally {
    }
  };

  const getTotal1 = (rows, type) => {
    if (type == "bags") {
      const sum1 = rows.reduce((total, row) => {
        const value = parseFloat(row.microWasteNoOfBags) || 0;
        return total + value;
      }, 0);
      return sum1;
    }
    if (type == "weight") {
      const sum2 = rows.reduce((total, row) => {
        const value = parseFloat(row.microWasteTotalWt) || 0;
        return total + value;
      }, 0);
      return sum2;
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
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },

    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod/Designee  Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%" }}
            //   disabled={record.status == "SUBMIT" ? true : false}
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

  const fetchPrintValue = (value) => {
    try {
      if (datePrint == "" || datePrint == null) {
        message.warning("Please Select Date");
        return;
      }
      setSiftPrint(value);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseWasteReportSpunlace/findByDateShiftPrintApi?date=${datePrint}&shift=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.message !== "No data") {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
            // console.loglog("print response...............",res.data);
            // console.loglog("set print response",printResponseData);
          } else {
            // setPrintResponseData([]);
            message.error(res.data.message);
            handleModalClose();
          }
        })
        .catch((err) => {
          // console.loglog("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  // Shift LOV
  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
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
          setShiftLov(data);
        } else {
          console.error("API response is not an array", data);
          setShiftLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setShiftLov([]);
      }
    };

    fetchShiftOptions();
  }, [token]);

  //   goto Button Fields
  const handleShiftChange = (value) => {
    setShift(value);
    // console.loglog("shift value header", shift);
  };
  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    // console.loglog("date value", value);
  };
  const handleDateChangePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
    // console.loglog("date value", value);
    // fetchPrintValue(shiftPrint);
  };

  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    navigate("/Precot/Spunlace/F-19", {
      state: {
        date: date,
        shift: shift,
      },
    });
    // console.loglog("selected Date",date,shift);
  };

  const entriesPerPage = 10;
  const slicelistPrintResponse = [];

  if (printResponseData && printResponseData.reportDetails) {
    for (
      let i = 0;
      i < printResponseData.reportDetails.length;
      i += entriesPerPage
    ) {
      slicelistPrintResponse.push(
        printResponseData.reportDetails.slice(i, i + entriesPerPage)
      );
    }
  }

  return (
    // print section
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {slicelistPrintResponse.map((slice, pageIndex) => (
          <table
            style={{
              marginTop: "10px",
              scale: "95%",
              pageBreakBefore: pageIndex > 1 ? "always" : "auto",
            }}
            key={pageIndex}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="100"></td>
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
                <th colSpan="55" rowSpan="4" style={{ textAlign: "center" }}>
                  Shift Wise Cotton Waste Report of Spunlace{" "}
                </th>
                <td colSpan="44">Format No.:</td>
                <td colSpan="44">PH-PRD02/F-019</td>
              </tr>
              <tr>
                <td colSpan="44">Revision No.:</td>
                <td colSpan="44">01</td>
              </tr>
              <td colSpan="44">Ref. SOP No.:</td>
              <td colSpan="44">PH-PRD02-D-03</td>
              <tr>
                <td colSpan="44">Page No.:</td>
                <td colSpan="44">
                  {pageIndex + 1} of {slicelistPrintResponse.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="100"></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <th colSpan="60" style={{ height: "30px" }}>
                  DATE: {formattedDate()}{" "}
                </th>
                <th colSpan="88" style={{}}>
                  SHIFT: {printResponseData?.shift}{" "}
                </th>
              </tr>

              <tr>
                <th
                  colSpan="24"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  COMPACTOR WASTE IN KGS
                </th>
                <th colSpan="36" style={{ textAlign: "center" }}>
                  SWWS WASTE IN KGS
                </th>
                <th colSpan="44" style={{ textAlign: "center" }}>
                  EXFOLATING WASTE IN KGS
                </th>
                <th colSpan="44" style={{ textAlign: "center" }}>
                  MICRO WASTE IN KGS
                </th>
              </tr>
              <tr>
                <th
                  colSpan="12"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  NO. OF BAG
                </th>
                <th
                  colSpan="12"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  NET WEIGHT
                </th>
                <th
                  colSpan="12"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  NO. BAGS
                </th>
                <th
                  colSpan="12"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  NET WEIGHT
                </th>
                <th
                  colSpan="12"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  TOTAL WEIGHT
                </th>
                <th
                  colSpan="22"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  NO. OF BAG
                </th>
                <th
                  colSpan="22"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  NET WEIGHT
                </th>
                <th
                  colSpan="22"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  NO. BAGS
                </th>
                <th
                  colSpan="22"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  TOTAL WEIGHT
                </th>
              </tr>
              {slice.map((row, index) => (
                <tr key={index}>
                  <td
                    colSpan="12"
                    style={{ textAlign: "center", height: "8px" }}
                  >
                    {row.compactorWasteNoOfBags || 0}
                  </td>
                  <td
                    colSpan="12"
                    style={{ textAlign: "center", height: "8px" }}
                  >
                    {row.compactorWasteNWt || 0}
                  </td>
                  <td
                    colSpan="12"
                    style={{ textAlign: "center", height: "8px" }}
                  >
                    {row.swwsWasteNoOfBags || 0}
                  </td>
                  <td
                    colSpan="12"
                    style={{ textAlign: "center", height: "8px" }}
                  >
                    {row.swwsWasteNWt || 0}
                  </td>
                  <td
                    colSpan="12"
                    style={{ textAlign: "center", height: "8px" }}
                  >
                    {row.swwsWasteTotalWt || 0}
                  </td>
                  <td
                    colSpan="22"
                    style={{ textAlign: "center", height: "8px" }}
                  >
                    {row.exfolatingWasteNoOfBags || 0}
                  </td>
                  <td
                    colSpan="22"
                    style={{ textAlign: "center", height: "8px" }}
                  >
                    {row.exfolatingWasteNWt || 0}
                  </td>
                  <td
                    colSpan="22"
                    style={{ textAlign: "center", height: "8px" }}
                  >
                    {row.microWasteNoOfBags || 0}
                  </td>
                  <td
                    colSpan="22"
                    style={{ textAlign: "center", height: "8px" }}
                  >
                    {row.microWasteTotalWt || 0}
                  </td>
                </tr>
              ))}
              {pageIndex === slicelistPrintResponse.length - 1 && (
                <>
                  <tr>
                    <th
                      colSpan="12"
                      style={{
                        textAlign: "center",
                        height: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      <b>
                        <strong>
                          {printResponseData?.compactorWasteNoOfBagsSum}
                        </strong>
                      </b>
                    </th>
                    <th
                      colSpan="12"
                      style={{ textAlign: "center", height: "30px" }}
                    >
                      <b>
                        <strong>
                          {printResponseData?.compactorWasteNWtSum}
                        </strong>
                      </b>
                    </th>
                    <th
                      colSpan="12"
                      style={{ textAlign: "center", height: "30px" }}
                    >
                      <b>
                        <strong>
                          {printResponseData?.swwsWasteNoOfBagsSum}
                        </strong>
                      </b>
                    </th>
                    <th
                      colSpan="12"
                      style={{ textAlign: "center", height: "30px" }}
                    >
                      <b>
                        <strong>{printResponseData?.swwsWasteNWtSum}</strong>
                      </b>
                    </th>
                    <th
                      colSpan="12"
                      style={{ textAlign: "center", height: "30px" }}
                    >
                      <b>
                        <strong>
                          {printResponseData?.swwsWasteTotalWtSum}
                        </strong>
                      </b>
                    </th>
                    <th
                      colSpan="22"
                      style={{ textAlign: "center", height: "30px" }}
                    >
                      <b>
                        <strong>
                          {printResponseData?.exfolatingWasteNoOfBagsSum}
                        </strong>
                      </b>
                    </th>
                    <th
                      colSpan="22"
                      style={{ textAlign: "center", height: "30px" }}
                    >
                      <b>
                        <strong>
                          {printResponseData?.exfolatingWasteNWtSum}
                        </strong>
                      </b>
                    </th>
                    <th
                      colSpan="22"
                      style={{ textAlign: "center", height: "30px" }}
                    >
                      <b>
                        <strong>{getTotal1(slice, "bags")}</strong>
                      </b>
                    </th>
                    <th
                      colSpan="22"
                      style={{ textAlign: "center", height: "30px" }}
                    >
                      <b>
                        <strong>{getTotal1(slice, "weight")}</strong>
                      </b>
                    </th>
                  </tr>
                  <tr>
                    <td
                      colSpan="60"
                      style={{ height: "20px", textAlign: "center" }}
                    >
                      Production Supervisor Sign & Date
                    </td>
                    <td colSpan="88" style={{ textAlign: "center" }}>
                      HOD / Designee Sign & Date
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="60"
                      style={{
                        height: "48px",
                        textAlign: "center",
                        marginBottom: "auto",
                        verticalAlign: "bottom",
                      }}
                    >
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Supervisor Sign"
                          style={{
                            width: "60%",
                            height: "60%",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                      <br /> {printResponseData?.supervisor_sign || ""}
                      <br />
                      {formattedDatesupervisor()}
                    </td>
                    <td
                      colSpan="88"
                      style={{
                        height: "48px",
                        textAlign: "center",
                        verticalAlign: "bottom",
                      }}
                    >
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="Hod Sign"
                          style={{
                            width: "60%",
                            height: "60%",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                      <br /> {printResponseData?.hod_sign || ""}
                      <br />
                      {formattedDateHod()}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="100"></td>
              </tr>
              <tr>
                <th colSpan="24">Particular</th>
                <th colSpan="46" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="44" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                {/* <th colSpan="25" style={{ textAlign: "center" }}><centre>Reviewed by</centre></th> */}
                <th colSpan="44" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="24">Name</th>
                <td colSpan="46"></td>
                <td colSpan="44"></td>
                <td colSpan="44"></td>
              </tr>
              <tr>
                <th colSpan="24">Signature & Date</th>
                <td colSpan="46"></td>
                <td colSpan="44"></td>
                <td colSpan="44"></td>
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
          formName="SHIFT WISE COTTON WASTE REPORT OF SPUNLACE"
          formatNo="PH-PRD02/F-019"
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
          <Col>
            <label>Date :</label>
          </Col>
          <Col>
            <Input
              onChange={handleDateChange}
              type="date"
              value={date}
              size="small"
              //   max ={ formattedToday }
              style={{ width: "100%", height: "30px" }}
            />
          </Col>
          <Col>
            <label>Shift:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={shift}
              onChange={handleShiftChange}
              style={{ width: "100%" }}
              placeholder="Select Shift"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Shift
              </Select.Option>
              {shiftLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
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
          dataSource={CottonWasteData}
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
            //   disabled={!datePrint}
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date:
          </label>
          <Input
            onChange={handleDateChangePrint}
            type="date"
            value={datePrint}
            size="small"
            // max ={ formattedToday }
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
            Shift:
          </label>
          <Select
            showSearch
            value={shiftPrint}
            onChange={fetchPrintValue}
            style={{ width: "50%" }}
            placeholder="Select Shift"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Shift
            </Select.Option>
            {shiftLov.map((option) => (
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

export default Spunlace_f19_Summary;
