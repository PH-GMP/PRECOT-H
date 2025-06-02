/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, message, Select, Tooltip, Tabs } from "antd";
import { IoSave, IoPrint } from 'react-icons/io5';
import { GrDocumentStore } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import BleachingHeader from '../Components/BleachingHeader.js';
import BleachingTail from "../Components/BleachingTail.js";
import { GoArrowLeft } from "react-icons/go";
import API from "../baseUrl.json";
import {   IoCreate } from 'react-icons/io5';
import { Table, Modal,DatePicker ,Form, Drawer, Menu, Avatar,Row,Col} from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from 'react-icons/bi';
import TextArea from 'antd/es/input/TextArea.js';
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";


const { Option } = Select;
const { TabPane } = Tabs;

function Bleach_f11() {
  const location = useLocation();
  const { bmrNoParam,subBatchNoParam} = location.state;
  const [rows, setRows] = useState({});
  const [mixingOptions, setMixingOptions] = useState([]);
  const [formStatus, setFormStatus] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [printStatus, setPrintStatus] = useState(true);
  const [statusLoader,setStatusLoader] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role=localStorage.getItem("role")
  const [open, setOpen] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

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
          // setLoading(true);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [rows, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = rows?.hod_sign;
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
          // setLoading(true);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [rows, API.prodUrl, token]);
  

  useEffect(() => {
    const fetchMixingOptions = async () => {
      try {
        // Step 1: Fetching job order number from getMapLaydown API
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

          // Step 2: Fetching mixing options based on job order number
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
      } catch (error) {
        console.error('Error fetching Mixing options:', error);
      }
    };

    fetchMixingOptions();
  }, [bmrNoParam, token]);

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
          `${ API.prodUrl}/Precot/api/bleaching/Service/EquipLogHydroExtracotor/getByBmrAndBatchNo?bmrNo=${bmrNoParam}&batchNo=${subBatchNoParam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // console.log("Fetched Data:", response.data);
        // setId(response.data)
        setSelectedRow(response.data)
        if (
          userRole == "ROLE_SUPERVISOR" &&
          response.data.supervisor_status == "SUPERVISOR_APPROVED" && 
            response.data.hod_status == "WAITING_FOR_APPROVAL" || response.data.hod_status == "HOD_APPROVED")
         {
          setFormStatus(true);
          // console.log("Form status worked for ROLE_SUPERVISOR");
        } 
       else if (
          userRole == "ROLE_SUPERVISOR" &&
          response.data.hod_status == "HOD_REJECTED"
        ) {
          setFormStatus(false);
          // console.log("Form status worked for ROLE_SUPERVISOR");
        }
        else if (
          (userRole == "ROLE_HOD" || userRole == "ROLE_DESIGNEE") &&
          (response.data.hod_status == "HOD_APPROVED" || response.data.hod_status == "DESIGNEE_APPROVED" || response.data.hod_status == "WAITING_FOR_APPROVAL")
        ) {
          setFormStatus(true);
          // console.log("Form status worked for ROLE_HOD or ROLE_DESIGNEE");
        } else {
          // console.log("Form status didn't work:", userRole, rows);
        }


        if (!response.data || Object.keys(response.data).length === 0  || response.data.status === "No Data") {
          const addRow = {
            stNo: 1,
            bmrNo: bmrNoParam,
            mixing: '',
            subBatchNo: subBatchNoParam,
            mcNo: '',
            timerSetting: '',
            remarks: '',
            supervisor_sign: '',
            hod_sign: ''
          };
          setRows(addRow);
        } else {
          setRows({
            ...response.data,
            supervisor_submit_on :formatDate(response.data.supervisor_submit_on),
            hod_submit_on: formatDate(response.data.hod_submit_on)
          });
        }
        // console.log("Row" , rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Check form status conditions

  }, [bmrNoParam, subBatchNoParam, token]);



  const handleBack = () => {
    navigate("/Precot/Bleaching/F-11/Summary");
  };

  const handleTabChange = (key) => {
    // console.log("Current Tab:", key);
    // Perform any actions on tab change if needed
  };

  const canDisplayButtons = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (
        selectedRow.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        selectedRow.hod_status == "HOD_APPROVED" ||
        selectedRow.hod_status == "HOD_REJECTED" 
        // emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow.hod_status == "HOD_APPROVED" ||
        selectedRow.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (
        selectedRow.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedRow.supervisor_status == "SUPERVISOR_APPROVED" &&
        (selectedRow.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        selectedRow.hod_status == "HOD_APPROVED" ||
        selectedRow.hod_status == "HOD_REJECTED" 
        // emptyarraycheck == 0
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        selectedRow.hod_status == "HOD_APPROVED" ||
        selectedRow.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  const handleApprove = async () => {
    setStatusLoader(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/bleaching/Service/EquipLogHydroExtracotor/approveOrRejectEquipLogHydroExtracotor`,
        {
          id: rows.id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-11/Summary");
      })
      .catch((err) => {
        
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setStatusLoader(true);
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
      setStatusLoader(false);
      return;
    }


    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/bleaching/Service/EquipLogHydroExtracotor/approveOrRejectEquipLogHydroExtracotor`,
        {
          id: rows.id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-11/Summary");
      })
      .catch((err) => {
        
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setStatusLoader(true);
      });
  };


  const handleSave = async () => {
    setStatusLoader(true);
    const payload = {
      formatName: "EQUIPMENT USAGE LOGBOOK - HYDRO EXTRACTOR",
      formatNo: "PH-PRD01/F-008",
      revisionNo: 2,
      refSopNo: "PROD01-D-13",
      unit: "H",
      bmrNo: rows.bmrNo,
      mixing: rows.mixing,
      subBatchNo: rows.subBatchNo,
      mcNo: rows.mcNo,
      timerSetting: rows.timerSetting,
      remarks: rows.remarks || "N/A"
    };
    // console.log("id", rows.id)
    if (rows.id) {
      payload.id = rows.id
    }
    // console.log("payload", payload)
    try {
      const response = await axios.post(`${ API.prodUrl}/Precot/api/bleaching/Service/EquipLogHydroExtracotor/SaveUsageLogHydroExtractor`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        messageApi.success("Data saved Succesfully!");
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/Bleaching/F-11/Summary");
        }, 1000);
      } 
    } catch (error) {
      console.error("Error saving data:", error);
      messageApi.error(error.response.data.message);
setStatusLoader(false);
 
    }
  };

  const handleSubmit = async () => {
    setStatusLoader(true);
    const payload = {
      formatName: "EQUIPMENT USAGE LOGBOOK - HYDRO EXTRACTOR",
      formatNo: "PH-PRD01/F-008",
      revisionNo: 2,
      refSopNo: "PROD01-D-13",
      unit: "H",
      bmrNo: rows.bmrNo,
      mixing: rows.mixing,
      subBatchNo: rows.subBatchNo,
      mcNo: rows.mcNo,
      timerSetting: rows.timerSetting,
      remarks: rows.remarks || "N/A",
    };
    // console.log("id", rows.id)
    if (rows.id) {
      payload.id = rows.id
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

    if (rows.mcNo === "") {
      messageApi.open({
        type: 'warning',
        content: 'MC No Field is Required',
      });
      setStatusLoader(false);
      isValid = false;
      return;

    }

    if (rows.timerSetting === "") {
      messageApi.open({
        type: 'warning',
        content: 'Timer Setting Field is Required',
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
      const response = await axios.post(`${ API.prodUrl}/Precot/api/bleaching/Service/EquipLogHydroExtracotor/SubmitUsageLogHydroExtractor`, payload, {
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
          navigate("/Precot/Bleaching/F-11/Summary");
        }, 1000);
      } 
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
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
    { key: '2', label: "2,1,2" },
    { key: '2', label: "1,1,1" },
    { key: '2', label: "2,2,2" }

  ];

  return (
    <div className='form11-div' style={{
      letterSpacing: "0.4px",
      fontSize: "14px!important"
    }}>
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
      {contextHolder}
      <div className='bleachHeaderPrint'>
        <BleachingHeader
          formName={"EQUIPMENT USAGE LOGBOOK - HYDRO EXTRACTOR"}
          formatNo={"PH-PRD01/F-008"}
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
                  loading={statusLoader}
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
                  loading={statusLoader}
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
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButton2(),
              }}
              shape="round"
              icon={<IoSave color="#00308F" />}
              onClick={handleSave}
              loading={statusLoader}
            >
              &nbsp;Save
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButtons(),
              }}
              shape="round"
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleSubmit}
              loading={statusLoader}
            >
              &nbsp;Submit
            </Button>
            </>
            ),
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
            </Tooltip>
          ]}
        />
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
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>Sub Batch No</th>
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>M/C No</th>
                  <th style={{ fontWeight: "bold", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" }}>Timer Setting in Analog Gauge (Std.: 0.3 to 0.7)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px",fontWeight:"normal" }}>1</td>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px",fontWeight:"normal" }}>{rows.bmrNo}</td>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px",fontWeight:"normal" }}>
                    <Select
                      value={rows.mixing || "Select Mixing"}
                      className="custom-select"
                      disabled={formStatus}
                      onChange={(value) => setRows(prevRows => ({ ...prevRows, mixing: value }))}
                      dropdownStyle={{ border: "none" }}
                    >
                      {mixingOptions.map(option => (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                      ))}
                    </Select>
                  </td>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" ,fontWeight:"normal"}}>{rows.subBatchNo}</td>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" ,fontWeight:"normal"}}>
                    <Select
                      value={rows.mcNo || "M/C No"}
                      className="custom-select"
                      disabled={formStatus}
                      onChange={(value) => setRows(prevRows => ({ ...prevRows, mcNo: value }))}
                    >
                      {itemsMc.map(option => (
                        <Option key={option.key} value={option.label}>{option.label}</Option>
                      ))}
                    </Select>
                  </td>
                  <td style={{ textAlign: "center", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" ,fontWeight:"normal"}}>
                    <Select
                      value={rows.timerSetting || "Timer"}
                      className="custom-select"
                      disabled={formStatus}
                      onChange={(value) => setRows(prevRows => ({ ...prevRows, timerSetting: value }))}
                    >
                      {items.map(option => (
                        <Option key={option.key} value={option.label}>{option.label}</Option>
                      ))}
                    </Select>
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
                  <td style={{ height: "80px", borderTop: "1px solid black", fontWeight: "bold", padding: "3px", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px" ,fontWeight:"normal"}}><textarea style={{ resize: "none", width: "100%", height: "100%", outline: "none", border: "none" }} value={rows.remarks} onChange={handleRemarksChange} readOnly={formStatus} /></td>
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
                  <td className='signature' style={{ height: "50px", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", textAlign: "center" ,fontWeight:"normal"}}>
                  {rows.supervisor_status === "SUPERVISOR_APPROVED" && (
                  <>
                    {rows.supervisor_sign} <br></br>{rows.supervisor_submit_on}
                  <br></br>
                  {getImage !== "" && (
                  <img className="signature"
                          src={getImage}
                          alt="Supervisor"
                          
                        />)}
                        </>
                  )}
                  </td>
                  <td className='signature' style={{ border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", textAlign: "center" ,fontWeight:"normal",fontWeight:"normal"}}>
                  {(rows.hod_status === "HOD_APPROVED" ||
                    rows.hod_status === "HOD_REJECTED") && (
                  <>
                    {rows.hod_sign}<br></br>{rows.hod_submit_on}
                  <br></br>
                  {getImage1 !== "" && (
                  <img className="signature"
                          src={getImage1}
                          alt="HOD"
                          
                        />)}
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

export default Bleach_f11;
