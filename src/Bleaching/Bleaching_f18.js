
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer } from "antd";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader';
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from 'react-router-dom';
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from 'moment';
import API from "../baseUrl.json";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

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



const Bleaching_f18 = () => {
  const [date, setDate] = useState('')
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");
  // console.log("state of selected", selectedRow[0])
  const roleauth = localStorage.getItem("role");
  // console.log(roleauth);
  const [modalData, setmodalData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [id, setId] = useState("");
  const [bmr_No, setBmr_No] = useState('')
  const [quantity, setQuantity] = useState('')
  const [batch_No, setBatch_No] = useState('')
  const [bale_No, setBaleNo] = useState('')
  const [HairCon, setHairCon] = useState('')
  const [HariSamp, setHairSamp] = useState('')
  const [JuteCon, setJuteCon] = useState('')
  const [JuteSamp, setJuteSamp] = useState('')
  const [ColourThreadCon, setColourThreadCon] = useState('')
  const [ColourThreadSamp, setColourThreadSamp] = useState('')
  const [WrapperCon, setWrapperCon] = useState('')
  const [WrapperSamp, setWrapperSamp] = useState('')
  const [MetalCon, setMetalCon] = useState('')
  const [MetalSamp, setMetalSamp] = useState('')
  const [RustCon, setRustCon] = useState('')
  const [RustSamp, setRustSamp] = useState('')
  const [PlasticCon, setPlasticCon] = useState('')
  const [PlasticSamp, setPlasticSamp] = useState('')
  const [BlkCottonCon, setBlkCottonCon] = useState('')
  const [UnbleachedCotton, setUnbleachedCotton] = useState('')
  const [BlkCottonSamp, setBlkCottonSAmp] = useState('')
  const [OilCottonCon, setOilCottonCon] = useState('')
  const [OilCottonSamp, setOilCottonSamp] = useState('')
  const [SoilCon, setSoilCon] = useState('')
  const [SoilSamp, setSoilSamp] = useState('')
  const [YellowCottonCon, setYellowCottonCon] = useState('')
  const [YellowCottonSamp, setYellowCottonSamp] = useState('')
  const [PaperCon, setPaperCon] = useState('')
  const [PaperSamp, setPaperSamp] = useState('')
  const [StickCon, setStickCon] = useState('')
  const [StickSamp, setStickSamp] = useState('')
  const [FeatherCon, setFeatherCon] = useState('')
  const [FeatherSamp, setFeatherSamp] = useState('')
  const [ClothCon, setClothCon] = useState('')
  const [ClothSamp, setClothSamp] = useState('')
  const [WhitePolyPropCon, setWhitePolyPropCon] = useState('')
  const [WhitePolyPropSamp, setWhitePolyPropSamp] = useState('')
  const [ColourPolyPropCon, setColourPolyPropCon] = useState('')
  const [ColourPolyPropSamp, setColourPolyPropSamp] = useState('')
  const [RubberPieceCon, setCRubberPieceCon] = useState('')
  const [RubberPieceSamp, setRubberPieceSamp] = useState('')
  const [ContaminationTotal, setContaminationTotal] = useState('')
  const [SampleTotal, setSampleTotal] = useState('')
  const [supervisorSign, setsupervisorSign] = useState('')
  const [supervisorSubmittedOn, setsupervisorSubmittedOn] = useState('')
  const [hodSubmittedOn, sethodSubmittedOn] = useState('')
  const [hodOrDesigneeSign, sethodOrDesigneeSign] = useState('')
  const [bmrOptions, setBmrOptions] = useState([]);
  const [baleOptions, setBaleOptions] = useState([]);
  const [batchNoOptions, setBatchNoOptions] = useState([]);
  const [status, setStatus] = useState('');
  const [mail_Status, setMailStatus] = useState('');
  const isPrintEnabled = selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "HOD_APPROVED";
  // console.log("is print enabled", isPrintEnabled)

  const [supervisor_status, setsupervisor_status] = useState('');
  const [supervisor_saved_on, setsupervisor_saved_on] = useState('');
  const [supervisor_saved_by, setsupervisor_saved_by] = useState('');
  const [supervisor_saved_id, setsupervisor_saved_id] = useState('');
  const [supervisor_submit_on, setsupervisor_submit_on] = useState('');
  const [supervisor_submit_by, setsupervisor_submit_by] = useState('');
  const [supervisor_submit_id, setssupervisor_submit_id] = useState('');
  const role=localStorage.getItem("role")
  const [supervisor_sign, setsupervisor_sign] = useState('');
  const [hod_status, sethod_status] = useState('');
  const [hod_saved_on, sethod_saved_on] = useState('');
  const [hod_saved_by, sethod_saved_by] = useState('');
  const [hod_saved_id, sethod_saved_id] = useState('');
  const [hod_submit_on, sethod_submit_on] = useState('');
  const [hod_submit_by, sethod_submit_by] = useState('');
  const [hod_submit_id, sethod_submit_id] = useState('');
  const [hod_sign, sethod_sign] = useState('');
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");


  const { Option } = Select;
  const { state } = location;
  const { bmrnos, batch, bale } = state || {};
  // const { batch } = state || {};
  // const { bale } = state || {};
  // console.log("bmr form create screen", bmrnos);
  // console.log("bmr form create screen", batch);
  // console.log("bmr form create screen", bale);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const token = localStorage.getItem("token");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }

  let formattedSupervisorDate;
  if (supervisor_submit_on) {
    formattedSupervisorDate = moment(supervisor_submit_on).format("DD/MM/YYYY HH:mm");
  } else {
   
    formattedSupervisorDate = ""; 
  }
  let formattedHODDate;
  if (hod_submit_on) {
    formattedHODDate = moment(hod_submit_on).format("DD/MM/YYYY  HH:mm");
  } else {
   
    formattedHODDate = ""; 
  }
  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.[0]?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.[0]?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.[0]?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.[0]?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.[0]?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.[0]?.hod_status == "HOD_APPROVED" ||
        selectedRow?.[0]?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.[0]?.hod_status == "HOD_APPROVED" ||
        selectedRow?.[0]?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.[0]?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.[0]?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedRow?.[0]?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (selectedRow?.[0]?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.[0]?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.[0]?.hod_status == "HOD_APPROVED" ||
        selectedRow?.[0]?.hod_status == "HOD_REJECTED" 
        // emptyarraycheck == 0
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        selectedRow?.[0]?.hod_status == "HOD_APPROVED" ||
        selectedRow?.[0]?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.[0]?.supervisor_sign;
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
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.[0]?.hod_sign;
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
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow, API.prodUrl, token]);

  // console.log("get image", getImage);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCotton/approveOrRejectBleachAbsCotton`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-18/Summary");
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
        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCotton/approveOrRejectBleachAbsCotton`,
        {
          id: id,
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
        navigate("/Precot/Bleaching/F-18/Summary");
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


  const handleClick = () => {
    handleSubmit();
  };
  //   const isSaveEnabled = (selectedRow?.[0]?.supervisor_status !== "SUPERVISOR_APPROVED")||(selectedRow?.[0]?.supervisor_status !== "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status !== "HOD_APPROVED")|| selectedRow?.[0]?.hod_status !== "HOD_APPROVED";
  // // console.log("is save enabled",isSaveEnabled);
  const [selectedValue, setSelectedValue] = useState(null);

  // const handleSelectChange = (value) => {
  //   setSelectedValue(value);
  // };


  // const handleBaleSelectChange = (value) => {
  //   setBaleNo(value);


  // };

  const handleSelectChange = (value) => {
    setQuantity(value);
  };

  const disabled= (
      roleauth === "ROLE_SUPERVISOR" &&
        ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
         selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
      ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
        ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
          selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"));
  // const disabled = (
  //   roleauth === "ROLE_SUPERVISOR" && selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" ||
  //   (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") && selectedRow?.[0]?.hod_status === "HOD_APPROVED"
  // );
  // const handleBatchSelectChange = (value) => {
  //   setBatch_No(value);
  //   // console.log("value of bactch", value);

  //   fetchBaleOptions(value);
  // };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const today =new Date();
  const year = today.getFullYear();
   
const month =String(today.getMonth() + 1).padStart(2,'0');
const day = String(today.getDate()).padStart(2, '0');
const formattedToday = `${year}-${month}-${day}`;  
 

  // const token = localStorage.getItem("token");

  const sendBleachingJobCard = async () => {

    setSubmitLoading(true)
    try {
      // Format the payload according to the API documentation
      let idvalue;
      const payload = {
        formatName: "CONTAMINATION CHECKING REPORT - ABSORBENT BLEACHED COTTON",
        formatNo: "PH-PRD01/F-012",
        revisionNo: 3,
        refSopNo: "SOP123",
        unit: "H",
        id: id,
        date: date,
        bmrNo: bmr_No,
        quantity: quantity,
        batchNo: batch_No,
        baleNo: bale_No,
        noOfHair: HairCon,
        refHair: HariSamp,
        noOfJute: JuteCon,
        refJute: JuteSamp,
        noOfColourThread: ColourThreadCon,
        refColourThread: ColourThreadSamp,
        noOfWrapper: WrapperCon,
        refWrapper: WrapperSamp,
        noOfMetal: MetalCon,
        refMetal: MetalSamp,
        noOfRust: RustCon,
        refRust: RustSamp,
        noOfPlastic: PlasticCon,
        refPlastic: PlasticSamp,
        noOfBlackCotton: BlkCottonCon,
        noOfUnBleachedCotton: UnbleachedCotton,
        refBlackCotton: BlkCottonSamp,
        noOfOilCotton: OilCottonCon,
        refOilCotton: OilCottonSamp,
        noOfSoil: SoilCon,
        refSoil: SoilSamp,
        noOfYellowCotton: YellowCottonCon,
        refYellowCotton: YellowCottonSamp,
        noOfPaper: PaperCon,
        refPaper: Paragraph,
        noOfStick: StickCon,
        refStick: StickSamp,
        noOfFeather: FeatherCon,
        refFeather: FeatherSamp,
        noOfCloth: ClothCon,
        refCloth: ClothSamp,
        noOfwhitePolyPropylene: WhitePolyPropCon,
        refWhitePolyPropylene: WhitePolyPropSamp,
        noOfColourPolyPropylene: ColourPolyPropCon,
        refColourPolyPropylene: ColourPolyPropSamp,
        noOfRubberPiece: RubberPieceCon,
        refRubberPiece: RubberPieceSamp,
        total: ContaminationTotal,
        refTotal: SampleTotal,


        // status: "SUBMIT"

      };


      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };


      const response = await axios.post(


        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCotton/SubmitBleachAbsCotton`,
        payload,
        { headers }
      );

      // console.log("API Response:", response.data.id);
      idvalue = response.data.id;
      // setSelectedRow(response);

      message.success("Contamination Checking Report Submitted Successfully..!");
      // console.log("mail message", response.data.message);
      // window.location.reload();
      navigate('/Precot/Bleaching/F-18/Summary');

    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to send bleaching job card");
    } finally {
      setSubmitLoading(false)
    }

  };
  const handlePrint = () => {
    window.print();
  };
  const calculateTotal = () => {
    let total = 0;

    const hairInput = document.getElementById('hair-input');
    if (hairInput) {
      total += parseInt(hairInput.value || '0');
    }

    const juteInput = document.getElementById('jute-input');
    if (juteInput) {
      total += parseInt(juteInput.value || '0');
    }

    const colourThreadInput = document.getElementById('colour-thread-input');
    if (colourThreadInput) {
      total += parseInt(colourThreadInput.value || '0');
    }

    const wrapperInput = document.getElementById('wrapper-input');
    if (wrapperInput) {
      total += parseInt(wrapperInput.value || '0');
    }

    const metalInput = document.getElementById('metal-input');
    if (metalInput) {
      total += parseInt(metalInput.value || '0');
    }

    const rustInput = document.getElementById('rust-input');
    if (rustInput) {
      total += parseInt(rustInput.value || '0');
    }

    const plasticInput = document.getElementById('plastic-input');
    if (plasticInput) {
      total += parseInt(plasticInput.value || '0');
    }

    const blkCottonInput = document.getElementById('blk-cotton-input');
    if (blkCottonInput) {
      total += parseInt(blkCottonInput.value || '0');
    }

    const oilCottonInput = document.getElementById('oil-cotton-input');
    if (oilCottonInput) {
      total += parseInt(oilCottonInput.value || '0');
    }

    const soilInput = document.getElementById('soil-input');
    if (soilInput) {
      total += parseInt(soilInput.value || '0');
    }
    const UnbleachedCottonInput = document.getElementById('unbleched-cotton-input');
    if (UnbleachedCottonInput) {
      total += parseInt(UnbleachedCottonInput.value || '0');
    }

    const yellowCottonInput = document.getElementById('yellow-cotton-input');
    if (yellowCottonInput) {
      total += parseInt(yellowCottonInput.value || '0');
    }

    const paperInput = document.getElementById('paper-input');
    if (paperInput) {
      total += parseInt(paperInput.value || '0');
    }

    const stickInput = document.getElementById('stick-input');
    if (stickInput) {
      total += parseInt(stickInput.value || '0');
    }

    const featherInput = document.getElementById('feather-input');
    if (featherInput) {
      total += parseInt(featherInput.value || '0');
    }

    const clothInput = document.getElementById('cloth-input');
    if (clothInput) {
      total += parseInt(clothInput.value || '0');
    }

    const whitePolyPropInput = document.getElementById('white-poly-prop-input');
    if (whitePolyPropInput) {
      total += parseInt(whitePolyPropInput.value || '0');
    }

    const colourPolyPropInput = document.getElementById('colour-poly-prop-input');
    if (colourPolyPropInput) {
      total += parseInt(colourPolyPropInput.value || '0');
    }

    const rubberPieceInput = document.getElementById('rubber-piece-input');
    if (rubberPieceInput) {
      total += parseInt(rubberPieceInput.value || '0');
    }

    const totalInput = document.getElementById('total-input');
    if (totalInput) {
      totalInput.value = total.toString();
    }
    setContaminationTotal(total.toString());
  };
  const checkBmrExists = async (bmrNolocal) => {
    setLoading(true);
    try {
      const bmrNolocal = bmrnos;
      // console.log("stored bmr inside", bmrNolocal);

      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCottonByBmrAndSubbatchAndBale?bmrNo=${bmrNolocal}&batchNo=${batch}&baleNo=${bale}`,
        {

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

        }


      );
      // console.log("response", response.data);
      setemptyarraycheck(response.data.length);
      if (response.data && response.data.length > 0) {

        // setIsEdit(true);

        const data = response.data;
        // console.log("data", data)
        setSelectedRow(data);
        setemptyarraycheck(response.data.length);
        // setmodalData(response.data);
        // console.log("setSelectedRow", selectedRow);
        // console.log("inside data", data);
        setId(data[0].id)
        setDate(data[0].date);
        setQuantity(data[0].quantity || '');
        setBatch_No(data[0].batchNo || '');
        setBaleNo(data[0].baleNo || '');
        setHairCon(data[0].noOfHair ? data[0].noOfHair : '0');
        setHairSamp(data[0].refHair || '');
        setJuteCon(data[0].noOfJute ? data[0].noOfJute : '0');
        setJuteSamp(data[0].refJute || '');
        setColourThreadCon(data[0].noOfColourThread ? data[0].noOfColourThread : '0');
        setColourThreadSamp(data[0].refColourThread || '');
        setWrapperCon(data[0].noOfWrapper ? data[0].noOfWrapper : '0');
        setWrapperSamp(data[0].refWrapper || '');
        setMetalCon(data[0].noOfMetal ? data[0].noOfMetal : '0');
        setMetalSamp(data[0].refMetal || '');
        setRustCon(data[0].noOfRust ? data[0].noOfRust : '0');
        setRustSamp(data[0].refRust || '');
        setPlasticCon(data[0].noOfPlastic ? data[0].noOfPlastic : '0');
        setPlasticSamp(data[0].refPlastic || '');
        setBlkCottonCon(data[0].noOfBlackCotton ? data[0].noOfBlackCotton : '0');
        setUnbleachedCotton(data[0].noOfUnBleachedCotton ? data[0].noOfUnBleachedCotton : '0');
        setBlkCottonSAmp(data[0].refBlackCotton || '');
        setOilCottonCon(data[0].noOfOilCotton ? data[0].noOfOilCotton : '0');
        setOilCottonSamp(data[0].refOilCotton || '');
        setSoilCon(data[0].noOfSoil ? data[0].noOfSoil : '0');
        setSoilSamp(data[0].refSoil || '');
        setYellowCottonCon(data[0].noOfYellowCotton ? data[0].noOfYellowCotton : '0');
        setYellowCottonSamp(data[0].refYellowCotton || '');
        setStickCon(data[0].noOfStick ? data[0].noOfStick : '0');
        setPaperSamp(data[0].refPaper || '');
        setPaperCon(data[0].noOfPaper ? data[0].noOfPaper : '0');
        setStickSamp(data[0].refStick || '');
        setFeatherCon(data[0].noOfFeather ? data[0].noOfFeather : '0');
        setFeatherSamp(data[0].refFeather || '');
        setClothCon(data[0].noOfCloth ? data[0].noOfCloth : '0');
        setClothSamp(data[0].refCloth || '');
        setWhitePolyPropCon(data[0].noOfwhitePolyPropylene ? data[0].noOfwhitePolyPropylene : '0');
        setWhitePolyPropSamp(data[0].refWhitePolyPropylene || '');
        setColourPolyPropCon(data[0].noOfColourPolyPropylene ? data[0].noOfColourPolyPropylene : '0');
        setColourPolyPropSamp(data[0].refColourPolyPropylene || '');
        setCRubberPieceCon(data[0].noOfRubberPiece ? data[0].noOfRubberPiece : '0');
        setRubberPieceSamp(data[0].refRubberPiece || '');
        setContaminationTotal(data[0].total || '');
        setSampleTotal(data[0].refTotal || '');
        setsupervisorSign(data[0].supervisor_sign || '');
        setsupervisorSubmittedOn(data[0].supervisor_submit_on || '');
        sethodSubmittedOn(data[0].hod_submit_on || '');
        sethodOrDesigneeSign(data[0].hod_sign || '');
        setsupervisor_status(data[0].supervisor_status || '');
        setsupervisor_saved_on(data[0].supervisor_saved_on || '');
        setsupervisor_saved_by(data[0].supervisor_saved_by || '');
        setsupervisor_saved_id(data[0].supervisor_saved_id || '');
        setsupervisor_submit_on(data[0].supervisor_submit_on || '');
        setsupervisor_submit_by(data[0].supervisor_submit_by || '');
        setssupervisor_submit_id(data[0].supervisor_submit_id || '');
        setsupervisor_sign(data[0].supervisor_sign || '');
        sethod_status(data[0].hod_status || '');
        sethod_saved_on(data[0].hod_saved_on || '');
        sethod_saved_by(data[0].hod_saved_by || '');
        sethod_saved_id(data[0].hod_saved_id || '');
        sethod_submit_on(data[0].hod_submit_on || '');
        sethod_submit_by(data[0].hod_submit_by || '');
        sethod_submit_id(data[0].hod_submit_id || '');
        sethod_sign(data[0].hod_sign || '');
      } else {
        if(role == "ROLE_HOD" || role === "ROLE_DESIGNEE"){
          message.error("Supervisor Yet Not Approved!");
          setTimeout(() => {
            navigate('/Precot/Bleaching/F-18/Summary')
          }, 1000);
        }
      }
    } catch (error) {
     
      console.error('Error checking BMR existence:', error);
      // message.error('Error checking BMR existence');
    } finally {
      setLoading(false);
    }

  };

  const fetchBatchOptions = async () => {
    try {
      const bmrNolocal = bmrnos;
      const response = await fetch(`${ API.prodUrl}/Precot/api/bleaching/generation/fetchBatchByBMR?bmr_no=${bmrnos}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();


      // console.log(data);


      if (Array.isArray(data)) {
        setBatchNoOptions(data);
      } else {
        console.error("API response is not an array", data);
        setBatchNoOptions([]);
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
      setBatchNoOptions([]);
    }
  };

  useEffect(() => {
    const fetchBmrOptions = async () => {
      try {
        const response = await fetch(`${ API.prodUrl}/Precot/api/LOV/Service/bMRNumbersLOV`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();


        // console.log(data);


        if (Array.isArray(data)) {
          setBmrOptions(data);
        } else {
          console.error("API response is not an array", data);
          setBmrOptions([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setBmrOptions([]);
      }
    };

    fetchBmrOptions();
  }, [token]);
  const fetchBaleOptions = async (value) => {
    // console.log("value of fetch", value);
    try {
      const response = await fetch(`${ API.prodUrl}/Precot/api/bleaching/generation/fetchBaleByBatch?batchNo=${value}&bmr_no=${bmrnos}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();


      // console.log("bale", data);


      if (Array.isArray(data)) {
        setBaleOptions(data);
        console.error("API response is not an array", data);

      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
      setBaleOptions([]);
    }
  };


  useEffect(() => {

    fetchBatchOptions();
    // fetchBaleOptions();
    checkBmrExists();
  }, []);
  const handleSubmit = async () => {
  

    try {
      await sendBleachingJobCard();
      //// console.log("Date Format :",new Date(INcharge_Date).toLocaleDateString() + " " +new Date(INcharge_Date).toLocaleDateString )
      // alert("Bleaching job card submitted successfully!");
      setButtonDisabled(true);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };


  const onChange = (key) => {
    // console.log(key);
  };

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-18/Summary");
  };
  // const handleBack = () => {

  //   navigate(-1);
  // };
  useEffect(() => {
    const storedBmr_No = bmrnos;
    const storedbatch = batch;
    const storedbale = bale;

    if (storedBmr_No) {
      setBmr_No(storedBmr_No);
    }
    if (storedbatch) {
      setBatch_No(storedbatch);
    }
    if (storedbale) {
      setBaleNo(storedbale);
    }

  }, []);

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await sendContaminationCheck2();

      // alert("Contamination Check saved successfully!");
    } catch (error) {
      console.error("Error submitting Contamination Check:", error);
    }

  };

  const sendContaminationCheck2 = async () => {
    setSaveLoading(true);
    // let idget = localStorage.getItem("id");

    try {
      // // console.log(idget);
      const payload = {


        formatName: "CONTAMINATION CHECKING REPORT - ABSORBENT BLEACHED COTTON",
        formatNo: "PH-PRD01/F-012",
        revisionNo: 3,
        refSopNo: "SOP123",
        unit: "H",
        id: id,
        date: date,
        bmrNo: bmr_No,
        quantity: quantity,
        batchNo: batch_No,
        baleNo: bale_No,
        noOfHair: HairCon,
        refHair: HariSamp,
        noOfJute: JuteCon,
        refJute: JuteSamp,
        noOfColourThread: ColourThreadCon,
        refColourThread: ColourThreadSamp,
        noOfWrapper: WrapperCon,
        refWrapper: WrapperSamp,
        noOfMetal: MetalCon,
        refMetal: MetalSamp,
        noOfRust: RustCon,
        refRust: RustSamp,
        noOfPlastic: PlasticCon,
        refPlastic: PlasticSamp,
        noOfBlackCotton: BlkCottonCon,
        noOfUnBleachedCotton: UnbleachedCotton,
        refBlackCotton: BlkCottonSamp,
        noOfOilCotton: OilCottonCon,
        refOilCotton: OilCottonSamp,
        noOfSoil: SoilCon,
        refSoil: SoilSamp,
        noOfYellowCotton: YellowCottonCon,
        refYellowCotton: YellowCottonSamp,
        noOfPaper: PaperCon,
        refPaper: Paragraph,
        noOfStick: StickCon,
        refStick: StickSamp,
        noOfFeather: FeatherCon,
        refFeather: FeatherSamp,
        noOfCloth: ClothCon,
        refCloth: ClothSamp,
        noOfwhitePolyPropylene: WhitePolyPropCon,
        refWhitePolyPropylene: WhitePolyPropSamp,
        noOfColourPolyPropylene: ColourPolyPropCon,
        refColourPolyPropylene: ColourPolyPropSamp,
        noOfRubberPiece: RubberPieceCon,
        refRubberPiece: RubberPieceSamp,
        total: ContaminationTotal,
        refTotal: SampleTotal,
        mail_Status: mail_Status,
        supervisor_status: supervisor_status,
        supervisor_saved_on: supervisor_saved_on,
        supervisor_saved_by: supervisor_saved_by,
        supervisor_saved_id: supervisor_saved_id,
        supervisor_submit_on: supervisor_submit_on,
        supervisor_submit_by: supervisor_submit_by,
        supervisor_submit_id: supervisor_submit_id,
        supervisor_sign: supervisor_sign,
        hod_status: hod_status,
        hod_saved_on: hod_saved_on,
        hod_saved_by: hod_saved_by,
        hod_saved_id: hod_saved_id,
        hod_submit_on: hod_submit_on,
        hod_submit_by: hod_submit_by,
        hod_submit_id: hod_submit_id,
        hod_sign: hod_sign,



      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };


      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCotton/SaveBleachAbsCotton`,
        payload,
        { headers }
      );
      // window.location.reload();
      if (!date) {
        setDateError('Please fill the date');
      }

      // console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate('/Precot/Bleaching/F-18/Summary');
      }, 1500)

      // idget = localStorage.getItem("id");
      // // console.log("idget", idget);
      message.success('Contamination Checking Saved Successfully..');


    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to send bleaching job card");

    } finally {
      setSaveLoading(false);
    }
  };


  const items = [
    {
      key: "1",
      label: <p>Form - 1</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "70%", margin: "auto" }}>
            {/* <tr>
            <td style={{ height: "35px",paddingLeft:"8px"}}>Date:</td>
            <td colspan="2" ><input value={date} type="Date" onChange={(e) =>setDate(e.target.value)} className='borderbuttom'  style={{ width: '99%' ,height:'35px'}}></input>
                     </td>
            <td style={{ paddingLeft:"8px" }}>BMR No:</td>
            <td colspan="2">
      <input
        type="text"
        value={bmr_No}
        onChange={(e) => setBmr_No(e.target.value)}
        style={{ width: '99%', height: '39px' }}
      />
    </td>
           
        </tr> */}

            <tr >
              <th style={{ height: "35px", textAlign: "center" }}>Sr.No.</th>
              <th style={{ textAlign: 'center' }}>Types Of Contamination</th>
              <th colSpan="2" style={{ textAlign: 'center' }}>No.Of Contamination</th>
              {/* <th colSpan="2" style={{ textAlign: 'center' }}>Ref. Sample</th> */}
            </tr>

            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>1</td>
              <td style={{ textAlign: "center" }}>Hair</td>
              <td colSpan="2" ><input id="hair-input" value={HairCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setHairCon(value);
                  calculateTotal();
                }
              }} inputMode="numeric" className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              // disabled={
              //   (roleauth === "ROLE_SUPERVISOR" &&
              //     ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
              //      selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
              //   ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
              //     (selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
              //      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED")
              // }
              disabled={
                (roleauth === "ROLE_SUPERVISOR" &&
                  ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
                   selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
                ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
                  ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
              }
              ></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>2</td>
              <td style={{ textAlign: "center" }} >Jute</td>
              <td colSpan="2" ><input id="jute-input" value={JuteCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setJuteCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>3</td>
              <td style={{ textAlign: "center" }}>Colour Threads</td>
              <td colSpan="2" ><input id="colour-thread-input" value={ColourThreadCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setColourThreadCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>4</td>
              <td style={{ textAlign: "center" }}>Strapper</td>
              <td colSpan="2" ><input id="wrapper-input" value={WrapperCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setWrapperCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }}
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>5</td>
              <td style={{ textAlign: "center" }}>Metal piece</td>
              <td colSpan="2" ><input id="metal-input" value={MetalCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setMetalCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>6</td>
              <td style={{ textAlign: "center" }}>Brown/Rusty cotton</td>
              <td colSpan="2" ><input id="rust-input" value={RustCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setRustCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }}
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>7</td>
              <td style={{ textAlign: "center" }}>Plastic</td>
              <td colSpan="2" ><input id="plastic-input" value={PlasticCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setPlasticCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>8</td>
              <td style={{ textAlign: "center" }} >Black cotton</td>
              <td colSpan="2" ><input id="blk-cotton-input" value={BlkCottonCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setBlkCottonCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>9</td>
              <td style={{ textAlign: "center" }} >Unbleached cotton</td>
              <td colSpan="2" ><input id="unbleched-cotton-input" value={UnbleachedCotton} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setUnbleachedCotton(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>10</td>
              <td style={{ textAlign: "center" }}>Oil Cotton</td>
              <td colSpan="2" ><input id="oil-cotton-input" value={OilCottonCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setOilCottonCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>

          </table>
        </div>
      ),
    }, {
      key: "2",
      label: <p>Form - 2</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "70%", margin: "auto" }}>
            <tr >
              <th style={{ height: "35px", textAlign: "center" }}>Sr.No.</th>
              <th style={{ textAlign: 'center' }}>Types Of Contamination</th>
              <th colSpan="2" style={{ textAlign: 'center' }}>No.Of Contamination</th>
              {/* <th colSpan="2" style={{ textAlign: 'center' }}>Ref. Sample</th> */}
            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>11</td>
              <td style={{ textAlign: "center" }}>Soils</td>
              <td colSpan="2" >
                <input id="soil-input" className="inp-new" value={SoilCon} onChange={(e) => {
                  const value = e.target.value;

                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setSoilCon(value);
                    calculateTotal();
                  }
                }} style={{ width: '95%', height: '35px', border: "none" }} 
                disabled={
                  (roleauth === "ROLE_SUPERVISOR" &&
                    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
                     selectedRow?.[0]?.hod_status === "HOD_REJECTED")) ||
                  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
                    (selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
                     selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED")
                }></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>12</td>
              <td style={{ textAlign: "center" }}>Yellow Cotton</td>
              <td colSpan="2" ><input id="yellow-cotton-input" value={YellowCottonCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setYellowCottonCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>13</td>
              <td style={{ textAlign: "center" }}>Paper</td>
              <td colSpan="2" ><input id="paper-input" value={PaperCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setPaperCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }}
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>14</td>
              <td style={{ textAlign: "center" }}>Stick</td>
              <td colSpan="2" ><input id="stick-input" value={StickCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setStickCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>15</td>
              <td style={{ textAlign: "center" }}>Feather</td>
              <td colSpan="2" ><input id="feather-input" value={FeatherCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setFeatherCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>16</td>
              <td style={{ textAlign: "center" }} >Cloth</td>
              <td colSpan="2" ><input id="cloth-input" value={ClothCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setClothCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>17</td>
              <td style={{ textAlign: "center" }}>White Poly Propylene</td>
              <td colSpan="2" ><input id="white-poly-prop-input" value={WhitePolyPropCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setWhitePolyPropCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>18</td>
              <td style={{ textAlign: "center" }}>Colour Poly Propylene</td>
              <td colSpan="2" ><input id="colour-poly-prop-input" value={ColourPolyPropCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setColourPolyPropCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }}
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td style={{ height: "35px", textAlign: "center" }}>19</td>
              <td style={{ textAlign: "center" }}>Rubber Piece</td>
              <td colSpan="2" ><input id="rubber-piece-input" value={RubberPieceCon} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {
                  setCRubberPieceCon(value);
                  calculateTotal();
                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>
            <tr >
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>TOTAL:</td>

              <td colSpan="2" ><input id="total-input" value={ContaminationTotal} onChange={(e) => {
                const value = e.target.value;

                if (value === '' || /^[0-9\b]+$/.test(value)) {


                }
              }} className="inp-new" style={{ width: '95%', height: '35px', border: "none" }} 
              disabled={
  (roleauth === "ROLE_SUPERVISOR" &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
     selectedRow?.[0]?.hod_status === "HOD_APPROVED")) ||
  ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
    ((selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.[0]?.hod_status === "WAITING_FOR_APPROVAL") ||
      selectedRow?.[0]?.hod_status === "HOD_APPROVED" || selectedRow?.[0]?.hod_status === "HOD_REJECTED"))
}></input></td>

            </tr>

          </table>
        </div>
      ),
    }, {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "100%", margin: "auto" }}>
            <tr >
              <td colSpan="3" style={{ height: "35px", textAlign: "center" }}> Production Supervisor Sign & Date</td>

              <td colSpan="3" style={{ textAlign: "center" }}>HOD/Designee Sign & Date </td>

            </tr>
            <tr >
              <td colSpan="3" style={{ height: "100px", textAlign: "center", marginBottom: "auto"}}>
                  {selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" && (
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
                        <div>{supervisorSign}</div>
                        <div>{formattedSupervisorDate}</div>
                      </div>
                      {getImage !== "" && (
                      <img className="signature"
                        src={getImage}
                        alt="Supervisor"
                        
                      />
                      )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
                  </td>

              <td colSpan="3" style={{ textAlign: "center" }}>
                {(selectedRow?.[0]?.hod_status === "HOD_REJECTED" || 
                selectedRow?.[0]?.hod_status === "HOD_APPROVED") && (
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
                          <div>{hodOrDesigneeSign}</div>
                          <div>{formattedHODDate}</div>
                        </div>
                        {getImage1 !== "" && (
                        <img className="signature"
                          src={getImage1}
                          alt="HOD"
                         
                        />)}
                      </div>
                      {/* <span style={{fontSize:'11px',marginLeft:"0px"}}>Signature & Date</span> */}
                    </>
                  )}
                </td>

            </tr>

          </table>
        </div>
      ),
    }]

  const formatName = "CONTAMINATION CHECKING REPORT(Absorbent Bleached Cotton)"
  const formatNo = 'PH-PRD01/F-012'
  const revisionNo = "02"
  const sopNo = 'PRD01-D-09'

  return (
    <div>
      {/* {
        loading == true ?
          <div style={{
            width: '100%',
            height: '100vh',
            position: 'absolute',
            backgroundColor: 'rgba(233,242,234,.8)',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img style={{background:"none"}} src={gif} alt="loading" />
          </div>
          : null
      } */}
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

      <div id="section-to-print">

        <table style={{ width: "90%", height: "50%" ,marginTop:"8%"}} >

          <tbody>
            <tr>
            <td colSpan="3" rowspan="4 "style={{textAlign:'center'}}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
                <br></br>
                  Unit H
                </td>
              <th colSpan="7" rowSpan="4" style={{ textAlign: 'center' }}>CONTAMINATION CHECKING REPORT<br />
                (Absorbent Bleached Cotton)
              </th>
              <td colSpan="2"
              >Format No.:</td>
              <td colSpan="3">PH-PRD01/F-012</td>
            </tr>
            <tr>
              <td colSpan="2">Revision No.:</td>
              <td colSpan="3">01</td>
            </tr>
            <td colSpan="2">Ref. SOP No.:</td>
            <td colSpan="3">PRD01-D-09</td>
            <tr>
              <td colSpan="2">Page NO.:</td>
              <td colSpan="3">1 of 1</td>
            </tr>    </tbody>
            </table><br></br>
 <table style={{ width: "90%", height: "50%" }} ><tbody>

            <tr>
              <td colspan="8" style={{ height: "15px", paddingLeft: "8px" }}>Date:{selectedRow && selectedRow[0] && selectedRow[0].date && (
  <span>
    {new Date(selectedRow[0].date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })}
  </span>
)}</td>
              {/* <td colspan="5" > {selectedRow && selectedRow[0] && selectedRow[0].date && (
  <span>
    {new Date(selectedRow[0].date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })}
  </span>
)}
              </td> */}
              <td colspan="7" style={{ paddingLeft: "8px" }}>BMR No:{selectedRow && selectedRow[0].bmrNo}</td>
              {/* <td colspan="5">{selectedRow && selectedRow[0].bmrNo}


              </td> */}

            </tr>
            <tr>
              <td colspan="5" style={{ height: "15px", paddingLeft: "8px" }}>Quantity in Kg:{selectedRow && selectedRow[0].quantity}</td>
              {/* <td colspan="2">{selectedRow && selectedRow[0].quantity} </td> */}
              <td colspan="5" style={{ paddingLeft: "8px" }}>Batch No:{selectedRow && selectedRow[0].batchNo} </td>
              {/* <td colspan="3">{selectedRow && selectedRow[0].batchNo} </td> */}
              <td colspan="5" style={{ paddingLeft: "8px" }}>Bale No:{selectedRow && selectedRow[0].baleNo}</td>
              {/* <td colspan="3">{selectedRow && selectedRow[0].baleNo}</td> */}
            </tr>
            <tr>
              <td  style={{ wight:'10px !important', height: '15px',textAlign: 'center' }}>S.No</td>
              <td colSpan="4" style={{ textAlign: 'center' }}>Types of Contamination</td>
              <td colSpan="5" style={{ textAlign: 'center' }} >No .of Contamination</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>Ref .Sample</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }} >1</td>
              <td colSpan="4" >Hair</td>
              <td colSpan="5" style={{ textAlign: 'center' }}> {selectedRow && selectedRow[0].noOfHair !== null ? selectedRow[0].noOfHair : 0}
              </td>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                {selectedRow && selectedRow[0].refHair}
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>2</td>
              <td colSpan="4">Jute</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                {selectedRow && selectedRow[0].noOfJute !== null ? selectedRow[0].noOfJute : 0}
              </td>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                {selectedRow && selectedRow[0].refJute}
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>3</td>
              <td colSpan="4">Colour Threads</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                {selectedRow && selectedRow[0].noOfColourThread !== null ? selectedRow[0].noOfColourThread : 0}
              </td>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                {selectedRow && selectedRow[0].refColourThread}
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>4</td>
              <td colSpan="4">Wrapper</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfWrapper !== null ? selectedRow[0].noOfWrapper : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refWrapper}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>5</td>
              <td colSpan="4">Metal piece</td>
              <td colSpan="5" style={{ textAlign: 'center' }}> {selectedRow && selectedRow[0].noOfMetal !== null ? selectedRow[0].noOfMetal : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refMetal}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>6</td>
              <td colSpan="4">Brown/Rusty cotton</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfRust !== null ? selectedRow[0].noOfRust : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refRust}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>7</td>
              <td colSpan="4">Plastic</td>
              <td colSpan="5" style={{ textAlign: 'center' }}> {selectedRow && selectedRow[0].noOfPlastic !== null ? selectedRow[0].noOfPlastic : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refPlastic}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>8</td>
              <td colSpan="4">Black Cotton</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfBlackCotton !== null ? selectedRow[0].noOfBlackCotton : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refBlackCotton}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>9</td>
              <td colSpan="4">Unbleached cotton</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfUnBleachedCotton !== null ? selectedRow[0].noOfUnBleachedCotton : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refUnBleachedCotton}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>10</td>
              <td colSpan="4">Oil cotton</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfOilCotton !== null ? selectedRow[0].noOfOilCotton : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refOilCotton}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>11</td>
              <td colSpan="4">Soils</td>
              <td colSpan="5" style={{ textAlign: 'center' }}> {selectedRow && selectedRow[0].noOfSoil !== null ? selectedRow[0].noOfSoil : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refSoil}</td>
            </tr>


            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>12</td>
              <td colSpan="4">Yellow Cotton</td>
              <td colSpan="5" style={{ textAlign: 'center' }}> {selectedRow && selectedRow[0].noOfYellowCotton !== null ? selectedRow[0].noOfYellowCotton : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refYellowCotton}</td>
            </tr>

            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>13</td>
              <td colSpan="4">Paper</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfPaper !== null ? selectedRow[0].noOfPaper : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refPaper}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>14</td>
              <td colSpan="4">Stick</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>  {selectedRow && selectedRow[0].noOfStick !== null ? selectedRow[0].noOfStick : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refStick}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>15</td>
              <td colSpan="4">Feather</td>
              <td colSpan="5" style={{ textAlign: 'center' }}> {selectedRow && selectedRow[0].noOfFeather !== null ? selectedRow[0].noOfFeather : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refFeather}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>16</td>
              <td colSpan="4">Cloth</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfCloth !== null ? selectedRow[0].noOfCloth : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refCloth}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>17</td>
              <td colSpan="4">White Poly Propylene</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfwhitePolyPropylene !== null ? selectedRow[0].noOfwhitePolyPropylene : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refWhitePolyPropylene}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>18</td>
              <td colSpan="4">Colour Poly Propylene</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfColourPolyPropylene !== null ? selectedRow[0].noOfColourPolyPropylene : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refColourPolyPropylene}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: 'center' }}>19</td>
              <td colSpan="4">Rubber Piece</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].noOfRubberPiece !== null ? selectedRow[0].noOfRubberPiece : 0}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].refRubberPiece}</td>
            </tr>
            <tr>

              <td colSpan="5" style={{ textAlign: 'center' }}>TOTAL:</td>
              <td colSpan="5" style={{ textAlign: 'center' }}> {selectedRow && selectedRow[0].total}</td>
              <td colSpan="5" style={{ textAlign: 'center' }}> {selectedRow && selectedRow[0].refTotal}</td>
            </tr>
            
            <tr>
              <th colSpan="7" style={{ textAlign: 'center' }}>Performed by Production Supervisor</th>
              <th colSpan="8" style={{ textAlign: 'center' }}>Reviewed by HOD/Designee</th>
            </tr>
            {/* <tr>
              <th colSpan="7" style={{ height: "70px" ,textAlign: 'center',verticalAlign: }}>{selectedRow && selectedRow[0].hod_sign}</th>
              <th colSpan="8" style={{ textAlign: 'center' }}>{selectedRow && selectedRow[0].hod_sign}</th>
            </tr>
             */}

            <tr >
              <th colSpan="7" style={{ height: "70px", textAlign: "center", marginBottom: "auto", verticalAlign: "bottom" }}>
                <div style={{ fontSize: "12px !important" }}>{selectedRow && selectedRow[0].supervisor_sign}
                <span style={{ marginLeft: '5px', marginRight: '5px' }}> <br/> </span>
                       {selectedRow && selectedRow[0].supervisor_submit_on && new Date(selectedRow[0].supervisor_submit_on).toLocaleDateString('en-GB')}</div>
                <div style={{ fontSize: "12px !important" }}> Sign & Date</div>
                </th>



              <th colSpan="8" style={{ textAlign: "center", verticalAlign: "bottom" }}>

                <div style={{ fontSize: "12px !important" }}>{selectedRow && selectedRow[0].hod_sign}
                <span style={{ marginLeft: '5px', marginRight: '5px' }}> <br/> </span>
                {selectedRow && selectedRow[0].hod_submit_on && new Date(selectedRow[0].hod_submit_on).toLocaleDateString('en-GB')}</div>
                <div style={{ fontSize: "12px !important" }}>Sign& Date</div>
                </th>

            </tr>
            </tbody>
            </table><br></br>
 <table style={{ width: "90%", height: "50%" }} ><tbody>
            <tr>
              <th colSpan="3" >Particular</th>
              <th colSpan="4" style={{ textAlign: "center" }}>Prepared by</th>
              <th colSpan="4" style={{ textAlign: "center" }}><centre>Reviewed by</centre></th>
              <th colSpan="4" style={{ textAlign: "center" }}>Approved by</th>
            </tr>
            <tr>
              <th colSpan="3">Name</th>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
            </tr>
            <tr>
              <th colSpan="3">Signature & Date</th>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
            </tr>

          </tbody>
        </table>
      </div>




      <BleachingHeader
        unit="Unit-H"
        formName="Contamination Checking Report (Absorbent Bleached Cotton)"
        formatNo="PH-PRD01/F-012"
        sopNo="PRD01-D-09"
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
                  loading={submitLoading}
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

            loading={saveLoading}
            type="primary"
            onClick={handleSave}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // marginRight: '20px',
              display: canDisplayButton2()

            }}
            shape="round"
            icon={<IoSave color="#00308F" />}
          >
            Save
          </Button>
          <Button
            loading={submitLoading}
            type="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // marginRight: '20px',
              display: canDisplayButtons()

            }}
            icon={<GrDocumentStore color="#00308F" />}
            shape="round"
          >
            Submit
          </Button>
          </>
            ),

          <Button type="primary"  icon={<GoArrowLeft color="#00308F" />} onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // marginRight: '20px',

            }}

            shape="round">Back</Button>,
          // (isPrintEnabled) && (
          //   <Button type="primary"   icon={<IoPrint color="#00308F" />} onClick={handlePrint}
          //     style={{
          //       backgroundColor: "#E5EEF9",
          //       color: "#00308F",
          //       fontWeight: "bold",
          //       // marginRight: '20px',

          //     }} shape="round" >Print</Button>

          // ),
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

      {/* <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint} >Print</Button> */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginTop: '20px' }}>
        <Input
          addonBefore="BMR Number"
          placeholder="BMR Number"

          value={bmr_No}

          disabled
          style={{ width: '100%', height: '35px' }}

        // onChange={(e) => setBmr_No(e.target.value)}
        />
        <Input
          addonBefore="Batch Number"
          placeholder="Batch Number"

          value={batch_No}

          disabled
          style={{ width: '100%', height: '35px' }}

        // onChange={(e) => setBmr_No(e.target.value)}
        />
        <Input
          addonBefore="Bale Number"
          placeholder="Bale Number"

          value={bale_No}

          disabled
          style={{ width: '80%', height: '35px' }}

        // onChange={(e) => setBmr_No(e.target.value)}
        />
      <Input
  addonBefore="Date"
  placeholder="Date"
  type="date"
 required
  max ={ formattedToday }
  value={date}
  disabled={disabled}
  onChange={handleDateChange}
  style={{ width: '100%', height: '35px' }}
