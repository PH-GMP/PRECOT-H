/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { IoSave, IoPrint } from 'react-icons/io5';
import { BiLock } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { Space, Table, Tag, Button, Print, Tooltip, Tabs, message, Radio } from 'antd';
import { Modal, DatePicker, Select, Input, Form, Col, Drawer, Row, Menu, Avatar } from "antd";
import BleachingHeader from '../Components/BleachingHeader';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useDebugValue } from 'react';
import BleachingPrintHeader from '../Components/BleachingPrintHeader';
import BleachingTail from '../Components/BleachingTail';
import { IoCreate } from 'react-icons/io5';
import axios from 'axios';
import { GrDocumentStore } from "react-icons/gr";
import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import API from "../baseUrl.json";
import '../Bleaching/style.css';
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { GoArrowLeft } from 'react-icons/go';
import PrecotSidebar from "../Components/PrecotSidebar.js";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const Metal_detector_checklist = () => {
    const navigate = useNavigate();
    const formName = "Argus Metal Detector - Check List";
    const [formatNo, setFormatNo] = useState("");
    const revisionNo = "02";
    const sopNo = "PRD01-D-10";
    const [rejectModal, setRejectModal] = useState(false);
    const [tab1Condition, setTab1Condition] = useState({
        yesCheck1: false,
        yesCheck2: false,
        noCheck1: false,
        noCheck2: false
    })
    const [tab2Condition, setTab2Condition] = useState({
        yesCheck1: false,
        yesCheck2: false,
        noCheck1: false,
        noCheck2: false
    })
    const [eSign, setESign] = useState({
        operator_sign: '',
        supervisor_sign: '',
        hod_sign: ''
    })
    const [statusLoader, setStatusLoader] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const role = localStorage.getItem('role');
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const { initialValues } = location.state || {};
    // console.log("Intial value in main", initialValues.date)
    const { TextArea } = Input;
    const [status, setStatus] = useState({
        saveStatus: false, submitStatus: false, fieldStatus: false
    });
    const initialized = useRef(false)
    // const [recentPrintData, setRecentPrintData]= useState(false);
    //----------- state for code reuse table --------------------
    const [formFields, setFormFields] = useState({
        formNo: "PH-PRD02/F-019",
        sectionAndEquipmentFields: false,
        entryColsSpan: 1,
        cleaningColspan: 1,
        serialOneSpan: 1,
        machineCleaningRowSpan: 1,
        ccpSection: false,
        serialTwoSpan: 1,
        metalRowpan: 1,
        noOfMetalColSpan: 1,
        signColSpan: 1,
        issueFoundColSpan: 2,
        remarkText: "",
        calibrationCheck: 1

    });

    console.log('date in inital values ', initialValues.date);
    const [formData, setFormData] = useState({
        "formatName": "Argus Metal Detector - Check List",
        "formatNo": "PH-PRD02/F-019",
        "revisionNo": 5,
        "refSopNo": "PRD01-D-10",
        "unit": "H",
        // "section": initialValues.selectSection,
        "equipmentName": "Argus Metal Detector",
        "frequency": "daily",
        "remarks": "",
        "date": initialValues.date,
        // "date": "08/06/2024",
        "metalContaminatedMaterials": "",
        "metalContaminatedMaterials4B": "",
        "noOfMetalContaminants": "",
        "noOfMetalContaminants4B": "",
        "functionCheck": "",
        "functionCheckCu": "",
        "supervisor_status": "",
        "cleanedBy": '',
        "reason": ''
    });

    const formNumber = initialValues.formNumber;
    // console.log("formNUmber", formNumber)
    useEffect(() => {
        if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
            setStatus(prevStatus => ({
                ...prevStatus,
                fieldStatus: true
            }))
        }
    }, [role])
    useEffect(() => {
        switch (formNumber) {
            case "PH-PRD02/F-019":
                // console.log("case entered")
                setFormatNo("PH-PRD02/F-019")
                setFormFields(prevState => ({
                    ...prevState,
                    formNo: "PH-PRD02/F-019",
                    sectionAndEquipmentFields: true,
                    entryColsSpan: 1,
                    cleaningColspan: 3,
                    serialOneSpan: 1,
                    machineCleaningRowSpan: 1,
                    ccpSection: false,
                    serialTwoSpan: 1,
                    metalRowpan: 1,
                    noOfMetalColSpan: 1,
                    signColSpan: 1,
                    issueFoundColSpan: 2,
                    calibrationCheck: 1,
                    remarkText: "Reviewed by Head of the Department or Designee"
                }));
                break;
            case "PH-PRD02/F-020":
                setFormatNo("PH-PRD02/F-020")
                setFormFields(prevState => ({
                    ...prevState,
                    formNo: "PH-PRD02/F-020",
                    sectionAndEquipmentFields: false,
                    entryColsSpan: 2,
                    cleaningColspan: 4,
                    serialOneSpan: 2,
                    machineCleaningRowSpan: 2,
                    ccpSection: true,
                    serialTwoSpan: 2,
                    metalRowpan: 2,
                    noOfMetalColSpan: 2,
                    signColSpan: 2,
                    issueFoundColSpan: 3,
                    calibrationCheck: 2,
                    remarkText: "Reviewed by HOD/Designee"
                }));
                break;
            default:
                setFormFields(prevState => ({
                    ...prevState,
                    sectionAndEquipmentFields: false
                }));
        }
    }, [formNumber])

    // useEffect(() => {
    //     // console.log("formFields.sectionAndEquipmentFields:", formFields.sectionAndEquipmentFields);
    // }, [formFields]);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const rejectFlow = () => {
        setRejectModal(true);
    }
    const handleCancel = () => {
        setRejectModal(false);
        setFormData(formData => ({
            ...formData,
            reason: ""
        }))
    }
    const handleRejectReason = (e) => {
        const text = e.target.value;
        setFormData(formData => ({
            ...formData,
            reason: text
        }))
    }

    const [printData, setPrintData] = useState([
        {
            remarks: "",
            hod_submit_by: ""
        }
    ]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    // console.log("initialValues", initialValues);
    // Example usage:

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // console.log("")
    }


    const notificationMessage = (messageType, errorMessage) => {
        messageApi.open({
            type: messageType,
            content: errorMessage,
        });
    };

    const handleYesCheckboxChange = (event) => {
        const { name, value } = event.target;
        // console.log("checkBox Check", name)
        if (name == "tab1YesBox1") {
            setTab1Condition(prevState => ({
                ...prevState,
                noCheck1: false,
                yesCheck1: true
            }))
            setFormData({
                ...formData,
                "metalContaminatedMaterials": "yes"
            });
        }
        else if (name == "tab1YesBox2") {
            setTab1Condition(prevState => ({
                ...prevState,
                noCheck2: false,
                yesCheck2: true
            }))
            setFormData({
                ...formData,
                "metalContaminatedMaterials4B": "yes"
            });
        }
    }
    const handleNoCheckboxChange = (e) => {
        const { name, value } = e.target;
        // console.log("checkBox Check", name)
        if (name == "tab1NoBox1") {
            setTab1Condition(prevState => ({
                ...prevState,
                yesCheck1: false,
                noCheck1: true
            }))
            setFormData({
                ...formData,
                "metalContaminatedMaterials": "no"
            });
        }
        else if (name == "tab1NoBox2") {
            setTab1Condition(prevState => ({
                ...prevState,
                yesCheck2: false,
                noCheck2: true
            }))
            setFormData({
                ...formData,
                "metalContaminatedMaterials4B": "no"
            });
        }
    }
    const handleYesCheckboxChange2 = (e) => {
        const { name, value } = e.target;
        // console.log("checkBox Check", name)
        if (name == "tab2YesCheck1") {
            setTab2Condition(prevState => ({
                ...prevState,
                noCheck1: false,
                yesCheck1: true
            }))
            setFormData({
                ...formData,
                "functionCheck": "yes"
            });
        }
        else if (name == "tab2YesCheck2") {
            setTab2Condition(prevState => ({
                ...prevState,
                noCheck2: false,
                yesCheck2: true
            }))
            setFormData(prevState => ({
                ...prevState,
                "functionCheckCu": "yes"
            }))
            // console.log("Form date after no", formData)
        }

    }
    const handleNoCheckboxChange2 = (e) => {
        const { name, value } = e.target;
        // console.log("checkBox Check", name)
        if (name == "tab2NoCheck1") {
            setTab2Condition(prevState => ({
                ...prevState,
                yesCheck1: false,
                noCheck1: true,
            }))
            setFormData({
                ...formData,
                "functionCheck": "no"
            });
        }
        else if (name == "tab2NoCheck2") {
            // console.log("Condition entered")
            setTab2Condition(prevState => ({
                ...prevState,
                noCheck2: true,
                yesCheck2: false
            }))
            setFormData(prevState => ({
                ...prevState,
                "functionCheckCu": "no"
            }))
            // console.log("Form date after no", formData)
        }
    }

    const handleKeyDown = (e) => {

        if (
            ['e', 'E', '+', '.', '-'].includes(e.key) ||
            (e.target.value.length >= 3 && e.key !== 'Backspace')
        ) {
            e.preventDefault();
        }
    };
    const items = [
        {
            key: '1',
            label: 'CLEANING OF EQUIPMENT',
            children:
                <table style={{ marginTop: '25px', borderCollapse: 'collapse', width: '95%' }}>
                    <thead>
                        {formFields.sectionAndEquipmentFields && (
                            <>
                                <tr>
                                    <td className="data-border">
                                        <p>DEPT Name:</p>
                                    </td>
                                    <td colSpan={2} className="data-border">
                                        <p>PAD PUNCHING</p>
                                    </td>
                                </tr>



                                <tr>
                                    <td className="data-border">
                                        <p>Equipment Name:</p>
                                    </td>
                                    <td colSpan={2} className="data-border">
                                        {/* <input type="text" className='table-text-box' name="equipmentName" onChange={handleChange} value={formData.equipmentName}></input> */}
                                        <p name="equipmentName">Argus Metal Detector</p>
                                    </td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <td className="data-border">
                                <p style={{ textAlign: 'center' }}>Sr.No</p>
                            </td>
                            <td className="data-border">
                                <p style={{ textAlign: 'center' }}>Cleaning Area</p>
                            </td>
                            <td className="data-border" colSpan={formFields.entryColsSpan}>
                                <p style={{ textAlign: 'center' }} >Entry</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="data-border" colSpan={formFields.cleaningColspan}>
                                <b>I. CLEANING OF EQUIPMENT</b>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="data-border" rowSpan={formFields.serialOneSpan}>
                                <p style={{ textAlign: 'center' }}>1</p>
                            </td>
                            <td className="data-border" rowSpan={formFields.machineCleaningRowSpan}>
                                <p>Machine Cleaning & Removing Ejected (metal contaminated materials)</p>
                            </td>
                            {formFields.ccpSection && (
                                <td style={{ textAlign: "center" }}>CCP-4A</td>
                            )}

                            <td className="data-border" >
                                <div style={{ display: 'flex', gap: '10px', justifyContent: "center" }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <input
                                            type="checkbox"
                                            name="tab1YesBox1"
                                            value={"yes"}
                                            checked={tab1Condition.yesCheck1}
                                            onChange={handleYesCheckboxChange}

                                            disabled={status.fieldStatus}
                                        >
                                        </input>
                                        <label for="yes"> Yes</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <input type="checkbox"
                                            name="tab1NoBox1"
                                            value="no"
                                            checked={tab1Condition.noCheck1}
                                            onChange={handleNoCheckboxChange}

                                            disabled={status.fieldStatus}

                                        ></input>
                                        <label for="no"> No</label>
                                    </div>

                                </div>


                            </td>
                        </tr>
                        {formFields.ccpSection && (
                            <>
                                <tr>
                                    <td style={{ textAlign: "center" }}>CCP-4B</td>
                                    <td className="data-border" >
                                        <div style={{ display: 'flex', gap: '10px', justifyContent: "center" }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <input
                                                    type="checkbox"
                                                    name="tab1YesBox2"
                                                    value={"yes"}
                                                    checked={tab1Condition.yesCheck2}
                                                    onChange={handleYesCheckboxChange}
                                                    s
                                                    disabled={status.fieldStatus}
                                                >
                                                </input>
                                                <label for="yes"> Yes</label>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <input type="checkbox"
                                                    name="tab1NoBox2"
                                                    value="no"
                                                    checked={tab1Condition.noCheck2}
                                                    onChange={handleNoCheckboxChange}

                                                    disabled={status.fieldStatus}

                                                ></input>
                                                <label for="no"> No</label>
                                            </div>

                                        </div>


                                    </td>
                                </tr>


                            </>
                        )}
                        <tr>
                            <td className="data-border" rowSpan={formFields.serialTwoSpan}>
                                <p style={{ textAlign: 'center' }}>2</p>
                            </td>
                            <td className="data-border" rowSpan={formFields.metalRowpan}>
                                <p>No of Metal contamination found</p>
                            </td>
                            {formFields.ccpSection && (<td style={{ textAlign: "center" }}>CCP-4A</td>)}
                            <td className="data-border" colSpan={formFields.noOfMetalColSpan}>
                                <input type="number"
                                    name='noOfMetalContaminants'
                                    onChange={handleChange}
                                    value={formData.noOfMetalContaminants}
                                    style={{ border: 'none', width: '100%', outline: 'none', textAlign: "center" }}
                                    min={0} max={999}
                                    onKeyDown={handleKeyDown}
                                    readOnly={status.fieldStatus}
                                ></input>
                            </td>
                        </tr>
                        {formFields.ccpSection && (
                            <tr>
                                <td style={{ textAlign: "center" }}>CCP-4B</td>
                                <td className="data-border" colSpan={formFields.noOfMetalColSpan}>
                                    <input type="number"
                                        name='noOfMetalContaminants4B'
                                        onChange={handleChange}
                                        value={formData.noOfMetalContaminants4B}
                                        style={{ border: 'none', width: '100%', outline: 'none', textAlign: "center" }}
                                        min={0} max={999}
                                        onKeyDown={handleKeyDown}
                                        readOnly={status.fieldStatus}

                                    ></input>
                                </td>

                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='data-border-signature' colSpan={2}>
                                <p>Cleaned By:</p>
                            </td>
                            <td className='data-border-signature' colSpan={formFields.signColSpan} >
                                <input type='text' name="cleanedBy" style={{ width: '100%', height: '100%', border: 'none', outline: 'none', textAlign: "center" }} onChange={handleChange} value={formData.cleanedBy} readOnly={status.fieldStatus}></input>

                            </td>
                        </tr>
                    </tfoot>
                </table>,
        },
        {
            key: '2',
            label: 'CALIBRATION CHECK OF EQUIPMENT',
            children: <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <td className='data-border-header'>
                            <p >Sr. No</p>
                        </td>
                        <td className='data-border-header'>
                            <p>Cleaning Area</p>
                        </td>
                        <td className='data-border-header' colSpan={formFields.entryColsSpan}>
                            <p>Entry</p>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='data-border' rowSpan={formFields.calibrationCheck}>
                            <p style={{ textAlign: 'center' }}>1</p>
                        </td>
                        <td className='data-border' rowSpan={formFields.calibrationCheck}>
                            {formFields.formNo == "PH-PRD02/F-019" && (
                                <p>Functioning of Metal Detector / Calibration Check (both detection & ejection) Using Ferrous Size : 1.0 mm</p>)}
                            {formFields.formNo == "PH-PRD02/F-020" && (
                                <p>Functioning of Metal Detector / Calibration Check for CCP-4A & 4B (both detection & ejection)Size : Ferrous 3.0 mm Copper 4 mm</p>)}
                        </td>
                        {formFields.formNo == "PH-PRD02/F-020" && (<td>Using Ferrous (Fe)</td>)}
                        <td className='data-border'>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="checkbox"
                                        name="tab2YesCheck1"
                                        value="yes"
                                        checked={tab2Condition.yesCheck1}
                                        onChange={handleYesCheckboxChange2}
                                        disabled={status.fieldStatus}
                                    >
                                    </input>
                                    <label for="yes"> Yes</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input
                                        type="checkbox"
                                        name="tab2NoCheck1"
                                        value="no"
                                        checked={tab2Condition.noCheck1}
                                        onChange={handleNoCheckboxChange2}
                                        disabled={status.fieldStatus}
                                    >
                                    </input>
                                    <label for="no"> No</label>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        {formFields.formNo == "PH-PRD02/F-020" && (<><td>Using Copper (Cu)</td>
                            <td className='data-border'>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <input type="checkbox"
                                            name="tab2YesCheck2"
                                            value="yes"
                                            checked={tab2Condition.yesCheck2}
                                            onChange={handleYesCheckboxChange2}
                                            disabled={status.fieldStatus}
                                        >
                                        </input>
                                        <label for="yes"> Yes</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <input
                                            type="checkbox"
                                            name="tab2NoCheck2"
                                            value="no"
                                            checked={tab2Condition.noCheck2}
                                            onChange={handleNoCheckboxChange2}
                                            disabled={status.fieldStatus}
                                        >
                                        </input>
                                        <label for="no"> No</label>
                                    </div>
                                </div>
                            </td>
                        </>)}
                    </tr>
                    <tr>
                        <td className='data-border-signature' colSpan={2}>

                            <p>Checked By</p>
                        </td>
                        <td className='data-border' colSpan={formFields.entryColsSpan} style={{ height: "30px", textAlign: "center" }}>

                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ textAlign: "center" }}>
                                        {formData.supervisor_submit_by}
                                        <br />
                                        {formatDate(formData.supervisor_submit_on)}
                                    </div>
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                    {eSign.supervisor_sign ? (
                                        <img
                                            src={eSign.supervisor_sign}
                                            alt="eSign"
                                            style={{
                                                width: "150px",
                                                height: "80px",
                                                objectFit: "contain",
                                                mixBlendMode: "multiply",
                                            }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className='data-border-remarks'>
                            <p>Remarks/Comment<br></br>(in case of any<br></br> abnormality observed) :</p>
                        </td>
                        <td className='data-border-remarks' colSpan={formFields.issueFoundColSpan} style={{ padding: "0px", textAlign:'center' }}>
                            <Input type="text" className='inp-new' onChange={handleChange} name="remarks" value={formData.remarks} readOnly={status.fieldStatus} style={{ width: "500px", height: "100%" , border:'1px solid black' }}></Input>
                        </td>
                    </tr>
                </tfoot>
            </table>,
        },
        {
            key: '3',
            label: 'REVIEW',
            children: <table style={{ borderCollapse: 'collapse', width: "40%" }}>
                <tbody >
                    <td className='data-border-signature' style={{ width: "10%", textAlign: "center" }}>

                        <p >{formFields.remarkText}</p>
                    </td>
                    <td className='data-border-signature' style={{ padding: "50px", width: "10%", textAlign: "center" }}>
                        {formData.hod_status !== "WAITING_FOR_APPROVAL" && (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ textAlign: "center" }}>
                                        {formData.hod_submit_by}
                                        <br />
                                        {formatDate(formData.hod_submit_on)}
                                    </div>
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                    {eSign.hod_sign ? (
                                        <img
                                            src={eSign.hod_sign}
                                            alt="HOD eSign"
                                            style={{
                                                width: "150px",
                                                height: "80px",
                                                objectFit: "contain",
                                                mixBlendMode: "multiply",
                                            }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </td>

                </tbody>
            </table>,
        },
    ];
    const onChange = (key) => {
        // console.log(key);
    };
    // const formName = ""
    // const formatNo = "" 
    // revisionNo, 
    // refSopNo,
    //  pageNo
    const validateFields = () => {

        let errors = {};

        // ---------------- Form 03 (Bleaching) Validation ------------------------------------------
        if (initialValues.formNumber == "PH-PRD02/F-019" && (formData.metalContaminatedMaterials == '' || formData.metalContaminatedMaterials == null)) {
            errors.metalContaminatedMaterials = 'Metal contamination is required';
            notificationMessage('warning', 'Metal contamination is required');
        }
        if (initialValues.formNumber == "PH-PRD02/F-019" && (formData.noOfMetalContaminants == '' || formData.noOfMetalContaminants == null)) {
            errors.noOfMetalContaminants = 'Number of Metal contaminants is required';
            notificationMessage('warning', ' Number of Metal contaminants is required');
        }
        if (initialValues.formNumber == "PH-PRD02/F-019" && (formData.functionCheck == '' || formData.functionCheck == null)) {
            errors.functionCheck = 'Function check  is required';
            notificationMessage('warning', 'Function check is required')
        }
        //-------------------------------------------------------------------------

        // ------------------ Form 20 (Spunlace) Validation ------------------------------
        if (initialValues.formNumber == "PH-PRD02/F-020" && (formData.metalContaminatedMaterials == '' || formData.metalContaminatedMaterials == null)) {
            errors.metalContaminatedMaterials = 'Metal contamination CCP - 4A is required';
            notificationMessage('warning', 'Metal contamination CCP - 4A is required');
        }
        if (initialValues.formNumber == "PH-PRD02/F-020" && (formData.metalContaminatedMaterials4B == '' || formData.metalContaminatedMaterials4B == null)) {
            errors.metalContaminatedMaterials4B = 'Metal contamination CCP - 4B is required';
            notificationMessage('warning', 'Metal contamination CCP - 4B is required');
        }
        if (initialValues.formNumber == "PH-PRD02/F-020" && (formData.noOfMetalContaminants == '' || formData.noOfMetalContaminants == null)) {
            errors.noOfMetalContaminants = 'Number of Metal contaminants CCP - 4A is required';
            notificationMessage('warning', ' Number of Metal contaminants CCP - 4A is required');
        }
        if (initialValues.formNumber == "PH-PRD02/F-020" && (formData.noOfMetalContaminants4B == '' || formData.noOfMetalContaminants4B == null)) {
            errors.noOfMetalContaminants4B = 'Number of Metal contaminants CCP - 4B is required';
            notificationMessage('warning', ' Number of Metal contaminants CCP - 4B is required');
        }
        if (initialValues.formNumber == "PH-PRD02/F-020" && (formData.functionCheck == '' || formData.functionCheck == null)) {
            errors.functionCheck = 'Function check  Fe field is required';
            notificationMessage('warning', 'Function check  Fe field is required')
        }
        if (initialValues.formNumber == "PH-PRD02/F-020" && (formData.functionCheckCu == '' || formData.functionCheckCu == null)) {
            errors.functionCheckCu = 'Function check  Cu field is required';
            notificationMessage('warning', 'Function check  Cu field is required')
        }
        return errors;
    };

    const handleBack = () => {
        // console.log("form number", initialValues.formNumber)
        let routePath = ''
        switch (initialValues.formNumber) {
            case "PH-PRD02/F-020":
                routePath = '/Precot/Spunlace/F-20/Summary';
                break;
            case "PH-PRD02/F-019":
                routePath = '/Precot/PadPunching/F-17/Summary';
                break;
        }
        navigate(routePath, {
            state: {
                formNo: initialValues.formNumber,
            }
        });
    }

    const handleSave = () => {
        setStatusLoader(true);
        const accessToken = localStorage.getItem('token');
        let apiurl, payload, successMsg;
        if (role == "ROLE_SUPERVISOR") {
            successMsg = 'Data Saved Successfully'
            console.log("formdata in handleSave", formData.date)
            console.log("==========================")
            console.log(formData);
            console.log("==========================")
            payload = {
                "formatName": formData.formatName,
                "formatNo": formData.formatNo,
                "revisionNo": formData.revisionNo,
                "refSopNo": formData.refSopNo,
                "unit": formData.unit,
                "equipmentName": formData.equipmentName,
                "frequency": formData.frequency,
                "remarks": formData.remarks,
                "date": formData.date,
                // "date": "08/06/2024",
                "month": getMonthFromDate(formData.date),
                "year": getYearFromDate(formData.date),
                "cleanedBy": formData.cleanedBy
            }
            // ------------- Form 03 (Bleahcing) payload -------------

            if (formNumber == "PH-PRD02/F-019" && formData.listId) {
                payload.listId = formData.listId;
            }
            if (formNumber == "PH-PRD02/F-019" && formData.section) {
                payload.section = initialValues.section;
            }
            if (formNumber == "PH-PRD02/F-019" && formData.metalContaminatedMaterials) {
                payload.metalContaminatedMaterials = formData.metalContaminatedMaterials
            }
            if (formNumber == "PH-PRD02/F-019" && formData.noOfMetalContaminants) {
                payload.noOfMetalContaminants = formData.noOfMetalContaminants
            }
            if (formNumber == "PH-PRD02/F-019" && formData.functionCheck) {
                payload.functionCheck = formData.functionCheck
            }
            if (formNumber == "PH-PRD02/F-019" && formData.supervisor_status) {
                payload.supervisor_status = formData.supervisor_status
            }
            if (formNumber == "PH-PRD02/F-019" && formData.hod_status) {
                payload.hod_status = formData.hod_status
            }

            // --------------- Form 20 (Spunlace) payload -------------------------
            if (formNumber == "PH-PRD02/F-020" && formData.metalContaminatedMaterials) {
                payload.metalContaminatedMaterials4A = formData.metalContaminatedMaterials
            }
            if (formNumber == "PH-PRD02/F-020" && formData.metalContaminatedMaterials4B) {
                payload.metalContaminatedMaterials4B = formData.metalContaminatedMaterials4B
            }
            if (formNumber == "PH-PRD02/F-020" && formData.noOfMetalContaminants) {
                payload.noOfMetalContaminants4A = formData.noOfMetalContaminants
            }
            if (formNumber == "PH-PRD02/F-020" && formData.noOfMetalContaminants4B) {
                payload.noOfMetalContaminants4B = formData.noOfMetalContaminants4B
            }
            if (formNumber == "PH-PRD02/F-020" && formData.functionCheck) {
                payload.usingFerrous = formData.functionCheck
            }
            if (formNumber == "PH-PRD02/F-020" && formData.functionCheckCu) {
                payload.usingCopper = formData.functionCheckCu
            }
            if (formNumber == "PH-PRD02/F-020" && formData.listId) {
                payload.listId = formData.listId
            }
            if (formNumber == "PH-PRD02/F-020" && formData.supervisor_status) {
                payload.supervisor_status = formData.supervisor_status
            }
            if (formNumber == "PH-PRD02/F-020" && formData.hod_status) {
                payload.hod_status = formData.hod_status
            }

            // console.log("formData", formData);
            payload.remarks = formData.remarks == "" ? "N/A" : formData.remarks;
            if (formNumber == "PH-PRD02/F-019") {
                apiurl = `${ API.prodUrl}/Precot/api/PadPunching/Service/MetalDetectorCheckList/SaveMetalDetectorCheckList`
            }
            else if (formNumber == "PH-PRD02/F-020") {
                apiurl = `${ API.prodUrl}/Precot/api/spunlace/Service/MetalDetectorCheckList/SaveMetalDetectorCheckList`;
            }
        }
        else {
            apiurl = `${ API.prodUrl}/Precot/api/PadPunching/Service/MetalDetectorCheckList/approveOrReject`;
            if (formNumber == "PH-PRD02/F-019") {
                apiurl = `${ API.prodUrl}/Precot/api/PadPunching/Service/MetalDetectorCheckList/approveOrReject`
            }
            else if (formNumber == "PH-PRD02/F-020") {
                apiurl = `${ API.prodUrl}/Precot/api/spunlace/Service/MetalDetectorCheckList/approveOrReject`;
            }
            payload = {
                'id': formData.listId,
                'status': 'Approve'
            }
            successMsg = 'Approved Succesfully'
        }
        if (accessToken) {
            const requestMethod = role == "ROLE_SUPERVISOR" ? axios.post : axios.put;
            requestMethod(
                apiurl, payload,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            )
                .then(response => {
                    setFormData(response.data);
                    notificationMessage('success', successMsg);
                    // console.log('Data saved successfully', response.data);
                    let routePath = ''
                    switch (initialValues.formNumber) {
                        case "PH-PRD02/F-020":
                            routePath = '/Precot/Spunlace/F-20/Summary';
                            break;
                        case "PH-PRD02/F-019":
                            routePath = '/Precot/PadPunching/F-17/Summary';
                            break;
                    }
                    setTimeout(() => {
                        navigate(routePath, {
                            state: {
                                formNo: initialValues.formNumber,
                            }

                        });
                        setStatusLoader(false);
                    }, 1000);

                })
                .catch(error => {
                    notificationMessage('warning', error.response.data.message);
                    setStatusLoader(false);
                    console.error('There was an error saving the data!', error);
                })
                .finally(() => {


                });
        } else {
            console.error('No access token found in local storage');
            setStatusLoader(false);
            notificationMessage('warning', "No access token found. Please login again.");
        }
    };


    const handleSubmit = () => {
        setStatusLoader(true);
        // console.log("Submit Form data", formData)
        const accessToken = localStorage.getItem('token');

        let apiurl, payload;

        if (role == "ROLE_SUPERVISOR") {
            // console.log("Supervisor Access Entered")
            const validationErrors = validateFields();
            // console.log('validate', validationErrors);
            if (Object.keys(validationErrors).length > 0) {
                // console.log("no validation")
                setStatusLoader(false);
                return;
            }
            // console.log("submit validation verified")
            payload = {
                "formatName": formData.formatName,
                "formatNo": formData.formatNo,
                "revisionNo": formData.revisionNo,
                "refSopNo": formData.refSopNo,
                "unit": formData.unit,
                "equipmentName": formData.equipmentName,
                "frequency": formData.frequency,
                "remarks": formData.remarks,
                "date": formData.date,
                // "date": "08/06/2024",
                "month": getMonthFromDate(formData.date),
                "year": getYearFromDate(formData.date),
                "cleanedBy": formData.cleanedBy
            }
            // ------------- Form 03 (Bleahcing) payload -------------
            if (formNumber == "PH-PRD02/F-019" && formData.listId) {
                payload.listId = formData.listId
            }
            if (formNumber == "PH-PRD02/F-019" && formData.section) {
                payload.section = initialValues.section;
            }
            if (formNumber == "PH-PRD02/F-019" && formData.metalContaminatedMaterials) {
                payload.metalContaminatedMaterials = formData.metalContaminatedMaterials
            }
            if (formNumber == "PH-PRD02/F-019" && formData.noOfMetalContaminants) {
                payload.noOfMetalContaminants = formData.noOfMetalContaminants
            }
            if (formNumber == "PH-PRD02/F-019" && formData.functionCheck) {
                payload.functionCheck = formData.functionCheck
            }
            if (formNumber == "PH-PRD02/F-019" && formData.supervisor_status) {
                payload.supervisor_status = formData.supervisor_status
            }
            if (formNumber == "PH-PRD02/F-019" && formData.hod_status) {
                payload.hod_status = formData.hod_status
            }
            // --------------- Form 20 (Spunlace) payload -------------------------
            if (formNumber == "PH-PRD02/F-020" && formData.metalContaminatedMaterials) {
                payload.metalContaminatedMaterials4A = formData.metalContaminatedMaterials
            }
            if (formNumber == "PH-PRD02/F-020" && formData.metalContaminatedMaterials4B) {
                payload.metalContaminatedMaterials4B = formData.metalContaminatedMaterials4B
            }
            if (formNumber == "PH-PRD02/F-020" && formData.noOfMetalContaminants) {
                payload.noOfMetalContaminants4A = formData.noOfMetalContaminants
            }
            if (formNumber == "PH-PRD02/F-020" && formData.noOfMetalContaminants4B) {
                payload.noOfMetalContaminants4B = formData.noOfMetalContaminants4B
            }
            if (formNumber == "PH-PRD02/F-020" && formData.functionCheck) {
                payload.usingFerrous = formData.functionCheck
            }
            if (formNumber == "PH-PRD02/F-020" && formData.functionCheckCu) {
                payload.usingCopper = formData.functionCheckCu
            }
            if (formNumber == "PH-PRD02/F-020" && formData.listId) {
                payload.listId = formData.listId
            }
            if (formNumber == "PH-PRD02/F-020" && formData.supervisor_status) {
                payload.supervisor_status = formData.supervisor_status
            }
            if (formNumber == "PH-PRD02/F-020" && formData.hod_status) {
                payload.hod_status = formData.hod_status
            }
            payload.remarks = formData.remarks == "" ? "N/A" : formData.remarks;
            if (formNumber == "PH-PRD02/F-019") {
                apiurl = `${ API.prodUrl}/Precot/api/PadPunching/Service/MetalDetectorCheckList/SubmitMetalDetectorCheckList`
            }
            else if (formNumber == "PH-PRD02/F-020") {
                apiurl = `${ API.prodUrl}/Precot/api/spunlace/Service/MetalDetectorCheckList/SubmitMetalDetectorCheckList`;
            }
        }
        else {
            if (formData.reason == "" || formData.reason == null) {
                message.warning("Please Enter The Reason")
                setStatusLoader(false);
                return;
            }
            apiurl = `${ API.prodUrl}/Precot/api/PadPunching/Service/MetalDetectorCheckList/approveOrReject`
            payload = {
                "id": formData.listId,
                "status": "Reject",
                "remarks": formData.reason
            }
        }
        if (accessToken) {
            const requestMethod = role === "ROLE_SUPERVISOR" ? axios.post : axios.put;
            requestMethod(apiurl, payload, {

                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    setFormData(response.data);
                    notificationMessage('success', response.data.message);
                    // console.log('Data saved successfully', response.data);
                    let routePath = ''
                    switch (initialValues.formNumber) {
                        case "PH-PRD02/F-020":
                            routePath = '/Precot/Spunlace/F-20/Summary';
                            break;
                        case "PH-PRD02/F-019":
                            routePath = '/Precot/PadPunching/F-17/Summary';
                            break;
                    }
                    setTimeout(() => {
                        navigate(routePath, {
                            state: {
                                formNo: initialValues.formNumber,
                            }
                        });
                        setStatusLoader(false);
                    }, 1000);

                })
                .catch(error => {
                    notificationMessage('warning', error.response.data.message);

                    setStatusLoader(false);
                })
                .finally(() => {

                })

                ;
        } else {
            console.error('No access token found in local storage');
        }
    }




    // const getMonthFromDate = (dateString) => {
    //     console.log('dateString in getMonthFromDate', dateString)
    //     const monthNames = [
    //         "January", "February", "March", "April", "May", "June",
    //         "July", "August", "September", "October", "November", "December"
    //     ];
    //     const monthIndex = parseInt(dateString.split('-')[1], 10) - 1;
    //     return monthNames[monthIndex];
    // };
    function getMonthFromDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const getYearFromDate = (dateString) => {
        return dateString.split('-')[0];
    };


    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            const token = localStorage.getItem('token');

            // Configure Axios request
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const date = initialValues.date;
            // console.log("Initial Dates Checking", date)
            const section = initialValues.selectSection;
            let url;
            if (formNumber == "PH-PRD02/F-019") {
                url = `${ API.prodUrl}/Precot/api/PadPunching/Service/MetalDetectorCheckList/getByDate?date=${date}`
            }
            else if (formNumber == "PH-PRD02/F-020") {
                url = `${ API.prodUrl}/Precot/api/spunlace/Service/MetalDetectorCheckList/getByDate?date=${date}`
            }
            axios.get(url, config)
                .then(response => {
                    // Handle the response
                    // console.log('res', response.data);
                    if (response.data) {
                        console.log('response From Get Api', response.data);
                        console.log('formNumber', formNumber)
                        // console.log("valid")
                        if (formNumber == "PH-PRD02/F-019") {
                            statusFunction(response.data);
                            if (!(response.data.hasOwnProperty('message') && response.data.message === "No data")) {
                                setFormData(response.data);
                            }



                        }
                        else if (formNumber == "PH-PRD02/F-020" && response.data.message !== "No data") {
                            statusFunction(response.data);
                            setFormData(response.data);
                            setFormData(prevState => ({
                                ...prevState,
                                metalContaminatedMaterials: response.data.metalContaminatedMaterials4A,
                                noOfMetalContaminants: response.data.metalContaminatedMaterials4B,
                                functionCheck: response.data.usingFerrous,
                                functionCheckCu: response.data.usingCopper,
                                noOfMetalContaminants: response.data.noOfMetalContaminants4A,
                                noOfMetalContaminants4B: response.data.noOfMetalContaminants4B

                            }))
                        }
                        else if (formNumber == "PH-PRD02/F-020" && response.data.message == "No data" && (role == "ROLE_HOD" || role == "ROLE_DESIGNEE")) {
                            message.warning("Supervisor Yet To Approve");
                            setTimeout(() => {
                                navigate('/Precot/Spunlace/F-20/Summary', {
                                    state: {
                                        formNo: "PH-PRD02/F-020",
                                    }
                                });
                            }, 1000);
                        }
                        // ------------------------ Form 03 (Bleaching) Validation -------------------------
                        if (formNumber == "PH-PRD02/F-019" && response.data.metalContaminatedMaterials == "yes" || response.data.metalContaminatedMaterials == "Yes") {
                            setTab1Condition(prevState => ({
                                ...prevState,
                                yesCheck1: true
                            }))
                        }
                        else if (formNumber == "PH-PRD02/F-019" && response.data.metalContaminatedMaterials == "no" || response.data.metalContaminatedMaterials == "No") {
                            ;
                            setTab1Condition(prevState => ({
                                ...prevState,
                                noCheck1: true
                            }))
                        }
                        if (formNumber == "PH-PRD02/F-019" && response.data.functionCheck == "yes" || response.data.functionCheck == "Yes") {
                            setTab2Condition(prevState => ({
                                ...prevState,
                                yesCheck1: true
                            }))
                        }
                        else if (formNumber == "PH-PRD02/F-019" && response.data.functionCheck == "no" || response.data.functionCheck == "No") {
                            setTab2Condition(prevState => ({
                                ...prevState,
                                noCheck1: true
                            }))
                        }
                        // ------------------------ Form 20 (Spunlace) Validation ------------------------
                        if (formNumber == "PH-PRD02/F-020" && response.data.metalContaminatedMaterials4A == "yes" || response.data.metalContaminatedMaterials4A == "Yes") {
                            setTab1Condition(prevState => ({
                                ...prevState,
                                yesCheck1: true
                            }))
                        }
                        if (formNumber == "PH-PRD02/F-020" && response.data.metalContaminatedMaterials4A == "no" || response.data.metalContaminatedMaterials4A == "No") {
                            ;
                            setTab1Condition(prevState => ({
                                ...prevState,
                                noCheck1: true
                            }))
                        }
                        if (formNumber == "PH-PRD02/F-020" && response.data.metalContaminatedMaterials4B == "yes" || response.data.metalContaminatedMaterials4B == "Yes") {
                            setTab1Condition(prevState => ({
                                ...prevState,
                                yesCheck2: true
                            }))
                        }
                        if (formNumber == "PH-PRD02/F-020" && response.data.metalContaminatedMaterials4B == "no" || response.data.metalContaminatedMaterials4B == "No") {
                            ;
                            setTab1Condition(prevState => ({
                                ...prevState,
                                noCheck2: true
                            }))
                        }
                        if (formNumber == "PH-PRD02/F-020" && response.data.usingFerrous == "yes" || response.data.usingFerrous == "Yes") {
                            setTab2Condition(prevState => ({
                                ...prevState,
                                yesCheck1: true
                            }))
                        }
                        if (formNumber == "PH-PRD02/F-020" && response.data.usingFerrous == "no" || response.data.usingFerrous == "No") {
                            setTab2Condition(prevState => ({
                                ...prevState,
                                noCheck1: true
                            }))
                        }
                        if (formNumber == "PH-PRD02/F-020" && response.data.usingCopper == "yes" || response.data.usingCopper == "Yes") {
                            setTab2Condition(prevState => ({
                                ...prevState,
                                yesCheck2: true
                            }))
                        }
                        if (formNumber == "PH-PRD02/F-020" && response.data.usingCopper == "no" || response.data.usingCopper == "No") {
                            setTab2Condition(prevState => ({
                                ...prevState,
                                noCheck2: true
                            }))
                        }
                    }

                })
                .catch(error => {
                    // Handle any errors
                    console.error('There was an error making the request:', error);
                });
            // console.log("Initial Date is", initialValues.date)


            // getMonthSummary(month);
            // console.log("set print data", printData);
        }
    }, []);
    const statusFunction = (responseData) => {
        if (role == "ROLE_SUPERVISOR" && responseData.supervisor_status == "SUPERVISOR_APPROVED") {
            // console.log("Condition 2")
            setStatus(formStatus => ({
                ...formStatus,
                saveStatus: true
            }))
        }
        if (role == "ROLE_SUPERVISOR" && responseData.supervisor_status == "SUPERVISOR_APPROVED" && (responseData.hod_status == "HOD_APPROVED" || responseData.hod_status == "WAITING_FOR_APPROVAL")) {
            // console.log("Condition ")
            setStatus(formStatus => ({
                ...formStatus,
                saveStatus: true,
                submitStatus: true,
                fieldStatus: true
            }))
        }
        if ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") && responseData.hod_status == "HOD_APPROVED") {
            // console.log("Condition 4")
            setStatus(formStatus => ({
                ...formStatus,
                saveStatus: true,
                submitStatus: true,
                fieldStatus: true
            }))
        }
        if ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") && responseData.hod_status == "HOD_REJECTED") {
            message.warning("Supervisor Yet To Approve");
            if (formNumber == "PH-PRD02/F-020") {
                setTimeout(() => {
                    navigate('/Precot/Spunlace/F-20/Summary', {
                        state: {
                            formNo: "PH-PRD02/F-020",
                        }
                    });
                }, 1000);
            }
            else if (formNumber === "PH-PRD02/F-019") {

                setTimeout(() => {
                    navigate('/Precot/PadPunching/F-17/Summary', {
                        state: {
                            formNo: "PH-PRD02/F-020",
                        }
                    });
                }, 1000);
            }


            setStatus(formStatus => ({
                ...formStatus,
                saveStatus: true,
                submitStatus: true,
                fieldStatus: true
            }))
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const signatureKeys = ["supervisor_sign", "hod_sign"];
        signatureKeys.forEach((key) => {
            const username = formData[key];
            if (username) {
                // console.log("usernameparams", username);

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
    }, [formData.supervisor_sign, formData.hod_sign]);





    return (
        <div>

            <BleachingHeader

                formName={formName}
                formatNo={formatNo}
                unit={"UNIT H"}
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
                        loading={statusLoader}
                        style={{
                            backgroundColor: "#E5EEF9",
                            color: "#00308F",
                            fontWeight: "bold",
                            display: status.saveStatus ? "none" : "flex",
                            alignItems: "center",
                            gap: "8px",

                        }}
                        onClick={handleSave}
                        shape="round"
                        icon={role == "ROLE_SUPERVISOR" ? <IoSave color="#00308F" /> : <img src={approveIcon} alt="Approve Icon" />}
                    >
                        {role == "ROLE_SUPERVISOR" ? "Save" : "Approve"}
                    </Button>,
                    <Button
                        type="primary"
                        loading={statusLoader}
                        style={{
                            backgroundColor: "#E5EEF9",
                            color: "#00308F",
                            fontWeight: "bold",
                            display: status.submitStatus ? "none" : "flex",
                            alignItems: "center",
                            gap: "8px",

                        }}
                        onClick={role == "ROLE_SUPERVISOR" ? handleSubmit : rejectFlow}
                        shape="round"
                        icon={role == "ROLE_SUPERVISOR" ? <GrDocumentStore color="#00308F" /> : <img src={rejectIcon} alt="Reject Icon" />}
                    >
                        {role == "ROLE_SUPERVISOR" ? " Submit" : "   Reject"}
                    </Button>,

                    <Button
                        icon={<GoArrowLeft color="#00308F" />}
                        onClick={handleBack}
                        style={{
                            backgroundColor: "#E5EEF9",
                            color: "#00308F",
                            fontWeight: "bold",
                        }}
                        shape="round"
                        type="primary"
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
                        // onClick={() => navigate("/Precot")}
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
            <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
            <Modal title="Reason For Reject" open={rejectModal} onCancel={handleCancel} width={380}
                destroyOnClose={true}
                footer={[
                    <Button key="cancel" onClick={handleCancel} >
                        Cancel
                    </Button>,
                    <Button key="reject" type="primary" onClick={handleSubmit} loading={statusLoader}>
                        Reject
                    </Button>,
                ]}
            >
                <label>Remarks : </label><br></br><br></br>
                <TextArea type="textArea" style={{ height: "100px" }} onChange={handleRejectReason} ></TextArea>
            </Modal>
            <div>
                {contextHolder}
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <div style={{ width: '95%' }}>
                        <div className='no-print'>


                        </div>
                        <div className='no-print'>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        </div>
                    </div >

                </div >
            </div >
        </div>
    )
}

export default Metal_detector_checklist;