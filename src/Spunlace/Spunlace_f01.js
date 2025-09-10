
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer, Table } from "antd";
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
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";


const Spunlace_f01 = () => {

  const navigate = useNavigate();
  const { Column, ColumnGroup } = Table;
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { state } = location;
  const { shift, date, orderNumber } = state || {};
  // console.log("shift from f01 summary", shift);
  // console.log("order number from f01 summary", orderNumber);
  // console.log("date form f01 summary", date);
  const [shift1, setShift1] = useState('')
  const [sb_id, setsb_id] = useState('')
  const [date1, setDate1] = useState('')
  const [orderNumber1, setOrderNumber1] = useState('')
  const [orderDetails, setOrderDetails] = useState("");
  const [mixing, setMixing] = useState('');
  const [customerName, setcustomerName] = useState('');
  const [materialCode, setMaterialCode] = useState('');
  const [stdGsm, setStdGsm] = useState('');
  const [abBatchNo, setabBatchNo] = useState('');
  const [abBaleNo, setabBaleNo] = useState('');
  const [abWeight, setabWeight] = useState('');
  const [rpBaleNo, setrpBaleNo] = useState('');
  const [rpWeight, setrpWeight] = useState('');
  const [rptotalWeight, setrptotalWeight] = useState('');
  const [abtotalWeight, setabtotalWeight] = useState('');
  const [ResponseDataApRp, setResponseDataApRp] = useState(null);
  const [DetailOrderShiftDate, setDetailOrderShiftDate] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [SbId, setSbId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailOrderShiftDate?.operator_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [DetailOrderShiftDate,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailOrderShiftDate?.supervisor_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [DetailOrderShiftDate,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailOrderShiftDate?.hod_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [DetailOrderShiftDate,API.prodUrl, token]);

  const handleApprove = async () => {
    setSaveLoading(true);
  
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    };
  
    const res = await axios.put(`${API.prodUrl}/Precot/api/spulance/approveOrRejectF001`,
      {
        id : sb_id,
        status: "Approve"
    },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res);
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-01/Summary");
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
     // console.log("print screen works");
   };
   const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spulance/approveOrRejectF001`,
        {
          id: sb_id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-01/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  const bleachCottonDetails = ResponseDataApRp?.apBaleConsumptionResponse || [];
  const rpCottonDetails = ResponseDataApRp?.rpBaleConsumption || [];

  // Calculating total weights
  let totalWeight = 0;
  if (bleachCottonDetails.length > 0) {
    totalWeight = bleachCottonDetails.reduce((total, item) => {
      return total + parseFloat(item.netWeight);
    }, 0);
  }
  let totalWeightrp = 0;
  if (rpCottonDetails.length > 0) {
    totalWeightrp = rpCottonDetails.reduce((total, item) => {
      return total + parseFloat(item.netWeight);
    }, 0);
  }

  // Formatting total weights
  const formattedTotalWeight = totalWeight.toFixed(3) === '0.000' ? '' : totalWeight.toFixed(3);
const formattedTotalWeightrp = totalWeightrp.toFixed(3) === '0.000' ? '' : totalWeightrp.toFixed(3);

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'AB COTTON',
      children: [
        {
          title: 'Batch No.',
          dataIndex: 'batchNo',
          key: 'batchNo',
          align: 'center',
          render: (text, record) => (
            <Input value={record.batchNo} style={{ width: '95%', height: '180px', border: 'none' }} disabled />
          ),
        },
        {
          title: 'Bale No.',
          dataIndex: 'baleNo',
          key: 'baleNo',
          align: 'center',
          render: (text, record) => (
            <Input value={record.baleNo} style={{ width: '95%', height: '180px', border: 'none' }} disabled />
          ),
        },
        {
          title: 'Net Wt. in KG',
          dataIndex: 'netWeight',
          key: 'netWeight',
          align: 'center',
          render: (text, record) => (
            <Input value={record.netWeight} style={{ width: '95%', height: '180px', border: 'none' }} disabled />
          ),
        },
      ],
    },
    {
      title: 'RP COTTON',
      children: [
        {
          title: 'Bale No.',
          dataIndex: 'rpBaleNo',
          key: 'rpBaleNo',
          align: 'center',
          render: (text, record) => (
            <Input value={record.rpBaleNo} style={{ width: '95%', height: '180px', border: 'none' }} disabled />
          ),
        },
        {
          title: 'Net Wt. in KG',
          dataIndex: 'rpNetWeight',
          key: 'rpNetWeight',
          align: 'center',
          render: (text, record) => (
            <Input value={record.rpNetWeight} style={{ width: '95%', height: '180px', border: 'none' }} disabled />
          ),
        },
      ],
    },
  ];

  // Combine data for both AB and RP cotton into rows
  const data = [];
  const maxLength = Math.max(bleachCottonDetails.length, rpCottonDetails.length);
  for (let i = 0; i < maxLength; i++) {
    data.push({
      key: i,
      batchNo: bleachCottonDetails[i]?.batchNo || 'N/A',
      baleNo: bleachCottonDetails[i]?.baleNo || 'N/A',
      netWeight: bleachCottonDetails[i]?.netWeight || 'N/A',
      rpBaleNo: rpCottonDetails[i]?.baleNo || 'N/A',
      rpNetWeight: rpCottonDetails[i]?.netWeight || 'N/A',
    });
  }
  data.push({
    key: 'total',
   
    baleNo: '',
    baleNo: 'Total',
     netWeight: formattedTotalWeight,
    rpBaleNo: 'Total',
     rpNetWeight: formattedTotalWeightrp,
  });

  // Add total row
  const totalRow = {
    key: 'total',
    totalAB: 'Total',
    totalABWeight: formattedTotalWeight,
    totalRP: 'Total',
    totalRPWeight: formattedTotalWeightrp,

  };

  const formattedDate = () => {
    if (DetailOrderShiftDate?.operator_submitted_on) {
      const date = moment(DetailOrderShiftDate.operator_submitted_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };
  const formattedDatesupervisor = () => {
    if (DetailOrderShiftDate?.supervisor_submit_on) {
      const date = moment(DetailOrderShiftDate.supervisor_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };
  const formattedDateHod = () => {
    if (DetailOrderShiftDate?.hod_submit_on) {
      const date = moment(DetailOrderShiftDate.hod_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };


  // const formattedDatesupervisor = moment(DetailOrderShiftDate?.supervisor_submit_on||'').format('DD/MM/YYYY');
  //const formattedDateHod = moment(DetailOrderShiftDate?.hod_submit_on||'').format('DD/MM/YYYY');




  useEffect(() => {
    if (shift) {
      setShift1(shift);
    }
    if (orderNumber) {
      setOrderNumber1(orderNumber);
    }
    if (date) {
      const dateObj = new Date(date);
      const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
      setDate1(formattedDate);
    }

  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }
  const handleBack = () => {
    navigate("/Precot/Spunlace/F-01/Summary");
  };
  //   const canDisplayButtons = () => {
  //     if (roleauth == "ROLE_SUPERVISOR") {
  //       if (selectedRow?.[0]?.supervisor_status == "SUPERVISOR_APPROVED") {
  //         return "none";
  //       }
  //       return "block";
  //     } else if (roleauth == "ROLE_HOD"||roleauth == "ROLE_DESIGNEE") {
  //       if (selectedRow?.[0]?.hod_status == "HOD_APPROVED") {
  //         return "none";
  //       }
  //       return "block";

  //     }
  //     else {
  //       if (selectedRow?.[0]?.hod_status == "HOD_APPROVED") {
  //         return "none";
  //       }
  //       return "block";
  //     }

  //   }
  const containerStyle = {
    position: 'relative',
    // marginLeft:'60px',
  };
  const canDisplayButtons = () => {
    if (role === "ROLE_OPERATOR") {
      if (
        DetailOrderShiftDate &&
        DetailOrderShiftDate.operator_status === "OPERATOR_APPROVED" &&
        DetailOrderShiftDate.hod_status !== "HOD_REJECTED" &&
        DetailOrderShiftDate.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none"; 
      }
      return "block";
    }
    else if (role == "ROLE_SUPERVISOR") {
      if (
        DetailOrderShiftDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        DetailOrderShiftDate?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (DetailOrderShiftDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
          DetailOrderShiftDate?.hod_status == "WAITING_FOR_APPROVAL") ||
          DetailOrderShiftDate?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "ROLE_HOD" || role== "ROLE_DESIGNEE") {
      if (
        DetailOrderShiftDate?.hod_status == "HOD_APPROVED" ||
        DetailOrderShiftDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        DetailOrderShiftDate?.hod_status == "HOD_APPROVED" ||
        DetailOrderShiftDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_OPERATOR") {
      if (
        DetailOrderShiftDate?.operator_status == "OPERATOR_APPROVED" &&
        DetailOrderShiftDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        DetailOrderShiftDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; 
      } else if (
        DetailOrderShiftDate?.operator_status == "OPERATOR_APPROVED" &&
        DetailOrderShiftDate?.supervisor_status == "WAITING_FOR_APPROVAL" &&
        (DetailOrderShiftDate?.hod_status == "WAITING_FOR_APPROVAL" ||
          DetailOrderShiftDate?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; 
      }
    }
    if (role == "ROLE_SUPERVISOR") {
      if (
        DetailOrderShiftDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        DetailOrderShiftDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; 
      } else if (
        DetailOrderShiftDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (DetailOrderShiftDate?.hod_status == "WAITING_FOR_APPROVAL" ||
          DetailOrderShiftDate?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        DetailOrderShiftDate?.hod_status == "HOD_APPROVED" ||
        DetailOrderShiftDate?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none"; 
      }
      return "block"; 
    } else {
      if (
        DetailOrderShiftDate?.hod_status == "HOD_APPROVED" ||
        DetailOrderShiftDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; 
      }
      return "block"; 
    }
  };

  //   const disabled = (
  //     roleauth === "ROLE_SUPERVISOR" && selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" ||
  //     (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") && selectedRow?.[0]?.hod_status === "HOD_APPROVED"
  //   );


  useEffect(() => {

    fetchOrderDetails();
    fetchApRpValue();
    fetchByOrderShiftDate();

  }, []);

  const fetchOrderDetails = async () => {
    try {
      const ordernumbergetDetails = orderNumber1;
      // console.log("stored order Number inside", orderNumber);

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/orderDetails?order=${orderNumber}`,
        {

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

        }


      );
      // console.log("response", response.data);
      if (response.data && response.data?.length > 0) {

        const data = response.data;
        // console.log("set response date", data)
        setOrderDetails(data);
        setMixing(data[0].mix);
        setcustomerName(data[0].customerName);
        setMaterialCode(data[0].material);
        setStdGsm(data[0].gsm);

      } else {

      }
    } catch (error) {
      console.error('Error checking BMR existence:', error);
    } finally {

    }

  };
  function convertShift(shift) {
    switch (shift) {
      case 'I':
        return 1;
      case 'II':
        return 2;
        case 'III':
        return 3;
      default:
        return null;
    }
  }

  const fetchApRpValue = () => {
    try {
      const formattedShift = convertShift(shift);

      axios.get(
        // `${API.prodUrl}/Precot/api/spulance/baleByOrder?order=${orderNumber}`,
        `${API.prodUrl}/Precot/api/spulance/baleByOrderdateshift?order=${orderNumber}&date=${date}&shift=${formattedShift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.data && res.data) {
            // console.log("ap sp response", res.data)
            setResponseDataApRp(res.data);
            setsb_id(res.data[0].sb_id)
            //  setabBatchNo(res.data[0].bleachCottonDetails[0].batchNo);

          } else {

            // message.error("no data found...!");
          }
        })
        .catch((err) => {
          // console.log("Error", err);
        });
    } catch (error) {
      console.error('Error in handleDatePrintChange:', error);

    }
  };


  //   save api
  const handleSubmit = async () => {
    // setSaveLoading(true);
    try {
      await submitBaleConsumptionReport();
    } catch (error) {
      console.error("Error submitting BALE CONSUMPTION  REPORT:", error);
    }

  };

  const submitBaleConsumptionReport = async () => {
    //setSaveLoading(true);
    setSubmitLoading(true);
    try {
      const payload = {


        form_name: "BALE CONSUMPTION  REPORT",
        format_no: "PH-PRD02/F-001",
        revision_no: 1,
        sop_number: "PH-PRD02-D-03 ",
        sb_id: sb_id,
        date: date,
        shift: shift,
        order_number: orderNumber,
        mixing: mixing,
        customer_name: customerName,
        material_code: materialCode,
        gsm: stdGsm,
        totalABWeight:formattedTotalWeight,
        totalRpWeight:formattedTotalWeightrp


      };





      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };


      const response = await axios.post(
        `${API.prodUrl}/Precot/api/spulance/submitBaleConsumption`,
        payload,
        { headers }
      );
      // console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate('/Precot/Spunlace/F-01/Summary');
      }, 1500)

      message.success('Bale Consumption Report Submitted Successfully..');
      navigate('/Precot/Spunlace/F-01/Summary');


    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to send BALE CONSUMPTION  REPORT");

    } finally {
      //setSaveLoading(false);
      setSubmitLoading(false);
    }
  };

  const fetchByOrderShiftDate = () => {
    try {
      axios.get(
        `${API.prodUrl}/Precot/api/spulance/fetchBaleConsumption?order=${orderNumber}&date=${date}&shift=${shift}`,
        // `${API.prodUrl}/Precot/api/spulance/fetchBaleConsumption?order=ORD5678&date=2024-07-10&shift=III`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
         
          if (res.data && res.data?.length > 0) {
            setemptyarraycheck(res.data.length);
            setDetailOrderShiftDate(res.data[0]);
           
            setsb_id(res.data[0].sb_id);
            // console.log("sb id seted", sb_id)
            // console.log("sb id", res.data[0].sb_id);
            // console.log("supervisor status",res.data[0].reason);
            
             //   // console.log("print response",printResponseData);
          } else {
            setDetailOrderShiftDate([]);
            // message.error("no data found...!");
          }
          if(((role=="ROLE_HOD"||role=="ROLE_DESIGNEE") &&(res.data[0].supervisor_status !=="SUPERVISOR_APPROVED"))||((role=="ROLE_HOD"||role=="ROLE_DESIGNEE") &&(res.data[0].hod_status =="HOD_REJECTED"))){
            message.error("Supervisor Yet Not Approved") ;
            setTimeout(() => {
             navigate('/Precot/Spunlace/F-01/Summary');
           }, 1500)
        }
          // if((role=="ROLE_HOD"||role=="ROLE_DESIGNEE") &&(res.data[0].supervisor_status !=="SUPERVISOR_APPROVED")){
            if(((role=="ROLE_SUPERVISOR") &&(res.data[0].operator_status !=="OPERATOR_APPROVED"))||((role=="ROLE_SUPERVISOR") &&(res.data[0].supervisor_status =="SUPERVISOR_REJECTED" || res.data[0].hod_status =="HOD_REJECTED"))){
            message.error("Operator Yet Not Approved");
            setTimeout(() => {
             navigate('/Precot/Spunlace/F-01/Summary');
           }, 1500)
        }
      //     if ((role === "ROLE_HOD" || role === "ROLE_DESIGNEE" || role === "ROLE_SUPERVISOR") && (!res.data || Object.keys(res.data).length === 0)) {
      //     message.error("Yet Not Approved");
      //     setTimeout(() => {
      //         navigate('/Precot/Spunlace/F-01/Summary');
      //     }, 1500);
      // }
         
        })
        .catch((err) => {
          // console.log("Error", err);
        });
    } catch (error) {
      console.error('Error in handleDatePrintChange:', error);

    }
  };





  const items = [
    {
      key: "1",
      label: <p>CONSUMPTION  REPORT</p>,
      children: (
        <div>
          <Table
            dataSource={data}
            bordered
            // pagination={{ pageSize: 10 }} 
            style={{ width: '100%', margin: 'auto' }}
          >
            <ColumnGroup title="AB COTTON">
              <Column title="Batch No." dataIndex="batchNo" key="batchNo" align="center"  />
              <Column title="Bale No." dataIndex="baleNo" key="baleNo" align="center" />
              <Column title="Net Wt. in KG" dataIndex="netWeight" key="netWeight" align="center" />
            </ColumnGroup>
            <ColumnGroup title="RP COTTON">
              <Column title="Bale No." dataIndex="rpBaleNo" key="rpBaleNo" align="center" />
              <Column title="Net Wt. in KG" dataIndex="rpNetWeight" key="rpNetWeight" align="center" />
            </ColumnGroup>

          </Table>
        </div>
      ),
    }, {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr >
              <td colSpan="34" style={{ height: "35px", textAlign: "center", width: "30%" }}>Operator Sign & Date</td>
              <td colSpan="33" style={{ textAlign: "center", width: "35%" }}>Production Supervisor Sign & Date</td>
              <td colSpan="33" style={{ textAlign: "center", width: "35%" }}>HOD/ Designee Sign & Date</td>

            </tr>
            <tr >
              {/* <td colSpan="34" style={{ height: "100px", textAlign: "center", marginBottom: "auto" }}>{DetailOrderShiftDate?.operator_sign || ''}<br />
                {formattedDate()}
              </td> */}
                   <td
                colSpan="34"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {DetailOrderShiftDate?.operator_status === "OPERATOR_APPROVED" && (
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
                        <div>{DetailOrderShiftDate?.operator_sign}</div>
                        <div>{formattedDate()}</div>
                      </div>
                      {getImage1 && (

                      <img
                        src={getImage1}
                        alt="Operator Sign"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      />
                    )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>

              {/* <td colSpan="33" style={{ textAlign: "center" }}>{DetailOrderShiftDate?.supervisor_sign || ''}<br />
                {formattedDatesupervisor()}
              </td> */}
                <td
                colSpan="33"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                 {(DetailOrderShiftDate?.supervisor_status === "SUPERVISOR_REJECTED" || 
                DetailOrderShiftDate?.supervisor_status === "SUPERVISOR_APPROVED") && (
              
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
                        <div>{DetailOrderShiftDate?.supervisor_sign}</div>
                        <div>{formattedDatesupervisor()}</div>
                      </div>
                      {getImage2 && (

                      <img
                        src={getImage2}
                        alt="Superviosr Sign"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      />
                    )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>
              {/* <td colSpan="33" style={{ textAlign: "center" }}>{DetailOrderShiftDate?.hod_sign || ''}<br />
                {formattedDateHod()}
              </td> */}
                <td
                colSpan="50"
                style={{ textAlign: "center", 
                // verticalAlign: "bottom" 
                }}
              >
                {(DetailOrderShiftDate?.hod_status === "HOD_REJECTED" || 
                DetailOrderShiftDate?.hod_status === "HOD_APPROVED") && (
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
                          <div>{DetailOrderShiftDate?.hod_sign}</div>
                          <div>{formattedDateHod()}</div>
                        </div>
                        {getImage3 && (

                        <img
                          src={getImage3}
                          alt="HOD Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                      </div>                    </>
                  )}
              </td>

            </tr>

          </table>
        </div>
      ),
    }]

  const formatName = "CONTAMINATION CHECKING REPORT(Absorbent Bleached Cotton)"
  const formatNo = 'PRD01/F-18'
  const revisionNo = "02"
  const sopNo = 'PRD01-D-09'

  return (
    <div>

<PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
      <BleachingHeader
        unit="Unit-H"
        formName="BALE CONSUMPTION REPORT "
        formatNo="PH-PRD02/F-001 "
        sopNo="PH-PRD02-D-03 "
        MenuBtn={
          <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
          ></Button>
      }
      
        buttonsArray={[
          
          role === "ROLE_SUPERVISOR" ||
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
                loading={saveLoading}
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
          onClick={handleBack}
          shape="round"
          icon={<GoArrowLeft color="#00308F" />}
        >
          &nbsp;Back
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
        <Input
          addonBefore="Date:"
          placeholder="Date"
          required
          value={date1}
          disabled
          style={{ width: '100%', height: '35px' }}
        />
        <Input
          addonBefore="Shift:"
          placeholder="Shift"
          required
          value={shift1}
          disabled
          style={{ width: '100%', height: '35px' }}
        />
        <Input
          addonBefore="Order No:"
          placeholder="Order Number"
          required
          value={orderNumber1}
          disabled
          style={{ width: '100%', height: '35px' }}
        />

        <Input
          addonBefore="Mixing:"
          placeholder="Mixing"
          value={mixing}
          disabled
          style={{ width: '100%', height: '35px' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <Input
          addonBefore="Customer Name:"
          placeholder="Customer Name"
          value={customerName}
          disabled
        />
        <Input
          addonBefore="Material Code:"
          placeholder="Material Code"
          value={materialCode}
          disabled
        />
        <Input
          addonBefore="STD GSM:"
          placeholder="STD GSM"
          value={stdGsm}
          disabled

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

export default Spunlace_f01

