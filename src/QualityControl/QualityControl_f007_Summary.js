/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../Assests/logo.png";
import { Table, Modal ,Select,InputGroup ,message,Tooltip, Menu, Avatar, Drawer} from "antd";
import {EyeOutlined,EditOutlined,PlusOutlined,LeftOutlined,} from "@ant-design/icons";
import { useNavigate, useLocation } from 'react-router-dom';
import BleachingHeader from "../Components/BleachingHeader.js";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { Tabs,Button, Col, Input, Row,   } from 'antd';
import { IoCreate ,IoPrint} from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import moment from 'moment';
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { PrintPageOrientation } from "../General/PrintPageOrientation.js";

 
const QualityControl_f007_Summary = () => {
  PrintPageOrientation({ orientation: 'landscape', scale: 0.9 });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [GlasswareBreakage, setGlasswareBreakage] = useState([]);
  const today =new Date();
  const year = today.getFullYear();
  const month =String(today.getMonth() + 1).padStart(2,'0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;  
  const[date,setDate]=useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [showModal, setShowModal] = useState(false);
  const[datePrint,setDatePrint]=useState("");
  const[monthPrint,setMonthPrint]=useState("");
  const[yearPrint,setYearPrint]=useState("");
  const[equipment,setEquipment]=useState("");
  const[equipmentPrint,setEquipmentPrint]=useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [summary, setSummary] = useState();
  const [getData, setGetData] = useState([]);
  const [reason,setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const EquipmentLov = [
    { id: 1, value: 'PH-WM-02' },
    { id: 2, value: 'PH-WM-03' },
    { id: 3, value: 'PH-WM-05' },
    { id: 4, value: 'PH-WM-06' },
    { id: 5, value: 'PH-WM-26' },
  ];

  
  const monthsLov = [
    { id: 1, value: 'January' },
    { id: 2, value: 'February' },
    { id: 3, value: 'March' },
    { id: 4, value: 'April' },
    { id: 5, value: 'May' },
    { id: 6, value: 'June' },
    { id: 7, value: 'July' },
    { id: 8, value: 'August' },
    { id: 9, value: 'September' },
    { id: 10, value: 'October' },
    { id: 11, value: 'November' },
    { id: 12, value: 'December' },
  ];
  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }

  const yearOptions = generateYearOptions(2024, 2040);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

  // images
useEffect(() => {
  const token = localStorage.getItem("token");
  const username = printResponseData?.supervisor_sign;
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
        setGetImage1(url);
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });
  }
}, [printResponseData,     API.prodUrl, token]);
useEffect(() => {
  const token = localStorage.getItem("token");
  const username = printResponseData?.hod_sign;
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
        setGetImage2(url);
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });
  }
}, [printResponseData,     API.prodUrl, token]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrint = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);   
  };
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
          if (data.hod_status === "HOD_REJECTED") {
              setReason(true);
              break;
          }
      }
    };
    findReason();
  }, [cakingData]);

  const handlePrintDateChange = (event) => {
    try {
      setDatePrint(event.target.value);
      axios.get(
        `${   API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/getByDatePrintApi?date=${event.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.message !=='No data') {
          setPrintResponseData(res.data);
        } else {
          setPrintResponseData([]);
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        });
    } catch (error) {
      }
  };

  // Get the All Summary.....
  useEffect(() => {
    const { formNo } = state || {};
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`${   API.prodUrl}/Precot/api/chemicaltest/CLF007/getAll`, {
        headers,
      })
      .then((response) => {
        setGetData(response.data);

        console.log(" Response", response.data);
        const a = response.data.map((x, i) => {
          return {
            formatName: x.formatName,
            formatNo: x.formatNo,
            revisionNo: x.revisionNo,
            refSopNo: x.refSopNo,
            unit: x.unit,
            date:x.date,
            id: x.lab_id,
            equipment:x.eq_id_no,
            chemist_status: x.chemist_status ,
            qc_status: x.qc_status ,
          };
        });
        // console.log("aaa", a);
        setSummary(a);
        // setSummary(a);
      })
      .catch(() => {});
  }, []);

//   handle edit
  const handleEdit = (record) => {
    const x = summary.filter((x, i) => {
      return record.id == x.id;
    });
    console.log("X", x);
    const formattedDate = moment(x[0].date).format('YYYY-MM-DD');
    navigate("/Precot/QualityControl/F-007", {
      state: {
        date: formattedDate,
        equipment:x[0].eq_id_no,
        formId : x[0].lab_id
      }
    });
  };

  
  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };
  const handleEquipmentChange = (value) => {
    setEquipment(value);
  };
  const handleMonthPrintChange = (value) => {
    setMonthPrint(value);
  };
  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };
  const handleEquipmentPrintChange = (value) => {
    setEquipmentPrint(value);
  };


// Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex:"sno" ,
      key: "sno",
      render: (text, record, index) => index + 1,
      align: "center",
    },  
    {
        title: "Date",
        dataIndex: "date",
        key: "formatDate",
        align: "center",
        render: (text) => formatDate(text),
        // render: (text) => {
        //   const date = new Date(text);
        //   return date.toLocaleDateString('en-GB', {
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: 'numeric'
        //   });
        // },
      },
      {
        title: "Equipment Name",
        dataIndex: "equipment",
        key: "equipment",
        align: "center",
      },
    {
    title: "chemist Status",
    dataIndex: "chemist_status",
    key: "chemist_status",
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
        dataIndex: "",
        key: "actions",
        render: (_, record) => (
          <>
            <Button
              icon={<EditOutlined />}
               onClick={() => handleEdit(record)}
              style={{width:"100%"}}
                      >
              Review
            </Button>
          </>
        ),
      },
   
  ];
  const Reason = {
    title: "Reason",
    dataIndex:"reason",
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

   const printSubmit = () => {
        window.print()
  }
  const fetchPrintValue = (value) => {
    try {
       
      axios.get(
         `${   API.prodUrl}/Precot/api/spulance/fetchBaleConsumption?order=${12}&date=${datePrint}&shift=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.message !=='No data') {
          const printResponseData = (res.data[0]);
          setPrintResponseData(printResponseData);
        } else {
        }
      })
      .catch((err) => {
      });
    } catch (error) {
    }
  };
