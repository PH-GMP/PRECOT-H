/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Drawer,
  Tooltip,
  Row,
  Col,
  Avatar,
  Menu,
  Tabs,
  Form,
  Select,
  Input,
  Table,
  Radio,
  message,
  Pagination,
  Modal
} from "antd";
import React, { useEffect, useState } from "react";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import { IoCreate } from "react-icons/io5";
import axios from "axios";
import API from "../baseUrl.json";
import TabPane from "antd/es/tabs/TabPane.js";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa6";

const Traceability = () => {
   // ------------- Print State ----------

   const [printButtonLoading , setPrintButtonLoading] = useState (false);
   const [dgPrintBatchLov , setDgPrintBatchLov] = useState([]);
   const [dgPrintParam , setDgPrintParam] = useState ({
    dgType : '' ,
    julianDay : '',
    year : '',
    batchNumber : ''
 })
   const [selectLoading, setSelectLoading] = useState(false);
   const [dgPrintValue , setDgPrintValue] = useState ({
     order_no : '',
     prod_desc : '',
     po_qty_bag : '',
     po_no : '',
     po_qty_box : '',
     machine_no : '',
     weightPerBag : '',
     packingMaterial : [],
     sliverLineDetails : [],
     onlineInspection : [],
     finalInspection : [],
     goodsAbcons :[],
     bmrSummary :[],
     minirollDetails : [],
     miniRollData :[],
     packingData : [],
     chemicalTab : []
    })
   // -----------------------------------------
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [disable, setDisable] = useState(false);
  const [batch, setBatch] = useState([]);
  const [bale, setBale] = useState([]);
  const [baleNo, setBaleNo] = useState("");
  const [batchNo, setBatchNo] = useState("");

  const [tab1Data, setTab1Data] = useState({
    bale_no: "",
    bmr_no: "",
    batch_no: "",
    production_date: "",
    net_weight: "",
    job_order_no: "",
    laydown_no: "",
    laydown_qty: "",
  });
  const [tab2Data, setTab2Data] = useState({
    supplier: [],
    batch_no: [],
  });
  const [tab3Data, setTab3Data] = useState([]);
  const [tab4Data, setTab4Data] = useState([]);
  const [value, setValue] = useState("");
  const [bleachingValue, setBleachingValue] = useState("");

  // ------- Spunlace States -----------------
  const [rollNumber, setRollNumber] = useState([]);
  const [selectedRollNumber, setSelectedRollNumber] = useState('');
  const [spunlaceData, setSpunlaceData] = useState({
    "rollNo": '',
    "date": '',
    "orderNo": '',
    "shaftNo": '',
    "material": '',
    "brand": '',
    "netWeight": '',
    "gsm": '',
    "pattern": '',
    "length": '',
    "bleachingData": [{
      "chemicalDetails": [],
      "packingDetails": []
    }
    ],
    "spulanceData": []
  })
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;

  // ----------------- Dry Goods States --------------
  const dgTypeLov  = [
    {value : 'Cotton Balls', label : 'Cotton Balls'},
    {value : 'Pleat', label : 'Pleat'},
    {value : 'Wool Roll', label : 'Wool Roll'},
  ]
  const [dgParam , setDgParam] = useState ({
    dgType : 'Cotton Balls',
    julianDay : '',
    year : '',
    batchNumber : ''
  })
 const [dgValue , setDgValue] = useState ({
  order_no : '',
  prod_desc : '',
  po_qty_bag : '',
  po_no : '',
  po_qty_box : '',
  machine_no : '',
  weightPerBag : '',
  packingMaterial : [],
  sliverLineDetails : [],
  onlineInspection : [],
  finalInspection : [],
  goodsAbcons :[],
  bmrSummary :[],
  minirollDetails : [],
  miniRollData :[],
  packingData : [],
  chemicalTab : []
 })
 const [dgBatchLov,setDgBatchLov] = useState ([]);




 // ------------------Pad punching ------------------

 const [padPunchiingParams , setPadPunchingParams] = useState ({
  julianDay : '',
  year : '',
  bmrNumber: '',
})

const [padPunchiingValue , setPadPunchingValue] = useState ({
})


const [ppBmrLov, setPPBmrLov] = useState([])

const [chemicalPPTabDetails, setChemicalPPTabDetails] = useState([])


const [ppPrintData, setPpPrintData] = useState({
  chemicalTab : []
});

const [ppPrintParams, setPpPrintParams] = useState({
  julianDay: "",
  year: "",
  batchNumber: "",
});

const [ppBmrPrintLov ,setPPBmrPrintLov] = useState([]);

 // ------------------Buds ------------------

 const [budsParams , setBudsParams] = useState ({
  julianDay : '',
  year : '',
  bmrNumber: '',
})

const [packMaterial, setPackMaterial] = useState('')


const [chemicalTabDetails, setChemicalTabDetails] = useState([])

const [budsValus, setBudsValue] = useState ({
})

const [budsBmrLov, setBudsBmrLov] = useState([])
const [isModalPrint, setIsModalPrint] = useState(false);

const [bleachingPrintData, setBleachingPrintData] = useState([]);

const [bleachingPrintParams, setBleachingPrintParams] = useState({
  bale: "",
  batchNo: "",
});

const [spunlacePrintData, setSpunlacePrintData] = useState({
  chemicalTab: [],
});

const [spunlacePrintParams, setSpunlacePrintParams] = useState({
  rollNum: "",
});



const handleRadioChange = (e) => {
  const selectedValue = e.target.value;
  setBleachingValue(selectedValue);

  setBleachingPrintParams((prevState) => ({
    ...prevState,
    bale: selectedValue === "BaleNo" ? prevState.bale : "",
    batchNo: selectedValue === "BatchNo" ? prevState.batchNo : "",
  }));
};

  //--------------------------------------------------

  //-----------------------------------------
  const department = localStorage.getItem('departmentId');
  console.log("Department Id", department)

  const formatDate = (dateString) => {
    if (!dateString) return '';
    let date = new Date(dateString);
    if (isNaN(date)) {
    const dateParts = dateString.split('.');
    if (dateParts.length === 3) {
    const [day, month, year] = dateParts;
    date = new Date(`${year}-${month}-${day}`);
  }
}
    if (isNaN(date)) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

};

  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    updateTab1({
      bale_no: "",
      bmr_no: "",
      batch_no: "",
      production_date: "",
      net_weight: "",
      job_order_no: "",
      laydown_no: "",
      laydown_qty: "",
    });
    updateTab2({
      supplier: [],
      batch_no: [],
    });
    setTab3Data([]);
    setTab4Data([]);
    if (e.target.value == "BaleNo") {
      setBatchNo("");
      //setBaleNo("");
    } else {
      //setBatchNo("");
      setBaleNo("");
    }
    setValue(e.target.value);
  };
  const updateTab1 = (updates) => {
    setTab1Data((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateTab2 = (updates) => {
    setTab2Data((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .get(`${ API.prodUrl}/Precot/api/bleaching/generation/fetchBatchBale`, {
        headers,
      })
      .then((res) => {
        console.log("Bale", res.data);
        const a = res.data.map((x, i) => {
          return {
            value: x.value,
            label: x.value,
          };
        });
        // console.log("aa", a);
        setBale(a);
      })
      .catch((err) => {
        // console.log("Error", err);
      });

    axios
      .get(`${ API.prodUrl}/Precot/api/bleaching/generation/fetchBatchNumbers`, {
        headers,
      })
      .then((res) => {
        console.log("Batch", res.data);
        const a = res.data.map((x, i) => {
          return {
            value: x.value,
            label: x.value,
          };
        });
        // console.log("aa", a);
        setBatch(a);
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  }, []);

   // ----------------- Handle Print ---------------------
   const handleDgPrint = (value , key) => {
    setDgPrintParam ( prevState => ({
      ...prevState,
      [key] : value
    }))

    if(key == "dgType"){
      setDgPrintParam(prevState => ({
        ...prevState,
        julianDay : '',
        year : '',
        batchNumber : ''
      }))


      setDgPrintBatchLov([]);
      setDgPrintValue({
        order_no : '',
        prod_desc : '',
        po_qty_bag : '',
        po_no : '',
        po_qty_box : '',
        machine_no : '',
        packingMaterial : [],
        sliverLineDetails : [],
        onlineInspection : [],
        finalInspection : [],
        goodsAbcons :[],
        bmrSummary :[],
        minirollDetails : [],
        miniRollData :[],
        packingData : [],
        chemicalTab : []
      })
    }
    
    
  }

  const handlePrintCancel = () => {
    setBleachingPrintParams((prevState) => ({
      ...prevState,
      bale: "",
      batchNo: "",
    }));
    setSpunlacePrintParams((prevState) => ({
      ...prevState,
     rollNum: "",
    }));
    setPpPrintParams((prevState) => ({
      ...prevState,
      julianDay: "",
      year: "",
      batchNumber: "",
    }))
    setBleachingValue("")
    setPrintButtonLoading(false);
    setIsModalPrint(false);
    setDgPrintParam(prevState => ({
      ...prevState,
      julianDay : '',
      year : '',
      batchNumber : '',
      dgType : ''
    }))
    setDgPrintValue({
      order_no : '',
      prod_desc : '',
      po_qty_bag : '',
      po_no : '',
      po_qty_box : '',
      machine_no : '',
      packingMaterial : [],
      sliverLineDetails : [],
      onlineInspection : [],
      finalInspection : [],
      goodsAbcons :[],
      bmrSummary :[],
      minirollDetails : [],
      miniRollData :[],
      packingData : [],
      chemicalTab : []
    })
};
const handleDGLov = () => {
  if( department == 4) {
  if(dgPrintParam.dgType == ""){
    message.warning("Please Select BMR Type")
    return;
  }
  if(dgPrintParam.julianDay == ""){
    message.warning('Please Enter Julian Day')
    return;
  }
  if(dgPrintParam.year == ""){
    message.warning('Please Enter The Last Two Digit Of Year')
    return;
  }
  let apiurl;
  if(dgPrintParam.dgType == "Pleat" ){
    apiurl =`${ API.prodUrl}/Precot/api/drygoods/traceability/getTraceblityBatchNoPleat?julianDay=${dgPrintParam.julianDay}&yearLastTwoDigits=${dgPrintParam.year}`;
  }
  else if(dgPrintParam.dgType == "Wool Roll"){
    apiurl =`${ API.prodUrl}/Precot/api/drygoods/traceability/getTraceblityWollRoll?julianDay=${dgPrintParam.julianDay}&yearLastTwoDigits=${dgPrintParam.year}`;
  }
  else if(dgPrintParam.dgType == "Cotton Balls"){
   apiurl = `${ API.prodUrl}/Precot/api/drygoods/traceability/getBallTraceblityBatchNo?julianDay=${dgPrintParam.julianDay}&yearLastTwoDigits=${dgPrintParam.year}`;
  } 
  setSelectLoading(true);
  const fetchBatchNumber = async () => {
    
    try {
      const response = await axios.get(apiurl,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      

        const options = response.data
        .map(option => ({
          value: option.BatchNo,
          label: option.BatchNo,
        }));

        setSelectLoading(false);

        setDgPrintBatchLov(options);




    } catch (error) {
      console.log(error)
      
      setSelectLoading(false);
      message.error(error.response.data.message);
    }
  }
  fetchBatchNumber();
}
else if(department == 12){

  if(dgPrintParam.julianDay == ""){
    message.warning('Please Enter Julian Day')
    return;
  }
  if(dgPrintParam.year == ""){
    message.warning('Please Enter The Last Two Digit Of Year')
    return;
  }

  const fetchBudsLov = async () => {
    
    try {
      const response = await axios.get(`${ API.prodUrl}/Precot/api/buds/bmr/getBudsTraceblityBatchNo?julianDay=${dgPrintParam.julianDay}&yearLastTwoDigits=${dgPrintParam.year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      

        const options = response.data
        .map(option => ({
          value: option.BATCH_NO,
          label: option.BATCH_NO,
        }));

        setSelectLoading(false);

        setDgPrintBatchLov(options);
    } catch (error) {
      console.log(error)
      
      setSelectLoading(false);
      message.error(error.response.data.message);
    }
  }
  fetchBudsLov();
}
}

const handleDepartmentName = (departmentId) => {

  switch(departmentId){
    case "1":
       return "Bleaching";
    case "2" :
      return "Spunlace";
    case "3" : 
      return "Pad Punching";
    case "4" :
      return "Dry Goods";
    case "12" :
      return "Cotton Buds";
  }
}

const handlePrint =  async () => {
  if(department == 1) {
    if (!bleachingPrintParams.bale && !bleachingPrintParams.batchNo) {
      message.warning("Please select and provide a valid Bale No or Batch No");
      setPrintButtonLoading(false);
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/bleachingTrace?bale_no=${bleachingPrintParams.bale}&batchNo=${bleachingPrintParams.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message == "No data") {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      setBleachingPrintData(response.data);
      openPrint();
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
     
  }

  if(department == 2) {
    if (!spunlacePrintParams.rollNum) {
      message.warning("Please select and provide a valid Bale No or Batch No");
      setPrintButtonLoading(false);
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/spulanceTrace?roll=${spunlacePrintParams.rollNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message == "No data") {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      // setSpunlacePrintData(response.data);
      setSpunlacePrintData (prevState => ({
        ...prevState,
        ...response.data,
        chemicalTab : response.data.bleachingData
      }))
      openPrint();
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
     
  }

  if(department == 3) {
    if(ppPrintParams.batchNumber == ""){
      message.warning('Please Enter Batch Number')
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/punching/tracebility/getCompleteTracebilityDetails?batchNo=${ppPrintParams.batchNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message == "No data") {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      setPpPrintData (prevState => ({
        ...prevState,
        ...response.data,
        chemicalTab : response.data.bmrSummary.flat()
      }))
      openPrint();
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
     
  }
      // ----------------------- Dry Goods Print API --------------------------
      if(department == 4) {
        setDgPrintValue({
          order_no : '',
          prod_desc : '',
          po_qty_bag : '',
          po_no : '',
          po_qty_box : '',
          machine_no : '',
          packingMaterial : [],
          sliverLineDetails : [],
          onlineInspection : [],
          finalInspection : [],
          goodsAbcons :[],
          bmrSummary :[],
          minirollDetails : [],
          miniRollData :[],
          packingData : [],
          chemicalTab : []
        })
    
      if(dgPrintParam.dgType == ""){
        message.warning('Please Select BMR Type')
        return;
      }
      if(dgPrintParam.julianDay == ""){
        message.warning('Please Enter Julian Day')
        return;
      }
      if(dgPrintParam.year == ""){
        message.warning('Please Enter The Last Two Digit Of Year')
        return;
      }
       if ( dgPrintParam.batchNumber == ""){
        message.warning('Please Select BMR Number')
        return;
       }
    
       let apiurl;
       if(dgPrintParam.dgType == "Pleat" ){
         apiurl =`${ API.prodUrl}/Precot/api/drygoods/traceability/productionDetailsPleat?batchNo=${dgPrintParam.batchNumber}`;
       }
       else if(dgPrintParam.dgType == "Wool Roll"){
         apiurl =`${ API.prodUrl}/Precot/api/drygoods/traceability/productionDetailsWollRoll?batchNo=${dgPrintParam.batchNumber}`;
       } 
       else if(dgPrintParam.dgType == "Cotton Balls"){
        apiurl = `${ API.prodUrl}/Precot/api/drygoods/traceability/ballsTraceability?batchNumber=${dgPrintParam.batchNumber}`
       } 
    
       
       setPrintButtonLoading(true);
        try {
          const response = await axios.get(apiurl,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
    
          if(response.status == 200 || response.status == 201){
              const data = response.data
              if(dgPrintParam.dgType == "Cotton Balls"){
              if(data.sliverLineDetails.length == 0 && data.onlineInspection.length == 0 && data.finalInspection.length == 0 &&
                data.goodsAbcons.length == 0 && data.bmrSummary.length == 0 && (Object.keys(data.productionDetails).length == 0)
               )
               {
                message.warning('No Data Available To Print')
                setPrintButtonLoading(false);
                return;
               }
              setDgPrintValue ( prevState =>  ({
                ...prevState,
                ...response.data,
                order_no : data.productionDetails.order_no,
                prod_desc : data.productionDetails.prod_desc,
                po_qty_bag : data.productionDetails.po_qty_bag,
                po_no : data.productionDetails.po_no,
                po_qty_box : data.productionDetails.po_qty_box,
                machine_no : data.productionDetails.machine_no,
                packingData: [
                    ...data.packingMaterial.flatMap(value => value.pckdetails)
                ],
                chemicalTab : data.bmrSummary.flat()           
              }))
            }
            if(dgPrintParam.dgType == "Pleat" || dgPrintParam.dgType == "Wool Roll"){
    
              if(data.minirollDetails.length == 0 && data.onlineInspection.length == 0 && data.finalInspection.length == 0 &&
                data.abCons.length == 0 && data.chemicalDetails.length == 0 && (Object.keys(data.productionDetails).length == 0)
               )
               {
                message.warning('No Data Available To Print')
                setPrintButtonLoading(false);
                return;
               }  
              setDgPrintValue ( prevState =>  ({
                ...prevState,
                ...response.data,
                order_no : data.productionDetails.porder,
                prod_desc : data.productionDetails.product,
                po_qty_bag : data.productionDetails.prod_qty_bag,
                po_no : data.productionDetails.po_no,
                po_qty_box : data.productionDetails.prod_qty_box,
                machine_no : data.productionDetails.machine_no,
                goodsAbcons : data.abCons,
                sliverLineDetails : data.minirollDetails[0]?.details,
                packingData: [
                  ...data.PackingMeterial.flatMap(value => value.pckdetails)
              ],
              chemicalTab : data.chemicalDetails.flat()    
              }))
    
            }
    
              openPrint();
    
    
    
          } 
    
        } catch (error) {
        setPrintButtonLoading(false);
    
          message.error(error.response.data.message);
        }
      }
      // ----------------------- Cotton Buds Print API --------------------------
      else if(department == 12){
        setDgPrintValue({
          order_no : '',
          prod_desc : '',
          po_qty_bag : '',
          po_no : '',
          po_qty_box : '',
          machine_no : '',
          packingMaterial : [],
          sliverLineDetails : [],
          onlineInspection : [],
          finalInspection : [],
          goodsAbcons :[],
          bmrSummary :[],
          minirollDetails : [],
          miniRollData :[],
          packingData : [],
          chemicalTab : []
        })
    
        if(dgPrintParam.julianDay == ""){
          message.warning('Please Enter Julian Day')
          return;
        }
        if(dgPrintParam.year == ""){
          message.warning('Please Enter The Last Two Digit Of Year')
          return;
        }
         if ( dgPrintParam.batchNumber == ""){
          message.warning('Please Select BMR Number')
          return;
         }
    
        setPrintButtonLoading(true);
        try {
          const response = await axios.get(`${ API.prodUrl}/Precot/api/buds/bmr/budsTraceability?batchNumber=${dgPrintParam.batchNumber}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
    
          if(response.status == 200 || response.status == 201){
            console.log('Entered')
              const data = response.data
              console.log(data)
              if(data.sliverLines.length == 0 && data.onlineInspection.length == 0 && data.finalInspectionBudsReport.length == 0 &&
                data.baleRequest.length == 0 && data.chemicalDetails.length == 0 && (Object.keys(data.productionDetails).length == 0)
               )
               {
                message.warning('No Data Available To Print')
                setPrintButtonLoading(false);
                return;
               }
              setDgPrintValue ( prevState =>  ({
                ...prevState,
                ...response.data,
                order_no : data.productionDetails.orderNumber,
                prod_desc : data.productionDetails.productDescription,
                po_qty_bag : data.productionDetails.poQuantityBags,
                po_no : data.productionDetails.poNumber,
                po_qty_box : data.productionDetails.poQuantityBoxes,
                machine_no : data.productionDetails.machine,
                packingData: [
                    ...data.packingMaterial.flatMap(value => value.pckdetails)
                ],
                goodsAbcons : data.baleRequest,
                finalInspection : data.finalInspectionBudsReport,
                sliverLineDetails : data.sliverLines,
                chemicalTab : data.chemicalDetails.flat()           
              }))
            
            
              openPrint();
    
    
    
          } 
    
        } catch (error) {
        setPrintButtonLoading(false);
    
          message.error(error.response.data.message);
        }
    
      }
}
 
const openPrint = () => {
  setTimeout(() => {
    window.print();
    setPrintButtonLoading(false);
  },[4000])
}

const showPrintModal = () => {
  setIsModalPrint(true);
};

  useEffect(() => {

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .get(`${ API.prodUrl}/Precot/api/bleaching/generation/fetchSpunlaceRollNo`, {
        headers,
      })
      .then((res) => {
        const a = res.data.map((x, i) => {
          return {
            value: x.value,
            label: x.value,
          };
        });
        setRollNumber(a);
      })
      .catch((err) => {
        if (err.res.data) {
          message.error(err.res.data.message);
        }
        else {
          message.error('Failed To Fetch Roll Number')
        }
      });

  }, []);

  // buds 

  const handleBmrDetails = async (field, value) => {
    setBudsParams((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    if (field === "bmrNumber") {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/buds/bmr/budsTraceability?batchNumber=${value}`,
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBudsValue(response.data);
      setPackMaterial(response.data.packingMaterial.flatMap(value => value.pckdetails))
      setChemicalTabDetails(response.data.chemicalDetails.flat())
    } catch (error) {
      message.error(error.response?.data?.message || "No Data found");
    }
  }
  };

// pad punching

  const handleBmrPPDetails = async (field, value) => {
    setPadPunchingParams((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    if (field === "bmrNumber") {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/punching/tracebility/getCompleteTracebilityDetails?batchNo=${value}`,
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPadPunchingValue(response.data);
      setChemicalPPTabDetails(response.data.bmrSummary.flat())
  
      } catch (error) {
      message.error(error.response?.data?.message || "No Data found");
    }
  }
  };

  const fetchData = () => {
    if (department == 1) {
      updateTab1({
        bale_no: "",
        bmr_no: "",
        batch_no: "",
        production_date: "",
        net_weight: "",
        job_order_no: "",
        laydown_no: "",
        laydown_qty: "",
      });
      updateTab2({
        supplier: [],
        batch_no: [],
      });
      setTab3Data([]);
      setTab4Data([]);
      if (value == "BaleNo") {
        setBatchNo("");
        //setBaleNo("");
      } else {
        //setBatchNo("");
        setBaleNo("");
      }
      if (value == "BaleNo" && baleNo == "") {
        message.error("Please Select BaleNo");
      } else if (value == "BatchNo" && batchNo == "") {
        message.error("Please Select BatchNo");
      } else {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", // Adjust content type if needed
        };
        axios
          .get(
            `${ API.prodUrl}/Precot/api/bleaching/generation/bleachingTrace?bale_no=${baleNo}&batchNo=${batchNo}`,
            {
              headers,
            }
          )
          .then((res) => {
            message.success("Data Fetched Successfully");
            console.log("Batch", res.data.baleNumber);
            //summaryBleach
            updateTab1({
              bale_no: res.data.baleNumber.join(", "),
              bmr_no: res.data.bmrNumber,
              batch_no: res.data.batchNumber,
              production_date: res.data.date[0],
              net_weight: res.data.batchWeight,
              job_order_no: res.data.orderNumber,
              laydown_no: res.data.laydownNumber,
              laydown_qty: res.data.weight,
            });
            updateTab2({
              batch_no: res.data.phBatchNumber,
              supplier: res.data.supplier,
            });
            setTab3Data(res.data?.summaryBleach?.[0]?.chemicalDetails || []);
            setTab4Data(res.data?.summaryBleach?.[0]?.packingDetails || []);
          })
          .catch((err) => {
            console.log("Error", err);
            message.error(err.message);
          });
      }
    }
    else if (department == 2) {
      if (selectedRollNumber == '') {
        message.warning('Please Select Roll Number');
        return;
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(
          `${ API.prodUrl}/Precot/api/bleaching/generation/spulanceTrace?roll=${selectedRollNumber}`,
          {
            headers,
          }
        )
        .then((res) => {
          setSpunlaceData(res.data)
          if(res.status == 200 || res.status == 201){
            message.success('Data Fetched Sucessfully');
          }
        })
        .catch((err) => {
          message.error(err.res.data.message);
        });

    }
    else if (department == 12) {

      if (budsParams.julianDay == '') {
        message.warning('Please enter the julian day');
        return;
      }

      if (budsParams.year == '') {
        message.warning('Please enter the year');
        return;
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      axios
      .get(`${ API.prodUrl}/Precot/api/buds/bmr/getBudsTraceblityBatchNo?julianDay=${budsParams.julianDay}&yearLastTwoDigits=${budsParams.year}`, {
        headers,
      })
      .then((res) => {
        const a = res.data.map((x, i) => {
          return {
            value: x.BATCH_NO,
            label: x.BATCH_NO,
          };
        });
        setBudsBmrLov(a);
      })
      .catch((err) => {
        if (err.res.data) {
          message.error(err.res?.data?.message || "No Data found");
        }
        else {
          message.error('Failed To Fetch Roll Number')
        }
      });

    }

    else if (department == 3) {

      if (padPunchiingParams.julianDay == '') {
        message.warning('Please enter the julian day');
        return;
      }

      if (padPunchiingParams.year == '') {
        message.warning('Please enter the year');
        return;
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      axios
      .get(`${ API.prodUrl}/Precot/api/punching/tracebility/getTraceblityBatchNo?julianDay=${padPunchiingParams.julianDay}&yearLastTwoDigits=${padPunchiingParams.year}`, {
        headers,
      })
      .then((res) => {
        const a = res.data.map((x, i) => {
          return {
            value: x.BatchNo,
            label: x.BatchNo,
          };
        });
        setPPBmrLov(a);
      })
      .catch((err) => {
        if (err.res.data) {
          message.error(err.res?.data?.message || "No Data found");
        }
        else {
          message.error('Failed To Fetch Roll Number')
        }
      });

    }

    else if(department == 4){
      if(dgParam.julianDay == ""){
        message.warning("Please Enter Julian Day")
        return;
      }
      if(dgParam.year == ""){
        message.warning("Last Two Digit Of The Year Required")
        return;
      }
      if(dgParam.dgType == "Cotton Balls"){
      const fetchBatchNumber = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/drygoods/traceability/getBallTraceblityBatchNo?julianDay=${dgParam.julianDay}&yearLastTwoDigits=${dgParam.year}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
 
            const options = response.data
            .map(option => ({
              value: option.BatchNo,
              label: option.BatchNo,
            }));
 
            setDgBatchLov(options);
 
 
 
 
        } catch (error) {
          console.log(error)
          message.error(error.response.data.message);
        }
      }
      fetchBatchNumber();
      }
      else if(dgParam.dgType == "Pleat" || dgParam.dgType == "Wool Roll"){
        let apiurl;
        if(dgParam.dgType == "Pleat" ){
          apiurl =`${ API.prodUrl}/Precot/api/drygoods/traceability/getTraceblityBatchNoPleat?julianDay=${dgParam.julianDay}&yearLastTwoDigits=${dgParam.year}`;
        }
        else if(dgParam.dgType == "Wool Roll"){
          apiurl =`${ API.prodUrl}/Precot/api/drygoods/traceability/getTraceblityWollRoll?julianDay=${dgParam.julianDay}&yearLastTwoDigits=${dgParam.year}`;
        }
       
        const fetchBatchNumber = async () => {
          try {
            const response = await axios.get(
              apiurl,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
 
              const options = response.data
              .map(option => ({
                value: option.BatchNo,
                label: option.BatchNo,
              }));
 
              setDgBatchLov(options);
 
 
 
 
          } catch (error) {
            console.log(error)
            message.error(error.response.data.message);
          }
        }
        fetchBatchNumber();
      }
    }
  };

  const handlePPLovData = async () => {
    if (ppPrintParams.julianDay == '') {
      message.warning('Please enter the julian day');
      return;
    }

    if (ppPrintParams.year == '') {
      message.warning('Please enter the year');
      return;
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
    .get(`${ API.prodUrl}/Precot/api/punching/tracebility/getTraceblityBatchNo?julianDay=${ppPrintParams.julianDay}&yearLastTwoDigits=${ppPrintParams.year}`, {
      headers,
    })
    .then((res) => {
      const a = res.data.map((x, i) => {
        return {
          value: x.BatchNo,
          label: x.BatchNo,
        };
      });
      setPPBmrPrintLov(a);
    })
    .catch((err) => {
      if (err.res.data) {
        message.error(err.res?.data?.message || "No Data found");
      }
      else {
        message.error('Failed To Fetch Roll Number')
      }
    });
  }

    // ------------------- DG fetchDetails -----------------
    useEffect (() => {
      if(dgParam.batchNumber !== "" && dgParam.dgType == "Cotton Balls"){
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/drygoods/traceability/ballsTraceability?batchNumber=${dgParam.batchNumber}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
  
          if(response.status == 200 || response.status == 201){
              const data = response.data
              message.success('Data Fetched Successfully');
  
              setDgValue ( prevState =>  ({
                ...prevState,
                ...response.data,
                order_no : data.productionDetails.order_no,
                prod_desc : data.productionDetails.prod_desc,
                po_qty_bag : data.productionDetails.po_qty_bag,
                po_no : data.productionDetails.po_no,
                po_qty_box : data.productionDetails.po_qty_box,
                machine_no : data.productionDetails.machine_no,
                packingData: [
                    ...data.packingMaterial.flatMap(value => value.pckdetails)
                ],
                chemicalTab : data.bmrSummary.flat()           
              }))
  
          } 
  
        } catch (error) {
          message.error(error.response.data.message);
        }
      }
      fetchData();
    }
    if((dgParam.dgType == "Pleat" || dgParam.dgType == "Wool Roll") && dgParam.batchNumber !== ""){
      let apiurl;
      if(dgParam.dgType == "Pleat" ){
        apiurl =`${ API.prodUrl}/Precot/api/drygoods/traceability/productionDetailsPleat?batchNo=${dgParam.batchNumber}`;
      }
      else if(dgParam.dgType == "Wool Roll"){
        apiurl =`${ API.prodUrl}/Precot/api/drygoods/traceability/productionDetailsWollRoll?batchNo=${dgParam.batchNumber}`;
      } 
  
      const fetchData = async () => {
        try {
          const response = await axios.get(apiurl,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
  
          if(response.status == 200 || response.status == 201){
              const data = response.data
              message.success('Data Fetched Successfully');
              
              setDgValue ( prevState =>  ({
                ...prevState,
                ...response.data,
                order_no : data.productionDetails.porder,
                prod_desc : data.productionDetails.product,
                po_qty_bag : data.productionDetails.prod_qty_bag,
                po_no : data.productionDetails.po_no,
                po_qty_box : data.productionDetails.prod_qty_box,
                machine_no : data.productionDetails.machine_no,
                miniRollData : data.minirollDetails[0]?.details,
                packingData: [
                  ...data.PackingMeterial.flatMap(value => value.pckdetails)
              ],
              chemicalTab : data.chemicalDetails.flat()    
              }))
  
          } 
  
        } catch (error) {
          message.error(error.response.data.message);
        }
      }
      fetchData();
    }
    },[dgParam.batchNumber])

  let items;
  if (department == 1) {
    items = [
      {
        key: "1",
        label: "Traceability",
        children: (
          <>
            <table
              style={{
                width: "100%",
              }}
            >
              <tr>
                <td
                  style={{
                    padding: "1em",
                    width: "50%",
                  }}
                >
                  Enter Bale No:
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  {tab1Data.bale_no}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  BMR No:
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  {tab1Data.bmr_no}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Batch No:
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  {tab1Data.batch_no}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Production Date:
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  {tab1Data.production_date}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Net Wt:
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  {tab1Data.net_weight}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Job Order number:
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  {tab1Data.job_order_no}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Laydown number:
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  {tab1Data.laydown_no}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Laydown qty:
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  {tab1Data.laydown_qty}
                </td>
              </tr>
            </table>
          </>
        ),
      },
      {
        key: "2",
        label: "Suppliers",
        children: (
          <>
            <table
              style={{
                width: "100%",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: "1em",
                    width: "50%",
                  }}
                >
                  Supplier
                </th>

                <th
                  style={{
                    padding: "1em",
                  }}
                >
                  Batch No
                </th>
              </tr>
              {tab2Data.supplier.map((x, i) => {
                return (
                  <tr>
                    <td
                      style={{
                        padding: "1em",
                      }}
                    >
                      {x}
                    </td>
                    <td>{tab2Data.batch_no[i]}</td>
                  </tr>
                );
              })}
            </table>
          </>
        ),
      },
      {
        key: "3",
        label: "Chemical Details",
        children: (
          <>
            <table
              style={{
                width: "100%",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: "1em",
                  }}
                >
                  S.No
                </th>
                <th>Name of the Chemicals</th>
                <th>Chemical Batch No</th>
                <th>Quantity</th>
                <th>Units</th>
              </tr>
              {tab3Data &&
                tab3Data.map((x, i) => {
                  return (
                    <tr>
                      <td
                        style={{
                          padding: "1em",
                        }}
                        align="center"
                      >
                        {++i}
                      </td>
                      <td align="center">{x.chemicalName}</td>
                      <td align="center">{x.batchNo}</td>
                      <td align="center">{x.quantity}</td>
                      <td align="center">{x.unit}</td>
                    </tr>
                  );
                })}
            </table>
          </>
        ),
      },
      {
        key: "4",
        label: "Packing Material Details",
        children: (
          <>
            <table
              style={{
                width: "100%",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: "1em",
                  }}
                >
                  S.No
                </th>
                <th>Name of the Packing Material</th>
                <th>Batch No</th>
                <th>Quantity</th>
                <th>Units</th>
              </tr>
              {tab4Data &&
                tab4Data.map((x, i) => {
                  return (
                    <tr>
                      <td
                        style={{
                          padding: "1em",
                        }}
                        align="center"
                      >
                        {++i}
                      </td>
                      <td align="center">{x.packingName}</td>
                      <td align="center">{x.batchNo}</td>
                      <td align="center">{x.quantity}</td>
                      <td align="center">{x.unit}</td>
                    </tr>
                  );
                })}
            </table>
          </>
        ),
      },
    ];
  }
  else if (department == 2) {
    // -------------- Spunlace Tab -------------------------
    const combinedData = (spunlaceData.bleachingData || []).flatMap((item) =>
      (item.summaryDetails || []).flatMap((summaryItem) => {
        return {
          key: `${item.bmrNumber}`,
          chemicalDetails: summaryItem.chemicalDetails || [],
          packingDetails: summaryItem.packingDetails || [],
        };
      })
    );
    const paginatedData = combinedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    console.log('paginatedData',paginatedData);
  
    const handleChangePage = (page) => {
      setCurrentPage(page);
    };
    const bleachingColumns = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Ab Cotton',
        dataIndex: 'baleNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Net Wt',
        dataIndex: 'netWeight',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Batch No',
        dataIndex: 'batchNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'BMR',
        dataIndex: 'bmrNumber',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'laydown number',
        dataIndex: 'laydownNumber',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Rm Batch',
        dataIndex: 'phNumber',
        align: "center",
        render: (text) => (text ? text.join(',') : 'N/A')
      },
    ];

    const spunlaceColumns = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Rp bale',
        dataIndex: 'baleNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Net Wt',
        dataIndex: 'netWeight',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Order Number',
        dataIndex: 'orderNumber',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },

    ];
    const chemicalColumns = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Name Of The Chemicals',
        dataIndex: 'chemicalName',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Chemical Batch No',
        dataIndex: 'batchNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Units',
        dataIndex: 'unit',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },

    ];
    const packingDetailsColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Name Of The Packing Material',
        dataIndex: 'packingName',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Batch No',
        dataIndex: 'batchNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Units',
        dataIndex: 'unit',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
    ]
    items = [
      {
        key: "1",
        label: "Traceability",
        children: (
          <>
            <table
              style={{
                width: "90%",
              }}
            >
              <tr>
                <td
                  style={{
                    padding: "1em",
                    width: "50%",
                    textAlign: 'center'
                  }}
                >
                  Roll Number
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  {spunlaceData.rollNo}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  Date
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  {formatDate(spunlaceData.date)}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  BMR / Job Order
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  {spunlaceData.orderNo}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  Shaft Number
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  {spunlaceData.shaftNo}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  Material
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  {spunlaceData.material}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  Brand
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  {spunlaceData.brand}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  Net Wt
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >{spunlaceData.netWeight}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  GSM
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  {spunlaceData.gsm}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  Pattern
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  {spunlaceData.pattern}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  Length
                </td>
                <td
                  style={{
                    padding: "1em",
                    textAlign: 'center'
                  }}
                >
                  {spunlaceData.length}
                </td>
              </tr>
            </table>
          </>
        ),
      },
      {
        key: "2",
        label: "Bleaching",
        children: (
          <>
            <Table dataSource={spunlaceData.bleachingData} columns={bleachingColumns}></Table>
          </>
        ),
      },
      {
        key: "3",
        label: "Spunlace",
        children: (
          <>
           <Table dataSource={spunlaceData.spulanceData} columns={spunlaceColumns}></Table>
          </>
        ),
      },
      {
        key: "4",
        label: "Chemical and Packing Material",
        children: (
          <>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={combinedData.length}
            onChange={handleChangePage}
            style={{float:'right',marginBottom:'10px'}}
          />
          {paginatedData.map((data, index) => (
            <>
            <span style={{border:'1px solid grey',padding:'5px',borderRadius:'5px',boxShadow:'5px 5px #888888'}}><b>BMR No : </b><span style={{color:'red'}}><b>{data.key}</b></span></span>
            <React.Fragment >
              {data.chemicalDetails.length > 0 && (
      
                <Table
                  dataSource={data.chemicalDetails}
                  columns={chemicalColumns}
                />
              )}
              {data.packingDetails.length > 0 && (
                <Table
                  dataSource={data.packingDetails}
                  columns={packingDetailsColumn}
                />
              )}
            </React.Fragment>
            </>
          ))}
        </>
        ),
      },
    ];
  }

  // --------------------------- PadPunching Tab ----------------------------

  else if(department == 3){

    const combinedData = chemicalPPTabDetails.flatMap((data) => {
      return {
        key: data.bmr_no,
        chemicalDetails: data.chemicalDetails || [],
        packingDetails: data.packingDetails || [],
      };
    });
    const paginatedData = combinedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    const handleChangePage = (page) => {
      setCurrentPage(page);
    };

    const baseColumns = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Roll number",
        dataIndex: 'rollNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'BMR',
        dataIndex: 'bmr',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Shaft number',
        dataIndex: 'shaftNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Netwt',
        dataIndex: 'netWeight',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Production Date',
        dataIndex: 'prodDate',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Roll width',
        dataIndex: 'rollWidth',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Roll length',
        dataIndex: 'rollLength',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Roll GSM',
        dataIndex: 'rollGsm',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Moisture',
        dataIndex: 'moisture',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      }, 
       {
        title: 'Mixing',
        dataIndex: 'Mixing',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
    ];

    const packingMaterialColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Batch No',
        dataIndex: 'BATCH_NO',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Order Number',
        dataIndex: 'ORDER_NO',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
    ];

    const onlineIncColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Date",
        dataIndex: "date",
        align: "center",
              render: (text) => (text ? formatDate(text) : 'N/A')
      },
      {
        title: "Shift",
        dataIndex: "shift",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Customer Name",
        dataIndex: "customerName",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Product Description",
        dataIndex: "productDescription",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Machine Name",
        dataIndex: "machineNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "BMR No",
        dataIndex: "bmrNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "PO No",
        dataIndex: "poNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "FG No",
        dataIndex: "fgNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Lot No",
        dataIndex: "lotNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Lot Status",
        dataIndex: "lotStatus",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
    ];

    const finalIncColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Date",
        dataIndex: "date",
        align: "center",
              render: (text) => (text ? formatDate(text) : 'N/A')
      },
      {
        title: "Shift",
        dataIndex: "shift",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Customer Name",
        dataIndex: "customerName",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Product Description",
        dataIndex: "productDescription",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "BMR No",
        dataIndex: "bmrNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "PO No",
        dataIndex: "porder",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "FG No",
        dataIndex: "fgNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Lot No",
        dataIndex: "lotNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Lot Status",
        dataIndex: "lotStatus",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
    ]


    const AbcottonColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Bale No.',
        dataIndex: 'bale',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Bale net wt',
        dataIndex: 'newWt',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Batch No.',
        dataIndex: 'batchNo',
        align: "center",
        render: (text) => (text ? text.join(",") : 'N/A')
      },
     
      {
        title: 'BMR No.',
        dataIndex: 'bmr',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Lay down number',
        dataIndex: 'laydown',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'RM Batch No.',
        dataIndex: 'rmBatch',
        align: "center",
        render: (text) => (text ? text.join(',') : 'N/A')
      },
      // {
      //   title: 'Finishing',
      //   dataIndex: 'orderNumber',
      //   align: "center",
      //   render: (text) => (text ? text : 'N/A')
      // },
      // {
      //   title: 'Mixing',
      //   dataIndex: 'orderNumber',
      //   align: "center",
      //   render: (text) => (text ? text : 'N/A')
      // },
    ];

    const RbconsumptionColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Bale No.',
        dataIndex: 'baleNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'net wt',
        dataIndex: 'netWt',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'BMR No.',
        dataIndex: 'bmrNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Mixing',
        dataIndex: 'mixing',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
    ];

    const chemicalColumns = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Name Of The Chemicals',
        dataIndex: 'chemicalName',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Chemical Batch No',
        dataIndex: 'batchNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Units',
        dataIndex: 'unit',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
 
    ];
    const packingDetailsColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Name Of The Packing Material',
        dataIndex: 'packingName',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Batch No',
        dataIndex: 'batchNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Units',
        dataIndex: 'unit',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
    ]

    items = [
      {
        key: "1",
        label: "Traceability",
        children: (
          <>
          <table style={{ width: "90%", marginBottom: "1rem"}}>
            <tr>
              <td style={{textAlign:'center', width:'50%' , padding:'10px'}}>BMR Number</td>
              <td style={{textAlign:'center', width:'50%' , padding:'10px'}}>  
                <Select
                  value={padPunchiingParams.bmrNumber}
                  options={ppBmrLov}
                  showSearch
                  onChange={(value) => handleBmrPPDetails("bmrNumber", value)}
                        dropdownStyle={{ textAlign: "center" }}
                        style={{
                          width: "220px",
                          textAlign: "center",
                          marginLeft: "0.6rem",
                        }}>
                        </Select>
               </td>
            </tr>
            <tr>
              <td style={{textAlign:'center', width:'50%' , padding:'10px'}}>Order</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.orderNo}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Product</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.product}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Prodution qty</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.productQty}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Packed QTY</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.packedQty}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Brand</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.brand}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Po No</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.poNo}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Sale order</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.saleOrder}</td>
            </tr>
          </table>
          </>
        ),
      },
        {
          key: "2",
          label: "Traceability II",
          children: (
            <>
            <table style={{ width: "90%", marginBottom: "1rem"}}>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Item no</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.itemCode}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Pattern</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.pattern}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Edge</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.edge}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Machine number</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.machineNo}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>GSM</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{padPunchiingValue.gsm}</td>
            </tr>
            </table>
            </>
          ),
        },
        {
          key: "3",
          label: "Packing Materials",
          children: (
            <>
             <Table  columns={packingMaterialColumn} dataSource={padPunchiingValue.packingDetails}></Table>
            </>
          ),
        },
     
      {
        key: "4",
        label: "Online Inspection",
        children: (
          <>
           <Table  columns={onlineIncColumn} dataSource={padPunchiingValue.onlineInspection}></Table>
          </>
        ),
      },
      {
        key: "5",
        label: "Final Inspection",
        children: (
          <>
           <Table  columns={finalIncColumn} dataSource={padPunchiingValue.finalInspection}></Table>
          </>
        ),
      },
      {
        key: "6",
        label: "Roll Consumption",
        children: (
          <>
           <Table  columns={baseColumns} dataSource={padPunchiingValue.rollConsumptionDetails}></Table>
          </>
        ),
      },
      {
        key: "7",
        label: "AB Cotton Consumption details",
        children: (
          <>
             <Table  columns={AbcottonColumn} dataSource={padPunchiingValue.abCottonDetails}></Table>
          </>
        ),
      },
      {
        key: "8",
        label: "RB Consumption details",
        children: (
          <>
             <Table  columns={RbconsumptionColumn} dataSource={padPunchiingValue.rpList}></Table>
          </>
        ),
      },
      {
        key: "9",
        label: "Chemical  details",
        children: (
          <>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={combinedData.length}
            onChange={handleChangePage}
            style={{float:'right',marginBottom:'10px'}}
          />
          {paginatedData.map((data, index) => (
            <>
            <span style={{border:'1px solid grey',padding:'5px',borderRadius:'5px',boxShadow:'5px 5px #888888'}}><b>BMR No : </b><span style={{color:'red'}}><b>{data.key}</b></span></span>
            <React.Fragment >
              {data.chemicalDetails.length > 0 && (
     
                <Table
                  dataSource={data.chemicalDetails}
                  columns={chemicalColumns}
                  pagination={{ pageSize: 3 }}
                />
              )}
              {data.packingDetails.length > 0 && (
                <Table
                  dataSource={data.packingDetails}
                  columns={packingDetailsColumn}
                  pagination={{ pageSize: 3 }}
                />
              )}
            </React.Fragment>
            </>
          ))}
        </>
        ),
      },
    ]

  }

  // --------------------------- Dry Goods Tab -------------------------------------
 // --------------------------- Dry Goods Tab -------------------------------------
 else if(department == 4) {
  const combinedData = dgValue.chemicalTab.flatMap((data) => {
    return {
      key: data.bmr_no,
      chemicalDetails: data.chemicalDetails || [], 
      packingDetails: data.packingDetails || [],
    };
  });
  const paginatedData = combinedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: dgParam.dgType == "Cotton Balls" ?  "Can No" : "Roll Number",
      dataIndex: dgParam.dgType == "Cotton Balls" ? 'canNo' : "BaleNo",
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },
    {
      title: 'Net Wt',
      dataIndex: dgParam.dgType == "Cotton Balls" ? 'netWt' : 'RNWt',
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: 'Production Date',
      dataIndex: dgParam.dgType == "Cotton Balls" ? 'prod_date' : "BaleNo",
      align: "center",
      render: (text) => (text ? (dgParam.dgType == "Cotton Balls" ? formatDate(text) : (dgValue.minirollDetails.length > 0 ? formatDate(dgValue.minirollDetails[0].prod_date) : 'NA') ) : 'N/A')
    },
    {
      title: 'POrder',
      dataIndex: dgParam.dgType == "Cotton Balls" ? 'orderNo' : 'POrder',
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: 'BMR Number',
      dataIndex: dgParam.batchNumber,
      align: "center",
      render: (text) => (text ? text : dgParam.batchNumber)
    },
    {
      title: 'Laydown no',
      dataIndex: dgParam.dgType == "Cotton Balls" ? 'laydownNo' : 'BaleNo',
      align: "center",
      render: (text) => (text ? dgParam.dgType == "Cotton Balls" ?  text : (dgValue.minirollDetails.length > 0 ? dgValue.minirollDetails[0].laydown : "NA") : 'N/A')
    },

  ];

  const gramColumn = {
    title: 'Grams/Mtr',
    dataIndex: 'gpm',
    align: "center",
    render: (text) => (text ? text : 'N/A')
  }
  let sliverDetailsColumn;
  if (dgParam.dgType == "Cotton Balls") {
      sliverDetailsColumn = [
          ...baseColumns.slice(0, 5),
          gramColumn,
          ...baseColumns.slice(5),
      ];
  } else {
    sliverDetailsColumn = baseColumns;
  }
  const AbCottonColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Bale No',
      dataIndex: 'bale',
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },
    {
      title: 'Net Wt',
      dataIndex: 'newWt',
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: 'Batch No',
      dataIndex: 'batchNo',
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: 'Laydown Number',
      dataIndex: 'laydown',
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: 'BMR Number',
      dataIndex: 'bmr',
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: 'RM batch',
      dataIndex: 'rmBatch',
      align: "center",
      render: (text) => (text ? text.join(',') : 'N/A')
    },

  ];

  const onlineInspection = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
            render: (text) => (text ? formatDate(text) : 'N/A')
    },
    {
      title: "Shift",
      dataIndex: "shift",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Product Description",
      dataIndex: "productDescription",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Machine Name",
      dataIndex: "machineNo",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "BMR No",
      dataIndex: "bmrNo",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "PO No",
      dataIndex: "poNo",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "FG No",
      dataIndex: "fgNo",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Lot No",
      dataIndex: "lotNo",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Lot Status",
      dataIndex: "lotStatus",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
  ]
  const finalInspection = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
            render: (text) => (text ? formatDate(text) : 'N/A')
    },
    {
      title: "Shift",
      dataIndex: "shift",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Product Description",
      dataIndex: "productDescription",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "BMR No",
      dataIndex: "bmrNo",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "PO No",
      dataIndex: "porder",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "FG No",
      dataIndex: "fgNo",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Lot No",
      dataIndex: "lotNo",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Lot Status",
      dataIndex: "lotStatus",
      align: "center",
            render: (text) => (text ? text : 'N/A')
    },
  ]

  const packingColumn = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
      render: (text) => (text ? formatDate(text) : 'N/A')
    },
    {
      title: "Batch No",
      dataIndex: "packing_batch_no",
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Name Of The Material",
      dataIndex: "name_of_the_meterial",
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
    {
      title: "Unit",
      dataIndex: "unit",
      align: "center",
      render: (text) => (text ? text : 'N/A')
    },
  ]

  const chemicalColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name Of The Chemicals',
      dataIndex: 'chemicalName',
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },
    {
      title: 'Chemical Batch No',
      dataIndex: 'batchNo',
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },
    {
      title: 'Units',
      dataIndex: 'unit',
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },

  ];
  const packingDetailsColumn = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name Of The Packing Material',
      dataIndex: 'packingName',
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },
    {
      title: 'Batch No',
      dataIndex: 'batchNo',
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },
    {
      title: 'Units',
      dataIndex: 'unit',
      align: "center",
      render: (text) => (text ? text : 'N/A')

    },
  ]


  items = [
    {
      key: "1",
      label: "Traceability",
      children: (
        <>
        <table style={{ width: "90%"}}>

          <tr>
            <td style={{textAlign:'center', width:'50%' , padding:'10px'}}>BMR number</td>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}><Select value={dgParam.batchNumber}  options={dgBatchLov} onChange={(e) => {handleDryGoods(e,"batchNumber")}} style={{textAlign:'center',width:'200px'}} showSearch dropdownStyle={{textAlign:'center'}}></Select></td>
          </tr>
          <tr>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Porder</td>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{dgValue.order_no}</td>
          </tr>
          <tr>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Product</td>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{dgValue.prod_desc}</td>
          </tr>
          <tr>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Production qty bag</td>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{dgValue.po_qty_bag}</td>
          </tr>
          <tr>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>PO no</td>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{dgValue.po_no}</td>
          </tr>
          {/* <tr>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Brand</td>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{dgValue.prod_code}</td>
          </tr> */}
          <tr>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Production qty in carton</td>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{dgValue.po_qty_box}</td>
          </tr>
          <tr>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Weight per bag</td>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{dgParam.dgType == "Cotton Balls" ? dgValue.far_qty_bag : ''}</td>
          </tr>
          <tr>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Machine No</td>
            <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{dgValue.machine_no}</td>
          </tr>


        </table>
        </>
      ),
    },

    {
      key: "2",
      label: "Packing Materials",
      children: (
        <>
        <Table  columns={packingColumn} dataSource={dgValue.packingData}></Table>

        </>
      ),
    },
    {
      key: "3",
      label: "Online Inspection",
      children: (
        <>
        <Table columns={onlineInspection} dataSource={dgValue.onlineInspection}></Table>
        </>
      ),
    },
    {
      key: "4",
      label: "Final Inspection Report",
      children: (
        <>
          <Table columns={finalInspection} dataSource={ dgValue.finalInspection}></Table>
        </>
      ),
    },
    {
      key: "5",
      label: dgParam.dgType == "Cotton Balls" ?  "Sliver details" : "Mini Roll Details",
      children: (
        <>
        <Table  columns={sliverDetailsColumn} dataSource={dgParam.dgType == "Cotton Balls" ? dgValue.sliverLineDetails : dgValue.miniRollData}></Table>

        </>
      ),
    },
    {
      key: "6",
      label: "Ab Cotton",
      children: (
        <>
                  <Table  columns={AbCottonColumns} dataSource={dgParam.dgType == "Cotton Balls" ? dgValue.goodsAbcons : dgValue.abCons }></Table>
        </>
      ),
    },
    {
      key: "7",
      label: "Chemical  details",
      children: (
        <>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={combinedData.length}
          onChange={handleChangePage}
          style={{float:'right',marginBottom:'10px'}}
        />
        {paginatedData.map((data, index) => (
          <>
          <span style={{border:'1px solid grey',padding:'5px',borderRadius:'5px',boxShadow:'5px 5px #888888'}}><b>BMR No : </b><span style={{color:'red'}}><b>{data.key}</b></span></span>
          <React.Fragment >
            {data.chemicalDetails.length > 0 && (
              <>
              <Table
                dataSource={data.chemicalDetails}
                columns={chemicalColumns}
                pagination={{ pageSize: 3 }}
              
              />
              </>
            )}
            {data.packingDetails.length > 0 && (
              <Table
                dataSource={data.packingDetails}
                columns={packingDetailsColumn}
                pagination={{ pageSize: 3 }}
              />
            )}
          </React.Fragment>
          </>
        ))}
      </>
      ),
    },
  ]
}

  // -------------------------- Cotton Buds Tab ----------------------------------

  else if(department == 12) {

    const combinedData = chemicalTabDetails?.flatMap((data) => {
      return {
        key: data.bmr_no,
        chemicalDetails: data.chemicalDetails || [],
        packingDetails: data.packingDetails || [],
      };
    });
    const paginatedData = combinedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    const handleChangePage = (page) => {
      setCurrentPage(page);
    };


    const baseColumns = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Can No",
        dataIndex: 'canNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Net Wt',
        dataIndex: 'netWeight',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Production Date',
        dataIndex: 'prodDate',
        align: "center",
        render: (text) => (text ? formatDate(text) : 'N/A')
      },
      {
        title: 'POrder',
        dataIndex: 'orderNumber',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Grams/Mtr',
        dataIndex: 'stdWeight',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'BMR Number',
        dataIndex: 'jh',
        align: "center",
        render: (text) => (text ? text : budsParams.bmrNumber)
      },
      {
        title: 'Laydown no',
        dataIndex: 'laydownNumber',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },

    ];

    const packingMaterialColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Date",
        dataIndex: "date",
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Batch No",
        dataIndex: "packing_batch_no",
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Name Of The Material",
        dataIndex: "name_of_the_meterial",
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Quantity",
        dataIndex: "qty",
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Unit",
        dataIndex: "unit",
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
    ]

    const onlineIncColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Date",
        dataIndex: "date",
        align: "center",
              render: (text) => (text ? formatDate(text) : 'N/A')
      },
      {
        title: "Shift",
        dataIndex: "shift",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Customer Name",
        dataIndex: "customerName",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Product Description",
        dataIndex: "productDescription",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Machine Name",
        dataIndex: "machineNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "BMR No",
        dataIndex: "bmrNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "PO No",
        dataIndex: "poNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "FG No",
        dataIndex: "fgNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Lot No",
        dataIndex: "lotNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Lot Status",
        dataIndex: "lotStatus",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
    ];

    const finalIncColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Date",
        dataIndex: "date",
        align: "center",
              render: (text) => (text ? formatDate(text) : 'N/A')
      },
      {
        title: "Shift",
        dataIndex: "shift",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Customer Name",
        dataIndex: "customerName",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Product Description",
        dataIndex: "productDescription",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "BMR No",
        dataIndex: "bmrNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "PO No",
        dataIndex: "porder",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "FG No",
        dataIndex: "fgNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Lot No",
        dataIndex: "lotNo",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
      {
        title: "Lot Status",
        dataIndex: "lotStatus",
        align: "center",
              render: (text) => (text ? text : 'N/A')
      },
    ]

    const AbCottonColumns = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Bale No',
        dataIndex: 'bale',
        align: "center",
        render: (text) => (text ? text : 'N/A')

      },
      {
        title: 'Net Wt',
        dataIndex: 'netWt',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Batch No',
        dataIndex: 'batchNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
     
      {
        title: 'BMR Number',
        dataIndex: 'bmr',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'Laydown Number',
        dataIndex: 'laydown',
        align: "center",
        render: (text) => (text ? text : 'N/A')
      },
      {
        title: 'RM batch',
        dataIndex: 'rmBatch',
        align: "center",
        render: (text) => (text ? text.join(',') : 'N/A')
      },

    ];

    const chemicalColumns = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Name Of The Chemicals',
        dataIndex: 'chemicalName',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Chemical Batch No',
        dataIndex: 'batchNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Units',
        dataIndex: 'unit',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
 
    ];
    const packingDetailsColumn = [
      {
        title: "S.No",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Name Of The Packing Material',
        dataIndex: 'packingName',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Batch No',
        dataIndex: 'batchNo',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
      {
        title: 'Units',
        dataIndex: 'unit',
        align: "center",
        render: (text) => (text ? text : 'N/A')
 
      },
    ]

    items = [
      {
        key: "1",
        label: "Traceability",
        children: (
          <>
          <table style={{ width: "90%"}}>

            <tr>
              <td style={{textAlign:'center', width:'50%' , padding:'10px'}}>BMR number</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>
              <Select
                  value={budsParams.bmrNumber}
                  options={budsBmrLov}
                  showSearch
                  onChange={(value) => handleBmrDetails("bmrNumber", value)}
                        dropdownStyle={{ textAlign: "center" }}
                        style={{
                          width: "220px",
                          textAlign: "center",
                          marginLeft: "0.6rem",
                        }}
                      ></Select>
              </td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Porder</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{budsValus.productionDetails?.orderNumber}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Product</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{budsValus.productionDetails?.productDescription}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Production qty bag</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{budsValus.productionDetails?.poQuantityBags}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>PO no</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{budsValus.productionDetails?.poNumber}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Production qty in carton</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{budsValus.productionDetails?.poQuantityBoxes}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Weight per bag</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{budsValus.productionDetails?.packedQuantityBags}</td>
            </tr>
            <tr>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>Machine No</td>
              <td  style={{textAlign:'center', width:'50%' , padding:'10px'}}>{budsValus.productionDetails?.machine}</td>
            </tr>
          </table>
          </>
        ),
      },
      {
        key: "2",
        label: "Packing Materials",
        children: (
          <>
          <Table  columns={packingMaterialColumn} dataSource={packMaterial}></Table>
          </>
        ),
      },
     
      {
        key: "3",
        label: "Online Inspection",
        children: (
          <>
           <Table  columns={onlineIncColumn} dataSource={budsValus.onlineInspection}></Table>
          </>
        ),
      },
      {
        key: "4",
        label: "Final Inspection",
        children: (
          <>
           <Table  columns={finalIncColumn} dataSource={budsValus.finalInspectionBudsReport}></Table>
          </>
        ),
      },
      {
        key: "5",
        label: "Sliver details",
        children: (
          <>
           <Table  columns={baseColumns} dataSource={budsValus.sliverLines}></Table>
          </>
        ),
      },
      {
        key: "6",
        label: "Ab Cotton",
        children: (
          <>
             <Table  columns={AbCottonColumns} dataSource={budsValus.baleRequest}></Table>
          </>
        ),
      },
      {
        key: "7",
        label: "Chemical  details",
        children: (
          <>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={combinedData.length}
            onChange={handleChangePage}
            style={{float:'right',marginBottom:'10px'}}
          />
          {paginatedData.map((data, index) => (
            <>
            <span style={{border:'1px solid grey',padding:'5px',borderRadius:'5px',boxShadow:'5px 5px #888888'}}><b>BMR No : </b><span style={{color:'red'}}><b>{data.key}</b></span></span>
            <React.Fragment >
              {data.chemicalDetails.length > 0 && (
     
                <Table
                  dataSource={data.chemicalDetails}
                  columns={chemicalColumns}
                  pagination={{ pageSize: 3 }}
                />
              )}
              {data.packingDetails.length > 0 && (
                <Table
                  dataSource={data.packingDetails}
                  columns={packingDetailsColumn}
                  pagination={{ pageSize: 3 }}
                />
              )}
            </React.Fragment>
            </>
          ))}
        </>
        ),
      },
    ]

  }


  const onChange1 = (value) => {
    console.log("value", value);
    setBaleNo(value);
  };
  const onChange2 = (value) => {
    console.log("first", value);
    setBatchNo(value);
  };
  const handleRollNumber = (value) => {
    setSelectedRollNumber(value);
  }

  const handleE = (e) => {
    if (
      ["e", "E", "+", "-","."].includes(e.key)
    ) {
      e.preventDefault();
    }
  }


  // ---------------- Dry Goods Function ---------------

  const handleDryGoods = (value , key) => {
    setDgParam(prevState => ({
      ...prevState,
      [key] : value
    }))
    if(key == "dgType"){
      setDgParam(prevState => ({
        ...prevState,
        julianDay : '',
        year : '',
        batchNumber : ''
      }))


      setDgBatchLov([]);
      setDgValue({
        order_no : '',
        prod_desc : '',
        po_qty_bag : '',
        po_no : '',
        po_qty_box : '',
        machine_no : '',
        packingMaterial : [],
        sliverLineDetails : [],
        onlineInspection : [],
        finalInspection : [],
        goodsAbcons :[],
        bmrSummary :[],
        minirollDetails : [],
        miniRollData :[],
        packingData : [],
        chemicalTab : []
      })
    }
  }

   // ---------------- Pad Punching Function ---------------

   const handlePadPunching = (value , key) => {
    setPadPunchingParams(prevState => ({
      ...prevState,
      [key] : value
    }))
      setPadPunchingValue('');
  }

    // ---------------- Buds Function ---------------

    const handleBuds = (value , key) => {
      setBudsParams(prevState => ({
        ...prevState,
        [key] : value
      }))

      setBudsValue('');
  }

  const combinedData2 = bleachingPrintData?.summaryBleach?.flatMap((data) => {
    return {
      key: data.bmr_no,
      chemicalDetails: data.chemicalDetails || [],
      packingDetails: data.packingDetails || [],
    };
  });

  console.log("commnn", combinedData2)


  //----------------------------------------------------

  const handleBleachingPrintParams = (value, name) => {
    setBleachingPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleSpunlacePrintParams = (value, name) => {
    setSpunlacePrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePPValues = (value, name) => {
    setPpPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <div>
          <div id="section-to-print">
      <style>
    {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print-san table th,
  #section-to-print-san table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
                .page-break {
                page-break-after: always;
            }
      }
    `}
                </style>
 
{ department == 1 && (<>
  <div className="page-break">
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                                <td style={{border:"none",padding:'30px'}}></td>
                            </tr>
 
                            <tr>
                                <td >
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={logo} alt="Logo" style={{ height: 'auto', textAlign: 'center' , width: "20%"}} />
                                        <br></br>
                                        <br></br>
 
                                        <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                                    </div>
                                </td>
 
                                <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "80%" }} colSpan={10} >Traceability</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'15px'}}></td>
                            </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan={5}>1.Production Details</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={2}>Bale number:</td>
                                <td style={{textAlign:'center'}} colSpan={3}>{bleachingPrintData.baleNumber?.join(",") || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={2}>BMR No:</td>
                                <td style={{textAlign:'center'}} colSpan={3}>{bleachingPrintData.bmrNumber  || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={2}>Batch No:</td>
                                <td style={{textAlign:'center'}} colSpan={3}>{bleachingPrintData.batchNumber  || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={2}>Production Date:</td>
                                <td style={{textAlign:'center'}} colSpan={3}>{formatDate(bleachingPrintData.date) || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={2}>Net Wt:</td>
                                <td style={{textAlign:'center'}} colSpan={3}>{bleachingPrintData.weight || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={2}>Job Order number:</td>
                                <td style={{textAlign:'center'}} colSpan={3}>{bleachingPrintData.orderNumber || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={2}>Laydown number:</td>
                                <td style={{textAlign:'center'}} colSpan={3}>{bleachingPrintData.laydownNumber || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={2}>Laydown qty:	</td>
                                <td style={{textAlign:'center'}} colSpan={3}>{bleachingPrintData.bmrNumber || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{border:"none",padding:'10px'}}>{bleachingPrintData.batchWeight || "NA"}</td>
                            </tr>
                            <tr>
                                <td colSpan={5}>2.Suppliers</td>
                              </tr>
                            <tr>
                              <td style={{textAlign:'center'}} >S.No</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Supplier</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Batch No</td>
                            </tr>
                            {bleachingPrintData.supplier?.map((x, i) => {
                return (
                            <tr>
                              <td style={{textAlign:'center', padding:'10px'}}>{i + 1}</td>
                              <td style={{textAlign:'center'}} colSpan={2}>{x  || "NA"}</td>
                              <td style={{textAlign:'center'}} colSpan={2}>{bleachingPrintData.phBatchNumber[i]  || "NA"}</td>
                            </tr>
                              );
                            })}
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            
                            <tr>
                                <td colSpan={5}>3.Chemical Details</td>
                              </tr>
                              {bleachingPrintData?.summaryBleach?.flatMap((data) => (
                            <>
                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td style={{textAlign:'center'}}>Name of the Chemicals</td>
                                <td style={{textAlign:'center'}}>Chemical Batch No</td>
                                <td style={{textAlign:'center'}}>Quantity</td>
                                <td style={{textAlign:'center'}}>Units</td>
                              </tr>
                            {data.chemicalDetails?.map((x, i) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{i + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{x.chemicalName || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{x.batchNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{x.quantity || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{x.unit || "NA"}</td>
                              </tr>
                             ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={5}>4.Packing Material Details</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td style={{textAlign:'center'}}>Name of the Packing Material</td>
                                <td style={{textAlign:'center'}}>Batch No</td>
                                <td style={{textAlign:'center'}}>Quantity</td>
                                <td style={{textAlign:'center'}}>Units</td>
                              </tr>

                              {data.packingDetails?.map((x, i) => (          
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{i + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{x.packingName || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{x.batchNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{x.quantity || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{x.unit || "NA"}</td>
                              </tr>
                              ))}
                              </>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>                       
                            </tbody>
 
                            <tfoot>
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                                <tr>
                                    <td style={{ padding: '1em' }} colSpan={2}>Particulars</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }}>Prepared By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }}>Reviewed By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }}>Approved By</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }} colSpan={2}>Name</td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }} colSpan={2}>Signature & Date</td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                    <td style={{ padding: '1em' }}></td>
                                </tr>
                                </tfoot>
 
                        </table>
          </div>
  </>)}
  { department == 2 && (<>

    <div className="page-break">
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                                <td style={{border:"none",padding:'30px'}}></td>
                            </tr>
 
                            <tr>
                                <td >
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={logo} alt="Logo" style={{ height: 'auto', textAlign: 'center' , width: "20%"}} />
                                        <br></br>
                                        <br></br>
 
                                        <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                                    </div>
                                </td>
 
                                <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "80%" }} colSpan={10} >Traceability</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'15px'}}></td>
                            </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan={7}>1.Production Details</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>Roll Number</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{spunlacePrintData.rollNo || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>Date</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{formatDate(spunlacePrintData.date || "NA")}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>BMR / Job Order</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{spunlacePrintData.orderNo || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>Shaft Number</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{spunlacePrintData.shaftNo || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>Material</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{spunlacePrintData.material || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>Brand</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{spunlacePrintData.brand || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>Net Wt</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{spunlacePrintData.netWeight || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>GSM</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{spunlacePrintData.gsm || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>Pattern</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{spunlacePrintData.pattern || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={3}>Length</td>
                                <td style={{textAlign:'center'}} colSpan={4}>{spunlacePrintData.length || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={7}>2.Bleaching</td>
                              </tr>
                            <tr>
                              <td style={{textAlign:'center'}} >S.No</td>
                              <td style={{textAlign:'center'}}>Ab Cotton</td>
                              <td style={{textAlign:'center'}}>Net Wt</td>
                              <td style={{textAlign:'center'}}>Batch No</td>
                              <td style={{textAlign:'center'}}>BMR</td>
                              <td style={{textAlign:'center'}}>laydown number</td>
                              <td style={{textAlign:'center'}}>Rm Batch</td>
                            </tr>
                            {spunlacePrintData.bleachingData?.map((x, i) => (
                            <tr>
                              <td style={{textAlign:'center', padding:'10px'}}>{i + 1}</td>
                              <td style={{textAlign:'center'}}>{x.baleNo || "NA"}</td>
                              <td style={{textAlign:'center'}}>{x.netWeight || "NA"}</td>
                              <td style={{textAlign:'center'}}>{x.batchNo || "NA"}</td>
                              <td style={{textAlign:'center'}}>{x.bmrNumber || "NA"}</td>
                              <td style={{textAlign:'center'}}>{x.laydownNumber || "NA"}</td>
                              <td style={{textAlign:'center'}}>{x.phNumber?.join(",") || "NA"}</td>
                            </tr>
                            ))}
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={7}>3.Spunlace</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td colSpan={2} style={{textAlign:'center'}}>Rp bale</td>
                                <td colSpan={2} style={{textAlign:'center'}}>Net Wt</td>
                                <td colSpan={2} style={{textAlign:'center'}}>Order Number</td>
                              </tr>
                              {spunlacePrintData.spulanceData?.map((x, i) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{i + 1}</td>
                                <td colSpan={2} style={{textAlign:'center', padding:"10px"}}>{x.baleNo || "NA"}</td>
                                <td colSpan={2} style={{textAlign:'center', padding:"10px"}}>{x.netWeight || "NA"}</td>
                                <td colSpan={2} style={{textAlign:'center', padding:"10px"}}>{x.orderNumber || "NA"}</td>
                              </tr>
                               ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            
                            <tr>
                              <td colSpan={7}>7.Chemical & Packing Material Details</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            {spunlacePrintData.chemicalTab?.map((data) => (
                            <>
                            <tr>
                              <td colSpan={7} style={{border:'none'}}>BMR No : </td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={7}>Chemical Details</td>
                              </tr>
                              <tr>
                              <td style={{textAlign:'center'}}>S.No</td>
                              <td colSpan={2} style={{textAlign:'center'}}>Name Of The Chemicals</td>
                              <td colSpan={2} style={{textAlign:'center'}}>Chemical Batch No</td>
                              <td style={{textAlign:'center'}}>Quantity</td>
                              <td style={{textAlign:'center'}}>Units</td>
                              </tr>
                              {data.chemicalDetails?.map((x, i) => (  
                              <tr>
                                <td style={{textAlign:'center',padding:'10px'}}>{i + 1}</td>
                                <td colSpan={2} style={{textAlign:'center',padding:'10px'}}>{x.chemicalName}</td>
                                <td colSpan={2} style={{textAlign:'center',padding:'10px'}}>{x.batchNo}</td>
                                <td style={{textAlign:'center',padding:'10px'}}>{x.quantity}</td>
                                <td style={{textAlign:'center',padding:'10px'}}>{x.unit}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={7}>Packing Material Details</td>
                              </tr>
                            <tr>
                              <td style={{textAlign:'center'}}>S.No</td>
                              <td colSpan={2} style={{textAlign:'center'}}>Name Of The Packing Material</td>
                              <td colSpan={2} style={{textAlign:'center'}}>Batch No</td>
                              <td style={{textAlign:'center'}}>Quantity</td>
                              <td style={{textAlign:'center'}}>Units</td>
                              </tr>
                              {data.packingDetails?.map((x, i) => (          
                              <tr>
                                <td style={{textAlign:'center',padding:'10px'}}>{i + 1}</td>
                                <td colSpan={2} style={{textAlign:'center',padding:'10px'}}>{x.packingName}</td>
                                <td colSpan={2} style={{textAlign:'center',padding:'10px'}}>{x.batchNo}</td>
                                <td style={{textAlign:'center',padding:'10px'}}>{x.quantity}</td>
                                <td style={{textAlign:'center',padding:'10px'}}>{x.unit}</td>
                              </tr>
                              ))}
                              </>
                            ))}                     
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>                       
                            </tbody>
 
                            <tfoot>
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                                <tr>
                                    <td style={{ padding: '1em' }}>Particulars</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }} colSpan={2}>Prepared By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }} colSpan={2}>Reviewed By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }} colSpan={2}>Approved By</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }}>Name</td>
                                    <td style={{ padding: '1em' }} colSpan={2}></td>
                                    <td style={{ padding: '1em' }} colSpan={2}></td>
                                    <td style={{ padding: '1em' }} colSpan={2}></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }}>Signature & Date</td>
                                    <td style={{ padding: '1em' }} colSpan={2}></td>
                                    <td style={{ padding: '1em' }} colSpan={2}></td>
                                    <td style={{ padding: '1em' }} colSpan={2}></td>
                                </tr>
                                </tfoot>
 
                        </table>
          </div>

    </>)}

    { department == 3 && (<>
          <div className="page-break">
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                                <td style={{border:"none",padding:'30px'}}></td>
                            </tr>
 
                            <tr>
                                <td colSpan={3}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={logo} alt="Logo" style={{ height: 'auto', textAlign: 'center' , width: "20%"}} />
                                        <br></br>
                                        <br></br>
 
                                        <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                                    </div>
                                </td>
 
                                <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "80%" }} colSpan={8} >Traceability</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'15px'}}></td>
                            </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan={11}>1.Production Details</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>BMR number</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.bmr || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Order</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.orderNo || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Product</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.product || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Production qty</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.productQty || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Packed QTY</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.packedQty || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Brand</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.brand || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Po No</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.poNo || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Sale order</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.saleOrder || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Item no</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.itemCode || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Pattern</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.pattern || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Edge</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.edge || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>Machine number</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.machineNo || "NA"}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={5}>GSM</td>
                                <td style={{textAlign:'center'}} colSpan={6}>{ppPrintData.gsm || "NA"}</td>
                              </tr>                            
                              
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>2.Packing Materials</td>
                              </tr>
                            <tr>
                              <td style={{textAlign:'center'}} colSpan={3} >S.No</td>
                              <td style={{textAlign:'center'}} colSpan={4}>Batch No</td>
                              <td style={{textAlign:'center'}} colSpan={4}>Order Number</td>
                            </tr>
                            {ppPrintData.packingDetails?.map((x,i) => (
                            <tr>
                              <td style={{textAlign:'center', padding:'10px'}} colSpan={3}>{i + 1}</td>
                              <td style={{textAlign:'center'}} colSpan={4}>{x.BATCH_NO || "NA"}</td>
                              <td style={{textAlign:'center'}} colSpan={4}>{x.ORDER_NO || "NA"}</td>
                            </tr>
                            ))}
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>3.Online Inspection</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td style={{textAlign:'center'}}>Date</td>
                                <td style={{textAlign:'center'}}>Shift</td>
                                <td style={{textAlign:'center'}}>Customer Name</td>
                                <td style={{textAlign:'center'}}>Product Description</td>
                                <td style={{textAlign:'center'}}>Machine Name</td>
                                <td style={{textAlign:'center'}}> BMR No</td>
                                <td style={{textAlign:'center'}}>PO No</td>
                                <td style={{textAlign:'center'}}>FG No</td>
                                <td style={{textAlign:'center'}}>Lot No</td>
                                <td style={{textAlign:'center'}}>Lot Status</td>
                              </tr>
                              {ppPrintData.onlineInspection?.map((value,i) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{i + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{formatDate(value.date) || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.shift || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.customerName || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.productDescription || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.machineNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.bmrNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.poNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.fgNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.lotNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.lotStatus || "NA"}</td>
                              </tr>
                               ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>4.Final Inspection Report</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td style={{textAlign:'center'}}>Date</td>
                                <td style={{textAlign:'center'}}>Shift</td>
                                <td style={{textAlign:'center'}}>Customer Name</td>
                                <td style={{textAlign:'center'}}>Product Description</td>
                                <td style={{textAlign:'center'}}> BMR No</td>
                                <td style={{textAlign:'center'}}>PO No</td>
                                <td style={{textAlign:'center'}}>FG No</td>
                                <td style={{textAlign:'center'}}>Lot No</td>
                                <td style={{textAlign:'center'}} colSpan={2}>Lot Status</td>
                              </tr>
                              {ppPrintData.finalInspection?.map((value,index) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{index + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{formatDate(value.date) || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.shift || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.customerName || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.productDescription || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.bmrNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.porder || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.fgNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.lotNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={2}>{value.lotStatus || "NA"}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>5.Roll Consumption</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} >S.No</td>
                                <td style={{textAlign:'center'}}>Roll number</td>
                                <td style={{textAlign:'center'}}>BMR</td>
                                <td style={{textAlign:'center'}}>Shaft number</td>
                                <td style={{textAlign:'center'}}>Netwt</td>
                                <td style={{textAlign:'center'}}>Production Date</td>
                                <td style={{textAlign:'center'}}>Roll width</td>
                                <td style={{textAlign:'center'}}>Roll length</td>
                                <td style={{textAlign:'center'}}>Roll GSM</td>
                                <td style={{textAlign:'center'}}>Moisture</td>
                                <td style={{textAlign:'center'}}>Mixing</td>
                              </tr>
                              {ppPrintData.rollConsumptionDetails?.map((value,index) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{index + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.rollNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.bmr || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.shaftNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.netWeight || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{formatDate(value.prodDate) || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.rollWidth || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.rollLength || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.rollGsm || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.moisture || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.Mixing || "NA"}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>6.AB Cotton Consumption details</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td style={{textAlign:'center'}} colSpan={2}>Bale No</td>
                                <td style={{textAlign:'center'}}>Bale net wt</td>
                                <td style={{textAlign:'center'}}>Batch No</td>
                                <td style={{textAlign:'center'}}>BMR Number</td>
                                <td style={{textAlign:'center'}} colSpan={2}>Laydown Number</td>
                                <td style={{textAlign:'center'}} colSpan={3}>RM batch</td>
                              </tr>
                              {ppPrintData.abCottonDetails?.map((value,index) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{index + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={2}>{value.bale || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.newWt || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.batchNo.join(",") || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={2}>{value.bmr || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.laydown || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={3}>{value.rmBatch.join(",") || "NA"}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>6.RB Consumption details</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td style={{textAlign:'center'}} colSpan={2}>Bale No</td>
                                <td style={{textAlign:'center'}} colSpan={3}>net wt</td>
                                <td style={{textAlign:'center'}} colSpan={3}>BMR Number</td>
                                <td style={{textAlign:'center'}} colSpan={3}>Mixing</td>
                              </tr>
                              {ppPrintData.rpList?.map((value,index) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{index + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={2}>{value.baleNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={3}>{value.netWt || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={3}>{value.bmrNo || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={3}>{value.mixing || "NA"}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            {/* Last Tab Loop*/}
                            <tr>
                              <td colSpan={11}>7.Chemical & Packing Material Details</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            {ppPrintData.chemicalTab?.map((data, rowIndex) => (
                            <>
                            <tr>
                              <td colSpan={11} style={{border:'none'}}>{rowIndex + 1}.BMR No : {data.bmr_no}</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>Chemical Details</td>
                              </tr>
                              <tr>
                              <td style={{textAlign:'center'}} colSpan={2}>S.No</td>
                              <td style={{textAlign:'center'}} colSpan={3}>Name Of The Chemicals</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Chemical Batch No</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Quantity</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Units</td>
                              </tr>
                              {data.chemicalDetails?.map((value, i) => (
                              <tr>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{i + 1}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={3}>{value.chemicalName || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.batchNo || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.quantity || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.unit || "NA"}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>Packing Material Details</td>
                              </tr>
                            <tr>
                              <td style={{textAlign:'center'}} colSpan={2}>S.No</td>
                              <td style={{textAlign:'center'}} colSpan={3}>Name Of The Packing Material</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Batch No</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Quantity</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Units</td>
                              </tr>
                              {data.packingDetails?.map((value, i) => (
                              <tr>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{i + 1}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={3}>{value.packingName || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.batchNo || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.quantity || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.unit || "NA"}</td>
                              </tr>
                               ))}

                              </>
                            ))}
                             
                            </tbody>
 
                            <tfoot>
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                                <tr>
                                    <td style={{ padding: '1em' }} colSpan={2}>Particulars</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }} colSpan={3}>Prepared By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }} colSpan={3}>Reviewed By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }} colSpan={3}>Approved By</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }} colSpan={2}>Name</td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }} colSpan={2}>Signature & Date</td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                </tr>
                                </tfoot>
 
                        </table>
          </div>
        </>)}

        { (department == 4 || department == 12) && (<>
          <div className="page-break">
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                                <td style={{border:"none",padding:'30px'}}></td>
                            </tr>

                            <tr>
                                <td colSpan={2} >
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={logo} alt="Logo" style={{ height: 'auto', textAlign: 'center' , width: "60%"}} />
                                        <br></br>
                                        <br></br>

                                        <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                                    </div>
                                </td>

                                <td style={{ padding: '0.5em', textAlign: 'center', fontWeight: 'bold', width: "80%" }} colSpan={9} >{handleDepartmentName(department)} Traceability  {dgPrintParam.dgType ? "("+dgPrintParam.dgType +")" : ""}</td>
                            </tr>
                            <tr>
                                <td style={{border:"none",padding:'15px'}}></td>
                            </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan={11}>1.Production Details</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={6}>BMR number</td>
                                <td style={{textAlign:'center'}} colSpan={5}>{dgPrintParam.batchNumber }</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={6}>Porder</td>
                                <td style={{textAlign:'center'}} colSpan={5}>{dgPrintValue?.order_no || 'NA'}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={6}>Product</td>
                                <td style={{textAlign:'center'}} colSpan={5}>{dgPrintValue?.prod_desc || 'NA'}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={6}>Production qty bag</td>
                                <td style={{textAlign:'center'}} colSpan={5}>{dgPrintValue?.po_qty_bag || 'NA'}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={6}>PO no</td>
                                <td style={{textAlign:'center'}} colSpan={5}>{dgPrintValue?.po_no || 'NA'}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={6}>Production qty in carton</td>
                                <td style={{textAlign:'center'}} colSpan={5}>{dgPrintValue?.po_qty_box || 'NA'}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={6}>Weight per bag</td>
                                <td style={{textAlign:'center'}} colSpan={5}>{dgPrintValue?.far_qty_ba || 'NA'}</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} colSpan={6}>Machine No</td>
                                <td style={{textAlign:'center'}} colSpan={5}>{dgPrintValue?.machine_no || 'NA'}</td>
                              </tr>
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>2.Packing Materials</td>
                              </tr>
                            <tr>
                              <td style={{textAlign:'center'}} >S.No</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Date</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Batch No</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Name Of The Material</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Quantity</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Unit</td>
                            </tr>
                            {dgPrintValue.packingData.map((value , index) => (
                            <tr>
                            <td style={{textAlign:'center', padding:'10px'}}>{index + 1}</td>
                              <td style={{textAlign:'center'}} colSpan={2}>{ formatDate(value.date) }</td>
                              <td style={{textAlign:'center'}} colSpan={2}>{value.packing_batch_no}</td>
                              <td style={{textAlign:'center'}} colSpan={2}>{value.name_of_the_meterial}</td>
                              <td style={{textAlign:'center'}} colSpan={2}>{value.qty}</td>
                              <td style={{textAlign:'center'}} colSpan={2}>{value.unit}</td>
                            </tr>
                            ))}
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>3.Online Inspection</td>
                              </tr>

                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td style={{textAlign:'center'}}>Date</td>
                                <td style={{textAlign:'center'}}>Shift</td>
                                <td style={{textAlign:'center'}}>Customer Name</td>
                                <td style={{textAlign:'center'}}>Product Description</td>
                                <td style={{textAlign:'center'}}>Machine Name</td>
                                <td style={{textAlign:'center'}}>	BMR No</td>
                                <td style={{textAlign:'center'}}>PO No</td>
                                <td style={{textAlign:'center'}}>FG No</td>
                                <td style={{textAlign:'center'}}>Lot No</td>
                                <td style={{textAlign:'center'}}>Lot Status</td>
                              </tr>
                              {dgPrintValue.onlineInspection.map((value,index) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{index + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{formatDate(value.date)}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.shift}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.customerName}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.productDescription}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.machineNo}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.bmrNo}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.poNo}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.fgNo}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.lotNo}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.lotStatus}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>4.Final Inspection Report</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td style={{textAlign:'center'}}>Date</td>
                                <td style={{textAlign:'center'}}>Shift</td>
                                <td style={{textAlign:'center'}}>Customer Name</td>
                                <td style={{textAlign:'center'}}>Product Description</td>
                                <td style={{textAlign:'center'}}>	BMR No</td>
                                <td style={{textAlign:'center'}}>PO No</td>
                                <td style={{textAlign:'center'}}>FG No</td>
                                <td style={{textAlign:'center'}}>Lot No</td>
                                <td style={{textAlign:'center'}} colSpan={2}>Lot Status</td>
                              </tr>
                              {dgPrintValue.finalInspection.map((value,index) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{index + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{formatDate(value.date)}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.shift}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.customerName}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.productDescription}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.bmrNo}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.porder}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.fgNo}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.lotNo}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={2}>{value.lotStatus}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>{(dgPrintParam.dgType == "Cotton Balls" || department == 12) ? "5.Sliver Details" : "5.Mini Roll Details" }</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}} >S.No</td>
                                <td style={{textAlign:'center'}} colSpan={2}>{(dgPrintParam.dgType == "Cotton Balls" || department == 12) ? "Can No" : "Roll Number"}</td>
                                <td style={{textAlign:'center'}}>Net Wt</td>
                                <td style={{textAlign:'center'}} colSpan={2}>Production Date</td>
                                <td style={{textAlign:'center'}}>POrder</td>
                                {(dgPrintParam.dgType == "Cotton Balls" || department == 12) && (
                                <td style={{textAlign:'center'}}>	Grams/Mtr</td>
                              )}
                                <td style={{textAlign:'center'}}>BMR Number</td>
                                <td style={{textAlign:'center'}} colSpan={(dgPrintParam.dgType == "Cotton Balls" || department == 12) ? "2" : "3"}>Laydown no</td>
                              </tr>
                              {dgPrintValue.sliverLineDetails.map((value , index) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{index + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={2}>{(dgPrintParam.dgType == "Cotton Balls" || department == 12) ? value.canNo : value.BaleNo}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{department == 4 ? (dgPrintParam.dgType == "Cotton Balls" ? value.netWt : value.RNWt) : value.netWeight}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={2}>{department == 4 ? dgPrintParam.dgType == "Cotton Balls" ? formatDate(value.prod_date) : formatDate(dgPrintValue.minirollDetails[0].prod_date) : formatDate(value.prodDate) }</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{department == 4 ? dgPrintParam.dgType == "Cotton Balls" ? value.orderNo : value.POrder : value.orderNumber}</td>
                                {(dgPrintParam.dgType == "Cotton Balls" || department == 12) && (
                                <td style={{textAlign:'center', padding:"10px"}}>{department == 4 ?  value.gpm : value.stdWeight}</td>
                                )}
                                <td style={{textAlign:'center', padding:"10px"}}>{dgPrintParam.batchNumber}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={(dgPrintParam.dgType == "Cotton Balls" || department == 12) ? "2" : "3"}>{department == 4 ? dgPrintParam.dgType == "Cotton Balls" ? value.laydownNo : dgPrintValue.minirollDetails[0].laydown : value.laydownNumber}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>6.AB Cotton</td>
                              </tr>
                              <tr>
                                <td style={{textAlign:'center'}}>S.No</td>
                                <td style={{textAlign:'center'}} colSpan={2}>Bale No</td>
                                <td style={{textAlign:'center'}}>Net Wt</td>
                                <td style={{textAlign:'center'}}>Batch No</td>
                                <td style={{textAlign:'center'}} colSpan={2}>Laydown Number</td>
                                <td style={{textAlign:'center'}}>BMR Number</td>
                                <td style={{textAlign:'center'}} colSpan={3}>RM batch</td>
                              </tr>
                              {dgPrintValue.goodsAbcons.map((value , index) => (
                              <tr>
                                <td style={{textAlign:'center', padding:"10px"}}>{index + 1}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={2}>{value.bale}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{department == 4 ?  value.newWt : value.netWt}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value?.batchNo?.join(',') || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={2}>{value.laydown || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}}>{value.bmr || "NA"}</td>
                                <td style={{textAlign:'center', padding:"10px"}} colSpan={3}>{value?.rmBatch?.join(',') || "NA"}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>

<td colSpan={11}>7.Chemical & Packing Material Details</td>
</tr>
                            {/* Last Tab Loop*/}
                            {dgPrintValue.chemicalTab.map((row , rowIndex) => (
                            < >
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                              <td colSpan={11} style={{border:'none'}}>{rowIndex + 1}. BMR No : {row.bmr_no} </td>
                            </tr>
                            {/* <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr> */}
                            <tr>
                                <td colSpan={11}>Chemical Details</td>
                              </tr>
                              <tr>
                              <td style={{textAlign:'center'}}>S.No</td>
                              <td style={{textAlign:'center'}} colSpan={3}>Name Of The Chemicals</td>
                              <td style={{textAlign:'center'}} colSpan={3}>Chemical Batch No</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Quantity</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Units</td>
                              </tr>
                              {row.chemicalDetails.map((value , index) => (
                              <tr>
                                <td style={{textAlign:'center',padding:'10px'}}>{index + 1}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={3}>{value.chemicalName || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={3}>{value.batchNo || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.quantity || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.unit || "NA"}</td>
                              </tr>
                              ))}
                              <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan={11}>Packing Material Details</td>
                              </tr>
                            <tr>
                              <td style={{textAlign:'center'}}>S.No</td>
                              <td style={{textAlign:'center'}} colSpan={3}>Name Of The Packing Material</td>
                              <td style={{textAlign:'center'}} colSpan={3}>Batch No</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Quantity</td>
                              <td style={{textAlign:'center'}} colSpan={2}>Units</td>
                              </tr>
                              {row.packingDetails.map((value , index) => (
                              <tr>
                                <td style={{textAlign:'center',padding:'10px'}}>{index + 1 }</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={3}>{value.packingName || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={3}>{value.batchNo || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.quantity || "NA"}</td>
                                <td style={{textAlign:'center',padding:'10px'}} colSpan={2}>{value.unit || "NA"}</td>
                              </tr>
                              ))}
                              </>
                              ))}
                              
                            </tbody>

                            <tfoot>
                            <tr>
                                <td style={{border:"none",padding:'10px'}}></td>
                            </tr>
                                <tr>
                                    <td style={{ padding: '1em' }} colSpan={2}>Particulars</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }} colSpan={3}>Prepared By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }} colSpan={3}>Reviewed By</td>
                                    <td style={{ padding: '1em', textAlign: 'center' }} colSpan={3}>Approved By</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }} colSpan={2}>Name</td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1em' }} colSpan={2}>Signature & Date</td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                    <td style={{ padding: '1em' }} colSpan={3}></td>
                                </tr>
                                </tfoot>

                        </table>
          </div>
        
        </>)}
      </div>
      <BleachingHeader
        formName="Traceability"
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
          icon={<FaPrint color="#00308F" />}
          onClick={showPrintModal}
          shape="round"
      >
          Print
      </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={() => navigate("/Precot/choosenScreen")}
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
            icon={<FaLock color="#00308F" />}
            onClick={() => {
              if (confirm("You Want to logged out")) {
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
         <Modal title="Traceability (Print)" open={isModalPrint} onCancel={handlePrintCancel} width={380} destroyOnClose={true}
                footer={[
                    <Button key="cancel" onClick={handlePrintCancel} >
                        Cancel
                    </Button>,
                    <Button key="reject" type="primary" onClick={handlePrint} loading={printButtonLoading}>
                        OK
                    </Button>,
                ]}>
                                    {(department == 4 || department == 12) && (<>
                  { department == 4 && (<>
                  <span><b>Select BMR </b></span>
                  <Select options = {dgTypeLov} value={dgPrintParam.dgType} style={{textAlign:'center', width:'150px', marginLeft:'5px'}} onChange={(e) => {handleDgPrint(e, "dgType")}} dropdownStyle={{textAlign:'center'}}></Select> < br/><br/>
                  </>)}
                  <span style={{ marginLeft: '5px' }}><b>Julian day</b></span>
                  <Input type="text" value={dgPrintParam.julianDay} style={{textAlign:"center", width:'150px',marginLeft:'13px'}} onBlur={() => {handleDGLov()}} onChange={(e) => {handleDgPrint(e.target.value, 'julianDay')}}></Input> < br/><br/>
                  <span style={{ marginLeft: '5px' }}><b>Year</b></span>
                  <Input type="number" value={dgPrintParam.year} onKeyDown={handleE} style={{textAlign:"center", width:'150px',marginLeft:'50px'}} onBlur={() => {handleDGLov()}} onChange={(e) => {handleDgPrint(e.target.value, 'year')}}></Input> <br/><br/>
                  <span style={{ marginLeft: '5px' }}><b>BMR Number</b></span>
                  <Select value={dgPrintParam.batchNumber} loading={selectLoading}  options={dgPrintBatchLov} onChange={(e) => {handleDgPrint(e,"batchNumber")}} style={{textAlign:'center',width:'150px' , marginLeft : '5px'}} showSearch dropdownStyle={{textAlign:'center'}}></Select>
                  </>)}
                  {department == 1 && (<>
                    <Form.Item>
                  <Radio.Group onChange={handleRadioChange} value={bleachingValue}>
                    <Radio value="BaleNo">Bale No</Radio>
                    <Radio value="BatchNo">Batch No</Radio>
                  </Radio.Group>
                </Form.Item>
                {bleachingValue == "BaleNo" ? (
                  <Form.Item
                    label="Bale No"
                    style={{
                      marginLeft: "1em",
                    }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={bale}
                      placeholder="Choose Bale no"
                      value={bleachingPrintParams.bale}
                      onChange={(e) => {
                        handleBleachingPrintParams(e, "bale");
                      }}                     
                      showSearch
                    />
                  </Form.Item>
                ) : bleachingValue == "BatchNo" ? (
                  <Form.Item
                    label="Batch No"
                    style={{
                      marginLeft: "1em",
                    }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      showSearch
                      options={batch}
                      placeholder="Choose Batch no"
                      value={bleachingPrintParams.batchNo}
                      onChange={(e) => {
                        handleBleachingPrintParams(e, "batchNo");
                      }} 
                    />
                  </Form.Item>
                ) : null}
                  </>)}

                  {department == 2 && (<>
                  
                  <Form.Item
                    label="Roll Number"
                    style={{
                      marginLeft: "1em",
                    }}
                  >
                    <Select
                  style={{
                    width: "12em",
                    marginLeft: '10px'
                  }}
                  showSearch
                  options={rollNumber}
                  dropdownStyle={{ textAlign: 'center' }}
                  placeholder="Choose Role Number"
                  value={spunlacePrintParams.rollNum}
                  onChange={(e) => {
                    handleSpunlacePrintParams(e, "rollNum");
                  }} 
                />
                  </Form.Item>
                  </>)}

                 {department == 3 && (<>
                  <span style={{ marginLeft: '5px' }}><b>Julian day</b></span>
                  <Input type="text" value={ppPrintParams.julianDay} style={{textAlign:"center", width:'150px',marginLeft:'13px'}} onBlur={() => {handlePPLovData()}} onChange={(e) => {handlePPValues(e.target.value, 'julianDay')}}></Input> < br/><br/>
                  <span style={{ marginLeft: '5px' }}><b>Year</b></span>
                  <Input type="number" value={ppPrintParams.year} onKeyDown={handleE} style={{textAlign:"center", width:'150px',marginLeft:'50px'}} onBlur={() => {handlePPLovData()}} onChange={(e) => {handlePPValues(e.target.value, 'year')}}></Input> <br/><br/>
                  <span style={{ marginLeft: '5px' }}><b>BMR Number</b></span>
                  <Select value={ppPrintParams.batchNumber} loading={selectLoading}  options={ppBmrPrintLov} onChange={(e) => {handlePPValues(e,"batchNumber")}} style={{textAlign:'center',width:'150px' , marginLeft : '5px'}} showSearch dropdownStyle={{textAlign:'center'}}></Select>
                  </>)}
 
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
            localStorage.getItem("role") == "ROLE_QA"
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
                  onClick: () => navigate("/Precot/Mapping"),
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
                },
                {
                  key: "5",
                  icon: <IoCreate color="#151718" />,
                  label: (
                    <b
                      style={{
                        color: "#151718",
                      }}
                    >
                      Raw Material Issue
                    </b>
                  ),
                  onClick: () => navigate("/Precot/RawMaterialIssue"),
                },
                {
                  key: "6",
                  icon: (
                    <FaLock
                      color="#151718"
                      onClick={() => navigate("/Precot")}
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
                  onClick: () => navigate("/Precot/Mapping"),
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
                      onClick={() => navigate("/Precot")}
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
      <Row>
        <Col>
          <Form
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginTop: "1em",
            }}
          >

          
            {/*------------------------- Bleaching ------------------- */}
            {department == 1 ? (
              <>
                <Form.Item>
                  <Radio.Group onChange={onChangeRadio} value={value}>
                    <Radio value="BaleNo">Bale No</Radio>
                    <Radio value="BatchNo">Batch No</Radio>
                  </Radio.Group>
                </Form.Item>
                {value == "BaleNo" ? (
                  <Form.Item
                    label="Bale No"
                    style={{
                      marginLeft: "1em",
                    }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={bale}
                      placeholder="Choose Bale no"
                      value={baleNo}
                      onChange={onChange1}
                      showSearch
                    />
                  </Form.Item>
                ) : value == "BatchNo" ? (
                  <Form.Item
                    label="Batch No"
                    style={{
                      marginLeft: "1em",
                    }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      showSearch
                      options={batch}
                      placeholder="Choose Batch no"
                      value={batchNo}
                      onChange={onChange2}
                    />
                  </Form.Item>
                ) : null}
              </>
            ) :
            // ------------------ Spunlace -------------------------------
            (department == 2 ) ? (
            <>
              <Form.Item>
                <span style={{ marginLeft: '20px' }}><b>Roll Number</b></span>
                <Select
                  style={{
                    width: "12em",
                    marginLeft: '10px'
                  }}
                  showSearch
                  options={rollNumber}
                  dropdownStyle={{ textAlign: 'center' }}
                  placeholder="Choose Role Number"
                  value={selectedRollNumber}
                  onChange={handleRollNumber}
                />

              </Form.Item>

            </>
            ) :
            //--------------------- Pad Punching ---------------------------
            (department == 3 ) ? (
              <>
                 <Form.Item>
                  <span style={{ marginLeft: '5px' }}><b>Julian day</b></span>
                  <Input type="text" value={padPunchiingParams.julianDay} style={{textAlign:"center", width:'150px',marginLeft:'5px'}} onChange={(e) => {handlePadPunching(e.target.value, 'julianDay')}}></Input>
                  <span style={{ marginLeft: '5px' }}><b>Year</b></span>
                  <Input type="number" value={padPunchiingParams.year} onKeyDown={handleE} style={{textAlign:"center", width:'150px',marginLeft:'5px'}} onChange={(e) => {handlePadPunching(e.target.value, 'year')}}></Input>
  
                </Form.Item>
  
              </>
              ) :

            // -------------------- Dry Goods -----------------------------
            (department == 4 ) ? (
              <>
                <Form.Item>
                  <span><b>Select BMR </b></span>
                  <Select options = {dgTypeLov} value={dgParam.dgType} style={{textAlign:'center', width:'150px', marginLeft:'5px'}} onChange={(e) => {handleDryGoods(e, "dgType")}} dropdownStyle={{textAlign:'center'}}></Select>
                  <span style={{ marginLeft: '5px' }}><b>Julian day</b></span>
                  <Input type="text" value={dgParam.julianDay} style={{textAlign:"center", width:'150px',marginLeft:'5px'}} onChange={(e) => {handleDryGoods(e.target.value, 'julianDay')}}></Input>
                  <span style={{ marginLeft: '5px' }}><b>Year</b></span>
                  <Input type="number" value={dgParam.year} onKeyDown={handleE} style={{textAlign:"center", width:'150px',marginLeft:'5px'}} onChange={(e) => {handleDryGoods(e.target.value, 'year')}}></Input>
  
                </Form.Item>
  
              </>
              ) :
            
            //--------------------- Cotton Buds ----------------------------
            (department == 12 ) ? (
              <>
                 <Form.Item>
                  <span style={{ marginLeft: '5px' }}><b>Julian day</b></span>
                  <Input type="text" value={budsParams.julianDay} style={{textAlign:"center", width:'150px',marginLeft:'5px'}} onChange={(e) => {handleBuds(e.target.value, 'julianDay')}}></Input>
                  <span style={{ marginLeft: '5px' }}><b>Year</b></span>
                  <Input type="number" value={budsParams.year} onKeyDown={handleE} style={{textAlign:"center", width:'150px',marginLeft:'5px'}} onChange={(e) => {handleBuds(e.target.value, 'year')}}></Input>
                </Form.Item>  
              </>
              ) :
            null
          }

            <Form.Item
              style={{
                marginLeft: "1em",
              }}
            >
              <Button type="primary" onClick={fetchData}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Tabs
        style={{
          display: "90%",
          position: "relative",
          marginLeft: "1%",
        }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default Traceability;
