
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Alert,
  Avatar,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Menu,
  Row,
  Tabs,
  Tooltip,
  message,
  Modal
} from "antd";

// import logo from '../Assests/PreCot-removedbg.png';
import { useEffect, useState } from "react";
import BleachingHeader from "../Components/BleachingHeader";
import { BiLock, BiSave } from "react-icons/bi";
import { BsBack } from "react-icons/bs";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import logo from "../Assests/logo.png"
import { GoArrowLeft } from "react-icons/go";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const Bleaching_f04 = () => {
  //For AB Cotton First Level
  const [contaminationHairbw1, setContaminationHairbw1] = useState("");
  const [contaminationJutebw1, setContaminationJutebw1] = useState("");
  const [contaminationColourThreadbw1, setContaminationColourThreadbw1] =
    useState("");
  const [contaminationWrapperbw1, setContaminationWrapperbw1] = useState("");
  const [contaminationMetalbw1, setContaminationMetalbw1] = useState("");
  const [contaminationRustbw1, setContaminationRustbw1] = useState("");
  const [contaminationPlasticbw1, setContaminationPlasticbw1] = useState("");
  const [contaminationBlackCottonbw1, setContaminationBlackCottonbw1] =
    useState("");
  const [contaminationOilCottonbw1, setContaminationOilCottonbw1] =
    useState("");
  const [contaminationSoilbw1, setContaminationSoilbw1] = useState("");
  const [contaminationYellowCottonbw1, setContaminationYellowCottonbw1] =
    useState("");
  const [contaminationPaperbw1, setContaminationPaperbw1] = useState("");
  const [contaminationStickbw1, setContaminationStickbw1] = useState("");
  const [contaminationFeatherbw1, setContaminationFeatherbw1] = useState("");
  const [contaminationClothbw1, setContaminationClothbw1] = useState("");
  const [
    contaminationWhitePolyPropylenebw1,
    setContaminationWhitePolyPropylenebw1,
  ] = useState("");
  const [
    contaminationColourPolyPropylenebw1,
    setContaminationColourPolyPropylenebw1,
  ] = useState("");
  const [contaminationRubberPiecebw1, setContaminationRubberPiecebw1] =
    useState("");

    const today =new Date();
  const year = today.getFullYear();
   
const month =String(today.getMonth() + 1).padStart(2,'0');
const day = String(today.getDate()).padStart(2, '0');
const formattedToday = `${year}-${month}-${day}`;  
 
const [rejectRemarks, setRejectRemarks] = useState("");

  //For AB Cotton Second Level
  const [contaminationHairbw2, setContaminationHairbw2] = useState("");
  const [contaminationJutebw2, setContaminationJutebw2] = useState("");
  const [contaminationColourThreadbw2, setContaminationColourThreadbw2] =
    useState("");
  const [contaminationWrapperbw2, setContaminationWrapperbw2] = useState("");
  const [contaminationMetalbw2, setContaminationMetalbw2] = useState("");
  const [contaminationRustbw2, setContaminationRustbw2] = useState("");
  const [contaminationPlasticbw2, setContaminationPlasticbw2] = useState("");
  const [contaminationBlackCottonbw2, setContaminationBlackCottonbw2] =
    useState("");
  const [contaminationOilCottonbw2, setContaminationOilCottonbw2] =
    useState("");
  const [contaminationSoilbw2, setContaminationSoilbw2] = useState("");
  const [contaminationYellowCottonbw2, setContaminationYellowCottonbw2] =
    useState("");
  const [contaminationPaperbw2, setContaminationPaperbw2] = useState("");
  const [contaminationStickbw2, setContaminationStickbw2] = useState("");
  const [contaminationFeatherbw2, setContaminationFeatherbw2] = useState("");
  const [contaminationClothbw2, setContaminationClothbw2] = useState("");
  const [
    contaminationWhitePolyPropylenebw2,
    setContaminationWhitePolyPropylenebw2,
  ] = useState("");
  const [
    contaminationColourPolyPropylenebw2,
    setContaminationColourPolyPropylenebw2,
  ] = useState("");
  const [contaminationRubberPiecebw2, setContaminationRubberPiecebw2] =
    useState("");

  //for Raw Cotton  First Level
  const [contaminationccpAHair, setContaminationccpAHair] = useState("");
  const [contaminationccpAJute, setContaminationccpAJute] = useState("");
  const [contaminationccpAColourThread, setContaminationccpAColourThread] =
    useState("");
  const [contaminationccpAWrapper, setContaminationccpAWrapper] = useState("");
  const [contaminationccpAMetal, setContaminationccpAMetal] = useState("");
  const [contaminationccpARust, setContaminationccpARust] = useState("");
  const [contaminationccpAPlastic, setContaminationccpAPlastic] = useState("");
  const [contaminationccpABlackCotton, setContaminationccpABlackCotton] =
    useState("");
  const [contaminationccpAOilCotton, setContaminationccpAOilCotton] =
    useState("");
  const [contaminationccpASoil, setContaminationccpASoil] = useState("");
  const [contaminationccpAYellowCotton, setContaminationccpAYellowCotton] =
    useState("");
  const [contaminationccpAPaper, setContaminationccpAPaper] = useState("");
  const [contaminationccpAStick, setContaminationccpAStick] = useState("");
  const [contaminationccpAFeather, setContaminationccpAFeather] = useState("");
  const [contaminationccpACloth, setContaminationccpACloth] = useState("");
  const [
    contaminationccpAWhitePolyPropylene,
    setContaminationccpAWhitePolyPropylene,
  ] = useState("");
  const [
    contaminationccpAColourPolyPropylene,
    setContaminationccpAColourPolyPropylene,
  ] = useState("");
  const [contaminationccpARubberPiece, setContaminationccpARubberPiece] =
    useState("");

    const role=localStorage.getItem("role")

  //for Raw Cotton Second Level
  const [contaminationccpBHair, setContaminationccpBHair] = useState("");
  const [contaminationccpBJute, setContaminationccpBJute] = useState("");
  const [contaminationccpBColourThread, setContaminationccpBColourThread] =
    useState("");
  const [contaminationccpBWrapper, setContaminationccpBWrapper] = useState("");
  const [contaminationccpBMetal, setContaminationccpBMetal] = useState("");
  const [contaminationccpBRust, setContaminationccpBRust] = useState("");
  const [contaminationccpBPlastic, setContaminationccpBPlastic] = useState("");
  const [contaminationccpBBlackCotton, setContaminationccpBBlackCotton] =
    useState("");
  const [contaminationccpBOilCotton, setContaminationccpBOilCotton] =
    useState("");
  const [contaminationccpBSoil, setContaminationccpBSoil] = useState("");
  const [contaminationccpBYellowCotton, setContaminationccpBYellowCotton] =
    useState("");
  const [contaminationccpBPaper, setContaminationccpBPaper] = useState("");
  const [contaminationccpBStick, setContaminationccpBStick] = useState("");
  const [contaminationccpBFeather, setContaminationccpBFeather] = useState("");
  const [contaminationccpBCloth, setContaminationccpBCloth] = useState("");

  const [
    contaminationccpBWhitePolyPropylene,
    setContaminationccpBWhitePolyPropylene,
  ] = useState("");
  const [
    contaminationccpBColourPolyPropylene,
    setContaminationccpBColourPolyPropylene,
  ] = useState("");
  const [contaminationccpBRubberPiece, setContaminationccpBRubberPiece] =
    useState("");

  const [abSignatureIncharge, setabSignatureIncharge] = useState("");
  const [abDateIncharge, setabDateIncharge] = useState("");
  const [abSignatureHOD, setabSignatureHOD] = useState("");
  const [abDateHOD, setabDateHOD] = useState("");

  const [rawSignatureIncharge, setrawSignatureIncharge] = useState("");
  const [rawDateIncharge, setrawDateIncharge] = useState("");
  const [rawSignatureHOD, setrawSignatureHOD] = useState("");
  const [rawDateHOD, setrawDateHOD] = useState(null);
  const [formatNo, setFormatNo] = useState("");
  const [token, setToken] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [overallRawId, setOverallRawID] = useState("");
  const [raw_id_1, set_raw_id_1] = useState("");
  const [raw_id_2, set_raw_id_2] = useState("");
  const [raw_id_3, set_raw_id_3] = useState("");
  const [raw_id_4, set_raw_id_4] = useState("");
  const [raw_id_5, set_raw_id_5] = useState("");
  const [raw_id_6, set_raw_id_6] = useState("");
  const [raw_id_7, set_raw_id_7] = useState("");
  const [raw_id_8, set_raw_id_8] = useState("");
  const [raw_id_9, set_raw_id_9] = useState("");
  const [raw_id_10, set_raw_id_10] = useState("");
  const [raw_id_11, set_raw_id_11] = useState("");
  const [raw_id_12, set_raw_id_12] = useState("");
  const [raw_id_13, set_raw_id_13] = useState("");
  const [raw_id_14, set_raw_id_14] = useState("");
  const [raw_id_15, set_raw_id_15] = useState("");
  const [raw_id_16, set_raw_id_16] = useState("");
  const [raw_id_17, set_raw_id_17] = useState("");
  const [raw_id_18, set_raw_id_18] = useState("");

  //id
  const [id_1, set_id_1] = useState("");
  const [id_2, set_id_2] = useState("");
  const [id_3, set_id_3] = useState("");
  const [id_4, set_id_4] = useState("");
  const [id_5, set_id_5] = useState("");
  const [id_6, set_id_6] = useState("");
  const [id_7, set_id_7] = useState("");
  const [id_8, set_id_8] = useState("");
  const [id_9, set_id_9] = useState("");
  const [id_10, set_id_10] = useState("");
  const [id_11, set_id_11] = useState("");
  const [id_12, set_id_12] = useState("");
  const [id_13, set_id_13] = useState("");
  const [id_14, set_id_14] = useState("");
  const [id_15, set_id_15] = useState("");
  const [id_16, set_id_16] = useState("");
  const [id_17, set_id_17] = useState("");
  const [id_18, set_id_18] = useState("");

  const [HOD_Status, setHOD_Status] = useState("");
  const [Supervisor_Status, setSupervisor_Status] = useState("");

  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [printBtnStatus, setPrintBtnStatus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate("");

  const [reportName, setReportName] = useState("APPLIED_CONTAMINATION_REPORT");
  const [mailStatus, setMailStatus] = useState("");
  const [supervisorStatus, setSupervisorStatus] = useState("");
  const [supervisorSavedOn, setSupervisorSavedOn] = useState("");
  const [supervisorSavedBy, setSupervisorSavedBy] = useState("");
  const [supervisorSavedId, setSupervisorSavedId] = useState("");
  const [supervisorSubmitOn, setSupervisorSubmitOn] = useState("");
  const [supervisorSubmitBy, setSupervisorSubmitBy] = useState("");
  const [supervisorSubmitId, setSupervisorSubmitId] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");
  const [hodStatus, setHodStatus] = useState("");
  const [hodSavedOn, setHodSavedOn] = useState("");
  const [hodSavedBy, setHodSavedBy] = useState("");
  const [hodSavedId, setHodSavedId] = useState("");
  const [hodSubmitOn, setHodSubmitOn] = useState("");
  const [hodSubmitBy, setHodSubmitBy] = useState("");
  const [hodSubmitId, setHodSubmitId] = useState("");
  const [newSave, setNewSave] = useState(false);
  const [hodSign, setHodSign] = useState("");
  const [disable, setDisable] = useState(false);
  const [contamination1,setContamination1] = useState("")
  const [contamination2,setContamination2] = useState("")
  const [contamination3,setContamination3] = useState("")
  const [contamination4,setContamination4] = useState("");
  const [saveLoading, setSaveLoading]= useState(false);
  const[selectedRow,setSelectedRow]= useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const { state } = useLocation();

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-04/Summary");
  };


  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = supervisorSign;
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
  }, [supervisorSign, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hodSign;
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
  }, [hodSign, API.prodUrl, token]);

  useEffect(() => {
    // console.log("routeState", state);
    // setInitialDate(new Date().toISOString().substring(0, 10));
    setInitialDate(new Date(state.date).toISOString().substring(0, 10));
    setFormatNo(state.bmrno);
    setToken(localStorage.getItem("token"));
    // console.log("Roles", localStorage.getItem("role"));
    switch (localStorage.getItem("role")) {
      case "ROLE_HOD" :
      case "ROLE_DESIGNEE":
        // console.log("HOD Logged In");
       
        setrawSignatureHOD(localStorage.getItem("username"));
        break;
      case "ROLE_SUPERVISOR":
        // console.log("Supervisor Logged In");
        
        setrawSignatureIncharge(localStorage.getItem("username"));
        break;
      default:
        break;
    }
    // console.log("formatdate", new Date().toISOString().substring(0, 10));
    setabDateIncharge(new Date().toISOString().substring(0, 10));
    setrawDateHOD(new Date().toISOString().substring(0, 10));
    setrawDateIncharge(new Date().toISOString().substring(0, 10));
    setabDateHOD(new Date().toISOString().substring(0, 10));
    // setInitialDate(new Date().toISOString().substring(0, 10));
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(
        `${ API.prodUrl}/Precot/api/bleaching/Service/getAppliedRawCottonByBmrNumberF04?bmrNumber=${state.bmrno}`,
        { headers }
      )
      .then((res) => {
        // console.log("Data-Backend", res.data);
       
        // console.log("len", res.data.length);

        setSelectedRow(res.data[0]);

        setOverallRawID(res.data[0].raw_id);
        setMailStatus(res.data[0].mail_status);
        setSupervisorStatus(res.data[0].supervisor_status);
        setSupervisorSavedOn(res.data[0].supervisor_saved_on);
        setSupervisorSavedBy(res.data[0].supervisor_saved_by);
        setSupervisorSavedId(res.data[0].supervisor_saved_id);
        setSupervisorSubmitOn(res.data[0].supervisor_submit_on);
        setSupervisorSubmitBy(res.data[0].supervisor_submit_by);
        setSupervisorSubmitId(res.data[0].supervisor_submit_id);
        setSupervisorSign(res.data[0].supervisor_sign);
        //////////////////////////////
        setHodStatus(res.data[0].hod_status);
        setHodSavedOn(res.data[0].hod_saved_on);
        setHodSavedBy(res.data[0].hod_saved_by);
        setHodSavedId(res.data[0].hod_saved_id);
        setHodSubmitOn(res.data[0].hod_submit_on);
        setHodSubmitBy(res.data[0].hod_submit_by);
        setHodSubmitId(res.data[0].hod_submit_id);
        setHodSign(res.data[0].hod_sign);

        

        setContamination1(res.data[0].total_0ne ? res.data[0].total_0ne : '0');
        setContamination2(res.data[0].total_two ? res.data[0].total_two : '0');
        setContamination3(res.data[0].total_three ? res.data[0].total_three : '0');
        setContamination4(res.data[0].total_four ? res.data[0].total_four : '0');

        setrawSignatureHOD(res.data[0].hod_sign);
        setrawSignatureIncharge(res.data[0].supervisor_sign);
        setabSignatureHOD(res.data[0].hod_sign);
        setabSignatureIncharge(res.data[0].supervisor_sign);

        //details

        setContaminationHairbw1(
          res.data[0].detailsRawCottonF04[0].bw1Contamination
        );
        setContaminationHairbw2(
          res.data[0].detailsRawCottonF04[0].bw2Contamination
        );
        setContaminationccpAHair(
          res.data[0].detailsRawCottonF04[0].bw3Contamination
        );
        setContaminationccpBHair(
          res.data[0].detailsRawCottonF04[0].bw4Contamination
        );

        setContaminationJutebw1(
          res.data[0].detailsRawCottonF04[1].bw1Contamination
        );
        setContaminationJutebw2(
          res.data[0].detailsRawCottonF04[1].bw2Contamination
        );
        setContaminationccpAJute(
          res.data[0].detailsRawCottonF04[1].bw3Contamination
        );
        setContaminationccpBJute(
          res.data[0].detailsRawCottonF04[1].bw4Contamination
        );

        setContaminationColourThreadbw1(
          res.data[0].detailsRawCottonF04[2].bw1Contamination
        );
        setContaminationColourThreadbw2(
          res.data[0].detailsRawCottonF04[2].bw2Contamination
        );
        setContaminationccpAColourThread(
          res.data[0].detailsRawCottonF04[2].bw3Contamination
        );
        setContaminationccpBColourThread(
          res.data[0].detailsRawCottonF04[2].bw4Contamination
        );

        setContaminationWrapperbw1(
          res.data[0].detailsRawCottonF04[3].bw1Contamination
        );
        setContaminationWrapperbw2(
          res.data[0].detailsRawCottonF04[3].bw2Contamination
        );
        setContaminationccpAWrapper(
          res.data[0].detailsRawCottonF04[3].bw3Contamination
        );
        setContaminationccpBWrapper(
          res.data[0].detailsRawCottonF04[3].bw4Contamination
        );

        setContaminationMetalbw1(
          res.data[0].detailsRawCottonF04[4].bw1Contamination
        );
        setContaminationMetalbw2(
          res.data[0].detailsRawCottonF04[4].bw2Contamination
        );
        setContaminationccpAMetal(
          res.data[0].detailsRawCottonF04[4].bw3Contamination
        );
        setContaminationccpBMetal(
          res.data[0].detailsRawCottonF04[4].bw4Contamination
        );

        setContaminationRustbw1(
          res.data[0].detailsRawCottonF04[5].bw1Contamination
        );
        setContaminationRustbw2(
          res.data[0].detailsRawCottonF04[5].bw2Contamination
        );
        setContaminationccpARust(
          res.data[0].detailsRawCottonF04[5].bw3Contamination
        );
        setContaminationccpBRust(
          res.data[0].detailsRawCottonF04[5].bw4Contamination
        );

        setContaminationPlasticbw1(
          res.data[0].detailsRawCottonF04[6].bw1Contamination
        );
        setContaminationPlasticbw2(
          res.data[0].detailsRawCottonF04[6].bw2Contamination
        );
        setContaminationccpAPlastic(
          res.data[0].detailsRawCottonF04[6].bw3Contamination
        );
        setContaminationccpBPlastic(
          res.data[0].detailsRawCottonF04[6].bw4Contamination
        );

        setContaminationBlackCottonbw1(
          res.data[0].detailsRawCottonF04[7].bw1Contamination
        );
        setContaminationBlackCottonbw2(
          res.data[0].detailsRawCottonF04[7].bw2Contamination
        );
        setContaminationccpABlackCotton(
          res.data[0].detailsRawCottonF04[7].bw3Contamination
        );
        setContaminationccpBBlackCotton(
          res.data[0].detailsRawCottonF04[7].bw4Contamination
        );

        setContaminationOilCottonbw1(
          res.data[0].detailsRawCottonF04[8].bw1Contamination
        );
        setContaminationOilCottonbw2(
          res.data[0].detailsRawCottonF04[8].bw2Contamination
        );
        setContaminationccpAOilCotton(
          res.data[0].detailsRawCottonF04[8].bw3Contamination
        );
        setContaminationccpBOilCotton(
          res.data[0].detailsRawCottonF04[8].bw4Contamination
        );

        setContaminationSoilbw1(
          res.data[0].detailsRawCottonF04[9].bw1Contamination
        );
        setContaminationSoilbw2(
          res.data[0].detailsRawCottonF04[9].bw2Contamination
        );
        setContaminationccpASoil(
          res.data[0].detailsRawCottonF04[9].bw3Contamination
        );
        setContaminationccpBSoil(
          res.data[0].detailsRawCottonF04[9].bw4Contamination
        );

        setContaminationYellowCottonbw1(
          res.data[0].detailsRawCottonF04[10].bw1Contamination
        );
        setContaminationYellowCottonbw2(
          res.data[0].detailsRawCottonF04[10].bw2Contamination
        );
        setContaminationccpAYellowCotton(
          res.data[0].detailsRawCottonF04[10].bw3Contamination
        );
        setContaminationccpBYellowCotton(
          res.data[0].detailsRawCottonF04[10].bw4Contamination
        );

        setContaminationPaperbw1(
          res.data[0].detailsRawCottonF04[11].bw1Contamination
        );
        setContaminationPaperbw2(
          res.data[0].detailsRawCottonF04[11].bw2Contamination
        );
        setContaminationccpAPaper(
          res.data[0].detailsRawCottonF04[11].bw3Contamination
        );
        setContaminationccpBPaper(
          res.data[0].detailsRawCottonF04[11].bw4Contamination
        );

        setContaminationStickbw1(
          res.data[0].detailsRawCottonF04[12].bw1Contamination
        );
        setContaminationStickbw2(
          res.data[0].detailsRawCottonF04[12].bw2Contamination
        );
        setContaminationccpAStick(
          res.data[0].detailsRawCottonF04[12].bw3Contamination
        );
        setContaminationccpBStick(
          res.data[0].detailsRawCottonF04[12].bw4Contamination
        );

        setContaminationFeatherbw1(
          res.data[0].detailsRawCottonF04[13].bw1Contamination
        );
        setContaminationFeatherbw2(
          res.data[0].detailsRawCottonF04[13].bw2Contamination
        );
        setContaminationccpAFeather(
          res.data[0].detailsRawCottonF04[13].bw3Contamination
        );
        setContaminationccpBFeather(
          res.data[0].detailsRawCottonF04[13].bw4Contamination
        );

        setContaminationClothbw1(
          res.data[0].detailsRawCottonF04[14].bw1Contamination
        );
        setContaminationClothbw2(
          res.data[0].detailsRawCottonF04[14].bw2Contamination
        );
        setContaminationccpACloth(
          res.data[0].detailsRawCottonF04[14].bw3Contamination
        );
        setContaminationccpBCloth(
          res.data[0].detailsRawCottonF04[14].bw4Contamination
        );

        setContaminationWhitePolyPropylenebw1(
          res.data[0].detailsRawCottonF04[15].bw1Contamination
        );
        setContaminationWhitePolyPropylenebw2(
          res.data[0].detailsRawCottonF04[15].bw2Contamination
        );
        setContaminationccpAWhitePolyPropylene(
          res.data[0].detailsRawCottonF04[15].bw3Contamination
        );
        setContaminationccpBWhitePolyPropylene(
          res.data[0].detailsRawCottonF04[15].bw4Contamination
        );

        setContaminationColourPolyPropylenebw1(
          res.data[0].detailsRawCottonF04[16].bw1Contamination
        );
        setContaminationColourPolyPropylenebw2(
          res.data[0].detailsRawCottonF04[16].bw2Contamination
        );
        setContaminationccpAColourPolyPropylene(
          res.data[0].detailsRawCottonF04[16].bw3Contamination
        );
        setContaminationccpBColourPolyPropylene(
          res.data[0].detailsRawCottonF04[16].bw4Contamination
        );

        setContaminationRubberPiecebw1(
          res.data[0].detailsRawCottonF04[17].bw1Contamination
        );
        setContaminationRubberPiecebw2(
          res.data[0].detailsRawCottonF04[17].bw2Contamination
        );
        setContaminationccpARubberPiece(
          res.data[0].detailsRawCottonF04[17].bw3Contamination
        );
        setContaminationccpBRubberPiece(
          res.data[0].detailsRawCottonF04[17].bw4Contamination
        );

        set_raw_id_1(res.data[0].detailsRawCottonF04[0].raw_id);
        set_id_1(res.data[0].detailsRawCottonF04[0].id);
        set_raw_id_2(res.data[0].detailsRawCottonF04[1].raw_id);
        set_id_2(res.data[0].detailsRawCottonF04[1].id);
        set_raw_id_3(res.data[0].detailsRawCottonF04[2].raw_id);
        set_id_3(res.data[0].detailsRawCottonF04[2].id);
        set_raw_id_4(res.data[0].detailsRawCottonF04[3].raw_id);
        set_id_4(res.data[0].detailsRawCottonF04[3].id);
        set_raw_id_5(res.data[0].detailsRawCottonF04[4].raw_id);
        set_id_5(res.data[0].detailsRawCottonF04[4].id);
        set_raw_id_6(res.data[0].detailsRawCottonF04[5].raw_id);
        set_id_6(res.data[0].detailsRawCottonF04[5].id);
        set_raw_id_7(res.data[0].detailsRawCottonF04[6].raw_id);
        set_id_7(res.data[0].detailsRawCottonF04[6].id);
        set_raw_id_8(res.data[0].detailsRawCottonF04[7].raw_id);
        set_id_8(res.data[0].detailsRawCottonF04[7].id);
        set_raw_id_9(res.data[0].detailsRawCottonF04[8].raw_id);
        set_id_9(res.data[0].detailsRawCottonF04[8].id);
        set_raw_id_10(res.data[0].detailsRawCottonF04[9].raw_id);
        set_id_10(res.data[0].detailsRawCottonF04[9].id);
        set_raw_id_11(res.data[0].detailsRawCottonF04[10].raw_id);
        set_id_11(res.data[0].detailsRawCottonF04[10].id);
        set_raw_id_12(res.data[0].detailsRawCottonF04[11].raw_id);
        set_id_12(res.data[0].detailsRawCottonF04[11].id);
        set_raw_id_13(res.data[0].detailsRawCottonF04[12].raw_id);
        set_id_13(res.data[0].detailsRawCottonF04[12].id);
        set_raw_id_14(res.data[0].detailsRawCottonF04[13].raw_id);
        set_id_14(res.data[0].detailsRawCottonF04[13].id);
        set_raw_id_15(res.data[0].detailsRawCottonF04[14].raw_id);
        set_id_15(res.data[0].detailsRawCottonF04[14].id);
        set_raw_id_16(res.data[0].detailsRawCottonF04[15].raw_id);
        set_id_16(res.data[0].detailsRawCottonF04[15].id);
        set_raw_id_17(res.data[0].detailsRawCottonF04[16].raw_id);
        set_id_17(res.data[0].detailsRawCottonF04[16].id);
        set_raw_id_18(res.data[0].detailsRawCottonF04[17].raw_id);
        set_id_18(res.data[0].detailsRawCottonF04[17].id);
        //Buttons logic going on here
        
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  }, []);
  let dummyData;
  if (reportName === "CONTAMINATION_CHEKING_REPORT") {
    dummyData = {
      formName: "CONTAMINATION CHEKING REPORT",
      format: "PRD01/F-05",
      fifthHeader: "Quantity in Kgs",
      sixthHeader: "PH#",
      sixthValue: [{ pageCount: "" }, { pageCount: "" }],
    };
  } else {
    dummyData = {
      formName: "APPLIED CONTAMINATION REPORT",
      format: "PRD01/F-04",
      fifthHeader: "Lay down#",
      sixthHeader: "Pages",
      sixthValue: [{ pageCount: "1 of 2" }, { pageCount: "2 of 2" }],
    };
  }

  function onChange(value) {
    setReportName(value);
    // console.log(reportName);
  }

  const onChange2 = (key) => {
    // console.log(key);
  };
  const roleBase=localStorage.getItem("role")
//   const canDisplayButtons = () => {
//     if (roleBase == "ROLE_SUPERVISOR") {
//         if (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED") {
//             return "none";
//         }
//         return "block";
//     }else if (roleBase == "ROLE_DESIGNEE") {
//       if (selectedRow?.hod_status == "HOD_APPROVED" ) {
//           return "none";
//       }
//       return "block";
//   }
//     else if (roleBase == "ROLE_HOD") {
//         if (selectedRow?.hod_status == "HOD_APPROVED" ) {
//             return "none";
//         }
//         return "block";
//     }
 
// }

const handleApprove = async () => {
  setSaveLoading(true);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Adjust content type if needed
  };

  const res = await axios
    .put(
      `${ API.prodUrl}/Precot/api/bleaching/Service/approveOrRejectF04`,
      {
        id: overallRawId,
        status: "Approve",
      },
      { headers }
    )
    .then((res) => {
      setLoading(false);
      // console.log("messsage", res);
      // window.location.reload();
      message.success(res.data.message);
      navigate("/Precot/Bleaching/F-04/Summary");
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
      `${ API.prodUrl}/Precot/api/bleaching/Service/approveOrRejectF04`,
      {
        id: overallRawId,
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
      navigate("/Precot/Bleaching/F-04/Summary");
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


const canDisplayButtons = () => {
  if (roleBase == "ROLE_SUPERVISOR") {
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
  } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
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

const canDisplayButton2 = () => {
  if (roleBase == "ROLE_SUPERVISOR") {
    if (
      selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
      selectedRow?.hod_status == "HOD_REJECTED"
    ) {
      return "none"; // Disable button 2
    } else if (
      selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
      (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
        selectedRow?.hod_status == "HOD_APPROVED")
    ) {
      return "none"; // Enable button 2
    }
  } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
    if (
      selectedRow?.hod_status == "HOD_APPROVED" ||
      selectedRow?.hod_status == "HOD_REJECTED" 
      // emptyarraycheck == 0
    ) {
      return "none"; // Disable button 2
    }
    return "block"; // Enable button 2
  } else {
    if (
      selectedRow?.hod_status == "HOD_APPROVED" ||
      selectedRow?.hod_status == "HOD_REJECTED"
    ) {
      return "none"; // Disable button 2
    }
    return "block"; // Enable button 2
  }
};

const formattedhodDate = hodSubmitOn ? new Date(hodSubmitOn).toLocaleDateString(
  'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    
}
  ) :
  ''
  ;

  const formattedsupervisorDate = supervisorSubmitOn ? new Date(supervisorSubmitOn).toLocaleDateString(
    'en-GB',{
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    
  }
    ) :
    ''
    ;
   
    // const currentDate = new Date().toISOString().slice(8, 10) + '-' + new Date().toISOString().slice(5, 7) + '-' + new Date().toISOString().slice(0, 4)

    const currentDate = new Date().toISOString().slice(8, 10) + '/' + new Date().toISOString().slice(5, 7) + '/' + new Date().toISOString().slice(0, 4);


const isPrintEnabled =
selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
selectedRow?.hod_status === "HOD_APPROVED";
  const saveData = () => {
    setSaveLoading(true);
    // console.log("Date1", token);

    if (newSave == true) {
      const payload = {
        unit: "Unit H",
        formatNo: "PRD01/F-04",
        formatName: null,
        sopNumber: "PRD01-D-09",
        revisionNo: "02",
        bmrNumber: state.bmrno,
        date: state.date,
        status: "DRAFT",
        raw_id: overallRawId,
        mail_status: mailStatus,
        supervisor_status: supervisorStatus,
        supervisor_saved_on: supervisorSavedOn,
        supervisor_saved_by: supervisorSavedBy,
        supervisor_saved_id: supervisorSavedId,
        supervisor_submit_on: supervisorSubmitOn,
        supervisor_submit_by: supervisorSubmitBy,
        supervisor_submit_id: supervisorSubmitId,
        supervisor_sign: supervisorSign,
        hod_status: hodStatus,
        hod_saved_on: hodSavedOn,
        hod_saved_by: hodSavedBy,
        hod_saved_id: hodSavedId,
        hod_submit_on: hodSubmitOn,
        hod_submit_by: hodSubmitBy,
        hod_submit_id: hodSubmitId,
        hod_sign: hodSign,
        total_0ne:contamination1,
        total_two:contamination2,
        total_three: contamination3,
        total_four:contamination4,
        detailsRawCottonF04: [
          {
            type: "Hair",
            bw1Contamination: contaminationHairbw1,
            bw2Contamination: contaminationHairbw2,
            bw3Contamination: contaminationccpAHair,
            bw4Contamination: contaminationccpBHair,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Jute",
            bw1Contamination: contaminationJutebw1,
            bw2Contamination: contaminationJutebw2,
            bw3Contamination: contaminationccpAJute,
            bw4Contamination: contaminationccpBJute,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Colour Thread",
            bw1Contamination: contaminationColourThreadbw1,
            bw2Contamination: contaminationColourThreadbw2,
            bw3Contamination: contaminationccpAColourThread,
            bw4Contamination: contaminationccpBColourThread,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Wrapper",
            bw1Contamination: contaminationWrapperbw1,
            bw2Contamination: contaminationWrapperbw2,
            bw3Contamination: contaminationccpAWrapper,
            bw4Contamination: contaminationccpBWrapper,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Metal",
            bw1Contamination: contaminationMetalbw1,
            bw2Contamination: contaminationMetalbw2,
            bw3Contamination: contaminationccpAMetal,
            bw4Contamination: contaminationccpBMetal,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Rust",
            bw1Contamination: contaminationRustbw1,
            bw2Contamination: contaminationRustbw2,
            bw3Contamination: contaminationccpARust,
            bw4Contamination: contaminationccpBRust,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Plastic",
            bw1Contamination: contaminationPlasticbw1,
            bw2Contamination: contaminationPlasticbw2,
            bw3Contamination: contaminationccpAPlastic,
            bw4Contamination: contaminationccpBPlastic,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Black Cotton",
            bw1Contamination: contaminationBlackCottonbw1,
            bw2Contamination: contaminationBlackCottonbw2,
            bw3Contamination: contaminationccpABlackCotton,
            bw4Contamination: contaminationccpBBlackCotton,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Oil Cotton",
            bw1Contamination: contaminationOilCottonbw1,
            bw2Contamination: contaminationOilCottonbw2,
            bw3Contamination: contaminationccpAOilCotton,
            bw4Contamination: contaminationccpBOilCotton,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Soil",
            bw1Contamination: contaminationSoilbw1,
            bw2Contamination: contaminationSoilbw2,
            bw3Contamination: contaminationccpASoil,
            bw4Contamination: contaminationccpBSoil,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Yelow Cotton",
            bw1Contamination: contaminationYellowCottonbw1,
            bw2Contamination: contaminationYellowCottonbw2,
            bw3Contamination: contaminationccpAYellowCotton,
            bw4Contamination: contaminationccpBYellowCotton,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Paper",
            bw1Contamination: contaminationPaperbw1,
            bw2Contamination: contaminationPaperbw2,
            bw3Contamination: contaminationccpAPaper,
            bw4Contamination: contaminationccpBPaper,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Stick",
            bw1Contamination: contaminationStickbw1,
            bw2Contamination: contaminationStickbw2,
            bw3Contamination: contaminationccpAStick,
            bw4Contamination: contaminationccpBStick,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Feather",
            bw1Contamination: contaminationFeatherbw1,
            bw2Contamination: contaminationFeatherbw2,
            bw3Contamination: contaminationccpAFeather,
            bw4Contamination: contaminationccpBFeather,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Cloth",
            bw1Contamination: contaminationClothbw1,
            bw2Contamination: contaminationClothbw2,
            bw3Contamination: contaminationccpACloth,
            bw4Contamination: contaminationccpBCloth,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "White Poly Propylene",
            bw1Contamination: contaminationWhitePolyPropylenebw1,
            bw2Contamination: contaminationWhitePolyPropylenebw2,
            bw3Contamination: contaminationccpAWhitePolyPropylene,
            bw4Contamination: contaminationccpBWhitePolyPropylene,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Colour Poly Propylene",
            bw1Contamination: contaminationColourPolyPropylenebw1,
            bw2Contamination: contaminationColourPolyPropylenebw2,
            bw3Contamination: contaminationccpAColourPolyPropylene,
            bw4Contamination: contaminationccpBColourPolyPropylene,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
          {
            type: "Rubber piece",
            bw1Contamination: contaminationRubberPiecebw1,
            bw2Contamination: contaminationRubberPiecebw2,
            bw3Contamination: contaminationccpARubberPiece,
            bw4Contamination: contaminationccpBRubberPiece,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
          },
        ],
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      axios
        .post(
          `${ API.prodUrl}/Precot/api/bleaching/Service/saveAppliedRawCottonF04`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
          message.success("Form Saved Successfully");
          navigate('/Precot/Bleaching/F-04/Summary');
          
        })
        .catch((err) => {
          // console.log("Error", err);
          message.error(err.response.data.message);
        })
        .finally(()=>{
          setSaveLoading(false);
        })
        ;
    } else {
      const payload = {
        unit: "Unit H",
        formatNo: "PRD01/F04",
        formatName: null,
        sopNumber: "PRD01-D-09",
        revisionNo: "02",
        bmrNumber: state.bmrno,
        date: state.date,
        mail_status: mailStatus,
        supervisor_status: supervisorStatus,
        supervisor_saved_on: supervisorSavedOn,
        supervisor_saved_by: supervisorSavedBy,
        supervisor_saved_id: supervisorSavedId,
        supervisor_submit_on: supervisorSubmitOn,
        supervisor_submit_by: supervisorSubmitBy,
        supervisor_submit_id: supervisorSubmitId,
        supervisor_sign: supervisorSign,
        hod_status: hodStatus,
        hod_saved_on: hodSavedOn,
        hod_saved_by: hodSavedBy,
        hod_saved_id: hodSavedId,
        hod_submit_on: hodSubmitOn,
        hod_submit_by: hodSubmitBy,
        hod_submit_id: hodSubmitId,
        hod_sign: hodSign,
        raw_id: overallRawId,
        total_0ne:contamination1,
        total_two:contamination2,
        total_three: contamination3,
        total_four:contamination4,
        detailsRawCottonF04: [
          {
            type: "Hair",
            bw1Contamination: contaminationHairbw1,
            bw2Contamination: contaminationHairbw2,
            bw3Contamination: contaminationccpAHair,
            bw4Contamination: contaminationccpBHair,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_1,
          },
          {
            type: "Jute",
            bw1Contamination: contaminationJutebw1,
            bw2Contamination: contaminationJutebw2,
            bw3Contamination: contaminationccpAJute,
            bw4Contamination: contaminationccpBJute,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_2,
          },
          {
            type: "Colour Thread",
            bw1Contamination: contaminationColourThreadbw1,
            bw2Contamination: contaminationColourThreadbw2,
            bw3Contamination: contaminationccpAColourThread,
            bw4Contamination: contaminationccpBColourThread,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_3,
          },
          {
            type: "Wrapper",
            bw1Contamination: contaminationWrapperbw1,
            bw2Contamination: contaminationWrapperbw2,
            bw3Contamination: contaminationccpAWrapper,
            bw4Contamination: contaminationccpBWrapper,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_4,
          },
          {
            type: "Metal",
            bw1Contamination: contaminationMetalbw1,
            bw2Contamination: contaminationMetalbw2,
            bw3Contamination: contaminationccpAMetal,
            bw4Contamination: contaminationccpBMetal,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_5,
          },
          {
            type: "Rust",
            bw1Contamination: contaminationRustbw1,
            bw2Contamination: contaminationRustbw2,
            bw3Contamination: contaminationccpARust,
            bw4Contamination: contaminationccpBRust,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_6,
          },
          {
            type: "Plastic",
            bw1Contamination: contaminationPlasticbw1,
            bw2Contamination: contaminationPlasticbw2,
            bw3Contamination: contaminationccpAPlastic,
            bw4Contamination: contaminationccpBPlastic,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_7,
          },
          {
            type: "Black Cotton",
            bw1Contamination: contaminationBlackCottonbw1,
            bw2Contamination: contaminationBlackCottonbw2,
            bw3Contamination: contaminationccpABlackCotton,
            bw4Contamination: contaminationccpBBlackCotton,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_8,
          },
          {
            type: "Oil Cotton",
            bw1Contamination: contaminationOilCottonbw1,
            bw2Contamination: contaminationOilCottonbw2,
            bw3Contamination: contaminationccpAOilCotton,
            bw4Contamination: contaminationccpBOilCotton,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_9,
          },
          {
            type: "Soil",
            bw1Contamination: contaminationSoilbw1,
            bw2Contamination: contaminationSoilbw2,
            bw3Contamination: contaminationccpASoil,
            bw4Contamination: contaminationccpBSoil,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_10,
          },
          {
            type: "Yelow Cotton",
            bw1Contamination: contaminationYellowCottonbw1,
            bw2Contamination: contaminationYellowCottonbw2,
            bw3Contamination: contaminationccpAYellowCotton,
            bw4Contamination: contaminationccpBYellowCotton,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_11,
          },
          {
            type: "Paper",
            bw1Contamination: contaminationPaperbw1,
            bw2Contamination: contaminationPaperbw2,
            bw3Contamination: contaminationccpAPaper,
            bw4Contamination: contaminationccpBPaper,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_12,
          },
          {
            type: "Stick",
            bw1Contamination: contaminationStickbw1,
            bw2Contamination: contaminationStickbw2,
            bw3Contamination: contaminationccpAStick,
            bw4Contamination: contaminationccpBStick,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_13,
          },
          {
            type: "Feather",
            bw1Contamination: contaminationFeatherbw1,
            bw2Contamination: contaminationFeatherbw2,
            bw3Contamination: contaminationccpAFeather,
            bw4Contamination: contaminationccpBFeather,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_14,
          },
          {
            type: "Cloth",
            bw1Contamination: contaminationClothbw1,
            bw2Contamination: contaminationClothbw2,
            bw3Contamination: contaminationccpACloth,
            bw4Contamination: contaminationccpBCloth,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_15,
          },
          {
            type: "White Poly Propylene",
            bw1Contamination: contaminationWhitePolyPropylenebw1,
            bw2Contamination: contaminationWhitePolyPropylenebw2,
            bw3Contamination: contaminationccpAWhitePolyPropylene,
            bw4Contamination: contaminationccpBWhitePolyPropylene,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_16,
          },
          {
            type: "Colour Poly Propylene",
            bw1Contamination: contaminationColourPolyPropylenebw1,
            bw2Contamination: contaminationColourPolyPropylenebw2,
            bw3Contamination: contaminationccpAColourPolyPropylene,
            bw4Contamination: contaminationccpBColourPolyPropylene,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_17,
          },
          {
            type: "Rubber piece",
            bw1Contamination: contaminationRubberPiecebw1,
            bw2Contamination: contaminationRubberPiecebw2,
            bw3Contamination: contaminationccpARubberPiece,
            bw4Contamination: contaminationccpBRubberPiece,
            bw1Sample: "",
            bw2Sample: "",
            bw3Sample: "",
            bw4Sample: "",
            raw_id: overallRawId,
            id: id_18,
          },
        ],
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      axios
        .post(
          `${ API.prodUrl}/Precot/api/bleaching/Service/saveAppliedRawCottonF04`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
        message.success("Form Saved Successfully");
          navigate('/Precot/Bleaching/F-04/Summary');
        })
        .catch((err) => {
          // console.log("Error");
         message.error(err.response.message);
        })
        .finally(()=>{
          setSaveLoading(false);
        })
        ;
    }
  };

  const submitData = () => {
    setSubmitLoading(true);
    // console.log("Date1", token);
    const payload = {
      unit: "Unit H",
      formatNo: "PRD01/F04",
      formatName: null,
      sopNumber: "PRD01-D-09",
      revisionNo: "02",
      bmrNumber: state.bmrno,
      date: state.date,
      mail_status: mailStatus,
      supervisor_status: supervisorStatus,
      supervisor_saved_on: supervisorSavedOn,
      supervisor_saved_by: supervisorSavedBy,
      supervisor_saved_id: supervisorSavedId,
      supervisor_submit_on: supervisorSubmitOn,
      supervisor_submit_by: supervisorSubmitBy,
      supervisor_submit_id: supervisorSubmitId,
      supervisor_sign: supervisorSign,
      hod_status: hodStatus,
      hod_saved_on: hodSavedOn,
      hod_saved_by: hodSavedBy,
      hod_saved_id: hodSavedId,
      hod_submit_on: hodSubmitOn,
      hod_submit_by: hodSubmitBy,
      hod_submit_id: hodSubmitId,
      hod_sign: hodSign,
      raw_id: overallRawId,
      total_0ne:contamination1,
      total_two:contamination2,
      total_three: contamination3,
      total_four:contamination4,
      detailsRawCottonF04: [
        {
          type: "Hair",
          bw1Contamination: contaminationHairbw1,
          bw2Contamination: contaminationHairbw2,
          bw3Contamination: contaminationccpAHair,
          bw4Contamination: contaminationccpBHair,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_1,
        },
        {
          type: "Jute",
          bw1Contamination: contaminationJutebw1,
          bw2Contamination: contaminationJutebw2,
          bw3Contamination: contaminationccpAJute,
          bw4Contamination: contaminationccpBJute,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_2,
        },
        {
          type: "Colour Thread",
          bw1Contamination: contaminationColourThreadbw1,
          bw2Contamination: contaminationColourThreadbw2,
          bw3Contamination: contaminationccpAColourThread,
          bw4Contamination: contaminationccpBColourThread,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_3,
        },
        {
          type: "Wrapper",
          bw1Contamination: contaminationWrapperbw1,
          bw2Contamination: contaminationWrapperbw2,
          bw3Contamination: contaminationccpAWrapper,
          bw4Contamination: contaminationccpBWrapper,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_4,
        },
        {
          type: "Metal",
          bw1Contamination: contaminationMetalbw1,
          bw2Contamination: contaminationMetalbw2,
          bw3Contamination: contaminationccpAMetal,
          bw4Contamination: contaminationccpBMetal,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_5,
        },
        {
          type: "Rust",
          bw1Contamination: contaminationRustbw1,
          bw2Contamination: contaminationRustbw2,
          bw3Contamination: contaminationccpARust,
          bw4Contamination: contaminationccpBRust,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_6,
        },
        {
          type: "Plastic",
          bw1Contamination: contaminationPlasticbw1,
          bw2Contamination: contaminationPlasticbw2,
          bw3Contamination: contaminationccpAPlastic,
          bw4Contamination: contaminationccpBPlastic,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_7,
        },
        {
          type: "Black Cotton",
          bw1Contamination: contaminationBlackCottonbw1,
          bw2Contamination: contaminationBlackCottonbw2,
          bw3Contamination: contaminationccpABlackCotton,
          bw4Contamination: contaminationccpBBlackCotton,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_8,
        },
        {
          type: "Oil Cotton",
          bw1Contamination: contaminationOilCottonbw1,
          bw2Contamination: contaminationOilCottonbw2,
          bw3Contamination: contaminationccpAOilCotton,
          bw4Contamination: contaminationccpBOilCotton,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_9,
        },
        {
          type: "Soil",
          bw1Contamination: contaminationSoilbw1,
          bw2Contamination: contaminationSoilbw2,
          bw3Contamination: contaminationccpASoil,
          bw4Contamination: contaminationccpBSoil,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_10,
        },
        {
          type: "Yelow Cotton",
          bw1Contamination: contaminationYellowCottonbw1,
          bw2Contamination: contaminationYellowCottonbw2,
          bw3Contamination: contaminationccpAYellowCotton,
          bw4Contamination: contaminationccpBYellowCotton,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_11,
        },
        {
          type: "Paper",
          bw1Contamination: contaminationPaperbw1,
          bw2Contamination: contaminationPaperbw2,
          bw3Contamination: contaminationccpAPaper,
          bw4Contamination: contaminationccpBPaper,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_12,
        },
        {
          type: "Stick",
          bw1Contamination: contaminationStickbw1,
          bw2Contamination: contaminationStickbw2,
          bw3Contamination: contaminationccpAStick,
          bw4Contamination: contaminationccpBStick,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_13,
        },
        {
          type: "Feather",
          bw1Contamination: contaminationFeatherbw1,
          bw2Contamination: contaminationFeatherbw2,
          bw3Contamination: contaminationccpAFeather,
          bw4Contamination: contaminationccpBFeather,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_14,
        },
        {
          type: "Cloth",
          bw1Contamination: contaminationClothbw1,
          bw2Contamination: contaminationClothbw2,
          bw3Contamination: contaminationccpACloth,
          bw4Contamination: contaminationccpBCloth,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_15,
        },
        {
          type: "White Poly Propylene",
          bw1Contamination: contaminationWhitePolyPropylenebw1,
          bw2Contamination: contaminationWhitePolyPropylenebw2,
          bw3Contamination: contaminationccpAWhitePolyPropylene,
          bw4Contamination: contaminationccpBWhitePolyPropylene,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_16,
        },
        {
          type: "Colour Poly Propylene",
          bw1Contamination: contaminationColourPolyPropylenebw1,
          bw2Contamination: contaminationColourPolyPropylenebw2,
          bw3Contamination: contaminationccpAColourPolyPropylene,
          bw4Contamination: contaminationccpBColourPolyPropylene,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_17,
        },
        {
          type: "Rubber piece",
          bw1Contamination: contaminationRubberPiecebw1,
          bw2Contamination: contaminationRubberPiecebw2,
          bw3Contamination: contaminationccpARubberPiece,
          bw4Contamination: contaminationccpBRubberPiece,
          bw1Sample: "",
          bw2Sample: "",
          bw3Sample: "",
          bw4Sample: "",
          raw_id: overallRawId,
          id: id_18,
        },
      ],
    };
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/bleaching/Service/submitAppliedRawCottonF04`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.log("Response", res.data);
        message.success(res.data.message);
          navigate('/Precot/Bleaching/F-04/Summary');
      })
      .catch((err) => {
        // console.log("Error", err);
        message.error(err.response.data.message);
      })
      .finally(()=>{
        setSubmitLoading(false);
      })
      ;
  };

  // const onBlur1 = () => {
  //   const a = Number(contaminationHairbw1) + Number(contaminationJutebw1) + Number(contaminationColourThreadbw1) + Number(contaminationWrapperbw1) + Number(contaminationMetalbw1) + Number(contaminationRustbw1) + Number(contaminationPlasticbw1) + Number(contaminationBlackCottonbw1) + Number(contaminationOilCottonbw1) + Number(contaminationSoilbw1)  + Number(contaminationYellowCottonbw1) + Number(contaminationPaperbw1) + Number(contaminationStickbw1) + Number(contaminationFeatherbw1) + Number(contaminationClothbw1) + Number(contaminationWhitePolyPropylenebw1) + Number(contaminationColourPolyPropylenebw1) + Number(contaminationRubberPiecebw1)
  //   setContamination1(a)
  //   // console.log("AAAAAAAa",a)
  // }
  // const onBlur2 = () => {
  //   const a = Number(contaminationHairbw2) + Number(contaminationJutebw2) + Number(contaminationColourThreadbw2) + Number(contaminationWrapperbw2) + Number(contaminationMetalbw2) + Number(contaminationRustbw2) + Number(contaminationPlasticbw2) + Number(contaminationBlackCottonbw2) + Number(contaminationOilCottonbw2) + Number(contaminationSoilbw2)  + Number(contaminationYellowCottonbw2) + Number(contaminationPaperbw2) + Number(contaminationStickbw2) + Number(contaminationFeatherbw2) + Number(contaminationClothbw2) + Number(contaminationWhitePolyPropylenebw2) + Number(contaminationColourPolyPropylenebw2) + Number(contaminationRubberPiecebw2)
  //   setContamination2(a)
  // }
  // const onBlur3 = () => {
  //   const a = Number(contaminationccpAHair) + Number(contaminationccpAJute) + Number(contaminationccpAColourThread) + Number(contaminationccpAWrapper) + Number(contaminationccpAMetal) + Number(contaminationccpARust) + Number(contaminationccpAPlastic) + Number(contaminationccpABlackCotton) + Number(contaminationccpAOilCotton) + Number(contaminationccpASoil)  + Number(contaminationccpAYellowCotton) + Number(contaminationccpAPaper) + Number(contaminationccpAStick) + Number(contaminationccpAFeather) + Number(contaminationccpACloth) + Number(contaminationccpAWhitePolyPropylene) + Number(contaminationccpAColourPolyPropylene) + Number(contaminationccpARubberPiece)
  //   setContamination3(a)
  // }
  // const onBlur4 = () => {
  //   const a = Number(contaminationccpBHair) + Number(contaminationccpBJute) + Number(contaminationccpBColourThread) + Number(contaminationccpBWrapper) + Number(contaminationccpBMetal) + Number(contaminationccpBRust) + Number(contaminationccpBPlastic) + Number(contaminationccpBBlackCotton) + Number(contaminationccpBOilCotton) + Number(contaminationccpBSoil)  + Number(contaminationccpBYellowCotton) + Number(contaminationccpBPaper) + Number(contaminationccpBStick) + Number(contaminationccpBFeather) + Number(contaminationccpBCloth) + Number(contaminationccpBWhitePolyPropylene) + Number(contaminationccpBColourPolyPropylene) + Number(contaminationccpBRubberPiece)
  //   setContamination4(a)
  // }

  //first one value
  const calculate4 = () => {
   
    let total = 0;
 
    const hairInput = document.getElementById('inputhair4');
    if (hairInput) {
      total += parseInt(hairInput.value || '0');
    }
 
    const juteInput = document.getElementById('inputjute4');
    if (juteInput) {
      total += parseInt(juteInput.value || '0');
    }
 
    const colourThreadInput = document.getElementById('inputthread4');
    if (colourThreadInput) {
      total += parseInt(colourThreadInput.value || '0');
    }
 
    const wrapperInput = document.getElementById('inputwrapper4');
    if (wrapperInput) {
      total += parseInt(wrapperInput.value || '0');
    }
 
    const metalInput = document.getElementById('inputmetal4');
    if (metalInput) {
      total += parseInt(metalInput.value || '0');
    }
 
    const rustInput = document.getElementById('inputrust4');
    if (rustInput) {
      total += parseInt(rustInput.value || '0');
    }
 
    const plasticInput = document.getElementById('inputplastic4');
    if (plasticInput) {
      total += parseInt(plasticInput.value || '0');
    }
 
    const blkCottonInput = document.getElementById('inputblack4');
    if (blkCottonInput) {
      total += parseInt(blkCottonInput.value || '0');
    }
 
    const oilCottonInput = document.getElementById('inputoil4');
    if (oilCottonInput) {
      total += parseInt(oilCottonInput.value || '0');
    }
 
    const soilInput = document.getElementById('inputsoil4');
    if (soilInput) {
      total += parseInt(soilInput.value || '0');
    }
    const UnbleachedCottonInput = document.getElementById('inputyellow4');
    if (UnbleachedCottonInput) {
      total += parseInt(UnbleachedCottonInput.value || '0');
    }
 
    const yellowCottonInput = document.getElementById('inputpaper4');
    if (yellowCottonInput) {
      total += parseInt(yellowCottonInput.value || '0');
    }
 
    const paperInput = document.getElementById('inputstick4');
    if (paperInput) {
      total += parseInt(paperInput.value || '0');
    }
 
    const stickInput = document.getElementById('inputfeather4');
    if (stickInput) {
      total += parseInt(stickInput.value || '0');
    }
 
    const featherInput = document.getElementById('inputcloth4');
    if (featherInput) {
      total += parseInt(featherInput.value || '0');
    }
 
    const clothInput = document.getElementById('inputwhite4');
    if (clothInput) {
      total += parseInt(clothInput.value || '0');
    }
 
    const whitePolyPropInput = document.getElementById('inputwhitecolorpoly4');
    if (whitePolyPropInput) {
      total += parseInt(whitePolyPropInput.value || '0');
    }
 
    const colourPolyPropInput = document.getElementById('inputrubber4');
    if (colourPolyPropInput) {
      total += parseInt(colourPolyPropInput.value || '0');
    }
    setContamination4(total.toString());
}

  const calculate3 = () => {
   
    let total = 0;
 
    const hairInput = document.getElementById('inputhair3');
    if (hairInput) {
      total += parseInt(hairInput.value || '0');
    }
 
    const juteInput = document.getElementById('inputjute3');
    if (juteInput) {
      total += parseInt(juteInput.value || '0');
    }
 
    const colourThreadInput = document.getElementById('inputthread3');
    if (colourThreadInput) {
      total += parseInt(colourThreadInput.value || '0');
    }
 
    const wrapperInput = document.getElementById('inputwrapper3');
    if (wrapperInput) {
      total += parseInt(wrapperInput.value || '0');
    }
 
    const metalInput = document.getElementById('inputmetal3');
    if (metalInput) {
      total += parseInt(metalInput.value || '0');
    }
 
    const rustInput = document.getElementById('inputrust3');
    if (rustInput) {
      total += parseInt(rustInput.value || '0');
    }
 
    const plasticInput = document.getElementById('inputplastic3');
    if (plasticInput) {
      total += parseInt(plasticInput.value || '0');
    }
 
    const blkCottonInput = document.getElementById('inputblack3');
    if (blkCottonInput) {
      total += parseInt(blkCottonInput.value || '0');
    }
 
    const oilCottonInput = document.getElementById('inputoil3');
    if (oilCottonInput) {
      total += parseInt(oilCottonInput.value || '0');
    }
 
    const soilInput = document.getElementById('inputsoil3');
    if (soilInput) {
      total += parseInt(soilInput.value || '0');
    }
    const UnbleachedCottonInput = document.getElementById('inputyellow3');
    if (UnbleachedCottonInput) {
      total += parseInt(UnbleachedCottonInput.value || '0');
    }
 
    const yellowCottonInput = document.getElementById('inputpaper3');
    if (yellowCottonInput) {
      total += parseInt(yellowCottonInput.value || '0');
    }
 
    const paperInput = document.getElementById('inputstick3');
    if (paperInput) {
      total += parseInt(paperInput.value || '0');
    }
 
    const stickInput = document.getElementById('inputfeather3');
    if (stickInput) {
      total += parseInt(stickInput.value || '0');
    }
 
    const featherInput = document.getElementById('inputcloth3');
    if (featherInput) {
      total += parseInt(featherInput.value || '0');
    }
 
    const clothInput = document.getElementById('inputwhite3');
    if (clothInput) {
      total += parseInt(clothInput.value || '0');
    }
 
    const whitePolyPropInput = document.getElementById('inputwhitecolorpoly3');
    if (whitePolyPropInput) {
      total += parseInt(whitePolyPropInput.value || '0');
    }
 
    const colourPolyPropInput = document.getElementById('inputrubber3');
    if (colourPolyPropInput) {
      total += parseInt(colourPolyPropInput.value || '0');
    }
    setContamination3(total.toString());
}

  const calculate2 = () => {
   
      let total = 0;
   
      const hairInput = document.getElementById('inputhair2');
      if (hairInput) {
        total += parseInt(hairInput.value || '0');
      }
   
      const juteInput = document.getElementById('inputjute2');
      if (juteInput) {
        total += parseInt(juteInput.value || '0');
      }
   
      const colourThreadInput = document.getElementById('inputthread2');
      if (colourThreadInput) {
        total += parseInt(colourThreadInput.value || '0');
      }
   
      const wrapperInput = document.getElementById('inputwrapper2');
      if (wrapperInput) {
        total += parseInt(wrapperInput.value || '0');
      }
   
      const metalInput = document.getElementById('inputmetal2');
      if (metalInput) {
        total += parseInt(metalInput.value || '0');
      }
   
      const rustInput = document.getElementById('inputrust2');
      if (rustInput) {
        total += parseInt(rustInput.value || '0');
      }
   
      const plasticInput = document.getElementById('inputplastic2');
      if (plasticInput) {
        total += parseInt(plasticInput.value || '0');
      }
   
      const blkCottonInput = document.getElementById('inputblack2');
      if (blkCottonInput) {
        total += parseInt(blkCottonInput.value || '0');
      }
   
      const oilCottonInput = document.getElementById('inputoil2');
      if (oilCottonInput) {
        total += parseInt(oilCottonInput.value || '0');
      }
   
      const soilInput = document.getElementById('inputsoil2');
      if (soilInput) {
        total += parseInt(soilInput.value || '0');
      }
      const UnbleachedCottonInput = document.getElementById('inputyellow2');
      if (UnbleachedCottonInput) {
        total += parseInt(UnbleachedCottonInput.value || '0');
      }
   
      const yellowCottonInput = document.getElementById('inputpaper2');
      if (yellowCottonInput) {
        total += parseInt(yellowCottonInput.value || '0');
      }
   
      const paperInput = document.getElementById('inputstick2');
      if (paperInput) {
        total += parseInt(paperInput.value || '0');
      }
   
      const stickInput = document.getElementById('inputfeather2');
      if (stickInput) {
        total += parseInt(stickInput.value || '0');
      }
   
      const featherInput = document.getElementById('inputcloth2');
      if (featherInput) {
        total += parseInt(featherInput.value || '0');
      }
   
      const clothInput = document.getElementById('inputwhite2');
      if (clothInput) {
        total += parseInt(clothInput.value || '0');
      }
   
      const whitePolyPropInput = document.getElementById('inputwhitecolorpoly2');
      if (whitePolyPropInput) {
        total += parseInt(whitePolyPropInput.value || '0');
      }
   
      const colourPolyPropInput = document.getElementById('inputrubber2');
      if (colourPolyPropInput) {
        total += parseInt(colourPolyPropInput.value || '0');
      }
      setContamination2(total.toString());
  }

  const calculateTotal = () => {
    let total = 0;
 
    const hairInput = document.getElementById('inputhair1');
    if (hairInput) {
      total += parseInt(hairInput.value || '0');
    }
 
    const juteInput = document.getElementById('inputjute1');
    if (juteInput) {
      total += parseInt(juteInput.value || '0');
    }
 
    const colourThreadInput = document.getElementById('inputthread1');
    if (colourThreadInput) {
      total += parseInt(colourThreadInput.value || '0');
    }
 
    const wrapperInput = document.getElementById('inputwrapper1');
    if (wrapperInput) {
      total += parseInt(wrapperInput.value || '0');
    }
 
    const metalInput = document.getElementById('inputmetal1');
    if (metalInput) {
      total += parseInt(metalInput.value || '0');
    }
 
    const rustInput = document.getElementById('inputrust1');
    if (rustInput) {
      total += parseInt(rustInput.value || '0');
    }
 
    const plasticInput = document.getElementById('inputplastic1');
    if (plasticInput) {
      total += parseInt(plasticInput.value || '0');
    }
 
    const blkCottonInput = document.getElementById('inputblack1');
    if (blkCottonInput) {
      total += parseInt(blkCottonInput.value || '0');
    }
 
    const oilCottonInput = document.getElementById('inputoil1');
    if (oilCottonInput) {
      total += parseInt(oilCottonInput.value || '0');
    }
 
    const soilInput = document.getElementById('inputsoil1');
    if (soilInput) {
      total += parseInt(soilInput.value || '0');
    }
    const UnbleachedCottonInput = document.getElementById('inputyellow1');
    if (UnbleachedCottonInput) {
      total += parseInt(UnbleachedCottonInput.value || '0');
    }
 
    const yellowCottonInput = document.getElementById('inputpaper1');
    if (yellowCottonInput) {
      total += parseInt(yellowCottonInput.value || '0');
    }
 
    const paperInput = document.getElementById('inputstick1');
    if (paperInput) {
      total += parseInt(paperInput.value || '0');
    }
 
    const stickInput = document.getElementById('inputfeather1');
    if (stickInput) {
      total += parseInt(stickInput.value || '0');
    }
 
    const featherInput = document.getElementById('inputcloth1');
    if (featherInput) {
      total += parseInt(featherInput.value || '0');
    }
 
    const clothInput = document.getElementById('inputwhite1');
    if (clothInput) {
      total += parseInt(clothInput.value || '0');
    }
 
    const whitePolyPropInput = document.getElementById('inputwhitecolorpoly1');
    if (whitePolyPropInput) {
      total += parseInt(whitePolyPropInput.value || '0');
    }
 
    const colourPolyPropInput = document.getElementById('inputrubber1');
    if (colourPolyPropInput) {
      total += parseInt(colourPolyPropInput.value || '0');
    }
    setContamination1(total.toString());
  };
  const items = [
    {
      key: "1",
      label: "Form B&W ",
      children: (
        <div>
          <table
            style={{
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <td rowSpan={2} align="center">
                S. No.
                </td>
                <td rowSpan={2} align="center">
                  Types of Contamination
                </td>
              </tr>
              <tr>
                <td
                  colSpan={1}
                  style={{
                    padding: "1em",
                  }}
                  align="center"
                >
                  No of Contamination - B&W-1
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                  align="center"
                >
                  No of Contamination - B&W-2
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td align="center">1</td>
                <td align="center">Hair</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                    id="inputhair1"
                    value={contaminationHairbw1}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationHairbw1(e.target.value)
                      calculateTotal();
                    }}}
                    // disabled={
                    //   (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                    //   (roleBase === "ROLE_HOD"   && selectedRow?.hod_status === "HOD_APPROVED")||
                    //   (roleBase === "ROLE_DESIGNEE"  && selectedRow?.hod_status === "HOD_APPROVED")}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>

                <td align="center">
                  <input
                    className="inp-new"
                    
                    id="inputhair2"
                    value={contaminationHairbw2}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationHairbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">2</td>
                <td align="center">Jute</td>
                <td colSpan={1}>
                  {" "}
                  <input
                    className="inp-new"
                    
                    id="inputjute1"
                    value={contaminationJutebw1}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationJutebw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                 
                             id="inputjute2"
                    value={contaminationJutebw2}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationJutebw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">3</td>
                <td align="center">Colour Threads </td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                             id="inputthread1"
                    value={contaminationColourThreadbw1}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationColourThreadbw1(e.target.value)
                        calculateTotal()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>

                <td align="center">
                  <input
                    className="inp-new"
                    
                     id="inputthread2"
                    value={contaminationColourThreadbw2}
                    onChange={(e) =>{  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                    {
                      setContaminationColourThreadbw2(e.target.value)
                      calculate2()
                    }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">4</td>
                <td align="center">Strapper</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                     id="inputwrapper1"
                    value={contaminationWrapperbw1}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationWrapperbw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                  
                    id="inputwrapper2"
                    value={contaminationWrapperbw2}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationWrapperbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">5</td>
                <td align="center">Metal piece </td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                    id="inputmetal1"
                    value={contaminationMetalbw1}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationMetalbw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                   
                       id="inputmetal2"
                    value={contaminationMetalbw2}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationMetalbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">6</td>
                <td align="center">Brown/Rusty cotton </td>
                <td colSpan={1}>
                  <input
                    className="inp-new"
                    
                       id="inputrust1"
                    value={contaminationRustbw1}
                    onChange={(e) => { {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationRustbw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                         id="inputrust2"
                    value={contaminationRustbw2}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationRustbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">7</td>
                <td align="center">Plastic</td>
                <td colSpan={1}>
                  <input
                    className="inp-new"
                    
                         id="inputplastic1"
                    value={contaminationPlasticbw1}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationPlasticbw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                    id="inputplastic2"
                    value={contaminationPlasticbw2}
                    onChange={(e) => { {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationPlasticbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">8</td>
                <td align="center">Black Cotton</td>
                <td colSpan={1}>
                  <input
                    className="inp-new"
                    
                    id="inputblack1"
                    value={contaminationBlackCottonbw1}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationBlackCottonbw1(e.target.value)
                        calculateTotal()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                  
                     id="inputblack2"
                    value={contaminationBlackCottonbw2}
                    onChange={(e) =>
                     {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationBlackCottonbw2(e.target.value)
                        calculate2()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">9</td>
                <td align="center">Oil Cotton</td>
                <td colSpan={1}>
                  <input
                    className="inp-new"
                   
                     id="inputoil1"
                    value={contaminationOilCottonbw1}
                    onChange={(e) =>{  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationOilCottonbw1(e.target.value)
                        calculateTotal()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                   
                    id="inputoil2"
                    value={contaminationOilCottonbw2}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationOilCottonbw2(e.target.value)
                        calculate2()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">10</td>
                <td align="center">Soils</td>
                <td colSpan={1} align="center">
                  {" "}
                  <input
                    className="inp-new"
                    id="inputsoil1"
                    value={contaminationSoilbw1}

                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationSoilbw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                    id="inputsoil2"
                    value={contaminationSoilbw2}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationSoilbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">11</td>
                <td align="center">Yelow Cotton</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                  
                    id="inputyellow1"
                    value={contaminationYellowCottonbw1}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationYellowCottonbw1(e.target.value)
                        calculateTotal()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                  
                    id="inputyellow2"
                    value={contaminationYellowCottonbw2}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationYellowCottonbw2(e.target.value)
                        calculate2()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">12</td>
                <td align="center">Paper</td>
                <td colSpan={1}>
                  <input
                    className="inp-new"
                    
                    id="inputpaper1"
                    value={contaminationPaperbw1}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationPaperbw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                     id="inputpaper2"
                    value={contaminationPaperbw2}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationPaperbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">13</td>
                <td align="center">Stick</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                     id="inputstick1"
                    value={contaminationStickbw1}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationStickbw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                   
                      id="inputstick2"
                    value={contaminationStickbw2}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationStickbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">14</td>
                <td align="center">Feather</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                      id="inputfeather1"
                    value={contaminationFeatherbw1}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationFeatherbw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                            id="inputfeather2"
                    value={contaminationFeatherbw2}
                    onChange={(e) => {{  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationFeatherbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">15</td>
                <td align="center">Cloth</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                            id="inputcloth1"
                    value={contaminationClothbw1}
                    onChange={(e) => { {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationClothbw1(e.target.value)
                      calculateTotal()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                            id="inputcloth2"
                    value={contaminationClothbw2}
                    onChange={(e) => { 
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationClothbw2(e.target.value)
                      calculate2()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">16</td>
                <td align="center">white Poly Propylene</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                            id="inputwhite1"
                    value={contaminationWhitePolyPropylenebw1}
                    onChange={(e) => 
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationWhitePolyPropylenebw1(e.target.value)
                        calculateTotal()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                    id="inputwhite2"
                    value={contaminationWhitePolyPropylenebw2}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationWhitePolyPropylenebw2(e.target.value)
                        calculate2()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">17</td>
                <td align="center">Colour Poly Propylene</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                    id="inputwhitecolorpoly1"
                    value={contaminationColourPolyPropylenebw1}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationColourPolyPropylenebw1(e.target.value)
                        calculateTotal()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                     id="inputwhitecolorpoly2"
                    value={contaminationColourPolyPropylenebw2}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {

                        setContaminationColourPolyPropylenebw2(e.target.value)
                        calculate2()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">18</td>
                <td align="center">Rubber piece</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                     id="inputrubber1"
                    value={contaminationRubberPiecebw1}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationRubberPiecebw1(e.target.value)
                        calculateTotal()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                      id="inputrubber2"
                    value={contaminationRubberPiecebw2}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value))  {
                        setContaminationRubberPiecebw2(e.target.value)
                        calculate2()
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              
              <tr>
                <td align="center">19</td>
                <td align="center">Total :</td>
                <td align="center">
                  <input
                    className="inp-new"
                    value={contamination1}
                    // value={Total_Cont}
                    // onChange={(e) => {
                    //   const value = e.target.value;

                    //   if (value === '' || /^[0-9\b]+$/.test(value)) {
                    //     setTotal_Cont(value);
                    //     calculateTotal();
                    //   }

                    // }}
                    type="number"
                    disabled
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    // value={Total_Cont}
                    // onChange={(e) => {
                    //   const value = e.target.value;

                    //   if (value === '' || /^[0-9\b]+$/.test(value)) {
                    //     setTotal_Cont(value);
                    //     calculateTotal();
                    //   }

                    // }}
                    value={contamination2}
                    type="number"
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
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
      key: "2",
      label: "Form CCP",
      children: (
        <div>
          <table>
            <thead>
              <tr align="center">
                <td rowSpan={2} align="center">
                S. No.
                </td>
                <td
                  rowSpan={2}
                  align="center"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Types of Contamination
                </td>
              </tr>
              <tr>
                <td colSpan={1} align="center">
                  No of Contamination - CCP# : 01 - A (XPI-1)
                </td>
                <td align="center">
                  No of Contamination - CCP# : 01 - B (XPI-2)
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td align="center">1</td>
                <td align="center">Hair</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                    id="inputhair3"
                    value={contaminationccpAHair}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpAHair(e.target.value)
                      calculate3()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                   
                    value={contaminationccpBHair}
                           id="inputhair4"
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpBHair(e.target.value)
                      calculate4()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">2</td>
                <td align="center">Jute</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                           id="inputjute3"
                    value={contaminationccpAJute}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpAJute(e.target.value)
                      calculate3()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                  
                     id="inputjute4"
                    value={contaminationccpBJute}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpBJute(e.target.value)
                      calculate4()
                    }}}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">3</td>
                <td align="center">Colour Threads</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                     id="inputthread3"
                    value={contaminationccpAColourThread}
                    onChange={(e) =>{
                      const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpAColourThread(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                     id="inputthread4"
                    value={contaminationccpBColourThread}
                    onChange={(e) =>{
                      const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)){
                        setContaminationccpBColourThread(e.target.value)
                        calculate4()
                      }
                    }
                  }
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">4</td>
                <td align="center">Strapper</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                     id="inputwrapper3"
                    value={contaminationccpAWrapper}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpAWrapper(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    id="inputwrapper4"
                    value={contaminationccpBWrapper}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpBWrapper(e.target.value)
                        calculate4()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">5</td>
                <td align="center">Metal piece</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                    value={contaminationccpAMetal}
                    id="inputmetal3"
                    onChange={(e) => { {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpAMetal(e.target.value)
                      calculate3()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                   
                     id="inputmetal4"
                    value={contaminationccpBMetal}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpBMetal(e.target.value)
                      calculate4()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">6</td>
                <td align="center">Brown/Rusty cotton</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                     id="inputrust3"
                    value={contaminationccpARust}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpARust(e.target.value)
                      calculate3()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                  
                      id="inputrust4"
                    value={contaminationccpBRust}
                    onChange={(e) => { {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpBRust(e.target.value)
                      calculate4()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">7</td>
                <td align="center">Plastic</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                      id="inputplastic3"
                    value={contaminationccpAPlastic}
                    onChange={(e) =>{  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpAPlastic(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                     id="inputplastic4"
                    value={contaminationccpBPlastic}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpBPlastic(e.target.value)
                        calculate4()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">8</td>
                <td align="center">Black Cotton</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                     id="inputblack3"
                    value={contaminationccpABlackCotton}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpABlackCotton(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                       id="inputblack4"
                    value={contaminationccpBBlackCotton}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpBBlackCotton(e.target.value)
                        calculate4()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">9</td>
                <td align="center">Oil Cotton</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                       id="inputoil3"
                    value={contaminationccpAOilCotton}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpAOilCotton(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                   
                    id="inputoil4"
                    value={contaminationccpBOilCotton}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpBOilCotton(e.target.value)
                        calculate4()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">10</td>
                <td align="center">Soils</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                    value={contaminationccpASoil}
                    id="inputsoil3"
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpASoil(e.target.value)
                      calculate3()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                   
                    id="inputsoil4"
                    value={contaminationccpBSoil}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpBSoil(e.target.value)
                      calculate4()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">11</td>
                <td align="center">Yelow Cotton</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    id="inputyellow3"
                    value={contaminationccpAYellowCotton}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpAYellowCotton(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                     id="inputyellow4"
                    value={contaminationccpBYellowCotton}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpBYellowCotton(e.target.value)
                        calculate4()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">12</td>
                <td align="center">Paper</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                     id="inputpaper3"
                    value={contaminationccpAPaper}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpAPaper(e.target.value)
                      calculate3()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                     id="inputpaper4"
                    value={contaminationccpBPaper}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpBPaper(e.target.value)
                      calculate4()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">13</td>
                <td align="center">Stick</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                     id="inputstick3"
                    value={contaminationccpAStick}
                    onChange={(e) => { {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpAStick(e.target.value)
                      calculate3()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                    id="inputstick4"
                    value={contaminationccpBStick}
                    onChange={(e) => { {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpBStick(e.target.value)
                      calculate4()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">14</td>
                <td align="center">Feather</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                    id="inputfeather3"
                    value={contaminationccpAFeather}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpAFeather(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                 
                     id="inputfeather4"
                    value={contaminationccpBFeather}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpBFeather(e.target.value)
                        calculate4()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">15</td>
                <td align="center">cloth</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                     id="inputcloth3"
                    value={contaminationccpACloth}
                    onChange={(e) => {
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpACloth(e.target.value)
                      calculate3()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                  
                       id="inputcloth4"
                    value={contaminationccpBCloth}
                    onChange={(e) => { {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      setContaminationccpBCloth(e.target.value)
                      calculate4()
                    }}}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">16</td>
                <td align="center">white Poly Propylene</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                   
                       id="inputwhite3"
                    value={contaminationccpAWhitePolyPropylene}
                    onChange={(e) => {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpAWhitePolyPropylene(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                   
                    id="inputwhite4"
                    value={contaminationccpBWhitePolyPropylene}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpBWhitePolyPropylene(e.target.value)
                        calculate4()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">17</td>
                <td align="center">colour Poly Propylene</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                    
                    id="inputwhitecolorpoly3"
                    value={contaminationccpAColourPolyPropylene}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpAColourPolyPropylene(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    
                       id="inputwhitecolorpoly4"
                    value={contaminationccpBColourPolyPropylene}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBColourPolyPropylene(e.target.value)
                        calculate4()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">18</td>
                <td align="center">Rubber piece</td>
                <td colSpan={1} align="center">
                  <input
                    className="inp-new"
                       id="inputrubber3"
                    
                    value={contaminationccpARubberPiece}
                    onChange={(e) =>
                      {  const value = e.target.value;

                        if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpARubberPiece(e.target.value)
                        calculate3()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                  
                    value={contaminationccpBRubberPiece}
                      id="inputrubber4"
                    onChange={(e) => {  const value = e.target.value;

                      if (value === '' || /^[0-9\b]+$/.test(value)) 
                      {
                        setContaminationccpBRubberPiece(e.target.value)
                        calculate4()
                      }
                    }}
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td align="center">19</td>
                <td align="center">Total</td>
                <td align="center">
                  <input
                    className="inp-new"
                    // value={Total_Cont}
                    // onChange={(e) => {
                    //   const value = e.target.value;

                    //   if (value === '' || /^[0-9\b]+$/.test(value)) {
                    //     setTotal_Cont(value);
                    //     calculateTotal();
                    //   }

                    // }}
                    value={contamination3}
                    type="number"
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </td>
                <td align="center">
                  <input
                    className="inp-new"
                    // value={Total_Cont}
                    // onChange={(e) => {
                    //   const value = e.target.value;

                    //   if (value === '' || /^[0-9\b]+$/.test(value)) {
                    //     setTotal_Cont(value);
                    //     calculateTotal();
                    //   }

                    // }}
                    value={contamination4}
                    type="number"
                     disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                         selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
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
      label: "Reviews",
      children: (
        <table>
        
          <tr>
            <td
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
              colSpan={3}
            >
              Shift In-Charge Signature
            </td>
            <td
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
              colSpan={3}
            >
              Hod/Production In-charge Signature
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
                height:"60px"
              }}
              colSpan={3}
            >
             {supervisorStatus == "SUPERVISOR_APPROVED" && (
              <>
                            {getImage !== "" && (
              <img className="signature"
                          src={getImage}
                          alt="Supervisor"
                          
                        />)}
              <input
                className="inp-new"
                type="text"
                disabled
                value={supervisorSign}
                // onChange={(e) => setabSignatureIncharge(e.target.value)}
              />
                <input
                className="inp-new"
                type="text"
                disabled
                value={formattedsupervisorDate}
                // onChange={(e) => setabSignatureIncharge(e.target.value)}
              />
                        </>
                        )}
            </td>
            
            <td
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
              colSpan={3}
            >
               {(hodStatus === "HOD_REJECTED" || 
                hodStatus === "HOD_APPROVED") && (
                  <>
                                {getImage1 !== "" && (
               <img className="signature"
                          src={getImage1}
                          alt="HOD"
                         
                        />)}
              <input
                className="inp-new"
                type="text"
                disabled
                
                value={hodSign}
                // onChange={(e) => setabSignatureHOD(e.target.value)}
              />
              <input
                className="inp-new"
                type="text"
                disabled
                value={formattedhodDate}
                // onChange={(e) => setabSignatureIncharge(e.target.value)}
              />
                        </>
                )}
            </td>
           
          </tr>
        </table>
      ),
    },
  ];
  return (
    <div>
      <div
        id="section-to-print"
        style={{
          fontFamily: "sans-serif",
        }}
      >
        <header className="no-print" />
        <main>
          <br/>
          <br/>
          <table  style={{marginTop:"5%" ,width:"90%"}}>
          <thead>
              <tr>
                <td colSpan="3" rowspan="4" style={{textAlign:'center' }}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' ,textAlign:'center' }} />
                <br></br>
                <br></br>
                  Unit H
                </td>
                <th colSpan="7" rowspan="4" style={{ height: "60px",width:"60%",textAlign:"center"}}>
                  Applied Contamination Report
                  <br />
                  (Raw Cotton)
                </th>
                <td colSpan="5">Format .:</td>
                <td colSpan="4">PH-PRD01/F-003</td>
              </tr>

              <tr>
                <td colSpan="5">Revision No .:</td>
                <td colSpan="4">02</td>
              </tr>
              <tr>
                <td colSpan="5">Ref sopNo.:</td>
                <td colSpan="4">PRD01-D-09</td>
              </tr>
              <tr>
                <td colSpan="5">PageNo.:</td>
                <td colSpan="4">01 of 01</td>
              </tr>
              <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="19"></td>
            </tr>
              
              </thead>
              <br/>

             <tbody>
              <tr>
                <td colSpan="10">Date : {currentDate}</td>
                {/* <td colSpan="5">{currentDate}</td> */}
                <td colSpan="9">BMR No : {state.bmrno}</td>
                {/* <td colSpan="4">{state.bmrno}</td> */}
              </tr>
              <tr>
                <td colSpan="1" rowSpan="3">
                  S.No.
                </td>
                <td colSpan="2" rowSpan="3">
                  Types of Contamination :
                </td>
              </tr>
              <tr>
                <td colSpan="4"style={{ textAlign: "center" }}>B&W-1</td>
                <td colSpan="4"style={{ textAlign: "center" }}>B&W-2</td>

                <td colSpan="4"style={{ textAlign: "center" }}>CCP#01-A(XPI-1)</td>
                <td colSpan="4"style={{ textAlign: "center" }}>CCP#01-B(XPI-2)</td>
              </tr>
              
             
              
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No .of <br />
                  Contamination 
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref .Sample
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No .of <br /> Contamination
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref. Sample
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No .of <br /> Contamination
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref . Sample
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No. of <br /> Contamination
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref . Sample
                </td>
              </tr>

              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>1</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Hair</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationHairbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationHairbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAHair}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBHair}</td>
                <td colSpan="2"></td>
              </tr>

              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>2</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Jute</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationJutebw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationJutebw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAJute}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBJute}</td>
                <td colSpan="2"></td>
              </tr>

              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>3</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Colour Threads</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationColourThreadbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationColourThreadbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAColourThread}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBColourThread}</td>
                <td colSpan="2"></td>
              </tr>

              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>4</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Wrapper</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationWrapperbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationWrapperbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAWrapper}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBWrapper}</td>
                <td colSpan="2"></td>
              </tr>

              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>5</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Metal piece </td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationMetalbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationMetalbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAMetal}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBMetal}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>6</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Brown/Rusty cotton </td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationRustbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationRustbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpARust}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBRust}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>7</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Plastic</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationPlasticbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationPlasticbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAPlastic}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBPlastic}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>8</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Black Cotton</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationBlackCottonbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationBlackCottonbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpABlackCotton}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBBlackCotton}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>9</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Oil Cotton</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationOilCottonbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationOilCottonbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAOilCotton}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBOilCotton}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>10</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Soils</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationSoilbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationSoilbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpASoil}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBSoil}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>11</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Yellow Cotton</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationYellowCottonbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationYellowCottonbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAYellowCotton}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBYellowCotton}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>12</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Paper</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationPaperbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationPaperbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAPaper}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBPaper}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>13</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Stick</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationStickbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationStickbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAStick}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBStick}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>14</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Feather</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationFeatherbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationFeatherbw2}</td>
                <td colSpan="2"style={{ textAlign: "center" }}></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAFeather}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBFeather}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>15</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Cloth</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationClothbw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationClothbw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpACloth}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBCloth}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>16</td>
                <td colSpan="2"style={{ textAlign: "center" }}>White Poly Propylene</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationWhitePolyPropylenebw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationWhitePolyPropylenebw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAWhitePolyPropylene}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBWhitePolyPropylene}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>17</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Colour Poly Propylene</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationColourPolyPropylenebw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationColourPolyPropylenebw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpAColourPolyPropylene}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBColourPolyPropylene}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1"style={{ textAlign: "center" }}>18</td>
                <td colSpan="2"style={{ textAlign: "center" }}>Rubber Piece</td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationRubberPiecebw1}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationRubberPiecebw2}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpARubberPiece}</td>
                <td colSpan="2"></td>
                <td colSpan="2"style={{ textAlign: "center" }}>{contaminationccpBRubberPiece}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="3"style={{ textAlign: "center" }}>Total</td>
                <td colSpan="4"style={{ paddingLeft: "3em"}}>{contamination1}</td>
                <td colSpan="4"style={{ paddingLeft: "3em" }}>{contamination2}</td>
                <td colSpan="4"style={{ paddingLeft: "3em" }}>{contamination3}</td>
                <td colSpan="4"style={{ paddingLeft: "3em" }}>{contamination4}</td>
              </tr>
              
              
              
              <tr>
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Performed by Production Supervisor
                </td>
              
                <td
                  colSpan="10"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Reviewed by Head of the Department/Designee
                </td>
              </tr>
              <tr>
                <td
                  colSpan="9"
                  style={{
                    height: "50px",
                    textAlign: "center",
                    verticalAlign: "bottom",
                  }}
                >
                  <p>{supervisorSign}</p>
                  <p>{formattedsupervisorDate}</p>
                  Sign & Date
                </td>
                <td
                  colSpan="10"
                  style={{
                    height: "50px",
                    textAlign: "center",
                    verticalAlign: "bottom",
                  }}
                >
                  <p>{hodSign}</p>
                  <p>{formattedhodDate}</p>
                  Sign & Date
                </td>
              </tr>
              <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="19"></td>
            </tr>
              </tbody>


                    <br/>

              <tfoot>

              <tr>
                <td colSpan="4">Particulars</td>
                <td colSpan="5">Perpared by</td>
                <td colSpan="5">Reviewed by</td>
                <td colSpan="5">Apporved by</td>
              </tr>
              <tr>
                <td colSpan="4">Name</td>
                <td colSpan="5"></td>
                <td colSpan="5"></td>
                <td colSpan="5"></td>
              </tr>
              <tr>
                <td colSpan="4">Signature & Date</td>
                <td colSpan="5"></td>
                <td colSpan="5"></td>
                <td colSpan="5"></td>
              </tr>
              </tfoot>
          </table>
        </main>
        <footer className="no-print" />
      </div>
      <BleachingHeader
        unit="Unit-H"
        formName="Applied Contamination Report"
        formatNo="PH-PRD01/F-003"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          // isPrintEnabled&&(
          // <Button
          //   type="primary"
          //   style={{
          //     backgroundColor: "#E5EEF9",
          //     color: "#00308F",
          //     fontWeight: "bold",
             
          //   }}
          //   shape="round"
          //   icon={<IoPrint color="#00308F" />}
          //   onClick={() => window.print()}
          // >
          //   &nbsp;Print
          // </Button>
          // ),
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
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display:canDisplayButton2()
            }}
            onClick={saveData}
            shape="round"
            icon={<IoSave color="#00308F" />}
          >
            &nbsp;Save
          </Button>
          <Button
          loading={submitLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display:canDisplayButtons()
            }}
            onClick={submitData}
            shape="round"
            icon={<GrDocumentStore color="#00308F" />}
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
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
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
      <Row
        style={{
          width: "90%",
          position: "relative",
          marginLeft: "1em",
          marginTop: "2em",
          marginBottom: "0em",
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Form.Item
            label="Date"
            style={{
              marginRight: "20px",
            }}
          >
            <Input
              type="date"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              max={formattedToday}
              disabled={
                (roleBase === "ROLE_SUPERVISOR" &&
                  ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                   selectedRow?.hod_status === "HOD_APPROVED")) ||
                ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                  ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED"))
              }
            />
          </Form.Item>
          <Form.Item label="BMR NO">
            <Input value={formatNo} disabled />
          </Form.Item>
        </Form>
      </Row>
      <Tabs
        style={{
          width: "100%",
          position: "relative",
          padding: "0em 1em 0em 1em",
        }}
        items={items}
        onChange={onChange2}
        defaultActiveKey="1"
      />
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
    </div>
  );
};

export default Bleaching_f04;
