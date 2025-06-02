/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import logo from "../Assests/logo.png";
import axios from "axios";
import {
  Button,
  message,
  Select,
  Tooltip,
  Tabs,
  Input,
  Space,
  Row,
  Col,
} from "antd";
import { IoSave, IoPrint } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BleachingHeader from "../Components/BleachingHeader.js";

import { GoArrowLeft } from "react-icons/go";
import "../index.css";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import moment from "moment";

import API from "../baseUrl.json";
import { Table, Modal, Radio } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const HouseKeeping = () => {
  const { state } = useLocation();
  const [formatNo, setFormatNo] = useState("PH-HRD01/F-006");
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [rejectReason, setRejectReason] = useState("");
  const [statusLoader, setStatusLoader] = useState(false);
  const [formData, setFormData] = useState({
    reason: ''
  });
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/PadPunching/houseKeepingSummaryF006");
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
  };
  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };

  // resuable parts
  function getMonthName(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  function getYear(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }
  // end of resuable parts

  const navigateBack = (apiResponse) => {
    console.log('api response in navigate back', apiResponse);
    const role = localStorage.getItem("role");
    if (!apiResponse) {
      if (role !== "ROLE_SUPERVISOR") {
        message.warning('Supervisor not Approved Yet');
        navigate('/Precot/PadPunching/houseKeepingSummaryF006');
      }
 
 
    }
 
    if (role === "ROLE_HR") {
      if (!(apiResponse.supervisor_status === "SUPERVISOR_APPROVED"&&apiResponse.hr_status !=="HR_REJECTED")) {
        
        message.warning('Supervisor not Approved Yet');
        navigate('/Precot/PadPunching/houseKeepingSummaryF006');
 
      }
      
 
 
    }
    else if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
      if (!(apiResponse["supervisor_status"] === "SUPERVISOR_APPROVED"&&apiResponse.hr_status!=="HR_REJECTED")) {
        message.warning('Supervisor not Approved Yet');
        navigate('/Precot/PadPunching/houseKeepingSummaryF006');
      }
      else if (!(apiResponse["hr_status"] === "HR_APPROVED"&&apiResponse.hod_status!=="HOD_REJECTED")) {
        message.warning('HR not Approved Yet');
        navigate('/Precot/PadPunching/houseKeepingSummaryF006');
      }
    }
  }
  const canSaveDisplayButtons = () => {
    // ROLE_SUPERVISOR
    const role = localStorage.getItem('role')
    if (role === "ROLE_SUPERVISOR") {
      if (selectedValues && selectedValues.hasOwnProperty('supervisor_status') && selectedValues['supervisor_status'] === "SUPERVISOR_APPROVED") {

        return "none"
      }
    }
    else if (role === "ROLE_HR") {
      if (selectedValues && selectedValues.hasOwnProperty('hr_status') && selectedValues['hr_status'] === "HR_APPROVED") {
        return "none"
      }
    }
    else if (role === "ROLE_HOD") {
      if (selectedValues && selectedValues.hasOwnProperty('hod_status') && selectedValues['hod_status'] === "HOD_APPROVED") {
        return "none"
      }
    }

    return "block"

  }

  const canDisable = () => {
    // if supervisor need to disable radio buttons
    if (selectedValues && selectedValues.hasOwnProperty('supervisor_status') && selectedValues['supervisor_status'] === "SUPERVISOR_APPROVED") {
      // if supervisor approved and hr rejected need not to disable radio buttons
      if (selectedValues['hr_status'] === "HR_REJECTED" || selectedValues['hod_status'] === "HOD_REJECTED") {
        return false;
      }
      return true;

    }

    return false;
  }

  const canDisplayButtons = () => {
    // ROLE_SUPERVISOR
    const role = localStorage.getItem('role')
    if (role === "ROLE_SUPERVISOR") {
      if (selectedValues && selectedValues.hasOwnProperty('supervisor_status') && selectedValues['supervisor_status'] === "SUPERVISOR_APPROVED") {
        if (selectedValues['hr_status'] === "HR_REJECTED" || selectedValues['hod_status'] === "HOD_REJECTED") {
          return "block"
        }

        return "none"
      }
    }
    else if (role === "ROLE_HR") {
      if (selectedValues && selectedValues.hasOwnProperty('hr_status') && selectedValues['hr_status'] === "HR_APPROVED") {
        return "none"
      }
    }
    else if (role === "ROLE_HOD") {
      if (selectedValues && selectedValues.hasOwnProperty('hod_status') && selectedValues['hod_status'] === "HOD_APPROVED") {
        return "none"
      }
    }



    return "block"

  }

  // useEffect(() => {
  //   const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
  //   signatureKeys.forEach((key) => {
  //     const username = formData[key];
  //     if (username) {
  //       console.log("usernameparams", username);

  //       axios
  //         .get(
  //           `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: "Bearer " + token,
  //             },
  //             responseType: "arraybuffer",
  //           }
  //         )
  //         .then((res) => {
  //           console.log("Response:", res.data);
  //           const base64 = btoa(
  //             new Uint8Array(res.data).reduce(
  //               (data, byte) => data + String.fromCharCode(byte),
  //               ""
  //             )
  //           );
  //           const url = `data:image/jpeg;base64,${base64}`;
  //           setESign((prevSign) => ({
  //             ...prevSign,
  //             [key]: url,
  //           }));
  //         })
  //         .catch((err) => {
  //           console.log("Error in fetching image:", err);
  //         });
  //     }
  //   });
  // }, [token, formData]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = () => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Making the API call with axios
        axios.get(`${ API.prodUrl}/Precot/api/PadPunching/Service/getDateHouseKeepingF26`, {
          params: { date: state.date }, // Adding the date as a query parameter
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        })
          .then(response => {
            if (response.data.length > 0) {
            
            setSelectedValues(response.data[0]);
            console.log('API Response:', response.data[0]);
            navigateBack(response.data[0]);
            }
            // setData(response.data); 
          })
          .catch(error => {
            // Handling any errors
            console.error('Error fetching data:', error);
          });
      };

      fetchData();
    }
  }, []);


  const handleSave = () => {
    setStatusLoader(true);

    selectedValues['unit'] = "unit H";
    selectedValues['formatName'] = "Housekeeping Checklist";
    selectedValues['formatNo'] = 'F26-003'
    selectedValues['revisionNo'] = 3
    selectedValues['refSopNo'] = 'SOP-002'
    selectedValues['frequency'] = 'Weekly'
    selectedValues['date'] = state.date;


    // getting date from navigate
    const monthName = getMonthName(state.date);
    selectedValues['month'] = monthName;
    const year = getYear(state.date);
    selectedValues['year'] = year;

    console.log('save data', selectedValues);

    const updatedValues = {
      ...selectedValues,
      unit: "unit H",
      formatName: "Housekeeping Checklist",
      formatNo: 'F26-003',
      revisionNo: 3,
      refSopNo: 'SOP-002',
      frequency: 'Weekly',
      
      floor_cleaning: selectedValues['floor_cleaning'] || 'NA',
      removel_unwanted_meterials: selectedValues['removel_unwanted_meterials'] || 'NA', // Set default to 'NA' if not present
      side_wall_corners: selectedValues['side_wall_corners'] || 'NA',
      windows: selectedValues['windows'] || 'NA',
      floor_cleaning_wet: selectedValues['floor_cleaning_wet'] || 'NA',
      
      emergency_door: selectedValues['emergency_door'] || 'NA',
      fire_extinguishers: selectedValues['fire_extinguishers'] || 'NA',
      first_aid_box: selectedValues['first_aid_box'] || 'NA',
      rapid_doors: selectedValues['rapid_doors'] || 'NA',
      false_ceiling: selectedValues['false_ceiling'] || 'NA',
      remarks: selectedValues['remarks'] || 'NA',
      trained_person: selectedValues['trained_person'] || 'NA',
      climate_controller:selectedValues['climate_controller'] || 'NA'
    };
    const token = localStorage.getItem('token');
    // Making the API call with axios
    axios.post(`${ API.prodUrl}/Precot/api/PadPunching/Service/saveHouseKepping26`, updatedValues, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then(response => {
        // Handling the response
        setSelectedValues(response.data);
        console.log('API Response:', response.data);
        message.success("Saved successFully!");

      })
      .catch(error => {
        // Handling any errors
        console.error('Error saving data:', error);

      })
      .finally(() => {
        setStatusLoader(false);
        navigate('/Precot/PadPunching/houseKeepingSummaryF006');
      })
      ;
  };

  const handleApprove = () => {
    setStatusLoader(true);
    const payload = {
      "id": selectedValues['clean_id'],
      "status": "Approve"
    }
    axios.put(`${ API.prodUrl}/Precot/api/PadPunching/Service/approveRejectF26`, payload, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then(response => {
        // Handling the response


        message.success(response.data.message);
        navigate('/Precot/PadPunching/houseKeepingSummaryF006')

      })
      .catch(error => {
        // Handling any errors
        console.error('Error saving data:', error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  }

  const handleReject = () => {
    setStatusLoader(true);
    const payload = {
      "id": selectedValues['clean_id'],
      "status": "Reject",
      "remarks": rejectReason
    }
    setStatusLoader(true);
    axios.put(`${ API.prodUrl}/Precot/api/PadPunching/Service/approveRejectF26`, payload, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then(response => {
        // Handling the response


        message.success(response.data.message);
        navigate('/Precot/PadPunching/houseKeepingSummaryF006');

      })
      .catch(error => {
        // Handling any errors
        console.error('Error saving data:', error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  }

  const handleSubmit = () => {
    setStatusLoader(true);

    selectedValues['unit'] = "unit H";
    selectedValues['formatName'] = "Housekeeping Checklist F266";
    selectedValues['formatNo'] = 'F26-003'
    selectedValues['revisionNo'] = 3
    selectedValues['refSopNo'] = 'SOP-002'
    selectedValues['frequency'] = 'Weekly'
    
    // getting date from navigate
    const monthName = getMonthName(state.date);
    selectedValues['month'] = monthName;
    const year = getYear(state.date);
    selectedValues['year'] = year;

    console.log('save data', selectedValues);
    const updatedValues = {
      ...selectedValues,
      unit: "unit H",
      formatName: "Housekeeping Checklist",
      formatNo: 'F26-003',
      revisionNo: 3,
      refSopNo: 'SOP-002',
      frequency: 'Weekly',
      date: state.date,
      floor_cleaning: selectedValues['floor_cleaning'] || 'NA',
      removel_unwanted_meterials: selectedValues['removel_unwanted_meterials'] || 'NA', // Set default to 'NA' if not present
      side_wall_corners: selectedValues['side_wall_corners'] || 'NA',
      windows: selectedValues['windows'] || 'NA',
      floor_cleaning_wet: selectedValues['floor_cleaning_wet'] || 'NA',

      emergency_door: selectedValues['emergency_door'] || 'NA',
      fire_extinguishers: selectedValues['fire_extinguishers'] || 'NA',
      first_aid_box: selectedValues['first_aid_box'] || 'NA',
      rapid_doors: selectedValues['rapid_doors'] || 'NA',
      false_ceiling: selectedValues['false_ceiling'] || 'NA',
      remarks: selectedValues['remarks'] || 'NA',
      trained_person: selectedValues['trained_person'] || 'NA',
        climate_controller:selectedValues['climate_controller'] || 'NA',
      reason: null
    };
    const token = localStorage.getItem('token');

    // Making the API call with axios
    axios.post(`${ API.prodUrl}/Precot/api/PadPunching/Service/SubmitHouseKeepingF26`, updatedValues, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then(response => {
        // Handling the response

        console.log('API Response:', response.data);
        setSelectedValues(response.data);
        message.success(response.data.message);
        navigate('/Precot/PadPunching/houseKeepingSummaryF006');
      })
      .catch(error => {
        // Handling any errors
        console.error('Error saving data:', error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
    ;
  }

  // Above are base part

  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [newDate, setNewDate] = useState("");
  const formattedDate = moment(newDate).format("DD/MM/YYYY HH:mm");

  const [selectedValues, setSelectedValues] = useState(
    {

    }
  );
  const handleBulkYes = () => {
    const newValues = {
      floor_cleaning: "Y",
      removel_unwanted_meterials: "Y",
      side_wall_corners: "Y",
      floor_cleaning_wet: "Y",
      emergency_door: "Y",
      fire_extinguishers: "Y",
      first_aid_box: "Y",
      false_ceiling: "Y",
      windows:"Y",
      rapid_doors:"Y",
      climate_controller:"Y"

    };
    setSelectedValues(newValues);
  };
  const handleBulkNo= () => {
    const newValuesNo= {
      floor_cleaning: "N",
      removel_unwanted_meterials: "N",
      side_wall_corners: "N",
      floor_cleaning_wet: "N",
      emergency_door: "N",
      fire_extinguishers: "N",
      first_aid_box: "N",
      false_ceiling: "N",
      windows:"N",
      rapid_doors:"N",
      climate_controller:"N"
    };
    setSelectedValues(newValuesNo);
  };

  const handleChange = (key, e) => {
    setSelectedValues({
      ...selectedValues,
      [key]: e.target.value,
    });
    console.log(`Row ${key} selected value:`, e.target.value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const formatDateOnly = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();


    return `${day}/${month}/${year}`;
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      width: 10,
      align: "center",
      render: (text) => <span style={{ fontSize: "12px" }}>{text}</span>,
    },
    {
      title: "Cleaning Area",
      dataIndex: "cleaningArea",
      key: "cleaningArea",
      width: 60,
      align: "center",
      render: (text) => <span style={{ fontSize: "12px" }}>{text}</span>,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      width: 30,
      align: "center",
      render: (text) => <span style={{ fontSize: "12px" }}>{text}</span>,
    },
    {
      title: formatDateOnly(state.date),
      dataIndex: "actions",
      key: "actions",
      align: "center",
      width: 80,
    },
  ];
  const data = [
    {
      key: "1",
      srNo: "1",
      cleaningArea: "Floor cleaning - Dry",
      frequency: "Once in a day",
      actions:
        <Radio.Group
          onChange={(e) => handleChange("floor_cleaning", e)}
          value={selectedValues ? selectedValues["floor_cleaning"] : ''}
          disabled={canDisable()}
        >
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>

        </Radio.Group>
    },
    {
      key: "2",
      srNo: "2",
      cleaningArea: "Removal of unwanted materials",
      frequency: "Once in a day",
      actions:
        <Radio.Group onChange={(e) => handleChange("removel_unwanted_meterials", e)} value={selectedValues ? selectedValues["removel_unwanted_meterials"] : ''}
          disabled={canDisable()}
        >
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },
    {
      key: "3",
      srNo: "3",
      cleaningArea: "Side walls & corners ",
      frequency: "Once in a day",
      actions:
        <Radio.Group onChange={(e) => handleChange("side_wall_corners", e)} value={selectedValues ? selectedValues["side_wall_corners"] : ''}
          disabled={canDisable()}
        >
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },
    {
      key: "4",
      srNo: "4",
      cleaningArea: "Windows ",
      frequency: "Once in a day",
      actions:
        <Radio.Group onChange={(e) => handleChange("windows", e)} value={selectedValues ? selectedValues["windows"] : ''}

          disabled={canDisable()}
        >
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },
    {
      key: "5",
      srNo: "5",
      cleaningArea: "Floor cleaning - Wet",
      frequency: "Twice in a week",
      actions:
        <Radio.Group onChange={(e) => handleChange("floor_cleaning_wet", e)} value={selectedValues ? selectedValues["floor_cleaning_wet"] : ''}
          disabled={canDisable()}>
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },
    {
      key: "6",
      srNo: "6",
      cleaningArea: "Emergency Doors ",
      frequency: "Twice in a week",
      actions:
        <Radio.Group onChange={(e) => handleChange("emergency_door", e)} value={selectedValues ? selectedValues["emergency_door"] : ''}
          disabled={canDisable()}>
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },
    {
      key: "7",
      srNo: "7",
      cleaningArea: "Fire Extinguishers",
      frequency: "Twice in a week",
      actions:
        <Radio.Group onChange={(e) => handleChange("fire_extinguishers", e)} value={selectedValues ? selectedValues["fire_extinguishers"] : ''} disabled={canDisable()}>

          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },
    {
      key: "8",
      srNo: "8",
      cleaningArea: "First Aid Box ",
      frequency: "Twice in a week",
      actions:
        <Radio.Group onChange={(e) => handleChange("first_aid_box", e)} value={selectedValues ? selectedValues["first_aid_box"] : ''} disabled={canDisable()}>
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },
    {
      key: "9",
      srNo: "9",
      cleaningArea: "Rapid Doors ",
      frequency: "Twice in a week",
      actions:
        <Radio.Group onChange={(e) => handleChange("rapid_doors", e)} value={selectedValues ? selectedValues["rapid_doors"] : ''} disabled={canDisable()}>
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },
    {
      key: "10",
      srNo: "10",
      cleaningArea: "climate Controller",
      frequency: "Twice in a week",
      actions:
        <Radio.Group onChange={(e) => handleChange("climate_controller", e)} value={selectedValues ? selectedValues["climate_controller"] : ''} disabled={canDisable()}>
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },
    {
      key: "11",
      srNo: "11",
      cleaningArea: "False ceiling",
      frequency: "Quarterly",
      actions:
        <Radio.Group onChange={(e) => handleChange("false_ceiling", e)} value={selectedValues ? selectedValues["false_ceiling"] : ''} disabled={canDisable()}>
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
          <Radio value="NA">NA</Radio>
        </Radio.Group>
    },

  ];

  return (
    <>
      <BleachingHeader
        formName={"House Keeping Cleaning Check List (Pad Punching)"}
        formatNo={"PH-HRD01/F-006"}
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
              display: canSaveDisplayButtons(),
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_SUPERVISOR" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={role == "ROLE_SUPERVISOR" ? handleSave : handleApprove}
            loading={statusLoader}
          >
            {role == "ROLE_SUPERVISOR" ? "Save" : "Approve"}
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: canDisplayButtons(),
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_SUPERVISOR" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Modal
        title="Reason For Reject"
        open={rejectModal}
        onCancel={handleCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleReject}
            loading={statusLoader}
          >
            Reject
          </Button>,
        ]}
      >
        <label>Reason : </label>
        <br></br>
        <br></br>
        <TextArea
          type="textArea"
          style={{ height: "100px" }}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        ></TextArea>
      </Modal>
      {/* above are base part */}
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" 
        onClick={handleBulkYes} 
        disabled={canDisable()}
        style={{ marginRight: 8 }}>
          Bulk Yes
        </Button>
        <Button type="primary"
         onClick={handleBulkNo}
         disabled={canDisable()}
         >
          Bulk No
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        rowClassName={(record) => {
          if (record.srNo === "2")
            return "row-with-bottom-border left-align";
          if (record.srNo === "1") return "left-align";
          if (record.key === "3") return "cleaned-by-row";
          return "";
        }}
      />

      <div>
        <Input
          addonBefore="Remark / Comment (in case of any abnormality observed) : "

          type="text"
          size="small"
          value={selectedValues ? selectedValues.remarks : ''}
          style={{ fontWeight: "bold" }}
          onChange={(e) => handleChange('remarks', e)}
          disabled={canDisable()}
        />
        <Input
          addonBefore="Cleaned by(Trained Person)"

          type="text"
          size="small"
          value={selectedValues ? selectedValues.trained_person : ''}
          style={{ fontWeight: "bold" }}
          onChange={(e) => handleChange('trained_person', e)}
          disabled={canDisable()}
        />
        <Input
          addonBefore="Verified by (Production Supervisor): "
          // placeholder="Date"
          type="text"
          size="small"
          value={
            selectedValues && selectedValues.supervisor_sign && selectedValues.supervisor_submit_on
              ? `${selectedValues.supervisor_sign} ${formatDate(selectedValues.supervisor_submit_on)}`
              : ''
          }
          style={{ fontWeight: "bold" }}
          // onChange={(e) => setVerifiedbySupervisor(e.target.value)}
          disabled="none"
        />
        <Input
          addonBefore="Verified by (HR): "
          // placeholder="Date"
          type="text"
          size="small"
          // value={`${hrSign}   ${formatDate(hrSubmitOn)}`}
          value={
            selectedValues && selectedValues.hr_sign && selectedValues.hr_submit_on
              ? (selectedValues.hr_status === "WAITING_FOR_APPROVAL" || selectedValues.hr_status === ""
                ? ''
                : `${selectedValues.hr_sign} ${formatDate(selectedValues.hr_submit_on)}`
              )
              : ''
          }
          style={{ fontWeight: "bold" }}
          // onChange={(e) => setVerifiedbyHR(e.target.value)}
          disabled="none"
        />
        <Input
          addonBefore="Reviewed by HOD (atleast once in a month) :  "
          // placeholder="Date"
          type="text"
          size="small"
          value={
            selectedValues && selectedValues.hod_sign && selectedValues.hod_submit_on
              ? (selectedValues.hod_status === "WAITING_FOR_APPROVAL" || selectedValues.hod_status === ""
                ? ''
                : `${selectedValues.hod_sign} ${formatDate(selectedValues.hod_submit_on)}`
              )
              : ''
          }

          style={{ fontWeight: "bold" }}

          disabled="none"
        />
      </div>

    </>
  )
}

export default HouseKeeping;