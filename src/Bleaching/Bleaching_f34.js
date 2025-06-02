/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, message, Select, Tooltip, Tabs, Input } from "antd";
import { IoSave, IoPrint } from 'react-icons/io5';
import { GrDocumentStore } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import BleachingHeader from '../Components/BleachingHeader.js';
import { GoArrowLeft } from "react-icons/go";
import BleachingTail from "../Components/BleachingTail.js";

import "../index.css";
import API from "../baseUrl.json";
import {   IoCreate } from 'react-icons/io5';
import { Table, Modal,DatePicker ,Form, Drawer, Menu, Avatar,Row,Col} from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from 'react-icons/bi';
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";


const { Option } = Select;
const { TabPane } = Tabs;

function Bleach_f34() {
  const location = useLocation();
  const { bmrNoParam } = location.state;
  const [rows, setRows] = useState({});
  const [mixingOptions, setMixingOptions] = useState([]);
  const [baleOptions, setBaleOptions] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);
  
  const [selectedRow, setSelectedRow] = useState("");
  const [formStatus, setFormStatus] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [printStatus, setPrintStatus] = useState(true);
  const [workingArea, setWorkingArea] = useState(""); // State for Working Area
  const [totalWeight, setTotalWeight] = useState("");
  const [statusLoader, setStatusLoader] = useState(false);
  const [bales,setBales]=useState('');
  const [weight,setWeight]=useState('');
  const role=localStorage.getItem("role")
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [Id, setId] = useState("");
  const [open, setOpen] = useState(false);
   const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = rows?.supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [rows, API.prodUrl]);
 
  const [getImage1, setGetImage1] = useState("");
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username =rows?.hod_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [rows, API.prodUrl]);
 
  // console.log("get image", getImage);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const numberOptions = Array.from({ length: 21 }, (_, index) => 40 + index);


  
  const roleauth=localStorage.getItem("role")

  const canEdit = () => {
    if (roleauth === "ROLE_OPERATOR") {
      return !(
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED" &&
        selectedRow?.hod_status !== "HOD_REJECTED"
      );
    } else if (roleauth === "ROLE_SUPERVISOR") {
      return !(
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        (selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
          selectedRow?.supervisor_status === "WAITING_FOR_APPROVAL") &&
        selectedRow?.hod_status === "WAITING_FOR_APPROVAL" || "HOD_APPROVED"
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        selectedRow &&
        (selectedRow?.hod_status === "HOD_APPROVED" ||
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status === "HOD_REJECTED")
      );
    } else {
      return false;
    }
  };
  const isEditable = canEdit();

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" 
        
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" 
        
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  const handleWorkingAreaChange = (e) => {
    setWorkingArea(e.target.value); // Update workingArea state with input value
    setRows(prevRows => ({
      ...prevRows,
      working_area: e.target.value // Update rows state with working_area
    }));
  };

  // Function to handle changes in No of Bales input
  const handleTotalWeight = (e) => {
    setTotalWeight(e.target.value); // Update totalWeight state with input value
    setRows(prevRows => ({
      ...prevRows,
      total_weight: e.target.value // Update rows state with total_weight
    }));
  };

    useEffect(() => {
      const fetchMixingOptions = async () => {
        try {
          const mapLaydownResponse = await axios.get(
            `${ API.prodUrl}/Precot/api/bleaching/generation/getMapLaydown?MappingBmr_No=${bmrNoParam}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );

          if (mapLaydownResponse.data.length > 0) {
            const jobOrderNo = mapLaydownResponse.data[0].job_order_no;

            const mixingResponse = await axios.get(
              `${ API.prodUrl}/Precot/api/bleaching/generation/getMixingLov?orderNo=${jobOrderNo}`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );

            setMixingOptions(mixingResponse.data.map(option => ({
              label: option.mix,
              value: option.mix
            })));
          } else {
            console.error('No data found for job order number');
          }

          if (mapLaydownResponse.data.length > 0) {
            const laydownNo = mapLaydownResponse.data[0].laydown_no;

            const baleResponse = await axios.get(
              `${ API.prodUrl}/Precot/api/bleaching/generation/rawCotton?laydown_no=${laydownNo}`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );

            const totalBales = baleResponse.data.length > 0 ? baleResponse.data[0].totalBales : "N/A";
            // console.log(totalBales)
            setRows(prevRows => ({
              ...prevRows,
              no_of_bales: totalBales || "N/A",
            }));

          } else {
            console.error('No data found for laydown number');
          }
          if (mapLaydownResponse.data.length > 0) {
            const laydownNo = mapLaydownResponse.data[0].laydown_no;

            const weightResponse = await axios.get(
              `${ API.prodUrl}/Precot/api/bleaching/generation/rawCotton?laydown_no=${laydownNo}`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );

            setWeightOptions(weightResponse.data.map(option => ({
              label: option.totalWeight,
              value: option.totalWeight
            })));
            const totalWeight = weightResponse.data.length > 0 ? weightResponse.data[0].totalWeight: "N/A";
            setRows(prevRows => ({
              ...prevRows,
              total_weight: totalWeight || "N/A",
            }));
          } else {
            console.error('No data found for laydown number');
          }
        } catch (error) {
          console.error('Error fetching options:', error);
        }
      };

      fetchMixingOptions();
    }, [bmrNoParam, token]);



  // useEffect(() => {
  //   const fetchBaleOptions = async () => {
  //     try {
  //       const response = await axios.get(`${ API.prodUrl}/Precot/api/Bleaching/Service/CRUD/GetBaleNo`, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  //       setBaleOptions(response.data);
  //     } catch (error) {
  //       console.error('Error fetching Mixing options:', error);
  //     }
  //   };
  //   fetchBaleOptions();
  // }, [bmrNoParam, token]);
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/bleach/bleachequipmentusagelogbookf34ByBmrNo?bmrNumber=${bmrNoParam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // console.log("Fetched Data:", response.data);

        setSelectedRow(response.data)
        setId(response.data.equipb_id)
        if (
          userRole == "ROLE_SUPERVISOR" &&
          (response.data.supervisor_status == "SUPERVISOR_APPROVED" ||
            response.data.hod_status == "HOD_APPROVED" ||
            response.data.hod_status == "DESIGNEE_APPROVED")
        ) {
          setFormStatus(true);
          // console.log("Form status worked for ROLE_SUPERVISOR");
        } else if (
          (userRole == "ROLE_HOD" || userRole == "ROLE_DESIGNEE") &&
          (response.data.hod_status == "HOD_APPROVED" || response.data.hod_status == "DESIGNEE_APPROVED")
        ) {
          setFormStatus(true);
          // console.log("Form status worked for ROLE_HOD or ROLE_DESIGNEE");
        } else {
          // console.log("Form status didn't work:", userRole, rows);
        }

        if (!response.data || (Array.isArray(response.data) && response.data.length === 0) || (typeof response.data === 'object' && Object.keys(response.data).length === 0)) {
          const addRow = {
            bmrNumber: bmrNoParam,
            unit: 'H',
            formatNo: 'PH-PRD01/F-005',
            formatName: 'Equipment Usage Log Book - Blow Room & Carding',
            sopNumber: 'PRD01-D-18',
            revisionNo: '02',
            remarks: '',
            mixing: '',
            no_of_bales: '',
            total_weight: '',
            working_area: '',
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
            mail_status: '',
            supervisor_status: '',
            supervisor_saved_on: '',
            supervisor_saved_by: '',
            supervisor_saved_id: '',
            supervisor_submit_on: '',
            supervisor_submit_by: '',
            supervisor_submit_id: '',
            supervisor_sign: '',
            hod_status: '',
            hod_saved_on: '',
            hod_saved_by: '',
            hod_saved_id: '',
            hod_submit_on: '',
            hod_submit_by: '',
            hod_submit_id: '',
            hod_sign: ''
          };
          setRows(addRow);
        } else {
          setRows(
            response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Ensure conditional formStatus logic is correctly scoped after rows update
  }, [bmrNoParam, token, userRole]);


  const handleApprove = async () => {
    setStatusLoader(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/bleach/approveOrRejectF34`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-34/Summary");
      })
      .catch((err) => {
        
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setStatusLoader(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if(!rejectRemarks) {
      message.warning('Please Enter the Remarks!');
      setSaveLoading(false);
      return;
    }


    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/bleach/approveOrRejectF34`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-34/Summary");
      })
      .catch((err) => {
        
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-34/Summary");
  };

  const handleTabChange = (key) => {
    // console.log("Current Tab:", key);
  };
  const handleTemperatureChange = (value) => {
    setRows(prevRows => ({ ...prevRows, temperature: value }));
  };
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setRows((prevRows) => ({
      ...prevRows,
      start_date: newStartDate,
      end_date: prevRows.end_date && new Date(prevRows.end_date) < new Date(newStartDate) ? '' : prevRows.end_date,
    }));
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (new Date(newEndDate) >= new Date(rows.start_date)) {
      setRows((prevRows) => ({
        ...prevRows,
        end_date: newEndDate,
      }));
    } else {
      // Optionally, show a message to the user if end_date is before start_date
      messageApi.warning('End date and time must be after start date');
    }
  };

  const handleSave = async () => {
    setStatusLoader(true);
    const payload = {
      bmrNumber: rows.bmrNumber,
      unit: rows.unit,
      formatNo: rows.formatNo,
      formatName: rows.formatName,
      sopNumber: rows.sopNumber,
      revisionNo: rows.revisionNo,
      remarks: rows.remarks || "N/A",
      mixing: rows.mixing,
      no_of_bales: rows.no_of_bales,
      total_weight: rows.total_weight,
      working_area: rows.working_area,
      start_date: rows.start_date,
      start_time: rows.start_time,
      end_date: rows.end_date,
      end_time: rows.end_time,
      mail_status: rows.mail_status,
      supervisor_status: rows.supervisor_status,
      supervisor_saved_on: rows.supervisor_saved_on,
      supervisor_saved_by: rows.supervisor_saved_by,
      supervisor_saved_id: rows.supervisor_saved_id,
      supervisor_submit_on: rows.supervisor_submit_on ,
      supervisor_submit_by: rows.supervisor_submit_by,
      supervisor_submit_id: rows.supervisor_submit_id,
      supervisor_sign: rows.supervisor_sign,
      hod_status: rows.hod_status,
      hod_saved_on: rows.hod_saved_on,
      hod_saved_by: rows.hod_saved_by,
      hod_saved_id: rows.hod_saved_id,
      hod_saved_on: rows.hod_saved_on ,
      hod_submit_by: rows.hod_submit_by,
      hod_submit_id: rows.hod_submit_id,
      hod_sign: rows.hod_sign,
      revisionNo: "02"
    }

    // console.log("id", rows.equipb_id)
    if (rows.equipb_id) {
      payload.equipb_id = rows.equipb_id
    }
    // console.log("payload", payload)
    try {
      const response = await axios.post( `${ API.prodUrl}/Precot/api/bleach/savebleachequipmentusagelogbookf34`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        messageApi.success("Data saved Succesfully!");
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/Bleaching/F-34/Summary");
        }, 1000);
      } else {
        setStatusLoader(false);
        messageApi.error(response.message);
      }
    } catch (error) {
      setStatusLoader(false);
      console.error("Error saving data:", error);
      messageApi.error(error.response.data.message);
    }
  };

  const itemsWA = [
    { key: '1', label: "WA1" },
    { key: '2', label: "WA2" }
  ];

  const handleSubmit = async () => {
    setStatusLoader(true);
    const payload = {
      bmrNumber: rows.bmrNumber,
      unit: rows.unit,
      formatNo: rows.formatNo,
      formatName: rows.formatName,
      sopNumber: rows.sopNumber,
      revisionNo: rows.revisionNo,
      remarks: rows.remarks || "N/A",
      mixing: rows.mixing,
      no_of_bales: rows.no_of_bales,
      total_weight: rows.total_weight,
      // no_of_bales: "34",
      // total_weight: "345.56",
      working_area: rows.working_area,
      start_date: rows.start_date,
      start_time: rows.start_time,
      end_date: rows.end_date,
      end_time: rows.end_time,
      mail_status: rows.mail_status,
      supervisor_status: rows.supervisor_status,
      supervisor_saved_on: rows.supervisor_saved_on,
      supervisor_saved_by: rows.supervisor_saved_by,
      supervisor_saved_id: rows.supervisor_saved_id,
      supervisor_submit_on: rows.supervisor_submit_on ,
      supervisor_submit_by: rows.supervisor_submit_by,
      supervisor_submit_id: rows.supervisor_submit_id,
      supervisor_sign: rows.supervisor_sign,
      hod_status: rows.hod_status,
      hod_saved_on: rows.hod_saved_on,
      hod_saved_by: rows.hod_saved_by,
      hod_saved_id: rows.hod_saved_id,
      hod_saved_on: rows.hod_saved_on,
      hod_submit_by: rows.hod_submit_by,
      hod_submit_id: rows.hod_submit_id,
      hod_sign: rows.hod_sign,
      revisionNo: "02"
    };
    // console.log("id", rows.equipc_id)
    if (rows.equipb_id) {
      payload.equipb_id = rows.equipb_id
    }
    // console.log("payload", payload)

    let isValid = true;


    if (rows.mixing == "") {
      messageApi.open({
        type: 'warning',
        content: 'Mixing Field is Required',
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }

    if (rows.no_of_bales == "") {
      messageApi.open({
        type: 'warning',
        content: 'No of Bales field is Required',
      });
      setStatusLoader(false);
      isValid = false;
      return;

    }
    if (rows.total_weight == "") {
      messageApi.open({
        type: 'warning',
        content: 'Total Weight Field is Required',
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }
    if (rows.working_area == "") {
      messageApi.open({
        type: 'warning',
        content: 'Working Area Field is Required',
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }
    if (rows.start_date == "") {
      messageApi.open({
        type: 'warning',
        content: 'Start Date and Time Required',
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }
    if (rows.end_date == "") {
      messageApi.open({
        type: 'warning',
        content: 'End Date And Time Required',
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }


    if (!isValid) {
      setStatusLoader(false);
      return;
    }

    try {
      const response = await axios.post(`${ API.prodUrl}/Precot/api/bleach/submitbleachequipmentusagelogbookf34`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        messageApi.success("Data Submitted successfully!");
        setFormStatus(true);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/Bleaching/F-34/Summary");
        }, 1000);
      }
    } catch (error) {
      setStatusLoader(false);
      console.error("Error saving data:", error);
      messageApi.error(error.response.data.message);
    }
  };

  const handleRemarksChange = (e) => {
    setRows(prevRows => ({ ...prevRows, remarks: e.target.value }));
  };

  const items = [
    { key: '1', label: "0.3" },
    { key: '2', label: "0.4" },
    { key: '3', label: "0.5" },
    { key: '4', label: "0.6" },
    { key: '5', label: "0.7" }
  ];

  const itemsMc = [
    { key: '1', label: "1,2,1" },
    { key: '2', label: "2,1,2" }
  ];

  return (
    <div className='form09-div' style={{
      letterSpacing: "0.4px",
      fontSize: "14px!important"
    }}>
      {contextHolder}
      <div className='bleachHeaderPrint'>
      
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
    role === "ROLE_QA"
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
          }
         ,
          {
            key: "5",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
          if (confirm("Are you sure want to logout")) {
            localStorage.removeItem("token");
            navigate("/Precot");
          }
        }}
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
      : role === "ROLE_SUPERVISOR" || role === "ROLE_HOD" || role === "ROLE_DESIGNEE"
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
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Chemical Issue
              </b>
            ),
            onClick: () => navigate("/Precot/RawMaterialIssue"),
          },
          {
            key: "5",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
          if (confirm("Are you sure want to logout")) {
            localStorage.removeItem("token");
            navigate("/Precot");
          }
        }}
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
                onClick={() => {
          if (confirm("Are you sure want to logout")) {
            localStorage.removeItem("token");
            navigate("/Precot");
          }
        }}
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
        <BleachingHeader
          formName={"EQUIPMENT USAGE LOGBOOK - BLOW ROOM AND CARDING"}
          formatNo={"PH-PRD01/F-005"}
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
            key="back"
            type="primary"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Back
          </Button>,
          ...(role === "ROLE_HOD" ||
      
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE" ? [
            <Button
              key="approve"
             // loading={saveLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display:canDisplayButtons(),
              }}
              onClick={handleApprove}
              shape="round"
              icon={ <img src={approveIcon} alt="Approve Icon" />}
            >
              &nbsp;Approve
            </Button>,
            <Button
              key="reject"
             // loading={saveLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display:canDisplayButtons(),
                
              }}
              icon={<img src={rejectIcon} alt="Reject Icon" />}
               onClick={handleRejectModal}
              shape="round"
            >
              &nbsp;Reject
            </Button>
          ] : [
            <Button
              key="save"
             loading={statusLoader}
              type="primary"
              onClick={handleSave}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display:canDisplayButton2(),
              }}
              shape="round"
              icon={<IoSave color="#00308F" />}
            >
              Save
            </Button>,
            <Button
              key="submit"
              loading={statusLoader}
              type="primary"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButtons(),
              }}
              icon={<GrDocumentStore color="#00308F" />}
              shape="round"
            >
              Submit
            </Button>
          ]),
          <Button
            key="logout"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiLock color="#00308F" />}
            onClick={() => {
              if (window.confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                navigate("/Precot"); // Ensure navigate is defined or imported
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user-info"
            trigger="click"
            style={{ backgroundColor: "#fff" }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#E5EEF9" }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,
          <Modal
            key="reject-modal"
            title="Reject"
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
            footer={[
              <Button
                key="submit-reject"
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
  
            ]}
        />
      </div>
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Equipment Usage Log" key="1">
          <div className="table-container">
            <table className="logbook-table" style={{
              width: '90%', marginTop: '5px', borderCollapse: 'collapse', letterSpacing: "0.4px", marginLeft: "auto",
              marginRight: "auto",
              fontSize: "14px"
            }}>
              <thead>
                <tr style={{
                  letterSpacing: "0.4px",
                  fontSize: "14px"
                }}>
                  <th style={{
                    height: "40px", fontWeight: "bold", letterSpacing: "0.4px",
                    fontSize: "14px", border: "1px solid black"
                  }}>S.No</th>
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>BMR No</th>
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>Mixing</th>
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>No Of <br></br> Bales</th>
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>Total <br></br>Weight <br />(in Kg)</th>
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>Working Area</th>
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>Start date & Time</th>
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>End date & Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="form-09" style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", fontWeight: "normal" }}>1</td>
                  <td className="form-09" style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", fontWeight: "normal" }}>{rows.bmrNumber}</td>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", fontWeight: "normal" }}>
                    <Select
                      style={{ width: "100%" }}
                      value={rows.mixing || "Select Mixing"}
                      className="custom-select"
                      showSearch
                      disabled={
                        (roleauth === "ROLE_SUPERVISOR" &&
                          selectedRow?.supervisor_status ===
                            "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        (roleauth === "ROLE_HOD" &&
                          (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                            selectedRow?.hod_status === "HOD_APPROVED" ||
                            selectedRow?.hod_status === "HOD_REJECTED")) ||
                        (roleauth === "ROLE_DESIGNEE" &&
                          (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                            selectedRow?.hod_status === "HOD_APPROVED" ||
                            selectedRow?.hod_status === "HOD_REJECTED"))
                      }
                      onChange={(value) => setRows(prevRows => ({ ...prevRows, mixing: value }))}
                      dropdownStyle={{ border: "none" }}
                    >
                      {mixingOptions.map(option => (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                      ))}
                    </Select>
                  </td>
                  <td className="form-09" style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", fontWeight: "normal" }}>
                    {rows.no_of_bales}
                  </td>
                  <td className="form-09" style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", fontWeight: "normal" }}>
                    {/* <Input
        placeholder="Total Weight In KG"
        value={rows.total_weight}
        onChange={handleTotalWeight}
        style={{ width: "100%"}}
      /> */}
                    {rows.total_weight}

                  </td>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", fontWeight: "normal" }}>
                    {/* <Input
                        placeholder="Working Area"
                        value={rows.working_area}
                        onChange={handleWorkingAreaChange}
                        style={{ width: "100%"}}
                    />   */}
                    <Select
                      value={rows.working_area || "Working Area"}
                      className="custom-select"
                      disabled={
                        (roleauth === "ROLE_SUPERVISOR" &&
                          selectedRow?.supervisor_status ===
                            "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        (roleauth === "ROLE_HOD" &&
                          (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                            selectedRow?.hod_status === "HOD_APPROVED" ||
                            selectedRow?.hod_status === "HOD_REJECTED")) ||
                        (roleauth === "ROLE_DESIGNEE" &&
                          (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                            selectedRow?.hod_status === "HOD_APPROVED" ||
                            selectedRow?.hod_status === "HOD_REJECTED"))
                      }
                      showSearch
                      onChange={(value) => setRows(prevRows => ({ ...prevRows, working_area: value }))}
                    >
                      {itemsWA.map(option => (
                        <Option key={option.key} value={option.label}>{option.label}</Option>
                      ))}
                    </Select>

                  </td>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", fontWeight: "normal" }}>
                    <input
                      type="datetime-local"
                      onChange={handleStartDateChange}
                      pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}"
                      value={rows.start_date}
                      disabled={
                        (roleauth === "ROLE_SUPERVISOR" &&
                          selectedRow?.supervisor_status ===
                            "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        (roleauth === "ROLE_HOD" &&
                          (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                            selectedRow?.hod_status === "HOD_APPROVED" ||
                            selectedRow?.hod_status === "HOD_REJECTED")) ||
                        (roleauth === "ROLE_DESIGNEE" &&
                          (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                            selectedRow?.hod_status === "HOD_APPROVED" ||
                            selectedRow?.hod_status === "HOD_REJECTED"))
                      }
                    />
                  </td>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", fontWeight: "normal" }}>

                    <input
                      type="datetime-local"
                      value={rows.end_date}
                      onChange={handleEndDateChange}
                      pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}"
                      min={rows.start_date}
                      disabled={
                        (roleauth === "ROLE_SUPERVISOR" &&
                          selectedRow?.supervisor_status ===
                            "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        (roleauth === "ROLE_HOD" &&
                          (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                            selectedRow?.hod_status === "HOD_APPROVED" ||
                            selectedRow?.hod_status === "HOD_REJECTED")) ||
                        (roleauth === "ROLE_DESIGNEE" &&
                          (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                            selectedRow?.hod_status === "HOD_APPROVED" ||
                            selectedRow?.hod_status === "HOD_REJECTED"))
                      }
                    />
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        </TabPane>
        <TabPane tab="Remarks" key="2">
          <div className="table-container">
            <table className="logbook-table" style={{
              width: "50%", marginTop: '5px', borderCollapse: 'collapse', marginLeft: "auto",
              marginRight: "auto"
            }}>
              <thead>
                <tr>
                  <th style={{ height: "40px", fontWeight: "bold", padding: "3px", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }} >Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="form-09" style={{ height: "80px", borderTop: "1px solid black", fontWeight: "bold", padding: "3px", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", fontWeight: "normal" }}><textarea className="form-09" style={{ resize: "none", width: "100%", height: "100%", outline: "none", border: "none" }} value={rows.remarks} onChange={handleRemarksChange} 
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  } /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Signatures" key="3">
          <div className="table-container">
            <table className="logbook-table" style={{
              width: "50%", marginTop: '5px', borderCollapse: 'collapse', marginLeft: "auto",
              marginRight: "auto"
            }}>
              <thead>
                <tr>
                  <th style={{ height: "40px", fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>Performed by Prod.Supervisor<br /> Date & Sign</th>
                  <th style={{ height: "40px", fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>Reviewed by HOD/ Designee<br /> Date & Sign</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='signature' id="form-09" style={{ height: "50px", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", textAlign: "center", fontWeight: "normal" }}>
                  {rows.supervisor_status === "SUPERVISOR_APPROVED" && (
                  <>
                    {rows.supervisor_sign}<br/>{formatDate(rows.supervisor_submit_on)}  
                    {getImage !== "" && (
                   <img className="signature"
                  src={getImage}
                  alt="Supervisor"
                  
                />
                    )}
                </>
                  )}
                </td>
                  <td className='signature' id="form-09" style={{ border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", textAlign: "center", fontWeight: "normal" }}>
                  {(rows.hod_status === "HOD_APPROVED" ||
                    rows.hod_status === "HOD_REJECTED") && (
                  <>
                    {rows.hod_sign}<br/>{formatDate(rows.hod_submit_on)}
                    {getImage1 !== "" && (
                  <img className="signature"
                  src={getImage1}
                  alt="HOD"
                 
                />
                    )}
                </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Bleach_f34;
