/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Select, Table, Tooltip, message, Input, Modal, Form } from "antd";
import {
    EyeOutlined,
    EditOutlined,
    PlusOutlined,
    LeftOutlined,
} from "@ant-design/icons";
import { useNavigate, } from "react-router-dom";
import { BiBorderLeft, BiBorderNone, BiBorderRight, BiLock, BiNavigation } from "react-icons/bi";
import BleachingTail from "../Components/BleachingTail.js";
import BleachingHeader from '../Components/BleachingHeader.js';
import { FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { GrAdd } from "react-icons/gr";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import logo from "../Assests/logo.png"
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import "../index.css";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { createGlobalStyle } from "styled-components";

const HouseKeepingSummary = () => {
    // const [formatNo, setFormatNo]=useState("PRD03/F-26");
    const [formatNo, setFormatNo] = useState("PH-HRD01/F-010");
    const [formName, setFormName] = useState("House Keeping Cleaning Check List (Bag Making)");
    const [department, setDepartment] = useState("Bag Making");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [isModalPrint, setIsModalPrint] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [reason, setReason] = useState(false);
    const [printParams, setPrintParams] = useState({
    });
    const [eSign, setESign] = useState({
        operator_sign: "",
        supervisor_sign: "",
        hod_sign: "",
    });
    const token = localStorage.getItem("token");
    const [printButtonLoading, setPrintButtonLoading] = useState(false);
    const [printData, setPrintData] = useState('');
    const [summaryData, setSummaryData] = useState([]);

    const today = new Date().toISOString().split('T')[0];
    const initialized = useRef(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    }
    const showPrintModal = () => {
        setIsModalPrint(true);
    };
    const handleBack = () => {
        navigate("/Precot/choosenScreen");
    };
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

    const [newData, setNewData] = useState([]);
    const formattedHodSubmitOn = formatPrintDate(newData.length > 0 && newData[newData.length - 1].hod_submit_on ? newData[newData.length - 1].hod_submit_on : '');

    useEffect(() => {
        const token = localStorage.getItem("token");
        const signatureKeys = ["hr_sign", "supervisor_sign", "hod_sign"];
        signatureKeys.forEach((key) => {
            console.log('new Data', newData);
            if (newData.length > 0) {
                const username = newData[newData.length-1][key];
                console.log("usernameparams", username);

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
                            console.log("Response:", res.data);
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
                            console.log("Error in fetching image:", err);
                        });
                }
            }
        });
    }, [token, newData]);

    useEffect(() => {
        console.log('Api Triggereds    ')
    }, [newData])
    // --------------------------- Summary Get Api ------------------------------
    useEffect(() => {
        if (!initialized.current) {
            const fetchData = async () => {
            };
            fetchData();
        }

    }, [token, navigate]);

    useEffect(() => {
        const fetchData = () => {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');

            // Making the API call with axios
            axios.get(`${API.prodUrl}/Precot/api/PadPunching/Service/getHouseKeepingSummeryF010`, {

                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            })
                .then(response => {
                    setSummaryData(response.data);
                    const hasReason = response.data.some(item => item.reason !== null);
                    setReason(hasReason);
                    //   console.log('API Response:', response.data[0]);
                    // setData(response.data); 
                })
                .catch(error => {
                    // Handling any errors
                    console.error('Error fetching data:', error);
                });
        };

        fetchData();
    }, []);
    //---------------------------------------------------------------------------

    // ---------------------------- Summary Table Column -------------------------
    const baseColumns = [
        {
            title: "S.No",
            dataIndex: "clean_id",
            key: "clean_id",
            align: "center",
            render: (text, record, index) => index + 1,
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
            dataIndex: "supervisor_status",
            key: "supervisor_status",
            align: "center",
        },

        {
            title: "HR Status",
            dataIndex: "hr_status",
            key: "hr_status",
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
            key: "actions",
            align: "center",
            render: (_, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
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
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    function getYear(dateString) {
        const date = new Date(dateString);
        return date.getFullYear();
    }

    function getMonth(dateString) {
        const date = new Date(dateString);
        return date.getMonth() + 1;
    }




    const handleEdit = (record) => {

        navigate("/Precot/PadPunching/houseKeepingF010", {
            state: {
                date: record.date,
            },
        });
    };


    const handlePrintCancel = () => {
        setPrintParams(prevState => ({
            ...prevState,
        }))
        setPrintButtonLoading(false);
        setIsModalPrint(false);
    };

    // start of jsx for print part

    // variables
    const [dateLov, setDateLov] = useState([]);
    const currentYear = new Date().getFullYear();


    const [selectedPrintDate, setSelectedPrintDate] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();

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

    // resuable print Methods
    function getMonthName(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    function getMonthNumber(monthName) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const monthIndex = monthNames.indexOf(monthName);

        return monthIndex + 1;
    }

    const generateDates = (month, year) => {
        console.log('month in generateDates', month);
        console.log('year in generate dates', year);

        const dates = [];
        const daysInMonth = new Date(year, getMonthNumber(month), 0).getDate();
        console.log('days in a month', daysInMonth);
        for (let day = 1; day <= daysInMonth; day++) {
            dates.push(`${day}`);
        }
        return dates;
    };

    const transformValue = (value) => {
        switch (value) {
            case "Y":
                return "✓";
            case "N":
                return "X";
            case "NA":
                return "NA";
            default:
                return value;
        }
    };

    const fetchPrintData = (newData, month, year) => {
        if (!Array.isArray(newData)) {
            console.error(
                "Error: newData is not an array. It is of type:",
                typeof newData
            );
            // console.log("newData value:", newData);
            return [
                {
                    floorcleaning: "-",
                    removalofunwantedmaterials: "-",
                    sidewallscorners: "-",
                    floorCleaningWet: '-',
                    emergencyDoors: "-",
                    fireExtinguishers: "-",
                    firstAidBox: "-",
                    falseCeiling: "-",

                    remark: "-",
                    trainedPerson: "-"
                },
            ];
        }

        const records = newData.filter(
            (record) => record.month === month && record.year === year
        );

        if (records.length === 0) {
            return [
                {
                    floorcleaning: "-",
                    removalofunwantedmaterials: "-",
                    sidewallscorners: "-",
                    floorCleaningWet: '-',
                    emergencyDoors: "-",
                    fireExtinguishers: "-",
                    firstAidBox: "-",
                    falseCeiling: "-",
                    remark: "-",
                    trainedPerson: "-"
                },
            ];
        }

        return records.map((record) => {
            const day = new Date(record.date).getDate(); // Extract day from date
            // // console.log(" Day ", day);
            return {
                day,
                floorcleaning: transformValue(record.floor_cleaning),
                removalofunwantedmaterials: transformValue(
                    record.removel_unwanted_meterials
                ),
                sidewallscorners: transformValue(record.side_wall_corners),
                // windows: transformValue(record.windows),
                floorCleaningWet: transformValue(record.floor_cleaning_wet),
                emergencyDoors: transformValue(record.emergency_door),
                fireExtinguishers: transformValue(record.fire_extinguishers),
                firstAidBox: transformValue(record.first_aid_box),
                falseCeiling: transformValue(record.false_ceiling),
                // rapidDoors: transformValue(record.rapid_doors),
                remark: record.remarks,
                trainedPerson: record.trained_person
            };
        });
    };


    const years = Array.from(new Array(100), (val, index) => {
        return {
            value: (currentYear - index).toString(),
            label: (currentYear - index).toString(),
        };
    });

    // end of resuable print Methods

    // start of dynamic print data




    const printDateSubmit = () => {

        // console.log(getFullYear(selectedPrintDate));
        if (!Array.isArray(newData)) {
            message.warning('No data available for this Month')
            return;
        }

        const dates = generateDates(selectedMonth, selectedYear);
        // const dates = generateDates();
        console.log('generated dates in print', dates);

        setDateLov(dates);
        console.log('dates for a month', dates)


        setTimeout(() => {
            window.print();
        }, 1000);

    };


    const printDataList = fetchPrintData(newData, selectedMonth, selectedYear);


    //   End of jsx for print part

    // Summary table part

    const [newDate, setNewDate] = useState("");
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    };


    const handleDateChanges = (e) => {
        // console.log(" Date ", e.target.value);
        setNewDate(e.target.value);

    };

    const handleGoToChange = () => {
        if (newDate == "") {
            // setError('Please select a date');
            message.warning("Please Select Date");
            return;
        }
        navigate("/Precot/PadPunching/houseKeepingF010", {
            state: {
                date: newDate,
            },
        });
    };

    const handleprintMonthChange = (selectMonth) => {

        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Adjust content type if needed
        };
        // const a = String(event.target.value).split('-').reverse().join('/');
        axios
            .get(
                `${API.prodUrl}/Precot/api/PadPunching/Service/PrintHouseCleaningReportF010`,
                {
                    headers,
                    params: {
                        month: selectMonth,
                        year: selectedYear,
                    },
                }
            )
            .then((res) => {
                setNewData(res.data);
                setSelectedMonth(selectMonth);
                setSelectedYear(selectedYear);


            })
            .catch((err) => {

            });
    }

    return (
        <>
            <BleachingHeader
                formName={formName}
                formatNo={formatNo}
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
                        icon={<FaPrint color="#00308F" />}
                        onClick={showPrintModal}
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
                    </Tooltip>
                ]}
            />
            <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
            <Modal
                title="House Keeping Cleaning Check List (Bag Making) (Print)"
                open={isModalPrint}

                width={380}
                destroyOnClose={true}
                onOk={() => setIsModalPrint(false)}
                onCancel={() => setIsModalPrint(false)}
                footer={[
                    <Button
                        key="submit"
                        style={{
                            backgroundColor: "#E5EEF9",
                            color: "#00308F",
                            fontWeight: "bold",
                        }}
                        shape="round"
                        type="primary"
                        onClick={printDateSubmit}
                    >
                        Print
                    </Button>,
                ]}
            >
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
                        onChange={(value) => setSelectedYear(value)}
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
                </div>
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
                        onChange={(e) => handleprintMonthChange(e)}
                        // onChange={(value) => handleDatePrintChange(value)}
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
                </div>

            </Modal>

            <div
                style={{
                    width: "100%",
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <Form.Item
                    label="Date"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: 0,
                    }}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                >
                    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <Input
                            placeholder="Date"
                            type="date"
                            size="small"
                            value={newDate}
                            onChange={handleDateChanges}
                            style={{ flex: 1 }}
                        max={getCurrentDate()}
                        />
                        <Button
                            key="Create"
                            type="primary"
                            style={{
                                backgroundColor: "#E5EEF9",
                                color: "#00308F",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                            shape="round"
                            icon={<BiNavigation />}
                            onClick={handleGoToChange}
                        >
                            Go to
                        </Button>
                    </div>
                </Form.Item>
            </div>

            {/* Summary table */}
            <Table columns={columns} dataSource={summaryData} />

            {/* print start here */}
            <GlobalStyle />
            <div id="section-to-print" style={{ padding: "20px", width: "80%" }}>
                <header className="no-print" />
                <main>
                    <table className="f18table" style={{ marginTop: "2%", width: "80%" }}>
                        {/* <thead> */}
                        <tbody>
                            <tr style={{ width: "80%" }}>
                                <th
                                    colSpan="10"
                                    rowSpan="4"
                                    style={{ textAlign: "center", height: "80px" }}
                                >
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        style={{ width: "100px", height: "auto" }}
                                    />{" "}
                                    <br></br>
                                    Unit H
                                </th>

                                <th colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                                    {formName}
                                </th>
                                <td colSpan="8">Format No.:</td>
                                <td colSpan="9">{formatNo}</td>
                            </tr>
                            <tr>
                                <td colSpan="8">Revision No.:</td>
                                <td colSpan="9">01</td>
                            </tr>
                            <td colSpan="8">Ref. SOP No.:</td>
                            <td colSpan="9">PH-HRD01-D-10</td>
                            <tr>
                                <td colSpan="8">Page NO.:</td>
                                <td colSpan="9">1 of 2</td>
                            </tr>
                        {/* </thead> */}
                        <br></br>
                        {/* <tbody> */}
                            {/* <tr>
                <td colspan="90" style={{ height: "10px" }}></td>
              </tr> */}
                            <tr>
                                <td colSpan="1" rowSpan="2" style={{ textAlign: "center" }}>
                                    S.No.
                                </td>
                                <td colSpan="17" rowSpan="2">
                                    Cleaning Area
                                </td>
                                <td colSpan="8" rowSpan="2" style={{ textAlign: "center", transform: "rotate(270deg)" }}>
                                    Frequency
                                </td>
                                <td colSpan="31">

                                    Department: {department}
                                </td>
                                <td colSpan="31">
                                    Date for the Month & Year of: {selectedMonth}/{selectedYear}{" "}
                                </td>
                            </tr>
                            <tr>
                                {dateLov.map((record, rowIndex) => (
                                    <td key={rowIndex} colSpan="2">
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
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colSpan="1" style={{ textAlign: "center" }}>
                                    {" "}
                                    1
                                </td>
                                <td colSpan="17"> Floor cleaning - Dry</td>
                                <td
                                    colSpan="8"
                                    rowSpan="3"
                                    style={{ textAlign: "center", transform: "rotate(270deg)" }}
                                >
                                    Once in a day
                                </td>

                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {printData ? printData.floorcleaning : "NA"}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td colSpan="1" style={{ textAlign: "center" }}>
                                    {" "}
                                    2
                                </td>
                                <td colSpan="17"> Removal of unwanted materials</td>

                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {printData
                                                    ? printData.removalofunwantedmaterials
                                                    : "NA"}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td colSpan="1" style={{ textAlign: "center" }}>
                                    {" "}
                                    3
                                </td>
                                <td colSpan="17"> Side walls & corners </td>

                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {printData ? printData.sidewallscorners : "NA"}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>

                            <tr>
                                <td colSpan="1" style={{ textAlign: "center" }}>
                                    {" "}
                                    4
                                </td>
                                <td colSpan="17"> Floor cleaning - Wet</td>
                                <td
                                    colSpan="8"
                                    rowSpan="4"
                                    style={{ transform: "rotate(270deg)" }}
                                >
                                    {" "}
                                    Twice in a week
                                </td>

                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {printData ? printData.floorCleaningWet : "NA"}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>

                            <tr>
                                <td colSpan="1" style={{ textAlign: "center" }}>
                                    {" "}
                                    5
                                </td>
                                <td colSpan="17"> Emergency Doors</td>


                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {printData ? printData.emergencyDoors : "NA"}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td colSpan="1" style={{ textAlign: "center" }}>
                                    {" "}
                                    6
                                </td>
                                <td colSpan="17"> Fire Extinguishers</td>

                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {printData ? printData.fireExtinguishers : "NA"}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td colSpan="1" style={{ textAlign: "center" }}>
                                    {" "}
                                    7
                                </td>
                                <td colSpan="17"> First Aid Box </td>
                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {printData ? printData.firstAidBox : "NA"}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td colSpan="1" style={{ textAlign: "center" }}>
                                    {" "}
                                    8
                                </td>
                                <td colSpan="17"> False ceiling</td>
                                <td
                                    colSpan="8"
                                // rowSpan="q"
                                // style={{ transform: "rotate(270deg)" }}
                                >
                                    {" "}
                                    Quarterly
                                </td>

                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {printData ? printData.falseCeiling : "NA"}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>



                            <tr>
                                <td colSpan="88" style={{height:'50px'}}>
                                    Remark / Comment (in case of any abnormality observed) :{" "}
                                    {newData.length>0?newData[newData.length - 1].remarks:''}
                                    {/* <p
                    // style={{
                    //   alignItems: "center",
                    //   justifyContent: "center",
                    // }}
                  >
                    
                  </p> */}
                                </td>
                            </tr>
                            <tr>
                                <td style={{border:'none', height:'200px'}}></td>
                            </tr>
                            {/* header */}

                            <tr style={{ width: "80%" }}>
                                <th
                                    colSpan="10"
                                    rowSpan="4"
                                    style={{ textAlign: "center", height: "80px" }}
                                >1
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        style={{ width: "100px", height: "auto" }}
                                    />{" "}
                                    <br></br>
                                    Unit H
                                </th>

                                <th colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                                    {formName}
                                </th>
                                <td colSpan="8">Format No.:</td>
                                <td colSpan="9">{formatNo}</td>
                            </tr>
                            <tr>
                                <td colSpan="8">Revision No.:</td>
                                <td colSpan="9">01</td>
                            </tr>
                            <td colSpan="8">Ref. SOP No.:</td>
                            <td colSpan="9">PH-HRD01-D-10</td>
                            <tr>
                                <td colSpan="8">Page NO.:</td>
                                <td colSpan="9">2 of 2</td>
                            </tr>
                            {/* header */}
                            <br></br>
                            <tr>
                                <td colSpan="26">Cleaned by (Trained person) :</td>
                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2" >
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "5px",
                                                    wordWrap: 'break-word',
                                                    overflowWrap: 'break-word'
                                                }}
                                            >
                                                {printData ? printData.trainedPerson : "NA"}
                                            </p>
                                        </td>
                                    );
                                })}

                            </tr>
                            <tr>
                                <td colSpan="26">Verified by (Production Supervisor)</td>
                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {/* {printData ? printData.falseCeiling : "NA"} */}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td colSpan="26">Verified by (HR)</td>
                                {dateLov.map((date, rowIndex) => {
                                    const printData = printDataList.find(
                                        (data) => data.day === rowIndex + 1
                                    );
                                    return (
                                        <td key={rowIndex} className="data-border" colSpan="2">
                                            <p
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {/* {printData ? printData.falseCeiling : "NA"} */}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr style={{ padding: "2" }}>
                                <td className="data-border" colSpan="22">
                                    Reviewed By HOD:
                                </td>
                                <td className="data-border" colSpan="22" style={{ textAlign: 'center' }}>
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

                                        />) : null}
                                    <br /><br />
                                    <b>{newData.length > 0 ? newData[newData.length - 1].hod_submit_by : ''}
                                        <br></br>
                                        {formattedHodSubmitOn}</b>
                                    {/* nishadharan */}
                                </td>
                                <td colSpan="44">
                                    Note: Tick mark "√" indicates activity completed & Cross mark
                                    '"×" indicate not completed "NA" indicate no data.
                                </td>
                            </tr>

                        </tbody>

                        {/* <br></br> */}

                        <tfoot>
                            <tr>
                                <td colSpan="23">Particulars</td>
                                <td colSpan="23">Prepard by</td>
                                <td colSpan="22">Reviewed by</td>
                                <td colSpan="20">Approved by</td>
                            </tr>

                            <tr>
                                <td colSpan="23">Name</td>
                                <td colSpan="23"></td>
                                <td colSpan="22"></td>
                                <td colSpan="20"></td>
                            </tr>
                            <tr>
                                <td colSpan="23">Signature & Date</td>
                                <td colSpan="23"></td>
                                <td colSpan="22"></td>
                                <td colSpan="20"></td>
                            </tr>
                        </tfoot>
                    </table>
                </main>
                <footer className="no-print" />
            </div>
        </>
    )
}

export default HouseKeepingSummary;