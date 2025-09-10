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
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f15_Summary = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [isModalPrint, setIsModalPrint] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [reason, setReason] = useState(false);
    const [formParams,setFormParams] = useState ({
        year : '',
        month:'',
        eqId:''
    })
    const [printParams, setPrintParams] = useState({
        year : '',
        month:'',
        eqId:''
    });
    const [eSign, setESign] = useState({});
    const token = localStorage.getItem("token");
    const [printButtonLoading, setPrintButtonLoading] = useState(false);
    const [printData, setPrintData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const [yearLov,setYearLov] = useState([])
    const [monthLov,setMonthLov] = useState([])
    const [monthLovForPrint,setMonthLovForPrint] = useState([])
    const initialized = useRef(false);
    // ------------ For Form Lov -----------------------

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 2000;
        let years = []
        for (let year = currentYear; year >= startYear; year--) {
          years.push({ value: year, label: year.toString() });
        }
        const currentMonth = new Date().getMonth() + 1;
        const allMonths = [
          { value: '01', label: 'JAN' },
          { value: '02', label: 'FEB' },
          { value: '03', label: 'MAR' },
          { value: '04', label: 'APR' },
          { value: '05', label: 'MAY' },
          { value: '06', label: 'JUN' },
          { value: '07', label: 'JUL' },
          { value: '08', label: 'AUG' },
          { value: '09', label: 'SEP' },
          { value: '10', label: 'OCT' },
          { value: '11', label: 'NOV' },
          { value: '12', label: 'DEC' },
        ];
    
        const filteredMonthBasedOnYear = allMonths.filter((month) => parseInt(month.value) <= currentMonth);
        const months = (formParams.year == currentYear) ? filteredMonthBasedOnYear : allMonths
        const monthsForPrint = (printParams.year == currentYear) ? filteredMonthBasedOnYear : allMonths
        
        setMonthLov(months);
        setMonthLovForPrint(monthsForPrint)


        
        setYearLov(years);
      }, [formParams.year,formParams.month,printParams.year,printParams.month]);

    const eqIdLov = [
        {label:'PH-E/I-LAB03',value :'PH-E/I-LAB03'},
        {label:'PH-E/I-LAB07',value :'PH-E/I-LAB07'},
    ]
    

    // --------------------------------------------------

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

    useEffect(() => {
        const token = localStorage.getItem("token");
        const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
        signatureKeys.forEach((key) => {
            const username = printData[key];
            if (username) {
                console.log("usernameparams", username);

                axios
                    .get(
                        `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
            initialized.current = true;
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${   API.prodUrl}/Precot/api/chemicaltest/CLF015/getAll`,
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
                if (data.qc_status == "QC_REJECTED" || data.qc_status == "QA_REJECTED") {
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
            title: "Year",
            dataIndex: "year",
            key: "year",
            align: "center",
        },
        {
            title: "Month",
            dataIndex: "month",
            key: "month",
            align: "center",
            render: (text) => getMonth(text)
        },
        {
            title: "Eq Id",
            dataIndex: "eq_id",
            key: "eq_id",
            align: "center",
        },
        {
            title: "Microbiologist Status",
            dataIndex: "micro_status",
            key: "micro_status",
            align: "center",
        },
        {
            title: "Manager Status",
            dataIndex: "qc_status",
            key: "qc_status",
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
            ...baseColumns.slice(0, 6),
            Reason,
            ...baseColumns.slice(6),
        ];
    } else {
        columns = baseColumns;
    }
    const getMonth = (selectedMonth) => {

        switch(selectedMonth) {
            case '01':
                return 'JAN' ; 
              case '02':
                return 'FEB' ; 
              case '03':
                return 'MAR' ; 
              case '04':
                return 'APR' ; 
              case '05':
                return 'MAY' ; 
              case '06':
                return 'JUN' ; 
              case '07':
                return 'JULY' ; 
              case '08':
                return 'AUG' ; 
              case '09':
                return 'SEP' ; 
              case '10':
                return 'OCT' ; 
              case '11':
                return 'NOV' ; 
              case '12':
                return 'DEC' ; 
        }

    }
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
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
    const handleOk = () => {

        if(formParams.year == ''){
         message.warning('Please Select Year')
         return;
        }
        if(formParams.month == ''){
            message.warning("Please Select Month")
            return;
        }
        if(formParams.eqId == "") {
            message.warning("Please Select Eq Id")
            return;
        }
     navigate(`/Precot/QualityControl/F-015`, {
         state: {
             year :formParams.year,
             month : formParams.month,
             eqId : formParams.eqId
         }
     });
 
}
    const handleEdit = (record) => {

        navigate(`/Precot/QualityControl/F-015`, {
            state: {
                year :record.year,
                month : record.month,
                eqId : record.eq_id
            }
        });
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
                    .page-break {
                page-break-after: always;
            }
}
`;

    const handleSelect = (e,name) => {
        setFormParams(prevState => ({
            ...prevState,
            [name] : e
        }))
        if(name == 'year'){
            setFormParams(prevState => ({
                ...prevState,
                month : ""
            }))
        }
    }
    const handlePrint = async () => {

        if(printParams.year == "" && printParams.month == "" && printParams.eqId == "" ){
            message.warning("Please Select Atleast One Field")
            return;
        }
        if(printParams.month !== "" && printParams.year == ""){
            message.warning("Please Select Year")
            return;
        }
        setPrintButtonLoading(true);
        try {
            const response = await axios.get(
                `${   API.prodUrl}/Precot/api/chemicaltest/CLF015/print?year=${printParams.year}&month=${printParams.month}&eqid=${printParams.eqId}`,
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


            setPrintData(response.data);

        } catch (error) {
            console.log(" error blocks")
            setPrintButtonLoading(false);
            message.error(error.response.data.message);
        }
        
    }

    useEffect(() => {
        if (printData.length > 0) {
            setTimeout(() => {
                window.print();
                setPrintButtonLoading(false);
            },[3000])
        }
    },[printData])

    const handlePrintCancel = () => {
        setPrintParams(prevState => ({
            ...prevState,
            year : '',
            month:'',
            eqId:''
        }))
        setPrintButtonLoading(false);
        setIsModalPrint(false);
    };

    const handlePrintParams = (value,name) => {
        setPrintParams(prevState => ({
            ...prevState,
            [name] : value
        }))
        if(name == 'year'){
            setPrintParams(prevState => ({
                ...prevState,
                month : ""
            }))
        }
    }

    return (
        <>
              <div id='section-to-print'>
              <GlobalStyle />
              {printData.length > 0 && (
                <>
            {printData?.map((row, rowIndex) => (
                <div className="page-break">
                <div className="page-break" key={rowIndex}>
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

                                <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "60%" }} rowSpan={4}>VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR</td>
                                <td style={{ padding: '0.5em' }}>Format No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-QCL01/F-015</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Revision No.:</td>
                                <td style={{ padding: '0.5em' }}>01</td>

                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Ref. SOP No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-QCL01-D-03</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Page No.:</td>
                                <td style={{ padding: '0.5em' }}>01 of 02</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'15px'}}></td>
                            </tr>

                        </table>

                        <table style={{tableLayout:'fixed'}}>
                            <tr>
                                <td colSpan={2}>Frequency: Monthly</td>
                                <td>EQ. ID No: {row.eq_id}  </td>
                                <td>Date: {formatDate(row.date)}    </td>
                            </tr>
                            <tr>
                                <td>Biological indicator (Geo bacillus Stearothermophilus )</td>
                                <td style={{textAlign:'center'}}>Ampoule ( As such: un-steriled)</td>
                                <td style={{textAlign:'center'}}>Ampoule used for Sterilization Autoclave</td>
                                <td style={{textAlign:'center'}}>Ampoule used for Discarding Autoclave</td>
                            </tr>
                            <tr>
                                <td>Expiry date </td>
                                <td style={{textAlign:'center'}}>{formatDate(row.expiry_date)}</td>
                                <td style={{textAlign:'center'}}>{formatDate(row.amploe_sterilization_a)}</td>
                                <td style={{textAlign:'center'}}>{formatDate(row.amploe_discrad_a)}</td>
                            </tr>
                            <tr>
                                <td>Biological indicator Lot No.</td>
                                <td style={{textAlign:'center'}}>{row.lot_no}</td>
                                <td style={{textAlign:'center'}}>{row.amploe_sterilization_b}</td>
                                <td style={{textAlign:'center'}}>{row.amploe_discrad_b}</td>
                            </tr>
                            <tr>
                                <td>Load No.</td>
                                <td style={{textAlign:'center'}}>Not applicable</td>
                                <td style={{textAlign:'center'}}>{row.amploe_sterilization_c}</td>
                                <td style={{textAlign:'center'}}>{row.amploe_discrad_c}</td>
                            </tr>
                            <tr>
                                <td>Type of load </td>
                                <td style={{textAlign:'center'}}>Not applicable</td>
                                <td style={{textAlign:'center'}}>{row.amploe_sterilization_d}</td>
                                <td style={{textAlign:'center'}}>{row.amploe_discrad_d}</td>
                            </tr>
                            <tr>
                                <td>Cycle temperature & Time </td>
                                <td style={{textAlign:'center'}}>Not Autoclaved</td>
                                <td style={{textAlign:'center'}}>121℃ @ 20min </td>
                                <td style={{textAlign:'center'}}>121℃ @ 20min</td>
                            </tr>
                            <tr>
                                <td>Incubation  temperature & Time</td>
                                <td style={{textAlign:'center'}}>55 to 60 °C & 48 Hrs.</td>
                                <td style={{textAlign:'center'}}>55 to 60 °C & 48 Hrs.</td>
                                <td style={{textAlign:'center'}}>55 to 60 °C & 48 Hrs.</td>
                            </tr>
                            <tr>
                                <td>Observation</td>
                                <td style={{textAlign:'center'}}>{row.load_no}</td>
                                <td style={{textAlign:'center'}}>{row.amploe_sterilization_obs}</td>
                                <td style={{textAlign:'center'}}>{row.amploe_discrad_obs}</td>
                            </tr>
                            <tr>
                                <td>Result</td>
                                <td style={{textAlign:'center'}}>{row.result}</td>
                                <td style={{textAlign:'center'}}>{row.amploe_sterilization_result}</td>
                                <td style={{textAlign:'center'}}>{row.amploe_discrad_result}</td>
                            </tr>
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
                <div className="page-break" key={rowIndex}>
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

                                <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "60%" }} rowSpan={4}>VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR</td>
                                <td style={{ padding: '0.5em' }}>Format No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-QCL01/F-015</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Revision No.:</td>
                                <td style={{ padding: '0.5em' }}>01</td>

                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Ref. SOP No.:</td>
                                <td style={{ padding: '0.5em' }}>PH-QCL01-D-03</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5em' }}>Page No.:</td>
                                <td style={{ padding: '0.5em' }}>02 of 02</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'15px'}}></td>
                            </tr>

                        </table>
                        <table>
                        <tr>
                                <td>Remarks</td>
                                <td style={{textAlign:'center'}} colSpan={3}>{row.remarks}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>Note:<br></br>Pass =sterilized (medium remained purple )<br></br>Fail = not sterilized ( medium turned yellow & cell grew )</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center',borderBottom:'none'}} colSpan={2}>Checked By :</td>
                                <td style={{textAlign:'center',borderBottom:'none'}} colSpan={2}>Verified By : </td>
                            </tr>
                            <tr>
                                <td style={{borderTop:"none",textAlign:'center',}} colSpan={2}>
                                {eSign[row.micro_sign]? (
                                    <img
                                        src={eSign[row.micro_sign]}
                                        alt="Operator eSign"
                                        style={{
                                            width: "100px",
                                            height: "80px",
                                            objectFit: "contain",
                                            mixBlendMode: "multiply",
                                        }}

                                    />) : null}<br></br>{row.micro_sign}<br></br>{formatDateAndTime(row.micro_submit_on)}
                                     </td>
                                <td style={{borderTop:"none",textAlign:'center',}} colSpan={2}> 

                                {eSign[row.qc_sign]? (
                                    <img
                                        src={eSign[row.qc_sign]}
                                        alt="Operator eSign"
                                        style={{
                                            width: "100px",
                                            height: "80px",
                                            objectFit: "contain",
                                            mixBlendMode: "multiply",
                                        }}

                                    />) : null}<br></br>{row.qc_sign}<br></br>{formatDateAndTime(row.qc_submit_on)}
                                </td>
                            </tr>


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
                </div>
                    ))}
                    </>
                    )}

        </div>
        <BleachingHeader
                formName={"VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR"}
                formatNo={"PH-QCL01/F-015"}
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
            <Modal title="VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR (Print)" open={isModalPrint} onCancel={handlePrintCancel} width={380} destroyOnClose={true}
                footer={[
                    <Button key="cancel" onClick={handlePrintCancel} >
                        Cancel
                    </Button>,
                    <Button key="reject" type="primary" onClick={handlePrint} loading={printButtonLoading}>
                        OK
                    </Button>,
                ]}>
                <span style={{marginRight:'20px'}}>Year : &nbsp;&nbsp; </span> <Select value={printParams.year} options={yearLov}  onChange={(e) => {handlePrintParams(e,'year')}} style={{textAlign:'center',width:'200px'}} dropdownStyle={{textAlign:'center'}}></Select> <br/><br/>
                <span style={{marginRight:'20px'}}>Month : </span> <Select value={printParams.month} options={monthLovForPrint} onChange={(e) => {handlePrintParams(e,'month')}}  style={{textAlign:'center',width:'200px'}} dropdownStyle={{textAlign:'center'}}></Select> <br/><br/>
                <span style={{marginRight:'20px'}}>Eq ID : &nbsp; </span> <Select value={printParams.eqId} options={eqIdLov} onChange={(e) => {handlePrintParams(e,'eqId')}}  style={{textAlign:'center',width:'200px'}} dropdownStyle={{textAlign:'center'}}></Select> 
            </Modal>
        <div style={{margin:'5px'}}>
            <span>Year : </span> <Select value={formParams.year} options={yearLov}  onChange={(e) => {handleSelect(e,'year')}} style={{textAlign:'center',width:'150px'}} dropdownStyle={{textAlign:'center'}}></Select> 
            <span style={{marginLeft:'5px'}}>Month : </span> <Select value={formParams.month} options={monthLov} onChange={(e) => {handleSelect(e,'month')}}  style={{textAlign:'center',width:'150px'}} dropdownStyle={{textAlign:'center'}}></Select>  
            <span style={{marginLeft:'5px'}}>Eq ID : </span> <Select value={formParams.eqId} options={eqIdLov} onChange={(e) => {handleSelect(e,'eqId')}}  style={{textAlign:'center',width:'150px'}} dropdownStyle={{textAlign:'center'}}></Select> 
            <Button
                type="primary"
                style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    marginLeft:'10px'
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

export default QualityControl_f15_Summary;