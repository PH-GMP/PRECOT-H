/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Select, Table, Tooltip, message, Input, Modal } from "antd";
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

const getStartAndEndDateFromWeek = (weekValue) => {
    if( weekValue == "" ){
        return;
    }
    const [year, week] = weekValue.split('-W');
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (week - 1) * 7;

    const startDate = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset));
    const dayOfWeek = startDate.getDay();
    const startOfWeek = new Date(startDate.setDate(startDate.getDate() - dayOfWeek + 2));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDate = (date) => date.toISOString().split('T')[0];

    return {
        startOfWeek: formatDate(startOfWeek),
        endOfWeek: formatDate(endOfWeek),
    };
};

const QualityControl_f23_Summary = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [isModalPrint, setIsModalPrint] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [Autoclave,setAutoClave] = useState('');
    const [reason, setReason] = useState(false);
    const [formParams,setFormParams] = useState ({
        date :'',
        week:'',
        serlzDate:''
    })
    const [printParams, setPrintParams] = useState({
        date :'',
        week:'',
        serlzDate:''
    });
    const [eSign, setESign] = useState({});
    const token = localStorage.getItem("token");
    const [printButtonLoading, setPrintButtonLoading] = useState(false);
    const [printData, setPrintData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    //---------------------- For
    const current = new Date();
    const year = current.getFullYear();
    const week = Math.ceil(((current - new Date(year, 0, 1)) / 86400000 + current.getDay()) / 7);
    const maxWeek = `${year}-W${week.toString().padStart(2, '0')}`;
    // -----------------------
    const initialized = useRef(false);
    const [dateRange, setDateRange] = useState({ startOfWeek: '', endOfWeek: '' });
    const [dateRange2, setDateRange2] = useState({ startOfWeek: '', endOfWeek: '' });
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

    useEffect (() => {
    const fetchUserDataAndImages = () => {
        axios
          .get(`${   API.prodUrl}/Precot/api/Users/Service/getRoles?department=QUALITY_CONTROL`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token, 
            },
          })
          .then((response) => {
            const users = response.data;
            users.forEach((user) => {
              const { username } = user;
              console.log(username)
      
              axios
                .get(`${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`, {
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
                  setESign((prevSign) => ({
                    ...prevSign,
                    [username]: url,
                  }));
                })
                .catch((err) => {
                  console.log("Error fetching image for", username, err);
                });
            });
          })
          .catch((err) => {
            console.log("Error fetching users:", err);
          });
      };
      fetchUserDataAndImages()
    },[token])

    useEffect (() => {
        const name = "jeevan"
        console.log(eSign)
    },[eSign])


      

    // useEffect(() => {
    //     const signatureKeys = ["chemist_sign", "qa_exe_sign", "manager_sign"];
    //     signatureKeys.forEach((key) => {
    //       const username = printData[key];
    //       if (username) {
    //         console.log("usernameparams", username);
    
    //         axios
    //           .get(
    //             `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
    //             {
    //               headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + token,
    //               },
    //               responseType: "arraybuffer",
    //             }
    //           )
    //           .then((res) => {
    //             console.log("Response:", res.data);
    //             const base64 = btoa(
    //               new Uint8Array(res.data).reduce(
    //                 (data, byte) => data + String.fromCharCode(byte),
    //                 ""
    //               )
    //             );
    //             const url = `data:image/jpeg;base64,${base64}`;
    //             setESign((prevSign) => ({
    //               ...prevSign,
    //               [key]: url,
    //             }));
    //           })
    //           .catch((err) => {
    //             console.log("Error in fetching image:", err);
    //           });
    //       }
    //     });
    //   }, [token, printData.chemist_sign,printData.qa_exe_sign,printData.manager_sign]);
    // --------------------------- Summary Get Api ------------------------------
    useEffect(() => {
        if (!initialized.current) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${   API.prodUrl}/Precot/api/qc/CleaningOfAutoclavesF023/GetAll`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setSummaryData(response.data)
                }
                catch (error) {
                    message.error(error.response.data.message)
                }
            };

            fetchData();
        }

    },[token,navigate]);

    useEffect(() => {
        const findReason = () => {
            for (const data of summaryData) {
                if (data.qa_exe_status == "QA_EXE_REJECTED" || data.manager_status == "QC_REJECTED" || data.manager_status == "QA_REJECTED") {
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
            title: "Microbiologist Status",
            dataIndex: "microbiologist_status",
            key: "microbiologist_status",
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
            ...baseColumns.slice(0, 3),
            reason,
            ...baseColumns.slice(3),
        ];
    } 
    else{
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

    const handleOk = () => {

               if(formParams.date == ''){
                message.warning('Please Select Date')
                return;
            }
            navigate(`/Precot/QualityControl/F-023`, {
                state: {
                    date :formParams.date,
                }
            });
        
    }
    const handleEdit = (record) => {

        navigate(`/Precot/QualityControl/F-023`, {
            state: {
                date :record.date,
            }
        });
    };

    const handleFormParams = (value , name) => {
        setFormParams(prevState => ({
            ...prevState,
            [name] : value
        }))
        if( name == 'week'){
            const { startOfWeek, endOfWeek } = getStartAndEndDateFromWeek(value);
            setDateRange({ startOfWeek, endOfWeek });
        }
    }
    const handlePrintParams = (value , name) => {
        setPrintParams(prevState => ({
            ...prevState,
            [name] : value
        }))
        if( name == 'week'){
            setPrintParams(prevState =>({
                ...prevState,
                date : ''
            }))
            if(value == ""){
                return;
            }
            const { startOfWeek, endOfWeek } = getStartAndEndDateFromWeek(value);
            setDateRange2({ startOfWeek, endOfWeek });
        }
    }
    const handlePrint = async () => {
        if(printParams.week == "" && printParams.date == ""){
            message.warning('Please Select Atleast One Field')
            return;
        }
        setPrintButtonLoading(true);
        try {
            const response = await axios.get(
                `${   API.prodUrl}/Precot/api/qc/CleaningOfAutoclavesF023/PrintForF028?date=${printParams.date}&week=${printParams.week}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data == 'No data found for the provided parameters') {
                message.warning('No Data Available To Print');
                setPrintButtonLoading(false);
                return;
            }


            setPrintData(response.data);

        } catch (error) {
            console.log(" error blocks")
            setPrintButtonLoading(false);
            message.error(error.response.data.message);
        }
        
    }
    useEffect (() => {
        console.log(eSign)
    },[eSign])
    useEffect(() => {
        if (printData.length > 0) {
            setTimeout(() => {
                window.print();
                setPrintButtonLoading(false);
            },[2000])
        }
    },[printData])
    useEffect (() => {
        console.log('Print Data',printData)
    },[printData])

    const handlePrintCancel = () => {
        setPrintParams(prevState => ({
            ...prevState,
            date :'',
            week:'',
            serlzDate:''
        }))
        setPrintButtonLoading(false);
        setIsModalPrint(false);
    };
    const handleClave = (e) => {
        setAutoClave(e)
        setFormParams({
            date :'',
            week:'',
            serlzDate: ''
            
        })
    }
    const claveOptions = [
        {value:'Discarding Autoclave',label:'Discarding Autoclave'},
        {value:'Sterilization Autoclave',label:'Sterilization Autoclave'},
    ]

    const formatDateAndTime = (dateString) => {
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
              <div id='section-to-print'>
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
                {printData.length <= 3 && (
                <div className="page-break">
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td rowSpan={4}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={logo} alt="Logo" style={{ width: '80px', height: 'auto', textAlign: 'center' }} />
                                        <br></br>
                                        <br></br>

                                        <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                                    </div>
                                </td>

                                <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "60%" }} rowSpan={4}>CLEANING OF AUTOCLAVES</td>
                                <td style={{ padding: '0.5em' }}>Format No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-QCL01/F-023</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Revision No.:</td>
                                <td style={{ padding: '0.5em' }}>01</td>

                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Ref. SOP No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-QCL01-D-05</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Page No.:</td>
                                <td style={{ padding: '0.5em' }}>01 of 01</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'15px'}}></td>
                            </tr>

                        </table>
                        <table style={{width:'100%'}}>
                            <tr>
                                <td style={{textAlign:'left'}} colSpan={2}>Autoclave: Discarding Autoclave</td>
                                <td style={{textAlign:'left'}} colSpan={1}>EQ. ID.No.:PH-E/I-LAB07</td>
                                <td style={{textAlign:'left'}} colSpan={1}>Frequency: : Once in a day,</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center',width:'50px'}}>S. No.</td>
                                <td style={{textAlign:'center'}}>Date</td>
                                <td style={{textAlign:'center'}}>Cleaned By</td>
                                <td style={{textAlign:'center'}}>Verified By</td>
                            </tr>
                            {printData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td style={{textAlign:'center'}}>{rowIndex + 1}</td>
                                <td style={{textAlign:'center'}}>{formatDate(row.date)}</td>
                                <td style={{textAlign:'center'}}>{row.lab7Details?.PH_E_I_LAB07?.cleanedBy}</td>
                                <td style={{textAlign:'center'}}>
                                {eSign[row.microbiologist_sign]? (
                                    <img
                                        src={eSign[row.microbiologist_sign]}
                                        alt="Operator eSign"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "contain",
                                            mixBlendMode: "multiply",
                                        }}

                                    />) : null}<br></br>{row.microbiologist_sign}<br></br>{formatDateAndTime(row.microbiologist_submit_on)}
                                </td>
                            </tr>
                            ))}

                        </table>
                        
                        <table style={{width:'100%'}}>
                            <tr>
                                <td style={{padding:'10px',border:"none"}}></td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'left'}} colSpan={2}>Autoclave:Sterilization Autoclave</td>
                                <td style={{textAlign:'left'}} colSpan={1}>EQ. ID.No.: PH-E/I-LAB03</td>
                                <td style={{textAlign:'left'}} colSpan={1}>Frequency: min. twice in a week.</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center',width:'50px'}}>S. No.</td>
                                <td style={{textAlign:'center'}}>Date</td>
                                <td style={{textAlign:'center'}}>Cleaned By</td>
                                <td style={{textAlign:'center'}}>Verified By</td>
                            </tr>
                            {printData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td style={{textAlign:'center'}}>{rowIndex + 1}</td>
                                <td style={{textAlign:'center'}}>{formatDate(row.date)}</td>
                                <td style={{textAlign:'center'}}>{row.lab3Details?.PH_E_I_LAB03?.cleanedBy}</td>
                                <td style={{textAlign:'center'}}>
                                {eSign[row.microbiologist_sign]? (
                                    <img
                                        src={eSign[row.microbiologist_sign]}
                                        alt="Operator eSign"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "contain",
                                            mixBlendMode: "multiply",
                                        }}

                                    />) : null}<br></br>{row.microbiologist_sign}<br></br>{formatDateAndTime(row.microbiologist_submit_on)}


                                </td>
                            </tr>
                            ))}
                        </table>
                        <table>
                        
                        <thead>
                            <tr>
                                <td style={{border:"none",padding:'15px'}}></td>
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
        )}
        {printData.length > 3 && (
            <>
                            <div className="page-break">
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                          <tr>
                                            <td style={{border:"none",padding:'10px'}}></td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={4}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <img src={logo} alt="Logo" style={{ width: '80px', height: 'auto', textAlign: 'center' }} />
                                                    <br></br>
                                                    <br></br>
            
                                                    <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                                                </div>
                                            </td>
            
                                            <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "60%" }} rowSpan={4}>CLEANING OF AUTOCLAVES</td>
                                            <td style={{ padding: '0.5em' }}>Format No.:</td>
                                            <td style={{ padding: '0.5em' }}>PH-QCL01/F-023</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '0.5em' }}>Revision No.:</td>
                                            <td style={{ padding: '0.5em' }}>01</td>
            
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '0.5em' }}>Ref. SOP No.:</td>
                                            <td style={{ padding: '0.5em' }}>PH-QCL01-D-05</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '0.5em' }}>Page No.:</td>
                                            <td style={{ padding: '0.5em' }}>01 of 02</td>
                                        </tr>
                                        <tr>
                                            <td style={{border:"none",padding:'15px'}}></td>
                                        </tr>
            
                                    </table>
                                    <table style={{width:'100%'}}>
                                        <tr>
                                            <td style={{textAlign:'left'}} colSpan={2}>Autoclave: Discarding Autoclave</td>
                                            <td style={{textAlign:'left',}} colSpan={1}>EQ. ID.No.:PH-E/I-LAB07</td>
                                            <td style={{textAlign:'left',}} colSpan={1}>Frequency: : Once in a day,</td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:'center',width:'50px'}}>S. No.</td>
                                            <td style={{textAlign:'center'}}>Date</td>
                                            <td style={{textAlign:'center'}}>Cleaned By</td>
                                            <td style={{textAlign:'center'}}>Verified By</td>
                                        </tr>
                                        {printData.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td style={{textAlign:'center'}}>{rowIndex + 1}</td>
                                            <td style={{textAlign:'center'}}>{formatDate(row.date)}</td>
                                            <td style={{textAlign:'center'}}>{row.lab7Details?.PH_E_I_LAB07?.cleanedBy}</td>
                                            <td style={{textAlign:'center'}}>
                                            {eSign[row.microbiologist_sign]? (
                                                <img
                                                    src={eSign[row.microbiologist_sign]}
                                                    alt="Operator eSign"
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                        mixBlendMode: "multiply",
                                                    }}
            
                                                />) : null}<br></br>{row.microbiologist_sign}<br></br>{formatDateAndTime(row.microbiologist_submit_on)}
                                            </td>
                                        </tr>
                                        ))}
            
                                    </table>
                                    
                                    <table>
                                    
                                    <thead>
                                        <tr>
                                            <td style={{border:"none",padding:'15px'}}></td>
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
                                                                        <td style={{border:"none",padding:'30px'}}></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td rowSpan={4}>
                                                                            <div style={{ textAlign: 'center' }}>
                                                                                <img src={logo} alt="Logo" style={{ width: '80px', height: 'auto', textAlign: 'center' }} />
                                                                                <br></br>
                                                                                <br></br>
                                        
                                                                                <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                                                                            </div>
                                                                        </td>
                                        
                                                                        <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "60%" }} rowSpan={4}>CLEANING OF AUTOCLAVES</td>
                                                                        <td style={{ padding: '0.5em' }}>Format No.:</td>
                                                                        <td style={{ padding: '0.5em' }}>PH-QCL01/F-023</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ padding: '0.5em' }}>Revision No.:</td>
                                                                        <td style={{ padding: '0.5em' }}>01</td>
                                        
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ padding: '0.5em' }}>Ref. SOP No.:</td>
                                                                        <td style={{ padding: '0.5em' }}>PH-QCL01-D-05</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ padding: '0.5em' }}>Page No.:</td>
                                                                        <td style={{ padding: '0.5em' }}>02 of 02</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{border:"none",padding:'15px'}}></td>
                                                                    </tr>
                                        
                                                                </table>
                                                                <table style={{width:'100%'}}>
                            <tr>
                                <td style={{padding:'10px',border:"none"}}></td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'left'}} colSpan={2}>Autoclave:Sterilization Autoclave</td>
                                <td style={{textAlign:'left'}} colSpan={1}>EQ. ID.No.: PH-E/I-LAB03</td>            
                                <td style={{textAlign:'left'}} colSpan={1}>Frequency: min. twice in a week.</td>            
                            </tr>
                            <tr>
                                <td style={{textAlign:'center',width:'50px'}}>S. No.</td>
                                <td style={{textAlign:'center'}}>Date</td>
                                <td style={{textAlign:'center'}}>Cleaned By</td>
                                <td style={{textAlign:'center'}}>Verified By</td>
                            </tr>
                            {printData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td style={{textAlign:'center'}}>{rowIndex + 1}</td>
                                <td style={{textAlign:'center'}}>{formatDate(row.date)}</td>
                                <td style={{textAlign:'center'}}>{row.lab3Details?.PH_E_I_LAB03?.cleanedBy}</td>
                                <td style={{textAlign:'center'}}>
                                {eSign[row.microbiologist_sign]? (
                                    <img
                                        src={eSign[row.microbiologist_sign]}
                                        alt="Operator eSign"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "contain",
                                            mixBlendMode: "multiply",
                                        }}

                                    />) : null}<br></br>{row.microbiologist_sign}<br></br>{formatDateAndTime(row.microbiologist_submit_on)}


                                </td>
                            </tr>
                            ))}
                        </table>
                                                                
                                                                <table>
                                                                
                                                                <thead>
                                                                    <tr>
                                                                        <td style={{border:"none",padding:'15px'}}></td>
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
                                                        </>

        )}
    </div>
        <BleachingHeader
                formName={"CLEANING OF AUTOCLAVES"}
                formatNo={"PH-QCL01/F-023"}
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
            <Modal title="CLEANING OF AUTOCLAVES (Print)" open={isModalPrint} onCancel={handlePrintCancel} width={380} destroyOnClose={true}
                footer={[
                    <Button key="cancel" onClick={handlePrintCancel} >
                        Cancel
                    </Button>,
                    <Button key="reject" type="primary" onClick={handlePrint} loading={printButtonLoading}>
                        OK
                    </Button>,
                ]}>
            <label> Week :<span style={{marginLeft:'40px'}}></span> </label>
            <Input type="week" style={{textAlign:'center',width:'150px'}} value={printParams.week}  onChange={(e) => {handlePrintParams(e.target.value,'week')}} max={maxWeek}></Input><br/><br/>
            <label> Date :<span style={{marginLeft:'46px'}}></span> </label>
            <Input type = "date" min={printParams.week !== "" ? dateRange2.startOfWeek : ''} value={printParams.date}   max={printParams.week !== "" 
    ? (dateRange2.endOfWeek > today ? today : dateRange2.endOfWeek) 
    : today}  style={{width:'150px',textAlign:'center'}} onChange={(e) => {handlePrintParams(e.target.value,'date')}}  ></Input>
            </Modal>
        <div style={{margin:'20px'}}>
        <Input type="date" max={today} style={{textAlign:'center',width:'150px',marginLeft:'5px'}} value={formParams.date} addonBefore='Date : ' onChange={(e) => {handleFormParams(e.target.value,'date')}}></Input>

        <Button
                type="primary"
                style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    marginLeft:'70px'
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

export default QualityControl_f23_Summary;