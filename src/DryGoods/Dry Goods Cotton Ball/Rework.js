import React, { useState } from 'react';
import { Table, Row, Col, Input, Button, message,Form, Select} from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import API from "../../baseUrl.json";
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

export default function Rework(props) {
  const token = localStorage.getItem("token");
  const [id, setId] = useState("");


  const [formData, setFormData] = useState({

    reworkDate: "",
    // departmentName: "",
    machineName: "",
    // bmrNumber: props.batchNo,
    lotNumber: "",
    reworkReason: "",
    reworkQuantity: "",
    referenceNcNumber: "",
    actionTaken: ""
  });

 
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const role = localStorage.getItem('role');

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [Supervisorstatus , Setsupervisorstatus] = useState();
const [Hodstatus , Sethodstatus] = useState();
const [Qastatus , SetQastatus] = useState();

const displayStyle = 
  (role === "ROLE_QA" && Qastatus === "QA_APPROVED") ||
  (role === "ROLE_SUPERVISOR"  && Supervisorstatus === "SUPERVISOR_APPROVED") ||
  (role === "ROLE_HOD" && Hodstatus === "HOD_APPROVED") ||
  (Qastatus === "QA_APPROVED" && Supervisorstatus === "SUPERVISOR_APPROVED" && Hodstatus === "HOD_APPROVED")
    ? "none"
    : "block";

useEffect(() => {
    setLoading(true);
    axios
      .get(`${API.prodUrl}/Precot/api/buds/bmr/getReworkByBatch?batchNumber=${props.batchNo}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const responseData = response.data[0] || {}; 
     
        setId(responseData.id || '');
        console.log("id", responseData.id);
        Setsupervisorstatus(response.data[0].supervisorStatus);
        Sethodstatus(response.data[0].hodStatus);
        SetQastatus(response.data[0].qaStatus);
        
        setFormData({
          reworkDate: responseData.reworkDate || '',
          departmentName: responseData.departmentName || '',
          machineName: responseData.machineName || '',
          bmrNumber: responseData.bmrNumber || '',
          lotNumber: responseData.lotNumber || 'N/A',
          reworkReason: responseData.reworkReason || 'N/A',
          reworkQuantity: responseData.reworkQuantity || 'N/A',
          referenceNcNumber: responseData.referenceNcNumber || 'N/A',
          actionTaken: responseData.actionTaken || 'N/A',
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
}, [props.batchNo]);

  



  const saveData = async () => {
    if (!props.batchNo) {
      message.warning("Please select Batch No");
      return;
    }
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/buds/bmr/saveReworkForm`,
       
        // formData,
        { ...formData ,bmrNumber:props.batchNo, departmentName:"DRY_GOODS" ,    id:id,},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Data saved successfully:", response.data);
      if (response.data?.id) {
        setId(response.data.id);
      }
      message.success("Saved Successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Unable to Save");
    }
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  
  const [isDisabled, setIsDisabled] = useState(false);

const submitData = async () => {
  if (!props.batchNo) {
    message.warning("Please select Batch No");
    return;
  }
    try {
      let response;
      if (role === "ROLE_HOD" || role === "ROLE_QA") {
      
        response = await axios.put(
          `${API.prodUrl}/Precot/api/buds/bmr/approveReworkForm`,
          {
            id: id,
            status: "Approve"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        message.success("Submitted Successfully");
        setIsDisabled(true);
      
      } else {
        // Use POST request for submission if role is not HOD or QA
        response = await axios.post(
          `${API.prodUrl}/Precot/api/buds/bmr/submitReworkForm`,
          { ...formData, bmrNumber: props.batchNo, departmentName: "DRY_GOODS" ,     id:id, },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        message.success("Submitted Successfully");
        setIsSubmitted(true); 
        setIsDisabled(true);
      }
  
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting/approving data:", error);
      message.error("Unable to Submit ");
    }
  };
  

  const machineOptions = [
    { value: "BL1", label: "BL1" },
    { value: "BL2", label: "BL2" },
  ];
  
  return (
    <div>
               <div   style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
             gap: "1em"
          }}>
  
      {(role !== "ROLE_HOD" && role !== "ROLE_QA") && (
  <Button
    type="primary"
    style={{
 
      display: displayStyle ,
      backgroundColor: isDisabled ? "#F5F5F5" : "#E5EEF9", 
      color: isDisabled ? "#F5F5F5" : "#00308F",
      fontWeight: "bold"
    }}
    shape="round"
    onClick={saveData}
  >
    Save
  </Button>
)}

      <Button
        type="primary"
        style={{
          // backgroundColor: "#E5EEF9",
          // color: "#00308F",
          display: displayStyle ,
          backgroundColor: isDisabled ? "#F5F5F5" : "#E5EEF9", 
      color: isDisabled ? "#F5F5F5" : "#00308F",
          fontWeight: "bold"
        }}
        shape="round"
        onClick={submitData}
      >
        Submit
      </Button>
      </div>
      <Table
        bordered
        pagination={false}
        columns={[
          {
            title: '',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => {
              switch (record.key) {
                case '1':
                  return (
                    <Row gutter={17} align="middle" style={{ height: '40px' }}>
                      <Col span={1.5}>
                        <label>Date:</label>
                      </Col>
                      <Col span={3.5}>
               
                        <Input
  type="date"
  placeholder="Select Date"
  value={formData.reworkDate}
  max={new Date().toISOString().split("T")[0]} // Sets max to today's date
  disabled={isSubmitted || role === "ROLE_HOD" || role === "ROLE_QA"}
  onChange={e => handleChange('reworkDate', e.target.value)}
/>

                      </Col>
                    </Row>
                  );
                case '2':
                  return (
                    <Row gutter={18} align="middle" style={{ height: '40px' }}>
                      <Col span={3}>
                        <label>Department Name:</label>
                      </Col>
                      <Col span={7}>
                        <Input
                          placeholder="Enter Department Name"
                          value={"DRY_GOODS"}
                          disabled
                          onChange={e => handleChange('departmentName', e.target.value)}
                        />
                      </Col>
                      <Col span={2}>
                      <label>Machine No:</label>
                    </Col>
                    <Col span={7}>
                     
    <Select
  placeholder="Select Machine No"

  value={formData.machineName}
  disabled={isSubmitted || role === "ROLE_HOD" || role === "ROLE_QA"}
  onChange={(value) => handleChange('machineName', value)}
  style={{ width: '200px' }}
>
  {machineOptions.map(option => (
    <Select.Option key={option.value} value={option.value}>
      {option.label}
    </Select.Option>
  ))}
</Select>
                    </Col>
                   
                    </Row>
                  );
                case '3':
                  return (
                    <Row gutter={18} align="middle" style={{ height: '40px' }}>
                      <Col span={2}>
                        <label>BMR No:</label>
                      </Col>
                      <Col span={7}>
                        <Input
                          placeholder="Enter BMR No"
                          value={props.batchNo}
                          disabled
                          required
                          onChange={e => handleChange('bmrNumber', e.target.value)}
                        />
                      </Col>
                      <Col span={3.5}>
                        <label>Lot No.:/ Julian Date:</label>
                      </Col>
                      <Col span={7}>
                        <Input
                          placeholder="Enter Lot No.:/ Julian Date"
                          value={formData.lotNumber}
                        //   disabled={isSubmitted} 
                        disabled={isSubmitted || role === "ROLE_HOD" ||  role === "ROLE_QA"} 
                          onChange={e => handleChange('lotNumber', e.target.value)}
                        />
                      </Col>
                    </Row>
                  );
                case '4':
                  return (
                    <Row gutter={18} align="middle" style={{ height: '40px' }}>
                      <Col span={3}>
                        <label>Reason for Work:</label>
                      </Col>
                      <Col span={9}>
                        <Input
                          placeholder="Enter Reason for Work"
                          value={formData.reworkReason}
                        //   disabled={isSubmitted} 
                        disabled={isSubmitted || role === "ROLE_HOD" ||  role === "ROLE_QA"} 
                          onChange={e => handleChange('reworkReason', e.target.value)}
                        />
                      </Col>
                    </Row>
                  );
                case '5':
                  return (
                    <Row gutter={18} align="middle" style={{ height: '45px' }}>
                      <Col span={3}>
                        <label>Rework Qty. In Bags/ Boxes:</label>
                      </Col>
                      <Col span={9}>
                        <Input
                          placeholder="Enter Rework Qty. In Bags/ Boxes"
                          value={formData.reworkQuantity}
                        //   disabled={isSubmitted} 
                        disabled={isSubmitted || role === "ROLE_HOD" ||  role === "ROLE_QA"} 
                          onChange={e => handleChange('reworkQuantity', e.target.value)}
                        />
                      </Col>
                    </Row>
                  );
                case '6':
                  return (
                    <Row gutter={18} align="middle" style={{ height: '40px' }}>
                      <Col span={3.5}>
                        <label>Reference NC No (if):</label>
                      </Col>
                      <Col span={9}>
                        <Input
                          placeholder="Enter Reference NC No (if)"
                          value={formData.referenceNcNumber}
                        //   disabled={isSubmitted} 
                        disabled={isSubmitted || role === "ROLE_HOD" ||  role === "ROLE_QA"} 
                          onChange={e => handleChange('referenceNcNumber', e.target.value)}
                        />
                      </Col>
                    </Row>
                  );
                case '7':
                  return (

<Row gutter={18} span={1.5} align="middle" style={{ minHeight: '90px' }}> {/* Adjust minHeight as needed */}
  <Col span={3}>
    <label>Action taken:</label>
  </Col>
  <Col span={15}>
    <Input.TextArea
      placeholder="Enter Action taken"
      value={formData.actionTaken}
      onChange={e => handleChange('actionTaken', e.target.value)}
      rows={1.7} 
      disabled={isSubmitted || role === "ROLE_HOD" ||  role === "ROLE_QA"} 
      style={{ minHeight: '80px' }} 
    />
  </Col>
</Row>

                  );
                default:
                  return <Input placeholder={`Enter ${record.field}`} value={text} />;
              }
            },
          },
        ]}
        dataSource={[
          { key: '1', field: 'Date' },
          { key: '2', field: 'Department Name, Machine No' },
          { key: '3', field: 'BMR No , Lot No.:/ Julian Date' },
          { key: '4', field: 'Reason for Rework' },
          { key: '5', field: 'Rework Qty. In Bags/ Boxes' },
          { key: '6', field: 'Reference NC No (if)' },
          { key: '7', field: 'Action taken:' },
        ]}
      />
    </div>
  );
}

