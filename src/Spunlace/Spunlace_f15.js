/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, message, Select, Tooltip, Tabs, Input, Space, Row, Col } from "antd";
import { IoSave, IoPrint } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BleachingHeader from "../Components/BleachingHeader.js";
import BleachingTail from "../Components/BleachingTail.js";
import { GoArrowLeft } from "react-icons/go";
import "../index.css";
import { Pagination } from 'antd';
import PrecotSidebar from "../Components/PrecotSidebar.js";
import API from "../baseUrl.json";
import { IoCreate } from "react-icons/io5";
import {
    Table,
    Modal,
    DatePicker,
    Form,
    Drawer,
    Menu,
    Avatar,
} from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const { Option } = Select;
const { TabPane } = Tabs;

const Spunlace_f15 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const { date } = location.state;
    const {TextArea} = Input;
    const [rejectModal, setRejectModal] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
            formatName: "RP BALE PRESS STOPPAGE REPORT",
            formatNo: "PH-PRD02/F-015",
            revisionNo: 1,
            refSopNo: "PH-PRD02-D-03",
            unit: "Unit H",
            date: date,
            supervisor_sign: "",
            supervisor_submit_on: "",
            supervisor_status :"",
            hod_sign: "",
            hod_submit_on: "",
            hod_status:"",
            reason:"",
            stoppageReport:[]
    }
    );
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const initialized = useRef(false);
    const [formStatus,setFormStatus] = useState(false);
    const [statusLoader,setStatusLoader] = useState (false);
    const [status, setStatus] = useState({
        approveStatus: false, submitStatus: false
      });
      const [eSign, setESign] = useState({
        operator_sign: '',
        supervisor_sign: '',
        hod_sign: ''
      })
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    // console.log("Spunlace Date" , date)

    useEffect(() => {
        const token = localStorage.getItem("token");
        const signatureKeys = ["supervisor_sign", "hod_sign"];
        signatureKeys.forEach((key) => {
          const username = formData[key];
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
      }, [formData]);
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            if(role == "ROLE_SUPERVISOR"){
                setStatus(prevStatus => ({
                    ...prevStatus,
                    approveStatus:true
                }))
            }
            const fetchData = async () => {

                try {
                    const response = await axios.get(`${API.prodUrl}/Precot/api/spulance/aggregatedResults?date=${date}`,{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    // console.log("Response Data", response.data);
                    if (response.data.length > 0) {
                        const reportArray = response.data;
                        setFormData( prevState => ({
                            ...prevState,
                            stoppageReport:reportArray
                        }))
                        // console.log("If Entered");
                        const fetchJob = async () => {
                            try {
                                const response = await axios.get(`${API.prodUrl}/Precot/api/spulance/report/getByDateF015?date=${date}`,
                                    {
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        }
                                    });
                                    if(role !== "ROLE_SUPERVISOR" && response.data.length == 0){
                                      message.warning("Supervisor Yet To Approve");
                                      setStatus( prevState => ({
                                        ...prevState,
                                        approveStatus :true,
                                        submitStatus : true
                                      }))
                                      setTimeout(() => {
                                        navigate("/Precot/Spunlace/F-15/Summary");
                                    }, 1000);
                                    }
                                if (response.data.length> 0) {
                                    const data = response.data[0]
                                    setFormData(prevState => {
                                        let updatedState = {
                                            ...prevState,
                                            supervisor_sign: data.supervisor_sign,
                                            supervisor_submit_on: data.supervisor_submit_on,
                                            supervisor_status: data.supervisor_status,
                                            hod_sign: data.hod_sign,
                                            hod_submit_on: data.hod_submit_on,
                                            hod_status: data.hod_status,
                                        };
                                    
                                        if (data.id) {
                                            updatedState.id = data.id;
                                        }
                                    
                                        if (data.supervisor_submit_id) {
                                            updatedState.supervisor_submit_id = data.supervisor_submit_id;
                                        }
                                    
                                        if (data.formData && data.formData.hod_submit_id) {
                                            updatedState.hod_submit_id = data.formData.hod_submit_id;
                                        }
                                    
                                        return updatedState;
                                    });
                                    statusFunction(data); 
                                }
                                
                            } catch (error) {
                                console.error("Error fetching job order details:", error);
                                message.error(error.response.data.message);
                                setTimeout(() => {
                                    navigate("/Precot/Spunlace/F-15/Summary");
                                }, 1000);
                            }
                        };

                        // Call the fetchJobOrder function
                        fetchJob();
                    }

                    else if (response.data.length == 0) {
                        message.warning("No detail found for given date");
                        setTimeout(() => {
                            navigate("/Precot/Spunlace/F-15/Summary");
                        }, 1000);
                    }

                } catch (error) {

                    console.error('Error fetching Job Order Options:', error);

                }
            };
            fetchData();
        }
    }, [date, token,API.prodUrl, navigate]);
    const statusFunction = (responseData) => {
        if (role == "ROLE_SUPERVISOR" && responseData.supervisor_status == "SUPERVISOR_APPROVED" && (responseData.hod_status == "WAITING_FOR_APPROVAL" || responseData.hod_status == "HOD_APPROVED")) {
          // console.log("Condition 2")
          setStatus(formStatus => ({
            ...formStatus,
            submitStatus: true
          }))
        }
        if ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") && responseData.hod_status == "HOD_APPROVED") {
          // console.log("Condition 4")
          setStatus(formStatus => ({
            ...formStatus,
            approveStatus: true,
            submitStatus: true,
          }))
        }
        if ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") && responseData.hod_status == "HOD_REJECTED") {
          message.warning("Supervisor Yet To Approve");
          setTimeout(() => {
            navigate("/Precot/Spunlace/F-15/Summary");
        }, 1000);
          setStatus(formStatus => ({
            ...formStatus,
            approveStatus: true,
            submitStatus: true,
          }))
        }
      }
    

    
    const handleSave = async () => {
        setStatusLoader(true);
        const payload = {
            "id" : formData.id,
            "status": "Approve"
        }
        try {
          const response = await axios.put(
            `${API.prodUrl}/Precot/api/spulance/report/approveOrRejectF015`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.status == 200 || response.status == 201) {
            message.success(response.data.message);
            setStatusLoader(false);
            setTimeout(() => {
              navigate("/Precot/Spunlace/F-15/Summary");
            }, 1000);
          }
        } catch (error) {
          setStatusLoader(false);
          message.error(error.response.data.message);
        }
      };
    


      const handleSubmit =  async () =>{
        setStatusLoader(true);
        let apiurl,payload;
        if(role == "ROLE_SUPERVISOR"){
        apiurl = `${API.prodUrl}/Precot/api/spulance/report/submitRPBalePressStopage`;
        payload = {
            formatName: "RP BALE PRESS STOPPAGE REPORT",
            formatNo: "PH-PRD02/F-015",
            revisionNo: 1,
            refSopNo: "PH-PRD02-D-03",
            unit: "Unit H",
            date: formData.date,
        };
        if(formData.id){
            payload.id = formData.id
        }
        if(formData.supervisor_submit_id){
            payload.supervisor_submit_id = payload.supervisor_submit_id
        }
        if(formData.hod_submit_id){
            payload.hod_submit_id = formData.hod_submit_id
        }
    }
    else {
        // console.log(formData.reason,"Is Reason")
        if(formData.reason == "" || formData.reason == null){
            message.warning ("Please Enter The Reason");
            setStatusLoader(false);
            return;
        }
        apiurl = `${API.prodUrl}/Precot/api/spulance/report/approveOrRejectF015`;
        payload = {
            "id" : formData.id,
            "status": "Reject",
            "remarks": formData.reason
        }
    }

        // console.log("payload", payload);
        try {
        const requestMethod = role == "ROLE_SUPERVISOR" ? axios.post : axios.put;
          const response = await requestMethod(
            apiurl,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.status == 200 || response.status == 201) {
            message.success(response.data.message);
            setStatusLoader(false);
            setTimeout(() => {
              navigate("/Precot/Spunlace/F-15/Summary");
            }, 1000);
          }
        } catch (error) {
          console.error("Error saving data:", error);
          setStatusLoader(false);
          message.error(error.response.data.message);
        }
    
      }
    

    const paginatedData = formData.stoppageReport ? formData.stoppageReport.slice(startIndex, endIndex) : [];


    // ------------------------------- Funtions ----------------------------------------
    const handleBack = () => {
        navigate("/Precot/Spunlace/F-15/Summary");
    };
    const rejectFlow = () => {
        setRejectModal(true);
    }
    const handleCancel = () => {
        setRejectModal(false);
        setFormData(formData => ({
            ...formData,
            reason: ''
          }))
    }
    const handleRejectReason = (e) => {
        const text = e.target.value;
        setFormData(formData => ({
          ...formData,
          reason: text
        }))
      }
    const handleKeyDown = (e) => {
        if (
            ['e', 'E', '+', '-'].includes(e.key)
        ) {
            e.preventDefault();
        }
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // console.log("Form Data Details", formData)
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    }
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      };
    return (
        <>
            <BleachingHeader
                formName={"RP BALE PRESS STOPPAGE REPORT"}
                formatNo={"PH-PRD02/F-015"}
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
                    style={{
                      backgroundColor: "#E5EEF9",
                      color: "#00308F",
                      fontWeight: "bold",
                      display: status.approveStatus ? "none" : "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    shape="round"
                    icon={<img src={approveIcon} alt="Approve Icon" />}
                    onClick={handleSave}
                    loading={statusLoader}
                  >
                    &nbsp;Approve
                  </Button>,
                 <Button
                 type="primary"
                 style={{
                   backgroundColor: "#E5EEF9",
                   color: "#00308F",
                   fontWeight: "bold",
                   display: status.submitStatus ? "none" : "flex",
                   alignItems: "center",
                   gap: "8px",
                 }}
                 shape="round"
                 icon={role == "ROLE_SUPERVISOR" ? <GrDocumentStore color="#00308F" /> : <img src={rejectIcon} alt="Reject Icon" />}
                 onClick={role == "ROLE_SUPERVISOR" ? handleSubmit : rejectFlow}
                 loading={statusLoader}
               >
                 {role == "ROLE_SUPERVISOR" ? " Submit" : "   Reject"}
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
        <label>Reason : </label><br></br><br></br>
        <TextArea type="textArea" style={{ height: "100px" }} onChange={handleRejectReason} ></TextArea>
      </Modal>
            <div style={{ margin: "10px", width: "10%" , display:"flex",flexDirection:"row",gap:"10px" }}>
                <Input type="date" value={date} readOnly addonBefore="Date" ></Input>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Product Details" key="1" style={{ alignItems: "center" }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <table>
                                <tr>
                                    <th rowSpan={2}>S.No</th>
                                    <th rowSpan={2}>Shift</th>
                                    <th rowSpan={2}>ORDER NO</th>
                                    <th rowSpan={2}>NO OF BALES</th>
                                    <th rowSpan={2} >PROD. IN KG</th>
                                    <th colspan={3} style={{ padding: "10px" }}>DOWN TIME IN MIN</th>
                                    <th colSpan={3} style={{ padding: "10px" }}>BREAK DOWN IN MIN</th>

                                </tr>
                                <tr>
                                    <th >GR CLEAN</th>
                                    <th >MIS.</th>
                                    <th >OTHERS</th>
                                    <th style={{ padding: "10px" }}>ER IN MIN</th>
                                    <th>MR IN MIN</th>
                                    <th>TOTAL</th>
                                </tr>
                                {paginatedData.map((details, index) => (
                                    <tr key={index}>
                                        <td style={{ textAlign: "center" }}>{startIndex + index + 1}</td>
                                        <td style={{ textAlign: "center" }}>{details.ShiftID}</td>
                                        <td style={{ textAlign: "center" }}>{details.POrder}</td>
                                        <td style={{ textAlign: "center" }}>{details.BaleCount == null ? 'N/A' : details.BaleCount}</td>
                                        <td style={{ textAlign: "center" }}>{details.TotalNetWeight == null ? 'N/A' : details.TotalNetWeight}</td>
                                        <td style={{ textAlign: "center" }}>{details.CG_Hours == null ? 'N/A' : details.CG_Hours }</td>
                                        <td style={{ textAlign: "center" }}>{details.MI_Hours == null ? 'N/A' : details.MI_Hours }</td>
                                        <td style={{ textAlign: "center" }}>{details.Others_Hours == null ? 'N/A' : details.Others_Hours }</td>
                                        <td style={{ textAlign: "center" }}>{details.ER_Hours == null ? 'N/A' : details.ER_Hours }</td>
                                        <td style={{ textAlign: "center" }}>{details.MR_Hours == null ? 'N/A' : details.MR_Hours  }</td>
                                        <td style={{ textAlign: "center" }}>{details.Total_Hours == null ? 0 : details.Total_Hours }</td>

                                    </tr>
                                ))}
                            </table>
                            <Pagination
                                current={currentPage}
                                pageSize={recordsPerPage}
                                total={formData.stoppageReport.length}
                                onChange={handlePageChange}
                                style={{ textAlign: "center", marginTop: "20px", float: "right" }}
                            />
                        </div>
                    </div>
                </TabPane>

                <TabPane tab="Reviews " key="2">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <div style={{ width: '80%' }}>
                            <table style={{tableLayout:"fixed"}}>
                                <tr>
                                    <th style={{ padding: "10px",width:"20%" }}>PRODUCTION SUPERVISOR SIGN & DATE </th>
                                    <th style={{ padding: "10px",width:"20%" }}>HOD/DESIGNEE SIGN & DATE </th>
                                </tr>
                                <tr>
                                <td style={{ height: "30px", textAlign: "center" }}>
                      {formData.supervisor_status !== "WAITING_FOR_APPROVAL" && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ textAlign: "center" }}>
                        {formData.supervisor_sign}
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
                      ):null }
                      </div>
                  </div>
                  )}
                </td>
                <td style={{ height: "30px", textAlign: "center" }}>
                  {formData.hod_status !== "WAITING_FOR_APPROVAL" && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ textAlign: "center" }}>
                        {formData.hod_sign}
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
                                </tr>
                            </table>
                        </div>
                    </div>
                </TabPane>
            </Tabs>

        </>
    );
};

export default Spunlace_f15;