/>
        <Input.Group compact>
        <b>Sample Quantity in Kg : </b>
          <div style={{ width: '30%' }}>
            <Select
              value={quantity}
              onChange={handleSelectChange}
              style={{ width: '80%', height: '36x' }}
              disabled={disabled}
            >
              <Select.Option value="0.5">0.5</Select.Option>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="1.5">1.5</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="2.5">2.5</Select.Option>
            </Select>
          </div>
        </Input.Group>

        {/* <Select
          value={batch_No}
          onChange={handleBatchSelectChange}
          style={{ width: '100%', height: '35px' }}
          disabled={disabled}
        >
          <Select.Option value="" disabled selected hidden>
            Select Batch No
          </Select.Option>
          {batchNoOptions.map((option) => (
            <Select.Option key={option.id} value={option.value}>
              {option.description}
            </Select.Option>
          ))}
        </Select> */}
        {/* <Select
          value={bale_No}
          onChange={handleBaleSelectChange}
          style={{ width: '100%', height: '35px' }}
          required
          disabled={disabled}
        >
          <Select.Option value="" disabled selected hidden>
            Select Bale NO
          </Select.Option>
          {baleOptions.map((option) => (
            <Select.Option key={option.id} value={option.value}>
              {option.description}
            </Select.Option>
          ))}
        </Select> */}

      </div>

      <Modal
        title="View Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        // footer={<Button onClick={handlePrint} disabled={!isPrintEnabled}>Print</Button>}
      >
        <div className="modal-content">
          <p>Unit: {modalData && modalData[0].unit}</p>
          <p>Format Name: {selectedRow && selectedRow[0].formatName}</p>
          <p>Format No: {selectedRow && selectedRow[0].formatNo}</p>
          <p>Date: {selectedRow && selectedRow[0].date}</p>
          <p>Revision No:{selectedRow && selectedRow[0].revisionNo}</p>
          <p>RefSop No:{selectedRow && selectedRow[0].refSopNo}</p>
          <p> Bmr No: {selectedRow && selectedRow[0].bmrNo}</p>
          <p>Quantity:{selectedRow && selectedRow[0].quantity}</p>
          <p>Hair : {selectedRow && selectedRow[0].noOfHair}</p>
          <p>Hair Sample: {selectedRow && selectedRow[0].refHair}</p>
          <p>Jute : {selectedRow && selectedRow[0].noOfJute}</p>
          <p>Jute Sample: {selectedRow && selectedRow[0].refJute}</p>
          <p>Color Thread : {selectedRow && selectedRow[0].noOfColourThread}</p>
          <p>Color Thread Sample: {selectedRow && selectedRow[0].refColourThread}</p>
          <p>Wrapper : {selectedRow && selectedRow[0].noOfWrapper}</p>
          <p>Wrapper Sample: {selectedRow && selectedRow[0].refWrapper}</p>
          <p>Metal : {selectedRow && selectedRow[0].noOfMetal}</p>
          <p>Metal Sample: {selectedRow && selectedRow[0].refMetal}</p>
          <p>Rust : {selectedRow && selectedRow[0].noOfRust}</p>
          <p>Rust Sample: {selectedRow && selectedRow[0].refRust}</p>
          <p>Plastic : {selectedRow && selectedRow[0].noOfPlastic}</p>
          <p>Plastic Sample: {selectedRow && selectedRow[0].refPlastic}</p>
          <p>Black cotton : {selectedRow && selectedRow[0].noOfBlackCotton}</p>
          <p>Black cotton Sample: {selectedRow && selectedRow[0].refBlackCotton}</p>
          <p>Oil cotton : {selectedRow && selectedRow[0].noOfOilCotton}</p>
          <p>Oil cotton Sample: {selectedRow && selectedRow[0].refOilCotton}</p>
          <p>Yellow cotton: {selectedRow && selectedRow[0].noOfYellowCotton}</p>
          <p>Yellow cotton Sample: {selectedRow && selectedRow[0].refYellowCotton}</p>
          <p>Soil : {selectedRow && selectedRow[0].noOfSoil}</p>
          <p>Soil Sample: {selectedRow && selectedRow[0].refSoil}</p>
          <p>Paper : {selectedRow && selectedRow[0].noOfPaper}</p>
          <p>Paper Sample: {selectedRow && selectedRow[0].refPaper}</p>
          <p>Stick : {selectedRow && selectedRow[0].noOfStick}</p>
          <p>Stick Sample: {selectedRow && selectedRow[0].refStick}</p>
          <p>Feather : {selectedRow && selectedRow[0].noOfFeather}</p>
          <p>Feather Sample: {selectedRow && selectedRow[0].refFeather}</p>
          <p>Cloth : {selectedRow && selectedRow[0].noOfCloth}</p>
          <p>Cloth Sample: {selectedRow && selectedRow[0].refCloth}</p>
          <p>whitePolyPropylene : {selectedRow && selectedRow[0].noOfwhitePolyPropylene}</p>
          <p>whitePolyPropylene Sample: {selectedRow && selectedRow[0].refWhitePolyPropylene}</p>
          <p>ColourPolyPropylene: {selectedRow && selectedRow[0].noOfColourPolyPropylene}</p>
          <p>ColourPolyPropylene Sample: {selectedRow && selectedRow[0].refColourPolyPropylene}</p>
          <p>RubberPiece : {selectedRow && selectedRow[0].noOfRubberPiece}</p>
          <p>RubberPiece Sample: {selectedRow && selectedRow[0].refRubberPiece}</p>
          <p>Total : {selectedRow && selectedRow[0].total}</p>
          <p>Total Sample: {selectedRow && selectedRow[0].refTotal}</p>
          <p>SupervisorSign : {selectedRow && selectedRow[0].supervisorSign}</p>
          <p>HodSign: {selectedRow && selectedRow[0].hodOrDesigneeSign}</p>
          <p>Status : {selectedRow && selectedRow[0].status}</p>





          {/* Repeat similar structures for other sections */}
        </div>
      </Modal>

      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
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

export default Bleaching_f18
