/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { IoSave, IoPrint } from 'react-icons/io5';
import { BiLock } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { Space, Table, Tag, Button, Print, Tooltip, Tabs, message, Radio } from 'antd';
import { Modal, DatePicker, Select, Input, Form, Col, Drawer, Row, Menu, Avatar } from "antd";
import BleachingHeader from '../Components/BleachingHeader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BleachingPrintHeader from '../Components/BleachingPrintHeader';
import BleachingTail from '../Components/BleachingTail';
import { IoCreate } from 'react-icons/io5';
import axios from 'axios';
import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import API from "../baseUrl.json";
import './style.css';
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { GoArrowLeft } from 'react-icons/go';
import { GrDocumentStore } from 'react-icons/gr';
import TextArea from 'antd/es/input/TextArea';
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const Bleaching_f03 = () => {
    const navigate = useNavigate();
    const formName = "METAL DETECTOR CHECK LIST";
    const formatNo = "PH-PRD01/F-002";
    const revisionNo = "02";
    const sopNo = "PRD01-D-10";
    const pageNo = "01 of 02";
    const [yescheck1, setYesCheck1] = useState(false);
    const [noCheck, setNoCheck] = useState(false);
    const [yescheck2, setYesCheck2] = useState(false);
    const [noCheck2, setNoCheck2] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const role = localStorage.getItem('role');
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [rejectRemarks, setRejectRemarks] = useState("");
    const token = localStorage.getItem("token");
    const [id, setId] = useState("");
    // const [recentPrintData, setRecentPrintData]= useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const location = useLocation();
    const { initialValues } = location.state || {};

    const [printData, setPrintData] = useState([
        {
            remarks: "",
            hod_submit_by: ""
        }
    ]);

    const [formData, setFormData] = useState({
        "formatName": "METAL DETECTOR CHECK LIST",
        "formatNo": "PH-PRD01/F-002",
        "revisionNo": 5,
        "refSopNo": "PRD01-D-10",
        "unit": "H",
        "section": initialValues.selectSection,
        "equipmentName": "VETAL",
        "frequency": "daily",
        "remarks": "",
        "date": initialValues.date,
        // "date": "08/06/2024",
        "metalContaminatedMaterials": "",
        "noOfMetalContaminants": "",
        "functionCheck": "",
        "supervisor_status": "",
        "hod_status": "",
        "cleanedBy": ''
    });

    const [getImage, setGetImage] = useState("");

    useEffect(() => {

        const token = localStorage.getItem('token');

        // Configure Axios request
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const date = initialValues.date;
        // console.log("Intial Date Checking",date)
        // const date = "2024/07/01"
        const section = initialValues.selectSection;
        // Make the GET request
        axios.get(`${API.prodUrl}/Precot/api/bleaching/Service/MetalDetectorList/getByDateMetalDetectorList?date=${date}&section=${section}`, config)
            .then(response => {
                // Handle the response
                // console.log('res', response.data);
                if (response.data) {
                    // console.log("valid")
                    setFormData(response.data);
                    setId(response.data.listId);
                    if (response.data.metalContaminatedMaterials == "yes" || response.data.metalContaminatedMaterials == "Yes") {
                        setYesCheck1(true);
                    }
                    else if (response.data.metalContaminatedMaterials == "no" || response.data.metalContaminatedMaterials == "No") {
                        setNoCheck(true);
                    }
                    if (response.data.functionCheck == "yes" || response.data.functionCheck == "Yes") {
                        setYesCheck2(true);
                    }
                    else if (response.data.functionCheck == "no" || response.data.functionCheck == "No") {
                        setNoCheck2(true);
                    }
                }

            })
            .catch(error => {
                // Handle any errors
                console.error('There was an error making the request:', error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = formData?.hod_sign;
        // console.log("UserName " , formData.hod_sign);
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
                    setGetImage(url);
                })
                .catch((err) => {
                    // console.log("Error in fetching image:", err);
                });
        }
    }, [formData,API.prodUrl, token]);



    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    // console.log("initialValues", initialValues);

    const handleApprove = async () => {
        setSaveLoading(true);

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust content type if needed
        };

        const res = await axios
            .put(
                `${API.prodUrl}/Precot/api/bleaching/Service/MetalDetectorList/approveOrReject`,
                {
                    id: id,
                    status: "Approve",
                },
                { headers }
            )
            .then((res) => {

                // console.log("messsage", res);
                // window.location.reload();
                message.success(res.data.message);
                navigate("/Precot/Bleaching/F-03/Summary");
            })
            .catch((err) => {

                // console.log("Err", err.response.data.message);
                message.error(err.response.data.message);
            })
            .finally(() => {
                setSaveLoading(false);
            });
    };

    const handleRejectModal = () => {
        setShowModal(true);
        // window.print()
        // console.log("print screen works");
        // Add any other print-related logic here
    };
    const handleReject = async () => {
        setSaveLoading(true);

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust content type if needed
        };

        if (!rejectRemarks) {
            message.warning('Please Enter the Remarks!');
            setSaveLoading(false);
            return;
        }

        const res = await axios
            .put(
                `${API.prodUrl}/Precot/api/bleaching/Service/MetalDetectorList/approveOrReject`,
                {
                    id: id,
                    status: "Reject",
                    remarks: rejectRemarks,
                },
                { headers }
            )
            .then((res) => {

                // console.log("messsage", res.data.message);
                // window.location.reload();
                message.success(res.data.message);
                navigate("/Precot/Bleaching/F-03/Summary");
            })
            .catch((err) => {

                // console.log("Err", err.response.data.message);
                message.error(err.response.data.message);
            })
            .finally(() => {
                setSaveLoading(false);
            });
    };


    // Example usage:

    const handleChange = (event) => {

        const { name, value } = event.target;


        setFormData({
            ...formData,
            [name]: value
        });
    }


    const notificationMessage = (messageType, errorMessage) => {
        messageApi.open({
            type: messageType,
            content: errorMessage,
        });
    };

    const handleYesCheckboxChange = () => {
        setNoCheck(false);
        setYesCheck1(true);
        setFormData({
            ...formData,
            "metalContaminatedMaterials": "yes"
        });
    }
    const handleNoCheckboxChange = (e) => {
        setYesCheck1(false);
        setNoCheck(true);
        setFormData({
            ...formData,
            "metalContaminatedMaterials": "no"
        });
    }
    const handleYesCheckboxChange2 = (e) => {
        setNoCheck2(false);
        setYesCheck2(true);
        setFormData({
            ...formData,
            "functionCheck": "yes"
        });

    }
    const handleNoCheckboxChange2 = (e) => {
        setYesCheck2(false);
        setNoCheck2(true);
        setFormData({
            ...formData,
            "functionCheck": "no"
        });
    }
    const handleValidateReadOnly = (data) => {

        if (role == "ROLE_SUPERVISOR") {
            return data.hod_status == "HOD_APPROVED" || data.hod_status === "WAITING_FOR_APPROVAL";
        }
        else if (role === "ROLE_HOD" ||
            role === "ROLE_QA" ||
            role === "ROLE_QC" ||
            role === "ROLE_DESIGNEE") {
            return data.supervisor_status == "SUPERVISOR_APPROVED";
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
                        <tr>
                            <td className="data-border">
                                <p>Section:</p>
                            </td>
                            <td colSpan={2} className="data-border">
                                <p>{formData.section}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="data-border">
                                <p>Equipment Name:</p>
                            </td>
                            <td colSpan={2} className="data-border">
                                {/* <input type="text" className='table-text-box' name="equipmentName" onChange={handleChange} value={formData.equipmentName}></input> */}
                                <p name="equipmentName" value="VETAL" onChange={handleChange}>VETAL</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="data-border">
                                <p style={{ textAlign: 'center' }}>Sr.No</p>
                            </td>
                            <td className="data-border">
                                <p style={{ textAlign: 'center' }}>Cleaning Area</p>
                            </td>
                            <td className="data-border">
                                <p style={{ textAlign: 'center' }}>Entry</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="data-border" colSpan={3}>
                                <b>I. CLENANING OF EQUIPMENT</b>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="data-border">
                                <p style={{ textAlign: 'center' }}>1</p>
                            </td>
                            <td className="data-border">
                                <p>Machine Cleaning & Removing Ejected (metal contaminated materials)</p>
                            </td>
                            <td className="data-border" >
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <input
                                            type="checkbox"
                                            name="yes"
                                            value={"yes"}
                                            checked={yescheck1}
                                            onChange={handleYesCheckboxChange}

                                            disabled={handleValidateReadOnly(formData)}
                                        >
                                        </input>
                                        <label for="yes"> Yes</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <input type="checkbox"
                                            name="no"
                                            value="no"
                                            checked={noCheck}
                                            onChange={handleNoCheckboxChange}

                                            disabled={handleValidateReadOnly(formData)}

                                        ></input>
                                        <label for="no"> No</label>
                                    </div>

                                </div>


                            </td>
                        </tr>
                        <tr>
                            <td className="data-border">
                                <p style={{ textAlign: 'center' }}>2</p>
                            </td>
                            <td className="data-border">
                                <p>No of Metal contamination found</p>
                            </td>
                            <td className="data-border">
                                <input type="number"
                                    name='noOfMetalContaminants'
                                    onChange={handleChange}
                                    value={formData.noOfMetalContaminants}
                                    style={{ border: 'none', width: '100%', outline: 'none' }}
                                    min={0} max={999}
                                    onKeyDown={handleKeyDown}
                                    readOnly={handleValidateReadOnly(formData)}
                                ></input>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='data-border-signature' colSpan={2}>
                                <p>Cleaned By:</p>
                            </td>
                            <td className='data-border-signature' >
                                <input type='text' name="cleanedBy" style={{ width: '100%', height: '100%', border: 'none', outline: 'none' }} onChange={handleChange} value={formData.cleanedBy} readOnly={handleValidateReadOnly(formData)}></input>

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
                        <td className='data-border-header'>
                            <p>Entry</p>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='data-border'>
                            <p style={{ textAlign: 'center' }}>1</p>
                        </td>
                        <td className='data-border'>
                            <p>Functioning of Metal Detector / Calibration Check (both detection & ejection) Using Ferrous Size : 3.0 mm</p>
                        </td>
                        <td className='data-border'>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="checkbox"
                                        name="yes"
                                        value="yes"
                                        checked={yescheck2}
                                        onChange={handleYesCheckboxChange2}
                                        disabled={handleValidateReadOnly(formData)}
                                    >
                                    </input>
                                    <label for="yes"> Yes</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input
                                        type="checkbox"
                                        name="no"
                                        value="no"
                                        checked={noCheck2}
                                        onChange={handleNoCheckboxChange2}
                                        disabled={handleValidateReadOnly(formData)}
                                    >
                                    </input>
                                    <label for="no"> No</label>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='data-border-signature' colSpan={2}>

                            <p>Checked By</p>
                        </td>
                        <td className='data-border' >
                            <p>{formData.supervisor_submit_by}</p>
                            <p>{formatDate(formData.supervisor_submit_on)}</p>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className='data-border-remarks'>
                            <p>Remarks/Comment<br></br>(in case of any<br></br> abnormality observed) :</p>
                        </td>
                        <td className='data-border-remarks' colSpan={2}>
                            <input type="text" className='inp-new' name="remarks" value={formData.remarks} readOnly={handleValidateReadOnly(formData)} onChange={handleChange}></input>
                        </td>
                    </tr>
                </tfoot>
            </table>,
        },
        {
            key: '3',
            label: 'REVIEW',
            children: <table style={{ borderCollapse: 'collapse' }}>
                <tbody>
                    <td className='data-border-signature' style={{ width: '30%' }}>

                        <p >Reviewed by Head of the Department or Designee</p>
                    </td>
                    <td className='data-border-signature' >
                        {
                            (formData.hod_status === "HOD_APPROVED" ||
                                formData.hod_status === "HOD_REJECTED") && (
                                <>
                                    <p>{formData.hod_submit_by}</p>
                                    <p>{formatDate(formData.hod_submit_on)}</p>
                                    {getImage !== "" && (
                                        <img className="signature"
                                            src={getImage}
                                            alt="HOD"

                                        />)}
                                </>
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


        if (formData.metalContaminatedMaterials === '') {
            errors.metalContaminatedMaterials = 'Metal contamination is required';
            notificationMessage('error', 'Metal contamination is required');
        }
        if (formData.noOfMetalContaminants === '') {
            errors.noOfMetalContaminants = 'Number of Metal contaminants is required';
            notificationMessage('error', ' Number of Metal contaminants is required');
        }
        if (formData.functionCheck === '') {
            errors.functionCheck = 'Function check  is required';
            notificationMessage('error', 'Function check is required')
        }
        return errors;
    };

    const handleBack = () => {
        navigate('/Precot/Bleaching/F-03/Summary');
    }
    // const handleSave = () => {
    //     setSaveLoading(true);
    //     // console.log("formData", formData);

    //     // Get the access token from local storage
    //     const accessToken = localStorage.getItem('token');

    //     if (accessToken) {
    //         axios.post('https://secure.focusrtech.com:5050/Precot/api/bleaching/Service/MetalDetectorList/SaveMetalDetectorList', formData, {
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`
    //             }
    //         })
    //             .then(response => {

    //                 setFormData(response.data);
    //                 notificationMessage('success', "Form Saved successFully");
    //                 // console.log('Data saved successfully', response.data);
    //             })
    //             .catch(error => {
    //                 notificationMessage('error', "unable to save Form!");
    //                 console.error('There was an error saving the data!', error);
    //             })
    //             .finally(() => {
    //                 setSaveLoading(false);
    //             })
    //             ;
    //     } else {
    //         console.error('No access token found in local storage');

    //     }
    // };
    const handleSave = () => {
        setSaveLoading(true);

        // console.log("formData", formData);
        formData.remarks = formData.remarks === "" ? "N/A" : formData.remarks;

        // Get the access token from local storage
        const accessToken = localStorage.getItem('token');

        if (accessToken) {
            axios.post(
                `${API.prodUrl}/Precot/api/bleaching/Service/MetalDetectorList/SaveMetalDetectorList`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            )
                .then(response => {
                    setFormData(response.data);
                    notificationMessage('success', "Form Saved Successfully");
                    // console.log('Data saved successfully', response.data);
                    navigate("/Precot/Bleaching/F-03/Summary");
                })
                .catch(error => {
                    notificationMessage('error', error.response.data.message);
                    console.error('There was an error saving the data!', error);
                })
                .finally(() => {
                    setSaveLoading(false);

                });
        } else {
            console.error('No access token found in local storage');
            setSaveLoading(false);
            notificationMessage('error', "No access token found. Please login again.");
        }
    };


    const handleSubmit = () => {
        setSubmitLoading(true);
        const accessToken = localStorage.getItem('token');
        const validationErrors = validateFields();
        // console.log('validate', validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setSubmitLoading(false);
            return;
        }
        formData.remarks = formData.remarks === "" ? "N/A" : formData.remarks;
        if (accessToken) {
            axios.post(`${API.prodUrl}/Precot/api/bleaching/Service/MetalDetectorList/SubmitMetalDetectorList`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    setFormData(response.data);
                    notificationMessage('success', "Form Submitted successFully");
                    // console.log('Data saved successfully', response.data);
                    setTimeout(() => {
                        handleBack();
                    }, 1000);

                })
                .catch(error => {
                    notificationMessage('error', error.response.data.message);
                    console.error('There was an error saving the data!', error);
                })
                .finally(() => {
                    setSubmitLoading(false);

                })

                ;
        } else {
            console.error('No access token found in local storage');
        }
    }



    const getMonthFromDate = (dateStr) => {
        // console.log("current Date",dateStr)
        const dateParts = dateStr.split('/');
        return dateParts[1]; // Extracting the month part
    };

    const getYearFromDate = (dateStr) => {
        const dateParts = dateStr.split('/');
        return dateParts[0]; // Extracting the month part
    };



    const handlePrint = () => {

        window.print();


        // console.log("printed");
        // window.print();

    };

    const canDisplayButtons = () => {
        if (role == "ROLE_SUPERVISOR") {
            if (
                formData.supervisor_status == "SUPERVISOR_APPROVED" &&
                formData.hod_status == "HOD_REJECTED"
            ) {
                return "block";
            } else if (
                (formData.supervisor_status == "SUPERVISOR_APPROVED" &&
                    formData.hod_status == "WAITING_FOR_APPROVAL") ||
                formData.hod_status == "HOD_APPROVED"
            ) {
                return "none";
            }
        } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
            if (
                formData.hod_status == "HOD_APPROVED" ||
                formData.hod_status == "HOD_REJECTED"
                // emptyarraycheck == 0
            ) {
                return "none";
            }
            return "block";
        } else {
            if (
                formData.hod_status == "HOD_APPROVED" ||
                formData.hod_status == "HOD_REJECTED"
            ) {
                return "none";
            }
            return "block";
        }
    };

    const canDisplayButton2 = () => {
        if (role == "ROLE_SUPERVISOR") {
            if (
                formData.supervisor_status == "SUPERVISOR_APPROVED" &&
                formData.hod_status == "HOD_REJECTED"
            ) {
                return "none"; // Disable button 2
            } else if (
                formData.supervisor_status == "SUPERVISOR_APPROVED" &&
                (formData.hod_status == "WAITING_FOR_APPROVAL" ||
                    formData.hod_status == "HOD_APPROVED")
            ) {
                return "none"; // Enable button 2
            }
        } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
            if (
                formData.hod_status == "HOD_APPROVED" ||
                formData.hod_status == "HOD_REJECTED"
                // emptyarraycheck == 0
            ) {
                return "none"; // Disable button 2
            }
            return "block"; // Enable button 2
        } else {
            if (
                formData.hod_status == "HOD_APPROVED" ||
                formData.hod_status == "HOD_REJECTED"
            ) {
                return "none"; // Disable button 2
            }
            return "block"; // Enable button 2
        }
    };

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

                    role === "ROLE_HOD" ||
                        role === "ROLE_QA" ||
                        role === "ROLE_QC" ||
                        role === "ROLE_DESIGNEE" ? (
                        <>
                            <Button
                                loading={saveLoading}
                                type="primary"
                                style={{
                                    backgroundColor: "#E5EEF9",
                                    color: "#00308F",
                                    fontWeight: "bold",
                                    display: canDisplayButtons(),
                                }}
                                onClick={handleApprove}
                                shape="round"
                                icon={<img src={approveIcon} alt="Approve Icon" />}
                            >
                                &nbsp;Approve
                            </Button>
                            <Button
                                loading={submitLoading}
                                type="primary"
                                style={{
                                    backgroundColor: "#E5EEF9",
                                    color: "#00308F",
                                    fontWeight: "bold",
                                    display: canDisplayButtons(),
                                }}
                                icon={<img src={rejectIcon} alt="Reject Icon" />}
                                onClick={handleRejectModal}
                                shape="round"
                            >
                                &nbsp;Reject
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type="primary"
                                loading={saveLoading}
                                style={{
                                    backgroundColor: "#E5EEF9",
                                    color: "#00308F",
                                    fontWeight: "bold",
                                    display: canDisplayButton2()
                                }}
                                onClick={handleSave}
                                shape="round"
                                icon={<IoSave color="#00308F" />}
                            >
                                &nbsp;Save
                            </Button>
                            <Button
                                type="primary"
                                loading={submitLoading}
                                style={{
                                    backgroundColor: "#E5EEF9",
                                    color: "#00308F",
                                    fontWeight: "bold",
                                    display: canDisplayButtons()
                                }}
                                onClick={handleSubmit}
                                shape="round"
                                icon={<GrDocumentStore color="#00308F" />}
                            >
                                &nbsp;Submit
                            </Button>
                        </>
                    ),
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

            <div>
                {contextHolder}
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <div style={{ width: '95%' }}>
                        <div className='no-print'>

                            <Drawer
                                placement="left"
                                closable={false}
                                onClose={onClose}
                                open={open}
                                width="fit-content"
                                style={{
                                    padding: "1em",
                                }}
                            >
                                <Row>
                                    <Col>
                                        <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
                                    </Col>

                                    <Col
                                        style={{
                                            marginLeft: "1em",
                                        }}
                                    >
                                        <p>{localStorage.getItem("username")}</p>
                                        <p
                                            style={{
                                                fontSize: "x-small",
                                            }}
                                        >
                                            {localStorage.getItem("role")}
                                        </p>
                                    </Col>
                                </Row>

                                <Menu
                                    theme="dark"
                                    mode="inline"
                                    // defaultSelectedKeys={["1"]}
                                    style={{
                                        backgroundColor: "transparent",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        padding: "0",
                                        margin: "0",
                                    }}
                                    items={
                                        localStorage.getItem("role") == "ROLE_QA"
                                            ? [
                                                {
                                                    key: "1",
                                                    icon: <IoCreate color="#151718" />,
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Form Browser
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot/choosenScreen"),
                                                },
                                                {
                                                    key: "2",
                                                    icon: <IoCreate color="#151718" />,
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Generation
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot/Generate"),
                                                },
                                                {
                                                    key: "3",
                                                    icon: <IoCreate color="#151718" />,
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Mapping
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                                                },
                                                {
                                                    key: "4",
                                                    icon: <IoCreate color="#151718" />,
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Closing
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot/Closing"),
                                                },
                                                {
                                                    key: "5",
                                                    icon: <IoCreate color="#151718" />,
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Raw Material Isuue
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                                                },
                                                {
                                                    key: "6",
                                                    icon: (
                                                        <FaLock
                                                            color="#151718"
                                                            onClick={() => navigate("/Precot")}
                                                        />
                                                    ),
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Logout
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot"),
                                                },
                                            ]
                                            : [
                                                {
                                                    key: "1",
                                                    icon: <IoCreate color="#151718" />,
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Form Browser
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot/choosenScreen"),
                                                },
                                                {
                                                    key: "2",
                                                    icon: <IoCreate color="#151718" />,
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Mapping
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                                                },
                                                {
                                                    key: "3",
                                                    icon: <IoCreate color="#151718" />,
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Closing
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot/Closing"),
                                                },
                                                {
                                                    key: "4",
                                                    icon: (
                                                        <FaLock
                                                            color="#151718"
                                                            onClick={() => navigate("/Precot")}
                                                        />
                                                    ),
                                                    label: (
                                                        <b
                                                            style={{
                                                                color: "#151718",
                                                            }}
                                                        >
                                                            Logout
                                                        </b>
                                                    ),
                                                    onClick: () => navigate("/Precot"),
                                                },
                                            ]
                                    }
                                />
                            </Drawer>


                        </div>

                        <Modal
                            title="Reject"
                            open={showModal}
                            onOk={() => setShowModal(false)}
                            onCancel={() => setShowModal(false)}
                            destroyOnClose={true}
                            showSearch
                            footer={[
                                <Button
                                    key="submit"
                                    type="primary"
                                    style={{
                                        backgroundColor: "#E5EEF9",
                                        color: "#00308F",
                                        fontWeight: "bold",
                                    }}
                                    shape="round"
                                    onClick={handleReject}
                                >
                                    Submit
                                </Button>,
                            ]}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "16px",
                                }}
                            >
                                <label style={{ marginRight: "8px" }}>Remarks:</label>
                                <TextArea
                                    value={rejectRemarks}
                                    onChange={(e) => setRejectRemarks(e.target.value)}
                                    rows={4} // Adjust the number of rows as needed
                                    style={{ width: "100%" }} // Adjust the width as needed
                                />
                            </div>
                        </Modal>

                        <div className='no-print'>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        </div>




                    </div >

                </div >
            </div >
        </div>
    )
}

export default Bleaching_f03;