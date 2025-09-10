
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader.js";

import {
    Avatar,
    Button,
    Col,
    Drawer,
    Form,
    Menu,
    Row,
    Select,
    Table,
    Tooltip,
    Modal,
    Input,
    message
} from "antd";
import { FaUserCircle } from "react-icons/fa";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { FaPrint } from "react-icons/fa6";
import { createGlobalStyle } from "styled-components";
import { render } from "@testing-library/react";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Engineering_FC004_Summary = () => {
    const navigate = useNavigate();
    const [summary, setSummary] = useState();
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [shift, setShift] = useState("");

    const [placement, setPlacement] = useState("left");
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const [printResponseData, setPrintResponseData] = useState([]);
    const [role, setRole] = useState('');
    const [orderNo, setOrderNo] = useState('');

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    const [messageApi, contextHolder] = message.useMessage();
    const [date, setDate] = useState("");
    const today = new Date().toISOString().split("T")[0];
    const [orderNumberLov, setOrderNumberLov] = useState([]);
    const [shiftLov, setShiftLov] = useState([]);
    const [selectedOrderNo, setSelectedOrderNo] = useState("");
    const [hodStatus, setHodStatus] = useState("");
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState(false);
    const [form] = Form.useForm();
    const [getData, setGetData] = useState([]);
    const [department, setDepartment] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [printLoading, setPrintLoading] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [getImage, setGetImage] = useState("");
    const [getImage1, setGetImage1] = useState("");
    const [rcaNo, setRcaNo] = useState("");
    const [previousRcaNo, setPreviousRcaNo] = useState("");

    const handleModalClose = () => {
        setShowModal(false);
        // Reset form fields
        setPrintLoading(false);
        setSelectedDate("");
        setSelectedDepartment("");
        setSelectedMonth("");
        setSelectedYear("");
        form.resetFields();
    };

    const months = [
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ];

    function generateYearOptions(startYear, endYear) {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push({ id: year, value: year.toString() });
        }
        return years;
    }

    const years = generateYearOptions(2024, 2040);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    }
    const formatDates = (dateStr) => {
        if (!dateStr) return '';
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (datePattern.test(dateStr)) {
            return dateStr;
        }

        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const date1 = formatDates(date);
    const date2 = formatDates(selectedDate);


    const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
    }
  }
