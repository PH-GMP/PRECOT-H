
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

const Engineering_FC003_Summary = () => {
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
  

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
  
    const [date, setDate] = useState("");
    const today = new Date().toISOString().split("T")[0];
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
    const [previousBisNo, setPreviousBisNo] = useState("");
    const [bisNo, setBisNo] = useState("");
    const [signatureImages, setSignatureImages] = useState([]);

    const handleModalClose = () => {
        setShowModal(false);
        setPrintLoading(false);
        setSelectedBisNo("");
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

    function generateYearOptions(startYear) {
        const currentYear = new Date().getFullYear();
        const endYear = Math.max(currentYear + (currentYear - startYear), startYear + 16);
        const years = [];

        for (let year = startYear; year <= endYear; year++) {
            years.push({ id: year, value: year.toString() });
        }

        return years;
    }

    const years = generateYearOptions(2024);


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
            title: "BIS No.",
            dataIndex: "bisNo",
            key: "bisNo",
            align: "center",
        },
        {
            title: "BMR No.",
            dataIndex: "bmrNo",
            key: "bmrNo",
            align: "center",
        },
        {
            title: "Department",
            dataIndex: "issuerDepartment",
            key: "issuerDepartment",
            align: "center",
        },
        {
            title: "Supervisor Status",
            dataIndex: "sup_status",
            key: "sup_status",
            align: "center",
        },
        {
            title: "Engineering Acceptance Status",
            dataIndex: "engineerIssuerStatus",
            key: "engineerIssuerStatus",
            align: "center",
        },
        {
            title: "Engineering Status",
            dataIndex: "hod_status",
            key: "hod_status",
            align: "center",
        },
        {
            title: "Supervisor Closure Status",
            dataIndex: "closureStatus",
            key: "closureStatus",
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

    let columns = baseColumns;


    const handlePrint = () => {
        setShowModal(true);


    };
    const handleBack = () => {
        navigate("/Precot/choosenScreen");
    };

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
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

                if (Array.isArray(res.data)) {
                    setSummary(
                        res.data.map((x, index) => ({

                            date: x.date,
                            bisNo: x.bisNo,
                            bmrNo: x.bmrNo || "NA",
                            sup_status: x.supervisorStatus,
                            issuerDepartment: x.issuerDepartment,
                            hod_status: x.receiverstatus,
                            engineerIssuerStatus: x.engineerIssuerStatus,
                            closureStatus: x.closureStatus,
                            shift: x.shift,
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

        const summaryUrl = `${ API.prodUrl}/Precot/api/Engineering/getBreakdownSummary?username=${username}`;


        fetchSummary(summaryUrl);

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
        const fetchPreviousBisNo = async () => {

            if (hasFetched.current || !token) return;

            hasFetched.current = true;

            try {
                const response = await axios.get(
                    `${ API.prodUrl}/Precot/api/Engineering/lastBsiNo`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Previous RCA No.:", response.data);
                setPreviousBisNo(response.data);


                const [x, a, z] = response.data.split("/").map(str => str.trim());
                const newZ = String(Number(z) + 1).padStart(z.length, "0");
                setBisNo(`${x}/${a}/${newZ}`);
            } catch (error) {
                console.error("Error fetching previous RCA number:", error);
            }
        };

        fetchPreviousBisNo();
    }, [token]);

    console.log("gatepassno", bisNo);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setBisNo(value);
    };

    const selectedDepartmentchange = (value) => {
        setSelectedDepartment(value);
        fetchBisNo(value);
    }

    const handleDateChange = (value) => {
        setSelectedDate(value);
    };
    const handleEdit = (x) => {

        navigate("/Precot/Engineering/FC-003", {
            state: {
                date: x.date,
                bisNo: x.bisNo,
            },
        });

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
        let baseUrl = `${ API.prodUrl}/Precot/api/Engineering/getBreakdownPrint?bisNo=${selectedBisNo}&month=${selectedMonth}&year=${selectedYear}`;
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
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setPrintResponseData(response.data);
                    setPrintLoading(true);

                    setTimeout(() => {
                        window.print();
                        handleModalClose();
                    }, 4000);

                    console.log("print data", response.data);
                } else {
                    setPrintResponseData([]);
                    setPrintLoading(false);
                    message.error(
                        "No details found for the selected form. Cannot print."
                    );
                    handleModalClose();
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                message.error("Failed to fetch data. Please try again.");
                setPrintLoading(false);
            })
            .finally(() => { setPrintLoading(false) });
    };

    const signatures = [
        { key: 'supervisorSign', setter: 'supervisorSign' },
        { key: 'engineerIssuerSign', setter: 'engineerIssuerSign' },
        { key: 'receiverSign', setter: 'receiverSign' },
        { key: 'closureSign', setter: 'closureSign' },
    ];
    useEffect(() => {
        printResponseData?.forEach((data, index) => {
            signatures.forEach(({ key, setter }) => {
                const username = data?.[key];
                if (username) {
                    fetchAndSetImage(username, key, index);
                }
            });
        });
    }, [printResponseData]);


    const fetchAndSetImage = (username, key, index) => {
        if (!username) return;

        axios
            .get(`${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
            })
            .then((res) => {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );
                const url = `data:image/jpeg;base64,${base64}`;

                // Update the corresponding image for this specific index (record)
                setSignatureImages((prevState) => {
                    const updatedImages = [...prevState];
                    updatedImages[index] = {
                        ...updatedImages[index],
                        [key]: url,
                    };
                    return updatedImages;
                });
            })
            .catch((err) => {
                console.error(`Error fetching image for ${username}:`, err);
            });
    };


    const [bisNos, setBisNos] = useState([]);
    const [selectedBisNo, setSelectedBisNo] = useState('');

    useEffect(() => {
        if (selectedDepartment) {
            fetchBisNo(selectedDepartment);
        } else {
            setBisNos([]);
        }
    }, [selectedDepartment]);

    const fetchBisNo = async (department) => {
        try {
            const response = await fetch(`${ API.prodUrl}/Precot/api/Engineering/departmentbasedbsino?issuerDepartment=${department}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.length > 0) {
                setBisNos(data);
            } else {
                setBisNos([]);
                message.warning('No BIS Numbers available for this department.');
            }
        } catch (error) {
            console.error('Error fetching BIS numbers:', error);
            message.error('Failed to fetch BIS numbers.');
        }
    };


    const handleNavigate = () => {
        if (date == "") {

            message.warning('Please Select date');
        }
        else {
            navigate("/Precot/Engineering/FC-003", {
                state: { date: date, bisNo: bisNo },
            });
        }
    };
    const departmentchange = (value) => {
        setDepartment(value);
    }

    const formatDate = (dateStr) => {

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

    return (
        <div>
            <div id="section-to-print">
                {printResponseData?.map((data, index) => (
                    <div key={data.id}>
                        <table style={{ marginTop: "30px", scale: "95%" }} >
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
                                        <b>Breakdown Intimation Slip</b>{" "}
                                    </td>
                                    <td colSpan="1">Format No.:</td>
                                    <td colSpan="2">PH-ENG01/FC-003</td>
                                </tr>
                                <tr style={{ height: "30px" }}>
                                    <td colSpan="1">Revision No.:</td>
                                    <td colSpan="2">01</td>
                                </tr>
                                <tr style={{ height: "30px" }}>
                                    <td colSpan="1">Ref.SOP No.:</td>
                                    <td colSpan="2">PH-ENG01-D-02</td>
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
                                    <td colSpan={2} style={{ height: '25px' }}>Date</td>
                                    <td colSpan={9}>{formatDates(data?.date)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Issuer Department</td>
                                    <td colSpan={9}>{data?.issuerDepartment}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>BIS No.</td>
                                    <td colSpan={9}>{data?.bisNo}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>BMR No.</td>
                                    <td colSpan={9}>{data?.bmrNo}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Equipment Name</td>
                                    <td colSpan={9}>{data?.equipmentName}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Breakdown Details</td>
                                    <td colSpan={9}>{data?.breakdownDetails}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Receiver Department</td>
                                    <td colSpan={9}>{data?.receiverDepartment}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>First Information time</td>
                                    <td colSpan={9}>{formatDate(data?.firstInformationTime)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} >Issuer department <br />sign and date:</td>
                                    <td colSpan={9}>{data?.supervisorSign}<br />{formatDate(data?.supervisorSubmitOn)}<br />
                                        {/* {<img className="signature" src={getImage} /> */}
                                        {signatureImages[index]?.supervisorSign && (
                                            <img className="signature" src={signatureImages[index].supervisorSign} />
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Estimated Repair Time</td>
                                    <td colSpan={9}>{(data?.estimatedRepairTime)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} >Receiver department sign <br />and date:</td>
                                    <td colSpan={9}>{data?.engineerIssuerSign}<br />{formatDate(data?.engineerIssuerSubmitOn)}<br />
                                        {/* {<img className="signature" src={getImage1} />} */}
                                        {signatureImages[index]?.engineerIssuerSign && (
                                            <img className="signature" src={signatureImages[index].engineerIssuerSign} />
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Equipment Attended</td>
                                    <td colSpan={9}>{data?.equipmentAttended}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Spare used if any </td>
                                    <td colSpan={9}>{data?.spareUsedIfAny}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Repair start time</td>
                                    <td colSpan={9}>{formatDate(data?.repairStartTime)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Repair end time</td>
                                    <td colSpan={9}>{formatDate(data?.repairEndTime)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Reasons for Breakdown</td>
                                    <td colSpan={9}>{data?.reasonsForBreakdown}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Machine start time</td>
                                    <td colSpan={9}>{formatDate(data?.machineStartTime)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: '25px' }}>Process Stop Time</td>
                                    <td colSpan={5}>{data?.processStopTime}</td>
                                    <td colSpan={1}>Breakdown Stop Time</td>
                                    <td colSpan={3}>{data?.breakdownStopTime}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Receiver department sign <br />and date:</td>
                                    <td colSpan={5}>{data?.receiverSign}<br />{formatDate(data?.receiverSubmiton)}<br />
                                        {/* {<img className="signature" src={getImage2} />} */}
                                        {signatureImages[index]?.receiverSign && (
                                            <img className="signature" src={signatureImages[index].receiverSign} />
                                        )}
                                    </td>
                                    <td colSpan={1}>Issuer department <br />sign and date:</td>
                                    <td colSpan={3}>{data?.closureSign}<br />{formatDate(data?.closureSubmitOn)}<br />
                                        {/* {<img className="signature" src={getImage3} />} */}
                                        {signatureImages[index]?.closureSign && (
                                            <img className="signature" src={signatureImages[index].closureSign} />
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                            <br />
                            <tfoot>
                                <br />
                                <tr style={{ height: "30px" }}>
                                    <td colSpan={5}>Particulars</td>
                                    <td colSpan={2}>Prepared by</td>
                                    <td colSpan={2}>Reviewed by</td>
                                    <td colSpan={2}>Approved by</td>
                                </tr>
                                <tr style={{ height: "30px" }}>
                                    <td colSpan={5}>Name</td>
                                    <td colSpan={2}></td>
                                    <td colSpan={2}></td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{ height: "30px" }}>
                                    <td colSpan={5}>Signature & Date</td>
                                    <td colSpan={2}></td>
                                    <td colSpan={2}></td>
                                    <td colSpan={2}></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                ))}
            </div>


            <BleachingHeader
                unit="Unit-H"
                formName="BREAKDOWN INTIMATION SLIP"
                formatNo="PH-ENG01/FC-003"
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
                    <Form.Item label="BIS No.">
                        <input
                            placeholder="BIS No."
                            value={bisNo}
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
                            addonBefore="Previous BIS No"
                            style={{
                                width: "100%",
                                textAlign: "center",
                                marginLeft: "20px",
                                backgroundColor: "white",
                            }}
                            value={previousBisNo}
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
                        disabled={(!selectedDepartment && !selectedDate && (!selectedMonth || !selectedYear))}
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
                            onChange={selectedDepartmentchange}
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
                    <Form.Item label="BIS No." required>
                        <Select
                            value={selectedBisNo}
                            onChange={setSelectedBisNo}
                            placeholder="Select BIS No."
                            style={{ width: '100%' }}
                            disabled={!selectedDepartment}
                        >
                            {bisNos.length > 0 ? (
                                bisNos.map((bisNo, index) => (
                                    <Select.Option key={index} value={bisNo}>
                                        {bisNo}
                                    </Select.Option>
                                ))
                            ) : (
                                <Select.Option disabled>No BIS Numbers available</Select.Option>
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
export default Engineering_FC003_Summary;
