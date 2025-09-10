import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer } from "antd";
import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader';
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from 'react-router-dom';
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from 'moment';
import API from "../baseUrl.json";



// import gif from '../Assests/gif.gif'
import logo from "../Assests/logo.png";
// import  './sutharsana.css';

import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import Padpunching_f09_summary from "./Padpunching_f04_Summary.js";

const  Padpunching_f05_f001 = () => {
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  const [open, setOpen] = useState(false);
  

  const [NewSave, setNewSave] = useState(false);
   
const initial=useRef(false);


  const [date, setDate] = useState('')
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");
const[version,setVersion] = useState("");
const[reason,setreason] = useState("");
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  console.log(roleauth);
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [SupervisorSign, setSupervisorSign] = useState('');
  const [HodSign, setHodSign] = useState('');
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();
  const [HodSubmitOn, setHodSubmitOn] = useState('');
  const [OperatorSubmitOn, setOperatorSubmitOn] = useState('');
  const [remarks, setRemarks] = useState('');

  const[PackingDetails,setPackingDetails]=useState([])
  const [emptyarraycheck, setemptyarraycheck] = useState("");


  console.log("Operator", selectedRow?.operator_status)

  const roleBase = localStorage.getItem("role")


  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.operator_sign;
    if (username) {
      console.log("usernameparams", username);

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
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow,API.prodUrl]);


  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

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
  }, [selectedRow,API.prodUrl]);


  

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_OPERATOR") {
      if (
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.operator_status == "OPERATOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
          selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" 
       // emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED"  ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/PadPunching/Service/approveOrRejectBagMaking`,
        {
          id: OverallID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Padpunching/F-05_f001/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/PadPunching/Service/approveOrRejectBagMaking`,
        {
          id: OverallID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Padpunching/F-05_f001/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };




  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState('');

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [OverallID, setOverallID] = useState('');

  const { Option } = Select;
  const { state } = location;
  const { newdate, shiftvalue } = state || {};
  // const { batch } = state || {};
  // const { bale } = state || {};
  console.log("bmr form create screen", newdate);
  console.log("bmr form create screen", shiftvalue);
 

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [opens, setOpens] = useState(false);

  const [placement, setPlacement] = useState("left");


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }




  useEffect(() => {
    if (newdate) {

      setDate(newdate);

      console.log("PHNo create", newdate);
    }

    if (shiftvalue) {
      setShift(shiftvalue);
      console.log("Supplier create", shiftvalue);
    }
  
  })


  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;


  const token = localStorage.getItem("token");


  const handlePrint = () => {
    window.print();
  };


  const handleShiftChange = (value) => {
    console.log(" Shift ", value);
    setShift(value);
    // setGotobtn(false);
  };


  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift;
    }
  };


  const submitData = () => {
    setSubmitLoading(true);
    console.log("Date1", token);


    const finalRemarks = (remarks?.trim() || '') === '' ? 'NA' : remarks.trim();
   if(NewSave){
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD05/F-001",
        formatName: "Bag Making Daily Production Details",
        sopNumber: "PH-PRD05-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,
        remarks:finalRemarks,
        reason: reason,
        version: version ,
        totalProductionDetailsInBag:totalProductionQty
        
      };

     
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/PadPunching/Service/PackingDetails/SubmitPackingDetails`,
          payload,
          { headers }
        )
        .then((res) => {
          console.log("Response", res.data);
          message.success("Form Submitted Successfully");
          navigate('/Precot/Padpunching/F-05_f001/Summary');
        })
        .catch((err) => {
          console.log("Error", err);
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } else{

        const payload = {
            unit: "Unit H",
            formatNo: "PH-PRD05/F-001",
            formatName: "Bag Making Daily Production Details",
            sopNumber: "PH-PRD05-D-03",
            revisionNo: "01",
            shift: shift,
            date: date,
            remarks:finalRemarks,
            bagmakingId:OverallID,
            reason:reason,
             version:version,
             totalProductionDetailsInBag:totalProductionQty
          };
        
    
          
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
    
          axios
            .post(
              `${API.prodUrl}/Precot/api/PadPunching/Service/SubmitBagMakingDailyProductionDetail`,
              payload,
              { headers }
            )
            .then((res) => {
              console.log("Response", res.data);
              message.success("Form Submitted Successfully");
              navigate('/Precot/Padpunching/F-05_f001/Summary');
            })
            .catch((err) => {
              console.log("Error", err);
              message.error(err.response.data.message);
            })
            .finally(() => {
              setSubmitLoading(false);
            });

    }
    }








  const handleBack = () => {
    navigate("/Precot/Padpunching/F-05_f001/Summary");
  };

  useEffect(() => {
  
    checkBmrExist();

}, []);


const checkBmrExist = async () => {

  const { newdate, shiftvalue} = state || {};
  const formattedDate = moment(newdate, "DD/MM/YYYY").format("YYYY-MM-DD");
  const numberShift = convertShiftValue(shiftvalue);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API.prodUrl}/Precot/api/padpunching/api/bag-details?date=${formattedDate}&shift=${numberShift}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response shift", response.data);
    setPackingDetails(response.data)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};




 

 