`;

    const baseColumns = [
        {
            title: "S.No",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            align: "center",
            render: (text) => formatDates(text),
        },
        {
            title: "rcaNo",
            dataIndex: "rcaNo",
            key: "rcaNo",
            align: "center",
        },
        {
            title: "department",
            dataIndex: "department",
            key: "department",
            align: "center",
        },
        {
            title: "Engineering Status",
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
            title: "Action",
            dataIndex: "",
            key: "action",
            align: "center",
            render: (_, x) => (
                <>
                    <Button
                        icon={<BiEdit />}
                        onClick={() => handleEdit(x)}
                        style={{ width: "100%", border: "none" }}
                    >
                        Edit
                    </Button>
                </>
            ),
        },
    ];


    let columns;
    const Reason = {
        title: "Reason",
        dataIndex: "reason",
        key: "reason",
        align: "center",
        render: (text) => (text ? text : 'N/A')
    };


    if (reason) {
        columns = [
            ...baseColumns.slice(0, 6),
            Reason,
            ...baseColumns.slice(6),
        ];

    } else {
        columns = baseColumns;
    }

    const handlePrint = () => {
        setShowModal(true);

        // console.loglog("print screen works");
    };
    const handleBack = () => {
        navigate("/Precot/choosenScreen");
    };



    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Adjust content type if needed
        };
        const userRole = localStorage.getItem('role');
        const username = localStorage.getItem('username');



        setRole(userRole);
        const fetchSummary = async (url) => {
            try {
                const res = await axios.get(url, { headers });
                if (res.data && res.data.length !== 0) {
                    setReason(true);
                } else {
                    setReason(false);
                }
                setGetData(res.data);
                const isHODRejected = res.data.some(data => data.hodStatus === "HOD_REJECTED");
                setReason(isHODRejected);
                // console.loglog("edit response", res);
                if (Array.isArray(res.data)) {
                    setSummary(
                        res.data.map((x, index) => ({
                            // Handle potential null or undefined values
                            date: x.date,
                            rcaNo: x.rcaNo,
                            sup_status: x.supervisorStatus,
                            hod_status: x.hodStatus,
                            department: x.department,
                            orderNo: x.orderNo,
                            op_status: x.operator_status,
                            reason: x.reason,
                            index: x.index,
                        }))
                    );
                } else {
                    setSummary([]);
                }
            } catch (err) {
                console.error("Error fetching summary data", err);
                setSummary([]);
            }
        };

        const summaryUrl = `${API.prodUrl}/Precot/api/Engineering/getRootCauseSummary?username=${username}`;

        // if (["ROLE_OPERATOR", "ROLE_SUPERVISOR", "ROLE_HOD", "ROLE_DESIGNEE"].includes(userRole)) {
        fetchSummary(summaryUrl);
        // }
    }, []);


    useEffect(() => {
        const findReason = () => {
            for (const data of getData) {
                if (data.hod_status === "HOD_REJECTED" || data.supervisor_status === "SUPERVISOR_REJECTED") {
                    setReason(true);
                    break;
                }
            }
        };
        findReason();
    }, [getData]);

    const hasFetched = useRef(false);
    useEffect(() => {
        const fetchPreviousRcaNo = async () => {

            if (hasFetched.current || !token) return;

            hasFetched.current = true;

            try {
                const response = await axios.get(
                    `${API.prodUrl}/Precot/api/Engineering/lastRcaNo`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Previous RCA No.:", response.data);
                setPreviousRcaNo(response.data);
                const [x, a, z] = response.data.split("/").map(str => str.trim());
                const newZ = String(Number(z) + 1).padStart(z.length, "0");
                setRcaNo(`${x}/${a}/${newZ}`);
            } catch (error) {
                console.error("Error fetching previous RCA number:", error);
            }
        };

        fetchPreviousRcaNo();
    }, [token]);

   


    const handleInputChange = (e) => {
        const value = e.target.value;
        setRcaNo(value);
    };

    const selectedDepartmentchange = (value) => {
        setSelectedDepartment(value);
    }

    const handleDateChange = (value) => {
        setSelectedDate(value);
    };
    const handleEdit = (x) => {
        navigate("/Precot/Engineering/FC-004", {
            state: {
                date: x.date,
                rcaNo: x.rcaNo,
            },
        });
    };


    const [rcaNos, setRcaNos] = useState([]); 
    const [selectedRcaNo, setSelectedRcaNo] = useState('');

   
        const fetchRcaNo = async (department) => {
            try {
                const response = await fetch(`${API.prodUrl}/Precot/api/Engineering/departmentbasedRcano?department=${department}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text(); 
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
                }
                if (response.status === 204) {
                    console.log('No RCA numbers available for this department.'); 
                    setRcaNos([]); 
                    setSelectedRcaNo(''); 
                    return; 
                }
    
                const data = await response.json();
                console.log('Fetched RCA Nos:', data); 
    
                
                if (data.length === 0) {
                    setRcaNos([]);
                    setSelectedRcaNo('');
                } else {
                    setRcaNos(data);
                }
            } catch (error) {
                console.error('Error fetching RCA numbers:', error);

            }
        };

    const departmantLOV = [
        "Bleaching",
        "Spunlace",
        "Pad Punching",
        "Dry Goods",
        "Cotton Buds",
        "Lab",
        "Boiler",
        "ETP"
    ];


    const printSubmit = () => {
        if (selectedDate) {
            const dateObj = new Date(selectedDate);
            const selectedMonthFromDate = dateObj.getMonth() + 1;
            const selectedYearFromDate = dateObj.getFullYear();

            if (
                selectedMonth &&
                selectedYear &&
                (selectedMonthFromDate !== Number(selectedMonth) ||
                    selectedYearFromDate !== Number(selectedYear))
            ) {
                message.error(
                    "The selected date does not match the selected month and year."
                );
                setSelectedMonth("");
                setSelectedYear("");
                form.resetFields();
                return;
            }
        }
        fetchData();
    };

    const fetchData = () => {
        let baseUrl = `${API.prodUrl}/Precot/api/Engineering/getRootCausePrint?RcaNo=${selectedRcaNo}&month=${selectedMonth}&year=${selectedYear}`;
        let query = [];

        let finalUrl = baseUrl + query.join("&");
        console.log("finalUrl", finalUrl);

        const token = localStorage.getItem("token");
        axios
            .get(finalUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                responseType: "json",
            })
            .then((response) => {
                console.log("Fetched data:", response.data);

                // Ensure that the response is an array, even if no data is found
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setPrintResponseData(response.data);
                    setPrintLoading(true);

                    setTimeout(() => {
                        window.print(); // Proceed with printing
                        handleModalClose(); // Close the modal after printing
                    }, 3000);

                    console.log("print data", response.data);
                } else {
                    setPrintResponseData([]); // Ensure printData is always an array
                    setPrintLoading(false);
                    message.error(
                        "No details found for the selected form. Cannot print."
                    );
                    handleModalClose(); // Close modal if no details found
                }
                axios
                    .get(
                        `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.supervisorSign}`,
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
                axios
                    .get(
                        `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.hodSign}`,
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
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                message.error("Failed to fetch data. Please try again.");
                setPrintLoading(false);
            })
        .finally(()=>{ setPrintLoading(false)});
    };              

    const handleNavigate = () => {
        if (date == "") {
            // setError('Please select a date');
            message.warning('Please Select date');
        }
        // else if (department == "") {
        //     message.warning("Please select the Department");
        // }
        else {
            navigate("/Precot/Engineering/FC-004", {
                state: { date: date, rcaNo: rcaNo },
            });
        }
    };
    const departmentchange = (value) => {
        setDepartment(value);
        fetchRcaNo(value);
    }


    const formatDate = (dateStr) => {
        // Check if the date is already in the format dd/MM/yyyy
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (datePattern.test(dateStr)) {
            return dateStr;
        }

        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
    const formattedDatesupervisor = formatDate(printResponseData.supervisor_submit_on);
    const formatedDateOperator = formatDate(printResponseData.operator_submitted_on);
    const formattedDateHod = formatDate(printResponseData.hod_submit_on);
    const dateformated = formatDates(selectedDate);
    // console.loglog("formatedOperator", formatedDateOperator);
    return (
        <div>
            <div id="section-to-print">
                {printResponseData.map((data, index) => (
                    <table style={{ marginTop: "30px", scale: "95%" }}>
                        <thead>
                            <tr style={{ border: "none" }}>
                                <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
                            </tr>

                            <tr style={{ height: "20px" }}>
                                <td colSpan="5" rowSpan="4" style={{ textAlign: "center", width: "10%" }}>
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        style={{ width: "80px", height: "auto" }}
                                    />
                                    <br />
                                    <b style={{ fontFamily: 'Times New Roman, Times, serif' }}>Unit H</b>
                                </td>
                                <td rowSpan="4" colSpan="4" style={{ textAlign: "center" }}>
                                    <b>Root Cause Analysis</b>{" "}
                                </td>
                                <td colSpan="1">Format No.:</td>
                                <td colSpan="2">PH-ENG01/FC-004</td>
                            </tr>
                            <tr style={{ height: "30px" }}>
                                <td colSpan="1">Revision No.:</td>
                                <td colSpan="2">01</td>
                            </tr>
                            <tr style={{ height: "30px" }}>
                                <td colSpan="1">Ref.SOP No.:</td>
                                <td colSpan="2">PH-ENG01-D-05</td>
                            </tr>
                            <tr style={{ height: "30px" }}>
                                <td colSpan="1">Page No.:</td>
                                <td colSpan="2"> {index + 1} of {printResponseData.length}</td>
                            </tr>
                            <tr style={{ border: "none" }}>
                                <td style={{ border: "none" }}></td>
                            </tr>
                        </thead>
                        <br />
                        <tbody>
                            <tr>
                                <td colSpan={6}>RCA No.</td>
                                <td colSpan={2}>{data.rcaNo}</td>
                                <td colSpan={2}>BIS No.</td>
                                <td colSpan={2}>{data.bisNo}</td>
                            </tr>
                            <tr>
                                <td colSpan={6}>Date </td>
                                <td colSpan={2}>{formatDates(data.date)}</td>
                                <td colSpan={2}>Product </td>
                                <td colSpan={2}>{data.product}</td>
                            </tr>
                            <tr>
                                <td colSpan={6}>Department</td>
                                <td colSpan={2}>{data.department}</td>
                                <td colSpan={2}>Production Loss (MT) </td>
                                <td colSpan={2}>{data.productionLossMt}</td>
                            </tr>
                            <tr>
                                <td colSpan={6}>RCA Owner </td>
                                <td colSpan={2}>{data.rcaOwner}</td>
                                <td colSpan={2}>Batch Time Lost </td>
                                <td colSpan={2}>{data.batchTimeLost}</td>
                            </tr>
                            <tr>
                                <td colSpan={6}>RCA Team members </td>
                                <td colSpan={6}>{data.rcaTeamMembers}</td>
                            </tr>
                            <tr>
                                <td colSpan={13}>Problem Description:{data.problemDescription} </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Why?</td>
                                <td colSpan={11}>{data.why1}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Why?</td>
                                <td colSpan={11}>{data.why2}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Why?</td>
                                <td colSpan={11}>{data.why3}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Why?</td>
                                <td colSpan={11}>{data.why4}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Why?</td>
                                <td colSpan={11}>{data.why5}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Root Cause</td>
                                <td colSpan={11}>{data.rootCause}</td>
                            </tr>
                            <tr>
                                <td colSpan={1} style={{ textAlign: 'center' }}>S.No.</td>
                                <td colSpan={7} style={{ textAlign: 'center' }}>Corrective Action</td>
                                <td colSpan={1} style={{ textAlign: 'center' }}>Target Date</td>
                                <td colSpan={2} style={{ textAlign: 'center' }}>Responsibility</td>
                                <td colSpan={1} style={{ textAlign: 'center' }}>Status </td>
                            </tr>
                            {data.correctiveActions.map((action, index) => (
                                <tr key={action.id}>
                                    <td colSpan={1} style={{ textAlign: 'center' }}>{index + 1}</td>
                                    <td colSpan={7} style={{ textAlign: 'center' }}>{action.correctiveaction}</td>
                                    <td colSpan={1} style={{ textAlign: 'center' }}>{formatDates(action.correctivetargetDate)}</td>
                                    <td colSpan={2} style={{ textAlign: 'center' }}>{action.correctiveresponsibility}</td>
                                    <td colSpan={1} style={{ textAlign: 'center' }}>{action.correctivestatus}</td>
                                </tr>
                            ))}

                            <tr>
                                <td colSpan={1} style={{ textAlign: 'center' }}>S.No.</td>
                                <td colSpan={7} style={{ textAlign: 'center' }}>Preventive Action</td>
                                <td colSpan={1} style={{ textAlign: 'center' }}>Target Date</td>
                                <td colSpan={2} style={{ textAlign: 'center' }}>Responsibility</td>
                                <td colSpan={1} style={{ textAlign: 'center' }}>Status </td>
                            </tr>

                            {/* Preventive Actions */}
                            {data.preventiveActions.map((action, index) => (
                                <tr key={action.id}>
                                    <td colSpan={1} style={{ textAlign: 'center' }}>{index + 1}</td>
                                    <td colSpan={7} style={{ textAlign: 'center' }}>{action.preventiveaction}</td>
                                    <td colSpan={1} style={{ textAlign: 'center' }}>{formatDates(action.preventivetargetDate)}</td>
                                    <td colSpan={2} style={{ textAlign: 'center' }}>{action.preventiveresponsibility}</td>
                                    <td colSpan={1} style={{ textAlign: 'center' }}>{action.preventivestatus}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={6}>Submitted by:  </td>
                                <td colSpan={7}>{data.supervisorSign}<br />
                                    {formatDates(data.supervisorSubmitOn)}
                                    <br />
                                    <>
                                        {getImage && (
                                            <img
                                                className="signature"
                                                src={getImage}
                                                alt="logo"
                                            // style={{
                                            //     width: "60px",
                                            //     height: "auto",
                                            //     verticalAlign: "middle",
                                            // }}
                                            />
                                        )}
                                    </>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={6}>Reviewed By:   </td>
                                <td colSpan={7}>{data.hodSign}<br />
                                    {formatDates(data.hodSubmitOn)}
                                    <br />
                                    <>
                                        {getImage1 && (
                                            <img
                                                className="signature"
                                                src={getImage1}
                                                alt="logo"
                                            // style={{
                                            //     width: "60px",
                                            //     height: "auto",
                                            //     verticalAlign: "middle",
                                            // }}
                                            />
                                        )}
                                    </>
                                </td>
                            </tr>
                        </tbody>
                        <br />
                        <tfoot>
                            <br />
                            <tr style={{ height: "30px" }}>
                                <td colSpan={6}>Particulars</td>
                                <td colSpan={2}>Prepared by</td>
                                <td colSpan={2}>Reviewed by</td>
                                <td colSpan={3}>Approved by</td>
                            </tr>
                            <tr style={{ height: "30px" }}>
                                <td colSpan={6}>Name</td>
                                <td colSpan={2}></td>
                                <td colSpan={2}></td>
                                <td colSpan={3}></td>
                            </tr>
                            <tr style={{ height: "30px" }}>
                                <td colSpan={6}>Signature & Date</td>
                                <td colSpan={2}></td>
                                <td colSpan={2}></td>
                                <td colSpan={3}></td>
                            </tr>
                        </tfoot>
                    </table>
                ))}
            </div>


            <BleachingHeader
                unit="Unit-H"
                formName="ROOT CAUSE ANALYSIS"
                formatNo="PH-ENG01/FC-004"
                MenuBtn={
                    <Button
                        type="primary"
                        icon={<TbMenuDeep />}
                        onClick={showDrawer}
                    ></Button>
                }
                buttonsArray={[
                    <Button
                        type="primary"
                        onClick={handlePrint}
                        icon={<FaPrint color="#00308F" />}
                        style={{
                            backgroundColor: "#E5EEF9",
                            color: "#00308F",
                            fontWeight: "bold",
                        }}
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
            <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
            <div style={{ paddingBottom: "2em" }}></div>

            {/* header code above */}
            <Row>
                <Form
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                        gap: "25px"
                    }}
                >
                    <Form.Item label="Date">
                        <Input
                            type="date"
                            value={date}
                            max={today}
                            placeholder="Choose date"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="RCA No.">
                        <input
                            placeholder="RCA No."
                            value={rcaNo}
                            onChange={handleInputChange}
                            style={{ width: "150px", textAlign: "center" }}
                            disabled
                            className="inp-new"
                        />
                    </Form.Item>
                    <Form.Item>
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
                            onClick={handleNavigate}
                        >
                            Go To
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            addonBefore="Previous RCA No"
                            style={{
                                width: "100%",
                                textAlign: "center",
                                marginLeft: "20px",
                                backgroundColor: "white",
                            }}
                            value={previousRcaNo}
                        />
                    </Form.Item>
                </Form>
            </Row>
            <div>
                <Table
                    bordered
                    style={{
                        textAlign: "center",
                        width: "100%",
                    }}
                    columns={columns}
                    dataSource={summary}
                />
            </div>
            <Modal
                title="Print"
                open={showModal}
                onCancel={handleModalClose}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={printSubmit}
                        disabled={!selectedRcaNo }
                        loading={printLoading}
                    >
                        Submit
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                <Form.Item label=" Department Name:">
                        <Select
                            showSearch
                            value={department}
                            onChange={departmentchange}
                            style={{ width: '100%' }}
                            placeholder="Search Batch No"
                            optionFilterProp="children"
                        >
                            <Select.Option value="" disabled selected>
                                Department Name:
                            </Select.Option>
                            {departmantLOV.map((option) => (
                                <Select.Option key={option} value={option}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                        <Form.Item label="RCA No." required>
                            <Select
                                value={selectedRcaNo}
                                onChange={setSelectedRcaNo}
                                placeholder="Select RCA No."
                                style={{ width: '100%' }}
                                disabled={!department}
                            >
                                {rcaNos.map((rcaNo, index) => (
                                    <Select.Option key={index} value={rcaNo}>
                                        {rcaNo}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="month"
                            label="Select Month"
                            rules={[{ required: true, message: "Please select a month" }]}
                        >
                            <Select
                                style={{
                                    width: "100%",
                                    height: "36x",
                                    borderRadius: "0px",
                                    border: "1px solid #dddd",
                                    backgroundColor: "white",
                                    // marginBottom: "10%",s
                                }}
                                onChange={(value) => setSelectedMonth(value)}
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
                        </Form.Item>
                        <Form.Item
                            name="year"
                            label="Select Year"
                            rules={[{ required: true, message: "Please select a year" }]}
                        >
                            <Select
                                style={{
                                    width: "100%",
                                    height: "36x",
                                    borderRadius: "0px",
                                    border: "1px solid #dddd",
                                    backgroundColor: "white",
                                    marginBottom: "10%",
                                }}
                                onChange={(value) => {
                                    setSelectedYear(value);
                                }}
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
                        </Form.Item>
                    </Form>
            </Modal>

        </div>
    );
};
export default Engineering_FC004_Summary;
