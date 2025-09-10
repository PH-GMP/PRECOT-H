/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import {
  Table,
  Radio,
  Input,
  Typography,
  Form,
  Row,
  Col,
  Tabs,
  Select,
  Button,
  Modal,
  Menu,
  Avatar,
  Drawer,
} from "antd";
import { DatePicker } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";
import BleachingHeader from "../Components/BleachingHeader";
import { useParams } from "react-router";
import { message } from "antd";
import { FaRegSave } from "react-icons/fa";
import { GoFileSubmodule } from "react-icons/go";
import { IoCreate, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { FaLock } from "react-icons/fa6";
import { deprecationHandler } from "moment";
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import TextArea from "antd/es/input/TextArea";
import { TbMenuDeep } from "react-icons/tb";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const initialDataSource1 = [
  {
    key: "laydown_area_cleaning",
    sno: 1,
    particular: "Laydown area cleaning",
    status: null,
  },
  {
    key: "blendomat_cleaning",
    sno: 2,
    particular: "Blendomat cleaning",
    status: null,
  },
  {
    key: "brf_425_cleaning",
    sno: 3,
    particular: "BRF 425 cleaning",
    status: null,
  },
  {
    key: "fire_diverotor_cleaning",
    sno: 4,
    particular: "Fire divertor cleaning",
    status: null,
  },
  {
    key: "metel_detector_cleaning",
    sno: 5,
    particular: "Metal Detector Cleaning",
    status: null,
  },
  {
    key: "clp_unit_cleaning",
    sno: 6,
    particular: "CL - P Unit 1 & 2 Cleaning",
    status: null,
  },
  {
    key: "brf_425_unit",
    sno: 7,
    particular: "BRF - 425 Unit 1 & 2 Cleaning",
    status: null,
  },
];

const initialDataSource2 = [
  {
    key: "mpm_unit_cleaning",
    sno: 8,
    particular: "MPM Unit 1 & 2 Cleaning",
    status: null,
  },
  {
    key: "applied_unit_cleaning_one",
    sno: 9,
    particular: "Applied unit 1 & 2 Cleaning",
    status: null,
  },
  {
    key: "erm_unit_cleaning",
    sno: 10,
    particular: "ERM Unit 1&2 Cleaning",
    status: null,
  },
  {
    key: "ccp_unit_cleaning",
    sno: 11,
    particular: "CCP unit 1 & 2 Cleaning",
    status: null,
  },
  {
    key: "dustex_unit_cleaning",
    sno: 12,
    particular: "Dustex Unit 1& 2 Cleaning",
    status: null,
  },
  {
    key: "carding_machines_cleaning",
    sno: 13,
    particular: "Carding Machins (1 to 6) Cleaning",
    status: null,
  },
  {
    key: "hennatex_condenser_unit",
    sno: 14,
    particular: "Hennatex condensor Unit Cleaning",
    status: null,
  },
];

const initialDataSource3 = [
  {
    key: "cakepress_machine_cleaning",
    sno: 15,
    particular: "Cake Press Machine 1 & 2 Cleaning",
    status: null,
  },
  {
    key: "kier_machine_chemical_clean",
    sno: 16,
    particular:
      "Kier machine 1, 2 & 3 cleaning & Chemical dispenser Cleaning",
    status: null,
  },
  {
    key: "chemical_buckets_chemical_weighing_balance_cleaning",
    sno: 17,
    particular: "Chemical Buckets Chemical Weighing Balance Cleaning",
    status: null,
  },
  {
    key: "hydro_machine_cleaning",
    sno: 18,
    particular: "Hydro Machine 1 & 2 Cleaning",
    status: null,
  },
  {
    key: "cake_opener_clean",
    sno: 19,
    particular: "Cake Opener Cleaning",
    status: null,
  },
  {
    key: "dryer_cleaning",
    sno: 20,
    particular: "Dry cleaning (6 Chamber Filters)",
    status: null,
  },
  {
    key: "mtf_unit_clean",
    sno: 21,
    particular: "MTF Unit cleaning",
    status: null,
  },
];

const initialDataSource4 = [
  {
    key: "rieter_clean",
    sno: 22,
    particular: "Rieter 1 & 2 Cleaning",
    status: null,
  },
  {
    key: "applied_unit_cleaning_two",
    sno: 23,
    particular: "Applied unit 1 & 2 Cleaning",
    status: null,
  },
  {
    key: "metal_fire_detector",
    sno: 24,
    particular: "Metal & Fire Detector Cleaning",
    status: null,
  },
  {
    key: "balepress_conveyor_cleaning",
    sno: 25,
    particular: "Bale Press condensor & Conveyor Cleaning",
    status: null,
  },
  {
    key: "balepress_stapper_mechine_cleaning",
    sno: 26,
    particular: "Bale Press Strapper machine Cleaning",
    status: null,
  },
  {
    key: "bale_evacuation_weight_machine_cleaning",
    sno: 27,
    particular: "Bale Evacuation & Weighing Machine Cleaning",
    status: null,
  },
  {
    key: "bake_storage_floor_cleaning",
    sno: 28,
    particular: "Bake Storage Floor Cleaning",
    status: null,
  },
];




// const columns = (handleStatusChange) => [
//   {
//     title: "S.No",
//     dataIndex: "sno",
//     key: "sno",
//     width: "10%",
//   },
//   {
//     title: "Particular's",
//     dataIndex: "particular",
//     key: "particular",
//     width: "60%",
//   },
//   {
//     title: "Status",
//     key: "status",
//     width: "30%",
//     render: (_, record) => (
//       <Radio.Group
//         value={record.status}
//         onChange={(e) => handleStatusChange(record.key, e.target.value)}
//       >
//         <Radio value="Yes">Yes</Radio>
//         <Radio value="No">No</Radio>
//       </Radio.Group>
//     ),
//   },
// ];

const Bleaching_f38 = () => {
  const [dataSource1, setDataSource1] = useState(initialDataSource1);
  const [dataSource2, setDataSource2] = useState(initialDataSource2);
  const [dataSource3, setDataSource3] = useState(initialDataSource3);
  const [dataSource4, setDataSource4] = useState(initialDataSource4);
  const [activeKey, setActiveKey] = useState("1");
  const [activeKey1, setActiveKey1] = useState("2");
  const [activeKey2, setActiveKey2] = useState("3");
  const [activeKey3, setActiveKey3] = useState("4");
  const [open, setOpen] = useState(false);
  const [cardingModal,setCardingModal] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  

  // const [mixingChangeOverfrom, setMixingChangeOverfrom] = useState('');
  const [mixingChangeOverTo, setMixingChangeOverTo] = useState("");
  const [bmrNoFrom, setBmrNoFrom] = useState("");
  const [bmrNoTo, setBmrNoTo] = useState("");
  // const [supervisorSign, setSupervisorSign] = useState('');
  const [supervisorSign, setSupervisorSign] = useState("");
  const [departmentSign, setDepartmentSign] = useState("");
  // const [departmentSign, setDepartmentSign] = useState(localStorage.getItem("username") || '');
  const [mixingChangeOverfromOptions, setMixingChangeOverfromOptions] =
    useState([]);
  const [MixingBMRfromOptions, setMixingBMRfromOptions] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [recordId, setRecordId] = useState(null);
  const [date, setDate] = useState(null);
  const [form] = Form.useForm();
  const [hodStatus, setHodstatus] = useState(
    localStorage.getItem("hodStatus") || null
  );
  const [supervisorstatus, setsupervisorStatus] = useState(null);
  const [mixingChangeOverfrom, setmixingChangeOverfrom] = useState(null);
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [printBtnStatus, setPrintBtnStatus] = useState(false);
  const [disable, setDisable] = useState(false);
  const [mixingChangeOverToOptions, setMixingChangeOverToOptions] = useState(
    []
  );
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [supervisorsubmittedon, Setsupervisorsubmiitedon] = useState("");
  const [hodsubmittedon, Sethodsubmittedonon] = useState("");

  const [Mailstatus, setMailStatus] = useState("");
  const [supervisorsavedby, setSupervisorsavedby] = useState("");

  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [cleaningStatuses, setCleaningStatuses] = useState({
    laydownAreaCleaning: null,
    blendomatCleaning: null,
    brf425Cleaning: null,
    fireDivertorCleaning: null,
    metalDetectorCleaning: null,
    clpUnitCleaning: null,
    brf425Unit: null,
    mpmUnitCleaning: null,
    appliedUnitCleaningOne: null,
    ermUnitCleaning: null,
    ccpUnitCleaning: null,
    dustexUnitCleaning: null,
    hennatexCondenserUnit: null,
    cakepressMachineCleaning: null,
    kierMachineChemicalClean: null,
    hydroMachineCleaning: null,
    cakeOpenerClean: null,
    dryerCleaning: null,
    mtfUnitClean: null,
    rieterClean: null,
    appliedUnitCleaningTwo: null,
    metalFireDetector: null,
    balepressConveyorCleaning: null,
    balepressStapperMachineCleaning: null,
    baleEvacuationWeightMachineCleaning: null,
    chemicalBucketsWeightBalanceCleaning: null,
    cardingmachinescleaning: null,
    chemicalbucketschemicalweighingbalancecleaning: null,
    bakestoragefloorcleaning: null,
  });

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
  };

  const selecteddate = localStorage.getItem("date");

  const selectedbmrfrom = localStorage.getItem("bmrNoFrom");

  const selectedbmrto = localStorage.getItem("bmrNoTo");

  // console.log("selecteddate", selecteddate);

  const role = localStorage.getItem("role");

  const username = localStorage.getItem("username") || "";

  // useEffect(() => {
  //   // const role = localStorage.getItem(role);
  //   // console.log(" Submit role ", role);
  //   if (role == "ROLE_SUPERVISOR") {
  //     //ROLE_SUPERVISOR
  //     // setIsSupervisorIn(true);

  //     // setSupervisorStatus("SUPERVISOR_SUBMITTED");
  //     setSupervisorSign(localStorage.getItem("username"));
  //     // // console.log("Production sign ", supervisor);
  //   }
  //   if (role == "ROLE_HOD") {
  //     // setIsHodLoggedIn(true);
  //     // setHodStatus("HOD_SUBMITTED");
  //     setDepartmentSign(localStorage.getItem("username"));

  //   }
  // });

  
  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = supervisorSign;
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
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [supervisorSign,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = departmentSign;
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
  }, [hodStatus,API.prodUrl, token]);

  const { id } = useParams();

  const formatDate = (date) => {
    if (!date) return null;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(date);

  const formatDateForInput = (date) => {
    if (!date) return "";
    const [day, month, year] = date.toLocaleDateString("en-GB").split("/");
    return `${year}-${month}-${day}`;
  };

  const formatDateForInputs = (date) => {
    if (!date) return "";
    const [day, month, year] = date.toLocaleDateString("en-GB").split("/");

    return `${day}/${month}/${year}`;
  };

  const formatDateForPayload = (date) => {
    if (!date) return null;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day} ${month} ${year}`;
  };

  const handleNativeDateChange = (e) => {
    const dateString = e.target.value; // This will be in YYYY-MM-DD format
    const [year, month, day] = dateString.split("-");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    setDate(formattedDate);
  };

  const handleMixingChangeOverfromChange = (value) => {
    setmixingChangeOverfrom(value);
  };

  const handleSupervisorSignChange = (e) => {
    setSupervisorSign(e.target.value);
  };

  const handleDepartmentSignChange = (e) => {
    setDepartmentSign(e.target.value);
  };

  const handleMixingChangeOverToChange = (value) => {
    setMixingChangeOverTo(value);
  };

  const handleBmrNoFromChange = (value) => {
    setBmrNoFrom(value);
  };

  const handleBmrNoToChange = (value) => {
    setBmrNoTo(value);
  };

  const handleStatusChange = (key, value, dataSource, setDataSource) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, status: value };
      }
      return item;
    });
    setDataSource(newData);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderRadioGroup = (record, role,handleStatusChange) => {
    if (role === 'ROLE_SUPERVISOR' && !disable == true ) {
      // console.log( " first condision") // replace 'desiredRole' with the actual role you want to check
      return (
        <Radio.Group
          value={record.status}
          onChange={(e) => { handleStatusChange(record.key, e.target.value)
            if(record.key == "carding_machines_cleaning"){
              setCardingModal(true);
            }
          }
        }
        >
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      );
    } else if (role === 'ROLE_SUPERVISOR' && disable == true) { // replace 'desiredRole' with the actual role you want to check
     // console.log("condition")
      return (
        <Radio.Group
          value={record.status}
          onChange={(e) => { handleStatusChange(record.key, e.target.value)
            if(record.key == "carding_machines_cleaning"){
              setCardingModal(true);
            }
          }
        }
          disabled
        >
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      );
    }
     else {
      // Return null or any alternative rendering if the role does not match
      return (
        <Radio.Group
          value={record.status}
          onChange={(e) => handleStatusChange(record.key, e.target.value)}
          disabled
        >
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      );
    }
  };
  const columns = (handleStatusChange) => [
    
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      width: "10%",
    },
    {
      title: "Particular's",
      dataIndex: "particular",
      key: "particular",
      width: "60%",
    },
    {
      title: "Status",
      key: "status",
      width: "30%",
  
      // render: (_, record) => (
      //   <Radio.Group
      //     value={record.status}
      //     onChange={(e) => handleStatusChange(record.key, e.target.value)}
          
      //   >
      //     <Radio value="Yes">Yes</Radio>
      //     <Radio value="No">No</Radio>
      //   </Radio.Group>
      // ),
      // Assuming you have access to the role variable
      render: (_, record) => renderRadioGroup(record, role,handleStatusChange)
    },
  ];

  const handleBack = () => {
    if (role == "ROLE_SUPERVISOR") {
      navigate("/Precot/Bleaching/F-38/Supervisor_Summary");
    } else {
      navigate("/Precot/Bleaching/F-38/HOD_Summary");
    }
  };

  // const handleBulkApproval = (status) => {
  //   const tab = tabContents.find(tab => tab.key === activeKey );
  //   if (tab && tab.dataSource) {
  //     const updatedDataSource = tab.dataSource.map(item => ({ ...item, status }));
  //     tab.setDataSource(updatedDataSource);
  //   }
  // };
  
  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF02`,
        {
          id: recordId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-38/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

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
        `${API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF02`,
        {
          id: recordId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-38/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleBulkApproval = (status) => {
    tabContents.forEach((tab) => {
      if (tab.dataSource && tab.setDataSource) {
        tab.dataSource.map((item) => {
          if(item.key === 'carding_machines_cleaning'){
            setCardingModal(true);
          }
      });
        const updatedDataSource = tab.dataSource.map(item => ({ ...item, status }));
        tab.setDataSource(updatedDataSource);
      }
    });
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/getBmrFromToSummeryF38?date=${selecteddate}&bmrFrom=${selectedbmrfrom}&bmrTo=${selectedbmrto}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log( "Get Api Response " , response.data);
        const data = null;
        // console.log("first response" , response.data.length);
        // // console.log("first Response value", response.data[0]);
        // // console.log("role", role);
    
        if (response.data == "No Data Found !!!") {
          if(role === "ROLE_SUPERVISOR"){
            // console.log("No data available");
            setSubmitBtnStatus(true);
            setSaveBtnStatus(true);
            // setDisable(true);
          }
          // return; // Exit if there's no data
      }else{
        // setDisable(true);
        const fetchedData = response.data[0];
        // console.log("Value" , fetchedData);
        setmixingChangeOverfrom(fetchedData.mix_changeover_from);
        setMixingChangeOverTo(fetchedData.mix_changeover_to);
        setBmrNoFrom(fetchedData.bmr_no_from);
        setBmrNoTo(fetchedData.bmr_no_to);
        setSupervisorSign(fetchedData.supervisor_sign);
        setDepartmentSign(fetchedData.hod_sign);
        setsupervisorStatus(fetchedData.supervisor_status);
        setHodstatus(fetchedData.hod_status);
        Setsupervisorsubmiitedon(fetchedData.supervisor_submit_on);
        Sethodsubmittedonon(fetchedData.hod_submit_on);

        const dateParts = fetchedData.date.split("/");
        const formattedDate = new Date(
          `20${dateParts[2]}`,
          dateParts[1] - 1,
          dateParts[0]
        );
        setDate(formattedDate);

        setCleaningStatuses({
          laydownAreaCleaning: fetchedData.laydown_area_cleaning,
          blendomatCleaning: fetchedData.blendomat_cleaning,
          brf425Cleaning: fetchedData.brf_425_cleaning,
          fireDivertorCleaning: fetchedData.fire_diverotor_cleaning,
          metalDetectorCleaning: fetchedData.metel_detector_cleaning,
          clpUnitCleaning: fetchedData.clp_unit_cleaning,
          brf425Unit: fetchedData.brf_425_unit,
          mpmUnitCleaning: fetchedData.mpm_unit_cleaning,
          appliedUnitCleaningOne: fetchedData.applied_unit_cleaning_one,
          ermUnitCleaning: fetchedData.erm_unit_cleaning,
          ccpUnitCleaning: fetchedData.ccp_unit_cleaning,
          dustexUnitCleaning: fetchedData.dustex_unit_cleaning,
          hennatexCondenserUnit: fetchedData.hennatex_condenser_unit,
          cakepressMachineCleaning: fetchedData.cakepress_machine_cleaning,
          kierMachineChemicalClean: fetchedData.kier_machine_chemical_clean,
          hydroMachineCleaning: fetchedData.hydro_machine_cleaning,
          cakeOpenerClean: fetchedData.cake_opener_clean,
          dryerCleaning: fetchedData.dryer_cleaning,
          mtfUnitClean: fetchedData.mtf_unit_clean,
          rieterClean: fetchedData.rieter_clean,
          appliedUnitCleaningTwo: fetchedData.applied_unit_cleaning_two,
          metalFireDetector: fetchedData.fire_diverotor_cleaning,
          balepressConveyorCleaning: fetchedData.balepress_conveyor_cleaning,
          balepressStapperMachineCleaning:
            fetchedData.balepress_stapper_mechine_cleaning,
          baleEvacuationWeightMachineCleaning:
            fetchedData.bale_evacuation_weight_machine_cleaning,
          chemicalBucketsWeightBalanceCleaning:
            fetchedData.chemical_buckets_chemical_weighing_balance_cleaning,
          cardingmachinescleaning: fetchedData.carding_machines_cleaning,
          chemicalbucketschemicalweighingbalancecleaning:
            fetchedData.chemical_buckets_chemical_weighing_balance_cleaning,
          bakestoragefloorcleaning: fetchedData.bake_storage_floor_cleaning,
        });

        setDataSource1(
          initialDataSource1.map((item) => ({
            ...item,
            status: fetchedData[item.key],
          }))
        );

        setDataSource2(
          initialDataSource2.map((item) => ({
            ...item,
            status: fetchedData[item.key],
          }))
        );

        setDataSource3(
          initialDataSource3.map((item) => ({
            ...item,
            status: fetchedData[item.key],
          }))
        );

        setDataSource4(
          initialDataSource4.map((item) => ({
            ...item,
            status: fetchedData[item.key],
          }))
        );

      
       data = fetchedData;
      // console.log("data", data);
// // console.log("first data" , fetchedData)
const isRole = (roleCheck) => role === roleCheck;
const isStatus = (key, value) => data[key] === value || data[key] === null || data[key] === "";
// console.log("status". fetchedDate.data.hod_status);
// Initial state
setSubmitBtnStatus(false);
setPrintBtnStatus(false);
setDisable(true);

if (isRole("ROLE_SUPERVISOR")) {
  if (isStatus("supervisor_status", "SUPERVISOR_APPROVED") && isStatus("hod_status", "")) {
    setDisable(true);
  } else if (isStatus("supervisor_status", "SUPERVISOR_APPROVED") && isStatus("hod_status", "HOD_REJECTED")) {
    setSubmitBtnStatus(true);
    setDisable(false);
  }else if (isStatus("supervisor_status", "SUPERVISOR_APPROVED") && isStatus("hod_status", "HOD_APPROVED")) {
    // console.log("condition for supervisor");
    // setSubmitBtnStatus(false);
     setDisable(true);
  }
   else if (isStatus("supervisor_status", "") && isStatus("hod_status", "")) {
    setSubmitBtnStatus(true);
    setDisable(false);
  }
   else if (!data || data == "null") {
    setSaveBtnStatus(false);
    setSubmitBtnStatus(true);
    // console.log("status", response.data.length);
  }
} else if (isRole("ROLE_HOD")) {
  if (isStatus("hod_status", "WAITING_FOR_APPROVAL") && isStatus("supervisor_status", "SUPERVISOR_APPROVED")) {
    setSubmitBtnStatus(true);
    setDisable(true);
  } else if (isStatus("hod_status", "HOD_REJECTED") && isStatus("supervisor_status", "SUPERVISOR_APPROVED")) {
    setSubmitBtnStatus(false);
    setDisable(true);
  } else if (isStatus("hod_status", "HOD_APPROVED") && isStatus("supervisor_status", "SUPERVISOR_APPROVED")) {
    setSubmitBtnStatus(false);
    setDisable(true);
  } else if (isStatus("hod_status", "") && isStatus("hr_status", "") && isStatus("supervisor_status", "")) {
    // Do nothing or add specific logic if needed
  }
} else if (isRole("ROLE_DESIGNEE")) {
  if (isStatus("hod_status", "WAITING_FOR_APPROVAL") && isStatus("supervisor_status", "SUPERVISOR_APPROVED")) {
    setSubmitBtnStatus(true);
    setDisable(false);
  } else if (isStatus("hod_status", "") && isStatus("supervisor_status", "")) {
    // Do nothing or add specific logic if needed
  }
} else if (isStatus("hod_status", "HOD_APPROVED") && isStatus("supervisor_status", "SUPERVISOR_APPROVED")) {
  setPrintBtnStatus(true);
}
      }
       
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [selecteddate, selectedbmrfrom, selectedbmrto]); // Added dependencies for selecteddate, selectedbmrfrom, and selectedbmrto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/getMixchMachineF38?id=${
            id || recordId
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedData = response.data[0];

        setDataSource1(
          initialDataSource1.map((item) => ({
            ...item,
            status: fetchedData[item.key],
          }))
        );

        setDataSource2(
          initialDataSource2.map((item) => ({
            ...item,
            status: fetchedData[item.key],
          }))
        );

        setDataSource3(
          initialDataSource3.map((item) => ({
            ...item,
            status: fetchedData[item.key],
          }))
        );

        setDataSource4(
          initialDataSource4.map((item) => ({
            ...item,
            status: fetchedData[item.key],
          }))
        );
      } catch (error) {
        setError(error);
      }
    };

    if (id || recordId) {
      fetchData();
    }
  }, [id, recordId]);

  const disabledDate = (current) => {
    // Disable dates after today
    const today = new Date();
    return current && current > today;
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const token = localStorage.getItem("token");
      // console.log("Token from localStorage:", token);

      if (!mixingChangeOverTo || !mixingChangeOverfrom) {
        console.error("Mandatory fields are empty");
        message.error("Please fill all Mandatory fields");
        setSaveLoading(false);
        return;
      }

      const payload = {
        unit: "G",
        format_name: "Mixing Change Over",
        format_no: "PRD01/FR-38",
        revision_no: "03",
        ref_sop_no: "PRDO1-D-19",
        status: "Active",
        approval_status: "",
        date: selecteddate,
        mix_changeover_from: mixingChangeOverfrom,
        mix_changeover_to: mixingChangeOverTo,
        bmr_no_from: selectedbmrfrom,
        bmr_no_to: selectedbmrto,
        // supervisor_sign: supervisorSign,
        // hod_sign: departmentSign
      };

      dataSource1
        .concat(dataSource2, dataSource3, dataSource4)
        .forEach((item) => {
          payload[item.key] = item.status;
        });

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/Bleaching/Service/saveMixchMachineF38`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("API Response:", response.data);

      setRecordId(response.data.id);
      message.success("Form Saved Successfully");
      setSaveLoading(false);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Error while submitting:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(`${error.response.data.message}`);
      } else {
        message.error("Unable to Save");
      }
      setSaveLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const token = localStorage.getItem("token");
      // console.log("Token from localStorage:", token);

      if (!mixingChangeOverTo || !mixingChangeOverfrom) {
        console.error("Mandatory fields are empty");
        message.error("Please fill all Mandatory fields");
        return;
      }

      const allDataSources = [
        ...dataSource1,
        ...dataSource2,
        ...dataSource3,
        ...dataSource4,
      ];

      const allStatusesFilled = allDataSources.every(
        (item) => item.status !== null
      );

      if (!allStatusesFilled) {
        message.error("Please fill the status for all items");
        setSubmitLoading(false);
        return;
      }

      const payload = {
        unit: "H",
        format_name: "Mixing Change Over",
        format_no: "PH-PRD01/F-014",
        revision_no: "03",
        ref_sop_no: "PRDO1-D-19",
        status: "Active",
        approval_status: "",
        date: selecteddate,
        mix_changeover_from: mixingChangeOverfrom,
        mix_changeover_to: mixingChangeOverTo,
        bmr_no_from: selectedbmrfrom,
        bmr_no_to: selectedbmrto,
        // supervisor_sign: supervisorSign,
        // hod_sign: departmentSign,
        hod_status: hodStatus,
        // supervisor_submit_on:selecteddate,
        supervisor_status: supervisorstatus,
      };

      allDataSources.forEach((item) => {
        payload[item.key] = item.status;
      });

      if (recordId) {
        payload.id = recordId;
      }

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/Bleaching/Service/submitMixchMachineF38`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("API Response:", response.data);
      message.success(`${response.data.message}`);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error while submitting:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(`Unable to Submit: ${error.response.data.message}`);
      } else {
        message.error("Unable to Submit");
      }
      setSubmitLoading(false);
    }
  };

  // const combinedValue = supervisorSign && supervisorsubmittedon ? `${supervisorSign} ${supervisorsubmittedon.split('T')[0]}` : '';

  // const combinedHodValue = departmentSign && hodsubmittedon ? `${departmentSign} ${hodsubmittedon.split('T')[0]}` : '';

  const formattedsupervisorDate = supervisorsubmittedon
    ? new Date(supervisorsubmittedon).toLocaleDateString("en-GB", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      
  })
    : "";

  const formattedodDate = hodsubmittedon
    ? new Date(hodsubmittedon).toLocaleDateString("en-GB", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      
  })
    : "";

  const combinedValue =
    supervisorSign && supervisorsubmittedon
      ? `${supervisorSign} ${formattedsupervisorDate}`
      : "";

  const combinedHodValue =
    departmentSign && hodsubmittedon
      ? `${departmentSign} ${formattedodDate}`
      : "";

  const renderReviewsTab = () => (
    <Form layout="vertical">
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item label="Verified by Production Supervisor">
            {/* <Input
    value={combinedValue}

   
  /> */}
            {supervisorSign && supervisorsubmittedon ? (
              <div>
                {supervisorSign} <br />
                {formattedsupervisorDate}
                <br></br>
                {getImage !== "" && (
      <img className="signature"
                          src={getImage}
                          alt="Supervisor"
                          
                        />
                )}
              </div>
            ) : (
              ""
            )}

            <Form.Item label="Signature & Date" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Reviewed by Head of the Department / Designee">
            {/* <Input
              value={combinedHodValue}
     
            /> */}
            {departmentSign && hodsubmittedon ? (
              <div>
                {departmentSign} <br />
                {formattedodDate}
                <br></br>
                {getImage1 !== "" && (
      <img className="signature"
                          src={getImage1}
                          alt="HOD"
                         
                        />
                )}
              </div>
            ) : (
              ""
            )}
            <Form.Item label="Signature & Date" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const tabContents = [
    {
      key: "1",
      title: "Forms 1",
      dataSource: dataSource1,
      setDataSource: setDataSource1,
    },
    {
      key: "2",
      title: "Forms 2",
      dataSource: dataSource2,
      setDataSource: setDataSource2,
    },
    {
      key: "3",
      title: "Forms 3",
      dataSource: dataSource3,
      setDataSource: setDataSource3,
    },
    {
      key: "4",
      title: "Forms 4",
      dataSource: dataSource4,
      setDataSource: setDataSource4,
    },
    { key: "5", title: "Reviews", component: renderReviewsTab },
  ];

  useEffect(() => {
    const fetchLaydownNo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMapLaydown?MappingBmr_No=${selectedbmrfrom}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const JobOrderNo = response.data[0].job_order_no;
        fetchMixingData(JobOrderNo);
      } catch (error) {
        console.error("Error fetching laydown number:", error);
      }
    };

    const fetchMixingData = async (JobOrderNo) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMixingLov?orderNo=${JobOrderNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const options = response.data.map((item, index) => ({
          id: index,
          value: item.mix,
        }));

        setMixingChangeOverfromOptions(options);
      } catch (error) {
        console.error("Error fetching mixing data:", error);
      }
    };

    fetchLaydownNo();
  }, []);

  useEffect(() => {
    const fetchLaydownNoTo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMapLaydown?MappingBmr_No=${selectedbmrto}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const JobOrderNo = response.data[0].job_order_no;
        fetchMixingDataTo(JobOrderNo);
      } catch (error) {
        console.error("Error fetching laydown number to:", error);
      }
    };

    const fetchMixingDataTo = async (JobOrderNo) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMixingLov?orderNo=${JobOrderNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const options = response.data.map((item, index) => ({
          id: index,
          value: item.mix,
        }));

        setMixingChangeOverToOptions(options);
      } catch (error) {
        console.error("Error fetching mixing data to:", error);
      }
    };

    fetchLaydownNoTo();
  }, [selectedbmrto]);

  // useEffect(() => {
  //   const fetchMixingLOV = async () => {
  //     const token = localStorage.getItem("token");
  //     try {
  //       const response = await axios.get(
  //         "${API.prodUrl}/Precot/api/LOV/Service/mixingLOV",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setMixingChangeOverfromOptions(response.data);
  //     } catch (error) {
  //       console.error("Error fetching Mixing LOV:", error);
  //     }
  //   };

  //   fetchMixingLOV();
  // }, []);

  useEffect(() => {
    const fetchBMRLOV = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMixingBMRfromOptions(response.data);
      } catch (error) {
        console.error("Error fetching BMR LOV:", error);
      }
    };

    fetchBMRLOV();
  }, []);

  return (
    <div
      className="times-new-roman"
      style={{ fontSize: "12px", marginLeft: 30 }}
    >
    <Modal title = 'Card Machine Cleaning Confirmation' open={cardingModal} onCancel={() => setCardingModal(false)} onOk={() => setCardingModal(false)}>
      Are you sure of Carding Machines (1 to 6) Cleaning Status ?
      </Modal>
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
        unit="Unit-H"
        formName={
          <span>
            Mixing Change Over & Machine Cleaning Check list <br></br> Blow room
            & Bleaching
          </span>
        }
        formatNo="PH-PRD01/F-014"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <Button
              type="primary"
              onClick={handlePrint}
              style={{
                marginRight: 10,
                display: printBtnStatus ? "block" : "none",
              }}
            >
              Print
            </Button> */}
            <div>
              {
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
                    display: submitBtnStatus ? "block" : "none",
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
                    display: submitBtnStatus ? "block" : "none",
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              loading={saveLoading}
              size="medium"
              onClick={handleSave}
              style={{
                marginRight: 10,
                display: saveBtnStatus ? "block" : "none",
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              icon={<IoSave color="#00308F" />}
            >
              Save
            </Button>
            <Button
              loading={submitLoading}
              size="medium"
              onClick={handleSubmit}
              style={{
                marginRight: 10,
                display: submitBtnStatus ? "block" : "none",
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              icon={<GrDocumentStore color="#00308F" />}
            >
              Submit
            </Button>
            </div>
            </>
            )
        }
        </div>
            <Button
              size="medium"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              icon={<GoArrowLeft color="#00308F" />}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginLeft: 10,
                // display: saveBtnStatus ? "block" : "none",
              }}
              onClick={() => {
                if (confirm("Are you sure want to logout")) {
                  localStorage.removeItem("token");
                  navigate("/Precot");
                }
              }}
              shape="round"
              icon={<FaLock color="#00308F" />}
            >
              &nbsp;Logout
            </Button>
          </div>,
        ]}
      />

      <Row gutter={8}>
        <Col span={5}>
          <Form.Item label="Date:" required>
            <input
              // type="date"
              required
              disabled = {disable}
              style={{ width: "60%" }}
              // value={date ? formatDateForInput(date) : ""}
              value={selecteddate}
              onChange={handleNativeDateChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={6}>
          <Form.Item label="Mixing change over from:" required style={{marginLeft:-20}}>
            
            <Select
              style={{ width: "140px" }}
              disabled = {disable}
              onChange={handleMixingChangeOverfromChange}
              value={mixingChangeOverfrom}
              showSearch
              
            >
              {mixingChangeOverfromOptions
                .filter((option) => option.value !== mixingChangeOverTo)
                .map((option) => (
                  <Option key={option.id} value={option.value}>
                    {option.value}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Mixing change over to:" required>
           
            <Select
              style={{ width: "140px" }}
              disabled = {disable}
              onChange={handleMixingChangeOverToChange}
              value={mixingChangeOverTo}
              showSearch
            >
              {mixingChangeOverToOptions
                .filter(
                  (option) => option.value !== mixingChangeOverfromOptions.value
                )
                .map((option) => (
                  <Option key={option.id} value={option.value}>
                    {option.value}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="BMR No From :" required>
            <input required disabled = {disable} style={{ width: "60%" }} value={selectedbmrfrom} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="BMR No To:" required style={{marginLeft:-50}}>
            <input required disabled = {disable} style={{ width: "60%" }} value={selectedbmrto} />
          </Form.Item>
        </Col>
      </Row>
      <div style={{ marginBottom: 10 }}>
        <Button type="primary" onClick={() => handleBulkApproval("Yes")} style={{ marginRight: 10 }} disabled = {disable}>Yes</Button>
        <Button type="primary" onClick={() => handleBulkApproval("No")} disabled = {disable}>No</Button>
      </div>
     
      <Tabs defaultActiveKey="1">
        {tabContents.map((tab) => (
          <TabPane tab={tab.title} key={tab.key}>
            {tab.dataSource ? (
              <Form layout="vertical">
                <Row gutter={8}>
                  <Col span={12}>
                    <Table
                      dataSource={tab.dataSource}
                      columns={columns((key, value) =>
                        handleStatusChange(
                          key,
                          value,
                          tab.dataSource,
                          tab.setDataSource
                        )
                      )}
                      pagination={false}
                      bordered
                      size="small"
                    />
                  </Col>
                </Row>
              </Form>
            ) : (
              tab.component()
            )}
          </TabPane>
        ))}
      </Tabs>

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
      <div id="section-to-print">
        <table style={{ marginTop: "30px" }}>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="10"></td>
            </tr>

            <tr>
              <td colSpan="1" rowSpan="4" style={{ textAlign: "center" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <br></br>
                Unit H
              </td>

              <th
                colSpan="11"
                rowSpan="4"
                style={{ textAlign: "center", fontSize: 14, width: "50%" }}
              >
                Mixing Change Over & Cleaning Check list
                <br />
                Blow room & Bleaching
              </th>
              <td colSpan="1" style={{ width: "20%" }}>
                Format No.{" "}
              </td>
              <td colSpan="5"> PRDO1/F-38</td>
            </tr>
            <tr>
              <td colSpan="1">Revision No:</td>
              <td colSpan="5">03</td>
            </tr>
            <tr>
              <td colSpan="1">Ref.SOP No:</td>
              <td colSpan="5">PRDO1-D-19</td>
            </tr>
            <tr>
              <td colSpan="1">Page No:</td>
              <td colSpan="5">01 of 01</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="10"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="10"></td>
            </tr>
          </thead>
          <br />
          <tbody>
            <tr>
              <td colSpan="5">Date</td>
              <td colSpan="15"> {selecteddate}</td>
            </tr>
            <tr>
              <td colSpan="5">Mixing change over from</td>
              <td colSpan="5">{mixingChangeOverfrom}</td>
              <td colSpan="5">Mixing change over To</td>
              <td colSpan="5">{mixingChangeOverTo}</td>
            </tr>
            <tr>
              <td colSpan="5">BMR No From</td>
              <td colSpan="5">{selectedbmrfrom}</td>
              <td colSpan="5">BMR No To</td>
              <td colSpan="5">{selectedbmrto}</td>
            </tr>

            <tr>
              <td style={{ fontWeight: "bold" }} colSpan="1">
                S.No
              </td>
              <td style={{ fontWeight: "bold" }} colSpan="5">
                Particular's
              </td>
              <td style={{ fontWeight: "bold" }} colSpan="4">
                Status
              </td>
              <td style={{ fontWeight: "bold" }} colSpan="1">
                S.No
              </td>
              <td style={{ fontWeight: "bold" }} colSpan="5">
                Particular's
              </td>
              <td style={{ fontWeight: "bold" }} colSpan="4">
                Status
              </td>
            </tr>
            <tr>
              <td colSpan="1">1</td>
              <td colSpan="5">Laydown area cleaning</td>
              <td colSpan="4">{cleaningStatuses.laydownAreaCleaning}</td>
              <td colSpan="1">15</td>
              <td colSpan="5">Cake Press Machine 1 & 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.cakepressMachineCleaning}</td>
            </tr>
            <tr>
              <td colSpan="1">2</td>
              <td colSpan="5">Blendomat cleaning</td>
              <td colSpan="4">{cleaningStatuses.blendomatCleaning}</td>
              <td colSpan="1">16</td>
              <td colSpan="5">
                Kier machine 1, 2 & 3 cleaning & Chemical dispenser
                Cleaning
              </td>
              <td colSpan="4">{cleaningStatuses.kierMachineChemicalClean}</td>
            </tr>

            <tr>
              <td colSpan="1">3</td>
              <td colSpan="5">BRF 425 cleaning</td>
              <td colSpan="4">{cleaningStatuses.brf425Cleaning}</td>

              <td colSpan="1">17</td>
              <td colSpan="5">
                Chemical Buckets, chemical weighing balance cleaning
              </td>
              <td colSpan="4">
                {cleaningStatuses.chemicalBucketsWeightBalanceCleaning}
              </td>
            </tr>
            <tr>
              <td colSpan="1">4</td>
              <td colSpan="5">Fire divertor cleaning</td>
              <td colSpan="4">{cleaningStatuses.fireDivertorCleaning}</td>
              <td colSpan="1">18</td>
              <td colSpan="5">Hydro Machine 1 & 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.hydroMachineCleaning}</td>
            </tr>

            <tr>
              <td colSpan="1">5</td>
              <td colSpan="5">Metal Detector Cleaning</td>
              <td colSpan="4">{cleaningStatuses.metalDetectorCleaning}</td>
              <td colSpan="1">19</td>
              <td colSpan="5">Cake Opener Cleaning</td>
              <td colSpan="4">{cleaningStatuses.cakeOpenerClean}</td>
            </tr>
            <tr>
              <td colSpan="1">6</td>
              <td colSpan="5">CL - P Unit 1 & 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.clpUnitCleaning}</td>
              <td colSpan="1">20</td>
              <td colSpan="5">Dryer cleaning (6 Chamber Filters)</td>
              <td colSpan="4">{cleaningStatuses.dryerCleaning}</td>
            </tr>
            <tr>
              <td colSpan="1">7</td>
              <td colSpan="5">BRF - 425 Cleaning 1 & 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.brf425Unit}</td>
              <td colSpan="1">21</td>
              <td colSpan="5">MTF Unit cleaning</td>
              <td colSpan="4">{cleaningStatuses.mtfUnitClean}</td>
            </tr>
            <tr>
              <td colSpan="1">8</td>
              <td colSpan="5">MPM Unit 1 & 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.mpmUnitCleaning}</td>
              <td colSpan="1">22</td>
              <td colSpan="5">Rieter 1 & 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.rieterClean}</td>
            </tr>
            <tr>
              <td colSpan="1">9</td>
              <td colSpan="5">Applied unit 1 & 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.appliedUnitCleaningOne}</td>
              <td colSpan="1">23</td>
              <td colSpan="5">Applied unit 1 & 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.appliedUnitCleaningTwo}</td>
            </tr>
            <tr>
              <td colSpan="1">10</td>
              <td colSpan="5">ERM Unit 1&2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.ermUnitCleaning}</td>
              <td colSpan="1">24</td>

              <td colSpan="5">Metal & Fire Detector Cleaning</td>
              <td colSpan="4">{cleaningStatuses.metalFireDetector}</td>
            </tr>
            <tr>
              <td colSpan="1">11</td>
              <td colSpan="5">CCP unit 1 & 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.ccpUnitCleaning}</td>
              <td colSpan="1">25</td>
              <td colSpan="5">Bale Press condensor & Conveyor Cleaning</td>
              <td colSpan="4">{cleaningStatuses.balepressConveyorCleaning}</td>
            </tr>
            <tr>
              <td colSpan="1">12</td>
              <td colSpan="5">Dustex Unit 1& 2 Cleaning</td>
              <td colSpan="4">{cleaningStatuses.dustexUnitCleaning}</td>

              <td colSpan="1">26</td>
              <td colSpan="5">Bale Press Strapper machine Cleaning</td>
              <td colSpan="4">
                {cleaningStatuses.balepressStapperMachineCleaning}
              </td>
            </tr>
            <tr>
              <td colSpan="1">13</td>
              <td colSpan="5">Carding Machins (1 to 6) Cleaning</td>
              <td colSpan="4">{cleaningStatuses.cardingmachinescleaning}</td>
              <td colSpan="1">27</td>
              <td colSpan="5">Bale Evacuation & Weighing Machine Cleaning</td>
              <td colSpan="4">
                {cleaningStatuses.baleEvacuationWeightMachineCleaning}
              </td>
            </tr>
            <tr>
              <td colSpan="1">14</td>
              <td colSpan="5">Hennatex condensor Unit Cleaning</td>
              <td colSpan="4">{cleaningStatuses.hennatexCondenserUnit}</td>
              <td colSpan="1">28</td>

              <td colSpan="5">Bale Storage floor Cleaning</td>
              <td colSpan="4">{cleaningStatuses.bakestoragefloorcleaning}</td>
            </tr>

            <tr>
              <td colSpan="6.5">Verified by Production Supervisor</td>
              {/* <td colSpan="4" >{supervisorSign}</td> */}
              <td colSpan="4">
                {/* {supervisorSign && supervisorsubmittedon ? `${supervisorSign}  ${supervisorsubmittedon.split('T')[0]}` : ''} */}

                {supervisorSign && formattedsupervisorDate
                  ? `${supervisorSign} ${formattedsupervisorDate}`
                  : ""}
              </td>

              <td colSpan="6">Reviewed by Head of the Department / Designee</td>
              {/* <td colSpan="4" >{ departmentSign}</td> */}
              <td colSpan="4">
                {/* {departmentSign && hodsubmittedon ? `${departmentSign} ${hodsubmittedon.split('T')[0]}` : ''} */}
                {departmentSign && hodsubmittedon
                  ? `
${departmentSign}
${formattedodDate}
`
                  : ""}
              </td>
            </tr>
          </tbody>
          <br />
          <tfoot>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="10"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="10"></td>
            </tr>
            <tr>
              <td colSpan="5">Particular </td>
              <td colSpan="5.5">Prepared By</td>
              <td colSpan="5.5">Reviewed By</td>
              <td colSpan="5,5">Approved By</td>
            </tr>

            <tr>
              <td colSpan="5">Name </td>
              <td colSpan="5.5"></td>
              <td colSpan="5.5"></td>
              <td colSpan="5.5"></td>
            </tr>
            <tr>
              <td colSpan="5">Signature & Date</td>
              <td colSpan="5.5"></td>
              <td colSpan="5.5"></td>
              <td colSpan="5.5"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Bleaching_f38;