useEffect(() => {
    if (!initial.current) {
        initial.current = true;
    fetchGet();
    }
}, []);

const fetchGet = async () => {
    
    const { newdate, shiftvalue } = state || {};


    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/PadPunching/Service/findByDateShiftBagMaking?date=${newdate}&shift=${shiftvalue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response Fecthget", response.data);
      response.data.length == 0 ? setNewSave(true) : setNewSave(false);
      setSelectedRow(response.data)
      setRemarks(response.data.remarks)
      setOverallID(response.data.bagmakingId)
      


      if(((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.operator_status !=="OPERATOR_APPROVED")) ||((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.hod_status =="HOD_REJECTED"))){
        message.error("Operator Not Yet  Approved");
        setTimeout(() => {
         navigate('/Precot/Padpunching/F-05_f001/Summary');
       }, 1500)
        }
       

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this number as needed

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PackingDetails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(PackingDetails.length / itemsPerPage);




  const handleTextareaChange = (event) => {
    setRemarks(event.target.value);
  };

  

  const formattedOperatorDate = selectedRow?.operator_submitted_on
    ? moment(selectedRow?.operator_submitted_on).format('DD/MM/YYYY HH:mm')
    : '';

  const formattedhodDate = selectedRow?.hod_submit_on
    ? moment(selectedRow?.hod_submit_on).format('DD/MM/YYYY HH:mm')
    : '';

    const totalProductionQty = currentItems.reduce((total, item) => total + (item.ProductionQty || 0), 0);
     console.log("Total",totalProductionQty)

  const items = [
    {
      key: "1",
      label: <p>Form</p>,
      children: (
        <div>
        <table className="f18table" style={{ width: "100%", margin: "auto", tableLayout: 'fixed' }}>
  <thead>
    <tr>
      <td colSpan="5" style={{ textAlign: "center", padding: '7px', fontWeight: 'bold' }}>Machine Name</td>
      <td colSpan="5" style={{ textAlign: "center" }}>Order No.</td>
      <td colSpan="5" style={{ textAlign: "center" }}>Product Name</td>
      <td colSpan="5" style={{ textAlign: "center" }}>Type Of Bags</td>
      <td colSpan="5" style={{ textAlign: "center" }}>No of Bags<br/> Production qty.</td>
    </tr>
  </thead>

  <tbody>
    {currentItems.map((details, index) => (
      <tr key={index}>
        <td colSpan="5" style={{ textAlign: "center", padding: '7px' }}>{details.MachineName}</td>
        <td colSpan="5" style={{ textAlign: "center" }}>{details.OrderNo}</td>
        <td colSpan="5" style={{ textAlign: "center" }}>{details.ProductName}</td>
        <td colSpan="5" style={{ textAlign: "center" }}>{details.Typeofpad}</td>
        <td colSpan="5" style={{ textAlign: "center" }}>{details.ProductionQty}</td>
      </tr>
    ))}
</tbody>
  <tr>
    <td  colSpan="25" style={{ textAlign: "left" ,padding:'7px'}}>
    Total Production Details in Bags: {totalProductionQty}
    </td>
  </tr>
</table>

<div className="pagination" style={{ textAlign: 'right', marginTop: '20px' }}>
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="pagination-button"
                style={{
                  padding: '5px 10px',
                  margin: '5px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: '1px solid #007bff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Previous
              </button>
            )}

            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="pagination-button"
                style={{
                  padding: '5px 10px',
                  margin: '5px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: '1px solid #007bff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Next
              </button>
            )}
          </div>

          <div style={{ width: "100%", margin: '0 auto' }}>
  <div style={{ padding: '10px 0' }}>
    <label
      htmlFor="remarksTextarea"
      style={{
        fontWeight: 'bold',
        fontSize: '16px',
        textTransform: 'uppercase',
        display: 'block',  // Makes sure the label is above the textarea
        paddingBottom: '5px',
      }}
    >
      Remarks:
    </label>
    <textarea
      id="remarksTextarea"
      style={{ width: '100%', height: '80px', outline: 'none', resize: 'none' }}
      value={remarks}
      onChange={handleTextareaChange}
      disabled={
        (roleauth === "ROLE_OPERATOR" &&
          selectedRow?.operator_status === "OPERATOR_APPROVED" &&
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
  </div>
</div>

</div>
      ),
    }, 
   

    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "90%", margin: "auto",tableLayout:'fixed' }}>
            <tr >
              
              <td colSpan="13" style={{
                textAlign: 'center',
              }}>
               Operator Sign & Date
              </td>
              <td colSpan="12" style={{
                textAlign: 'center',
              }}>
                HOD / Designee Sign & Date
              </td>

            </tr>


            <tr>
              
             
                  <td colSpan="13" style={{
                    fontSize: "12pt",
                    textAlign: 'center',
                    height: '70px',
                    fontFamily: "Times New Roman, Times, serif"
                  }}
                  disabled={
                    (roleauth === "ROLE_OPERATOR" &&
                      selectedRow?.operator_status === "OPERATOR_APPROVED" &&
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
                  >
                {(selectedRow?.operator_status === "OPERATOR_REJECTED" ||
                selectedRow?.operator_status === "OPERATOR_APPROVED") && (

                    <div>
                      {selectedRow?.operator_sign}

                      <br />
                      {formattedOperatorDate}<br />
                      {(selectedRow?.operator_status=== "OPERATOR_APPROVED" ||
                        selectedRow?.operator_status === "OPERATOR_REJECTED" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED") &&
                        getImage3 && (
                          <img
                            src={getImage3}
                            alt="Operator Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                    </div>
                  )}
                  </td>
                


              <td colSpan="12" style={{
                fontSize: "12pt",
                textAlign: 'center',
                height: '70px',
                fontFamily: "Times New Roman, Times, serif"

              }}
              disabled={
                (roleauth === "ROLE_OPERATOR" &&
                  selectedRow?.operator_status ===
                    "OPERATOR_APPROVED" &&
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
              >
                {(selectedRow?.hod_status === "HOD_APPROVED" ||
                  selectedRow?.hod_status === "HOD_REJECTED") && (
                    <div>
                      {selectedRow?.hod_sign}

                      <br />
                      {formattedhodDate}<br />
                      {(selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED") &&
                        getImage2 && (
                          <img
                            src={getImage2}
                            alt="Hod Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                    </div>
                  )}
              </td>

            </tr>

          </table>
        </div>
      ),
    }]



  return (
    <div>



      <BleachingHeader
        unit="Unit-H"
        formName={"Bag Making Daily Production Details"}
        formatNo={"PH-PRD05/F-001"}
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
            </Button>,
            <Button
              key="reject"
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
          ] : [
        //     <Button
        //     key="save"
        //     loading={saveLoading}
        //     type="primary"
        //    // onClick={handleSave}
        //     style={{
        //       backgroundColor: "#E5EEF9",
        //       color: "#00308F",
        //       fontWeight: "bold",
        //       display:canDisplayButton2(),
        //     }}
        //     shape="round"
        //     icon={<IoSave color="#00308F" />}
        //   >
        //     Save
        //   </Button>,
            <Button
              key="submit"
              loading={submitLoading}
              type="primary"
             onClick={submitData}
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
                navigate("/Precot"); 
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
      <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
      

      <div style={{ display: 'flex',gap: '10px', marginTop: '10px' , marginBottom: '10px'}}>
        
       


      <Input
          addonBefore="Date"
          placeholder="Date"

          value={date}
          readOnly
          onChange={handleDateChange}
          style={{ width: '20%', marginLeft:"20px", height: '20px' }}

        />

<Input
          addonBefore="Shift"
          placeholder="Shift"

          value={shift}
          readOnly
          
          style={{ width: '20%', marginLeft:"20px", height: '20px' }}

        />




      </div>


     



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

export default Padpunching_f05_f001;

