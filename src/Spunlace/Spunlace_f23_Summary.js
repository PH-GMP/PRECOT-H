/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../Assests/logo.png";
import { Table, Modal, Select, InputGroup, message, Tooltip, Menu, Avatar, Drawer } from "antd";
import { EyeOutlined, EditOutlined, PlusOutlined, LeftOutlined, } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { Tabs, Button, Col, Input, Row, } from 'antd';
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import moment from 'moment';
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";



const Spunlace_f23_Summary = () => {

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
  const [monthPrint, setmonthPrint] = useState("");
  const [yearPrint, setYearPrint] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[printResponseData.length - 1]?.supervisor_sign;
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[printResponseData.length - 1]?.hod_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl, token]);

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });

  //   Formated Dates in SIGN

  // const formattedDate = () => {
  //     if (printResponseData?.hod_submit_on) {
  //       const date = moment(printResponseData.hod_submit_on);
  //       if (date.isValid()) {
  //         return date.format('DD/MM/YYYY HH:mm');
  //       }
  //     }
  //     return '';
  //   };
  const formattedDatesupervisor = () => {
    if (printResponseData?.[printResponseData.length - 1]?.supervisor_submit_on) {
      const date = moment(printResponseData[printResponseData.length - 1].supervisor_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };
  const formattedDateHod = () => {
    if (printResponseData?.[printResponseData.length - 1]?.hod_submit_on) {
      const date = moment(printResponseData[printResponseData.length - 1].hod_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
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
    if (yearPrint == "" || yearPrint == null) {
      message.warning('Please Select Year');
      return;
    } else if (monthPrint == "" || monthPrint == null) {
      message.warning('Please Select Month');
      return;
    }
    window.print()
    handleModalClose();
  }

  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
    setmonthPrint(null);

  };



  //   handle edit
  const handleEdit = (record) => {
    // console.loglog("recorddd",record)
    const { date } = record;
    const formattedDate = moment(date).format('YYYY-MM-DD');
    navigate("/Precot/Spunlace/F-23", {
      state: {
        date: formattedDate
      }
    });
    // console.loglog("selected Date edit",date);  
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

      let apiUrl = `${ API.prodUrl}/Precot/api/spunlace/Service/MachineCleaningRecord/getMachineCleaningSummary`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (role === "ROLE_SUPERVISOR" || role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
        setCakingData(data);
      }

      // console.loglog("Summary Get List",data)
      if (role === "ROLE_HOD" || role === "ROLE_SUPERVISOR" || role === "ROLE_DESIGNEE") {
        setSummaryData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            supervisor_status: item.supervisor_status,
            hod_status: item.hod_status,
            id: item.id,
            sno: index + 1,
            reason: item.reason
          }))
        );
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500)

      }

    } catch (error) {
      console.error("Error fetching data:", error);

    } finally {

    }

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
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      },
    },

    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod/Designee Status",
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
    render: (text) => (text ? text : 'N/A')
  };

  let columns;
  if (reason) {
    columns = [
      ...baseColumns.slice(0, 4),
      Reason,
      ...baseColumns.slice(4),
    ];
  } else {
    columns = baseColumns;
  }


  const fetchPrintValue = (value) => {
    try {

      setmonthPrint(value)
      axios.get(
        `${ API.prodUrl}/Precot/api/spunlace/Service/MachineCleaningRecord/findByMonthYearPrintApi?month=${value}&year=${yearPrint}`,
        // `${ API.prodUrl}/Precot/api/spulance/fetchBaleConsumption?order=ORD5678&date=2024-07-10&shift=III`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.data && res.data.message !== "No data") {

            const printResponseData = (res.data);
            setPrintResponseData(printResponseData);
            // console.loglog("print response...............",res.data[0]);
            // console.loglog("set print response",printResponseData);
          } else {
            message.error(res.data.message);
            handleModalClose();
          }
        })
        .catch((err) => {
          // console.loglog("Error", err);
        });
    } catch (error) {
      console.error('Error in handleDatePrintChange:', error);

    }
  };

  // Shift LOV

  // goto Button Fields

  const handleMonthChangePrint = (value) => {
    setmonthPrint(value);

  };
  const handleYearChangePrint = (value) => {
    setYearPrint(value);
    // console.loglog("print year value", yearPrint);
  };
  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    // console.loglog("date value", value);
  };


  //   goto button
  const goTo = () => {

    if (date == "" || date == null) {
      message.warning('Please Select Date');
      return;
    }
    navigate("/Precot/Spunlace/F-23", {
      state: {
        date: date,

      }
    });
    // console.loglog("selected Date in 23_______",date);
  }

  const [dateLov, setDateLov] = useState([]);
  useEffect(() => {
    const generateDates = (month, year) => {
      const dates = [];
      const daysInMonth = new Date(year, month, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        dates.push(`${day}`);
      }
      return dates;
    };
    const dates = generateDates(monthPrint, yearPrint);
    // console.loglog("Dates", dates);
    setDateLov(dates);
  }, dateLov);

  return (

    // print section
    <div>
      <GlobalStyle />
      <div id="section-to-print">



        <table style={{ marginTop: '10px', scale: "95%" }} >
          <thead >
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="105"></td>
            </tr>
            <tr>
              <td colSpan="15" rowspan="4 " style={{ textAlign: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
                <br></br>
                Unit H
              </td>
              <th colSpan="60" rowSpan="4" style={{ textAlign: 'center' }}>Machine Cleaning Record (Weekly)</th>
              <td colSpan="15">Format No.:</td>
              <td colSpan="15">PH-PRD02/F-023</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No.:</td>
              <td colSpan="15">01</td>
            </tr>
            <td colSpan="15">Ref. SOP No.:</td>
            <td colSpan="15">PH-PRD02-D-04</td>
            <tr>
              <td colSpan="15">Page No.:</td>
              <td colSpan="15">1 of 3</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="105">Date for the month & year of: {" "}{monthPrint}/{yearPrint}{" "} </td>
            </tr>
            <tr>
              <th colSpan="5" style={{ textAlign: "center" }}>Machines</th>
              <th colSpan="7" style={{ textAlign: "center" }}>Cleaning Parts</th>

              {dateLov.map((record, rowIndex) => (
                <th key={rowIndex} colSpan="3">
                  <p
                    style={{
                      // width: "10px",
                      // height: "90px",
                      // display: "flex",
                      alignItems: "center",
                      // justifyContent: "center",
                    }}
                  >
                    {rowIndex + 1}
                  </p>
                </th>
              ))}
            </tr>
            <tr>
              <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>B/O, WBO 1 & 2</th>
              <th colSpan="7" style={{ textAlign: "center" }}>Feed table</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.boFeedTable === 'Y' ? (
                          '✓'
                        ) : printData.boFeedTable === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}
            </tr>
            <tr>
              <th colSpan="7" style={{ textAlign: "center" }}>Middle Table </th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.boMidTable === 'Y' ? (
                          '✓'
                        ) : printData.boMidTable === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}
            </tr>
            <tr>
              <th colSpan="5" rowSpan="3" style={{ textAlign: "center" }}>FO/PO</th>
              <th colSpan="7">Feed roller</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.foFeedRoller === 'Y' ? (
                          '✓'
                        ) : printData.foFeedRoller === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}


            </tr>
            <tr>
              <th colSpan="7" style={{ textAlign: "center" }}>Beater</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.foBeater === 'Y' ? (
                          '✓'
                        ) : printData.foBeater === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">Perforated plates</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.foPerforatedPlate === 'Y' ? (
                          '✓'
                        ) : printData.foPerforatedPlate === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="5" rowSpan="3" style={{ textAlign: "center" }}>RIETER 1 & 2</th>
              <th colSpan="7">Chute Cleaning</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.rieterChuteClean === 'Y' ? (
                          '✓'
                        ) : printData.rieterChuteClean === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">Flats Cleaning</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.rieterFlatsClean === 'Y' ? (
                          '✓'
                        ) : printData.rieterFlatsClean === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">Doffer cleaning</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.rieterDofferClean === 'Y' ? (
                          '✓'
                        ) : printData.rieterDofferClean === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
           

          </tbody>
          <tfoot >
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="105"></td>
            </tr>
            <tr>
              <th colSpan="30" >Particular</th>
              <th colSpan="25" style={{ textAlign: "center" }}>Prepared by</th>
              <th colSpan="25" style={{ textAlign: "center" }}>Reviewed by</th>
              <th colSpan="25" style={{ textAlign: "center" }}>Approved by</th>
            </tr>
            <tr>
              <th colSpan="30">Name</th>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
            </tr>
            <tr>
              <th colSpan="30">Signature & Date</th>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
            </tr>
          </tfoot>

        </table>
        <table style={{ marginTop: '10px', scale: "95%" }} >
          <thead >
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="105"></td>
            </tr>
            <tr>
              <td colSpan="15" rowspan="4 " style={{ textAlign: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
                <br></br>
                Unit H
              </td>
              <th colSpan="60" rowSpan="4" style={{ textAlign: 'center' }}>Machine Cleaning Record (Weekly)</th>
              <td colSpan="15">Format No.:</td>
              <td colSpan="15">PH-PRD02/F-023</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No.:</td>
              <td colSpan="15">01</td>
            </tr>
            <td colSpan="15">Ref. SOP No.:</td>
            <td colSpan="15">PH-PRD02-D-04</td>
            <tr>
              <td colSpan="15">Page No.:</td>
              <td colSpan="15">2 of 3</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead><br />
          <tbody>
          <tr>
              <th colSpan="5" rowSpan="6" style={{ textAlign: "center" }}>ALC1 & ALC2</th>
              <th colSpan="7">Chute Cleaning</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.alcChuteClean === 'Y' ? (
                          '✓'
                        ) : printData.alcChuteClean === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">Side Microdust Cleaning</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.alcMicrodustClean === 'Y' ? (
                          '✓'
                        ) : printData.alcMicrodustClean === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">Mesh belt cleaning</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.alcMeshBeltClean === 'Y' ? (
                          '✓'
                        ) : printData.alcMeshBeltClean === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">Exhaust Mesh cleaning</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.alcExhaustHMeshClean === 'Y' ? (
                          '✓'
                        ) : printData.alcExhaustHMeshClean === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">collecting belt cleaning</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.alcCollectngBeltClean === 'Y' ? (
                          '✓'
                        ) : printData.alcCollectngBeltClean === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">Platform</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.alcPlatform === 'Y' ? (
                          '✓'
                        ) : printData.alcPlatform === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>JETLACE</th>
              <th colSpan="7">J1,JP,J2S Belts</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.jetlaceBelts === 'Y' ? (
                          '✓'
                        ) : printData.jetlaceBelts === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">C1,C2 Drums</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.jetlaceDrums === 'Y' ? (
                          '✓'
                        ) : printData.jetlaceDrums === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>DRYER A & B</th>
              <th colSpan="7">Feed Rollers</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.dryerFeedRollers === 'Y' ? (
                          '✓'
                        ) : printData.dryerFeedRollers === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>

            <tr>
              <th colSpan="7">Drums</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.dryerDrums === 'Y' ? (
                          '✓'
                        ) : printData.dryerDrums === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>WINDER</th>
              <th colSpan="7">S Rollers</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.winderSRollers === 'Y' ? (
                          '✓'
                        ) : printData.winderSRollers === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>

            <tr>
              <th colSpan="7">Drum</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.winderDrum === 'Y' ? (
                          '✓'
                        ) : printData.winderDrum === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>

            </tbody><br />
          <tfoot >
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="105"></td>
            </tr>
            <tr>
              <th colSpan="30" >Particular</th>
              <th colSpan="25" style={{ textAlign: "center" }}>Prepared by</th>
              <th colSpan="25" style={{ textAlign: "center" }}>Reviewed by</th>
              <th colSpan="25" style={{ textAlign: "center" }}>Approved by</th>
            </tr>
            <tr>
              <th colSpan="30">Name</th>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
            </tr>
            <tr>
              <th colSpan="30">Signature & Date</th>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
            </tr>
          </tfoot>

        </table>




            <table style={{ marginTop: '10px', scale: "95%" }} >
          <thead >
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="105"></td>
            </tr>
            <tr>
              <td colSpan="15" rowspan="4 " style={{ textAlign: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
                <br></br>
                Unit H
              </td>
              <th colSpan="60" rowSpan="4" style={{ textAlign: 'center' }}>Machine Cleaning Record (Weekly)</th>
              <td colSpan="15">Format No.:</td>
              <td colSpan="15">PH-PRD02/F-023</td>
            </tr>
            <tr>
              <td colSpan="15">Revision No.:</td>
              <td colSpan="15">01</td>
            </tr>
            <td colSpan="15">Ref. SOP No.:</td>
            <td colSpan="15">PH-PRD02-D-04</td>
            <tr>
              <td colSpan="15">Page No.:</td>
              <td colSpan="15">3 of 3</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="100"></td>
            </tr>
          </thead><br />
          <tbody>

            <tr>
              <th colSpan="5" rowSpan="3" style={{ textAlign: "center" }}>RP BalePress</th>
              <th colSpan="7">Feed roller</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.rpFeedRoller === 'Y' ? (
                          '✓'
                        ) : printData.rpFeedRoller === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">Beater</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.rpBeater === 'Y' ? (
                          '✓'
                        ) : printData.rpBeater === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <th colSpan="7">Perforated plates</th>
              {dateLov.map((date, rowIndex) => {
                const printData = printResponseData?.find(
                  (data) => {
                    const dateParts = data.date.split('-');
                    // console.loglog("Date parts",dateParts)
                    // console.loglog("date ",date)
                    return parseInt(dateParts[2]) == date;
                  }
                );
                // console.loglog("PrintData",printData)

                return (
                  <td key={rowIndex} className="data-border" colSpan="3">
                    <p
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {printData ? (
                        printData.rpPerforatedPlates === 'Y' ? (
                          '✓'
                        ) : printData.rpPerforatedPlates === 'N' ? (
                          'X'
                        ) : (
                          'N/A'
                        )
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </td>
                );
              })}

            </tr>
            <tr>
              <td colSpan="52" style={{ height: "20px", textAlign: "center" }}>Production Supervisor Sign & Date</td>
              <td colSpan="52" style={{ textAlign: "center" }}>HOD / Designee Sign & Date</td>
            </tr>
            <tr>
              <td colSpan="52" style={{ height: "48px", textAlign: "center", marginBottom: "auto", verticalAlign: "bottom" }}>
                {getImage1 && (
                  <img
                    src={getImage1}
                    alt="Supervisor Sign"
                    style={{
                      width: "70%",
                      height: "70%",
                      marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />)} <br />{printResponseData?.[printResponseData.length - 1]?.supervisor_sign || ''}<br />{formattedDatesupervisor()}
              </td>
              <td colSpan="52" style={{ height: "48px", textAlign: "center", verticalAlign: "bottom" }}>
                {getImage2 && (
                  <img
                    src={getImage2}
                    alt="Hod Sign"
                    style={{
                      width: "70%",
                      height: "70%",
                      marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />)} <br />{printResponseData?.[printResponseData.length - 1]?.hod_sign || ''}<br />{formattedDateHod()}
              </td>
            </tr>


          </tbody><br />
          <tfoot >
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="105"></td>
            </tr>
            <tr>
              <th colSpan="30" >Particular</th>
              <th colSpan="25" style={{ textAlign: "center" }}>Prepared by</th>
              <th colSpan="25" style={{ textAlign: "center" }}>Reviewed by</th>
              <th colSpan="25" style={{ textAlign: "center" }}>Approved by</th>
            </tr>
            <tr>
              <th colSpan="30">Name</th>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
            </tr>
            <tr>
              <th colSpan="30">Signature & Date</th>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
              <td colSpan="25"></td>
            </tr>
          </tfoot>

        </table>


      </div>


      {/* HEADER */}

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
        <BleachingHeader
          unit="Unit-H"
          formName="Machine Cleaning Record (Weekly) "
          formatNo="PH-PRD02/F-023"
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

        <Row align="middle" style={{ marginTop: "10px", marginBottom: "2px", justifyContent: "flex-start", display: "flex", gap: "10px", justifyContent: "left", marginLeft: "10px" }}>


          <Col><label >Date :</label></Col>
          <Col >
            <Input
              onChange={handleDateChange}
              type="date"
              value={date}
              size="small"
              //   max ={ formattedToday }
              style={{ width: '100%', height: '30px' }}
            />
          </Col>
          <Col >
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
          dataSource={summaryData}
        />
      </div>

      {/* SUMMARY PRINT */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}

        footer={[
          <Button key="submit" type="primary" shape="round" style={{
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
      >   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <label style={{ marginRight: '8px', width: '30%', textAlign: 'center' }}>Year:</label>

          <Select
            showSearch
            value={yearPrint}
            onChange={handleYearChangePrint}
            style={{ width: '100%' }}
            placeholder="Select your Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Your Year
            </Select.Option>
            {years.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <label style={{ marginRight: '8px', width: '30%', textAlign: 'center' }}>Month :</label>
          <Select
            showSearch
            value={monthPrint}
            onChange={fetchPrintValue}
            style={{ width: '100%' }}
            placeholder="Select Your month"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Your Months
            </Select.Option>
            {months.map((option) => (
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

export default Spunlace_f23_Summary;