//   goto button
    const goTo = () => {
    if (date ==""||date==null) {
        message.warning('Please Select Date');
        return;
    }
    if (equipment ==""||equipment==null) {
      message.warning('Please Select Equipment Name');
      return;
  }
    navigate("/Precot/QualityControl/F-007", {
      state: {
        date: date,
        equipment:equipment
      }
    });
  }   
  return (
    
// print section
    <div>
       <div id="section-to-print">

     <table style={{marginTop:'10px', scale:"94%", tableLayout:"fixed"}}>
      <br/>
   <thead >
   <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="115"></td>
            </tr>
   <tr>
       <td colSpan="15" rowspan="4 "style={{textAlign:'center'}}>
           <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
           <br></br>
             Unit H
           </td>
         <th colSpan="70" rowSpan="4" style={{ textAlign: 'center' }}>WEIGHING SCALE CALIBRATION REPORT </th>
         <td colSpan="15">Format No.:</td>
         <td colSpan="15">PH-QCL01/F-007 </td>
       </tr>
       <tr>
         <td colSpan="15">Revision No.:</td>
         <td colSpan="15">01</td>
       </tr>
       <td colSpan="15">Ref. SOP No.:</td>
       <td colSpan="15">PH-QCL01-D-04</td>
       <tr>
         <td colSpan="15">Page No.:</td>
         <td colSpan="15">1 of 1</td>
       </tr> 
   
   </thead>
 <tbody>
  <tr>
  <td colSpan="35" ><b>Frequency:</b></td>
  <td colSpan="40" ><b>EQ. ID. No:</b></td>
  <td colSpan="40" ><b>Month & Year:</b></td>
  </tr>
  <tr>
  <td colSpan="35" ><b>Balance Max. Weight:</b></td>
  <td colSpan="40" ><b>Balance Min.Weight:</b></td>
  <td colSpan="40" ><b>Tolerance:</b></td>
  </tr>
  <tr>
    
    <td colSpan="5" rowSpan="2" style={{ textAlign: 'center' }}><b>S.No.</b></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}><b>Standard Weights in g/Kg </b></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}></td>
    <td colSpan="10"  style={{ textAlign: 'center' }}></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}></td>
    <td colSpan="15" rowSpan="2" style={{ textAlign: 'center' }}>Remark </td>
    <td colSpan="10" rowSpan="2" style={{ textAlign: 'center' }}>Status </td>
    <td colSpan="15" rowSpan="2" style={{ textAlign: 'center' }}>Calibrated By </td>
    <td colSpan="15" rowSpan="2" style={{ textAlign: 'center' }}>Verified By </td>
     </tr>
  <tr>
  <td colSpan="15"  style={{ textAlign: 'center' }}><b>Date  </b></td>
  <td colSpan="40"  style={{ textAlign: 'center' }}>Observed readings </td>
  </tr>
  <tr>
    
    <td colSpan="5"  style={{ textAlign: 'center' ,height:"20px"}}></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}></td>
    <td colSpan="10"  style={{ textAlign: 'center' }}></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}></td>
    <td colSpan="10"  style={{ textAlign: 'center' }}></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}></td>
     </tr>
 
 </tbody>
