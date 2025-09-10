import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer } from "antd";
import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader.js';

import { useNavigate, useLocation } from 'react-router-dom';
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from 'moment';
import API from "../baseUrl.json";



// import gif from '../Assests/gif.gif'
import logo from "../Assests/logo.png";
// import  './sutharsana.css';

import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import Padpunching_f09_summary from "./Padpunching_f04_Summary.js";

const  Padpunching_f04 = () => {
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  const [open, setOpen] = useState(false);
  

  const [NewSave, setNewSave] = useState(false);
   
const initial=useRef(false);


  const [date, setDate] = useState('')
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");
  const [remarks, setRemarks] = useState('');
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  console.log(roleauth);
  const [shift, setShift] = useState(null);
  
  const[PackingDetails,setPackingDetails]=useState([])
  const [emptyarraycheck, setemptyarraycheck] = useState("");


  console.log("supervisor", selectedRow?.operator_status)

  const roleBase = localStorage.getItem("role")


  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.supervisor_sign;
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
       // emptyarraycheck == 0
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




  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/PadPunching/Service/PackingDetails/approveOrReject`,
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
        navigate("/Precot/Padpunching/F-04/Summary");
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
        `${API.prodUrl}/Precot/api/PadPunching/Service/PackingDetails/approveOrReject`,
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
        navigate("/Precot/Padpunching/F-04/Summary");
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

  console.log("overallId", OverallID)

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

  const totalNoOfBags = PackingDetails.reduce((total, detail) => total + detail.noOfBags, 0);
    const totalNoOfCartons = PackingDetails.reduce((total, detail) => total + detail.noOfCartons, 0);


  const submitData = () => {
    setSubmitLoading(true);
    console.log("Date1", token);


    const finalRemarks = (remarks?.trim() || '') === '' ? 'NA' : remarks.trim();
   if(NewSave){
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD03/F-004",
        formatName: "Daily Production Packing Details",
        refSopNo: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,
        department:"PAD PUNCHING ",
       
        details: PackingDetails.map((detail, index) => ({
            julianCode:detail.julianDay,
            machineName:detail.machineName,
            productName:detail.productName,
            poNo: detail.poNo,
            bmrNo: detail.POrder,
            noOfBagsCarton: detail.noOfBagCarton,
            noOfCartons: detail.noOfCartons,
            noOfBags: detail.noOfBags,
          
        })),
        noOfCartonPacked:totalNoOfCartons,
        noOfBagsPacked: totalNoOfBags,
        remarks:finalRemarks,
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
          navigate('/Precot/Padpunching/F-04/Summary');
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
            formatNo: "PH-PRD03/F-004",
            formatName: "Daily Production Packing Details",
            refSopNo: "PH-PRD02-D-03",
            revisionNo: "01",
            shift: shift,
            date: date,
            department:"PAD PUNCHING ",
            detailId:OverallID,
            details: PackingDetails.map((detail, index) => ({
                lineId:detail.lineId,
                julianCode:detail.julianDay,
                machineName:detail.machineName,
                productName:detail.productName,
                poNo: detail.poNo,
                bmrNo: detail.POrder,
                noOfBagsCarton: detail.noOfBagCarton,
                noOfCartons: detail.noOfCartons,
                noOfBags: detail.noOfBags,
              
            })),
            noOfCartonPacked:totalNoOfCartons,
            noOfBagsPacked: totalNoOfBags,
            remarks:finalRemarks,
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
              navigate('/Precot/Padpunching/F-04/Summary');
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
    navigate("/Precot/Padpunching/F-04/Summary");
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
        `${API.prodUrl}/Precot/api/padpunching/productionpackingDetails?date=${formattedDate}&shift=${numberShift}`,
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
        `${API.prodUrl}/Precot/api/PadPunching/Service/PackingDetails/getByDateShift?date=${newdate}&shift=${shiftvalue}`,
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
      setOverallID(response.data.detailId)
      


      if(((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.supervisor_status !=="SUPERVISOR_APPROVED"))||((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.hod_status =="HOD_REJECTED"))){
        message.error("Supervisor Not Yet  Approved");
        setTimeout(() => {
         navigate('/Precot/Padpunching/F-04/Summary');
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



 


    const formattedSupervisorDate = selectedRow?.supervisor_submit_on
    ? moment(selectedRow.supervisor_submit_on).format('DD/MM/YYYY HH:mm')
    : '';

  const formattedhodDate = selectedRow?.hod_submit_on
    ? moment(selectedRow?.hod_submit_on).format('DD/MM/YYYY HH:mm')
    : '';

    const handleTextareaChange = (event) => {
        setRemarks(event.target.value);
      };

  const items = [
    {
      key: "1",
      label: <p>Packing Details</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "100%", margin: "auto" ,tableLayout:'fixed'}}>
          
         <thead>
  <tr>
    <td colSpan="1" style={{ textAlign: 'center' }}>Shift</td>
    <td colSpan="3" style={{ textAlign: 'center' }}>Julian Code</td>
    <td colSpan="3" style={{ textAlign: 'center' }}>Machine Name</td>
    <td colSpan="2" style={{ textAlign: 'center' }}>Product Name</td>
    <td colSpan="2" style={{ textAlign: 'center' }}>PO NO.</td>
    <td colSpan="2" style={{ textAlign: 'center' }}>BMR NO. / ORDER NO.</td>
    <td colSpan="3" style={{ textAlign: 'center' }}>No. of Bags / Carton</td>
    <td colSpan="3" style={{ textAlign: 'center' }}>No. of Cartons</td>
    <td colSpan="3" style={{ textAlign: 'center' }}>No. of Bags</td>
  </tr>
</thead>
<tbody>
  {currentItems.map((detail, index) => (
    <tr key={index}>
      <td colSpan="1" style={{ textAlign: 'center', padding: '4px' }}>{shiftvalue}</td>
      <td colSpan="3" style={{ textAlign: 'center' }}>{detail.julianDay }</td>
      <td colSpan="3" style={{ textAlign: 'center' }}>{detail.machineName }</td>
      <td colSpan="2" style={{ textAlign: 'center' }}>{detail.productName }</td>
      <td colSpan="2" style={{ textAlign: 'center' }}>{detail.poNo }</td>
      <td colSpan="2" style={{ textAlign: 'center' }}>{detail.POrder }</td>
      <td colSpan="3" style={{ textAlign: 'center' }}>{detail.noOfBagCarton }</td>
      <td colSpan="3" style={{ textAlign: 'center' }}>{detail.noOfCartons }</td>
      <td colSpan="3" style={{ textAlign: 'center' }}>{detail.noOfBags }</td>
    </tr>
  ))}


</tbody>
            
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

<br/>
          <table className="f18table" style={{ width: "50%",  tableLayout:'fixed', marginLeft: '0'}}>
            <tbody>

            <tr>
                <th colSpan="5" style={{ textAlign: 'center', fontWeight: 'bolder', backgroundColor: '#FBF8F8', color: 'Black', padding: '10px'  }}>
                    Shift
                </th>
                <th colSpan="5" style={{ textAlign: 'center', fontWeight: 'bolder', backgroundColor: '#FBF8F8', color: 'Black', padding: '10px'  }}>
                {shiftvalue} 
                </th>
            </tr>
          <tr>
        <td colSpan="5" style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Total No. of Carton Packed
        </td>
        <td colSpan="5" style={{ textAlign: 'center', fontWeight: 'bold' }}>
       
          {totalNoOfCartons}
        </td>
      </tr>
      <td colSpan="5" style={{ textAlign: 'center', fontWeight: 'bold' }}>
      Total No. of Bags Packed
        </td>
        <td colSpan="5" style={{ textAlign: 'center', fontWeight: 'bold' }}>
        {totalNoOfBags}
        </td>
      </tbody>
          </table>

        
        </div>
      ),
    }, 
    {
        key: "2",
        label: <p>Remarks</p>,
        children: (
          <div>
            <table className="f18table" style={{ width: "90%", tableLayout: 'fixed' }}>
        <tbody>
          <tr>
            <td colSpan="18" style={{ height: '100px', padding: 0 }}>
              <textarea
                style={{ width: '100%', height: '100%',  outline: 'none', resize: 'none' }}
                value={remarks}  
                onChange={handleTextareaChange}  
                
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
        ),
      },
    {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "90%", margin: "auto",tableLayout:'fixed' }}>
            <tr >
              
              <td colSpan="15" style={{
                textAlign: 'center',
              }}>
                Production Supervisor Sign & Date
              </td>
              <td colSpan="15" style={{
                textAlign: 'center',
              }}>
                HOD / Designee Sign & Date
              </td>

            </tr>


            <tr>
              
             
                  <td colSpan="15" style={{
                    fontSize: "12pt",
                    textAlign: 'center',
                    height: '70px',
                    fontFamily: "Times New Roman, Times, serif"
                  }}
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
                  >
                {(selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
                selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") && (

                    <div>
                      {selectedRow?.supervisor_sign}

                      <br />
                      {formattedSupervisorDate}<br />
                      {(selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
                        selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED") &&
                        getImage3 && (
                          <img
                            src={getImage3}
                            alt="Supervisor Sign"
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
                


              <td colSpan="15" style={{
                fontSize: "12pt",
                textAlign: 'center',
                height: '70px',
                fontFamily: "Times New Roman, Times, serif"

              }}
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
        formName={"Daily Production Packing Details"}
        formatNo={"PH-PRD03/F-004"}
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
      

      <div style={{ display: 'flex',gap: '10px', marginTop: '5px' }}>
        
        <h5 style={{marginLeft:'10px'}}>DEPARTMENT NAME: PAD PUNCHING </h5>


      <Input
          addonBefore="Date"
          placeholder="Date"

          value={date}
          readOnly
          onChange={handleDateChange}
          style={{ width: '20%', marginLeft:"200px", height: '20px' }}

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

export default Padpunching_f04;

