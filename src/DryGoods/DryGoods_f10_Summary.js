/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
    EditOutlined
} from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, Tooltip, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from 'react-icons/fa';
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate, } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from '../Components/BleachingHeader.js';
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const DryGoods_f10_Summary = () => {
    
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [isModalPrint, setIsModalPrint] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [reason, setReason] = useState(false);
    const [printParams, setPrintParams] = useState({
        date: "",
        shift: "",
    });
    const [formParams, setFormParams] = useState({
        date: "",
        shift: "",
    });
    const [eSign, setESign] = useState({
        nxt_prod_sup_sign: "",
        supervisor_sign:"",
        hod_sign: "",
    });
    const token = localStorage.getItem("token");
    const [printButtonLoading, setPrintButtonLoading] = useState(false);
    const [printData, setPrintData] = useState({});
    const [summaryData, setSummaryData] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const initialized = useRef(false);
    const role = localStorage.getItem('role')

    useEffect(() => {
        const token = localStorage.getItem("token");
        const signatureKeys = ["nxt_prod_sup_sign", "supervisor_sign", "hod_sign"];
        signatureKeys.forEach((key) => {
            const username = printData[key];
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
                        setESign((prevSign) => ({
                            ...prevSign,
                            [key]: url,
                        }));
                    })
                    .catch((err) => {
                        console.log("Error in fetching image:", err);
                    });
            }
        });
    }, [token, printData]);
    // --------------------------- Summary Get Api ------------------------------
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            let apiUrl;
            if(role == "ROLE_SUPERVISOR"){
                apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/getSupSummarydetailsF10`
            }
            else if(role == "ROLE_HOD" || "ROLE_DESIGNEE"){
                apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/getHodSummarydetailsF10`
            }
            const fetchData = async () => {
                try{
                    const response = await axios.get(
                        apiUrl,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setSummaryData(response.data)
                }catch(error){
                    // message.error(error.response.data.message)
                }

            };
            fetchData();
        }

    },[token,navigate]);

    useEffect(() => {
        const findReason = () => {
            for (const data of summaryData) {
                if (data.supervisor_status == "SUPERVISOR_REJECTED" || data.hod_status == "HOD_REJECTED") {
                    setReason(true);
                    break;
                }
            }
        };
        findReason();
    }, [summaryData]);
    //---------------------------------------------------------------------------

    // ---------------------------- Summary Table Column -------------------------
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
            render: (text) => formatDate(text),
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

    const options = [
        { value: "I", label: "I" },
        { value: "II", label: "II" },
        { value: "III", label: "III" },
    ];


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
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleEdit = (record) => {
    navigate(`/Precot/DryGoods/F-10`, {
            state: {
                date: record.date,
                shift: record.shift
            }
        });
    };

    const handlePrint = async () => {
        if(printParams.date == "" || printParams.date == null){
            message.warning("Please Select Date")
            return;
        }
        else if(printParams.shift == "" || printParams.shift == null){
            message.warning("Please Select Shift")
            return;
        }
        try {
            setPrintButtonLoading(true);
            const response = await axios.get(
                `${ API.prodUrl}/Precot/api/Drygoods/Service/getDryForPrintF10?date=${printParams.date}&shift=${printParams.shift}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.length == 0) {
                message.warning('No data available to print');
                setPrintButtonLoading(false);
                return;
            }
            const data = response.data[0]
            setPrintData(prevState => ({
                ...prevState,
                ...data
            }))

        } catch (error) {
 
            setPrintButtonLoading(false);
            message.error(error.response.data.message);
        }
    }
    const handlePrintCancel = () => {
        setPrintParams(prevState => ({
            ...prevState,
            date:'',
            shift:''
        }))
        setPrintButtonLoading(false);
        setIsModalPrint(false);
    };
    const handleParam = (e, name) => {
        if (name == 'date') {
            setFormParams(prevState => ({
                ...prevState,
                date: e.target.value
            }))
        }
        if (name == 'shift') {
            setFormParams(prevState => ({
                ...prevState,
                shift: e
            }))
        }

    }
    const handlePrintParams = (e, name) => {
        if (name == 'date') {
            setPrintParams(prevState => ({
                ...prevState,
                date: e.target.value
            }))
        }
        if (name == 'shift') {
            setPrintParams(prevState => ({
                ...prevState,
                shift: e
            }))
        }
    }
    const handleOk = () => {
        if (formParams.date == "" || formParams.date == null) {
            message.warning("Please Select Date");
            return;
        }
        else if (formParams.shift == "" || formParams.shift == null) {
            message.warning("Please Select Shift");
            return;
        }

        navigate(`/Precot/DryGoods/F-10`, {
            state: {
                date: formParams.date,
                shift: formParams.shift
            }
        });

    }

    useEffect(() =>{
        if (Object.keys(printData).length > 0) {
            setTimeout(() => {
                window.print();
                setPrintData({})
                setPrintParams(prevState => ({
                    ...prevState,
                    date:'',
                    shift:''
                }))
                setPrintButtonLoading(false);
            }, 3000)
        }
        setESign(prevState => ({
            ...prevState,
            operator_sign: null,
            supervisor_sign: null,
            hod_sign: null

        }))
    },[printData])



    const formatPrintDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };



    return (
        <>
                <div id="section-to-print-san">
                <style>
                    {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print-san table th,
  #section-to-print-san table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
                .page-break {
                page-break-after: always;
            }
      }
    `}
                </style>
                <div className="page-break">
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <tr>
                                <td rowSpan={4}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={logo} alt="Logo" style={{ width: '80px', height: 'auto', textAlign: 'center' }} />
                                        <br></br>
                                        <br></br>

                                        <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                                    </div>
                                </td>

                                <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "60%" }} rowSpan={4}>Log Book - Dry Goods</td>
                                <td style={{ padding: '0.5em' }}>Format No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-PRD04/F-010</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Revision No.:</td>
                                <td style={{ padding: '0.5em' }}>01</td>

                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Ref. SOP No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-PRD04-D-03</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Page No.:</td>
                                <td style={{ padding: '0.5em' }}>01 of 02</td>
                            </tr>

                        </table>
                        <table>
                        <tr style={{ border: "none" }}>
                                        <td style={{ border: "none", padding: '20px' }} colSpan="10">
                                        </td>
                                    </tr>
                            <tr>
                                <td colSpan={2}> Date : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {formatDate(printData.date)} </td>
                                <td colSpan={3}> Shift : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {printData.shift} </td>
                            </tr>
                            <tr>
                                <td colSpan={5}>A. Work Allocation :</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}> Machine No.</td>
                                <td style={{textAlign:'center'}}> Min. No. of Persons Required </td>
                                <td style={{textAlign:'center'}}> No. of Persons Present </td>
                                <td style={{textAlign:'center'}} colSpan={2}>Product Description</td>
                            </tr>
                            <tr>

                <td rowSpan={2}>Pleat Line C1/3 (M/c. 1, 2 & 3)</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat Line C1/3 (M/c. 1, 2 & 3)")?.person_req}</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat Line C1/3 (M/c. 1, 2 & 3)")?.person_present}</td>
                <td style={{ textAlign: 'center' }}> Running</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat Line C1/3 (M/c. 1, 2 & 3)")?.running}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>Next</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat Line C1/3 (M/c. 1, 2 & 3)")?.next}</td>
              </tr>
              <tr >
                <td  rowSpan={2}>TC-10 Sliver Making V</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "PTC-10 Sliver Making V")?.person_req} </td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "PTC-10 Sliver Making V")?.person_present}</td>
                <td style={{ textAlign: 'center' }}>Running</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "PTC-10 Sliver Making V")?.running}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>Next</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "PTC-10 Sliver Making V")?.next}</td>
              </tr>
              <tr >
                <td rowSpan={2}>Pleat M/c. No. 1 (M/c. No. 3)</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat M/c. No. 1 (M/c. No. 3)")?.person_req}</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat M/c. No. 1 (M/c. No. 3)")?.person_present}</td>
                <td style={{ textAlign: 'center' }}>Running</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat M/c. No. 1 (M/c. No. 3)")?.running}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>Next</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat M/c. No. 1 (M/c. No. 3)")?.next}</td>
              </tr>
              <tr >
                <td  rowSpan={2}>Pleat M/c. No. 2(M/c. No. 4)</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat M/c. No. 2(M/c. No. 4)")?.person_req}</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat M/c. No. 2(M/c. No. 4)")?.person_present}</td>
                <td style={{ textAlign: 'center' }}>Running</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat M/c. No. 2(M/c. No. 4)")?.running}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>Next</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Pleat M/c. No. 2(M/c. No. 4)")?.next}</td>
              </tr>
              <tr >
                <td  rowSpan={2}>Wool Roll M/c. No. 1 (M/c. No. 5 & 6)</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)")?.person_req}</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)")?.person_present}</td>
                <td style={{ textAlign: 'center' }}>Running</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)")?.running}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>Next</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)")?.next}</td>
              </tr>
              <tr >
                <td  rowSpan={2}>Links Machine </td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Links Machine")?.person_req}</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Links Machine")?.person_present}</td>
                <td style={{ textAlign: 'center' }}>Running</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Links Machine")?.running}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>Next</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Links Machine")?.next}</td>
              </tr>                           <tr >
                <td  rowSpan={2}>Tex-core Machine </td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Tex-core Machine")?.person_req}</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Tex-core Machine")?.person_present}</td>
                <td style={{ textAlign: 'center' }}>Running</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Tex-core Machine")?.running}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>Next</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Tex-core Machine")?.next}</td>
              </tr>
              <tr >
                <td  rowSpan={2}>Printing </td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Printing")?.person_req}</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Printing")?.person_present}</td>
                <td style={{ textAlign: 'center' }}>Running</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Printing")?.running}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>Next</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "Printing")?.next}</td>
              </tr>
              <tr >
                <td rowSpan={2}>FG Transfer </td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "FG Transfer")?.person_req}</td>
                <td style={{ textAlign: 'center' }} rowSpan={2}>{printData.workAllocationDetails?.find((details) => details.mc_no === "FG Transfer")?.person_present}</td>
                <td style={{ textAlign: 'center' }}>Running</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "FG Transfer")?.running}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>Next</td>
                <td style={{ textAlign: 'center' }}>{printData.workAllocationDetails?.find((details) => details.mc_no === "FG Transfer")?.next}</td>
              </tr>
                            <tr>
                                <td colSpan={5}> B. Man Power Details</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}> Category</td>
                                <td style={{textAlign:'center'}}> On Pay Roll</td>
                                <td style={{textAlign:'center'}}>Present</td>
                                <td style={{textAlign:'center'}}>Leave</td>
                                <td style={{textAlign:'center'}} colSpan={2}>Absent</td>
                            </tr>
                            <tr >
              <td style={{  padding: '10px' }}>PH - Male</td>
              <td style={{ textAlign: 'center' }}> {printData.manpowerDetails?.find((details) => details.category === "PH - Male")?.on_pay_roll}</td>
              <td style={{ textAlign: 'center' }}> {printData.manpowerDetails?.find((details) => details.category === "PH - Male")?.present}</td>
              <td style={{ textAlign: 'center' }}> {printData.manpowerDetails?.find((details) => details.category === "PH - Male")?.leave}</td>
              <td style={{ textAlign: 'center' }}> {printData.manpowerDetails?.find((details) => details.category === "PH - Male")?.absent}</td>
            </tr>
            <tr >
              <td style={{  padding: '10px' }}>PH - Female</td>
              <td style={{ textAlign: 'center' }}> {printData.manpowerDetails?.find((details) => details.category === "PH - Female")?.on_pay_roll}</td>
              <td style={{ textAlign: 'center' }}> {printData.manpowerDetails?.find((details) => details.category === "PH - Female")?.present}</td>
              <td style={{ textAlign: 'center' }}> {printData.manpowerDetails?.find((details) => details.category === "PH - Female")?.leave}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "PH - Female")?.absent}</td>
            </tr>
            <tr >
              <td style={{  padding: '10px' }}>Contract - Male</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Contract - Male")?.on_pay_roll}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Contract - Male")?.present}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Contract - Male")?.leave}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Contract - Male")?.absent}</td>
            </tr>
            <tr >
              <td style={{  padding: '10px' }}>Contract - Female</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Contract - Female")?.on_pay_roll}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Contract - Female")?.present}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Contract - Female")?.leave}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Contract - Female")?.absent}</td>
            </tr>
            <tr >
              <td style={{  padding: '10px' }}>Total</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Total")?.on_pay_roll}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Total")?.present}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Total")?.leave}</td>
              <td style={{ textAlign: 'center' }}>{printData.manpowerDetails?.find((details) => details.category === "Total")?.absent}</td>
            </tr>
                            <tr>
                                <td colSpan={5}>If any other Communication : {printData.other_communication}</td>
                            </tr>
                            </table>
                        <table>
                        <thead>
                        <tr>
                                        <td style={{ border: "none", padding: '20px' }}></td>
                                    </tr>
                                
                                <tr>
                                    <td style={{ padding: '1em' }}>Particulars</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }}>Prepared By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }}>Reviewed By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }}>Approved By</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '1em' }}>Name</td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }}>Signature & Date</td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className="page-break">
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <tr>
                                <td rowSpan={4}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={logo} alt="Logo" style={{ width: '80px', height: 'auto', textAlign: 'center' }} />
                                        <br></br>
                                        <br></br>

                                        <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                                    </div>
                                </td>

                                <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "60%" }} rowSpan={4}>Log Book - Dry Goods</td>
                                <td style={{ padding: '0.5em' }}>Format No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-PRD04/F-010</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Revision No.:</td>
                                <td style={{ padding: '0.5em' }}>01</td>

                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Ref. SOP No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-PRD04-D-03</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Page No.:</td>
                                <td style={{ padding: '0.5em' }}>02 of 02</td>
                            </tr>

                        </table>
                        <table style={{width:'100%'}}>
                        <tr>
                                        <td style={{ border: "none", padding: '20px' }}></td>
                                    </tr>
                                <tr>
                                    <td colSpan={8}>
                                    JULAIN DATE : {printData.julain_date} <br/>
                                    1. No. Of Sliver cans stock:  {printData.no_of_sliver}  <br/>                                            
                                    2. No. Of roll stock for pleat & wool roll:  {printData.no_of_woll_roll}    <br/>              
                                    3. Planned Production details: <br/> 

                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'center'}} rowSpan={2}> S.No.</td>
                                    <td style={{textAlign:'center'}} rowSpan={2}>Machine Name</td>
                                    <td style={{textAlign:'center'}} rowSpan={2}>Order Number</td>
                                    <td style={{textAlign:'center'}} rowSpan={2}>Product Name</td>
                                    <td style={{textAlign:'center'}} rowSpan={2}>Order Qty Required (Box)</td>
                                    <td style={{textAlign:'center'}} colSpan={2}>Production Packed</td>
                                    <td style={{textAlign:'center'}} rowSpan={2}>Production Balance Qty. to be Packed (Box)</td>
                                </tr>
                                <tr>
                                <td style={{textAlign:'center'}}>Box</td>
                                    <td style={{textAlign:'center'}}>Bags</td>
                                </tr>
                                {printData.prodDetails?.map((data, index) => (
                                <tr key={index} >
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{data.macine_name}</td>
                                    <td style={{textAlign:'center'}}>{data.order_no}</td>
                                    <td style={{textAlign:'center'}}>{data.prod_name}</td>
                                    <td style={{textAlign:'center'}}>{data.order_qty}</td>
                                    <td style={{textAlign:'center'}}>{data.box}</td>
                                    <td style={{textAlign:'center'}}>{data.bag}</td>
                                    <td style={{textAlign:'center'}}>{data.prod_blnc_qty}</td>
                                </tr>
                                ))}
                                <tr>
                                    <td colSpan={8}>4. Sliver production details:</td>
                                </tr>

                        </table>
                        <table>
                            <tr>
                                <td>TC- 10 - 1</td>
                                <td style={{textAlign:'center',width:'30%'}}>{printData.tc_a}</td>
                                <td colSpan={2}>Ball MC-1 production: {printData.ball_mc_one_a}  </td>
                            </tr>
                            <tr>
                                <td >TC-10-2 </td>
                                <td style={{textAlign:'center'}}>{printData.tc_b}</td>
                                <td colSpan={2}>Ball MC-1 production:  {printData.ball_mc_one_b}</td>
                            </tr>
                            <tr>
                                <td >Total</td>
                                <td style={{textAlign:'center'}}>{(Number(printData.tc_a) + Number(printData.tc_b)).toFixed(2) }</td>
                                <td colSpan={2}>Ball MC-1 production: {printData.ball_mc_one_c} </td>
                            </tr>
                            <tr>
                                <td >TC-10-1 Breakages</td>
                                <td style={{textAlign:'center'}}>{printData.tc_a_brk}</td>
                                <td colSpan={2}>Total : {(Number(printData.ball_mc_one_a) + Number(printData.ball_mc_one_b) + Number(printData.ball_mc_one_c)).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td >TC-10-2 Breakages</td>
                                <td style={{textAlign:'center'}}>{printData.tc_b_brk}</td>
                                <td colSpan={2}>Ball MC-2 production:  {printData.ball_mc_two_a}</td>
                            </tr>
                            <tr>
                                <td >Total</td>
                                <td style={{textAlign:'center'}}>{(Number(printData.tc_a_brk) + Number(printData.tc_b_brk)).toFixed(2) }</td>
                                <td colSpan={2}>Ball MC-2 production: {printData.ball_mc_two_b}  </td>
                            </tr>
                            <tr>
                                <td rowSpan={2} colSpan={2}>Waste in Kg: {printData.hours_06} </td>
                                <td colSpan={2}>Ball MC-2 production: {printData.ball_mc_two_c}  </td>
                            </tr>
                            <tr>
                                <td>Total {(Number(printData.ball_mc_two_a) + Number(printData.ball_mc_two_b) + Number(printData.ball_mc_two_c)).toFixed(2)}</td>
                                <td>Grand Total {(Number(printData.ball_mc_one_a) + Number(printData.ball_mc_one_b) + Number(printData.ball_mc_one_c) + Number(printData.ball_mc_two_a) + Number(printData.ball_mc_two_b) + Number(printData.ball_mc_two_c)).toFixed(2)}</td>
                            </tr>
                        </table>
                        <table style={{width:'100%'}}>
                        <tr><td colSpan={4}>5. Mini Roll production details:</td></tr>
                            <tr>
                                <td>PO NO: {printData.po_no_one}</td>
                                <td>Product Name :  {printData.product_name_one}</td>
                            </tr>
                            <tr>
                                <td>PO NO: {printData.po_no_two}</td>
                                <td>Product Name : {printData.product_name_two}</td>
                            </tr>
                            <tr>
                                <td>PO NO: {printData.po_no_three}</td>
                                <td>Product Name : {printData.product_name_three} </td>
                            </tr>
                        </table>
                        <table style={{width:'100%'}}>
                            <tr>
                                        <td
                                            style={{ paddingTop: "5px", borderBottom: "none", textAlign: "center" }}
                                        >
                                            Production Supervisor Sign & Date
                                        </td>
                                        <td
                                            style={{ paddingTop: "5px", borderBottom: "none", textAlign: "center" }}
                                        >
                                            Handed over to Next Production Supervisor Sign & Date
                                        </td>
                                        <td
                                            style={{ paddingTop: "5px", borderBottom: "none", textAlign: "center" }}
                                            colSpan="2"
                                        >HOD/Designee Sign & Date{" "}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                display: "table-cell",
                                                verticalAlign: "bottom",
                                                paddingTop: "15px",
                                                borderTop: "none",
                                                textAlign: "center",
                                            }}
                                        >
                                            {" "}
                                            {eSign.supervisor_sign ? (
                                                <img
                                                    src={eSign.supervisor_sign}
                                                    alt="eSign"
                                                    style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                        mixBlendMode: "multiply",
                                                    }}
                                                />) : null}
                                            <br></br>
                                            {printData.supervisor_sign} <br></br>
                                            {formatPrintDate(printData.supervisor_submit_on)}
                                        </td>
                                        <td                                             style={{
                                                display: "table-cell",
                                                verticalAlign: "bottom",
                                                paddingTop: "15px",
                                                borderTop: "none",
                                                textAlign: "center",
                                            }}>
                                                {eSign.nxt_prod_sup_sign ? (
                                                <img
                                                    src={eSign.nxt_prod_sup_sign}
                                                    alt="eSign"
                                                    style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                        mixBlendMode: "multiply",
                                                    }}
                                                />) : null}
                                            <br></br>
                                            {printData.nxt_prod_sup_sign} <br></br>
                                            {formatPrintDate(printData.nxt_prod_sup_date)}
                                        </td>
                                        <td
                                            style={{
                                                display: "table-cell",
                                                verticalAlign: "bottom",
                                                paddingTop: "15px",
                                                borderTop: "none",
                                                textAlign: "center",
                                            }}
                                        >
                                            {" "}
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
                                            <br></br>
                                            {printData.hod_sign} <br></br>
                                            {formatPrintDate(printData.hod_submit_on)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: "none", padding: '20px' }}></td>
                                    </tr>
                        </table>
                        <table>
                        <thead>
                                <tr>
                                    <td style={{ padding: '1em' }}>Particulars</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }}>Prepared By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }}>Reviewed By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }}>Approved By</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '1em' }}>Name</td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }}>Signature & Date</td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                </tr>
                            </tbody>
                        </table>

                        </div>

        </div>
        <BleachingHeader
                formName={"LOG BOOK - DRY GOODS"}
                formatNo={"PH-PRD04/F-010"}
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
            <Modal title="Production Report - Mini Roll (Print)" open={isModalPrint} onCancel={handlePrintCancel} width={380} destroyOnClose={true}
                footer={[
                    <Button key="cancel" onClick={handlePrintCancel} >
                        Cancel
                    </Button>,
                    <Button key="reject" type="primary" onClick={handlePrint} loading={printButtonLoading}>
                        OK
                    </Button>,
                ]}>
                            <label>Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;</label>
                <Input type="date" value={printParams.date} onChange={(e) => { handlePrintParams(e, 'date') }} max={today} style={{ textAlign: 'center',width:'150px' }}></Input><br></br><br></br>
                <label>Shift &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;</label>
                <Select options={options} onChange={(e) => { handlePrintParams(e, 'shift') }} value={printParams.shift} style={{ textAlign: 'center',width:'150px' }} dropdownStyle={{
                    color: "#00308F",
                    textAlign: "center"

                }}></Select>
            </Modal>
            <div style={{ marginTop: "20px", marginBottom: "20px", display: "flex", gap: "10px" }}>
                <label style={{ marginTop: "8px" }}>Date : </label>
                <Input style={{ width: "150px" }} type="date" onChange={(e) => { handleParam(e, "date") }} max={today}></Input>
                <label style={{ marginTop: "8px" }}>Shift : </label>
                <Select options={options} placeholder="Shift" onChange={(e) => { handleParam(e, "shift") }} style={{
                    width: '150px', borderRadius: "40px", textAlign: "center"
                }}
                    dropdownStyle={{
                        color: "#00308F",
                        textAlign: "center"

                    }}
                />
                <Button
                    type="primary"
                    style={{
                        backgroundColor: "#E5EEF9",
                        color: "#00308F",
                        fontWeight: "bold",
                    }}
                    shape="round"
                    icon={<BiNavigation color={"#00308F"} />}
                    onClick={handleOk}
                >
                    Go To
                </Button>
            </div>
        <Table columns={columns} dataSource={summaryData} ></Table>
        </>
    )
}

export default DryGoods_f10_Summary;