/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Space, Table, Tag, Button, Print, Tooltip, DatePicker, message, Select } from 'antd';
import { Modal, Input, Form, Col, Drawer, Row, Menu, Avatar } from "antd";
import axios from 'axios';
import BleachingHeader from '../Components/BleachingHeader';
import { IoSave, IoPrint } from 'react-icons/io5';
import { BiLock, BiNavigation, BiEdit, BiAlignJustify } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import dayjs from 'dayjs';
import moment from 'moment';
import '../Bleaching/style.css';
import { FaLock } from "react-icons/fa6";
import { IoCreate } from 'react-icons/io5';
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import BleachingTail from '../Components/BleachingTail';
import BleachingPrintHeader from '../Components/BleachingPrintHeader';
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const Metal_detector_checklist_Summary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState([]);
  // const [formData, setFormData] = useState([]);
  const { formNo } = location.state;
  const [header, setHeader] = useState({
    formatNo: 'Metal Detector Checklist',
    formName: '',
    revisionNo: '',
    refSopNo: '',
    pageNo: "01 of 01"
  });
  const todayFormatted = moment().format('YYYY/MM/DD');
  const [pageSize, setPageSize] = useState(5);
  const [messageApi, contextHolder] = message.useMessage();
  const role = localStorage.getItem('role');
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  // const [formattedDate, setFormattedDate] = useState("");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectMonthDates, setSelectMonthDates] = useState([]);
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectSection, setSelectSection] = useState("");
  const today = new Date();
  const year = today.getFullYear();
  const initialized = useRef(false)
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;
  const [printSpan, setPrintSpan] = useState({
    dailyRowSpan: 1,
    printColSpan: 1,
    cleaningOfEquip: 34,
    cleanedBy: 3,
    remarkColSpan: 1,
  })
  const [printText, setPrintText] = useState({
    hodRemark: "Reviewed by HOD/Designee:"
  })
  const [eSign, setESign] = useState({
    operator_sign: '',
    supervisor_sign: '',
    hod_sign: ''
  })
  const [initialValues, setInitialValues] = useState(
    {
      "date": "",
      "selectSection": "",
      'currentMonthDates': [],
      "formNumber": "",
      "routePath": ""
    }
  );

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

  let formNumber = formNo;
  const localUrl = location.pathname;
  if (localUrl == "/Precot/Spunlace/F-20/Summary") {
    formNumber = "PH-PRD02/F-020";
  }
  else if (localUrl == "/Precot/PadPunching/F-17/Summary") {
    formNumber = "PH-PRD03-F-006";
  }



  // console.log("Form Number", formNo)
  useEffect(() => {
    switch (formNumber) {
      case "PH-PRD03-F-006":
        setHeader(prevState => ({
          ...prevState,
          formName: "Argus Metal Detector - Check List",
          formatNo: "PH-PRD03-F-006",
          refSopNo: "PRD03-D-",
          revisionNo: "01",
        }))
        setInitialValues(prevState => ({
          ...prevState,
          "formNumber": "PH-PRD03-F-006",
          "routePath": "/Precot/PadPunching/F-17"
        }))
        setPrintSpan(prevState => ({
          ...prevState,
          dailyRowSpan: 1,
          printColSpan: 1,
          cleaningOfEquip: 34,
          cleanedBy: 3
        }))
        break;

      case "PH-PRD02/F-020":
        // console.log("Case Entered")
        setHeader(prevState => ({
          ...prevState,
          formName: "Argus Metal Detector - Check List",
          formatNo: "PH-PRD02/F-020",
          refSopNo: 'PH-PRD02-D-03',
          revisionNo: "01",
        }))

        setInitialValues(prevState => ({
          ...prevState,
          "formNumber": "PH-PRD02/F-020",
          "routePath": "/Precot/Spunlace/F-20"
        }))

        setPrintSpan(prevState => ({
          ...prevState,
          dailyRowSpan: 2,
          printColSpan: 2,
          cleaningOfEquip: 35,
          cleanedBy: 4,
          remarkColSpan: 2
        }))
        setPrintText(prevState => ({
          ...prevState,
          hodRemark: "Reviewed by HOD/Designee : "
        }))
        break;
    }
  }, [formNumber])

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const [printData, setPrintData] = useState([

  ]);
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return { value: (currentYear - index).toString(), label: (currentYear - index).toString() };
  });


  const [printButtonLoading, setPrintButtonLoading] = useState(false);



  const handlePrintSummary = () => {
    setPrintButtonLoading(true);
    // console.log(selectMonth, selectYear, selectSection)
    if (selectMonth == "" || selectMonth == null) {
      message.warning("Please Select Month!");
      setPrintButtonLoading(false);
      return;
    }
    else if (selectYear == "" || selectYear == null) {
      message.warning("Please Select Year!");
      setPrintButtonLoading(false);
      return;
    }


    console.log('month', selectMonth);
    console.log('year', selectYear);
    console.log('section', selectSection);
    const monthDates = generateDatesForMonth(selectMonth, selectYear);
    console.log('month Dates', monthDates);
    setSelectMonthDates(monthDates);
    // console.log('selectedMonthDates', selectMonthDates);
    const token = localStorage.getItem('token');

    // Configure the request
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    let apiUrl;
    if (formNumber == "PH-PRD03-F-006") {
      const selectedMonth = getMonthName(selectMonth);
      apiUrl = `${API.prodUrl}/Precot/api/PadPunching/Service/MetalDetectorCheckList/findByMonthPrintApi?month=${selectedMonth}&year=${selectYear}`;
    }
    else if (formNumber == "PH-PRD02/F-020") {
      const selectedMonth = getMonthName(selectMonth);
      apiUrl = `${API.prodUrl}/Precot/api/spunlace/Service/MetalDetectorCheckList/findByMonthYearPrintApi?month=${selectedMonth}&year=${selectYear}`;
    }


    axios.get(apiUrl, config)
      .then(response => {
        if (response.data.length == 0 || response.data.message == 'No data') {
          message.warning('No Data Available To Print');
          setPrintButtonLoading(false);
        }
        if (response.data.length > 0) {
          // console.log(response.data)

          setPrintData(response.data);


        }

      })
      .catch(error => {
        console.log("getting error in calling api")
        message.error(error.response.data.message);
        setPrintButtonLoading(false);
      });



  }
  useEffect(() => {
    // console.log("SIgn", eSign.hod_sign)
    if (printData.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
        setPrintData(
          [
            // {
            //   remarks: "",
            //   hod_submit_by: ""
            // }
          ]

        )
      }, 2000);


    }
    setESign(prevState => ({
      ...prevState,
      supervisor_sign: null,
      hod_sign: null

    }))
  }, [printData]);

  const handleCancel = () => {
    setIsPrintModalOpen(false);
    setPrintButtonLoading(false);
    setSelectMonth("");
    setSelectYear("");
    setSelectSection("");
  }

  const notificationMessage = (messageType, errorMessage) => {
    messageApi.open({
      type: messageType,
      content: errorMessage,
    });
  };

  const generateDatesForMonth = (month, year) => {

    const dates = [];

    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      if (day < 10) {
        day = "0" + day
      }
      // const date = `${day}/${month}/${year}`;
      const date = `${year}-${month}-${day}`;
      // console.log('date', date);
      dates.push(date);

    }

    return dates;
  };

  let datesInOctober2024 = [];

  const getMonthFromDate = (dateStr) => {
    // console.log('dateString', dateStr);
    const dateParts = dateStr.split('/');
    return dateParts[1];
  };

  const getYearFromDate = (dateStr) => {

    const dateParts = dateStr.split('/');
    return dateParts[0];
  };

  const handleEditClick = (record) => {
    const date = record.date;
    // console.log("edit date", date);
    const month = getMonthFromDate(date);
    const year = getYearFromDate(date);

    setInitialValues(prevState => ({
      ...prevState,
      date: record.date,
      formNumber: formNumber,
      ...(formNumber === "PH-PRD03-F-006" && { selectSection: record.section })
    }));

    setInitialValues(prevState => {
      const newState = {
        ...prevState,
        date: record.date,
        formNumber: formNumber,
        ...(formNumber === "PH-PRD03-F-006" && { selectSection: record.section })
      };

      // console.log("Updated Initial Values", newState.date);
      // console.log("Route Path", newState.routePath);

      navigate(newState.routePath, { state: { initialValues: newState } });

      return newState;
    });
  };
  // const formatDate = (dateString) => {
  //   // console.log("antd date" , dateString)
  //   const [year, month, day] = dateString.split('-');
  //   return `${day}/${month}/${year}`;
  // };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatPrintDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const findRemarks = (printData, property) => {
    let remarksArray = [];

    printData.forEach(content => {
      if (content[property] !== 'N/A') {
        remarksArray.push(content[property]);
      }
    });
    if (remarksArray == 0) {
      return 'N/A';
    }
    return remarksArray.join(',');
  };

  const baseColumns = [
    {
      title: "S. NO",
      dataIndex: "sNo",
      key: "sNo",
      render: (text, record, index) => index + 1,
      align: "center"
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: "center",
      render: text => moment(text).format('DD/MM/YYYY')
    },
    {
      title: 'Supervisor Status',
      dataIndex: 'supervisor_status',
      key: 'supervisor_status',
      align: "center"
    },
    {
      title: 'HOD Status',
      dataIndex: 'hod_status',
      key: 'hod_status',
      align: "center"
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_, record) => (
        <Button
          icon={<BiEdit />}
          style={{ width: "100%" }}
          onClick={() => handleEditClick(record)}
        >
          Review
        </Button>
      ),
    },
  ];
  let columns;
  const equipColumn = {
    title: 'Equipment Name',
    dataIndex: 'equipmentName',
    key: 'equipmentName',
    align: "center"
  }
  const sectioColumn = {
    title: 'Section',
    dataIndex: 'section',
    key: 'section',
    align: "center"
  }
  if (formNumber == "PH-PRD03-F-006") {
    columns = [
      ...baseColumns.slice(0, 1),
      equipColumn, sectioColumn,
      ...baseColumns.slice(1),
    ];
  } else {
    columns = baseColumns;
  }
  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : 'N/A')
  };

  if (reason) {
    columns = [
      ...baseColumns.slice(0, 4),
      Reason,
      ...baseColumns.slice(4),
    ];
  } else {
    columns = baseColumns;
  }






  const handleDateChange = (e) => {

    // const actualDate = new Date(date);
    // // console.log("actualDate", actualDate);
    // const localDate = new Date(actualDate.getTime() - actualDate.getTimezoneOffset() * 60000);
    // const formattedDate = localDate.toISOString().split('T')[0];
    // date in this format yyyy-mm-dd
    // // console.log('formattedDate', formattedDate);
    // setFormattedDate(formattedDate);

    // // console.log("selectedDate", date);
    const date = e.target.value;
    const formattedDate = formatedDate(date);
    const month = getMonthFromDate(formattedDate);
    const year = getYearFromDate(formattedDate);
    // console.log('current Month Dates', month);
    // const currentMonthDates = generateDatesForMonth(month, year);
    // initialValues.date = e.target.value;
    setInitialValues(prevValues => ({
      ...prevValues,
      date: date
    }));

    // selectMonthDates = [];
  }

  const handleSelctChange = (value) => {

    setInitialValues(prevValues => ({
      ...prevValues,
      selectSection: value
    }));
  }

  const formatedDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatedDateforSummary = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handleClick = () => {
    // console.log(initialValues.date, initialValues.selectSection)
    if (initialValues.date == '') {
      notificationMessage('warning', 'please select Date!');
    }
    // else if (formNumber == "PH-PRD03-F-006" && (initialValues.selectSection == '' || initialValues.selectSection == null)) {
    //   notificationMessage('warning', 'please select Section!');
    // }
    else {
      // console.log('initial', initialValues);
      const routePath = initialValues.routePath;
      navigate(routePath, { state: { initialValues } });
    }


  }
  const fetchPrintData = (date) => {

    const transformValue = (value) => {
      switch (value) {
        case "yes":
          return "✓";
        case "no":
          return "X";
        case "NA":
          return "-";
        default:
          return value;
      }
    };
    // // console.log('machineDatadate', date);
    // // console.log('print data machine', printData);

    const record = printData.find(record => record.date == date);
    console.log('The record is :', record)
    let result = {
      metalContaminatedMaterials: '',
      noOfMetalContaminants: '',
      functionCheck: '',
      checkedBy: '',
      cleanedBy: '',
      hod_submit_by: '',
      metalContaminatedMaterials4B: ''
    };

    if (record) {
      if (formNumber == "PH-PRD03-F-006") {
        result = {
          metalContaminatedMaterials: transformValue(record.metalContaminatedMaterials),
          noOfMetalContaminants: transformValue(record.noOfMetalContaminants),
          functionCheck: transformValue(record.functionCheck),
          checkedBy: transformValue(record.supervisor_submit_by),
          cleanedBy: record.cleanedBy,
          hod_submit_by: record.hod_submit_by

        }
        console.log('fetched converted Data', result)
      }
      else if (formNumber == "PH-PRD02/F-020") {
        result = {
          metalContaminatedMaterials: transformValue(record.metalContaminatedMaterials4A),
          metalContaminatedMaterials4B: transformValue(record.metalContaminatedMaterials4B),
          noOfMetalContaminants: transformValue(record.noOfMetalContaminants4A),
          noOfMetalContaminants4B: transformValue(record.noOfMetalContaminants4B),
          functionCheck: transformValue(record.usingFerrous),
          functionCheckCu: transformValue(record.usingCopper),
          checkedBy: transformValue(record.supervisor_submit_by),
          cleanedBy: record.cleanedBy,
          hod_submit_by: transformValue(record.hod_submit_by)
        }
      }
      // ---------------- form 03 validation ----------------------------
    } else {
      if (formNumber == "PH-PRD03-F-006") {
        result = {
          metalContaminatedMaterials: 'NA',
          noOfMetalContaminants: '-',
          functionCheck: 'NA',
          checkedBy: '',
          cleanedBy: '',
          hod_submit_by: ''
        }
      }
      else if (formNumber == "PH-PRD02/F-020") {
        result = {
          metalContaminatedMaterials: 'NA',
          metalContaminatedMaterials4B: 'NA',
          noOfMetalContaminants: '-',
          noOfMetalContaminants4B: '-',
          functionCheck: 'NA',
          functionCheckCu: 'NA',
          checkedBy: '',
          cleanedBy: '',
          hod_submit_by: ''
        }
      }
    }


    // // console.log('result', result);
    // setRecentPrintData(true);
    return result;
  };


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      const role = localStorage.getItem('role');
      let url;
      if (formNumber == "PH-PRD03-F-006") {
        url = `${API.prodUrl}/Precot/api/PadPunching/Service/MetalDetectorCheckList/getMetalDetectorSummary`;
        if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
          url = `${API.prodUrl}/Precot/api/PadPunching/Service/MetalDetectorCheckList/getMetalDetectorSummary`;
        }
      }
      else if (formNumber == "PH-PRD02/F-020") {
        url = `${API.prodUrl}/Precot/api/spunlace/Service/MetalDetectorCheckList/getMetalDetectorSummary`;
      }
      const fetchData = () => {
        const token = localStorage.getItem('token');
        if (token) {

          axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
              // const formattedDate = response.data ? convertDateFormat(response.data.date) : '';

              setFormData(response.data);
            })
            .catch(error => {
              notificationMessage('error', error.response.data.message);
              setTimeout(() => {
                navigate("/Precot/choosenScreen");
              }, 1000);
            });
        } else {
          notificationMessage('error', 'No token found');
        }
      };

      fetchData();
    }
  }, []);
  useEffect(() => {
    const findReason = () => {
      for (const data of formData) {
        if (data.hod_status == "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [formData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["supervisor_sign", "hod_sign"];
    if (printData.length > 0) {
      signatureKeys.forEach((key) => {



        const sign = printData[printData.length - 1];
        const username = sign[key]
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
              setESign((prevSign) => ({
                ...prevSign,
                [key]: url,
              }));
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });
        }
      });
    }
  }, [printData]);
  const getMonthName = (monthNumber) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const index = parseInt(monthNumber, 10) - 1;
    return months[index];
  };
  const formattedHodSubmitOn = formatPrintDate(printData.length > 0 && printData[printData.length - 1].hod_submit_on ? printData[printData.length - 1].hod_submit_on : '');

  return (
    <div>
      <GlobalStyle />
      {contextHolder}
      {/* //id="section-to-print" */}
      <div id="section-to-print" style={{ scale: "87%" }}>
        {<div >
          <div >
            <div style={{}}>
              <BleachingPrintHeader
                formName={header.formName}
                formatNo={header.formatNo}
                revisionNo={header.revisionNo}
                refSopNo={header.refSopNo}
                pageNo={formNumber == "PH-PRD03-F-006" ? '01 of 02' : '01 of 03'}
              />
            </div>
            <br></br>
            <div style={{ marginTop: '7px' }}>
              <table style={{ borderCollapse: 'collapse', width: '97%' }}>
                <thead>
                  {formNumber == "PH-PRD03-F-006" && (
                    <>
                      <tr>
                        <td className='data-border' colSpan={34}>
                          Section : {selectSection}
                        </td>


                      </tr>
                      <tr>
                        <td className='data-border' colSpan={34}>
                          Equipment Name : Argus Metal Detector
                        </td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td className='data-border' rowSpan={2} style={{ width: '10px' }}>
                      S.No.
                    </td>
                    <td className='data-border' rowSpan={2} colSpan={printSpan.printColSpan} style={{ textAlign: "center" }}>
                      Cleaning Area
                    </td>
                    <td className='data-border' rowSpan={2} style={{ textAlign: "center" }} >
                      <p style={{ transform: 'rotate(270deg)' }}>Frequency</p>
                    </td>
                    <td className='data-border' colSpan={31}>
                      Date for the Month of: {getMonthName(selectMonth)}/{selectYear}
                    </td>
                  </tr>

                  <tr>
                    {selectMonthDates.map((record, rowIndex) => (
                      <td key={rowIndex} className='data-border'>
                        <p style={{ width: '10px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {rowIndex + 1}
                        </p>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className='data-border' colSpan={printSpan.cleaningOfEquip}>
                      I. CLEANING OF EQUIPMENT -
                    </td>
                  </tr>
                </thead>


                <tbody>

                  <tr>
                    <td className='data-border' rowSpan={printSpan.dailyRowSpan} style={{ width: '10px' }}>
                      1
                    </td>
                    <td className='data-border' rowSpan={printSpan.dailyRowSpan} >
                      Machine Cleaning & Removing Ejected <br></br>(metal contaminated) materials
                    </td>
                    {formNumber == "PH-PRD02/F-020" && (
                      <td style={{ textAlign: "center" }}>CCP-4A</td>)}

                    <td className='data-border' rowSpan={printSpan.dailyRowSpan} style={{ textAlign: "center" }}>
                      <p >Daily</p>
                    </td>

                    {selectMonthDates.map((row, rowIndex) => (

                      <td className='data-border'>
                        <p style={{ width: '10px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                          {/* {printData[0].metalContaminatedMaterials} */}
                          {/* {fetchMachinePrintData(row)} */}
                          {fetchPrintData(row).metalContaminatedMaterials}
                        </p>
                      </td>
                    ))}
                  </tr>
                  {formNumber == "PH-PRD02/F-020" && (
                    <>
                      <tr>
                        <td style={{ textAlign: "center" }}>CCP-4B</td>
                        {selectMonthDates.map((row, rowIndex) => (

                          <td className='data-border'>
                            <p style={{ width: '10px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                              {/* {printData[0].metalContaminatedMaterials} */}
                              {/* {fetchMachinePrintData(row)} */}
                              {fetchPrintData(row).metalContaminatedMaterials4B}
                            </p>
                          </td>
                        ))}
                      </tr>
                    </>
                  )}
                  <tr>
                    <td className='data-border' rowSpan={printSpan.dailyRowSpan} style={{ width: '10px' }}>
                      2
                    </td>
                    <td className='data-border' rowSpan={printSpan.dailyRowSpan}>
                      No. of Metal Contamination Found
                    </td>
                    {formNumber == "PH-PRD02/F-020" && (
                      <td style={{ textAlign: "center" }}>CCP-4A</td>)}

                    <td className='data-border' style={{ textAlign: "center" }} rowSpan={printSpan.dailyRowSpan}>
                      <p >Daily</p>
                    </td>

                    {selectMonthDates.map((row, rowIndex) => (

                      <td className='data-border'>
                        <p
                          style={{
                            width: '10px', height: '70px',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center'

                          }}>

                          {/* {printData[0].metalContaminatedMaterials} */}
                          {fetchPrintData(row).noOfMetalContaminants}

                        </p>
                      </td>
                    ))}
                  </tr>
                  {formNumber == "PH-PRD02/F-020" && (
                    <tr>
                      <td style={{ textAlign: "center" }}>CCP-4B</td>
                      {selectMonthDates.map((row, rowIndex) => (

                        <td className='data-border'>
                          <p
                            style={{
                              width: '10px', height: '70px',
                              display: 'flex', alignItems: 'center',
                              justifyContent: 'center'

                            }}>

                            {/* {printData[0].metalContaminatedMaterials} */}
                            {fetchPrintData(row).noOfMetalContaminants4B}

                          </p>
                        </td>
                      ))}
                    </tr>
                  )}
                  {formNumber == "PH-PRD03-F-006" && (
                    <tr>
                      <td className='data-border' colSpan={printSpan.cleanedBy}>
                        Cleaned by :
                      </td>
                      {selectMonthDates.map((row, rowIndex) => (
                        <td className='data-border'>
                          <p style={{ width: '10px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(270deg)' }}>
                            {/* {printData[0].metalContaminatedMaterials} */}
                            {fetchPrintData(row).cleanedBy}
                          </p>
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
                <br></br><br></br>

              </table>
            </div>

            <div style={{ marginTop: "7px", pageBreakAfter: "always" }}>
              <BleachingTail />
            </div>

          </div>
          {formNumber == "PH-PRD02/F-020" && (

            <div style={{ marginTop: "10px", width: "100%" }}>
              <div >
                <BleachingPrintHeader
                  formName={header.formName}
                  formatNo={header.formatNo}
                  revisionNo={header.revisionNo}
                  refSopNo={header.refSopNo}
                  pageNo={'02 of 03'}
                />
              </div>
              <div style={{ marginTop: '20px', justifyContent: "center" }}>
                <table style={{ width: "97%" }}>
                  <tr>
                    <td className='data-border' colSpan={printSpan.cleanedBy}>
                      Cleaned by :
                    </td>
                    {selectMonthDates.map((row, rowIndex) => (
                      <td className='data-border'>
                        <p style={{ width: '10px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(270deg)' }}>
                          {/* {printData[0].metalContaminatedMaterials} */}
                          {fetchPrintData(row).cleanedBy}
                        </p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className='data-border' colSpan={printSpan.cleaningOfEquip}>
                      II. CALIBRATION CHECK OF EQUIPMENT (both CCP-4A & CCP-4B)
                    </td>
                  </tr>
                  <tr>
                    <td className='data-border' rowSpan={printSpan.dailyRowSpan} style={{ width: '10px' }}>
                      1
                    </td>
                    <td className='data-border' rowSpan={printSpan.dailyRowSpan} >
                      Functioning of Metal Detector / Calibration Check for CCP-4A & 4B (both detection & ejection) Size : Ferrous 3.0 mm Copper  4mm
                    </td>
                    {formNumber == "PH-PRD02/F-020" && (
                      <td style={{ textAlign: "center" }}>Using Ferrous (Fe)</td>)}
                    <td className='data-border' rowSpan={printSpan.dailyRowSpan}>
                      <p style={{ transform: 'rotate(270deg)' }} >Daily</p>
                    </td>

                    {selectMonthDates.map((row, rowIndex) => (

                      <td className='data-border'>
                        <p style={{ width: '10px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                          {/* {printData[0].metalContaminatedMaterials} */}
                          {fetchPrintData(row).functionCheck}

                        </p>
                      </td>
                    ))}
                  </tr>
                  {formNumber == "PH-PRD02/F-020" && (
                    <tr>
                      <td style={{ textAlign: "center" }}>Using Copper (Cu)</td>
                      {selectMonthDates.map((row, rowIndex) => (

                        <td className='data-border'>
                          <p style={{ width: '10px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            {/* {printData[0].metalContaminatedMaterials} */}
                            {fetchPrintData(row).functionCheck}

                          </p>
                        </td>
                      ))}
                    </tr>

                  )}
                  <tr>
                    <td className='data-border' colSpan={printSpan.cleanedBy}>
                      Checked by :
                    </td>
                    {selectMonthDates.map((row, rowIndex) => (

                      <td className='data-border'>
                        <p style={{ width: '10px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(270deg)' }}>

                          {/* {printData[0].metalContaminatedMaterials} */}
                          {fetchPrintData(row).checkedBy}

                        </p>
                      </td>
                    ))}
                  </tr>
                </table>
              </div>
              <div style={{ marginTop: "20px", pageBreakAfter: "always" }}>
                <BleachingTail />
              </div>
            </div>
          )}
          <div style={{ marginTop: "50px" }}>
            <div >
              <BleachingPrintHeader
                formName={header.formName}
                formatNo={header.formatNo}
                revisionNo={header.revisionNo}
                refSopNo={header.refSopNo}
                pageNo={formNumber == "PH-PRD03-F-006" ? '02 of 02' : '03 of 03'}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <table style={{ borderCollapse: 'collapse', width: '97%' }}>
                {formNumber == "PH-PRD03-F-006" && (

                  <>
                    <thead>


                      <tr>
                        <td className='data-border' colSpan={printSpan.cleaningOfEquip}>
                          II. CALIBRATION CHECK OF EQUIPMENT :
                        </td>
                      </tr>
                    </thead>
                    <tbody>

                      <tr>
                        <td className='data-border' rowSpan={printSpan.dailyRowSpan} style={{ width: '10px' }}>
                          1
                        </td>
                        <td className='data-border' rowSpan={printSpan.dailyRowSpan} >
                          Functioning of Metal Detector <br></br>/ Calibration Check <br></br>(both detection & ejection) Using Ferrous <br></br>Size : 3.0 mm
                        </td>
                        {formNumber == "PH-PRD02/F-020" && (
                          <td style={{ textAlign: "center" }}>CCP-4A</td>)}
                        <td className='data-border' rowSpan={printSpan.dailyRowSpan}>
                          <p style={{ transform: 'rotate(270deg)' }} >Daily</p>
                        </td>

                        {selectMonthDates.map((row, rowIndex) => (

                          <td className='data-border'>
                            <p style={{ width: '10px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                              {/* {printData[0].metalContaminatedMaterials} */}
                              {fetchPrintData(row).functionCheck}

                            </p>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className='data-border' colSpan={printSpan.cleanedBy}>
                          Checked by
                        </td>
                        {selectMonthDates.map((row, rowIndex) => (

                          <td className='data-border'>
                            <p style={{ width: '10px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(270deg)' }}>

                              {/* {printData[0].metalContaminatedMaterials} */}
                              {fetchPrintData(row).checkedBy}

                            </p>
                          </td>
                        ))}
                      </tr>
                      {formNumber == "PH-PRD03-F-006" && (
                        <>
                          <tr>
                            <td className='data-border' style={{ width: '100%' }} colSpan={printSpan.cleaningOfEquip}>
                              <p style={{ minheight: '80px' }}>
                                Remark/ comment(in case of any abnormality): {printData.length > 0 ? printData[printData.length - 1].remarks : ''}<br></br><br></br><br></br><br></br>
                                Note :
                                The process of cleaning and checking the equipment (metal detector) shall be carried out at the first shift. <br />
                                Tick mark "√" indicmetalContaminatedMaterialsates activity completed, Cross mark '"×" indicate not completed & "-" indicates metal not found.
                              </p>
                            </td>

                          </tr>

                          <tr>
                            <td className='data-border' colSpan={42} style={{ width: formNumber == "50%", borderBottom: "none" }} >
                              <b> Reviewed by Head of the Department/ Designee sign & Date </b>
                            </td>

                          </tr>
                          <tr>
                            <td
                              style={{
                                paddingBottom: "0px",
                                paddingTop: "15px",
                                borderTop: "none",
                                display: "table-cell",
                                verticalAlign: "bottom",
                                textAlign: "center",
                                position: "relative" // This helps to position children absolutely within the cell
                              }}
                              colSpan={42}
                            >
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {eSign.hod_sign ? (
                                  <img
                                    src={eSign.hod_sign}
                                    alt="HOD eSign"
                                    style={{
                                      width: "100px",
                                      height: "50px",
                                      objectFit: "contain",
                                      mixBlendMode: "multiply",
                                      marginRight: "10px" // Space between image and text
                                    }}
                                  />
                                ) : null}
                                <b>{printData.length > 0 ? printData[printData.length - 1].hod_submit_by : ''} <br></br><br></br>{formattedHodSubmitOn}</b>
                              </div>
                            </td>
                          </tr>

                        </>
                      )}
                    </tbody>
                  </>
                )}
                <tbody>
                  {formNumber == "PH-PRD02/F-020" && (
                    <>
                      <tr>
                        <td className='data-border' style={{ width: '100%' }} colSpan={printSpan.cleaningOfEquip}>
                          <p style={{ height: '80px' }}>
                            Remark/ comment(in case of any abnormality): {printData.length > 0 ? printData[printData.length - 1].remarks : 'N/A'}<br></br><br></br><br></br><br></br>
                            Note : {formNumber == "PH-PRD02/F-020" && ("The process of cleaning and checking the equipment (metal detector) shall be carried out at the start of first shift.")}



                          </p>
                        </td>

                      </tr>

                      <tr>
                        <td className='data-border' colSpan={printSpan.remarkColSpan} style={{ width: formNumber == "50%", borderBottom: "none", textAlign: "center" }} >
                          <b> {printText.hodRemark} </b>
                        </td>
                        <td rowSpan={2} className='data-border' style={{ width: "50%", textAlign: "center" }} >
                          <b>Tick mark "√" indicates activity completed & Cross mark '"×" indicate not completed.</b>

                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingBottom: "0px", paddingTop: "15px", borderTop: "none", display: "table-cell", verticalAlign: "bottom", textAlign: "center" }} >
                          {eSign.hod_sign ? (
                            <img
                              src={eSign.hod_sign}
                              alt="HOD eSign"
                              style={{
                                width: "100px",
                                height: "50px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}

                            />) : null}<br></br>
                          <b>{printData.length > 0 ? printData[printData.length - 1].hod_submit_by : ''}
                            <br></br>
                            {formattedHodSubmitOn}</b>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>

              </table>
            </div>
            <div style={{ margin: '40px 0', marginTop: "25px" }}>
              <BleachingTail />
            </div>

          </div>
        </div>

        }
      </div>
      <div className='no-print'>
        <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
        <Modal
          title="Print"
          open={isPrintModalOpen}
          onOk={() => setIsPrintModalOpen(false)}
          onCancel={() => handleCancel()}
          destroyOnClose={true}
          footer={[
            <Button
              loading={printButtonLoading}
              key="submit"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              type="primary"
              icon={<FaPrint color="#00308F" />}
              onClick={handlePrintSummary}
            >
              Print
            </Button>,
          ]}
        >
          {" "}
          <div>
            <label htmlFor="yearSelect">Select Year</label>
            <Select
              id="yearSelect"
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
                marginBottom: "10%",
              }}
              value={selectYear}
              onChange={(value) => setSelectYear(value)}
              placeholder="Select Year"
            >
              {years.map((year) => (
                <Select.Option key={year.value} value={year.value}>
                  {year.label}
                </Select.Option>
              ))}
            </Select>

            <div>
              <label htmlFor="monthSelect">Select Month</label>
              <Select
                id="monthSelect"
                style={{
                  width: "100%",
                  height: "36x",
                  borderRadius: "0px",
                  border: "1px solid #dddd",
                  backgroundColor: "white",
                  marginBottom: "10%",
                }}
                onChange={(value) => setSelectMonth(value)}
                placeholder="Select Month"
              >
                {months.map((month) => (
                  <Select.Option key={month.value} value={month.value}>
                    {month.label}
                  </Select.Option>
                ))}
              </Select>
            </div>

          </div>
        </Modal>

        <BleachingHeader
          formName={header.formName}
          formatNo={header.formatNo}
          unit={"UNIT H"}

          MenuBtn={
            <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
            ></Button>
          }
          buttonsArray={[





            // <Button
            //     onClick={handleBack}
            //     style={{ backgroundColor: "blue", color: "white", marginRight: '10px' }}
            //     type="primary"
            // >
            //     Back
            // </Button>,
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              onClick={() => setIsPrintModalOpen(true)}
              icon={<FaPrint color="#00308F" />}
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
              onClick={() => navigate('/Precot/choosenScreen')}
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
                if (confirm("You Want to logged out")) {
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
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <DatePicker style={{ margin: '10px' }} format={dateFormat} onChange={(date, dateString) => handleDateChange(date)} className='no-print' /> */}
        <label>Date :</label>
        <input type='date' style={{ margin: '10px', padding: '5px', borderRadius: '10px', border: '1px solid black' }} onChange={handleDateChange} className='no-print' max={formattedToday} />
        {/* {formNumber == "PH-PRD03-F-006" && (
          <Select
            // defaultValue="Blow room (CCP - 02A)"
            placeholder="Please select section"
            style={{
              width: 220,
            }}
            onChange={handleSelctChange}
            options={[
              {
                value: 'Blow room (CCP - 02A)',
                label: 'Blow room (CCP - 02A)',
              },
              {
                value: 'Bleaching (CCP - 02B)',
                label: 'Bleaching (CCP - 02B)',
              }
            ]}
          />
        )} */}
        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "10px"
          }}
          shape="round"
          icon={<BiNavigation />}
          onClick={handleClick}
        // disabled={gotobtn}
        >
          Go To
        </Button>
      </div>

      <Table
        dataSource={formData}
        columns={columns}
        pagination={{
          pageSize: pageSize,
        }}
        className="bale-waste-summary"
      />
    </div>
  )
}

export default Metal_detector_checklist_Summary;