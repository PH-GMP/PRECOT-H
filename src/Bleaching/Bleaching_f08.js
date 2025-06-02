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
  Modal,
} from "antd";
import "./AppliedContamination.css";
import { GoArrowLeft } from "react-icons/go";
// import logo from '../Assests/PreCot-removedbg.png';
import { useEffect, useState } from "react";
import BleachingHeader from "../Components/BleachingHeader";
import { BiLock, BiSave } from "react-icons/bi";
import { BsBack } from "react-icons/bs";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { IoChevronBackSharp, IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const Bleaching_f08 = () => {
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
  const [selectedRow, setSelectedRow] = useState("");
  const [contaminationccpARubberPiece, setContaminationccpARubberPiece] =
    useState("");

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
    contaminationccpAUnbleachedCotton,
    SetContaminationccpAUnbleachedCotton,
  ] = useState("");
  const [
    contaminationccpBUnbleachedCotton,
    SetContaminationccpBUnbleachedCotton,
  ] = useState("");
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
  const [loading, setLoading] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");

  const formattedDate = initialDate
    ? moment(initialDate, "YYYY-MM-DD").format("DD/MM/YYYY")
    : "";
  const [rawId, setrawId] = useState("");
  const [totalccpA, setTotalccpA] = useState("");
  const [totalccpB, setTotalccpB] = useState("");

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
  const [raw_id_19, set_raw_id_19] = useState("");

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
  const [id_19, set_id_19] = useState("");
  const [HOD_Status, setHOD_Status] = useState("");
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [printBtnStatus, setPrintBtnStatus] = useState(false);
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
  const [hodSign, setHodSign] = useState("");
  const [disable, setDisable] = useState(false);
  const [newSave, setNewSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [getImage, setGetImage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.supervisor_sign;
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
    const username = selectedRow?.hod_sign;
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

  // const [selectedrow, setSelectedrow] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-08/Summary");
  };

  const navigate = useNavigate("");

  const role = "admin";
  const [reportName, setReportName] = useState("APPLIED_CONTAMINATION_REPORT");
  const [overallRawId, setOverallRawID] = useState("");

  const { state } = useLocation();
  const roleBase = localStorage.getItem("role");

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF08`,
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
        navigate("/Precot/Bleaching/F-08/Summary");
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

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF08`,
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
        navigate("/Precot/Bleaching/F-08/Summary");
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

  useEffect(() => {
    // console.log("routeState", state);
    // setInitialDate(new Date().toISOString().substring(0, 10));
    setInitialDate(new Date(state.date).toISOString().substring(0, 10));
    setFormatNo(state.bmrno);
    setToken(localStorage.getItem("token"));
    // console.log("Roles", localStorage.getItem("role"));
    switch (localStorage.getItem("role")) {
      case "ROLE_HOD":
      case "ROLE_DESIGNEE":
        // console.log("HOD Logged In");
        setabSignatureHOD(localStorage.getItem("username"));
        setrawSignatureHOD(localStorage.getItem("username"));
        break;
      case "ROLE_SUPERVISOR":
        // console.log("Supervisor Logged In");
        setabSignatureIncharge(localStorage.getItem("username"));
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
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(
        `${ API.prodUrl}/Precot/api/Bleaching/Service/getAppliedAbCottonByBmrNumberF08?bmrNumber=${state.bmrno}`,
        { headers }
      )
      .then((res) => {
        // console.log("Resposne of Data", res.data);
        // console.log("len", res.data.length);

        setSelectedRow(res.data[0]);

        setOverallRawID(res.data[0].ab_id);
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
        setTotalccpA(res.data[0].total_01 ? res.data[0].total_01 : "0");
        setTotalccpB(res.data[0].total_02 ? res.data[0].total_02 : "0");

        setrawSignatureHOD(res.data[0].hod_sign);
        setrawSignatureIncharge(res.data[0].supervisor_sign);
        setabSignatureHOD(res.data[0].hod_sign);
        setabSignatureIncharge(res.data[0].supervisor_sign);
        //setOverallRawID(res.data.ab_id)

        setContaminationccpAHair(
          res.data[0].detailsAbCottonF04[0].bw1Contamination
        );
        setContaminationccpBHair(
          res.data[0].detailsAbCottonF04[0].bw2Contamination
        );

        setContaminationccpAJute(
          res.data[0].detailsAbCottonF04[1].bw1Contamination
        );
        setContaminationccpBJute(
          res.data[0].detailsAbCottonF04[1].bw2Contamination
        );

        setContaminationccpAColourThread(
          res.data[0].detailsAbCottonF04[2].bw1Contamination
        );
        setContaminationccpBColourThread(
          res.data[0].detailsAbCottonF04[2].bw2Contamination
        );

        setContaminationccpAWrapper(
          res.data[0].detailsAbCottonF04[3].bw1Contamination
        );
        setContaminationccpBWrapper(
          res.data[0].detailsAbCottonF04[3].bw2Contamination
        );

        setContaminationccpAMetal(
          res.data[0].detailsAbCottonF04[4].bw1Contamination
        );
        setContaminationccpBMetal(
          res.data[0].detailsAbCottonF04[4].bw2Contamination
        );

        setContaminationccpARust(
          res.data[0].detailsAbCottonF04[5].bw1Contamination
        );
        setContaminationccpBRust(
          res.data[0].detailsAbCottonF04[5].bw2Contamination
        );

        setContaminationccpAPlastic(
          res.data[0].detailsAbCottonF04[6].bw1Contamination
        );
        setContaminationccpBPlastic(
          res.data[0].detailsAbCottonF04[6].bw2Contamination
        );

        setContaminationccpABlackCotton(
          res.data[0].detailsAbCottonF04[7].bw1Contamination
        );
        setContaminationccpBBlackCotton(
          res.data[0].detailsAbCottonF04[7].bw2Contamination
        );

        SetContaminationccpAUnbleachedCotton(
          res.data[0].detailsAbCottonF04[8].bw1Contamination
        );
        SetContaminationccpBUnbleachedCotton(
          res.data[0].detailsAbCottonF04[8].bw2Contamination
        );

        setContaminationccpAOilCotton(
          res.data[0].detailsAbCottonF04[9].bw1Contamination
        );
        setContaminationccpBOilCotton(
          res.data[0].detailsAbCottonF04[9].bw2Contamination
        );

        setContaminationccpASoil(
          res.data[0].detailsAbCottonF04[10].bw1Contamination
        );
        setContaminationccpBSoil(
          res.data[0].detailsAbCottonF04[10].bw2Contamination
        );

        setContaminationccpAYellowCotton(
          res.data[0].detailsAbCottonF04[11].bw1Contamination
        );
        setContaminationccpBYellowCotton(
          res.data[0].detailsAbCottonF04[11].bw2Contamination
        );

        setContaminationccpAPaper(
          res.data[0].detailsAbCottonF04[12].bw1Contamination
        );
        setContaminationccpBPaper(
          res.data[0].detailsAbCottonF04[12].bw2Contamination
        );

        setContaminationccpAStick(
          res.data[0].detailsAbCottonF04[13].bw1Contamination
        );
        setContaminationccpBStick(
          res.data[0].detailsAbCottonF04[13].bw2Contamination
        );

        setContaminationccpAFeather(
          res.data[0].detailsAbCottonF04[14].bw1Contamination
        );
        setContaminationccpBFeather(
          res.data[0].detailsAbCottonF04[14].bw2Contamination
        );

        setContaminationccpACloth(
          res.data[0].detailsAbCottonF04[15].bw1Contamination
        );
        setContaminationccpBCloth(
          res.data[0].detailsAbCottonF04[15].bw2Contamination
        );

        setContaminationccpAWhitePolyPropylene(
          res.data[0].detailsAbCottonF04[16].bw1Contamination
        );
        setContaminationccpBWhitePolyPropylene(
          res.data[0].detailsAbCottonF04[16].bw2Contamination
        );

        setContaminationccpAColourPolyPropylene(
          res.data[0].detailsAbCottonF04[17].bw1Contamination
        );
        setContaminationccpBColourPolyPropylene(
          res.data[0].detailsAbCottonF04[17].bw2Contamination
        );

        setContaminationccpARubberPiece(
          res.data[0].detailsAbCottonF04[18].bw1Contamination
        );
        setContaminationccpBRubberPiece(
          res.data[0].detailsAbCottonF04[18].bw2Contamination
        );

        set_raw_id_1(res.data[0].detailsAbCottonF04[0].raw_id);
        set_id_1(res.data[0].detailsAbCottonF04[0].id);
        set_raw_id_2(res.data[0].detailsAbCottonF04[1].raw_id);
        set_id_2(res.data[0].detailsAbCottonF04[1].id);
        set_raw_id_3(res.data[0].detailsAbCottonF04[2].raw_id);
        set_id_3(res.data[0].detailsAbCottonF04[2].id);
        set_raw_id_4(res.data[0].detailsAbCottonF04[3].raw_id);
        set_id_4(res.data[0].detailsAbCottonF04[3].id);
        set_raw_id_5(res.data[0].detailsAbCottonF04[4].raw_id);
        set_id_5(res.data[0].detailsAbCottonF04[4].id);
        set_raw_id_6(res.data[0].detailsAbCottonF04[5].raw_id);
        set_id_6(res.data[0].detailsAbCottonF04[5].id);
        set_raw_id_7(res.data[0].detailsAbCottonF04[6].raw_id);
        set_id_7(res.data[0].detailsAbCottonF04[6].id);
        set_raw_id_8(res.data[0].detailsAbCottonF04[7].raw_id);
        set_id_8(res.data[0].detailsAbCottonF04[7].id);
        set_raw_id_9(res.data[0].detailsAbCottonF04[8].raw_id);
        set_id_9(res.data[0].detailsAbCottonF04[8].id);
        set_raw_id_10(res.data[0].detailsAbCottonF04[9].raw_id);
        set_id_10(res.data[0].detailsAbCottonF04[9].id);
        set_raw_id_11(res.data[0].detailsAbCottonF04[10].raw_id);
        set_id_11(res.data[0].detailsAbCottonF04[10].id);
        set_raw_id_12(res.data[0].detailsAbCottonF04[11].raw_id);
        set_id_12(res.data[0].detailsAbCottonF04[11].id);
        set_raw_id_13(res.data[0].detailsAbCottonF04[12].raw_id);
        set_id_13(res.data[0].detailsAbCottonF04[12].id);
        set_raw_id_14(res.data[0].detailsAbCottonF04[13].raw_id);
        set_id_14(res.data[0].detailsAbCottonF04[13].id);
        set_raw_id_15(res.data[0].detailsAbCottonF04[14].raw_id);
        set_id_15(res.data[0].detailsAbCottonF04[14].id);
        set_raw_id_16(res.data[0].detailsAbCottonF04[15].raw_id);
        set_id_16(res.data[0].detailsAbCottonF04[15].id);
        set_raw_id_17(res.data[0].detailsAbCottonF04[16].raw_id);
        set_id_17(res.data[0].detailsAbCottonF04[16].id);
        set_raw_id_18(res.data[0].detailsAbCottonF04[17].raw_id);
        set_id_18(res.data[0].detailsAbCottonF04[17].id);
        set_raw_id_19(res.data[0].detailsAbCottonF04[18].raw_id);
        set_id_19(res.data[0].detailsAbCottonF04[18].id);
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  }, []);

  let dummyData;
  if (reportName === "CONTAMINATION_CHEKING_REPORT") {
    dummyData = {
      formName: "CONTAMINATION CHEKING REPORT",
      format: "PH-PRD01/F-011",
      fifthHeader: "Quantity in Kgs",
      sixthHeader: "PH#",
      sixthValue: [{ pageCount: "" }, { pageCount: "" }],
    };
  } else {
    dummyData = {
      formName: "APPLIED CONTAMINATION REPORT",
      format: "PRD01/F-)08",
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

  const isPrintEnabled =
    selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
    selectedRow?.hod_status === "HOD_APPROVED";

  const calculateTotalA = () => {
    let total = 0;

    const hairInput = document.getElementById("hair-inputA");
    if (hairInput) {
      total += parseInt(hairInput.value || "0");
    }

    const juteInput = document.getElementById("jute-inputA");
    if (juteInput) {
      total += parseInt(juteInput.value || "0");
    }

    const colourThreadInput = document.getElementById("colour-thread-inputA");
    if (colourThreadInput) {
      total += parseInt(colourThreadInput.value || "0");
    }

    const wrapperInput = document.getElementById("wrapper-inputA");
    if (wrapperInput) {
      total += parseInt(wrapperInput.value || "0");
    }

    const metalInput = document.getElementById("metal-inputA");
    if (metalInput) {
      total += parseInt(metalInput.value || "0");
    }

    const rustInput = document.getElementById("rust-inputA");
    if (rustInput) {
      total += parseInt(rustInput.value || "0");
    }

    const plasticInput = document.getElementById("plastic-inputA");
    if (plasticInput) {
      total += parseInt(plasticInput.value || "0");
    }

    const blkCottonInput = document.getElementById("blk-cotton-inputA");
    if (blkCottonInput) {
      total += parseInt(blkCottonInput.value || "0");
    }

    const oilCottonInput = document.getElementById("oil-cotton-inputA");
    if (oilCottonInput) {
      total += parseInt(oilCottonInput.value || "0");
    }

    const soilInput = document.getElementById("soil-inputA");
    if (soilInput) {
      total += parseInt(soilInput.value || "0");
    }
    const UnbleachedCottonInput = document.getElementById(
      "unbleched-cotton-inputA"
    );
    if (UnbleachedCottonInput) {
      total += parseInt(UnbleachedCottonInput.value || "0");
    }

    const yellowCottonInput = document.getElementById("yellow-cotton-inputA");
    if (yellowCottonInput) {
      total += parseInt(yellowCottonInput.value || "0");
    }

    const paperInput = document.getElementById("paper-inputA");
    if (paperInput) {
      total += parseInt(paperInput.value || "0");
    }

    const stickInput = document.getElementById("stick-inputA");
    if (stickInput) {
      total += parseInt(stickInput.value || "0");
    }

    const featherInput = document.getElementById("feather-inputA");
    if (featherInput) {
      total += parseInt(featherInput.value || "0");
    }

    const clothInput = document.getElementById("cloth-inputA");
    if (clothInput) {
      total += parseInt(clothInput.value || "0");
    }

    const whitePolyPropInput = document.getElementById(
      "white-poly-prop-inputA"
    );
    if (whitePolyPropInput) {
      total += parseInt(whitePolyPropInput.value || "0");
    }

    const colourPolyPropInput = document.getElementById(
      "colour-poly-prop-inputA"
    );
    if (colourPolyPropInput) {
      total += parseInt(colourPolyPropInput.value || "0");
    }

    const rubberPieceInput = document.getElementById("rubber-piece-inputA");
    if (rubberPieceInput) {
      total += parseInt(rubberPieceInput.value || "0");
    }

    const totalInput = document.getElementById("total-inputA");
    if (totalInput) {
      totalInput.value = total.toString();
    }
    setTotalccpA(total.toString());
  };

  const calculateTotalB = () => {
    let totalB = 0;

    const hairInput = document.getElementById("hair-inputB");
    if (hairInput) {
      totalB += parseInt(hairInput.value || "0");
    }

    const juteInput = document.getElementById("jute-inputB");
    if (juteInput) {
      totalB += parseInt(juteInput.value || "0");
    }

    const colourThreadInput = document.getElementById("colour-thread-inputB");
    if (colourThreadInput) {
      totalB += parseInt(colourThreadInput.value || "0");
    }

    const wrapperInput = document.getElementById("wrapper-inputB");
    if (wrapperInput) {
      totalB += parseInt(wrapperInput.value || "0");
    }

    const metalInput = document.getElementById("metal-inputB");
    if (metalInput) {
      totalB += parseInt(metalInput.value || "0");
    }

    const rustInput = document.getElementById("rust-inputB");
    if (rustInput) {
      totalB += parseInt(rustInput.value || "0");
    }

    const plasticInput = document.getElementById("plastic-inputB");
    if (plasticInput) {
      totalB += parseInt(plasticInput.value || "0");
    }

    const blkCottonInput = document.getElementById("blk-cotton-inputB");
    if (blkCottonInput) {
      totalB += parseInt(blkCottonInput.value || "0");
    }

    const oilCottonInput = document.getElementById("oil-cotton-inputB");
    if (oilCottonInput) {
      totalB += parseInt(oilCottonInput.value || "0");
    }

    const soilInput = document.getElementById("soil-inputB");
    if (soilInput) {
      totalB += parseInt(soilInput.value || "0");
    }
    const UnbleachedCottonInput = document.getElementById(
      "unbleched-cotton-inputB"
    );
    if (UnbleachedCottonInput) {
      totalB += parseInt(UnbleachedCottonInput.value || "0");
    }

    const yellowCottonInput = document.getElementById("yellow-cotton-inputB");
    if (yellowCottonInput) {
      totalB += parseInt(yellowCottonInput.value || "0");
    }

    const paperInput = document.getElementById("paper-inputB");
    if (paperInput) {
      totalB += parseInt(paperInput.value || "0");
    }

    const stickInput = document.getElementById("stick-inputB");
    if (stickInput) {
      totalB += parseInt(stickInput.value || "0");
    }

    const featherInput = document.getElementById("feather-inputB");
    if (featherInput) {
      totalB += parseInt(featherInput.value || "0");
    }

    const clothInput = document.getElementById("cloth-inputB");
    if (clothInput) {
      totalB += parseInt(clothInput.value || "0");
    }

    const whitePolyPropInput = document.getElementById(
      "white-poly-prop-inputB"
    );
    if (whitePolyPropInput) {
      totalB += parseInt(whitePolyPropInput.value || "0");
    }

    const colourPolyPropInput = document.getElementById(
      "colour-poly-prop-inputB"
    );
    if (colourPolyPropInput) {
      totalB += parseInt(colourPolyPropInput.value || "0");
    }

    const rubberPieceInput = document.getElementById("rubber-piece-inputB");
    if (rubberPieceInput) {
      totalB += parseInt(rubberPieceInput.value || "0");
    }

    const totalInputB = document.getElementById("total-inputB");
    if (totalInputB) {
      totalInputB.value = totalB.toString();
    }
    setTotalccpB(totalB.toString());
  };

  const saveData = () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const payload = {
      unit: "Unit H",
      formatNo: "PRD01/F08",
      formatName: "Applied Contamination Report - Absorbent Bleached Cotton",
      sopNumber: "PRD01-D-09",
      revisionNo: "02",
      bmrNumber: state.bmrno,
      date: state.date,
      ...(overallRawId && { ab_id: overallRawId }),
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
      total_01: totalccpA,
      total_02: totalccpB,
      detailsAbCottonF04: [
        {
          type: "Hair",
          bw1Contamination: contaminationccpAHair,
          bw2Contamination: contaminationccpBHair,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_1 && { id: id_1 }),
        },
        {
          type: "Jute",
          bw1Contamination: contaminationccpAJute,
          bw2Contamination: contaminationccpBJute,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_2 && { id: id_2 }),
        },
        {
          type: "Colour Thread",
          bw1Contamination: contaminationccpAColourThread,
          bw2Contamination: contaminationccpBColourThread,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_3 && { id: id_3 }),
        },
        {
          type: "Wrapper",
          bw1Contamination: contaminationccpAWrapper,
          bw2Contamination: contaminationccpBWrapper,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_4 && { id: id_4 }),
        },
        {
          type: "Metal",
          bw1Contamination: contaminationccpAMetal,
          bw2Contamination: contaminationccpBMetal,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_5 && { id: id_5 }),
        },
        {
          type: "Rust",
          bw1Contamination: contaminationccpARust,
          bw2Contamination: contaminationccpBRust,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_6 && { id: id_6 }),
        },
        {
          type: "Plastic",
          bw1Contamination: contaminationccpAPlastic,
          bw2Contamination: contaminationccpBPlastic,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_7 && { id: id_7 }),
        },
        {
          type: "Black Cotton",
          bw1Contamination: contaminationccpABlackCotton,
          bw2Contamination: contaminationccpBBlackCotton,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_8 && { id: id_8 }),
        },
        {
          type: "Unbleached Cotton",
          bw1Contamination: contaminationccpAUnbleachedCotton,
          bw2Contamination: contaminationccpBUnbleachedCotton,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_9 && { id: id_9 }),
        },
        {
          type: "Oil Cotton",
          bw1Contamination: contaminationccpAOilCotton,
          bw2Contamination: contaminationccpBOilCotton,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_10 && { id: id_10 }),
        },
        {
          type: "Soil",
          bw1Contamination: contaminationccpASoil,
          bw2Contamination: contaminationccpBSoil,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_11 && { id: id_11 }),
        },
        {
          type: "Yelow Cotton",
          bw1Contamination: contaminationccpAYellowCotton,
          bw2Contamination: contaminationccpBYellowCotton,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_12 && { id: id_12 }),
        },
        {
          type: "Paper",
          bw1Contamination: contaminationccpAPaper,
          bw2Contamination: contaminationccpBPaper,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_13 && { id: id_13 }),
        },
        {
          type: "Stick",
          bw1Contamination: contaminationccpAStick,
          bw2Contamination: contaminationccpBStick,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_14 && { id: id_14 }),
        },
        {
          type: "Feather",
          bw1Contamination: contaminationccpAFeather,
          bw2Contamination: contaminationccpBFeather,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_15 && { id: id_15 }),
        },
        {
          type: "Cloth",
          bw1Contamination: contaminationccpACloth,
          bw2Contamination: contaminationccpBCloth,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_16 && { id: id_16 }),
        },
        {
          type: "White Poly Propylene",
          bw1Contamination: contaminationccpAWhitePolyPropylene,
          bw2Contamination: contaminationccpBWhitePolyPropylene,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_17 && { id: id_17 }),
        },
        {
          type: "Colour Poly Propylene",
          bw1Contamination: contaminationccpAColourPolyPropylene,
          bw2Contamination: contaminationccpBColourPolyPropylene,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_18 && { id: id_18 }),
        },
        {
          type: "Rubber piece",
          bw1Contamination: contaminationccpARubberPiece,
          bw2Contamination: contaminationccpBRubberPiece,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_19 && { id: id_19 }),
        },
      ],
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/Bleaching/Service/saveAppliedAbCottonF08`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.log("Response", res.data);
        message.success("Form Saved Successfully");
        navigate("/Precot/Bleaching/F-08/Summary");
      })
      .catch((err) => {
        // console.log("Error", err);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const submitData = () => {
    setSubmitLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Authentication token is missing. Please log in.");
      setSubmitLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const payload = {
      unit: "Unit H",
      formatNo: "PRD01/F08",
      formatName: "Applied Contamination Report - Absorbent Bleached Cotton",
      sopNumber: "PRD01-D-09",
      revisionNo: "02",
      bmrNumber: state.bmrno,
      date: state.date,
      ...(overallRawId && { ab_id: overallRawId }),
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
      total_01: totalccpA,
      total_02: totalccpB,
      detailsAbCottonF04: [
        {
          type: "Hair",
          bw1Contamination: contaminationccpAHair,
          bw2Contamination: contaminationccpBHair,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_1 && { id: id_1 }),
        },
        {
          type: "Jute",
          bw1Contamination: contaminationccpAJute,
          bw2Contamination: contaminationccpBJute,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_2 && { id: id_2 }),
        },
        {
          type: "Colour Thread",
          bw1Contamination: contaminationccpAColourThread,
          bw2Contamination: contaminationccpBColourThread,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_3 && { id: id_3 }),
        },
        {
          type: "Wrapper",
          bw1Contamination: contaminationccpAWrapper,
          bw2Contamination: contaminationccpBWrapper,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_4 && { id: id_4 }),
        },
        {
          type: "Metal",
          bw1Contamination: contaminationccpAMetal,
          bw2Contamination: contaminationccpBMetal,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_5 && { id: id_5 }),
        },
        {
          type: "Rust",
          bw1Contamination: contaminationccpARust,
          bw2Contamination: contaminationccpBRust,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_6 && { id: id_6 }),
        },
        {
          type: "Plastic",
          bw1Contamination: contaminationccpAPlastic,
          bw2Contamination: contaminationccpBPlastic,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_7 && { id: id_7 }),
        },
        {
          type: "Black Cotton",
          bw1Contamination: contaminationccpABlackCotton,
          bw2Contamination: contaminationccpBBlackCotton,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_8 && { id: id_8 }),
        },
        {
          type: "Unbleached Cotton",
          bw1Contamination: contaminationccpAUnbleachedCotton,
          bw2Contamination: contaminationccpBUnbleachedCotton,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_9 && { id: id_9 }),
        },
        {
          type: "Oil Cotton",
          bw1Contamination: contaminationccpAOilCotton,
          bw2Contamination: contaminationccpBOilCotton,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_10 && { id: id_10 }),
        },
        {
          type: "Soil",
          bw1Contamination: contaminationccpASoil,
          bw2Contamination: contaminationccpBSoil,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_11 && { id: id_11 }),
        },
        {
          type: "Yelow Cotton",
          bw1Contamination: contaminationccpAYellowCotton,
          bw2Contamination: contaminationccpBYellowCotton,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_12 && { id: id_12 }),
        },
        {
          type: "Paper",
          bw1Contamination: contaminationccpAPaper,
          bw2Contamination: contaminationccpBPaper,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_13 && { id: id_13 }),
        },
        {
          type: "Stick",
          bw1Contamination: contaminationccpAStick,
          bw2Contamination: contaminationccpBStick,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_14 && { id: id_14 }),
        },
        {
          type: "Feather",
          bw1Contamination: contaminationccpAFeather,
          bw2Contamination: contaminationccpBFeather,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_15 && { id: id_15 }),
        },
        {
          type: "Cloth",
          bw1Contamination: contaminationccpACloth,
          bw2Contamination: contaminationccpBCloth,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_16 && { id: id_16 }),
        },
        {
          type: "White Poly Propylene",
          bw1Contamination: contaminationccpAWhitePolyPropylene,
          bw2Contamination: contaminationccpBWhitePolyPropylene,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_17 && { id: id_17 }),
        },
        {
          type: "Colour Poly Propylene",
          bw1Contamination: contaminationccpAColourPolyPropylene,
          bw2Contamination: contaminationccpBColourPolyPropylene,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_18 && { id: id_18 }),
        },
        {
          type: "Rubber piece",
          bw1Contamination: contaminationccpARubberPiece,
          bw2Contamination: contaminationccpBRubberPiece,
          bw3Sample: "",
          bw4Sample: "",
          ...(overallRawId && { ab_id: overallRawId }),
          ...(id_19 && { id: id_19 }),
        },
      ],
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/Bleaching/Service/submitAppliedAbCottonF08`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Form Submitted Successfully");
        navigate("/Precot/Bleaching/F-08/Summary");
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || "Submission failed.";
        message.error(errorMessage);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const formattedDateHod = () => {
    if (hodSubmitOn) {
      const date = moment(hodSubmitOn);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDatesupervisor = () => {
    if (supervisorSubmitOn) {
      const date = moment(supervisorSubmitOn);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const formattedodDate = hodSubmitOn
    ? new Date(hodSubmitOn).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const formattedsupervisorDate = supervisorSubmitOn
    ? new Date(supervisorSubmitOn).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const items = [
    {
      key: "1",
      label: "Acitivity Form-01",
      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td
                  colSpan="2"
                  rowSpan="3"
                  style={{ fontSize: "14px", textAlign: "center" }}
                >
                  S.NO
                </td>
                <td
                  colSpan="5"
                  rowSpan="3"
                  style={{ fontSize: "14px", textAlign: "center" }}
                >
                  Types of Contamination
                </td>
              </tr>
              <tr>
                <td colSpan="4" align="center">
                  CCP#:03-A
                </td>
                <td colSpan="4" align="center">
                  CCP#:03-B
                </td>
              </tr>
              <tr>
                <td colSpan="4" align="center">
                  No of Contamination
                </td>

                <td colSpan="4" align="center">
                  No of Contamination
                </td>
              </tr>

              <tr>
                <td colSpan="2" align="center">
                  1
                </td>
                <td colSpan="5" align="center">
                  Hair
                </td>

                <td colSpan="4">
                  {" "}
                  <input
                    className="inp-new"
                    id="hair-inputA"
                    value={contaminationccpAHair}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpAHair(value);
                        calculateTotalA();
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  {" "}
                  <input
                    className="inp-new"
                    id="hair-inputB"
                    value={contaminationccpBHair}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBHair(value);
                        calculateTotalB();
                      }
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="2" align="center">
                  2
                </td>
                <td colSpan="5" align="center">
                  Jute
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpAJute}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="jute-inputA"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpAJute(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpBJute}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="jute-inputB"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBJute(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="2" align="center">
                  3
                </td>
                <td colSpan="5" align="center">
                  Colour Threads
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    id="colour-thread-inputA"
                    value={contaminationccpAColourThread}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpAColourThread(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    id="colour-thread-inputB"
                    value={contaminationccpBColourThread}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBColourThread(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="2" align="center">
                  4
                </td>
                <td colSpan="5" align="center">
                  Strapper
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpAWrapper}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="wrapper-inputA"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpAWrapper(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpBWrapper}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="wrapper-inputB"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBWrapper(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="2" align="center">
                  5
                </td>
                <td colSpan="5" align="center">
                  Metal piece
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpAMetal}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="metal-inputA"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpAMetal(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    id="metal-inputB"
                    value={contaminationccpBMetal}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBMetal(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  6
                </td>
                <td colSpan="5" align="center">
                  Brown/Rusty cotton
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpARust}
                    id="rust-inputA"
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpARust(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpBRust}
                    id="rust-inputB"
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBRust(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  7
                </td>
                <td colSpan="5" align="center">
                  Plastic
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpAPlastic}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="plastic-inputA"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpAPlastic(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpBPlastic}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="plastic-inputB"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBPlastic(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  8
                </td>
                <td colSpan="5" align="center">
                  Black Cotton
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    id="blk-cotton-inputA"
                    value={contaminationccpABlackCotton}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpABlackCotton(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpBBlackCotton}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="blk-cotton-inputB"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBBlackCotton(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  9
                </td>
                <td colSpan="5" align="center">
                  Unbleached cotton
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="unbleched-cotton-inputA"
                    value={contaminationccpAUnbleachedCotton}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        SetContaminationccpAUnbleachedCotton(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    id="unbleched-cotton-inputB"
                    value={contaminationccpBUnbleachedCotton}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        SetContaminationccpBUnbleachedCotton(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  10
                </td>
                <td colSpan="5" align="center">
                  Oil Cotton
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    id="oil-cotton-inputA"
                    value={contaminationccpAOilCotton}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpAOilCotton(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpBOilCotton}
                    id="oil-cotton-inputB"
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBOilCotton(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  11
                </td>
                <td colSpan="5" align="center">
                  Soils
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    id="soil-inputA"
                    value={contaminationccpASoil}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpASoil(value);
                        calculateTotalA();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="4">
                  <input
                    className="inp-new"
                    value={contaminationccpBSoil}
                    id="soil-inputB"
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED")) ||
                      ((roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE") &&
                        ((selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setContaminationccpBSoil(value);
                        calculateTotalB();
                      }
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "32px",
                      width: "100%",
                      border: "none",
                    }}
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
      label: "Acitivity Form-02",
      children: (
        <div>
          <table>
            <tr>
              <td
                colSpan="2"
                rowSpan="3"
                style={{ fontSize: "14px", textAlign: "center" }}
              >
                S.NO
              </td>
              <td
                colSpan="5"
                rowSpan="3"
                style={{ fontSize: "14px", textAlign: "center" }}
              >
                Types of Contamination
              </td>
            </tr>
            <tr>
              <td colSpan="4" align="center">
                CCP#:03-A
              </td>
              <td colSpan="4" align="center">
                CCP#:03-B
              </td>
            </tr>
            <tr>
              <td colSpan="4" align="center">
                No of Contamination
              </td>

              <td colSpan="4" align="center">
                No of Contamination
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center">
                12
              </td>
              <td colSpan="5" align="center">
                Yellow Cotton
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  id="yellow-cotton-inputA"
                  value={contaminationccpAYellowCotton}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpAYellowCotton(value);
                      calculateTotalA();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  id="yellow-cotton-inputB"
                  value={contaminationccpBYellowCotton}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpBYellowCotton(value);
                      calculateTotalB();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                13
              </td>
              <td colSpan="5" align="center">
                Paper
              </td>
              <td colSpan="4">
                <input
                  id="paper-inputA"
                  className="inp-new"
                  value={contaminationccpAPaper}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpAPaper(value);
                      calculateTotalA();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
              <td colSpan="4">
                <input
                  id="paper-inputB"
                  className="inp-new"
                  value={contaminationccpBPaper}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpBPaper(value);
                      calculateTotalB();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                14
              </td>
              <td colSpan="5" align="center">
                Stick
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  id="stick-inputA"
                  value={contaminationccpAStick}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpAStick(value);
                      calculateTotalA();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  value={contaminationccpBStick}
                  id="stick-inputB"
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpBStick(value);
                      calculateTotalB();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                15
              </td>
              <td colSpan="5" align="center">
                Feather
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  id="feather-inputA"
                  value={contaminationccpAFeather}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpAFeather(value);
                      calculateTotalA();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  id="feather-inputB"
                  value={contaminationccpBFeather}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpBFeather(value);
                      calculateTotalB();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                16
              </td>
              <td colSpan="5" align="center">
                Cloth
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  value={contaminationccpACloth}
                  id="cloth-inputA"
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpACloth(value);
                      calculateTotalA();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  value={contaminationccpBCloth}
                  id="cloth-inputB"
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpBCloth(value);
                      calculateTotalB();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                17
              </td>
              <td colSpan="5" align="center">
                White Poly Propylene
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  id="white-poly-prop-inputA"
                  value={contaminationccpAWhitePolyPropylene}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpAWhitePolyPropylene(value);
                      calculateTotalA();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  id="white-poly-prop-inputB"
                  value={contaminationccpBWhitePolyPropylene}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpBWhitePolyPropylene(value);
                      calculateTotalB();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                18
              </td>
              <td colSpan="5" align="center">
                Colour Poly Propylene
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  id="colour-poly-prop-inputA"
                  value={contaminationccpAColourPolyPropylene}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpAColourPolyPropylene(value);
                      calculateTotalA();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  id="colour-poly-prop-inputB"
                  value={contaminationccpBColourPolyPropylene}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED")) ||
                    ((roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE") &&
                      ((selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpBColourPolyPropylene(value);
                      calculateTotalB();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                19
              </td>
              <td colSpan="5" align="center">
                Rubber Piece
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  value={contaminationccpARubberPiece}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED") ||
                    (roleBase === "ROLE_HOD" &&
                      selectedRow?.hod_status === "HOD_APPROVED") ||
                    (roleBase === "ROLE_DESIGNEE" &&
                      selectedRow?.hod_status === "HOD_APPROVED")
                  }
                  id="rubber-piece-inputA"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpARubberPiece(value);
                      calculateTotalA();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  value={contaminationccpBRubberPiece}
                  id="rubber-piece-inputB"
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED") ||
                    roleBase === "ROLE_HOD" ||
                    ("ROLE_DESIGNEE" &&
                      selectedRow?.hod_status === "HOD_APPROVED")
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setContaminationccpBRubberPiece(value);
                      calculateTotalB();
                    }
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="7" align="center">
                Total:
              </td>
              <td colSpan="4" style={{ height: "50px" }}>
                <input
                  className="inp-new"
                  value={totalccpA}
                  id="total-inputA"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      calculateTotalA();
                    }
                  }}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED") ||
                    roleBase === "ROLE_HOD" ||
                    ("ROLE_DESIGNEE" &&
                      selectedRow?.hod_status === "HOD_APPROVED")
                  }
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
              <td colSpan="4">
                <input
                  className="inp-new"
                  value={totalccpB}
                  id="total-inputB"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      calculateTotalB();
                    }
                  }}
                  disabled={
                    (roleBase === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED") ||
                    roleBase === "ROLE_HOD" ||
                    ("ROLE_DESIGNEE" &&
                      selectedRow?.hod_status === "HOD_APPROVED")
                  }
                  type="number"
                  style={{
                    padding: 0,
                    margin: 0,
                    height: "32px",
                    width: "100%",
                    border: "none",
                  }}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },

    {
      key: "3",
      label: "Reviews",
      children: (
        <div>
          <table>
            <tr>
              <td colSpan="7" align="center">
                Performed by Production Supervisor
              </td>
              <td colSpan="8" align="center">
                Reviewed by Head of the Department/Designee
              </td>
            </tr>
            <tr>
              <td
                colSpan="7"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && (
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
                        <div> {formattedDatesupervisor()}</div>
                      </div>
                      {getImage !== "" && (
                        <img
                          className="signature"
                          src={getImage}
                          alt="Supervisor"
                          style={{
                            width: "70px",
                            height: "50px",
                            marginLeft: "10px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}

                {/* <span style={{fontSize:'11px',marginLeft:"0px"}}>      Signature & Date</span> */}
              </td>
              <td
                colSpan="8"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {(selectedRow?.hod_status === "HOD_REJECTED" ||
                  selectedRow?.hod_status === "HOD_APPROVED") && (
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
                        <div>{hodSign}</div>
                        <div>{formattedDateHod()}</div>
                      </div>
                      {getImage1 !== "" && (
                        <img
                          className="signature"
                          src={getImage1}
                          style={{
                            width: "70px",
                            height: "50px",
                            marginLeft: "10px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                          alt="HOD"
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  return (
    <div class="appliedrawcotton">
      <div id="section-to-print">
        <header className="no-print" />
        <main>
          <br />
          <table style={{ width: "95%", tableLayout: "fixed" }}>
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="11"></td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  rowspan="4 "
                  style={{ textAlign: "center", widht: "10%" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th
                  colSpan="6"
                  rowspan="4"
                  style={{ height: "60px", textAlign: "center" }}
                >
                  Applied Contamination Report
                  <br />
                  (Absorbent Bleached Cotton)
                </th>
                <td colSpan="2">Format.:</td>
                <td colSpan="2">PH-PRD01/F-011</td>
              </tr>

              <tr>
                <td colSpan="2">Revision No.:</td>
                <td colSpan="2">01</td>
              </tr>
              <tr>
                <td colSpan="2">Ref sopNo.:</td>
                <td colSpan="2">PRD01-D-09</td>
              </tr>
              <tr>
                <td colSpan="2">PageNo.:</td>
                <td colSpan="2">01</td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="11"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="11"></td>
              </tr>
            </thead>
            <br />

            <tbody>
              <tr>
                <td colSpan="5">Date : {formattedDate}</td>
                {/* <td colSpan="3">{formattedDate}</td> */}
                <td colSpan="6">BMR No :{state.bmrno}</td>
                {/* <td colSpan="3">{state.bmrno}</td> */}
              </tr>
              <tr>
                <td colSpan="1" rowSpan="3">
                  S.No.
                </td>
                <td colSpan="2" rowSpan="3">
                  Types of Contamination
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  CCP#03-A
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  CCP#03-B
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No of <br />
                  Contamination
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref Sample
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No of <br /> Contamination
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Ref Sample
                </td>
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="2">Hair</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAHair}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBHair}
                </td>
                <td colSpan="2"></td>
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="2">Jute</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAJute}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBJute}
                </td>
                <td colSpan="2"></td>
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="2">Colour Threads </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAColourThread}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBColourThread}
                </td>
                <td colSpan="2"></td>
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="2">Strapper</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAWrapper}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBWrapper}
                </td>
                <td colSpan="2"></td>
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="2">Metal piece </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAMetal}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBMetal}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="2">Brown/Rusty cotton </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpARust}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBRust}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="2">Plastic</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAPlastic}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBPlastic}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="2">Black Cotton</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpABlackCotton}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBBlackCotton}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  9
                </td>
                <td colSpan="2">Unbleached Cotton</td>

                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAUnbleachedCotton}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAUnbleachedCotton}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  10
                </td>
                <td colSpan="2">Oil Cotton</td>

                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAOilCotton}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBOilCotton}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  11
                </td>
                <td colSpan="2">Soils</td>

                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpASoil}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBSoil}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  12
                </td>
                <td colSpan="2">Yellow Cotton</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAYellowCotton}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBYellowCotton}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  13
                </td>
                <td colSpan="2">Paper</td>

                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAPaper}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBPaper}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  14
                </td>
                <td colSpan="2">Stick</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAStick}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBStick}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  15
                </td>
                <td colSpan="2">Feather</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAFeather}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBFeather}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  16
                </td>
                <td colSpan="2">Cloth</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpACloth}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBCloth}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  17
                </td>
                <td colSpan="2">White Poly Propylene</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAWhitePolyPropylene}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBWhitePolyPropylene}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  18
                </td>
                <td colSpan="2">Colour Poly Propylene</td>

                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpAColourPolyPropylene}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBColourPolyPropylene}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  19
                </td>
                <td colSpan="2">Rubber Piece</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpARubberPiece}
                </td>
                <td colSpan="2"></td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {contaminationccpBRubberPiece}
                </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="3" style={{ textAlign: "right" }}>
                  Total
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {totalccpA}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {totalccpB}
                </td>
              </tr>

              <tr>
                <td colSpan="5">Performed by Production Supervisor</td>
                <td colSpan="6">Reviewed by Head of the Department/Designee</td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{
                    height: "80px",
                    textAlign: "center",
                    marginBottom: "auto",
                    verticalAlign: "bottom",
                  }}
                >
                  {selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && (
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
                          <div> {formattedsupervisorDate}</div>
                        </div>
                        <img
                          src={getImage}
                          alt="logo"
                          style={{
                            width: "15%",
                            height: "10%",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                      {/* <div>Signature & Date</div> */}
                    </>
                  )}

                  {/* <span style={{fontSize:'11px',marginLeft:"0px"}}>      Signature & Date</span> */}
                </td>
                <td colSpan="6" style={{ height: "40px" }}>
                  <div align="center">
                    {hodSign} <br />
                    {formattedodDate}
                    <br></br>
                    Sign&Date
                  </div>
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="11"></td>
              </tr>
            </tbody>
            <br />

            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="11"></td>
              </tr>
              <tr>
                <td colSpan="3">Particulars</td>
                <td colSpan="3">Perpared by</td>
                <td colSpan="3">Reviewed by</td>
                <td colSpan="2">Apporved by</td>
              </tr>
              <tr>
                <td colSpan="3">Name</td>
                <td colSpan="3"></td>
                <td colSpan="3"></td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="3">Signature & Date</td>
                <td colSpan="3"></td>
                <td colSpan="3"></td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </main>
        <footer className="no-print" />
      </div>

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
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
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
        formName="Applied Contamination checking Report(Absorbent Bleached cotton)"
        formatNo="PH-PRD01/F-011"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          //   isPrintEnabled&&(
          //   <Button
          //     type="primary"
          //     style={{
          //       backgroundColor: "#E5EEF9",
          //       color: "#00308F",
          //       fontWeight: "bold",

          //     }}
          //     shape="round"
          //     icon={<IoPrint color="#00308F" />}
          //     onClick={() => window.print()}
          //   >
          //     Print
          //   </Button>
          // ),

          roleBase === "ROLE_HOD" ||
          roleBase === "ROLE_QA" ||
          roleBase === "ROLE_QC" ||
          roleBase === "ROLE_DESIGNEE" ? (
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
                icon={<img src={approveIcon} alt="Approve Icon" />}
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
                  display: canDisplayButton2(),
                }}
                onClick={saveData}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                Save
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
                onClick={submitData}
                shape="round"
                icon={<GrDocumentStore color="#00308F" />}
              >
                Submit
              </Button>
            </>
          ),
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            //  onClick={saveData}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
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
            // onClick={handleLogout}
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
      <Row
        style={{
          width: "90%",
          position: "relative",
          marginLeft: "1em",
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
              max={formattedToday}
              onChange={(e) => setInitialDate(e.target.value)}
              // disabled={disable}
              disabled={
                (roleBase === "ROLE_SUPERVISOR" &&
                  ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
                    selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED")) ||
                ((roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") &&
                  ((selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
                    selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    selectedRow?.hod_status === "HOD_REJECTED"))
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
          width: "90%",
          position: "relative",
          left: "5%",
        }}
        items={items}
        onChange={onChange2}
        defaultActiveKey="1"
      />
    </div>
  );
};

export default Bleaching_f08;