<tfoot >
<tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="115"></td>
            </tr>
   <tr>
         <th colSpan="25" >Particular</th>
         <th colSpan="30" style={{ textAlign: "center" }}>Prepared by</th>
         <th colSpan="30" style={{ textAlign: "center" }}>Reviewed by</th>
         <th colSpan="30" style={{ textAlign: "center" }}>Approved by</th>
       </tr>
       <tr>
         <th colSpan="25">Name</th>
         <td colSpan="30"></td>
         <td colSpan="30"></td>
         <td colSpan="30"></td>
       </tr>
       <tr>
         <th colSpan="25">Signature & Date</th>
         <td colSpan="30"></td>
         <td colSpan="30"></td>
         <td colSpan="30"></td>
       </tr>
   </tfoot>
   
</table>

          </div>

     
 {/* HEADER */}
       
      <div style={{marginBottom: "40px", marginTop:"20px"}}>
      <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
    <BleachingHeader
        unit="Unit-H"
        formName="WEIGHING SCALE CALIBRATION REPORT "
        formatNo="PH-QCL01/F-007"

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
           icon={<IoPrint color="#00308F" />}
           onClick={handlePrint}
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
            confirm("Are you sure want to Logout") == true
              ? navigate("/Precot")
              : null;
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

 {/* Go To Row */}

  <Row align="middle" style={{marginTop:"10px",marginBottom:"10px", justifyContent: "flex-start",display:"flex",gap:"10px",justifyContent:"left", marginLeft:"10px"}}>
  <Col><label >Date :</label></Col>
  <Col >
  <Input
  onChange={handleDateChange}
  type="date"
  value={date}
  size="small"
  style={{ width: '100%', height:'30px' }}
/></Col>
<Col><label >Equipment  :</label></Col>
<Col>
<Select
  showSearch
  value={equipment}
  onChange={handleEquipmentChange}
  style={{ width: '100%' }}
  placeholder="Search Equipment"
  optionFilterProp="children"
>
  <Select.Option value="" disabled selected>
  Select Equipment
  </Select.Option>
  {EquipmentLov.map((option) => (
    <Select.Option key={option.id} value={option.value}>
      {option.value}
    </Select.Option>
  ))} 
</Select>
</Col>

    <Col >
      <Button
        key="go"
         onClick={goTo}
        style={{
          backgroundColor: "#E5EEF9",
          color: "#00308F",
          fontWeight: "bold",
          width:"100%",
        }}
        shape="round"
        icon={<BiNavigation color="#00308F" />}
        type="primary"
      >
        Go to
      </Button>
    </Col>   
  </Row>
</div>
{/* Table...Summary */}
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

{/* SUMMARY PRINT */}
<Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="submit" type="primary" shape="round" style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }} onClick={printSubmit}>
            Submit
          </Button>,
        ]}
      >   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>        
                 <label style={{ marginRight: '8px' , width: '30%' , textAlign:'center'}}>Date:</label>
                 <Input
                 onChange={handlePrintDateChange}
                  type="date"
                  value={datePrint}
                  size="small"
                  style={{ width: '100%', height:'30px' }}

                  />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>        
                 <label style={{ marginRight: '8px' , width: '30%' , textAlign:'center'}}>Month:</label>
                 <Select
                     showSearch
                     value={monthPrint}
                     onChange={handleMonthPrintChange}
                     style={{ width: '100%' }}
                     placeholder="Search Month"
                     optionFilterProp="children"
                  >
                   <Select.Option value="" disabled selected>
                              Select Month
                   </Select.Option>
                   {monthsLov.map((option) => (
                   <Select.Option key={option.id} value={option.value}>
                       {option.value}
                    </Select.Option>
                   ))} 
               </Select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>        
                 <label style={{ marginRight: '8px' , width: '30%' , textAlign:'center'}}>Year:</label>
                 <Select
                   showSearch
                   value={yearPrint}
                   onChange={handleYearPrintChange}
                   style={{ width: '100%' }}
                   placeholder="Search Year"
                   optionFilterProp="children"
                  >
                   <Select.Option value="" disabled selected>
                       SelectYear
                      </Select.Option>
                     {yearOptions.map((option) => (
                    <Select.Option key={option.id} value={option.value}>
                       {option.value}
                   </Select.Option>
                  ))} 
                </Select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>        
                 <label style={{ marginRight: '8px' , width: '30%' , textAlign:'center'}}>Equipment Name:</label>
                 <Select
                   showSearch
                   value={equipmentPrint}
                   onChange={handleEquipmentPrintChange}
                   style={{ width: '100%' }}
                   placeholder="Search Equipment"
                   optionFilterProp="children"
                   >
               <Select.Option value="" disabled selected>
                  Select Equipment
              </Select.Option>
              {EquipmentLov.map((option) => (
               <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
                 ))} 
               </Select>
            </div>
 
      </Modal>
    </div>
  );
};
 
export default QualityControl_f007_Summary;
