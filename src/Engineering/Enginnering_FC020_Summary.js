
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

const Engineering_FC020_Summary = () => {
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
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState(false);
    const [form] = Form.useForm();
    const [getData, setGetData] = useState([]);
    const [department, setDepartment] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [printLoading, setPrintLoading] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [worNo, setWorNo] = useState("");
    const [previousWorNo, setPreviousWorNo] = useState("");

    const [getImage, setGetImage] = useState("");
    const [getImage1, setGetImage1] = useState("");
    const [getImage2, setGetImage2] = useState("");
    const [getImage3, setGetImage3] = useState("");
    const handleModalClose = () => {
        setSelectedDate("");
        setSelectedWorNo("");
        setSelectedDepartment("");
        setSelectedMonth("");
        setSelectedYear("");
        form.resetFields();
        setShowModal(false);
        // Reset form fields
        setPrintLoading(false);
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
            title: "dateOfRequest",
            dataIndex: "date",
            key: "date",
            align: "center",
            render: (text) => formatDates(text),
        },
        {
            title: "targetDate",
            dataIndex: "targetDate",
            key: "targetDate",
            align: "center",
            render: (text) => formatDates(text),
        },
        {
            title: "Work Order No.",
            dataIndex: "worNo",
            key: "worNo",
            align: "center",
        },
        {
            title: "department",
            dataIndex: "department",
            key: "department",
            align: "center",
        },
        {
            title: "Requester Status",
            dataIndex: "sup_status",
            key: "sup_status",
            align: "center",
        },
        {
            title: "Engineering Status",
            dataIndex: "hod_status",
            key: "hod_status",
            align: "center",
        },
        {
            title: "HOD Status",
            dataIndex: "hodStatus",
            key: "hodStatus",
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



    const Reason = {
        title: "Reason",
        dataIndex: "reason",
        key: "reason",
        align: "center",
        render: (text) => (text ? text : 'N/A')
    };

    // let columns;
    // if (reason) {
    //     columns = [
    //         ...baseColumns.slice(0, 9),
    //         Reason,
    //         ...baseColumns.slice(9),
    //     ];

    // } else {
    let columns = baseColumns;
    // }

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
                // console.loglog("edit response", res);
                if (Array.isArray(res.data)) {
                    setSummary(
                        res.data.map((x, index) => ({
                            // Handle potential null or undefined values
                            // date: x.date,
                            department: x.department,
                            sup_status: x.requesterStatus,
                            hod_status: x.receiverstatus,
                            hodStatus: x.hodStatus,
                            date: x.dateOfRequest,
                            targetDate: x.targetDate,
                            worNo: x.worNo,
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

        const summaryUrl = `${ API.prodUrl}/Precot/api/Engineering/getWorkorderlistSummary?username=${username}`;

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


    const handleDateChange = (value) => {
        setSelectedDate(value);
    };
    const handleEdit = (x) => {
        // console.loglog("particular ", x);
        navigate("/Precot/Engineering/FC-020", {
            state: {
                date: x.date,
                worNo: x.worNo,
            },
        });
        // console.loglog("edit screen", x);
    };


    // console.loglog("orderNo", orderNo);


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
        let baseUrl = `${ API.prodUrl}/Precot/api/Engineering/getWorkorderlistPrint?worNo=${selectedWorNo}&month=${selectedMonth}&year=${selectedYear}`;
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
                        `${ API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.requesterSign}`,
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
                        `${ API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.accepterSign}`,
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
                        setGetImage3(url);
                    })
                    .catch((err) => {
                        // console.log("Error in fetching image:", err);
                    });
                axios
                    .get(
                        `${ API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.receiverSign}`,
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
                axios
                    .get(
                        `${ API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.hodSign}`,
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
                        setGetImage2(url);
                    })
                    .catch((err) => {
                        // console.log("Error in fetching image:", err);
                    });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                message.error("Failed to fetch data. Please try again.");
                setPrintLoading(false);
            });
        // .finally(()=>{ setPrintLoading(false)});
    };


    const hasFetched = useRef(false);
    useEffect(() => {
        const fetchPreviousWorNo = async () => {

            if (hasFetched.current || !token) return;

            hasFetched.current = true;

            try {
                const response = await axios.get(
                    `${ API.prodUrl}/Precot/api/Engineering/lastWoRNo`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Previous RCA No.:", response.data);
                setPreviousWorNo(response.data);

                const [x, a, z] = response.data.split("/").map(str => str.trim());
                const newZ = String(Number(z) + 1).padStart(z.length, "0");
                setWorNo(`${x}/${a}/${newZ}`);
            } catch (error) {
                console.error("Error fetching previous RCA number:", error);
            }
        };
        fetchPreviousWorNo();
    }, [token]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setWorNo(value);
    };


    const [worNos, setWorNos] = useState([]); // State to store wor numbers
    const [selectedWorNo, setSelectedWorNo] = useState('');


    const fetchWorNo = async (department) => {
        try {
            const response = await fetch(`${ API.prodUrl}/Precot/api/Engineering/departmentbasedworno?department=${department}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            // Check if the response is okay
            if (!response.ok) {
                const errorMessage = await response.text(); // Get the error message from response
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
            }
            if (response.status === 204) {
                console.log('No WOR numbers available for this department.'); // Log the absence of data
                setWorNos([]); // Clear WOR Nos
                setSelectedWorNo(''); // Clear selected WOR No
                return; // Exit the function early
            }

            const data = await response.json();
            console.log('Fetched WOR Nos:', data); // Log fetched data

            // If no data returned, clear the WOR numbers and selected WOR No
            if (data.length === 0) {
                setWorNos([]);
                setSelectedWorNo('');
            } else {
                setWorNos(data);
            }
        } catch (error) {
            console.error('Error fetching wor numbers:', error.message);
        }
    };


    // const selectedDepartmentchange = (value) => {
    //     setSelectedDepartment(value);
    //     setSelectedWorNo('');
    //     // fetchWorNo(value);
    // }

    const selectedDepartmentChange = (value) => {
        console.log('Selected Department:', value);
        setSelectedDepartment(value);
        setSelectedWorNo('');
        fetchWorNo(value);
    };

    const handleNavigate = () => {
        if (date == "") {
            message.warning('Please Select date');
        }
        else {
            navigate("/Precot/Engineering/FC-020", {
                state: { date: date, worNo: worNo },
            });
        }
    };
    const departmentchange = (value) => {
        setDepartment(value);
        fetchWorNo(value);
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
                {printResponseData?.map((data, index) => (
                    <table style={{ marginTop: "30px", scale: "95%" }}>
                        <thead>
                            <tr style={{ border: "none" }}>
                                <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
                            </tr>

                            <tr style={{ height: "20px" }}>
                                <td colSpan="1" rowSpan="4" style={{ textAlign: "center", width: "10%" }}>
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        style={{ width: "80px", height: "auto" }}
                                    />
                                    <br />
                                    <b style={{ fontFamily: 'Times New Roman, Times, serif' }}>Unit H</b>
                                </td>
                                <td rowSpan="4" colSpan="7" style={{ textAlign: "center" }}>
                                    <b>Work Order Request Form</b>{" "}
                                </td>
                                <td colSpan="1">Format No.:</td>
                                <td colSpan="2">PH-ENG01/FC-020</td>
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
                                <td colSpan="2">{index + 1} of {printResponseData.length}</td>
                            </tr>
                            <tr style={{ border: "none" }}>
                                <td style={{ border: "none" }}></td>
                            </tr>
                        </thead>
                        <br />
                        <tbody>
                            <tr>
                                <td colSpan={2}>Date of Request</td>
                                <td colSpan={4}>{formatDates(data?.dateOfRequest)}</td>
                                <td colSpan={2}>WOR No.:</td>
                                <td colSpan={2}>{data?.worNo}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Department </td>
                                <td colSpan={4}>{data?.department}</td>
                                <td colSpan={2}>Area: </td>
                                <td colSpan={2}>{data?.area}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Target Date:</td>
                                <td colSpan={9}>{formatDates(data?.targetDate)}</td>
                            </tr>

                            <tr>
                                <td colSpan={10} style={{ height: '150px', verticalAlign: 'top' }}>Details of work order/Work description: <br /> <br />{data?.detailsOfWork}</td>
                            </tr>


                            <tr>
                                <td colSpan={6}>Requested By Sign & Date <br /> (User Department) </td>
                                <td colSpan={4}> {data?.requesterSign}
                                    <br />{formatDate(data?.requesterSubmitOn)}
                                    <br />
                                    <>
                                        {getImage && (
                                            <img
                                                className="signature"
                                                src={getImage}
                                                alt="logo"
                                            />
                                        )}
                                    </>
                                </td>
                              
                            </tr>
                            <tr>
                                <td colSpan={2}>Tentative Completion Date:</td>
                                <td colSpan={9}>{formatDates(data?.tentativeDate)}</td>
                            </tr>
                            <tr>
                                <td colSpan={10} style={{ height: '150px', verticalAlign: 'top' }}>Comments (by Engineering): <br /> <br />{data?.initialComments}</td>
                            </tr>
                            <td colSpan={6}>Received by Sign & Date <br />(Engineering Department)</td>
                                <td colSpan={4}> {data?.accepterSign}
                                    <br />{formatDate(data?.accepterSubmitOn)}
                                    <br />
                                    <>
                                        {getImage3 && (
                                            <img
                                                className="signature"
                                                src={getImage3}
                                                alt="logo"
                                            />
                                        )}
                                    </></td>
                            <tr>
                                <th colSpan={10} style={{ textAlign: 'center' }}>Work Order Closure status</th>
                            </tr>
                            <tr>
                                <td colSpan={2}>Closure Date</td>
                                <td colSpan={9}>{formatDates(data?.closureDate)}</td>
                            </tr>
                            <tr>
                                <td colSpan={10} style={{ height: '150px', verticalAlign: 'top' }}>Comments (by Engineering): <br /> <br />{data?.closureComments}</td>
                            </tr>
                            <tr>
                                <td colSpan={10} style={{ height: '150px', verticalAlign: 'top' }}>Comments:  <br /> <br />{data?.comments}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>Completed By (Sign & Date) <br />(Engineering Department) </td>
                                <td colSpan={2}> {data?.receiverSign}
                                    <br />{formatDate(data?.receiverSubmiton)}
                                    <br />
                                    <>
                                        {getImage1 && (
                                            <img
                                                className="signature"
                                                src={getImage1}
                                                alt="logo"
                                            />
                                        )}
                                    </></td>
                                <td colSpan={2}>Verified By Sign & Date <br />(User Department)</td>
                                <td colSpan={2}> {data?.hodSign}
                                    <br />{formatDate(data?.hodSubmitOn)}
                                    <br />
                                    <>
                                        {getImage2 && (
                                            <img
                                                className="signature"
                                                src={getImage2}
                                                alt="logo"
                                            />
                                        )}
                                    </></td>
                            </tr>

                        </tbody>
                        <br />
                        <tfoot>
                            <br />
                            <tr style={{ height: "30px" }}>
                                <td colSpan={5}>Particulars</td>
                                <td colSpan={2}>Prepared by</td>
                                <td colSpan={2}>Reviewed by</td>
                                <td colSpan={1}>Approved by</td>
                            </tr>
                            <tr style={{ height: "30px" }}>
                                <td colSpan={5}>Name</td>
                                <td colSpan={2}></td>
                                <td colSpan={2}></td>
                                <td colSpan={1}></td>
                            </tr>
                            <tr style={{ height: "30px" }}>
                                <td colSpan={5}>Signature & Date</td>
                                <td colSpan={2}></td>
                                <td colSpan={2}></td>
                                <td colSpan={1}></td>
                            </tr>
                        </tfoot>
                    </table>
                ))}
            </div>


            <BleachingHeader
                unit="Unit-H"
                formName="WORK ORDER REQUEST FORM"
                formatNo="PH-ENG01/FC-020"
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
                    <Form.Item label="WOR No.">
                        <input
                            placeholder="WOR No."
                            value={worNo}
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
                            value={previousWorNo}
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
                        // disabled={(!selectedDepartment && !selectedDate && (!selectedMonth || !selectedYear))}
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
                            value={selectedDepartment}
                            onChange={selectedDepartmentChange}
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
                    <Form.Item label="Wor No." required>
                        <Select
                            value={selectedWorNo}
                            onChange={setSelectedWorNo}
                            placeholder="Select Wor No."
                            style={{ width: '100%' }}
                            disabled={!selectedDepartment} // Disable if no department selected
                        >
                            {worNos.length > 0 ? (
                                worNos.map((worNo, index) => (
                                    <Select.Option key={index} value={worNo}>
                                        {worNo}
                                    </Select.Option>
                                ))
                            ) : (
                                <Select.Option disabled>No WOR Numbers available</Select.Option> // Option for no available WOR Nos
                            )}
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
export default Engineering_FC020_Summary;
