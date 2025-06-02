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
import BleachingHeader from "../Components/BleachingHeader.js";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { Tabs, Button, Col, Input, Row } from "antd";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import moment from "moment";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { createGlobalStyle } from "styled-components";

const PadPunching_f02_Summary = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); 
      transform-origin: top left right bottom; 
    }
  }
`;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const [machineNameLov, setmachineNameLov] = useState([]);
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [shiftPrint, setShiftPrint] = useState("");
  const [machineName, setMachineName] = useState("");
  const [machineNamePrint, setMachineNamePrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [ConsumtionData, setConsumtionData] = useState([]);
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.operator_sign;
      setSaveLoading(true);
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
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
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            if (index === printResponseData.length - 1) {
              setSaveLoading(false);
            }
          });
      }
    });
  }, [printResponseData, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.supervisor_sign;
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
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
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [printResponseData, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.hod_sign;
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage3((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [printResponseData, API.prodUrl, token]);

  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (
          data.hod_status === "HOD_REJECTED" ||
          data.supervisor_status === "SUPERVISOR_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);

  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

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
  useEffect(() => {
    const fetchmachineNameOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/padpunching/MachineLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setmachineNameLov(data);
        } else {
          console.error("API response is not an array", data);
          setmachineNameLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setmachineNameLov([]);
      }
    };

    fetchmachineNameOptions();
  }, [token]);
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
    console.log("print screen works");
  };
  const handleModalClose = () => {
    setShowModal(false);
    setShiftPrint(null);
    setDatePrint(null);
    setMachineNamePrint(null);
  };
  const handleShiftChange = (value) => {
    setShift(value);
    console.log("shift value", shift);
  };
  const handleShiftChangePrint = (value) => {
    setShiftPrint(value);
  };
  const handleMachineNameChange = (value) => {
    setMachineName(value);
  };
  const handleMachineNameChangePrint = (value) => {
    setMachineNamePrint(value);
  };
  const handleEdit = (record) => {
    console.log("recorddd", record);

    const { machineName } = record;
    const { date } = record;
    const { shift } = record;

    navigate("/Precot/PadPunching/F-02", {
      state: {
        machineName: machineName,
        date: date,
        shift: shift,
      },
    });
  };
  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    console.log("date value", value);
  };
  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  //   summary table

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/getDailyRollConsumptionSummary`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCakingData(data);
      console.log("role based get list", data);
      setConsumtionData(
        data.map((item, index) => ({
          key: item.header_id,
          date: item.date,
          shift: item.shift,
          machineName: item.machineName,
          supervisor_status: item.supervisor_status,
          operator_status: item.operator_status,
          hod_status: item.hod_status,
          sno: index + 1,
          reason: item.reason,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.message);
    } finally {
      // setLoading(false);
    }
  };

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
      title: "Machine Name",
      dataIndex: "machineName",
      key: "machineName",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      align: "center",
    },

    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod Status",
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
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }

  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 2000);
    }
  }, [printResponseData]);

  const printSubmit = () => {
    fetchmachineDetailsPrint();
  };

  const fetchmachineDetailsPrint = () => {
    let dateP;
    let shiftP;
    let machineP;
    if (datePrint == null) {
      dateP = "";
    } else {
      dateP = datePrint;
    }
    if (shiftPrint == null) {
      shiftP = "";
    } else {
      shiftP = shiftPrint;
    }
    if (machineNamePrint == null) {
      machineP = "";
    } else {
      machineP = machineNamePrint;
    }
    setSaveLoading(true);
    try {
      axios
        .get(
          `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/getByDateShiftMachinePrint?date=${dateP}&shift=${shiftP}&machineName=${machineP}`,

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
          } else {
            message.error("No Data");
            handleModalClose();
          }
        })

        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  function convertShift(shift) {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return null;
    }
  }

  //   shift
  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

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

  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    } else if (machineName == "" || machineName == null) {
      message.warning("Please Select Machine Name");
      return;
    }
    navigate("/Precot/PadPunching/F-02", {
      state: {
        machineName: machineName,
        date: date,
        shift: shift,
      },
    });
  };

  const rowsPerPage = 10; // Adjust this based on your layout

  const machineRows = printResponseData?.machineDetails?.length ?? 0;
  const rollRows = printResponseData?.rollConsumptionDetails?.length ?? 0;
  const stoppageRows = printResponseData?.stoppageDetails?.length ?? 0;

  const totalRows = 1 + machineRows + rollRows + stoppageRows; // Ensure totalRows is always a valid number
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1; // Default to at least 1 page

  return (
    // print section
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {printResponseData?.map((machine, index) => (
          <table style={{ marginTop: "10px", scale: "95%" }} key={index}>
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="25" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="50" rowSpan="4" style={{ textAlign: "center" }}>
                  Daily Roll Consumption Report-Pad Punching
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="25">PH-PRD03/F-002</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="25">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="25">PH-PRD04-D-03</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="25">
                  {index + 1} of {totalPages}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan="55">
                  DATE:{formattedDate(printResponseData?.[index]?.date)}
                </th>
                <th colSpan="60">SHIFT:{printResponseData?.[index]?.shift}</th>
              </tr>
              <tr>
                <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                  Machine Name
                </th>
                <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                  Type Of Pad
                </th>
                <th colSpan="25" rowSpan="2" style={{ textAlign: "center" }}>
                  Product Name
                </th>
                <th colSpan="20" rowSpan="2" style={{ textAlign: "center" }}>
                  BMR NO. / ORDER NO.
                </th>
                <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                  Pattern
                </th>
                <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                  GSM
                </th>
                <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                  Edge
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  No of Pads / Bags{" "}
                </th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  STD
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Act
                </th>
              </tr>

              {printResponseData?.[index]?.machineDetails?.map(
                (slice, index) => (
                  <tr key={index}>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {machine.machineName}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {slice.typeOfPad}
                    </td>
                    <td colSpan="25" style={{ textAlign: "center" }}>
                      {slice.productName}
                    </td>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      {slice.bmrNo}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {slice.pattern}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {slice.gsm}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {slice.edge}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {slice.noOfPadsStd}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {slice.noOfPadsAct}
                    </td>
                  </tr>
                )
              )}
              <tr>
                <th colSpan="115">Roll Consumption Details</th>
              </tr>
              <tr>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Date
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Time
                </th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  BMR NO. / ORDER NO
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Roll No
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Shaft No.
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Net Wt.
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Balance Wt.
                </th>
              </tr>
              {printResponseData?.[index]?.rollConsumptionDetails?.map(
                (slice, index) => (
                  <tr key={index}>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      {formattedDate(slice.date)}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {formattedTime(slice.time)}
                    </td>
                    <td colSpan="25" style={{ textAlign: "center" }}>
                      {slice.bmrNo}
                    </td>
                    <td colSpan="15" style={{ textAlign: "center" }}>
                      {slice.rollNo}
                    </td>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      {slice.shaftNo}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {slice.netWt}
                    </td>
                    <td colSpan="15" style={{ textAlign: "center" }}>
                      {slice.balanceWt}
                    </td>
                  </tr>
                )
              )}
              <tr>
                <th colSpan="115">Stoppage Details</th>
              </tr>
              <tr>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  M/c stop time (min)
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  M/c start time (min)
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Total min
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Reason
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Attend by
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Remarks
                </th>
              </tr>
              {printResponseData?.[index]?.stoppageDetails?.map(
                (slice, index) => (
                  <tr key={index}>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      {slice.stopTime}
                    </td>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      {slice.startTime}
                    </td>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      {slice.totalMin}
                    </td>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      {slice.reason}
                    </td>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      {slice.attendBy}
                    </td>
                    <td colSpan="15" style={{ textAlign: "center" }}>
                      {slice.remarks}
                    </td>
                  </tr>
                )
              )}
              <tr>
                <th colSpan="115" style={{ height: "30px" }}>
                  Production Details in Bags :
                  {printResponseData?.[index]?.prodDetailsInBags || "NA"}{" "}
                </th>
              </tr>
              <tr>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Operator Sign & Date
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Production Supervisor Sign & Date
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  HOD/Designee Sign & Date
                </th>
                <th colSpan="25" rowSpan="2" style={{ verticalAlign: "top" }}>
                  Remarks:
                  {printResponseData?.[index]?.prodDetailsInBags || "NA"}{" "}
                </th>
              </tr>
              <tr>
                <td
                  colSpan="30"
                  style={{ textAlign: "center", height: "30px" }}
                >
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
                      alt={`Supervisor Sign ${index + 1}`}
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
                  {printResponseData[index].operator_sign || ""}
                  <br />
                  {formattedDateWithTime(
                    printResponseData[index]?.operator_submitted_on
                  )}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {" "}
                  {getImage2[index] && (
                    <img
                      src={getImage2[index]}
                      alt={`Supervisor Sign ${index + 1}`}
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
                  {printResponseData[index].supervisor_sign || ""}
                  <br />
                  {formattedDateWithTime(
                    printResponseData[index]?.supervisor_submit_on
                  )}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {" "}
                  {getImage3[index] && (
                    <img
                      src={getImage3[index]}
                      alt={`Supervisor Sign ${index + 1}`}
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
                  {printResponseData[index].hod_sign || ""}
                  <br />
                  {formattedDateWithTime(
                    printResponseData[index]?.hod_submit_on
                  )}
                </td>
              </tr>
            </tbody>
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
          formName="Daily Roll Consumption Report-Pad Punching"
          formatNo="PH-PRD03/F-002"
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
        <Row
          align="middle"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "10px",
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
              style={{ width: "100%", height: "30px" }}
            />
          </Col>

          <Col>
            {" "}
            <label>Shift:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={shift}
              onChange={handleShiftChange}
              style={{ width: "100%" }}
              placeholder="Search Shift"
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
            <label>Machine Name:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={machineName}
              onChange={handleMachineNameChange}
              style={{ width: "100%" }}
              placeholder="Search Machine Name"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Machine Name
              </Select.Option>
              {machineNameLov.map((option) => (
                <Select.Option key={option.value} value={option.MCN}>
                  {option.MCN}
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
      {/* TABLE */}
      {/* <Table  bordered
          style={{
            textAlign: "center",
            width: "100%",
           
          }}  columns={columns}  columns1={columns1} dataSource={ConsumtionData} /> */}
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={ConsumtionData}
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
            onChange={handleDatePrint}
            type="date"
            value={datePrint}
            size="small"
            max={formattedToday}
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
            onChange={handleShiftChangePrint}
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
            Machine Name:
          </label>

          <Select
            showSearch
            value={machineNamePrint}
            onChange={handleMachineNameChangePrint}
            style={{ width: "50%" }}
            placeholder="Select Machine Name"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Machine Name
            </Select.Option>
            {machineNameLov.map((option) => (
              <Select.Option key={option.value} value={option.MCN}>
                {option.MCN}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default PadPunching_f02_Summary;
