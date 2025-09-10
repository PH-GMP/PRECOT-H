
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer } from "antd";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader';
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from 'react-router-dom';
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from 'moment';
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f19 = () => {

  const navigate = useNavigate();
  const role=localStorage.getItem("role")
  const location = useLocation();
  const { state } = location;
  const { date , shift} = state || {};
  const token = localStorage.getItem("token");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [cottonWasteReport, setcottonWasteReport] = useState("");
  const [reportId, setreportId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  // const [rowincrement, setrowincrement] = useState(1);

  // Totals
  const [compactorWasteNoOfBagsSum, setcompactorWasteNoOfBagsSum] = useState('');
  const [compactorWasteNWtSum, setcompactorWasteNWtSum] = useState('');
  const [swwsWasteNoOfBagsSum, setswwsWasteNoOfBagsSum] = useState('');
  const [swwsWasteNWtSum, setswwsWasteNWtSum] = useState('');
  const [swwsWasteTotalWtSum, setswwsWasteTotalWtSum] = useState('');
  const [exfolatingWasteNoOfBagsSum, setexfolatingWasteNoOfBagsSum] = useState('');
  const [exfolatingWasteNWtSum, setexfolatingWasteNWtSum] = useState('');
  const [microBagCount , setMicroBagCount] = useState('');
  const [microWeightCount , setMicroWeightCount] = useState('')
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [isInitialRowSet, setIsInitialRowSet] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => {
    setOpen(true);
};
const onClose = () => {
    setOpen(false);
}
const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = cottonWasteReport?.supervisor_sign;
    if (username) {
      // console.loglog("usernameparams", username);
  
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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [cottonWasteReport,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = cottonWasteReport?.hod_sign;
    if (username) {
      // console.loglog("usernameparams", username);
  
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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [cottonWasteReport,API.prodUrl, token]);

  const [rows, setRows] = useState([
    { NoofBag1: '', netWeight1: '', NoofBag2: '', netWeight2: '', NoofBag3: '', netWeight3: '', netWeight4: '', microWasteTotalWt : '' , microWasteNoOfBags : '' }
  ]);
  const handleKeyDown = (e) => {
    // Prevent negative values and letters
    if (e.key === '-' || e.key === '+' || e.key === 'e'|| e.key === 'E') {
      e.preventDefault();
    }
  };
  const handleKeyDown2 = (e) => {
    // Prevent negative values and letters
    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key ==='.'|| e.key === 'E') {
      e.preventDefault();
    }
  };

    useEffect(() => {
    const sum = rows.reduce((total, row) => {
      const value = parseFloat(row.NoofBag1) || 0;
      return total + value;
    }, 0);
    if(sum<=0){
      setcompactorWasteNoOfBagsSum('');
    }else{
      setcompactorWasteNoOfBagsSum(sum);
    }
         
      }, [rows]);
  useEffect(() => {
    const sum2 = rows.reduce((total, row) => {
      const value = parseFloat(row.netWeight1) || 0; 
      return total + value;
    }, 0);
    if(sum2<=0){
      setcompactorWasteNWtSum('');
    }else{
      setcompactorWasteNWtSum(sum2);
    }
    }, [rows]);
  useEffect(() => {
    const sum2 = rows.reduce((total, row) => {
      const value = parseFloat(row.NoofBag2) || 0; 
      return total + value;
    }, 0);
    if(sum2<=0){
      setswwsWasteNoOfBagsSum('');
    }else{
      setswwsWasteNoOfBagsSum(sum2);
    }
   }, [rows]);
  useEffect(() => {
    const sum2 = rows.reduce((total, row) => {
      const value = parseFloat(row.netWeight2) || 0; 
      return total + value;
    }, 0);
    if(sum2<=0){
      setswwsWasteNWtSum('');
    }else{
      setswwsWasteNWtSum(sum2);
    }
     }, [rows]);
  useEffect(() => {
    const sum2 = rows.reduce((total, row) => {
      const value = parseFloat(row.netWeight3) || 0; 
      return total + value;
    }, 0);
    if(sum2<=0){
      setswwsWasteTotalWtSum('');
    }else{
      setswwsWasteTotalWtSum(sum2);
    }
    }, [rows]);
  useEffect(() => {
    const sum2 = rows.reduce((total, row) => {
      const value = parseFloat(row.NoofBag3) || 0; 
      return total + value;
    }, 0);
    if(sum2<=0){
      setexfolatingWasteNoOfBagsSum('');
    }else{
      setexfolatingWasteNoOfBagsSum(sum2);
    }
    }, [rows]);
  useEffect(() => {

    const sum2 = rows.reduce((total, row) => {
      const value = parseFloat(row.netWeight4) || 0; 
      return total + value;
    }, 0);
    if(sum2<=0){
      setexfolatingWasteNWtSum('');
    }else{
      setexfolatingWasteNWtSum(sum2);
    }

    const sum3 = rows.reduce((total, row) => {
      const value = parseFloat(row.microWasteNoOfBags) || 0; 
      return total + value;
    }, 0);
    if(sum3<=0){
      setMicroBagCount('');
    }else{
      setMicroBagCount(sum3);
    }

    const sum4 = rows.reduce((total, row) => {
      const value = parseFloat(row.microWasteTotalWt) || 0; 
      return total + value;
    }, 0);
    if(sum4<=0){
      setMicroWeightCount('');
    }else{
      setMicroWeightCount(sum4);
    }
    
  
    }, [rows]);

  // const handleInputChange = (value, index, field) => {
  //   const newRows = [...rows];
  //   newRows[index][field] = value; 
  //   setRows(newRows); 
  // };
    // const handleAddRow = () => {
    //   setRows([...rows, { orderNumber: '' }]);
    // };

    // const handleDeleteRow = (index) => {
    //   const updatedRows = rows.filter((_, i) => i !== index);
    //   setRows(updatedRows);};
  const disabled= (roleauth === "ROLE_SUPERVISOR" &&
    cottonWasteReport?.supervisor_status ===
      "SUPERVISOR_APPROVED" &&
      cottonWasteReport?.hod_status === "WAITING_FOR_APPROVAL") ||
      cottonWasteReport?.hod_status === "HOD_APPROVED" ||
  (roleauth === "ROLE_HOD" &&
    (cottonWasteReport?.hod_status === "WAITING_FOR_APPROVAL" ||
      cottonWasteReport?.hod_status === "HOD_APPROVED" ||
      cottonWasteReport?.hod_status === "HOD_REJECTED")) ||
  (roleauth === "ROLE_DESIGNEE" &&
    (cottonWasteReport?.hod_status === "WAITING_FOR_APPROVAL" ||
      cottonWasteReport?.hod_status === "HOD_APPROVED" ||
      cottonWasteReport?.hod_status === "HOD_REJECTED"))

// Formated Dates
  const formattedDate = () => {
    if (cottonWasteReport?.hod_submit_on) {
      const date = moment(cottonWasteReport?.hod_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };
  const formattedDatesupervisor = () => {
    if ( cottonWasteReport?.supervisor_submit_on) {
      const date = moment( cottonWasteReport?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };

// Display Button Based on Role Status
const canDisplayButtons = () => {
  if (roleauth == "ROLE_SUPERVISOR") {
    if (
      cottonWasteReport?.supervisor_status == "SUPERVISOR_APPROVED" &&
      cottonWasteReport?.hod_status == "HOD_REJECTED"
    ) {
      return "block";
    } else if (
      (cottonWasteReport?.supervisor_status == "SUPERVISOR_APPROVED" &&
        cottonWasteReport?.hod_status == "WAITING_FOR_APPROVAL") ||
        cottonWasteReport?.hod_status == "HOD_APPROVED"
    ) {
      return "none";
    }
  } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
    if (
      cottonWasteReport?.hod_status == "HOD_APPROVED" ||
      cottonWasteReport?.hod_status == "HOD_REJECTED" ||
      emptyarraycheck == 0
    ) {
      return "none";
    }
    return "block";
  } else {
    if (
      cottonWasteReport?.hod_status == "HOD_APPROVED" ||
      cottonWasteReport?.hod_status == "HOD_REJECTED"
    ) {
      return "none";
    }
    return "block";
  }
};
const canDisplayButton2 = () => {
  if (roleauth == "ROLE_SUPERVISOR") {
    if (
      cottonWasteReport?.supervisor_status == "SUPERVISOR_APPROVED" &&
      cottonWasteReport?.hod_status == "HOD_REJECTED"
    ) {
      return "none"; 
    } else if (
      cottonWasteReport?.supervisor_status == "SUPERVISOR_APPROVED" &&
      (cottonWasteReport?.hod_status == "WAITING_FOR_APPROVAL" ||
        cottonWasteReport?.hod_status == "HOD_APPROVED")
    ) {
      return "none";
    }
  } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
    if (
      cottonWasteReport?.hod_status == "HOD_APPROVED" ||
      cottonWasteReport?.hod_status == "HOD_REJECTED" ||
      emptyarraycheck == 0
    ) {
      return "none"; 
    }
    return "block"; 
  } else {
    if (
      cottonWasteReport?.hod_status == "HOD_APPROVED" ||
      cottonWasteReport?.hod_status == "HOD_REJECTED"
    ) {
      return "none"; 
    }
    return "block"; 
  }
};
const canDisplayAddDelete= () => {
  if (roleauth == "ROLE_HOD"||roleauth == "ROLE_DESIGNEE") {
    return "none";
  }
};
const handleRejectModal = () => {
  setShowModal(true);
   // console.loglog("print screen works");
 };
const handleApprove = async () => {
  setSaveLoading(true);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", 
  };

  const res = await axios.put(`${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseWasteReportSpunlace/approveOrReject`,
    {
      id : reportId,
      status: "Approve"
  },
      { headers }
    )
    .then((res) => {
      // console.loglog("messsage", res);
      message.success(res.data.message);
      navigate("/Precot/Spunlace/F-19/Summary");
    })
    .catch((err) => {
      // console.loglog("Err", err.response.data.message);
      message.error(err.response.data.message);
    })
    .finally(() => {
      setSaveLoading(false);
    });
};

// Save & Submit Api
  const handleSave = async () => {
    try {
      await saveShiftWiseCottonWasteReport();
    } catch (error) {
      console.error("Error saving Logbook - Spunlace Planning:", error);
    }

  };
  const handleSubmit = async () => {

    try {
      await submitShiftWiseCottonWasteReport();
    } catch (error) {
      console.error("Error submitting Logbook - Spunlace Planning:", error);
    }

  };

  const saveShiftWiseCottonWasteReport = async () => {
    setSaveLoading(true);
      try {
      const payload = {
        reportId:reportId,
        formatName: "SHIFT WISE COTTON WASTE REPORT OF SPUNLCAE ",
        formatNo: "PH-PRD02/F-019",
        revisionNo: 1,
        refSopNo: "PH-PRD02-D-03",
        unit: "H",
        date: date,
        shift:shift,
        reportDetails: rows.map((row) => ({
          compactorWasteNoOfBags: row.NoofBag1,
          compactorWasteNWt: row.netWeight1,
          swwsWasteNoOfBags: row.NoofBag2,
          swwsWasteNWt: row.netWeight2,
          swwsWasteTotalWt: row.netWeight3,
          exfolatingWasteNoOfBags: row.NoofBag3,
          exfolatingWasteNWt: row.netWeight4,
          microWasteNoOfBags : row.microWasteNoOfBags,
          microWasteTotalWt : row.microWasteTotalWt,
          remarks: row.remarks,
         
        })),
        compactorWasteNoOfBagsSum:compactorWasteNoOfBagsSum,
        compactorWasteNWtSum: compactorWasteNWtSum,
        swwsWasteNoOfBagsSum: swwsWasteNoOfBagsSum,
        swwsWasteNWtSum: swwsWasteNWtSum,
        swwsWasteTotalWtSum: swwsWasteTotalWtSum,
        exfolatingWasteNoOfBagsSum: exfolatingWasteNoOfBagsSum,
        exfolatingWasteNWtSum: exfolatingWasteNWtSum

              
     };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseWasteReportSpunlace/SaveShiftWiseWasteReport`,
        payload,
        { headers }
      );
      setTimeout(() => {
        navigate('/Precot/Spunlace/F-19/Summary');
      }, 1500)

      message.success('Shift wise Cotton Waste Report Saved Successfully..');


    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save Shift wise Cotton Waste Report !!");

    } finally {
       setSaveLoading(false);
    }
  };
  
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseWasteReportSpunlace/approveOrReject`,
        {
          id: reportId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.loglog("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-19/Summary");
      })
      .catch((err) => {
        // console.loglog("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  const submitShiftWiseCottonWasteReport = async () => {
    setSubmitLoading(true)
    try {
    const payload = {
      reportId:reportId,
        formatName: "SHIFT WISE COTTON WASTE REPORT OF SPUNLCAE ",
        formatNo: "PH-PRD02/F-019",
        revisionNo: 1,
        refSopNo: "PH-PRD02-D-03",
        unit: "H",
        date: date,
        shift:shift,
        reportDetails: rows.map((row) => ({
          compactorWasteNoOfBags: row.NoofBag1,
          compactorWasteNWt: row.netWeight1,
          swwsWasteNoOfBags: row.NoofBag2,
          swwsWasteNWt: row.netWeight2,
          swwsWasteTotalWt: row.netWeight3,
          exfolatingWasteNoOfBags: row.NoofBag3,
          exfolatingWasteNWt: row.netWeight4,
          microWasteNoOfBags : row.microWasteNoOfBags,
          microWasteTotalWt : row.microWasteTotalWt,
          remarks: row.remarks,
         
        })),
        compactorWasteNoOfBagsSum:compactorWasteNoOfBagsSum,
        compactorWasteNWtSum: compactorWasteNWtSum,
        swwsWasteNoOfBagsSum: swwsWasteNoOfBagsSum,
        swwsWasteNWtSum: swwsWasteNWtSum,
        swwsWasteTotalWtSum: swwsWasteTotalWtSum,
        exfolatingWasteNoOfBagsSum: exfolatingWasteNoOfBagsSum,
        exfolatingWasteNWtSum: exfolatingWasteNWtSum

 
    };

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };


    const response = await axios.post(
      `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseWasteReportSpunlace/SubmitShiftWiseWasteReport`,
      payload,
      { headers }
    );
  
    setTimeout(() => {
      navigate('/Precot/Spunlace/F-19/Summary');
    }, 1500)

    message.success(response.data.message);


  } catch (error) {
    console.error("Error:", error);
    message.error(error.response.data.message);

    throw new Error("Failed to submit Shift wise Cotton Waste Report!!");

  } finally {
    setSubmitLoading(false);
  }
};

 
 const handleBack = () => {
    navigate("/Precot/Spunlace/F-19/Summary");
  };

  useEffect(() => {
    fetchDetailsByDateAndShift();
  }, []);
 
 const fetchDetailsByDateAndShift = async () => {
    try {
        const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseWasteReportSpunlace/findByDateShift?date=${date}&shift=${shift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

        }
      );
      // console.loglog("response (details based on date & Shift)", response.data);
      setemptyarraycheck(response.data.length);
      setcottonWasteReport(response.data);
      if(((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.supervisor_status !=="SUPERVISOR_APPROVED"))||((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.hod_status =="HOD_REJECTED"))){
        message.error("Supervisor Yet Not Approved");
        setTimeout(() => {
         navigate('/Precot/Spunlace/F-19/Summary');
       }, 1500)
    }
      // console.loglog("seted planing response",cottonWasteReport);
       
     if (response.data) {

        const data = response.data;
        // console.loglog("set response date for all fields", data)
        setreportId(data.reportId);

             
          if (data && data.reportDetails) {
            setRows(
              data.reportDetails.map((item) => ({
                  NoofBag1: item.compactorWasteNoOfBags ? item.compactorWasteNoOfBags : 0,
                  netWeight1: item.compactorWasteNWt ? item.compactorWasteNWt : 0,
                  NoofBag2: item.swwsWasteNoOfBags ? item.swwsWasteNoOfBags : 0,
                  netWeight2: item.swwsWasteNWt ? item.swwsWasteNWt : 0,
                  netWeight3: item.swwsWasteTotalWt ? item.swwsWasteTotalWt : 0,
                  netWeight4: item.exfolatingWasteNWt ? item.exfolatingWasteNWt : 0,
                  NoofBag3: item.exfolatingWasteNoOfBags ? item.exfolatingWasteNoOfBags : 0,
                  microWasteNoOfBags : item.microWasteNoOfBags ? item.microWasteNoOfBags : 0,
                  microWasteTotalWt : item.microWasteTotalWt ? item.microWasteTotalWt : 0 ,
                  remarks: item.remarks ? item.remarks : 'N/A',  
              }))
          );
        
          setcompactorWasteNoOfBagsSum(data.compactorWasteNoOfBagsSum?data.compactorWasteNoOfBagsSum:'0');
          setcompactorWasteNWtSum(data.compactorWasteNWtSum?data.compactorWasteNWtSum:'0');
          setswwsWasteNoOfBagsSum(data.swwsWasteNoOfBagsSum?data.swwsWasteNoOfBagsSum:'0');
          setswwsWasteNWtSum(data.swwsWasteNWtSum?data.swwsWasteNWtSum:'0');
          setswwsWasteTotalWtSum(data.swwsWasteTotalWtSum?data.swwsWasteTotalWtSum:'0');
          setexfolatingWasteNoOfBagsSum(data.exfolatingWasteNoOfBagsSum?data.exfolatingWasteNoOfBagsSum:'0');
          setexfolatingWasteNWtSum(data.exfolatingWasteNWtSum?data.exfolatingWasteNWtSum:'0');
          
        } else {
          setRows([]);
          // if(data && data.message==="No data"){
          //   setRows([...rows, { orderNumber: '' }]);
          // }
        } 
     
      } else {

      }
    } catch (error) {
      console.error('Error checking BMR existence:', error);
      message.error(error.message);
    } finally {

    }

  };
  const [showTooltip, setShowTooltip] = useState(false);
  // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const handleInputChange = (value, index, field) => {
    const newRows = [...rows]; // Create a shallow copy of the rows
    const actualIndex = indexOfFirstRow + index; // Calculate the actual index in the original array

    // Validate and set the value
    
      newRows[actualIndex] = { ...newRows[actualIndex], [field]: value }; // Create a new object for the row
      setRows(newRows); // Update the state

  };

  const handleAddRow = () => {
    setRows([...rows, { NoofBag1: '', netWeight1: '', NoofBag2: '', netWeight2: '', netWeight3: '', NoofBag3: '', netWeight4: '', remarks: '' , microWasteTotalWt : '' , microWasteNoOfBags : '' }]);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(rows.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this row?");
  
    if (confirmDelete) {
    const actualIndex = indexOfFirstRow + index; 
    const updatedRows = rows.filter((_, i) => i !== actualIndex);
    setRows(updatedRows);
    }
  };
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  const items = [
    {
      key: "1",
      label: <p>Cotton Waste Report</p>,
      children: (
        <div>
            {/* colums = 104 */}
            
          <table  style={{ width: "100%", margin: "auto" }}>
          <thead>
            <tr>
              <th colSpan="1" style={{width:"40px", border:"none"}}></th>
                <th colSpan="24" style={{textAlign:"center" ,height:"30px"}}>COMPACTOR WASTE IN KGS</th>
                <th colSpan="36" style={{textAlign:"center"}}>SWWS WASTE IN KGS</th>
                <th colSpan="24" style={{textAlign:"center"}}>EXFOLATING WASTE IN KGS</th>
                <th colSpan="24" style={{textAlign:"center"}}>MICRO WASTE IN KGS</th>


                
            </tr>
            <tr>
            <th colSpan="1" style={{width:"40px", border:"none"}}></th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>NO OF BAG</th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>NET WEIGHT</th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>NO BAGS</th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>NET WEIGHT</th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>TOTAL WEIGHT</th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>NO OF BAG</th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>NET WEIGHT</th>              
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>NO OF BAG</th>              
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>TOTAL WEIGHT</th>              
            </tr>
            </thead>
            <tbody>
            {currentRows.map((row, index) => (
            <tr key={index}>
              <th colSpan="1" style={{width:"40px", border:"none"}}></th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>  <input
                type="number"
                className="inp-new"
                style={{width:"98%", border:"none",height: '35px',paddingLeft:"2px"}}
                value={row.NoofBag1}
                max={0}
                onChange={(e) => handleInputChange(e.target.value, index, 'NoofBag1')}
                onKeyDown={(e) => handleKeyDown2(e, indexOfFirstRow + index, 'NoofBag1')}
                disabled={disabled}
                title="Enter the Whole Number" 
              /></th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input
                type="number"
                className="inp-new"
                style={{width:"98%", border:"none",height: '35px',paddingLeft:"2px"}}
                value={row.netWeight1}
                  onChange={(e) => handleInputChange(e.target.value, index, 'netWeight1')}
                  onKeyDown={(e) => handleKeyDown(e, index, 'netWeight1')}
                disabled={disabled}
              />
            </th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input
                type="number"
                className="inp-new"
                style={{width:"98%", border:"none",height: '35px',paddingLeft:"2px"}}
                value={row.NoofBag2}
                  onChange={(e) => handleInputChange(e.target.value, index, 'NoofBag2')}
                  onKeyDown={(e) => handleKeyDown2(e, index, 'NoofBag2')}
                disabled={disabled}
                title="Enter the Whole Number" 
              />
            </th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input
                type="number"
                className="inp-new"
                style={{width:"98%", border:"none",height: '35px',paddingLeft:"2px"}}
                value={row.netWeight2}
                  onChange={(e) => handleInputChange(e.target.value, index, 'netWeight2')}
                  onKeyDown={(e) => handleKeyDown(e, index, 'netWeight2')}
                disabled={disabled}
              />
            </th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input
                type="number"
                className="inp-new"
                style={{width:"98%", border:"none",height: '35px',paddingLeft:"2px"}}
                value={row.netWeight3}
                  onChange={(e) => handleInputChange(e.target.value, index, 'netWeight3')}
                  onKeyDown={(e) => handleKeyDown(e, index, 'netWeight3')}
                disabled={disabled}
              />
            </th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input
                type="number"
                className="inp-new"
                style={{width:"98%", border:"none",height: '35px',paddingLeft:"2px"}}
                value={row.NoofBag3}
                onChange={(e) => handleInputChange(e.target.value, index, 'NoofBag3')}
                onKeyDown={(e) => handleKeyDown2(e, index, 'NoofBag3')}
                disabled={disabled}
                title="Enter the Whole Number" 
              />
            </th>
           
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input
                type="number"
                className="inp-new"
                style={{width:"98%", border:"none",height: '35px',paddingLeft:"2px"}}
                value={row.netWeight4}
                onChange={(e) => handleInputChange(e.target.value, index, 'netWeight4')}
                onKeyDown={(e) => handleKeyDown(e, index, 'netWeight4')}
                disabled={disabled}
              /></th>  
                          <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input
                type="number"
                className="inp-new"
                style={{width:"98%", border:"none",height: '35px',paddingLeft:"2px"}}
                value={row.microWasteNoOfBags}
                onChange={(e) => handleInputChange(e.target.value, index, 'microWasteNoOfBags')}
                onKeyDown={(e) => handleKeyDown2(e, index, 'microWasteNoOfBags')}
                disabled={disabled}
                title="Enter the Whole Number" 
              />
            </th>
           
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input
                type="number"
                className="inp-new"
                style={{width:"98%", border:"none",height: '35px',paddingLeft:"2px"}}
                value={row.microWasteTotalWt}
                onChange={(e) => handleInputChange(e.target.value, index, 'microWasteTotalWt')}
                onKeyDown={(e) => handleKeyDown(e, index, 'microWasteTotalWt')}
                disabled={disabled}
              /></th>  
               <td
              colSpan="1"
              style={{ height: '35px', textAlign: 'center', cursor: 'pointer', size:"40px" , border:"none" ,display:canDisplayAddDelete()}}
              onClick={() => handleDeleteRow(index)} 
            >
               <DeleteOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
            </td>              
            </tr>
                ))}
                </tbody>
                <tfoot>
            <tr>
            <th colSpan="1" style={{width:"40px", border:"none"}}>Total:</th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px" , fontWeight:"bold"}}><input value={compactorWasteNoOfBagsSum} onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setcompactorWasteNoOfBagsSum(value); 
                }
              }} inputMode="numeric" className="inp-new" style={{  height: '35px', border: "none" ,fontWeight: "bold"}} disabled 
              title="Total Field"  ></input></th>
             
          <th colSpan="12" style={{ textAlign: "center", height: "30px", position: 'relative' }}>
            <input
              value={compactorWasteNWtSum}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setcompactorWasteNWtSum(value);
                }
              }}
              inputMode="numeric"
              className="inp-new"
              style={{ height: '35px', border: "none",position: 'relative', display: 'inline-block',fontWeight: "bold" }}
             disabled             
             title="Total Field"  
            />
            
          </th>
        
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input value={swwsWasteNoOfBagsSum} onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setswwsWasteNoOfBagsSum(value); 
                }
              }} inputMode="numeric" className="inp-new" style={{  height: '35px', border: "none" ,fontWeight: "bold"}} disabled 
              title="Total Field"  ></input>
            </th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input value={swwsWasteNWtSum} onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setswwsWasteNWtSum(value); 
                }
              }} inputMode="numeric" className="inp-new" style={{  height: '35px', border: "none",fontWeight: "bold" }} disabled 
              title="Total Field"  ></input>
            </th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input value={swwsWasteTotalWtSum} onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setswwsWasteTotalWtSum(value); 
                }
              }} inputMode="numeric" className="inp-new" style={{  height: '35px', border: "none",fontWeight: "bold" }} disabled 
              title="Total Field"  ></input>
            </th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input value={exfolatingWasteNoOfBagsSum} onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setexfolatingWasteNoOfBagsSum(value); 
                }
              }} inputMode="numeric" className="inp-new" style={{  height: '35px', border: "none",fontWeight: "bold" }} disabled 
              title="Total Field"  ></input>
            </th>
            <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>
            <input value={exfolatingWasteNWtSum} onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setexfolatingWasteNWtSum(value); 
                }
              }} inputMode="numeric" className="inp-new" style={{  height: '35px', border: "none",fontWeight: "bold" }} disabled 
              title="Total Field"  ></input></th>    
              <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>{microBagCount}</th>         
              <th colSpan="12" style={{textAlign:"center" ,height:"30px"}}>{microWeightCount}</th>         
            </tr>
            </tfoot>   
          </table>
          
          <button
        onClick={handleAddRow}
        style={{
          backgroundColor: 'green',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          fontSize: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'5px',
          display:canDisplayAddDelete()     
        }}
      
      >
        <PlusOutlined style={{ marginRight: '8px' }} />
        Add Row
      </button>
        {/* Pagination Controls */}
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}  style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",borderRadius:"10px", padding:"5px"}} shape="circle">Previous</button>
        <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(rows.length / rowsPerPage)} style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",borderRadius:"10px", padding:"5px"}} shape="round">Next</button>
      </div>
     
        </div>
      ),
    },  {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div> 
          <table style={{ width: "100%", margin: "auto" }}>
            <tr >
              {/* <td colSpan="34" style={{ height: "35px", textAlign: "center" }}>Performed by Operator</td> */}
              <td colSpan="50" style={{ textAlign: "center" ,height:"30px" }}>Production Supervisor Sign & Date</td>
              <td colSpan="50" style={{ textAlign: "center" }}>HOD / Designee Sign & Date</td>

            </tr>
            <tr >
              {/* <td colSpan="50" style={{ textAlign: "center",height:"100px" }}>{cottonWasteReport.supervisor_sign}<br/>{formattedDatesupervisor()}
              </td> */}
                          <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {cottonWasteReport?.supervisor_status === "SUPERVISOR_APPROVED" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{cottonWasteReport?.supervisor_sign}</div>
                        <div>{formattedDatesupervisor()}</div>
                      </div>
                      {getImage1 && (
                      <img
                        src={getImage1}
                        alt="Supervisor Sign"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      /> )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>
              {/* <td colSpan="50" style={{ textAlign: "center"}}>{cottonWasteReport.hod_sign}<br/>{formattedDate()}
              </td> */}
                <td
                colSpan="50"
                style={{ textAlign: "center", 
                // verticalAlign: "bottom" 
                }}
              >
                {(cottonWasteReport?.hod_status === "HOD_REJECTED" || 
                cottonWasteReport?.hod_status === "HOD_APPROVED") && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          {" "}
                          <div>{cottonWasteReport.hod_sign}</div>
                          <div>{formattedDate()}</div>
                        </div>
                        {getImage2 && (
                        <img
                          src={getImage2}
                          alt="HOD Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        /> )}
                      </div>                    </>
                  )}
              </td>

            </tr>

          </table>
        </div>
      ),
    }]


  return (
    <div>
      <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
          <BleachingHeader
        unit="Unit-H"
        formName="SHIFT WISE COTTON WASTE REPORT OF SPUNLACE "
        formatNo="PH-PRD02/F-019"
        sopNo="PPH-PRD02-D-03"
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
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
          </Button>,

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
                icon={ <img src={approveIcon} alt="Approve Icon" />}
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
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButton2(),
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
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
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),

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

      {/* date row */}
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '10px', marginTop: '20px' ,marginLeft:"10px"}}>
        <Input
            addonBefore="Date:"
            placeholder="Date"
             type="date"
            value={date}
            disabled
            style={{ width: '20%', height: '35px' }}
        />
        <Input
            addonBefore="Shift:"
            placeholder="Shift"  
            value={shift}
            disabled
            style={{ width: '20%', height: '35px' }}
        />

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
              rows={4} 
              style={{ width: "100%" }} 
            />
          </div>
        </Modal>

      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />

    </div>
  )
}

export default Spunlace_f19

